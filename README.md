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
| `npm run budget` | §10 first-load payload check, all 14 routes, against the 1.5 MB budget (run after a build) |
| `npm run fonts:sc` | Rebuild the Noto Sans SC subset. Add `-- --force` to rebuild unconditionally. |
| `npm run placeholders` | Fill any image slot that has no file with a §10 plate. Add `-- --force` to replace existing images. |
| `npm run test:quote` | Exercise the §7 quote endpoint offline (22 assertions) |

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

**Navy/cyan redesign complete: seven routes, fourteen pages** (CLAUDE.md §3).
The amber single-page build from passes 1–5 is gone; the pass notes further
down describe that build and are kept for the reasoning, not the design.

### Routes

| Route | Holds |
|---|---|
| `/` | `RollingHero` · `Positioning` · `ProductEcosystem` · `IndustriesPreview` · `HardToFind` · `BrandStrip` · `ClosingCta` |
| `/products/` | `PageHero` · `CategoryIndex` (all 12, plus "not on the list?") · `ClosingCta` |
| `/industries/` | `PageHero` · `IndustryIndex` (all 9) · `ClosingCta` |
| `/sourcing/` | `PageHero` (the hard-to-find claim) · `SourcingChecklist` · `ProcessTimeline` · `ClosingCta` |
| `/brands/` | `PageHero` · `BrandGrid` (static, all 32, disclaimer) · `ClosingCta` |
| `/about/` | `PageHero` · `About` (6 points) · `ScopeScroller` · `CompanyDetails` · `ClosingCta` |
| `/quote/` | `PageHero` · `QuoteForm` |

Each mirrored under `/zh/`. `Header` and `Footer` wrap every page from
`Base.astro`. Every detail route opens with the same `PageHero` and closes with
the same `ClosingCta`, so the six read as one product (§13).

### Removed, and why

- **`Ticker`, `StatBand`** — removed per §7. `src/data/stats.ts` is kept only as
  the place §12 says the reply time gets confirmed; nothing renders it.
- **`ProductRail` → `CategoryIndex`.** §3 puts "all 12 categories in full" on
  `/products`. A horizontal rail shows three and hides nine, most of all on a
  phone, so the page that exists to show every category now shows every
  category, in a grid, with no script.
- **`IndustryPicker` → `IndustryIndex`.** Same reasoning: a tablist shows one
  panel and hides eight, and its preview was hover-driven (§13). All nine are
  visible rows now.
- **`SourcingBand` → `SourcingChecklist`**, **`BrandMarquee` → `BrandStrip`** —
  renamed because their jobs changed. Build-time logo resolution and the
  raster-in-SVG guard moved to `src/data/brand-logos.ts`, shared by the strip
  and the grid.

### Verified, not assumed

- `npm run check` — 66 files, 0 errors, 0 warnings, 0 hints.
- `npm run test:quote` — 22/22. The form's logic is unchanged; only its styling.
- **Every internal link resolves.** 596 `href`s across the 14 built pages,
  including every `#slug` anchor into `/products/` and `/industries/`, checked
  against the built HTML. Every link carries its trailing slash, so none costs
  a redirect hop.
- The sitemap lists all 14 routes; hreflang alternates pair each page with its
  counterpart, and `x-default` points at the same page in English.
- One `<h1>` per page, correct `lang` per route, no duplicate ids, no dangling
  `aria-labelledby` / `aria-describedby` / `aria-controls`.
- No inline `<style>`, `<script>`, `style=""` or event handler in any page.
- **No superseded colour survives** in `src/`, `public/`, `functions/`,
  `scripts/` or the built `dist/` — no amber, ink or graphite hex and no
  pass 1–5 token name. The LEGACY alias block in `tokens.css` is deleted. The
  only hex outside `tokens.css` is in files that cannot read it: the favicon,
  `theme-color`, and the standalone `form-response.css`, all locked §4 values.
