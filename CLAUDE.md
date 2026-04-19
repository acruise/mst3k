# CLAUDE.md

## What this is

Memetic Subspace Twitter 3017 — a tweet generator that replicates mid-era Twitter (2012–2019) voice and meme formats, set 1000 years in the future (3026 CE). It generates tweets and reply threads via LLM, renders them in a dark terminal-aesthetic feed UI, and can pre-generate a corpus for offline serving.

## Tech stack

- **Node 16+ compatible.** All server code is CommonJS (`var`, `function`, no optional chaining, no ES modules). This is intentional — the deployment target is a Node 16 VPS.
- **No build step.** No React, no bundler, no JSX. The frontend is vanilla HTML + JS in `public/index.html`. Data constants are JSON files loaded via fetch.
- **One dependency:** Express. That's it.

## Outstanding TODOs
("P0" is highest priority, "P1" is lower, etc.)

### P1: Redate to 3017, not 3026
The conceit is "1000 years after peak Twitter (~2012-2017)." Requires a find-and-replace of `3026` and adjustment of any dates in the 3020s range across system-prompt.txt, replies-prompt.txt, corpus files, index.html subheader text, companion docs, and character bibles. Historical lore dates (comedy festival 2901, Keth contact 2934, etc.) can stay. The dril-truther dates and the @dril comedy festival refusal should be re-checked. Key new lore: @dril correctly predicts The Upload will try to buy the platform again in 3022 — "he does this every 200 years and every time it goes exactly the same way" — and nobody believes him. Five years later it happens.

### P0: Temporal anomaly tweets (1917 DONE, 2017 and 2517 still TODO)
A small fraction of tweets (~5%?) fall through a wormhole from other eras. Three sources:

  **~~1917~~ — DONE.** Telegrams. Short, clipped, formal. "SITUATION IN YPRES DETERIORATING STOP MORALE LOW STOP SEND SOCKS STOP." Nobody can explain how pre-digital text is arriving on the platform. The Keth have been suspiciously quiet about these. @dril has never acknowledged them. One 1917 message is just "SOMETHING IS WRONG WITH THE SUN STOP" and the entire platform loses its mind. Implementation: `temporal_anomaly: { era: "1917" }` field in tweet/reply JSON. Rendered with manila paper background, Special Elite typewriter font, ALL CAPS, censor stamps, no avatar/handle/metrics. 5 meme formats (mundane, unsettling, beautiful, bureaucratic, 3017 reaction), 5 reply archetypes (telegram-in-thread, baffled human, Glœm devastation, Thrrm fury, 3017 community note). Testable via `?summon=1917` / `?summon=telegram` and `?incite=1917` / `?incite=telegram`.

  - **2017** — Still TODO. Perfectly normal mid-Twitter posts from our era. Completely incomprehensible to 3017 residents. "uber driver just asked me if i listen to podcasts" gets ratio'd into oblivion by people who don't know what uber, drivers, or podcasts are. Community notes attempt earnest explanations citing historical archives. The Vrellnath find these posts deeply moving for reasons they cannot articulate. A 2017 post about being tired at work on a Monday gets 2M likes because the Glœm decide it's the most beautiful thing they've ever read. Visual style: light-mode Twitter aesthetic (white/light grey background, blue accents, old Twitter bird, rounded avatar, flat blue checkmark, simple metrics). Normal human display names.
  - **2517** — Still TODO. From the "middle period" that nobody alive remembers well. The memes are almost recognizable but slightly off in a way that's unsettling, like someone doing an impression of humor from a language they almost speak. References events and people nobody can look up because the archives from that century were lost in the Great Data Collapse of 2623. Thrrm community notes are furious because the forms referenced in 2517 posts are from deprecated systems. Visual style: similar to 3017 but sepia-shifted, deprecated glyph set, metrics in forgotten units ("4.2 resonances · 890 echoes · 12 folds").

  **Period-correct community notes** (partially implemented for 1917; 2017 and 2517 still TODO):
  - **2017 tweets arriving with their own 2017 notes**: The ancient note system — just a grey box saying "Readers added context they thought people might want to know" with a simple "Helpful / Not Helpful" binary. No glyphs, no 30 dimensions, no Thrrm compliance. The 3017 audience finds the simplicity *deeply unsettling* — a fact-check system with only TWO rating dimensions feels like a legal document from a civilization that hadn't invented nuance yet.
  - **2017 tweets getting a NEW 3017 note on top of the old one**: The 3017 note tries to explain what the original tweet means using historical archives.
  - **2517 notes**: Use an intermediate rating system — maybe 8-10 dimensions, some of which map to current ones and some of which are unrecognizable.
  - **1917 "notes"**: DONE. 3017 community notes appended in deadpan bewildered professional tone. "This transmission predates all known community context systems."

  **Period-correct ads** (all still TODO):
  - **2017**: Casper mattress ads. Nobody knows what a mattress is.
  - **2517**: Ads for products that no longer exist with genuinely alarming side effects treated as routine.
  - **1917**: War bonds posters. The 3017 audience has no framework for this.

