# Tag

**Figma:** page *Detail Tags / Labels* → component `Tag` ([1186:4530](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1186-4530)), single component (no variants).
No description is set on the component in Figma.

## Purpose / when to use
No usage notes in Figma; inferred from the design only. A small, non-interactive label (icon + short text) used to call out
a detail. It has a white fill and no border, so it is meant to sit on a tinted or dark surface.

## Anatomy
```
Tag (auto-layout, horizontal, align MIN/CENTER; hugs content, min-width 92)
├── Leading Icon (instance 16×16; swap prop "Instance", default Check_Circle_Stroke; toggled by "Show Leading Icon")
└── Tag Text (frame, hug, content centred, gap 10)
    └── Tag text (text, prop "Tag Text")
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| Tag Text | text | **"Tag text"** |
| Show Leading Icon | boolean | **true** |
| Instance (leading icon) | instance swap | **`Check_Circle_Stroke`** (914:14003); preferred value: one component (key `76f811…a76b`) |

No variants, sizes or states.

## Values
| Part | Property | Value | Token |
|---|---|---|---|
| Tag | padding T/R/B/L | 4 / 12 / 4 / 8 | raw |
| | gap | 4 | raw |
| | min width | 92 | raw |
| | size (default content) | 96 × 24, hugs both axes | — |
| | corner radius | 4 | raw |
| | fill | #ffffff | `Surface/Neutral/White` → `--surface-neutral-white` |
| | stroke / effects | none | — |
| Leading Icon | size | 16 × 16 | raw |
| | colour | #000000 | `Surface/Neutral/Black` → `--surface-neutral-black` |
| Tag text | text style | `Button/Small/SemiBold` (Inter 14 SemiBold, bound to `Typography - Semantic Tokens/Botton/Small (14)/SemiBold/…`) | `textStyles["Button/Small/SemiBold"]` |
| | colour | #1a202a | `Text/OnSurface/Default` → `--text-onsurface-default` |
| | alignment | left, auto width & height, no truncation | — |

## Inconsistencies / gaps found
- All spacing, radius (4), min-width (92) and icon size are raw — none bound to tokens.
- Uses a **Button** text style (`Button/Small/SemiBold`) for a non-interactive label.
- The text is wrapped in an extra "Tag Text" frame with gap 10 that has only one child (gap has no effect).
- No colour variants (e.g. success / error) exist, only the white tag.
