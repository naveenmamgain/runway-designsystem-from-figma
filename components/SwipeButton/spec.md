# SwipeButton (Figma: Buttons, swipe-to-confirm slider)

> **Decision C28 (design review, 2026-11-16):** "keep D02 option B slider option wherever swipe is required. That's the new component."
> The base design is the D02 option B slider from the E-rickshaw file. **D02:** bike, auto and cab trip steps (including
> Bundle Orders) and delivery steps use it. **E-rickshaw does not:** its trip steps use tap + a confirm sheet.
> **D16 = B:** delivery swipes are coloured by step (blue ARRIVED, black PICKED / DELIVERED, red REACHED), a deliberate
> exception to the yellow primary (D05). **D17:** the delivery swipe is never disabled.

**Figma:** E-rickshaw file `Mtv6LZ3AG2DqZmJp6S9KMv`
- Component set **Buttons** [433:38829](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=433-38829), 3 variants:
  `Property 1=Default` [433:38830](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=433-38830) (rest),
  `Property 1=Default` [433:38835](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=433-38835) (shine at the right, knob nudged),
  `Property 1=Variant3` [433:38840](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=433-38840) (no shine)
- In context: frame [1041:159968](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=1041-159968) → instance [1041:160353](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=1041-160353) "राइड पूरी हो गई"

Delivery colours (D16): B2B Delivery file `BMJzeTVlQYTDjcmHERwgVy`
- ARRIVED [1:3013](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3013) → `Button` [1:3017](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3017)
- PICKED [1:3148](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3148) → `cta holder` [1:3155](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3155)
- REACHED [1:3220](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3220) (an image of the live app, no layers)
- DELIVERED [1:3227](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3227) → `cta holder` [1:3238](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3238)

Not in the Runway file. The set has no description and no properties other than `Property 1`. The three variants are
frames of one hint animation, not states.

## Purpose / when to use
A full-width swipe-to-confirm for an irreversible trip or delivery step: Arrived, Start ride, Complete ride, ARRIVED,
PICKED, REACHED, DELIVERED. The captain drags the round arrow knob to the right end to confirm. It sits at the bottom of
the screen in the stop / trip card, 16 from each side.

- **Use** on bike, auto and cab trip steps (including Bundle Orders) and on every delivery step.
- **Do not use** on e-rickshaw. E-rickshaw trip steps (Arrived / Start / Complete, and Post activation) are a tap
  button that opens a confirm sheet (D02).
- **Do not use** for ordinary actions. Use `Button`.

## Anatomy
```
Buttons (328×52, Button/Button Height 52, Button/Radius 999, Surface/Error/Dark, clips content)
├── Rectangle 34624493 (shine)  60×52 at x −49 → 321, white parallelogram, opacity 20 %, layer blur 4
├── Label "Complete ride"       Button/Moderate/Bold, Text/OnSurface/Inverse, centred, Title Case transform
└── Frame 2609191 (knob)        44×44 at 4, 4, radius 50, Mapped-Red/Red-200
    └── Leading Icon            36×36 arrow (→), white
```

## Properties
| Prop | Type | Default | Figma |
|---|---|---|---|
| `label` | ReactNode | required | Label text |
| `onConfirm` | `() => void \| Promise<unknown>` | required | — (prototype) |
| `tone` | `"default" \| "blue" \| "black" \| "red"` | `"default"` | default = 433:38830 colour; others = D16 |
| `disabled` | boolean | `false` | not in Figma. Never set it in delivery (D17) |
| `loading` | boolean | follows the `onConfirm` promise | not in Figma |
| `threshold` | number (0–1) | `0.85` | not in Figma |
| `icon` | ReactNode | 36×36 arrow | Leading Icon |
| `aria-label`, `style`, other div props | | | |

### Tones
| Tone | Use | Track | Knob |
|---|---|---|---|
| `default` | trip steps (bike / auto / cab) | `--surface-error-dark` #c42925 (bound in Figma) | `--mapped-red-red-200` #ff837c (bound) |
| `blue` | delivery ARRIVED | raw #2b72ee → `--surface-information-dark` #146edc | raw #4186ff → `--mapped-blue-blue-300` #5ca2f6 |
| `black` | delivery PICKED, DELIVERED | raw #000000 (1:3155, 1:3238) → `--surface-neutral-black` | raw #333333 → `--mapped-gray-gray-800` #253041 |
| `red` | delivery REACHED | from a screenshot → `--surface-error-dark` | → `--mapped-red-red-200` |

`default` and `red` render the same. They are kept apart so delivery code names the step colour (D16) and the trip
default can change on its own later.

