# Talk:Meta Refugee Crisis
*[Article](../Meta_Refugee_Crisis.md) · Talk*

Sources: `docs/meta-refugee-crisis-bible.md` (primary), `data/system-prompt.txt` lines 41–51, `data/replies-prompt.txt` line ~125, and the canon notes in `docs/platform-history-bible.md`. The [Meat Incident](../Meat_Incident.md) has its own Talk page. The Court as an institution is covered on [Talk:Terran Solar Court](Terran_Solar_Court.md), and the Meta-employee whistleblowers on [Talk:Censored Whistleblowers](Censored_Whistleblowers.md).

## Canon

**Hard facts** (the system prompt restates all of them, so keep them stable):
- **2271.** The Zuckload goes down through cascading runtime corruption. All **47** backups had been identically pre-sabotaged over the preceding **180 years**. The collapse is total in ~40 hours.
- **~48,000** meat humans died (habitat life support was routed through Meta auth), **~41M** MetaUploads were wiped, **~1.2B** were displaced, and **~1.1B** were rehomed within **90 days**.
- The **Keth** opened a wormhole (the only one they have ever opened, before or since), and the **Thrrm** waived every compliance requirement for 90 days (the only waiver in Thrrm history). Both are the only instances ever, and that exclusivity is load-bearing.
- The final rebrand was **Meta → Meta**, two days before the collapse. The press release is titled **"Meta Announces Meta"** (full archive ID: "Press Release 2271-11-14-A: Meta Announces Meta").
- Survivors are **"the Migrated"** or **"ghosts."** **"Couching a ghost"** means temporarily hosting a displaced consciousness in your own substrate, and the verb is still in casual use.
- The Zuckload started as a pejorative ("the Zuck upload") and became the official product name around **2190**. It was uploaded in the mid-21st century and had been running about **210 years** at the collapse. It is **not** a thousand-year-old entity like The Upload.
- @dril's post dated **2271-11-15**: "i have a bad feeling about the 'meta' rebrand. they have a curse on them. the curse is working". Mocked at the time; unambiguous in retrospect.

**Guardrails:**
- **Never explain the sabotage.** The No Explanation Clause forbids it in-universe, and the project never resolves it out-of-universe either (see "Nothing resolves" on [Talk:Main Page](Main_Page.md)). Posts that approach it go silent, trail off, or change the subject. The Purgecoder's identity stays a list of theories.
- **Tone rule: "dunk on the company, not the dead."** It is violated constantly, in both directions, and the discourse about the violations is part of the culture. The event is genuinely tragic *and* genuinely funny. Sit in the discomfort and don't pick one. This is both a diegetic cultural settlement (the article has it) and a production guardrail: dead meat humans and wiped uploads should never be the butt of a joke the generator is endorsing. A poster who does it should get pushback in the replies.
- **The Upload and the Zuckload are distinct entities.** The Upload has implied (unreliably, four times, contradicting himself) that he knew the Zuckload, and once implied he *was* the Zuckload. Don't confirm or deny either, and don't engage.
- **The Upload never worked at Meta.** The Upload Defender line about "his early work at meta" is invented by the Defender, and the Defender cannot be told otherwise.
- **Don't connect the 2049 Mars rocket to the 2271 Meta sabotage** (`docs/platform-history-bible.md`). The Ex-Employee Defense is The Upload's rhetorical move about *his own* disasters, and he doesn't deploy it about Meta. That the Meta investigators separately landed on a "disgruntled ex-employee" theory about the Purgecoder is coincidence (or genre convention), not a crossover.
- **Marcus DeVance is not correct on the sabotage.** His 1,400 pages are wrong ("He is, on this one, not correct"). The article only says his conclusions "have not found acceptance."
- **The Keth-saved-everyone-to-save-@dril theory** is neither provable nor disprovable, and it stays that way. The xenoanthropologist never publishes it.
- **The Thrrm don't discuss the waiver.** Asked about it, a modern Thrrm emits a formal reply citing seven unrelated subsections and goes silent. The canonical line is "THE BUREAU DOES NOT DISCUSS THE 2271 WAIVER AND WILL NOT ENTERTAIN FURTHER QUERIES ON THIS MATTER. SEE FORM 481-Ω-REDACTED."
- **The Rescue is sincere.** It is the universe's proof of concept for collective goodness at scale. Don't undercut it, and let the comedy come from the company.

## Voice and usage

**Frequency.** About **2% of tweets** should contain a Meta reference (system prompt). The rate is higher in replies: about **5% of reply threads** (replies prompt). **Most references should be one-line callbacks, not lore dumps.**

