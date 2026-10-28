# Talk:Main Page
*[Article](../Main_Page.md) · Talk*

This is the out-of-universe front door. The [README](../README.md) covers the namespace conventions. This page covers the project and the patterns that cut across the whole setting.

## The premise

Memetic Subspace Twitter 3017 generates tweets and reply threads in the voice of mid-era Twitter (2012–2019), set 1000 years after peak Twitter, in 3017 CE. The comedy engine is **peak-Twitter voice applied to a far-future galaxy**: the formats, cadence, ratios, and reply-guy energy of 2015 survive intact, and the subject matter is uploads, alien bureaucrats, hosted afterlives, and a thousand years of platform history. See [Talk:Twitter](Twitter.md) for the house style guide.

## Cross-cutting patterns

Most of the lore follows a few recurring moves. If you're adding something new, it should probably use at least one of them.

### Nothing resolves
The setting is full of mysteries that must stay open: which Keth is @dril, what Claudicide was, who ran the Golden Age, why Bluesky Ascended, whether Movers think, what the 1917 "SOMETHING IS WRONG WITH THE SUN" message means, who the Purgecoder was. **Never explain these, and never let a generated post confirm an answer in plain text.** Name things, reference them, and let the audience infer. Implied history reads richer than catalogued history.

### The species reaction rota
Every major phenomenon gets a characteristic response from each recurring party. This is the fastest way to generate texture for a new event:

