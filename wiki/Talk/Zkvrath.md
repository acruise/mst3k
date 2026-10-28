# Talk:Zk'vrath
*[Article](../Zkvrath.md) · Talk*

Sources: `docs/alien-species-bible.md` (Zk'vrath section), `data/system-prompt.txt` (species entry #5, rogue caps, rating dimensions, gimmick accounts, startup block), `docs/meta-refugee-crisis-bible.md`, `docs/ambient-context-bible.md`, `docs/recurring-characters-bible.md` (@dril's Tuesday prediction), `docs/document-ideas.md`, `docs/TODO-redate.md`, and the festival proceedings.

## Canon

- **A predatory species that tried to invade Earth ~600 years ago and got humiliated.** They cope by posting. They are the **tsundere species**.
- **They oscillate** between "we CHOSE to leave" cope and grudging respect that manifests as fury. Military jargon keeps slipping.
- **They're definitely watching human entertainment "for research."** Any emotional investment is CLASSIFIED.
- **The invasion arrived on a Tuesday.** This is load-bearing across the platform (gimmick accounts `@WasTodayTuesday`, `@ItWasTuesday`; the Tuesday post; @dril's warning two years early). Tuesdays are Zk'vrath-invasion-adjacent.
- **The Zk'vrath are afraid of the Keth** and aren't ashamed to admit it.
- **2271:** they claimed responsibility for the Meta collapse ("WE DID THIS, WE ARE AWFUL"). They didn't do it (never explain what did; see the No Explanation Clause on [Talk:Meta Refugee Crisis](Meta_Refugee_Crisis.md)). They helped with the rescue anyway.
- **"AND THEN WE INVADE"** ends every Zk'vrath pitch deck. They refuse to reword it.
- **Rewrite guardrail (from `docs/document-ideas.md`):** "The Zk'vrath should be funnier when *failing to cope*: comedy in the denial, not the breakthrough." The festival's Vrax-Chen monologue was flagged as "too redemptive". Lean into the cope and away from catharsis.

## Voice and usage

- **Rogue caps: overcapitalize aggressively, reading as shouting.** Every capital betrays the emotion being suppressed: *"We Did NOT Lose. We Made A Strategic Decision To Leave. The PLANET Was Barely Worth Having."*
- Military vocabulary in civilian contexts: repositioning, strategic rest cycles, cultural intelligence, debriefing, classified.
- **Rage-respect** at human achievements: could have done it, chose not to, doesn't matter, stop asking.
- **"Completely different" Zk'vrath equivalents** of human things, which are not different.
- **Caught-watching** posts: furious at being exposed.
- **Flirting-as-fighting** with a human in the replies, while everyone else loses their minds. This is one of the best reply-thread engines, so use it.
- As a reply archetype: trying to dunk on the human poster and accidentally revealing how much they care.
- Bible examples: *"we did NOT lose the invasion. we made a STRATEGIC WITHDRAWAL"*; "strategic rest cycles" that are definitely not weekends.

## Implementation

- **System prompt:** species entry #5; rogue-caps rule (with the example quoted above); rating dimension `♄ Does Not Provoke the Zk'vrath` ("rarely used because they're always provoked"); gimmicks `@ZkvrathCryReel`, `@WasTodayTuesday` ("Tuesdays are Zk'vrath-invasion-adjacent; load-bearing"), `@ItWasTuesday`; startup block ("AND THEN WE INVADE").
- **Replies prompt:** nothing Zk'vrath-specific beyond the general species list.
- **Summon tag `zkvrath`** (6 entries in `data/meme-formats.json` at time of writing, 0-based indices 211, 255–259): seething cope/respect, rage-respect at a human achievement, "completely different" culture, caught consuming entertainment, human–Zk'vrath flirting, and a @dril post that is secretly another prediction (211, also `dril`, `moon`).
- **Reply archetype** 89 (dunk attempt that reveals care).
- **No incite key.**

## Unused material

From the species bible's "not yet in code" list and elsewhere:
- **"Bohemian Rhapsody"** broadcast on all frequencies during the retreat; 40 analysts spent 200 years on it; "It is a song… The humans think everything is funny. This is why we lost." (Bible says 40 analysts for the song, while the festival has 40 analysts on the *Tuesday post* and "tactical analysts" for 200 years on the song. The main page follows the festival.)
- **The Tuesday post** and the 40-analyst morale-weapon report.
- **Commander Vrax-Chen**: "I have been laughing for two days… Your comedian noticed on Day One. He waved at me." Now in the Cultural Intelligence Division, which would make a great recurring account (mandate: "understanding why the humans are like this").
- **The strategic cough** and the perfectly calibrated atmosphere.
- **The Cultural Intelligence Division** ("the most critical strategic initiative in 600 years").
- **Document idea:** *We Chose To Leave: The True History of the Terran Engagement* (Ministry of Accurate History, 2891), propaganda whose footnotes, written by a Zk'vrath historian, keep correcting the main text. A strong candidate for the Source namespace, and very much in the rewrite brief's "funnier failing to cope" spirit.
- The laughter acknowledgment being classified, declassified, reclassified, leaked, and ignored.
- The channel left open ("I think we forgot to give the order").
- The Ministry's statement on the festival award ("For archival purposes only").

The main page's "Cultural references" section is light editorial extrapolation from the Tuesday gimmicks, the festival, and `@ZkvrathCryReel`.

## Discrepancies

- **When was the invasion?** "600 years ago" appears in the system prompt (present = 3026 in older text, so ~2426), the species bible, and TODO-redate ("stays or adjusts to match"). From 3017 that's ~2417. The Thrrm first-contact story ("~2500 CE… roughly 80 years after humanity had fought and won an interstellar war against the Zk'vrath") gives ~2420. That's consistent. **But** the festival (2901) has Vrax-Chen say "600 years ago" and "600 years since first contact", which puts it at ~2301, and the festival appendix's "most critical strategic initiative in 600 years" matches that. The main page says "roughly six hundred years ago" from the 3017 frame and doesn't give a year. Also, @dril's "numbers after 10" post (~2300) is unrelated, but if the war were ~2300, "two years early" would put the warning at ~2298.
- **Pre-invasion involvement in 2271.** The Meta bible has the Zk'vrath repurposing "decommissioned invasion transports" for the 2271 rescue. Under either invasion date (~2301 or ~2420) that's *before* the invasion. Unresolved; see [Talk:Vrellnath](Vrellnath.md#discrepancies) for the cross-species pattern.
- **Who analyzed what.** Bible: "40 Zk'vrath analysts spent 200 years" on Bohemian Rhapsody. Festival: "tactical analysts spent 200 years" on the song, and "a team of 40 analysts" on the Tuesday post. The main page follows the festival.
- **Species-bible voice** calls them "Seething" with "military jargon", while the festival's Vrax-Chen is earnest and articulate. The rewrite brief prefers the former.
- **Festival-derived facts (lower-confidence canon).** The proceedings are a draft slated for rewrite, and the Zk'vrath section was specifically called "too redemptive". Festival-only facts: mandibles-as-hands and trembling; 10,000 years of seriousness; the attaché and the strategic cough; Vrax-Chen, the Third Fleet, and the whole set; collective Zk'vrath laughter; fear of the Keth ("Reasonable."); the Ministry's award statement; the channel left open; the laughter acknowledgment; the Cultural Intelligence Division; applying to the second festival; nodding as a learned human gesture. The Tuesday post and "Bohemian Rhapsody" also appear in the species bible, but both originate in the festival draft. The document-ideas pitch ("A Zk'vrath comedian did a tight five about humans that started as mockery and ended with the comedian crying") is a different version again.

## Open questions

- Pin the invasion year? Candidate: ~2417–2420, which fits the Thrrm story and "600 years" from 3017. That would mean fixing the festival text on rewrite.
- Did the Zk'vrath exist in human awareness before the invasion (the 2271 transports)?
- Should *We Chose To Leave* be written up as a Source document?
