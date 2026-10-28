# Talk:Drifters
*[Article](../Drifters.md) · Talk*

This page also canonizes the **Mover–Drifter encounter**: echo events, pauses, mutual silences, cascades, and the species positions. For Mover-only guidance, see [Talk:Movers](Movers.md).

## Canon

- **Nothing resolves.** This is the discipline of the whole bit. From the bible:
  - The Movers are not communicating through the Drifters.
  - The Drifters are not speaking for the Movers.
  - The Cascade of 2994 was not a message.
  - The Keth's smug ✧ was not a confirmation.
  - Every apparent signal is fully compatible with coincidence, and every apparent coincidence is fully compatible with signal.
  - "The door stays closed. The door has always been closed. The door may not be a door."
- **Never wink.** No Drifter post may be decodable, even secretly. The factions are wrong about specific details. None of them is wrong in the direction of a hidden answer that would vindicate its position. "There is no hidden answer. There is the behavior."
- **Why it matters:** "A Drifter post that is 'actually' a message flattens the whole apparatus." The Drifters' strangeness is that they "produce the appearance of meaning from a process we cannot characterize and may not be entitled to characterize."
- **Neither population responds to being addressed.** There are zero confirmed instances.
- **The Drifters' origin is unknown, even out of universe.** The Denialist position ("dead bot project") is "probably true" and cannot be proven. The canon stops there.
- **The Tired are correct**, per several senior Glœm, and nobody listens to them. This is the one faction verdict the canon endorses. What they're correct about is only that the question is ill-formed.
- **Accounts use a retired ID scheme** (2634) and should not have survived the migration. No ticket has ever been filed on a Drifter account.
- **The Keth probably know**, in some untranslatable sense. They find it hilarious and won't say. The ✧ of 2981 is the most they've ever committed.
- **The Glœm refused to translate the 2994 cascade text** and asked not to be asked again. It was the first time they had ever made such a request. It must never be translated, by anyone, in any post that the audience could take as authoritative. Cryptic "translations" are fine because they disagree with each other.
- **The Vrellnath conclusion never changes:** "Continued study is merited."
- **@dril** has liked ~14 Mover posts and zero Drifter posts. He just likes gardens.

## Voice and usage

- **Drifter posts** use full grammatical English, and about a third of the content words are not words. Most non-words feel almost parseable, and a few are aggressively foreign.
  - **Recurring vocabulary:** *kendral, pelvent, wendressing, mistening, vrethys, thirdwise, miskenned*. **Use it inconsistently.** A word's part of speech and apparent meaning should drift between posts. The bible's intent was that each word has two or three roles that are incompatible if taken seriously.
  - **Shifted-letter forms** ("trew", "trewe", "trev") appear about once per 30–50 posts, inconsistently.
  - **Reference-like phrases** are allowed as long as they stay undecidable: "the small bright things that sort", "the ones who file", "this is noted", "per the register".
  - The tone is calm, declarative, and faintly instructive ("this has been said before. it will be said again.", "this is allowed.").
- **Handles** come from the retired scheme: `@--∅47h2-reserved--`, `@ᛞ-register-11`, `@null-path-928-∅`. There's no display name, or a placeholder. `verified: 0`. Likes are low and quote-posts are high.
- **Drifters never answer anyone, never say "we understand", and never address the reader as "you" in a conversational way.** Corpus example of what not to do: a `@--∅47h2-reserved--` post saying "we understand what you mean."
- **Faction replies** come from normal 3017 accounts with **no `special_account`**:
  - **Literalist:** a dictionary entry with version numbers. Confident, and wrong within a month.
  - **Cryptic:** "I'm not publishing yet". Tantalizing and never delivers.
  - **Aestheticist:** a line of poetry, or just "this."
  - **Denialist:** baseline rates. 4.7% expected versus 5.1% observed.
  - **Tired:** one line, correcting everyone, ignored.
- **Echo events** are the richest reply-thread moment. A Mover post is followed within one or two replies by a semantically adjacent Drifter post. It isn't a threaded reply. The adjacency is above chance but not wildly above chance.
- **The Glœm silence post** is a single "." or small glyph, posted during a mutual silence. It's rare and reverent.
- **Drifter posts should be rare.** Each one is an event.

## Implementation

