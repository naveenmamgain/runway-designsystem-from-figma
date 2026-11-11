# TextField (Figma: Input Field)

**Figma:** page *Input Fields* → component set `Input Field`
([2025:5480](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2025-5480)), 4 variants.
Built from the sub-component `.Input Message` ([2025:5308](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2025-5308)),
which is used for both the error message and the caption.
No description is set in Figma.

The page also holds `.Input` (2023:4600, 45 variants: Type Default/Secondary/Combo Box × Size Small/Medium/Large × State
Default/Focused/Typing/Error/Disabled) and `.Input Caption` (2023:4536, 18 variants). These are **private** (dot-prefixed),
are **not** used by `Input Field`, and are bound almost entirely to variables from other libraries (`Radius`, `Sizing`,
`Colors Semantic`, `Typography/Hopr Font Family` = Poppins). They look like a component imported from the Hopr design system and are
documented separately in `components/Input/` (stage 3), not here.

## Purpose / when to use
Single-line text entry with an optional title, leading/trailing icon, error message, helper caption and an inline
supporting action (e.g. *Know more*).

## Anatomy
```
Input Field (vertical, gap 12)
├── Input Box (vertical, gap 8)
│   ├── Title (horizontal, gap 8, padding-left 2)       — boolean "Title"
│   │   ├── Title Text
│   │   └── Supporting Button (Button Small / Tertiary-Info / Icon None, label "Know more") — boolean "Supporting Button"
│   ├── Input (horizontal, gap 4, padding 16/12/16/12, radius 12, stroke)
│   │   ├── Leading Icon (24×24)                         — boolean "Leading Icon"
│   │   ├── Input Text (fills)
│   │   └── Trailing Icon (24×24)                        — boolean "Trailing Icon"
│   └── .Input Message (horizontal, gap 4, padding 0/2/0/2) — boolean "Error Message"
│       ├── Leading Icon (20×20, warning_amber Round)
│       └── Message Text
└── Caption = .Input Message (horizontal, gap 4, padding 0/2/0/2) — boolean "Caption"
    ├── Leading Icon (20×20, Info_Circle_Stroke)
    └── Caption Text
```

## Properties
| Property | Type | Default |
|---|---|---|
| Type | variant | **Default**, Disabled, Error, Focused |
| Title | boolean | true |
| Leading Icon | boolean | true |
| Trailing Icon | boolean | false |
| Error Message | boolean | true |
| Caption | boolean | true |
| Supporting Button | boolean | false |

There is **no Size axis** on `Input Field` (one size: 328 wide, input row 56 tall). No Loading/Pressed/Success states exist.
"Typing" exists only on the private `.Input`.

## Layout (all states)
| Part | Value | Token |
|---|---|---|
| Root | vertical, gap **12**, width fill (328 in Figma) | raw |
| Input Box | vertical, gap **8** | raw |
| Title | horizontal, gap 8, padding-left **2**, height 24 | raw |
| Input row | horizontal, gap **4**, padding **16 / 12 / 16 / 12** (t/r/b/l), height 56 | raw |
| Input radius | **12** | raw (unbound) |
| Input stroke weight | **1** (Default), **1.5** (Focused, Error), none (Disabled); align INSIDE | raw |
| Leading / Trailing icon | 24 × 24 | raw |
| Message / Caption row | horizontal, gap 4, padding 0 / 2 / 0 / 2, height 20 | raw |
| Message / Caption icon | 20 × 20 | raw |

## Typography
| Part | Text style | Notes |
|---|---|---|
| Title Text | `Title/2X-Small/Bold` (Inter Bold 16/24) | local style, bound to `Typography - Semantic Tokens/Title/2X-Small (16)/Bold/*` |
| Input Text | `Body/Moderate/Reg` **from a remote library** | bound to remote `Typography - Semantic Tokens/Body/Moderate (16)/Reg/*` (16/24) and remote font family `Font Family/Captain App Font` = **Noto Sans** |
| Message / Caption text | `Body/Small/Med` **from a remote library** | remote `Body/Small (14)/Med/*` (14/20), font **Noto Sans** |

Because the remote font-family variable resolves to Noto Sans, the input, message and caption text render in **Noto Sans**,
while the title renders in Inter. The implementation uses the local Runway tokens (Inter, same sizes) and flags this in EXPORT_NOTES.md.

## Colours per state
All names are `Colors - Semantic Tokens` unless noted.

| Part | Default | Focused | Error | Disabled |
|---|---|---|---|---|
| Input fill | `Surface/Neutral/White` (#ffffff) | `Surface/Neutral/White` | `Surface/Neutral/White` | `Surface/Neutral/Light` (#eceef2) |
| Input stroke | `Border/Neutral/Light` (#e0e3e6), 1 | `Border/Information/Dark` (#146edc), 1.5 | `Border/Error/Dark` (#c42925), 1.5 | none |
| Input effect | — | effect style `Elevation/S` (0 0 4 0 #101010 @ 0.16) | `Elevation/S` | — |
| Title text | `Text/Neutral/Dark` (#1a202a) | same | same | same |
| Input text | `Text/Neutral/Medium` (#5c6675) — placeholder "Enter your text" | `Text/Neutral/Black` (#000000) ³ | `Text/Neutral/Black` ³ | `Text/OnSurface/Disabled` (#aeb6c3) |
| Leading icon | `Surface/Neutral/Dark` (#5c6675) | `Surface/Neutral/Black` (#000000) | `Surface/Neutral/Black` | `Surface/Neutral/Medium` (#aeb6c3) |
| Message text + icon | `Text/Error/Dark` / `Surface/Error/Dark` (#c42925) | same | same | same |
| Caption text + icon | `Text/Neutral/Medium` / `Surface/Neutral/Dark` (#5c6675) | same | same | same |

³ `Text/Neutral/Black` is marked **Discontinued** (hidden from publishing) in Figma but is still used here.

## Icons used
Leading/Trailing: `add_circle_outline / Style=Round` (Material, Icons page). Message: `warning_amber / Style=Round`. Caption: `Info_Circle_Stroke` (custom).

## Inconsistencies found
- Input/message/caption text use **remote** text styles and a remote font variable (Noto Sans), not Runway's own (Inter).
- Input radius 12, stroke 1/1.5 and all spacing are raw values; Runway has no radius or spacing tokens for inputs (the `Numbers Base` scale has 12/16/4/8 but isn't bound).
- Focused/Error input text uses the discontinued `Text/Neutral/Black`.
- The Disabled variant still shows the error message and caption in their active colours.
