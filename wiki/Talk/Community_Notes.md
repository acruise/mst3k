# Talk:Community Notes
*[Article](../Community_Notes.md) · Talk*

Sources: `data/system-prompt.txt` (`COMMUNITY NOTES`, `RATING DIMENSIONS`, `DERANGED TOPICS`, lines ~286–386); `data/replies-prompt.txt` (the `community_note` field in the reply schema, line ~173); `docs/dril-truther-bible.md` ("A note on @dril's actual status," "The community notes," sample posts, "The recursive joke"); `CLAUDE.md` ("Community notes" design decision); and scattered references in `docs/hells-leak-bible.md`, `docs/federation-attempts-bible.md`, `docs/meta-refugee-crisis-bible.md`, `docs/platform-history-bible.md`, and `docs/recurring-characters-bible.md`.

## Canon

- **Rare.** At most 1 in 10 tweets, ideally fewer. In replies, about 1 in 30 max.
- **Only for a specific false or misleading claim** that a well-meaning fact-checker would feel obligated to correct. The sweet spots: a credulous moron's conspiracy take, a confidently wrong Tier 2–3 sigil holder, a specific verifiable AI-bot hallucination, a Thrrm citing the wrong subsection of the wrong form (Thrrm notes are furious and cite 14 references).
- **The cursed case:** a post that is *actually true*, noted into oblivion by well-meaning fact-checkers. Rare, and the funniest.
- **Never:** pure shitposts and bits ("the system understands humor, mostly"), subjective opinion, or **@dril. @dril has never been community-noted in 1000 years, not once, not even on the clearly false ones ("i can see through walls now").** Nobody has noticed except Marcus DeVance, who has a 90-page document about it, which has been community-noted. The main page states the absence flatly and without comment; keep it that way. In-universe, nobody draws the conclusion.
- **Tone: calm, fair, professional, slightly apologetic. Never snarky or combative.** The comedy is the contrast between the sober voice and what it's correcting.
- **~30 dimensions; only 2–3 surfaced per view; the selection is inscrutable by design.** The same note may surface different ratings on different renders. "Pre-Verified by Consensus" always shows "—". Nobody has successfully complained.
- **The DeVance notes are the model of rigorous wrongness.** They never assert anything positive about @dril's identity; they only negate DeVance's specific claims. "No extraordinary claim about @dril's identity is supported by available evidence" is **technically correct about every theory, including the correct one** (@dril is a Keth; see [Talk:@dril](Dril.md)). The note is literally true and is also, unintentionally, perfect cover. Notes went from curt (early) to 15-citation essays (by year 400). They score high on Epistemically Sound. They are completely wrong for exactly the reason DeVance is right. The main page can describe the negation convention but must not say it's cover.
- The Hells-leak note stack (filed / retracted / refiled / Thrrm form / rejected form) ends on the line "none of which are the note the post actually needs, which is: *somebody help them*." The main page softens this to "none of them is the note the post needs"; the full line is canon from `hells-leak-bible.md`.
- **Deranged topics** (moons, dogs): about **1 in 20 notes at most**, and always the *full* derangement when they fire. No half-measures.
  - **Moons Note:** 6+ paragraphs, 20–40 citations (several fabricated), 5–8 surfaced dimensions, drifts into pleading, references the 2040s second-moon prediction / 2891 confirmation **without naming @dril**, surfaces "Does Not Reference the Thing Inside Jupiter" low, ends with pathological version history.
  - **Dog Note:** tender not corrective, Dogs Would Like This at 98–100%, unofficial dimensions (Good Boy Quotient: HIGH, The Dog Is Well: Confirmed, Tail Status: Wagging), cites the nonexistent Galactic Canine Welfare Consortium / Dr. Paws-Whitfield / 2847 Dog Accord, always closes with "the dog is well" or similar. The committee declined to fix it three times because fixed Dog Notes rate lower.
- Rogue caps never apply to community notes.

## Voice and usage

Structure: header formula → "This post contains multiple factual errors." / "The claim that X is misleading because…" → numbered citations mixing real-sounding and absurd sources → 2–3 surfaced ratings → rater count.

Pick dimensions for juxtaposition. Good pairings:
- conspiracy theory: *Epistemically Sound 94%* + *Does Not Alarm the Glœm 11%*
- Thrrm compliance note: *Thrrm Compliant 100%* + *Feels Right 3%*
- dog picture: *Does Not Provoke the Zk'vrath 98%*
- occasionally the dash: *Pre-Verified by Consensus —*

Contributor voices:
- `community`: default, most notes.
- `thrrm`: bureaucratic, furious, form numbers, long.
- `vrellnath`: we/us, sad to correct.
- `ai_bot`: same glitch tendencies as bot replies (see [Talk:Platform AI Assistants](Platform_AI_Assistants.md)).

Example of the Meta-precedent note (from `meta-refugee-crisis-bible.md`):
> Historically, corporate rebrands immediately preceding substrate failure are not predictive of substrate failure. However, see the Meta precedent (2271 CE), in which a rebrand announcement preceded substrate failure by 48 hours. The poster's tweet is satire. The precedent is real.

Full worked DeVance examples (notes with ratings like *✓ Epistemically Sound 94% · ⊙ Ontologically Grounded 88% · ◈ Pre-Verified by Consensus —* and *⧖ Temporally Coherent 71% · ♡ Feels Right 44%*) are in `docs/dril-truther-bible.md` → "Sample posts"; see also [Talk:Marcus DeVance](Marcus_DeVance.md).

