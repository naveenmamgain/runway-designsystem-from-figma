# ModeHeader (home header tinted per captain mode)

**Source:** Logistics file `nJVb4xUWWcmIUArw5sAxIv`, frame `Header` (360×110) inside the home frames:
Hub [556:39547](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=556-39547),
Delivery [119:14011](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=119-14011),
Bike Lift [119:14091](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=119-14091). Not a component in Figma.

## Purpose
The top of the captain home screen. Same content in every mode (Runway `Homepage Header` + "Today's Earnings" row);
only the background gradient changes with the mode chosen in `ModeSwitcher`.

## Anatomy
```
Header (360×110, vertical, no padding/gap, vertical gradient)
├── Homepage Header (Runway, 360×66, Duty Type = Off duty, Elevation/S, no fill)
└── Today's Earnings Accordian (360×44, padding 10/16/10/16, gap 75) — passed as children
```

## Values
| Mode | Gradient (top → bottom) | Tokens |
|---|---|---|
| Hub | #fffbe4 → #fff092 | `Mode/Header/Start` → `Mode/Header/End` |
| Delivery | #ffefde → #ffcd96 | same |
| Bike Lift | #cbe3ff → #79a3d5 | same |

Gradient direction: Figma transform maps the gradient axis to the frame's y axis (top 0 % → bottom 100 %) → CSS `180deg`.
Height 110 = 66 + 44 (raw).

## Decisions made during export (2026-11-12)
- **Hub** uses `#fffbe4 → #fff092` (frames 119:14117 and 556:39547, the newest). Frame 119:13782 uses `#fffbe4 → #ffecac`.
- **Delivery** uses the `#ffefde → #ffcd96` gradient (open-menu frame 119:14011), matching how Hub and Bike Lift work.
  The closed Delivery frame 119:13985 instead has a white `Header` frame with Elevation/S around a Homepage Header whose
  fill is overridden to solid #ffddb8 — treated as unfinished.
- The Homepage Header inside renders without its own white fill or shadow (Figma: no fill; Elevation/S kept on the instance).

## Inconsistencies / gaps found
- Header gradients are raw hex, not variables; none of the six colours exist in Runway's palette.
- Gradient transforms differ in scale between modes (Hub vs Delivery/Bike Lift) though both run top → bottom.
- Delivery's header differs between its closed and open frames (see Decisions).
