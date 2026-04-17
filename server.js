var express = require("express");
var path = require("path");
var fs = require("fs");
var llm = require("./llm");
var corpusLib = require("./corpus");

// ── Load .env ──
try {
  var envFile = fs.readFileSync(path.join(__dirname, ".env"), "utf8");
  envFile.split("\n").forEach(function (line) {
    line = line.trim();
    if (!line || line.startsWith("#")) return;
    var eq = line.indexOf("=");
    if (eq === -1) return;
    var key = line.slice(0, eq).trim();
    var val = line.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  });
} catch (e) {}

// ── Config ──
var BACKEND = process.env.BACKEND || "anthropic";
var CORPUS_DIR = process.env.CORPUS_DIR || path.join(__dirname, "corpus");
var PORT = parseInt(process.env.PORT || "3017", 10);

var llmConfig;
if (BACKEND === "ollama") {
  llmConfig = { model: process.env.OLLAMA_MODEL || "llama3.1:70b", baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434" };
} else if (BACKEND === "anthropic") {
  llmConfig = { model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6", apiKey: process.env.ANTHROPIC_API_KEY || "" };
}

// ── Corpus index (loaded/built at startup, updated in-place on saves) ──
var corpusIndex = corpusLib.loadOrBuildIndex(CORPUS_DIR);

// ── Offline-mode feed state (shuffled deck over corpus entries) ──
var offlineDeck = [];
var offlineCursor = 0;

function rebuildOfflineDeck() {
  offlineDeck = corpusLib.allEntries(CORPUS_DIR);
  for (var i = offlineDeck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = offlineDeck[i]; offlineDeck[i] = offlineDeck[j]; offlineDeck[j] = tmp;
  }
  offlineCursor = 0;
}

function nextOfflineEntry() {
  if (offlineDeck.length === 0) return null;
  if (offlineCursor >= offlineDeck.length) rebuildOfflineDeck();
  return offlineDeck[offlineCursor++];
}

if (BACKEND === "offline") rebuildOfflineDeck();

// ── Express ──
var app = express();
app.use(express.json({ limit: "1mb" }));

// ── GET /api/status ──
app.get("/api/status", function (req, res) {
  res.json({
    backend: BACKEND,
    corpus_size: corpusIndex.counts.tweets,
    corpus_with_replies: corpusIndex.counts.tweets_with_replies,
  });
});

// ── GET /api/tweet/:id — fetch a corpus entry by persistent ID ──
app.get("/api/tweet/:id", function (req, res) {
  var id = req.params.id;
  if (!corpusLib.isValidId(id)) return res.status(400).json({ error: "Invalid id" });
  var doc = corpusLib.getEntry(CORPUS_DIR, corpusIndex, id);
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
});

// ── GET /api/tweets — list every corpus tweet (lightweight, replies stripped) ──
app.get("/api/tweets", function (req, res) {
  var items = corpusLib.listTweets(CORPUS_DIR);
  res.json({ tweets: items, count: items.length });
});

// ── POST /api/save — persist a freshly-generated tweet, assign id ──
app.post("/api/save", function (req, res) {
  var tweet = req.body && req.body.tweet;
  if (!tweet || !tweet.tweet) return res.status(400).json({ error: "Missing tweet" });
  var model = llmConfig && llmConfig.model;
  // Only record temperature if the model actually used it (Opus 4.7 rejects sampling params)
  var recordedTemp = null;
  if (llm.acceptsSamplingParams(model)) {
    recordedTemp = req.body.temperature != null ? req.body.temperature : 0.9;
  }
  var meta = { backend: BACKEND, model: model, temperature: recordedTemp };
  var saved = corpusLib.saveTweet(CORPUS_DIR, corpusIndex, tweet, meta);
  res.json({ id: saved.id });
});

// ── POST /api/save-replies — attach replies to an existing tweet ──
app.post("/api/save-replies", function (req, res) {
  var id = req.body && req.body.id;
  var replies = req.body && req.body.replies;
  if (!corpusLib.isValidId(id)) return res.status(400).json({ error: "Invalid id" });
  if (!Array.isArray(replies)) return res.status(400).json({ error: "replies must be array" });
  var doc = corpusLib.saveReplies(CORPUS_DIR, corpusIndex, id, replies);
  if (!doc) return res.status(404).json({ error: "Tweet not found" });
  res.json({ ok: true });
});

// ── POST /api/generate — LLM passthrough (online) or deck draw (offline) ──
app.post("/api/generate", function (req, res) {
  if (BACKEND === "offline") {
    var entry = nextOfflineEntry();
    if (!entry) return res.status(503).json({ error: "No corpus files in " + CORPUS_DIR });
    var tweet = JSON.parse(JSON.stringify(entry.tweet));
    tweet.id = entry.id;
    tweet._has_replies = !!(entry.replies && entry.replies.length);
    return res.json({ text: JSON.stringify(tweet) });
  }

  var body = req.body;
  if (!body || !body.system || !body.content) {
    return res.status(400).json({ error: "Missing system or content" });
  }
  llm.callLLM(BACKEND, llmConfig, body.system, body.content, body.max_tokens, body.temperature)
    .then(function (text) { res.json({ text: text }); })
    .catch(function (err) { res.status(502).json({ error: err.message }); });
});

// ── POST /api/replies — fetch cached replies (offline) or LLM passthrough ──
app.post("/api/replies", function (req, res) {
  if (BACKEND === "offline") {
    var id = req.body && req.body.id;
    if (id) {
      var doc = corpusLib.getEntry(CORPUS_DIR, corpusIndex, id);
      if (!doc) return res.status(404).json({ error: "Tweet not found" });
      return res.json({ replies: doc.replies || [] });
    }
    return res.status(400).json({ error: "Missing id" });
  }

  var body = req.body;
  if (!body || !body.system || !body.content) {
    return res.status(400).json({ error: "Missing system or content" });
  }
  llm.callLLM(BACKEND, llmConfig, body.system, body.content, body.max_tokens, body.temperature)
    .then(function (text) { res.json({ text: text }); })
    .catch(function (err) { res.status(502).json({ error: err.message }); });
});

// ── Permalink + collection routes: /t/ and /t/:id both serve the SPA ──
app.get(["/t", "/t/", "/t/:id"], function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ── Static files (after API + permalink routes) ──
app.use(express.static(path.join(__dirname, "public")));

// ── Start ──
app.listen(PORT, function () {
  console.log("");
  console.log("  ✧ MEMETIC SUBSPACE TWITTER 3017 ✧");
  console.log("  Backend: " + BACKEND + (llmConfig ? " (" + llmConfig.model + ")" : ""));
  console.log("  Corpus:  " + CORPUS_DIR + " (" + corpusIndex.counts.tweets + " tweets, " + corpusIndex.counts.tweets_with_replies + " with replies)");
  console.log("  http://localhost:" + PORT);
  console.log("");
});
