# Toast

**Figma:** page *Toast / Modals* → component `Toast` ([1492:542](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1492-542)), single component.
Uses the private `.Graphic Box` (2027:9912, documented in [Modal/spec.md](../Modal/spec.md)). No description is set in Figma.

## Purpose / when to use
No usage notes in Figma; inferred from the design only. A blocking, **button-less** message card centred on a dimmed
screen: a graphic (image/GIF), a title and a short body. Despite the name it is not a transient bottom toast; it looks like a
Modal without actions (e.g. a success / "please wait" moment). Use **Modal** when the user must act.

## Anatomy
```
Toast (360×720 scrim; auto-layout vertical, centred; clips content)
└── Content (SLOT "Content"; vertical, centred; fills width, hugs height)
    ├── .Graphic Box (instance, Type=Image / GIF; fills width, contents centred)
    └── Text Box (vertical, centred, gap 4; fills width)
        ├── Title  (frame) → "Toast Title Text"
        └── Body   (frame) → "This is a body text, use with limited characters."
```

## Properties
| Property | Type | Default |
|---|---|---|
| Content | slot | default content above (Graphic Box + Text Box) |

Title and body are **not** text properties — they are plain text layers inside the slot. No variants, sizes or states.

## Values
| Part | Property | Value | Token |
|---|---|---|---|
| Toast (scrim) | size | 360 × 720 fixed | raw |
| | padding | 24 all sides | raw |
| | gap | 16 | raw |
| | alignment | centre / centre | — |
| | fill | #000000 @ 0.75 | `Overlays/Large (75% Black)` → `--overlays-large-75pct-black` |
| | corner radius | 16, clip content | raw |
| Content (card) | width | fill (312) | — |
| | height | hug (204 with default content) | — |
| | padding | 16 all sides | raw |
| | gap | 16 | raw |
| | corner radius | 16 | raw |
| | fill | #ffffff | `Surface/Neutral/White` → `--surface-neutral-white` |
| | stroke / effects | none | — |
| .Graphic Box | size | 280 × 72 (fills width; graphic 72 × 72, centred) | raw |
| | content | Type=Image / GIF: image fill, scale mode FILL | — |
| Text Box | gap | 4 | raw |
| Title | text style | `Title/Moderate/Bold` (Inter 24 Bold) | `textStyles["Title/Moderate/Bold"]` |
| | colour | #1a202a | `Text/OnSurface/Default` → `--text-onsurface-default` |
| | alignment | centre, fixed width / auto height, no truncation | — |
| Body | text style | `Body/Moderate/Med` (Inter 16 Medium) | `textStyles["Body/Moderate/Med"]` |
| | colour | #1a202a | `Text/OnSurface/Default` → `--text-onsurface-default` |
| | alignment | centre, fixed width / auto height, no truncation | — |

All text styles are local and bound to `Typography - Semantic Tokens/…`. The Title and Body frames are horizontal auto-layout
wrappers with gap 10 and one child each (gap has no effect).

## Inconsistencies / gaps found
- **Naming:** "Toast" is a centred dialog on a scrim, not a toast/snackbar; it is effectively a Modal without buttons.
- **Body colour differs from Modal:** Toast body uses `Text/OnSurface/Default`, Modal body uses `Text/Neutral/Dark` (both #1a202a).
- **Card spacing differs from Modal:** Toast card padding 16 / gap 16 (graphic ↔ text gap 16); Modal card padding 24 / gap 24 and graphic ↔ text gap 0.
- Toast card width is fill (312 in 360) vs Modal's fixed 328.
- Scrim frame has radius 16 + clip (a device-mockup artefact); the TSX renders a full-viewport scrim without radius.
- Graphic Box defaults to Type=Image / GIF here (Modal uses Type=Icon); the placeholder image fill is not exportable as a token.
- No title/body text properties, no dismiss/auto-hide behaviour, no duration and no animation are specified.
- All spacing and radii are raw.
