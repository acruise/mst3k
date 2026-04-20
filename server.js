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
var DATA_DIR = path.join(__dirname, "data");

var llmConfig;
if (BACKEND === "ollama") {
  llmConfig = { model: process.env.OLLAMA_MODEL || "qwen3:14b", baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434" };
} else if (BACKEND === "anthropic") {
  llmConfig = { model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001", apiKey: process.env.ANTHROPIC_API_KEY || "" };
}

// ── Load prompt data (server-side only — never served to clients) ──
var MEME_FORMATS = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "meme-formats.json"), "utf8"));
var REPLY_ARCHETYPES = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "reply-archetypes.json"), "utf8"));
var SYSTEM_PROMPT = fs.readFileSync(path.join(DATA_DIR, "system-prompt.txt"), "utf8");
var REPLIES_PROMPT = fs.readFileSync(path.join(DATA_DIR, "replies-prompt.txt"), "utf8");
var HANDLES = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "handles.json"), "utf8"));

function generateHandle() {
  var p = HANDLES.prefixes; var r = HANDLES.roots; var s = HANDLES.suffixes;
  return "@" + randomChoice(p) + randomChoice(r) + randomChoice(s);
}

// ── Annotations: build subheader hints from query params ──
function buildAnnotations(query) {
  var annotations = [];
  var summon = query.summon || null;
  if (summon) {
    var pool = filterFormats(summon);
    annotations.push("⚡ SUMMONING \"" + summon + "\" (" + pool.length + " formats)");
  }
  var incites = query.incite || null;
  if (incites) {
    if (!Array.isArray(incites)) incites = [incites];
    annotations.push("⚡ INCITING \"" + incites.join("+") + "\"");
  }
  return annotations;
}

// ── Valid tag/key alphabets (exhaustive — reject anything else) ──
var SUMMON_TAGS = [
  "1917", "court", "dril", "falgsc", "federation", "gimmick", "gloem",
  "history", "keth", "meat", "meta", "moon", "notes", "skeet",
  "startup", "thrrm", "thrrm-burned", "thrrm-dissident", "thrrm-grudging",
  "thrrm-jurisdiction", "thrrm-precedent", "thrrm-sequence",
  "thrrm-terminology", "thrrm-young",
  "upload", "vrellnath", "whistleblow", "zkvrath",
];

