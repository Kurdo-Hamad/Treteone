# Treteone — website build spec

**Authority:** this file. It absorbs the locked visual system document
(*Treteone — Locked Visual System & Hero Direction*) and supersedes the
amber/graphite system the site was built on in passes 1–5.

The old spec is kept as `CLAUDE-amber-superseded.md` for reference only.
Where `reference/index.html` disagrees with this file, this file wins — the
prototype's ink/amber palette is dead.

---

## 1. What this is

Marketing site for Treteone, an industrial supply and sourcing company in Guangzhou, China.
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

**Design authority for layout: `reference/mockup.html`** (approved October 2026).
Where this file and the mockup disagree on presentation, the mockup wins and the
disagreement is listed in §15 rather than silently resolved. The build plan that
splits the work into parallel streams is `reference/BUILD-PLAN.md`.

The homepage is a gateway; detail lives on its own routes.

| Route | Holds (in order, per the mockup) |
|---|---|
| `/` | Rolling hero · intro ("We find the part. Then we supply it.") · "Three ways an enquiry arrives" · "Treteone at a glance" · positioning split · capability grid · hard-to-find navy band · brand marquee · "About our work" |
| `/products` | Page head · 12 categories as index rows · navy five-step scope band (component → complete system) |
| `/industries` | Page head · 9 sectors as index rows, spec line naming the duty data |
| `/sourcing` | Page head · four definition blocks · navy "what to send" band · five-step process |
| `/brands` | Page head · filterable brand directory (chips + search) · trademark disclaimer |
| `/about` | Page head · six definition blocks · registered-details band on pale |
| `/quote` | The form, on its own page |

Each mirrored under `/zh/`. Fourteen routes.

Every route shares the same masthead (`Header.astro`), the same compact footer
(`Footer.astro`), and every detail route opens with the same page head (kicker,
h1, lead), so the seven pages read as one product.

**No per-category pages.** Twelve pages each holding one heading and a line of
subcategory names is thin content — a buyer reads it as padding and Google treats it
as filler. One `/products` page until a real product database exists (§12).

```
src/
  data/         categories.ts industries.ts brands.ts scope.ts process.ts
                navigation.ts company.ts hero.ts stats.ts …
  i18n/         ui.ts                       helpers: t(), localisePath(), hreflang
                en/  common home products industries sourcing brands about quote
                     index.ts               barrel; fails the build on a duplicate key
                zh/  the same eight modules, each typed against its en module
                     index.ts
  styles/       tokens.css global.css
  components/   Header Footer ImagePlaceholder … one file per section
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
reference/      mockup.html (design authority), BUILD-PLAN.md, superseded material
```

**i18n is split per route** so that parallel work on different routes never edits
the same file. A stream owns its route's `en/<route>.ts` and `zh/<route>.ts`;
`common` belongs to whoever owns the header and footer. `t('key')` works exactly
as before — the barrel merges the modules into one dictionary. A key missing from
a Chinese module fails `astro check`; a key defined in two modules fails the build.

**Every photography slot renders `ImagePlaceholder.astro`** (`subject`, `variant`:
`wide` | `small` | `hero`) until real photographs exist. The subject is a real,
localised description of what the photo will show. Swapping in photography is a
change to that one component.

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

### Mockup tokens