## Values
| Part | Property | Value | Token / raw |
|---|---|---|---|
| Track | width | fills the container (328 at 360) | raw |
| Track | height | 52, as `min-height` | `--button-button-height` (bound) |
| Track | radius | 999 | `--button-radius` (bound) |
| Track | padding | 4 top/bottom, 56 left/right (4 + 44 knob + 8) | raw, code only: keeps the label clear of the knob |
| Knob | size / position / radius | 44 × 44 / x 4, y 4 / 50 | raw |
| Knob icon | size / colour | 36 × 36 / white | raw / `--surface-neutral-white` |
| Knob icon | path | `M24.26 19.5H6v-3h18.26l-8.4-8.4L18 6l12 12-12 12-2.14-2.1z` | Figma "Leading Icon" |
| Label | text style | `Button/Moderate/Bold` (Inter Bold 16/20) | `textStyles["Button/Moderate/Bold"]` |
| Label | colour | `Text/OnSurface/Inverse` #f6f7f9 | `--text-onsurface-inverse` (bound) |
| Shine | box | 60 × 52, parallelogram (21.9,0)(60,0)(40.6,52)(0,52) | raw |
| Shine | fill / blur | white, opacity 20 % / layer blur 4 | raw |
| Shine | travel | x −49 → x 321 (track width − 7) | raw |
| Knob nudge | travel | x 4 → 34 → 4 | raw |
| Threshold | release past | 85 % of travel (track width − 52) | code |
| Snap back / settle | transition | `transform 200ms ease-out` | code, not in Figma |
| Hint loop | duration | 2.4 s, ease-in-out, infinite | code, not in Figma |

## States
| State | Look | Behaviour |
|---|---|---|
| Rest | tone colours; shine sweeps and knob nudges right (hint loop) | drag the knob, or focus and press Enter / Space |
| Dragging | knob follows the finger, clamped to the track; hint stops | release ≥ 85 % → confirm; < 85 % → snap back |
| Loading | knob held at the right end with a 20 px spinner in place of the arrow; `aria-busy` | input ignored until the `onConfirm` promise settles (or `loading` turns false), then the knob returns to rest |
| Disabled | `--surface-neutral-light` track, `--surface-neutral-medium` knob, `--text-onsurface-disabled` label, no hint | `aria-disabled`, not focusable, no drag. **Not used in delivery (D17).** |
| Focus | 2 px `--border-neutral-black` outline, offset 2 | code only |
| Reduced motion | no shine, no nudge, no spinner rotation, no snap transition | under `prefers-reduced-motion: reduce` |

## Rules
- **R02, long labels:** the label wraps (up to 2 lines at 328 wide) and is never truncated. Figma sets `nowrap` and
  `text-overflow: ellipsis`; the code removes both and uses `min-height`, so a long Indian-language label grows the track
  (2 lines → 72 high). The knob stays vertically centred.
- **Label case:** pass the label as it should read. Figma applies a Title Case transform (trip) and the delivery file
  uses upper case (ARRIVED); the code applies no transform, since case does not exist in Indian scripts.
- **Accessibility:** the whole track is one `role="button"`; its name is the label (or `aria-label`). The knob is
  `aria-hidden`. Enter and Space confirm, so keyboard and switch users never have to drag.
- **One per screen**, full width at the bottom, 16 from the screen edges.

## React API
```tsx
<SwipeButton label="Complete ride" onConfirm={completeRide} />            // trip, default tone
<SwipeButton tone="blue"  label="ARRIVED"   onConfirm={markArrived} />    // delivery (D16)
<SwipeButton tone="black" label="PICKED"    onConfirm={() => api.picked()} />  // promise → loading state
<SwipeButton tone="red"   label="REACHED"   onConfirm={markReached} />
```

## Inconsistencies / gaps
- **Bundle Orders 247:24218 has no slider.** Its bottom CTA (281:123752) is a 48-high yellow tap `CTA` "Go To 2nd Order"
  from the older Rapido Design System. The D02 option B evidence for Bundle Orders could not be confirmed on this frame.
- **Delivery uses an older slider:** 50 high, radius 4, a 50 × 50 square knob with a 2 px stroke arrow, Noto Sans
  SemiBold 14/20 upper case. Only its colours are kept (D16); shape, knob and type follow the D02 option B slider.
- **Delivery colours are raw hexes** (#2b72ee / #4186ff, #000 / #333333) that match no token; mapped to the nearest
  Runway tokens above. The REACHED red comes from an image of the live app (1:3220), so its exact value is unknown.
- **Animation timing** is not in Figma (no prototype or motion data on 433:38829); the 2.4 s hint loop and the 200 ms
  snap are code choices.
- **Not in Figma:** disabled, loading, focus, pressed/dragging and the confirm threshold.
- The knob radius is 50 on a 44 knob (round); the icon is raw white, not bound to a token.
