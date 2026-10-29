# Trete One — website build spec

Reference implementation: `reference/index.html` (single-file prototype, already approved).
Build the real site to match it. Where this file and the prototype disagree, this file wins.

---

## 1. What this is

Marketing site for Trete One, an industrial supply and sourcing company in Guangzhou, China.
Audience: maintenance engineers and procurement buyers at plants worldwide.

The site has two jobs:
1. Make a buyer who has never heard of the company send an enquiry.
2. Survive the "are these people real?" check.

Anything that doesn't serve those two jobs doesn't get built.

---

## 2. Stack

Locked. Same as the MesoAxis site. No frameworks, no SSR, no adapters, no CMS,
no backend systems beyond the single form function in §7, without written approval.

| Layer | Technology | Version |
|---|---|---|
| Site framework | Astro | `^7.0.6` |
| Language | TypeScript (strict) | `^6.0.3` |
| Styling | Tailwind CSS | `^4.3.0` |
| Tailwind integration | `@tailwindcss/vite` | `^4.3.3` |
| Sitemap | `@astrojs/sitemap` | `^3.7.3` |
| Runtime | Node.js | `>=22.12.0` |
| Package manager | npm | — |
| Hosting | Cloudflare Pages | — |

**Approved additions to the locked stack.** One so far: `subset-font`, a
devDependency that builds the Noto Sans SC subset at build time. Approved and
recorded in the README under "Approved addition to §2" — it is not a finding.
Anything else still needs written approval.

- **Output mode: static.** `astro build` produces plain HTML into `dist/`.
- **No UI framework.** No React, Vue, Svelte, Solid or Preact. Every component is a
  `.astro` file that compiles to HTML. No hydration, no framework runtime in the browser.
- **Tailwind registers as a Vite plugin only**: `vite: { plugins: [tailwindcss()] }`.
- **NEVER create `postcss.config.mjs`.** On the MesoAxis site a PostCSS config using
  `@tailwindcss/postcss` caused Vite's `postcss-import` to treat `@import "tailwindcss"`
  as a literal file path. Every deploy failed with ENOENT while Cloudflare kept serving
  the last good build, so the site looked healthy for two months. A green site is not a
  green build. Check the Cloudflare build log after every deploy.
- **JS is vanilla**, small modules, one per interactive component, loaded per page.
- **i18n**: Astro i18n routing — `/` English, `/zh/` Chinese. Not a client-side text swap.
  The prototype's `data-en`/`data-zh` attributes were a prototype shortcut and must be
  replaced with real localised routes so each language is separately indexable.
- Deploy target: see §8.

---

## 3. Structure

Content lives in typed TypeScript modules under `src/data/`, not in a CMS and not in
content collections — same pattern as the MesoAxis `serviceFamilies.ts`. One definition
drives the nav, the rail, the footer and any future detail page at once.

```
src/
  data/
    categories.ts      the 12 product categories — drives rail, footer, ticker
    industries.ts      the 9 industries
    brands.ts          the brand list
    scope.ts           the 5 component-to-system stages
    process.ts         the 5 sourcing steps
    navigation.ts      nav structure
    company.ts         contact, both address forms, the §10 placeholders
    hero.ts            the 5 hero frames
  i18n/
    en.ts  zh.ts       all UI copy, typed against a shared key union
    ui.ts              Lang type, useTranslations, localisePath, hreflang alternates
  layouts/
    Base.astro         the document shell — head, header, main, footer
  styles/
    tokens.css         single source of truth — colour, type, spacing
    global.css         imports tokens, then Tailwind; @font-face; @theme bridge
  components/
    Header.astro         RollingHero.astro
    Ticker.astro         StatBand.astro
    ProductRail.astro    ScopeScroller.astro
    IndustryPicker.astro SourcingBand.astro
    BrandMarquee.astro   ProcessTimeline.astro
    QuoteForm.astro      Footer.astro
  scripts/             one vanilla JS module per interactive component
  assets/              source photography — Astro derives AVIF/WebP at build
    hero/              hero-0N.jpg
    products/          <category slug>.jpg
  pages/
    index.astro
    zh/index.astro
public/
  fonts/               General Sans, Roboto, Noto Sans SC — all self-hosted WOFF2
  logos/               brand logos, slug.svg
  img/                 real photography
  _headers             security headers
  _redirects           any legacy URLs
scripts/               build tooling, run by npm — not shipped to the browser
  subset-noto-sans-sc.mjs   prebuild: builds the CJK subset from src/ copy
  verify-noto-sans-sc.mjs   postbuild: fails the build on an uncovered glyph
  cjk-ranges.mjs            the CJK ranges both of the above share
  check-budget.mjs          the §8 first-load payload check
  make-placeholders.mjs     §10 placeholder plates, hero and product cards
```

