# ToolTip

**Figma:** page *Tool Tips* → component set `Tool Tip`
([1801:6125](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1801-6125)), 24 variants.

## Purpose / when to use
From the Figma component description (verbatim intent):
- **Plain** tooltips should be time-bound and disappear automatically (suggested 5 seconds).
- **Detailed** tooltips can be time-bound, have a close button, or both.
- Tooltips should not contain critical information; use them only for extra or supportive context.

Placeholder copy in Figma: Plain = "use this to convey simple single/two liner info"; Detailed = "use this to convey lengthier
info. this tooltip can have action buttons."

## Anatomy
```
Tool Tip (auto-layout; vertical for Tip Position Top/Bottom, horizontal for Left/Right; gap negative → tip overlaps body)
├── Tip (frame, holds the pointer; first child for Top/Left, last child for Bottom/Right)
│   └── Polygon (3-point polygon, 20×20; rotated/flipped per position)
└── Plain ToolTip  (body; vertical, padding 12, radius 16)   ← the body frame is named "Plain ToolTip" in both types
    Plain:
    └── Supporting Text (frame) → text
    Detailed:
    ├── Content (horizontal, gap 8)
    │   ├── Text Box (vertical, gap 8, fill width)
    │   │   ├── Title (frame) → text           — boolean "Title"
    │   │   └── Supporting Text (frame) → text
    │   └── Close Icon (24×24 frame) → Close_Stroke (916:14593)   — boolean "Close Button"
    └── Buttons (horizontal, gap 16, fill width)               — boolean "Buttons"
        ├── Button 1 → Buttons / Size=Small, Type=Tertiary-Info, State=Active, Icon=None, label "Action 1" — boolean "Button 1"
        └── Button 2 → same, label "Action 2"                                                            — boolean "Button 2"
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| Type | variant | **Plain**, Detailed |
| Tip Position | variant | Right, **Top**, Bottom, Left |
| Tip Alignment | variant | **Left**, Center, Right, Top, Bottom |
| Close Button | boolean | **true** (Detailed only) |
| Title | boolean | **true** (Detailed only) |
| Buttons | boolean | **true** (Detailed only) |
| Button 1 | boolean | **true** (Detailed only) |
| Button 2 | boolean | **true** (Detailed only) |

Tip Alignment combinations that exist: Top/Bottom × Left/Center/Right; Left/Right × Top/Center/Bottom (24 = 2 types × 12).
There are no text properties (title, body and button labels are plain overrides) and no instance-swap for the close icon.
No interactive states (pressed/disabled) on the tooltip itself; buttons use Button's states.

## Sizes / layout (all raw — nothing on the tooltip frames is bound to a variable)
| | Plain | Detailed |
|---|---|---|
| Root width | 328 fixed (raw), height hugs | 328 fixed (raw), height hugs |
| Root height, Top/Bottom | 76 | 172 |
| Root height, Left/Right | 64 | 160 |
| Root gap, Top/Bottom (vertical) | −8 | −8 |
| Root gap, Left/Right (horizontal) | −8 | **−6** |
| Root counter-axis alignment (Top/Bottom) | Alignment Left → start, Center → center, Right → end | same |
| Body padding | 12 / 12 / 12 / 12 | 12 / 12 / 12 / 12 |
| Body gap | 8 (single child) | 12 (Content ↔ Buttons) |
| Body radius | 16 (all corners) | 16 |
| Body size, Top/Bottom | 328 × 64 | 328 × 160 |
| Body size, Left/Right | 316 × 64 (fills) | 314 × 160 (fills) |
| Content gap (Text Box ↔ Close) | — | 8 |
| Text Box gap (Title ↔ Supporting) | — | 8 |
| Text width, Top/Bottom | 304 | 272 |
| Text width, Left/Right | 292 | 258 |
| Close Icon frame | — | 24 × 24, icon 24 × 24 (vector 14 × 14) |
| Buttons gap | — | 16; buttons hug (80 × 32, 81 × 32) |

### Tip frame
| Tip Position | Tip frame | Padding (T/R/B/L) | Alignment inside tip frame | Polygon transform |
|---|---|---|---|---|
| Top | 68 × 20, hugs | 0 / 24 / 0 / 24 | — | none (apex up) |
| Bottom | 68 × 20, hugs | 0 / 24 / 0 / 24 | — | flipped vertically (apex down) |
| Left | 20 wide, fills height | Plain 8 / 0 / 8 / 0, Detailed 16 / 0 / 16 / 0 (Center: 0) | Top → start, Center → center, Bottom → end | rotated −90° (apex left) |
| Right | 20 wide, fills height | Plain 8 / 0 / 8 / 0, Detailed 16 / 0 / 16 / 0 (Center: 0) | Top → start, Center → center, Bottom → end | rotated 90° (apex right) |

So with Tip Alignment Left/Right the triangle sits 24 px in from the body edge; for Left/Right positions with Top/Bottom
alignment it sits 8 px (Plain) or 16 px (Detailed) from the top/bottom edge. The polygon is 20 × 20 and overlaps the body by
8 px (6 px for Detailed Left/Right) because of the negative gap. Polygon corner radius 0.

## Colours
| Part | Plain | Detailed |
|---|---|---|
| Body + polygon fill | `Surface/Information/Light` (#eef5fe) | `Surface/Warning/Light` (#fff6ef) |
| Title text | — | `Text/OnSurface/Default` (#1a202a) |
| Supporting text | `Text/OnSurface/Default` | `Text/OnSurface/Default` |
| Close icon vector | — | `Surface/Neutral/Black` (#000000) |
| Button labels | — | **override** `Colors - Maps/Mapped-Blue/Blue 500` (#1559ac) |
| Stroke | none | none |

Identical across all positions/alignments (verified on all 24 variants). Colour names are in `Colors - Semantic Tokens`
unless prefixed.

## Text
| Text | Style | Behaviour |
|---|---|---|
| Plain supporting text | `Body/Small/Reg` | truncates with ellipsis after **2 lines** |
| Detailed title | `Title/2X-Small/SemiBold` | wraps, no truncation |
| Detailed supporting text | `Body/Small/Reg` | wraps, no truncation |
| Button labels | `Button/Small/Bold` (from Button) | Button behaviour (2 lines max) |

All text left-aligned; text styles are bound to `Typography - Semantic Tokens` + `Typography - Typeface/Cap App - Typeface`.

## Effects
Root: effect style `Elevation/S` (local) = drop shadow 0, 0, blur 4, spread 0, #101010 @ 16% → `--elevation-s`.

## Implementation notes
- `ToolTip.tsx` renders the tip as a 20 × 20 `clip-path` triangle; the Elevation/S shadow is applied to the body only
  (CSS clip-path removes box-shadow from the triangle; `filter: drop-shadow()` can't consume the 4-length token).
- Buttons reuse `Button` (Small / Tertiary-Info) with the label colour overridden to `--mapped-blue-blue-500`, matching Figma.

## Inconsistencies / gaps found
- Body frame is named "Plain ToolTip" in Detailed variants too.
- Detailed Left/Right uses root gap −6 while every other variant uses −8 (tip overlap 6 vs 8 px).
- Tip inset for Left/Right positions differs by type: 8 px (Plain) vs 16 px (Detailed); Top/Bottom use 24 px for both.
- Plain is information-blue, Detailed is warning-orange; no other colour options exist and nothing in Figma says why.
- Button labels override Tertiary-Info's `Text/Information/Dark` (#146edc) with `Mapped-Blue/Blue 500` (#1559ac), a map-level
  (not semantic) token.
- All tooltip dimensions (width 328, padding 12, radius 16, gaps, tip insets) are unbound raw values.
- No text properties for title/body/button labels; no instance-swap for the close icon.
- Booleans Title / Close Button / Buttons / Button 1 / Button 2 exist on Plain variants too but have no effect there.
