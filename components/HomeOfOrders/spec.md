# HomeOfOrders (Figma: Home of Orders)

**Figma:** page *OA screen and cards* → component set `Home of Orders`
([2321:42873](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2321-42873)), 2 variants, each 360 × 720.
No description on the set. Slot descriptions: `Filters` and `Filters2` = "Create new filters"; `Orders` = none.

## Purpose / when to use
Inferred from the design: the captain app's order home screen. With **Orders=Yes** it lists incoming order alerts
(OA Cards) with a left side bar of order tabs (timer + fare); with **Orders=No** it shows an empty state
(`.OA message Box`). It is a **screen composition**, not a reusable widget — the implementation is a layout
component whose regions are `ReactNode` props.

## Properties
| Property | Type | Values / default |
|---|---|---|
| Orders | variant | Yes, **No** |
| Orders | slot | (Orders=Yes) vertical list of `OA Cards` |
| Filters | slot | (Orders=No) row of filter pills |
| Filters2 | slot | (Orders=Yes) row of filter pills — same content as Filters, separate slot |

React: `orders` (boolean), `title`, `backButton`, `headerAction`, `filters`, `orderList`, `orderTabs`, `emptyState`, `bottomNav`.
Helpers exported from the same file: `OrderTab` (side-bar tab O1…O6), `FilterPill`.

