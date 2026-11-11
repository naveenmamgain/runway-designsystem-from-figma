# Card (Figma: OA Cards — order-alert card)

**Figma:** page *OA screen and cards* → component set `OA Cards`
([2321:29878](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2321-29878)), 3 variants.
Each variant wraps one instance of a private per-service set, all built on the private base card `.Base OA`
([2321:14803](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2321-14803)):

| OA Cards variant | Wraps | Size |
|---|---|---|
| Service = **Bike OA** (default) | `.Bike OA / Type=Bike Taxi` (2321:17880, 12 types) | 272 × 372 |
| Service = Auto OA | `.Auto OA / Type=Auto` (2321:20108, 9 types) | 272 × 408 |
| Service = Cab OA | `.Cab OA / Property 1=Cab Eco` (2321:22957, 9 types) | 272 × 372 |

Runway has **no generic "Card" component**. `OA Cards` is the only public card, so it's exported as Card. Other card-like
surfaces (Bottom Sheet, Toast, Modal, Tool Tip) are exported as their own components.

## Purpose / when to use
Shows an incoming order alert (OA) to the captain: service type, fare, pickup/drop distances and addresses, and the
Reject / Accept actions. Used on the *Home of Orders* screen (`Home of Orders`, 2321:42873).

## Anatomy (`.Base OA`)
```
.Base OA (vertical, padding-bottom 12, gap 12, fill white, radius 16)
├── Header (horizontal, gap 4, fill white)
│   ├── BG GIF (image fill, 272×142, hidden by default)
│   ├── Fare Details (vertical, padding 12/0/0/12, gap 8, width 196)
│   │   ├── .Service Chips (Sub-Service=Bike) — chip: icon + service name
│   │   ├── Fare (horizontal, gap 4)
│   │   │   ├── ₹ + Base Fare          — "999"
│   │   │   ├── Extra Fare  (+999)     — boolean "Show Extra Fare" (default on)
│   │   │   ├── Gems  (+ 5 gem graphics) — boolean "Show Gems"
│   │   │   ├── EPKM  ("₹30/km")       — boolean "Show EPKM"
│   │   │   ├── Payment Method ("(Cash)") — boolean "Show Payment Method" (default on)
│   │   │   └── Extra Icon (trend arrow, 24×24) — boolean "Show Cab Extra Icon"
│   │   └── Intercity Details (destination, distance, duration) — boolean "Show Intercity Details"
│   └── Service Icon Bounding Box (72×82, radius 2) → Service Icons / Property 1=Bike
├── GTA Tag (pink-outlined row: icon + "10 Km near - Hebbal") — boolean "Show GTA Tag"
├── Location Details (SLOT; horizontal, padding 0/12/0/12, gap 4)
│   ├── Route Arrow (16 wide; vertical line, 1px, filled-circle start cap, equilateral-arrow end cap)
│   └── Address Details (vertical, gap 12)
│       ├── Pickup: distance ("1.2 km") + address (gap 4)
│       └── Drop:   distance ("12.5 km") + address (gap 4)
├── Tips card ("Customer added ₹20 extra") — boolean "Show Tips card"
└── CTAs (horizontal, padding 0/12/0/12, gap 12)
    ├── Reject Button (remote component, 48×48: timer ring + 40×40 white circle with Minus_Filled, Elevation/M)
    └── Accept Button (Button / Size=Medium / Type=Primary-Default / Icon=None, label "Accept", fills remaining width)
```
A hidden `Contextual Order Icon` (52×52 gradient circle) also sits in the base card.

## Properties
`OA Cards`: **Service** = Bike OA | Auto OA | Cab OA.

`.Base OA` (set per service variant):

| Property | Type | Default |
|---|---|---|
| Show Extra Fare | boolean | true |
| Show Gems | boolean | false |
| Show Tips card | boolean | false |
| Show GTA Tag | boolean | false |
| Show Payment Method | boolean | true |
| Show EPKM | boolean | false |
| Show Cab Extra Icon | boolean | false |
| Show Intercity Details | boolean | false |
| Location Details | slot | — |

Per-service types and the booleans they switch on (from Figma):
- **Bike OA**: Bike Taxi, Scooty, Boost, Food, Ownly, Grocery, Bike Parcel, Scooty Parcel, Bike Pink, Bike Corporate (Payment Method + Extra Fare);
  Bike Intercity (+ Intercity Details); Bike GTA (+ GTA Tag).
- **Auto OA**: Auto, Auto Boost, E-Rickshaw, Pet, Auto Parcel, Auto Share, Auto Corporate (Gems + Extra Fare); GTA (+ GTA Tag);
  Auto Plus (+ EPKM).
