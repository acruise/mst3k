#!/usr/bin/env node
// generate.js — Corpus generator using the Anthropic Message Batches API
// Submits all requests as a single batch (50% cheaper, much faster).
// Falls back to sequential mode for Ollama.
// Node 16 compatible.

var fs = require("fs");
var path = require("path");
var https = require("https");
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

// ── Parse args ──
var args = process.argv.slice(2);
var count = 10;
var withReplies = false;
var corpusDir = path.join(__dirname, "corpus");

for (var i = 0; i < args.length; i++) {
  if (args[i] === "--count" && args[i + 1]) { count = parseInt(args[++i], 10); }
  else if (args[i] === "--per-request" && args[i + 1]) { TWEETS_PER_REQUEST = parseInt(args[++i], 10); }
  else if (args[i] === "--replies") { withReplies = true; }
  else if (args[i] === "--corpus-dir" && args[i + 1]) { corpusDir = args[++i]; }
  else if (args[i] === "--help" || args[i] === "-h") {
    console.log("Usage: node generate.js [options]");
    console.log("");
    console.log("Options:");
    console.log("  --count N            Number of tweets to generate (default: 10)");
    console.log("  --per-request N      Tweets per batch request (default: 50)");
    console.log("  --replies            Also generate reply threads for each tweet");
    console.log("  --corpus-dir DIR     Output directory (default: ./corpus)");
    console.log("");
    console.log("Uses the Anthropic Batch API (50% cheaper, async).");
    console.log("Falls back to sequential mode for Ollama.");
    console.log("Reads backend config from .env (same as server.js)");
    process.exit(0);
  }
}

// ── Load data files ──
var dataDir = path.join(__dirname, "public", "data");
var MEME_FORMATS = JSON.parse(fs.readFileSync(path.join(dataDir, "meme-formats.json"), "utf8"));
var REPLY_ARCHETYPES = JSON.parse(fs.readFileSync(path.join(dataDir, "reply-archetypes.json"), "utf8"));
var HANDLES = JSON.parse(fs.readFileSync(path.join(dataDir, "handles.json"), "utf8"));
var SYSTEM_PROMPT = fs.readFileSync(path.join(dataDir, "system-prompt.txt"), "utf8");
var REPLIES_SYSTEM_PROMPT = fs.readFileSync(path.join(dataDir, "replies-prompt.txt"), "utf8");

// ── Config ──
var BACKEND = process.env.BACKEND || "anthropic";
var API_KEY = process.env.ANTHROPIC_API_KEY || "";
var MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

// ── Helpers ──
function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomChoices(arr, n) {
  var s = arr.slice().sort(function () { return Math.random() - 0.5; });
  return s.slice(0, n);
}
function generateHandle() {
  var p = Math.random() > 0.4 ? randomChoice(HANDLES.prefixes) : "";
  return ("@" + p + randomChoice(HANDLES.roots) + randomChoice(HANDLES.suffixes)).replace(/\s/g, "_").toLowerCase();
}
function fmt(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return String(n);
}
function pfpColor() {
  return "hsl(" + Math.floor(Math.random()*360) + "," + (40+Math.floor(Math.random()*40)) + "%," + (25+Math.floor(Math.random()*35)) + "%)";
}
function pfpGlyph() {
  var g = "◉◎●◐◑◒◓☉⊕⊗△▽◇⬡⬢⏣⏢⎔⌬⏁ψΩλΣΞΘΦΔΓΨ✧✦⚝✶✴✳❋❊✿❃☾☽♄♃♅♆⚳⚴✡☍";
  return g[Math.floor(Math.random() * g.length)];
}
function timestamp() {
  var units = ["s", "m", "h", "d"];
  var u = randomChoice(units);
  var mx = u === "s" ? 59 : u === "m" ? 59 : u === "h" ? 23 : 30;
  return (Math.floor(Math.random() * mx) + 1) + u;
}

function sleep(ms) {
  return new Promise(function (resolve) { setTimeout(resolve, ms); });
}