## Layout
The variant frame has **no auto-layout**; every child is positioned absolutely. Root: 360 × 720, fill
`Surface/Neutral/Light` (#eceef2), clips content.

| Region | Figma node | x, y | w × h | Notes |
|---|---|---|---|---|
| Header | frame `Header` | 0, 0 | 360 × 64 | V auto-layout, padding 16 (raw), gap 8, centred; fill `Surface/Neutral/White`; stroke bottom-only 1 px INSIDE `Border/Neutral/Light` (#e0e3e6) |
| └ Head | frame | 20, 16 | 320 × 32 | H, space-between, centred (gap 174 is ignored by space-between) |
| &nbsp;&nbsp;└ Orders Count | frame | | hug | H gap 8: hidden `Left Arrow` (701:123800, Icons page) + title text |
| &nbsp;&nbsp;└ Toggle | **remote** `Toggle / Property 1=Text` | 254, 0 | 66 × 32 | see below |
| Side Bar | frame `Side Bar` | 0, 64 | 64 × 656 | V, gap 1 (raw), no fill |
| Filters / Filters2 | SLOT | 76, 72 | hug (287 × 44) | H, gap 0 |
| Orders (Yes) | SLOT | 76, 124 | 272 × 535 | V, gap 16 (raw), centred, clips content |
| .OA message Box (No) | instance `Property 1=Off Duty Toggle` | 64, 309 | 296 × 102 | = vertically/horizontally centred in the area x 64–360, y 64–656 |
| bottom navigation | instance `bottom navigation / Property 1=3 Buttons` (2321:26982, page *Bottom Nav*) | 0, 656 | 360 × 64 | fill `Surface/Neutral/White`, effect `Elevation/S` |

### Header
| Element | Value | Token |
|---|---|---|
| Title ("3 Orders" / "0 Orders") | `Title/X-Small/SemiBold` **(remote style)** | colour #0c0d0f = remote colour style `Typography/Dark 1` — **unbound, raw** |
| Toggle (remote) | 66 × 32, padding 4/4/4/8, gap 4, radius **222** (raw), fill `R:Surface/Success/Dark` #058743, effect drop shadow 0,0 blur 5.3 #4ad189 (raw) | label "ON" `R:Button/Moderate/SemiBold` `R:Text/OnSurface/Inverse` #f6f7f9; knob 24 × 24 radius 24 `R:Surface/Neutral/White`, shadow 0,1 blur 4 #015127 (raw); icon 22 × 22 vector `R:Surface/Success/Dark` |

### Side bar — order tab (O1…O6), `OrderTab`
| Property | Value | Token |
|---|---|---|
| size | 64 × 92 | raw |
| padding / gap | 4 / 8 | raw |
| radius | 0 / 4 / 4 / 0 (TL/TR/BR/BL) | raw |
| fill — selected (O1) | #eceef2 | `Surface/Neutral/Light` |
| fill — other | #ffffff | `Surface/Neutral/White` |
| Fare Details | V, gap 4 | raw |
| Timer | 24 × 24: ring ellipse, arcData start 270° (12 o'clock), sweep 285° (4.7124→9.6857 rad), inner radius 0.7919 → 2.5 px ring | fill `Surface/Success/Dark` #058743; placeholder tabs (O4–O6): full ring `Surface/Neutral/Light` |
| Timer base line | Ø 18.15 circle, 1 px INSIDE stroke, centred (offset 2.93) | `Border/Neutral/Medium` #aeb6c3 |
| Fare frame | 56 wide, H gap 10, centred | raw |
| Fare text — selected | "₹999\n+ 999", `Body/Moderate/Med`, centre | `Text/OnSurface/Default` #1a202a |
| Fare text — other | "₹999 + 999", `Body/Moderate/Reg` (O2 local, O3 **remote** style), centre | `Text/Neutral/Medium` #5c6675 |
| Empty Order Bar | fills remaining height (Yes: 377, No: 656), padding 4, radius 0/4/4/0 | `Surface/Neutral/White`; its content has opacity 0 |

Orders=Yes shows O1–O3 (O4–O6 hidden); Orders=No hides O1–O6 and shows only the Empty Order Bar.
Hidden layers in the timer: `GTA` group (O2), `bi:pin-map-fill` 12 × 12 (O3) → `timerIcon` prop.

### Filter pills (slot content), `FilterPill`
Three cards: **Services Card** (107 × 44), **Go To Card** (90 × 44), **Stay In Card** (90 × 44). Each:
```
Card (V) ─ Head (H, align bottom) ─ Head (V, padding 4, radius 20/20/0/0, no fill)
                                     └ Chip (radius 1000, clips) ─ Filter Pills (H, padding 8, gap 4, centred, radius 1000, fill Surface/Neutral/White, height 36)
                                        ├ icon   — Services: `settings/Style=Outlined` 24 × 24 (`Surface/Neutral/Dark`);
                                        │          Go To: remote `GTA Icon / Inactive Icon` 24 × 24 (image); Stay In: `ph:map-pin-simple-area` 16 × 16 (`Surface/Neutral/Dark`)
                                        └ label  — `Button/Small/Med` **(remote style)**, `Text/Neutral/Medium` (Go To: remote copy)
         └ Add curve (hidden, 14 × 16, #ffb9bf)   └ Content (hidden; expanded panel: padding 12/8/12/8, gap 8, radius 0/12/12/12, fill #ffb9bf)
```
- Services *Chip* fill is a raw linear gradient (#888888 α0.3 @0, #323232 α0.08 @0.861, #ffffff @1) whose transform
  (`[[0,2.571,1],[-13.341,0,7.496]]`) places the whole chip past the last stop, so it renders **solid white**; Go To / Stay In chips are raw #ffffff.
- *Go To* uses a **remote** `Filter Pills / Property 1=Inactive` instance (with a 0-width `Highlighter` rect #ffb9bf); Services and Stay In are local frames with hidden `Number Badge` (24 × 24, radius 100) and remote `Green dot`.
- Hidden *Content* panels contain area rows (256 × 36, padding 4/12/4/12, gap 4, radius 8; selected: `Surface/Success/Light` + 1 px `Border/Neutral/Black`, others `Surface/Neutral/White` + 1 px `Border/Neutral/Light`) and a Small Secondary-Default Button (`Know more`).

## Runway components used
| Region | Component | Repo |
|---|---|---|
| Orders slot | `OA Cards` (2321:29878), Service=Bike OA ×3 (heights 449 / 372 / 409) | `components/Card` |
| Empty state | `.OA message Box` (Off Duty Toggle) | `components/OAMessageBox` (default) |
| Bottom bar | `bottom navigation` (3 Buttons) | `components/BottomNavigation` |
| Duty toggle inside message box | `Duty Toggle` | `components/DutyToggle` |
| Filter content button (hidden) | `Buttons` Small / Secondary-Default / Trailing | `components/Button` |
| Header toggle | **remote** `Toggle / Property 1=Text` | not in Runway (pass any node) |
| Back arrow (hidden) | `Left Arrow` (701:123800) | icon |

## Example
```tsx
<HomeOfOrders
  orders
  title="3 Orders"
  headerAction={<MyOnToggle />}
  filters={<><FilterPill icon={<SettingsIcon />} label="Services" /><FilterPill icon={<GtaIcon />} label="Go To" /><FilterPill iconSize={16} icon={<PinArea />} label="Stay In" /></>}
  orderTabs={<><OrderTab selected fare={<>₹999<br />+ 999</>} /><OrderTab /><OrderTab /></>}
  orderList={<><Card service="Bike OA" … /><Card … /></>}
  bottomNav={<BottomNavigation … />}
/>
```

## Inconsistencies / gaps found
- Many raw radii: side-bar tabs 0/4/4/0, filter head 20/20/0/0, chip 1000, content panel 0/12/12/12, area rows 8, remote toggle 222; an `8.38` radius (Ø 18.86 ellipse) inside the bottom-nav `.Nav Icons` vector. None are bound to tokens.
- Header title uses a **remote** text style and a remote colour **style** (`Typography/Dark 1`, #0c0d0f) — #0c0d0f is not a Runway colour.
- Header toggle is a **remote** component (`Toggle / Property 1=Text`) with remote variable bindings and raw shadows (#4ad189, #015127); Runway's local Toggle is not used.
- Fare text style is mixed across tabs: O1 `Body/Moderate/Med` (local), O2 `Body/Moderate/Reg` (local), O3–O6 `Body/Moderate/Reg` (**remote**).
- Filter pills mix a remote `Filter Pills` instance (Go To) with detached local frames (Services, Stay In); their labels use a remote `Button/Small/Med`. The Services chip fill is a degenerate gradient that renders white.
- Hidden filter content uses raw #ffb9bf (fill, "Add curve") — not a Runway colour.
- The Orders slot (y 124 + 535 = 659) overlaps the bottom nav by 3 px; the Filters slot (x 76 + 287 = 363) overflows the 360 screen by 3 px (clipped).
- Header *Head* has gap 174 that is overridden by space-between; Head is 320 wide inside 328 of available width (x = 20, not 16).
- Two slots (`Filters` on No, `Filters2` on Yes) hold the same content.
- Implementation: the Orders slot scrolls (`overflow-y: auto`); Figma only clips — scroll behaviour isn't specified.
