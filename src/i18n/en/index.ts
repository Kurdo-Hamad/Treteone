import { about } from './about';
import { brands } from './brands';
import { common } from './common';
import { home } from './home';
import { industries } from './industries';
import { products } from './products';
import { quote } from './quote';
import { sourcing } from './sourcing';

/**
 * English UI copy, assembled from one module per route.
 *
 * Why split: three build streams work on the homepage, the detail routes and
 * brands/quote at the same time. One file per route means each stream edits
 * only its own module and nobody collides on a shared dictionary.
 *
 * Ownership:
 *   common      header, footer, CTAs, document defaults, shared page chrome
 *   home        hero and homepage sections
 *   products    /products, and the scope band it carries
 *   industries  /industries
 *   sourcing    /sourcing, and the five-step process
 *   brands      /brands
 *   about       /about
 *   quote       /quote and the form
 *
 * `UIKey` is still one union over every key, so t('…') works unchanged.
 */
const modules = { common, home, products, industries, sourcing, brands, about, quote };

// A key defined in two modules would silently lose one value to the spread
// below. Fail the build instead. This runs at build time only — nothing in
// src/i18n is shipped to the browser.
const seen = new Map<string, string>();
for (const [moduleName, strings] of Object.entries(modules)) {
  for (const key of Object.keys(strings)) {
    const owner = seen.get(key);
    if (owner) throw new Error(`i18n key "${key}" is defined in both ${owner} and ${moduleName}`);
    seen.set(key, moduleName);
  }
}

export const en = {
  ...common,
  ...home,
  ...products,
  ...industries,
  ...sourcing,
  ...brands,
  ...about,
  ...quote,
};

export type UIStrings = typeof en;
export type UIKey = keyof UIStrings;
