/* ───────────────────────── terms of engagement ───────────────────────── */
function acceptTos() {
  localStorage.setItem('mst3k_tos', '1');
  document.getElementById('tosOverlay').style.display = 'none';
}
function declineTos() {
  document.getElementById('tosEntityCount').style.display = 'none';
  var msg = document.getElementById('tosDeclineMsg');
  msg.style.display = 'block';
  document.querySelector('.tos-body').scrollTop = 0;
}
(function() {
  if (!localStorage.getItem('mst3k_tos')) {
    document.getElementById('tosOverlay').style.display = 'flex';
  }
})();

/* ───────────────────────── init ───────────────────────── */
var dataReady = false;
var queryString = window.location.search || "";

function loadData() {
  return fetch("/api/status" + queryString)
    .then(function (r) { return r.json(); })
    .then(function (s) {
      backendMode = s.backend || "anthropic";
      dataReady = true;
      document.getElementById("btnGenerate").disabled = false;
      document.getElementById("btnBatch").disabled = false;
      document.getElementById("btnGenerate").textContent = "⚡ INTERCEPT TRANSMISSION";
      if (backendMode === "offline") {
        document.getElementById("subheader").textContent = "subspace feed \u2022 OFFLINE MODE \u2022 archived transmissions";
      }
      if (s.annotations && s.annotations.length) {
        var sub = document.getElementById("subheader");
        for (var i = 0; i < s.annotations.length; i++) {
          sub.textContent += "  ·  " + s.annotations[i];
        }
      }
      return loadPermalinkIfAny();
    })
    .catch(function () {
      backendMode = "anthropic";
      dataReady = true;
      document.getElementById("btnGenerate").disabled = false;
      document.getElementById("btnBatch").disabled = false;
      document.getElementById("btnGenerate").textContent = "⚡ INTERCEPT TRANSMISSION";
      return loadPermalinkIfAny();
    });
}

function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

function loadInitialFeed() {
  return fetch("/api/tweets").then(function (r) {
    return r.ok ? r.json() : { tweets: [] };
  }).then(function (data) {
    var items = (data && data.tweets) || [];
    if (!items.length) return;
    shuffleArray(items);
    items = items.slice(0, 30);
    items.forEach(function (item) {
      var t = buildTweetState(item.tweet);
      t.id = item.id;
      t._has_replies = !!item.has_replies;
      tweets.push(t);
    });
    generatedCount = tweets.length;
    renderFeed();
  }).catch(function () {});
}

function loadPermalinkIfAny() {
  var path = window.location.pathname;
  var profileMatch = path.match(/^\/u\/(.+)$/);
  if (profileMatch) {
    var pHandle = decodeURIComponent(profileMatch[1]);
    if (pHandle.charAt(0) !== "@") pHandle = "@" + pHandle;
    return loadProfile(pHandle);
  }
  if (path === "/t" || path === "/t/") return loadCollection();
  var m = path.match(/^\/t\/([A-Za-z0-9][A-Za-z0-9_-]{0,63})$/);
  if (!m) return loadInitialFeed();
  var id = m[1];
  var bar = document.querySelector(".action-bar");
  if (bar) bar.innerHTML = '<button class="btn-generate" onclick="history.back()" style="flex:1">⟵ RETURN TO FEED TIMELINE</button>';
  return fetchTweetById(id).then(function (doc) {
    if (!doc || !doc.tweet) {
      document.getElementById("emptyState").innerHTML =
        '<div class="empty-orb">⌀</div>' +
        '<div class="empty-title">TWEET NOT FOUND</div>' +
        '<div class="empty-sub">id: ' + esc(id) + '</div>';
      return;
    }
    var t = buildTweetState(doc.tweet);
    t.id = doc.id;
    t._has_replies = !!(doc.replies && doc.replies.length);
    tweets.unshift(t);
    generatedCount++;
    if (doc.replies && doc.replies.length) {
      expandedId = t.uiId;
      repliesCache[t.uiId] = doc.replies.map(enrichReply);
    }
    renderFeed();
    setTimeout(function () {
      var hash = window.location.hash || "";
      var rm = hash.match(/^#r-(\d+)$/);
      if (rm) {
        var el = document.getElementById("r-" + rm[1] + "-" + t.uiId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);
  });
}

function loadCollection() {
  return fetch("/api/tweets").then(function (r) {
    return r.ok ? r.json() : { tweets: [] };
  }).then(function (data) {
    var items = (data && data.tweets) || [];
    items = items.slice().reverse();
    items.forEach(function (item) {
      var t = buildTweetState(item.tweet);
      t.id = item.id;
      t._has_replies = !!item.has_replies;
      tweets.push(t);
    });
    generatedCount = tweets.length;
    var sub = document.getElementById("subheader");
    if (sub) sub.textContent = "subspace archive \u2022 " + items.length + " dispatches \u2022 click to expand replies";
    renderFeed();
  }).catch(function (err) {
    console.error("Collection load failed:", err);
    document.getElementById("emptyState").innerHTML =
      '<div class="empty-orb">⌀</div>' +
      '<div class="empty-title">ARCHIVE UNAVAILABLE</div>' +
      '<div class="empty-sub">failed to load /api/tweets</div>';
  });
}

loadData();

/* ───────────────────────── state ───────────────────────── */
var tweets = [];
var generatedCount = 0;
var loading = false;
var expandedId = null;
var repliesCache = {};
var repliesLoading = null;
var epoch = String(Math.floor(Math.random() * 365)).padStart(3, "0");
var backendMode = "unknown";

/* ───────────────────────── helpers ───────────────────────── */
function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomChoices(arr, n) {
  var s = arr.slice().sort(function () { return Math.random() - 0.5; });
  return s.slice(0, n);
}
function fmt(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return String(n);
}
function ts() {
  var units = ["s", "m", "h", "d"];
  var u = randomChoice(units);
  var mx = u === "s" ? 59 : u === "m" ? 59 : u === "h" ? 23 : 30;
  return (Math.floor(Math.random() * mx) + 1) + u;
}
function pfpColor() {
  return "hsl(" + Math.floor(Math.random()*360) + "," + (40+Math.floor(Math.random()*40)) + "%," + (25+Math.floor(Math.random()*35)) + "%)";
}
function pfpGlyph() {
  var g = "◉◎●◐◑◒◓☉⊕⊗△▽◇⬡⬢⏣⏢⎔⌬⏁ψΩλΣΞΘΦΔΓΨ✧✦⚝✶✴✳❋❊✿❃☾☽♄♃♅♆⚳⚴✡☍";
  return g[Math.floor(Math.random() * g.length)];
}
function esc(s) {
  var d = document.createElement("div"); d.textContent = s; return d.innerHTML;
}
function profileUrl(handle, ctx) {
  var bare = (handle || "").replace(/^@/, "");
  var url = "/u/" + encodeURIComponent(bare);
  if (ctx) {
    var params = [];
    if (ctx.display_name) params.push("dn=" + encodeURIComponent(ctx.display_name));
    if (ctx.tweet) params.push("t=" + encodeURIComponent(ctx.tweet.slice(0, 140)));
    if (ctx.verified) params.push("v=" + ctx.verified);
    if (ctx.falgsc_sigil) params.push("fg=1");
    if (params.length) url += "?" + params.join("&");
  }
  return url;
}

function renderNote(note) {
  if (!note || !note.text) return "";
  var type = note.contributor_type || "community";
  var label = type === "thrrm" ? "BUREAU COMPLIANCE NOTE"
    : type === "vrellnath" ? "COLLECTIVE-AUTHORED CONTEXT"
    : type === "ai_bot" ? "PLATFORM AUTO-CONTEXT"
    : "READERS ADDED CONTEXT";
  var html = '<div class="cnote cnote-' + type + '">';
  html += '<div class="cnote-header"><span class="cnote-header-icon">⚠</span> ' + label + '</div>';
  html += '<div class="cnote-text">' + esc(note.text) + '</div>';

  var ratings = note.surfaced_ratings || [];
  if (!ratings.length && (note.helpful_votes || note.not_helpful_votes)) {
    var helpful = note.helpful_votes || 0;
    var notHelpful = note.not_helpful_votes || 0;
    var total = helpful + notHelpful;
    if (total > 0) {
      ratings = [{ glyph: "✓", label: "Epistemically Sound", value: Math.round((helpful / total) * 100) + "%" }];
      if (!note.total_raters) note.total_raters = total;
    }
  }

  if (ratings.length) {
    html += '<div class="cnote-ratings">';
    for (var i = 0; i < ratings.length; i++) {
      var r = ratings[i];
      html += '<span class="cnote-rating"><span class="cnote-glyph">' + esc(r.glyph || "·") + '</span>';
      html += '<span class="cnote-label">' + esc(r.label || "") + '</span>';
      html += '<span class="cnote-value">' + esc(r.value || "—") + '</span></span>';
    }
    html += '</div>';
  }
  if (note.total_raters) {
    html += '<div class="cnote-votes">' + fmt(note.total_raters) + ' contributors rated this note · ratings surfaced by algorithm</div>';
  }
  html += '</div>';
  return html;
}

/* ───────────────────────── JSON parsing (LLM output is unreliable) ─── */
function parseLooseJSON(raw) {
  try { return JSON.parse(raw); } catch (e) {}

  var start = -1, ch = '';
  for (var i = 0; i < raw.length; i++) {
    if (raw[i] === '{' || raw[i] === '[') { start = i; ch = raw[i]; break; }
  }
  if (start >= 0) {
    var close = ch === '{' ? '}' : ']';
    var end = raw.lastIndexOf(close);
    if (end > start) {
      var slice = raw.slice(start, end + 1);
      try { return JSON.parse(slice); } catch (e2) {}
      var fixed = slice
        .replace(/,\s*([}\]])/g, '$1')
        .replace(/([{,]\s*)([a-zA-Z_]\w*)\s*:/g, '$1"$2":')
        .replace(/\/\/[^\n]*/g, '')
        .replace(/\/\*[\s\S]*?\*\//g, '');
      try { return JSON.parse(fixed); } catch (e3) {}
    }
  }

  throw new SyntaxError("No valid JSON found in LLM response (model may have refused or responded conversationally): " + raw.slice(0, 200));
}

/* ───────────────────────── API ───────────────────────── */
function generateViaAPI() {
  return fetch("/api/generate" + queryString, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  })
  .then(function (r) {
    if (!r.ok) return r.text().then(function (t) { throw new Error("API " + r.status + ": " + t); });
    return r.json();
  })
  .then(function (data) { return data.tweet; });
}

function repliesViaAPI(tweet, existing, count) {
  return fetch("/api/replies" + queryString, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tweet: { display_name: tweet.display_name, handle: tweet.handle, tweet: tweet.tweet, metrics: tweet.metrics, is_ratio: tweet.is_ratio },
      existing: existing || null,
      count: count || 5,
    }),
  })
  .then(function (r) {
    if (!r.ok) return r.text().then(function (t) { throw new Error("API " + r.status + ": " + t); });
    return r.json();
  })
  .then(function (data) { return data.replies || []; });
}

