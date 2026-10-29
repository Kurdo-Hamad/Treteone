# Temporary stand-in photography

**Every image in this directory is a stand-in and must be replaced before
launch.** They are Unsplash photographs, not photographs of Trete One. They
exist so the design can be reviewed with real imagery instead of grey plates.

CLAUDE.md §10 still lists all 33 as outstanding. Nothing here resolves it.

## What is wrong with them, specifically

- They are stock photographs of *somebody else's* plant, warehouse and
  equipment. §1's second job is surviving the "are these people real?" check,
  and a buyer who reverse-image-searches a stock photo has their answer.
- `about/portrait.jpg` stands in for "our office and staff". It is a warehouse
  aisle with **no people in it** — deliberately, because a stock photograph of a
  stranger presented as our team is the worst version of this problem. It is
  still not our warehouse.
- Fourteen photographs cover thirty-three slots, so some repeat across
  sections. No photograph repeats *within* a section.

## Replacing them

Overwrite the file. Nothing else changes — the filename is the contract, the
subject each one should show is in `scripts/make-placeholders.mjs`, and Astro
re-derives every AVIF and WebP rendition at build.

`npm run placeholders` regenerates the "PHOTOGRAPH PENDING" plate for any slot
with no image. It will not overwrite an existing file unless you pass
`-- --force`.

## Source

All from [unsplash.com](https://unsplash.com) under the Unsplash Licence, which
permits commercial use without attribution. Credited here anyway, and so that
each one can be traced and removed.

The photo IDs are the same ones in `reference/index.html` — the approved
prototype's own choices.

### hero

| file | Unsplash photograph | photographer |
|---|---|---|
| `src/assets/hero/hero-01.jpg` | [P9igDaOnlJ0](https://unsplash.com/photos/P9igDaOnlJ0) | gez xavier mansfield |
| `src/assets/hero/hero-02.jpg` | [C3DfIgig1j8](https://unsplash.com/photos/C3DfIgig1j8) | frantisek duris |
| `src/assets/hero/hero-03.jpg` | [r6fBLCriUgg](https://unsplash.com/photos/r6fBLCriUgg) | shavr ik |
| `src/assets/hero/hero-04.jpg` | [5OvIgxlLlxs](https://unsplash.com/photos/5OvIgxlLlxs) | declan sun |
| `src/assets/hero/hero-05.jpg` | [_VBsh_IKsD8](https://unsplash.com/photos/_VBsh_IKsD8) | lisk obe |

### products

| file | Unsplash photograph | photographer |
|---|---|---|
| `src/assets/products/automation-control.jpg` | [r6fBLCriUgg](https://unsplash.com/photos/r6fBLCriUgg) | shavr ik |
| `src/assets/products/instrumentation-measurement.jpg` | [C3DfIgig1j8](https://unsplash.com/photos/C3DfIgig1j8) | frantisek duris |
| `src/assets/products/electrical-power.jpg` | [SLIFI67jv5k](https://unsplash.com/photos/SLIFI67jv5k) | ant rozetsky |
| `src/assets/products/motors-drives-transmission.jpg` | [_VBsh_IKsD8](https://unsplash.com/photos/_VBsh_IKsD8) | lisk obe |
| `src/assets/products/pumps.jpg` | [qZTv5-paTss](https://unsplash.com/photos/qZTv5-paTss) | peter herrmann |
| `src/assets/products/compressors-compressed-air.jpg` | [5OvIgxlLlxs](https://unsplash.com/photos/5OvIgxlLlxs) | declan sun |
| `src/assets/products/valves-flow-control.jpg` | [P9igDaOnlJ0](https://unsplash.com/photos/P9igDaOnlJ0) | gez xavier mansfield |
| `src/assets/products/mechanical-mro.jpg` | [k76Iqu0S120](https://unsplash.com/photos/k76Iqu0S120) | brando louhivaara |
| `src/assets/products/hydraulic-pneumatic.jpg` | [BauPLtw8VfM](https://unsplash.com/photos/BauPLtw8VfM) | shefali lincoln |
| `src/assets/products/process-equipment.jpg` | [QmW6MD2SeFM](https://unsplash.com/photos/QmW6MD2SeFM) | omid roshan |
| `src/assets/products/industrial-machinery.jpg` | [MVA-zlTQdSE](https://unsplash.com/photos/MVA-zlTQdSE) | worksite ltd |
| `src/assets/products/industrial-consumables.jpg` | [-aCrA9FmT8Y](https://unsplash.com/photos/-aCrA9FmT8Y) | alberto rodriguez |

### scope

| file | Unsplash photograph | photographer |
|---|---|---|
| `src/assets/scope/component.jpg` | [k76Iqu0S120](https://unsplash.com/photos/k76Iqu0S120) | brando louhivaara |
| `src/assets/scope/spare-part.jpg` | [P9igDaOnlJ0](https://unsplash.com/photos/P9igDaOnlJ0) | gez xavier mansfield |
| `src/assets/scope/assembly.jpg` | [qZTv5-paTss](https://unsplash.com/photos/qZTv5-paTss) | peter herrmann |
| `src/assets/scope/machine.jpg` | [_VBsh_IKsD8](https://unsplash.com/photos/_VBsh_IKsD8) | lisk obe |
| `src/assets/scope/complete-system.jpg` | [SLIFI67jv5k](https://unsplash.com/photos/SLIFI67jv5k) | ant rozetsky |

### industries

| file | Unsplash photograph | photographer |
|---|---|---|
| `src/assets/industries/oil-gas.jpg` | [MVA-zlTQdSE](https://unsplash.com/photos/MVA-zlTQdSE) | worksite ltd |
| `src/assets/industries/refining-petrochemical.jpg` | [5OvIgxlLlxs](https://unsplash.com/photos/5OvIgxlLlxs) | declan sun |
| `src/assets/industries/power-generation.jpg` | [C3DfIgig1j8](https://unsplash.com/photos/C3DfIgig1j8) | frantisek duris |
| `src/assets/industries/cement.jpg` | [BauPLtw8VfM](https://unsplash.com/photos/BauPLtw8VfM) | shefali lincoln |
| `src/assets/industries/manufacturing.jpg` | [r6fBLCriUgg](https://unsplash.com/photos/r6fBLCriUgg) | shavr ik |
| `src/assets/industries/steel-metals.jpg` | [SLIFI67jv5k](https://unsplash.com/photos/SLIFI67jv5k) | ant rozetsky |
| `src/assets/industries/mining.jpg` | [QmW6MD2SeFM](https://unsplash.com/photos/QmW6MD2SeFM) | omid roshan |
| `src/assets/industries/water-wastewater.jpg` | [P9igDaOnlJ0](https://unsplash.com/photos/P9igDaOnlJ0) | gez xavier mansfield |
| `src/assets/industries/facilities-institutions.jpg` | [-aCrA9FmT8Y](https://unsplash.com/photos/-aCrA9FmT8Y) | alberto rodriguez |

### sourcing

| file | Unsplash photograph | photographer |
|---|---|---|
| `src/assets/sourcing/plate.jpg` | [O2XbR4lXhDM](https://unsplash.com/photos/O2XbR4lXhDM) | frames for your heart |

### about

| file | Unsplash photograph | photographer |
|---|---|---|
| `src/assets/about/portrait.jpg` | [-aCrA9FmT8Y](https://unsplash.com/photos/-aCrA9FmT8Y) | alberto rodriguez |
