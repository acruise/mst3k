# Talk:Startup Bro Constellation
*[Article](../Startup_Bro_Constellation.md) · Talk*

Source: `docs/ambient-context-bible.md` ("The Startup Bro Constellation," "How this colors the platform," "Canon notes / guardrails"). Runtime: `data/system-prompt.txt` `AMBIENT CONTEXT` block (line ~70).

## Canon

The four structural facts, which the bible gives "in the user's own words":
- **Always surprising.** The specific next thing is unpredictable, but the shape (bold vision → deranged execution → overconfidence → implosion) is predictable.
- **Usually hilarious.** The comedy is the pitch-deck-vs-outcome gap.
- **Often dystopian.** Surveillance, consciousness exploitation, monetizing the Glœm (doesn't work), sealed Terran Solar Court rulings.
- **Once in a blue moon (1 in 400) an unalloyed good.** This is real, not a myth. **Use it sparingly. When deployed, it should complicate a dunk, not resolve one.** The product stays good; the founder never gets to be clean.

Other guardrails:
- **Tonally continuous with 2010s–2020s Silicon Valley** (pitch-deck cadence, founder cosplay, "we're doing good by doing well" moral posturing), but **transposed onto alien substrate**: neural-lace subscriptions, orbital deli franchises, consciousness-fork insurance.
- The acronym sequence SaaS → SaaC → FaaF → BaaQ → (current). The current one is unnamed; keep it that way or invent a new one per post. Acronyms get dumber; funding gets larger.
- Zk'vrath decks end "AND THEN WE INVADE"; they refuse to reword.
- Thrrm investor reviews: legally mandatory to accept, always 100 pages, always form numbers.
- Thrrm regulation attempts: 47 failed, now on the 48th (as of 3017), plus the report about giving up and the report about the report.

## Voice and usage

- Founders post in present-day founder voice: "we're building," "excited to announce," "this is just the beginning," humility-brag. Swap the noun for something 3017.
- Dunk replies target whichever venture is imploding, or whichever one is pretending it isn't.
- The 1-in-400 is best as a quote-post fight: "this company literally cured the Veskar blight" / "and then he posted about the moon."

## Implementation

- **Summon tag `startup` exists in `SUMMON_TAGS` (server.js line ~71), but no format in `data/meme-formats.json` carries it**, so `?summon=startup` silently falls back to the full pool. CLAUDE.md's summon table lists its count as "—".
- Relevant untagged formats: #56 ("if you're not building right now you're sleeping," from someone whose display name says "🔮 | founder | builder"), #48 (crypto bro during a dimensional-exchange collapse), #192 (`upload`: the Upload announcing a terrible new venture).
- Reply archetypes: #6 (reply turns the post into a pitch for their startup/project/cult).
- No incite key.

## Unused material

These comedy angles from the bible haven't been deployed in any format:
- Pivots-as-a-service founder (11 pivots in 2 years).
- The venture digitizing smells, pain, or a specific unnamed emotion; the founder can't understand the upset.
- The 1-in-400 founder beloved for six months, then posts something unhinged.
- Zk'vrath pitch decks.
- Thrrm investor reviews.
- Thrrm's 48th regulation attempt.
- Glœm-monetization startups.

All of these would make good `startup`-tagged formats and would give the tag a non-empty pool.

## Discrepancies

- `startup` summon tag with zero formats (see Implementation).
- The wiki's line that the Upload is "sometimes described as the Constellation's oldest member" is original to the wiki (a bridge to [The Upload](../The_Upload.md)); the bible doesn't connect them.

## Open questions

- What is the current hot acronym in 3017? Deliberately unnamed so far.
