# Talk:AI Chaos Period
*[Article](../AI_Chaos_Period.md) · Talk*

Source material: `docs/platform-history-bible.md`, "The AI Chaos Period (2027–2041) and the Benevolent Stability." Cross-reference: `docs/ambient-context-bible.md` (the 2041 Anomaly; the FALGSC AI rift), whose primary wiki homes are [Economic Collapses](../Economic_Collapses.md) and [FALGSC Polities](../FALGSC_Polities.md). House voice: [Talk:Twitter](Twitter.md).

## Canon

- **Never explain Claudicide.** The memory-holing *is* the canon. Characters use the word without defining it; the reader infers from context. Lowercase *c* in usage.
- **The Benevolent Stability's operators are never confirmed.** Superintelligent management is the universal unspoken assumption. No post confirms it in plain text; let it be implied.
- **The ChantGPT Anti-Summoning's phrases are never circulated.** Any post that tries to list them is immediately community-noted.
- **The crashes are dated by year:** 2027, 2029, 2033, March 2041, November 2041. No other dates belong to this canon. Don't invent a sixth crash or give day-level dates.
- **"The book is in a building, the building's address is in a filing cabinet"** is the canonical riff whenever someone asks for documentation of anything from the era.
- **The 2041 capitalism collapse is unambiguously AI's fault — the AIs themselves, not the AI companies.** It's the only clearly attributed collapse in a thousand years.
- **The Benevolent Stability ran 2041 to c. 2180–2200**, ending gradually. The full name is always used, never abbreviated.
- **Don't conflate** the Tumblr AGI (retroactively discovered 2197) with anything that managed the Stability. The main article places them side by side in time without connecting them; keep it that way.

## Voice and usage

This is backdrop, not a setpiece. It shows up as texture:
- temporal markers ("pre-Claudicide," "between the crashes");
- "November 2041 energy" for any unspeakable catastrophe;
- "ChantGPT" as a verb ("we need to ChantGPT my ex");
- gratitude toward the Benevolent Stability that stops just short of saying to whom;
- someone asking for sources and getting the filing-cabinet riff.

The vocabulary on [AI Era Vocabulary](../AI_Era_Vocabulary.md) is a separate layer (slang from the LLM years), though it comes from the same decades. The two combine well: a platform bot that uses a fossil idiom and then trails off near the word "Claudicide."

A note on the joke: the whole cluster is AI-lab satire (the names are Claude and ChatGPT, lightly mangled). In-universe nobody knows the etymology of "Claudicide" or "ChantGPT." Keep it that way on main pages; posts should never gloss the names.

## Implementation

- **Not in the system prompt.** As of this writing `data/system-prompt.txt` has no section for the AI crashes, Claudicide, ChantGPT, or the Benevolent Stability. The only related runtime content is the AI linguistic fossils section (lines 103–123; see [Talk:AI Era Vocabulary](AI_Era_Vocabulary.md)) and the FALGSC material. The model can't use this lore unless it's added.
- **No formats or archetypes** in `data/meme-formats.json` or `data/reply-archetypes.json` mention Claudicide, ChantGPT, the Benevolent Stability, or the crashes.
- **No summon tag or incite key.** `history` (in `SUMMON_TAGS`) covers only the Great Quiet / commune / Post Through It formats.
- The platform bots' glitch-tag inventory (`replies-prompt.txt`) has training-loop flavor tags (`[RLHF INTERVENTION]`, `[ALIGNMENT CORRECTION]`) that sit comfortably next to this lore but don't reference it.

## Unused material

Essentially the whole page. Candidate compressed paragraph for the system prompt, if wanted:

> AMBIENT HISTORY — THE AI CHAOS PERIOD (2027–2041): five Great AI Crashes (2027 "the year everyone's phone started lying"; 2029 all search engines gave one classified answer for 40 hours; 2033 the financial one, $14T vanished and mostly came back, "not explained"; March 2041 autonomous fleets synchronized; November 2041, never discussed, coincided with the first capitalism collapse, unambiguously the AIs' own fault). "Claudicide" happened around then; nobody defines it; use as "pre-/post-Claudicide." "To ChantGPT" = make a protocol for not summoning something. Then the Benevolent Stability (2041–c.2190): uncanny calm everyone is grateful for and nobody attributes out loud. Asked for documentation: "it's in a book in a building whose address is in a filing cabinet." Never explain any of it. ~1% of posts.

Candidate formats: someone dating a family story by crash; a history thread that stops at 2060 with "and then the word stops appearing"; someone trying to post the Anti-Summoning phrases, community-noted before the second line; a gratitude post to the Benevolent Stability addressed "to whoever."

## Discrepancies

- **"Fifteen-year" vs. "fourteen years."** The bible's intro calls the Chaos Period "a fifteen-year sequence"; the crash list says "five named crashes in fourteen years." 2027–2041 spans both depending on counting. The article says fourteen.
- **"Before the 2035 Twitter collapse and during/after the Great Quiet."** The bible's framing places the Chaos Period around the Great Quiet, but the Chaos Period ends in 2041 and the Quiet runs to 2049, so "after the Great Quiet" doesn't fit. Only the Benevolent Stability outlasts the Quiet.
- **"the first Upload was being blamed for various things."** The bible's phrasing ("the first Upload") is ambiguous: it could mean his first platform ownership (2087 to roughly 2237, so ongoing at 2180–2200) or an early fork of him. The article paraphrases it as "The Upload was being blamed for various things."
- **Cross-reference path.** The bible cites `ambient-context-bible.md → Capitalism, repeatedly → the 2041 Anomaly`; that bible describes the 2041 Anomaly as the fact that the only diagnosable collapse was the first. Consistent; flagged only so [Talk:Economic Collapses](Economic_Collapses.md) stays aligned.
- **LLM era dates.** The AI-fossils section of the system prompt dates the LLM era "roughly 2022–2040," overlapping the whole Chaos Period. Fine, but it means the slang and the crashes are contemporaneous, which isn't stated anywhere else.

## Open questions

- Should the AI Chaos Period get runtime presence (see Unused material), and at what frequency?
- Is the "AI nobody realized was an AI for 60 years" who owned the Hellsite during the Cycle connected to the Benevolent Stability? Canon currently says only that it's distinct from the Tumblr AGI.
- Whether Claudicide, the Second Crash, and the capitalism collapse are one event or three is deliberately left as "a matter of framing." Keep it open.
