# BottomSheet

**Figma:** page *Bottom Sheets* ([795:4297](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=795-4297)) → component set
`Bottom Sheet` ([1549:8554](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1549-8554)), 5 variants.
Private part: `.Radio Points` ([1547:8275](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1547-8275)), 2 variants.
No description is set in Figma. The paged variant lives in its own set → see `GuidanceBottomSheet`.

## Purpose / when to use
*(Inferred from the design; the only guidance in Figma is the Empty variant's placeholder copy: "Detach this component to use." /
"This is a placeholder for an empty state bottom sheet…" / "Adjust spacing accordingly but follow Margin for consistency".)*
A modal sheet over a 75 % black scrim, anchored to the bottom, with a close control above it.
- **Basic** — icon + title + body + actions (confirmation / information).
- **Points** — title + body + a single-choice list (`.Radio Points`), actions in a pinned CTA bar.
- **Half Illustration** — 124×124 illustration + text, pinned CTA bar.
- **Full Illustration** — full-width 360×180 illustration + text, pinned CTA bar.
- **Empty** — blank container to detach and fill with custom content.

## Anatomy
```
Bottom Sheet (scrim 360×720, vertical, align MAX/MAX, gap 16)
├── Close Icon (padding 4/16/4/16) → Close_Stroke 24×24
└── Container (vertical, max-height 632, radius 16/16/0/0, fill #ffffff)
    Basic:   padding 24, gap 24
    │  ├── Icon (SLOT, 60×60, radius 999) → Icon Holder (60×60, radius 32, Blue 200) → Image_Stroke 40×40
    │  ├── Text Box (SLOT, padding 0/8/0/8, gap 12) → Title, Body
    │  ├── Horizontally Stacked Buttons (hidden; gap 8) → Secondary (Medium), Primary (Medium)
    │  └── Vertically Stacked Buttons (gap 12) → Primary (Large), Secondary (Large)
    Points:  padding 0, gap 0
    │  ├── Content (padding 24, gap 24, fixed height 464)
    │  │   ├── Icon (SLOT, as Basic)
    │  │   └── Text Box (SLOT, gap 24)
    │  │       ├── Text Box (padding 0/8/0/8, gap 12) → Title, Body
    │  │       └── Radio Points (gap 16) → .Radio Points × 5 (1st Selected)
    │  └── CTAs (padding 16/24/16/24, gap 10, fill #ffffff, Elevation/S)
    │      ├── Horizontally Stacked Buttons (hidden) → Primary (Medium), Secondary (Medium)
    │      └── Vertically Stacked Buttons → Primary (Large), Secondary (Large)
    Half Illustration: padding 0, gap 0
    │  ├── Content (padding 24, gap 24) → Illustration (SLOT 124×124, image) + Text Box (SLOT)
    │  ├── Horizontally Stacked Buttons (hidden, stray — not wired to a property)
    │  └── CTAs (as Points)
    Full Illustration: padding 0, gap 0
    │  ├── Illustration (SLOT 360×180, image)
    │  ├── Text Box (SLOT, padding 24, gap 24) → Text Box (padding 0/8/0/8, gap 12) → Title, Body
    │  ├── Horizontally Stacked Buttons (hidden, stray)
    │  └── CTAs (as Points)
    Empty:   padding 24, gap 32 → 3 placeholder texts
```

## Properties
| Property | Type | Default | Wired in variants |
|---|---|---|---|
| Type | variant | **Empty**; Basic, Points, Half Illustration, Full Illustration | — |
| Show Top Icon | boolean | true | Basic, Points (Icon slot visibility) |
| Horizontally Stacked Buttons | boolean | false | **Basic only** |
| Vertically Stacked Buttons | boolean | true | **Basic only** |
| Primary Button | boolean | true | Basic, Points, Half, Full (vertical Primary only) |
| Secondary Button | boolean | true | Basic, Points, Half, Full (vertical Secondary only) |
| Text Box | slot | — | Basic, Points, Half, Full |
| Icon | slot | — | Basic, Points |
| Illustration | slot | — | Half, Full |

`.Radio Points`: **Type** = Default | Selected (default Default); **Show Icon** boolean (true); **Instance** instance swap
(default `Live Location_Filled`, 916:14580); **Show Radio Button** boolean (true).

## Values
All spacing, sizes and radii are raw (no variable bound). Colours are `Colors - Semantic Tokens` unless prefixed `Maps/`.