- **Cab OA**: Cab Eco, Eco-AC, Cab Sedan, Sedan-AC, Cab XL, Cab Premium, Variant9 (Cab Extra Icon); Cab Intercity (+ Intercity Details);
  GTA (+ GTA Tag).

States: none (no pressed/disabled/loading on the card itself; Accept uses Button's states).

## Values
| Part | Property | Value | Token |
|---|---|---|---|
| Card | fill | #ffffff | `Surface/Neutral/White` |
| | radius | **16** | raw |
| | padding | 0 / 0 / 12 / 0 | raw |
| | gap | 12 | raw |
| | width | 272 | raw |
| | shadow | none | — |
| Header | fill | #ffffff | `Surface/Neutral/White` |
| Fare Details | padding / gap | 12 / 0 / 0 / 12, gap 8 | raw |
| Service chip | fill, radius, padding, gap | #eceef2, 100, 2/6/2/2, 4 | `Surface/Neutral/Light` **(remote copy)**, raw, raw, raw |
| Service chip icon | 20×20, fill #5c6675, radius 24, padding 2 | | `Surface/Neutral/Dark` |
| Service chip text | `Label/Moderate/Reg`, #1a202a | | `Text/OnSurface/Default` **(remote copy)** |
| ₹ / base fare / + / extra fare | **Inter Bold 32, line height 28** — no text style | ₹ and fare: #1a202a; `+999`: #058743 | `Text/OnSurface/Default`; `Text/Success/dark` |
| Payment method | `Label/Moderate/Reg`, #1a202a, padding 4/0/4/0 | | `Text/Neutral/Dark` |
| EPKM | `Label/Large/Med`, #1a202a, padding 4/0/4/0 | | `Text/OnSurface/Default` |
| Extra Icon | 24×24 vector #058743 | | `Surface/Success/Dark` |
| Intercity title | `SubTitle/Moderate/Bold` **(remote)** | #1a202a | `Text/OnSurface/Default` |
| Intercity distance/duration | `Body/Small/Reg` **(remote)**, gap 8 | | `Text/OnSurface/Default` |
| Service icon box | 72 × 82, radius 2 | | raw |
| GTA Tag | padding 8, gap 4, fill white, stroke **#fe949e** (raw, per-side weights), text `Body/Moderate/Reg` | | `Surface/Neutral/White`; stroke unbound |
| Location Details | padding 0/12/0/12, gap 4 | | raw |
| Route line | 1 px, #5c6675, round join; start cap filled circle, end cap equilateral arrow | | `Border/Neutral/Dark` |
| Route Arrow box | 16 wide, padding 16/8/16/8 | | raw |
| Address block gap | 12 (between pickup and drop), 4 (distance → address) | | raw |
| Distance ("1.2 km") | `Title/Small/Bold` (Inter Bold 20/28) | #1a202a | `Text/OnSurface/Default` |
| Address | `Body/Small/Reg` (Inter 14/20); first segment ("Sec 3 HSR,") overridden to **Bold** | #1a202a | `Text/OnSurface/Default` |
| Tips card | inner padding 4/12/4/12, gap 4, radius 4, fill #058743; outer padding 0/12 | | `Surface/Success/Dark` |
| Tips text | `Body/Small/Med`, #f6f7f9, icon `Rupees_Circle_Filled` 20×20 | | `Text/OnSurface/Inverse` |
| CTAs | padding 0/12/0/12, gap 12, height 48 | | raw |
| Reject button | 48×48: timer ellipse #aeb6c3 (`Surface/Neutral/Medium`, remote copy) + inner 40×40 circle #ffffff, radius 999, effect `Elevation/M`, padding 2 | | remote component |
| Accept button | Button Medium / Primary-Default; fill overridden to `Surface/Brand/Primary-A` (#ffca20) | | see Button spec |

## Inconsistencies found
- The fare numerals use **no text style** (Inter Bold 32 with line height **28**, smaller than the font size) and no variables.
- Address emphasis is a manual Bold override on `Body/Small/Reg`; there is no `Body/Small/Bold` style.
- Several bindings point at a **remote copy** of `Colors - Semantic Tokens` / text styles instead of the local ones (service chip, reject button).
- The Reject Button and GTA icon are **remote components** (from another library), not in Runway.
- GTA Tag stroke `#fe949e` is unbound; it isn't in any Runway colour scale.
- Raw radii 16 (card), 100 (chip), 24 (chip icon), 2 (icon box), 4 (tips card); Runway has no radius tokens for these.
