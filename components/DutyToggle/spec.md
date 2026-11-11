# DutyToggle

**Figma:** page *Header components* → component set `Duty Toggle`
([701:124459](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=701-124459)), 2 variants:
`Property 1=Off Duty` ([701:124458](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=701-124458)),
`Property 1=On Duty` ([701:124457](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=701-124457)).
No description is set in Figma.

## Purpose / when to use
Inferred from the design (no Figma description): the captain's on/off-duty switch shown in the centre of the
**HomepageHeader**. The pill shows the current duty status as a label plus a toggle switch; tapping it flips the status.

## Anatomy
```
Duty Toggle (auto-layout horizontal, padding 8/16/8/16, gap 8, left / centre, fill-width × hug, pill)
├── Label          (text "OFF DUTY" / "ON DUTY", fill-width, left-aligned)
└── Toggle Switch  (instance of local "Toggle Switch/No Text/Active/OFF" (1107:165) / ".../ON" (1107:164), 40 × 26)
    ├── Track  (rectangle 36 × 14, radius 200)
    └── knob   (ellipse 20 × 20, two drop shadows)
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| Property 1 | variant | **Off Duty**, On Duty |

No text, boolean or instance-swap properties. The label text is fixed per variant ("OFF DUTY" / "ON DUTY").
The nested Toggle Switch instance carries its own props (`OFF Icon` = Volume_Mute_Filled, `ON Icon` = Volume_Up_Filled,
`Show Icon` = true) but has no icon layers, so they have no visual effect.

## Values
| Part | Property | Off Duty | On Duty |
|---|---|---|---|
| Root | size | 162 × 42 (fill width × hug) | same |
| | padding | 8 / 16 / 8 / 16 (raw) | same |
| | gap | 8 (raw) | same |
| | radius | `Button Tokens/Button/Radius` (→ 999), all four corners | same |
| | fill | `Colors - Maps/Mapped-Gray/Gray 50` (#f6f7f9) | `Colors - Maps/Mapped-Green/Green 50` (#f4fdf8) |
| | stroke (1, inside, raw weight) | `Colors - Semantic Tokens/Border/Neutral/Dark` (#5c6675) | `Colors - Semantic Tokens/Border/Success/dark` (#058743) |
| | effects | none | none |
| Label | text | "OFF DUTY" | "ON DUTY" |
| | text style | `Button/Moderate/SemiBold` (Inter SemiBold 16/20, bound to `Typography - Semantic Tokens/Botton/Moderate (16)/SemiBold/*`) | same |
| | fill | `Colors - Semantic Tokens/Text/Neutral/Medium` (#5c6675) | `Colors - Semantic Tokens/Text/Success/dark` (#058743) |
| | sizing | fill width, auto height, left-aligned | same |
| Toggle Switch | box | 40 × 26 | 40 × 26 |
| Track | size / radius | 36 × 14, radius 200 (raw) at x 2, y 6 | 36 × 14, radius 200 (raw) at x 1, y 6 |
| | fill | `Colors - Maps/Mapped-Gray/Gray 400` (#aeb6c3) | `Colors - Maps/Mapped-Green/Green 200` (#95e8bc) |
| knob | size | 20 × 20 at x 2, y 3 (left) | 20 × 20 at x 17, y 3 (right) |
| | fill | `Colors - Maps/Mapped-Gray/Gray 100` (#eceef2) | `Colors - Maps/Mapped-Green/Green 400` (#12af5c) |
| | effects (raw) | drop shadow 0,1 blur 1 #000000 @ 24%; drop shadow **−1**,0 blur 4 #000000 @ **12%** | drop shadow 0,1 blur 1 #000000 @ 24%; drop shadow **1**,0 blur 4 #000000 @ **16%** |

## States
Only the two variants (Off Duty / On Duty). No pressed, disabled or loading state.

## Inconsistencies / gaps found
- Variant property is named `Property 1` (Figma default) instead of something like `Duty`.
- Root fill/label/stroke mix collections: fills use `Colors - Maps/…` directly while stroke and text use `Colors - Semantic Tokens/…`.
- The knob shadows are raw effects (no effect style) and differ between OFF and ON (x −1 / 12% vs x +1 / 16%).
- The track sits at x 2 in OFF but x 1 in ON (1 px shift).
- The nested `Toggle Switch/No Text/Active/ON|OFF` components (1107:164 / 1107:165) report no parent through the plugin API
  (they are not inside the `Toggle` set 1107:166). Their `OFF Icon` / `ON Icon` / `Show Icon` props reference volume icons
  but no icon layers exist.
- Stroke weight 1 is unbound (no token).
- Track radius 200 is raw.
