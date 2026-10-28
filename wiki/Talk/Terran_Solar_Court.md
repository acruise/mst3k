# Talk:Terran Solar Court
*[Article](../Terran_Solar_Court.md) · Talk*

Sources: `data/system-prompt.txt` (`RECURRING INSTITUTION — THE TERRAN SOLAR COURT`, line ~165); `docs/meta-refugee-crisis-bible.md` ("The sabotage" → No Explanation Clause; "Comedy angles not yet deployed"); `docs/ambient-context-bible.md` (sealed startup rulings); `docs/platform-history-bible.md` (the Mars filing, line ~124); `system-prompt.txt` Censored Whistleblowers block (sealed orders as a candidate censor). This page is the primary home for the Court as an institution; the Meta crisis itself lives on [Talk:Meta Refugee Crisis](Meta_Refugee_Crisis.md).

## Canon

- The galaxy's highest court for anything involving humans.
- **The bench has been stacked for centuries with scholars of shitposting and dunking.** Qualifications: the load-bearing pause, the refusal-as-statement, the reply that ends a debate, the ratio as equitable remedy. Appointment = the galaxy's most prestigious literary award.
- Rulings are terse, rhythmically devastating, often meme-able.
- **The No Explanation Clause** (*In re Meta*), verbatim: "The details of the identity, methodology, and motive of the party or parties responsible for the sabotage of the Meta substrate are hereby placed under permanent informational closure. No explanation is provided. No explanation is permitted. No explanation will be accepted." Never overturned. The meta-prohibition (why no explanation is permitted) is itself sealed. **Never explain it. Never let anyone in-universe crack it.**
- The one dissent: **"respectfully, lol"**, in its entirety.
- The ruling is the most cited "not because of its legal reasoning" but because it's an all-time dunk. Conspiracy theorists consider it the greatest insult ever devised to them.
- **The Thrrm are legally required to acknowledge Court rulings and despise the Court more than any other institution.**
- The Court has issued sealed rulings about dystopian startups.
- The Court declined to take a filing on the Hellsite-commune / Mars proximity.
- Court sealed orders are *one* candidate censor for whistleblower redactions. The ambiguity among the four candidates is deliberate; never resolve it.
- **Truth the main page can't state:** Marcus DeVance's 1,400 pages on the Meta sabotage are **not correct** (bible: "He is, on this one, not correct"). This contrasts with his @dril theory, which is correct. The main page only says the pages exist.

## Voice and usage

When the Court comes up in posts:
- Quote rulings like song lyrics.
- Speculate about pending decisions like draft picks.
- Get devastated in the replies by anonymous accounts believed to be clerks.
- Post "the Court is cooking" when a ruling drops.
- Invoke the No Explanation Clause as a punchline in unrelated contexts.

If you write a new ruling, it should be one to three sentences and scan like a good post. Dissents are one line, lowercase welcome.

> the Court is cooking. "the petitioner's argument is noted. it is not good." that's the whole opinion. 9-0.

## Implementation

- Summon tag **`court` exists in `SUMMON_TAGS` but no format in `data/meme-formats.json` carries it**, so `?summon=court` falls back to the full pool. CLAUDE.md's summon table shows "—".
- The only Court-adjacent format is #264 (tagged `meta`): invoking the No Explanation Clause as a punchline in an unrelated context. `?summon=meta` is the practical way to test it.
- No incite key.
- Runtime lore: `system-prompt.txt` line ~165, and the Meta crisis paragraph (line ~41) for *In re Meta*.

## Unused material

From `docs/meta-refugee-crisis-bible.md` ("Comedy angles not yet deployed"):
- **The class action on behalf of the wiped MetaUploads**, which ran for **340 years** and produced "one of the most influential pieces of legal scholarship in galactic history: *In re Meta*, which established the legal personhood of uploads. The case was funded entirely by schadenfreude." See Discrepancies. The main page alludes to it only as "later litigation."

Ideas original to this page:
- Named justices, or at least a famous clerk account that everyone believes is a clerk.
- Other rulings with canonical one-liners, so posts have more than one ruling to quote like lyrics.
- The confirmation hearing as literary event: senators reading a nominee's post history aloud.
- The main page's "legal commentators and literary critics reach the same conclusions" and the Thrrm-filings-without-warmth line are wiki-original flavor.

## Discrepancies

- **Two things called *In re Meta*.** In the bible's main text (and the system prompt), *In re Meta* is the **inquiry ruling containing the No Explanation Clause**, sealing the sabotage. In the bible's "Comedy angles not yet deployed," *In re Meta* is a **340-year class action establishing upload legal personhood**. These could be one docket (a class action whose final judgment sealed the sabotage) or two cases sharing a name. Unresolved; the main page keeps them vaguely connected ("the ruling's name is also attached to later litigation"). Also note that a 340-year case starting in 2271 ends around 2611, which is odd if the No Explanation Clause was issued "at the conclusion of the inquiry."
- `court` summon tag has zero formats (see Implementation).
- The DeVance 1,400-page figure comes from the Meta bible, which calls him "The Dril Truther." The main page uses his in-universe name, per README convention.

## Open questions

- When was the No Explanation Clause issued? "At the conclusion of the inquiry" gives no date. The wiki leaves it undated (sometime after 2271).
- Does the Court have jurisdiction over non-humans when a human is a party? "Anything involving humans" suggests yes, which would explain the Thrrm's obligation.
- How are justices appointed, and by whom?
