# Toggle

**Figma:** page *Checkbox, Radio & Toggle* → component set `Toggle`
([1107:166](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1107-166)), 8 variants.
No description is set on the set or its variants.

## Purpose / when to use
Switches a single setting on or off with immediate effect. Figma has no description or annotation; this is inferred from
the design. `Type=Text` shows an "ON"/"OFF" label in the track and an optional icon in the knob (default icons are
volume on / mute, e.g. a sound setting). `Type=No Text` is the plain switch.

## Anatomy
```
Toggle (component, vertical auto-layout, padding 0, gap 0, hug × hug → 72 × 32)
└── Toggle/Text (horizontal auto-layout, 72 × 32, align left / centre, radius 222)
    ├── ON text   (frame, hug, min-width 32, centre/centre; visible only when Selected=ON)
    │   └── "ON"  (text; Type=Text only — empty frame in Type=No Text)
    ├── Knob      (24 × 24, padding 2, radius 24)
    │   └── Icon  (frame 20 × 20, boolean "Show Icon"; Type=Text only)
    │       └── instance — "ON Icon" (Selected=ON) / "OFF Icon" (Selected=OFF)
    └── OFF Text  (frame, hug, min-width 32, centre/centre; visible only when Selected=OFF)
        └── "OFF" (text; Type=Text only — empty frame in Type=No Text)
```
The hidden label frame of the other state is `visible=false` and opacity 0, so it takes no space.

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| Type | variant | Text, **No Text** |
| State | variant | **Active**, Disabled |
| Selected | variant | **OFF**, ON |
| Show Icon | boolean | **true** (only has an effect in Type=Text — No Text variants have no Icon frame) |
| ON Icon | instance swap | default `Volume_Up_Filled` (916:14569, from page *Icons*) |
| OFF Icon | instance swap | default `Volume_Mute_Filled` (916:14568) |

No Pressed, Focused or Hover states. One size.

## Layout (all raw — nothing is bound to a variable)
| | Selected=ON | Selected=OFF |
|---|---|---|
| Track size | 72 × 32 | 72 × 32 |
| Track padding (top/right/bottom/left) | 4 / 4 / 4 / 8 | 4 / 8 / 4 / 4 |
| Track gap | 4 | 4 |
| Order | [ON label 32] · gap · [Knob 24] | [Knob 24] · gap · [OFF label 32] |
| Track radius | 222 | 222 |
| Knob | 24 × 24, padding 2, radius 24 | same |
| Knob icon | 20 × 20 | 20 × 20 |
| Label frame | min-width 32, hug, content centred | same |

## Colours / text / effects
All colours are in `Colors - Semantic Tokens`.

| State | Selected | Track fill | Knob fill | Label colour | Knob icon colour (Type=Text) |
|---|---|---|---|---|---|
| Active | ON | `Surface/Success/Dark` (#058743) | `Surface/Neutral/White` (#ffffff) | "ON" `Text/OnSurface/Inverse` (#f6f7f9) | raw #1c1b1f (icon's own unbound fill) |
| Active | OFF | `Surface/Neutral/Medium` (#aeb6c3) | `Surface/Neutral/White` | "OFF" `Text/OnSurface/Default` (#1a202a) | raw #1c1b1f |
| Disabled | ON | `Surface/Neutral/Light` (#eceef2) | `Surface/Neutral/Medium` (#aeb6c3) | `Text/OnSurface/Disabled` (#aeb6c3) | `Surface/Neutral/Dark` (#5c6675) |
| Disabled | OFF | `Surface/Neutral/Light` | `Surface/Neutral/Medium` | `Text/OnSurface/Disabled` | `Surface/Neutral/Dark` |

- Label text style: `Button/Moderate/SemiBold` (Inter SemiBold 16/20; bound to `Typography - Semantic Tokens/Botton/Moderate (16)/SemiBold/*` and `Typography - Typeface/Cap App - Typeface`). Text align left inside the centred frame.
- Knob effect: **Type=No Text, State=Active only** — raw drop shadow `x 1, y 1, blur 4, spread 0, #101010 @ 10%` (no effect style).
  Type=Text knobs and all Disabled knobs have **no** shadow.
- Track has no stroke.

## Inconsistencies / gaps found
- Knob drop shadow exists only on `Type=No Text, State=Active` variants; `Type=Text` Active knobs have none.
- Knob shadow is a raw effect (`1,1 r4 #101010@10%`), not one of the Elevation styles.
- Active-state knob icon colour is the icon's own unbound `#1c1b1f` (Material default), not a token; Disabled uses `Surface/Neutral/Dark`.
- "Show Icon" is a set-level boolean but No Text variants have no Icon frame, so it does nothing there.
- All dimensions (72×32, padding 4/8, radius 222/24, knob 24) are raw.
- Label frame naming inconsistent: `ON text` vs `OFF Text`.
