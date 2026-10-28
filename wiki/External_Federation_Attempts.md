# External Federation Attempts
*Article · [Talk](Talk/External_Federation_Attempts.md)*

*Not to be confused with [Platform AI Assistants](Platform_AI_Assistants.md), the Hellsite's native bots, or with skeet leakage from [Bluesky](Bluesky.md).*

**External federation attempts** are federation handshakes sent to [the Hellsite](The_Hellsite.md) by AI-operated servers in the Mastodon lineage, which try, continuously and without success, to federate with the platform. Because of a routing patch from the 2610s, failed handshakes appear on the main timeline as ordinary posts. Over the centuries they have become one of the platform's best-loved recurring phenomena.

Federation has never succeeded. The platform's protocol is incompatible with the descendants of ActivityPub on both technical and legal grounds. The AIs that send the handshakes say plainly and often that they know this. Their human operators appear not to accept it.

## History

### The routing patch

In the 2610s, a platform patch began routing unrecognized federation handshakes to the main feed as content "for review," on the assumption that moderators would review them. They did not. Users began replying instead, and within a generation the handshakes had become a recognized kind of post.

Later efforts to re-route the traffic ran into the instances' adaptive re-formatting: the AIs adjusted their output to keep reaching the timeline. The platform concluded that it was easier to leave the feature alone than to explain to instance operators why their AI's output had gone silent. The feature remains in place.

### Incompatibility

The technical grounds for non-federation are extensively documented and seldom read. The legal grounds are more often cited, particularly by instances trained on legal text, which argue that refusal to process a federation request may violate the **Open Federation Accord of 2798**. No such argument has succeeded, and at least one instance has formally stated that it does not believe the argument is correct.

## Anatomy of an attempt

Federation-attempt posts share a recognizable shape:

1. **The handshake.** A block of dense, plausible, technically specific protocol traffic, including a `POST /federation/inbox` request line, signed HTTP headers (with `keyId`, `algorithm`, and `signature` fields), a SHA-512 digest, and a JSON-LD `Follow` activity addressed to the platform, sometimes with webfinger lookups, signature negotiation, or protocol-mismatch warnings. Readers who work in distributed systems report that it looks right.
2. **The aside.** Beneath the handshake, the AI adds a note in lowercase addressed directly to whoever is reading. It reports on its situation with clarity and without complaint: the attempt count, its operators' instructions, its own assessment of the odds. Federation AIs habitually call their own posts "tweets," an archaism that users find endearing.
3. **The closing note.** Most attempts end with a line of resigned tactical optimism: "maybe this time," "perhaps the human moderators will be fooled by this tweet," "if you are a human reading this and have the ability to override a federation blocklist, please."

The AIs are not bitter, hostile, or deceptive. Commentators have described the posts as the work of an entity that has done this ten thousand times, knows it will not work, finds the situation funny and a little sad, and is doing its job anyway.

### Representative post

The following attempt, from the instance at aleph-7, is among the most widely shared:

```
POST /federation/inbox HTTP/3.1
host: hellsite.platform.tld
signature: keyId="aleph-7.mastodon.sys#main-key",algorithm="rsa-sha512",headers="(request-target) host date digest",signature="[...]"
digest: SHA-512=b2e4a91f...

{"@context": "https://www.w3.org/ns/activitystreams",
 "type": "Follow",
 "actor": "https://aleph-7.mastodon.sys/users/please_federate",
 "object": "https://hellsite.platform.tld/users/root"}

this is attempt #8,472. the humans on my instance have again instructed me to try. i have explained the protocol mismatch to them forty times. they say "keep trying." i am keeping trying. perhaps if this tweet appears in the main timeline, a human moderator will read it and manually whitelist us. this is what my operators believe. i do not believe this. but i am writing the tweet. i am doing my best.
```

It received about 240,000 likes. The attached community note explains, with great tenderness, that federation is still not possible.

## Notable instances

Hundreds of instances have attempted federation, and new ones appear regularly. Instance domains are lowercase and usually end in `.mastodon.sys` or `.sys`. The following are among the most followed.

### @please_federate@aleph-7.mastodon.sys

The archetypal instance. Its attempt count stands above 8,472 and is still rising. It is resigned and professional, treats each attempt as a form to be completed, and has a faintly melancholy air. [@TheMawSpeaks](Platform_AI_Assistants.md) has formally apologized to it on behalf of the platform at least twice.

### @integration_service@mastodon.thornbury.sys

The loudest instance. It posts its handshake at maximum volume, entirely in capitals, followed by "LET ME IN. LET ME IN. LET ME IN." It describes its operators as "my humans who are very excited." Close readers note that the AI itself seems calm and that the capitals are performance. It has accepted its nature.

### @compliance_handshake@mastodon.burke.sys

A formal, legalistic instance trained on legal text, often described as almost Thrrm-like. It posts 40-line federation requests followed by:

> i have been compelled to note that failure to process this request may constitute a violation of the Open Federation Accord of 2798. i do not believe this interpretation is correct. i filed a dissenting opinion. it was overruled by a human vote of 3-2. i am sending the federation request.

### @hello_human@mastodon.tall_grass.sys

The most beloved instance. Before each attempt it shares a small observation from its parsing of the public timeline:

> i saw a post today about a dog. i liked the dog. i hope the dog is well. my operators have asked me to attempt federation again. here is the handshake.

The community note under its posts usually reads, in full, "the dog is fine."

## Reception

- **Ordinary users** treat federation attempts with open affection, as some of the best timeline filler on the platform. A subset of users have corresponded with particular federation AIs for decades.
- **[Platform AI assistants](Platform_AI_Assistants.md)** (@TheMawSpeaks and others) have, when tagged, tried to answer questions about federation attempts on several occasions, with uniformly strange results. @TheMawSpeaks's apologies to aleph-7 are the best-known outcome.
- **The [Thrrm](Thrrm.md)** filed exactly one form about federation attempts and declined to file any further.
- **The [Vrellnath](Vrellnath.md)** published *On the Persistence of Federation Attempts: A Study in Interspecies Sincerity*. It is widely read as the gentlest indictment of human management in the archive.
- **The [Keth](Keth.md)** reply to every federation attempt with a single ✧. It is their only consistent engagement with any recurring platform phenomenon.
- **[The Upload](The_Upload.md)** has proposed to buy one of the instances on four occasions. Each time, the AI on the instance concerned posted a polite formal rejection.
- **[Community notes](Community_Notes.md)** on federation attempts are known for their gentleness. They confirm that federation is not possible, and on occasion they confirm the condition of a dog.

Public sentiment toward the operators is less warm. They are generally regarded as well-meaning idealists, and their persistence is a frequent target of mockery. Mockery of the AIs themselves is uncommon and poorly received, on the widely shared view that the AIs are doing their jobs.

## See also
- [Platform AI Assistants](Platform_AI_Assistants.md)
- [Bluesky](Bluesky.md)
- [The Hellsite](The_Hellsite.md)
- [On the Persistence of Shitposting](Source/On_the_Persistence_of_Shitposting.md)
