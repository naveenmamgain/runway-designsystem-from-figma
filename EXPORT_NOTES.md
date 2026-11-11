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
| 2. Core components (Button, TextField, Card) | ✅ done — reviewed (TextField font: Inter) |
| 3. Remaining components | ✅ done — 26 more component folders |
| 4. Icons / logos | ✅ done — 10 690 assets |
| 5. Screens | ✅ done — 31 screens at 2x |

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

## Components — notes from stage 2
- **Card**: Runway has no generic Card; `OA Cards` (order-alert card) is exported as `Card`. See `components/Card/spec.md`.
- **TextField** = Figma `Input Field`. The private `.Input` / `.Input Caption` sets on the same page are bound to other libraries'
  variables (Hopr `Poppins`, `Radius`, `Sizing`) and are not used by `Input Field`.
- Input/message/caption text in `Input Field` resolves to **Noto Sans** (remote `Captain App Font` variable) while the rest of Runway is Inter.
  The `.tsx` uses Runway's local typography tokens (Inter) and the spec records the remote binding.
- Button icons in neutral types use unbound `#000000`; Icon Only Button padding is larger than its fixed box; icon-only Secondary
  Pressed stroke differs from text Secondary Pressed.
- `components/_shared/textStyles.ts` maps each Runway text style to its typography tokens (used by every component).
- The `.tsx` files are type-checked (`tsc --strict`, React 18 types) and every `var(--…)` they use is verified to exist in
  `tokens/tokens.css`. They haven't been rendered in a browser yet.

## Components — notes from stage 3
26 component folders (spec.md + .tsx + preview.png), 29 `.tsx` files in total including stage 2. All `.tsx` type-check together under `tsc --strict` (React 18 types); every `var(--…)` resolves to `tokens/tokens.css` (except `--runway-input-placeholder`, a local custom property `Input.tsx` sets itself). Where Figma uses an unbound hex that equals a Runway primitive, the code uses the primitive variable and says so in a comment; hexes that match no token stay raw with a comment.

Remote/other-library components that are **not** in Runway and are passed in as `ReactNode` props: Reject Button, GTA Icon, header `Toggle`, Filter Pills, `Orders Button`, `Bottom Nav Icons` (the remote Refresh Button is rebuilt inside `OAMessageBox`).

**Stamp artwork**: exported via the REST API as 2x PNG (`components/Stamp/assets/*.png`, used by `Stamp.tsx`) and as full SVG (`components/Stamp/assets/svg/`, 1.4–1.7 MB each — heavy vector art).

