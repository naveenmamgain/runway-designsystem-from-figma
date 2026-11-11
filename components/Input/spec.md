# Input (`.Input`, private)

**Figma:** page *Input Fields* → private component set `.Input`
([2023:4600](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2023-4600)), 45 variants
(Type 3 × Size 3 × State 5). Set description: "Input Field".
Caption line is the private set `.Input Caption` ([2023:4536](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2023-4536)) — see [InputCaption](../InputCaption/spec.md).

This is **not** the public Input Field (2025:5480) — that one is exported as [TextField](../TextField/spec.md).

> **Remote library.** Nearly everything in `.Input` is bound to variables / styles from another library:
> `Radius` (modes Default · Rounded · Sharp), `Sizing` (modes Compact · Spacious), `Colors Semantic` (mode Light),
> `Typography/Hopr Font Family` (= Poppins) and remote text styles `Body/*/Med`, `Title/X-Small/Semi-Bold`, plus remote
> icon components. None of these variables exist in Runway's `tokens.css`. Every value below gives
> **remote variable → modes → resolved value**; the resolved value is the one in the default mode (Default / Compact / Light)
> that the variants render with. "raw" = unbound.

## Purpose / when to use
Single-line text input with optional label, leading/trailing icons and a caption line; three visual types:
**Default** (outlined box), **Secondary** (underline only, square corners) and **Combo Box** (outlined box with a
leading and a trailing segment, e.g. a prefix like a country code and a suffix/unit). Inferred from the design; the only
Figma description is "Input Field".

## Anatomy
```
.Input (vertical auto-layout, gap Sizing/spacing/*, align centre/left, hug height × fixed width, min-height 36/44/56)
├── Label        (text "Label Text", fill width, height 28; boolean "↳ Label", default hidden)
├── Input        (horizontal auto-layout, fill width, fixed height 36/44/56; stroke + fill per state)
│   │  Type = Default / Secondary:
│   ├── Icon L   (instance swap "Left Icon", default R: chevron_left/Style=Outlined; boolean "↳ Icon L", default hidden)
│   ├── Text     (text property "Text", default "Text"; fill width)
│   │            Focused: frame [Text (fill) + Cursor]; Typing: frame [Text (hug) + gap + Cursor]
│   └── Icon R   (instance swap "Right Icon", default R: close/Style=Outlined; boolean "↳ Icon R", default hidden)
│   │  Type = Combo Box (Input frame: no fill, no padding, gap 0, clip content):
│   ├── Lead Box (hug width, fill height; boolean "↳ Lead Box", default shown)
│   │   ├── Icon Lead (instance swap "Icon Lead", default R: icon$; boolean "↳ Icon Lead", default hidden)
│   │   └── Box      (text "Box")
│   ├── Input Small | Input Default | Input Large  (fill width — same content as the Default type row above)
│   └── Trail Box (hug width, fill height; boolean "↳ Trail Box", default shown)
│       ├── Box       (text "Box")
│       └── Icon Trail (instance swap "Icon Trail", default R: icon$; boolean "↳ Icon Trail", default hidden)
└── .Input Caption (instance; boolean "↳ Caption", default shown) — Type=Caption, or Type=Error in the Error state
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| Type | variant | **Default**, Secondary, Combo Box |
| Size | variant | **Small**, Medium, Large |
| State | variant | **Default**, Focused, Typing, Error, Disabled |
| Text | text | **"Text"** |
| Label | text | **"Label"** — defined but **not referenced** by any layer (the Label layer's text is the literal "Label Text") |
| ↳ Label | boolean | **false** |
| ↳ Icon L / ↳ Icon R | boolean | **false** / **false** |
| Left Icon / Right Icon | instance swap | `chevron_left / Style=Outlined` (2023:4478) / `close / Style=Outlined` (2023:4489) — both remote |
| ↳ Caption | boolean | **true** |
| ↳ Lead Box / ↳ Trail Box | boolean | **true** / **true** (Combo Box only) |
| ↳ Icon Lead / ↳ Icon Trail | boolean | **false** / **false** (Combo Box only) |
| Icon Lead / Icon Trail | instance swap | `icon$` (2023:4497, remote) |
| Icon L / Icon R (`#3005:3322`, `#3005:4807`) | instance swap | `icon$` (2023:4497) — Icon L is used only by the stray layer in Default/Medium/Error; Icon R is not referenced |

