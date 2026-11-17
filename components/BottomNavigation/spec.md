# BottomNavigation (Figma: Space + Bottom Nav)

> **Decision D14 (design review, 2026-11-16):** the bottom nav follows the **Intercity** file, frame [2072:113833](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-113833).
> It applies on **every screen that has a bottom nav**. The tab label Figma shows as "Opport" is **"Jobs"**.
> The Runway version (2321:26982, with the Order Button) is superseded. It is documented at the end of this file.

**Figma:** Intercity file `AG1dGWEhuZa2r9YxdeaOOi` → frame [2072:113833](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-113833) → **Space + Bottom Nav** [2072:114053](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-114053)
- **Spaces** (mode switch) [2072:114054](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-114054)
- **bottom navigation** (tab pill) [2072:114068](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-114068)

This is a frame inside a screen, not a component set. It has no description, variants or properties. The mode states of Spaces are hidden layers.

## Purpose / when to use
The captain app's persistent bottom navigation. On the left, a round **mode switch** shows the current service
(the bike in the sample) and opens the mode picker. On the right, a floating white pill holds 4 tabs:
**Home · Jobs · Credit · Orders**. Orders has a count badge (sample "2"). Use it on every screen that has a bottom nav.

## Anatomy
```
Space + Bottom Nav (360×80, horizontal, align centre, padding 12, gap 8; fade transparent → white 72 %, backdrop blur 0.5)
├── Spaces (56×56, vertical, clips content, Elevation/S)            ← ModeButton
│   ├── All      (visible) 56×56, padding 4, Surface/Neutral/White, radius 1000
│   │   └── All  48×48, gradient #ffffff → #fff4cd, radius 1000, inner shadows
│   │       ├── Service Icons/Bike (36×36 image)
│   │       └── "All Mode" (hidden)
│   ├── Lift     (hidden) 52×52, padding 4, gap 8, gradient white → #fff4cd, radius 1000, inner shadows
│   │   ├── Icon 40×40 (image 33.3×33.3)
│   │   └── "Bike Lift" (Body/Moderate/Med, Text/OnSurface/Default)
│   ├── Delivery (hidden) 52×52: Service Icons/Bike 40×40 + "Delivery"
│   └── Close    (hidden) 52×52, fill #fbfdff, padding 0/16/0/12, Elevation/S; close icon 24×24
└── bottom navigation (fills width = 272, 56 high, horizontal, centre, padding 4, gap 2, white, radius 1000, Elevation/S)
    ├── Home (selected)  flex 1 (64.5×48), vertical, centre, gap 4, radius 1000, fill rgba(0,0,0,.04), inner shadows
    │   ├── Bottom Nav Icons (remote, Fill / Home) 20×20
    │   └── "Home"
    ├── .Nav Buttons → "Opport" (shown as "Jobs")   flex 1, vertical, gap 4, padding 6/0, radius 100
    ├── .Nav Buttons → "Credit"
    └── .Nav Buttons → "Orders"
        └── Order Numbers (absolute, top −13, 20×20 bubble "2")
```

