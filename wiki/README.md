# The Wiki

The lore for Memetic Subspace Twitter 3017, organized as a wiki with two main namespaces, modeled on Wikipedia's `Foo` / `Talk:Foo` split:

| Namespace | Path | Voice | Audience |
|---|---|---|---|
| **Main** | `wiki/Foo.md` | Diegetic. Encyclopedia articles written by editors in 3017 CE. | Anyone who wants to know what the world is like. |
| **Talk** | `wiki/Talk/Foo.md` | Out-of-universe. How to use, interpret, and write the material on the matching main page. | Humans and agents editing prompts, data files, or lore. |
| **Source** | `wiki/Source/Foo.md` | Diegetic. Complete in-universe primary documents (papers, proceedings, reports), not articles. | Same as Main. |

Start at [Main Page](Main_Page.md) for the in-universe front door, or [Talk:Main Page](Talk/Main_Page.md) for the out-of-universe overview.

The split is not absolute. Some material doesn't belong cleanly on either side, and it's fine for a main page to contain an in-universe "Cultural references" list or for a Talk page to quote a lot of diegetic text. The rule of thumb: **if a 3017 editor could have written it, it goes on the main page. If only someone who knows it's fiction could have written it, it goes on Talk.**

## Relationship to the runtime

The wiki is the canonical reference for lore. It is **not** loaded at runtime. The model sees only `data/system-prompt.txt`, `data/replies-prompt.txt`, `data/meme-formats.json`, and `data/reply-archetypes.json`. Those files contain compressed versions of the lore described here.

When you add lore:
1. Write it into the wiki: facts on the main page, usage guidance on the Talk page.
2. If the model needs to know it, add a compressed version to the relevant `data/` file.
3. If the wiki and `data/` disagree, note it under `## Discrepancies` on the Talk page. Don't silently "fix" one side.

## Conventions

### Files and links
- Filenames are ASCII `Title_Case_With_Underscores.md`, like Wikipedia URLs. The page's display title (the `#` heading) can contain non-ASCII (`# Glœm` lives in `Gloem.md`).
- Link with relative markdown links: `[The Upload](The_Upload.md)` from a main page, `[The Upload](../The_Upload.md)` from a Talk page.
- Every main page starts with a tab line directly under its title, linking to its Talk page:
  ```
  # The Upload
  *Article · [Talk](Talk/The_Upload.md)*
  ```
  Every Talk page starts with the mirror:
  ```
  # Talk:The Upload
  *[Article](../The_Upload.md) · Talk*
  ```
  The tab line is chrome, like the tabs on a Wikipedia page. It's the only out-of-universe element allowed on a main page.

### Main namespace (diegetic)
- The present is **3017 CE**. Editors write in the present tense about 3017 and the past tense about history.
- The house style is encyclopedic, neutral-point-of-view pastiche, maintained by a multi-species editor base. Wiki furniture is welcome in small doses: hatnotes, `[citation needed]`, maintenance banners ("*The neutrality of this article is disputed by the Vrellnath Collective.*"), `See also`, and the occasional edit-war scar. Don't let the furniture become the joke on every page.
- **Only write what the 3017 record could contain.** If something is contested or unknown in-universe, present it as contested or unknown, even when the Talk page states the truth. Example: the main page for @dril lists "a Keth" as one identity theory among several; `Talk:@dril` says it's correct.
- Respect in-universe naming. The in-universe world doesn't use our production vocabulary: no "Dril Truther" (in-universe he's Marcus DeVance, @TRUTH_SEEKER_2094, "the bird-drone guy"), no "comedy angle," "bit," "the generator," "format," "system prompt," "summon," "incite."
- "Post" is the normal word. "Tweet" is an archaism, used affectionately or historically.
- US English spelling.

### Talk namespace (out-of-universe)
Talk pages use whichever of these sections apply, in this order:
- `## Canon`: the hard facts and guardrails. What is true, what must always or never happen, what must never be explained. This includes truths the main page can't state.
- `## Voice and usage`: how to write posts, replies, and notes involving the subject, with a few examples.
- `## Implementation`: where the subject lives in code and data, including summon tags, incite keys, JSON fields, target frequencies, and rendering.
- `## Unused material`: ideas, lines, and angles that haven't been deployed yet.
- `## Discrepancies`: places where the wiki, `data/`, and `CLAUDE.md` disagree.
- `## Open questions`: undecided canon and TODOs.

### Dates
The present is 3017 CE (see the P1 redate TODO in `CLAUDE.md`). Some older material and some of `data/` still say 3026. The wiki uses 3017. Historical dates (2271, 2901, 2934, and so on) are canon and unchanged. See [Timeline](Timeline.md).