- **Focus rings:** one global rule. `--focus-light` (#0369a1) on every light
  ground, `--focus-dark` (#67e8f9) inside any `.dark-surface`. No component sets
  its own outline colour. The old ProductRail cyan-on-white card border
  (2.4:1) went with the component.
- Payload, 412px @2×, stand-in photography in place, fonts counted worst case:

| Route | Arrival | Deferred | Total | Budget |
|---|---|---|---|---|
| `/` | 525.6 KB | 91.7 KB | 617.4 KB | 40% |
| `/products/` | 353.4 KB | 371.7 KB | 725.1 KB | 47% |
| `/industries/` | 346.3 KB | 320.2 KB | 666.5 KB | 43% |
| `/sourcing/` | 337.5 KB | 27.5 KB | 365.0 KB | 24% |
| `/brands/` | 335.5 KB | 0 | 335.5 KB | 22% |
| `/about/` | 348.6 KB | 225.6 KB | 574.2 KB | 37% |
| `/quote/` | 339.3 KB | 0 | 339.3 KB | 22% |
| `/zh/…` | within 0.5 KB of each English route | | | |

`npm run budget` now measures all 14 and fails if any route did not build.

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

Passes 2 and 3 added five sections of Chinese copy, so the subset grew with
them — it is now **358 glyphs / 88.3 KB**, with a 3.6 KB stylesheet. That growth
is the point: the font tracks the copy instead of shipping a fixed 4.6 MB, and
355 of those 358 glyphs are on the rendered pages.

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

## Real photography vs the §8 budget — measured

The placeholder plates are synthetic hatch-and-text, which compresses far better
than a photograph. So before building further, five real industrial photographs
(Wikimedia Commons, CC/PD, easy through to very busy) were centre-cropped to
each aspect ratio the site uses and run through **Astro's exact pipeline** —
calibrated first against Astro's own output, reproducing it to within 0.24%.

**Mobile 412px @2×, all 31 images at the time of the test:**

| | arrival | deferred | images | + non-image | total | budget |
|---|---|---|---|---|---|---|
| placeholders | 122 KB | 439 KB | 561 KB | 362 KB | 923 KB | 60% |
| real, mean photo | 212 KB | 818 KB | 1030 KB | 362 KB | 1392 KB | 91% |
| real, busiest photo | 292 KB | 1117 KB | 1409 KB | 362 KB | **1771 KB** | **115%** |

**The budget does not survive real photography as configured.** The mean squeaks
under, but the test is not the mean — it is whatever photography is actually
supplied, and a busy factory-floor shot puts the page 15% over §8.

Astro passes no `quality`, so sharp's AVIF default of 50 applies. Worst-case
totals by quality:

| AVIF q | images | total | budget |
|---|---|---|---|
| 50 (current) | 1409 KB | 1771 KB | 115% over |
| 45 | 1186 KB | 1548 KB | 101% over |
| **40** | **967 KB** | **1329 KB** | **87% — holds** |
| 35 | 813 KB | 1175 KB | 77% |

**Recommendation: set `image.quality` to 40.** It holds worst-case with room for
About and the QuoteForm. Everything here renders behind `grayscale(.3–.4)` and
contrast filters at modest sizes, so 40 should be invisible — but that needs one
look at a real photograph, so **it has not been changed.** One line in
`astro.config.mjs` when you decide.

Two things that do *not* help: pre-desaturating sources to match the CSS filter
saves ~4%, and desktop (2.1 MB at 1440 @2×) is a separate problem — §8's budget
is explicitly "first mobile load", so mobile is the gate.

---

## ⚠ The photography is temporary stand-ins, not content

**All 33 images are Unsplash photographs standing in for the real thing.** They
are committed under `src/assets/` and go through the normal pipeline at q40, so
the design can be reviewed with real imagery — but **§10 is unchanged: all 33
still need replacing before launch.** Full manifest, with photo IDs and
photographers, in [`src/assets/STAND-INS.md`](./src/assets/STAND-INS.md).

Why they are not content:

- They are stock photographs of somebody else's plant. §1's second job is
  surviving the "are these people real?" check, and a buyer who
  reverse-image-searches a stock photo has their answer.
- **`about/portrait.jpg` deliberately contains no people.** It stands in for
  "our office and staff", and a stock photograph of a stranger presented as our
  team is the worst version of this problem — so it is a warehouse aisle with
  racking and pallets and nobody in it. Still not our warehouse.
- Unsplash now blocks its search API without a key, so the only IDs obtainable
  were **the fourteen already in `reference/index.html`** — the approved
  prototype's own choices. Fourteen photographs across thirty-three slots means
  some repeat between sections; none repeats *within* a section.
- One of the fourteen (`refinery`) is a sunset over a barge rather than a
  refinery, so it is unused.

Two related changes:

- **`npm run placeholders` no longer overwrites.** It fills empty slots only;
  `-- --force` restores plates. The guard matters more later than now: an
  accidental run once real photography is in would have destroyed it.
- **They live in `src/assets/`, not `public/img/` as asked.** `public/` is
  copied verbatim and never touched by `astro:assets`, so images there get no
  AVIF, no WebP, no responsive widths and no q40 — which contradicts the other
  two requirements in the same instruction (run through the pipeline; overwrite
  one file to swap a photograph). `src/assets/` satisfies all three, and the
  no-external-hosts requirement is met either way since both are committed.
  `public/img/` is now empty and unused; CLAUDE.md §3 is annotated to say so.

---

## ⚠ Before this can go live: the quote form needs an email account

**`functions/api/quote.ts` is written, tested and inert until three environment
variables exist.** §7 required a serverless function that emails
info@treteone.com; no provider account was available, so I picked one and built
against it rather than leave the site's only conversion point unbuilt.

**I chose [Resend](https://resend.com).** SMTP does not exist in the Cloudflare
Workers runtime, so it had to be an HTTP API; Resend needs no SDK and accepts
base64 attachments up to 40 MB. Swapping providers means rewriting one function,
`sendEmail()`, and nothing else.

Set in **Cloudflare Pages → Settings → Environment variables**:

| Variable | | |
|---|---|---|
| `RESEND_API_KEY` | secret | from resend.com |
| `QUOTE_FROM` | e.g. `Trete One <quotes@treteone.com>` | must be on a domain verified in Resend, with SPF and DKIM, or the mail is filed as spam |
| `QUOTE_TO` | optional | defaults to info@treteone.com |

Until they are set the endpoint returns 502 and the form tells the buyer to
email directly. That is deliberate: **it never pretends an enquiry was sent.**

Two more things to confirm:

- **A 20 MB total attachment cap, which §7 does not mention.** §7 allows 5 files
  at 10 MB, which is 50 MB — more than any email provider accepts, and base64
  inflates it by a third. Without a total cap a submission would pass validation
  and then bounce, which is the worst outcome available. 20 MB encodes to ~27 MB
  and gets through. Both caps are enforced on both sides.
- **Only the contact field is required.** Not the part number, not the name. A
  buyer with a blurry nameplate photo and nothing else can still send it, and we
  can still reply. §1 over tidiness.

---

## AVIF quality is now 40

Set from the measurement below, after checking it: a 1:1 crop of the busiest
photograph at q40 behind the design's `grayscale(.35)` shows slight softening in
fine overhead detail, no blocking, no banding. Placeholders went 976 KB → 840 KB
even with two sections added, and the real-photo worst case now projects to
**1329 KB — 87% of budget** rather than 115%.

WebP and JPEG are left at sharp's defaults on purpose: they are fallbacks for
browsers without AVIF and never counted in the budget.

---

## Pass 5 notes

> Passes 2–5 notes describe the amber single-page build. Components named here
> may since have been renamed or removed — see "Build status" above.

### The About section's last point corrects itself

Point six says the registered name and licence number are published in the
footer. The footer currently shows two amber **TO BE SUPPLIED** chips, so as
written that point is a claim the page visibly cannot back up — precisely the
thing §1's second job ("are these people real?") is lost on.

It therefore carries a `pendingDescription` and, while `src/data/company.ts`
holds placeholders, reads: *"A registered Guangzhou company. Our address is in
the footer, and the registered name and licence number go there before launch."*
True today, and it switches to the confident wording by itself the moment real
values land. Nothing to remember.

### The form is a real form

`method="post" action="/api/quote"` with a real endpoint. With JavaScript it
posts by fetch and renders success or failure in place — never a redirect (§7).
Without JavaScript the browser posts it normally and the function answers with a
plain confirmation page carrying the same reference number, styled by
`public/form-response.css` so `style-src 'self'` still needs no exception.

A form that only works with JavaScript is a form that loses enquiries.

### A fast submission is flagged, not dropped

§7 asks for "a honeypot field plus a timing check". They are treated very
differently, on purpose:

- **Honeypot filled** → discarded silently, and told it succeeded so it does not
  retry. No person can see, tab to or hear that field, so the false-positive
  risk is effectively zero.
- **Submitted under 3 seconds** → **still emailed**, with `[CHECK]` prefixed to
  the subject and a note in the body. A returning buyer with autofill can submit
  in two seconds, and silently binning that enquiry is a far worse failure than
  reading one spam email.

### Reference numbers

`TO-20260911-K7Q3M` — UTC date plus five characters from an alphabet with no
O/0 or I/1, so it survives being read down a phone. Shown in-page on success and
in the no-JS page, and it is the email subject line.

### The endpoint is tested, not assumed

`npm run test:quote` calls the function directly with real `Request`/`FormData`
objects and a stubbed provider — 22 assertions, offline, sends nothing. It
proves the logic; it cannot prove Cloudflare routes `/api/quote` or that Resend
accepts the mail, so **still smoke-test one real submission after the first
deploy.**

### One thing outside the brief

`tsconfig.json` had `baseUrl`, which TypeScript 6 deprecates and 7 removes —
`tsc --noEmit` failed on it. Removed, and the `~/*` path mapping made relative
(`./src/*`) so it still resolves without it. Mentioned because it is outside
§6.11, §6.12 and §7.

---

## Pass 4 notes

### The logo fallback is resolved at build time, not in the browser

The prototype loads `logos/<slug>.svg` into an `<img>` and swaps to a dashed
tile on the `error` event. Here the component reads `public/logos/` during the
build and decides then. No broken-image flash, no error handler for the CSP to
trip over, and `BrandMarquee` ships **zero JavaScript**.

**All 32 tiles are currently the dashed fallback** — `public/logos/` is empty and
§10 still has the open question of which manufacturers may be shown as a logo at
all. A logo appears the moment its file exists; nothing else changes.

### The build now refuses a raster wrapped in an SVG

§8 is specific about this: "the MesoAxis header logo is 462 KB of exactly that,
on all 35 pages. Check before committing any logo or icon." That check is now
executable rather than a reviewer's job — `BrandMarquee` reads every SVG in
`public/logos/` and throws if it finds `<image>` or a base64 data URI:

```
public/logos/siemens.svg is a raster wrapped in an SVG, not a vector (CLAUDE.md §8).
```

Verified by planting one: it stops `npm run build`.

### A marquee is a bad way to hear 32 names

The moving rows are `aria-hidden` and assistive technology gets a plain static
list of every brand instead. Under `prefers-reduced-motion` the rows stop *and
wrap into a static grid*, with the duplicate copy dropped — freezing a marquee
mid-travel would hide most of the names, which is a worse outcome than the
motion it avoids.

### Both scroll-driven sections fail safe in the finished state

The process timeline's amber line is drawn **full** in CSS, and the script's
first act is to take it back to zero. If the bundle never arrives the timeline
looks complete rather than permanently empty. The line also only ever advances —
scrolling back up does not unwind it, because a step you have read stays read.

### §11 wording, checked in the output

No "authorised distributor", "agent" or "partner" claim appears in either
rendered page, and the trademark disclaimer is present on both. Worth
re-checking whenever brand copy changes.

---

## Pass 3 notes

### The industry picker is a real tablist, and that decided the crossfade

§6.7 asks for "real `tablist` semantics", so this follows the WAI-ARIA tabs
pattern rather than putting tab roles on a row of buttons:

- **roving tabindex** — the whole control is *one* Tab stop, not nine. Arrow
  keys move between tabs (both axes accepted, since the list is vertical on
  desktop and stacked on a phone), Home and End jump to the ends.
- **automatic activation** — selection follows focus, which is right when the
  panels are already in the document.
- **eight panels are `hidden`** — out of the accessibility tree and out of the
  tab order, not merely transparent.

That last point is why **the photo swap is instant rather than a crossfade**.
`hidden` is `display: none`; it cannot be faded. The alternative — keeping all
nine painted at `opacity: 0` — would put eight industries' worth of text in the
accessibility tree at all times. §6.7 says "swaps", and correct semantics beat a
0.6s fade. It also means the eight unshown photographs are never fetched until
their panel is opened, which is 134 KB a visitor may never spend.

If you want the fade back it is possible with `inert` + `aria-hidden` instead of
`hidden`, at the cost of loading all nine photos up front. Say the word.

### Hover previews without stealing focus

Hovering a tab selects it, as §6.7 requires, but deliberately does **not** move
DOM focus — a pointer sweeping down the list should not take the keyboard's
place in the page. Touch pointers are ignored on `pointerenter` because a tap
already sends a click.

### The scope scroller has nothing to operate, by design

It is prose with an illustration that keeps up. The media column is `aria-hidden`
because the corner tag only repeats the stage heading sitting beside it, so what
a screen reader gets is five headings and five paragraphs in order — which is
the argument the section is actually making. Each stage also carries an
`sr-only` "Stage 3 of 5", since the visible `03 / 05` is a mono glyph pair that
reads poorly aloud.

Under reduced motion the crossfade is dropped but the tracking stays: **which
stage you are reading is information, not decoration.**

### Another prototype contrast fix

The prototype dims inactive scope headings to `opacity: .42`. Those headings are
large enough that 4.34:1 would pass WCAG for large text — but §5 (as amended in
pass 1) puts the floor on a dark ground at `.50` full stop, so inactive headings
use `--on-dark-4` and the active one goes to white. One rule, no exceptions to
remember.

### All eight client scripts are now real modules

`scope-scroller.ts` and `rolling-hero.ts` both declared a top-level `root`, and
`astro check` failed: a file with no top-level `import` or `export` is a *global*
script to TypeScript, so every script in `src/scripts/` was sharing one scope.
Adding `export {}` to all eight fixes the collision and prevents the next one.
They were always ES modules at runtime — only TypeScript's view was wrong.

### `npm run budget` now separates arrival from deferral

With five sections of photography the single total had stopped being useful, so
it now splits by when an image is actually fetched: the hero's five load on
arrival and decide LCP, while the rail (below the fold and horizontally
off-screen), the scope stack (below the fold) and the industry panels (below the
fold *and* `hidden`) do not. Both figures print; the total is still the number
that has to pass, because a visitor who reads the whole page pays for all of it.

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
a number with nothing behind it, so the nine industries are a data module and the
stat is `industries.length`. (Pass 3 added the `image` field and built the
picker on top of the same module.)

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

> Passes 1–5. The palette items below (`--ink-3`, the amber interpunct) were
> superseded by the locked navy/cyan system; the contrast and CSP reasoning
> still holds.

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
| Registered Chinese company name | `PENDING` in `src/data/company.ts`. Renders as a dashed "TO BE SUPPLIED" chip in the footer and in the `/about/` company details, and softens the last About point until supplied. |
| Business licence number | Same. |
| Real photography — office, staff, goods packed, equipment handled | **33 images pending — still all 33.** The slots are currently filled with Unsplash stand-ins (see the top of this README and `src/assets/STAND-INS.md`); none of them is a photograph of Trete One, so none of them counts. 5 hero frames (`assets/hero/hero-0N.jpg`, ≥2400px wide) · 12 product cards (`assets/products/<slug>.jpg`, ≥1200px) · 5 scope stages (`assets/scope/<slug>.jpg`, ≥1600px, **portrait** — the media column is sticky and full height) · 9 industry panels (`assets/industries/<slug>.jpg`, ≥1600px) · 1 sourcing plate (`assets/sourcing/plate.jpg`, ≥1600px) · 1 About portrait (`assets/about/portrait.jpg`, ≥1500px, **portrait**) — this is the office/staff photograph §10 asks for. All under `src/`. Every one is a generated plate reading "PHOTOGRAPH PENDING" plus the subject the real photograph should show; the subject lines live in `scripts/make-placeholders.mjs`. Drop the real file in at the same path — nothing else changes. |
| Brand logo files, and which brands may be shown as logos at all | `public/logos/` is empty, so all 32 tiles render as the dashed name fallback — the expected state. Drop `<slug>.svg` in (slug from `brandSlug()` in `src/data/brands.ts`) and that tile becomes a logo. The build rejects an SVG that is really a raster (§8). **The open question is still which manufacturers may be shown as a logo at all.** |
| Real reply-time commitment | Not shown anywhere: the StatBand is removed (§7). `src/data/stats.ts` holds the unconfirmed figure with `confirmed: false`. No page may state a reply time until the business confirms one. |
| Professionally written Chinese copy | `src/i18n/zh.ts` and the `zh` fields in `src/data/*.ts`. The prototype's strings plus a first translation of everything added in the redesign (hero, homepage, page headers, closing CTA). None reviewed. Needs a native speaker. |
| Open Graph image | Deliberately absent rather than fabricated. `summary` card only until there is a real photograph. |
| Favicon | `public/favicon.svg` is provisional — a white "T" and a cyan dot on navy, real vector paths, no raster. Replace if there is a real mark. |
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

- **One real quote submission**, after the environment variables are set. The
  offline test cannot prove Cloudflare routes `/api/quote` or that the provider
  accepts the mail with attachments.

- Load times measured from inside mainland China (§8). Not yet done.
- ICP filing, if hosting moves inside mainland China.
- Lighthouse: performance ≥ 90 mobile, accessibility 100. Not yet measured —
  worth doing once there is a section below the fold to scroll to.
- `Strict-Transport-Security` is set without `preload`. Adding `preload` commits
  the domain to the HSTS preload list and is painful to undo, so it is a
  deliberate opt-in, not a default.

---

## Notes for the next pass

- **Data drives several routes at once.** `src/data/categories.ts` feeds the
  homepage ecosystem, `/products/` and the footer; `src/data/industries.ts`
  feeds the homepage preview and `/industries/`. Each entry's `slug` is its
  element id on the detail page — `categoryHref()` / `industryHref()` in
  `src/data/navigation.ts` build the links. Rename a slug and the link follows.
- **A new detail route** is `PageHero` + its sections + `ClosingCta`, a page in
  `src/pages/` and its twin in `src/pages/zh/`, a `meta.*` title and
  description in both dictionaries, and an entry in `PAGES` in
  `scripts/check-budget.mjs`.
- Scroll reveal: mark a block `.rv`; `src/scripts/reveal.ts`, loaded once from
  `Base.astro`, handles the rest.
- Navy sections get `class="dark-surface"`, which flips the foreground roles,
  the control border and the focus ring in one place. `PageHero` and
  `RollingHero` also carry `data-header-dark-zone`, which starts the header dark.
- Cyan `#06b6d4` is 2.4:1 on white. It is a fill (buttons on navy, the header
  CTA) or a decoration — never text, never a focus ring, on a light ground.
- Component media queries use 720px and 1040px only.
- Never set a `style` attribute or `setAttribute('style', …)` — CSP. Assigning
  `el.style.foo` from script is fine.
- **Adding Chinese copy needs nothing extra.** Put it in `src/i18n/zh.ts` or a
  `Localised` field under `src/data/`; the next build rebuilds the font subset.
  Commit the regenerated `public/fonts/noto-sans-sc.*`.
- Re-run `npm run budget` at the end of every pass. The worst route is at 47%
  with stand-ins; real photography is what spends the rest (see "Real
  photography vs the §8 budget" above).
