# Export notes — Runway (Cap-App) design system

Source: Figma file **Runway design system (Cap-App)** — `GEdvNUzFqwB2gAbQKZRsIn`
(<https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn>). Read with the Figma MCP (Plugin API, read-only) on 2026-11-11.
Master file reviewed for screens: `tqSaYDOfJ1K1Fc51Zb9Fqz` (Master File – Captain Flow).

Rule followed throughout: **exact values only**. Colours were checked to be exact 8-bit values (every channel × 255 is an
integer), so the hex codes are lossless. The only normalisation is float32 noise on alpha/opacity
(e.g. Figma stores `0.8999999761581421` for 90 %); the JSON carries the intended value (`0.9`) and, where it differs,
the raw float as `alphaRaw` / `opacityRaw`.

## Status

| Stage | Status |
|---|---|
| 1. Tokens (`tokens/`) | ✅ done |
| 2. Core components (Button, TextField, Card) | ⏳ next — paused for review after this |
| 3. Remaining components | ⏳ |
| 4. Icons / logos | ⏳ — needs bulk-export access, see "Blocked / needs input" |
| 5. Screens | ⏳ |

## Page checklist (Runway file)

| Page | Node | Holds | Exported to |
|---|---|---|---|
| Cover | 288:993 | cover | skipped (cover) |
| About Runway | 310:961 | documentation | skipped (no tokens/components) |
| Rapido Assets | 317:959 | 3 logo components (`Logo_Rapido-customer` ×3 colours, `Logo_Ownly`, `Logo_Captain-app`) | assets/logos (stage 4) |
| Grids | 363:3485 | grid styles (4) | listed below |
| Number scale | 363:3486 | docs for `Numbers Base` | tokens/primitives.json |
| Shadows, Blurs & Overlays | 560:6757 | 3 effect styles, 6 unstyled shadows, 3 blur samples, 3 overlays | tokens/effects.json |
| Typography | 42:68 | docs for text styles | tokens/text-styles.json |
| Colors | 2972:5933 | docs for colour variables | tokens/primitives.json, semantic.json |
| ⭐ Form Elements | 3433:4638 | section divider | — |
| Input Fields | 2022:4008 | Input Field (4), .Input (45), .Input Caption (18), .Input Message | components (stage 2) |
| Icons | 1701:173 | 2 086 Material icon sets × 5 styles + 147 custom icons + 1 text label | assets/icons (stage 4) |
| Checkbox, Radio & Toggle | 795:3948 | Radio Button (4), Checkbox (4), Toggle (8) | components (stage 3) |
| Service Manager Icons | 1904:505 | Service Icons/Bike (36), /Auto (21), /Cab (18), /Special orders (24), Service Icons (4), Bundle Order Icons (3) | assets/icons (stage 4) |
| OA screen and cards | 2315:1118 | .Service Chip Icons, .Service Chips, .Base OA, .Bike/.Auto/.Cab OA, .OA message Box, OA Cards (3), Home of Orders (2) | components (stage 2–3) |
| ⭐ Navigation Elements | 3433:6012 | section divider | — |
| Buttons | 338:1026 | Buttons (288 variants), Icon Only Button (18) | components (stage 2) |
| Header components | 699:122770 | Android status bar, Duty Toggle, Primary/Secondary Tabs, Homepage Header, Internal Page Header + 4 sub-parts | components (stage 3) |
| Bottom Nav | 2321:36409 | bottom navigation (3) + 4 sub-parts | components (stage 3) |
| Bottom Sheets | 795:4297 | Bottom Sheet (5), Guidance Bottom Sheet (3) | components (stage 3) |
| ⭐ Data Display | 3433:8782 | section divider | — |
| Chips | 1112:4262 | Chip (3) | components (stage 3) |
| Detail Tags / Labels | 1112:4261 | Tag | components (stage 3) |
| Badges | 1086:3930 | Badge (3) | components (stage 3) |
| Stamps | 1700:970 | stamp (6) | components (stage 3) |
| Toast / Modals | 2027:6567 | Toast, Modal, .Graphic Box (2) | components (stage 3) |
| Tool Tips | 1800:2957 | Tool Tip (24) | components (stage 3) |
| Snackbars | 682:107588 | Snackbar (20) | components (stage 3) |
| Communication design | 466:3180 | Comms Templates (4) | components (stage 3) |
| Utilities | 442:3894 | doc helpers (.Typography explanation Card, .Type Token, .Label, .Color Token) | skipped (documentation helpers) |
| `-------` dividers (×9) | — | empty | skipped |

