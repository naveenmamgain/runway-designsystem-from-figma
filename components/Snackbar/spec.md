# Snackbar

**Figma:** page *Snackbars* → component set `Snackbar`
([1484:741](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1484-741)), 20 variants.
No description or annotations are set in Figma, and the page has no documentation text.

## Purpose / when to use
*Inferred from the design (no Figma guidance):* a short, elevated status message with an icon, optional title, body text,
an optional text action and a close icon. **Type** carries the semantic tone (General / Info / Negative / Warning / Positive);
**Severity High** uses a solid dark fill with inverse text, **Severity Low** a light tint with coloured text. **Lines = Single**
truncates the body to one line; **Lines = Stack** lets the body wrap and puts the action row underneath.

## Anatomy
```
Snackbar (Single: horizontal, items centred | Stack: vertical)
├── Leading Icon + Label (horizontal, gap 8, fill width)
│   ├── Leading Icon (24×24 instance; swap prop "Instance", default Info_Circle_Filled 699:116478) — boolean "Leading Icon"
│   └── TextBox (vertical, gap 4, centred, fill width)
│       ├── Title  (text "Title")                                — boolean "Title"
│       └── Body   (text)
└── Action + Close icon (horizontal, gap 8, justify end)         — boolean "Buttons"
    ├── Action (text, prop "Action Text" = "Action")             — boolean "Show Action"  (Stack only — see gaps)
    └── Close_Stroke (20×20 instance)                            — boolean "Close Icon"
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| Lines | variant | **Single**, Stack |
| Type | variant | **General**, Info, Negative, Warning, Positive |
| Severity | variant | **High**, Low |
| Leading Icon | boolean | **true** |
| Instance | instance swap (leading icon) | **Info_Circle_Filled** (699:116478) |
| Title | boolean | **true** |
| Buttons | boolean | **true** (shows the Action + Close row) |
| Show Action | boolean | **true** |
| Action Text | text | **"Action"** |
| Close Icon | boolean | **true** |

No interaction states (pressed/disabled) exist.

## Layout (raw unless a token is named)
| | Single | Stack |
|---|---|---|
| Size (default content) | 360 × 76 | 360 × 160 |
| Width | 360 fixed; min 220, max 360 (raw) | same |
| Direction | horizontal, cross-axis centre | vertical, main-axis centre, cross-axis start |
| Padding (T/R/B/L) | 12 / 16 / 12 / 16 | 12 / 16 / 12 / 16 |
| Gap | 12 | 12 |
| Corner radius | 8 | 8 |
| Leading Icon + Label | fill; min 112, max **298** | fill; min 112, max **328** |
| Icon ↔ TextBox gap | 8 | 8 |
| Leading icon | 24 × 24 | 24 × 24 |
| TextBox gap (Title ↔ Body) | 4 | 4 |
| Action + Close row | hugs (20 × 24); justify end; gap 8 | fills width (328 × 24), min width 88; justify end; gap 8 |
| Close icon | 20 × 20 → `Button/Icon-Size` → `--button-icon-size` (Large mode = 20) | same |

## Text
| Text | Style | Single | Stack |
|---|---|---|---|
| Title | `Title/2X-Small/Bold` | 1 line, ellipsis | 1 line, ellipsis |
| Body | `Body/Moderate/Med` | 1 line, ellipsis | wraps, no limit |
| Action | `Button/Moderate/Bold` | not present | hugs, no wrap |

All bound to `Typography - Semantic Tokens` + `Typography - Typeface/Cap App - Typeface`. Left-aligned.

## Colours per Type × Severity
Identical for Single and Stack except the General-Low text binding (marked ¹). No strokes.

| Type | Severity | Fill | Title / Body / Action | Leading icon | Close icon |
|---|---|---|---|---|---|
| General | High | `Surface/Neutral/Dark` (#5c6675) | `Text/OnSurface/Inverse` (#f6f7f9) | `Surface/Neutral/White` (#ffffff) | `Surface/Neutral/White` |
| Info | High | `Surface/Information/Dark` (#146edc) | `Text/OnSurface/Inverse` | `Surface/Neutral/White` | `Surface/Neutral/White` |
| Negative | High | `Surface/Error/Dark` (#c42925) | `Text/OnSurface/Inverse` | `Surface/Neutral/White` | `Surface/Neutral/White` |
| Warning | High | `Surface/Warning/Dark` (#ca4900) | `Text/OnSurface/Inverse` | `Surface/Neutral/White` | `Surface/Neutral/White` |
| Positive | High | `Surface/Success/Dark` (#058743) | `Text/OnSurface/Inverse` | `Surface/Neutral/White` | `Surface/Neutral/White` |
| General | Low | `Surface/Neutral/Light` (#eceef2) | Single: **raw #1a202a** ¹ · Stack: `Text/OnSurface/Default` (#1a202a) | `Surface/Neutral/Black` (#000000) | **raw #1c1b1f** ² |
| Info | Low | `Surface/Information/Light` (#eef5fe) | `Text/Information/Dark` (#146edc) | `Surface/Information/Dark` | `Surface/Information/Dark` |
| Negative | Low | `Surface/Error/Light` (#fff2f1) | `Text/Error/Dark` (#c42925) | `Surface/Error/Dark` | `Surface/Error/Dark` |
| Warning | Low | `Surface/Warning/Light` (#fff6ef) | `Text/Warning/Dark` (#ca4900) | `Surface/Warning/Dark` | `Surface/Warning/Dark` |
| Positive | Low | `Surface/Success/Light` (#f4fdf8) | `Text/Success/dark` (#058743) | `Surface/Success/Dark` | `Surface/Success/Dark` |

All names are in `Colors - Semantic Tokens`.
¹ Single/General/Low title and body fills are unbound #1a202a (same hex as `Text/OnSurface/Default`); the implementation uses
`--text-onsurface-default`.
² Close icon in General/Low (both Lines) is an unbound #1c1b1f that matches no token; kept raw.

## Effects
Root: effect style `Elevation/M` (local) = drop shadow 0, 0, blur 8, spread 0, #101010 @ 20% → `--elevation-m`. All variants.

## Inconsistencies / gaps found
- **Single variants have no Action text node** — "Show Action" / "Action Text" do nothing for Lines = Single; the action is only
  available in Stack.
- General/Low close icon is unbound **#1c1b1f** (no matching token; every other variant uses a semantic Surface token).
- Single/General/Low title + body are unbound #1a202a while Stack/General/Low binds `Text/OnSurface/Default`.
- Max width of "Leading Icon + Label" is 298 in Single (content is 296 wide) and 328 in Stack.
- All snackbar geometry (padding 12/16, gap 12, radius 8, min/max width 220/360, inner gaps) is unbound raw.
- Close icon size is bound to the **Button Tokens** collection (`Button/Icon-Size`), so it depends on the Button size mode
  (Large → 20) rather than a snackbar token.
- The leading icon is the same `Info_Circle_Filled` for every Type (no per-type default icon).
- Body text has no text property (only the action label does).
