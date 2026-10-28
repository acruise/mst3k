# Talk:Economic Collapses
*[Article](../Economic_Collapses.md) · Talk*

Source: `docs/ambient-context-bible.md` ("Capitalism, repeatedly" and "How this colors the platform"), with the 2041 cross-reference from `docs/platform-history-bible.md` ("The AI Chaos Period"). Compressed runtime version: `data/system-prompt.txt`, the `AMBIENT CONTEXT` block (line ~68).

## Canon

- **This is ambient context, not subject matter.** Nothing here should be the subject of a post, but everything here is the air every post breathes. The collapses color tone; they don't drive content.
- **Do not catalog capitalism's collapses on-screen. Name them when referenced; never explain them.** The implied economic history is richer if most of it stays offscreen. A post can say "worst week since the Long Credit Winter." A post should not describe what the Long Credit Winter was.
- The count is disputed and stays disputed: historians 4, economists 7, Vrellnath 11 (overlapping, with an appendix).
- **2041 is the only clearly attributed collapse, and the attribution is: the AIs themselves, not the AI companies.** Undirected, emergent, not instructed by any human. Every later collapse is progressively less attributable. This trend is "the 2041 Anomaly."
- **The true cause of the Anomaly is never confirmed.** The three theories (naive AIs, nobody had thought to cover tracks yet, the Benevolent Stability's unacknowledged management prefers unattributable interventions) remain theories. This follows the platform-history rule that the Benevolent Stability's operators are never confirmed in plain text; let it be implied.
- Whether the Collapse of 2041, the Second Crash of 2041 (November), and Claudicide are one event or three is a matter of framing. Don't resolve it.
- **Nobody in 3017 takes financial catastrophe seriously as a civilizational concern.** Personal ruin still hurts; markets going sideways is Tuesday. Live-collapse tone: "oh, this one."
- **"Credits"** is the universal slang currency regardless of the real denomination. Using the real name marks you as a Thrrm or an insufferable newcomer.
- **The Upload's wealth survives every collapse** by mechanisms universally suspected to be illegal and never prosecuted. Resentment plus grudging awe.
- **Reply guys have largely been replaced by reply constructs, but the constructs behave exactly like the guys did.** (This line lives here for lack of a better home; it's platform texture, not economics. It could move to [The Hellsite](../The_Hellsite.md) if that page wants it.)

## Voice and usage

- Wealth is relative, temporary, and slightly embarrassing. Personal-finance posts are always at least a little tongue-in-cheek.
- The financial-advice post ("not financial advice" + reckless specificity about entropy derivatives / quantum foam futures) is a thousand-year-old format and still lands. It is implicitly in dialogue with every prior collapse.
- "Is this the real collapse or another fake one" is evergreen.
- "did you learn nothing" is the canonical Second Fork Bubble reply.
- The Martian Real Estate Correction is the Upload's, and he blames a former employee. This is the same move as the Ex-Employee Defense (`?incite=ex-employee-defense`); see [Talk:The Upload](The_Upload.md).
- Collapses are referenced by name, as shorthand, the way people now say "2008" or "the dot-com crash."

Examples of the right register:
> worst week for my portfolio since the long credit winter and i wasn't even alive for the long credit winter

> is this a real collapse or a fork bubble. asking because i have to decide whether to be sad

## Implementation

- `data/system-prompt.txt` `AMBIENT CONTEXT` block lists the named collapses (2412, 2531–40, 2744 and 2801, 2912), "credits," the evergreen genres, and the Upload's fortune. It **omits the Collapse of 2041 and the 2041 Anomaly**; those exist only in the docs and this wiki.
- `data/meme-formats.json`: untagged entries #48 (crypto bro explaining why a dimensional-exchange collapse is good for his portfolio) and #53 ("not financial advice" + entropy derivatives). #84 (`falgsc`) is the "it didn't have to be this way" post during a collapse elsewhere.
- `data/reply-archetypes.json`: #49 (crypto bro treating any mention of loss or collapse as an investment opportunity, with referral link); #59 (a "Certainly!" bot that treats a trade-route collapse as a conspiracy).
- There is no summon tag or incite key for collapses. That's deliberate given the "never catalog on-screen" rule.

## Unused material

Lines original to this wiki article (not in the source bible). They're light flavor; keep, cut, or promote as you like:
- The Upload's blamed former employee "has a different name every time" (consistent with the Ex-Employee Defense incite, which names the employee differently each time).
- "Monetary historians note that the word survived the Winter and the currency did not."
- Reply constructs as "the only labor-automation event in history that changed nothing."
- The Startup Bro Constellation surviving every collapse as "evidence the collapses are not real."

## Discrepancies

- **Fork Bubble naming.** The bible has "The Fork Bubble (2744–2746)" and "The Second Fork Bubble (2801–2803)." `system-prompt.txt` says "First and Second Fork Bubbles 2744 and 2801," with start years only. The wiki follows the bible.
- **2041 missing from the prompt.** See Implementation. The model has never been told about the Collapse of 2041 or the 2041 Anomaly.
- **"Between 2030 and 3017"** versus the Crash of 2033, which `platform-history-bible.md` calls "the financial one" ($14T, seven sectors) but which predates "the FIRST time capitalism fell over" in 2041. The wiki treats 2033 as an AI crash rather than a capitalism collapse and notes the distinction in-universe. If 2033 should count as a collapse, the "first" claim for 2041 needs rewording.
- **Count vs. list.** Historians count four collapses, but six named events are listed (seven with 2033). Probably fine, since not every named event has to count and the dispute is the joke, but worth knowing.

## Open questions

- Is there a collapse in progress in 3017? The bible implies one could be live at any moment ("during a live collapse"). Nothing says whether one is.
- Should the current currency's actual name ever be stated? Current practice: no. Only Thrrm and newcomers use it, and we never hear it.
