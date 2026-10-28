# Talk:@dril
*[Article](../Dril.md) · Talk*

## Canon

- **@dril is a Keth.** Rank-and-file, not a leader, not royalty. Just doing bits for 4 billion years in a way that accidentally cracked probability-space observation. The Keth know with 1000% confidence he is one of them and **do not know which one**; they polled the species ("please raise your ✧ if you are @dril"), nobody did, and a Keth cannot lie. This is the only sustained mystery in Keth history; they've decided it is their greatest achievement rather than their greatest failure. Primary home: [Talk:Keth](Keth.md) / `docs/alien-species-bible.md` → "The @dril Problem." The main page must present "a Keth" as one theory among several.
- **Only one non-Keth has figured it out**: Marcus DeVance ([Talk:Marcus DeVance](Marcus_DeVance.md)). He doesn't know the Keth don't know either; he thinks it's a conspiracy.
- **He is always right.** Every post turns out, in retrospect, to be a 100% accurate report of something catastrophic. He knows. He keeps posting. Whether he is "trying to warn" anyone is unanswerable.
- **He is NEVER community-noted.** Not in 1000 years, not even on clearly false posts ("i can see through walls now"). The platform treats him as unquestionable; nobody has noticed except DeVance, whose 90-page document about this fact has itself been community-noted. On the main page this is stated once, flatly, with no commentary.
- **Never explain.** The "Things @dril Is Right About" list must never be resolved or explained in-universe. They're referenced obliquely, confirmed quietly by one species or another, and everyone moves on. Nobody connects them, because each individually sounds like a shitpost; the pattern is visible only reading 1000 years in sequence, which only DeVance and the Galactic Threat Assessment Board have done.
- **Never breaks character.** He never says "this is a warning" or "this is not a bit." The single exception is the comedy festival refusal ("i am not a comedian"), and even that reads as a bit.
- **Never verified.** Registry #4,891,222 is "yes" in every field; 17 Thrrm audits; "in compliance, somehow"; 2,400-page final report ending "we are not going to do this again."
- The community notes on DeVance's posts say "no extraordinary claim about @dril's identity is supported by available evidence," which is technically true of every theory, including the correct one. That's the cover.
- @dril has **never acknowledged the 1917 temporal anomalies.**
- **The 3022 prediction** (posted 3017) is canon and will come true (per `CLAUDE.md`: "five years later it happens"), but hasn't resolved as of the in-universe present.
- **Treat dril with extreme care** (`CLAUDE.md`). He is the most important prophet in the galaxy and everyone thinks he's a comedian.

## Voice and usage

