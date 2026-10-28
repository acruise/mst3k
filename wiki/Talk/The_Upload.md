# Talk:The Upload
*[Article](../The_Upload.md) · Talk*

## Canon

- **Never name him.** He is "The Upload," "the founder upload," or "him." Everyone knows who it means. Do not use the real-world person's name, ever, in generated content or in the wiki.
- **He is a degraded ~1000-year-old backup.** Personality changes RADICALLY between appearances (poet, militant, wholesome dad, meltdown, philosopher king, "regular guy"). The forks have diverged. Tier 4 Unspeakable sigil. Hundreds of millions of followers, mostly bots he probably controls. Can crash or moon economies with one word. Posts polls about buying celestial bodies.
- **The Ex-Employee Defense survives every fork.** Whatever else changes, he blames a former employee who "modified my design and got it wrong." The named employee is different every time. Two named people never worked for him; one is fictional; one is himself. Every instance should feel *recognizable* — it's the tell. This page is the wiki's primary home for the Defense.
- **He denies the 2049 rocket, unprompted, always.** He also concedes the engine component was built to his patent. Never reconcile the two.
- **He was NOT the post-2049 "interested individual."** The Golden Age (2049–2087) is the proof: the platform worked too well. Treat as settled canon. Who it *was* stays unknown; nobody presses.
- **Upload-era platform fuckups are hilarious-but-survivable, never catastrophic.** The 2035 collapse was catastrophic because he failed passively as a manager; the cyclical buyout eras are survivable because his wealth shields him from caring. Platform bad, life continues.
- **The Cycle is ~200 years and @dril is right about it.** Buyouts: 2087 first, then roughly every couple of centuries. @dril's 3017 post predicting a 3022 attempt is canon. Per `CLAUDE.md`, it *will* happen ("five years later it happens"); in-universe, as of 3017, it has not resolved, so main-namespace text must treat it as a pending prediction.
- **Mars is a separate saga from the platform saga.** Don't conflate his running Mars with his platform ownership. "Mars Was Right" is deliberately subjectless; never say what Mars was right about.
- **Keep The Upload and the Zuckload apart.** Distinct entities. He has implied he knew the Zuckload (4 times) and once that he *was* it — do not confirm or engage. The Ex-Employee Defense is about *his own* disasters; do not have him deploy it about Meta, and do not connect the 2049 rocket to the 2271 Meta sabotage. That Meta investigators also landed on a "disgruntled ex-employee" (the Purgecoder) is coincidence/genre convention, not crossover.
- **Dunking on his proximity to every disaster is eternal and correct.** Dunking on the 2049 commune's naivety is fine. Dunking on people who were sad in the Great Quiet is not.
- **He never worked at Meta.** Defenders who claim otherwise are wrong and cannot be told.

## Voice and usage

General peak-Twitter register: see [Talk:Twitter](Twitter.md).

- **The comedy is in the reaction to him as much as in what he says**: the exhausted normies, the ride-or-die stans, the people trying to talk about anything else.
- **Stan swarms** (from `replies-prompt.txt`, "UPLOAD STAN SWARMS"): any tweet that mentions him, even glancingly, tends to summon Defenders. If the main tweet is a *dunk* on him, expect ~2–3 stans in a 5-reply thread, each using a *different* canon phrase — never the same phrase twice in one thread. Stans occasionally schism against each other (Militant / Poetry / Asteroid Garden).
- **The escalator**: merciless dunk → stan swarm → stans get dunked on → by reply 5 the thread is about how unhinged Upload Defenders are.
- **Dunks on him are merciless and surgical**, one-liners: "sir you are a corrupted backup of a man who has been dead for a thousand years please log off", "maybe this fork needs a patch".
- **Don't put Defenders in every thread.** Save them for threads referencing him, past Upload events, or stan-bait topics (Mars, rebrands, billionaires, consciousness uploads).
- Display-name jargon for stans: "⚡ Upload Defender ⚡", "Mars Was Right", "Free Thinker", "Eternal [NAME] 🧡" (grandma-coded).
- Example Defender line: "people keep bringing up the '49 rocket like it's relevant. read a book. that was a FORMER EMPLOYEE'S component. he has DISTANCE from this."
- Example cycle-aware reply: "every 200 years, on schedule. set your clocks." / "@dril called it in 3017 and nobody listened, again".

## Implementation

