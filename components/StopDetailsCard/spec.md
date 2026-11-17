# StopDetailsCard (C30) (Figma: B2B Delivery `details`)

**Figma:** B2B Delivery UI `BMJzeTVlQYTDjcmHERwgVy`, Flow page. Instance of the legacy library component `details` (not Runway).

| Frame | Instance | What it shows |
|---|---|---|
| Collect Parcel [1:3148](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3148) | [1:3152](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3152) | "Pickup details", Henric Toby, 2-line address, Call customer + Go to location |
| Complete Delivery (food) [1:3283](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3283) | [1:3286](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3286) | **Swiggy** chip + "Drop details" + buttons |
| Parcel drop [1:3227](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3227) | 1:3230 (+ 1:3231 pickup) | Drop details without buttons; pickup details below (Specifics 1:3347: receiver may ask who sent it) |
| Food pickup [1:3044](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3044) | 1:3049, 1:3050 | Pickup details (4-line address) + Swiggy drop details, no buttons |

`preview.png` = Figma screenshot of 1:3286.

## Purpose / when to use
The stop card on order stage pages (Collect parcel / Complete delivery): who and where the captain is picking up from or
dropping to, with the two actions for that stop. Use one card per stop; the stop the captain is at gets the buttons,
the other stop (for reference) uses `showActions={false}`.

**Always expanded** (user decision): no chevron and no collapsed state. Specifics 1:3340 ("Pickup details will be
collapsed in this screen") and the legacy `pick up details collapsed` instance are superseded.

## Anatomy
```
StopDetailsCard (vertical, gap 16, padding 16, radius 8, fill white, stroke 0.5 Border/Neutral/Light)
├── Info (vertical, gap 8)
│   ├── Partner chip (optional) — PartnerChip: pill, Blue/50 fill, padding 4/12, Button/Small/SemiBold Blue/700
│   └── Section (vertical, gap 12)
│       ├── Title          SubTitle/X-Small/SemiBold, Gray/700, ≤2 lines
│       └── Details (vertical, gap 4)
│           ├── Pin 16×20 + Name   (gap 6) SubTitle/X-Small/Bold, black, ≤2 lines
│           └── Address    Body/Small/Med, Text/Neutral/Medium, indent 22, unclamped
└── Actions (vertical, gap 8, indent 22) — optional
    ├── Button Medium Primary-Default  "Call customer"   (full width)
    └── Button Medium Secondary-Default "Go to location" + navigation icon (full width)
```

## Properties
| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | ReactNode | — (required) | "Pickup details" / "Drop details" |
| `name` | ReactNode | — (required) | Person or restaurant |
| `address` | ReactNode \| string[] | — (required) | Array = one `<p>` per line, like Figma's two paragraphs |
| `partner` | ReactNode | — | String → `PartnerChip`; node used as-is |
| `showActions` | boolean | `true` | Hide buttons on the reference stop |
| `callLabel` / `navigateLabel` | ReactNode | "Call customer" / "Go to location" | |
| `onCall` / `onNavigate` | () => void | — | |

Also exported: `PartnerChip`, `PinIcon`, `NavigateIcon`.

## Layout values
| Part | Property | Value | Token |
|---|---|---|---|
| Card | padding / gap | 16 / 16 | raw |
| | radius | 8 | raw |
| | fill | #ffffff | `--surface-neutral-white` |
| | stroke | 0.5 #e0e3e6 (inset shadow) | `--border-neutral-light` |
| Chip | padding / radius | 4·12 / 100 (999) | raw |
| | fill | #eef5fe (Blue/50) | `--surface-information-light` |
| | text | Noto Sans SemiBold 14/20, #103460 (Blue/700) | `Button/Small/SemiBold`, `--mapped-blue-blue-700` |
| Title | text | SemiBold 14/20, #394454, `capitalize` | `SubTitle/X-Small/SemiBold`, `--mapped-gray-gray-700` (no semantic token) |
| Name | text | Bold 14/20, #000 | `SubTitle/X-Small/Bold`, `--text-neutral-black` |
| Address | text | Medium 14/20, #5c6675 | `Body/Small/Med`, `--text-neutral-medium` |
| | indent | 22 (pin 16 + gap 6) | raw |
| Pin | size | Figma 16×19 `carbon:location-filled` → Runway `Location_Filled` cropped to 16×20 | raw |
| Buttons | height | Figma 40 (legacy "Buttons/Small") → Runway Medium 44 (`--button-button-height`), grows for 2 lines | Button tokens |
| | gap / indent | 8 / 22 | raw |
| Call | fill / label | #ffca20 / #0c0d0f SemiBold 14 | Primary-Default (`--mapped-yellow-yellow-400`, `--text-onsurface-default`) |
| Go to location | stroke / label | 1 #394454 / #0c0d0f | Secondary-Default (stroke `--border-neutral-dark` = Gray 600) |

## States
| State | Figma | Code |
|---|---|---|
| Current stop with actions | 1:3152, 1:3286 | default |
| Reference stop | 1:3230, 1:3049 | `showActions={false}` |
| With partner | 1:3286 ("Swiggy") | `partner="Swiggy"` |
| Collapsed | `pick up details collapsed` (1:3060, 1:3072) | **not built** (user: don't make it collapsible) |
| Pressed / disabled buttons | — | from Runway `Button` |

## Inconsistencies / gaps found
- **D13 / Tag does not fit the partner chip.** Runway `Tag` is white, radius 4, min-width 92, with a 16px leading icon and `Text/OnSurface/Default`; on this white card it would be invisible. The Figma chip is a Blue/50 pill with Blue/700 text and no icon. Built as a local `PartnerChip`. Suggest adding an *information* (tinted) tone to `Tag`; then swap `PartnerChip` for it.
- **Button sizes**: Figma buttons are 40px high with 14 SemiBold labels (legacy library). Runway has Small 32 or Medium 44 (Bold 16 label); Medium used. Label weight and size therefore differ from Figma.
- **Outline stroke**: Figma #394454 (Gray/700); Runway Secondary-Default uses `Border/Neutral/Dark` (Gray/600).
- **Title casing**: Figma text is "Pickup details" with CSS `capitalize`, rendered "Pickup Details". Code renders what it is given; pass the cased string.
- **Typos in Figma samples**: "banguluri", "flot no. 2".
- **Collapse**: Specifics 1:3340 asks for a collapsed pickup card; 1:3044 shows it expanded; user decided always expanded.
- **Font**: Figma uses Noto Sans; Runway text styles use Inter (`--cap-app-typeface`).
- **Icons**: pin and navigation vectors are not Runway icons; replaced with `Location_Filled` and `Navigation_Filled`.
