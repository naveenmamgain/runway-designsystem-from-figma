# Modal

**Figma:** page *Toast / Modals* → component `Modal` ([2027:9964](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2027-9964)), single component,
and private component set `.Graphic Box` ([2027:9912](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2027-9912)), 2 variants.
No description is set on either in Figma.

## Purpose / when to use
No usage notes in Figma; inferred from the design only. A centred dialog on a dimmed screen with an icon, title, body and
vertically stacked actions (Primary, optional Secondary). Use when the captain must acknowledge or decide. For a message
without actions see **Toast**.

## Anatomy
```
Modal (360×720 scrim frame, no auto-layout)
└── Toast (SLOT "Toast"; card at x 16, y 198; vertical, centred; clips content)
    ├── Content (vertical, centred, gap 0; fills width)
    │   ├── .Graphic Box (instance, Type=Icon, Instance=account_balance; fills width, contents centred)
    │   └── Text Box (vertical, centred, gap 4)
    │       ├── Title → "Modal Title Text"
    │       └── Body  → "This is a body text, use with limited characters, so it is easy to understand the message."
    └── Vertically Stacked Buttons (vertical, gap 8; fills width)
        ├── Primary Button  → Buttons / Size=Medium, Type=Primary-Default, State=Active, Icon=None, text "Primary"
        └── Primary Button  → Buttons / Size=Medium, Type=Secondary-Default, …, text "Secondary" (hidden)
```

## Properties
| Property | Type | Default |
|---|---|---|
| Buttons | boolean | **true** (not wired — see gaps) |
| Secondary Button | boolean | **false** (not wired — see gaps) |
| Toast | slot | default card content above |

Title and body are not text properties (plain text layers in the slot). No variants, sizes or states.

## Values
| Part | Property | Value | Token |
|---|---|---|---|
| Modal (scrim) | size | 360 × 720 fixed, no auto-layout, no radius, no clip | raw |
| | fill | #000000 @ 0.75 | `Overlays/Large (75% Black)` → `--overlays-large-75pct-black` |
| Card ("Toast" slot) | position | x 16, y 198 (constraints left/top) | raw |
| | width | 328 fixed | raw |
| | height | hug (296 with default content) | — |
| | padding | 24 all sides | raw |
| | gap | 24 | raw |
| | alignment | centre / centre | — |
| | corner radius | 16, clip content | raw |
| | fill | #ffffff | `Surface/Neutral/White` → `--surface-neutral-white` |
| | stroke / effects | none | — |
| Content | gap | 0 (graphic directly above text) | raw |
| Text Box | gap | 4 | raw |
| Title | text style / colour | `Title/Moderate/Bold` (Inter 24 Bold) / `Text/OnSurface/Default` (#1a202a) → `--text-onsurface-default` | |
| | alignment | centre, fixed width / auto height | — |
| Body | text style / colour | `Body/Moderate/Med` (Inter 16 Medium) / **`Text/Neutral/Dark`** (#1a202a) → `--text-neutral-dark` | |
| | alignment | centre, fixed width / auto height | — |
| Buttons stack | gap | 8 | raw |
| Primary / Secondary | instance | `Buttons` Medium (all values from Button Tokens — see [Button/spec.md](../Button/spec.md)); width 280 (fixed, = card inner width) | |

## .Graphic Box (private)
Properties: **Type** = Icon | **Image / GIF** (default); **Instance** (instance swap, default `account_balance`, 1758:514).

| | Type=Image / GIF | Type=Icon |
|---|---|---|
| Frame | 72 × 72, hugs, horizontal auto-layout, padding 0, gap 0 | same |
| Graphic | "Graphic Bounding Box" 72 × 72, image fill (scale mode FILL), radius 0 | "Icon" frame 72 × 72, padding 4, gap 10, centred; icon instance 54 × 54 |
| Icon colour | — | raw #1c1b1f inside the `account_balance` icon (unbound) |

Each variant contains both layers and hides the unused one. In both Toast and Modal the instance fills the card width (280) and
overrides alignment to centre/centre (main component is MIN/CENTER). All values are raw.

## Inconsistencies / gaps found
- **"Buttons" and "Secondary Button" boolean properties are defined but not bound to any layer** (no componentPropertyReferences);
  the Secondary button is just a hidden layer. The TSX implements them as working props.
- The hidden secondary button layer is named "Primary Button" (both buttons share that name).
- **Card is not centred:** y = 198 in a 720 frame with a 296-tall card (centre would be 212); Modal root has no auto-layout. TSX centres it.
- The card slot is named **"Toast"**, mixing up the two components.
- Body colour `Text/Neutral/Dark` differs from Toast's `Text/OnSurface/Default` (same hex #1a202a).
- Spacing differs from Toast (padding/gap 24 vs 16; graphic ↔ text gap 0 vs 16; fixed 328 width vs fill).
- Button instances are fixed 280 wide (not "fill"); the TSX uses width 100% of the card's inner width (= 280).
- Graphic Box icon colour #1c1b1f is raw and matches no semantic token; the icon is Material "account_balance".
- All spacing, radii and sizes are raw.