## Values
| Part | Property | Value | Token / raw |
|---|---|---|---|
| Wrapper | size | 360 × 80 | raw |
| Wrapper | padding / gap | 12 / 8 | raw |
| Wrapper | background | linear-gradient(180°, rgba(255,255,255,0) → rgba(255,255,255,0.72)), backdrop blur 0.5 | raw |
| Spaces | size, radius | 56 × 56, 1000 | raw |
| Spaces | shadow | 0 0 4 #10101029 | `--elevation-s` (Elevation/S) |
| Spaces "All" | outer padding, fill | 4, #ffffff | raw / `--surface-neutral-white` (bound) |
| Spaces "All" | inner circle | 48 × 48, gradient #ffffff → #fff4cd | raw in Figma; equals Hub `--mode-button-start` / `--mode-button-end` |
| Spaces "All" | inner shadow | inset 0 0 2 rgba(0,0,0,.12), inset 0 0 2 rgba(0,0,0,.2) | raw |
| Spaces "All" | service icon | 36 × 36 (`Service Icons/Bike`, raster) | raw |
| Spaces Lift/Delivery | icon | 40 × 40 | raw |
| Spaces Close | fill / icon | #fbfdff / 24 × 24 | raw (no token for #fbfdff) |
| Pill | size | fills width (272 at 360), 56 high | raw |
| Pill | padding / gap / radius | 4 / 2 / 1000 | raw |
| Pill | fill | #ffffff | raw white in Figma → `--surface-neutral-white` |
| Pill | shadow | 0 0 4 #10101029 | `--elevation-s` |
| Tab | size | flex 1 (64.5 × 48) | raw |
| Tab | gap / padding | 4 / 6 top and bottom (unselected) | raw |
| Tab icon | size | 20 × 20 | raw |
| Tab icon | colour | unselected Line `Surface/Neutral/Dark` #5c6675 (Credit Line: `Border/Neutral/Dark`, same hex); selected Fill `Surface/Neutral/Black` #000 | `--surface-neutral-dark` / `--surface-neutral-black` |
| Tab label | text style | `Label/Moderate/Med` (Inter Medium 12/16, cap-height trim) | `textStyles["Label/Moderate/Med"]` |
| Tab label | colour | selected `Text/OnSurface/Default` #1a202a; others `Text/Neutral/Medium` #5c6675 | `--text-onsurface-default` / `--text-neutral-medium` |
| Selected tab | fill | rgba(0,0,0,0.04) | raw (no token) |
| Selected tab | inner shadow | same as the Spaces inner circle | raw |
| Badge | size / padding / radius | 20 × 20 / 4 / 200 | raw |
| Badge | position | top −13, left 26.67 in a 64.5 tab (= centre − 5.58) | raw |
| Badge | fill / text | `Mapped-Neutral/Black` / `Label/Moderate/Med` in `Mapped-Neutral/White` | `--mapped-neutral-black` / `--mapped-neutral-white` |

## Tabs (D14)
| Key | Label | Figma node | Icon instance |
|---|---|---|---|
| home | Home | [2072:114069](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-114069) | `Bottom Nav Icons` (remote), Fill / Home: [2072:114070](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-114070) |
| jobs | **Jobs** (Figma text: "Opport") | [2072:114095](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-114095) | `.Nav Icons`, Line, 2×2 grid glyph: [2072:114096](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-114096) |
| credit | Credit | [2072:114072](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-114072) | `.Nav Icons`, Line / Credit (rupee coin in hand): [2072:114073](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-114073) |
| orders | Orders + badge | [2072:114075](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-114075) | `.Nav Icons`, Line, clipboard glyph: [2072:114076](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-114076) |

The icons are 20 × 20 here, not the 24 × 24 of the Runway `.Nav Icons` set. The selected tab shows the Fill icon.

## Rules
- **R02, long labels:** Indian-language labels can be long. Labels wrap and are never truncated. The code sets
  `white-space: normal`, centres the text, and uses `min-height` (48 for a tab, 56 for the pill) in place of Figma's
  fixed heights, so the pill grows. Figma itself sets `nowrap` on the labels, so this is a deliberate change.
- **Selected tab:** light pill rgba(0,0,0,0.04) with an inner shadow, the Fill icon, and a `Text/OnSurface/Default` label.
- **Badge:** shown only when `badge` is set and not 0. It has `min-width: 20` so "99+" fits.
- **Mode button:** only the 56 × 56 collapsed state is specified. The hidden Lift and Delivery labels sit outside the clip,
  so they belong to an expanded mode picker that this frame does not define.

