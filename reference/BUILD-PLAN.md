# Treteone — build plan and Claude Code prompts

The approved mockup is the single-file artifact. Save it into the repo as
`reference/mockup.html` before anything starts — every prompt below refers to it.

The existing repo keeps its foundations: Astro 7, Tailwind 4 via the Vite plugin,
TypeScript strict, CJK font subsetting, the Cloudflare quote function, the payload
budget script, the raster-in-SVG guard. What changes is the presentation layer and
the route structure.

---

## What can actually run in parallel

Not everything. Three streams share one foundation, so the foundation lands first,
alone. After that, three sessions can run at once because each owns a disjoint set
of files.

```
            ┌──────────────────────────┐
            │  STREAM 0 — foundation   │   solo, must finish and merge first
            │  tokens, layout, header, │
            │  footer, placeholder     │
            └────────────┬─────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────▼─────┐    ┌─────▼──────┐   ┌─────▼──────┐
   │ STREAM A │    │  STREAM B  │   │  STREAM C  │
   │ homepage │    │ 4 detail   │   │ brands +   │
   │          │    │ routes     │   │ quote      │
   └──────────┘    └────────────┘   └────────────┘
                         │
            ┌────────────▼─────────────┐
            │  STREAM Z — integration  │   solo
            └──────────────────────────┘
```

**One architectural change makes the parallelism safe.** Split `src/i18n/en.ts` and
`zh.ts` into per-route modules (`src/i18n/en/home.ts`, `en/products.ts`, and so on)
with a barrel file. Without that, all three streams fight over two files on every
commit. Stream 0 does the split.

---

## Setting up the worktrees

From the repo root, in PowerShell:

```
cd C:\Users\Hi\Documents\treteone
git worktree add ../treteone-home   -b feat/home
git worktree add ../treteone-routes -b feat/routes
git worktree add ../treteone-brands -b feat/brands
```

Each gets its own folder and its own branch, sharing one git history. Open three
terminals, `cd` into one folder each, run `claude`. They cannot overwrite each
other's files because they are different folders.

Create these **after** Stream 0 is merged to `main`, so each worktree starts from
the new foundation.

---

# STREAM 0 — foundation (run alone, first)

```
Read CLAUDE.md and reference/mockup.html in full. The mockup is the approved
design and supersedes the current presentation layer. Keep the stack, the build
tooling, the font subsetting, the quote function and the budget script exactly
as they are.

Foundation pass only:

1. src/styles/tokens.css — reconcile with the mockup's :root block. The navy/cyan
   system stays; add the surface, line and neutral tokens the mockup introduces.
   Every colour in the mockup must resolve to a token. Note any mockup value that
   has no token today rather than hardcoding it.

2. src/styles/global.css — the type scale, heading weights, .btn/.pill/.rm link
   styles, .kicker, .lead, .sec/.pale/.navy band classes, and the focus rules.
   Focus: #0369a1 on light surfaces, #67e8f9 on navy, masthead, drawer and hero.
   The current rule targets a class that does not exist in the markup; do not
   reproduce that bug.

3. Split i18n into per-route modules: src/i18n/{en,zh}/{common,home,products,
   industries,sourcing,brands,about,quote}.ts plus a barrel that re-exports them,
   typed so a missing key in zh fails the build. This is required — three parallel
   streams will otherwise collide on two files.

4. src/components/Header.astro — single row: logo slot hard left, nav right, quote
   pill, hamburger below 960px with the drawer. The logo is a fixed 34px-tall slot
   (28px on phones) containing a text wordmark placeholder; an <img> or <svg>
   dropped in must inherit the height without moving the bar. Comment it clearly.

5. src/components/Footer.astro — the compact navy footer from the mockup.

6. src/components/ImagePlaceholder.astro — props: subject (string), variant
   ('wide' | 'small' | 'hero'). Renders the dashed frame, photo mark, "Image" label
   and the subject caption. Every photography slot on the site uses this component,
   so that swapping in real photography later is one component change.

7. Update CLAUDE.md §3 and §6 to match the seven-route structure and the mockup's
   section list. Flag anything in CLAUDE.md the mockup contradicts rather than
   silently rewriting it.

Do not touch any page or any other component this pass.
Run npm run budget and astro check. Report both.
Stop when done.
```

