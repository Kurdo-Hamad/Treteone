import type { ImageMetadata } from 'astro';
import type { UIKey } from '~/i18n/ui';

import heroValves from '~/assets/hero/hero-01.jpg';
import heroControlRoom from '~/assets/hero/hero-02.jpg';
import heroControls from '~/assets/hero/hero-03.jpg';
import heroPlant from '~/assets/hero/hero-04.jpg';
import automation from '~/assets/products/automation-control.jpg';
import consumables from '~/assets/products/industrial-consumables.jpg';
import fluid from '~/assets/products/hydraulic-pneumatic.jpg';
import instruments from '~/assets/products/instrumentation-measurement.jpg';
import mro from '~/assets/products/mechanical-mro.jpg';
import motors from '~/assets/products/motors-drives-transmission.jpg';
import pumps from '~/assets/products/pumps.jpg';
import valves from '~/assets/products/valves-flow-control.jpg';
import warehouse from '~/assets/about/portrait.jpg';
import transport from '~/assets/sourcing/plate.jpg';

/**
 * PREVIEW ONLY — Unsplash stand-in photographs (src/assets/STAND-INS.md).
 *
 * They let the design be reviewed with real imagery. None of them shows
 * Treteone, so before launch either replace the files with Treteone's own
 * photographs (same filenames, nothing else changes) or set
 * SHOW_STAND_INS to false, which puts every slot back to its labelled
 * placeholder (CLAUDE.md §12).
 *
 * The images are files in this repo, processed by astro:assets and served
 * from the site's own domain. Nothing is fetched from unsplash.com at run
 * time — that host is not guaranteed to load in mainland China (§10).
 *
 * Keyed by the slot's subject key, so each photograph is chosen for the slot
 * it fills. Rendered with alt="" because a stand-in does not show what the
 * subject describes; the surrounding text carries the meaning.
 *
 * "Treteone office, Liwan District" deliberately has no stand-in: a stock
 * photograph presented as the company's own office is exactly what §1's
 * "are these people real?" check catches.
 */
export const SHOW_STAND_INS = true;

const standIns: Partial<Record<UIKey, ImageMetadata>> = {
  // hero
  'home.hero.spares.subject': heroValves,
  'home.hero.equipment.subject': heroPlant,
  'home.hero.automation.subject': heroControls,
  'home.hero.obsolete.subject': heroControlRoom,
  // "Three ways an enquiry arrives"
  'home.enquiries.module.subject': automation,
  'home.enquiries.pump.subject': pumps,
  'home.enquiries.boq.subject': consumables,
  // positioning split
  'home.position.subject': warehouse,
  // capability grid
  'home.caps.automation.subject': automation,
  'home.caps.instruments.subject': instruments,
  'home.caps.valves.subject': valves,
  'home.caps.pumps.subject': pumps,
  'home.caps.motors.subject': motors,
  'home.caps.fluid.subject': fluid,
  'home.caps.mro.subject': mro,
  'home.caps.consumables.subject': consumables,
  // "About our work"
  'home.work.quote.subject': transport,
};

/** The stand-in photograph for a slot, or undefined to keep the placeholder. */
export function standIn(subjectKey: UIKey): ImageMetadata | undefined {
  return SHOW_STAND_INS ? standIns[subjectKey] : undefined;
}
