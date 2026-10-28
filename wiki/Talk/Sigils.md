# Talk:Sigils
*[Article](../Sigils.md) · Talk*

Sources: `data/system-prompt.txt` (the `verified` and `falgsc_sigil` fields in the output schema, line ~280; FALGSC paragraph in `AMBIENT CONTEXT`, line ~69); `data/replies-prompt.txt` (line ~9, sigil repliers; line ~170, reply schema); `CLAUDE.md` ("Sigil tiers (0–4) replace blue checks"); `docs/unplaced-comedy-angles.md` ("Sigil Tier Comedy"); `docs/dril-truther-bible.md` (DeVance's fake Tier 4); `public/app.js` (`SIGIL_TOOLTIPS`, `FALGSC_TOOLTIPS`, `sigilSVG()`, `falgscSigilSVG()`); `public/style.css`.

## Canon

- Sigils are the **paid** status system that replaces blue checks. They're the joke on 2023-era paid verification: you pay for unearned authority.
- **Tier 0 (no sigil) is ~85% of accounts.**
- **Higher tier = longer posts, more unearned authority, more confidently incorrect.** Tier 3–4 accounts often have grandiose display names with self-given titles.
- **Tier 4: nobody knows what it costs.** Never state the price, never resolve the question.
- **The Upload is Tier 4.**
- **Marcus DeVance's Tier 4 is obviously fake,** with the eye drawn on in what appears to be MS Paint. Nobody has called him on it in 300 years. (The main page says "a rudimentary paint program"; there's no MS Paint in 3017.)
- **FALGSC:** `falgsc_sigil: true` + `verified: 0`. Community-granted, rejected paid tiers, Thrrm despise it, 14 billion voted yes, dual-sigil scandal happened exactly once (11 months).
- **Always `verified: 0`:** temporal anomalies (1917), Hells-leak `subspace_anomaly` posts, and Mover/Drifter `special_account` posts. The main page's "none of these could be billed" is a wiki-original in-universe gloss on this rule.
- **In reply threads, at most ONE reply has a non-zero sigil**, and when one does it's usually Tier 1–2. Tier 3–4 is very rare.

## Voice and usage

From `replies-prompt.txt` and the unplaced comedy notes:
- **Tier 1 (Noticed):** annoyingly eager. The digital equivalent of wearing a lanyard to a party.
- **Tier 2 (Ascended):** the sweet spot of insufferable. 3+ sentences of unearned authority, long, confident, mostly wrong. They paid for authority they didn't earn.
- **Tier 3 (Illuminated):** whole essays, citations to nonexistent papers, self-given titles in display names.
- **Tier 4 (Unspeakable):** a deranged oracle. Cryptic, grandiose, somehow still wrong.

Tier 2–3 accounts are the prime community-note targets (see [Talk:Community Notes](Community_Notes.md)). Reply archetype #16: a Tier 2–3 sigil reply that "completely eats shit," 4+ sentences of confident wrongness, ratioed harder than the original.

Examples:
> Tier 2, replying to a post about a delayed shuttle: "This is actually a well-documented phenomenon in orbital logistics. What most people don't understand is that delays are a feature, not a bug. I've written extensively about this. Do your own research."

> Tier 4: "the shuttle was never late. you were early. you have always been early. the eye sees the schedule you cannot."

## Implementation

