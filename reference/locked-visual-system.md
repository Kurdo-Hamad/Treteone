# TRETE ONE
## LOCKED VISUAL SYSTEM + HERO DIRECTION — AMENDED

**Status:** reference document. `CLAUDE.md` is authoritative for building.
This is the source the build spec was derived from, kept so the reasoning stays
traceable.

**Amended from the original in three places.** Each is marked ⚠ AMENDED where it
appears: the dark focus colour (§21), the hero hotspot layer (§10–§11) and the
homepage search block (§18). Everything else stands as originally locked.

This document supersedes any earlier visual instruction that conflicts with it —
including the ink/amber/graphite palette used in build passes 1–5.

---

# 1. DESIGN DIRECTION

Trete One should look like a:

> **Premium industrial technology and procurement platform.**

Visual character:

Serious · Premium · Modern · Technical · Precise · International ·
Engineering-led · Confident · Clean · Sophisticated

The site must NOT look like:

- A generic industrial trading website
- An old-fashioned machinery supplier
- A template-based corporate website
- A commodity catalogue
- A futuristic sci-fi website
- A website overloaded with blue gradients
- A website filled with generic industrial icons

Appropriate for buyers in oil & gas, refining, petrochemical, cement, power,
manufacturing, steel, mining and water.

---

# 2. LOCKED COLOUR SYSTEM

## Brand core
```css
--color-navy:       #051b38;
--color-ink:        #0a0816;
--color-cyan:       #06b6d4;
--color-cyan-light: #67e8f9;
--color-muted-blue: #88acda;
--color-light:      #e3e7e8;
--color-white:      #ffffff;
```

## Semantic tokens
```css
/* surfaces */
--surface-page:         #ffffff;
--surface-primary:      #051b38;
--surface-tinted:       #E5E7EB;
--surface-data:         #051b38;
--surface-anchor:       #051b38;
--surface-card:         #F9FAFB;
--surface-card-tinted:  #E5E7EB;

/* text */
--text-primary:    #111827;
--text-secondary:  #6B7280;
--text-muted:      #4b6fa5;
--text-body:       #374151;
--text-inverse:    #ffffff;
--text-link-light: #155e75;
--text-link-dark:  #67e8f9;

/* accent */
--accent-electric: #06b6d4;

/* feedback */
--feedback-success: #16a34a;
--feedback-error:   #dc2626;
--feedback-info:    #06b6d4;
--feedback-disabled-text:    #88acda;
--feedback-disabled-surface: #e3e7e8;

/* shadows */
--shadow-raised:   0 2px 8px rgba(5,27,56,.08);
--shadow-floating: 0 8px 16px rgba(5,27,56,.12);
--shadow-modal:    0 20px 60px rgba(5,27,56,.18);
```

Use these values exactly. Do not replace them with black, charcoal, amber, orange,
gold, green, purple or gradient-heavy alternatives.

The primary relationship is **navy + white + cyan**, with ink, muted blue and light
neutral providing supporting contrast.

**Cyan is an accent, never the dominant page colour.**

---

# 3. TYPOGRAPHY — LOCKED

