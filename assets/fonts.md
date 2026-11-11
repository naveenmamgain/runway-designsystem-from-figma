# Fonts — Runway (Cap-App)

## Runway typeface
| Token | Value |
|---|---|
| `Typography - Typeface / Cap App - Typeface` (mode *Primary*) → `--cap-app-typeface` | **Inter** |

Every one of the 43 local text styles uses **Inter**. Weights used (Figma font style → CSS weight):

| Figma style | CSS `font-weight` | Used by |
|---|---|---|
| Regular | 400 | Body/*/Reg, Label/*/Reg, (sample) Body |
| Medium | 500 | SubTitle/*/Med, Body/*/Med, Label/*/Med, Button/*/Med, (sample) Caption |
| Semi Bold | 600 | Title/*/SemiBold, SubTitle/*/SemiBold, Button/*/SemiBold |
| Bold | 700 | Display/*, Title/*/Bold, SubTitle/*/Bold, Button/*/Bold, OA-card fare numerals, (sample) Heading-Large |

No italic styles are used. Text nodes report `variationSettings: { wght, slnt }`, so the Figma file uses the
**Inter variable font** (axes `wght`, `slnt`); static Inter files at 400/500/600/700 render identically for these weights.

**Decision (2026-11-11):** Inter is the font for the whole system, including the input field whose Figma text currently
resolves to Noto Sans (see below).

## Where to get the files
Figma files do not contain font binaries; Inter has to be supplied by the app.
- **Google Fonts**: <https://fonts.google.com/specimen/Inter> (variable `Inter[opsz,wght].ttf` + statics). Licence: SIL Open Font License 1.1.
- **Upstream**: <https://github.com/rsms/inter/releases> (`InterVariable.woff2`, `Inter-*.woff2`), same licence.
- Android: bundle the TTFs in `res/font/` or use downloadable fonts via Google Play Services' font provider.

Web example:
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
```

## Other fonts found in bindings (not Runway)
| Font | Source | Where |
|---|---|---|
| **Noto Sans** | remote variable `Typography - Base Tokens / Font Family/Captain App Font` (another library) | Input Field input/message/caption text (remote `Typography - Base Tokens` variables are also bound on the OA-card and Bottom Nav pages) |
| **Poppins** | remote variable `Typography / Hopr Font Family` (Hopr design system) | private `.Input` / `.Input Caption` sets |

Both are listed in EXPORT_NOTES.md as inconsistencies; implementations here use Inter.
