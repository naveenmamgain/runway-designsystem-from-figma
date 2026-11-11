# GuidanceBottomSheet

**Figma:** page *Bottom Sheets* ([795:4297](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=795-4297)) → component set
`Guidance Bottom Sheet` ([2706:11381](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2706-11381)), 3 variants.
No description is set in Figma.

## Purpose / when to use
*(Inferred from the design.)* A paged, image-led walkthrough in a bottom sheet (e.g. onboarding or "Company Order Rules", the text of
its hidden header). Each step shows an image, a title and a body; the footer shows page dots and a **Next** button, which becomes
**Confirm** on the last step. Variants Sheet1–Sheet3 are the three steps.

## Anatomy
```
Guidance Bottom Sheet (scrim 360×720, horizontal, align centre/end)
└── Bottomsheet (vertical, gap 0, fills width, radius 16/16/0/0, fill Surface/Neutral/White)
    ├── Head (HIDDEN; padding 16/24/16/24, radius 10/10/0/0) → "Company Order Rules"
    ├── Image (SLOT, 360×335, image fill FILL)
    ├── Textbox (SLOT, vertical, padding 16/24/16/24, gap 8, max-height 192)
    │   ├── Title (horizontal) → "Title 1|2|3"
    │   └── Body (vertical, gap 2) → "Body 1|2|3"
    └── Guidance Nav (horizontal, SPACE_BETWEEN, padding 12/24/12/24, fill Surface/Neutral/White, Elevation/S)
        ├── Pagination (horizontal, gap 16) → P1, P2, P3 (16×16 ellipses)
        └── Buttons (Medium, Primary-Default) → "Next" + trailing icon | "Confirm"
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| Property 1 | variant | **Sheet1**, Sheet2, Sheet3 |
| Textbox | slot | — |
| Image | slot | — |

React API: `steps[]` ({image, title, body, textbox}), `current` (0-based), `heading` (shows the hidden Head), `nextIcon`,
`nextLabel` ("Next"), `confirmLabel` ("Confirm"), `onNext`, `onConfirm`.

## Values
Spacing, sizes and radii are raw (no variable bound). Colours are `Colors - Semantic Tokens`.

| Part | Property | Value |
|---|---|---|
| Scrim | size / fill | 360×720 / `Overlays/Large (75% Black)` → `--overlays-large-75pct-black` |
| Bottomsheet | radius | 16/16/0/0 (raw) |
| | fill | `Surface/Neutral/White` (#ffffff) |
| Head (hidden) | padding / radius | 16/24/16/24 / 10/10/0/0 (raw) |
| | text | `Title/Moderate/SemiBold`, `Text/OnSurface/Default` |
| Image | size | 360×335 fixed, image fill scale mode FILL |
| Textbox | padding / gap / max-height | 16/24/16/24 / 8 / 192 |
| Title | text style / colour | `Title/Small/Bold` / **raw #253041** (= Base-Gray/Gray 800, unbound) |
| Body | text style / colour | `Body/Moderate/Reg` / **raw #253041**; Body frame gap 2 |
| Guidance Nav | padding / gap | 12/24/12/24 / 162 (SPACE_BETWEEN, so gap is not used) |
| | fill / effect | `Surface/Neutral/White` / `Elevation/S` |
| Pagination | gap | 16 |
| Dot | size | 16×16 (P3 in Sheet3 is 17×16) |
| | stroke | 1 INSIDE `Border/Neutral/Dark` (#5c6675) |
| | fill (current page only) | `Surface/Neutral/Dark` (#5c6675) |
| Button | instance | `Buttons` Size=Medium, Type=Primary-Default, State=Active, 112×44 |
| | Sheet1, Sheet2 | Icon=Trailing, label "Next", padding L bound to `Button/H-Pad Extra` |
| | Sheet3 | Icon=None, label "Confirm" |
| | fill override | `Surface/Brand/Primary-A` (#ffca20) instead of the component's `Mapped-Yellow/Yellow 400` (same hex) |
| | min-width | **not bound / removed** (component binds `Button/Button Min-Width` = 140; instance is 112 wide) |

## States
Steps only (Sheet1/2/3). No pressed/disabled states beyond the Button's own.

## Inconsistencies / gaps found
- The 10/10/0/0 radius is only on the **hidden "Head"** frame; the visible sheet is 16/16/0/0 like `BottomSheet` (so the sheet radii do match).
- Title/Body colour is **raw #253041** (unbound, Gray 800) while `BottomSheet` uses `Text/OnSurface/Default` (#1a202a).
- Sheet fill is bound to `Surface/Neutral/White` here but raw #ffffff in `BottomSheet`.
- Button fill overridden to `Surface/Brand/Primary-A` (same value as Yellow 400); implementation keeps the Button component's own
  fill so Pressed/Disabled still work.
- Button min-width binding dropped on the instances (112 wide < 140 token min); implementation sets `minWidth: 0`.
- Sheet3 pagination dot P3 is 17×16 (others 16×16).
- Guidance Nav itemSpacing 162 is a leftover (SPACE_BETWEEN ignores it).
- Head frame with "Company Order Rules" is hidden in every variant and not exposed as a property.
- Pagination is hard-coded to 3 dots; no property for step count.
