# EarningsWaitTimerCard (C33) (Figma: B2B Delivery `earnings`, `Food prep time`)

**Figma:** B2B Delivery UI `BMJzeTVlQYTDjcmHERwgVy`, Flow page. Instances of legacy library components (not Runway):

| Frame | Instance | What it shows |
|---|---|---|
| Food pickup, prep running [1:3044](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3044) | 1:3047 `earnings`, 1:3048 `Food prep time` | Timer 03:59 (Specifics 1:3338 "Wait timer disabled") + countdown 21:30 |
| Prep over [1:3055](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3055) | [1:3058](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3058) `earnings`, [1:3059](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3059) | **active** timer + grey 00:00 countdown with red delay strip |
| "When 4 mins are over" [1:3066](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3066) | standalone `earnings` | **earning**: 00:06 in green, "You are now earning wait charges" |
| Food ready [1:3067](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3067) | [1:3070](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3070) `earnings/wait time inactive` | **inactive** (greyed) |
| No wait charge / prep [1:3138](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3138) | `earnings` | Band only, "₹30" without "+ wait charge" |
| Complete Delivery [1:3283](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3283) | 1:3285 | Band only, rounded |
| Food map [1:2982](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2982) | 1:2998 `earnings card` | Full-bleed band "₹30.00 + wait charge" |

`preview.png` = Figma screenshots stacked: 1:3070 (inactive), 1:3058 (active), 1:3066 (earning), 1:3048 (prep 21:30), 1:3059 (prep over + delay).

## Purpose / when to use
Food (B2B delivery) pickup at a restaurant. The green band always states the estimated earnings. When the order has a
wait charge, the white body shows the wait timer: inactive while food is being prepared or after it is ready, active
once prep time is over (free wait counting), earning after the free minutes (wait charge running, counts up).
`FoodPrepCountdown` sits below it while the restaurant's prep time runs. Per P49 the earnings band is shown on parcel and
delivery orders, hidden on bike-taxi orders.

## Anatomy
```
EarningsWaitTimerCard (vertical, radius 8, stroke 0.5 Border/Neutral/Light)
├── Band (horizontal, space-between, gap 12*, padding 8/16 [24 bottom with timer], Green/600; radius 8 8 4 4 with timer)
│   ├── Label  "Estimated Earnings"  Body/Small/Med white, ≤2 lines
│   └── Amount "₹30" SubTitle/X-Small/Bold + " + wait charge" (Medium), ≤2 lines
└── Timer body (overlaps band by 16; horizontal, gap 11, padding 8/16, radius 8, white) — when `timerState` set
    ├── Timer (vertical, centre, gap 2): "Wait Timer" Body/Small/Med · mm:ss Title/X-Small/SemiBold
    ├── Divider 1 × ≥43, Gray/300
    └── Info (gap 6): info icon 14 + message Label/Moderate/Reg (12/16), ≤2 lines

FoodPrepCountdown (vertical, radius 8, white, stroke 0.5, clips)
├── Delay strip (optional): Surface/Error/Light, padding 6/12, info icon 14 + Label/Moderate/Med Text/Error/Dark
└── Row (gap 12, padding 16)
    ├── Illustration 38×38
    ├── Text (fills): "Please Wait!" Label/Moderate/Med · "Food will be ready in" SubTitle/X-Small/SemiBold, Gray/700
    └── Digits: [mm] colon [ss] — tiles min-width 26, padding 8/4, radius 4, Brand/Primary-B (grey at 00:00), white Bold 16/20
```
\* gap added; Figma uses SPACE_BETWEEN.

## Properties
### EarningsWaitTimerCard
| Prop | Type | Default | Notes |
|---|---|---|---|
| `amount` | ReactNode | — (required) | "₹30" (R01) |
| `waitCharge` | boolean | `true` | Appends "+ wait charge" |
| `label` | ReactNode | "Estimated Earnings" | |
| `timerState` | `"inactive" \| "active" \| "earning"` | — | Omit = band only |
| `seconds` | number | 0 | Rendered mm:ss; no internal clock |
| `freeMinutes` | number | 4 | Used in default message |
| `message` | ReactNode | per state | inactive/active: "After {n} mins, you will get extra charge for waiting"; earning: "You are now earning wait charges" |
| `timerLabel` | ReactNode | "Wait Timer" | |
| `fullBleed` | boolean | `false` | Band only: square map band (1:2998) |

