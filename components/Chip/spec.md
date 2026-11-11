# Chip

**Figma:** page *Chips* → component set `Chip` ([1213:539](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1213-539)), 3 variants.
No description is set on the component in Figma.

## Purpose / when to use
No usage notes in Figma; inferred from the design only. A pill-shaped selectable filter/option. **Default** is an
unselected option, **Selected** is the chosen option (darker fill, black outline, bold label and a close "×" to clear it),
**Disabled** is not selectable. An optional black count badge can follow the label.

## Anatomy
```
Chip (auto-layout, horizontal, align MIN/CENTER; width hugs, height fixed 36)
├── Leading Icon   (instance, 20×20; swap prop "Instance", default Check_Circle_Stroke; toggled by "Show Leading Icon")
├── Chip text      (text, prop "Chip Text")
├── Number Badge   (frame 20×20, centred; toggled by "Show Number Badge")
│   └── Number Badge (text "1")
└── Close_Stroke   (instance, 20×20, not swappable; toggled by "Show Trailing Icon" — Selected/Disabled only, see gaps)
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| State | variant | **Default**, Selected, Disabled |
| Chip Text | text | **"Chip text"** |
| Show Leading Icon | boolean | **true** |
| Show Trailing Icon | boolean | **true** (no effect in State=Default, see gaps) |
| Show Number Badge | boolean | **false** |
| Instance (leading icon) | instance swap | **`Check_Circle_Stroke`** (914:14003, page Icons); preferred value: one component (key `76f811…a76b`) |

No pressed/focused state exists. No sizes.

## Layout (identical in all 3 states)
| Part | Property | Value | Token |
|---|---|---|---|
| Chip | padding T/R/B/L | 8 / 16 / 8 / 16 | raw |
| | gap | 8 | raw |
| | height | 36 (fixed) | raw |
| | width | hug content (Default 121, Selected 151, Disabled 149 with default content) | — |
| | corner radius | 999 | `Button Tokens/Button/Radius` → `--button-radius` |
| Leading Icon / Close_Stroke | size | 20 × 20 | raw |
| Chip text | alignment | left, auto width & height, no truncation | — |
| Number Badge | size | 20 × 20 fixed, content centred (gap 10, padding 0) | raw |
| | corner radius | 100 | raw |
| | fill | #000000 | `Surface/Neutral/Black` → `--surface-neutral-black` |
| | text | `Button/Small/Med`, colour `Text/OnSurface/Inverse` (#f6f7f9) → `--text-onsurface-inverse`, left-aligned | |

## Colours / text per State
| State | Fill | Stroke | Label text style | Label colour | Icon colour (leading + close) |
|---|---|---|---|---|---|
| Default | `Surface/Neutral/Light` (#eceef2) | — | `Button/Small/Med` | `Text/OnSurface/Default` (#1a202a) | `Surface/Neutral/Black` (#000000) |
| Selected | `Colors - Maps/Mapped-Gray/Gray 300` (#c8ced8) → `--mapped-gray-gray-300` | `Border/Neutral/Black` (#000000), 1, inside | `Button/Small/Bold` | `Text/OnSurface/Default` | `Surface/Neutral/Black` |
| Disabled | `Surface/Neutral/Light` | — | `Button/Small/Med` | `Text/OnSurface/Disabled` (#aeb6c3) | `Surface/Neutral/Medium` (#aeb6c3) |

Colour names are in `Colors - Semantic Tokens` unless prefixed. Number Badge colours are the same in every state
(including Disabled). Text styles: `Button/Small/Med` = Inter 14 Medium, `Button/Small/Bold` = Inter 14 Bold, both bound to
`Typography - Semantic Tokens/Botton/Small (14)/…` (local styles). No effects.

## Inconsistencies / gaps found
- **State=Default: the Close_Stroke layer is hidden and NOT bound to "Show Trailing Icon"**, so the trailing icon can never be shown
  in Default even though the prop defaults to true. In Selected and Disabled it is bound. The TSX reproduces this (trailing icon not rendered in Default).
- Trailing icon is a fixed `Close_Stroke` instance with no instance-swap property (the leading icon has one).
- Selected label switches to Bold (wider text, 63 vs 61 px), so the chip width changes on selection.
- Number Badge text stays `Button/Small/Med` in Selected (label goes Bold) and keeps black/white colours in Disabled.
- Number Badge radius 100 is raw while the chip uses the `Button/Radius` token; padding/gap/height/icon sizes are all raw.
- Disabled has the same fill as Default (`Surface/Neutral/Light`); only text/icon colours differ.
- Chip uses `Button Tokens/Button/Radius`, a mode-dependent Button collection variable (all modes = 999) outside a button.
