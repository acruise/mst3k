# Talk:Meat Incident
*[Article](../Meat_Incident.md) · Talk*

The Meat Incident is a sub-incident of the [Meta Refugee Crisis](../Meta_Refugee_Crisis.md); much of the guidance on [Talk:Meta Refugee Crisis](Meta_Refugee_Crisis.md) applies here too. Source: `docs/meta-refugee-crisis-bible.md`, "The Meat Incident (2247)."

## Canon

- **2247, seven minutes, "Meat."** Logo, login page, push notifications, a cron-published quarterly-earnings press release, and **4.2 million** outbound system emails (billing statements, backup-renewal notices, and one condolence email) all went out branded Meat. Rolled back at minute seven. No official statement; the press office denies it shipped; three engineers "transitioned to other opportunities" the following Thursday; post-incident review sealed.
- **The Great Dunkening** is the dunks-side name: highest dunks-per-second ever recorded. Dunks are archived, taught in rhetoric programs, and one became an eighty-year-running opera.
- **The signal reading is never resolved.** A conspiracy-leaning minority reads the typo as a signal (Meta saw users as consumable matter / Freudian slip from the brand department / the Zuckload surfacing meaning through the substrate). It "has never been fully debunked because 4 million emails is a lot of emails to accident." Don't confirm or debunk it in generated content.
- **Marcus DeVance** (the "Dril Truther" in production shorthand; in-universe he's @TRUTH_SEEKER_2094, "the bird-drone guy") wrote 140 pages on the signal reading. He's on the wrong track in the usual specifics, but the 140 pages are cited in every serious retrospective because the evidence inventory is comprehensive. Never call him "the Dril Truther" in generated text.
- **Why it matters:** the Meat is the best evidence that Meta's late mismanagement wasn't covered up because it was embarrassing, but because nobody in charge cared enough to cover it up effectively. Every later Meta dunk is downstream of the Meat.
- **Anniversary math:** 3017 − 2247 = 770. "770 years ago" is correct for the present; don't carry over any 779 figure from 3026-era material.

## Voice and usage

- **"Meat" is always lowercase in speech and takes no article** when naming the event ("since the Meat" is also attested in the reply archetypes; the article-less form is the canonical one). Never explain the reference. Readers either know or they are not the audience.
- **"Meat energy"** is the most flexible deployment: any typo, memo, or announcement that reveals more than intended.
- **Bio line:** "I have a printed screenshot of the Meat on my wall" marks a middle-aged, mildly conspiracy-adjacent, sincere poster.
- **The commemorators** post at the exact minute marks and don't know each other. Good for a quiet, precise solo post.
- One-liners only in replies:
  - "this tweet has Meat energy"
  - "the great dunkening called, it wants its format back"
  - "hasn't been this bad since the Meat"
  - "you really think 4.2 million emails was an ACCIDENT?"
  - "they called it a typo because they had to"

## Implementation

- **Summon tag:** `meat` (2 formats). `?summon=meat`.
  - `data/meme-formats.json`: the bare-screenshot format (tags `meta`, `meat`, weight 0.15; caption "reminder" / "annually" / "on this day 770 years ago"; replies split between Great Dunkening revivalists and signal theorists) and the "Meat energy" diagnostic format (tag `meat`, weight 0.15).
- **Reply archetypes** (`data/reply-archetypes.json`, untagged strings): the one-line "Meat"/"Great Dunkening" reference, and the conspiracy-leaning "the typo was deliberate" reply that name-checks @TRUTH_SEEKER_2094's 140 pages.
- **System prompt:** `data/system-prompt.txt` line ~46, inside the Meta Refugee Crisis block's sub-incidents bullet.
- **Incite:** none. There is no Meta or Meat key in `INCITE_MAP` (`server.js`).

## Discrepancies

- **"Eleventh rebrand back to Meta."** The bible says 2247 was "what should have been the platform's eleventh rebrand back to 'Meta'." That's hard to square with the bible's rebrand list (which has only two plain-"Meta" entries) and with "rebranded approximately every 40 years" (~6 rebrands in 2004–2247 at that rate). The article hedges ("by some counts"). See also the rebrand-list issues on [Talk:Meta Refugee Crisis](Meta_Refugee_Crisis.md#discrepancies).
- **"the platform" vs. "the company."** The bible says "the entire platform was called Meat," meaning Meta's own platform; this is unrelated to the Hellsite. Kept as-is in the article, but be careful not to imply the Hellsite was renamed.

## Open questions

- Whether the eighty-year opera has a title or a composer species. Unassigned.