## React API
```tsx
BottomNavigation({
  items,          // BottomNavItem[4]: { key, label, icon, selectedIcon?, badge? }, Home · Jobs · Credit · Orders
  selectedKey?,   // string
  onSelect?,      // (key: string) => void
  modeButton?,    // ModeButtonProps; omit to hide the mode switch
})
ModeButton({ variant?: "All" | "Lift" | "Delivery" | "Close", icon?, closeIcon?, onClick, "aria-label" })
NavTab({ item, selected })
```
`NavButton`, `OrderButton` and `LegacyBottomNavigation` are deprecated but still work. Passing the old `orderButton`
prop to `BottomNavigation` renders the legacy layout.

## Inconsistencies / gaps
- The frame is not a component. It has no variants and no properties. The mode states are hidden sibling layers.
- Home uses the **remote** `Bottom Nav Icons` set. The other tabs use the local `.Nav Icons` set.
- The label text "Opport" is replaced by "Jobs" (D14).
- The pill fill is raw white, not bound to `Surface/Neutral/White`. The mode button's white is bound.
- These values are raw: the selected-tab fill rgba(0,0,0,.04), the inner shadows, the wrapper fade, and the gradient end #fff4cd.
  #fff4cd matches the existing `--mode-button-end` (Hub), so the code uses the mode tokens.
- The Close fill #fbfdff has no token.
- The selected tab has radius 1000 and the others 100. Both render fully round at 48 high.
- The badge is positioned with a right constraint (17.83). The code anchors it to the tab centre so it stays over the icon.
- Figma has no pressed or focus states.

---

## Previous version (Runway 2321:26982), superseded by decision D14

Kept for reference and for screens that still use `OrderButton` / `NavButton`. It was superseded by design review D14 on 2026-11-16.

**Figma:** page *Bottom Nav* ([2321:36409](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2321-36409)) → component set
`bottom navigation` ([2321:26982](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2321-26982)), 3 variants.
Private parts on the same page:

| Part | Node | Variants |
|---|---|---|
| `.Nav Buttons` | [2321:26975](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2321-26975) | 2 (Default, Selected) |
| `.Nav Icons` | [2321:26867](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2321-26867) | 22 (Type × Icon) |
| `.Order Button` | [2321:27238](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2321-27238) | 3 (Default, Hide, Incoming Orders) |
| `.Order Button Animation` | [2321:26779](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2321-26779) | 8 (F1…F8) |

No description or documentation link is set on any of these sets.

### Purpose / when to use
*(Inferred from the design — Figma has no description.)* The captain app's persistent bottom tab bar: 1–3 tab buttons on the
left (Home, Credit, Earnings in the samples) plus the **Order Button** on the right, which opens/collapses the order list
(Default → Hide) and pulses with a ring animation while order alerts are incoming (Incoming Orders).

### Anatomy
```
bottom navigation (horizontal, align centre; fill Surface/Neutral/White; Elevation/S)
├── Buttons (horizontal, SPACE_BETWEEN, gap 20, fills remaining width)
│   └── .Nav Buttons × 1–3
│       ├── .Nav Icons (24×24; Type=Line when Default, Type=Fill when Selected)
│       └── Label (text)
└── .Order Button (126×64)
    ├── Default / Hide:
    │   └── Orders (pill 102×44, horizontal, padding 4/8/4/8, gap 4, radius 100)
    │       ├── Order Numbers (28×28 count bubble — hidden)
    │       ├── Bottom Nav Icons (remote instance, 28×28)
    │       └── Button Text → "Orders"
    └── Incoming Orders:
        └── .Order Button Animation (122×60, absolute positioning)
            ├── LC  (ring arc, left)
            ├── RC  (ring arc, right — horizontally mirrored LC)
            └── Orders (remote instance `Orders Button` / Property 1=Incoming Orders, Type=Rounded, 99×44)
                ├── Order Numbers (28×28 bubble with "2")
                └── Button Text → "Orders"
```

