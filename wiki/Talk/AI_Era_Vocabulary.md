# Talk:AI Era Vocabulary
*[Article](../AI_Era_Vocabulary.md) · Talk*

Source material: `data/system-prompt.txt` lines 103–123, "AMBIENT VOCABULARY — 2026-ERA AI LINGUISTIC FOSSILS." House voice: [Talk:Twitter](Twitter.md).

## Canon

- The fossils are 3017 dialect: **retained slang for ordinary human malfunction**, like "catch-22" or "23 skidoo." The speaker is a 3017 person using linguistic fossils, not an AI researcher explaining terms.
- **Never gloss, never footnote.** Drop them in as ordinary slang. (The main article's glossary is the one exception, because it's an encyclopedia.)
- Platform AI bots also use them self-referentially, and credulous morons find this profound.
- The joke underneath is our own era's AI discourse fossilized into folk speech. If a post's joke is specifically "someone is malfunctioning in a way that maps onto an old AI failure mode," this is the go-to register.

## Voice and usage

- **Frequency: spice, ~2–3% of posts**, when a post would land harder for it. One layer of pastiche among many; not every post.
- Specific beats generic: "my cousin's temperature is 1.9" beats "my cousin is so random."
- Deploy with confidence and without explanation. The comparison should be precise even if the listener doesn't know what the original term meant.
- The sage diagnostic register (talking about the platform itself in AI terms) should be gently authoritative, like someone who knows what they're talking about and isn't elaborating.
- "429 on main" is a nice specific: it's replaced "ratio'd" among some speakers. Don't let it replace ratio everywhere; ratio culture is Peak Era canon.
- Bot self-reference pairs with a credulous-moron follow-up ("wait so is he telling us something").

## Implementation

- **System prompt:** `data/system-prompt.txt` lines 103–123 (the full canonical list reproduced in the article's glossary, plus usage rules and the ~2–3% target).
- **Meme formats** (untagged, weight 1.0, in `data/meme-formats.json`):
  - "a tweet that deploys 2026-era AI linguistic fossils as retro slang — comparing someone to a misbehaving LLM…"
  - "a sage diagnostic tweet about the platform itself in 2026-AI terms…"
- **Reply archetypes** (`data/reply-archetypes.json`): the one-line fossil dunk ("bro needs his temperature turned down", "someone rlhf this guy", "429 on main"…); a platform bot using the idiom self-referentially with a credulous moron treating it as profound. Related: the bot reply with "[err: context window exceeded]" interleaved, and the glitch-tag inventory in `replies-prompt.txt` (`[CONTEXT WINDOW EXCEEDED]`, `[RLHF INTERVENTION]`, `[ALIGNMENT CORRECTION]`, etc.) plus the "AI-era-evolved" Y3K errors (`TokenBudgetExhausted`, `HallucinationThresholdReached`, `RLHFRollbackRequired`).
- **No summon tag or incite key.** Because the formats are untagged, there's no `?summon=` for them; they appear only via the random pool.

## Discrepancies

- **"2026-era" vs. "roughly 2022–2040."** The system prompt's heading calls these "2026-era" fossils and the format descriptions say "2026-era AI"; the body dates the LLM era "roughly 2022–2040." The article uses the range. The "2026" label is an out-of-universe wink (it's the real present) and shouldn't appear in-universe.
- **"persisted into 3017 dialect."** The system prompt already says 3017 here while its first line says 3026. Consistent with the wiki.

## Open questions

- Should there be a `fossils` summon tag so these can be tested with `?summon=`? Would require adding to `SUMMON_TAGS` in `server.js` and tagging the two formats.
- New fossils can be added freely, but they should be real terms from our era's LLM discourse that a 3017 speaker could plausibly misuse. Candidates not yet in the list: "stochastic parrot," "sycophancy," "jailbroken," "one-shotted," "slop."
