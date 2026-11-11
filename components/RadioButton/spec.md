# Radio Button

**Figma:** page *Checkbox, Radio & Toggle* → component set `Radio Button`
([1104:357](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1104-357)), 4 variants.
No description is set on the set or its variants.

## Purpose / when to use
Single choice from a set of mutually exclusive options. Figma has no description or annotation; this is inferred from the
design (standard radio glyph, selected = filled dot). Use Checkbox for independent multi-select and Toggle for an
immediate on/off setting.

## Anatomy
```
Radio Button (component, 24 × 24, no auto-layout, no fill/stroke)
└── Vector (20 × 20, at x 2 / y 2, constraints centre/centre)
       Material "radio_button_unchecked" / "radio_button_checked" glyph:
       outer ring Ø20 (2px ring: outer r 10, inner r 8) + for Selection=True a dot Ø10 (r 5)
```
The glyph is a single vector; colour is the vector fill. There are no text, icon-swap or boolean properties — the
label next to a radio is not part of the component.

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| State | variant | **Active**, Disabled |
| Selection | variant | **False**, True |

No Pressed, Focused, Hover or Error states exist in Figma. Only one size (24 × 24).

## Size
| | Value |
|---|---|
| Component box | 24 × 24 (raw) |
| Glyph | 20 × 20 at offset 2,2 (raw) |
| Ring thickness | 2 (raw, part of the vector geometry) |
| Dot (selected) | Ø10, centred (raw, part of the vector geometry) |

## Colours per variant
All colours are in `Colors - Semantic Tokens`.

| State | Selection | Ring | Dot | Inside of ring (between ring and dot / empty centre) |
|---|---|---|---|---|
| Active | False | `Surface/Neutral/Dark` (#5c6675) | — | transparent |
| Active | True | `Surface/Information/Dark` (#146edc) | `Surface/Information/Dark` | transparent |
| Disabled | False | `Surface/Neutral/Medium` (#aeb6c3) | — | `Surface/Neutral/Light` (#eceef2) — second vector region fills the centre |
| Disabled | True | `Surface/Neutral/Medium` | `Surface/Neutral/Medium` | transparent |

CSS: `--surface-neutral-dark`, `--surface-information-dark`, `--surface-neutral-medium`, `--surface-neutral-light`.

## Implementation notes
`RadioButton.tsx` renders a native `<input type="radio">` (visually hidden, keeps keyboard/AT behaviour) and draws the
exact Figma vector paths (exported from the variants) as inline SVG.

## Inconsistencies / gaps found
- Unselected Active ring is `Surface/Neutral/Dark`, but the unselected Active **Checkbox** box is `Surface/Information/Dark` — the two controls disagree on the unselected colour.
- Disabled + unselected fills the centre with `Surface/Neutral/Light`; Disabled + selected leaves the gap between ring and dot transparent. Not consistent.
- No focus/pressed state, no label, and the size is not bound to any token (24/20 raw).
