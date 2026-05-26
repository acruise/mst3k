// corpus.js — corpus persistence, index, and lookup.
// Node 16 compatible: CommonJS, var/function, no optional chaining.

var fs = require("fs");
var path = require("path");

var INDEX_FILE = "_index.json";
var INDEX_VERSION = 3; // bumped to add replies_by_handle for profile pages
// Permissive enough to accept the existing `{ts}-{idx}` corpus files AND hand-seeded
// files like `notes-showcase-001`, while blocking path traversal (no `..`, `/`, `\`, spaces).
var ID_RE = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/;

function makeId() {
  return Date.now() + "-" + Math.random().toString(36).slice(2, 6);
}

function isValidId(id) {
  return typeof id === "string" && ID_RE.test(id);
}

function idFromFilename(filename) {
  return filename.replace(/\.json$/, "");
}

function listFiles(corpusDir) {
  if (!fs.existsSync(corpusDir)) return [];
  return fs.readdirSync(corpusDir)
    .filter(function (f) { return f.endsWith(".json") && !f.startsWith("_"); })
    .sort();
}

function readEntry(corpusDir, filename) {
  try {
    var doc = JSON.parse(fs.readFileSync(path.join(corpusDir, filename), "utf8"));
    if (!doc.id) doc.id = idFromFilename(filename);
    return doc;
  } catch (e) {
    return null;
  }
}

function fingerprint(corpusDir) {
  var files = listFiles(corpusDir);
  return {
    count: files.length,
    oldest: files[0] || null,
    newest: files[files.length - 1] || null,
  };
}

function buildIndex(corpusDir) {
  var files = listFiles(corpusDir);
  var index = {
    version: INDEX_VERSION,
    built_at: new Date().toISOString(),
    file_count: files.length,
    oldest_file: files[0] || null,
    newest_file: files[files.length - 1] || null,
    by_id: {},
    by_handle: {},
    by_summon: {},
    by_incite: {},
    replies_by_handle: {},
    counts: {
      tweets: 0,
      replies: 0,
      tweets_with_replies: 0,
      by_backend: {},
      by_summon: {},
      by_incite: {},
    },
  };

  files.forEach(function (f) {
    var doc = readEntry(corpusDir, f);
    if (!doc || !doc.tweet) return;
    var id = doc.id;
    index.by_id[id] = f;
    index.counts.tweets++;
    if (doc.replies && doc.replies.length) {
      index.counts.tweets_with_replies++;
      index.counts.replies += doc.replies.length;
    }
    var handle = (doc.tweet.handle || "").toLowerCase();
    if (handle) {
      if (!index.by_handle[handle]) index.by_handle[handle] = [];
      index.by_handle[handle].push(id);
    }
    if (doc.replies && doc.replies.length) {
      for (var ri = 0; ri < doc.replies.length; ri++) {
        var rHandle = (doc.replies[ri].handle || "").toLowerCase();
        if (rHandle) {
          if (!index.replies_by_handle[rHandle]) index.replies_by_handle[rHandle] = [];
          index.replies_by_handle[rHandle].push({ id: id, reply_index: ri });
        }
      }
    }
    var b = doc.backend || "unknown";
    index.counts.by_backend[b] = (index.counts.by_backend[b] || 0) + 1;
    if (doc.summon) {
      var s = String(doc.summon).toLowerCase();
      if (!index.by_summon[s]) index.by_summon[s] = [];
      index.by_summon[s].push(id);
      index.counts.by_summon[s] = (index.counts.by_summon[s] || 0) + 1;
    }
    if (doc.incite) {
      var inc = String(doc.incite).toLowerCase();
      if (!index.by_incite[inc]) index.by_incite[inc] = [];
      index.by_incite[inc].push(id);
      index.counts.by_incite[inc] = (index.counts.by_incite[inc] || 0) + 1;
    }
  });

  return index;
}

function writeIndex(corpusDir, index) {
  if (!fs.existsSync(corpusDir)) fs.mkdirSync(corpusDir, { recursive: true });
  try {
    fs.writeFileSync(path.join(corpusDir, INDEX_FILE), JSON.stringify(index, null, 2));
  } catch (e) {
    // Non-fatal: index is a cache, can be rebuilt
  }
}

