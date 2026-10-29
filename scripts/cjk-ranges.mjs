/**
 * The Unicode ranges no Latin face in the stack covers, so anything here falls
 * through to Noto Sans SC (CLAUDE.md §4 — "Noto Sans SC appended to both text
 * stacks": Latin renders in General Sans or Roboto, CJK falls through).
 *
 * Shared by subset-noto-sans-sc.mjs and verify-noto-sans-sc.mjs on purpose. The
 * font's coverage, its declared unicode-range and the postbuild check must all
 * be the same set; if these lists were duplicated they would eventually drift,
 * and the gap would show up as a silent system-font fallback in Chinese — the
 * exact failure the verify step exists to prevent.
 *
 * Kana and Hangul are included even though the site has none: if one appears,
 * that is precisely the case worth catching.
 */
export const CJK_RANGES = [
  [0x2e80, 0x2eff], // CJK radicals supplement
  [0x2f00, 0x2fdf], // Kangxi radicals
  [0x3000, 0x303f], // CJK symbols and punctuation — 。、（）《》
  [0x3040, 0x30ff], // Hiragana, Katakana
  [0x3100, 0x312f], // Bopomofo
  [0x3190, 0x319f], // Kanbun
  [0x31c0, 0x31ef], // CJK strokes
  [0x3200, 0x33ff], // Enclosed CJK, CJK compatibility
  [0x3400, 0x4dbf], // CJK extension A
  [0x4e00, 0x9fff], // CJK unified ideographs
  [0xa960, 0xa97f], // Hangul jamo extended-A
  [0xac00, 0xd7af], // Hangul syllables
  [0xf900, 0xfaff], // CJK compatibility ideographs
  [0xfe30, 0xfe4f], // CJK compatibility forms
  [0xff00, 0xffef], // Halfwidth and fullwidth forms — ：，％
  [0x20000, 0x3ffff], // CJK extensions B onward
];

/** True when this codepoint would be drawn by Noto Sans SC rather than a Latin face. */
export function needsCJKFace(codepoint) {
  return CJK_RANGES.some(([lo, hi]) => codepoint >= lo && codepoint <= hi);
}