## Tokens — what was exported (counts)

| Figma collection | Modes | Variables | File / group |
|---|---|---|---|
| Colors - Base Tookens | Mode 1 | 82 | `primitives.json` → `color` |
| Numbers Base | Mode 1 | 12 | `primitives.json` → `number` |
| Typography - Base Tokens | Values | 26 | `primitives.json` → `typography` |
| Typography - Typeface | Primary | 1 | `primitives.json` → `typeface` |
| Primitives *(sample — see below)* | Mode 1 | 12 | `primitives.json` → `Primitives` |
| Colors - Maps | Mode 1 | 78 | `semantic.json` → `Colors - Maps` |
| Colors - Semantic Tokens | Mode 1 | 53 | `semantic.json` → `Colors - Semantic Tokens` |
| Typography - Semantic Tokens | Mode 1 | 120 | `semantic.json` → `Typography - Semantic Tokens` |
| Button Tokens | Large, Medium, Small | 12 | `semantic.json` → `Button Tokens` |
| Semantic *(sample — see below)* | light, dark | 8 | `semantic.json` → `Semantic` |
| .(Rejected) Button Tokens | Large, Medium, Small | 43 | **not exported** — collection is explicitly named "Rejected" |

Styles: **3** paint styles → `color-styles.json`; **43** text styles → `text-styles.json`; **3** effect styles
(+ 6 unstyled shadows, 3 blur values, 3 overlays) → `effects.json`; **4** grid styles → listed below (no target file was requested).
Radii → `radius.json` (1 local variable used for radius, 4 external variables, 25 unique raw values with where they're used).

`tokens/tokens.css` is generated from the JSON: every token as a CSS custom property named after its Figma path in kebab-case
(e.g. `Surface/Brand/Primary-A` → `--surface-brand-primary-a`), aliases kept as `var(--…)`. Button Tokens modes are switched
with `data-button-size="large|medium|small"`.

### Grid styles (not in a token file)

| Style | Grid |
|---|---|
| 4 Column | COLUMNS, count 4, gutter 12, offset 16, STRETCH |
| 6 Coulmn *(sic)* | COLUMNS, count 6, gutter 12, offset 16, STRETCH |
| Rows - 4H 12M | ROWS, section size 4, gutter 12, offset 0, MIN |
| Columns + Rows | ROWS (section 4, gutter 12, offset 0, MIN) + COLUMNS (count 4, gutter 12, offset 16, STRETCH) |

Grid colour on all: `#ff0000` at alpha 0.1 (display only).

## Things in Figma that look inconsistent

### Probably sample/test data
- **Variable collections "Primitives" (12) and "Semantic" (8, light/dark)**, **paint styles `Brand-Primary`, `Brand-Primary-Hover`,
  `Overlay-Scrim`** and **text styles `Heading-Large`, `Body`, `Caption`**: these use Tailwind CSS default colours (`#3b82f6`, `#111827`, …),
  are bound to nothing in Runway, and match the placeholder content that was in this repo before the export (including the test description
  "Darkest gray, café-grade contrast ✓"). They are exported because they exist in the file, but kept in their own groups so they never mix with
  Runway tokens. **Runway itself has no dark mode**: every Runway collection has a single mode. Recommend deleting these from Figma, or tell
  me they're intentional.
- The real Runway system has **no colour styles**; colour lives only in variables.

### Naming
- Collection name `Colors - Base Tookens` (typo "Tookens") and text-variable group `Botton/…` (typo for Button). Kept verbatim because tokens
  reference them; the matching text styles are correctly named `Button/…`.
- Grid style `6 Coulmn` (typo). Shadow labels mix case: `Shadow / X-Small`, `shadow / Small`, `Shadow / large`.
- Semantic colours mix `dark` and `Dark`: `Border/Success/dark`, `Text/Success/dark` vs `…/Error/Dark`, `…/Warning/Dark`.

### Values / bindings
- **Text style `Title/X-Small/SemiBold`** has its font style bound to `Title/2X-Small (16)/SemiBold/Weight` instead of
  `Title/X-Small (18)/SemiBold/Weight`. Same value (SemiBold), wrong variable. Exported as bound.
- **Duplicate colours**: `Base-Brand/Primary-A` = `Base-Yellow/Yellow 400` = `#ffca20`; `Base-Brand/Primary-B` = `Base-Blue/Blue 600` = `#1e4b82`.
  Brand colours are raw values, not aliases of the scale.
- **Duplicate semantic meaning**: `Text/OnSurface/Default` and `Text/Neutral/Dark` both → Gray 900; `Text/OnSurface/Disabled` and
  `Text/Neutral/Light` both → Gray 400.
- **Incomplete scales**: `Colors - Maps` has no entries for `Base-Neutral` 90/75/50/25 % Black. `90% Black` is not referenced by any semantic token.
  `Base-Size-22` and `Base-Size-36` (font sizes) and `Base-Height-XL (36)`, `2XL (40)`, `4XL (48)` (line heights) exist but no semantic token uses them.
- `Colors - Semantic Tokens/Boolean` is a boolean variable inside the colour collection, purpose undocumented.
- 10 semantic colours are marked **"Discontinued"** and hidden from publishing (all `*/Light` text/border tokens + `Text/Neutral/Black|White`).
  Exported with `hiddenFromPublishing: true`.
- Shadows `X-Small`, `Small`, `Moderate` each consist of **two identical layers** (same x/y/blur/spread/alpha), which doubles the visible
  opacity. Large/X-Large/XX-Large use two different alphas, so the duplication on the first three looks accidental.
- The 6 canvas shadows (`#101828`, Untitled-UI-style) are **not effect styles** and use a different colour from the 3 real effect styles
  `Elevation/S|M|L` (`#101010`, 0/0 offset). Two parallel shadow systems.
- Blur values (4/6/8) exist only as canvas samples; there is no blur effect style or variable.
- **No spacing, opacity or radius collections in Runway.** Spacing/sizing comes from `Numbers Base` (4-multiples) and component-level `Button Tokens`;
  `Button/Radius` (→ 999) is reused as the pill radius by 21 non-button components.
- **Raw radii**: 25 unbound radius values (see `radius.json`). Non-integer ones (`1.094…`, `1.9999998…`, `4.624…`, `8.381…`, `14.560…`,
  `141.970…`, `758.621…`) come from scaled layers inside OA cards, bottom nav and order button. `222/22/0/0` on tabs looks like a typo for `22/22/0/0`.

### External libraries bound inside Runway components
Runway's components bind variables from **other** libraries, which means some component values can't be expressed in Runway tokens:

| Remote collection | Example variables | Used on |
|---|---|---|
| `Colors Semantic` (mode Light) | `Semantics/Primary/Primary` → `Base/blue/600`, `Semantics/Surface/On Surface 1` → `Base/gray/900`, … | Input Fields |
| `Radius` (modes Default/Rounded/Sharp) | `radi-0`, `radi-1` (2/4/0), `radi-6` (12/18/0) | .Input, .Input Caption |
| `Sizing` (modes Compact/Spacious) | `spacing/2…9`, `icon/md|lg|xl`, `stroke/sm|lg|xl` | Input Fields |
| `Typography` | `Hopr Font Family` = **Poppins** | Input Fields |
| `Typography - Base Tokens` (remote copy) | `Font Family/Captain App Font` = **Noto Sans** | Input Fields, OA cards, Bottom Nav |
| `Typography - Semantic Tokens` (remote copy) | same names as local | Input Fields, OA cards, Bottom Nav |
| `Colors - Semantic Tokens` (remote copy) | same names as local | OA cards, Bottom Nav |
| `Button` | `Button Numbers/Radius-Full` | .OA message Box |

The `Hopr Font Family`/Poppins binding suggests the input field was copied from the **Hopr Design System**. "Remote copy" means a
same-named collection from another file (likely an older publish of this library or "Captain Design System"), not the local one.
Per-component details are recorded in each `components/<Name>/spec.md`.

## Blocked / needs input
- **Bulk icon export (stage 4).** The Icons page has 2 086 Material icon sets × 5 styles (Filled, Outlined, Round, Sharp, Two Tone) =
  10 430 SVGs, plus 147 custom icons and the service-manager icons. Exporting these through the MCP one node at a time isn't practical.
  Needs either Figma linked in Composio (`composio link figma`) or a Figma personal access token, so the REST images endpoint can write
  SVGs straight to disk.