| Part | Property | Value |
|---|---|---|
| Scrim (variant root) | size | 360 × 720 fixed |
| | fill | `Overlays/Large (75% Black)` (#000000 @ 0.75) → `--overlays-large-75pct-black` |
| | layout | vertical, align end/end, gap 16 |
| Close Icon | padding | 4/16/4/16, hugs (56×32) |
| | icon | `Close_Stroke` 24×24, vector `Surface/Neutral/White` |
| Container | width / max-height | fills (360) / 632 |
| | radius | 16/16/0/0 (raw) |
| | fill | **raw #ffffff** (unbound; implemented with `--surface-neutral-white`, same value) |
| Icon slot | size / radius | 60×60 / 999 |
| Icon Holder | size / radius / fill | 60×60 / 32 / `Maps/Mapped-Blue/Blue 200` (#a0c8f9) |
| Icon | size / colour | `Image_Stroke` 40×40, vector `Surface/Neutral/Black` |
| Title | text style / colour | `Title/Moderate/Bold` / `Text/OnSurface/Default` (#1a202a); no truncation set (sample text says "max 3 lines") |
| Body | text style / colour | `Body/Moderate/Reg` / `Text/OnSurface/Default` |
| Vertical buttons | | `Buttons` Size=Large, Primary-Default then Secondary-Default, fill width (312), gap 12 |
| Horizontal buttons | | `Buttons` Size=Medium, each 152 wide, gap 8 |
| CTAs bar | padding / gap | 16/24/16/24 / 10 |
| | fill | **raw #ffffff** |
| | effect | `Elevation/S` → `--elevation-s` |
| Half illustration | size | 124×124 (slot gap 24.799999237060547, single child) |
| Full illustration | size | 360×180 |

Button label texts in the samples are "Label". Button values come from the Button component (see `components/Button/spec.md`).

### .Radio Points
Horizontal, padding 8, gap 8, radius 8, fills width (312 in sheet), height hugs (44). Fill `Surface/Neutral/White`.

| Type | Stroke (1, INSIDE) | Effect | Radio Button | Radio vector |
|---|---|---|---|---|
| Default | `Border/Neutral/Light` (#e0e3e6) | — | `Radio Button` State=Active, Selection=False | `Surface/Neutral/Dark` |
| Selected | `Border/Information/Dark` (#146edc) | `Elevation/S` | `Radio Button` State=Active, Selection=True | `Surface/Information/Dark` |

Leading Icon + Label: horizontal, gap 4, fills width. Icon Bounding Box 28×28, padding 4, radius 999, no fill; icon 20×20, vector
**raw #1c1b1f**. Text: `Body/Moderate/Reg`, **raw #1a202a**, truncation ENDING after 2 lines. Radio Button 24×24 (graphics passed in as
`radioIcon` / `radioSelectedIcon` ReactNodes; the Radio Button component is exported separately).

## States
No pressed/disabled/loading states on the sheet. `.Radio Points` has Default / Selected only (no pressed or disabled).

## Inconsistencies / gaps found
- Container and CTAs fills are **unbound #ffffff**, while `GuidanceBottomSheet` binds the same fill to `Surface/Neutral/White`.
- Radius 16/16/0/0 is raw; GuidanceBottomSheet's sheet is also 16/16/0/0 — the 10/10/0/0 there belongs only to its hidden "Head" frame.
- "Horizontally Stacked Buttons" / "Vertically Stacked Buttons" booleans are wired **only in Basic**; in Points/Half/Full the
  horizontal frames are hidden and unconnected, so the property does nothing there.
- Half and Full Illustration contain a **stray hidden "Horizontally Stacked Buttons"** frame inside the Container in addition to the one in CTAs.
- Horizontal button order differs: Basic = Secondary, Primary; Points/Half/Full = Primary, Secondary. Implemented per variant.
- Horizontal Primary/Secondary buttons are not wired to the Primary/Secondary Button booleans.
- Show Top Icon has no effect in Half/Full (no Icon slot there).
- Points "Content" frame has a **fixed height 464** (other variants hug); implementation hugs and scrolls inside max-height 632.
- `.Radio Points` text colour #1a202a and icon colour #1c1b1f are unbound (#1c1b1f is not a palette value).
- Half Illustration slot gap is 24.799999237060547 (odd value; no visual effect with one child).
- Basic places buttons inside the padded Container (no CTA bar, no elevation); the other variants pin them in an elevated CTA bar.
- No spacing/radius tokens bound anywhere; scrim size 360×720 is the frame size, not a constraint.
