# Talk:FALGSC Polities
*[Article](../FALGSC_Polities.md) · Talk*

Source: `docs/ambient-context-bible.md` ("The FALGSC Polities," "The FALGSC AI schism," "How this colors the platform"). Runtime: `data/system-prompt.txt` `AMBIENT CONTEXT` block (line ~69) and the `falgsc_sigil` field in the output schema.

## Canon

- **FALGSC is sincere, not a punchline.** Dunks on FALGSC posters' *tone* are fine. Dunks on the polities' actual *functioning* are not, because they actually function. The joke is that the setup is absurd on paper and works anyway.
- Post-scarcity; statistically happiest places in the surveyed universe (Vrellnath study, unreplicated out of fear).
- "FALGSC" is a normal diplomatic abbreviation. The phrase is in treaty texts, unironically.
- Not a monoculture: arguments over "luxury"; brief schisms over "gay," all resolved ("it is fine, it has always been fine, stop").
- **The AI schism is permanent and symmetric.** Both blocs thrive; neither converts the other; the diplomats are friends and think the other side is correctly responding to differently weighted inputs. The evidence (AI caused 2041; AI apparently managed the Benevolent Stability) supports both. Don't let a post declare a winner. Don't let a post confirm who or what ran the Benevolent Stability (see [Talk:AI Chaos Period](AI_Chaos_Period.md)).
- Deeply suspicious of The Upload. His content isn't banned there, but volunteer moderators context-note it aggressively as civic duty.
- **FALGSC posters are not smug about post-scarcity.** They're smug about other, smaller things.
- "It didn't have to be this way," posted during a collapse elsewhere, is one of the worst posts on the platform. Everyone dunks; they keep doing it.
- **Sigil rule:** FALGSC accounts get `falgsc_sigil: true` and `verified: 0`. Both a FALGSC sigil and a paid tier on one account is a scandal that happened exactly once (11 months of discourse). The Thrrm despise the FALGSC sigil (never ratified); the platform shows it because the polities asked nicely and 14 billion people voted yes.

## Voice and usage

- Target: about **3–5% of human posts** are from FALGSC posters (per the `falgsc_sigil` schema note in `system-prompt.txt`).
- Register: people who haven't thought about rent in 300 years. More compound words, fewer finance metaphors, deadpan affection that reads soft to outsiders and is not.
- Staple post types: wholesome shitposting, genuine political theory, "my neighborhood built a new thing together this weekend" (400K likes on slow days), earnest explanations of a governance system that get more surreal per sentence and clearly work.
- Replies to wholesome FALGSC posts: ~60% wholesome back, ~40% "must be nice."
- Against Upload Defenders: genuine confusion, not anger. This is what makes the Defenders angrier.

## Implementation

- Summon tag: `falgsc` (10 formats in `data/meme-formats.json`, indices 82–91). Coverage: hustle culture in post-scarcity (#82), weekend project (#83), "it didn't have to be this way" (#84), smug about the wrong thing (#85), official diplomatic account posting policy as a shitpost (#86), first-time visitor liveblog (#87), petty internal discourse (#88), surreal governance explainer (#89, also tagged `upload` at #90: Upload Defenders vs. a confused FALGSC poster), Thrrm trying to register "FALGSC" as a governing philosophy (#91, also tagged `thrrm`).
- No incite key.
- JSON: `falgsc_sigil: true` (tweets and replies), `verified: 0`. The prompt schemas for both tweets and replies document it.
- Rendering: `falgscSigilSVG()` in `public/app.js` draws a rainbow-gradient hammer-and-sickle in a circle; `.sigil-falgsc` in `public/style.css` runs a hue-shift animation (`falgscHueShift`, faster on hover). Tooltips come from `FALGSC_TOOLTIPS` in `app.js` (35% of accounts, chosen by a handle hash, get a variant: "Approved by 14.4 million neighbors in a 90-second vote," "The application is one question: 'do you live here?'", the 211-page polite and devastating feedback, "Breakfast is provided. Everything is provided."). The profile URL carries `fg=1`.
- The "moving to a FALGSC polity" retirement line is from a `skeet` context in `docs/platform-history-bible.md` (line ~281).

## Unused material

- Specific FALGSC polity names. None exist yet. Candidates would want compound-word slang.
- The "too much" criticism of cultural output from both blocs is a good symmetry beat that no format uses.
- The diplomats-who-are-friends angle: a diplomat from each bloc posting about the other with total respect and zero agreement.

## Discrepancies

- The 14 billion who voted yes on displaying the FALGSC sigil (system prompt) and the "14.4 million neighbors" in the `app.js` tooltip aren't in conflict: one is the platform-wide display vote, the other is a single account's local grant. Noted here so nobody "fixes" one to match the other.
- The system prompt's `AMBIENT CONTEXT` doesn't mention the AI schism. The model has never been told the FALGSC bloc is split.
- The cat-registry ombudsperson and the "4.2 billion to seven" vote come from format descriptions (#89, #86), which are meant as vibes rather than canon text. The main article treats them as representative facts. If that's too literal, soften them.

## Open questions

- How many FALGSC polities are there, and where? The source says "several."
- Were the polities founded before or after 2041? The schism implies they were founded after 2041, or re-founded around it.
