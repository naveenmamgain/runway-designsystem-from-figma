# Button

**Figma:** page *Buttons* → component set `Buttons` ([671:83990](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=671-83990)), 288 variants;
`Icon Only Button` ([1760:6878](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=1760-6878)), 18 variants.
No description is set on either component in Figma.

## Purpose / when to use
Triggers an action. Use **Primary-Default** for the single main action on a screen or card (e.g. *Accept* on an order alert),
**Secondary-*** for supporting actions with a semantic tint (Positive = success, Negative = destructive, Info = informational),
and **Tertiary-*** for low-emphasis text actions (e.g. the *Know more* supporting button inside Input Field, which is
`Size=Small, Type=Tertiary-Info`). Use **Icon Only Button** when the action is fully clear from its icon.

## Anatomy
```
Button (auto-layout, horizontal, centred)
├── Leading Icon + Label (auto-layout, horizontal; max-width bound)
│   ├── Leading Icon   (instance swap, visible when Icon = Leading | Both)
│   └── Label          (text, property "Button Text", toggled by "Show Text")
└── Trailing Icon      (instance swap, visible when Icon = Trailing | Both)
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| Size | variant | **Large**, Medium, Small |
| Type | variant | **Primary-Default**, Secondary-Default, Secondary-Positive, Secondary-Negative, Secondary-Info, Tertiary-Default, Tertiary-Info, Tertiary-Negative |
| State | variant | **Active**, Pressed, Disabled |
| Icon | variant | **None**, Leading, Trailing, Both |
| Button Text | text | **"Label"** |
| Show Text | boolean | **true** |
| Leading Icon | instance swap | default `Test/Help` (671:89357) |
| Trailing Icon | instance swap | default `Test/Arrow - Right` (671:89381) |

No Loading, Focused or Error states exist in Figma.

## Sizes
All layout values are bound to the **Button Tokens** collection; the variant's Size selects the collection mode
(Large / Medium / Small). In CSS, put `data-button-size="large|medium|small"` on the element.

| | Token | Large | Medium | Small |
|---|---|---|---|---|
| Height | `Button/Button Height` → `--button-button-height` | 52 | 44 | 32 |
| Min width | `Button/Button Min-Width` → `--button-button-min-width` | 188 | 140 | 80 |
| Max width | `Button/Button Max-Width` → `--button-button-max-width` | 328 | 296 | 264 |
| Padding top/bottom | `Button/V-Padding` → `--button-v-padding` | 16 | 12 | 8 |
| Padding left/right | `Button/H-Padding` → `--button-h-padding` | 16 | 16 | 12 |
| Padding on the side **without** an icon (Icon = Leading → right, Trailing → left) | `Button/H-Pad Extra` → `--button-h-pad-extra` | 24 | 24 | 16 |
| Gap (root and inner label frame) | `Button/Space-Number` → `--button-space-number` | 8 | 8 | 4 |
| Corner radius (all corners) | `Button/Radius` → `--button-radius` (→ Numbers Base Full = 999) | 999 | 999 | 999 |
| Icon size (w & h) | `Button/Icon-Size` → `--button-icon-size` | 20 | 20 | 16 |
| Label frame max width, Icon = None | `Un-common/Label Layout/Max Width/No Icon` | 296 | 264 | 240 |
| Label frame max width, Icon = Leading or Trailing | `…/Any One Icon` | 264 | 236 | 216 |
| Label frame max width, Icon = Both | `…/Both Icon` | 232 | 208 | 192 |
| Text style | | `Button/Moderate/Bold` | `Button/Moderate/Bold` | `Button/Small/Bold` |

Sizing: width hugs content (min/max above), height fixed. Alignment: centre/centre.
Label: left-aligned, vertically centred, fills the label frame; **truncates with an ellipsis after 2 lines** (`maxLines: 2`).
Text style `Button/Moderate/Bold` = Inter Bold 16/20; `Button/Small/Bold` = Inter Bold 14/16 (all bound to `Typography - Semantic Tokens/Botton/…`).

## Colours per Type × State
Identical for all sizes and icon configurations (verified across all 288 variants). Stroke weight is 1, stroke align INSIDE.
"—" means no paint.

| Type | State | Fill | Stroke | Label | Icons |
|---|---|---|---|---|---|
| Primary-Default | Active | `Colors - Maps/Mapped-Yellow/Yellow 400` (#ffca20) | — | `Text/OnSurface/Default` (#1a202a) | raw #000000 ¹ |
| | Pressed | `Mapped-Yellow/Yellow 300` (#f8da77) | — | `Text/OnSurface/Default` | raw #000000 ¹ |
| | Disabled | `Surface/Neutral/Light` (#eceef2) | — | `Text/OnSurface/Disabled` (#aeb6c3) | `Surface/Neutral/Medium` (#aeb6c3) |
| Secondary-Default | Active | — | `Border/Neutral/Dark` (#5c6675) | `Text/OnSurface/Default` | raw #000000 ¹ |
| | Pressed | `Surface/Neutral/Light` | `Border/Neutral/Dark` | `Text/OnSurface/Default` | raw #000000 ¹ |
| | Disabled | — | `Border/Neutral/Medium` (#aeb6c3) | `Text/OnSurface/Disabled` | `Surface/Neutral/Medium` |
| Secondary-Positive | Active | — | `Border/Success/dark` (#058743) | `Text/Success/dark` (#058743) | `Surface/Success/Dark` (#058743) |
| | Pressed | `Surface/Success/Light` (#f4fdf8) | `Border/Success/dark` | `Text/Success/dark` | `Surface/Success/Dark` |
| | Disabled | — | `Border/Neutral/Medium` | `Text/OnSurface/Disabled` | `Surface/Neutral/Medium` |
| Secondary-Negative | Active | — | `Border/Error/Dark` (#c42925) | `Text/Error/Dark` (#c42925) | `Surface/Error/Dark` (#c42925) |
| | Pressed | `Surface/Error/Light` (#fff2f1) | `Border/Error/Dark` | `Text/Error/Dark` | `Surface/Error/Dark` |
| | Disabled | — | `Border/Neutral/Medium` | `Text/OnSurface/Disabled` | `Surface/Neutral/Medium` |
| Secondary-Info | Active | — | `Border/Information/Dark` (#146edc) | `Text/Information/Dark` (#146edc) | `Surface/Information/Dark` (#146edc) |
| | Pressed | `Surface/Information/Light` (#eef5fe) | `Border/Information/Dark` | `Text/Information/Dark` | `Surface/Information/Dark` |
| | Disabled | — | `Border/Neutral/Medium` | `Text/OnSurface/Disabled` | `Surface/Neutral/Medium` |
| Tertiary-Default | Active | — | — | `Text/OnSurface/Default` | raw #000000 ¹ |
| | Pressed | `Surface/Neutral/Light` | — | `Text/OnSurface/Default` | raw #000000 ¹ |
| | Disabled | — | — | `Text/OnSurface/Disabled` | `Surface/Neutral/Medium` |
| Tertiary-Info | Active | — | — | `Text/Information/Dark` | `Surface/Information/Dark` |
| | Pressed | `Surface/Information/Light` | — | `Text/Information/Dark` | `Surface/Information/Dark` |
| | Disabled | — | — | `Text/OnSurface/Disabled` | `Surface/Neutral/Medium` |
| Tertiary-Negative | Active | — | — | `Text/Error/Dark` | `Surface/Error/Dark` |
| | Pressed | `Surface/Error/Light` | — | `Text/Error/Dark` | `Surface/Error/Dark` |
| | Disabled | — | — | `Text/OnSurface/Disabled` | `Surface/Neutral/Medium` |

All colour names above are in `Colors - Semantic Tokens` unless prefixed `Colors - Maps/`.
¹ Icon fill is **unbound** `#000000` in Figma (equal to `Base-Neutral/Black`); the implementation uses `--base-neutral-black`.

