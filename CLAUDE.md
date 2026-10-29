# Trete One — website build spec

**Authority:** this file. It absorbs the locked visual system document
(*Treteone — Locked Visual System & Hero Direction*) and supersedes the
amber/graphite system the site was built on in passes 1–5.

The old spec is kept as `CLAUDE-amber-superseded.md` for reference only.
Where `reference/index.html` disagrees with this file, this file wins — the
prototype's ink/amber palette is dead.

---

## 1. What this is

Marketing site for Trete One, an industrial supply and sourcing company in Guangzhou, China.
Audience: maintenance engineers and procurement buyers at plants worldwide.

The site has two jobs:
1. Make a buyer who has never heard of the company send an enquiry.
2. Survive the "are these people real?" check.

Anything that doesn't serve those two jobs doesn't get built.

It should read as a **premium industrial technology and procurement platform** —
serious, precise, engineering-led, international. Not a generic trading site,
not a template corporate site, not a commodity catalogue, not sci-fi.

---

## 2. Stack

Locked. Same as the MesoAxis site. No frameworks, no SSR, no adapters, no CMS,
no backend systems beyond the single form function in §8, without written approval.

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

**Approved additions** (recorded per the written-approval rule):
- `subset-font` — build-time CJK subsetting
- `sharp` AVIF quality set to **40** in `astro.config.mjs`
- `vite.build.assetsInlineLimit: 0` — do not remove, see §10

Rules:
- **Output mode: static.** No UI framework, no hydration, no framework runtime.
- **Tailwind registers as a Vite plugin only**: `vite: { plugins: [tailwindcss()] }`.
- **NEVER create `postcss.config.mjs`.** On MesoAxis this caused every deploy to fail
  with ENOENT while Cloudflare kept serving the last good build — the site looked
  healthy for two months. A green site is not a green build.
- **JS is vanilla**, one small module per interactive component.
- **i18n**: Astro i18n routing. Real localised routes, never a client-side text swap.
- Images live in `src/assets/`, never `public/img/` — `public/` is copied verbatim and
  never touched by `astro:assets`, so images there get no AVIF, no responsive widths
  and no q40.

---

## 3. Site structure

The site is **no longer a single scrolling page**. The homepage is a gateway;
detail lives on its own routes.

| Route | Holds |
|---|---|
| `/` | Hero, positioning line, product ecosystem entry, industries preview, hard-to-find band, brand strip, closing CTA |
| `/products` | All 12 categories in full |
| `/industries` | All 9 industries in full |
| `/sourcing` | Hard-to-find and obsolete parts, the "what to send" checklist, the 5-step process |
| `/brands` | Brand list with logo placeholders, trademark disclaimer |
| `/about` | Company, the 6 points, registered details |
| `/quote` | The form, on its own page |

Each mirrored under `/zh/`. Fourteen routes.

**No per-category pages.** Twelve pages each holding one heading and a line of
subcategory names is thin content — a buyer reads it as padding and Google treats it
as filler. One `/products` page until a real product database exists (§12).

```
src/
  data/         categories.ts industries.ts brands.ts scope.ts process.ts
                navigation.ts company.ts hero.ts stats.ts
  i18n/         ui.ts en.ts zh.ts
  styles/       tokens.css global.css
  components/
  scripts/      one module per interactive component
  layouts/      Base.astro
  assets/       all photography — processed by astro:assets
  pages/        index.astro products.astro industries.astro sourcing.astro
                brands.astro about.astro quote.astro
                zh/… same seven
public/
  fonts/        General Sans, Roboto, Noto Sans SC — self-hosted WOFF2
  logos/        brand logos, slug.svg
  _headers _redirects
functions/      the single quote endpoint
scripts/        Node build tooling — not shipped, do not confuse with src/scripts/
```

Styling order: `tokens.css` defines custom properties on `:root`; `global.css` imports
tokens then Tailwind then bridges them via `@theme`; component-scoped `<style>` for
anything local. Arbitrary hex values in components are prohibited.