## Remote variables used (modes and resolved values)
| Remote variable | Modes | Resolved |
|---|---|---|
| `Sizing/spacing/0` | Compact 0 · Spacious 0 | 0 |
| `Sizing/spacing/2` | Compact 2 · Spacious 4 | 2 |
| `Sizing/spacing/3` | Compact 4 · Spacious 8 | 4 |
| `Sizing/spacing/4` | Compact 6 · Spacious 10 | 6 |
| `Sizing/spacing/5` | Compact 8 · Spacious 12 | 8 |
| `Sizing/spacing/6` | Compact 10 · Spacious 14 | 10 |
| `Sizing/spacing/7` | Compact 12 · Spacious 16 | 12 |
| `Sizing/spacing/8` | Compact 16 · Spacious 20 | 16 |
| `Sizing/spacing/9` | Compact 20 · Spacious 24 | 20 |
| `Sizing/icon/md` · `lg` · `xl` | Compact 20 · 24 · 28 / Spacious 22 · 26 · 30 | 20 · 24 · 28 |
| `Sizing/stroke/sm` · `lg` · `xl` | 1 · 2 · 3 (same in both modes) | 1 · 2 · 3 |
| `Radius/radi-6` | Default 12 · Rounded 18 · Sharp 0 | 12 |
| `Radius/radi-0` | Default 0 · Rounded 0 · Sharp 0 | 0 |
| `Typography/Hopr Font Family` | Mode 1 = Poppins | Poppins |

| Remote colour (`Colors Semantic/Semantics/…`, mode Light) | Resolved | Alias | Runway token with same value |
|---|---|---|---|
| `Surface/Surface Container` | #ffffff | `Colors Base/Base/alpha/light/900` | `Base-Neutral/White` / `Surface/Neutral/White` (`--surface-neutral-white`) |
| `Surface/Surface Dim` | #e1e1e2 | `Colors Base/Base/gray/200` | none |
| `Surface/On Surface 1` | #1d1d20 | `gray/900` | none |
| `Surface/On Surface Container 1` | #1d1d20 | `gray/900` | none |
| `Surface/On Surface 3` | #7a7a83 | `gray/500` | none |
| `Surface/On Surface Container 3` | #7a7a83 | `gray/500` | none |
| `Surface/On Surface Dim` | #a1a1aa | `gray/400` | none |
| `Primary/Primary` | #1559ea | `blue/600` | none |
| `Error/Error` | #dc2828 | `red/600` | none |

