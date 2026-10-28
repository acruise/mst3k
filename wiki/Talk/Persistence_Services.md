# Talk:Persistence Services
*[Article](../Persistence_Services.md) · Talk*

## Canon

- Persistence Services, Ltd. really does host the Ennoi Hells and about 139 others. See [Talk:Hells Leak](Hells_Leak.md#canon) for the full truth about the leak. The company's claim that the posts are "creative content posted by fans of our Legacy Contract Portfolio product line" is false. On the main page it appears as the company's stated position.
- The company is **boringly well run**: excellent uptime, solid margins, a long-tail customer base that prepaid and is extinct. The joke is the blandness. Never make it cartoonishly evil.
- **Brand Hallister** is perfectly pleasant, and he genuinely hasn't looked. "I'm more of a numbers guy." It's possible nobody at the company has looked at what it hosts in a generation.
- **Hell Plus™ is a real product** sold to surviving client civilizations. The in-leak ads are real ads, even though the 3017 audience reads them as surreal humor.
- **Form PS-900 does not exist.** The compliance contact email doesn't resolve to a mailbox.
- The Ennoi bought the **premium tier**. The auditor AI, trained on the last surviving Ennoi seminary exam, has graded the Hells impartially for 600 years.
- The company is incorporated under the **Second Koreshan Compact** (1912 Galactic Standard, since renumbered), in a jurisdiction on no recognized map, under a legal framework that is a legacy product of a civilization dead ~800 years. Its legal team says this is "entirely in order."
- The bible's summary line: *"Our Hells are run by a CEO who does youth robotics sponsorship. That is our Hells."*

## Voice and usage

- **Corporate posts** (format #306) use handles like `@PersistenceSvc` or `@BrandHallister_CEO`. They are normal 3017 accounts, **no `subspace_anomaly`**. The voice is bland and professional, in quarterly-update language ("eschatological customer retention," "legacy contract portfolio performance"). The posts are completely disconnected from what the company hosts, and they're cheerful about the youth robotics team.
- **In-leak ads** (format #307) come through the hells channel and **do** carry `subspace_anomaly`. The canonical copy: "Is your Hell underperforming expectations? Ask your Eschatological Administrator about upgrading to Hell Plus™ — 40% more dimensions of suffering, or your soul back."
- **Useful reply figures:**
  - the user confused by the compliance footer (archetype #127)
  - the user who has just realized Hell Plus is real (#129: "they're UPSELLING the damned?")
  - Upload Defenders defending "a great product, underrated" (#128)
- Hallister should never be villainous on-platform. The horror is that he's normal.

## Implementation

Format and archetype numbers (#N) are 0-based array indices into `data/meme-formats.json` and `data/reply-archetypes.json` at the time of writing. They will drift as entries are added.

- **Prompt:** `data/system-prompt.txt` ~192–209, within the Hells Leak block. It covers the rebrand chain, Hallister, the robotics sponsorship, ~140 civilizations, the compliance footer, and the pinned reply.
- **Summon tag:** `hells`. The company itself uses #306 (corporate post) and #307 (in-leak ad). There is no dedicated tag.
- **Footer and pinned reply:** the boilerplate is hard-coded in `public/app.js` (`HELLS_COMPLIANCE_FOOTER`, `HELLS_PINNED_REPLY`). The watermark renders as "∞™".
- **No cached bio.** No Persistence Services handle has a cached bio in `corpus/_bios.json` as of this writing. `CLAUDE.md` says bios are cached in `data/bios.json`, but that file doesn't exist.

## Unused material

- **Investor-day deck leaks.** The bible's list of new formats suggests "Brand Hallister the CEO, investor-day deck leaks, etc." Only the generic corporate post exists.
- **The auditor AI** as a character. It rejects Thrrm forms on 800-year-old grounds and possibly has a "warm cache" that affects broadcasts (researcher example). It has never posted.
- **The ~2.1 billion figure** is Persistence Services' own number, unaudited and "almost certainly wrong in both directions."
- **The dormant-contract portfolio:** substrates nobody has looked at in centuries.
- **Teleocorp**, the parent in the "Beyond® — a Teleocorp Company" era, is never explained.

## Discrepancies

- **Rebrand order.** The sources list "Persistence Services, Ltd. (formerly Afterlife Solutions Ltd., formerly EverCorp, formerly 'Beyond® — a Teleocorp Company,' formerly — briefly, disastrously — SoulStack)". The main page reads this as most-recent-first, which makes SoulStack the *earliest* name. It could also be read as SoulStack being a brief, disastrous detour at some other point. Neither source says which.
- **Two different 800s.**
  - The legal framework comes from a civilization that died ~800 years ago.
  - The auditor AI rejects Thrrm forms on grounds "800 years out of date."

  These are probably unrelated, but they look deliberate. Decide.
- **"1912 Galactic Standard" isn't CE.** It's a date in a renumbered galactic calendar. Don't put it on the CE [Timeline](Timeline.md) as 1912.

## Open questions

- When was the company founded, and who was its first client?
- Does Persistence Services ever respond to the Vrellnath report?
- Is Brand Hallister human?
- **Wiki-introduced details**, to adopt or strike:
  - the "promotional tone" maintenance banner and the company's request to reclassify it as fan content
  - "Dates for the rebrands are not publicly available"
  - the claim that the support site doesn't address the fan-content contradiction
