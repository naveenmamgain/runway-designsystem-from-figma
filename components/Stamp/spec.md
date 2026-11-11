# Stamp

**Figma:** page *Stamps* → component set `stamp` ([1700:34107](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1700-34107)), 6 variants.
No description is set on the component in Figma.

## Purpose / when to use
No usage notes in Figma; inferred from the design only. Circular rubber-stamp illustrations that badge an earnings / commission
plan ("Promise Delivered" arched text around a plan name). Purely decorative artwork: no text properties, no layout, no tokens.

## Anatomy
Each variant is a non-auto-layout frame of vector artwork:
```
name=<variant> (frame)
├── outer ring(s)        — vectors or ellipses with stroke
├── centre mark / "0%" + "Commission" vectors, or a ribbon vector with a text layer
├── arched text groups   — outlined letter vectors ("Promise Delivered" etc.)
└── texture              — 164×164 clipping frame with a grunge texture group (clip path group)
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| name | variant | 0 commission plan, **fixed commission**, work zone-0 commission, fixed earnings per km, work zone- extra earnings, 0 commission lifetime guarantee |

## Variants
| name | Node | Frame size | Main colour | Colour binding | Live text layer |
|---|---|---|---|---|---|
| fixed commission | 1700:61728 | 198.67 × 164 (artwork overflows to ~210 × 204) | #1559ac | remote style `Color/Palette/Blue/500` on ribbon + letters; rings raw #1559ac; white bg circle #ffffff at opacity 0.5 | "Fixed Commission" — Noto Sans ExtraBold 15.409396, line-height auto, #ffffff raw |
| fixed earnings per km | 1700:34108 | 164 × 164 | #0a6b38 | remote style `Color/Palette/Green/600` | none (outlined) |
| work zone- extra earnings | 1700:39637 | 164 × 164 | #139f98 | **raw** (no style, no variable) | "Extra Earnings" — Noto Sans ExtraBold 14.85906, line-height auto, #139f98 raw |
| 0 commission plan | 1700:45159 | 164 × 164 | #3804a5 | remote style `Color/Palette/Purple/600` on glyphs; ring strokes raw #3804a5 | none |
| 0 commission lifetime guarantee | 1700:50686 | 164 × 164 | #1559ac | remote style `Color/Palette/Blue/500` on glyphs; ring strokes raw | none |
| work zone-0 commission | 1700:56212 | 164 × 164 | #139f98 | **raw** | none |

Ring strokes are raw fractional weights (e.g. 4.677852 inside, 2.424206 centre with dash 0.0808069 / 7.2726188 for the dotted ring;
fixed commission rings 4.402685 inside). White fills (#ffffff) are raw everywhere.

## Implementation
The artwork is exported as PNG (1× from Figma, via `get_screenshot`) into `components/Stamp/assets/` and rendered with `<img>`.
Vector SVG export was not used: each variant's SVG is ~1.45–1.69 MB (texture group), beyond what could be transferred.
Replace the PNGs with SVG/2×/3× exports from Figma for production.

## Inconsistencies / gaps found
- **Binds no variables at all.** Colours that are styled use **remote** library styles `Color/Palette/Blue/500`, `Green/600`, `Purple/600`
  (same hexes exist locally as `--base-blue-blue-500`, `--base-green-green-600`, `--base-purple-purple-600`); ring strokes and the teal
  #139f98 used by both "work zone" variants are raw, and #139f98 matches **no** token in tokens/tokens.css.
- Two variants contain live text in **Noto Sans ExtraBold** (not Inter) at fractional sizes; the other four use outlined vectors.
- "fixed commission" frame is 198.67 wide (not 164) and its ribbon/artwork extends outside the frame (rendered bounds ~210 × 204).
- Variant names are inconsistent ("work zone-0 commission" vs "work zone- extra earnings"; lowercase set name `stamp`).
- Several "Subtract" boolean groups include an ellipse with a raw #000000 stroke and #d9d9d9 rectangles (construction leftovers).
- Only 1× rasters could be exported here (Figma screenshot does not upscale), so the PNGs are 164 px (165 px for some due to rounding).

## Assets
- `assets/*.png` — 2x PNG exports of each variant from the Figma REST API (`scale=2`); used by `Stamp.tsx`.
- `assets/svg/*.svg` — full SVG exports of each variant (1.4–1.7 MB each).