### Properties
| Component | Property | Type | Values (default **bold**) |
|---|---|---|---|
| bottom navigation | Property 1 | variant | **2 Buttons**, 3 Buttons, 4 Buttons (= nav buttons + Order Button) |
| .Nav Buttons | Property 1 | variant | **Default**, Selected |
| .Nav Icons | Type | variant | **Line**, Fill |
| .Nav Icons | Icon | variant | Orders, **Home**, Heart, Support, manage, Support 2, Down Arrow, INR, Rewards, Earnings, Credit |
| .Order Button | Property 1 | variant | **Default**, Hide, Incoming Orders |
| .Order Button Animation | Property 1 | variant | **F1** … F8 (prototype frames) |

No boolean, text or instance-swap properties exist on any of them: nav labels and icons are plain overrides
(the variants use Home / Credit / Earnings with `Type=Line`), and the count bubble is a hidden layer, not a property.

React API (deprecated): `LegacyBottomNavigation({ items (1–3), selectedKey, onSelect, orderButton })` (also reached through `BottomNavigation` when `orderButton` is passed), `NavButton`, `OrderButton({ state, label, icon, count })`.

### .Nav Icons (22)
All 24×24. The SVGs are exported separately; colours below are the vector fills.

| Icon | Line (node) | Fill (node) |
|---|---|---|
| Orders | 2321:26868 | 2321:26928 |
| Home | 2321:26919 | 2321:26926 |
| Heart | 2321:26923 | 2321:26921 |
| Support | 2321:26870 | 2321:26914 |
| Support 2 | 2321:26872 | 2321:26916 |
| manage | 2321:26876 | 2321:26908 |
| Down Arrow | 2321:26878 | 2321:26911 |
| INR | 2321:26881 | 2321:26895 |
| Rewards | 2321:26884 | 2321:26898 |
| Earnings | 2321:26887 | 2321:26901 |
| Credit | 2321:26890 | 2321:26904 |

