var express = require("express");
var path = require("path");
var fs = require("fs");
var llm = require("./llm");

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
var PORT = parseInt(process.env.PORT || "3000", 10);

var llmConfig;
if (BACKEND === "ollama") {
  llmConfig = { model: process.env.OLLAMA_MODEL || "llama3.1:70b", baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434" };
} else if (BACKEND === "anthropic") {
  llmConfig = { model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6", apiKey: process.env.ANTHROPIC_API_KEY || "" };
}

// ── Corpus for offline mode ──
var corpus = [];
var corpusIndex = 0;

function loadCorpus() {
  corpus = [];
  if (!fs.existsSync(CORPUS_DIR)) return;
  var files = fs.readdirSync(CORPUS_DIR).filter(function (f) { return f.endsWith(".json"); }).sort();
  files.forEach(function (f) {
    try {
      var doc = JSON.parse(fs.readFileSync(path.join(CORPUS_DIR, f), "utf8"));
      if (doc && doc.tweet) corpus.push(doc);
    } catch (e) {
      console.error("  Warning: skipping " + f + ": " + e.message);
    }
  });
}

function shuffleCorpus() {
  for (var i = corpus.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = corpus[i]; corpus[i] = corpus[j]; corpus[j] = tmp;
  }
  corpusIndex = 0;
}

function nextCorpusItem() {
  if (corpus.length === 0) return null;
  if (corpusIndex >= corpus.length) shuffleCorpus();
  return corpus[corpusIndex++];
}

if (BACKEND === "offline") {
  loadCorpus();
  shuffleCorpus();
}

// ── Express ──
var app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

// ── GET /api/status ──
app.get("/api/status", function (req, res) {
  res.json({ backend: BACKEND, corpus_size: BACKEND === "offline" ? corpus.length : null });
});

// ── POST /api/generate ──
app.post("/api/generate", function (req, res) {
  if (BACKEND === "offline") {
    var item = nextCorpusItem();
    if (!item) return res.status(503).json({ error: "No corpus files in " + CORPUS_DIR });
    // Attach corpus index so frontend can fetch replies
    var tweet = JSON.parse(JSON.stringify(item.tweet));
    tweet._corpus_idx = corpus.indexOf(item);
    tweet._has_replies = !!(item.replies && item.replies.length);
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

// ── POST /api/replies ──
app.post("/api/replies", function (req, res) {
  if (BACKEND === "offline") {
    var idx = req.body && req.body.corpus_idx;
    if (idx === undefined || idx === null || !corpus[idx]) {
      return res.status(404).json({ error: "Corpus item not found" });
    }
    return res.json({ replies: corpus[idx].replies || [] });
  }

  // In LLM mode, replies go through /api/generate — this endpoint only serves offline
  var body = req.body;
  if (!body || !body.system || !body.content) {
    return res.status(400).json({ error: "Missing system or content" });
  }
  llm.callLLM(BACKEND, llmConfig, body.system, body.content, body.max_tokens, body.temperature)
    .then(function (text) { res.json({ text: text }); })
    .catch(function (err) { res.status(502).json({ error: err.message }); });
});

// ── Start ──
app.listen(PORT, function () {
  console.log("");
  console.log("  ✧ MYSTERY SCIENCE TWITTER 3000 ✧");
  if (BACKEND === "offline") {
    console.log("  Backend: offline (" + corpus.length + " tweets from " + CORPUS_DIR + ")");
  } else {
    console.log("  Backend: " + BACKEND + " (" + ((llmConfig && llmConfig.model) || "?") + ")");
  }
  console.log("  http://localhost:" + PORT);
  console.log("");
});
