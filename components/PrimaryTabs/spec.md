# PrimaryTabs

**Figma:** page *Header components* → component set `Primary Tabs`
([1326:6014](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1326-6014)), 2 variants.
Built from private sets:
- `.Pri Tab Box` ([1323:5311](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1323-5311)) — one tab, 2 variants (State = Default | Selected)
- `.2 Tabs` ([1323:5924](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1323-5924)) — Selected Tab = Tab 1 | Tab 2
- `.3 Tabs` ([1326:5940](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1326-5940)) — Selected Tab = Tab 1 | Tab 2 | Tab 3

No descriptions are set in Figma.

## Purpose / when to use
Inferred from the design (no Figma description): top-level, equal-width text tabs that switch between 2 or 3 views of a page,
with a 4 px underline under the selected tab. Used inside **InternalPageHeader** (`Show Primary Tabs`). For more than 3
options, or scrollable pill-style filters, use **SecondaryTabs**.

## Anatomy
```
Primary Tabs / No.of Tabs=… (vertical, padding 0, gap 0, hug × hug)
└── .2 Tabs | .3 Tabs (exposed nested instance; vertical, padding 0/16/0/16, gap 0, fill width × hug; 360 × 44)
    ├── Primary Tabs (horizontal row, gap 4, fill width × hug; 328 × 40)
    │   └── .Pri Tab Box × 2|3 (horizontal, padding 10/10/10/10, gap 4, centre/centre, fill × fill; 162×40 or 106×40)
    │       └── Tab label (text, fill width, centred, max 2 lines + ellipsis)
    └── Highlighter Row (horizontal, gap 4, fill width × hug; 328 × 4)
        ├── Highlighter (fill × fill, 4 high, radius 222/22/0/0, fill #1e4b82) — under the selected tab
        └── Dummy / Dummy 2 (same geometry, fill hidden) — under the other tabs
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| No.of Tabs | variant | **2 Tabs**, 3 Tabs |
| Selected Tab (exposed from nested `.2 Tabs` / `.3 Tabs`) | variant | **Tab 1**, Tab 2 (2 Tabs); **Tab 1**, Tab 2, Tab 3 (3 Tabs) |

There are **no text properties** for tab labels ("Tab 1", "Tab 2", "Tab 3" are plain overrides on nested text) and no
boolean or instance-swap properties.

## Values
| Part | Property | Value | Token / binding |
|---|---|---|---|
| Wrapper (`.2 Tabs` / `.3 Tabs`) | size | 360 × 44 | raw |
| | padding | 0 / 16 / 0 / 16 | raw |
| | fill / stroke / effects | none | — |
| Tab row | gap | 4 | raw |
| `.Pri Tab Box` | size | 162 × 40 (2 tabs) / 106 × 40 (3 tabs), fill × fill | raw |
| | padding / gap | 10 / 10 / 10 / 10, gap 4 | raw |
| | fill / stroke / radius | none | — |
| Label, State = Default | text style | `Button/Moderate/Med` (Inter Medium 16/20) | `Typography - Semantic Tokens/Botton/Moderate (16)/Med/*` |
| | fill | #5c6675 | `Colors - Semantic Tokens/Text/Neutral/Medium` |
| Label, State = Selected | text style | `Button/Moderate/Bold` (Inter Bold 16/20) | `Typography - Semantic Tokens/Botton/Moderate (16)/Bold/*` |
| | fill | #1e4b82 | `Colors - Semantic Tokens/Text/Brand/Primary-B` |
| Label (both) | alignment / truncation | centre; truncate with ellipsis after **2 lines** | — |
| Highlighter row | height / gap | 4 / 4 | raw |
| Highlighter | fill | #1e4b82 | **raw — unbound** (same hex as `Surface/Brand/Primary-B`) |
| | radius | **222 / 22 / 0 / 0** (TL / TR / BR / BL) | raw |
| | clips content | yes | — |
| Dummy segments | fill | #1e4b82 present but **hidden** | raw |

Colours are identical across the 2-tab and 3-tab sets and every Selected Tab variant (verified on all 5 variants).

## States
Per tab: **Default** (unselected) and **Selected**. No pressed, disabled or focus state.

## Implementation notes
- The highlighter radius is rendered as Figma renders it: Figma clamps each corner to half the shortest side (4 / 2 = 2),
  so 222/22/0/0 and 22/22/0/0 both render as 2/2/0/0. CSS would instead scale all corners by a common factor
  (222+0 > 4 ⇒ factor 4/222), giving ≈ 4 / 0.4 / 0 / 0 — visibly asymmetric. The code therefore uses `2px 2px 0 0`
  (Figma's effective result, commented) rather than the literal 222/22.
- Unbound highlighter #1e4b82 is implemented with `--surface-brand-primary-b` (same hex).

## Inconsistencies / gaps found
- **Highlighter radius 222 / 22 / 0 / 0** on every Highlighter and Dummy in both `.2 Tabs` and `.3 Tabs` — confirmed in Figma.
  Almost certainly a typo for 22/22/0/0; it renders identically in Figma (clamped to 2) but not in CSS.
- Highlighter fill #1e4b82 is **unbound**, while the selected label uses `Text/Brand/Primary-B`.
- No text properties for tab labels; consumers must override nested text.
- Unselected tabs are implemented with invisible "Dummy" frames (hidden fill) to keep the underline row aligned.
- Root `Primary Tabs` set only wraps the nested set; Selected Tab is reachable only as an exposed nested property.