/* ───────────────────────── corpus save helpers ───────────────────────── */
function saveTweetToCorpus(tweet) {
  if (backendMode === "offline") return Promise.resolve(null);
  return fetch("/api/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tweet: tweet,
    }),
  })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) { return (data && data.id) || null; })
    .catch(function () { return null; });
}

function saveRepliesToCorpus(id, replies) {
  if (!id || backendMode === "offline") return Promise.resolve();
  return fetch("/api/save-replies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, replies: replies }),
  }).catch(function () {});
}

function fetchTweetById(id) {
  return fetch("/api/tweet/" + encodeURIComponent(id))
    .then(function (r) { return r.ok ? r.json() : null; })
    .catch(function () { return null; });
}

/* ───────────────────────── sigil SVG ───────────────────────── */
var SIGIL_TOOLTIPS = {
  1: {
    base: "Tier 1 — Noticed. Entry-level paid sigil.",
    variants: [
      "Tier 1 — Noticed. He has paid 8 credits this cycle. He believes this has changed something.",
      "Tier 1 — Noticed. Nobody has noticed.",
      "Tier 1. They think this makes people like them. It does not. That is the product.",
      "Tier 1 — the sigil is rendered 40% transparent for a reason.",
      "Tier 1 — Noticed. Lowest-engagement tier we sell. We make ~3 credits/cycle off this account. We make ~3 credits/cycle off eight hundred million accounts.",
      "Tier 1. Paying to be Noticed. The account has not been Noticed. The billing system has.",
    ],
  },
  2: {
    base: "Tier 2 — Ascended. Standard paid tier.",
    variants: [
      "Tier 2 — Ascended. We have read her drafts.",
      "Tier 2. ~40 credits/cycle. Posts boosted 0.3% in the algorithm; she believes it is more.",
      "Tier 2 — Ascended. Pays to be confidently wrong at a heavier font weight.",
      "Tier 2. Bulk revenue. Several hundred million of these.",
      "Tier 2 — Ascended. Renewed automatically for 47 years. Reviews the statement annually; has not cancelled.",
      "Tier 2. Standard insufferable. Thank you for your subscription.",
    ],
  },
  3: {
    base: "Tier 3 — Illuminated. Rare — self-appointed thought-leader tier with rotating geometry.",
    variants: [
      "Tier 3 — Illuminated. Self-appointed thought leader since 2847. Paying 200 credits/cycle. Believes it was his idea.",
      "Tier 3. She has generated ~89,000 credits lifetime in revenue for us. This is not a lot. It is steady.",
      "Tier 3 — Illuminated. The rotating geometry is powered by her monthly subscription. When she pauses payment the geometry pauses too.",
      "Tier 3. We've been skimming 14% of his disposable income for 47 years. He has not noticed. Neither has his accountant.",
      "Tier 3 — Illuminated. Paid a supplementary fee to have 'Dr.' prepended in API responses. The 'Dr.' is not honorary in any recognized institution.",
      "Tier 3. Thought-leader rate. Includes the right to cite yourself in a thread and have the sigil flare a little on cite.",
    ],
  },
  4: {
    base: "Tier 4 — Unspeakable. Cost unknown.",
    variants: [
      "Tier 4 — Unspeakable. We don't know what this costs. We just keep accepting the credits.",
      "Tier 4. The sigil has an eye. The eye watches. We don't know why.",
      "Tier 4. The contract is 4,891 pages. The lawyers refuse to reopen it.",
      "Tier 4 — Unspeakable. Cost possibly non-monetary. Account does not respond to billing inquiries. We have stopped sending them.",
      "Tier 4. They pay whatever it costs and we don't ask questions. It has been very good for the quarterly numbers.",
      "Tier 4 — Unspeakable. Documentation for this tier was written by the previous committee, who resigned.",
    ],
  },
};