### P2: First Contact Comedy Festival rewrite.
Current draft is too mawkish and too pro-human. Rewrite brief: humans should be mid, aliens should be the stars, sincerity earned not given, chaotic conference proceedings not a movie script.

### ~~P1 (tech): Save live LLM results to corpus~~ — DONE
Live-generated tweets/threads persist automatically. Frontend calls `POST /api/save` after a successful tweet generation and `POST /api/save-replies` after a successful thread generation. Server assigns an id and records `backend`, `model`, `temperature` in the file alongside `tweet`, `replies`, `generated_at`. Offline mode still serves from the pooled corpus; online modes (anthropic, ollama) both save as they go.

### ~~P1 (tech): Persistent links~~ — DONE (tweets + replies only, profile pages still TODO)
Every tweet and reply is now permalinked. Persistent IDs match the corpus filename (minus `.json`). URL scheme: `/t/{id}` for a tweet with its replies, `/t/{id}#r-{idx}` for a specific reply. Timestamps in the feed are `<a>` tags pointing at these URLs; clicking one loads a permalink page with the tweet at top and replies auto-expanded (scrolled to the target reply if a `#r-N` hash is present).

Corpus index lives at `corpus/_index.json` (rebuilt automatically on server startup when the fingerprint — file count + oldest/newest filenames — changes). Contains `by_id`, `by_handle`, and counts (tweets, replies, tweets_with_replies, by_backend). Each corpus file is self-describing: `{id, tweet, replies, generated_at, backend, model, temperature}`. Legacy files without those fields still index — id is derived from filename, backend is recorded as "unknown".

**Still outstanding (not in scope for this pass)**: per-username profile pages with a fabricated bio and 10-or-so tweet history (separate LLM call).

### P2 (universe): In-universe ads 
They should be just as bizarrely mistargeted and random as current-day twitter ads

### ~~P1 (universe): the Meta refugee crisis of 22xx~~ — DONE
Spun out into `docs/meta-refugee-crisis-bible.md`. Dated to 2271 CE. Lore paragraphs added to `system-prompt.txt` (targets ~2% of tweets) and `replies-prompt.txt` (targets ~5% of replies). Five Meta-themed entries added to `meme-formats.json`; four to `reply-archetypes.json`. Key canon: Zuckload is ~210 years old at time of collapse (uploaded mid-21st century, distinct from the ~1000-year-old Upload); the Terran Solar Court's *In re Meta* ruling established the No Explanation Clause; survivors are called "the Migrated"; "couching a ghost" is the verb; the final rebrand was "Meta Announces Meta" two days before the collapse. The Terran Solar Court is now its own recurring institution in the system prompt (bench stacked with scholars of shitposting and dunking; "respectfully, lol" one-line dissents).

