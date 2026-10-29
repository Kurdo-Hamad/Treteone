# Trete One

Marketing site for Trete One, an industrial supply and sourcing company in
Guangzhou, China. Built to the spec in [`CLAUDE.md`](./CLAUDE.md); the approved
single-file prototype is in [`reference/index.html`](./reference/index.html).

Astro 7 · TypeScript 6 (strictest) · Tailwind 4 via `@tailwindcss/vite` ·
static output · Cloudflare Pages.

---

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Static build into `dist/`. Runs the two font steps below around it. |
| `npm run preview` | Serve `dist/` locally |
| `npm run check` | `astro check` — TypeScript + template diagnostics |
| `npm run budget` | §8 first-load payload check against the 1.5 MB budget (run after a build) |
| `npm run fonts:sc` | Rebuild the Noto Sans SC subset. Add `-- --force` to rebuild unconditionally. |
| `npm run placeholders` | Regenerate the §10 placeholder plates (hero and product cards) |

`npm run build` is three steps, wired through npm's `prebuild`/`postbuild`, so
they also run on Cloudflare:

1. **`prebuild`** — `subset-noto-sans-sc.mjs` builds the CJK font from the copy
   in `src/`. No-ops when the glyph set has not changed.
2. **`build`** — `astro build`.
3. **`postbuild`** — `verify-noto-sans-sc.mjs` reads the rendered HTML and
   **fails the build** if any CJK glyph on the page is missing from the subset.

There is **no `postcss.config.mjs`** and there must never be one — see
CLAUDE.md §2 for what that cost on MesoAxis. Tailwind is registered as a Vite
plugin only.

Two build settings exist solely to keep the strict CSP satisfiable, and removing
either silently breaks it — **`build.inlineStylesheets: 'never'`** and
**`vite.build.assetsInlineLimit: 0`**. See "Why `assetsInlineLimit: 0`" below.

---

## Build status

**Passes 1 and 2 are complete.** Sections of CLAUDE.md §6 built so far:

| § | Section | Notes |
|---|---|---|
| 1 | `Header` | sticky, transparent over the hero, mobile drawer |
| 2 | `RollingHero` | 5 frames, 6s crossfade, counter, captions, progress bars |
| 3 | `Ticker` | amber strip, hover pause — **no JavaScript at all** |
| 4 | `StatBand` | count-up on first view; reply time marked unconfirmed (§10) |
| 5 | `ProductRail` | 12 cards, drag / scroll / arrow keys, snap, progress bar |
| 13 | `Footer` | both address forms, copy button, §10 placeholders |

Not built yet — sections 6–12: `ScopeScroller`, `IndustryPicker`,
`SourcingBand`, `BrandMarquee`, `ProcessTimeline`, About, `QuoteForm`.

Because of that, **`#scope`, `#industries`, `#sourcing`, `#brands`, `#about` and
`#quote` still jump nowhere.** `#products` now resolves. Every "Request a quote"
CTA — including the two hero buttons and all 12 rail cards — points at `#quote`,
which does not exist until §12 lands.

### Verified, not assumed

- `npm run check` — 31 files, 0 errors, 0 warnings, 0 hints.
- No external host is referenced anywhere in `dist/` — no `googleapis`, no
  `gstatic`, no CDN. `grep -r googleapis src public` must stay empty.
- No inline `<style>`, no `style="..."` attribute and no inline event handler in
  the output, so the `default-src 'self'` CSP in `public/_headers` needs no
  `'unsafe-inline'`. This required `vite.build.assetsInlineLimit: 0`; Astro
  otherwise writes small hoisted scripts straight into the document.
- All 212 local paths referenced by the two HTML documents and their CSS exist
  in `dist/`. No duplicate `id` on either page.
- Every colour in the emitted CSS resolves through a token — each brand hex
  appears exactly once, in the token block. No component hardcodes a colour.
- Payload, 412px viewport at 2× DPR: **`/` = 608 KB, `/zh/` = 608 KB** against
  the 1.5 MB budget — 40%. 162 KB of that is rail cards that are only fetched
  as the rail is scrolled.
- `global.css` compiles to 32 KB. MesoAxis reached ~135 KB.
- The font verification **actually fails**. Tested end to end: Chinese copy
  routed into a page from a file type the source scan does not read exits
  `npm run build` with code 1 and names the glyph and the page.

---

## Approved addition to §2: `subset-font`

`subset-font` is a devDependency and the first approved addition to the locked
stack. CLAUDE.md §2 now carries a pointer to this section so it does not get
re-flagged.

