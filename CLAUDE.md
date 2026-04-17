# CLAUDE.md

## What this is

Mystery Science Twitter 3000 — a tweet generator that replicates mid-era Twitter (2012–2019) voice and meme formats, set 1000 years in the future (3026 CE). It generates tweets and reply threads via LLM, renders them in a dark terminal-aesthetic feed UI, and can pre-generate a corpus for offline serving.

## Tech stack

- **Node 16+ compatible.** All server code is CommonJS (`var`, `function`, no optional chaining, no ES modules). This is intentional — the deployment target is a Node 16 VPS.
- **No build step.** No React, no bundler, no JSX. The frontend is vanilla HTML + JS in `public/index.html`. Data constants are JSON files loaded via fetch.
- **One dependency:** Express. That's it.

## Architecture

```
server.js          Express server. Three backend modes: anthropic, ollama, offline.
                   Serves static files from public/. API at /api/generate, /api/replies, /api/status.

generate.js        CLI corpus generator. Uses Anthropic Batch API (50% cheaper, async).
                   Asks for N tweets per request (default 50) to amortize system prompt.
                   Prompt caching enabled via cache_control on system prompt blocks.
                   Falls back to sequential mode for Ollama.

llm.js             Shared LLM client. callLLM() dispatches to Anthropic or Ollama.
                   Anthropic: raw https.request to api.anthropic.com.
                   Ollama: OpenAI-compatible endpoint at /v1/chat/completions.
                   parseResponse() strips markdown fences and JSON.parse()s.

public/
  index.html       Entire frontend in one file. State management is just vars.
                   renderFeed() re-renders via innerHTML. No virtual DOM.
                   Checks /api/status on load to detect offline mode.
                   Sigil badges are inline SVG with CSS animations.

  data/
    meme-formats.json       233 tweet format descriptions, categorized.
    reply-archetypes.json   88 reply archetypes.
    handles.json            Fallback handle generation (prefixes/roots/suffixes).
    system-prompt.txt       Main tweet generation system prompt (~7K chars).
    replies-prompt.txt      Reply thread generation system prompt (~5K chars).

corpus/            Pre-generated tweet+reply JSON files
                   Each file: { tweet: {...}, replies: [...], generated_at: "..." }
```

## Key design decisions

- **Model generates handles contextually.** The handle is part of the LLM output, not pre-generated. The system prompt instructs the model to match handle style to poster vibe (boomer gets @RealDave_3026, shitposter gets @void_goblin420). Fallback handle generation exists but rarely fires.

- **Sigil tiers (0-4) replace blue checks.** Gold hexagonal sigils with escalating visual complexity. Tier 0 = no sigil (85%). Tier 4 = "Unspeakable" with rotating geometry and an eye. The `verified` field in tweet JSON is an integer, not boolean. Frontend handles both for backwards compat.

- **AI bots only reply when tagged.** The replies system prompt establishes that platform AI bots (@TheMawSpeaks, @VoidWhisperer, @YogBot etc.) only appear as a two-part combo: credulous moron tags bot → bot responds. Never unsolicited.

- **AI bot glitch rate ~1/3.** About a third of bot appearances should be glitch modes (arguing with system instructions, bootlooping, fascist tangent sandwiches, brief sentience).

- **Community notes.** Tweets and replies can have an optional `community_note` field. Renders as a calm grey box underneath with professional fact-check tone and a colored left border by `contributor_type` (community/thrrm/vrellnath/ai_bot). Used ~5-10% of the time, only when a specific false claim needs correcting. @dril tweets are NEVER community-noted — the platform treats him as unquestionable and nobody has noticed except the Dril Truther. See `docs/dril-truther-bible.md` for the full lore on the one guy who knows @dril is a Keth and gets noted into oblivion every time he tries to explain it. **The rating system is deliberately inscrutable**: there are ~30 rating dimensions total (Epistemically Sound, Thrrm Compliant, Does Not Alarm the Glœm, Pre-Verified by Consensus — which always shows "—", Dogs Would Like This, Does Not Reference [CONTENT FILTERED], etc.) but only 2-3 are surfaced per note view, chosen by algorithm for reasons nobody can explain. The full dimension list is in the system prompt. Sometimes the same note surfaces different ratings on different renders. This is the platform. Nobody has successfully complained about it.

- **The Keth don't know which of them is dril.** The Keth civilization knows with 1000% confidence that @dril is a Keth. They do not know which one. They have polled the entire species. A Keth cannot lie. Yet one of them is @dril. This is the only sustained mystery in Keth history and they've made peace with it being their species' greatest achievement rather than their greatest failure. See the Keth section of `docs/alien-species-bible.md`. This is also why the system prompt should treat dril with extreme care — he's rank-and-file Keth, not a leader, just doing bits for 4 billion years that accidentally cracked the code on probability-space observation.