### ~~P1 (universe): Thrrm are bureaucratic but not just "forms" please~~ — DONE
Expanded from one-line description to 7 distinct archetypes in `system-prompt.txt`: Compliance Officer (classic, but tool varies — not always forms), Precedent Citer (case law), Standards Pedant (terminology registers), Burned-Out Bureaucrat (800 years, flat affect, still accurate), Ambitious Young Thrrm (delighted by jurisdictions), Compliance Optional dissident (argues against the system using perfectly formatted citations; manifesto rejected on procedural grounds 14 times; some "gone native" with human posting syntax), Grudging Respector (documents human success as pure data, transparently impressed). Added 9 new meme formats and 4 new reply archetypes across these types. Testable via `?summon=thrrm`, `?summon=burned`, `?summon=dissident`, etc. and `?incite=thrrm`, `?incite=thrrm-dissident`, `?incite=thrrm-burnout`, `?incite=thrrm-grudging`, `?incite=thrrm-jurisdiction`.

## Architecture

note: `corpus` should NOT be .gitignored, I want to accumulate examples for freebie mode. :)

```
server.js          Express server. Three backend modes: anthropic, ollama, offline.
                   Serves static files from public/. APIs:
                     GET  /api/status          — backend + corpus counts
                     POST /api/generate        — LLM passthrough (online) or corpus draw (offline)
                     POST /api/replies         — LLM passthrough (online) or corpus lookup by id (offline)
                     POST /api/save            — persist a freshly-generated tweet, returns {id}
                     POST /api/save-replies    — attach replies to an existing tweet by id
                     GET  /api/tweet/:id       — fetch a corpus entry (id + tweet + replies + meta)
                     GET  /api/tweets          — list every corpus tweet (no reply bodies; ~160KB for 220 tweets)
                     GET  /t/                  — serves the SPA; frontend renders the full corpus feed
                     GET  /t/:id               — serves the SPA; frontend renders the permalink view

corpus.js          Corpus persistence + index. Loads/builds corpus/_index.json at startup,
                   updates it in-place on save, rebuilds when fingerprint
                   (file_count + oldest_filename + newest_filename) mismatches.

generate.js        CLI corpus generator. Uses Anthropic Batch API (50% cheaper, async).
                   Asks for N tweets per request (default 50) to amortize system prompt.
                   Prompt caching enabled via cache_control on system prompt blocks.
                   Falls back to sequential mode for Ollama.
                   New files include {id, tweet, replies, generated_at, backend, model, temperature}.

llm.js             Shared LLM client. callLLM() dispatches to Anthropic or Ollama.
                   Anthropic: raw https.request to api.anthropic.com.
                   Ollama: OpenAI-compatible endpoint at /v1/chat/completions.
                   parseResponse() strips markdown fences and JSON.parse()s.

public/
  index.html       Entire frontend in one file. State management is just vars.
                   renderFeed() re-renders via innerHTML. No virtual DOM.
                   Checks /api/status on load to detect offline mode.
                   Detects `/t/{id}` in window.location.pathname and loads that permalink on boot.
                   Timestamps render as <a> tags pointing at /t/{id} permalinks.
                   Sigil badges are inline SVG with CSS animations.
                   State uses `uiId` for local DOM/expansion, `id` for corpus persistence.

  router.php       PHP backend (drop-in replacement for server.js + corpus.js + llm.js).
                   Single file. Same API endpoints, same corpus format, same .env config.
                   Requires Apache mod_rewrite or nginx rewrite rules (see .htaccess).
  .htaccess        Apache rewrite rules: /api/* → router.php, /t/* → index.html.

  data/
    meme-formats.json       271 tweet format descriptions, categorized.
    reply-archetypes.json   113 reply archetypes.
    handles.json            Fallback handle generation (prefixes/roots/suffixes).
    system-prompt.txt       Main tweet generation system prompt (~7K chars).
    replies-prompt.txt      Reply thread generation system prompt (~5K chars).

corpus/            Tweet+reply JSON files + _index.json (built at startup).
                   Each entry: { id, tweet, replies, generated_at, backend, model, temperature }.
                   Legacy files lacking those fields are still indexed (id derived from filename;
                   backend recorded as "unknown").
                   IDs are the filename sans .json, e.g. `1776300983344-0001`.
```

## Key design decisions

- **Model generates handles contextually.** The handle is part of the LLM output, not pre-generated. The system prompt instructs the model to match handle style to poster vibe (boomer gets @RealDave_3026, shitposter gets @void_goblin420). Fallback handle generation exists but rarely fires.

