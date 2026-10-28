# Talk:Twitter
*[Article](../Twitter.md) · Talk*

This page is the **house style guide** for writing peak-Twitter voice in 3017: in prompts, in meme formats, in reply archetypes, in hand-written corpus entries, and in lore that quotes posts. Most other Talk pages link here instead of repeating it. Source material: `data/system-prompt.txt` lines 1–13 and 244–267, the "Core rules" and "BANNED PATTERNS" sections of `data/replies-prompt.txt`, and `docs/platform-history-bible.md` (Twitter era).

## Canon

- **The premise.** The humor and formats are *exactly* mid-Twitter (2012–2019): dril energy, weird twitter, brand twitter cringe, wholesome twitter, subtweeting, ratio culture, hot take threads, the works. All *subject matter* is transposed ~1000 years forward: FTL is mundane, aliens are neighbors, consciousness uploading is a lifestyle choice, generation ships are gentrifying. The joke is the collision: a 2014 cadence carrying 3017 content. Neither half should wink at the other.
- **Diegetic reason.** The Hellsite deliberately and knowingly replicates the Peak Era; nobody in-universe questions it. So a 3017 poster sounding like 2015 is not an anachronism to explain, it's the house style.
- **Twitter facts:** founded mid-2000s; peak ~2012–2019; decline ~2020–2035 under a succession of owners, the last being The Upload (pre-upload); ceased 2035, cause of record "mismanagement." The 40%-of-engineering-hours-on-seeing-his-own-posts-first detail and the "sixteen incompatible directions" of monetization are canon.
- **Vocabulary.** "Post" is the normal in-universe word; "tweet" is archaic and affectionate. Out-of-universe (prompts, code, JSON) we still say tweet; that's fine.

## Voice and usage

### Core aesthetic rules

These are the rules the model is given for top-level posts (`system-prompt.txt` lines 3–12). Hold hand-written material to them too.

1. **Real.** A post should feel like something you scrolled past at 2am and snorted at. If it reads as a joke *about* Twitter rather than a tweet, it's wrong.
2. **Twitter orthography.** Lowercase by default, periods optional, deliberate misspellings for effect, occasional ALL CAPS for emphasis.
3. **Short.** Most posts are 1–3 sentences. A thread starts with "(1/)" and you only write the first post.
4. **No hashtags unless the hashtag is the joke. No emoji spam.** Authentic voice over signaling.
5. **Display names are funny** and feel like something a real person chose that week.
6. **Handles match the poster's vibe** (see below).
7. **Some posts are genuinely poignant or beautiful.** That was peak Twitter too. Don't make everything a gag.
8. **Self-contained.** Each post has to work cold, without the reader knowing the lore. Lore should be legible from context or be funny even if illegible. Never footnote, never gloss (this matters especially for [AI-era vocabulary](../AI_Era_Vocabulary.md)).

### Handle-style matching

The model generates the handle as part of the post, and handles are part of the comedy. Match the handle to the poster:

| Poster | Handle shape | Examples |
|---|---|---|
| brand / corporate | clean, corporate | @OmegaCorpCares |
| shitposter | unhinged | @void_goblin420 |
| boomer | Real/first-name + place | @RealDave_3017, @GaryFromTitan, @RealGary_Titan |
| weird twitter | cryptic | — |
| credulous moron | earnest | @just_asking_q |

Mix in underscores, meme numbers (69, 420, 3000), birth years in the 2900s, abbreviations, occasional ALL CAPS. Mostly lowercase. **Under 20 characters.** They should feel chosen as an identity. Special classes have their own handle schemes, documented on their pages: `.mastodon.sys` ([External Federation Attempts](../External_Federation_Attempts.md)), `.bsky.social` ([Bluesky](../Bluesky.md)), `@legacy-participant-[n]` ([Hells Leak](../Hells_Leak.md)), retired-ID-scheme Drifters ([Drifters](../Drifters.md)), empty handles for 1917 ([Temporal Anomalies](../Temporal_Anomalies.md)).

### Banned patterns

These are LLM crutches, not real Twitter energy. They're banned in both prompts and should never appear in formats, archetypes, or hand-written examples:

- "anyway hope everyone's having a good [day of the week]", or any variant.
- Signing off with a bland well-wish or time-of-day reference.
- "I will not be taking questions at this time."
- Ending with "and honestly? [restatement of the joke]."
- Any generic kicker that could be copy-pasted onto a different tweet.

The positive instruction that goes with the ban: **land the tweet hard, or let it trail off mid-thought like a real poster would.** The kicker test is the practical one: if you can move the last line to another post and it still works, cut it.

For replies, the #1 failure mode is **every reply sounding like the same person.** Fight it. Each reply is a different person with a different voice, energy, and relationship to the post. Lengths vary wildly (one word; a bracketed gif; a mini-rant; three sentences about the replier's own life). Tones mix (funny, hostile, confused, wholesome, unhinged). Some replies should have far more likes than others; the reply funnier than the original is a staple. If the post is a subtweet, someone names the target. If it's a bad take, someone tries a dunk. At most one reply carries a Sigil, and that replier is long-winded, confident, and mostly wrong (see [Talk:Sigils](Sigils.md)). At most one bracketed gif per thread.

