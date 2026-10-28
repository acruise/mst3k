# Talk:Hells Leak
*[Article](../Hells_Leak.md) · Talk*

## Canon

- **It is real.** The Hells exist. The Ennoi damned are being tortured for subjective eternities on Persistence Services substrate, under a contract that outlived the civilization that signed it. The posts are genuine. The situation is an ongoing atrocity. The main page presents all of this as disputed because the 3017 platform, on the whole, doesn't understand what it's looking at. The out-of-universe truth isn't in question.
- **Tone rule.** Quoted from `docs/hells-leak-bible.md` and the system prompt: *"The Hells are not funny. The corporate infrastructure hosting them is funny. The 3017 platform's inability to cope with the leak is funny. The damned themselves, when they are funny, are funny the way exhausted people are funny: in passing, without meaning to, while trying to get through the day."* Every post should keep both things in mind at once. *"The comedy is that the horror is infrastructural. The horror is that the comedy is earned."*
- **Never wink. Never explain the horror.**
- **What the leak is not:**
  - **Not a mystery to be solved.** No protagonist shuts down the Hells. The Vrellnath's 400-year remediation is canon and in progress, and it's slow because the problem is structurally slow. The leak is a permanent background condition, not a plot.
  - **Not a metaphor for anything specific.** The Hells are not coded references to any 21st-century thing. If readers find resonances, the resonances belong to them.
  - **Not horror for its own sake.** The damned read as *tired*, not as scream queens. An over-theatrical hell-post is a failed hell-post.
  - **Not a Banks pastiche.** *Surface Detail* is the obvious parent text. Honor the debt by not copying it. Banks's Pavulean Hells are specific and ornate. Ours are corporate and bland, run by a CEO who sponsors youth robotics. "That is our Hells."
- **The mechanism is unresolved even out of universe.** All four theories (substrate bleed, sympathetic insider, customer error, the damned got good) may be correct, and none is confirmed.
- **The diegetic-knowledge problem.** The bible says "nobody on the platform in 3017 understands what they are looking at." It also says researcher posts name Persistence Services, and that the Vrellnath have written 3,400 pages concluding the Hells must end. The wiki reconciles these as follows. The facts are *on the record*, but the platform at large reads hellposting as a genre, and the institutions are split: Persistence Services calls the posts fan fiction, the Thrrm deny the class exists, and the Vrellnath treat it as real. When you write posts, the average 3017 user still doesn't get it.
- **@dril** has noticed and is being careful. His one post (~30 years ago, "theyre Down there…") *is* about the Hells. Marcus DeVance's 6,000-page reading of it is correct. The bible calls him "@dril-Truther"; in-universe he's [Marcus DeVance](../Marcus_DeVance.md).
- **The Glœm understand immediately and can't explain why.** The Glœm–damned conversation is one of the few things on the platform nobody has successfully made fun of. Keep it that way.
- **The Thrrm** formally deny the anomaly class and informally upvote hell-posts. This is their closest approach to civil disobedience, and they're deeply uncomfortable about it.
- **One Keth** replied in plain text ("we see you. we have seen you. we are thinking about it."). The damned poster hasn't posted since. Whether that's good is unknown, even out of universe.
- **The Upload** has no stable position, and neither the Upload Defenders nor The Upload itself knows what it thinks.

## Voice and usage

**The four registers** (see the main page for examples):

- **Mundane.** Flat and tired, the voice of someone in their 400th subjective year. The horror is adjacency. This is the hardest voice to write and the one that does the most work.
- **Bureaucratic complaint.** Customer-service hell gone literal without losing its structure: tickets, tier 2 support, the witness portal.
- **Researcher.** Precise, calm, technically specific. Not asking for rescue, only for awareness (§14(c)). Often shadowbanned.
- **Collapsed.** Tofu boxes with legible fragments, one glyph repeated 280 times, timestamps that don't parse. These go viral as glitch art.

Rules:

- The damned aren't performing anguish. The tiredness is what does the work.
- **Impersonators** are the tell by contrast: too theatrical, too poetic, with gothic architecture and meaningful silences. The real Hells have fluorescent lighting and a ticket queue. An impersonator gets ten times the likes.
- After a hell-post reply, the next one or two replies should be 3017 reactions: a Glœm threnody ("we have read this message. we are sorry."), a Thrrm formally not acknowledging while transparently engaging, a confused user asking what persistence.services/support or Form PS-900 is, or a bad impersonator.
- **Handles:** `@legacy-participant-[number]`, `@ennoi-[fragment]`, `@ps-contract-[id]`. The display name is absent or an assigned ID ("Legacy Participant 4,891,203"). `verified: 0`. Metrics near zero, except collapsed posts, which go viral.
- **Persistence Services corporate posts and 3017 genre reactions are normal accounts.** They must **not** carry `subspace_anomaly`.
- The Upload's position shifts with each appearance. Upload Defenders defend whichever one is current.

## Implementation