```css
--font-stack-display: "General Sans", Arial, sans-serif;   /* 400 500 600 700 */
--font-stack-body:    "Roboto", sans-serif;                /* 400 */
--font-stack-mono:    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

General Sans is self-hosted.

---

# 4. FONT FILES

General Sans self-hosted from `/fonts/`. Copy the four existing WOFF2 files from the
MesoAxis implementation.

Do not substitute Inter, Geist, Manrope, Poppins, Montserrat, Arial or a Google font
unless the exact General Sans files are genuinely unavailable.

The intended system is **General Sans + Roboto**.

Note: Chinese requires Noto Sans SC appended to both text stacks. Neither General Sans
nor Roboto carries CJK glyphs. It is self-hosted and subset at build time from the
site's own copy.

---

# 5. TYPE SCALE — LOCKED

```css
--fs-h1:        clamp(2.75rem, 2.13rem + 2.63vw, 4.5rem);
--fs-h2:        clamp(1.75rem, 1.49rem + 1.13vw, 2.5rem);
--fs-h3:        1.125rem;
--fs-body:      clamp(1.125rem, 1.05rem + 0.34vw, 1.35rem);
--fs-hero-lead: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
--fs-nav:       20px;
```

---

# 6. TRACKING & LEADING

```css
--tracking-display: -0.035em;   --leading-display: 1.08;
--tracking-h1:      -0.025em;   --leading-h1:      1.12;
--tracking-h23:     -0.015em;   --leading-h23:     1.2;
--tracking-body:     0em;       --leading-body:    1.62;
--tracking-mono:     0.02em;    --leading-mono:    1.42;
```

Chinese overrides: leading 1.85, tracking 0 on headings, no italics.

---

# 7. TYPOGRAPHY WEIGHT RULES

```
H1 / H2                     General Sans 700
H3                          General Sans 600
H4–H6                       General Sans 500
Buttons                     General Sans 500
Body                        Roboto 400
Code / technical identifiers  Monospace 400
```

Eyebrow labels: General Sans 500, 0.875rem, uppercase, 0.08em tracking.

Do not randomly vary font weights. Hierarchy comes from size, weight, spacing,
position and contrast — never decorative effects.

---

# 8. HERO — FINAL DIRECTION ⚠ AMENDED

**Original:** Option A, a generated cinematic facility image with an interactive
hotspot layer.

**Amended:** full-bleed rolling photography, five frames crossfading with a slow
zoom, restyled into the navy system.

Two reasons. The generated facility image cannot be produced inside this build
pipeline, so it would have to arrive from outside as a dependency the project can't
satisfy. And the hotspot layer is hover-driven, which conflicts with the rule that a
plant engineer on a phone is the primary visitor — hover has no equivalent on touch,
so the site's signature interaction would be unavailable to most of its audience.

The photography should still do what Option A was reaching for: show an **industrial
ecosystem**, not a single machine, and not one dominant refinery tower. Processing
equipment, pumps, compressors, motors, pipe networks, valves, instrumentation,
control infrastructure, electrical systems.

Suitable context: oil & gas processing, refinery, petrochemical, advanced
manufacturing, integrated process plant.

---

# 9. HERO IMAGE DIRECTION

When commissioning or selecting the five hero photographs:

- A real modern industrial operation, shot from a slightly elevated three-quarter
  perspective where possible
- Operational and engineered rather than staged
- Realistic materials — stainless, painted steel, concrete, glass
- Strong depth from foreground equipment to background structures
- Generous, calm negative space on the left for the headline and CTAs
- Primary visual interest centre-right
- No important equipment directly behind text
- No people in the main hero frames
- No visible third-party logos

Spacious, premium and calm rather than chaotic.

Current state: five Unsplash stand-ins are in place so the design can be judged. None
is a photograph of Trete One. All 33 site images still need replacing before launch.

---

# 10. HERO INTERACTION LAYER ⚠ AMENDED — NOT BUILT

The original specified 6–8 interactive hotspots over the facility image, expanding on
hover into translucent information panels.

**This is not being built.** Reason as §8: hover-only interaction fails the mobile-first
rule, and the mechanism would need a touch equivalent that amounts to a different
component entirely.

What the hero carries instead: frame counter, localised caption, progress bars,
clickable position controls, and a subtle scroll cue. All keyboard-operable. Frozen
under `prefers-reduced-motion`.

The category navigation the hotspots were meant to provide lives in the product
ecosystem block (§19) and the `/products` route, where it works on every device.

---

# 11. HOTSPOT INTERACTION ⚠ AMENDED — WITHDRAWN

Withdrawn with §10.

The principle it expressed is worth keeping and applies to every interactive element
on the site: interaction should feel like **premium technical exploration**, not a
video game. No aggressive animation, no glow, no floating panels.

---

# 12. HERO LAYOUT

```
---------------------------------------------------------
|  INDUSTRIAL SUPPLY & SOURCING                         |
|                                                       |
|  THE PARTS, EQUIPMENT                                 |
|  & TECHNOLOGY                                         |
|  BEHIND INDUSTRY.                  ROLLING            |
|                                    INDUSTRIAL         |
|  From critical spare parts         PHOTOGRAPHY        |
|  to complete industrial                               |
|  equipment...                                         |
|                                                       |
|  [ EXPLORE PRODUCTS ]  [ REQUEST A QUOTE ]            |
|                                                       |
---------------------------------------------------------
```

Text occupies roughly 40–45% of the composition; the visual 55–60%.
Do not place text over highly detailed machinery.

---

# 13. HERO BACKGROUND

Full-bleed image with controlled crossfade and a slow zoom.

Apply a navy overlay only where text legibility requires it. Do not heavily tint the
whole photograph blue — the original industrial materials and detail must stay
visible.

---

# 14. HERO COPY

```
Eyebrow     INDUSTRIAL SUPPLY & SOURCING
H1          The Parts, Equipment & Technology Behind Industry.
Lead        From critical spare parts to complete industrial equipment, we source
            and supply what keeps industrial operations running.