**What it replaced.** Google serves Noto Sans SC as 101 unicode-range subsets.
Self-hosting those meant 4.6 MB of font files in the repo, a 100 KB
render-blocking stylesheet, and 691 KB fetched on the Chinese route for ~150
characters — 73% of the §8 budget with three components built, and rising with
every section.

**What it does now.** `scripts/subset-noto-sans-sc.mjs` reads every character in
`src/**/*.{ts,astro,js,mjs}`, keeps the CJK ones, and builds a single font file
holding exactly those glyphs.

Measured on the same content, at the end of pass 1:

| | Before | After |
|---|---|---|
| Font fetched on `/zh/` | 691 KB (12 of 101 files) | **64.7 KB** (1 file) |
| CSS | 100.4 KB | **2.9 KB** |
| Files in the repo | 98 | **1** |
| `/zh/` first load | 1121 KB (73% of budget) | **397 KB (26%)** |

Pass 2 added three sections of Chinese copy, so the subset grew with it — it is
now **332 glyphs / 82.0 KB**, with a 3.4 KB stylesheet. That growth is the
point: the font tracks the copy instead of shipping a fixed 4.6 MB.

Three implementation notes worth knowing before touching it:

- **The subset is CJK-only.** Noto Sans SC is last in both stacks (§4), so Latin
  is drawn by General Sans or Roboto and never by this face. Excluding Latin
  cut roughly a third off the file, and means one set of codepoints defines the
  font's contents, its `unicode-range`, and what the verify step enforces. They
  cannot drift. `scripts/cjk-ranges.mjs` is that shared definition.
- **It stays variable, narrowed to 400–700.** Measured: one variable file cost
  105 KB against ~60 KB per pinned weight, and the Chinese route draws 400, 500
  and 600 — so three pinned files would have been ~180 KB. (Measured before the
  CJK-only change; the ratio is what matters.)
- **The ~10 MB source font is not committed.** It is cached under
  `node_modules/.cache/` and re-fetched only when the glyph set changes, so a
  normal build needs no network.

**Failing loudly, as approved.** `scripts/verify-noto-sans-sc.mjs` runs as
`postbuild`, reads every `.html` in `dist/` — text and attribute values — and
exits non-zero if a CJK codepoint on the page is not in the subset:

```
verify-noto-sans-sc: FAIL — 1 glyph(s) rendered that the subset does not contain.
  鑫  U+946B  in index.html
```

Nothing falls back to a system CJK face silently. The subset is derived from
source because the font must exist before Astro renders; this check closes the
loop from the rendered output.

**Consequence worth noting:** the CJK font is now linked on *both* routes, not
just `/zh/`. It was `/zh/`-only because 100 KB of stylesheet was too much to
carry for the one Chinese line in the English footer. At 2.9 KB of CSS plus a
CJK-only `unicode-range` that reason is gone, and the English footer address now
renders in the brand face. One line in `Base.astro` if you want it reverted.

---

## Pass 2 notes

### The reply-time figure is marked, not stated

§10 lists the real reply-time commitment as still missing, so the fourth stat
renders as a marked placeholder rather than a claim: an amber dashed
**UNCONFIRMED** chip at label size, with the prototype's "1 working day" beneath
it in muted grey at a deliberately smaller size than a real figure, plus a
screen-reader-only line reading "This figure has not been confirmed and is not a
commitment."

The slot and the layout are therefore right, and nobody can screenshot the
number as a promise. Flipping it to fact is one field —
`confirmed: true` in `src/data/stats.ts` — and it is a decision about the
business, not about the site.

The other three are real: **12** and **9** are counted from
`src/data/categories.ts` and `src/data/industries.ts` rather than typed in, so
the band cannot claim more than the site actually lists.

### `src/data/industries.ts` exists before the IndustryPicker does

The StatBand claims "9 industries served". Writing `9` into a component would be
a number with nothing behind it, so the nine industries are now a data module
and the stat is `industries.length`. The picker (§6.7) still is not built; the
module has no `image` field yet because §10 has not supplied that photography.

### The ticker ships zero JavaScript

Hover-pause and the reduced-motion freeze are both CSS. It is `aria-hidden`
because it says nothing the page does not already say — the same twelve names
are in the rail below it and in the footer, and a marquee is a poor way to hear
a list.

### Rail cards are articles with a stretched link, not wrapped anchors

The prototype wraps each card in one `<a>`. Here the card is an `<article>` and
the link sits on "Enquire", stretched over the card by a pseudo-element. That
keeps the category name a real `<h3>` instead of burying a heading inside a
link, and gives each link one clean accessible name — "Automation & Control —
send an enquiry" — rather than the card's entire text read as a link label.

### The rail's drag is mouse-only