Format and archetype numbers (#N) are 0-based array indices into `data/meme-formats.json` and `data/reply-archetypes.json` at the time of writing. They will drift as entries are added.

- **Prompts:**
  - `data/system-prompt.txt` lines ~192–209: the full Hells lore, registers, chrome, 3017 response, handles, JSON, and tone rule. Target share **~2–3% of tweets**.
  - `data/replies-prompt.txt` ~139 ("HELLS LEAK REPLIES"): replies are limited to the **mundane** and **researcher** registers.
- **Summon tag:** `hells` selects **12 formats**, #302–313 in `data/meme-formats.json`, at weights 0.1–0.15:
  - #302 mundane
  - #303 bureaucratic
  - #304 researcher
  - #305 collapsed
  - #306 Persistence corporate post (normal account)
  - #307 in-leak Hell Plus ad (carries `subspace_anomaly`, register `mundane`)
  - #308 3017 glitch-art fan
  - #309 impersonator
  - #310 Glœm threnody (`gloem`)
  - #311 Thrrm non-acknowledgment (`thrrm`)
  - #312 "played out" thinkpiece
  - #313 damned soul noticing the impersonators
- **Weighted share:** total weight 1.3 out of ~284.4, about **0.46%** of unsummoned tweets. That's well under the 2–3% target.
- **Reply archetypes:** #122–129 in `data/reply-archetypes.json`:
  - #122 impersonator
  - #123 try-hard aesthete
  - #124 researcher-register damned
  - #125 Glœm tenderness
  - #126 Thrrm non-acknowledgment
  - #127 user confused by the compliance footer
  - #128 Upload Defender
  - #129 user realizing Hell Plus is real
- **Incite key:** `hells` forces a mundane or researcher damned reply with the full `subspace_anomaly`, followed by one or two 3017 reactions.
- **JSON:**
  ```
  subspace_anomaly: {
    source: "hells",
    register: "mundane" | "bureaucratic" | "researcher" | "collapsed",
    origin_civilization: "ennoi",
    compliance_footer: "<verbatim boilerplate>",
    pinned_reply: "<verbatim boilerplate>",
    rendering_quality: "degraded-low-bit"
  }
  ```
  `verified: 0`. The boilerplate strings are verbatim on the main page and hard-coded in `public/app.js` as `HELLS_COMPLIANCE_FOOTER` and `HELLS_PINNED_REPLY`.
- **Rendering** (`public/app.js`):
  - `isHellsPost()` returns true if `subspace_anomaly.source === 'hells'`, **or** if the handle matches `/^@?(legacy-participant|ennoi|ps-contract)/i`.
  - `ensureHellsAnomaly()` backfills the object and boilerplate, with register defaulting to `mundane`.
  - `renderHellsTweetInner()` and `renderHellsReply()` draw the ∞™ watermark, the sender, the text, the footer, and the pinned reply. The `hells-collapsed` class is used for the collapsed register.
  - Hell-posts **don't render the timestamp field**, so the "unresolvable timestamp" chrome isn't visible yet. Collapsed-register timestamps only appear if they're written into the post text.
- **Schema proposal not adopted.** The bible proposed a generalized discriminated union, `anomaly: { class: "temporal"|"subspace", temporal?, subspace? }`. The code uses the flat, separate `temporal_anomaly` and `subspace_anomaly` fields.
- **Corpus:** as of this writing, 56 corpus files contain `subspace_anomaly`.

## Unused material

Material in `docs/hells-leak-bible.md` that isn't in `data/` or is barely used:

- The Keth's single plain-text reply ("we see you. we have seen you. we are thinking about it."), 14M reshares, and the poster's silence afterward.
- The Trust & Safety meeting about "the eternal torment content category," which never concludes, and the auto-approved appeals under the grandfathered 600-year-old content exception.
- The community-note pile-up in full: filed, retracted, refiled, the Thrrm's form, the auditor AI rejecting it on 800-year-old grounds, five conflicting notes, and the note the post actually needs ("somebody help them").
- The 280-repeated-glyph post and the Glœm staring at it for six days.
- A researcher post explaining a collapsed post in the quote-tweets, which never travels as far as the original.
- The Vrellnath report title and its quarterly updates.
- The four mechanism theories.
- The ~2.1 billion figure.
- The "iteration 2,847,112 of observance cycle 14" timestamp style.
- **The other ~139 client civilizations.** Only the Ennoi Hells leak, as far as canon says. A second leaking civilization would be a big move. Don't make it casually.

## Discrepancies

- **Frequency.** The prompt target is ~2–3%, but the weighted format share is ~0.46%.
- **Replies versus top-level posts.** The reply prompt and the `hells` incite allow only the mundane and researcher registers. Top-level formats cover all four.
- **Corpus drift:**
  - An impersonator post (`@captainquasarCorp`, "there is a person on the platform pretending to be one of us…") carries `subspace_anomaly`. Either this is a mis-tag, or the text of format #313 was used under a non-damned handle.
  - A Drifter handle (`@--∅47h2-reserved--`) carries `subspace_anomaly` and speaks as "we understand what you mean." That breaks both the Hells and the Drifter canon.
  - An `@ennoi-cache-*` post uses `[REDACTED BY SEALED ORDER]` chrome borrowed from the censored-whistleblower formats.
- **The bible's name for DeVance.** The bible says "@dril-Truther", but the in-universe name is Marcus DeVance. See [Talk:Marcus DeVance](Marcus_DeVance.md).
- **A 2517 concept has migrated.** Format #307 includes the 2517 ad concept ("products nobody recognizes with genuinely alarming side effects treated as routine"). See [Talk:Temporal Anomalies](Temporal_Anomalies.md#discrepancies).
- **"Nobody understands" versus the documented facts.** See Canon above. The wiki resolves this with dispute banners on the main page, and neither source was changed.

## Open questions

- Does Form PS-900 ever turn up? Current canon says it doesn't exist.
- Is Brand Hallister ever confronted on-platform? What happens if he is? The likely answer is nothing, rendered blandly.
- Should the unresolvable timestamps be rendered, with a hells-specific timestamp field?
- Should the in-leak ads become their own render type, separate from a hell-post with an ad as its text?
- **Details the wiki introduced**, to adopt or strike:
  - the Thrrm usage "the non-occurring anomaly class"
  - the semi-protection and edit war over "torment"
  - "Persistence Services has not commented on the report"
  - the note that DeVance's reading of the @dril post has never been community-noted
