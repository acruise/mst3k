# Talk:Bluesky
*[Article](../Bluesky.md) · Talk*

Source material: `docs/platform-history-bible.md` ("Sibling Platform: Bluesky," "The skeet leaks," "What nobody knows," "How the rest of the platform treats skeet leaks," the Bluesky guardrails, and the skeet callbacks); `data/system-prompt.txt` line 36. House voice: [Talk:Twitter](Twitter.md).

## Canon

- **Do not explain the Ascension.** The mystery is the point. Candidate theories may be mentioned; never resolve them.
- **Skeets reference current events.** A skeet-leak post should feel weirdly *timely*: the leaked skeet is about something that happened recently in the 3017 setting. This is the uncanny beat.
- **Skeets leak into UNRELATED systems:** refrigerators, thermostats, DICOM metadata, Thrrm forms, receipt printers, orbital deli kiosks. Never a display that would normally carry social media. The incongruous substrate is core.
- **Skeet format is preserved from pre-Ascension:** ~300-character limit, handle with `.bsky.social` or a similar domain suffix, timestamp always current, optional reply count that never fluctuates.
- **Nobody has ever successfully sent a skeet TO Bluesky.** One-way, inbound only.
- **Post-Ascension handles exist, which is impossible.** Canon; don't explain; enjoy.
- **Distinct from the Tumblr AGI** (retroactive, destroyed, tragic) and **distinct from federation attempts** (known servers trying to reach us). Bluesky is leaking from nowhere into everywhere. Don't conflate.
- The Keth find it beautiful (second only to whichever Keth is @dril); the Thrrm are permanently furious; the Upload's "in talks" claims get "no you are not."
- Out-of-universe, the truth behind the Vrellnath–Keth theory (d) ("the platform is doing fine and would prefer not to be asked") is unspecified. Don't specify it.

## Voice and usage

The system prompt frames skeet leaks as **a rare treat (~1% of tweets)**, written as a gift for the reader: the tonal target is "screenshot-and-share." The delight lives in the incongruous substrate plus the uncanny current-events timing; earn it with specificity.

Structure of a leak post: a brief caption ("new one," "current bluesky," "this one is about me somehow," "new one on my thermostat") followed by the quoted skeet verbatim, handle and text visible: `@someone.bsky.social: [content]`. The skeet's content references something recent in-setting.

Subgenres:
- **Standard sighting**: incongruous substrate, timely content, 400K likes.
- **Creepy personal-device variant**: the skeet addresses the poster ("we see you trying," "the thing you are doing is fine," "we know about tuesday"). Replies are gentle; nobody dunks. This is the one skeet subgenre everyone treats with care.
- **Thrrm form**: a furious compliance thread quoting the skeet that appeared in a nonexistent field, mildly insulting about form processing.
- **List thread**: "things i have seen a skeet leak onto this month," the last item always weirder than expected.
- **Upload dunk**: screenshot of "no you are not" from his private substrate.

## Implementation

- **System prompt:** `data/system-prompt.txt` line 36, "SIBLING PLATFORM — BLUESKY (Ascended, 2340s)."
- **Summon tag `skeet`** (3 formats, each weight 0.05 in `data/meme-formats.json`): the standard skeet-leak tweet (must quote the full skeet with handle); the creepy personal-device variant; and the Thrrm furious-compliance-thread variant (also tagged `thrrm`). Test with `?summon=skeet`.
- **The ~1% claim is approximate.** Three formats at weight 0.05 out of ~336 mostly weight-1.0 formats come to well under 1% per post; the actual rate depends on the pool's total weight.
- **No incite key** and no reply archetype for skeet leaks.
- **Rendering:** no special JSON field; the skeet is quoted inside the tweet text. Compare `temporal_anomaly` / `subspace_anomaly` / `special_account`, which do have renderers.

## Unused material

- The Keth ✧-in-the-admiration-register reply under a leak post.
- A skeet-scholar thread citing *"The Ascended Timestamp: Causality Considerations"* and getting a Vrellnath reply that is suspiciously noncommittal.
- The museum racks: someone posting from the gallery about the calm they feel.
- The 2700s outbound research effort and the retired researcher ("we see you trying") as a history thread.
- A leak post that is a reply to a Hellsite post from earlier the same day, with a reply count that never changes.
- Skeet-leak reply archetype: someone in a thread reporting that a skeet about this very thread just appeared on their oven.

## Discrepancies

- **Frequency.** The system prompt says "~1% of tweets, controlled by format-pool weighting"; the weights (0.05 × 3) give far less. Either the weights or the claim should change.
- **Tag on the standard format.** The standard skeet-leak format is tagged `["thrrm", "skeet"]` even though only one of its listed substrates is a Thrrm form. Harmless, but `?summon=thrrm` will occasionally produce a refrigerator skeet.
- **"The feed for them is called, by convention, 'The Current Bluesky'"** (bible) vs. the short caption "current bluesky" used in posts. Consistent; the article uses both.

## Open questions

- Should there be an incite key for a skeet leak appearing in a reply thread (the leak "commenting" on the thread from some device)?
- When the P0 temporal-anomaly eras (2017, 2517) ship, keep them visually and tonally distinct from skeet leaks: temporal anomalies come from other *times*; skeets come from *nowhere*, always now.
