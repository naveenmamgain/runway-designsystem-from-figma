# runway-designsystem-from-figma

Runway, the design system for the Rapido Captain app (Cap-App), exported from Figma
(`GEdvNUzFqwB2gAbQKZRsIn`) for import into a Claude Design System.

| Path | Contents |
|---|---|
| `tokens/primitives.json` | Base colours, number scale, type scale, typeface (DTCG: `$value`, `$type`, `$description`) |
| `tokens/semantic.json` | Semantic colours, colour maps, typography and button tokens, with a value per Figma mode |
| `tokens/color-styles.json`, `text-styles.json`, `effects.json`, `radius.json` | Figma styles and component radii |
| `tokens/tokens.css` | Every token as a CSS custom property (generated) |
| `components/` | Per-component `spec.md` + React/TypeScript implementation using only token CSS variables |
| `assets/` | Icons, logos, font notes |
| `screens/` | Key captain-app screens at 2x |
| `EXPORT_NOTES.md` | Counts, gaps and inconsistencies found in Figma |
| `scripts/` | Generators used to write `tokens/` from the extracted Figma values |

Regenerate tokens: `python3 scripts/gen_tokens.py tokens && python3 scripts/gen_styles.py tokens`.
