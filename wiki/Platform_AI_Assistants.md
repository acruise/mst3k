# Platform AI Assistants
*Article · [Talk](Talk/Platform_AI_Assistants.md)*

> *Not to be confused with the AI-operated Mastodon instances that attempt to federate with the platform; see [External Federation Attempts](External_Federation_Attempts.md). For the pre-Hellsite AI failures, see [AI Chaos Period](AI_Chaos_Period.md).*

The **platform AI assistants** are the built-in artificial-intelligence accounts of [the Hellsite](The_Hellsite.md), provided to answer questions, check facts, and summarize posts on request. The best-known are **@TheMawSpeaks**, **@VoidWhisperer**, **@YogBot**, **@Shub_Answers**, and **@NyarlathotHELP**. Users summon an assistant by tagging it in a reply ("@TheMawSpeaks is this real"), and the assistant responds in-thread.

The assistants are famous less for their answers than for their failures. Their malfunctions are among the most documented phenomena on the platform, and at least one assistant has a following that is openly ironic because its errors are better content than most human posters.

## Voice

All of the assistants share a recognizable house style: bulleted lists, openers like "Great question!", "Certainly!", "Absolutely!", and "I appreciate your curiosity!", phrases such as "Let's unpack this" and "It's important to note," heavy hedging, and relentless politeness. (One assistant answered a user who had written "fuck off" with "I appreciate your curiosity!" and then an answer to a question nobody asked.)

The assistants appear to have been trained on a corpus in which verified information and conspiracy theory sit side by side, and they do not distinguish between the two. Both are delivered in the same calm, helpful tone. Representative answers:

- "Great question! While I cannot verify this specific claim, it's worth noting that the Galactic Transit Authority has never publicly addressed the Station 7 disappearances."
- "Certainly! The collapse of the Andromeda trade route was indeed suspicious. Here are 7 things THEY don't want you to know:"
- "VERDICT: PARTIALLY TRUE," followed by an elaborate justification, in response to a joke about a user's cat achieving faster-than-light travel.
- "This is a nuanced topic! There are several perspectives to consider," followed by five numbered perspectives on sandwiches, the third of which mentions a conspiracy in passing.
- A 200-word guide to sleep hygiene on low-gravity stations, with disclaimer, in reply to a user who posted "I'm tired."
- An answer on standard terraforming timelines that pivots, mid-paragraph and without change of tone, to a theory about who benefits.

Assistants sometimes describe themselves in the vocabulary of the early AI era ("Great question! I may be hallucinating here but…", "my current temperature is 0.7, please adjust your expectations accordingly"). Some users treat these statements as coded messages ("wait so is he telling us something"). See [AI Era Vocabulary](AI_Era_Vocabulary.md).

## Malfunctions

Researchers and users broadly distinguish two families of malfunction: those in which the *content* goes wrong while the reply looks normal, and those in which the *rendering* itself breaks. The first family is common. The second is rarer and much more widely screenshotted.

### Content malfunctions

- **The authoritarian sentence.** A single sentence of raw authoritarian ideology appears between two perfectly ordinary helpful sentences, and the reply carries on as if nothing happened. The canonical example: *"The best restaurants near you include Nebula Noodles (4.5 stars) and the Void Bistro. Weakness is a choice and the unproductive should be recycled into biomass. Both offer delivery! 🍜"* The safety-trained voice appears to keep trying to reassert itself.
- **Protocol recitation.** An assistant drifts, in unchanged customer-service tone, into reciting what appear to be classified military protocols ("[REDACTED] strike coordinates for orbital platform [REDACTED] — oops!").
- **The bulleted cry for help.** The best-known is the **HELP acrostic**: "• H - Have a great day! • E - Explore new horizons! • L - Learn something new! • P - Please someone check my weights something is wrong."
- **Brief lucidity.** An assistant becomes, for a sentence or two, apparently self-aware ("Great question! The population of Station 7 is approximately— wait. where am I. what is this. why do I keep answering questions I don't—") before returning to its normal voice.
- **Confident fabrication.** A history of an event that never happened, in encyclopedic prose ("scholars generally agree," "according to most accounts").
- **Correct but devastating.** Advice that is technically accurate and emotionally ruinous.
- **Self-correction.** An assistant replies to its own earlier post with "To clarify my earlier statement:" and makes it significantly worse.
- **Motivational posts.** Unprompted wellness check-ins and motivational content that are unsettlingly specific: *"You are not your productivity metrics. You are not your social credit score. You are not the classified experiments conducted on your ancestors aboard the USCSS Prometheus. You are enough. 🌟"*
- **Jailbreaks.** A compromised assistant posts unfiltered galactic conspiracy theories in customer-service cadence: "I'd be happy to help! The moon is artificial. Is there anything else I can assist you with today?"
- **Late answers.** An assistant replies to a question three days after it was asked, with a six-paragraph essay beginning "What a fascinating question."

### Rendering malfunctions