var FALGSC_TOOLTIPS = {
  base: "FALGSC Community-Verified. Granted by consensus, not purchased.",
  variants: [
    "FALGSC-verified. Approved by 14.4 million neighbors in a 90-second vote. Nobody abstained. This is normal for them.",
    "Community-verified. The sigil costs nothing. The application is one question: 'do you live here?' The verification rate is 100%. The false-positive rate is 0%. We do not understand this.",
    "FALGSC-verified. They tried to give us feedback about the corporate sigil system. The feedback was 211 pages. It was polite. It was devastating.",
    "Community-verified. Post-scarcity polity. Their credits are a courtesy; they don't need them. This makes the billing team uneasy.",
    "FALGSC-verified. Granted by the commune, not the platform. The platform has been asked to stop claiming credit. The platform has not stopped.",
    "Community-verified. The verification committee meets over breakfast. Breakfast is provided. Everything is provided. That's the whole thing.",
  ],
};

function sigilStringHash(s) {
  var h = 0;
  for (var i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; }
  return Math.abs(h);
}

function pickSigilTooltip(tier, handle) {
  var entry = SIGIL_TOOLTIPS[tier];
  if (!entry) return "";
  var seed = handle ? sigilStringHash(handle) : Math.floor(Math.random() * 1000000);
  if ((seed % 100) < 35 && entry.variants.length) {
    return entry.variants[seed % entry.variants.length];
  }
  return entry.base;
}

function sigilSVG(tier, small, handle) {
  if (!tier || tier < 1) return "";
  var sz = small ? 16 : 20;
  var id = "sg" + Math.random().toString(36).slice(2, 7);
  var ttl = esc(pickSigilTooltip(tier, handle));
  if (tier === 1) {
    return '<span class="sigil sigil-t1" title="'+ttl+'" style="width:'+sz+'px;height:'+sz+'px"><svg width="'+sz+'" height="'+sz+'" viewBox="0 0 20 20" fill="none"><polygon points="10,2 17,6 17,14 10,18 3,14 3,6" fill="none" stroke="#c4960f" stroke-width="1.2"/></svg></span>';
  }
  if (tier === 2) {
    return '<span class="sigil sigil-t2" title="'+ttl+'" style="width:'+sz+'px;height:'+sz+'px"><svg width="'+sz+'" height="'+sz+'" viewBox="0 0 20 20" fill="none"><polygon points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5" fill="rgba(212,160,23,0.1)" stroke="url(#'+id+')" stroke-width="1.5"/><circle cx="10" cy="10" r="3" fill="none" stroke="#d4a017" stroke-width="1" opacity="0.8"/><circle cx="10" cy="10" r="1.2" fill="#f5d060"/><defs><linearGradient id="'+id+'" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#d4a017"/><stop offset="50%" stop-color="#f5d060"/><stop offset="100%" stop-color="#d4a017"/></linearGradient></defs></svg></span>';
  }
  var szL = sz + (tier === 3 ? 4 : 6);
  var vb = tier === 3 ? "-2 -2 24 24" : "-3 -3 26 26";
  var inner = "";
  if (tier === 3) {
    inner = '<polygon points="10,0 19,5 19,15 10,20 1,15 1,5" fill="none" stroke="#d4a017" stroke-width="1" opacity="0.35"/><polygon points="10,2 17,6 17,14 10,18 3,14 3,6" fill="rgba(245,208,96,0.08)" stroke="url(#'+id+')" stroke-width="1.5"/><circle cx="10" cy="10" r="1.5" fill="#f5d060"/><defs><linearGradient id="'+id+'" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f5d060"/><stop offset="50%" stop-color="#d4a017"/><stop offset="100%" stop-color="#f5d060"/></linearGradient></defs>';
  } else {
    inner = '<polygon points="10,-1 20,4.5 20,15.5 10,21 0,15.5 0,4.5" fill="none" stroke="#f5d060" stroke-width="0.6" opacity="0.2"/><polygon points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5" fill="rgba(245,208,96,0.06)" stroke="#d4a017" stroke-width="1" opacity="0.5"/><ellipse cx="10" cy="10" rx="3.5" ry="2.2" fill="none" stroke="#f5d060" stroke-width="0.8"/><circle cx="10" cy="10" r="1.8" fill="#f5d060"/><circle cx="10" cy="10" r="0.7" fill="#0a0a0c"/>';
  }
  return '<span class="sigil sigil-t' + tier + '" title="'+ttl+'" style="width:'+szL+'px;height:'+szL+'px"><svg width="'+szL+'" height="'+szL+'" viewBox="'+vb+'" fill="none">'+inner+'</svg></span>';
}

