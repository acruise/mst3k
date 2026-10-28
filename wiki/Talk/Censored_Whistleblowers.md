# Talk:Censored Whistleblowers
*[Article](../Censored_Whistleblowers.md) · Talk*

## Canon

- Uploads and clone-descendants of **former Meta and former Upload employees** surface trying to whistleblow. Posts arrive **~40% redacted**; the visible fragments make the claim obvious by implication, which is the joke.
- **Who censors them is DELIBERATELY AMBIGUOUS**: Upload legal team, Meta estate trust, Terran Solar Court sealed orders, the platform's compliance stack, or all four. Nobody gets a straight answer; asking makes the redactions worse. Never resolve.
- **Whistleblowers are EARNEST.** Tired, careful, often tagging a friend as witness. The comedy is the futility, not their performance.
- They tag @GTAB_official and get no response.
- @dril has, inevitably, posted something adjacent to every whistleblower's claim a decade earlier; nobody connects the dots.
- Keep the Upload and Meta streams apart (see [Talk:The Upload](The_Upload.md)): an Upload whistleblower talks about Upload disasters (the rocket, Mars); a Meta whistleblower talks about the 2271 collapse. "Not a Purgecoder but I worked down the hall" is Meta-side. The Meta **No Explanation Clause** means Meta-side claims about the *sabotage itself* should trail off or be redacted, never land.

## Voice and usage

- **Primarily a top-level tweet format.** The reply beats (self-rephrase, amateur detective, stan dismissal, concerned stranger, old @dril post) fire **only when the parent tweet is itself a whistleblower post**.
- **Vary redaction tags** — never the same tag twice in a row within a tweet or within one whistleblower's thread. Inventory: `[REDACTED]`, `[REDACTED — GCC §4.7.2(c)]`, `[REDACTED BY SEALED ORDER]`, `[REMOVED: NON-COMPLIANT CONTENT]`, `[CLAIM NOT VERIFIED BY AVAILABLE EVIDENCE]` (the signature weasel phrase), `[CONTENT UNAVAILABLE IN YOUR JURISDICTION]`, `[WITNESS PROTECTION FILTER ACTIVE]`, `███████████`, `[NAME REMOVED PURSUANT TO UPLOAD LEGAL DIR. 4-ALPHA]`, `[MENTION OF THIS ENTITY NOT PERMITTED]`.
- The rephrase attempt gets redacted at *different positions*; by attempt 3–4 the whistleblower is visibly exhausted and often ends mid-sentence.
- Stan dismissal: "how SUSPICIOUS the truth keeps getting [REDACTED]."
- Don't confuse with **bot glitch tags** (`[CONTENT FILTERED]` etc. on platform AI replies). Different phenomenon, different register; the bot tags are malfunctions, the whistleblower redactions are enforcement.

## Implementation

- **System prompt**: `data/system-prompt.txt` "RECURRING FORMAT — THE CENSORED WHISTLEBLOWERS" (~lines 73–100): target ~1% of tweets, handle/bio conventions, tweet shapes, redaction inventory, tone.
- **Replies prompt**: `data/replies-prompt.txt` "REPLY-THREAD BEATS WHEN THE PARENT IS A CENSORED WHISTLEBLOWER."
- **Summon tag** `whistleblow` (3 formats in `data/meme-formats.json`, weight 0.05 each): #284 (the whistleblower tweet), #285 (follow-up rephrase tweet), #286 (compilation screenshot of 91 stacked attempts).
- **Reply archetypes**: #110 (self-rephrase), #111 (amateur detective), #112 (Upload/Meta stan dismissal), #113 (concerned stranger).
- No incite key. No special JSON field or renderer — redactions are plain text inside `text`.

## Unused material

- An incite key for whistleblower reply beats under a non-whistleblower parent (currently disallowed by design).
- A whistleblower accidentally corroborated by a Thrrm citation or a Terran Solar Court sealed-order number.

## Discrepancies

- **Anachronistic tenure dates.** `data/system-prompt.txt` gives the bio "Former Upload Systems, 3145-3181 (it will all come out)" and format #284 gives "Former Upload Mars ops 3145-3181." Both are *after* the present (3017, or even the old 3026). Mars-ops tenure should probably be in the 22nd century (see Mars discrepancies on [Talk:The Upload](The_Upload.md)). The main page drops the dates.
- **Frequency**: prompt says ~1% of tweets; three formats at weight 0.05 in a ~336-format pool yields well under 1%. Weights win; `CLAUDE.md` calls them "a rare treat."
- Meta-side bios ("2268-2271") are consistent with the 2271 collapse.

## Open questions

- Are whistleblowers ever *right* in a checkable way (e.g., something later confirmed)? Currently: implied true, never confirmed.
- Does the Upload Defender "Ex-Employee Defense" ever collide with a real former-employee whistleblower — i.e., does The Upload ever name a whistleblower as the employee who "got it wrong"? Tempting; not canon.
