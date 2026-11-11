# Badge

**Figma:** page *Badges* → component set `Badge` ([1089:7631](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1089-7631)), 3 variants.
No description is set on the component in Figma.

## Purpose / when to use
No usage notes in Figma; inferred from the design only. A yellow notification indicator: **No Number** is a plain dot
(e.g. "something new"), **Small** / **Large** show a count.

## Anatomy
```
Badge
├── Size=No Number: plain rectangle 12×12 (no children, no auto-layout)
└── Size=Small | Large: auto-layout vertical, content centred
    └── "1" (text, prop "Text")
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| Size | variant | **No Number**, Small, Large |
| Text | text | **"1"** (used by Small and Large) |

No states.

## Sizes
| | No Number | Small | Large |
|---|---|---|---|
| Size | 12 × 12 fixed (raw) | height 18 fixed, width hugs, min-width 18, min-height 18 (raw) | height 20 fixed, width hugs, min-width 20, min-height 20 (raw) |
| Padding | — | 4 all sides (raw) | 4 all sides (raw) |
| Gap | — | 4 (raw) | 4 (raw) |
| Corner radius | 999 — `Button Tokens/Button/Radius` → `--button-radius` | same | same |
| Fill | #ffca20 — **`Colors - Maps/Mapped-Yellow/Yellow 400`** → `--mapped-yellow-yellow-400` | #ffca20 — **`Colors - Maps/Mapped-Brand/Primary-A`** → `--mapped-brand-primary-a` | same as Small |
| Text style | — | `Label/Moderate/Med` (Inter 12 Medium, leading trim cap height) | `Label/Large/Med` (Inter 14 Medium, leading trim cap height) |
| Text colour | — | `Text/OnSurface/Default` (#1a202a) → `--text-onsurface-default` | same |
| Text alignment | — | left, auto width & height (centred by the parent) | same |

Text styles are bound to `Typography - Semantic Tokens/Label/Moderate (12)/Med/…` and `…/Label/Large (14)/Med/…` (local styles).
Stroke and effects: none.

## Inconsistencies / gaps found
- **Fill token differs between sizes**: No Number uses `Mapped-Yellow/Yellow 400`, Small/Large use `Mapped-Brand/Primary-A` (same hex #ffca20).
- Sizes, padding (4) and gap (4) are raw; only radius, fill and text are bound.
- Radius uses `Button Tokens/Button/Radius` (mode-dependent Button collection) outside a button.
- With one digit the padded content is smaller than the badge (Small: text 6×9 + padding 8 = 14×17; Large: 7×10 + 8 = 15×18), so the
  fixed height and the min-width (18 / 20) are what actually size the badge, not the padding.
- No maximum (e.g. "99+") rule or max-width is defined.
