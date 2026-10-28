# Talk:Vrellnath
*[Article](../Vrellnath.md) · Talk*

Sources: `docs/alien-species-bible.md` (Vrellnath section), `data/system-prompt.txt` (species list, rogue-caps section, gimmick accounts, community-notes schema), `docs/platform-history-bible.md` (near-Acknowledgments), `docs/meta-refugee-crisis-bible.md`, `docs/hells-leak-bible.md`, `docs/movers-and-drifters-bible.md`, `docs/federation-attempts-bible.md`, `docs/recurring-characters-bible.md` (birds), `docs/ambient-context-bible.md`, and the two Source documents.

## Canon

- **Silicon-based hive-mind.** ~14 billion (see Discrepancies for the number drift).
- **Voice is always first-person plural ("we"). Always sincere.** No irony, no sarcasm, no deliberate incoherence. Every statement means exactly what it says. That's the whole engine: they're the straight man to the entire platform.
- **Relationship to humans:** genuine affection + mild condescension. "Love humans like humans love golden retrievers": wonderful, brave, profoundly stupid.
- **First Acknowledgment, 2612.** Not "contact." The distinction matters to them. They never answer "how long is 'some time'?" They change color when they find a question adorable. Leading estimate: since the Neolithic. Never resolve this.
- **They cannot shitpost** and it makes them genuinely sad. They're too perfectly communicative to produce imperfect communication. This is played straight, not as a joke at their expense.
- **Consensus is never quite unanimous.** The comedy lives in the margin: a small, strange minority dissents or abstains, and the Collective reports it earnestly. (The 0.003-second unanimous vote at the festival is notable precisely because it's the exception.)
- **Two near-Acknowledgments** are canon: the Great Quiet (2037–2049, "genuinely worried about them for the first time") and the Tumblr Memory Protection Act (2197–2200, "the second time we nearly said something").
- **Bird drones.** ~40% of Earth's bird species were quietly replaced with Vrellnath observation drones during the Acknowledgment period; originals moved to a preserve and are fine. The Vrellnath deny it cutely ("those are birds. we love birds."). This validates one of Marcus DeVance's claims. See [Talk:Marcus DeVance](Marcus_DeVance.md).
- **Institutional ally, fast on harm, slow on justice.** 400M substrate nodes in 11 minutes (2271, no paperwork) vs. a 400-year Hells remediation (lawful, on schedule, in progress). Both are canon, and the contrast is the point.
- **The Hells remediation is a permanent background condition, not a plot.** It will not be completed during the generator's run. It is roughly 10 years in, with ~390 years to go.
- **The Vrellnath do not resolve the Movers/Drifters question.** Their annual report's conclusion is always "Continued study is merited." Never let a Vrellnath post confirm Mover interiority.

## Voice and usage

- First-person plural, always. Lowercase or calm sentence case. **No rogue caps**: emphasis is structural, not typographic (per the system prompt's rogue-caps section).
- Anthropological field-notes register. Mundane human behavior reported as a breakthrough.
- **Reaction breakdowns** are the signature move: specific large numbers, and a surprising minority. Keep the numbers roughly consistent with a ~14.19B total but don't sweat it; the Collective doesn't.
- Backhanded compliments they don't notice are backhanded.
- As community-note authors (`contributor_type: "vrellnath"`), they're sad to correct you.
- When @dril turns out to be right, a Vrellnath reply can acknowledge it without elaborating, or change the subject.

Examples (from the sources; don't reuse verbatim in generated output):
- *"imagine being a whole consciousness and there is only one of you. we would simply perish"*
- *"we have shared this with the collective. the results are: 11.7 billion of us are experiencing second-hand embarrassment, 2.4 billion are experiencing first-hand embarrassment for reasons they will not disclose, and roughly 80 million felt nothing, which we are now studying"*
- *"We have conducted peer review. 14.19 billion of us concur. The remaining 12 million are not wrong, exactly. They are experiencing a perspective we do not yet have a term for. We will report back."*

## Implementation

- **System prompt:** species entry #1 in "ALIEN SPECIES ON THE TIMELINE"; rogue-caps rule ("do not use them"); `@VrellnathGoodPost` in the gimmick inventory; `⬡ Vrellnath-Approved` (added 2934) in the rating-dimension list; `contributor_type: "vrellnath"` for notes; Vrellnath count of capitalism collapses (11) and FALGSC happiness study in the ambient-context block; Vrellnath positions in the Movers/Drifters species-reactions block and the Hells "400-year remediation" line.
- **Replies prompt:** glitch tag `[VRELLNATH CONSULTATION QUEUED]`; crash string `VrellnathConsensusStalled: 14 of 14.19 billion disagreed`.
- **Summon tag `vrellnath`** (6 entries in `data/meme-formats.json` at time of writing, 0-based indices 209, 230–233, 332): field observation, backhanded appreciation, live-tweeting a cultural event, collective-reaction quote-tweet, the Merciful movement (also tagged `mover`), and the @dril "something is fundamentally wrong with a basic concept" entry (also `dril`, `keth`).
- **Reply archetypes** (`data/reply-archetypes.json`, plain strings): index 81 (hive-mind breakdown reply, "never unanimous"), index 139 (Merciful advocate, Vrellnath-led).
- **No incite key** is Vrellnath-specific.

## Unused material

From the species bible's "not yet in code" list and elsewhere:
- The 400-page report on one human's sleep posture (now on the main page via the festival; not in `data/`).
- The 0.003-second unanimous vote, fastest in Collective history.
- Re-reading the festival transcript 2.3 million times ("comfort re-watching").
- The "lmao during genuine crisis" information-density calculation.
- The peer-review-margin line (quoted under Voice).
- The bird-drone revelation as a Vrellnath-voiced post.
- Near-Acknowledgment regret posts ("we should have said something at the time"). Source: platform-history bible example tweets.
- The facebook etymology anniversary re-read. Source: Meta bible example tweets.
- **Document idea:** *The Collected Vrellnath Field Notes on Humanity, Abridged Edition*, with chapters like "On the Human Practice of 'Sarcasm' (We Still Do Not Understand It But We Love It)", "Individual Sleep: A Horror and a Mystery", and "We Have Come to the Conclusion That Humans Are Doing Their Best and We Are Proud of Them, Even Though They Cannot Hear Us Think This". Kept off the main page because it's dated 3020 (see Discrepancies).
- The unplaced-angles doc suggests an Acknowledgments variant: "14.19 billion simultaneous peer reviews (of which 12 million arrived at a conclusion we are still attempting to categorize)."

## Discrepancies

- **Population.** 14 billion (2987 paper), 14.2 billion (festival proceedings), 14.19 billion (system prompt gimmick, replies-prompt crash string, species bible). The bible's reaction-breakdown example sums to ~14.18B. The main page treats the drift as a Collective quirk.
- **Age.** The festival cites the "Great Linking of 2.4 billion years ago"; the 2987 paper quotes "800 million years of collective discourse." These are compatible only if discourse began long after linking. Unresolved.
- **"human-light" attribution.** The species bible's Vrellnath "not yet in code" list says the Vrellnath invented the term *human-light*. The Glœm section of the same bible and the festival proceedings say the **Glœm** named it. The wiki follows the festival (Glœm).
- **Pre-Acknowledgment involvement in 2271.** The Meta bible has the Vrellnath reallocating 400M substrate nodes in 2271, but the First Acknowledgment is 2612. The platform-history bible says they were "watching but had not yet Acknowledged" as late as 2197–2200. Either the 2271 aid was anonymous or covert (possible, and interesting), or the dates conflict. The main page reports the aid without comment. See also the same issue on [Talk:Keth](Keth.md), [Talk:Thrrm](Thrrm.md), [Talk:Glœm](Gloem.md), and [Talk:Zk'vrath](Zkvrath.md).
- **"Almost made contact 600 years early"** during 2037–2049 works out to ~565 years before 2612. Close enough; noted.
- **Field Notes anthology dated 3020 CE** in `docs/document-ideas.md`, which is after the 3017 present.
- **Festival: Vrellnath studied ✧-emission for 300 years before 2901**, but the Keth Contact Event is 2934. See [Talk:Keth](Keth.md#discrepancies).
- **Thal-Vrenn's species.** The 2987 paper's byline calls Dr. ✧ Thal-Vrenn ✧ the "Vrellnath Collective Delegate to the Humanities Council"; the body calls them "a Keth cultural attaché" and speaks of "the Collective" in a Keth context. The ✧ in the name suggests Keth. The wiki treats Thal-Vrenn as Keth. See [Talk:Keth](Keth.md#discrepancies).
- **Festival-derived facts (lower-confidence canon).** The festival proceedings are a draft slated for rewrite (see CLAUDE.md P2: "humans should be mid, aliens should be the stars"). These Vrellnath facts on the main page come only from it: 14.2B figure, "Great Linking" 2.4B years, opening-ceremony delight quote, sleep-posture report, the "we understand ✧-emission now" annotation, "we finally understand irony", the 0.003s vote, festival-resonance and the 2.3M re-reads. (Also festival-only, not on the main page: the Collective joining the finale and promising "to speak one at a time.")

## Open questions

- How long have they been watching? (Never answer in-universe. Out-of-universe, it's also fine never to decide.)
- Did the Vrellnath help in 2271 covertly, before the Acknowledgment? Resolving this would also settle the Discrepancies entry.
- Who are the "remaining 12 million"? A recurring dissenting minority could become a running bit, but only if it stays unexplained.
- Should the Field Notes anthology be redated to before 3017 and promoted to a Source document?