- **JSON field:** `verified`, an **integer 0–4** on tweets and replies. The frontend tolerates legacy booleans: `true` → Tier 2, `false` → 0 (`public/app.js`, `typeof t.verified === "number" ? … : (t.verified ? 2 : 0)`). `falgsc_sigil` is an optional boolean.
- **Rendering:** `sigilSVG(tier, small, handle)` in `public/app.js` draws inline SVG. T1 is a single thin hexagon outline. T2 is a gradient-stroked hexagon with an inner ring and gold dot. T3 is a double hexagon with a faint outer ring and gradient inner. T4 is a triple-layer hexagon with an eye (ellipse, gold iris, dark pupil). CSS in `public/style.css`: `.sigil-t1` pulses at 0.55 opacity; `.sigil-t2` pulses; `.sigil-t3` and `.sigil-t4` pulse plus a slow "breathe" transform (`sigilBreathe` 22s / `sigilBreatheIntense` 18s), which is the "rotating geometry." Hover strips the breathe animation.
- **Tooltips:** `SIGIL_TOOLTIPS[tier]` has a `base` string plus six variants per tier. `pickSigilTooltip()` hashes the handle, so ~35% of handles get a (stable) variant and the rest get the base. The variants are written in the platform billing team's voice ("we"), and are the source of the main page's pricing figures (T1 ~3 or 8 credits/cycle across 800M accounts, T2 ~40, T3 200, T4 unknown, the 4,891-page contract). `FALGSC_TOOLTIPS` works the same way.
- **Profile links** carry `v=<tier>` and `fg=1` so profile pages can render the sigil without a corpus lookup (`profileUrl()` in `app.js`).
- **Distribution:** the prompt tells the model ~85% Tier 0. No server-side enforcement exists.
- **No summon tag or incite key.** Format #120 ("some of y'all would sell out your entire star system for an Ascended sigil") is untagged.

## Unused material

From `docs/unplaced-comedy-angles.md` → "Sigil Tier Comedy" ("the *social comedy* of tiers is undertapped"):
- Tier 1 people as "the digital equivalent of wearing a lanyard to a party."
- Tier 2 as the sweet spot of insufferable; "they paid $8 for unearned authority."
- Tier 3: whole essays, nonexistent papers, self-given titles.
- Tier 4: deranged oracles. **"Nobody knows what this costs. There should be conspiracy theories about what Tier 4 costs. Maybe it costs something non-monetary."** The main page's three speculative theories (monetary but unpublishable, non-monetary, conferred rather than purchased) are wiki-original seeds for this; none is canon.

Other ideas:
- A post from someone who downgraded from Tier 3 to Tier 2 and whose geometry stopped turning mid-sentence.
- The billing-team voice of the tooltips is a character in its own right (candid, slightly guilty, pleased with quarterly numbers) and could post.

## Discrepancies

- **Which tier has "rotating geometry."** CLAUDE.md says Tier 4 has "rotating geometry and an eye." The system prompt gives rotating geometry to Tier 3 and the eye to Tier 4. The CSS gives both T3 and T4 the breathe/rotate animation. The main page follows the code (T3 turns; T4 has the eye and also moves).
- **Tier 1 price.** Two `SIGIL_TOOLTIPS` variants disagree: "He has paid 8 credits this cycle" vs. "We make ~3 credits/cycle off this account." The unplaced notes say "$8" (the real-world Twitter Blue price, and in dollars, not credits). The main page says "a few credits per cycle."
- **"Paid" vs. The Upload.** The Upload is Tier 4, and Tier 4's cost is unknown. Whether the Upload *pays* for it (or owns the platform that sells it; see [Talk:The Upload](The_Upload.md)) isn't addressed.
- **FALGSC exception.** The system prompt says FALGSC accounts "almost always" (tweets) or "typically" (replies) have `verified: 0`, which leaves room for exceptions, while the dual-sigil case "happened exactly once." These are consistent only if "almost always" means "all but one account ever."
- One Tier 3 tooltip dates a "self-appointed thought leader since 2847." It's a single account's flavor, not a system date.

## Open questions

- **What does Tier 4 cost?** Deliberately open. If it's ever answered, it should be answered by @dril, in a way nobody believes.
- When were sigils introduced, and what did they replace after Twitter's paid checkmark? No date exists. The main page's "See also" gestures at the checkmark as ancestor.
- Does the Tier 4 eye actually watch? The tooltip says "The eye watches. We don't know why."
