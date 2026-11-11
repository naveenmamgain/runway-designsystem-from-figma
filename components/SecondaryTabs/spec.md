# SecondaryTabs

**Figma:** page *Header components* → component set `Secondary Tabs`
([1332:6192](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1332-6192)), 7 variants (Selected Tab = Tab 1 … Tab 7).
Built from the private set `.Sec Tab Box` ([1326:6066](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1326-6066)),
2 variants (Tab Selected = True | False). No descriptions are set in Figma.

## Purpose / when to use
Inferred from the design (no Figma description): a horizontally scrolling row of pill tabs (2–7) for filtering or sub-navigation
below the page title / primary tabs. Used inside **InternalPageHeader** (`Show Secondary Tabs`). Use **PrimaryTabs** for
2–3 equal-width top-level views.

## Anatomy
```
Secondary Tabs / Selected Tab=… (horizontal, padding 12/16/12/16, gap 0, left / centre, fill width (360) × hug (60),
                                 overflow: horizontal scrolling, clip content off)
└── All Tabs (horizontal, gap 8, hug × hug; 1068 × 36 with 7 tabs)
    ├── .Sec Tab Box  "Secondary Tab 1"   (always visible)
    ├── .Sec Tab Box  "Secondary Tab 2"   (always visible)
    ├── .Sec Tab Box  "Secondary Tab 3"   ← Show Tab 3
    ├── …             "Secondary Tab 4…7" ← Show Tab 4 … Show Tab 7
.Sec Tab Box (horizontal, padding 8/16/8/16, gap 8, centre/centre, hug × fill (36 high), pill)
└── Secondary Tab (text, hug, left-aligned, single line, no truncation)
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| Selected Tab | variant | **Tab 1**, Tab 2, Tab 3, Tab 4, Tab 5, Tab 6, Tab 7 |
| Show Tab 3 | boolean | **true** |
| Show Tab 4 | boolean | **true** |
| Show Tab 5 | boolean | **true** |
| Show Tab 6 | boolean | **true** |
| Show Tab 7 | boolean | **true** |

Tabs 1 and 2 are always shown (minimum 2). There are **no text properties** for the labels ("Secondary Tab 1…7" are overrides).
`.Sec Tab Box` has one variant property **Tab Selected** = **False** (default), True.

## Values
| Part | Property | Value | Token / binding |
|---|---|---|---|
| Root | size | 360 × 60 | raw |
| | padding | 12 / 16 / 12 / 16 | raw |
| | gap | 0 | raw |
| | fill / stroke / effects | none | — |
| | overflow | horizontal scrolling | — |
| All Tabs | gap | 8 | raw |
| `.Sec Tab Box` (both states) | height | 36 (fills parent height) | raw |
| | padding | 8 / 16 / 8 / 16 | raw |
| | gap | 8 | raw (single child) |
| | radius | 999 | `Button Tokens/Button/Radius` (all four corners) |
| | stroke / effects | none | — |
| Tab Selected = False | fill | #eceef2 | `Colors - Semantic Tokens/Surface/Neutral/Light` |
| | layer opacity | **0.8** | raw (applies to whole tab incl. text) |
| | text style | `Button/Small/Med` (Inter Medium 14/16) | `Typography - Semantic Tokens/Botton/Small (14)/Med/*` |
| | text fill | #1a202a | `Colors - Semantic Tokens/Text/OnSurface/Default` |
| Tab Selected = True | fill | #1e4b82 | `Colors - Semantic Tokens/Surface/Brand/Primary-B` |
| | layer opacity | 1 | — |
| | text style | `Button/Small/Bold` (Inter Bold 14/16) | `Typography - Semantic Tokens/Botton/Small (14)/Bold/*` |
| | text fill | #f6f7f9 | `Colors - Semantic Tokens/Text/OnSurface/Inverse` |

Values are identical in all 7 Selected Tab variants (verified: only which instance is `Tab Selected=True` changes;
tab widths differ by 1–3 px only because Bold text is wider than Medium).

## States
Per tab: **Selected** / **Not selected**. No pressed, disabled or focus state.

## Inconsistencies / gaps found
- Unselected tab uses **layer opacity 0.8** (raw) on the whole tab rather than a dedicated colour token, so the text is also
  dimmed to 80%.
- No text properties for tab labels.
- Boolean property ids are out of order relative to their tabs (`Show Tab 7#1332:12`, `Show Tab 3#1332:13`, `Show Tab 6#1332:14`,
  `Show Tab 5#1332:15`, `Show Tab 4#1332:16`) — cosmetic only.
- Root has horizontal scrolling set but **clip content off**, so in Figma the row visibly overflows the 360 frame.
- All spacing (12/16 padding, 8 gaps, 36 height) is raw; only the radius is bound (to a *Button* token).