function indexNeedsRebuild(index, fp) {
  if (!index || index.version !== INDEX_VERSION) return true;
  if (index.file_count !== fp.count) return true;
  if (index.oldest_file !== fp.oldest) return true;
  if (index.newest_file !== fp.newest) return true;
  return false;
}

function loadOrBuildIndex(corpusDir) {
  var indexPath = path.join(corpusDir, INDEX_FILE);
  var fp = fingerprint(corpusDir);
  var index = null;
  try {
    index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  } catch (e) {}
  if (!indexNeedsRebuild(index, fp)) return index;
  index = buildIndex(corpusDir);
  writeIndex(corpusDir, index);
  return index;
}

function saveTweet(corpusDir, index, tweet, meta) {
  if (!fs.existsSync(corpusDir)) fs.mkdirSync(corpusDir, { recursive: true });
  var id = makeId();
  var filename = id + ".json";
  var doc = {
    id: id,
    tweet: tweet,
    replies: null,
    generated_at: new Date().toISOString(),
    backend: (meta && meta.backend) || null,
    model: (meta && meta.model) || null,
    temperature: meta && meta.temperature != null ? meta.temperature : null,
    summon: (meta && meta.summon) || null,
    incite: (meta && meta.incite) || null,
  };
  fs.writeFileSync(path.join(corpusDir, filename), JSON.stringify(doc, null, 2));

  // Update index in-place (or rebuild — ensure index has the v2 tables)
  if (index) {
    if (!index.by_summon) index.by_summon = {};
    if (!index.by_incite) index.by_incite = {};
    if (!index.counts.by_summon) index.counts.by_summon = {};
    if (!index.counts.by_incite) index.counts.by_incite = {};
    index.by_id[id] = filename;
    index.counts.tweets++;
    var handle = (tweet.handle || "").toLowerCase();
    if (handle) {
      if (!index.by_handle[handle]) index.by_handle[handle] = [];
      index.by_handle[handle].push(id);
    }
    var b = doc.backend || "unknown";
    index.counts.by_backend[b] = (index.counts.by_backend[b] || 0) + 1;
    if (doc.summon) {
      var s = String(doc.summon).toLowerCase();
      if (!index.by_summon[s]) index.by_summon[s] = [];
      index.by_summon[s].push(id);
      index.counts.by_summon[s] = (index.counts.by_summon[s] || 0) + 1;
    }
    if (doc.incite) {
      var inc = String(doc.incite).toLowerCase();
      if (!index.by_incite[inc]) index.by_incite[inc] = [];
      index.by_incite[inc].push(id);
      index.counts.by_incite[inc] = (index.counts.by_incite[inc] || 0) + 1;
    }
    index.file_count++;
    index.newest_file = filename;
    if (!index.oldest_file) index.oldest_file = filename;
    writeIndex(corpusDir, index);
  }

  return { id: id, filename: filename, doc: doc };
}

function saveReplies(corpusDir, index, id, replies) {
  if (!isValidId(id)) return null;
  var filename = (index && index.by_id[id]) || (id + ".json");
  var filepath = path.join(corpusDir, filename);
  if (!fs.existsSync(filepath)) return null;
  var doc;
  try {
    doc = JSON.parse(fs.readFileSync(filepath, "utf8"));
  } catch (e) {
    return null;
  }
  var hadRepliesBefore = doc.replies && doc.replies.length;
  doc.replies = replies;
  fs.writeFileSync(filepath, JSON.stringify(doc, null, 2));

  if (index) {
    if (!index.replies_by_handle) index.replies_by_handle = {};
    if (!hadRepliesBefore && replies && replies.length) {
      index.counts.tweets_with_replies++;
    }
    if (replies && replies.length) {
      index.counts.replies += replies.length - (hadRepliesBefore ? doc.replies.length : 0);
      for (var ri = 0; ri < replies.length; ri++) {
        var rHandle = (replies[ri].handle || "").toLowerCase();
        if (rHandle) {
          if (!index.replies_by_handle[rHandle]) index.replies_by_handle[rHandle] = [];
          index.replies_by_handle[rHandle].push({ id: id, reply_index: ri });
        }
      }
    }
    writeIndex(corpusDir, index);
  }
  return doc;
}