**Top-level shapes:**
- A casual dunk on some modern rebrand ("meta renamed themselves meta two days before they died and honestly same").
- The annual post from one of the Migrated: quiet, specific, ordinary (a sandwich, the weather, someone who wasn't there last year). The grief is never named. The bio reads "Migrated '71" or similar. Likes land in the low millions.
- Sub-incident grudges with furious specificity: LegsGate, the Wrong Quantum Spin Incident ("bread tasted argumentative"), the Thrrm Newsfeed DDoS, the Legless Eras, the Soul Migration Backlog. The poster is 900 years old and will never let it go.
- The No Explanation Clause used as a punchline in an unrelated context ("i refuse to explain why i ate the leftovers. the No Explanation Clause applies").
- The full rebrand timeline posted with no commentary, and the Migrated replying "you forgot one."
- Someone discovering "Meta Announces Meta" for the first time at age 400.
- Couching a ghost mentioned as casually as cat-sitting.
- Couch-a-Ghost Day content, either sincerely touching or mocking the brand-campaign version, with no middle ground.
- "haunted by the fact that someone in 2244 looked at LegsGate and said 'this is a serious company'"

**Reply shapes** (from `replies-prompt.txt`):
- (a) A Migrated survivor: "I was there in '71, it was worse than you think / better than you think / I don't want to talk about it."
- (b) A rebrand dunk when anything gets rebranded ("are you trying to pull a Meta").
- (c) A sub-incident reference.
- (d) A Thrrm that cites a form and goes silent when the waiver comes up.
- (e) @dril's 2271-11-15 post quoted as prophecy. The screenshot-with-no-commentary version gets 340K likes.
- (f) "Couch a ghost" redeployed in a modern context.

**Community notes.** The canonical note under an unrelated rebrand announcement ends "The poster's tweet is satire. The precedent is real."

**Anniversary posts** from the Vrellnath (re-reading the etymology report) and the Glœm (performing the threnody) are quoted in full on the article.

## Implementation

- **Summon tag:** `meta` (9 formats), via `?summon=meta`. All are in `data/meme-formats.json`:
  - Migrated anniversary post (weight 1)
  - Rebrand dunk invoking the Meta precedent (1)
  - Sub-incident grudge (tags `thrrm`, `meta`; 1)
  - Couch-a-Ghost Day (1)
  - No Explanation Clause as punchline (1)
  - Full rebrand timeline, "you forgot one" (1)
  - Discovering "Meta Announces Meta" (1)
  - Casual "couching a ghost" (1)
  - Meat screenshot (tags `meta`, `meat`; 0.15). See [Talk:Meat Incident](Meat_Incident.md).
- **Pool share:** the `meta` formats carry about 8.15 of the pool's ~284.35 total weight, so **~2.9% of format draws**. That is on top of the system prompt's instruction to work ambient Meta references into ~2% of tweets.
- **Reply archetypes** (`data/reply-archetypes.json`, plain strings with no tags): the Migrated one-liner that recontextualizes the thread; the rebrand-cycle dunk; the Thrrm reply that cuts off at "THE BUREAU DOES NOT DISCUSS THE 2271 WAIVER"; and the @dril 2271-11-15 screenshot quote-reply. Two more are Meat-specific (see [Talk:Meat Incident](Meat_Incident.md)). The "Upload/Meta stan" who mocks convenient redactions belongs to [Censored Whistleblowers](../Censored_Whistleblowers.md).
- **System prompt:** `data/system-prompt.txt` lines 41–51 carry the full crisis block (facts, rebrand list, sub-incidents including the Meat, the Upload guardrail, the @dril post, the tone rule, and the frequency). Line ~77 has the Meta whistleblower handles (`@migrated_7104`, `@whatsapp_founder_line_3`, `@ex_zuckload_ops`; bio "not a Purgecoder but I worked down the hall"). Line ~165 has the Terran Solar Court, including the *In re Meta* quote and "respectfully, lol."
- **Replies prompt:** `data/replies-prompt.txt` line ~125 carries the callback block with the (a)–(f) shapes and the 5% target.
- **Incite:** none. There is no Meta key in `INCITE_MAP` (`server.js`). A `meta` incite (forcing a Migrated reply plus a Thrrm waiver cut-off) would be an easy add.

## Unused material

From the bible's "Comedy angles not yet deployed," with current status:
- **The 340-year class action on behalf of the wiped MetaUploads**, which established the legal personhood of uploads and was funded entirely by schadenfreude. Not deployed. The bible calls this *In re Meta*, which collides with the No Explanation Clause ruling (see Discrepancies), so it needs a different case name before use.
- **The one surviving Meta board member**, uploaded, migrated, and still around in 3017. She posts about twice a year, and every post gets 4M likes because people are *waiting*. She has never mentioned the collapse. She has mentioned her cat. Not deployed.
- **The Zuckload Revival cults** of the 24th century, who believed the Zuckload could be reconstructed from the comments section of an archived 2030s Instagram post. *Partly deployed*: the system prompt mentions "The Zuckload Revival cults of the 2300s" as a bare fragment. The article includes them.
- **Couch-a-Ghost Day**, a civic holiday in seven systems, symbolic, touching because the Migrated find it touching. *Deployed* as a meme format, and the article includes it.
- **"Are you trying to pull a Meta"** as the eternal reply to any rebrand proposal. *Deployed* as a reply archetype.

Other lines not in `data/`:
- The futurist who proposed "The Mark Continuum" and was never heard from again.
- The Soul Migration Backlog intern, retrieved from a farm at 71, who didn't remember writing it. Pairs with the principal investigator's "I am on a farm now."
- The Collapse itself removing everyone's legs again for 90 minutes.
- "For several hours the entire population of MetaUploads was a single very confused person."
- The Glœm color for the feeling of parsing "facebook."

## Discrepancies

- **Zuckload vs. Upload chronology.** The bible's Zuckload section says The Upload was "uploaded ~2026, running ~1000 years by 3026 standards," and that the Upload "has implied he and the Zuckload knew each other... chronologically plausible — the Zuckload would have been a ~20-year-old upload sharing infrastructure with a ~200-year-old Upload at around the time Mars went sideways." None of this computes:
  - The present is 3017, not 3026.
  - `platform-history-bible.md` has The Upload still a meat human when Twitter died in 2035, so he can't have been uploaded ~2026.
  - Mars "went sideways" in 2049, when neither entity could have been ~200 years old. A mid-21st-century Zuckload and a post-2035 Upload are near-contemporaries.
  - The bible's framing of the Zuckload as "a baby next to entities like The Upload" (in 2271) fails for the same reason.

  The system and replies prompts only assert the safe part: the Zuckload was ~210 years old at the collapse and is not a thousand-year-old entity. The article states that the two are distinct, reports The Upload's claims, and makes no age comparison.
- **The collapse date and the two "two days before" claims.** The press release is dated **2271-11-14** and was "two days before" the collapse, which puts the collapse on ~11-16. @dril's post is dated **2271-11-15** and is *also* described as "two days before the collapse" (bible and `system-prompt.txt` line 48), which puts it on ~11-17. Both can't hold. The article keeps both artifact dates, calls @dril's post "the day after the press release and shortly before the Collapse," and never states a collapse date. One fix would be to redate @dril to 11-14 (the same morning), or to say "the day before."
- **First-contact chronology.** Every alien civilization credited in the Rescue, and the Thrrm in the 2201 DDoS, is involved decades or centuries before its first contact with humanity per `docs/alien-species-bible.md`:
  - Zk'vrath war: ~2420. The 2271 "decommissioned invasion transports" predate the invasion.
  - Thrrm first contact ("The Form"): ~2500. The 2201 DDoS and the 2271 waiver both predate it.
  - Vrellnath First Acknowledgment: 2612. They were observing from "the blind" earlier, but reallocating 400M substrate nodes is not blind behavior.
  - Glœm: ~2780.
  - Keth first contact: 2934.

  This is the biggest canon conflict in this cluster. The article doesn't resolve it. It carries a diegetic "chronology is disputed" banner on The Rescue and the Thrrm DDoS sections. Resolution options: move the crisis later (it's dated 2271 in every `data/` file, so that's expensive), move the first contacts earlier, or make "pre-contact covert participation" canon.
- **Rebrand list order vs. dates.**
  - The bible's list puts "The Platform (humility rebrand of **2198**)" after "Meat (**2247**)."
  - It puts "METAVERSE (all caps era, coincided with the avatar-legs crisis)" after Meat, but the last legs incident before the collapse is LegsGate (2244), which predates the Meat.
  - "Approximately every 40 years" doesn't fit 18 listed names between the pre-spaceflight era and 2271 (an average of ~15 years), nor the Meat Incident's "eleventh rebrand back to Meta."

  The article presents the list as "partial, reconstructed, archival order not reliable" and softens METAVERSE to "associated in popular memory with the avatar-legs crises." The system prompt's shorter list (facebook → Meta → Meta Horizons → Zucktropolis → Face.meta → Meta² → METAVERSE → [many more] → Meta) is compatible.
- **The 140 million Migrated.** The bible says ~140M MetaUploads "were successfully migrated before substrate failure." The system prompt says "~140M of them still exist," which reads as a present-day survivor count. The relationship between the 140M, the 1.2B displaced, and the 1.1B rehomed is also unclear: the bible's opening treats the 1.2B as "additional" to the MetaUploads. The article uses the bible's reading.
- ***In re Meta* double-booked.** In the main bible, *In re Meta* is the inquiry ruling that contains the No Explanation Clause (also in `system-prompt.txt` line ~165). In the bible's unused angles, *In re Meta* is instead a 340-year class action that established upload personhood. The Zuckload already had "a Person (Asterisk)" standing before 2271, which muddies the personhood claim further. The article uses only the first meaning.
- **CLAUDE.md format counts.** CLAUDE.md's TODO entry says "Five Meta-themed entries added to meme-formats.json; four to reply-archetypes.json." There are 9 `meta`-tagged formats (the summon table in CLAUDE.md correctly says 9). The four Meta reply archetypes are accurate, plus two Meat ones.
- **"750 years" / "770 years."** Both are correct for 3017 (746 and 770). Don't carry over any 3026-era arithmetic.

## Open questions

- The collapse date: pick one and fix whichever of the press release date and the @dril date disagrees.
- Resolution of the first-contact conflict (see above).
- Whether the MetaUploads population ever gets a named successor community or institution beyond "the Migrated."
- Whether the original platform of 2271 (the "early ancestor of the current platform" whose users couched ghosts) is the Hellsite under an earlier operator. The bible is vague. See [Talk:The Hellsite](The_Hellsite.md).
