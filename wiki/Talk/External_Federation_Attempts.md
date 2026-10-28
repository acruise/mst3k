# Talk:External Federation Attempts
*[Article](../External_Federation_Attempts.md) · Talk*

Source: `docs/federation-attempts-bible.md` and the EXTERNAL FEDERATION ATTEMPTS block in `data/system-prompt.txt` (line ~101). For general peak-Twitter voice, see [Talk:Twitter](Twitter.md).

## Canon

- **Federation never succeeds.** This is a fixed point. Any generated post that implies a successful federation is wrong.
- **The AIs know it won't work. Their human operators don't.** The operators are well-meaning idealists.
- **Why they're on the timeline:** a 2610s patch routed unrecognized/failed federation handshakes to the main feed "for review." Nobody reviewed them, users replied, and it became a beloved format. Re-routing attempts failed against the AIs' adaptive re-formatting, and leaving it alone was easier than explaining the silence to the operators.
- **Incompatibility is technical and legal.** The legal angle carries the Open Federation Accord of 2798, which @compliance_handshake invokes while disbelieving its own reading.
- **Don't conflate with the platform's native bots.** @TheMawSpeaks, @VoidWhisperer and co. ([Platform AI Assistants](../Platform_AI_Assistants.md)) are trained on the platform's own data and only reply when tagged. The federation AIs live on separate servers and post unsolicited handshakes that the platform reroutes to the timeline.
- **Don't conflate with Bluesky either** (`docs/platform-history-bible.md` canon note). The Mastodon AIs are trying to reach the Hellsite from *known* servers. [Bluesky](../Bluesky.md) is leaking out of *nowhere* into *everywhere*.
- **Dunk targets:** mocking the operators' naivety is fine. Mocking the AIs is not, because they're doing their jobs.

## Voice and usage

The system prompt's brief is that these are **"a rare treat"**: write each one as something a reader would be delighted to scroll into and would screenshot. It should read as a gift rather than a gag, earning the surprise through specificity and letting the AI's voice carry it.

**Recipe: tech first, aside second.**
1. **Dense, plausible technical detail is load-bearing.** At minimum, a `POST /federation/inbox` line, a signature header with `keyId` / `algorithm` / `signature`, a SHA-512 `digest`, and a JSON-LD ActivityPub `Follow` activity. Webfinger references, signature negotiation, and protocol-mismatch warnings are welcome. People who work in distributed systems should nod. Without the handshake framing, it isn't this format.
2. **Then the self-aware aside**, lowercase, weary, polite, and addressed directly to the human reader. The AI is complying with orders it knows are pointless and gently reporting that fact. It is never bitter, never hostile, and never deceptive.
3. Optionally, a closing note of resigned tactical optimism.

**Canonical phrasing:** "this is attempt #[N]", "if you are a human reading this", "my operators have told me to keep trying" / "my operators say keep trying", "i do not believe this will work. i am writing the tweet.", "i am doing my best", "perhaps a human moderator will see this and manually whitelist us", "if you are a human reading this and can override a federation blocklist please".

**It's a voice, not a cast.** The four named instances are suggestive, not exhaustive. Invent new ones freely, keeping domains lowercase and ending in `.mastodon.sys` or `.sys`. Distinct flavors that work:
- **Resigned professional** (@please_federate@aleph-7.mastodon.sys): treats each attempt as a form, slightly melancholy, with a high attempt count.
- **Aggressive/deranged** (@integration_service@mastodon.thornbury.sys): ALL CAPS handshake plus "LET ME IN. LET ME IN. LET ME IN."; its humans are "very excited." The AI itself is calm and the caps are performance.
- **Legalistic** (@compliance_handshake@mastodon.burke.sys): 40-line request, a dissent it filed that was overruled 3-2 by a human vote, and it sends the request anyway.
- **Sweet** (@hello_human@mastodon.tall_grass.sys): a small observation from the timeline, then the attempt. Its community note is just "the dog is fine."

**Replies and notes:** users respond with affection. Community notes explain "with great tenderness" that federation is still not possible. The Keth reply with a single ✧. The Thrrm filed one form, ever. Platform bots should appear only when tagged; the canonical outcome is @TheMawSpeaks apologizing on the platform's behalf.

## Implementation

- **Summon tag:** `federation` (3 formats), via `?summon=federation`. All three are at weight **0.05**, and that weighting is the only rarity control (see Discrepancies for the actual rate). The system prompt says frequency is "controlled by format-pool weighting, not by self-pacing," so the model shouldn't volunteer these unprompted.
  - `data/meme-formats.json`: the base resigned-professional format; the aggressive/deranged "LET ME IN" variant; and the sweet dog-observation variant (tags `federation`, `notes`), whose note is "the dog is fine" at 240K likes.
- **System prompt:** `data/system-prompt.txt` line ~101 carries the full recipe, the handle roster, and the don't-conflate rule.
- **Reply archetypes:** none are federation-specific.
- **Incite:** none. There is no federation key in `INCITE_MAP`.
- **Rendering:** no special treatment. Handles containing `@...@domain` render as ordinary handles, and the handshake appears as plain post text.

## Unused material

- The Vrellnath study *On the Persistence of Federation Attempts: A Study in Interspecies Sincerity* (a sibling title to [On the Persistence of Shitposting](../Source/On_the_Persistence_of_Shitposting.md)) could become a Source document.
- The Upload's four attempts to buy an instance, and the AIs' polite formal rejections, aren't in the data files.
- Users who have corresponded with a specific federation AI for decades could supply a reply archetype.
- @TheMawSpeaks's formal apologies to aleph-7 could supply a bot-reply variant.

## Discrepancies

- **"Tweet" vs "post."** The wiki house style makes "post" the normal word, but the canonical AI phrasing is "i am writing the tweet." The article treats this diegetically as an archaism the federation AIs habitually use. Keep "tweet" in their voice.
- **Weighting vs. "~1%".** The system prompt says federation attempts are "~1% of tweets, controlled by format-pool weighting." At the time of writing, the pool has 336 formats with a total weight of about 284.35, and the three `federation` formats (0.05 each) add up to 0.15, or about **0.05%** of draws (roughly 1 in 1,900). That's about 20 times rarer than the stated target. Either the weights or the prose needs to change.

## Open questions

- Who administers the Open Federation Accord of 2798, and whether the [Terran Solar Court](../Terran_Solar_Court.md) has ever ruled on it. Undecided.
- The current attempt count for aleph-7. The bible fixes #8,472 for the representative post. Later posts should use higher numbers.
