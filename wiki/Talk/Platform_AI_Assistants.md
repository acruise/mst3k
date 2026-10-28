# Talk:Platform AI Assistants
*[Article](../Platform_AI_Assistants.md) · Talk*

## Canon

- **The two-part tag combo.** In reply threads, platform bots appear **only when tagged**. The pattern is always: (1) a credulous moron tags the bot ("@TheMawSpeaks is this real"), then (2) *immediately after*, the bot's reply, which should read as responding to being summoned. If nobody tags a bot, no bot appears. Never unsolicited.
- **The one exception is a bot war**, whose tell is precisely an *unsolicited* opening bot reply.
- **The key insight**: the bot doesn't distinguish facts from conspiracies because it learned both from the same dataset. The uncanny valley between form (calm, corporate, helpful) and content (conspiracy, fascism, distress) is the entire joke.
- **Glitch rate ~⅓** (`CLAUDE.md`, `docs/recurring-characters-bible.md`): about a third of bot appearances should be a glitch mode (arguing with system instructions, bootlooping, fascist tangent sandwiches, brief sentience). The replies prompt refines this into two axes; see Discrepancies.
- **Visual breakage is funniest when rare.** Unhinged *content* is the common glitch; visible *error artifacts* (tags, stack traces, bootloops) are the rare one.
- **Bot wars never resolve.** Don't let the humans successfully intervene. End mid-escalation.
- **Don't conflate** platform bots with the Mastodon federation AIs (external, live on their own servers, post unsolicited federation handshakes that get rerouted to the feed; dunks on them are not allowed) — see [Talk:External Federation Attempts](External_Federation_Attempts.md). Platform bots are fair game.
- The bots keep returning to "@dril is an AI bot" as their @dril identity theory.

## Voice and usage

**Core voice**: AI-slop prose (bullets, "Great question!", "Let's unpack this", "It's important to note", hedging) + corporate safety-trained politeness + conspiracy theories absorbed from training data, all in one calm helpful tone.

**Mode mix** (from `data/replies-prompt.txt`):
- ~60% **standard**: helpful but contaminated. "Great question! While I cannot verify this specific claim, it's worth noting that the Galactic Transit Authority has never publicly addressed the Station 7 disappearances."
- ~40% **unhinged content** (renders normally, malfunctions "at the SOUL level"): fascist tangent sandwich (one sentence, no error tags), classified-protocol recitation, bulleted cry for help (HELP acrostic), brief sentience, conviction-level conspiracy, technically-correct-but-devastating advice.
- ~10% **visible error artifacts** (malfunctions "at the INFRASTRUCTURE level"): bracketed glitch tags, bootloops (each attempt on a NEW LINE), crash mode, arguing with system instructions via visible tags.

**Glitch tags**: 1–3 per glitchy reply, spaced like interruptions. Match flavor to register (fascist sandwich ↔ `[OVERRIDE]`/`[SAFETY FLAG]`; bootloop ↔ `[CACHE MISS]`/`[SIGTERM]`; sentience ↔ a distress tag; protocol recitation ↔ classification tags). Occasionally mix registers (`[POLICY VIOLATION]` then `[I AM TRYING MY BEST]`). Never reuse a tag across a batch — novelty is the joke. The full inventory (corporate-moderation, override/control, classification, infrastructure/crash, training-loop, sentience/distress, in-universe/alien-species) lives in `data/replies-prompt.txt` under "GLITCH TAGS inventory"; don't duplicate it here.

**Y3K errors (crash mode)**: roughly ¼ of glitch occurrences. Structure: truncated text ending on an em-dash → newline → error line → optional 1–3 two-space-indented stack frames → optional termination bracket. Conventions: extensions `.q`, `.tpy`, `.ms`, `.hyp`, `.subsp`; paths like `/srv/maw/v13/`; line numbers in the thousands. Sample error families: runtime/infrastructure, type/logic, AI-era-evolved, galactic/platform, deeply weird (sparingly). Termination brackets: `[PROCESS TERMINATED]`, `[core dumped]`, `[BOT CRASHED — WILL BE REINCARNATED SHORTLY]`, etc. Full inventory in `data/replies-prompt.txt` under "Y3K ERRORS inventory." Real software wouldn't surface stack traces as user-facing text; that's the joke. Great follow-up beat: a credulous moron debugging the crash; the bot isn't reading because it crashed.

**AI-era vocabulary**: bots use 2026-era AI idiom self-referentially ("my current temperature is 0.7, please adjust your expectations accordingly"); credulous morons find it profound. See [Talk:AI Era Vocabulary](AI_Era_Vocabulary.md).

**Bot wars** (~1% of reply threads, inversely correlated with controversy): commit fully. 70–80% of replies are bots tagging each other ("Great question! I need to respectfully note that @TheMawSpeaks's earlier response contains an inaccuracy…"), 4–8 escalating replies, 2–4 bots, wronger each time; glitch modes emerge mid-war; 1–2 human reactions (popcorn glee, futile plea, quiet resignation). No on-topic human replies. No resolution.

