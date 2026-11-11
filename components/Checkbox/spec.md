# Checkbox

**Figma:** page *Checkbox, Radio & Toggle* → component set `Checkbox`
([1107:145](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1107-145)), 4 variants.
No description is set on the set or its variants.

## Purpose / when to use
Independent on/off selection, typically in a list where several options can be chosen. Figma has no description or
annotation; this is inferred from the design. Use Radio Button for a single choice from a group and Toggle for an
immediate on/off setting.

## Anatomy
```
Checkbox (component, 24 × 24, no auto-layout, no fill/stroke)
└── Vector (18 × 18, at x 3 / y 3, constraints centre/centre)
       Selected=False: Material "check_box_outline_blank" — rounded square outline (outer 18×18, corner r 2, 2px wall)
       Selected=True:  Material "check_box" (vector named "check_box") — filled rounded square with a knocked-out check mark
```
No text, icon-swap or boolean properties; the label beside a checkbox is not part of the component.

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| State | variant | **Active**, Disabled (Figma option order: Disabled, Active) |
| Selected | variant | **False**, True |

No Pressed, Focused, Hover, Error or Indeterminate states exist in Figma. Only one size.

## Size
| | Value |
|---|---|
| Component box | 24 × 24 (raw) |
| Glyph | 18 × 18 at offset 3,3 (raw) |
| Box corner radius | 2 (raw, vector geometry) |
| Outline wall (unselected) | 2 (raw, vector geometry) |

## Colours per variant
All colours are in `Colors - Semantic Tokens`.

| State | Selected | Box / outline | Inside of box | Check mark |
|---|---|---|---|---|
| Active | False | `Surface/Information/Dark` (#146edc) | transparent | — |
| Active | True | `Surface/Information/Dark` (filled) | — | transparent (knock-out) |
| Disabled | False | `Surface/Neutral/Medium` (#aeb6c3) | `Surface/Neutral/Light` (#eceef2) — second vector region | — |
| Disabled | True | `Surface/Neutral/Medium` (filled) | — | transparent (knock-out) |

CSS: `--surface-information-dark`, `--surface-neutral-medium`, `--surface-neutral-light`.

## Implementation notes
`Checkbox.tsx` renders a native `<input type="checkbox">` (visually hidden) and draws the exact exported Figma vector
paths as inline SVG. The check mark is a hole in the filled box, so whatever is behind the checkbox shows through it.

## Inconsistencies / gaps found
- Unselected Active outline is `Surface/Information/Dark` (blue), while the unselected Active **Radio Button** ring is `Surface/Neutral/Dark` (grey).
- The check mark is a transparent knock-out rather than a white fill, so on a non-white background the mark takes the background colour.
- Variant option order is `Disabled, Active` for State (Radio Button uses `Active, Disabled`) and the axis is named `Selected` here but `Selection` on Radio Button.
- No indeterminate, focus or pressed state; size not tokenised.