function getEntry(corpusDir, index, id) {
  if (!isValidId(id)) return null;
  var filename = (index && index.by_id[id]) || (id + ".json");
  if (!fs.existsSync(path.join(corpusDir, filename))) return null;
  return readEntry(corpusDir, filename);
}

function allEntries(corpusDir) {
  var files = listFiles(corpusDir);
  var docs = [];
  files.forEach(function (f) {
    var doc = readEntry(corpusDir, f);
    if (doc && doc.tweet) docs.push(doc);
  });
  return docs;
}

// Like allEntries but strips reply bodies — for the collection endpoint that
// lazy-loads replies per tweet. Keeps payload small.
function listTweets(corpusDir) {
  var files = listFiles(corpusDir);
  var items = [];
  files.forEach(function (f) {
    var doc = readEntry(corpusDir, f);
    if (!doc || !doc.tweet) return;
    items.push({
      id: doc.id,
      tweet: doc.tweet,
      has_replies: !!(doc.replies && doc.replies.length),
      generated_at: doc.generated_at || null,
      backend: doc.backend || null,
      model: doc.model || null,
      summon: doc.summon || null,
      incite: doc.incite || null,
    });
  });
  return items;
}

function getProfileData(corpusDir, index, handle) {
  var h = (handle || "").toLowerCase();
  if (!h) return null;
  var tweetIds = (index && index.by_handle && index.by_handle[h]) || [];
  var replyRefs = (index && index.replies_by_handle && index.replies_by_handle[h]) || [];

  var tweets = [];
  var latestTweet = null;
  for (var i = 0; i < tweetIds.length; i++) {
    var doc = getEntry(corpusDir, index, tweetIds[i]);
    if (!doc || !doc.tweet) continue;
    tweets.push({
      id: doc.id,
      tweet: doc.tweet,
      has_replies: !!(doc.replies && doc.replies.length),
      generated_at: doc.generated_at || null,
    });
    if (!latestTweet || (doc.generated_at && doc.generated_at > latestTweet.generated_at)) {
      latestTweet = doc;
    }
  }

  var replyAppearances = [];
  for (var j = 0; j < replyRefs.length; j++) {
    var ref = replyRefs[j];
    var parentDoc = getEntry(corpusDir, index, ref.id);
    if (!parentDoc || !parentDoc.replies || !parentDoc.replies[ref.reply_index]) continue;
    var reply = parentDoc.replies[ref.reply_index];
    replyAppearances.push({
      parent_id: parentDoc.id,
      parent_handle: (parentDoc.tweet && parentDoc.tweet.handle) || "@unknown",
      parent_tweet: (parentDoc.tweet && parentDoc.tweet.tweet) || "",
      reply_index: ref.reply_index,
      reply: reply,
    });
  }

  var lt = latestTweet && latestTweet.tweet;
  var latestReply = null;
  if (!lt && replyAppearances.length) {
    latestReply = replyAppearances[replyAppearances.length - 1].reply;
  }
  var src = lt || latestReply;
  return {
    handle: src ? (src.handle || handle) : handle,
    display_name: src ? (src.display_name || "???") : "???",
    pfpColor: (lt && lt.pfpColor) || null,
    pfpGlyph: (lt && lt.pfpGlyph) || null,
    verified: src ? (src.verified || 0) : 0,
    falgsc_sigil: src ? (src.falgsc_sigil || false) : false,
    tweets: tweets,
    reply_appearances: replyAppearances,
  };
}

module.exports = {
  makeId: makeId,
  isValidId: isValidId,
  idFromFilename: idFromFilename,
  buildIndex: buildIndex,
  loadOrBuildIndex: loadOrBuildIndex,
  saveTweet: saveTweet,
  saveReplies: saveReplies,
  getEntry: getEntry,
  allEntries: allEntries,
  listTweets: listTweets,
  fingerprint: fingerprint,
  readEntry: readEntry,
  getProfileData: getProfileData,
};