The approved mockup adds tokens the locked document has no name for. They live in
`tokens.css` §1f: `--color-navy-2` (drawer, hero ground), `--color-navy-deep`
(footer), `--scrim-rgb`, `--surface-pale`, `--surface-pale-hover`, `--line`,
`--line-dark`, `--placeholder-dash`, `--text-body-2` (#4B5563), `--text-quiet`
(#5C6572 — not #6B7280, which fails AA on pale). Every colour in the mockup resolves
to one of these or to the locked set above.

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
- The approved mockup sets headings at **600** and uses a smaller, calmer scale
  (`--fs-display`, `--fs-page-h1`, `--fs-sec-h2`, body 1rem). The site follows the
  mockup; the locked §5 values above are kept in tokens.css but no longer drive the
  base styles. See §15.

---

## 6. Hero

From the approved mockup. **Full-bleed**, flush under the masthead, no side
margins, no gap above.

- Height `clamp(400px, 52vh, 540px)`; below 560px, `aspect-ratio: 3/4`, min 430px.
- Four slides, each a tab panel: spare parts & MRO · equipment & machinery ·
  automation & instrumentation · hard-to-find & obsolete.
- Each slide is an `ImagePlaceholder` with `variant="hero"` carrying its real
  subject. **For preview, `src/data/standIns.ts` fills the homepage slots with the
  Unsplash stand-ins in `src/assets/`** (self-hosted, `alt=""`). Before launch,
  replace the files with Treteone's own photographs or set `SHOW_STAND_INS = false`
  (§12). "Treteone office" deliberately keeps its placeholder.
- A left-to-right navy scrim (`rgb(var(--scrim-rgb) / a)`) keeps the overlay
  legible. Do not tint the whole photograph blue.
- Overlay bottom-left, aligned to the page gutter: eyebrow, rotating title, one
  line, one text link whose target changes per slide.
- Bar below the image, inside the same container: pause/play button plus four
  40px progress segments with labels. 7s per slide.
- **Below 700px: one segment only**, full width, labels visually hidden.
- A real tablist: `role="tab"`, `aria-selected`, roving tabindex, arrow keys.
- Freezes under `prefers-reduced-motion`: rests on slide one, play icon showing.

### Hero copy

```
Eyebrow    INDUSTRIAL SUPPLY & SOURCING
Slide 1    Spare parts & MRO
           The consumables a maintenance team runs through every week — quoted
           against the reference you already have.            → Explore spare parts
Slide 2    Equipment & machinery
           Pumps, motors, compressors and complete production lines, sized to the
           duty rather than to whatever sits in stock.         → Explore equipment
Slide 3    Automation & instrumentation
           PLC and drive hardware, transmitters and analysers — specified from your
           loop sheets or the failed module itself.            → Explore automation
Slide 4    Hard-to-find & obsolete
           Discontinued components and legacy automation. Send a nameplate
           photograph and we work back to something that still exists.
                                                               → How we trace a part
```

Below the hero, the page h1: **"We find the part. Then we supply it."** with
"Send a part number" and "See what we supply" buttons (the mockup's wording).
Both languages.

The earlier hero copy ("The Parts, Equipment & Technology Behind Industry.", three
buttons on the image) is superseded by the mockup.

---

## 7. Homepage rhythm

Every block a different composition — never heading → paragraph → four cards,
repeated. From the mockup, in order:

1. **Rolling hero** — §6
2. **Intro** — display h1, lead, two buttons, two-column on desktop
3. **"Three ways an enquiry arrives"** — three image cards. Illustrative; the line
   saying they name no client stays.
4. **"Treteone at a glance"** — four figures on the pale band: 12 · 9 · Guangzhou ·
   No account. 12 and 9 count up once when scrolled into view; the real number is
   in the HTML. Both are counted from `categories.ts` and `industries.ts`.
5. **Positioning split** — image with a cyan offset block behind it, copy alongside
   ("We hold no stock. That is the point.")
6. **Capability grid** — eight items, small placeholder, noun-plus-clause heading,
   three lines.
7. **Hard-to-find** — navy band, copy left, numbered "what to send" list right
8. **Brand marquee** — two rows in opposite directions, pause on hover/focus, edge
   fades; the moving rows are `aria-hidden` with a plain list for assistive tech
9. **"About our work"** — two cards on the pale band

Nothing animates into existence that was not already readable. Reveals apply only
to grids that start below the fold, and only once JS has run.

**Not on the homepage:** a search field (no product database behind it — §12) and
the amber ticker.

---

## 8. Quote form

The only conversion point. It must work. Already built — keep the logic, restyle only.

- Fields: type, part number/description, manufacturer, quantity, attachments, notes,
  name/company, contact. Only contact is required.
- **No account, ever.**
- Attachments: PDF, images, Excel. 10 MB per file, 5 files, **20 MB total** — 50 MB
  would pass validation then bounce at the provider.
- Backend: one Cloudflare Pages Function → Resend → `sales@treteone.com`, returns a
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
- **Never hotlink** images, fonts or scripts from another host (unsplash.com,
  Google, CDNs). Everything is a file in this repo served from the site's domain.
- **Use the custom domain, never `*.pages.dev`.** Cloudflare's own China Network FAQ
  says Pages is "not available in Mainland China due to pages.dev certificate not
  residing within Mainland China".
- On a global (non-China-Network) Cloudflare zone, mainland visitors are served from
  the nearest edge outside China — usually reachable, speed varies by region and
  time of day. Measure from inside China before launch.
- For in-country speed: Cloudflare China Network needs an ICP filing (and an
  Enterprise arrangement); alternatively an ICP-filed mirror on a mainland host.
  Treteone is a Guangzhou-registered company, so it can apply for ICP itself.
  This is a business decision, not a code change.

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

- Registered **Chinese** company name. (The English registered name,
  Guangzhou Treteone Trading Co., Ltd., is supplied and shown in the footer.)
- Business licence number. **Not shown anywhere until supplied — no placeholder**
  in the footer; the "To be supplied" marker was removed at the client's request.
- **33 real photographs.** Everything in `src/assets/` is an Unsplash stand-in — see
  `src/assets/STAND-INS.md`. None of them is a photograph of Treteone.
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
- Can a visitor quickly understand what Treteone supplies, who it serves, how it
  sources, and how to request a quote?

If any answer is no, revise.

---

## 15. Approved mockup vs this file — conflicts on record

`reference/mockup.html` was approved after this file was written. Where they
disagree on presentation the mockup has been followed, and each case is listed
here so nobody "fixes" it back by accident:

| Topic | This file said | Mockup / site now |
|---|---|---|
| Heading weight | H1/H2 700 (§5) | 600 |
| Type scale | `--fs-h1` up to 4.5rem, body up to 1.35rem | `--fs-display` up to 3.4rem, body 1rem |
| Buttons | General Sans 500, square, uppercase | General Sans 600, pill, sentence case |
| Header | transparent over the hero, white after | solid navy always, single row, Home in the nav |
| Footer | four columns, copy-address button, licence placeholder | compact: wordmark, registered name, address, one row of links, email and phone |
| Hero | five photographs, three buttons on the image, frame counter | four tab panels, one rotating line and link, tab bar below the image |
| Homepage | ecosystem, industries preview, closing CTA | the nine blocks in §7 |
| Count-up stats | removed (§7, previous version) | 12 and 9 count up once on the at-a-glance band |
| Content width | 1280px | 1180px |
| Breakpoints | 720 / 1040px | 560 / 700 / 960px |

| Homepage order | split second | split fifth, after the at-a-glance band (mockup order, §7) |
| Hero eyebrow | — | cyan, uppercase (the mockup never styled its class) |

**Not taken from the mockup:**
- The mockup's Google Fonts link (Figtree, Roboto Mono). Fonts stay self-hosted
  (§10); General Sans is the real face Figtree stood in for.
- The mockup's hash router. Every page is a real route (§2).
- The mockup has no language switch. The header adds a link to the same page in
  the other language; on phones it lives in the drawer.
- Footer legal text at .46 white (fails §11); raised to .54.
- Hero text swapped in by `innerHTML`. Each hero tab panel holds its own copy, so
  the page reads correctly without JavaScript.
- Plain cyan step labels on white (2.4:1). They use link-blue on white and
  cyan-light on navy.
- Form-control borders at ~1.2:1. Controls use `--rule-control` (3:1 or better).
- "Licence number" in the /about registered-company line — not supplied, not claimed.