Line icons: `Colors - Semantic Tokens/Surface/Neutral/Dark` (#5c6675), except **Credit Line** = `Border/Neutral/Dark` (#5c6675, same hex).
Fill icons: `Surface/Neutral/Black` (#000000).

### bottom navigation — layout per variant
Every variant: 360 × 64 (width fixed, height hugs the 64-high Order Button), fill `Surface/Neutral/White` (#ffffff), effect style
`Elevation/S` (→ `--elevation-s`), radius none, stroke none. All spacing raw (unbound).

| Variant | Root padding (T/R/B/L) | "Buttons" padding (T/R/B/L) | Buttons gap | Buttons frame width | Nav buttons (sample) |
|---|---|---|---|---|---|
| 2 Buttons | 0/32/0/0 | 0/32/0/32 | 20 | 202 | Home |
| 3 Buttons | 0/0/0/0 | 0/32/0/32 | 20 | 234 | Home, Credit |
| 4 Buttons | 0/0/0/0 | 0/4/0/16 | 20 | 234 | Home, Credit, Earnings |

"Buttons" is horizontal, primary-axis SPACE_BETWEEN, counter-axis centre, fills the remaining width (layoutGrow 1).

### .Nav Buttons
Vertical auto-layout, padding 4/4/4/4, gap 4, align MIN/centre, width 60 fixed, height hugs (45). No fill/stroke/radius. All raw.

| State | Icon | Label colour | Label text style |
|---|---|---|---|
| Default | `.Nav Icons` Type=Line (Surface/Neutral/Dark) | `Text/Neutral/Medium` (#5c6675) | `Label/Moderate/Med` ¹ |
| Selected | `.Nav Icons` Type=Fill (Surface/Neutral/Black) | `Text/OnSurface/Default` (#1a202a) | `Label/Moderate/Med` ¹ |

Label: auto width & height, left aligned, no truncation, leading trim CAP_HEIGHT (hence the 9px text box).
¹ Bound to a **remote** copy of the style (`R:Label/Moderate/Med`, variables `R:Typography - Semantic Tokens/Label/Moderate (12)/Med/*`);
implementation uses the local `textStyles["Label/Moderate/Med"]`.

### .Order Button
Outer frame 126 × 64 fixed, vertical auto-layout, centred. All sizes/spacing/radii raw.

| | Default | Hide | Incoming Orders |
|---|---|---|---|
| Outer padding | 8/12/8/12, gap 10 | 8/12/8/12, gap 10 | 0, gap 0 |
| Pill | 102×44, padding 4/8/4/8, gap 4, radius 100 | same | → `.Order Button Animation` (122×60) |
| Pill fill | `Surface/Neutral/Light` (#eceef2) | `Surface/Neutral/Black` (#000000) | see below |
| Icon (28×28) | remote `Bottom Nav Icons` Type=Line, Icon=Orders; vector `Surface/Neutral/Black` | remote `Bottom Nav Icons` Type=Fill, Icon=Down Arrow; vector `R:Surface/Neutral/White` (remote variable) | — |
| Label "Orders" | `R:SubTitle/X-Small/Med` ¹, `Text/Neutral/Dark` (#1a202a) | `R:SubTitle/X-Small/Med` ¹, `Text/OnSurface/Inverse` (#f6f7f9) | `R:SubTitle/X-Small/SemiBold` ¹, `Text/OnSurface/Default` |
| Label frame | horizontal, fills width (54), hugs height | same | horizontal, align MAX/centre, hugs |

Count bubble "Order Numbers" (**hidden** in Default and Hide): 28×28, radius 200, fill `Colors - Maps/Mapped-Neutral/Black` (#000000);
text "2" fill `Mapped-Neutral/White` (#ffffff), **no text style**: font Noto Sans SemiBold 20, line-height 100% (raw);
fontSize/fontStyle bound to `Typography - Semantic Tokens/Title/Small (20)/SemiBold/Size|Weight`, fontFamily bound to
`Typography - Base Tokens/Font Family/Captain App Font`. Implementation: `--title-small-20-semibold-size|weight`, `--cap-app-typeface`, line-height 100%.

### .Order Button Animation (Incoming Orders)
122 × 60, no auto-layout, no fill, no clipping. Contains the remote `Orders Button` (Property 1=Incoming Orders, Type=Rounded) and two rings.

**Orders pill** (remote instance): 99×44, padding 4/8/4/8, gap 4, radius 100 (raw), fill `Surface/Brand/Primary-A` (#ffca20),
stroke 1 OUTSIDE `Colors - Maps/Mapped-Yellow/Yellow 500` (#d3a91f). Count bubble visible: 28×28, radius 200, fill `Surface/Neutral/Black`,
text "2" `R:Title/Small/SemiBold` ¹ in `Text/OnSurface/Inverse`. Label "Orders" `R:SubTitle/X-Small/SemiBold` ¹ in `Text/OnSurface/Default`.
No icon in this instance.

**Rings LC / RC**: ELLIPSE with arcData start 270°, end 182.01°, inner radius 0.9281911849975586 (a ¾ ring outline), no fill,
stroke `Mapped-Yellow/Yellow 500`, stroke cap NONE. RC is LC mirrored horizontally (relativeTransform x-scale −1).
Frames and prototype (all transitions SMART_ANIMATE, LINEAR, trigger AFTER_TIMEOUT):

| Frame | Ring size | Ring stroke | LC transform [a b c d e f] ² | Orders transform | → next (wait / duration) |
|---|---|---|---|---|---|
| F1 | 44×44 | 0, INSIDE | [1 0 0 1 9.9629 9] | [1 0 0 1 12 9] | F2 (0.8s / 0.1s) |
| F2 | 58×58 | 2.5, CENTER | [1 0 0 1 2.9629 2] | [1 0 0 1 12 9] | F3 (0.001s / 0.06s) |
| F3 | 58×58 | 2.5, CENTER | rot 28.25° @ (−7.3086, 19.1799) | rot −3° @ (13.2188, 6.4395) | F4 (0.001s / 0.06s) |
| F4 | 58×58 | 2.5, CENTER | rot 46.63° @ (−9.0332, 32.1642) | rot 3° @ (10.916, 11.6208) | F5 (0.001s / 0.06s) |
| F5 | 58×58 | 2.5, CENTER | rot 36.1° @ (−8.5566, 24.6582) | rot −3° @ (13.2188, 6.4395) | F6 (0.001s / 0.06s) |
| F6 | 58×58 | 2.5, CENTER | rot 41.86° @ (−8.9883, 28.7543) | rot 3° @ (10.916, 11.6208) | F7 (0.001s / 0.06s) |
| F7 | 58×58 | 2.5, CENTER | = F2 | = F2 | F8 (0.1s / 0.4s) |
| F8 | 44×44 | 0, INSIDE | = F1 | = F1 | F1 (1s / 0.4s) |

RC positions: F1/F8 origin (112.0371, 9), F2/F7 (119.0371, 2); F3 (131.0488, 31.0179), F4 (130.3535, 23.4816),
F5 (131.0488, 30.7436), F6 (130.3008, 23.2031) with mirrored rotation (full matrices in `BottomNavigation.tsx`).
Cycle length 3.105s. The implementation turns these matrices into CSS `@keyframes` (linear, infinite) and disables them under
`prefers-reduced-motion`.
² Matrix values are Figma floats shown to 4 decimals.

### Inconsistencies / gaps found
- **Radius 758.62 on LC/RC (F1, F8)** — confirmed a scaled layer: the 58×58 rings carry cornerRadius 1000; the 44×44 copies carry
  1000 × 44/58 = 758.6206665…. Corner radius has no effect on an ellipse; ignored in code.
- **Radius 8.38** — it is *not* in the nav/order button: it is `Ellipse 1` (18.857×18.857) inside the **Credit Line** icon (2321:26894),
  also scaled; part of the icon SVG, not a layout value.
- F1/F8 ring stroke weight is **0** (rings invisible) while F2–F7 are 2.5; stroke align also switches INSIDE ↔ CENTER between them.
- `.Order Button` Default/Hide use the **remote** `Bottom Nav Icons` set for their icon, not the local `.Nav Icons` (which has the same Orders / Down Arrow icons).
- `.Order Button Animation` uses the **remote** `Orders Button` component (key 502c9927…), so the Incoming Orders pill is defined in another library.
- Text styles on nav labels and order labels are bound to a **remote copy** of `Typography - Semantic Tokens` (`R:Label/Moderate/Med`,
  `R:SubTitle/X-Small/Med`, `R:SubTitle/X-Small/SemiBold`, `R:Title/Small/SemiBold`); same names exist locally → local styles used.
- Hide icon vector bound to a remote variable `R:Colors - Semantic Tokens/Surface/Neutral/White`.
- Local count bubble text has **no text style**, renders in **Noto Sans**, line-height raw 100%, and uses `Mapped-Neutral/*` colours,
  whereas the remote Incoming Orders bubble uses `Title/Small/SemiBold` + `Surface/Neutral/Black` / `Text/OnSurface/Inverse`.
- Order label weight differs: Default/Hide `SubTitle/X-Small/Med` vs Incoming Orders `SubTitle/X-Small/SemiBold`; label colour
  `Text/Neutral/Dark` (Default) vs `Text/OnSurface/Default` (Incoming) — same hex.
- Credit Line icon uses `Border/Neutral/Dark` while all other Line icons use `Surface/Neutral/Dark` (same hex).
- Root padding-right 32 only in "2 Buttons"; "4 Buttons" uses asymmetric 16/4 Buttons padding. No spacing/size/radius tokens anywhere.
- Variant property names are generic (`Property 1`); icon name casing inconsistent (`manage`, `Support 2`).
- No pressed/focus states on nav buttons or Order Button in Figma.
