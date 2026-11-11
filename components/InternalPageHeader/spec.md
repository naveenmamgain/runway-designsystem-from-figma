# InternalPageHeader

**Figma:** page *Header components* → component `Internal Page Header`
([1372:7618](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1372-7618)), single component (no variants), 360 × 188.
No description is set in Figma.

## Purpose / when to use
Inferred from the design (no Figma description): the header for inner pages — back arrow + page title, optional trailing
actions (a language icon button and a small "help" button), and optional **PrimaryTabs** and **SecondaryTabs** rows beneath.
For the home screen use **HomepageHeader**.

## Anatomy
```
Internal Page Header (vertical, padding 0, gap 8, fill width × hug; Elevation/S)
├── Android status bar (AndroidStatusBar instance, 360 × 32 override, hidden ← "Android status bar")
├── Internal page Header (horizontal, padding 12/16/12/16, gap 16, left / centre, fixed 360 × 64)
│   ├── Leadign Icon + Label (horizontal, gap 8, fill width × hug)
│   │   ├── Left Arrow (24 × 24, icon)                     ← Show Back Button
│   │   └── Page name (text, fill width)
│   └── Trailing Buttons (horizontal, gap 8, hug × hug)
│       ├── Icon Only Button (plain FRAME, not an instance; 32 × 32, Translate_Hindi 20 × 20)  ← Icon Button
│       └── Buttons (Button instance: Size=Small, Type=Secondary-Default, State=Active, Icon=Leading, "Label") ← Show Help Buttons
├── Primary Tabs (frame wrapper, bottom border 1)           ← Show Primary Tabs
│   └── Primary Tabs instance (No.of Tabs=2 Tabs)
└── Secondary Tabs (frame wrapper, padding-bottom 4)        ← Show Secondary Tabs
    └── Secondary Tabs instance (Selected Tab=Tab 1, all Show Tab 3…7 = true)
```

## Properties
| Property | Type | Default | Controls |
|---|---|---|---|
| Show Back Button | boolean | **true** | Left Arrow visibility |
| Show Help Buttons | boolean | **true** | the small Secondary Button ("Label") |
| Icon Button | boolean | **true** | the Icon Only Button frame |
| Show Icon Button | boolean | **true** | **nothing — not referenced by any layer** (orphan) |
| Show Primary Tabs | boolean | **true** | Primary Tabs wrapper |
| Show Secondary Tabs | boolean | **true** | Secondary Tabs wrapper |
| Android status bar | boolean | **false** | Android status bar instance |

Nested exposed properties are not set up; "Page name" has **no text property** (plain text layer). The Button instance keeps its
own props (`Button Text` "Label", `Leading Icon` = `Test/Help`).

## Values
| Part | Property | Value | Token / binding |
|---|---|---|---|
| Root | size | 360 × 188 (fill × hug) | raw |
| | gap | **8** between rows (64 + 8 + 44 + 8 + 64 = 188) | raw |
| | fill | #ffffff | `Colors - Semantic Tokens/Surface/Neutral/White` |
| | effect | `Elevation/S` | local effect style → `--elevation-s` |
| Title row | size | 360 × 64, fixed height | raw |
| | padding / gap | 12 / 16 / 12 / 16, gap 16 | raw |
| | fill | #ffffff | `Surface/Neutral/White` |
| Leading group | gap | 8 | raw |
| Left Arrow | size / colour | 24 × 24, vector #000000 | raw, unbound |
| Page name | text style | `Title/X-Small/SemiBold` (Inter SemiBold 18/24; weight bound to `Title/2X-Small (16)/SemiBold/Weight`, see textStyles) | |
| | fill | **#000000 unbound** | raw |
| | layout | fill width, left-aligned, auto height, no truncation | — |
| Trailing Buttons | gap | 8 | raw |
| Icon Only Button (frame) | size | 32 × 32 | `Button/Button Height` (Small mode → 32) |
| | padding | 8 / 12 / 8 / 12 | `Button/V-Padding`, `Button/H-Padding` (Small) |
| | gap | 4 | `Button/Space-Number` (Small) |
| | radius | 999 | `Button/Radius` |
| | fill | #ffffff | `Surface/Neutral/White` |
| | stroke | 1 inside, #000000 | `Colors - Semantic Tokens/Border/Neutral/Black` |
| | icon | Translate_Hindi 20 × 20, vector #000000 | `Colors - Maps/Mapped-Neutral/Black` |
| Help button | | Button Small / Secondary-Default / Active / Icon=Leading, 86 × 32 (see [Button](../Button/spec.md)) | |
| | stroke | **overridden** to `Border/Neutral/Black` (#000000) | (component default is `Border/Neutral/Dark`) |
| Primary Tabs wrapper | stroke | bottom only, 1 inside, #e0e3e6 | `Colors - Semantic Tokens/Border/Neutral/Light` |
| Secondary Tabs wrapper | padding | 0 / 0 / 4 / 0 | raw |

## States
None on the component itself (no variants). Child states come from Button, PrimaryTabs and SecondaryTabs.

## Inconsistencies / gaps found
- **Orphan boolean** `Show Icon Button` (1765:0) controls nothing; the icon button is actually toggled by `Icon Button` (1994:0).
- The language icon button is a **detached frame named "Icon Only Button"**, not an instance of the `Icon Only Button` component
  (1760:6878). Its stroke is `Border/Neutral/Black`, whereas the component's Secondary/Active uses `Border/Neutral/Dark`.
- The help Button instance overrides its stroke to `Border/Neutral/Black` (component: `Border/Neutral/Dark`).
- Page title fill is unbound #000000 (other headers' text uses `Text/OnSurface/Default` etc.); no text property for the title.
- Layer name typo: "Leadign Icon + Label".
- Embedded Android status bar is overridden to 360 × 32 (main component 360 × 28).
- Tabs rows add their own wrappers (bottom border on Primary Tabs, 4 px bottom padding on Secondary Tabs) that are not part of
  the tab components themselves.