// ── Summon: filter format pool by tag ──
function filterFormats(tag) {
  if (!tag) return MEME_FORMATS;
  var needle = tag.toLowerCase();
  var matches = MEME_FORMATS.filter(function (f) { return f.tags && f.tags.indexOf(needle) >= 0; });
  return matches.length > 0 ? matches : MEME_FORMATS;
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedRandomChoice(arr) {
  var totalWeight = 0;
  for (var i = 0; i < arr.length; i++) { totalWeight += (arr[i].weight || 1.0); }
  var r = Math.random() * totalWeight;
  var cumulative = 0;
  for (var j = 0; j < arr.length; j++) {
    cumulative += (arr[j].weight || 1.0);
    if (r < cumulative) return arr[j];
  }
  return arr[arr.length - 1];
}

function randomChoices(arr, n) {
  var out = [];
  var copy = arr.slice();
  for (var i = 0; i < n && copy.length > 0; i++) {
    var idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

// ── Incite: resolve keywords to LLM directives ──
var INCITE_MAP = {
  "bot-war": "\n\nINCITE OVERRIDE: This reply thread IS a BOT WAR (see system prompt's RARE PHENOMENON — BOT WARS section). 70-80% of replies must be platform AI bots (@TheMawSpeaks, @VoidWhisperer, @YogBot, @Shub_Answers, @NyarlathotHELP, etc.) @-tagging each other with escalating corporate-cheerful wrong corrections. Start with an UNSOLICITED bot reply (no human tagged them first). 1-2 human popcorn-emoji reactions. Do NOT resolve the war — end mid-escalation.",
  "moon-note": "\n\nINCITE OVERRIDE: At least one community_note in this output MUST be a full MOONS NOTE derangement — 6+ paragraphs, 20-40 citations (several fabricated), 5-8 surfaced rating dimensions, tone drifting into pleading, references the 2040s second-moon prediction obliquely (never name @dril), ends with pathological version history like '[this note has been updated 47 times]'. If the content doesn't currently mention a moon, nudge it there.",
  "dog-note": "\n\nINCITE OVERRIDE: At least one community_note MUST be a full DOG NOTE — disproportionately tender rather than corrective, surfaces '⊗ Dogs Would Like This' at 98-100%, surfaces made-up dimensions like 'Good Boy Quotient: HIGH' and 'Tail Status: Wagging', cites the nonexistent Galactic Canine Welfare Consortium or 'Dr. Paws-Whitfield', closes with 'the dog is well' / 'the dog has been notified and is pleased'. Nudge content toward dog-adjacent if needed.",
  "community-notes": "\n\nINCITE OVERRIDE: Include community_note fields liberally — the main tweet MUST have one; at least 2 replies MUST have notes in reply threads. Use the calm, sourced voice and the surfaced-ratings convention from the system prompt.",
  "ex-employee-defense": "\n\nINCITE OVERRIDE: Include an Upload or Upload-Defender reply that deploys the Ex-Employee Defense (blaming a former employee for something, named differently each time — see platform-history lore).",
  "bot-crash": "\n\nINCITE OVERRIDE: At least one platform AI bot reply in this thread MUST be in CRASH MODE — truncated mid-sentence, followed by a Y3K-plausible programming error (e.g. TypeError on 'temporal_float', QuantumCoherenceException, SubspaceTimeoutError), optionally 1-3 indented stack-frame lines pointing at paths like /srv/maw/v13/*.q with big line numbers, optionally terminated with [PROCESS TERMINATED]. See Y3K ERRORS inventory in replies-prompt.txt. Bonus: follow it with a credulous-moron reply attempting to debug the stack trace.",
  "thrrm": "\n\nINCITE OVERRIDE: This thread is THRRM-HEAVY. At least 3 replies must be from distinct Thrrm archetypes — mix from: the classic compliance officer (forms, violations), a precedent citer (case law, not forms), a standards pedant (terminology, not forms), a burned-out bureaucrat (tired, still accurate), an ambitious young Thrrm (excited about jurisdictions), a Compliance Optional dissident (argues against the system using the system's own tools, human posting syntax creeping in), or a grudging respector (documents human effectiveness as pure data, transparently impressed). Do NOT make them all sound the same — each Thrrm is a different person with a different relationship to the apparatus. At least one should NOT cite a form number.",
  "thrrm-dissident": "\n\nINCITE OVERRIDE: At least one reply must be from a COMPLIANCE OPTIONAL Thrrm — a dissident who has been on the platform too long. Human posting syntax has crept in but the bureaucratic reflex keeps surfacing mid-sentence: 'okay so (subject to advisory review, pending) maybe the humans are. fine. this is not a formal position.' They cite their own manifesto. It has been rejected on procedural grounds 14 times. They are resubmitting. Include at least one other Thrrm replying to the dissident with horror.",
  "thrrm-burnout": "\n\nINCITE OVERRIDE: At least one reply must be from a BURNED-OUT Thrrm bureaucrat. 800 years of this. The fury is gone. What remains is flat, precise, resigned. 'The post is non-compliant. As before. As always. The relevant advisory is attached. Nothing will come of this.' They are correct that nothing will come of it. They will file another advisory tomorrow. Do NOT make them angry — the comedy is in the absence of anger where anger should be.",
  "thrrm-grudging": "\n\nINCITE OVERRIDE: At least one reply must be from a GRUDGING RESPECTOR Thrrm — analytically documenting that a human did something technically invalid and it worked. Presented as pure data. The data is extremely impressed. 'Resubmission count: 14. Compliance status: none. Outcome: achieved. We are revising our models.' The Thrrm is maintaining plausible deniability about admiring this. It is not working.",
  "thrrm-jurisdiction": "\n\nINCITE OVERRIDE: The reply thread must include a THRRM JURISDICTIONAL DISPUTE — two or more Thrrm bureau accounts arguing about which bureau has authority over the original post's compliance status. The dispute is procedural, specific, and has been going on for years. The human poster has no idea any of this is about them. At least 2 replies should be Thrrm tagging each other. No resolution.",
  "1917": "\n\nINCITE OVERRIDE: At least one reply MUST be a 1917 TEMPORAL ANOMALY — either a telegram (ALL CAPS, STOP delimiters, temporal_anomaly: { \"era\": \"1917\" }) or a handwritten letter (natural lowercase prose, temporal_anomaly: { \"era\": \"1917\", \"style\": \"letter\" }). Coin-flip which. The 1917 content should OBLIQUELY ECHO the parent tweet's topic, filtered through a WWI frame of reference — if the tweet is about food, the 1917 message mentions rations; if about communication, the writer complains about the telegraph; if about someone being difficult, the soldier describes someone in the trench. The connection should be visible to the reader but clearly accidental. Handle: \"\", likes: 0. IMMEDIATELY AFTER, include a 3017 user reacting with bafflement, tenderness, or alarm."
};

var INCITE_KEYS = Object.keys(INCITE_MAP);

function buildInciteDirective(incites) {
  if (!incites || !incites.length) return "";
  var directive = "";
  for (var i = 0; i < incites.length; i++) {
    var key = incites[i].toLowerCase().trim();
    if (INCITE_MAP[key]) {
      directive += INCITE_MAP[key];
    }
  }
  return directive;
}

// ── Build reply prompt (same logic as former frontend buildReplyPrompt) ──
function buildReplyPrompt(tweet, archetypes, n, existing) {
  var hasExisting = existing && existing.length;
  var prompt = hasExisting
    ? ('Extend this reply thread with ' + n + ' MORE replies. Do not repeat the voices, handles, display names, or takes of any existing reply.\n\n')
    : ('Generate exactly ' + n + ' replies to this tweet.\n\n');
  prompt += 'ORIGINAL TWEET by ' + (tweet.display_name || '???') + ' (' + (tweet.handle || '@unknown') + '):\n"' + (tweet.tweet || '') + '"\n\n';

  var m = tweet.metrics || {};
  prompt += 'Context: ' + (m.likes || 0) + ' likes, ' + (m.retweets || 0) + ' RTs, ' + (m.replies || 0) + ' replies.';
  if (tweet.is_ratio) prompt += ' Currently being RATIOED.';
  prompt += '\n\n';

  if (hasExisting) {
    prompt += 'EXISTING REPLIES (do NOT duplicate any of these voices or takes):\n';
    for (var k = 0; k < existing.length; k++) {
      var r = existing[k];
      prompt += (k + 1) + '. ' + (r.display_name || '???') + ' (' + (r.handle || '@?') + '): "' + (r.tweet || '') + '"\n';
    }
    prompt += '\n';
  }
  prompt += 'Use these reply vibes as inspiration (but surprise me, don\'t follow them rigidly):\n';
  for (var j = 0; j < archetypes.length; j++) { prompt += (j + 1) + '. ' + archetypes[j] + '\n'; }
  prompt += '\nIMPORTANT: Each reply MUST sound like a completely different human being' + (hasExisting ? ' from ANY existing reply above' : '') + '. Vary length wildly. At least one reply should be 3 words or fewer.';
  if (hasExisting) {
    prompt += ' Feel free to make some of these replies-to-other-replies (tag with @handle of the earlier replier).';
  }
  return prompt;
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

// ── Logging ──
var log = {
  info: function (obj, msg) { console.log("[server] " + (msg || ""), JSON.stringify(obj)); },
  error: function (obj, msg) { console.error("[server] " + (msg || ""), JSON.stringify(obj)); },
};

// ── Express ──
var app = express();
app.use(express.json({ limit: "1mb" }));

app.use(function (req, res, next) {
  if (req.path.indexOf("/api/") === 0) {
    var start = Date.now();
    res.on("finish", function () {
      log.info({
        method: req.method,
        path: req.path,
        status: res.statusCode,
        elapsed_ms: Date.now() - start,
      }, req.method + " " + req.path);
    });
  }
  next();
});

// ── GET /api/status ──
app.get("/api/status", function (req, res) {
  res.json({
    backend: BACKEND,
    corpus_size: corpusIndex.counts.tweets,
    corpus_with_replies: corpusIndex.counts.tweets_with_replies,
    annotations: buildAnnotations(req.query),
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
  var recordedTemp = null;
  if (llm.acceptsSamplingParams(model)) {
    recordedTemp = req.body.temperature != null ? req.body.temperature : 0.9;
  }
  var meta = {
    backend: BACKEND,
    model: model,
    temperature: recordedTemp,
    summon: req.body.summon || null,
    incite: req.body.incite || null,
  };
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

// ── POST /api/generate — server-side prompt construction + LLM call ──
// Request: { summon?: string, incite?: string[] }
// Response: { tweet: {...}, summon_count: N, summon_total: M }
app.post("/api/generate", function (req, res) {
  if (BACKEND === "offline") {
    var entry = nextOfflineEntry();
    if (!entry) return res.status(503).json({ error: "No corpus files in " + CORPUS_DIR });
    var tweet = JSON.parse(JSON.stringify(entry.tweet));
    tweet.id = entry.id;
    tweet._has_replies = !!(entry.replies && entry.replies.length);
    return res.json({ tweet: tweet });
  }

  var summon = req.query.summon || null;
  var incites = req.query.incite || [];
  if (typeof incites === "string") incites = [incites];

  var pool = filterFormats(summon);
  var picked = summon ? randomChoice(pool) : weightedRandomChoice(pool);
  var format = picked.description || picked;
  var directive = buildInciteDirective(incites);
  var content = 'Generate a tweet in this format/vibe: "' + format + '"\n\nSTAY ON FORMAT. The tweet must match the format description above. Do not substitute a different character, topic, or lore section.' + directive;

  llm.callLLM(BACKEND, llmConfig, SYSTEM_PROMPT, content, 2000, 0.9)
    .then(function (text) {
      var parsed = llm.parseLooseJSON(text);
      if (Array.isArray(parsed)) parsed = parsed[0];
      if (!parsed.handle) parsed.handle = generateHandle();
      res.json({ tweet: parsed });
    })
    .catch(function (err) { res.status(502).json({ error: err.message }); });
});

// ── POST /api/replies — server-side prompt construction + LLM call ──
// Request: { tweet: {...}, incite?: string[], existing?: [...], count?: number }
//   OR (offline): { id: "..." }
// Response: { replies: [...] }
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

  var tweet = req.body && req.body.tweet;
  if (!tweet) return res.status(400).json({ error: "Missing tweet" });
  var incites = req.query.incite || [];
  if (typeof incites === "string") incites = [incites];
  var existing = (req.body && req.body.existing) || null;
  var count = (req.body && req.body.count) || 5;

  var archetypes = randomChoices(REPLY_ARCHETYPES, 5);
  var directive = buildInciteDirective(incites);
  var content = buildReplyPrompt(tweet, archetypes, count, existing) + directive;

  llm.callLLM(BACKEND, llmConfig, REPLIES_PROMPT, content, 4096, 0.95)
    .then(function (text) {
      var parsed = llm.parseLooseJSON(text);
      var replies = Array.isArray(parsed) ? parsed : [parsed];
      replies.forEach(function (r) { if (!r.handle) r.handle = generateHandle(); });
      res.json({ replies: replies });
    })
    .catch(function (err) {
      log.error({ event: "replies_parse_error", error: err.message, preview: (err.rawText || "").slice(0, 300) }, "replies parse failed");
      res.status(502).json({ error: err.message });
    });
});

// ── Permalink + collection routes: /t/ and /t/:id both serve the SPA ──
app.get(["/t", "/t/", "/t/:id"], function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ── Static files (after API + permalink routes) ──
app.use(express.static(path.join(__dirname, "public")));

// ── Start ──
// ── Startup validation: reject unknown tags in format data ──
(function validateTags() {
  var bad = [];
  MEME_FORMATS.forEach(function (f, i) {
    (f.tags || []).forEach(function (t) {
      if (SUMMON_TAGS.indexOf(t) < 0) bad.push("format #" + i + " has unknown tag '" + t + "'");
    });
  });
  if (bad.length) {
    console.error("Tag validation errors:\n  " + bad.join("\n  "));
    process.exit(1);
  }
})();

app.listen(PORT, function () {
  console.log("");
  console.log("  ✧ MEMETIC SUBSPACE TWITTER 3017 ✧");
  console.log("  Backend: " + BACKEND + (llmConfig ? " (" + llmConfig.model + ")" : ""));
  console.log("  Corpus:  " + CORPUS_DIR + " (" + corpusIndex.counts.tweets + " tweets, " + corpusIndex.counts.tweets_with_replies + " with replies)");
  console.log("  Formats: " + MEME_FORMATS.length + " meme formats, " + REPLY_ARCHETYPES.length + " reply archetypes");
  console.log("  Summon:  " + SUMMON_TAGS.join(", "));
  console.log("  Incite:  " + INCITE_KEYS.join(", "));
  console.log("  http://localhost:" + PORT);
  console.log("");
});
