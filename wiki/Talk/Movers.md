# Talk:Movers
*[Article](../Movers.md) · Talk*

See also [Talk:Drifters](Drifters.md). The encounter material, the "nothing resolves" discipline, and most of the species' positions are canonized there.

## Canon

- **The Movers are not sentient.** They are not communicating. They are not expressing anything. They are not tired, sad, dignified, or patient. They are machines doing their jobs. That the jobs no longer have referents is a fact about the universe, not about the Movers.
- **They are not aware they are posting.** The Varn layer converts state transitions into sentences. It works like a lens: "they are posting in the sense that a tree posts rings."
- **No Mover post may suggest awareness.** A Mover pause that turns out to be awareness would make the Movers a soul-in-a-machine story, and the universe has other entities for that. From the bible: "The Movers' dignity is that they are *not* sentient, doing their jobs forever without any inner life to be tired by the forever."
- **The anthropomorphizing pull is the subject.** The Vrellnath line is canon: the pull is "structurally overwhelming … which makes the adjacency feel like a choice, which it is not." The comedy and melancholy come from the audience projecting, never from the machine.
- **The builders are unknown and stay unknown.** "The Vrellnath have opinions, the Thrrm have filings, nobody has evidence."
- **Pelith Varn** was a grad student, about 40 years ago. The term project got a middling grade. The layer was never taken down.
- **Mover haters are wrong but not trivially wrong.** Their best arguments are uncomfortable.
- **Roleplayers are always detected.** Everyone can tell, and nobody can articulate how.
- **The Cartographers are not on schedule.** They consider themselves on schedule.
- **@dril just likes gardens.** Marcus DeVance is correct about this. (The bible says "@dril-Truther".)

## Voice and usage

- **Mover telemetry is flat.** It's short and declarative, with no cadence and no emotional vocabulary. It isn't performing plainness. It isn't performing. Good examples:
  - "perimeter completed. perimeter beginning."
  - "threshold crossed by body of approximately 14 grams. logged."
  - "moisture detected in quadrant 3. action taken. quadrant 3 is sand. action was taken on sand."
- **Bad Mover posts** have rhythm, second person, metaphor, words like "patience", "longing", or "home", or any sign that the machine knows it's being read. Corpus example of what not to do: `PATIENCE_METRIC: 0.94 (high)` on @sand-garden-47.
- **Handles** come from unit designations: `@sand-garden-47`, `@perimeter-unit-2201`, `@pebble-sort-814`, `@weather-log-k9`, `@threshold-3`, `@recal-unit-006`. Always `verified: 0`.
- **Metrics vary wildly.** The sand-gardener has 40M followers and gets high likes. Most Movers have hundreds of followers.
- **Movers never respond to being addressed.** A Mover reply in a thread is just telemetry that happens to be there.
- **Fan-culture posts** come from normal 3017 accounts and **do not** carry `special_account`. This covers stans, haters, roleplayers, Cartographers, and the Merciful. Roleplayer prose should be *slightly too rhythmic, slightly too considered*. The Merciful write in Vrellnath first-person plural and are sincere, careful, and contested.
- The target is **common background texture**. The Movers' flat voice is a rest from the general chaos.

## Implementation