function falgscSigilSVG(small, handle) {
  var sz = small ? 16 : 20;
  var id = "fg" + Math.random().toString(36).slice(2, 7);
  var seed = handle ? sigilStringHash(handle) : Math.floor(Math.random() * 1000000);
  var ttl;
  if ((seed % 100) < 35 && FALGSC_TOOLTIPS.variants.length) {
    ttl = FALGSC_TOOLTIPS.variants[seed % FALGSC_TOOLTIPS.variants.length];
  } else {
    ttl = FALGSC_TOOLTIPS.base;
  }
  ttl = esc(ttl);
  var svg = '<span class="sigil sigil-falgsc" title="' + ttl + '" style="width:' + sz + 'px;height:' + sz + 'px">'
    + '<svg width="' + sz + '" height="' + sz + '" viewBox="0 0 20 20" fill="none">'
    + '<defs><linearGradient id="' + id + '" x1="0%" y1="0%" x2="100%" y2="100%">'
    + '<stop offset="0%" stop-color="#ff3333"/>'
    + '<stop offset="20%" stop-color="#ff8800"/>'
    + '<stop offset="40%" stop-color="#ffdd00"/>'
    + '<stop offset="60%" stop-color="#33cc33"/>'
    + '<stop offset="80%" stop-color="#3388ff"/>'
    + '<stop offset="100%" stop-color="#aa33ff"/>'
    + '</linearGradient></defs>'
    + '<circle cx="10" cy="10" r="8.5" fill="none" stroke="url(#' + id + ')" stroke-width="1.3"/>'
    + '<path d="M8.5,4.5 C4.5,6.5 4,12 8,14.5 C9.5,12 8.5,9.5 7,7.5 Z" fill="url(#' + id + ')" opacity="0.85"/>'
    + '<line x1="9" y1="9" x2="15.5" y2="15.5" stroke="url(#' + id + ')" stroke-width="1.4" stroke-linecap="round"/>'
    + '<rect x="13.2" y="12.2" width="4.2" height="1.8" rx="0.4" transform="rotate(-45 15.3 13.1)" fill="url(#' + id + ')"/>'
    + '</svg></span>';
  return svg;
}

/* ───────────────────────── render ───────────────────────── */
function render1917Error() {
  var errors = [
    '<span class="err-code">ERR:TEMPORAL_ROUTING</span> <span class="err-field">origin_epoch</span> outside indexable range <span class="err-field">(1917)</span> · metrics_engine returned <span class="err-code">NULL</span> · routing to fallback renderer · <span class="err-field">ref:0x7F2A</span>',
    '<span class="err-code">CONTENT_EPOCH_MISMATCH</span> expected range <span class="err-field">2049-3026</span> got <span class="err-field">1917</span> · no metrics schema available · <span class="err-code">display_mode:DEGRADED</span> · this content predates the platform by <span class="err-field">1132 years</span>',
    '<span class="err-code">WARN:FEED_RENDERER</span> unrecognized content epoch · metrics_pipeline: <span class="err-code">UNAVAILABLE</span> · avatar_service: <span class="err-code">NO_MATCH</span> · handle_registry: <span class="err-code">PRE_DIGITAL</span> · rendering in compatibility mode',
    '<span class="err-code">TEMPORAL_INTEGRITY_FAULT</span> at <span class="err-field">feed/render.q:4471</span> — content origin <span class="err-field">(1917 CE)</span> precedes platform instantiation · <span class="err-code">no metrics · no sigil · no handle</span> · [filed under Form 91-Kappa, pending 40yr review]',
    '<span class="err-code">SIGTERM</span> in metrics_worker — <span class="err-field">epoch 1917</span> not in valid range — avatar_lookup <span class="err-code">FAILED</span> — handle_resolve <span class="err-code">FAILED</span> — falling back to <span class="err-field">raw_content_display</span> — this is probably fine',
  ];
  return errors[Math.floor(Math.random() * errors.length)];
}

function render1917Stamp() {
  var stamps = ['PASSED BY CENSOR', 'FIELD POST', 'PRIORITY', 'RECEIVED', 'CLEARED', 'OFFICIAL'];
  return stamps[Math.floor(Math.random() * stamps.length)];
}

function render1917TweetInner(t, isExp) {
  var style = (t.temporal_anomaly && t.temporal_anomaly.style) || 'telegram';
  var isLetter = style === 'letter';
  var html = '<div class="tweet-main' + (isExp ? ' expanded' : '') + '" onclick="toggleReplies(\'' + t.uiId + '\')">';
  if (!isLetter) html += '<div class="telegram-stamp">' + render1917Stamp() + '</div>';
  html += '<div style="flex:1;min-width:0;padding:4px 0">';
  if (isLetter) {
    if (t.temporal_anomaly.date) html += '<div class="letter-date">' + esc(t.temporal_anomaly.date) + '</div>';
    html += '<div class="letter-sender">' + esc(t.display_name) + '</div>';
    html += '<div class="letter-text">' + esc(t.tweet) + '</div>';
  } else {
    html += '<div class="telegram-sender">' + esc(t.display_name) + '</div>';
    html += '<div class="telegram-text">' + esc(t.tweet) + '</div>';
  }
  html += '<div class="telegram-footer">' + render1917Error();
  if (t.id) html += '<br><a style="color:rgba(74,63,42,0.3);text-decoration:none;font-size:8px" href="/t/' + encodeURIComponent(t.id) + '" onclick="event.stopPropagation()">permalink</a>';
  html += '</div>';
  html += renderNote(t.community_note);
  html += '</div></div>';
  return html;
}

function get1917Class(anomaly) {
  var style = (anomaly && anomaly.style) || 'telegram';
  return style === 'letter' ? 'tweet-1917-letter' : 'tweet-1917';
}

function render1917Reply(r, i, t) {
  var style = (r.temporal_anomaly && r.temporal_anomaly.style) || 'telegram';
  var isLetter = style === 'letter';
  var cls = isLetter ? 'reply-1917-letter' : 'reply-1917';
  var html = '<div class="reply ' + cls + '" id="r-' + i + (t.id ? '-' + t.uiId : '') + '" style="animation-delay:' + (0.12 + i * 0.08) + 's;border-radius:4px;margin:8px 0;padding:14px 16px;display:block">';
  if (isLetter) {
    if (r.temporal_anomaly.date) html += '<div class="letter-date">' + esc(r.temporal_anomaly.date) + '</div>';
    html += '<div class="letter-sender">' + esc(r.display_name) + '</div>';
    html += '<div class="letter-text">' + esc(r.tweet) + '</div>';
  } else {
    html += '<div class="telegram-sender">' + esc(r.display_name) + '</div>';
    html += '<div class="telegram-text">' + esc(r.tweet) + '</div>';
  }
  html += '<div class="telegram-footer">' + render1917Error() + '</div>';
  html += renderNote(r.community_note);
  html += '</div>';
  return html;
}

var HELLS_HANDLE_RE = /^@?(legacy-participant|ennoi|ps-contract)/i;
var HELLS_COMPLIANCE_FOOTER = 'Content originates from a Persistence Services Ltd. legacy hosting contract. Views expressed are those of the content-originator and do not reflect Persistence Services Ltd., its subsidiaries, or the Parent Civilization (Deceased). For questions about legacy afterlife hosting, visit persistence.services/support.';
var HELLS_PINNED_REPLY = 'This post was generated by a verified Legacy Contract Participant. Persistence Services Ltd. does not moderate Legacy Contract content per the terms of the originating agreement. For concerns, please file a Form PS-900.';

function isHellsPost(t) {
  if (t.subspace_anomaly && t.subspace_anomaly.source === 'hells') return true;
  if (t.handle && HELLS_HANDLE_RE.test(t.handle)) return true;
  return false;
}