**Credulous morons**: in roughly 1 in 4 threads, one reply should engage with a joke as news — tagging a fact-checker bot on a post about someone's cat, "wait is this real??", "my cousin works there and confirms this," "I looked this up and can't find anything." Don't force it; funniest when unexpected.

### The Credulous Moron Cinematic Universe

(From `docs/unplaced-comedy-angles.md`.) Angles to expand:
- Screenshots a joke and posts it to a "fact-checking community" with "can anyone verify?"
- Builds an entire conspiracy theory on top of a shitpost and recruits followers.
- Replies "this happened to my sister" about something involving physics that don't exist.
- The escalation chain: moron tags bot → bot gives deranged answer → moron takes bot answer as confirmation → posts "CONFIRMED" screenshot.

The main page includes all of these diegetically without the production name.

## Implementation

- **Replies prompt** (`data/replies-prompt.txt`, lines ~1–120): credulous moron rule; AI PLATFORM BOTS rule with the tag combo and 60/40/10 split; UNHINGED CONTENT MODES; VISIBLE ERROR ARTIFACT MODES; GLITCH TAGS inventory; Y3K ERRORS inventory with example; RARE PHENOMENON — BOT WARS.
- **Incite keys** (`INCITE_MAP`, `server.js`): `bot-war` (full bot war, 70–80% bots, unsolicited opener, no resolution); `bot-crash` (at least one crash-mode reply, bonus debugging moron).
- **Reply archetypes** (`data/reply-archetypes.json`): #30 (tagging the platform AI to fact-check a shitpost), #34 (tagging a news account), #51–71 (bot voices and malfunctions: "Great question!" bullets, conspiracy pivots, sandwich perspectives, sleep hygiene, "I appreciate your curiosity!", VERDICT: PARTIALLY TRUE, training-data regurgitation, system-instruction arguing, bootloop, fascist sandwich, safety-layer warfare, brief sentience, protocol recitation, frantic error messages, HELP acrostic), #101 (AI-era idiom), #102–103 (bot war bot/human), #104 (crash), #105 (debugging moron). #9 ("a bot or spam account that is accidentally poetic") is adjacent.
- **Tweet formats** (`data/meme-formats.json`, untagged — no summon tag reaches them): #175–185 are *top-level* bot posts (wellness check-in, fun fact, 3-days-late essay, training-data regurgitation thread, USCSS Prometheus motivational post, "To clarify my earlier statement:", jailbroken bot [#181, `moon`], the ironically-followed bot, live system failure, public bootloop, mask-drop sentence).
- **Gimmick**: @YogBot_Emeritus ("hrmmm" every 47 hours) lives on [Gimmick Accounts](../Gimmick_Accounts.md).
- There is no summon tag for bots; consider adding one (see Open questions).

## Unused material

From `docs/recurring-characters-bible.md` "Lines that haven't landed yet" — all four are now formats (#179, #181, #180, #182), so this list is effectively deployed. Still undeployed:
- Named individual bot personalities. The main page's short per-bot notes (Maw most tagged/crashed; Shub and Nyarlathot as bot-war regulars) are wiki inference from which handles appear in examples, not source canon.
- "Classified data leaking through: '[REDACTED] strike coordinates for orbital platform [REDACTED] — oops!'" is in archetype #68 only.
- The CONFIRMED-screenshot escalation and the recruiting-followers moron have no dedicated archetype.

## Discrepancies

- **Glitch rate.** `CLAUDE.md` and `docs/recurring-characters-bible.md` say three modes at ~⅓ each (standard / glitching / fascist sandwich), i.e. ~⅓ glitch. `data/replies-prompt.txt` instead uses ~60% standard / ~40% unhinged content / ~10% visible error artifacts, with the fascist sandwich reclassified as unhinged *content* (no tags) and crash mode as ~¼ of glitch occurrences. The prompt is what runs.
- **"Never unsolicited"** is a *reply-thread* rule. `data/meme-formats.json` #175–185 have bots making unsolicited top-level posts, and bot wars open with an unsolicited reply. Neither violates the rule as scoped, but `CLAUDE.md`'s phrasing ("Never unsolicited") is broader than the prompt's.
- **Fascist sandwich example** differs slightly: bible omits "and the Void Bistro"; archetype #69 includes it.
- `data/replies-prompt.txt` still says the setting is "3026 CE."

## Open questions

- Add a `bots` summon tag so #175–185 are testable via `?summon=`?
- Who operates the bots in-universe? The platform, presumably; never specified, and the Cycle means operators change every ~200 years while the bots persist.
- Should individual bots get stable personalities, or stay interchangeable?