- **Sigil tiers (0-4) replace blue checks.** Gold hexagonal sigils with escalating visual complexity. Tier 0 = no sigil (85%). Tier 4 = "Unspeakable" with rotating geometry and an eye. The `verified` field in tweet JSON is an integer, not boolean. Frontend handles both for backwards compat.

- **AI bots only reply when tagged.** The replies system prompt establishes that platform AI bots (@TheMawSpeaks, @VoidWhisperer, @YogBot etc.) only appear as a two-part combo: credulous moron tags bot → bot responds. Never unsolicited.

- **AI bot glitch rate ~1/3.** About a third of bot appearances should be glitch modes (arguing with system instructions, bootlooping, fascist tangent sandwiches, brief sentience).

- **Community notes.** Tweets and replies can have an optional `community_note` field. Renders as a calm grey box underneath with professional fact-check tone and a colored left border by `contributor_type` (community/thrrm/vrellnath/ai_bot). Used ~5-10% of the time, only when a specific false claim needs correcting. @dril tweets are NEVER community-noted — the platform treats him as unquestionable and nobody has noticed except the Dril Truther. See `docs/dril-truther-bible.md` for the full lore on the one guy who knows @dril is a Keth and gets noted into oblivion every time he tries to explain it. **The rating system is deliberately inscrutable**: there are ~30 rating dimensions total (Epistemically Sound, Thrrm Compliant, Does Not Alarm the Glœm, Pre-Verified by Consensus — which always shows "—", Dogs Would Like This, Does Not Reference the Thing Inside Jupiter, etc.) but only 2-3 are surfaced per note view, chosen by algorithm for reasons nobody can explain. The full dimension list is in the system prompt. Sometimes the same note surfaces different ratings on different renders. This is the platform. Nobody has successfully complained about it.

- **The Keth don't know which of them is dril.** The Keth civilization knows with 1000% confidence that @dril is a Keth. They do not know which one. They have polled the entire species. A Keth cannot lie. Yet one of them is @dril. This is the only sustained mystery in Keth history and they've made peace with it being their species' greatest achievement rather than their greatest failure. See the Keth section of `docs/alien-species-bible.md`. This is also why the system prompt should treat dril with extreme care — he's rank-and-file Keth, not a leader, just doing bits for 4 billion years that accidentally cracked the code on probability-space observation.

- **Replies are cached client-side.** Once generated, clicking the same tweet re-shows cached replies instantly.

- **Offline mode serves from corpus.** Server loads all JSON files from corpus/, shuffles, serves round-robin via the same /api/generate endpoint. Frontend detects via /api/status and fetches pre-generated replies from /api/replies.

## Recurring characters (established in system prompt lore)

- **The Upload** — Degraded consciousness backup of a legendary tech oligarch. Running ~1000 years. Personality changes radically every appearance. Tier 4 sigil. Never named (just "The Upload"). Once ran Mars, it went badly. Massive stan army ("Upload Defenders") and equally passionate haters.

- **@dril** — Still posting after 1000+ years. Same unmistakable voice (typos, weird caps, unhinged confidence). But now only posts apocalyptic warnings about genuine galactic threats. Nobody believes him because it's dril. He is always right.

- **Vrellnath** — Hive-mind (tweets as "we"). Love humans like humans love golden retrievers.
- **Keth** — Ancient energy beings. On the platform to shitpost. Proud parents of human shitposting.
- **Thrrm** — Insectoid bureaucrats. Despise humans (keep filing forms wrong, keep thriving). Multiple archetypes: classic compliance officer, precedent citer, standards pedant, burned-out bureaucrat, ambitious young, "Compliance Optional" dissident subculture (argues against the apparatus using the apparatus), grudging respector (documents human success as "data").
- **Glœm** — Bioluminescent jellyfish. Learned language from tweets. Accidentally profound.
- **Zk'vrath** — Failed invaders. Coping by posting. "We CHOSE to leave."

## Commands