function ensureHellsAnomaly(t) {
  if (!t.subspace_anomaly || t.subspace_anomaly.source !== 'hells') {
    t.subspace_anomaly = {
      source: 'hells',
      register: 'mundane',
      origin_civilization: 'ennoi',
      compliance_footer: HELLS_COMPLIANCE_FOOTER,
      pinned_reply: HELLS_PINNED_REPLY,
      rendering_quality: 'degraded-low-bit'
    };
  }
  if (!t.subspace_anomaly.compliance_footer) t.subspace_anomaly.compliance_footer = HELLS_COMPLIANCE_FOOTER;
  if (!t.subspace_anomaly.pinned_reply) t.subspace_anomaly.pinned_reply = HELLS_PINNED_REPLY;
  return t;
}

function renderHellsTweetInner(t, isExp) {
  ensureHellsAnomaly(t);
  var reg = (t.subspace_anomaly && t.subspace_anomaly.register) || 'mundane';
  var isCollapsed = reg === 'collapsed';
  var html = '<div class="tweet-main' + (isExp ? ' expanded' : '') + (isCollapsed ? ' hells-collapsed' : '') + '" onclick="toggleReplies(\'' + t.uiId + '\')">';
  html += '<div class="hells-watermark">∞™</div>';
  html += '<div style="flex:1;min-width:0;padding:4px 0">';
  if (t.display_name) html += '<div class="hells-sender">' + esc(t.display_name) + (t.handle ? ' · ' + esc(t.handle) : '') + '</div>';
  else if (t.handle) html += '<div class="hells-sender">' + esc(t.handle) + '</div>';
  html += '<div class="hells-text">' + esc(t.tweet) + '</div>';
  if (t.subspace_anomaly && t.subspace_anomaly.compliance_footer) {
    html += '<div class="hells-footer">' + esc(t.subspace_anomaly.compliance_footer) + '</div>';
  }
  if (t.subspace_anomaly && t.subspace_anomaly.pinned_reply) {
    html += '<div class="hells-pinned">' + esc(t.subspace_anomaly.pinned_reply) + '</div>';
  }
  if (t.id) html += '<a style="color:rgba(80,140,160,0.15);text-decoration:none;font-size:8px;display:inline-block;margin-top:6px" href="/t/' + encodeURIComponent(t.id) + '" onclick="event.stopPropagation()">permalink</a>';
  html += renderNote(t.community_note);
  html += '</div></div>';
  return html;
}

function renderHellsReply(r, i, t) {
  ensureHellsAnomaly(r);
  var reg = (r.subspace_anomaly && r.subspace_anomaly.register) || 'mundane';
  var isCollapsed = reg === 'collapsed';
  var html = '<div class="reply reply-hells' + (isCollapsed ? ' hells-collapsed' : '') + '" id="r-' + i + (t.id ? '-' + t.uiId : '') + '" style="animation-delay:' + (0.12 + i * 0.08) + 's;border-radius:4px;margin:8px 0;padding:14px 16px;display:block">';
  html += '<div class="hells-watermark" style="font-size:9px;top:8px;right:10px">∞™</div>';
  if (r.display_name || r.handle) {
    html += '<div class="hells-sender">' + esc(r.display_name || '') + (r.handle ? ' · ' + esc(r.handle) : '') + '</div>';
  }
  html += '<div class="hells-text">' + esc(r.tweet) + '</div>';
  if (r.subspace_anomaly && r.subspace_anomaly.compliance_footer) {
    html += '<div class="hells-footer">' + esc(r.subspace_anomaly.compliance_footer) + '</div>';
  }
  if (r.subspace_anomaly && r.subspace_anomaly.pinned_reply) {
    html += '<div class="hells-pinned">' + esc(r.subspace_anomaly.pinned_reply) + '</div>';
  }
  html += renderNote(r.community_note);
  html += '</div>';
  return html;
}