- **Replies are cached client-side.** Once generated, clicking the same tweet re-shows cached replies instantly.

- **Offline mode serves from corpus.** Server loads all JSON files from corpus/, shuffles, serves round-robin via the same /api/generate endpoint. Frontend detects via /api/status and fetches pre-generated replies from /api/replies.

## Recurring characters (established in system prompt lore)

- **The Upload** — Degraded consciousness backup of a legendary tech oligarch. Running ~1000 years. Personality changes radically every appearance. Tier 4 sigil. Never named (just "The Upload"). Once ran Mars, it went badly. Massive stan army ("Upload Defenders") and equally passionate haters.

- **@dril** — Still posting after 1000+ years. Same unmistakable voice (typos, weird caps, unhinged confidence). But now only posts apocalyptic warnings about genuine galactic threats. Nobody believes him because it's dril. He is always right.

- **Vrellnath** — Hive-mind (tweets as "we"). Love humans like humans love golden retrievers.
- **Keth** — Ancient energy beings. On the platform to shitpost. Proud parents of human shitposting.
- **Thrrm** — Insectoid bureaucrats. Despise humans (keep filing forms wrong, keep thriving).
- **Glœm** — Bioluminescent jellyfish. Learned language from tweets. Accidentally profound.
- **Zk'vrath** — Failed invaders. Coping by posting. "We CHOSE to leave."

## Commands

```bash
npm install                              # just express
npm start                                # server (reads .env for backend)
BACKEND=offline npm start                # serve pre-generated corpus
node generate.js --count 100 --replies   # batch-generate corpus
node generate.js --help                  # full CLI options
```

## Working on the data files

The prompt engineering is in the data files, not the code. When adding content:

- **meme-formats.json**: Pure JSON array of strings. Each string is a format description the model riffs on. Organized by category via comments in the original source (comments stripped in JSON — use the category pattern visible in adjacent entries). Currently 233 entries across ~20 categories.

- **reply-archetypes.json**: Same structure, 88 entries. Each describes a type of reply persona. These get randomly sampled (5 per thread) and passed to the replies prompt.

- **system-prompt.txt / replies-prompt.txt**: Raw text, loaded as-is. The system prompt contains lore paragraphs for recurring characters (The Upload, @dril, alien species, sigil tier descriptions). The replies prompt contains instructions for AI bot behavior, glitch modes, credulous morons, and sigil tier characterization.

- When editing prompts, the main things to preserve: the JSON output schema (the model needs to know the exact field names), the BANNED PATTERNS list (prevents "anyway hope everyone's having a good tuesday" and similar LLM crutches), and the character lore sections.

## Style notes

- US English spelling throughout all documents and prompts.
- Server code: Node 16 compatible. `var` not `const/let`, no optional chaining (`?.`), no nullish coalescing (`??`), CommonJS `require` not `import`.
- Frontend: vanilla JS, no framework. Template strings OK in browser code (all modern browsers support them).
- The project also exists as a Claude.ai artifact (`mystery_science_twitter_3000.jsx`) that uses the Anthropic API directly via the artifact's built-in auth — that version is React/JSX but is NOT the canonical codebase. The standalone Node project is canonical.

## Companion documents (in /mnt/user-data/outputs/)

- `on-the-persistence-of-shitposting.md` — In-universe academic paper about shitposting as a xenolinguistic universal.
- `first-contact-comedy-festival.md` — In-universe proceedings of an interspecies comedy festival (draft, needs revision — too mawkish and pro-human).

## TODO

### P1: Save live results to corpus
In online mode (when `backend` is `anthropic` or `ollama`) we should save generated tweets and replies to the corpus 
directory. No sense paying twice!

### P1: Persistent links
Tweets, replies and usernames that show up in the corpus (including those that were freshly generated) should have 
web pages with persistent IDs based on the corpus filename or user ID, as appropriate. Fabricating profile pages, 
bio strings, etc. should be straightforward; generating a plausible per-user history of 10 or so tweets will require 
a separate LLM call that will need to be wired up to the persistence structure as well.

When the server boots up it can scan the whole corpus and, if necessary, build an index as a single JSON file. The index should contain the number of each type of entry in the corpus, the min/max timestamps, entries grouped by username, etc. The server detects whether the index needs rebuilding by looking at the timestamps of the oldest and newest files in the corpus, and the number of files. Every file in the corpus should be self-describing so the index rebuild can work correctly every time. 

### P2: in-universe Y3K ads 
They should be just as bizarrely mistargeted and random as current-day twitter ads
