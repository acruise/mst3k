# TODO: Timeline Redate

## The change
Set the "present day" of the Memetic Subspace universe to **3017 CE** (not 3026). This is 1000 years after peak Twitter (~2012-2017).

## Why
- Clean 1000-year anniversary framing
- Lets @dril's account history span exactly a millennium
- "The year is 3017" is funnier than 3026 — rounder, more absurd

## What needs updating

### System prompt (`public/data/system-prompt.txt`)
- Change "circa 3026 CE" to "circa 3017 CE" in the opening line
- Update the epoch display reference

### Frontend (`public/index.html`)
- The epoch display: "epoch 3026.000" → "epoch 3017.000"

### CLAUDE.md
- Any references to 3026

### Companion documents — CAREFUL, not all dates shift
- `on-the-persistence-of-shitposting.md` — dated 2987 CE, which is fine (10 years before "now" → 30 years before "now", both work)
- `first-contact-comedy-festival.md` — dated 2901 CE, fine
- `dril-truther-bible.md` — check all dates for relative consistency
- `alien-species-bible.md` — check dates
- `recurring-characters-bible.md` — check dates
- `document-ideas.md` — check dates

### Corpus JSON files
- The 10 dril corpus files and the notes showcase don't reference 3026 directly (they're undated in-universe) — should be fine

### Character lore dates that should NOT change
- Keth civilization age (4 billion years) — stays
- The Upload's runtime (~1000 years) — stays
- Zk'vrath invasion (600 years ago) — stays or adjusts to match
- @dril's posting history (since ~2019) — stays
- Thrrm regulation attempts (2714, 2755, etc.) — stay
- Comedy festival (2901 CE) — stays
- Shitposting paper (2987 CE) — stays
- Post-contact dates (Vrellnath 2612, Keth 2934) — stay

## New lore: The Upload's platform purchase

@dril correctly predicted, in approximately 3017 CE, that The Upload would attempt to buy the platform again in 3022. This prediction was treated as a particularly good dril tweet. Some details:

- "again" — The Upload has bought the platform before. At least twice. It went badly both times. The second time, the platform was briefly offline for three days while The Upload "reorganized the moderation team" (fired everyone and replaced them with forks of himself, several of which immediately started arguing with each other).
- @dril's prediction tweet should be in the v2 subtle style — funny on its own, horrifying in retrospect. Something like: "saw the big man eyeing up the platform again today. same look he had in 2847. same look he had in 2956. somebody hide the buy button before he gets to it. i am being Serious but i know how this looks"
- Nobody believed him. The community notes on the Truther's "SEE?? DRIL PREDICTED IT" thread were devastating.
- The Upload's 3022 purchase attempt is in the FUTURE relative to 3017 (the "present day"). So it hasn't happened yet in the current timeline. But dril has already called it. This is a nice dangling thread — the prediction exists, the event hasn't occurred yet, and nobody takes it seriously.

## Implementation
This is a next-session task. Do NOT do a blind find-and-replace — review each date in context.