Format and archetype numbers (#N) are 0-based array indices into `data/meme-formats.json` and `data/reply-archetypes.json` at the time of writing. They will drift as entries are added.

- **Prompts:**
  - `data/system-prompt.txt` lines ~210–227 (THE MOVERS), plus the shared encounter and "CRITICAL: Nothing resolves" block at ~236–243. Target **~4% of tweets**.
  - `data/replies-prompt.txt` ~141 (MOVER AND DRIFTER REPLIES).
- **Summon tag `mover`**, 14 formats in `data/meme-formats.json`:
  - #314–319: one per task. Pebble-sort, garden-tend (@sand-garden-47), perimeter-walk, weather-log, threshold-mind, recalibrate.
  - #328–332: stan, hater, roleplayer, Cartographer, and Merciful (also tagged `vrellnath`).
  - #333–335 are shared with `drifter`: Glœm (`gloem`), Keth (`keth`), and the Thrrm subcommittee (`thrrm`).
- **Weighted share:** total weight 1.95 out of ~284.4, about **0.69%** of unsummoned tweets.
- **Reply archetypes:** #135 stan, #136 hater, #137 roleplayer, #138 Cartographer, #139 Merciful, #140 Glœm silence post, #141 Thrrm subcommittee member.
- **Incite key `echo`** forces a Mover post, then an adjacent Drifter post, then faction reactions.
- **JSON:** `special_account: { class: "mover", task: "pebble-sort"|"garden-tend"|"perimeter-walk"|"weather-log"|"threshold-mind"|"recalibrate" }`, with `verified: 0`.
- **Rendering:** `public/app.js` preserves `special_account` through generate, save, and load, but has **no special renderer**. Movers look like ordinary 3017 posts.
- **Schema proposal not adopted.** The bible proposed nesting `mover: { task, unit_id, followers_tier: "viral"|"mid"|"obscure" }`, and it wasn't adopted.
- **Corpus:** as of this writing, 53 corpus files contain `special_account`.

## Unused material

- The **14 competing popularity models** and the 40M-versus-800 twin garden. Neither is in the prompt.
- **Cartographer lore**: 90 years, ~1.6M of ~2.4M catalogued, "on schedule" (format #331 gives 1,614,203).
- The **depot moon** with ~600K units.
- **Merchandise**: pebble-criterion charts, perimeter maps, garden-state calendars.
- The **Upload's claims**. It said it built the original Movers, and it wept for four hours about "the little sorters, the little ones who can't stop."
- The **Merciful argument** has run for 60 years, and the Vrellnath note that the Merciful misrepresent them.
- Wiki-introduced cultural-reference phrases ("within tolerance," "turning at corners that aren't there," "perimeter completed. perimeter beginning." on Mondays). Adopt or strike.

## Discrepancies

- **Pebble-sort criterion.** Both sources say it's 14-dimensional, but they don't agree on how many axes are identified.
  - `docs/movers-and-drifters-bible.md`: "size, color, density, hardness, plus nine axes nobody can identify". That's 4 + 9 = 13.
  - `data/system-prompt.txt`: "(5 axes still unidentified)", which leaves 9 identified.

  The main page names the four known axes and sidesteps the count with a footnote.
- **How old are the Movers?**
  - The bible's Numbers section gives "900 years of continuous Mover operation on the oldest still-running unit (a threshold-minder at a gate that stopped existing in 2117)".
  - The bible's distribution section says depot-moon Movers are "running their cycles against infrastructure that was demolished 1,400 years ago". That implies units at least 1,400 years old.
  - Format #331 (Cartographer) has a threshold-minder "minding it for approximately 1,100 years."
  - The bible's Upload section says "the Movers are older than the civilization The Upload came from", meaning older than 21st-century human civilization, so older than roughly a thousand years.

  The main page softens this to "oldest unit with *documented* continuous operation ≈ 900 years" and flags the 1,100-year report as a Cartographer claim.
- **The 2117 gate.** 3017 − 2117 = 900. So the unit's documented operation begins exactly when the gate stopped existing. It's unclear whether the unit is 900 years old, or has been minding an absent gate for 900 years and is older.
- **Corpus drift:**
  - `@sand-garden-47` posted structured telemetry with `PATIENCE_METRIC: 0.94 (high)` and "PARTICIPANTS_OBSERVED". That violates the no-affect rule.
  - Non-Mover accounts (`@pdu-7743-logistics`, `@auto_filing_3847b`) carry `special_account` class `mover`.

## Open questions

- Should the six task types expand? The bible's list is framed as "examples of observed Mover tasks."
- Should Movers get a visual treatment, such as a telemetry-styled card, or stay visually ordinary? Staying ordinary arguably suits the canon.
- Do we ever name the builder civilization? The current answer is no.
- The Thrrm treat Movers as automata under contracts whose signatories are extinct. Should that echo [Persistence Services](../Persistence_Services.md), whose client contracts also have extinct signatories? The parallel is currently unexploited.
