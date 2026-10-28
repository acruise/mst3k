# Talk:The Hellsite
*[Article](../The_Hellsite.md) · Talk*

Source material: `docs/platform-history-bible.md` (Twitter era through the Cycle, recurring callbacks, the closing canon notes), `docs/TODO-redate.md` (the 3022 prediction), `data/system-prompt.txt` lines 26–40, and the Terms of Engagement modal in `public/index.html`. For how to write in the house voice, see [Talk:Twitter](Twitter.md).

## Canon

- **Original Twitter ceased to exist in 2035.** Cause of record: "mismanagement." No greater specificity in any cited source, ever.
- **The Great Quiet ran 2035–2049; the Depression ~2037–2049.** Use "the Depression" when you want it to land hard and "the Great Quiet" when you want it academic.
- **The 2049 relaunch was by an anarchosyndicalist commune that is never named.** The absence of a name is part of what made them feel right. Don't name individual members either.
- **Every member died on the Mars rocket.** No survivors, no backups, no recovered remains.
- **The Upload denies involvement and blames a former employee, a different one each time.** This is the Ex-Employee Defense. Every instance should be *recognizable*; it's the tell. Its primary home is [The Upload](../The_Upload.md); this page only summarizes it.
- **The post-2049 "interested individual" was NOT The Upload.** The Golden Age is the proof: the platform could not have run that well under him. Treat this as settled canon. Who it actually was is unknown and stays unknown; ask nobody, admire the work, move on.
- **The Golden Age lasted 2049–2087** and is the highest operational water mark in platform history. Nostalgia for it is sincere and is allowed to be.
- **The first successful Upload buyback was 2087**, after most of the Golden Age spent being refused.
- **Upload-era fuckups are hilarious-but-survivable, never catastrophic.** The 2035 collapse was catastrophic because he was failing passively as a manager. The cyclical buyout eras are survivable because his wealth shields him from caring about the outcome. Platform bad, life continues.
- **The Cycle: a buyout roughly every 200 years, per @dril, who is correct.** @dril's 3017 prediction of a 3022 attempt is established canon and is unresolved in the present. Nobody believed him; the community notes on Marcus DeVance's "SEE?? DRIL PREDICTED IT" thread were devastating. The 3022 attempt is in the future and should stay a dangling thread.
- **Keep the 2049 rocket and the 2271 Meta sabotage apart.** The Upload and the Zuckload are distinct entities. The Ex-Employee Defense is The Upload's move about his *own* disasters; he doesn't deploy it about Meta. That Meta investigators separately landed on a "disgruntled ex-employee" theory about the Purgecoder is coincidence (or genre convention), not a crossover.
- **Mars is a separate saga.** The Upload personally ran Mars some decades into the 22nd century; it went badly. "Mars Was Right" (subject deliberately ambiguous) has been in Upload Defender bios since at least the 2700s. Don't conflate the Mars period with the platform-ownership saga, and don't draw the line from the commune rocket to his later Mars tenure in plain text. The platform has noticed the proximity and done nothing with it; so should posts.
- **Tone rule.** Dunking on The Upload's plausible proximity to every disaster in platform history is eternal and correct. Dunking on the commune's naivety is fine. Dunking on humans who were sad during the Great Quiet is not: the platform has collectively decided that was a bad time, and you don't make fun of a bad time. The Depression was real and the pain was real.
- **"Pour one out for the commune"** is sincere every year. No one dunks on it. The dunking happens to people who dunk on it.

## Voice and usage