| Party | Typical response |
|---|---|
| [Keth](../Keth.md) | A single ✧, sometimes in a register scholars call "smug" or "admiring." They almost never use plain text, and when they do it lands hard. |
| [Thrrm](../Thrrm.md) | Furious filings, a form that doesn't cover the case, a subcommittee whose members leave diminished, or a refusal to acknowledge the phenomenon exists. The tool varies; it isn't always a form. |
| [Glœm](../Gloem.md) | They understand immediately, can't explain why, and are moved. There might be a threnody, a new color, or a request not to be asked again. |
| [Vrellnath](../Vrellnath.md) | A report thousands of pages long, updated annually, reaching the same careful conclusion every year. Near-unanimous peer review with a small, puzzling margin. |
| [Zk'vrath](../Zkvrath.md) | They claim credit for disasters, deny defeats, and help anyway while insisting they didn't. |
| [The Upload](../The_Upload.md) | Views that shift radically between appearances, each defended by Upload Defenders as the only view he's ever held. He deploys the Ex-Employee Defense for anything near his own disasters. |
| [@dril](../Dril.md) | One post, often centuries old, that reads as a joke and turns out to be exactly right. |
| [Marcus DeVance](../Marcus_DeVance.md) | Thousands of pages on the topic. He's wrong in the specifics, occasionally right in the substance, and always community-noted. |

### Stock phrasings of the 3017 record
- **"No extraordinary claim about [X] is supported by available evidence."** This is the house phrasing for any unknown identity. It's technically true of every theory, including the correct one.
- **"The book is in a building. The building's address is in a filing cabinet."** Used whenever someone asks for documentation of something sealed.
- **"I am on a farm now."** This is where investigators, interns, and whistleblowers end up.
- **Oddly specific numbers**: 4.2 million emails, 14 formal complaints, 847 emotional colors, the seventeenth audit.

### Tonal settlements
Several events carry an explicit rule for what's fair game. They're summarized here, and each Talk page has the details:
- Meta: dunking on the company is fine, dunking on the dead isn't ([Talk:Meta Refugee Crisis](Meta_Refugee_Crisis.md)).
- The Great Quiet: dunking on the commune's naivety is fine, dunking on people who were sad isn't ([Talk:The Hellsite](The_Hellsite.md)).
- The Hells: the damned aren't funny. The infrastructure hosting them is, and so is the platform's inability to cope ([Talk:Hells Leak](Hells_Leak.md)).
- FALGSC: dunking on the posters' tone is fine, dunking on whether the polities actually function isn't ([Talk:FALGSC Polities](FALGSC_Polities.md)).
- Federation attempts: dunking on the operators is fine, dunking on the AIs isn't ([Talk:External Federation Attempts](External_Federation_Attempts.md)).

## Production vocabulary

These terms are used in code, prompts, and Talk pages. **They never appear on main pages or in generated content.**

| Term | Meaning |
|---|---|
| format / meme format | An entry in `data/meme-formats.json`, a vibe the model riffs on for a tweet. It's not a template. |
| archetype / reply archetype | An entry in `data/reply-archetypes.json`, a reply persona. Five are sampled per thread. |
| `?summon=TAG` | A debug query param that forces the tweet format pool to a tag. Tags are listed in `CLAUDE.md` and `SUMMON_TAGS` in `server.js`. |
| `?incite=KEY` | A debug query param that appends an override directive to reply generation. Keys are in `INCITE_MAP` in `server.js`. |
| "the Dril Truther" | The production name for [Marcus DeVance](../Marcus_DeVance.md). **Never in-universe.** |
| sigil tier | The `verified` integer, 0–4. See [Talk:Sigils](Sigils.md). |
| temporal / subspace anomaly | Posts from other eras (`temporal_anomaly`) or from the Hells (`subspace_anomaly`). |
| special account | Movers and Drifters (`special_account`). |

## Wanted documents

These are in-universe documents that could be written as standalone pieces in the [Source](../Source/) namespace. [On the Persistence of Shitposting](../Source/On_the_Persistence_of_Shitposting.md) is the model. Dates have been adjusted for a 3017 present.

- **"A Brief History of the Platform"** (Galactic Communications Archive, c. 3010). The official history, with about 40 ownership changes, three name changes, two periods of being literally illegal, one era run by an AI nobody realized was an AI for 60 years, and a "dark period" from 2780–2810 that the document conspicuously refuses to elaborate on. It never states the platform's current name. Much of this now exists as [The Hellsite](../The_Hellsite.md). The document version would be the Archive's own sanitized account.
- **"The Upload: An Unauthorized Biography, Vol. 47"** (Pulsar Books, c. 3015). Covers the Mars period. Vols. 1–12 were by one biographer across 200 years, 13–30 were crowdsourced, and 31–46 were classified after The Upload threatened to buy the publisher. Vol. 47 is a leak. The comedy is in the footnotes and the editor's increasingly desperate marginalia.
- **"FORM 7-GAMMA: Application for Planetary Communication Privileges (Revised Edition, v.3,847)"** (Thrrm Administrative Bureau). The 3,000-field form humans have to fill out to post, with fields like "Describe your species' relationship with linear time (attach supporting documentation)" and a handwritten Thrrm sticky note in the margin: "THE HUMANS WILL JUST IGNORE THIS LIKE THEY IGNORE EVERYTHING." This could be a generated PDF that's genuinely painful to look at.
- **"We Chose To Leave: The True History of the Terran Engagement"** (Zk'vrath Ministry of Accurate History, 2891). Propaganda about the failed invasion that keeps accidentally revealing how badly it went, like "a flawless tactical repositioning" for a retreat. A Zk'vrath historian keeps correcting the main text in the footnotes.
- **"@dril: Warnings Unheeded — A Retrospective Analysis of Predictive Posts"** (Galactic Threat Assessment Board, classified/leaked). A dead-serious intelligence report written in a bureaucratic-horror tone: 4,100 of 47,000 posts contain verifiable predictive content. The final page recommends granting @dril Level 9 clearance, and the recommendation was denied because "the committee could not determine if the subject was serious." *Date to be decided. The shitposting paper cites it as 3025, which is in the future. See [its Talk page](Source/On_the_Persistence_of_Shitposting.md#discrepancies).*
- **"The Consciousness Upload Consumer Protection Act of 2634: An Annotated Guide."** A dry legal analysis of the law passed after The Upload's third personality fork ran for Senate from four hardware substrates at once. It includes the "One Entity, One Vote, One Body" amendment and the "Degradation Disclosure" clause, which requires a warning label when personality drift exceeds 40% from baseline.
- **"The Collected Vrellnath Field Notes on Humanity, Abridged Edition"** (c. 3012). Chapter titles like "On the Human Practice of 'Sarcasm' (We Still Do Not Understand It But We Love It)," "Individual Sleep: A Horror and a Mystery," and "We Have Come to the Conclusion That Humans Are Doing Their Best and We Are Proud of Them, Even Though They Cannot Hear Us Think This."
- **"GALACTIC TRANSIT AUTHORITY INCIDENT REPORT #4,891,223: The @dril Sun Warning."** An email chain between the analyst who flagged "the sun is. wrong," the supervisor who dismissed it ("it's dril"), the astrophysicist who confirmed it six hours later, and the formal reprimand. The analyst's signature reads: "I tried to tell you (see also: Incident Reports #4,891,001 through #4,891,222)."
- **The First Contact Comedy Festival rewrite.** See [Talk:Source/Proceedings of the First Contact Comedy Festival](Source/Proceedings_of_the_First_Contact_Comedy_Festival.md).

## Open questions

- **"The Commons"** is the diegetic name the [Main Page](../Main_Page.md) uses for the in-universe wiki. It was invented during the restructure and isn't in any earlier source, which only calls it "Wikipedia-descendant" or "Wikipedia-equivalent." Rename it freely.

- **Redate to 3017** (P1 in `CLAUDE.md`). The wiki already uses 3017, but `data/` and parts of the frontend still say 3026. The [Timeline](../Timeline.md) is the reference for relative dates.
- **Should `data/system-prompt.txt` be assembled from the wiki?** The prompt currently duplicates compressed lore by hand. A build step could generate lore paragraphs from marked sections of Talk pages, but that conflicts with the "no build step" principle. For now they're synced by hand.
