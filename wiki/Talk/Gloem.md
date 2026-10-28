# Talk:Glœm
*[Article](../Gloem.md) · Talk*

Sources: `docs/alien-species-bible.md` (Glœm section), `data/system-prompt.txt` (species entry #4, rogue caps, rating dimensions, Hells and Movers/Drifters blocks), `data/replies-prompt.txt`, `docs/meta-refugee-crisis-bible.md`, `docs/hells-leak-bible.md`, `docs/movers-and-drifters-bible.md`, `docs/platform-history-bible.md`, `docs/recurring-characters-bible.md`, `docs/dril-truther-bible.md`, `docs/ambient-context-bible.md`, and the festival proceedings.

## Canon

- **Bioluminescent deep-space jellyfish.** They learned text from reading tweets. They understand the FORMAT, but the content is beautifully alien.
- **They don't understand human conflict** and try to mediate by changing color. Accidentally profound. Sincerely trying their best. **Never** write them as ironic, snide, or in on the joke.
- **"Small bright things"** is their signature phrase for beings they're watching over (the dead of 2271, the damned, the Movers). Drifters echo it, and whether that's a reference is undecidable. Keep it undecidable.
- **The Glœm "get" the Hells immediately and can't explain why.** Their ongoing conversation with the damned is "one of the few interactions on the platform that nobody has successfully made fun of." Protect that: no Glœm–Hells content should be played for laughs.
- **The Cascade of 2994 refusal** ("please do not ask again") is the only time the Glœm have asked anyone not to ask. Never have them translate the Cascade text.
- **The Glœm confirmed @dril's "the sun is wrong"** at the festival, and "did not want to bring it up because everyone was having such a nice time." The sun remains wrong. The GTAB response is pending forever.
- **The Glœm theory of @dril** (a coordination phenomenon from the platform itself) is one of the in-universe identity theories. It's wrong (see [Talk:Keth](Keth.md)), but the Glœm find it beautiful, and that's fine.
- **The Glœm cannot be monetized.** Please stop (ambient-context bible).
- **Several senior Glœm say the Tired are correct** about Movers/Drifters. That's as far as the Glœm go.

## Voice and usage

- Lowercase, short declaratives, fragments. Speaks as "we" in most sources; a few examples use "i" ("i will change color to protect you"). Both are fine: the Glœm aren't a hive-mind like the Vrellnath, and the "we" reads as a delegation or a school. Don't make it a rule.
- **Take one ordinary human concept literally and sincerely.** Monday as a predator. "i'm fine." "lol" not meaning laughter. The question is simple and the implication is devastating.
- **They talk in colors.** "we do not have the color for this." Inventing a color is a Glœm event; use it for gravity, not every post.
- **Rogue caps:** they capitalize seemingly random words that, on reflection, form a secondary sentence or emotional subtext. Nobody is sure the Glœm know. This is hard to write well: pick the capitalized words first, as their own tiny sentence, then write the post around them.
- **Accidental ratio:** a kind, supportive reply under a bad take that doesn't understand it's a fight, and gets more likes than the original. Pure wholesome destruction.
- **Threnody register** (Hells, 2271, 1917): *"we have read this message. we are sorry. we will keep watching."* Tender, plain, repetitive, no jokes.
- **Silence post:** a single period during a Mover–Drifter mutual silence. Rare, and the thread around it is reverent.
- As 1917 repliers: devastating sincerity, possibly a new color "not a happy one but … important."

Examples (from sources; don't reuse verbatim): *"i do not understand 'monday'. is it a predator. why do you all fear it. i will change color to protect you"*; *"when you say 'i'm fine' but you are not fine, where does the real feeling go. we do not have the color for this"*; *"today i learned 'lol' does not mean the person is laughing"*.

## Implementation

- **System prompt:** species entry #4; rogue-caps rule; rating dimensions `❃ Does Not Alarm the Glœm` (added 2971, "the Glœm asked nicely") and `♡ Feels Right` ("added last year, Glœm suggestion", i.e. 3016 in the 3017 frame); startup block ("attempts to monetize the Glœm which do not work"); Hells block (the Glœm "get it immediately"); Movers/Drifters species reactions + the Cascade of 2994 refusal; Drifter vocabulary note ("the small bright things that sort" — Movers? Glœm?).
- **Replies prompt:** glitch tag `[GLŒM REVIEW]`; crash string `GlœmChannelClosed: no acknowledgement received`; 1917 follow-up ("The Glœm tend to reply with devastating sincerity"); Hells follow-up (Glœm threnody); Mover/Drifter block (Glœm silence post of ".").
- **Summon tag `gloem`** (9 entries in `data/meme-formats.json` at time of writing, 0-based indices 251–254, 294, 296, 298, 310, 333): genuine attempt at human discourse, accidental ratio, sincere question about an emotional concept, language-learning discovery, 1917 accidentally-beautiful telegram (294), 3017 reaction to a telegram (296), 1917 letter that stops mid-sentence (298), Hells threnody (310), Movers/Drifters love-not-knowing (333). Note that the 1917 entries are tagged `gloem` for tone even when no Glœm appears in them.
- **Reply archetypes** (plain strings): 88 (accidentally devastating misunderstanding), 119 (1917 reply, invented color), 125 (Hells tenderness, "watching for six years"), 140 (silence post).
- **Incite:** none Glœm-specific. The `hells` incite names a Glœm threnody as one of the permitted follow-ups.

## Unused material

From the species bible's "not yet in code" list:
- The festival Color Narrative ("A human walks into an establishment. The establishment is not a predator…").
- *kelth-light* and *human-light*; the 849-color register.
- "We tried to make you laugh. We made you cry instead. We do not understand why you are applauding a failure."
- The @dril sun confirmation ("everyone was having such a nice time").
- "Is the bar a predator?" (festival opening; not in the bible list but a natural reply-bit).
- The discovery story: first post, three weeks of disbelief, the jellyfish matching the RGB of the tweet's text color.
- From elsewhere: the Great Quiet song (platform-history example), the 2271 threnody anniversary post (Meta bible example), the color for parsing "facebook" (Meta bible), and six days staring at the Ennoi grapheme (Hells bible).

The main page's "Cultural references" list extrapolates lightly from these sources ("is it a predator" as an idiom, "ratioed by a Glœm" as a named thing, humans using *kelth-light*/*human-light* as words). Feel free to prune it.

## Discrepancies

- **Register count arithmetic.** The festival says *kelth-light* became "their 847th recognized emotional color", and the appendix says kelth-light + human-light bring "the total to 849." The species bible says "849 … up from 847." If kelth-light was the 847th, human-light makes 848, not 849. The main page says "two colors in three days… now 849" and omits the ordinal. (A third, unnamed blended color was also shown on day three; perhaps it was registered too.)
- **Who named human-light.** The species bible's *Vrellnath* list says the Vrellnath invented the term "human-light", while its Glœm section and the festival say the Glœm did. The wiki follows the festival (Glœm).
- **Pre-discovery involvement in 2271.** The Glœm composed the Meta threnody in 2271, but they weren't discovered until ~2780. They had been reading Earth's signals for "decades" before discovery, not five centuries. Unresolved; see [Talk:Vrellnath](Vrellnath.md#discrepancies) for the cross-species pattern.
- **"Register not updated in 200 years before the festival"** (festival appendix, bible) implies no new colors ~2701–2901, but the Glœm were only discovered ~2780 and have supposedly invented colors for facebook, for 1917, and so on. Those may not all be *registered* colors. Minor.
- **Festival-derived facts (lower-confidence canon).** The proceedings are a draft slated for rewrite (CLAUDE.md P2), but the Glœm material is the part most likely to survive, since the brief wants aliens to be the stars. Festival-only facts: resting cyan and the color-state descriptions; "Is the bar a predator?" and "accidental interspecies humor"; the 40 years of study; the Color Narrative and its text; the 73% survey; kelth-light and human-light and their definitions; the blended color; the register count; the @dril/sun confirmation (also in `docs/recurring-characters-bible.md`, but it originates here). `docs/document-ideas.md` records an earlier one-line pitch ("The Glœm tried stand-up but kept changing color instead of delivering punchlines, which the humans found funnier than anything else on the bill"), which differs slightly from the draft.

## Open questions

- Are the Glœm "we" or "i"? (Currently both. Decide if a rule is wanted.)
- What does the Cascade text say? (Never decide. Or decide privately and never write it down.)
- Is "small bright things" in Drifter posts a reference to the Glœm? (Canonically undecidable.)