No hardcoded UI strings — all copy comes from `src/i18n/`. The CJK glyph scan only
reads `src/**/*.{ts,astro,js,mjs}`.

---

## 4. Colour — LOCKED

Replaces the ink/amber system completely. **Amber, orange, gold, green and purple are
forbidden.** No gradients as decoration.

### Brand core
```css
--color-navy:       #051b38;
--color-ink:        #0a0816;
--color-cyan:       #06b6d4;
--color-cyan-light: #67e8f9;
--color-muted-blue: #88acda;
--color-light:      #e3e7e8;
--color-white:      #ffffff;
```

### Semantic
```css
--surface-page:        #ffffff;
--surface-primary:     #051b38;
--surface-tinted:      #E5E7EB;
--surface-data:        #051b38;
--surface-anchor:      #051b38;
--surface-card:        #F9FAFB;
--surface-card-tinted: #E5E7EB;

--text-primary:    #111827;
--text-secondary:  #6B7280;
--text-muted:      #4b6fa5;
--text-body:       #374151;
--text-inverse:    #ffffff;
--text-link-light: #155e75;
--text-link-dark:  #67e8f9;

--accent-electric: #06b6d4;

--feedback-success: #16a34a;
--feedback-error:   #dc2626;
--feedback-info:    #06b6d4;
--feedback-disabled-text:    #88acda;
--feedback-disabled-surface: #e3e7e8;
```

The primary relationship is **navy + white + cyan**. Cyan is an accent, never the
dominant page colour. Ink, muted blue and light neutral carry supporting contrast.

### Shadows — navy-tinted only, used sparingly
```css
--shadow-raised:   0 2px 8px rgba(5,27,56,.08);
--shadow-floating: 0 8px 16px rgba(5,27,56,.12);
--shadow-modal:    0 20px 60px rgba(5,27,56,.18);
```
No generic black shadows.

### Focus
```css
--focus-light: #0369a1;
--focus-dark:  #67e8f9;   /* amended: see below */
--focus-width: 2px;
--focus-offset: 2px;
```

**Amendment on the record.** The locked document set `--focus-dark: #0369a1`, which
against navy `#051b38` measures about 1.9:1 — a focus ring almost nobody can see, and
a direct failure of §11. Changed to cyan-light `#67e8f9`, which measures about 11:1 on
navy. `--focus-light` is unchanged and passes on white.

---

## 5. Typography — LOCKED

| Role | Stack |
|---|---|
| Display / headings | `"General Sans", Arial, sans-serif` |
| Body / forms / links | `"Roboto", sans-serif` |
| Mono | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` |
| Chinese | `"Noto Sans SC"` appended to both text stacks |

General Sans self-hosted from `/fonts/`, weights 400/500/600/700, `font-display: swap`.
Roboto 400. Never substitute Inter, Geist, Manrope, Poppins or Montserrat.

### Sizes
```css
--fs-h1:        clamp(2.75rem, 2.13rem + 2.63vw, 4.5rem);
--fs-h2:        clamp(1.75rem, 1.49rem + 1.13vw, 2.5rem);
--fs-h3:        1.125rem;
--fs-body:      clamp(1.125rem, 1.05rem + 0.34vw, 1.35rem);
--fs-hero-lead: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
--fs-nav:       20px;
```

### Tracking and leading
```css
--tracking-display: -0.035em;  --leading-display: 1.08;
--tracking-h1:      -0.025em;  --leading-h1:      1.12;
--tracking-h23:     -0.015em;  --leading-h23:     1.2;
--tracking-body:     0em;      --leading-body:    1.62;
--tracking-mono:     0.02em;   --leading-mono:    1.42;
```

### Weights — do not vary randomly
```
H1 / H2     General Sans 700
H3          General Sans 600
H4–H6       General Sans 500
Buttons     General Sans 500
Body        Roboto 400
Mono        400
```

Eyebrow labels: General Sans 500, 0.875rem, uppercase, 0.08em tracking.

Hierarchy comes from size, weight, spacing, position and contrast — never decorative
effects.

Chinese overrides: line-height 1.85, letter-spacing 0 on headings, no italics.

**Open conflicts — do not resolve silently:**
- MX-BCS-001 §11.1 specifies DM Sans 500 for headings. The code uses General Sans.
- The register specifies Roboto Mono 400. The stack falls back to system mono.

---

## 6. Hero

Full-bleed rolling photography — five Unsplash stand-ins crossfading, as currently
built, **restyled into the navy system**. The generated cinematic facility image and
its hotspot layer from the locked document are **not being built**: the image cannot be
produced in this pipeline, and hotspots are hover-driven, which §12 forbids as the
primary interaction when the phone is the primary visitor.

- Navy overlay only where text legibility needs it. Do not tint the whole photograph
  blue — industrial materials and detail must stay visible.
- Text occupies roughly 40–45% of the composition, left. Visual interest right.
- No text over highly detailed machinery.
- Frame counter, localised caption, progress bars, as built.
- Freezes under `prefers-reduced-motion`.
- Subtle scroll cue at the bottom. Not a large animated arrow.

### Hero copy
```
Eyebrow    INDUSTRIAL SUPPLY & SOURCING
H1         The Parts, Equipment & Technology Behind Industry.
Lead       From critical spare parts to complete industrial equipment, we source
           and supply what keeps industrial operations running.