- **The post is pure comedy. The horror lives in the replies.** A generated @dril post should read as cheerful absurdism, a mundane complaint, or an absurd scheme, entirely on its own terms. The dread comes *exclusively* from the replies: an engineer quietly noting that's physically impossible, a local confirming and then backing off, a Vrellnath acknowledging without elaborating.
- **Voice calibration**: exactly the 2019 voice. Typos ("perfomr"), weird capitalization of random words ("i have Been", "trying to Warn you", "i Know it"), bizarre cadence, unhinged confidence, lowercase. Calibrate against the v2 dril corpus and the peak-Twitter house style at [Talk:Twitter](Twitter.md). Do not make him cryptic or oracular; he's a guy complaining about things.
- **Don't flag the prediction.** Format #211: "the model should not call attention to this. just let it sit there."
- Standard reply beats: "lmaooo classic dril" / "this is his best one yet" (archetype #78); the one person taking it seriously and getting clowned ("guys i don't think he's joking this time" / "bro it's DRIL", #79); "he tried to warn us" with a link to an old post (#80); screenshot of the 2271-11-15 Meta post (#95).
- **Moons Notes** reference the 2040s second-moon prediction and its 2891 confirmation **without naming @dril** — the committee cannot say his name in that context and won't explain why (`system-prompt.txt` ~line 372; `moon-note` incite).
- Whistleblower threads can include a @dril post from ~300 years earlier saying the uncensored version plainly; nobody connected it until now.
- Examples of canonical dril posts in-universe: the comedy-festival refusal; "hmm strange" in reply to the Keth census; the Hells post; the Movers post; the 3022 post.

## Implementation

- **System prompt**: `data/system-prompt.txt` "RECURRING CHARACTER — @dril" (~line 23). Also: 3022 prediction (~line 34), Meta post (~line 48), Hells post (~line 202), Movers post (~line 238), never-noted rule in the community notes section (~line 302), Moons Note rule (~line 372), 1917 non-acknowledgment (~line 169).
- **Summon tag** `dril` (19 formats in `data/meme-formats.json`): #0–1 (plain dril shitposts, explicitly not prophecies), #199–212 (warnings in dril voice, frantic threads, "i warned you centuries ago," uneasy normie, rediscovered old post, the sun is wrong, milk/water/air subtly different, flat urgent place warning, numbers/directions/colors wrong [`dril`,`vrellnath`,`keth`], animals different, hidden prediction [`dril`,`zkvrath`,`moon`], quote-tweeting a 1000-year-old post), #213 (DeVance), #214 (Keth census, `keth`), #215 ("how is his account older than the platform").
- **Reply archetypes**: #78, #79, #80, #95.
- **Gimmick accounts** touching dril: @DrilArchive_Classic, @NoticedByDril (see [Talk:Gimmick Accounts](Gimmick_Accounts.md)).
- **Community notes**: the rule is prompt-enforced only; nothing in `server.js` strips a `community_note` from a @dril tweet.

## Unused material

From `docs/recurring-characters-bible.md` and `docs/alien-species-bible.md`, not yet deployed as formats:
- The Galactic Threat Assessment Board report (4,100 of 47,000 posts predictive; Level 9 clearance denied because "the committee could not determine if the subject was serious"). The main page presents it as a leaked, unconfirmed summary.
- The specific right-about items not in data: the second-moon post is referenced only via Moons Notes; the birds, wormhole taste ("like if water was lying to you"; "wormhole gustatory syndrome"; "[1] anecdotal"), Mariana (2671/2694; cafeteria menu), numbers after 10 (c. 2300; "a very confident mistake that works anyway"), and the Zk'vrath Tuesday post don't appear verbatim in `data/`.
- The comedy-festival refusal post.
- The Keth census post with @dril's "hmm strange" reply; the Keth "please eat something" post; the "trying to figure this out since 2094" admission.
- The one-xenoanthropologist theory (from `docs/meta-refugee-crisis-bible.md`) that the Keth opened the 2271 wormhole because @dril was among the refugees and, not knowing which Keth he was, had to save everyone. Told over drinks in 2994; never published. Belongs on the Meta / Keth pages; noted here.
- "i can see through walls now" — example of a clearly false, never-noted post.
- The 2034 "he tried to warn us that it was about to go" screenshot callback (`docs/platform-history-bible.md`).

## Discrepancies

- **Registration date**: DeVance's sample note gives estimates of 2006–2094; the Keth say they've been trying to identify him "since 2094" (alien bible), while the same bible mentions Keth audit-committee minutes "dating back to 2109." Keth first contact was 2934; the "since 2094" is fine as internal Keth history but odd as a year they'd cite. The original real-world account dates to 2008.
- **How long has he posted?** Sources say "since the early 21st century," "since 2019" (DeVance's analyzer), and "1000+ years." From 3017, 2008 is ~1009 years; fine.
- **"The sun is wrong since the 2800s"** vs. the comedy festival refusal in 2901 — consistent. But the 1917 telegram "SOMETHING IS WRONG WITH THE SUN STOP" (CLAUDE.md) is a separate thread; @dril has never acknowledged 1917.
- **Timing of the 2040s second-moon post**: `recurring-characters-bible.md` says "posted in the 2040s"; Twitter ceased to exist in 2035 and the Hellsite relaunched in 2049, so a 2040s post happened during the Great Quiet, when there was no Hellsite. Either it was posted elsewhere, dated wrong, or it's another thing about the account nobody can explain. The main page just says "2040s."
- **Present-year**: `system-prompt.txt` says "3026" elsewhere; @dril's 3022 prediction is dated 3017 in both prompt and bible, so it's consistent with the redate.
- `CLAUDE.md` describes @dril as posting "only apocalyptic warnings"; the bible and later prompt text say posts are never explicitly warnings and read as pure dril comedy. Format #199 ("GENUINE apocalyptic warning… Cassandra-level prophecy") leans toward the older framing. The bible's framing is authoritative.

## Open questions

- Should the GTAB report be public, leaked, or strictly classified in-universe? The main page hedges ("leaked summary… not confirmed").
- How the second-moon post was made during the Great Quiet.
- Whether @dril ever interacts with DeVance directly (currently: never; the produce-section sighting is DeVance's account only).