Do not confuse `scripts/` at the repo root with `src/scripts/`. The root one is
build tooling that runs in Node; `src/scripts/` is the vanilla JS that ships.

**Styling rules, in order:**
1. `tokens.css` defines everything as CSS custom properties on `:root`.
2. `global.css` imports tokens, then Tailwind, then bridges tokens into Tailwind via an
   `@theme` block so utilities like `bg-surface-page` resolve to brand values.
3. Component-scoped `<style>` blocks inside `.astro` files for anything local.

Arbitrary hex values in components are prohibited. Everything routes through tokens.

No hardcoded UI strings in components — all copy comes from `src/i18n/`.
Keep `global.css` lean; on MesoAxis it reached ~135 KB and is render-blocking on every route.

---

## 4. Typography (locked)

| Role | Stack |
|---|---|
| Display / headings | `"General Sans", Arial, sans-serif` |
| Body / forms / links | `"Roboto", sans-serif` |
| Mono | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` |
| Chinese | `"Noto Sans SC"` appended to both text stacks |

General Sans self-hosted, weights 400/500/600/700, `font-display: swap`.

Size tokens:

```
--meso-fs-h1        clamp(2.75rem, 2.13rem + 2.63vw, 4.5rem)
--meso-fs-h2        clamp(1.75rem, 1.49rem + 1.13vw, 2.5rem)
--meso-fs-h3        1.125rem
--meso-fs-body      clamp(1.125rem, 1.05rem + 0.34vw, 1.35rem)
--meso-fs-hero-lead clamp(1.125rem, 1rem + 0.5vw, 1.375rem)
```

Tracking: display `-0.035em` · h1 `-0.025em` · h2/h3 `-0.015em` · body `0` · mono `0.02em`
Line height: display `1.08` · h1 `1.12` · h2/h3 `1.2` · body `1.62` · mono `1.42`

Chinese overrides: line-height `1.85`, letter-spacing `0` on headings, no italics.

**Open conflicts — do not resolve silently, raise them:**
- MX-BCS-001 §11.1 specifies DM Sans 500 for headings. The code uses General Sans. The register was never updated.
- The register specifies Roboto Mono 400. The stack falls back to system mono.

---

## 5. Colour

```
--ink      #16191C     --ink-2  #1E2327
--ink-3    #0F1215     --white  #FFFFFF
--steel    #6B7178     --paper  #F7F7F5
--signal   #F2A900
--rule     rgba(22,25,28,.14)
--rule-dark rgba(255,255,255,.15)
```

`--ink-3` is the deepest ground — the hero bed and the footer, one step below
`--ink`. `--white` is the card and marquee ground, and text on dark. Both were
already in the approved prototype and are now named so they stop reading as
undeclared values.

Text on a dark ground bottoms out at `rgba(255,255,255,.50)`, which measures
5.05:1 on `--ink`. Nothing quieter. The prototype's `.42` legal line measures
4.34:1 and fails AA — the prototype is wrong at that point, not §9.

Amber is the only accent. No second accent colour, no gradients as decoration,
no drop shadows except the floating quote button.

---

## 6. Sections, in order

Match the prototype's behaviour exactly.

1. **Header** — sticky, transparent over the hero, solid after. Mobile drawer.
2. **RollingHero** — full-viewport, 5 photos, 6s crossfade with slow zoom. Frame counter, localised caption, progress bars. Pauses under `prefers-reduced-motion`.
3. **Ticker** — amber strip, category names, pauses on hover. `aria-hidden`.
4. **StatBand** — dark, numbers count up on first view. Only real numbers.
5. **ProductRail** — horizontal, drag / scroll / arrow keys, snap points, progress bar. 12 photo cards.
6. **ScopeScroller** — sticky image left, 5 stages scrolling right, image and corner tag swap per stage. Stacks on mobile.
7. **IndustryPicker** — 9 names, photo panel swaps on hover, click and keyboard focus. Real `tablist` semantics.
8. **SourcingBand** — dark, photo plate plus the "what to send" checklist.
9. **BrandMarquee** — two rows, opposite directions, pause on hover. Missing logo falls back to a dashed name tile. Disclaimer below.
10. **ProcessTimeline** — 5 steps, amber line fills on scroll.
11. **About** — 6 points left, sticky portrait photo right.
12. **QuoteForm** — dark. See §7.
13. **Footer** — registered name, licence number, both address forms, copy button.

---

## 7. Quote form

The only conversion point on the site. It must work.

- Fields: type, part number/description, manufacturer, quantity, attachments, notes, name/company, contact.
- **No account, ever.**
- Attachments: PDF, images, Excel. Max 10 MB per file, 5 files. Validate type and size client and server side.
- Backend: POST to a serverless function that emails `info@treteone.com` with attachments and replies with a reference number. Store nothing beyond the email unless a CRM is added later.
- Spam: honeypot field plus a timing check. Do not use a CAPTCHA — engineers on plant networks abandon them.
- Success and failure states are in-page, never a redirect. Show the reference number.
- Both languages.

---

## 8. Hosting and delivery

The audience includes mainland China. This drives several decisions:

- **Self-host every font.** Google Fonts is unreachable from mainland China; the prototype's `fonts.googleapis.com` link must go.
- No Google Maps, Google Analytics, YouTube embeds, or any `gstatic` asset.
- Serve images as AVIF with WebP fallback, sized and lazy-loaded below the fold.
- If hosting inside mainland China, an ICP filing is required. If hosting outside, verify load times from China before launch.
- Lighthouse targets: performance ≥ 90 mobile, accessibility 100.

**Cloudflare Pages settings**

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `npm run build` |
| Build output | `dist` |
| `NODE_VERSION` | `22` |

Cloudflare runs `npm clean-install`, which fails if `package-lock.json` and
`package.json` disagree. Commit the lockfile with every dependency change.

`public/_headers` carries the security headers: `X-Content-Type-Options: nosniff`,
`X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`,
`Permissions-Policy: camera=(), microphone=(), geolocation=()`,
`Strict-Transport-Security`, and a `Content-Security-Policy` of `default-src 'self'`
with scoped exceptions and `frame-ancestors 'none'`.
No inline `onclick` handlers anywhere — they break the moment CSP is tightened.

**Asset weight is the thing that goes wrong.** On MesoAxis it produced a 10.2 MB mobile
payload and a 6.0 s LCP on an otherwise perfect architecture. So:

- Every `.svg` must contain real vector paths. A base64 raster inside an SVG wrapper is
  not a vector — the MesoAxis header logo is 462 KB of exactly that, on all 35 pages.
  Check before committing any logo or icon.
- Hero images: AVIF, sized to the breakpoint, first frame eager and the rest lazy.
- No video without compression and a WebM alternative. `preload="metadata"` at most.
- Budget: under 1.5 MB total on first mobile load. Check it, don't assume it.

---

## 9. Accessibility floor

- Visible keyboard focus everywhere. The product rail and industry picker are fully keyboard-operable.
- `prefers-reduced-motion` freezes the hero, ticker, marquees, count-ups and reveals.
- Colour contrast AA minimum. Amber on ink passes; amber on white does not — never use amber
  for text on light. The rule is about text a person needs to read. A decorative,
  `aria-hidden` separator inside the logotype — the amber interpunct in TRETE·ONE — is exempt
  and is not a finding. Nothing that carries meaning gets that exemption.
- Text on dark stops at `rgba(255,255,255,.50)`. See §5.
- Every image has a real `alt`, or `alt=""` if decorative.
- `lang` attribute correct per route.

---

## 10. Content still missing

Do not invent any of this. Leave a clearly marked placeholder and list it in the README.

- Registered Chinese company name and business licence number
- Real photography — office, staff, goods packed, equipment handled
- Brand logo files, and confirmation of which brands may be shown as logos at all
- Real reply-time commitment (the prototype claims 1 working day)
- Professionally written Chinese copy. The prototype's Chinese is a first pass and must be reviewed by a native speaker.

---

## 11. Rules

- Never claim authorised distributor, agent or partner status. Wording stays "Brands we source". Keep the trademark disclaimer.
- Never fake product inventory, stock levels, certifications, client names or numbers.
- Do not add a product search until there is a real product database behind it.
- Mobile first. A plant engineer on a phone is the primary visitor.
- No feature gets added because it is technically interesting. Check it against §1.