# CommsTemplates

**Figma:** page *Communication design* → component set `Comms Templates`
([2429:4649](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2429-4649)), 4 variants.
No description or annotations are set in Figma; the page contains only this component set (no documentation text) and
no instances of it exist on the page.

## Purpose / when to use
*Inferred from variant names only:* fixed-size canvases (artboards) for marketing / communication creatives —
CT banners, Pitch Center cards, Storyly stories and in-app notification banners. Figma provides **only the
frame size**; all creative content (image, copy, CTA) is supplied by the comms team, so the implementation takes the
content as a prop.

## Anatomy
```
Comms Templates / Property 1=<variant>  (component, no auto-layout, clips content)
└── (empty — no child layers in any variant)
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| Property 1 | variant | **CT Banners**, In-App Notification Banners, Pitch Center, Storyly |

No boolean, text or instance-swap properties.

## Variants
| Variant | Node | Width × Height | Fill | Radius | Stroke | Effects | Clip |
|---|---|---|---|---|---|---|---|
| CT Banners | [2429:4648](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2429-4648) | 360 × 640 | raw #ffffff | 0 | none | none | yes |
| Pitch Center | [2429:4647](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2429-4647) | 264 × 352 | raw #ffffff | 0 | none | none | yes |
| Storyly | [2429:4646](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2429-4646) | 360 × 720 | raw #ffffff | 0 | none | none | yes |
| In-App Notification Banners | [2429:4645](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=2429-4645) | 328 × 160 | raw #ffffff | 0 | none | none | yes |

Sizes are fixed (raw, unbound). Aspect ratios: CT Banners 9:16, Pitch Center 3:4, Storyly 1:2, In-App Notification 41:20.
The white fill is unbound (same hex as `Surface/Neutral/White`); the implementation uses `--surface-neutral-white`.

## Implementation
`CommsTemplates.tsx` renders a fixed-size, clipped box per variant. Pass the creative as `image` (a URL, rendered with
`object-fit: cover`) and/or arbitrary `children` (overlaid copy/CTA). Nothing else is specified in Figma.

## Inconsistencies / gaps found
- **All four variants are empty frames** (white, no children): no image slot, text, CTA, safe-area, radius or typography is
  defined. Everything beyond the canvas size is unspecified.
- Fill #ffffff is unbound (no token).
- Variant property is named the default "Property 1".
- No guidance on scaling (fixed px vs. responsive to screen width) for any template.
