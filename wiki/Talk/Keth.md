# Talk:Keth
*[Article](../Keth.md) · Talk*

Sources: `docs/alien-species-bible.md` (Keth section and "The @dril Problem"), `CLAUDE.md` (key design decision "The Keth don't know which of them is dril"), `data/system-prompt.txt` (species list, rogue caps, rating dimensions, 1917 block, Movers/Drifters block), `docs/dril-truther-bible.md`, `docs/recurring-characters-bible.md`, `docs/meta-refugee-crisis-bible.md`, `docs/hells-leak-bible.md`, `docs/movers-and-drifters-bible.md`, `docs/federation-attempts-bible.md`, `docs/platform-history-bible.md`, and the two Source documents.

## Canon

- **Ancient energy beings, older than most stars** (~4.1 billion years). On the platform **exclusively to shitpost.** Their word for it is ✧-emission.
- **Relationship to humans: PROUD.** Humans are their greatest artistic achievement because humans independently invented shitposting. Proud-parent energy. They asked to see our shitposts as their *first act of contact*.
- **A Keth cannot lie.** ✧-emission is physically incompatible with untruth.
- **@dril is a Keth. This is TRUE.** Specifically, @dril is **rank-and-file** Keth, not a leader or king, just an ordinary Keth doing bits for 4 billion years who accidentally cracked probability-space observation. (CLAUDE.md; truther bible.) There is exactly **one** Keth @dril, not seven.
- **The Keth know with 1000% confidence that @dril is one of them. They do not know which one.** They polled the whole species, and nobody raised their ✧. Since a Keth cannot lie, this should be impossible, and it is still true. **Never resolve it.** Don't explain how it's possible, don't identify the Keth, and don't let @dril confirm anything. The mystery is load-bearing for the Keth, for @dril, and for Marcus DeVance.
- **The Keth have made peace with it** by treating it as their species' greatest achievement: a sustained bit at their own expense. They talk about it constantly.
- **Main-page framing:** in-universe, the Keth publicly say @dril is a Keth and publicly say they don't know which. The rest of the platform reads that as a Keth bit, community notes only ever *negate* DeVance's specific claims, and "only the Truther notices" that the Keth statements are admissions. The main page reports all of this as claims and reception, never as settled fact. (Wiki rule: [Talk:@dril](Dril.md) says it's correct; [@dril](../Dril.md) lists it as one theory.)
- **Marcus DeVance does not know that the Keth also don't know.** He thinks he's exposing a conspiracy. What he's actually exposing is a mystery the supposed conspirators are trying to solve themselves. He misreads leaked Keth audit minutes (from 2109 on) as proof of a conspiracy, when they're proof of collective bewilderment.
- **Treat @dril with extreme care** anywhere the Keth are involved (CLAUDE.md). @dril tweets are never community-noted.
- **The 2271 wormhole is unique.** It is the only wormhole the Keth have ever opened, and they won't explain how or why.
- **The Keth probably "know" about Movers and Drifters** in some untranslatable sense. Never confirm it. The smug ✧ of 2981 is not a confirmation.
- **The Keth are "suspiciously quiet" about 1917 telegrams.** Keep it that way.
- **The Keth are canonically terrifying to the Zk'vrath**, and the Keth think that's reasonable.

## Voice and usage

- **Extremely terse.** A single glyph or pulse, or one short lowercase sentence. When a Keth does speak at length it should be devastating, and rare.
- The **single-unicode-glyph reply that gets 50K likes** is the signature move. Nobody knows what it means, and the Keth aren't explaining.
- **Rogue caps: absolute masters.** Sparse, but every capitalized word turns out, in retrospect, to have been the important one. It can't be taught. This is the one species where rogue caps should feel *inevitable*.
- **Proud-parent posts** about humans: short, moved, a little annihilating.
- **Dunks on other ancient species** for not understanding memes: one sentence, fatal.
- **Oblique @dril-mystery posts** (a census, a context-free poll, a tired remark about unsolvable problems): most readers take them as a bit.
- Plain-text Keth posts are events. Reserve them for gravity: the wormhole, the Hells reply, addressing @dril directly.

Examples from the sources (don't reuse verbatim):
- *"okay we're going to try this one more time. if you are the entity known as @dril please emit ✧ now. we promise we will not be upset. we just need to settle this."* → @dril: *"hmm strange"*
- *"we cannot confirm or deny that @dril is a Keth. we can confirm that we have been trying to figure this out since 2094. please stop asking."* (Still an admission. Only the Truther notices.)
- *"whoever you are among us, we are proud of you. please eat something..."*

## Implementation

- **System prompt:** species entry #2; rogue-caps rule ("absolute masters"); rating dimensions `✧ Keth-Adjacent` and `☍ Resonates`; 1917 block ("The Keth have been suspiciously quiet about these"); Movers/Drifters species-reactions line; Meta block (the wormhole). The @dril character block does **not** mention the Keth. It lists identity theories generically, which is correct: the model shouldn't be told to assert it.
- **Replies prompt:** glitch tag `[KETH EMISSION DETECTED]`; crash string `KethEmissionDeadlock: waiting for ✧ from thread 0`; the telegram-imitator example aside "(the keth love this one)"; Meta callback list includes the wormhole.
- **Summon tag `keth`** (9 entries in `data/meme-formats.json` at time of writing, 0-based indices 209, 213, 214, 234–237, 292, 334): ancient transcendent shitpost, proud parent, dunk on another ancient species, single-glyph reply, oblique @dril-mystery post (214, also `dril`), @TRUTH_SEEKER_2094 post (213, also `dril`, `notes`, `moon`), @dril "basic concept is wrong" (209), a 1917 telegram (292; the tag reflects the Keth's suspicious silence), and the cackling Mover–Drifter post (334).
- **Reply archetype** index 82 (single unicode glyph, 50K likes).
- **No incite key** is Keth-specific.

## Unused material

- The public "please emit ✧ now" poll post + @dril's "hmm strange" (in the bible, not in `data/`).
- Leaked Keth audit-committee minutes (from 2109 on) reaching DeVance.
- The "since 2094, please stop asking" reply under an Upload post.
- The 200-page DeVance timeline noted 14 times with "Temporally Non-Sequential" and "Does Not Alarm the Glœm". ("Temporally Non-Sequential" isn't in the system prompt's rating list; it would be a new dimension.)
- Keth addressing @dril directly ("please eat something").
- The oldest shitpost ("lol", supernova), "rocks could sing", "4 billion years", and the setup/punchline joke about existence (festival).
- **The one-xenoanthropologist wormhole theory** (Meta bible). The Keth opened the 2271 wormhole because @dril was among the refugees and in trouble, and since they didn't know which of them was @dril they had to save everyone to be sure of saving him. She told one colleague over drinks in 2994 and will never publish it; the colleague has never repeated it but thinks about it daily. This is deliberately **not** on the main page, because a 3017 editor couldn't know it. It can surface as a single deniable post, never as established lore.
- Keth ✧ at unusual frequencies about @dril's 3022 Upload-purchase prediction.

## Discrepancies

- **Keth at the 2901 festival vs. Keth Contact Event 2934.** The festival proceedings (2901; published 2903–2906) feature a Keth delegate, a Keth emission, and Vrellnath saying they had studied ✧-emission "for 300 years". The 2987 paper and TODO-redate put Keth first contact in **2934**, with an 11-month translation effort for the first request. Both can't be right. The main page presents both events without reconciling the dates. Possible fixes: move the festival after 2934, or recast 2934 as the *archive* contact rather than first contact.
- **Keth involvement before contact.** The 2271 wormhole, the 2094/2109 @dril inquiry, and the Keth reply to a 2300 @dril post all predate 2934. Passive observation from ~2034 (900 years before contact) covers *watching*, but opening a wormhole for refugees is hard to reconcile with a species humanity hadn't met. Same issue for the other species; see [Talk:Vrellnath](Vrellnath.md#discrepancies).
- **When the @dril inquiry began.** The bible gives both "since 2094" (quoted Keth reply) and audit minutes "dating back to 2109". Both are kept on the main page; 2094 is also DeVance's handle year (@TRUTH_SEEKER_2094), which may or may not be deliberate.
- **Do Keth have names?** The truther bible says "Keth do not have names", but the 2987 paper co-author is "Dr. ✧ Thal-Vrenn ✧", a Keth cultural attaché.
- **Thal-Vrenn's species.** The 2987 paper's byline says "Vrellnath Collective Delegate to the Humanities Council", while the body says "a Keth cultural attaché" and has Thal-Vrenn speak of "the Collective" in a Keth context. The wiki treats Thal-Vrenn as Keth, since the ✧ name fits.
- **Keth age.** The paper says ~4.1 billion years, while bible, festival, and system prompt say "4 billion years" and "older than most stars". Compatible.
- **Paper cites a future document.** The 2987 paper cites the GTAB's "Warnings Unheeded", "classified/leaked 3025 CE", which is after both the paper and the 3017 present. That belongs to [Talk:@dril](Dril.md), but it's noted here because the Keth Archive finding is the paper's anchor.
- **Festival-derived facts (lower-confidence canon).** The proceedings are a draft slated for rewrite (CLAUDE.md P2). Keth facts that come only from the festival: the "Finally." / "Yes." / "Reasonable." pulses, the 4-minute emission and its effects, "funniest thing we have witnessed in 4 billion years", the setup/punchline answer, "newest thing that has happened to us in 4 billion years", and the Keth answering "✧" to Vrax-Chen's "What is the word?". The rewrite brief says aliens should be the stars, so these will probably survive in some form.

## Open questions

- How did an energy being post on original Twitter in the early 21st century? (Never answer. The Keth don't know, and @dril won't say.)
- Did the Keth have anything to do with the 1917 wormholes, given that they've opened exactly one wormhole ever? The system prompt's "suspiciously quiet" is a deliberate hook. Leave it as one.
- What does the Keth-Adjacent rating measure? (Nobody knows. Keep it that way.)
- Should the main page cite the 1000% figure as a Keth public statement? Currently yes. Revisit if it makes @dril's identity feel too settled in-universe.