Primary    EXPLORE PRODUCTS
Secondary  REQUEST A QUOTE
Tertiary   CAN'T FIND A PART?
```

Both languages.

---

## 7. Homepage rhythm

Every block must be a **different composition**. Never heading → paragraph → four
cards, repeated. That repetition is what makes a site read as a template.

1. **Hero** — large cinematic composition
2. **Positioning** — one short statement, generous white space
3. **Product ecosystem** — large interactive category system, entry to `/products`
4. **Industries** — image-led cards, entry to `/industries`
5. **Hard-to-find** — dark navy conversion section
6. **Brands** — clean white strip, entry to `/brands`
7. **Closing CTA** — large navy closing statement

**Removed from the homepage:** the search field (no product database behind it — §12),
the amber ticker, and the count-up stat band. A scrolling marquee strip and ticking
numbers both work against the premium positioning in §1.

The five detail routes carry the rest: the 12 categories, the 9 industries, the
component-to-system scope ladder, the 5-step process, the brand list, the 6 about
points, and the form.

### Product ecosystem style
Not generic SaaS cards. Large typography, equipment imagery, asymmetric layout, real
hover and focus states, technical labels, strong whitespace:

```
01
AUTOMATION
& CONTROL

PLC · DCS · SCADA · HMI · DRIVES

