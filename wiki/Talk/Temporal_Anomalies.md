# Talk:Temporal Anomalies
*[Article](../Temporal_Anomalies.md) · Talk*

## Canon

- Temporal anomalies are posts that arrive on the 3017 platform from other eras. Three source eras: **1917**, **2017**, **2517**. The TODO in `CLAUDE.md` puts the target share at "~5%?" of tweets for all eras combined.
- The mechanism is **never explained**. "Wormhole" is the working metaphor in `CLAUDE.md` and the prompts, and the main page treats it as a colloquialism.
- **The Keth have been suspiciously quiet** about the anomalies. **@dril has never acknowledged them.** Both are fixed canon. Don't write a post in which either one engages.
- 1917 content is **genuine WWI-era text**: telegrams or personal letters. Nobody can explain how pre-digital text reaches the platform.
- The **"SOMETHING IS WRONG WITH THE SUN STOP"** telegram exists, and the whole platform lost its mind over it. Its 47 community notes all say UNKNOWN (per format #296).
- 1917 anomalies have **no handle, no avatar, no metrics, and no sigil**. The platform's metrics engine can't cope with them, and that failure is part of the presentation.
- **Telegram imitators** are 3017 users doing a bit. They are *not* anomalies, and they break character with a lowercase parenthetical at the end.
- 2017 anomalies are **perfectly normal mid-Twitter posts** that nobody in 3017 can understand. The Vrellnath find them moving without being able to say why. The Glœm made a Monday-tiredness post the most beautiful thing they had ever read, and it got 2M likes.
- 2517 is the "middle period" that nobody alive remembers well. Its archives were lost in the **Great Data Collapse of 2623**. Its memes are *almost* recognizable, like humor from a language the reader almost speaks.

## Voice and usage

### 1917

Two styles. See `data/system-prompt.txt` lines ~169–191.

- **Telegram** (`temporal_anomaly.style` = `"telegram"` or omitted). `display_name` is the sender line in ALL CAPS: rank, name, and unit or location (`CPL. E. WHITFIELD, 3RD BTN., SOMME SECTOR`, `MRS. A. PEMBERTON, LONDON SW1`). The body is ALL CAPS, with STOP between clauses, no articles, and abbreviations.
- **Letter** (`style: "letter"`, optional `date` such as `"November 3rd, 1917"`). `display_name` is the writer in normal case (`Pvt. Edward Whitfield`, `Nurse A. Pemberton`). The body is natural lowercase prose addressed to someone, and the writer knows a censor may read it. Letters can trail off mid-sentence, stop without a closing, or contain one line that doesn't belong.

There are four content categories, and they apply to both styles:

- **(a) Mundane.** Socks, rations, weather.
- **(b) Unsettling.** Exactly one line should not be there, and the rest is normal.
- **(c) Accidentally beautiful.** Something small and specific breaks through the format.
- **(d) Bureaucratic.** Requisitions and form numbers, which enrage the Thrrm.

**Keep it period-plausible.** The comedy and the pathos depend on the text being genuinely from 1917. No 3017 vocabulary, no Keth, no pasta rations, no "LTJG." The one wrong line in an unsettling message should be wrong *cosmically* ("THE BIRDS HAVE STOPPED"), not anachronistic.

**Reply-thread 1917** (`data/replies-prompt.txt` ~143–151): flip a coin between the two styles. The content should *obliquely echo the parent tweet* through a WWI frame. A post about food delivery gets late rations, a post about a bad connection gets a misbehaving telegraph, a post about an annoying person gets a man whistling in the next trench. The echo must be visible to the reader and clearly accidental to the writer. The next reply is a 3017 reaction, which can be baffled, moved, or spooked. Glœm reactions are devastatingly sincere ("we have invented a color for what this makes us feel"). Thrrm reactions are procedural fury at pre-contact form numbers they can't file against.

**Community notes on 1917 content** take the form "This transmission predates all known community context systems…", written in a deadpan, bewildered, professional voice. They recommend Form 91-Kappa (Temporal Anomaly Context Assessment) and admit it wasn't designed for pre-digital content. Surface rating dimensions that don't quite apply.

**Telegram imitators:** use ALL CAPS and STOPs, then break character with a lowercase aside such as "(i've been doing this bit for six months and nobody has told me to stop)", "(the keth love this one)", or "(my therapist says this is a coping mechanism)". **Never** set `temporal_anomaly` on an imitation.

### 2017 (design only, not implemented)

The post itself should be written straight, in real 2012–2019 Twitter voice. See [Talk:Twitter](Twitter.md) for the house style. The joke lives entirely in the 3017 reception:

- The ratio comes from people who don't know what the nouns are. "uber driver just asked me if i listen to podcasts" draws fury about ubers, drivers, and podcasts.
- Community notes earnestly cite historical archives.
- The Vrellnath are moved and can't articulate why.
- The Glœm canonize the banal.

### 2517 (design only, not implemented)

The posts should be *almost* memes: formats that are nearly formats, and jokes that are nearly jokes. They can reference people and events that can't be looked up, because the archives died in 2623. Thrrm community notes are furious that the forms cited come from deprecated systems.

## Implementation

Format and archetype numbers (#N) are 0-based array indices into `data/meme-formats.json` and `data/reply-archetypes.json` at the time of writing. They will drift as entries are added.

### 1917 (done)

- **Prompt:** `data/system-prompt.txt` lines ~169–191 cover the telegram and letter styles, the four categories, and notes. `data/replies-prompt.txt` ~143–151 covers 1917 replies and telegram imitators.
- **Summon tag:** `1917`, which selects **10 formats** (#292–301 in `data/meme-formats.json`, all at weight 0.1):
  - #292 is a mundane telegram, cross-tagged `keth` because of the "Keth suspiciously quiet" line. That means `?summon=keth` can produce a telegram.
  - #293 is an unsettling telegram.
  - #294 is a beautiful telegram (`gloem`).
  - #295 is a bureaucratic telegram (`thrrm`).
  - #296 is a 3017 reaction tweet (`gloem`, `notes`), which is not itself an anomaly.
  - #297–301 are letter variants: basic, trailing off (`gloem`), nurse or doctor, list, and one wrong line.
- **Weighted share:** the 1917 formats total weight 1.0 out of ~284.4, about **0.35%** of unsummoned tweets.
- **Reply archetypes:** #117–121 in `data/reply-archetypes.json`. In order: the 1917 reply itself, a baffled 3017 user, Glœm sincerity, Thrrm fury, and a 3017 community note citing Form 91-Kappa.
- **Incite key:** `1917` (`INCITE_MAP` in `server.js`) forces a telegram or letter reply that echoes the parent, followed by a 3017 reaction.
- **JSON:** `temporal_anomaly: { era: "1917", style?: "telegram"|"letter", date?: string }`, with `handle: ""`, all metrics 0, and `verified: 0`. For telegrams, `display_name` is the sender line.
- **Rendering:** in `public/app.js`, `render1917TweetInner`, `render1917Reply`, and `get1917Class` produce the classes `tweet-1917`/`reply-1917` or `tweet-1917-letter`/`reply-1917-letter`.
  - `render1917Stamp()` picks a random stamp: PASSED BY CENSOR, FIELD POST, PRIORITY, RECEIVED, CLEARED, or OFFICIAL. Telegrams only.
  - `render1917Error()` picks one of five fake platform-diagnostic footers. They are quoted on the main page.
- **CSS:** `public/style.css` renders telegrams on a manila gradient with a noise overlay in **Special Elite**, and letters on paler paper in **Caveat**.
- **Temporal seam:** `renderFeed()` inserts a `.temporal-seam` divider between adjacent tweets whose `temporal_anomaly.era` differs. This includes the boundary between an anomaly and a normal post.
- **Corpus:** as of this writing, 24 posts or replies in `corpus/` carry `temporal_anomaly`.

### 2017 and 2517 (not implemented)

These have no summon tags, no incite keys, no formats, no archetypes, and no renderer. `app.js` checks only `era === '1917'`. A tweet carrying `era: "2017"` would render as a normal 3017 tweet but would still trigger the temporal seam. Rendering specs from `CLAUDE.md`:

- **2017.** Light-mode Twitter aesthetic: white or light grey background, blue accents, the old Twitter bird, round avatar, flat blue checkmark, simple metrics, normal human display names.
- **2517.** Like the 3017 style but sepia-shifted, with a deprecated glyph set and metrics in forgotten units ("4.2 resonances · 890 echoes · 12 folds").

## Unused material

These are the TODOs from `CLAUDE.md` (P0). The main page already describes them diegetically as observed phenomena.

- **2017 and 2517 eras.** None of the above is implemented.
- **Period-correct community notes:**
  - **2017 tweets arriving with their own 2017 notes.** A grey box reading "Readers added context they thought people might want to know," with a binary **Helpful / Not Helpful**. No glyphs, no 30 dimensions, no Thrrm compliance. The 3017 audience finds the two-dimension system *deeply unsettling*, "a legal document from a civilization that hadn't invented nuance yet."
  - **A 3017 note stacked on top of the 2017 note**, trying to explain the original with historical archives.
  - **2517 notes** with an intermediate rating system of about 8–10 dimensions, some mapping to current ones and some unrecognizable.
  - **1917 notes:** done. These are 3017 notes, since 1917 had no note system.
- **Period-correct ads,** none implemented:
  - **2017:** Casper mattress ads. Nobody knows what a mattress is.
  - **2517:** products that no longer exist, with genuinely alarming side effects treated as routine.
  - **1917:** war bonds posters. The 3017 audience has no framework for them.

## Discrepancies

- **`?summon=telegram` and `?incite=telegram` don't exist.** `CLAUDE.md` says the 1917 anomalies are testable via `?summon=telegram` and `?incite=telegram`, but `SUMMON_TAGS` and `INCITE_MAP` in `server.js` contain only `1917`. An unknown summon tag silently falls back to the full pool, and an unknown incite key is silently ignored.
- **Stale 1917 format counts in `CLAUDE.md`.** It says 1917 has "5 meme formats (mundane, unsettling, beautiful, bureaucratic, 3017 reaction)", and the summon table gives a count of 5. The actual count is **10**, because five letter formats were added. `CLAUDE.md` also describes 1917 as telegrams only, with the Special Elite font, and doesn't mention the letter style or the Caveat font.
- **`CLAUDE.md` versus format #293 on the sun telegram.** `CLAUDE.md` says one 1917 message "is just 'SOMETHING IS WRONG WITH THE SUN STOP'". Format #293 treats it as one wrong line inside otherwise mundane correspondence. The main page leaves this ambiguous.
- **Wrong dates in the `render1917Error()` strings.**
  - One string says `expected range 2049-3026`, which should be 3017 after the redate.
  - Another says content "predates the platform by **1132 years**". The arithmetic doesn't work: 2049 − 1917 = 132, and 3017 − 1917 = 1100. The main page quotes the other strings and omits this one.
- **Stale subheader.** The `app.js` subheader reads "epoch 3026." (redate TODO).
- **Frequency.** The target is "~5%?" for all eras, but the actual weighted share of 1917 formats is ~0.35%.
- **Anachronisms in corpus 1917 items.** Several telegrams contain 3017 concepts: "PASTA RATIONS", "LTJG Marcus Chen / 7th Expeditionary Signal Corps", "TRANSMITTER 9 OUTPOST KETH COMPLIANCE", "CONSCIOUSNESS OPTIMIZATION NOTED STOP THE DREAM DID NOT DIE". These violate the "genuine WWI-era text" canon. Consider pruning them or adding a stronger prompt guardrail.
- **The 2517 ad concept has migrated.** Format #307 (a Hells in-leak ad) includes "ads for products nobody in 3017 recognizes with genuinely alarming side effects treated as routine", which is the 2517 ad concept from `CLAUDE.md`. Decide which one owns it.

## Open questions

- **Who remembers 2517?** "Nobody alive remembers 2517 well" sits awkwardly beside long-lived species: the Keth, who are billions of years old, and Thrrm with 800-year careers. The main page softens it to "nobody on the platform." Are the Keth quiet about 2517 for the same reason they're quiet about 1917?
- **Schema for 2017/2517.** Should they reuse `temporal_anomaly.era`? Should they carry period notes as a nested `community_note` with a `period` field? `docs/hells-leak-bible.md` proposed generalizing to `anomaly: { class: "temporal"|"subspace", ... }`, and that was never adopted.
- **Details introduced by the wiki** that aren't in `data/` or `CLAUDE.md`. Adopt them or strike them:
  - "the seam" as the users' name for the temporal seam
  - the "one post in twenty" folk estimate
  - the etiquette that imitators who skip the aside get reported
  - the cultural-reference phrases ("send socks", "light-mode energy", "measured in folds")
  - "nobody is sure what a fold was"
- Does anything *reply* to a 1917 message and get an answer? Current canon implies no.
