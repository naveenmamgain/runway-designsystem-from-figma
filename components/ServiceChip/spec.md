# ServiceChip (Figma: .Service Chips + .Service Chip Icons)

**Figma:** page *OA screen and cards* → component set `.Service Chips`
([2315:2010](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2315-2010)), 18 variants, and its icon set
`.Service Chip Icons` ([2315:1487](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2315-1487)), 13 variants.
Both are private (dot-prefixed) and have no description in Figma. Previews: `preview.png` (chips), `preview-icons.png` (icons).

## Purpose / when to use
Inferred from the design (no Figma description): a compact pill that names the sub-service of an order (Bike, Auto Share,
Cab Premium, …). It sits at the top of the OA card's *Fare Details* (see `components/Card/spec.md`). Three looks exist:
**default** (grey pill), **corporate** (black pill, white text, inverted icon) and **premium** (black pill, gold text, gold
gradient icon).

## Anatomy
```
.Service Chips (auto-layout H, padding 2/6/2/2, gap 4, align MIN/CENTER, hug × hug, radius 100)
├── .Service Chip Icons (instance; 20×20, auto-layout V, padding 2, centred, radius 24)
│   └── Icon (16×16 frame) → glyph vectors
└── Service Name (auto-layout H, gap 4, centred, hug)
    └── <label> (text, centre-aligned, auto width)
```

## Properties
| Component | Property | Type | Values (default **bold**) |
|---|---|---|---|
| .Service Chips | Sub-Service | variant | **Bike**, Scooty, Food, Grocery, Parcel Delivery, Bike Corporate, Auto, Auto Plus, Share, Pet, Auto Parcel, Auto Corporate, Cab Economy, Cab Sedan, Cab XL, Cab Premium, Cab Share, Cab Corporate |
| .Service Chip Icons | Type | variant | **Bike Taxi**, Scooty, Food, Grocery, Parcel, Auto, Auto Plus, Share, Pet, Cab Economy, Cab Sedan, Cab XL, Cab Premium |

No boolean, text or instance-swap properties are exposed; the label text is fixed per variant. No states (pressed/disabled) exist.
React: `subService`, optional `label` override, `glyph` (16×16 ReactNode painted with `currentColor`).

## Shared layout (identical in all 18 chip variants)
| Part | Property | Value | Token |
|---|---|---|---|
| Chip | padding | 2 / 6 / 2 / 2 | raw |
| | gap | 4 | raw |
| | height | 24 (hug) | — |
| | radius | 100 | raw |
| | border / effects | none | — |
| Icon | size | 20 × 20 | raw |
| | padding | 2 | raw |
| | radius | 24 | raw |
| | glyph frame | 16 × 16 | raw |
| Service Name | gap | 4 (single child) | raw |
| Label | text style | `Label/Moderate/Reg` (Inter 12, cap-height trim) | bound to `Typography - Semantic Tokens/Label/Moderate (12)/Reg/*` |
| | alignment | centre, auto width | — |

## Per-variant values
| Sub-Service | Label text | Chip fill | Label colour | Icon variant | Icon fill override |
|---|---|---|---|---|---|
| Bike | Bike | `Surface/Neutral/Light` **(remote copy)** #eceef2 | `Text/OnSurface/Default` **(remote copy)** #1a202a | Bike Taxi | — |
| Scooty | Scooty | `Surface/Neutral/Black` **(remote copy)** #000000 | raw **#cbaa54** | Scooty | — |
| Food | Food Delivery | `Surface/Neutral/Light` (remote) | `Text/OnSurface/Default` (remote) | Food | — |
| Grocery | Grocery Delivery | `Surface/Neutral/Light` (remote) | `Text/OnSurface/Default` (remote) | Grocery | — |
| Parcel Delivery | Parcel Delivery | `Surface/Neutral/Light` (remote) | `Text/OnSurface/Default` (remote) | Parcel | — |
| Bike Corporate | Bike Corporate | `Surface/Neutral/Black` (local) | `Text/Neutral/White` #ffffff | Bike Taxi | fill `Surface/Neutral/White`, glyph `Surface/Neutral/Black` |
| Auto | Auto | `Surface/Neutral/Light` (remote) | `Text/OnSurface/Default` (remote) | Auto | — |
| Auto Plus | Auto Plus | `Surface/Neutral/Black` (remote) | raw #cbaa54 | Auto Plus | — |
| Share | **Auto Share** | `Surface/Neutral/Light` (remote) | `Text/OnSurface/Default` (remote) | Share | — |
| Pet | **Auto Pet** | `Surface/Neutral/Light` (remote) | `Text/OnSurface/Default` (remote) | Pet | — |
| Auto Parcel | Auto Parcel | `Surface/Neutral/Light` (remote) | `Text/OnSurface/Default` (remote) | Parcel | — |
| Auto Corporate | Auto Corporate | `Surface/Neutral/Black` (local) | `Text/Neutral/White` | Auto | fill `Surface/Neutral/White`, glyph `Border/Neutral/Black` |
| Cab Economy | Cab Economy | `Surface/Neutral/Light` (remote) | `Text/OnSurface/Default` (remote) | Cab Economy | — |
| Cab Sedan | Cab Sedan | `Surface/Neutral/Light` (remote) | `Text/OnSurface/Default` (remote) | Cab Sedan | — |
| Cab XL | Cab XL | `Surface/Neutral/Light` (remote) | `Text/OnSurface/Default` (remote) | Cab XL | — |
| Cab Premium | Cab Premium | `Surface/Neutral/Black` (remote) | raw #cbaa54 | Cab Premium | — |
| Cab Share | Cab Share | `Surface/Neutral/Light` (remote) | `Text/OnSurface/Default` (remote) | Share | — |
| Cab Corporate | Cab Corporate | `Surface/Neutral/Black` (local) | `Text/Neutral/White` | **Cab Sedan** | fill `Surface/Neutral/White`, glyph `Surface/Neutral/Black` |