### FoodPrepCountdown
| Prop | Type | Default | Notes |
|---|---|---|---|
| `seconds` | number | — (required) | ≤ 0 → grey tiles "00:00" |
| `delayMessage` | ReactNode | — | Red strip |
| `eyebrow` / `title` | ReactNode | "Please Wait!" / "Food will be ready in" | |
| `icon` | ReactNode | room-service icon | Replace with the dish illustration |

Also exported: `formatMmSs(seconds)`.

## Layout values
| Part | Property | Value | Token |
|---|---|---|---|
| Band | fill | #0a6b38 | `--mapped-green-green-600` |
| | text | white | `--text-neutral-white` |
| | padding | 8/16 (bottom 24 with timer), body overlaps −16 | raw |
| Card | stroke / radius | 0.5 #e0e3e6 / 8 | `--border-neutral-light` / raw |
| Timer label + time | colour active/earning | #1a202a | `--text-onsurface-default` |
| | colour inactive | #aeb6c3 | `--text-neutral-light` |
| Time (earning) | colour | #13934f (legacy Green/500) | `--text-success-dark` (#058743) — nearest |
| Info text | colour active / inactive | #1a202a / #7d899b | `--text-onsurface-default` / `--mapped-gray-gray-500` |
| | text | Noto Regular 12/16 | `Label/Moderate/Reg` (cap trim off) |
| Divider | colour | #c8ced8 | `--mapped-gray-gray-300` |
| Prep text | colour | #394454 | `--mapped-gray-gray-700` |
| | "Please Wait!" | Medium 12 / **20** | `Label/Moderate/Med` (12/16) |
| Digit tile | fill running / over | #1e4b82 / #7d899b | `--surface-brand-primary-b` / `--mapped-gray-gray-500` |
| | text | Noto Sans Display Bold 16/20 white | `Title/2X-Small/Bold` with line-height 20 |
| Delay strip | fill / text | #fff2f1 / #d03b2a (legacy Red/400) | `--surface-error-light` / `--text-error-dark` (#c42925) — nearest |

## States
| State | Figma | Code |
|---|---|---|
| Band only, with wait charge | 1:3285, 1:2998 | `<EarningsWaitTimerCard amount="₹30" />` (+ `fullBleed` on map) |
| Band only, no wait charge | 1:3138 | `waitCharge={false}` |
| Timer inactive | 1:3070 (also 1:3047 per Specifics) | `timerState="inactive" seconds={239}` |
| Timer active | 1:3058 | `timerState="active" seconds={239}` |
| Timer earning | 1:3066 | `timerState="earning" seconds={6}` |
| Prep running | 1:3048 | `<FoodPrepCountdown seconds={1290} />` |
| Prep over, delayed | 1:3059 | `seconds={0} delayMessage="Slight delay in food prep due to high demand"` |

## Inconsistencies / gaps found
- **1:3047 (prep running) draws the timer in active colours**, but Specifics 1:3338 says "Wait timer disabled"; 1:3070 shows the disabled look. Code uses `inactive` for this case.
- **Timer direction is unclear**: 03:59 in inactive/active vs 00:06 in earning. Read as: active counts down the free 4 minutes, earning counts up the charged wait. Not stated in Figma.
- **Message copy**: Figma "After 4 mins, you will get extra charge for waiting"; brief said "extra waiting charge". Figma copy used; override with `message`.
- **Legacy colours** Green/500 #13934f and Red/400 #d03b2a don't exist in Runway; mapped to `Text/Success/Dark` and `Text/Error/Dark`.
- **Amount format** varies: "₹30" (stage pages) vs "₹30.00" (map). Callers format.
- **Fixed widths** in Figma (body 328, prep text 161, tiles 26) made fluid / min-width (R02).
- **Illustrations** (`dinner_12844512`, food-ready cloche) are not Runway assets; room-service icon is a placeholder.
- **Line heights**: "Please Wait!" 12/20 and digits 16/20 have no exact Runway style.
- **Font**: Figma Noto Sans / Noto Sans Display; Runway Inter.