## Icon Only Button
Properties: **Size** (Large, Medium, Small), **Type** (Primary, Secondary), **State** (Active, Pressed, Disabled),
**Instance** (instance swap, default `Test/Arrow - Right`). Same Button Tokens bindings as above (height, padding, gap, radius, icon size);
no min/max width.

| Size | Box (w × h) | Icon |
|---|---|---|
| Large | 52 × 52 | 20 |
| Medium | 44 × 44 | 20 |
| Small | 32 × 32 | 16 |

| Type | State | Fill | Stroke (1, inside) | Icon |
|---|---|---|---|---|
| Primary | Active | `Mapped-Yellow/Yellow 400` | — | raw #000000 |
| | Pressed | `Mapped-Yellow/Yellow 300` | — | raw #000000 |
| | Disabled | `Surface/Neutral/Light` | — | `Surface/Neutral/Medium` |
| Secondary | Active | `Surface/Neutral/White` | `Border/Neutral/Dark` | raw #000000 |
| | Pressed | `Surface/Neutral/Light` | `Border/Neutral/Black` ² | raw #000000 |
| | Disabled | `Surface/Neutral/White` | `Border/Neutral/Medium` | `Surface/Neutral/Medium` |

² Differs from the text Button (Secondary-Default Pressed uses `Border/Neutral/Dark`), and the icon-only Secondary has a white fill where
the text Secondary has none. See EXPORT_NOTES.md.

## Inconsistencies found
- Icons in Active/Pressed neutral types use an unbound `#000000` instead of a token.
- Icon Only Button: bound padding (e.g. Medium 12/16/12/16, Small 8/12/8/12) + icon is wider than the fixed box (Medium 16+20+16 = 52 > 44),
  so the padding can't actually apply. The box size, not the padding, is what renders.
- Primary fill uses `Colors - Maps/Mapped-Yellow/Yellow 400` while instances inside other components (e.g. OA card *Accept*) override it to
  `Surface/Brand/Primary-A` (same hex #ffca20).
- Default icons are named `Test/Help` and `Test/Arrow - Right` (placeholder names).