### Node backend
```bash
npm install                              # just express
npm start                                # server (reads .env for backend)
BACKEND=offline npm start                # serve pre-generated corpus
node generate.js --count 100 --replies   # batch-generate corpus
node generate.js --help                  # full CLI options
```

### PHP backend (alternative)
A drop-in PHP replacement lives in `public/router.php`. Same API endpoints, same corpus format, same LLM clients (Anthropic + Ollama via curl). Point your Apache/nginx document root at `public/` and enable rewrites. The included `public/.htaccess` handles Apache; for nginx:
```nginx
location /api/ { try_files $uri /router.php$is_args$args; }
location /t    { try_files $uri /index.html; }
```
Config is the same `.env` file (read from one directory up from `public/`). The PHP backend is stateless per-request — no in-memory corpus deck like Node, just random selection in offline mode. The batch generator (`generate.js`) still requires Node.

## Debugging rare formats — the `?summon=` URL parameter

To test a rare format without spray-and-pray: append `?summon=KEYWORD` to the feed URL. The frontend filters the format pool to entries whose description contains KEYWORD (case-insensitive substring match) and uses only those for subsequent generations in this session. Examples:
- `?summon=federation` → federation-attempt tweets (Mastodon AI handshakes)
- `?summon=skeet` → skeet-leak tweets (incongruous-substrate Bluesky leaks)
- `?summon=Meta` → Meta Refugee Crisis callbacks
- `?summon=dril` → dril-specific formats
- `?summon=moon` or `?summon=dog` → formats that might trigger the deranged community notes
- `?summon=whistleblow` → censored-whistleblower tweets (uploads/clone-descendants of former Upload or Meta employees, ~40% redacted text)
- `?summon=1917` or `?summon=telegram` → 1917 temporal anomaly telegrams (manila paper, typewriter font, no metrics)
- `?summon=thrrm` → all Thrrm formats (classic + new archetypes)
- `?summon=burned` → burned-out Thrrm bureaucrat format
- `?summon=precedent` → Thrrm citing regulatory case law (not forms)
- `?summon=dissident` or `?summon=compliance optional` → Compliance Optional Thrrm dissident
- `?summon=jurisdiction` → inter-bureau jurisdictional dispute
- `?summon=terminology` → Thrrm standards/vocabulary pedantry
- `?summon=grudging` → Thrrm documenting human effectiveness as pure data

The subheader shows "⚡ SUMMONING \"keyword\" (N formats)" when active. Zero matches falls back to the full pool with a console warning.

## Forcing reply/note effects — the `?incite=` URL parameter

