# Talk:Marcus DeVance
*[Article](../Marcus_DeVance.md) · Talk*

## Canon

- **He is right.** On exactly one topic: @dril is a Keth. Everything else he believes is wrong. See [Talk:@dril](Dril.md) and [Talk:Keth](Keth.md).
- **"The Dril Truther" is production vocabulary only.** It's the label used out-of-universe (`docs/dril-truther-bible.md`, `CLAUDE.md`, code comments, format descriptions). **No in-universe character may ever call him that**, or any name invoking @dril, in generated content or on a main wiki page. Nobody in 3017 has read past paragraph 14 of any of his threads, so nobody knows the @dril theory is in there. In-universe he is only: **"the bird-drone guy," "that moon crank," "the WAKE UP GALAXY guy," "DeVance,"** or **"@TRUTH_SEEKER_2094."** The unnoticed-ness of the dril theory is the entire joke.
- **That's why the main page buries it.** `Marcus_DeVance.md` mentions "@dril is a Keth" exactly once, as an unremarked list item between the ferret bread and the Meat Incident, plus an all-caps thread title whose editors summarize it as being about birds. Keep it that way. Don't add a section on it, don't link to @dril from the article, don't put it in the banner.
- **What he gets right** (all true): dril's typo frequency maps onto Keth ✧-emission patterns; the account predates the platform (paperwork "complicated"); dril's predictions correlate with catastrophes at a rate beyond any intelligence apparatus (the GTAB's classified report confirms); Keth communication overlaps with "probability-space" (per the shitposting paper).
- **What he gets wrong**, in the same documents, often the same paragraphs: there are SEVEN Keth disguised as humans (there's one); dril is their king (rank-and-file); the Keth are plotting (they are extremely not); Keth feed on attention like vampires (they're having a nice time); dril's "real name" is "Vrellk-Thoth, Eater of Worlds" (Keth don't have names; he got it from a fantasy novel). **You cannot read the true parts without the false parts.**
- **He doesn't know the Keth don't know which one.** He thinks he's exposing a conspiracy. He's exposing a mystery the "conspirators" are trying to solve. Leaked Keth audit-committee minutes (back to 2109) read to him as conspiracy, not bewilderment.
- **The notes are right and wrong at once.** They're written by diligent people, professionally worded, sourced, score high on *Epistemically Sound*, and are completely wrong for exactly the reason he's right. They never assert anything positive about @dril's identity, only negate his claims ("No evidence supports the assertion that @dril is a Keth" ≠ "@dril is not a Keth"). The note-writers consider that good hygiene. It is. It's also why nobody has noticed that nobody has proven anything about @dril at all. The wrongness has become rigorous; the wrongness has become peer-reviewed.
- **He's the only one who's noticed @dril is never community-noted.** His 90-page document on that fact has been community-noted.
- **He's wrong about Meta** (1,400 pages; "on this one, not correct") and wrong-in-the-specifics about the Meat Incident (140 pages; cited everywhere for the inventory).
- **The sigil is fake.** Tier 4, eye drawn in what looks like MS Paint, unchallenged for ~300 years.
- **The produce-section post is the heart of him.** It's the only post that reads as human and the only one where he is uncertain. No community note. Replies are "hope you're okay man" and a mental-health resource offer. (Out-of-universe: "he" is @dril, or maybe just a guy. Never resolve.)
- **The recursive joke**: the award-winning *Epistemic Outliers* paper argues discredited sources should sometimes be checked, and uses his "dril is a Keth" claim as its primary example of an *obviously* wrong claim. He retweets it with "FINALLY," thinking he's vindicated. A note explains he misread it. (The main page omits which claim the paper used.)

## Voice and usage

- All caps for emphasis, "The masses must AWAKEN," "email me for schematics," "Email is in bio," long numbered series ("PART 2,847"), self-corrections presented as research updates ("birds are government drones again (I was wrong before, sorry, the research has updated)").
- **Structure**: the correct @dril claim goes *late*, after bird-drone / moon / furniture preamble. Paragraph 14 is the canonical depth.
- **Always community-noted when posting about dril** (except the quiet produce-section-style posts, which nobody bothers to note). Notes are calm, sourced, multi-citation, and correct on everything except the one thing that matters. Sample surfaced ratings from the bible: `✓ Epistemically Sound 94% · ⊙ Ontologically Grounded 88% · ◈ Pre-Verified by Consensus —`; `⧖ Temporally Coherent 71% · ♡ Feels Right 44%`; `✓ Epistemically Sound 91% · ❃ Does Not Alarm the Glœm 12% · ⎯ unstable`. Contributor counts in the 9,800–22,000 range.
- Metrics: 847 followers; low RT/likes, high reply counts.
- `docs/dril-truther-bible.md` has four full sample posts with notes (the Covenant Part 2,847 / ferret bread post; the "1000 YEARS OF @dril" post; the sun-is-wrong post citing Dr. Tanaka-Osei's 550nm readings; the produce-section post). Use them for calibration.
- Other characters referring to him use only his in-universe names, e.g. archetype #115: "the bird-drone guy (@TRUTH_SEEKER_2094) has…".

## Implementation

- **Format** #213 in `data/meme-formats.json` (tags `dril`, `keth`, `notes`, `moon`); reachable via `?summon=dril`, `?summon=keth`, `?summon=notes`, `?summon=moon`. Its description carries the naming canon note.
- **Reply archetype** #115 (Meat Incident conspiracy user citing him).
- **System prompt**: referenced only obliquely ("nobody has noticed this except one discredited conspiracy theorist," ~line 23; community notes section ~line 302).
- **Community notes**: `community_note` field on the tweet, `contributor_type: "community"`.
- `verified: 4` is appropriate for his account (the sigil is displayed; it's fake in-universe but the renderer doesn't know).

## Unused material

- Post 2 ("1000 YEARS OF @dril… Email is in bio") and Post 3 (sun is wrong / Dr. Tanaka-Osei / Stellar Dynamics Institute "calibration drift") as their own formats.
- The *Epistemic Outliers* recursive-joke sequence (paper → "FINALLY" retweet → note explaining he misread it).
- The produce-section post as a format.
- The 200-page timeline noted 14 times with *Temporally Non-Sequential* and *Does Not Alarm the Glœm* ratings (from `docs/alien-species-bible.md`).
- The journalist's Pulitzer-equivalent for a piece on confirmation bias.
- "The DeVance Fallacy: A Case Study in Motivated Reasoning."

## Discrepancies

- **"Posting for 1000+ years"** (bible) vs. account created 2094 → ~923 years by 3017. Main page says "created in 2094" and avoids "1000 years."
- **Timeline of claims**: he held "the moon is a satellite" for 400 years; his WAKE UP GALAXY comments disabled since 2613; website broken since 2841; notes grew rigorous "by the 400-year mark" (~2494). No conflict, but none of these are pinned to specific dates beyond 2094, 2613, 2841.
- **Year "pre-3026 platform migrations"** in sample Post 2's note should read pre-3017 (or just "pre-Hellsite") after the redate.
- The dril-truther bible says his "Wikipedia-equivalent page has a permanent warning banner." The main page implements this literally.

## Open questions

- Does DeVance know about the Keth's own public census posts? (Presumably he's read them and interprets them as cover.)
- What is his substrate? 900+ years implies upload or life extension; never specified.
