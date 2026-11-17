# OrderIdBand (C34) (Figma: B2B Delivery `order id`)

**Figma:** B2B Delivery UI `BMJzeTVlQYTDjcmHERwgVy`, Flow page. Legacy library component `order id` (not Runway), 2 variants (`type`):

| Frame | Instance | Variant / content |
|---|---|---|
| Food map [1:2982](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2982) | [1:2997](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2997) | "map view" (1:173): black, "Order ID : 122343221223****" |
| Food pickup [1:3044](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3044) | [1:3045](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3045) | "food pickup detail screen" (1:175): white, last 4 bold |
| Pickup OTP [1:3215](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3215) | screenshot | dark band, "Order ID: RD17175969515568925" + "Sender name: Henric Toby" |
| Drop OTP [1:3278](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3278) | screenshot | same, receiver |
| Collect Parcel [1:3148](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3148) | — | Specifics 1:3324 says order ID was added, but no band is in the frame |

`preview.png` = Figma screenshots of 1:2997 and 1:3045, plus a crop of the 1:3215 screenshot (scaled to 360 wide).

## Purpose / when to use
A full-width band directly under the page header with the order ID, which captains quote to support (Specifics 1:3324).
On OTP screens it adds the sender (pickup) or receiver (drop) name so the captain asks the right person.

**Visibility (P49):** shown on **parcel and food/delivery orders** — map, stage pages and OTP screens. Hidden only on
normal bike-taxi orders. This overrides Specifics 1:3315 ("Order ID … not needed for parcel order map view").

## Anatomy
```
OrderIdBand (vertical, centre, padding 8/16 [12/16 with name], full width, no fixed height)
├── Line 1  "Order ID : " + digits (letter-spacing 1) + last 4 (plain | **** | Bold 16)   Body/Small/Reg
└── Line 2  "{personLabel}: {personName}"  Body/Small/Reg — optional (OTP screens)
dark: fill black, text white · light: fill white, bottom stroke 0.5 Border/Neutral/Light, text black
```

## Properties
| Prop | Type | Default | Notes |
|---|---|---|---|
| `orderId` | string | — (required) | Full ID |
| `tone` | `"dark" \| "light"` | `"dark"` | Figma "map view" / "food pickup detail screen" |
| `tail` | `"plain" \| "masked" \| "emphasised"` | `"plain"` | Map masks last 4; detail screens bold them |
| `label` | ReactNode | "Order ID : " | |
| `personLabel` | ReactNode | "Sender name" | "Receiver name" on drop OTP |
| `personName` | ReactNode | — | Adds line 2 |

## Layout values
| Part | Property | Value | Token |
|---|---|---|---|
| Band | padding | 8/16 (Figma); 12/16 with second line (estimated) | raw |
| | fill dark / light | #000000 / #ffffff | `--surface-neutral-black` / `--surface-neutral-white` |
| | bottom stroke (light) | 0.5 #e0e3e6 | `--border-neutral-light` |
| Text | style | Noto Regular 14/20 | `Body/Small/Reg` |
| | colour dark / light | #ffffff / #000000 | `--text-neutral-white` / `--text-neutral-black` |
| Digits | letter-spacing | 1 | raw |
| Last 4 (emphasised) | style | Bold 16/20 | `Title/2X-Small/Bold` with line-height 20 |
| Line gap | — | 8 (estimated from screenshot) | raw |

## States
| Use | Code |
|---|---|
| Map (food / parcel) | `tone="dark" tail="masked"` |
| Stage page | `tone="light" tail="emphasised"` |
| Pickup OTP | `tone="dark" personLabel="Sender name" personName="Henric Toby"` |
| Drop OTP | `tone="dark" personLabel="Receiver name" personName="Sneha"` |

## Inconsistencies / gaps found
- **Brief says black band**, but the stage-page variant in Figma (1:3045) is white with a hairline; both exposed via `tone`.
- **OTP band colour**: the live-app screenshot is dark grey (~#231f20), not pure black; uses black for consistency with the map variant. Not measurable (image fill).
- **Separator spacing differs**: "Order ID : " (Figma component) vs "Order ID: " (live app).
- **Second line** spacing, padding and colour come from a screenshot only — unverified.
- **Specifics conflict**: 1:3315 hides order ID on the parcel map; 1:3324 adds it to Collect Parcel but the frame has none. Resolved by P49 (show on parcel and delivery).
- **Masked vs emphasised last 4**: Specifics 1:3324 says last 4 should not be emphasised for parcel; the food stage page emphasises them. `tail` lets each flow choose.
- **Font**: Figma Noto Sans; Runway Inter.