---

# STREAM A — homepage

```
Read CLAUDE.md, reference/mockup.html, and the components in src/components/.
The foundation (tokens, global.css, Header, Footer, ImagePlaceholder, i18n split)
is already merged — use it, do not modify it.

Files you own. Do not edit anything outside this list:
  src/components/RollingHero.astro
  src/components/StatGlance.astro
  src/components/CapabilityGrid.astro
  src/components/EnquiryCards.astro
  src/components/PositionSplit.astro
  src/components/HardToFind.astro
  src/components/BrandMarquee.astro      (presentation only; data comes from src/data/brands.ts)
  src/scripts/rolling-hero.ts
  src/i18n/en/home.ts
  src/i18n/zh/home.ts
  src/data/heroSlides.ts
  src/pages/index.astro
  src/pages/zh/index.astro

Build the homepage exactly as the mockup has it:

  1  RollingHero — full-bleed, flush under the masthead, no side margins.
     Height clamp(400px,52vh,540px); phones get aspect-ratio 3/4, min 430px.
     Four slides. Overlay bottom-left inside a container that aligns with the
     page gutter. Eyebrow, rotating title, one line, one text link whose target
     changes per slide. Tab bar below the image, inside the same container:
     pause button plus four 40px progress segments with labels.
     Below 700px: one segment only, full width, labels visually hidden.
  2  Positioning split — media with the cyan offset block, copy alongside.
  3  "Three ways an enquiry arrives" — three cards, each an image placeholder,
     heading, three lines, "Read more". Keep the line stating these are
     illustrative and name no client.
  4  "Treteone at a glance" — four figures on the pale band. Real values only.
     12 and 9 count up when scrolled into view, with the real number in the HTML.
  5  Capability grid — eight items, each a small image placeholder, a heading
     written as noun-plus-clause, three lines.
  6  Hard-to-find navy band — copy left, numbered "what to send" list right.
  7  Brand marquee — two rows, opposite directions, pause on hover, edge fades.
  8  "About our work" — two cards on the pale band.

Rules:
- The hero is a tablist with real tab panels and roving tabindex.
- Everything freezes under prefers-reduced-motion; the hero rests on slide one
  with the play icon showing.
- Nothing animates into existence that was not already readable. Reveals apply
  only to grids that start below the fold.
- All copy through src/i18n/en/home.ts and zh/home.ts. No hardcoded strings.
- Every photography slot uses the ImagePlaceholder component with its real
  subject caption.

Run npm run budget and astro check. Report / and /zh/.
Commit to feat/home. Stop when done.
```

---

# STREAM B — products, industries, sourcing, about

```
Read CLAUDE.md, reference/mockup.html, and src/components/. The foundation is
merged — use it, do not modify it.

Files you own. Do not edit anything outside this list:
  src/components/IndexRows.astro
  src/components/ScopeSteps.astro
  src/components/ProcessSteps.astro
  src/components/DefinitionGrid.astro
  src/components/PageHead.astro
  src/i18n/{en,zh}/{products,industries,sourcing,about}.ts
  src/data/categories.ts
  src/data/industries.ts
  src/data/process.ts
  src/data/scope.ts
  src/pages/{products,industries,sourcing,about}.astro
  src/pages/zh/{products,industries,sourcing,about}.astro

Build four routes from the mockup:

/products    12 categories as index rows: number, name, mono spec line, Enquire.
             Then the navy five-step scope band, component to complete system.

/industries  9 sectors as index rows. The spec line names the duty data that
             decides the answer — area classification and sour service for oil
             and gas, abrasion and solids content for mining, and so on. That
             vocabulary is the point; keep it exactly.

/sourcing    Four definition blocks: superseded references, nameplate data,
             form-fit-function equivalents, documentation. Then the navy "what
             to send" band, then the five-step process.

/about       Six definition blocks, then the registered-details band on pale:
             registered name (Guangzhou Treteone Trading Co., Ltd.), enquiries,
             registered address in both scripts.

Rules:
- IndexRows is one component used by both /products and /industries. It collapses
  to two columns below 960px with the spec and action stacking under the heading.
- Every detail route opens with the same PageHead (kicker, h1, lead) so the six
  pages read as one product.
- All copy through i18n. Data through src/data/.
- Do not invent a business licence number, a reply time, or any figure.

Run npm run budget and astro check. Report all eight routes.
Commit to feat/routes. Stop when done.
```