Format and archetype numbers (#N) are 0-based array indices into `data/meme-formats.json` and `data/reply-archetypes.json` at the time of writing. They will drift as entries are added.

- **Prompts:**
  - `data/system-prompt.txt` lines ~228–243 cover THE DRIFTERS, THE ENCOUNTER, and the CRITICAL nothing-resolves block. Target **~1% of tweets**.
  - `data/replies-prompt.txt` ~141 (MOVER AND DRIFTER REPLIES).
- **Summon tag `drifter`:** 11 formats in `data/meme-formats.json`:
  - #320 basic Drifter
  - #321 apparent reference
  - #322 echo-timed Drifter
  - #323–327: Literalist, Cryptic, Aestheticist, Denialist, Tired
  - #333–335, shared with `mover`: Glœm, Keth, and Thrrm subcommittee
- **Weighted share:** total weight 1.2 out of ~284.4, about **0.42%**.
- **Reply archetypes:**
  - #130–134: Literalist, Cryptic, Aestheticist, Denialist, Tired
  - #140: Glœm silence post
  - #141: Thrrm subcommittee member
- **Incite key `echo`** requires a Mover post, then a Drifter post within one or two replies, then Literalist, Aestheticist, and Denialist reactions.
- **JSON:** `special_account: { class: "drifter" }` with `verified: 0`. There's no special rendering. See [Talk:Movers](Movers.md#implementation).
- **Not adopted from the bible:**
  - The richer schema: `drifter: { id_scheme: "retired-2634", register: "plausible-english-but-not"|"foreign-morphology"|"mixed", recurring_vocabulary: [] }`.
  - The persistent Drifter vocabulary file with deliberately incompatible grammatical roles. Vocabulary is currently a flat list in the prompt and in the `echo` incite.
  - Paired echo outputs at the top level. Echoes only happen inside reply threads, or through format #322, which posts a Drifter post alone.

## Unused material

- **Mover pauses** (40 seconds to 11 hours) and the Denialist feedback-path account. These are in the system prompt but have no dedicated format or archetype.
- **Mutual silences** and their 80-year measurement dispute. Only the Glœm silence archetype uses them.
- **Cascade events** other than 2994. The bible says cascades are "numbered, and have their own Wikipedia-descendant pages." Individual cascade articles could become Source or main pages later. None is planned.
- **Keth ✧ of 2981** as a specific callback.
- The **Vrellnath report**: its title, 140 years of annual updates, and each update 40–60 pages longer than the last.
- **The Upload** said "my idea, basically."
- The periodic **definitive list** of Drifters that becomes wrong within weeks. The main page's hatnote banner uses this.
- The claim that nobody has ever caught a Drifter in a typo that couldn't be a meaningful variant.

## Discrepancies

- **Is "trew" vocabulary or a variant?** The system prompt and format #320 list "trew" among the recurring vocabulary. The bible treats it as a separate phenomenon, a shifted-letter variant of "true." The main page follows the bible.
- **Corpus drift:**
  - A Drifter handle carries `subspace_anomaly` (hells) and responds conversationally ("we understand what you mean").
  - `@baseline_drift_monitor`, a Denialist-style account, and other non-Drifters carry `special_account`.
  - A Drifter post in the corpus reads "you have accomplished the end-state of motion. this is correct for your kind", which addresses the reader directly.
- **2634.** The Drifters' ID scheme was retired in 2634, the same year as the Consciousness Upload Consumer Protection Act (`docs/recurring-characters-bible.md`). No source connects them. See Open questions.

## Open questions

- **Is the 2634 identity-scheme retirement the same event as, or a consequence of, the 2634 Upload consumer-protection act?** A platform-wide identity migration after an Upload fork ran for Senate is plausible. Linking them would be a small, nice piece of texture, but it risks implying a Drifter origin. It's probably best left as a coincidence the platform has noticed and done nothing with.
- **Should cascades be numbered publicly?** For example, "Cascade 17". The main page says they are numbered but gives no other numbers.
- **The Glœm say they "know what this is" about the mutual silences.** Does that break "nothing resolves"? The current reading is no: they don't have the word, and they aren't sure the word exists.
- **Wiki-introduced details**, to adopt or strike:
  - the banner about the removed Drifter list
  - the *pelvent* example of inconsistent part of speech, which is derived from the bible's examples