Widths (hug, for reference): Bike 56, Bike Corporate 117, Auto 59, Auto Corporate 120, Cab Economy 111, Scooty 72, Auto Plus 86,
Cab Premium 108, Food 110, Share 95, Cab Share 92, Grocery 127, Pet 81, Cab Sedan 95, Cab Corporate 116, Parcel Delivery 117,
Auto Parcel 98, Cab XL 73.

## Icon variants (.Service Chip Icons)
| Type | Fill | Stroke | Glyph colour |
|---|---|---|---|
| Bike Taxi | `Surface/Neutral/Dark` #5c6675 | — | `Surface/Neutral/White` |
| Auto | `Surface/Neutral/Dark` | — | `Border/Neutral/White` (+ 3.05 / 2.7 / 0.139 px strokes on sub-shapes, same token) |
| Cab Economy / Cab Sedan / Cab XL | `Surface/Neutral/Dark` | — | `Surface/Neutral/Light` #eceef2 |
| Share | `Surface/Information/Dark` #146edc | — | `Surface/Neutral/White` |
| Food | raw **#5e9076** | — | #ffffff via remote style `Neutrals/White` |
| Grocery | raw **#0a6b38** | — | raw #ffffff |
| Parcel | raw **#bc7c46** | — | #ffffff via remote style `Color/Palette/White` |
| Pet | raw **#844301** | — | raw #ffffff |
| Scooty / Auto Plus / Cab Premium | raw linear gradient #bc9f58 → #fdf9d4, top → bottom (transform `[[0,1,0],[-1,0,1]]`) | 1 px INSIDE, raw linear gradient #bea157 → #f9f2c9 (transform `[[0.64,0.523,-0.113],[-0.523,0.64,0.443]]`, ≈129.25° in CSS) | `Surface/Neutral/Black` (Auto Plus: `Border/Neutral/Black`); Scooty has white details `Surface/Neutral/White` |

All colour names are `Colors - Semantic Tokens` unless marked raw.

## Inconsistencies / gaps found
- Default and premium chips bind a **remote copy** of `Colors - Semantic Tokens` (`Surface/Neutral/Light`, `Surface/Neutral/Black`, `Text/OnSurface/Default`); the three corporate chips bind the local collection. The implementation uses the local tokens.
- Premium label colour **#cbaa54** is unbound and not in any Runway palette; premium gradients (#bc9f58/#fdf9d4, #bea157/#f9f2c9) are raw.
- Icon backgrounds for Food (#5e9076), Grocery (#0a6b38), Parcel (#bc7c46), Pet (#844301) are raw; Food/Parcel glyphs use two different **remote** colour styles (`Neutrals/White`, `Color/Palette/White`) for the same white.
- Cab glyphs are `Surface/Neutral/Light` (#eceef2) while every other neutral glyph is pure white.
- Auto glyph uses `Border/*` tokens as fills; Auto/Auto Plus glyphs contain boolean operands with leftover raw fills (#000000, #c4c4c4).
- `Cab Corporate` uses the *Cab Sedan* icon (there is no Corporate icon); `Share` and `Pet` variants are labelled "Auto Share"/"Auto Pet".
- Cab Premium icon is set to *fill* height (others hug); renders the same 20×20.
- Parcel glyph frame is named `_ëÎÓÈ_1` (encoding garbage).
- Radii 100 / 24 and padding 2/6/2/2 are raw (no radius/spacing tokens bound).
- Premium stroke angle is converted from the Figma transform; CSS stop placement along the line is not identical to Figma's.