Remote text styles (all font family bound to `Typography/Hopr Font Family`, letter-spacing 0):
`Body/Small/Med` Poppins Medium 14/22 · `Body/Moderate/Med` 16/24 · `Body/Large/Med` 18/28 · `Title/X-Small/Semi-Bold` Poppins SemiBold 18/28.
Implementation: Runway typeface `--cap-app-typeface` (Inter); local `Body/Small/Med` (Inter 14/**20**) and `Body/Moderate/Med` (16/24)
for the same-named remote styles; `Body/Large/Med` and `Title/X-Small/Semi-Bold` have no same-named local style → raw 18/28/500 and 18/28/600.

## Sizes — Type = Default and Secondary
| | Small | Medium | Large |
|---|---|---|---|
| Component width | 240 (raw, fixed) | 264 | 324 |
| Component min-height | 36 (raw) | 44 | 56 |
| Root gap (label / input / caption) | `spacing/5` → 8 | `spacing/6` → 10 | `spacing/7` → 12 |
| Input height | 36 (raw; Small also min-height 36) | 44 (raw) | 56 (raw) |
| Padding top / bottom | 0 (raw) | 0 | 0 |
| Padding left — **Default** | `spacing/7` → 12 | `spacing/8` → 16 | `spacing/9` → 20 |
| Padding left — **Secondary** | `spacing/6` → 10 | `spacing/7` → 12 | `spacing/8` → 16 |
| Padding right (both) | `spacing/6` → 10 | `spacing/7` → 12 | `spacing/8` → 16 |
| Gap icon / text | `spacing/5` → 8 | `spacing/6` → 10; **Focused & Typing: `spacing/5` → 8** | `spacing/7` → 12 |
| Icon L / Icon R | `icon/md` → 20 | `icon/lg` → 24 | `icon/xl` → 28 |
| Text style | `Body/Small/Med` | `Body/Moderate/Med` | `Body/Large/Med` |
| Caption instance | Caption/Small | Caption/Medium | Caption/Large |
| Corner radius — **Default** | `Radius/radi-6` → 12 | same | same |
| Corner radius — **Secondary** | `Radius/radi-0` → 0 | same | same |
| Stroke, Default state | `stroke/sm` → 1 | 1 | 1 |
| Stroke, Focused / Typing / Error | `stroke/lg` → 2 | 2 | `stroke/xl` → 3 |
| Cursor (Focused, Typing) | 2 × 18 (raw) | 2 × 18 (raw) | 2 × 18 (raw) |
| Cursor gap after text (Typing) | `spacing/2` → 2 | `spacing/2` → 2 | `spacing/3` → 4 |

Stroke is INSIDE. **Default** type: all four sides. **Secondary** type: bottom side only (top/left/right 0, raw).
Label: `Title/X-Small/Semi-Bold`, height 28, fill width, colour `On Surface 1`.

## Sizes — Type = Combo Box
Outer `Input` frame: no fill, padding 0, gap 0, **clip content**, radius `Radius/radi-6` → 12, stroke on all four sides
(weights as above). Height 36 / 44 / 56 (Small/Medium hug, Large fixed).

| | Small | Medium | Large |
|---|---|---|---|
| Lead Box padding (T/R/B/L) | 0 / `spacing/7` 12 / 0 / `spacing/7` 12 (T/B raw) | same as Small | `spacing/0` 0 / `spacing/8` 16 / `spacing/0` 0 / `spacing/8` 16 |
| Trail Box padding | `spacing/4` 6 / `spacing/7` 12 / `spacing/4` 6 / `spacing/7` 12 | same as Small | `spacing/4` 6 / `spacing/8` 16 / `spacing/4` 6 / `spacing/8` 16 |
| Lead/Trail gap | `spacing/4` → 6 | `spacing/5` → 8 | `spacing/6` → 10 |
| Lead/Trail width (hug, with "Box") | 49 | 53 | 64 |
| Icon Lead / Icon Trail | `icon/md` 20 | `icon/lg` 24 | `icon/xl` 28 |
| Middle frame name | `Input Small` | `Input Default` | `Input Large` |
| Middle padding left | `spacing/7` → 12 | `spacing/8` → 16 | `spacing/8` → 16 |
| Middle padding right | `spacing/6` → 10 | `spacing/7` → 12 | `spacing/8` → 16 |
| Middle gap | `spacing/5` → 8 | `spacing/6` → 10; Focused & Typing `spacing/5` → 8 | `spacing/7` → 12 |
| Middle icons L/R | `icon/md` 20 | `icon/lg` 24 | `icon/xl` 28 |

"Box" text uses the size's Body style. There is **no divider** between the segments.

## Colours per State (all `R: Colors Semantic/Semantics/…`, resolved)
Identical across sizes (verified for all 45 variants); differences between types are called out.

| State | Field fill | Stroke | Text colour | Box text (Combo) | Cursor | Caption |
|---|---|---|---|---|---|---|
| Default | `Surface/Surface Container` #ffffff | `Surface/On Surface 3` #7a7a83 | `Surface/On Surface 3` #7a7a83 (placeholder look) | `On Surface Container 3` #7a7a83 | — | Caption |
| Focused | `Surface Container` | `Primary/Primary` #1559ea | `On Surface Container 3` #7a7a83 | `On Surface Container 3` | `Primary/Primary`, at start of text | Caption |
| Typing | `Surface Container` | `Primary/Primary` | `On Surface Container 1` #1d1d20 | `On Surface Container 3` | `Primary/Primary`, after text | Caption |
| Error | `Surface Container` | `Error/Error` #dc2828 | `On Surface Container 1` #1d1d20 | `On Surface Container 3` | — | **Error** (Small, Large — see gaps) |
| Disabled | `Surface/Surface Dim` #e1e1e2 | **none** (Default/Secondary) · `Surface Dim` 1px (Combo Box) | `Surface/On Surface Dim` #a1a1aa | `On Surface Dim` #a1a1aa | — | Caption |

Combo Box: the fills are on Lead Box, middle frame and Trail Box (outer frame has none). Caption colours: see InputCaption.
No effects/shadows on any layer. Icons inherit their own (remote) colours — not overridden per state.

## Inconsistencies / gaps found
- **Medium + Error** variants are broken: both Default/Medium/Error and Secondary/Medium/Error show the normal **Caption** instead of the Error caption; Default/Medium/Error additionally wraps the text in a stray `Text` frame containing a hidden `Icon L` (bound to the otherwise unused `Icon L#3005:3322` property) and has no Icon L at root.
- Medium Focused/Typing gap is `spacing/5` (8) while Medium Default/Error/Disabled is `spacing/6` (10) — in Default, Secondary and Combo Box.
- Secondary/Large/Focused bottom stroke 3 is **unbound** (all other focus/error strokes are bound to `Sizing/stroke/*`).
- Disabled has no stroke in Default/Secondary but a `Surface Dim` stroke in Combo Box.
- Same colour referenced through different variables per state: text uses `On Surface 3` (Default) vs `On Surface Container 3` (Focused); `On Surface 1` (label) vs `On Surface Container 1` (typed text).
- `Label` text property (#4709:260) is not connected to the Label layer (literal "Label Text"); `Icon R#3005:4807` is unused.
- Input height (36/44/56), component width, cursor 2×18, caption gap, Small Lead Box top/bottom padding are raw; cursor height doesn't scale with size.
- Combo Box Large uses padding-left `spacing/8` (16) in its middle frame while Default/Large uses `spacing/9` (20).
- Default/Small/Focused text frame has padding 2/0/2/0 and gap 20 (SPACE_BETWEEN), unlike every other Focused variant (padding 0, gap 0).
- Uses a different library (Poppins, remote semantic colours, Sizing/Radius modes) than the rest of Runway (Inter, Colors - Semantic Tokens). No colour except #ffffff matches a Runway token.
- No "filled but not focused" state; the implementation uses the Typing text colour for a non-empty value.