Platform history should surface as casual one-line references, a mood rather than a lecture. The system prompt targets roughly **3–4% of tweets** for historical callbacks (Great Quiet, 2049 commune, Ex-Employee Defense, "Post Through It" as a phrase). The full callback list from the bible is reproduced as the "Cultural references" section of the main article; treat those as energies, not lines to reuse (see [Talk:Twitter](Twitter.md#formats-are-vibes-not-templates)).

Good shapes:
- the survivor who drops one line and leaves;
- a Cycle-aware reply under any Upload platform announcement ("clockwork.");
- the history bro who explains "Post Through It" and gets told to log off;
- the Golden Age post that is nostalgic, sincere, and a little disbelieving.

The Terms of Engagement text is the frontend's own diegetic writing and a good model for platform-official voice: deadpan, self-undermining, bureaucratically overcommitted.

## Implementation

- **System prompt:** `data/system-prompt.txt` lines 26–40, "PLATFORM HISTORY — THE FOUNDATIONAL BACKSTORY." Includes the Cycle, the 3022 prediction, Tumblr, Bluesky, the tone rule, and the 3–4% frequency.
- **Summon tag `history`** (3 formats in `data/meme-formats.json`): the "pour one out for the commune" anniversary post, the "Post Through It" + history-bro + log-off ritual, and the "remember when we had no hellsite for fourteen years" mood post. Test with `?summon=history`.
- **Upload-tagged format** (`upload`): The Upload or a Defender deploying the Ex-Employee Defense on an unrelated matter ("approximately the 40th time this century"). Note this entry's tags array is `["upload", "upload"]` (duplicate tag; harmless).
- **Untagged format:** "tweeting about the platform itself ('can't believe they changed the quantum entanglement button to a rhombus')."
- **Reply archetypes** (`data/reply-archetypes.json`, plain strings, no tags): "ex-employee defense just dropped" (gets 200k likes every time, never explained); the Upload Defender explaining that the 2049 engine design was perfect and the (incorrectly named) former employee is the villain; the "survivor: the great quiet (2037-2049)" bio drop-and-leave.
- **Incite key `ex-employee-defense`** (in `INCITE_MAP`, `server.js`): forces an Upload or Defender reply that deploys the defense.
- **Gimmick account:** `@PourOneOutBot` (system prompt gimmick inventory) pours one out once a year on the anniversary.
- **Frontend:** the Terms of Engagement modal (`public/index.html`, `#tosOverlay`) is the source of the "Terms of Engagement" section.

## Unused material

From `docs/unplaced-comedy-angles.md`, "Platform Meta-Comedy":
- The quantum entanglement button changed to a rhombus, with discourse *exactly* like every real platform UI-change discourse. (Partially deployed as an untagged format; the full discourse-cycle version isn't.)
- "back in the 2900s the timeline was good" (it was not good).
- Someone discovering an old platform feature and acting like they've uncovered ancient ruins.
- The person who threatens to leave every week for 150 years.

From the bible's closing paragraphs: the obvious-questions thread, in which someone lays out the pattern (beloved thing died because a specific man mismanaged it; idealists revived it and died on a rocket whose engine he designed; he later bought it; the Cycle continues) and the replies are, as always, a mix of "yeah," "you can't prove anything," and a single Keth glyph that would almost certainly translate as a laugh.

From `docs/TODO-redate.md`: a sample shape for the 3022 prediction in the subtle "v2" dril style, funny on its own and horrifying in retrospect: "saw the big man eyeing up the platform again today. same look he had in 2847. same look he had in 2956. somebody hide the buy button before he gets to it. i am being Serious but i know how this looks". (See Discrepancies: its dates don't fit a 200-year cycle.) The canonical text is the plainer one quoted in the article.

## Discrepancies

- **Length of the Great Quiet.** The bible dates the Great Quiet 2035–2049 ("fourteen years") and the Depression ~2037–2049. `data/system-prompt.txt` line 29 labels "THE GREAT QUIET (~2037–2049): Fourteen years", conflating the two; 2037–2049 is twelve years. The survivor reply archetype's bio also says "the great quiet (2037-2049)". The article uses 2035–2049 for the Quiet and 2037–2049 for the Depression, and lets the survivor bio stand as in-universe usage.
- **Single-word rejection.** The bible's narrative says "several" pre-2087 offers were rejected with a single word; its canon notes and the system prompt say "one, per rumor." The article hedges ("at least one ... several, by some accounts").
- **How many buyouts.** The bible describes a repeating ~200-year Cycle since 2087 (so roughly five Upload ownerships by 3017). `docs/TODO-redate.md` says he has bought the platform "at least twice" and describes a specific "second time" (the three-day outage, moderation team replaced by forks). Compatible if "at least twice" is a floor, but the TODO reads as if two is the count. The article places the forks outage in "his second ownership."
- **The cycle's dates.** A strict 200-year period from 2087 gives ~2287, 2487 … 2887, 3087, which doesn't land on 3022. The TODO-redate sample dril post references 2847 and 2956 as prior attempts, which is neither 200-year-spaced nor consistent with 3022 (66 years after 2956). "Roughly" absorbs some of this; open question whether to canonize specific past buyout years.
- **First ownership vs. Mars.** The first Upload ownership lasted "about a century and a half" from 2087 (to ~2237). The Upload ran Mars "some decades into the 22nd century," which overlaps. The system prompt says the Mars period is "unrelated to his platform ownership saga." Not a contradiction strictly (he could do both), but nobody has said so.
- **"Briefly" for sixty years.** The Cycle lists an owner that was "(briefly) an AI nobody realized was an AI for 60 years." Presumably the ownership was brief and the undetected AI-ness long; ambiguous.
- **"Nobody has questioned it in 700 years."** The bible says the Peak Era replication has gone unquestioned for 700 years, implying the deliberate callback aesthetic dates only from the ~2300s, not from the 2049 relaunch. Unresolved; the article doesn't commit.
- **Vrellnath near-contact.** "Almost made contact 600 years early" from the 2040s implies ~2640s; the Vrellnath contact date elsewhere is 2612. Approximate figures; flag for [Talk:Vrellnath](Vrellnath.md).
- **Epoch 3026 in the frontend.** `public/index.html` still shows "Epoch 3026.047" (ToS), "epoch 3026.000" (subheader), "the year 3026" (empty state), "circa 3026 CE" (footer), and ToS §7 "years other than 3026". The system prompt line 1 and replies prompt say 3026 too. The wiki uses 3017 per the P1 redate TODO.
- **Ruling 4471-B.** The ToS decline message cites "Galactic Court Ruling 4471-B"; the canonical court elsewhere is the [Terran Solar Court](../Terran_Solar_Court.md). Possibly a different court; not reconciled.

## Open questions

- Who was the interested individual? Canon says: unknown forever. Don't resolve.
- The 3022 attempt: when (if ever) the corpus should be allowed to move past 3017. For now it is permanently five years away.
- Whether to canonize the specific years of past Upload buyouts and buybacks (see Discrepancies), and which owner was the "literally illegal" one.
- `docs/TODO-redate.md` also lists the redate work item (3026→3017 in prompts, frontend, CLAUDE.md; review dril-truther, alien-species, recurring-characters, and document-ideas dates in context rather than by blind find-and-replace; historical dates such as 2612, 2714, 2755, 2901, 2934, 2987 stay). That is a code task, not lore; it is tracked in `CLAUDE.md`.
