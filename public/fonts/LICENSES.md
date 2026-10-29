# Font licences

Every face on this site is self-hosted (CLAUDE.md §8 — Google Fonts is
unreachable from mainland China). Self-hosting means we redistribute the files,
so the licence terms travel with them.

| Face | Files | Licence | Redistribution |
|---|---|---|---|
| General Sans | `GeneralSans-{Regular,Medium,Semibold,Bold}.woff2` | ITF Free Font Licence (Indian Type Foundry, via Fontshare) | Permitted, including webfont use |
| Roboto | `roboto/Roboto-{latin,latin-ext}.woff2` | Apache License 2.0 | Permitted with attribution |
| Noto Sans SC | `noto-sans-sc.woff2` | SIL Open Font License 1.1 | Permitted; the OFL text must ship with the font |

Roboto and Noto Sans SC are variable fonts, so one file covers every weight §4
asks for — Roboto keeps the full 100–900 axis, Noto Sans SC is narrowed to
400–700.

`noto-sans-sc.woff2` is a **subset**: it holds only the CJK glyphs this site's
copy actually uses, built by `scripts/subset-noto-sans-sc.mjs` from the upstream
variable font. The OFL permits subsetting and modification; note that the OFL
also forbids using the Reserved Font Name, which is why the file is not renamed
to something Noto-branded beyond the original family name.

## Outstanding before launch

The full licence texts are not in this directory yet. Add them as:

- `GeneralSans-LICENSE.txt` — from the Fontshare download bundle for General Sans
- `roboto/LICENSE.txt` — Apache 2.0
- `noto-sans-sc-OFL.txt` — SIL OFL 1.1

The OFL in particular *requires* the licence to accompany the font file, and
that applies to a subset as much as to the original, so this is a compliance
item rather than tidiness.

Rebuild the Noto Sans SC subset with `npm run fonts:sc` (it also runs
automatically before every build).
