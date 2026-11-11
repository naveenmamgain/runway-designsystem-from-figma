# OAMessageBox (Figma: .OA message Box)

**Figma:** page *OA screen and cards* → component set `.OA message Box`
([2321:39809](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2321-39809)), 5 variants. Private (dot-prefixed),
no description in Figma.

## Purpose / when to use
Inferred from the design and its use in `Home of Orders` (Orders=No): the empty-state message in the order list area
when the captain has no order alerts. It tells the captain why (off duty / still searching) and offers the next action
(go on duty, refresh, run a system check, or switch on a service such as Auto Boost).

| Variant (Property 1) | When |
|---|---|
| **Off Duty Toggle** (default) | Captain is off duty: message + Duty Toggle |
| Searching Orders | On duty, waiting: message only |
| Refresh Button | On duty, waiting: message + Refresh |
| System check | Waiting for a while: message + Refresh, "or", *Not getting orders?* nudge + CTA |
| Service Nudge | Waiting: message + Refresh, "or", service nudge (*Switch on Auto Boost*) + CTA |

## Anatomy
```
.OA message Box (auto-layout V, padding 12, gap 32, align MIN/CENTER, width 296 fixed, height hug, no fill)
├── Refresh Message / Off-Duty Message (V, gap 12, centred, fill width = 272)
│   ├── message text (centre-aligned, auto width)
│   ├── Duty Toggle          — Off Duty Toggle only (hidden in Service Nudge)
│   ├── Refresh Button       — remote component; visible in Refresh Button, System check (hidden in Searching Orders, Service Nudge)
│   └── Refersh Button (sic) — local Runway Button; Service Nudge only
├── "or" (text)                                — System check, Service Nudge
└── System Check Nudge / Auto Lite Nudge (V, gap 12, centred, fill width)
    ├── Text Box (V, centred, fill width)
    │   ├── Title
    │   └── Body
    └── Buttons (Runway Button, Medium / Primary-Default / Icon=Leading, fills width 272 × 44)
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| Property 1 | variant | **Off Duty Toggle**, Searching Orders, Refresh Button, System check, Service Nudge |

No boolean, text, slot or instance-swap properties. No interactive states on the box itself (child buttons have their own).
React adds text/icon/handler props (`dutyToggle`, `refreshIcon`, `nudgeTitle`, `nudgeBody`, `nudgeButtonText`, `nudgeButtonIcon`, …).

## Layout (identical in all variants)
| Part | Padding | Gap | Size | Fill / border / effects |
|---|---|---|---|---|
| Root | 12 (raw) | 32 (raw) | W 296 fixed; H hug (Off Duty 102, Searching 48, Refresh 104, System check 324, Service Nudge 314) | none |
| Message group | 0 | 12 (raw) | fill width (272), hug height | none |
| Nudge group | 0 | 12 (raw) | fill width, hug | none |
| Text Box — System check | 0 | 4 (raw) | fill width | none |
| Text Box — Service Nudge | 0 / 8 / 0 / 8 (raw) | 2 (raw) | fill width | none |

## Text
| Element | Text | Style | Colour | Align |
|---|---|---|---|---|
| Off-duty message | "Go On-Duty to receive orders." | `Body/Moderate/Reg` **(remote style)** | `Text/Neutral/Dark` #1a202a | centre |
| Searching message | "Searching for orders..." | `Body/Moderate/Reg` (remote) | **raw #000000** | centre |
| "or" | "or" | `Body/Moderate/Reg` (remote) | `Text/Neutral/Dark` | centre |
| System check title | "Not getting orders?" | `Title/X-Small/SemiBold` (local) | raw #000000 | centre, auto width |
| System check body | "Do a quick and easy system check to see why." | `Body/Moderate/Reg` (remote) | raw #000000 | centre, fill width |
| Service Nudge title | "Switch on Auto Boost" | `Title/2X-Small/Bold` (local) | `Text/OnSurface/Default` #1a202a | centre, fill width |
| Service Nudge body | "Get more orders at ₹12/KM during low demand time" | `Body/Small/Reg` (local) | remote colour **style** `Color/Palette/Gray/800` #253041 (no variable) → `--base-gray-gray-800` | centre, fill width |

Remote `Body/Moderate/Reg` binds `R:Typography - Semantic Tokens/Body/Moderate (16)/Reg/*` and font family
`R:Typography - Base Tokens/Font Family/Captain App Font`; the local `Body/Moderate/Reg` is used instead.

## Child components
| Child | Source | Values |
|---|---|---|
| Duty Toggle | local `Duty Toggle / Property 1=Off Duty` (701:124458, page *Header components*) | 162 × 42, padding 8/16/8/16, gap 8, radius `Button Tokens/Button/Radius` (999), fill `Colors - Maps/Mapped-Gray/Gray 50` #f6f7f9, stroke 1 INSIDE `Border/Neutral/Dark`; label "OFF DUTY" `Button/Moderate/SemiBold` `Text/Neutral/Medium`; `Toggle Switch/No Text/Active/OFF` (40 × 26). Passed in as `dutyToggle`. |
| Refresh Button | **remote** `Refresh Button / Property 1=F1` (2321:38428) | 122 × 44 (height fixed), padding 8/16/8/16 (top/bottom bound to `R:Button/Button Numbers/Vertical Padding` = 8; left/right raw 16), gap `R:Button/Button Numbers/Spacing` = 8, radius `R:Button/Button Numbers/Radius-Full` = 999, no fill, stroke 1 INSIDE `R:Colors - Semantic Tokens/Text/Information/Dark` #146edc; label "Refresh" `R:Button/Moderate/Bold` #146edc (same remote token); trailing remote icon `Icons/refresh-line` 20 × 20 (`R:Button/Button Numbers/Icon Size`), fill #146edc. Re-created privately in the TSX. |
| Refersh Button (Service Nudge) | local `Buttons / Size=Medium, Type=Secondary-Info, State=Active, Icon=Trailing` | 140 × 44, label "Refresh", trailing icon `sync/Style=Outlined`. See Button spec. |
| CTA (System check) | local `Buttons / Size=Medium, Type=Primary-Default, State=Active, Icon=Leading` | fills width (272 × 44), label "Check account status", leading icon `checklist/Style=Outlined` |
| CTA (Service Nudge) | same Button | fills width, label "Activate auto Boost", leading icon `settings/Style=Outlined` |

## Inconsistencies / gaps found
- The Refresh Button in *Refresh Button* and *System check* is a **remote component** bound to remote variables `Button/Button Numbers/{Spacing, Vertical Padding, Radius-Full, Icon Size}` (not in Runway / tokens.css), and its stroke/label use `Text/Information/Dark` as a border colour. *Service Nudge* uses the local Runway Button (Secondary-Info, Medium) instead — two different "Refresh" buttons in one set (122 px vs 140 px wide, padding 8/16 vs 12/16/12/24).
- Message text colour differs: Off-duty and "or" use `Text/Neutral/Dark`; "Searching for orders..." and the whole System check nudge use unbound **#000000**.
- Text styles mix a **remote** `Body/Moderate/Reg` with local `Title/*` and `Body/Small/Reg`.
- Service Nudge body colour is a remote colour style `Color/Palette/Gray/800`, not a variable.
- Title styles differ between the two nudges (`Title/X-Small/SemiBold` vs `Title/2X-Small/Bold`), as do Text Box gap (4 vs 2) and padding (0 vs 0/8).
- Layer misspelled "Refersh Button"; Service Nudge's frame is named "Auto Lite Nudge" while the copy says Auto Boost.
- Hidden leftovers: Duty Toggle (×2) and remote Refresh Button hidden inside Service Nudge; Refresh Button hidden in Searching Orders.
- System check variant has `clipsContent` on; others don't.
- Padding/gap values (12, 32, 12, 4, 2, 0/8) are raw.
