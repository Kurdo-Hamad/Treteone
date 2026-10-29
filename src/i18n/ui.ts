import { en, type UIKey, type UIStrings } from './en/index';
import { zh } from './zh/index';

/**
 * CLAUDE.md §2 — real localised routes, not a client-side text swap.
 * `/` is English, `/zh/` is Chinese, and each is separately indexable.
 * Nothing here runs in the browser: every string is resolved at build time.
 */

export const languages = {
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en' },
  zh: { label: '中文', short: '中文', htmlLang: 'zh-CN', ogLocale: 'zh_CN' },
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';
export const allLangs = Object.keys(languages) as Lang[];

const dictionaries: Record<Lang, UIStrings> = { en, zh };

export function isLang(value: string | undefined): value is Lang {
  return value === 'en' || value === 'zh';
}

/** Reads the language out of the route: /zh/anything -> 'zh', everything else -> 'en'. */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return isLang(first) ? first : defaultLang;
}

export function useTranslations(lang: Lang) {
  const dict = dictionaries[lang];
  return function t<K extends UIKey>(key: K): UIStrings[K] {
    return dict[key];
  };
}

/**
 * Prefixes a site-root path with the language segment.
 * localisePath('/', 'zh')        -> '/zh/'
 * localisePath('/#quote', 'zh')  -> '/zh/#quote'
 * The default locale is unprefixed (astro.config: prefixDefaultLocale false).
 */
export function localisePath(path: string, lang: Lang): string {
  const [rawPath = '/', hash] = path.split('#');
  const clean = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const base = lang === defaultLang ? clean : `/${lang}${clean === '/' ? '/' : clean}`;
  return hash ? `${base}#${hash}` : base;
}

/** The same page in every other language, for the hreflang alternates. */
export function alternateLinks(url: URL): { lang: Lang; hreflang: string; href: string }[] {
  const pathname = url.pathname;
  const [, first] = pathname.split('/');
  const stripped = isLang(first) ? pathname.slice(first.length + 1) || '/' : pathname;
  return allLangs.map((lang) => ({
    lang,
    hreflang: languages[lang].htmlLang,
    href: localisePath(stripped, lang),
  }));
}

export type { UIKey, UIStrings };

/**
 * A value that exists in every language. Data modules under src/data use this
 * so that one definition drives the nav, the page indexes and the footer at once (§3),
 * while components still never hold a hardcoded string.
 */
export type Localised = Record<Lang, string>;

export function pick(value: Localised, lang: Lang): string {
  return value[lang];
}