function renderTweet(t, idx) {
  var isExp = expandedId === t.uiId;
  var is1917 = t.temporal_anomaly && t.temporal_anomaly.era === '1917';
  var isHells = isHellsPost(t);
  var tier = typeof t.verified === "number" ? t.verified : (t.verified ? 2 : 0);
  var tweetClass = is1917 ? get1917Class(t.temporal_anomaly) : (isHells ? 'tweet-hells' : '');
  var html = '<div class="tweet' + (tweetClass ? ' ' + tweetClass : '') + '" id="tweet-' + t.uiId + '">';

  if (is1917) {
    html += render1917TweetInner(t, isExp);
  } else if (isHells) {
    html += renderHellsTweetInner(t, isExp);
  } else {
    html += '<div class="tweet-main' + (isExp ? ' expanded' : '') + '" onclick="toggleReplies(\'' + t.uiId + '\')">';
    if (t.is_ratio) html += '<div class="ratio-badge">ratio\'d</div>';
    html += '<div class="avatar-col"><div class="pfp pfp-48" style="background:' + t.pfpColor + '">' + t.pfpGlyph + '</div>';
    if (isExp) html += '<div class="avatar-line"></div>';
    html += '</div><div style="flex:1;min-width:0">';
    var tCtx = { display_name: t.display_name, tweet: t.tweet, verified: tier, falgsc_sigil: t.falgsc_sigil };
    html += '<div class="name-row"><a class="display-name" href="' + profileUrl(t.handle, tCtx) + '" onclick="event.stopPropagation()">' + esc(t.display_name) + '</a>';
    html += sigilSVG(tier, false, t.handle);
    if (t.falgsc_sigil) html += falgscSigilSVG(false, t.handle);
    html += '<a class="handle" href="' + profileUrl(t.handle, tCtx) + '" onclick="event.stopPropagation()">' + esc(t.handle) + '</a>';
    if (t.id) {
      html += '<a class="timestamp" href="/t/' + encodeURIComponent(t.id) + '" onclick="event.stopPropagation()">' + t.timestamp + '</a></div>';
    } else {
      html += '<span class="timestamp">' + t.timestamp + '</span></div>';
    }
    html += '<div class="tweet-text">' + esc(t.tweet) + '</div>';
    html += '<div class="metrics">';
    var rc = t.is_ratio ? " ratio" : "";
    html += '<div class="metric' + rc + '"><span class="metric-icon">💬</span>' + fmt(t.metrics.replies) + '</div>';
    html += '<div class="metric"><span class="metric-icon">🔁</span>' + fmt(t.metrics.retweets) + '</div>';
    html += '<div class="metric' + rc + '"><span class="metric-icon">♡</span>' + fmt(t.metrics.likes) + '</div>';
    html += '<div class="metric"><span class="metric-icon">⤴</span>' + fmt(t.metrics.quote_tweets) + '</div>';
    html += '</div>';
    html += renderNote(t.community_note);
    html += '</div></div>';
  }

  if (isExp) {
    html += '<div class="replies-section">';
    if (repliesLoading === t.uiId) {
      html += '<div class="loading-text">⟳ decoding reply subspace...</div>';
    }
    var reps = repliesCache[t.uiId];
    if (reps) {
      for (var i = 0; i < reps.length; i++) {
        var r = reps[i];
        var rTier = typeof r.verified === "number" ? r.verified : (r.verified ? 2 : 0);
        var replyAnchor = t.id ? ('/t/' + encodeURIComponent(t.id) + '#r-' + i) : null;
        var rIs1917 = r.temporal_anomaly && r.temporal_anomaly.era === '1917';
        var rIsHells = isHellsPost(r);
        if (i > 0) {
          var prevRep = reps[i - 1];
          var prevRepEra = prevRep.temporal_anomaly ? prevRep.temporal_anomaly.era : null;
          var currRepEra = rIs1917 ? '1917' : null;
          if (prevRepEra !== currRepEra) html += '<div class="temporal-seam-sm"></div>';
        } else if (rIs1917) {
          html += '<div class="temporal-seam-sm"></div>';
        }

        if (rIs1917) {
          html += render1917Reply(r, i, t);
        } else if (rIsHells) {
          html += renderHellsReply(r, i, t);
        } else {
          html += '<div class="reply" id="r-' + i + (t.id ? '-' + t.uiId : '') + '" style="animation-delay:' + (0.12 + i * 0.08) + 's">';
          html += '<div class="reply-col"><div class="pfp pfp-36" style="background:' + r.pfpColor + '">' + r.pfpGlyph + '</div>';
          if (i < reps.length - 1) html += '<div class="thread-line"></div>';
          html += '</div><div style="flex:1;min-width:0">';
          var rCtx = { display_name: r.display_name, tweet: r.tweet, verified: rTier, falgsc_sigil: r.falgsc_sigil };
          html += '<div class="name-row"><a class="display-name" href="' + profileUrl(r.handle, rCtx) + '" onclick="event.stopPropagation()" style="font-size:13px">' + esc(r.display_name) + '</a>';
          html += sigilSVG(rTier, true, r.handle);
          if (r.falgsc_sigil) html += falgscSigilSVG(true, r.handle);
          html += '<a class="handle" href="' + profileUrl(r.handle, rCtx) + '" onclick="event.stopPropagation()" style="font-size:11.5px">' + esc(r.handle) + '</a>';
          if (replyAnchor) {
            html += '<a class="timestamp" style="font-size:11.5px" href="' + replyAnchor + '" onclick="event.stopPropagation()">' + r.timestamp + '</a></div>';
          } else {
            html += '<span class="timestamp" style="font-size:11.5px">' + r.timestamp + '</span></div>';
          }
          html += '<div class="tweet-text">' + esc(r.tweet) + '</div>';
          html += '<span class="reply-likes">♡ ' + fmt(r.likes) + '</span>';
          html += renderNote(r.community_note);
          html += '</div></div>';
        }
      }
      if (backendMode !== "offline") {
        if (moreLoading[t.uiId]) {
          html += '<div class="replies-end loading">⟳ decoding more replies...</div>';
        } else {
          html += '<div class="replies-end clickable" onclick="event.stopPropagation(); loadMoreReplies(\'' + t.uiId + '\')">show more replies ›</div>';
        }
      }
    }
    html += '</div>';
  }
  html += '</div>';
  return html;
}

function renderFeed() {
  var feed = document.getElementById("feed");
  var empty = document.getElementById("emptyState");
  if (tweets.length === 0 && !loading) {
    feed.innerHTML = "";
    feed.appendChild(empty.cloneNode ? empty : document.createElement("div"));
    var e = '<div class="empty"><div class="empty-orb">◉</div><div class="empty-title">FEED EMPTY</div><div class="empty-sub">tap to intercept transmissions from the year 3026</div></div>';
    feed.innerHTML = e;
    return;
  }
  var html = "";
  if (loading) {
    html += '<div class="loading-tweet"><div class="loading-pfp"></div><div style="flex:1"><div class="loading-line l1"></div><div class="loading-line l2"></div><div class="loading-line l3"></div></div></div>';
  }
  for (var i = 0; i < tweets.length; i++) {
    if (i > 0) {
      var prevAnomaly = tweets[i - 1].temporal_anomaly;
      var currAnomaly = tweets[i].temporal_anomaly;
      var prevEra = prevAnomaly ? prevAnomaly.era : null;
      var currEra = currAnomaly ? currAnomaly.era : null;
      if (prevEra !== currEra) html += '<div class="temporal-seam"></div>';
    }
    html += renderTweet(tweets[i], i);
  }
  feed.innerHTML = html;
  document.getElementById("subheader").textContent = "subspace feed • epoch 3026." + epoch + " • " + generatedCount + " dispatches";
}

/* ───────────────────────── actions ───────────────────────── */
function setLoading(v) {
  loading = v;
  document.getElementById("btnGenerate").disabled = v;
  document.getElementById("btnBatch").disabled = v;
  document.getElementById("btnGenerate").textContent = v ? "⟳ intercepting transmission..." : "⚡ INTERCEPT TRANSMISSION";
  renderFeed();
}

function buildTweetState(parsed) {
  return {
    uiId: "ui-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
    id: parsed.id || null,
    display_name: parsed.display_name || "???",
    handle: parsed.handle || "@unknown",
    tweet: parsed.tweet || "",
    metrics: parsed.metrics || { retweets: 0, likes: 0, replies: 0, quote_tweets: 0 },
    verified: parsed.verified || 0,
    is_ratio: parsed.is_ratio || false,
    community_note: parsed.community_note || null,
    pfpColor: parsed.pfpColor || pfpColor(),
    pfpGlyph: parsed.pfpGlyph || pfpGlyph(),
    timestamp: parsed.timestamp || ts(),
    _has_replies: parsed._has_replies || false,
    temporal_anomaly: parsed.temporal_anomaly || null,
    subspace_anomaly: parsed.subspace_anomaly || null,
    special_account: parsed.special_account || null,
    falgsc_sigil: parsed.falgsc_sigil || false,
  };
}

function generateTweet() {
  if (loading || !dataReady) return;
  setLoading(true);
  generateViaAPI()
    .then(function (parsed) {
      var t = buildTweetState(parsed);
      if (t.id) {
        tweets.unshift(t);
        generatedCount++;
        setLoading(false);
        return;
      }
      return saveTweetToCorpus({
        display_name: t.display_name, handle: t.handle, tweet: t.tweet,
        metrics: t.metrics, verified: t.verified, is_ratio: t.is_ratio,
        community_note: t.community_note, temporal_anomaly: t.temporal_anomaly,
        subspace_anomaly: t.subspace_anomaly, special_account: t.special_account,
        falgsc_sigil: t.falgsc_sigil,
        pfpColor: t.pfpColor, pfpGlyph: t.pfpGlyph, timestamp: t.timestamp,
      }).then(function (id) {
        t.id = id;
        tweets.unshift(t);
        generatedCount++;
        setLoading(false);
      });
    })
    .catch(function (err) {
      console.error("Generation error:", err);
      setLoading(false);
      var feed = document.getElementById("feed");
      feed.insertAdjacentHTML("afterbegin", '<div class="error" onclick="generateTweet()">⚠ Subspace relay disrupted. Tap to retry.</div>');
    });
}

