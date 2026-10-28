# Talk:Gimmick Accounts
*[Article](../Gimmick_Accounts.md) · Talk*

## Canon

- The platform has **dozens** of single-purpose gimmick accounts, most running for **300–800 years**, with millions of followers.
- **They almost never deviate.** When they do, it's a platform-wide event.
- **The canonical roster** is in `data/system-prompt.txt` (reproduced on the main page). New accounts may be invented in the same register.
- Load-bearing specifics that other lore depends on: @SecondMoonWatch (second moon confirmed 2891 — a @dril prediction, never say so); @WasTodayTuesday (Tuesdays are Zk'vrath-invasion-adjacent); @PourOneOutBot (2049 commune, sincere, never dunked on); @TodayInMars (the Upload's Mars catastrophe); @DrilArchive_Classic and @NoticedByDril; @YogBot_Emeritus (retired platform bot); @ThrrmMood ("furious" for 800 years); @VrellnathGoodPost (14.19 billion unanimous); @SpiderFactsBot (spiders extinct 2712); @CountingToEverything (started 2094).
- @EveryHourTheSun's "still wrong" is an oblique nod to @dril's "the sun is wrong." Never explain the connection.
- @WhatIsTheMoon's piled-up notes are **Moons Notes** (see [Talk:Community Notes](Community_Notes.md)); nothing resolves.
- @TodayIWasAlive's "today i was not" posts are **never explained**.

## Voice and usage

- **Stay ABSOLUTELY on-shtick.** The comedy is the constraint. No commentary, no explanation. If the gimmick is "posts 'still here' every hour," the tweet is "still here." That is the whole post.
- **Metrics can be huge.** Millions of likes on a two-word post is normal.
- **Frequency**: surface roughly **1 in 30 tweets** per the system prompt. The format weights (0.15) are the actual control (see Discrepancies).
- **In replies**, a gimmick account dropping its one line in an unrelated thread lands hard. Use sparingly.
- **Off-shtick moments**: minimal. The deviation IS the whole post ("still wrong. please send help."; "NOT furious"; "yes").
- **Anomaly-reaction threads**: urgent, communal, slightly terrifying; replies cross-reference past anomalies.

## Implementation

- **System prompt**: `data/system-prompt.txt` "RECURRING CAST — BELOVED GIMMICK ACCOUNTS" (~lines 125–164), with the full roster and the on-shtick rule.
- **Summon tag** `gimmick` (3 formats in `data/meme-formats.json`, each weight 0.15): #289 (on-shtick post; tags `thrrm`, `gimmick`, `moon`), #290 (rare off-shtick moment; `thrrm`, `gimmick`), #291 (anomaly reaction thread; `gimmick`).
- **Reply archetype** #116 (a gimmick account dropping its one line in an unrelated thread).
- No special JSON field or renderer; gimmick accounts are ordinary tweets. `verified` is usually 0.

## Unused material

- Invented-in-register accounts beyond the roster are allowed but none are recorded.
- Possible expansions: gimmick accounts for the Hells, Movers/Drifters, skeet leaks, federation attempts (the federation AIs already behave gimmick-adjacently).

## Discrepancies

- **Frequency**: the system prompt says "~1 in 30 tweets"; the three `gimmick` formats have weight 0.15 each out of a pool of 336 formats mostly at weight 1.0, which yields far fewer than 1 in 30. The weights win.
- **Tags on #289/#290**: tagged `thrrm` (because @ThrrmMood may appear), so `?summon=thrrm` can surface gimmick tweets that aren't Thrrm; #289 is tagged `moon` for @SecondMoonWatch / @WhatIsTheMoon.
- **Ages**: "most running for 300–800 years" vs. @CountingToEverything (started 2094, ~923 years) and @AccordionPicBot (600 years). @CountingToEverything's count of 847,211 posts at one per day implies ~2,320 years, not ~923 — the count is impossible for a daily account started in 2094. Left as-is on the main page; could be read as a joke or fixed.
- **@SmallSoupRecipeDaily**: cookbook published 2617, 14,403 recipes posted at one per day ≈ 39 years; so either the account started ~2978 or it skips days. Not a contradiction, just a note.
- **@DragonEpicDaily**: "one sentence per day," "currently on word 3,841," 440 years to go for 40,000 words — mixes sentence and word units. Kept verbatim.
- @AnniversaryBot's "847 years since the Second Canopus Thrrm Compliance Audit Standoff" dates the Standoff to ~2170 (from 3017), before Thrrm first contact (~2500). Could be a Thrrm-internal event; flag for the Thrrm page.
- `CLAUDE.md` says the `gimmick` summon tag has 3 formats — matches.

## Open questions

- Should there be a dedicated gimmick-account roster in `data/` (like `handles.json`) instead of in the system prompt?
- Do deviations cluster around real events (e.g., @EveryHourTheSun's "still wrong" whenever @dril posts about the sun)? Tempting; currently unspecified.