Touch and pen already get native horizontal scrolling with momentum and
rubber-banding. Reimplementing that in JavaScript fights `touch-action` and
comes out worse, and §11 makes the phone the primary visitor — so the phone
keeps the behaviour it is good at. `pointerType !== 'mouse'` returns early.

A drag past 8px is swallowed on the way to `click`, so dragging across a card
and releasing does not follow that card's link.

### Everything degrades without JavaScript

- The rail scrolls natively — touch, trackpad, wheel and Tab all work. The
  prev/next buttons stay hidden until the script has run, because unscripted
  they would sit there doing nothing.
- Every stat is in the HTML at its final value. The count-up is decoration.
- `.rv` content is only hidden once `src/scripts/reveal.ts` has added
  `js-reveal` to `<html>`. If that bundle 404s, nothing disappears. The script
  also marks anything already on screen as revealed *before* hiding the rest,
  so content the visitor is already looking at never blinks.

### `npm run budget` now reads `sizes`

It was costing rail cards at their 1020w rendition because the candidate picker
assumed `sizes="100vw"`. It now resolves the `sizes` attribute against the test
viewport, which is the difference between 1020w and the 680w a phone really
fetches — about 84 KB, or 25% of the image weight. Worth knowing if you compare
against numbers from the previous pass.

---

## Decisions applied

Recorded here because CLAUDE.md now reflects them and the reasoning should not
be lost.

### Two colours added to §5

`--ink-3: #0F1215` (hero bed, footer ground) and `--white: #FFFFFF` (card and
marquee grounds, text on dark). Both were already in the approved prototype;
they are now named tokens in §5 rather than undeclared values.

### Text on dark raised from `.42` to `.50`

**The prototype fails AA at that point.** `rgba(255,255,255,.42)` on `--ink`
measures **4.34:1**, below the 4.5:1 needed for normal text, and the prototype
uses it for the footer legal line. The scale now bottoms out at `.50`
(**5.05:1**) and nothing is quieter. Recorded in §5 so it is not reintroduced.

### The amber interpunct stays

§9 now says the rule covers text a person needs to read, and exempts a
decorative `aria-hidden` separator inside the logotype. Not a finding in future
passes.

### Four files added to §3's tree

`src/layouts/Base.astro`, `src/i18n/ui.ts`, `src/data/company.ts`,
`src/data/hero.ts`, plus the root `scripts/` build tooling. §3 also now warns
against confusing root `scripts/` (Node, build-time) with `src/scripts/`
(vanilla JS, shipped).

### Why `assetsInlineLimit: 0`

**Do not remove this.** Astro decides whether to write a hoisted `<script>`
straight into the document by reading *Vite's* resolved `assetsInlineLimit`, not
Astro's — see `astro/dist/core/build/plugins/plugin-scripts.js`. At the default,
all three of this site's scripts were small enough to be inlined, which cannot
satisfy `script-src 'self'`: a static `_headers` file cannot compute a hash or
issue a nonce. Setting it to `0` forces every script out to its own file.

The symptom if it is removed is not a build error. The build succeeds, the site
looks fine locally, and the scripts are silently blocked in any browser that
enforces the CSP. `build.inlineStylesheets: 'never'` is the same trap for
stylesheets. Both are commented in `astro.config.mjs`.

---

## Still open

### DM Sans and Roboto Mono (§4)

Left open, as instructed. Both are recorded under "Open conflicts" below.

### Conventions worth confirming before ten sections depend on them

- **Where copy lives.** UI chrome (nav labels, buttons, hero, footer headings)
  is in `src/i18n/{en,zh}.ts`, typed so `zh.ts` cannot compile with a key
  missing. Copy that belongs to a data record — a category name, an industry
  blurb — is a `Localised` field on the record in `src/data/`, because §3
  requires one definition to drive the nav, the rail and the footer at once.
  No component holds a string either way. Both locations are read by the font
  subsetter, so either is safe for Chinese copy.
- **`site` is set to `https://treteone.com`** in `astro.config.mjs`, which the
  canonical URLs, the hreflang alternates and the sitemap all derive from.
  Confirm the production domain.

---

## Open conflicts carried forward from §4

These are the register-versus-code conflicts CLAUDE.md §4 says to raise rather
than resolve. Neither is resolved here; the code follows §4's locked table.

- **MX-BCS-001 §11.1 specifies DM Sans 500 for headings. The code uses General
  Sans.** §4's own table locks General Sans and this build uses it, so the
  register is what is out of date — but nobody has updated it. Decide whether
  the register changes or the site does.