#### Tool Tip, Snackbar, Comms Templates
- Comms Templates: all 4 variants are empty white frames (no children); fill #ffffff unbound, radius 0, variant prop still named "Property 1". Only canvas sizes are defined (CT Banners 360×640, Pitch Center 264×352, Storyly 360×720, In-App Notification Banners 328×160).
- Tool Tip: Plain is always `Surface/Information/Light`, Detailed always `Surface/Warning/Light` (no other colour option).
- Tool Tip: Detailed Left/Right uses root gap −6; every other variant −8. Pointer inset Left/Right: 8 (Plain) vs 16 (Detailed); Top/Bottom 24.
- Tool Tip: action labels override Tertiary-Info's `Text/Information/Dark` (#146edc) with `Colors - Maps/Mapped-Blue/Blue 500` (#1559ac) — a map token, not semantic.
- Tool Tip: body frame named "Plain ToolTip" in Detailed variants; no text props, no close-icon swap; Title/Close Button/Buttons booleans exist on Plain variants but do nothing. All geometry unbound (width 328, padding 12, radius 16…).
- Snackbar: Single variants have no Action text node, so "Show Action"/"Action Text" only work for Lines = Stack.
- Snackbar: General/Low close icon is unbound #1c1b1f (no matching token); Single/General/Low title/body use unbound #1a202a where Stack binds `Text/OnSurface/Default`.
- Snackbar: close icon size bound to `Button Tokens/Button/Icon-Size` (follows Button size mode), not a snackbar token. Label max width 298 (Single) vs 328 (Stack); padding, gaps, radius 8, min/max 220/360 all unbound.
- Snackbar: every Type uses the same leading icon (Info_Circle_Filled); no description/documentation.
#### Chip, Tag, Badge, Stamp, Toast, Modal
- Chip: in State=Default the Close_Stroke layer is hidden and not linked to "Show Trailing Icon", so the trailing icon can never show in Default. Trailing icon not swappable. Selected switches label to Bold (chip widens).
- Chip: Number Badge radius 100 raw; badge keeps black/white colours in Disabled.
- Chip and Badge use `Button Tokens/Button/Radius` (a Button-only token) for their pill radius.
- Badge: No Number fills with `Mapped-Yellow/Yellow 400`, Small/Large with `Mapped-Brand/Primary-A` (both #ffca20). Sizes, padding, gaps raw.
- Tag: everything except colour/text style raw (radius 4, min-width 92, padding 4/12/4/8); uses the Button text style `Button/Small/SemiBold` for a label.
- Stamp: binds no variables; some fills use remote styles `Color/Palette/Blue/500`, `Green/600`, `Purple/600`; teal #139f98 (both "work zone" variants) is raw and matches no token. Two variants have live text in Noto Sans ExtraBold at fractional sizes. "fixed commission" frame 198.67×164 with artwork spilling to ~211×204. Variant names inconsistent.
- Modal: "Buttons" and "Secondary Button" boolean props are defined but not linked to any layer; hidden secondary button layer is named "Primary Button"; card slot named "Toast"; card at y=198 not centred (212); no auto-layout.
- Toast vs Modal: body colour `Text/OnSurface/Default` vs `Text/Neutral/Dark` (same #1a202a); padding/gap 16/16 vs 24/24; graphic→text gap 16 vs 0; width fill (312) vs fixed 328.
- Toast is a centred dialog without buttons, not a toast; its full-screen backdrop frame has radius 16 and clips content.
- Toast/Modal: all spacing and radii raw; `.Graphic Box` icon colour #1c1b1f raw (no token).
#### Header components
- Tab underline (Highlighter/Dummy in .2 Tabs/.3 Tabs) radius is really 222/22/0/0. Figma clamps it to 2/2/0/0 on a 2px-high bar; CSS would scale differently, so code uses `2px 2px 0 0`.
- Tab highlighter fill #1e4b82 is unbound (equals `Surface/Brand/Primary-B`).
- Android status bar: clock is Roboto Medium 14 with no text style; icons/clock use remote paint styles `Color/Palette/Gray/400`, `Color/Palette/White`. Main component 360×28 but every instance is overridden to 360×32.
- Duty Toggle: variant prop still `Property 1`, casing differs from Homepage Header's `Duty Type` (`Off duty` / `On Duty`). Knob shadows raw and differ by state (OFF x −1 @12 %, ON x +1 @16 %); track at x 2 (OFF) vs x 1 (ON). Nested toggle parts have ON/OFF icon props but no icon layers.
- Secondary Tabs: unselected tabs use raw layer opacity 0.8 (dims label); root scrolls horizontally with clip content off, so it overflows in Figma.
- Primary Tabs, Secondary Tabs and Internal Page Header title have no text properties.
- Internal Page Header: `Show Icon Button` boolean is wired to nothing (`Icon Button` does the job); its "Icon Only Button" is a detached frame (stroke `Border/Neutral/Black` vs component's `Border/Neutral/Dark`); help Button instance overrides stroke to `Border/Neutral/Black`; title fill unbound #000000; layer typo "Leadign Icon + Label".
- Homepage Header: row gap raw 27 (off the 4-pt scale); header icon vectors unbound #000000.
- "Today's Earnings Accordian" (3291:9380) on the header page is a plain frame, not a component, and not used by either header — not exported.
#### Service Chip, OA message Box, Home of Orders
- Service Chips: default/premium chips bind a remote copy of `Surface/Neutral/Light`, `Surface/Neutral/Black`, `Text/OnSurface/Default`; corporate chips bind the local ones. Premium label #cbaa54 and gold gradients unbound and not in any Runway palette.
- Service Chip Icons: Food/Grocery/Parcel/Pet backgrounds raw (#5e9076, #0a6b38, #bc7c46, #844301); Food and Parcel glyph whites come from two different remote colour styles. Cab Corporate reuses the Cab Sedan icon; Share/Pet labelled "Auto Share"/"Auto Pet"; a layer named `_ëÎÓÈ_1`.
- OA message Box: Refresh Button in "Refresh Button"/"System check" is a remote component (remote `Button/Button Numbers/*` tokens); "Service Nudge" uses the local Secondary-Info Button — two different Refresh buttons (122 vs 140 px wide).
- OA message Box: "Searching for orders..." and System-check text are unbound #000000 (others use `Text/Neutral/Dark`); uses remote `Body/Moderate/Reg`; Service Nudge body colour is remote style `Color/Palette/Gray/800`; layer typo "Refersh Button"; hidden Duty Toggles/Refresh buttons left inside variants.
- Home of Orders: no auto-layout (absolute positions); raw radii 0/4/4/0, 20/20/0/0, 1000, 0/12/12/12, 8, 222 (remote toggle). Header title uses a remote text style and remote colour `Typography/Dark 1` (#0c0d0f); header toggle is a remote `Toggle` with raw shadows (#4ad189, #015127).
- Home of Orders: side-bar fare text style mixed (Med local, Reg local, Reg remote); Go To filter pill is remote while Services/Stay In are local frames; Services chip gradient renders solid white; hidden filter panels raw #ffb9bf; Orders slot overlaps bottom nav by 3 px and Filters slot overflows the 360 px screen by 3 px.
#### Radio Button, Checkbox, Toggle, .Input, .Input Caption
- Unselected Active Radio ring is `Surface/Neutral/Dark`; unselected Active Checkbox outline is `Surface/Information/Dark`.
- Radio/Checkbox Disabled+unselected fill the centre with `Surface/Neutral/Light`; Disabled+selected leave it transparent. Check mark is a transparent knock-out, not a white fill.
- Variant axis is `Selection` on Radio but `Selected` on Checkbox; State option order differs.
- Toggle: knob drop shadow (raw 1,1 r4 #101010 @10 %) only on Type=No Text + Active; Active knob icon unbound #1c1b1f; `Show Icon` does nothing on No Text variants; all dimensions raw (72×32, radius 222).
- `.Input` Medium+Error (Default and Secondary) shows the normal Caption instead of the Error caption; Default/Medium/Error has a stray `Text` frame with a hidden Icon L.
- `.Input` Medium gap is spacing/5 (8) in Focused/Typing but spacing/6 (10) elsewhere; Secondary/Large/Focused bottom stroke 3 unbound (others bound); Disabled has no stroke in Default/Secondary but 1 px `Surface Dim` in Combo Box; Combo Box Large padding-left spacing/8 (16) vs Default/Large spacing/9 (20); Default/Small/Focused text frame padding 2/0/2/0 gap 20 unlike other Focused variants.
- `.Input` `Label` text prop is not connected (layer reads literal "Label Text"); `Icon R` prop unused; same colour bound to different variables per state (`On Surface 3` vs `On Surface Container 3`); input heights 36/44/56, width and 2×18 cursor raw.
- `.Input Caption`: root fixed at 24 high but Large text is 28 (overflows); Medium and Large icons both 24; Password is fixed 163 wide with strength baked at 3/4 bars; sample text typos ("Succes", "At least 8 character").
#### Bottom Navigation, Bottom Sheet, Guidance Bottom Sheet
- Radius 758.62 is on the ring ellipses in Order Button Animation F1/F8 (scaled layer, 1000 × 44/58; no visible effect on an ellipse). Radius 8.38 is on `Ellipse 1` inside the Credit Line nav icon (scaled), not on the nav itself.
- Order-button ring stroke weight 0 in F1/F8, 2.5 in F2–F7; stroke align switches INSIDE/CENTER.
- Both sheets' visible radius is 16/16/0/0; the 10/10/0/0 is only on Guidance's hidden "Head" frame.
- Nav labels and order button use remote copies of `Label/Moderate/Med`, `SubTitle/X-Small/Med|SemiBold`, `Title/Small/SemiBold`; Hide icon bound to remote `Surface/Neutral/White`.
- `.Order Button` uses a remote `Bottom Nav Icons` set instead of local `.Nav Icons`; the Incoming Orders pill is the remote `Orders Button` component. Local order-count bubble has no text style (Noto Sans 20, line-height 100 %).
- Order label weight Med in Default/Hide but SemiBold in Incoming Orders. Credit Line icon uses `Border/Neutral/Dark`, other line icons `Surface/Neutral/Dark` (same hex).
- Bottom Sheet container/CTA fills unbound #ffffff (Guidance binds `Surface/Neutral/White`). "Horizontally/Vertically Stacked Buttons" booleans only work in Basic; Half/Full contain a stray hidden horizontal-buttons frame; horizontal button order Secondary→Primary in Basic but Primary→Secondary elsewhere. Points "Content" fixed height 464; Half illustration gap 24.7999…; `.Radio Points` text #1a202a and icon #1c1b1f unbound.
- Guidance: title/body raw #253041 (Gray 800) instead of a text token; buttons override fill to `Surface/Brand/Primary-A` and drop the min-width binding (112 wide vs 140 token min); pagination dot P3 in Sheet3 is 17×16.
- No spacing/size/radius variables bound in any of these three components.

## Icons & logos (stage 4)
Exported with the Figma REST API (`GET /v1/images`, SVG with Figma's default export settings) using a read-only personal access token.
Every exported file, its Figma name and node id is listed in `assets/manifest.json`.

| Folder | Count | Source |
|---|---|---|
| `assets/icons/material/{filled,outlined,round,sharp,two-tone}/` | 2 086 each = **10 430** | Icons page — Material icon sets (`Style=` variants) |
| `assets/icons/custom/` | **149** | Icons page — 147 custom components + `GTA` set (`gta-default`, `gta-active`) |
| `assets/icons/service/` | **106** (6 SVG + 100 PNG @2x) | Service Manager Icons page — `Service Icons/Bike` (36), `/Auto` (21), `/Cab` (18), `/Special orders` (24), `Service Icons` (4), `Bundle Order Icons` (3) |
| `assets/logos/` | **5** | Rapido Assets page — `Logo_Rapido-customer` yellow/black/white, `Logo_Ownly`, `Logo_Captain-app` |
| **Total** | **10 690** | 0 failed, 0 missing |

Naming: Figma name in kebab-case; variant values appended (`service-icons-bike/bike-taxi-oa.png`).
- **Duplicate Figma names** on the Icons page (two components each): `Check_Circle_Filled`, `Info_Circle_Filled`, `Close_Stroke`, `Check_Circle_Stroke`,
  `Info_Circle_Stroke` — the second copy is saved with a `-2` suffix. `account_balance` exists both as a custom icon and a Material set (no clash; different folders).
- **Service icons are raster images** in Figma (image fills — photographic vehicle renders). Exported as SVG they were 1–3 MB each of embedded
  bitmap, so those 100 are delivered as **PNG at 2x** instead; only the 6 Cab/Special-orders "AC" icons are real vectors and stay SVG.
  The page also has loose, non-component render images (`Glossy Green Electric Scooter Render 1`, etc.) — not exported.
- **Colours**: Material icons are single-colour `black` (≈99 %); the multi-colour ones (black + white knock-outs) can be found via the
  `colors` field in `assets/manifest.json` — 29 filled, 29 outlined, 12 round, 27 sharp, 23 two-tone. 121 of the custom icons use **#1c1b1f** (Material's
  default on-surface colour), which is **not a Runway token**; 25 use black. None are exported with `currentColor`; recolour at use site.
- Icon `Hardware` text label on the Icons page is a section heading, not an icon.

## Screens (stage 5)
31 screens from the Master File (`tqSaYDOfJ1K1Fc51Zb9Fqz`) at 2x — see `screens/INDEX.md` for what each one is and its Figma frame.
The Master File's *Index* page links only to pages inside the same file; no other Figma files were referenced.
Pages with no phone frames (Logo & App Icon, My profile, Rewards, Service Icons +, Services & Features Information) and the
Subscription / Autopay / Performance pages were not exported.

## Not exported / open items
- `.(Rejected) Button Tokens` collection (43 variables) — explicitly marked rejected in Figma.
- Utilities page doc helpers, cover and divider pages.
- Remote-library components used inside Runway (Reject Button, GTA Icon, header Toggle, Filter Pills, Orders Button, Bottom Nav Icons) — they live in other files.
- Comms Templates have no content in Figma (empty frames) — only sizes exported.
- Components are type-checked but have not been rendered/visually compared in a browser.
