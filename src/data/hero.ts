import type { ImageMetadata } from 'astro';
import type { Localised } from '~/i18n/ui';

import hero01 from '~/assets/hero/hero-01.jpg';
import hero02 from '~/assets/hero/hero-02.jpg';
import hero03 from '~/assets/hero/hero-03.jpg';
import hero04 from '~/assets/hero/hero-04.jpg';
import hero05 from '~/assets/hero/hero-05.jpg';

/**
 * The five hero frames (CLAUDE.md §6.2).
 *
 * ⚠ §10 — these are clearly-marked placeholder plates, not photography. The
 * `caption` is the subject the real photograph should show. Replacing a slide
 * means dropping the real file in at src/assets/hero/hero-0N.jpg; nothing here
 * changes and Astro re-derives the AVIF/WebP renditions.
 *
 * The images carry no alt text on purpose: the roll is decorative (§6.2 puts
 * the meaning in the visible caption, and §9 allows alt="" for decoration).
 * When real photography lands, review whether each frame has earned real alt.
 */
export interface HeroSlide {
  readonly image: ImageMetadata;
  readonly caption: Localised;
  /** false until a real photograph replaces the placeholder plate. */
  readonly real: boolean;
}

export const heroSlides: readonly HeroSlide[] = [
  {
    image: hero01,
    caption: { en: 'Substation pipework and valves', zh: '变电站管道与阀门' },
    real: false,
  },
  {
    image: hero02,
    caption: { en: 'Plant control room', zh: '工厂控制室' },
    real: false,
  },
  {
    image: hero03,
    caption: { en: 'Machine control panel', zh: '机器控制面板' },
    real: false,
  },
  {
    image: hero04,
    caption: { en: 'Process pipe run', zh: '工艺管道' },
    real: false,
  },
  {
    image: hero05,
    caption: { en: 'Workshop lathe', zh: '车间车床' },
    real: false,
  },
];