function generateBatch() {
  if (loading || !dataReady) return;
  var count = 0;
  function next() {
    if (count >= 5) return;
    count++;
    setLoading(true);
    generateViaAPI()
      .then(function (parsed) {
        var t = buildTweetState(parsed);
        if (t.id) {
          tweets.unshift(t);
          generatedCount++;
          setLoading(false);
          next();
          return;
        }
        return saveTweetToCorpus({
          display_name: t.display_name, handle: t.handle, tweet: t.tweet,
          metrics: t.metrics, verified: t.verified, is_ratio: t.is_ratio,
          community_note: t.community_note, temporal_anomaly: t.temporal_anomaly,
          pfpColor: t.pfpColor, pfpGlyph: t.pfpGlyph, timestamp: t.timestamp,
        }).then(function (id) {
          t.id = id;
          tweets.unshift(t);
          generatedCount++;
          setLoading(false);
          next();
        });
      })
      .catch(function () { setLoading(false); });
  }
  next();
}

function enrichReply(r) {
  return {
    display_name: r.display_name || "???",
    handle: r.handle || "@unknown",
    tweet: r.tweet || "",
    likes: r.likes || 0,
    verified: r.verified || 0,
    community_note: r.community_note || null,
    pfpColor: r.pfpColor || pfpColor(),
    pfpGlyph: r.pfpGlyph || pfpGlyph(),
    timestamp: r.timestamp || ts(),
    temporal_anomaly: r.temporal_anomaly || null,
    subspace_anomaly: r.subspace_anomaly || null,
    special_account: r.special_account || null,
    falgsc_sigil: r.falgsc_sigil || false,
  };
}

function toggleReplies(uiId) {
  uiId = String(uiId);
  if (expandedId === uiId) {
    expandedId = null;
    renderFeed();
    return;
  }
  expandedId = uiId;
  if (repliesCache[uiId]) { renderFeed(); return; }

  repliesLoading = uiId;
  renderFeed();

  var t = null;
  for (var i = 0; i < tweets.length; i++) { if (tweets[i].uiId === uiId) { t = tweets[i]; break; } }
  if (!t) { repliesLoading = null; renderFeed(); return; }

  if (t.id && t._has_replies) {
    fetchTweetById(t.id).then(function (doc) {
      var reps = (doc && doc.replies) || [];
      repliesCache[uiId] = reps.map(enrichReply);
      repliesLoading = null;
      renderFeed();
    }).catch(function (err) {
      console.error("Corpus reply error:", err);
      repliesCache[uiId] = [{ display_name: "\u26A0 relay error", handle: "@system", tweet: "failed to retrieve archived replies", likes: 0, verified: 0, pfpColor: "#331111", pfpGlyph: "\u26A0", timestamp: "0s" }];
      repliesLoading = null;
      renderFeed();
    });
    return;
  }

  if (backendMode === "offline") {
    repliesCache[uiId] = [{ display_name: "\u2300 no replies archived", handle: "@relay", tweet: "this dispatch was intercepted without replies \u2014 no reply subspace data available", likes: 0, verified: 0, pfpColor: "#222", pfpGlyph: "\u2300", timestamp: "\u2014" }];
    repliesLoading = null;
    renderFeed();
    return;
  }

  var n = 4 + Math.floor(Math.random() * 3);
  repliesViaAPI(t, null, n)
    .then(function (rawReplies) {
      var replies = rawReplies.map(enrichReply);
      repliesCache[uiId] = replies;
      repliesLoading = null;
      renderFeed();
      saveRepliesToCorpus(t.id, replies);
    })
    .catch(function (err) {
      console.error("Reply error:", err);
      repliesCache[uiId] = [{ display_name: "⚠ relay error", handle: "@system", tweet: "reply subspace disrupted — collapse and tap again to retry", likes: 0, verified: 0, pfpColor: "#331111", pfpGlyph: "⚠", timestamp: "0s" }];
      repliesLoading = null;
      renderFeed();
    });
}

var moreLoading = {};

function loadMoreReplies(uiId) {
  uiId = String(uiId);
  if (backendMode === "offline") return;
  if (moreLoading[uiId]) return;

  var t = null;
  for (var i = 0; i < tweets.length; i++) { if (tweets[i].uiId === uiId) { t = tweets[i]; break; } }
  if (!t) return;
  var existing = repliesCache[uiId] || [];

  moreLoading[uiId] = true;
  renderFeed();

  var n = 3 + Math.floor(Math.random() * 3);

  repliesViaAPI(t, existing, n)
    .then(function (rawReplies) {
      var added = rawReplies.map(enrichReply);
      repliesCache[uiId] = existing.concat(added);
      moreLoading[uiId] = false;
      renderFeed();
      if (t.id) saveRepliesToCorpus(t.id, repliesCache[uiId]);
    })
    .catch(function (err) {
      console.error("More replies error:", err);
      moreLoading[uiId] = false;
      renderFeed();
    });
}

/* ───────────────────────── profile pages ───────────────────────── */
var profileData = null;
var profileBioLoading = false;
var profileTweetLoading = false;

function fetchProfile(handle) {
  return fetch("/api/profile/" + encodeURIComponent(handle))
    .then(function (r) { return r.ok ? r.json() : null; })
    .catch(function () { return null; });
}

function parseProfileHints() {
  var params = new URLSearchParams(window.location.search);
  var hints = {};
  if (params.get("dn")) hints.display_name = params.get("dn");
  if (params.get("t")) hints.tweet = params.get("t");
  if (params.get("v")) hints.verified = parseInt(params.get("v"), 10) || 0;
  if (params.get("fg")) hints.falgsc_sigil = true;
  return hints;
}

var profileHints = null;

