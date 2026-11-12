# ModeSwitcher (captain mode: Hub / Delivery / Bike Lift)

**Source:** Logistics file `nJVb4xUWWcmIUArw5sAxIv`, page *Ready for Dev* → *Section 1*. Built on the Runway library
(the file subscribes only to *Runway design system (Cap-App)*; all bound variables and components resolve to Runway's own keys).

| Frame | Mode | State |
|---|---|---|
| [556:39547](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=556-39547) | Hub | closed (newest home, "New Home page with no bottomsheet") |
| [119:13782](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=119-13782) | Hub | closed (older header gradient — see Decisions) |
| [119:14117](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=119-14117) | Hub | open |
| [119:13985](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=119-13985) | Delivery | closed |
| [119:14011](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=119-14011) | Delivery | open |
| [119:14091](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=119-14091) | Bike Lift | closed |
| [119:14051](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=119-14051) | Bike Lift | open |

Exports of all 7 frames: `screens/logistics/`. In Figma the switcher is **loose frames, not a component**, and the frames have
**no prototype links** for it (the only interactions are a looping "Work Zone" chip animation). The interaction below is
read from the frame sequence.

## Purpose / when to use
Lets the captain switch the app between three work modes — **Hub**, **Delivery**, **Bike Lift**. The current mode
re-themes the home header (see `ModeHeader`) and the mode button; the screen content changes per mode.

## Interaction
1. **Closed**: the mode button (64×64 circle, current mode's icon and colour) sits left of the floating nav pill.
2. Tap the mode button → **open**: a 75 % black overlay covers the screen; three pills stack above the button
   (top → bottom: Bike Lift, Delivery, Hub) and the button becomes a white **✕** close button. The current mode's pill is
   tinted and SemiBold; the others are white and Regular.
3. Tap a pill → that mode is selected and the menu closes (header + mode button re-theme).
4. Tap ✕ (or outside the pills, or Esc) → menu closes with no change.

**Motion (assumption — not specified in Figma):** overlay fades in 200 ms ease-out; pills rise 8 px + fade in, 220 ms,
staggered 40 ms; close button fades in. All motion is disabled under `prefers-reduced-motion`.

## Anatomy
```
Bottom bar (360×80, horizontal, padding 8, gap 8, white fade)
├── Mode button (64×64, r 1000)                      ← "Spaces" > Hub "All" | "Delivery" | "Lift"
│   └── Mode icon (40×40)
└── Floating nav pill (272×64, r 1000, white, Elevation/S)   ← Runway BottomNavigation ("bottom navigation")
    ├── .Nav Buttons ×2 (Home, Credit)  — padding-left 12, gap 20
    └── .Order Button (126×64)

Open menu ("overlay", 360×800)
└── Spaces (vertical, gap 12, bottom-left at x 8, aligned to the mode button)
    ├── Pill "Bike Lift"  (icon 52×52 + label)
    ├── Pill "Delivery"
    ├── Pill "Hub"
    └── Close button (64×64, ✕ 24×24)
```

## Properties (implementation)
| Prop | Values |
|---|---|
| `mode` | `"Hub"` (default in Figma file order), `"Delivery"`, `"Bike Lift"` |
| `onModeChange` | callback |
| `icons` | per-mode icon nodes |
| `open` / `onOpenChange` | optional controlled open state |
| `navigation` | props for Runway `BottomNavigation` |

## Values
Mode colours use the **Mode** tokens (`tokens/semantic.json` → `Mode`; CSS `--mode-*`, switched by `data-mode`).
Everything else is raw in Figma unless a token is named.

| Part | Property | Hub | Delivery | Bike Lift | Token |
|---|---|---|---|---|---|
| Mode button | fill | gradient #ffffff → #fff4cd (vertical) | #ffddb8 | #c9e1ff | `Mode/Button/Start` → `Mode/Button/End` |
| | size, radius | 64×64, 1000 | same | same | raw |
| | effect | `Elevation/S` | same | same | effect style |
| | icon | 40×40, `Service Icons/Bike` *Bike Taxi, SM* | 40×40, `Service Icons/Bike` *Bike_Parcel, SM* | 40×40 image | Runway assets / `assets/icons/mode/bike-lift.png` |
| | stroke | 0.5 inside, **no visible paint** | same | same | — |
| Pill (selected) | fill | #ffecac | #ffddb8 | #c9e1ff | `Mode/Pill/Selected` (Hub = `Colors - Maps/Mapped-Yellow/Yellow 200`) |
| Pill (unselected) | fill | #ffffff | #ffffff | #ffffff | `Surface/Neutral/White` / `Colors - Maps/Mapped-Neutral/White` (mixed in Figma) |
| Pill | size | 64 high, hugs width (178–180) | | | raw |
| | padding, gap, radius | 12 / 32 / 12 / 16, gap 8, r 1000 | | | raw |
| | icon | 52×52 | | | raw |
| | label | `Title/X-Small/SemiBold` (Inter 18/24); unselected pills override weight to **Regular** | | | text style; colour `Text/OnSurface/Default` |
| | hidden child | `Chevron_Left_Stroke` 16×16 (never shown) | | | — |
| Pill stack | gap / position | gap 12, left 8, bottom-aligned with the mode button | | | raw |
| Close button | fill, size, radius | #fbfdff, 64×64, 1000 | | | raw (no token has #fbfdff) |
| | effect | `Elevation/M` | | | effect style |
| | icon | Material `close`, Style=Round, 24×24 (`assets/icons/material/round/close.svg`) | | | |
| Overlay | fill | #000000 @ 75 % | | | `Overlays/Large (75% Black)` |
| Bottom bar | size, padding, gap | 360×80, padding 8, gap 8 | | | raw |
| | fill | #ffffff 0 % → #ffffff 100 % (vertical fade) | | | raw (end = `Base-Neutral/White`) |
| Nav pill | size, radius, fill, effect | 272×64, 1000, #ffffff, `Elevation/S` | | | raw / effect style |

## Decisions made during export (2026-11-12)
- Hub's mode-button gradient and the floating nav pill follow the newest frame (556:39547). The open-menu frames use
  Elevation/M on the nav pill, a 276-wide pill and gap 4 — treated as artefacts of the overlay state.
- The floating nav reuses Runway `BottomNavigation` with its 3-item internal spacing; Figma's floating version uses
  padding-left 12 / gap 20 inside a 272 pill, so nav-button positions differ by a few px.

## Inconsistencies / gaps found
- No component, no variants, no prototype interactions for the switcher — all states are separate frames.
- Mode colours are raw hex; only Hub's selected pill uses a Runway variable. Not in Runway's palette: #fff4cd, #ffddb8, #c9e1ff, #fbfdff.
- Unselected pill fill is bound to `Surface/Neutral/White` on Hub and to `Colors - Maps/Mapped-Neutral/White` on Bike Lift/Delivery (same #ffffff).
- Pill width varies 178 / 179 / 180 between frames (hug + different label weights).
- The mode buttons carry a 0.5 px stroke with no visible paint; label text layers ("All Mode", "Delivery", "Bike Lift", Medium 16) sit hidden inside the 64×64 buttons — likely an abandoned expanding-button design.
- Hub's frame names: the Hub pill is named `All` and its hidden label reads "All Mode".
- Bike Lift icon is a raster image ("ChatGPT Image Aug 17, 2026…") rather than a Runway icon.
- In open frames the bottom nav shows Home unselected (Line icon) while closed frames show Home selected (Fill icon).