Primary     EXPLORE PRODUCTS
Secondary   REQUEST A QUOTE
Tertiary    CAN'T FIND A PART?
```

Both languages, through the i18n layer. No hardcoded strings.

---

# 15. HERO MICRO-INTERACTION

A subtle scroll cue at the bottom of the hero:

```
EXPLORE TRETE ONE
↓
```

Not a large animated arrow.

---

# 16. NAVIGATION VISUAL DESIGN

Desktop: General Sans, 20px, 500 weight, clean spacing, strong contrast, minimal
visual noise.

Primary CTA:
```css
background: #06b6d4;
color: #051b38;
```
Restrained hover. No glowing neon buttons.

---

# 17. NAVIGATION BEHAVIOUR

Transparent or semi-transparent over the hero while it remains readable. After
scrolling, a clean solid navy or white treatment depending on the section. Subtle
transition, no excessive blur.

---

# 18. HOMEPAGE VISUAL RHYTHM ⚠ AMENDED

Alternate compositions. Never repeat:

```
Heading
Paragraph
4 cards
Heading
Paragraph
4 cards
```

The rhythm:

1. **Hero** — large cinematic composition
2. **Positioning** — one short statement, generous white space
3. **Product ecosystem** — large interactive category system
4. **Industries** — image-led cards
5. **Hard-to-find** — dark navy conversion section
6. **Brands** — clean white strip
7. **Final CTA** — large navy closing statement

**Amendment: the Search block is removed.** The original listed a search field as the
second block. There is no product database behind the site, so a search that looks
like search and returns nothing is worse than no search — it breaks trust at the exact
moment the site is trying to establish it. Reinstate when a real product database
exists.

The detail the homepage no longer carries lives on its own routes: `/products`,
`/industries`, `/sourcing`, `/brands`, `/about`, `/quote`.

This variation is critical to a premium feel.

---

# 19. PRODUCT ECOSYSTEM VISUAL STYLE

Not generic SaaS cards. Use large typography, equipment imagery, asymmetric layouts,
real hover and focus states, subtle movement, technical labels, strong whitespace.

```
01
AUTOMATION
& CONTROL

PLC · DCS · SCADA · HMI · DRIVES

EXPLORE →
```

The visual should communicate the category immediately.

---

# 20. DESIGN SYSTEM RULE

Use the locked tokens consistently across the entire site. Do not create one palette
for the homepage and another for internal pages.

Every page shares the same typography, buttons, spacing system, navigation, card
language, interaction language, colour tokens, focus states and accessibility
conventions.

---

# 21. ACCESSIBILITY ⚠ AMENDED

```css
--focus-light:  #0369a1;
--focus-dark:   #67e8f9;   /* amended from #0369a1 */
--focus-width:  2px;
--focus-offset: 2px;
```

**Amendment: the dark focus colour is changed.** `#0369a1` against navy `#051b38`
measures roughly 1.9:1 — a focus ring almost nobody can see, which fails the
requirement in this same section that focus be visible. Cyan-light `#67e8f9` measures
roughly 11:1 on navy. `--focus-light` is unchanged and passes on white.

Interactive elements must have a visible hover state, a visible focus state, keyboard
operation, an adequate touch target and an accessible label. Never rely on colour
alone to communicate interaction.

Additional floors carried from the build: contrast AA minimum throughout; text on dark
navy no lighter than opacity .50; a real `alt` on every image or `alt=""` if
decorative; `prefers-reduced-motion` freezes the hero, marquees and reveals; `lang`
correct per route.

---

# 22. SHADOW SYSTEM

Use only the navy-tinted shadows in §2, and sparingly. Avoid generic black shadows.
Avoid excessive shadows.

---

# 23. FINAL VISUAL TEST

At normal browser zoom:

- Does Trete One immediately look premium?
- Does it look like an international industrial technology company?
- Does the navy/cyan system feel sophisticated rather than generic?
- Is General Sans clearly visible in the headline hierarchy?
- Does the hero immediately communicate industrial scale?
- Is the homepage focused rather than overloaded?
- Can a visitor quickly understand what Trete One supplies, who it serves, how it
  sources equipment, and how to request a quote?

If any answer is no, revise.

---

# 24. IMPLEMENTATION RULE

Do not overwrite existing content simply to create visual effects.

The objective is better architecture, better visual hierarchy, better UX and better
brand presentation. Existing useful content is preserved and reorganised into the
standalone routes. The homepage becomes the premium gateway; detail belongs on the
relevant page.

---

# 25. FINAL BRAND EXPERIENCE

First impression:
> "This is a serious industrial sourcing company."

Exploring:
> "They cover a very broad range of industrial equipment and components."

Unable to find a part:
> "I can send them the part number and they will source it."

At the RFQ:
> "This company makes procurement easy."

That is the complete UX objective.

---

# 26. WHAT THIS DOCUMENT DOES NOT COVER

Content, not design, and still outstanding:

- Registered Chinese company name and business licence number
- 33 real photographs. Everything currently in the build is an Unsplash stand-in
- Brand logo files, and which brands may be shown as logos at all
- A confirmed reply-time commitment
- Chinese copy reviewed by a native speaker

None of it may be invented. Placeholders only, listed in the README.