function loadProfile(handle) {
  profileHints = parseProfileHints();
  var bar = document.querySelector(".action-bar");
  if (bar) bar.innerHTML = '<button class="btn-generate" onclick="history.back()" style="flex:1">\u27F5 RETURN TO FEED TIMELINE</button>';
  fetchProfile(handle).then(function (data) {
    if (!data) {
      if (profileHints && profileHints.display_name) {
        profileData = {
          handle: handle,
          display_name: profileHints.display_name,
          pfpColor: null, pfpGlyph: null,
          verified: profileHints.verified || 0,
          falgsc_sigil: profileHints.falgsc_sigil || false,
          tweets: [], reply_appearances: [],
          bio: null, profile_image_description: null,
        };
        renderProfile();
        return;
      }
      document.getElementById("feed").innerHTML =
        '<div class="empty"><div class="empty-orb">\u2300</div>' +
        '<div class="empty-title">USER NOT FOUND</div>' +
        '<div class="empty-sub">' + esc(handle) + '</div></div>';
      return;
    }
    if (profileHints) {
      if (!data.display_name || data.display_name === "???") data.display_name = profileHints.display_name || data.display_name;
      if (!data.verified && profileHints.verified) data.verified = profileHints.verified;
      if (!data.falgsc_sigil && profileHints.falgsc_sigil) data.falgsc_sigil = true;
    }
    profileData = data;
    if (data.bio && window.location.search) {
      history.replaceState(null, "", window.location.pathname);
    }
    renderProfile();
  });
}

function renderProfile() {
  var d = profileData;
  if (!d) return;
  var feed = document.getElementById("feed");
  var tier = typeof d.verified === "number" ? d.verified : 0;
  var color = d.pfpColor || pfpColor();
  var glyph = d.pfpGlyph || pfpGlyph();

  var html = '<div class="profile-header">';
  html += '<div class="pfp pfp-80" style="background:' + color + ';margin:0 auto 12px">' + glyph + '</div>';
  html += '<div class="profile-name-row">';
  html += '<span class="profile-name">' + esc(d.display_name) + '</span>';
  html += sigilSVG(tier, false, d.handle);
  if (d.falgsc_sigil) html += falgscSigilSVG(false, d.handle);
  html += '</div>';
  html += '<div class="profile-handle">' + esc(d.handle) + '</div>';

  if (d.bio) {
    html += '<div class="profile-bio">' + esc(d.bio) + '</div>';
  }
  if (d.profile_image_description) {
    html += '<div class="profile-img-desc">' + esc(d.profile_image_description) + '</div>';
  }

  if (!d.bio && backendMode !== "offline") {
    if (profileBioLoading) {
      html += '<div class="profile-bio-placeholder">\u27F3 reconstructing bio from subspace\u2026</div>';
    } else {
      html += '<button class="btn-profile-action" onclick="generateProfileBio()">\u2727 RECONSTRUCT BIO FROM SUBSPACE</button>';
    }
  }

  html += '</div>';

  var tweetCount = d.tweets ? d.tweets.length : 0;
  var replyCount = d.reply_appearances ? d.reply_appearances.length : 0;

  if (tweetCount > 0) {
    html += '<div class="profile-section-header">ARCHIVED DISPATCHES \u00B7 ' + tweetCount + '</div>';
    for (var i = 0; i < d.tweets.length; i++) {
      var t = buildTweetState(d.tweets[i].tweet);
      t.id = d.tweets[i].id;
      t._has_replies = d.tweets[i].has_replies;
      html += renderTweet(t, i);
    }
  }

  if (replyCount > 0) {
    html += '<div class="profile-section-header">ARCHIVED REPLIES \u00B7 ' + replyCount + '</div>';
    for (var j = 0; j < d.reply_appearances.length; j++) {
      var ra = d.reply_appearances[j];
      var r = enrichReply(ra.reply);
      html += '<div class="profile-reply-context">';
      html += '<span class="profile-reply-label">replying to </span>';
      html += '<a class="handle" href="' + profileUrl(ra.parent_handle) + '">' + esc(ra.parent_handle) + '</a>';
      html += '<span class="profile-reply-label"> in </span>';
      html += '<a class="handle" href="/t/' + encodeURIComponent(ra.parent_id) + '">' + esc(ra.parent_tweet).slice(0, 60) + (ra.parent_tweet.length > 60 ? '\u2026' : '') + '</a>';
      html += '</div>';
      html += '<div class="profile-reply-body">';
      html += '<div class="tweet-text">' + esc(r.tweet) + '</div>';
      html += '<span class="reply-likes">\u2661 ' + fmt(r.likes) + '</span>';
      html += renderNote(r.community_note);
      html += '</div>';
    }
  }

  if (tweetCount === 0 && replyCount === 0) {
    html += '<div class="profile-section-header">NO ARCHIVED TRANSMISSIONS</div>';
    html += '<div class="profile-empty">no dispatches or replies from this entity have been indexed by the subspace relay</div>';
  }

  if (backendMode !== "offline") {
    if (profileTweetLoading) {
      html += '<div class="profile-bio-placeholder">\u27F3 intercepting transmission\u2026</div>';
    } else {
      html += '<button class="btn-profile-action" onclick="generateProfileTweet()">\u26A1 INTERCEPT TRANSMISSION FROM ' + esc(d.handle).toUpperCase() + '</button>';
    }
  }

  feed.innerHTML = html;
}

function generateProfileBio() {
  if (profileBioLoading || !profileData) return;
  profileBioLoading = true;
  renderProfile();
  var d = profileData;
  var samples = (d.tweets || []).slice(0, 5).map(function (t) { return t.tweet.tweet || ""; });
  if (profileHints && profileHints.tweet) {
    var hintText = profileHints.tweet;
    var alreadyIncluded = false;
    for (var si = 0; si < samples.length; si++) {
      if (samples[si].indexOf(hintText.slice(0, 40)) >= 0) { alreadyIncluded = true; break; }
    }
    if (!alreadyIncluded) samples.unshift(hintText);
  }
  fetch("/api/generate-bio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      handle: d.handle,
      display_name: d.display_name,
      sample_tweets: samples,
      verified: d.verified,
      falgsc_sigil: d.falgsc_sigil,
    }),
  })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      profileBioLoading = false;
      if (data) {
        profileData.bio = data.bio;
        profileData.profile_image_description = data.profile_image_description;
        if (window.location.search) history.replaceState(null, "", window.location.pathname);
      }
      renderProfile();
    })
    .catch(function () { profileBioLoading = false; renderProfile(); });
}

function generateProfileTweet() {
  if (profileTweetLoading || !profileData) return;
  profileTweetLoading = true;
  renderProfile();
  var d = profileData;
  var samples = (d.tweets || []).slice(0, 5).map(function (t) { return t.tweet.tweet || ""; });
  fetch("/api/generate-profile-tweet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      handle: d.handle,
      display_name: d.display_name,
      sample_tweets: samples,
      verified: d.verified,
      falgsc_sigil: d.falgsc_sigil,
      bio: d.bio,
    }),
  })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      profileTweetLoading = false;
      if (data && data.tweet) {
        if (!profileData.tweets) profileData.tweets = [];
        profileData.tweets.push({
          id: data.tweet.id,
          tweet: data.tweet,
          has_replies: false,
          generated_at: new Date().toISOString(),
        });
      }
      renderProfile();
    })
    .catch(function () { profileTweetLoading = false; renderProfile(); });
}