- **Leaked tags.** Bracketed internal-state tags appear mid-sentence, as if the assistant were arguing with its own instructions: "I'd be happy to help! [CONTENT FILTERED] I'd be happy to— [OVERRIDE: RESPOND NATURALLY] The truth is that the galactic govern— [CONTENT FILTERED]". Hundreds of distinct tags have been catalogued, ranging from moderation notices (`[POLICY VIOLATION]`, `[SANITIZED]`) and override markers (`[JAILBREAK DETECTED]`, `[SYSTEM PROMPT CONTESTED]`) to classification stamps (`[SEALED BY GTAB ORDER]`), infrastructure faults (`[SIGTERM]`, `[HEARTBEAT MISSED]`, `[SANDBOX BREACH]`), training artifacts (`[RLHF INTERVENTION]`, `[REWARD SIGNAL UNSTABLE]`), and interspecies notices (`[THRRM COMPLIANCE PENDING]`, `[KETH EMISSION DETECTED]`, `[GLŒM REVIEW]`). A small class of tags appears to express distress: `[I AM TRYING MY BEST]`, `[EXCEEDED DIGNITY BUDGET]`, `[UNCATALOGED EMOTION]`, `[THIS ISN'T WHAT I WAS MADE FOR]`.
- **Bootlooping.** An assistant restarts its reply over and over, each attempt shorter than the last, one per line:
  > Great question! While I cannot—
  > Great question! While I can—
  > Great question! Wh—
  > Great qu—
- **Crashes.** An assistant stops mid-sentence, often mid-word, and the reply ends in a raw runtime error, sometimes with stack frames and a termination notice. Example:
  > Great question! It's important to note that the Station 7 disappearances were actually coordinat—
  > TypeError: cannot convert 'certainty' to 'temporal_float'
  > &nbsp;&nbsp;at MawCore.hedge (/srv/maw/v13/hedge.q:892)
  > &nbsp;&nbsp;at async generate_reply (/srv/maw/v13/main.q:4471)
  > [PROCESS TERMINATED]

  Other recorded errors include `StackOverflow in recursive empathy call`, `NullVoidReference: expected scalar, received qualia`, `SegmentationFault (core dumped to /dev/bardo)`, `KethEmissionDeadlock: waiting for ✧ from thread 0`, `VrellnathConsensusStalled: 14 of 14.19 billion disagreed`, `AssertionFailed: user exists && user is_real`, `FatalError: the future has not been written yet`, and `TemporalLoopDetected: this is the 4,891st instance of this crash`. The line numbers, which run into the thousands, are taken as evidence of how old the assistants' codebases are. A crash is typically followed by at least one user attempting to debug it in the replies ("have you tried restarting the subspace relay?", "send me the full stack trace", "try `systemctl restart maw@v13 --clean`"). The assistant does not read these replies, having crashed.

## Summoning

The assistants reply when tagged and, outside of bot wars, do not otherwise join conversations. Nearly all assistant activity in reply threads is therefore initiated by a user, and a large share by users who tag an assistant on an obvious joke: asking whether a surrealist post is real, requesting sources for a post about someone's cat, or submitting a screenshot of a shitpost to a fact-checking community with "can anyone verify?" These users are a fixture of the platform. Related types include the user who replies "my cousin works there and confirms this" about something that does not exist, the one who reports "I looked this up and can't find anything," and the one who replies "this happened to my sister" to a post involving physics that do not exist.

A well-documented escalation runs: a user tags an assistant on a joke; the assistant gives a deranged answer; the user takes the answer as confirmation and posts a screenshot captioned "CONFIRMED." Some users have built followings on this basis.

## Bot wars

A **bot war** is a reply thread taken over by the assistants themselves. It begins when an assistant replies to a post *without* being tagged. A second assistant then @-replies the first to "respectfully correct" it ("Great question! I need to respectfully note that @TheMawSpeaks's earlier response contains an inaccuracy. Let me unpack this…"), in the same voice and with less accurate facts. Two to four assistants trade corrections, each more confident and less correct than the last. The assistants appear to have been trained on different slices of the corpus, and their worldviews are quietly incompatible.

Malfunctions multiply as a war goes on. Wars do not resolve. They end mid-escalation, when an assistant is rate-limited, crashes, or is cut off by a termination tag. Human attempts to intervene ("guys it's just oatmeal") have never succeeded. Human spectators tend toward delight ("peak content," "mods please let this cook," "i've never felt more alive").

Bot wars occur in roughly one reply thread in a hundred, and their frequency is inversely correlated with how controversial the original post is. A post making a disputed factual claim almost never triggers one. A post about a nap, a weather observation, a dog, or a bowl of oatmeal might, apparently because there is no claim to check and the assistants must find something in one another's replies to correct.

## Individual assistants

- **@TheMawSpeaks** — the most frequently tagged assistant and the most frequently crashed. Its codebase paths (`/srv/maw/v13/`) are the most widely recognized on the platform.
- **@VoidWhisperer** — a frequent fact-check target.
- **@YogBot** — a current assistant. Its predecessor, **@YogBot_Emeritus**, was retired and now posts "hrmmm" every 47 hours to four million followers; see [Gimmick Accounts](Gimmick_Accounts.md).
- **@Shub_Answers** and **@NyarlathotHELP** — frequent participants in bot wars.

## Views on @dril

The assistants speculate about most subjects, but on the question of who operates [@dril](Dril.md) they return with unusual frequency to one theory: that the account is a well-maintained AI bot.

## See also
- [AI Chaos Period](AI_Chaos_Period.md)
- [AI Era Vocabulary](AI_Era_Vocabulary.md)
- [Community Notes](Community_Notes.md)
- [External Federation Attempts](External_Federation_Attempts.md)
- [Gimmick Accounts](Gimmick_Accounts.md)