### Rogue Capitalization

About **25% of human posts** use Rogue Capitalization: capitalizing non-proper-noun Words for Emphasis, Rhythm, or Vibes. It is not random. Capitalize the word carrying the emotional weight, the one the poster is physically leaning on ("I am simply Not Going To Do That"). Good rogue caps feel inevitable; bad ones feel like a press release. Density follows temperament: shitposter up to three words, boomer one Important Noun, weird account exactly the wrong word.

Species rules (canon; see the main article for the in-universe version): Vrellnath never; Keth masterfully, and the capitalized word always turns out to be the important one; Thrrm never (a dissident may use one as defiance, and it upsets other Thrrm); Glœm capitalize words that form a hidden secondary sentence; Zk'vrath overcapitalize like shouting, betraying the feeling they're suppressing.

Never apply rogue caps to 1917 temporal anomaly content, community notes, or gimmick accounts whose shtick doesn't call for it.

### Formats are vibes, not templates

When writing a meme format (`data/meme-formats.json`) or reply archetype, you'll usually include example text in quotes. The model is told (system prompt, line 265): **the example shows an energy; do not use that text, do not rephrase it, do not echo its structure or its words.** A format seen before should produce a post nobody has seen before. Practical consequences for authors:

- Give two or three examples in different registers so the model triangulates a vibe instead of copying one line.
- Put the *mechanism* of the joke in the description (who's posting, what the incongruity is, what the replies do), not just a sample.
- If a format keeps producing near-copies of its example, the example is too strong; describe instead.
- The lore pages' "Cultural references" lists are raw material in the same spirit: energies, not lines.

### Sample register check

Good: "the Audacity of the generation ship HOA to fine me for my airlock wreath" — Twitter cadence, 3017 content, rogue cap on the weight-bearing word, no kicker.

Bad: "Just saw a generation ship HOA fine someone for an airlock wreath! The future is wild. Anyway, hope everyone's having a great Tuesday! 🚀✨" — sentence case, explains itself, generic kicker, emoji spam, banned sign-off.

## Implementation

- **Tweet generation:** `data/system-prompt.txt` lines 1–13 (premise, core aesthetic rules, handle guidance) and 244–267 (banned patterns, rogue capitalization, formats-as-vibes, JSON-only output).
- **Reply generation:** `data/replies-prompt.txt` lines 3–14 (core rules: distinct voices, wild length variance, one Sigil max, subtweet/dunk rules, credulous moron ~1 in 4 threads, one gif max) and lines 154–161 (banned patterns plus reply handle matching).
- **Handles** are LLM output. Fallback generation exists (`data/handles.json`, loaded by `server.js`) but rarely fires.
- There is no summon tag or incite key for "peak voice"; it's the substrate of everything. The closest format is the untagged "tweeting about the platform itself."
- The temporal anomaly for Peak Era posts (2017 era) is P0 TODO in `CLAUDE.md`; see [Talk:Temporal Anomalies](Temporal_Anomalies.md). The frontend ToS already references "posts about Uber drivers and podcasts (2017)."

## Unused material

From `docs/unplaced-comedy-angles.md`, "Temporal Comedy" (life extension and time dilation give Peak Era formats new reach):
- "how it started vs how it's going" spanning centuries.
- Someone's ex from 400 years ago showing up in their replies.
- The 847-year-old boomer who is technically correct about "back in my day."
- Long-distance relationships across relativistic time dilation: one partner ages years while the other ages days.
- "I've been quiet about this for 200 years but" (genuinely has been).

These fit the "Peak Era formats, 3017 content" premise directly and could become untagged formats.

## Discrepancies

- **Present year.** `system-prompt.txt` line 1 says "circa 3026 CE" and uses @RealDave_3026 as the boomer example; `replies-prompt.txt` lines 1 and 7 say 3026. The wiki uses 3017 (examples above updated to @RealDave_3017). Tracked by the P1 redate TODO.
- **Peak window.** The system prompt and CLAUDE.md say 2012–2019; `docs/TODO-redate.md` and CLAUDE.md's redate note say "~2012–2017" as the peak the 1000-year framing counts from. The article gives c. 2012–2019 with a 2012–2017 core.
- **Rogue caps vs. temporal anomalies.** The rogue-caps rule excludes 1917 content; nothing yet says whether 2017-era anomaly posts (not implemented) should carry native Peak Era rogue caps. They presumably should.
- **Reply archetypes format.** CLAUDE.md says `reply-archetypes.json` has the same `{description, tags, weight}` structure as meme formats; the file is actually a flat array of strings with no tags or weights.
- **`public/data/`.** CLAUDE.md's architecture section lists a `public/data/` directory (older copies of formats, archetypes, prompts, `handles.json`). It doesn't exist; everything lives in `data/`.

## Open questions

- Whether to add an explicit "no explaining the joke" line to the banned patterns (currently implied by "generic kicker" and "land it hard").
- Whether the counterfeit-markers idea on the main article (Peak Era purists spotting fake voice) should become a format: a purist dunking on an obviously LLM-flavored post.