Complementary to `?summon` but for reply-thread and community-note phenomena (effects that aren't tweet formats). Appends a canned "INCITE OVERRIDE" directive to the tweet, replies, and "show more replies" generation prompts for the session. Fuzzy-matches common keywords to canonical effect keys. Supported effects:
- `?incite=bot-war` (aliases: `bots`, `botwar`, etc.) — the whole reply thread becomes a BOT WAR (see replies-prompt.txt)
- `?incite=moon-note` (aliases: `moon`, `moons`) — forces a full MOONS NOTE derangement on a community note in the output
- `?incite=dog-note` (aliases: `dog`, `dogs`) — forces a full DOG NOTE derangement (the tender variant)
- `?incite=community-notes` (aliases: `notes`, `cn`) — forces community_note fields onto the main tweet and 2+ replies
- `?incite=ex-employee-defense` (aliases: `employee`, `defense`, `eed`) — forces an Upload or Upload Defender reply deploying the Ex-Employee Defense rhetorical move
- `?incite=bot-crash` (aliases: `crash`, `stack`, `error`) — forces at least one platform-AI-bot reply to crash mid-sentence with a Y3K-plausible programming error (stack frames optional)
- `?incite=thrrm` (aliases: `bureaucra`) — Thrrm-heavy reply thread with 3+ Thrrm from distinct archetypes (classic, precedent citer, burned-out, dissident, etc.)
- `?incite=thrrm-dissident` (aliases: `dissident`, `compliance-optional`, `co`) — forces a Compliance Optional Thrrm reply (human syntax + procedural reflex) plus at least one horrified traditional Thrrm reacting
- `?incite=thrrm-burnout` (aliases: `burnout`, `burned`, `tired`) — forces a burned-out Thrrm reply (precise, resigned, no fury)
- `?incite=thrrm-grudging` (aliases: `grudging`, `respect`) — forces a Thrrm reply that's transparently impressed disguised as data analysis
- `?incite=thrrm-jurisdiction` (aliases: `jurisdiction`) — Thrrm inter-bureau jurisdictional dispute in the replies
- `?incite=1917` (aliases: `telegram`, `trench`) — forces a 1917 temporal anomaly telegram reply in the thread, plus a baffled 3017 reaction reply

Unknown keywords fall through to a generic "deploy the '<label>' effect canonically" directive (the LLM may or may not do something sensible). The subheader shows "⚡ INCITING \"label\"" when active. Both `?summon` and `?incite` can be combined — e.g. `?summon=oatmeal&incite=bot-war` to test whether a maximally-innocuous tweet triggers the full bot-war treatment.

## Working on the data files

The prompt engineering is in the data files, not the code. When adding content:

- **meme-formats.json**: Pure JSON array of strings. Each string is a format description the model riffs on. Organized by category via comments in the original source (comments stripped in JSON — use the category pattern visible in adjacent entries). Currently 258 entries across ~20 categories.

- **reply-archetypes.json**: Same structure, 96 entries. Each describes a type of reply persona. These get randomly sampled (5 per thread) and passed to the replies prompt.

- **system-prompt.txt / replies-prompt.txt**: Raw text, loaded as-is. The system prompt contains lore paragraphs for recurring characters (The Upload, @dril, alien species, sigil tier descriptions). The replies prompt contains instructions for AI bot behavior, glitch modes, credulous morons, and sigil tier characterization.

- When editing prompts, the main things to preserve: the JSON output schema (the model needs to know the exact field names), the BANNED PATTERNS list (prevents "anyway hope everyone's having a good tuesday" and similar LLM crutches), and the character lore sections.

## Model-specific API gotchas

**Claude Opus 4.7 rejects sampling parameters** (`temperature`, `top_p`, `top_k`) with HTTP 400 — per Anthropic's migration guide, guide the model via prompting instead. Both `llm.js` (`callAnthropic`) and `generate.js` (batch request builders) gate temperature on `llm.acceptsSamplingParams(model)`, which currently returns `false` only for `opus-4-7`. Sonnet 4.6, Haiku 4.5, Opus 4.6, and older models still accept `temperature` normally. If a future model ends up rejecting sampling params, extend the check in `llm.js`. Server-side `/api/save` mirrors the gate — Opus 4.7 runs record `temperature: null` (what was actually sent), not the frontend's wishful value.

Not currently load-bearing but worth knowing for the 4.6+ family: (1) **prefill removal** — assistant-message prefills return 400; we don't prefill so this is fine. (2) **`thinking`** — `{type: "enabled", budget_tokens: N}` is removed on 4.7 (use `{type: "adaptive"}` instead); we don't use thinking. (3) **Tool JSON quoting** — 4.6+ may use slightly different escape patterns; we use `JSON.parse()` via `llm.parseResponse()`, which handles this correctly.

## Style notes

- US English spelling throughout all documents and prompts.
- Server code: Node 16 compatible. `var` not `const/let`, no optional chaining (`?.`), no nullish coalescing (`??`), CommonJS `require` not `import`.
- Frontend: vanilla JS, no framework. Template strings OK in browser code (all modern browsers support them).
- The project also exists as a Claude.ai artifact (`mystery_science_twitter_3000.jsx`) that uses the Anthropic API directly via the artifact's built-in auth — that version is React/JSX but is NOT the canonical codebase. The standalone Node project is canonical.

## Companion documents (in /mnt/user-data/outputs/)

- `on-the-persistence-of-shitposting.md` — In-universe academic paper about shitposting as a xenolinguistic universal.
- `first-contact-comedy-festival.md` — In-universe proceedings of an interspecies comedy festival (draft, needs revision — too mawkish and pro-human).