// ── Anthropic HTTP helpers ──
function anthropicRequest(method, apiPath, body) {
  return new Promise(function (resolve, reject) {
    var payload = body ? JSON.stringify(body) : "";
    var options = {
      hostname: "api.anthropic.com",
      port: 443,
      path: apiPath,
      method: method,
      headers: {
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
    };
    if (payload) options.headers["content-length"] = Buffer.byteLength(payload);

    var req = https.request(options, function (res) {
      var chunks = [];
      res.on("data", function (c) { chunks.push(c); });
      res.on("end", function () {
        var raw = Buffer.concat(chunks).toString();
        try {
          resolve({ status: res.statusCode, data: JSON.parse(raw), raw: raw });
        } catch (e) {
          resolve({ status: res.statusCode, data: null, raw: raw });
        }
      });
    });
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function anthropicStreamResults(url) {
  // Fetch JSONL results, return array of parsed lines
  return new Promise(function (resolve, reject) {
    var parsed = new URL(url);
    var options = {
      hostname: parsed.hostname,
      port: 443,
      path: parsed.pathname + parsed.search,
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
      },
    };
    var req = https.request(options, function (res) {
      var chunks = [];
      res.on("data", function (c) { chunks.push(c); });
      res.on("end", function () {
        var raw = Buffer.concat(chunks).toString();
        var lines = raw.trim().split("\n").filter(function (l) { return l.trim(); });
        var results = [];
        lines.forEach(function (line) {
          try { results.push(JSON.parse(line)); } catch (e) {}
        });
        resolve(results);
      });
    });
    req.on("error", reject);
    req.end();
  });
}

// ── Build batch requests (10 tweets per request for efficiency) ──
var TWEETS_PER_REQUEST = 50;

function buildTweetBatchRequest(batchIdx, formats) {
  var formatList = formats.map(function (f, i) { return (i + 1) + ". " + f; }).join("\n");
  var params = {
    model: MODEL,
    max_tokens: Math.min(formats.length * 600, 64000),
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{
      role: "user",
      content: "Generate exactly " + formats.length + " tweets, one for each format below. Return a JSON ARRAY of tweet objects.\n\n" + formatList,
    }],
  };
  if (llm.acceptsSamplingParams(MODEL)) params.temperature = 0.9;
  return {
    custom_id: "tweets-" + String(batchIdx).padStart(4, "0"),
    params: params,
  };
}

function buildReplyRequest(idx, tweet) {
  var archetypes = randomChoices(REPLY_ARCHETYPES, 5);
  var n = 4 + Math.floor(Math.random() * 3);
  var prompt = "Generate exactly " + n + " replies to this tweet.\n\n" +
    "ORIGINAL TWEET by " + tweet.display_name + " (" + tweet.handle + "):\n" +
    '"' + tweet.tweet + '"\n\n' +
    "Context: " + fmt(tweet.metrics.likes) + " likes, " + fmt(tweet.metrics.retweets) + " RTs, " +
    fmt(tweet.metrics.replies) + " replies." + (tweet.is_ratio ? " Currently being RATIOED." : "") + "\n\n" +
    "Use these reply vibes as inspiration (but surprise me, don't follow them rigidly):\n";
  for (var j = 0; j < archetypes.length; j++) { prompt += (j + 1) + ". " + archetypes[j] + "\n"; }
  prompt += "\nIMPORTANT: Each reply MUST sound like a completely different human being. Vary length wildly. At least one reply should be 3 words or fewer.";

  var params = {
    model: MODEL,
    max_tokens: 2000,
    system: [
      {
        type: "text",
        text: REPLIES_SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: prompt }],
  };
  if (llm.acceptsSamplingParams(MODEL)) params.temperature = 0.95;
  return {
    custom_id: "reply-" + String(idx).padStart(4, "0"),
    params: params,
  };
}

function parseResult(result) {
  if (result.result && result.result.type === "succeeded" && result.result.message) {
    var text = "";
    result.result.message.content.forEach(function (b) {
      if (b.type === "text") text += b.text;
    });
    return llm.parseResponse(text);
  }
  return null;
}

function enrichTweet(parsed) {
  return {
    display_name: parsed.display_name || "???",
    handle: parsed.handle || generateHandle(),
    tweet: parsed.tweet || "",
    metrics: parsed.metrics || { retweets: 0, likes: 0, replies: 0, quote_tweets: 0 },
    verified: parsed.verified || 0,
    is_ratio: parsed.is_ratio || false,
    community_note: parsed.community_note || null,
    pfpColor: pfpColor(),
    pfpGlyph: pfpGlyph(),
    timestamp: timestamp(),
  };
}

function enrichReplies(parsed) {
  return parsed.map(function (r) {
    return {
      display_name: r.display_name || "???",
      handle: r.handle || generateHandle(),
      tweet: r.tweet || "",
      likes: r.likes || 0,
      verified: r.verified || 0,
      community_note: r.community_note || null,
      pfpColor: pfpColor(),
      pfpGlyph: pfpGlyph(),
      timestamp: timestamp(),
    };
  });
}

// ── Batch mode (Anthropic) ──
function runBatch() {
  if (!fs.existsSync(corpusDir)) fs.mkdirSync(corpusDir, { recursive: true });

  var numTweetRequests = Math.ceil(count / TWEETS_PER_REQUEST);
  var totalRequests = numTweetRequests + (withReplies ? count : 0);
  console.log("");
  console.log("  ✧ MEMETIC SUBSPACE TWITTER 3017 — Batch Generator ✧");
  console.log("  Model: " + MODEL);
  console.log("  Generating: " + count + " tweets" + (withReplies ? " + replies" : ""));
  console.log("  Batch requests: " + numTweetRequests + " tweet reqs (" + TWEETS_PER_REQUEST + " per)" + (withReplies ? " + up to " + count + " reply reqs" : ""));
  console.log("  Prompt caching: enabled (system prompt cached after first request)");
  console.log("  Output: " + corpusDir);
  console.log("");

  // Phase 1: Build multi-tweet batch requests
  console.log("  Phase 1: Submitting " + numTweetRequests + " requests for " + count + " tweets...");
  var tweetRequests = [];
  var remaining = count;
  for (var b = 0; remaining > 0; b++) {
    var batchSize = Math.min(TWEETS_PER_REQUEST, remaining);
    var formats = [];
    for (var j = 0; j < batchSize; j++) {
      formats.push(randomChoice(MEME_FORMATS));
    }
    tweetRequests.push(buildTweetBatchRequest(b, formats));
    remaining -= batchSize;
  }

  return anthropicRequest("POST", "/v1/messages/batches", { requests: tweetRequests })
    .then(function (res) {
      if (res.status !== 200) {
        throw new Error("Batch creation failed (" + res.status + "): " + res.raw.slice(0, 300));
      }
      var batchId = res.data.id;
      console.log("  Batch submitted: " + batchId);
      return pollBatch(batchId);
    })
    .then(function (batch) {
      console.log("  Tweet batch complete. Fetching results...");
      return anthropicStreamResults(batch.results_url);
    })
    .then(function (tweetResults) {
      // Each result contains an array of tweets — flatten them
      var allTweets = [];
      var failed = 0;

      tweetResults.forEach(function (r) {
        try {
          var parsed = parseResult(r);
          if (!parsed) { failed++; return; }
          // Could be a single tweet object or an array
          var arr = Array.isArray(parsed) ? parsed : [parsed];
          arr.forEach(function (t) {
            allTweets.push(enrichTweet(t));
          });
        } catch (e) {
          failed++;
        }
      });

      // Trim to requested count in case we got extras
      if (allTweets.length > count) allTweets = allTweets.slice(0, count);

      console.log("  Tweets: " + allTweets.length + " parsed" + (failed > 0 ? ", " + failed + " request(s) failed" : ""));

      // Write corpus files IMMEDIATELY — don't wait for replies
      var filenames = [];
      var batchTs = Date.now();
      allTweets.forEach(function (tweet, i) {
        var filename = batchTs + "-" + String(i).padStart(4, "0") + ".json";
        var id = filename.replace(/\.json$/, "");
        filenames.push(filename);
        var doc = {
          id: id,
          tweet: tweet,
          replies: null,
          generated_at: new Date().toISOString(),
          backend: "anthropic",
          model: MODEL,
          temperature: 0.9,
        };
        fs.writeFileSync(path.join(corpusDir, filename), JSON.stringify(doc, null, 2));
      });
      console.log("  Written: " + allTweets.length + " corpus files (tweets only)");

      if (!withReplies) {
        return;
      }

      // Phase 2: Submit reply batch (one request per tweet)
      console.log("");
      console.log("  Phase 2: Submitting " + allTweets.length + " reply requests...");
      var replyRequests = [];
      allTweets.forEach(function (tweet, i) {
        replyRequests.push(buildReplyRequest(i, tweet));
      });

      return anthropicRequest("POST", "/v1/messages/batches", { requests: replyRequests })
        .then(function (res2) {
          if (res2.status !== 200) {
            throw new Error("Reply batch creation failed (" + res2.status + "): " + res2.raw.slice(0, 300));
          }
          var batchId2 = res2.data.id;
          console.log("  Batch submitted: " + batchId2);
          return pollBatch(batchId2);
        })
        .then(function (batch2) {
          console.log("  Reply batch complete. Fetching results...");
          return anthropicStreamResults(batch2.results_url);
        })
        .then(function (replyResults) {
          var rSucceeded = 0;
          var rFailed = 0;

          // Update existing corpus files in-place with replies
          replyResults.forEach(function (r) {
            var idx = parseInt(r.custom_id.replace("reply-", ""), 10);
            try {
              var parsed = parseResult(r);
              if (parsed && filenames[idx]) {
                var filepath = path.join(corpusDir, filenames[idx]);
                var doc = JSON.parse(fs.readFileSync(filepath, "utf8"));
                doc.replies = enrichReplies(parsed);
                fs.writeFileSync(filepath, JSON.stringify(doc, null, 2));
                rSucceeded++;
              } else {
                rFailed++;
              }
            } catch (e) {
              rFailed++;
            }
          });

          console.log("  Replies: " + rSucceeded + " merged into corpus files, " + rFailed + " failed");
        });
    });
}

function pollBatch(batchId) {
  var startTime = Date.now();
  function poll() {
    return anthropicRequest("GET", "/v1/messages/batches/" + batchId)
      .then(function (res) {
        if (res.status !== 200) {
          throw new Error("Poll failed: " + res.raw.slice(0, 200));
        }
        var batch = res.data;
        var counts = batch.request_counts || {};
        var elapsed = Math.round((Date.now() - startTime) / 1000);
        var status = "  [" + elapsed + "s] " + batch.processing_status +
          " — done: " + ((counts.succeeded || 0) + (counts.errored || 0) + (counts.canceled || 0) + (counts.expired || 0)) +
          "/" + ((counts.succeeded || 0) + (counts.errored || 0) + (counts.canceled || 0) + (counts.expired || 0) + (counts.processing || 0));
        process.stdout.write("\r" + status + "   ");

        if (batch.processing_status === "ended") {
          process.stdout.write("\n");
          return batch;
        }
        return sleep(5000).then(poll);
      });
  }
  return poll();
}

// ── Sequential mode (Ollama fallback) ──
function runSequential() {
  if (!fs.existsSync(corpusDir)) fs.mkdirSync(corpusDir, { recursive: true });

  var ollamaConfig = { model: process.env.OLLAMA_MODEL || "llama3.1:70b", baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434" };

  console.log("");
  console.log("  ✧ MEMETIC SUBSPACE TWITTER 3017 — Sequential Generator ✧");
  console.log("  Backend: ollama (" + ollamaConfig.model + ")");
  console.log("  Generating: " + count + " tweets" + (withReplies ? " + replies" : ""));
  console.log("  Output: " + corpusDir);
  console.log("  Note: Batch API not available for Ollama, running sequentially");
  console.log("");

  var generated = 0;
  var failed = 0;

  function next() {
    if (generated + failed >= count) {
      console.log("");
      console.log("  Done: " + generated + " generated, " + failed + " failed");
      return Promise.resolve();
    }

    var idx = generated + failed + 1;
    var format = randomChoice(MEME_FORMATS);
    process.stdout.write("  [" + idx + "/" + count + "] tweet... ");

    return llm.callLLM("ollama", ollamaConfig, SYSTEM_PROMPT, 'Generate a tweet in this format/vibe: "' + format + '"')
      .then(function (raw) {
        var tweet = enrichTweet(llm.parseResponse(raw));
        process.stdout.write("✓");

        if (!withReplies) {
          var filename = Date.now() + "-" + String(idx).padStart(4, "0") + ".json";
          var id0 = filename.replace(/\.json$/, "");
          fs.writeFileSync(path.join(corpusDir, filename), JSON.stringify({ id: id0, tweet: tweet, replies: null, generated_at: new Date().toISOString(), backend: "ollama", model: ollamaConfig.model, temperature: 0.9 }, null, 2));
          generated++;
          process.stdout.write(" → " + filename + "\n");
          return sleep(500);
        }

        process.stdout.write(" + replies... ");
        var archetypes = randomChoices(REPLY_ARCHETYPES, 5);
        var n = 4 + Math.floor(Math.random() * 3);
        var prompt = "Generate exactly " + n + " replies to this tweet.\n\nORIGINAL TWEET by " + tweet.display_name + " (" + tweet.handle + "):\n\"" + tweet.tweet + "\"\n\nContext: " + fmt(tweet.metrics.likes) + " likes, " + fmt(tweet.metrics.retweets) + " RTs, " + fmt(tweet.metrics.replies) + " replies." + (tweet.is_ratio ? " Currently being RATIOED." : "") + "\n\nUse these reply vibes as inspiration:\n";
        for (var j = 0; j < archetypes.length; j++) { prompt += (j+1) + ". " + archetypes[j] + "\n"; }
        prompt += "\nIMPORTANT: Each reply MUST sound like a completely different human being. Vary length wildly. At least one reply should be 3 words or fewer.";

        return llm.callLLM("ollama", ollamaConfig, REPLIES_SYSTEM_PROMPT, prompt, 2000, 0.95)
          .then(function (raw2) {
            var replies = enrichReplies(llm.parseResponse(raw2));
            var filename = Date.now() + "-" + String(idx).padStart(4, "0") + ".json";
            var id1 = filename.replace(/\.json$/, "");
            fs.writeFileSync(path.join(corpusDir, filename), JSON.stringify({ id: id1, tweet: tweet, replies: replies, generated_at: new Date().toISOString(), backend: "ollama", model: ollamaConfig.model, temperature: 0.9 }, null, 2));
            generated++;
            process.stdout.write("✓ (" + replies.length + ") → " + filename + "\n");
            return sleep(500);
          })
          .catch(function (e) {
            var filename = Date.now() + "-" + String(idx).padStart(4, "0") + ".json";
            var id2 = filename.replace(/\.json$/, "");
            fs.writeFileSync(path.join(corpusDir, filename), JSON.stringify({ id: id2, tweet: tweet, replies: null, generated_at: new Date().toISOString(), backend: "ollama", model: ollamaConfig.model, temperature: 0.9 }, null, 2));
            generated++;
            process.stdout.write("✗ replies failed → " + filename + "\n");
            return sleep(500);
          });
      })
      .catch(function (e) {
        failed++;
        process.stdout.write("✗ " + e.message.slice(0, 80) + "\n");
        return sleep(1000);
      })
      .then(next);
  }

  return next();
}

// ── Main ──
function main() {
  if (BACKEND === "ollama") {
    return runSequential();
  }
  if (!API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY not set. Add it to .env or pass as env var.");
    process.exit(1);
  }
  return runBatch();
}

main()
  .then(function () {
    var files = [];
    try { files = fs.readdirSync(corpusDir).filter(function (f) { return f.endsWith(".json"); }); } catch (e) {}
    console.log("");
    console.log("  Corpus: " + corpusDir + " (" + files.length + " total files)");
    console.log("  Run with BACKEND=offline to serve these without an LLM");
    console.log("");
  })
  .catch(function (err) {
    console.error("\nFatal:", err.message || err);
    process.exit(1);
  });