- **The register specifies Roboto Mono 400. The stack falls back to system
  mono.** §4's mono row is `ui-monospace, SFMono-Regular, Menlo, Monaco,
  Consolas, monospace`, which is what is implemented. If Roboto Mono is
  actually wanted, it is a fourth self-hosted family and a payload decision —
  see item 1 above.

---

## Content still missing (§10)

Nothing below has been invented. Each renders as a marked placeholder or is
simply absent.

| Item | Status |
|---|---|
| Registered Chinese company name | `PENDING` in `src/data/company.ts`. Renders in the footer as an amber dashed "TO BE SUPPLIED" chip. |
| Business licence number | Same. |
| Real photography — office, staff, goods packed, equipment handled | **17 images pending.** Five hero frames (`src/assets/hero/hero-0N.jpg`, ≥2400px) and twelve product cards (`src/assets/products/<slug>.jpg`, ≥1200px). All are generated plates reading "PHOTOGRAPH PENDING" plus the subject the real photograph should show. Drop the real file in at the same path — nothing else changes. |
| Brand logo files, and which brands may be shown as logos at all | `public/logos/` is empty. `BrandMarquee` is pass 2 and needs both the files and the answer to the second half of that question. |
| Real reply-time commitment | `StatBand` is built. The figure renders as a marked **UNCONFIRMED** placeholder, never as a fact — see "Pass 2 notes". Set `confirmed: true` in `src/data/stats.ts` once the business has committed to a number. |
| Professionally written Chinese copy | `src/i18n/zh.ts` and the `zh` fields in `src/data/*.ts` are the prototype's first pass, carried over unchanged and marked as such in the file headers. Needs a native-speaker review. |
| Open Graph image | Deliberately absent rather than fabricated. `summary` card only until there is a real photograph. |
| Favicon | `public/favicon.svg` is provisional — a "T" and the amber dot, real vector paths, no raster. Replace if there is a real mark. |
| Font licence texts | See `public/fonts/LICENSES.md`. The OFL *requires* its text to ship with Noto Sans SC. |
| Legacy URLs | `public/_redirects` is empty. If a previous site exists, map its paths before launch — a 404 on a URL a buyer already has is a lost enquiry. |

---

## Deploying

Cloudflare Pages, per §8:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `npm run build` |
| Build output | `dist` |
| `NODE_VERSION` | `22` |

Cloudflare runs `npm clean-install`, which fails if `package-lock.json` and
`package.json` disagree — commit the lockfile with every dependency change.

**Check the Cloudflare build log after every deploy.** A green site is not a
green build; on MesoAxis every deploy failed for two months while the last good
build kept serving.

One npm note: `package.json` carries an `allowScripts` entry for `esbuild`.
npm 11 gates install scripts behind approval; esbuild's postinstall places its
platform binary, and the build cannot run without it. Older npm ignores the
field. Re-approve with `npm approve-scripts esbuild` if esbuild's version moves.

### Still to verify before launch

- Load times measured from inside mainland China (§8). Not yet done.
- ICP filing, if hosting moves inside mainland China.
- Lighthouse: performance ≥ 90 mobile, accessibility 100. Not yet measured —
  worth doing once there is a section below the fold to scroll to.
- `Strict-Transport-Security` is set without `preload`. Adding `preload` commits
  the domain to the HSTS preload list and is painful to undo, so it is a
  deliberate opt-in, not a default.

---

## Notes for whoever builds pass 2

- `src/data/categories.ts` holds all 12 categories with both languages and
  their photography. The footer, the ticker and the rail all read that one
  array. `src/data/industries.ts` holds the 9 and already feeds the StatBand;
  the IndustryPicker can read it as-is.
- Scroll reveal is live: mark a block `.rv` and `src/scripts/reveal.ts`, loaded
  once from `Base.astro`, handles the rest. Do not import it per component.
- Dark sections get `class="dark-surface"`, which flips the foreground role
  tokens and the focus-ring colour in one place. Do not restate colours.
- Component media queries use 720px and 1040px. Those are the only two
  breakpoints the site has; they are documented in `tokens.css`.
- Never set a `style` attribute, and never `setAttribute('style', …)` — both are
  blocked by the CSP. Assigning `el.style.foo` from script is fine.
- **Adding Chinese copy needs nothing extra.** Put it in `src/i18n/zh.ts` or in a
  `Localised` field under `src/data/`; the next build picks the new glyphs up
  and rebuilds the font. You will see `noto-sans-sc: glyph set changed,
  rebuilding…` — commit the regenerated `public/fonts/noto-sans-sc.*`.
- If the build ever stops with `verify-noto-sans-sc: FAIL`, the copy reached the
  page from somewhere the source scan does not read — a `.json`, a `.md`, an API
  response. Move it into a scanned file rather than widening the subset by hand.
- Re-run `npm run budget` at the end of each pass. The §8 headroom is real now
  (26% used), but ten sections of photography is what spends it.