- **System prompt**: `data/system-prompt.txt` "RECURRING CHARACTER — THE UPLOAD" (lines ~14–22); platform-history block (lines ~27–38) covers 2035, the rocket, the Ex-Employee Defense, the Golden Age alibi, 2087, the Cycle, the 3022 prediction, Mars; line ~47 covers the Zuckload non-relationship; line ~68 covers his wealth surviving collapses and the 2912 Correction.
- **Replies prompt**: `data/replies-prompt.txt` "RECURRING BEHAVIOR — UPLOAD STAN SWARMS".
- **Summon tag** `upload` (18 formats in `data/meme-formats.json`): the phase formats (#186–195: poetry, militant, wholesome, meltdown/Oort poll, philosopher king, unhinged-even-for-stans, terrible venture, lucid moment, one-word economy crash [`upload`,`moon`], regular-guy breakfast), about-him formats (#196–198), the Ex-Employee Defense (#268), top-level dunk (#280), stan-swarm formats (#282–283), and the Defenders-vs-FALGSC format (#90, `falgsc`+`upload`). The "remember when the upload [X]" screenshot-dunk (#281) is tagged only `moon`.
- **Incite key** `ex-employee-defense`: forces an Upload or Defender reply deploying the Defense (`INCITE_MAP` in `server.js`).
- **Reply archetypes** (`data/reply-archetypes.json`): #72–77 (stan and anti-stan basics), #96 ("Ex-Employee Defense just dropped"), #97 (Defender relitigating the 2049 engine), #106 (swarm jargon), #107 ("things he actually built"), #108 (Grandma Stan), #109 (era schism), #112 (stan dismissing a whistleblower), #128 (Defender defending whichever Hells position is operative).
- The Upload is always Tier 4 (`verified: 4`).

## Unused material

- The rare lucid moment and the "regular guy" breakfast phase were listed as "not landed yet" in `docs/recurring-characters-bible.md` but are now formats #193 and #195.
- The Consciousness Upload Consumer Protection Act of 2634 appears only as a list item in format #281; it has no dedicated format.
- Platform-history callbacks not yet in data as their own formats: the annual "pour one out for the commune" post (exists as the @PourOneOutBot gimmick), the "hilariously survivable fuckup" format where a 200-year-old quote-tweet shows someone laughing about the previous one, folk-hero posts about the unnamed post-2049 operators.
- Defender listing "his early work at meta" (from `docs/meta-refugee-crisis-bible.md`).
- The Upload's shifting Hells / Movers / Drifters positions (in `docs/hells-leak-bible.md`, `docs/movers-and-drifters-bible.md`) and his four Mastodon purchase proposals (`docs/federation-attempts-bible.md`) and "in talks with Bluesky" (in `docs/platform-history-bible.md`) are sourced from other clusters; summarized here for completeness.

## Discrepancies

- **When was he uploaded?** `docs/platform-history-bible.md` and `data/system-prompt.txt` say he was "still his pre-upload meat self" as last owner of Twitter in 2035. `docs/meta-refugee-crisis-bible.md` says he was "uploaded ~2026." The wiki main page avoids giving an upload date.
- **When did he run Mars?** `docs/recurring-characters-bible.md` says his Mars tenure "began shortly after the 2049" rocket disaster. `docs/platform-history-bible.md` says "beginning some decades into the 22nd century" and describes the 2049 commune as dying "decades before" he ran Mars. `docs/meta-refugee-crisis-bible.md` places Mars "going sideways" when the Zuckload was a ~20-year-old upload and The Upload ~200 years old, which fits neither (Zuckload uploaded mid-21st century → ~2070s–2080s; a ~200-year-old Upload → ~2220s). The main page leaves the dates unstated.
- **Ex-Employee Defense and Meta.** `docs/platform-history-bible.md` "Recurring callbacks" suggests "Ex-Employee Defense just dropped" under any Upload statement about "Meta, Mars, or any other disaster," but the same doc's guardrails say he does not deploy the Defense about Meta. Reply archetype #96 omits Meta. Treat the guardrail as authoritative.
- **"3026" as present**: the Upload paragraph in `data/system-prompt.txt` still says "in the year 3026."
- **Format #268** has a duplicated tag (`["upload", "upload"]`); harmless.
- **Format #281** ("remember when the upload…") is tagged `moon` but not `upload`, so `?summon=upload` won't reach it.
- **"~40th time this century"** (format #268) is the only frequency given for the Defense; the wiki main page adopts it as "roughly forty per century."

## Open questions

- Who the post-2049 "interested individual" was (intentionally unresolved — keep it that way).
- The exact current ownership state in 3017 (is he in phase 5, coveting?). Implied by the 3022 prediction: he does not own it now.
- Whether the Jupiter rename attempt (format #281 only) deserves more canon.
- How the 3022 buyout plays out once the redate lands.