---

# STREAM C — brands and quote

```
Read CLAUDE.md, reference/mockup.html, and src/components/. The foundation is
merged — use it, do not modify it.

Files you own. Do not edit anything outside this list:
  src/components/BrandDirectory.astro
  src/components/QuoteForm.astro
  src/scripts/brand-filter.ts
  src/scripts/quote-form.ts
  src/i18n/{en,zh}/{brands,quote}.ts
  src/data/brands.ts
  src/pages/{brands,quote}.astro
  src/pages/zh/{brands,quote}.astro
  public/form-response.css
  functions/  (quote endpoint — logic unchanged, see below)

/brands — one filterable directory, not three fixed blocks.
  - src/data/brands.ts: each brand gets name, slug, group
    ('auto' | 'rotating' | 'fluid'). Pepperl+Fuchs belongs in 'auto'.
  - Four chips with live counts, plus a search input filtering on name.
  - The full grid renders in HTML; the script only hides. It must work with
    JavaScript disabled.
  - No match shows the panel saying that does not mean we cannot source it,
    linking to the enquiry form. Never an empty grid.
  - Logo tiles resolve at build time by reading public/logos/ — a dashed name
    tile when no file exists. No <img onerror>; the CSP forbids the workaround.
  - The build refuses a raster wrapped in an SVG and names the file.
  - The count announces politely when filtered.
  - Trademark disclaimer stays. Wording stays "Brands we source".

/quote — restyle only. The form logic, validation, honeypot, timing flag,
  reference format and the Cloudflare function all stay exactly as they are.
  - 20 MB total attachment cap stays. Only the contact field is required.
  - Works without JavaScript; public/form-response.css gets the new palette.
  - Success state uses --feedback-success. That is what the token is for.

Run npm run test:quote, npm run budget and astro check. Report all four routes.
Commit to feat/brands. Stop when done.
```

---

# STREAM Z — integration (run alone, last)

```
Merge feat/home, feat/routes and feat/brands into main, in that order, resolving
any conflict in favour of the mockup.

Then verify the whole site:
- Every internal link resolves on all 14 routes, anchors included. No 404s.
- Sitemap lists all 14. hreflang x-default is correct.
- No superseded colour anywhere in src/, public/ or functions/. Grep for the
  amber and graphite values and the old token names.
- Zero external hosts in dist/. Zero inline styles, scripts or event handlers,
  so the default-src 'self' CSP needs no exception. Confirm
  vite.build.assetsInlineLimit is still 0 and say why in the README.
- postcss.config.mjs does not exist.
- Font subset verify passes. Report the CJK glyph count.
- npm run budget for all 14 routes against the 1.5 MB mobile gate.
- Focus ring visible on every interactive element on both light and navy.
- Scroll through in a real browser, not headless — the reveal transitions do not
  run under a simulated clock.

Report what you could not verify rather than claiming it passed.
```

---

## Still outstanding — not code

These block launch, and no prompt above can produce them:

| Item | Where it goes |
|---|---|
| Business licence number | Footer and /about |
| 20+ real photographs | Every ImagePlaceholder carries its subject |
| Logo artwork, SVG with real vector paths | `public/` for the header, `public/logos/` for brands |
| Which brands may be shown as logos at all | /brands |
| A reply-time commitment you can keep | Currently stated nowhere, which is honest |
| Chinese copy reviewed by a native speaker | All of `src/i18n/zh/` |
| Resend account, domain verified, SPF and DKIM | `RESEND_API_KEY`, `QUOTE_FROM`, `QUOTE_TO` |

The licence number and photographs of your own operation do more for the "are
these people real?" test than anything in the build.