EXPLORE →
```

---

## 8. Quote form

The only conversion point. It must work. Already built — keep the logic, restyle only.

- Fields: type, part number/description, manufacturer, quantity, attachments, notes,
  name/company, contact. Only contact is required.
- **No account, ever.**
- Attachments: PDF, images, Excel. 10 MB per file, 5 files, **20 MB total** — 50 MB
  would pass validation then bounce at the provider.
- Backend: one Cloudflare Pages Function → Resend → `info@treteone.com`, returns a
  reference number. Stores nothing.
- Honeypot discards silently. Sub-3-second submission still sends, flagged `[CHECK]` —
  autofill is fast and binning those loses real enquiries.
- Success and failure in-page, never a redirect.
- Works without JavaScript.
- Both languages.

Env vars in Cloudflare Pages: `RESEND_API_KEY`, `QUOTE_FROM`, optional `QUOTE_TO`.
Until set, the endpoint returns 502 and the form tells the buyer to email directly.

---

## 9. Brands

- Logo placeholders for every brand — a dashed tile carrying the name, resolved at
  **build time** by reading `public/logos/`. No `<img onerror>`; no error handler for
  the CSP to trip; no broken-image flash.
- Dropping `siemens.svg` into `public/logos/` replaces that tile. Nothing else changes.
- The build **refuses a raster wrapped in an SVG** and names the file. This is the
  MesoAxis 462 KB failure made unrepeatable.
- Logos render greyscale, full colour on hover.
- Moving rows are `aria-hidden`; assistive tech gets a plain list. Under reduced
  motion the rows stop and wrap into a static grid.
- Trademark disclaimer stays. Wording stays "Brands we source".

---

## 10. Hosting and delivery

Mainland China is in the audience:
- **Self-host every font.** Google Fonts is unreachable there.
- No Google Maps, Analytics, YouTube, or any `gstatic` asset.
- AVIF at q40 with fallback, sized to breakpoint, lazy below the fold.
- ICP filing if hosting inside mainland China; otherwise verify load times from China
  before launch.

**Cloudflare Pages:** branch `main`, build `npm run build`, output `dist`,
`NODE_VERSION` 22. Cloudflare runs `npm clean-install` — commit the lockfile with
every dependency change.

`public/_headers` carries `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
`Referrer-Policy: strict-origin-when-cross-origin`,
`Permissions-Policy: camera=(), microphone=(), geolocation=()`,
`Strict-Transport-Security`, and `Content-Security-Policy: default-src 'self'` with
`frame-ancestors 'none'`. No inline styles, scripts or `onclick` handlers anywhere.

**`assetsInlineLimit: 0` must stay.** Removing it produces no build error — Astro
inlines hoisted scripts into the document, the site looks fine locally, and the CSP
silently blocks them in any browser that enforces it.

**Budget: under 1.5 MB on first mobile load, measured at 412px @2×.** Check it, don't
assume it. Splitting into seven routes should bring the homepage well under, since it
no longer carries 33 images.

Every `.svg` must contain real vector paths. Lighthouse targets: performance ≥ 90
mobile, accessibility 100.

---

## 11. Accessibility floor

- Visible keyboard focus everywhere, using the §4 focus tokens. Cyan-light on dark.
- Every interactive element has hover, focus, keyboard operation, adequate touch
  target and an accessible label. Never rely on colour alone.
- `prefers-reduced-motion` freezes the hero, marquees and reveals.
- Contrast AA minimum. Text on dark navy no lighter than opacity .50 — the prototype's
  .42 measures 4.34:1 and fails.
- Real `alt` on every image, or `alt=""` if decorative.
- `lang` correct per route.

---

## 12. Content still missing

Do not invent any of this. Placeholder, and list it in the README.

- Registered Chinese company name and business licence number
- **33 real photographs.** Everything in `src/assets/` is an Unsplash stand-in — see
  `src/assets/STAND-INS.md`. None of them is a photograph of Trete One.
- Brand logo files, and confirmation of which brands may be shown as logos at all
- Real reply-time commitment. The stat renders as an unconfirmed placeholder until
  `confirmed: true` in `src/data/stats.ts`
- Professionally written Chinese copy, reviewed by a native speaker

---

## 13. Rules

- Never claim authorised distributor, agent or partner status.
- Never fake product inventory, stock levels, certifications, client names or numbers.
- No product search until there is a real product database behind it.
- **Mobile first.** A plant engineer on a phone is the primary visitor. Hover-only
  interactions are not acceptable as the primary path.
- One coherent product: same typography, buttons, spacing, navigation, card language,
  interaction language, colour tokens, focus states across every page.
- No feature gets added because it is technically interesting. Check it against §1.

---

## 14. Final visual test

Before calling the redesign done, at normal browser zoom:

- Does it immediately look premium?
- Does it look like an international industrial technology company?
- Does navy/cyan feel sophisticated rather than generic?
- Is General Sans clearly visible in the headline hierarchy?
- Does the hero communicate industrial scale?
- Is the homepage focused rather than overloaded?
- Can a visitor quickly understand what Trete One supplies, who it serves, how it
  sources, and how to request a quote?

If any answer is no, revise.