## Implementation

- **JSON field:** optional `community_note` on tweets and replies: `{ text, contributor_type: "community"|"thrrm"|"vrellnath"|"ai_bot", total_raters, surfaced_ratings: [{glyph, label, value}] }`. `total_raters`: tweets 500–50,000; replies 200–20,000. `value` is a string.
- **Incite keys** (`INCITE_MAP` in `server.js`):
  - `community-notes`: the main tweet MUST have a note, and at least 2 replies must have notes.
  - `moon-note`: at least one full Moons Note; nudges content toward a moon.
  - `dog-note`: at least one full Dog Note; nudges content toward a dog.
- **Summon tags:** `notes` (3 formats: #213 DeVance post, also tagged `dril`/`keth`/`moon`; #274 sweet federation attempt, weight 0.05; #296 3017 reaction to a 1917 telegram, weight 0.1). `moon` (6 formats) "may trigger deranged notes."
- **Reply archetype** #121: a 3017 community note on a 1917 telegram.
- **Rendering:** `renderNote()` in `public/app.js`. Header label by `contributor_type`: `READERS ADDED CONTEXT` (community), `BUREAU COMPLIANCE NOTE` (thrrm), `COLLECTIVE-AUTHORED CONTEXT` (vrellnath), `PLATFORM AUTO-CONTEXT` (ai_bot). Ratings render as glyph · label · value chips; the footer is "N contributors rated this note · ratings surfaced by algorithm." CSS `.cnote-*` in `public/style.css`, with a colored left border by type: thrrm gold, vrellnath blue, ai_bot purple, community faint white.
- **Legacy compat:** old notes with `helpful_votes` / `not_helpful_votes` and no `surfaced_ratings` render as a single *✓ Epistemically Sound* percentage computed from the ratio, which neatly mirrors the in-universe claim that Epistemically Sound is "the old 'helpful' metric."

## Unused material

- **Period-correct notes for temporal anomalies** (from the CLAUDE.md P0 TODO):
  - **2017 tweets arriving with their own 2017 notes:** a grey box saying "Readers added context they thought people might want to know" with only "Helpful / Not Helpful." No glyphs, no 30 dimensions. The 3017 audience finds a two-dimension fact-check system *deeply unsettling*, "a legal document from a civilization that hadn't invented nuance yet." The main page's History section already describes the binary system in-universe, ahead of the feature.
  - **2017 tweets getting a new 3017 note on top of the old one**, explaining the tweet via historical archives.
  - **2517 notes** with an intermediate 8–10-dimension system, some dimensions mapping to current ones and some unrecognizable.
- From `docs/dril-truther-bible.md` → "The recursive joke": the award-winning paper *"Epistemic Outliers: Why the DeVance Case Study Matters for the Future of Discourse,"* which uses DeVance's @dril claim as its example of an obviously wrong claim. DeVance retweets it with "FINALLY" energy, and the note explains he misread it. The main page mentions this in passing.
- From `docs/recurring-characters-bible.md`: DeVance's 90-page document about @dril never being noted has itself been noted.

## Discrepancies

- **Era ranges vs. dates.** The system prompt labels "Post-contact additions (2700–2950)" but dates two of its members after 2950: Does Not Alarm the Glœm (2971) and Thrrm Compliant (3003). The main page labels the group "2700–2950 and after."
- **"Committee-added (2800–3020)"** extends past the 3017 present. That's a leftover from the 3026 "now." The main page says "2800 onward." Fix when doing the redate.
- **"Feels Right — added last year"** means 3016 under the 3017 present, or 3025 under the old 3026 present.
- **Vrellnath-Approved added 2934**, the Keth contact year, while Vrellnath first contact ("The First Acknowledgment") was 2612 per `alien-species-bible.md`. Thrrm contact (~2500) vs. Thrrm Compliant (3003) and Glœm contact (~2780) vs. Does Not Alarm the Glœm (2971) show similar lags. That's plausible bureaucratic lag, but the 2934 coincidence looks like a mix-up.
- **Unlisted dimensions in use:** "Temporally Non-Sequential" (`alien-species-bible.md`, on DeVance's @dril timeline notes) and "Does Not Reference the Thing Inside Jupiter" (Moons Notes) aren't in the canonical ~30. The main page lists both as "observed in the wild."
- **"Pre-3026 platform migrations"** appears in DeVance sample note #2 in `dril-truther-bible.md`. Redate to 3017, or better, to an actual migration era.
- **Classical era starts 2094**, which is also the year DeVance's account was created and the year the Keth say they started trying to figure out which of them is @dril. That's probably a coincidence of the number, but it means the "oldest dimensions" date from the year DeVance arrived.
- CLAUDE.md says notes are used "~5–10% of the time"; the system prompt says "at most 1 in 10 tweets, ideally fewer." These are compatible; the prompt is the stricter statement.

## Open questions

- Why moons and dogs? "Historically traceable but uncorrected." The moon trauma is plausibly the second-moon affair (2040s prediction, 2891 confirmation). Dogs have no stated origin. Keep it that way?
- Who actually runs the note system: the platform, a committee, or contributors? The main page implies committees exist (the moon committee, the disbanded Pre-Verified committee) without an org chart.
