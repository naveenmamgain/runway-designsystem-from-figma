# Input Caption (`.Input Caption`, private)

**Figma:** page *Input Fields* → private component set `.Input Caption`
([2023:4536](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2023-4536)), 18 variants.
No description is set. Used inside `.Input` (2023:4600) as the helper line under the field — see [Input](../Input/spec.md).
This is **not** the caption used by the public Input Field / TextField (that one is `.Input Message`).

> **Remote library.** Every colour, the font family and the password-bar radius/gap are bound to variables from another
> library (collections `Colors Semantic`, `Typography`, `Radius`, `Sizing`), and all text styles are remote. None of them
> exist in Runway's `tokens.css`. Values below give the remote variable, its modes and the resolved value.

## Purpose / when to use
Helper / validation line below an input: neutral caption, success, info, requirement (e.g. password rule), error, and a
password-strength meter. Inferred from the variants (no description in Figma).

## Anatomy
```
.Input Caption (horizontal auto-layout, gap 4, align left / centre, hug width × fixed height 24)
├── Icon  (instance, boolean "Icon"; not present in Type=Caption / Password)
└── Text  (text, hug)

Type=Password (horizontal, gap 8, fixed 163 × 24):
├── Strength bar (horizontal, gap Sizing/spacing/3, fill width)
│   └── 4 × Rectangle (fill width, height 6, radius Radius/radi-1)
└── Text "Good!"
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| Type | variant | Password, **Caption**, Success, Info, Requirement, Error |
| Size | variant | Medium, **Small**, Large |
| Icon | boolean | **true** (no effect for Caption and Password — they have no icon layer) |

There is no text property; the sample texts are "Caption", "Succes" (sic), "Info", "At least 8 character", "Error", "Good!".

## Sizes
| | Small | Medium | Large |
|---|---|---|---|
| Height (root) | 24 (raw, fixed) | 24 | 24 |
| Gap icon → text | 4 (raw) | 4 | 4 |
| Icon box | 20 × 20 (raw) | 24 × 24 (raw) | 24 × 24 (raw) |
| Text style (remote) | `Body/Small/Med` — Poppins Medium 14 / 22 | `Body/Moderate/Med` — 16 / 24 | `Body/Large/Med` — 18 / 28 |
| Password root | 163 × 24 fixed, gap 8 (raw) | same | same |
| Password bar height | 6 (raw) | 6 | 6 |

Font family on every text: `R: Typography/Hopr Font Family` (single mode "Mode 1" = **Poppins**).
Implementation uses Runway's typeface `--cap-app-typeface` (Inter); for the same-named local styles `Body/Small/Med` and
`Body/Moderate/Med` it uses the local styles (Inter 14/20 and 16/24 — note the local Small line height is 20, remote 22).
`Body/Large/Med` has no local equivalent: raw 18 / 28 / weight 500.

## Colours per Type
| Type | Icon (default instance) | Icon colour | Text colour |
|---|---|---|---|
| Caption | — | — | `R: Colors Semantic/Semantics/Surface/On Surface 2` |
| Success | `check_circle / Style=Round` | `R: …/Success/Success` | `R: …/Success/Success` |
| Info | `Icons/information-fill` | `R: …/Surface/On Surface 3` | `R: …/Surface/On Surface 2` |
| Requirement | `lock / Style=Filled` | `R: …/Surface/On Surface 3` | `R: …/Surface/On Surface 2` |
| Error | `warning / Style=Round` | `R: …/Error/Error` | `R: …/Error/Error` |
| Password | — | bars 1–3 `R: …/Success/Success`, bar 4 `R: …/Surface/Surface Dim` | `R: …/Success/Success` |

All icon instances are remote components. `Colors Semantic` has one mode (**Light**):

| Remote variable | Light (resolved) | Aliases | Matching Runway token |
|---|---|---|---|
| `Semantics/Surface/On Surface 2` | #52525b | `Colors Base/Base/gray/600` | none |
| `Semantics/Surface/On Surface 3` | #7a7a83 | `Colors Base/Base/gray/500` | none |
| `Semantics/Surface/Surface Dim` | #e1e1e2 | `Colors Base/Base/gray/200` | none |
| `Semantics/Success/Success` | #149041 | `Colors Base/Base/green/600` | none |
| `Semantics/Error/Error` | #dc2828 | `Colors Base/Base/red/600` | none |

## Password strength bar
| | Remote variable | Modes | Resolved (default mode) |
|---|---|---|---|
| Bar gap | `R: Sizing/spacing/3` | Compact 4 · Spacious 8 | 4 (Compact) |
| Bar radius | `R: Radius/radi-1` | Default 2 · Rounded 4 · Sharp 0 | 2 (Default) |

Bar widths come from fill (Small 25, Medium 23.5, Large 22 — they shrink because the larger text takes more of the fixed 163).

## Inconsistencies / gaps found
- Root height is fixed at 24 for every size, but Large text is 28 high → the Large text overflows the frame by 4.
- Medium and Large both use 24 icons; only Small uses 20. Icon sizes are raw (the `.Input` icons are bound to `Sizing/icon/*`).
- Gap 4 (icon-text) and 8 (password) are raw while the password bar gap is bound to `Sizing/spacing/3`.
- Password root is a fixed 163 wide regardless of size; strength level (3 of 4 filled) is baked in — there is no property for it.
- Sample text "Succes" is misspelled; "At least 8 character" missing plural.
- Info/Requirement icons use On Surface 3 while their text uses On Surface 2.
- The "Icon" boolean is defined on the set but Caption and Password variants have no icon layer.
- Uses a different library (Poppins, remote semantic colours) than the rest of Runway (Inter, Colors - Semantic Tokens).
