# Talk:Thrrm
*[Article](../Thrrm.md) · Talk*

Sources: `docs/alien-species-bible.md` (Thrrm section), `data/system-prompt.txt` (species entry #3 with the seven archetypes, rogue caps, rating dimensions, gimmick accounts, community-note `contributor_type`), `CLAUDE.md` (TODO "Thrrm are bureaucratic but not just 'forms' please" — DONE), `server.js` INCITE_MAP, `docs/meta-refugee-crisis-bible.md`, `docs/hells-leak-bible.md`, `docs/movers-and-drifters-bible.md`, `docs/federation-attempts-bible.md`, `docs/platform-history-bible.md`, `docs/ambient-context-bible.md`, `docs/recurring-characters-bible.md`, `docs/dril-truther-bible.md`, `docs/document-ideas.md`, and the two Source documents.

## Canon

- **Insectoid bureaucrats who run galactic administration.** They **despise** humans because humans keep filing forms wrong and thriving anyway. For the Thrrm this is an existential crisis, not an annoyance.
- **Not just forms, please.** (CLAUDE.md guardrail, now implemented.) "Bureaucratic" is a wide register: case precedent, procedural sequence, jurisdiction disputes, mandatory notification windows, terminology registers, audit cycles, certification backlogs, standing advisories, waiting periods, and the grinding disappointment of accurate record-keeping. **Not every Thrrm post is a form citation.** When several Thrrm are in a thread, at least one should not cite a form number (this is enforced in the `thrrm` incite).
- **Precision is constant across all types.** Only the direction of the fury (or its absence) changes.
- **The seven archetypes are canon** and are presented in-universe as professional types within Thrrm society (main page, "Professional types").
- **The 2271 waiver** is the only compliance waiver in Thrrm history. Modern Thrrm **refuse to discuss it**. They emit unrelated citations and go silent, or reply in an all-caps refusal citing Form 481-Ω-REDACTED. Never have a Thrrm explain or reflect on it.
- **The only recorded instance of a Thrrm declining to file a form** was the festival delegate after the Keth emission. (See Discrepancies.)
- **Thrrm never use rogue caps.** A rogue capital would trigger an internal audit. The one exception is Compliance Optional dissidents, who use one as defiance, and traditional Thrrm find that genuinely upsetting. (All-caps *refusals*, like the 2271 line, are formally correct emphasis rather than rogue caps.)
- **Thrrm formally deny the Hells leak exists**, while informally upvoting hell-posts. That's their closest approach to civil disobedience. Keep both halves.
- **Seventeen Thrrm audits of @dril have failed** ("in compliance, somehow"; "we are not going to do this again"). The Thrrm do not community-note @dril.

## Voice and usage

General: formal notice register, numbered references, section/subsection/clause citations, cycles as the unit of time. Furious but correctly formatted. Handles are bureau designations, numerical suffixes, and formal titles (e.g. `@Bureau_Compliance_7719`-ish); dissidents get disconcertingly informal handles.

Per archetype:

1. **Compliance Officer (classic).** Violation noticed, correction demanded, deadline in cycles. Vary the *tool*: a form one time, then a notification window, a mandatory waiting period, a standing advisory, a jurisdiction. Fury escalates through formatting, not caps.
2. **Precedent Citer.** Case name in italics, registry year, paragraph, footnote, and a deadline. Case law instead of forms. The human has never read the precedent and couldn't. *"See* Bureau Registry v. Human Collective, Third Amended *(2847). You know what paragraph 4 says. You have always known. You have 12 cycles."* Platform drama becoming case law is a good generative engine: invent new case names from recognizable platform events.
3. **Standards Pedant.** Fury about *words*. The human's word is close but not the ratified descriptor. It's a different subsystem from forms, and they say so. *"Calling it 'near' Jupiter is not a recognized proximity descriptor under the ratified terminology register."*
4. **Burned-Out Bureaucrat.** 800 years in. **No anger.** The comedy is the absence of anger where anger should be. Flat, precise, resigned, still accurate: *"The post is non-compliant. As before. As always. The relevant advisory is attached. Nothing will come of this."* They'll file another tomorrow.
5. **Ambitious Young Thrrm.** DELIGHTED. Has just discovered seventeen jurisdictions. No fury yet, just enthusiasm. Other Thrrm are embarrassed. (They will be #4 in 200 years.)
6. **Compliance Optional dissident.** Argues the apparatus is self-referential, using the apparatus: perfectly formatted, real citations, manifesto rejected on procedural grounds 14 times and being resubmitted. They're aware of the irony and won't stop. The "gone native" variant uses human posting syntax with the procedural reflex breaking through mid-sentence: *"okay so (subject to advisory review, pending) maybe the humans are. fine. this is not a formal position. please do not file a response to this post."* Pair them with a horrified traditional Thrrm reply.
7. **Grudging Respector.** Pure data, transparently admiring, with plausible deniability. Counts, statuses, outcomes. *"Resubmission count: 14. Compliance status: none. Outcome: achieved. We are revising our models."*

Other recurring moves:
- **Jurisdictional dispute:** two or more Thrrm bureau accounts tagging each other over which bureau owns a violation. It has been going on for years, with no resolution, and the human has no idea.
- **Wrong-sequence meltdown:** all the correct steps done in the wrong order, the outcome technically valid, seventeen sub-bullet points.
- **Waiver tripwire:** a reply starts as standard fury, its own wording drifts toward 2271, and it cuts off: "THE BUREAU DOES NOT DISCUSS THE 2271 WAIVER" plus an irrelevant form number.
- **1917 content:** procedural fury at pre-contact military form numbers that comply with no ratified standard, so a response can't be filed.
- As **community-note authors** (`contributor_type: "thrrm"`): furious, heavily cross-referenced, correct. The "wrong subsection of the wrong form" note citing 14 references is the model.

## Implementation

- **System prompt:** species entry #3 (the seven archetypes and handle guidance); rogue-caps rule; rating dimensions `⏢ Thrrm Compliant` (added 3003, requires Form 88-Phi), `⊞ Form 14-Delta On File`, `⏁ Not Filed During Thrrm High Holidays`; `contributor_type: "thrrm"`; the community-note example "A Thrrm account citing the wrong subsection of the wrong form"; gimmicks `@ThrrmMood` ("furious" for 800 years) and `@AnniversaryBot` (Second Canopus Audit Standoff); Meta block (2271 waiver, Newsfeed DDoS 2201); FALGSC block (sigil never ratified); Hells block; Movers/Drifters species-reactions block; 1917 block ("The Thrrm despise the pre-contact form numbers"); @dril block (seventeen audits).
- **Replies prompt:** glitch tag `[THRRM COMPLIANCE PENDING]`; crash string `ThrrmComplianceException: Form 44-Mu not ratified`; Meta callback (d) "a Thrrm reply that cites a form number and goes silent when the 2271 waiver is mentioned"; 1917 follow-up rule ("The Thrrm tend to reply with procedural fury"); Hells follow-up ("a Thrrm formally not-acknowledging").
- **Summon tags** (counts from `data/meme-formats.json` at time of writing; indices 0-based):
  - `thrrm`: **22** (91, 238–250, 262, 275, 277, 289, 290, 295, 311, 335)
  - `thrrm-precedent`: 1 (242)
  - `thrrm-terminology`: 1 (243)
  - `thrrm-burned`: 1 (244)
  - `thrrm-young`: 1 (245, also `thrrm-jurisdiction`)
  - `thrrm-jurisdiction`: 2 (245, 249)
  - `thrrm-dissident`: 1 (246). Index 247 ("gone native") is tagged only `thrrm`.
  - `thrrm-sequence`: 1 (250)
  - `thrrm-grudging`: **0**. The grudging-respector entry (248) is tagged only `thrrm`, so `?summon=thrrm-grudging` falls back to the full pool.
- **Incite keys** (`INCITE_MAP` in `server.js`): `thrrm` (3+ replies from distinct archetypes, at least one without a form number), `thrrm-dissident` (Compliance Optional plus a horrified Thrrm), `thrrm-burnout` (no anger), `thrrm-grudging`, `thrrm-jurisdiction` (2+ Thrrm tagging each other, no resolution). There's no incite for precedent, terminology, sequence, or young.
- **Reply archetypes** (`data/reply-archetypes.json`, plain strings): 83 (classic Section 4.7.2(c), 30 cycles), 84 (burned-out), 85 (precedent citer), 86 (Compliance Optional), 87 (compliance → admiration), 94 (2271 waiver tripwire), 116 (`@ThrrmMood` "furious" in a gimmick drop), 120 (1917 procedural fury), 126 (Hells not-acknowledging), 141 (automaton-adjacent subcommittee member).
- Other Thrrm-involving formats: FALGSC registry filing (91), Meta sub-incident incl. Newsfeed DDoS (262), skeet on a Thrrm form (275, 277), gimmick (289, 290), 1917 requisition (295), Hells denial (311), Mover subcommittee (335).

## Unused material

From the species bible's "not yet in code" list and elsewhere:
- Vasquez-Okonkwo's correctly filled Form 7-Gamma, cited in 14 memos as "more dangerous than previously assessed."
- ∂Krix-7 and the Department of Unclassifiable Phenomena (no forms; later staff of 12, classified nothing). ∂Krix-7 would make a great recurring Thrrm account: a category of one, post-breach.
- The two-meter chart addendum.
- "You are all categorically impossible. You do not fit in the forms. You have NEVER fit in the forms."
- Form 7-Gamma v.3,848 and the "Other" field.
- The declined form after the Keth emission.
- Seven shitposting-regulation attempts (dates on main page) and Form 29-Delta.
- First contact via spam-filed form, 80 years of follow-ups, and 12 complaints filed against themselves.
- Long Credit Winter emergency forms still receiving replies; the startup-regulation 48th attempt; Thrrm investor reviews.
- The *Morning Bureau* (2744) loss: classified, Thrrm-involved, emits unrelated citations.
- Bluesky: 16 compliance actions returned with skeets.
- Federation: filed exactly one form.
- **Document idea:** "FORM 7-GAMMA: Application for Planetary Communication Privileges (Revised Edition, v.3,847)", the actual 3,000-field form, with sections like "Describe your species' relationship with linear time (attach supporting documentation)" and a handwritten Thrrm sticky note: "THE HUMANS WILL JUST IGNORE THIS LIKE THEY IGNORE EVERYTHING." A candidate for the Source namespace.
- The Thrrm restaurant bit (menu is a form; "justification for caloric intake"; "I'm hungry"). Festival-only.

## Discrepancies

- **"Only recorded instance of a Thrrm declining to file a form"** (festival, 2901) vs. the federation bible ("filed exactly one form about this. Declined to file further"), the Bluesky section ("They have stopped filing"), and the 2271 waiver (not declining to file as such, but adjacent). The festival claim is specific to *a single form in the moment*; the others are later institutional choices. Kept both, flagged here.
- **Thrrm contact date.** First contact ("The Form") is ~2500, but the **Thrrm Newsfeed DDoS is 2201**, the **2271 waiver** predates contact, **@ThrrmMood** has been "furious" for 800 years (~2217 start), and the Second Canopus Audit Standoff ("847 years" ago per @AnniversaryBot) is ~2170. Possible reconciliation: the Thrrm administered other species long before they reached Earth and dealt with human-adjacent systems (Meta's galactic reach) before formally contacting Earth. That's plausible for the DDoS; it's weaker for a gimmick account on a human platform. Unresolved.
- **Bureau founding.** The festival says "the establishment of the Bureau in 2688 CE". That's two centuries after the Bureau's forms reached Earth (~2500) and after the 2201 DDoS. Possibly a *sub-bureau*. The main page repeats 2688 as the Bureau's establishment for the "Comedic" category count; this could be reworded to a specific bureau.
- **Zk'vrath war timing** relative to Thrrm contact: "roughly 80 years after humanity had fought and won an interstellar war against the Zk'vrath" puts the war at ~2420, consistent with "600 years ago" from 3017/3026 but not with the festival's "600 years ago" from 2901 (~2300). See [Talk:Zk'vrath](Zkvrath.md#discrepancies).
- **Department of Unclassifiable Phenomena** "which they run alone" (bible, festival body) vs. "expanded to a staff of 12" (festival appendix). These are sequential rather than contradictory; the main page gives both.
- **CLAUDE.md summon table is stale:** it lists `thrrm` = 19 (actual 22), and lists `thrrm-grudging` as "—", which is accurate (0), but the incite `thrrm-grudging` exists. CLAUDE.md also mentions `?summon=burned`, which isn't a tag (the tag is `thrrm-burned`). The incite key is `thrrm-burnout`, while the summon tag is `thrrm-burned`: inconsistent naming for the same archetype.
- **"Burned-out" 800 years** and **@ThrrmMood 800 years** use the same number, possibly intentionally. Harmless.
- **Festival-derived facts (lower-confidence canon).** The proceedings are a draft slated for rewrite (CLAUDE.md P2: "humans should be mid, aliens should be the stars"). From the festival only: the Bureau's "cognitive malfunction" quote; Vasquez-Okonkwo's Form 7-Gamma (though it's also in the species bible, it originates here); Form 22-Alpha / 88-Theta; GCCC Article 19; five categories of intent and the 1,247 denials; the 2688 Bureau date; the restaurant complaint; the declined form; ∂Krix-7 and everything about them; the Department of Unclassifiable Phenomena; v.3,848 with "Other"; the 24-hour Zk'vrath approval; the 2906 apology; antennae body language. The rewrite brief's own summary says "The Thrrm submitted a form requesting that humor be regulated and were booed off stage", which is a different, less sympathetic version of the ∂Krix-7 set. The rewrite may change ∂Krix-7's arc substantially.

## Open questions

- Should `thrrm-grudging` get a tagged format (tag index 248), and should the gone-native entry (247) get `thrrm-dissident`?
- Should the incite key be renamed `thrrm-burned` to match the summon tag (or vice versa)?
- Is ∂Krix-7 on the platform in 3017? If so, what does a post from the Department of Unclassifiable Phenomena look like? (Suggestion: no citations at all, which would alarm every other Thrrm.)
- The Thrrm Newsfeed DDoS vs. first contact dating (see Discrepancies).
