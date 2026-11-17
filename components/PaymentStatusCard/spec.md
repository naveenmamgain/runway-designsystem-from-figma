# PaymentStatusCard (C32) (Figma: B2B Delivery `payment card`)

**Figma:** B2B Delivery UI `BMJzeTVlQYTDjcmHERwgVy`, Flow page. Instance of the legacy library component `payment card` (not Runway).

| Frame | Instance | State |
|---|---|---|
| Collect Parcel [1:3148](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3148) | [1:3151](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3151) | collect — "Please collect payment" ₹130.0 |
| Parcel drop [1:3227](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3227) | [1:3229](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3229) | collected — "Amount collected online" |
| Parcel drop, notes [1:3241](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3241) | — | collected (screenshot) |
| Parcel drop, photo uploaded [1:3255](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3255) | — | collect (screenshot) |

`preview.png` = Figma screenshots of 1:3151 (top) and 1:3229 (bottom), stacked with a 16px gap.

## Purpose / when to use
Top-of-page status on order stage pages telling the captain whether money must be collected at this stop.
The state depends on the customer's payment choice (user decision), so both states are valid at pickup or drop:
- **collect** (yellow): cash / QR to be collected, amount on the right. Leads to the Payments page.
- **collected** (green): paid online, nothing to collect.

## Anatomy
```
PaymentStatusCard (horizontal, align centre, gap 12*, padding 16, radius 8, stroke 0.5)
├── Lead (horizontal, gap 8 collect / 12 collected, fills width)
│   ├── Icon   collect: rupee 24×24 Green/600 · collected: tick badge 26×26 (Green/600 circle, white check)
│   └── Label  collect: Body/Moderate/Med Text/OnSurface/Default · collected: SubTitle/Small/SemiBold Green/600 — ≤2 lines
└── Amount (hugs, nowrap) Title/Small/Bold Green/600 — optional
```
\* Figma uses SPACE_BETWEEN with no gap; 12 added so a wrapped label never touches the amount.

## Properties
| Prop | Type | Default | Notes |
|---|---|---|---|
| `status` | `"collect" \| "collected"` | — (required) | |
| `amount` | ReactNode | — | Formatted ("₹130.0"). R01: always a parameter |
| `label` | ReactNode | per status | "Please collect payment" / "Amount collected online" |
| `icon` | ReactNode | per status | Override |

Also exported: `RupeeIcon`, `TickBadge`. Root has `role="status"`.

## Layout values
| Part | Property | collect | collected | Token |
|---|---|---|---|---|
| Card | fill | #fffbf0 | #e7f2ea | `--mapped-yellow-yellow-50` / **raw** (unbound, no token) |
| | stroke 0.5 | #d3a91f | #0a6b38 | `--mapped-yellow-yellow-500` / `--mapped-green-green-600` |
| | padding / radius | 16 / 8 | 16 / 8 | raw |
| Icon | size | 24 (illustration `rupee_14951683 2`, Green/500+600) | 26 circle #0a6b38 + 17.875 tick | raw; `--mapped-green-green-600` |
| Label | text | Medium 16/24 #1a202a | SemiBold 16/24 #0a6b38 | `Body/Moderate/Med` + `--text-onsurface-default` / `SubTitle/Small/SemiBold` + `--mapped-green-green-600` |
| Amount | text | Bold 20/28 #0a6b38 | — | `Title/Small/Bold`, `--mapped-green-green-600` |

## States
| `status` | Figma | Sample |
|---|---|---|
| collect | 1:3151 | `amount="₹130.0"` |
| collected | 1:3229 | no amount |

## Inconsistencies / gaps found
- **Same parcel drop shows both states** (1:3227/1:3241 collected vs 1:3255 collect). Resolved by the user: state follows the customer's payment choice.
- **Collected fill #e7f2ea is unbound**; nearest Runway token `Surface/Success/Light` (#f4fdf8) is visibly paler. Kept raw; candidate for a token.
- **Amount format** "₹130.0" (one decimal) differs from "₹30" / "₹30.00" elsewhere in the file. Callers format.
- **Rupee icon** is a 2-colour illustration in Figma; replaced with Runway `Rupees-Circle_Filled` tinted Green/600.
- **Label does not wrap in Figma** (`whitespace-nowrap`); allowed 2 lines here (R02).
- **Font**: Figma Noto Sans; Runway Inter.
