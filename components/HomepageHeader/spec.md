# HomepageHeader

**Figma:** page *Header components* → component set `Homepage Header`
([715:125593](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=715-125593)), 2 variants:
`Duty Type=Off duty` ([701:124907](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=701-124907)),
`Duty Type=On Duty` ([715:125594](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=715-125594)).
No description is set in Figma.

## Purpose / when to use
Inferred from the design (no Figma description): the app bar of the captain's home screen — menu on the left, the
**DutyToggle** in the centre, and two action icons (GTA / location and notifications) on the right.
For inner screens with a title and back arrow use **InternalPageHeader**.

The frame `Today's Earnings Accordian` (3291:9380) on the same page is **not** part of this component (it is a separate,
non-component frame and is not referenced by either variant).

## Anatomy
```
Homepage Header (vertical, padding 0, gap 0, align left / centre, fill width × hug; 360 × 66; Elevation/S)
├── Android status bar  (instance of AndroidStatusBar, hidden by default ← Show Android Status Bar)
└── Header (horizontal, padding 12/16/12/16, gap 27, SPACE-BETWEEN / centre, fill width × hug; 360 × 66)
    ├── Leading Icons (horizontal, gap 10, fill width (56) × hug)
    │   └── Hamburger Menu (24 × 24)               ← Leading Icon (instance swap)
    ├── Duty Toggle (instance of DutyToggle, 162 × 42; variant follows Duty Type)
    └── Trailing Icons (horizontal, gap 8, hug × hug; 56 × 24)
        ├── GTA / State=Default (24 × 24)         ← 1st Trailing Icon (instance swap)
        └── Notification (24 × 24)                ← 2nd Trailing Icon (instance swap)
```

## Properties
| Property | Type | Values (default **bold**) |
|---|---|---|
| Duty Type | variant | **Off duty**, On Duty |
| Show Android Status Bar | boolean | **false** |
| Leading Icon | instance swap | default `Hamburger Menu` (701:124212, page Icons); 1 preferred value |
| 1st Trailing Icon | instance swap | default `GTA / State=Default` (1112:4248, page Icons); preferred value = the `GTA` set |
| 2nd Trailing Icon | instance swap | default `Notification` (701:124506, page Icons); 1 preferred value |

`Duty Type=Off duty` uses `Duty Toggle / Property 1=Off Duty`; `On Duty` uses `Property 1=On Duty`. Nothing else differs
between the two variants (verified).

## Values
| Part | Property | Value | Token / binding |
|---|---|---|---|
| Root | size | 360 × 66 (fill × hug) | raw |
| | fill | #ffffff | `Colors - Semantic Tokens/Surface/Neutral/White` |
| | effect | `Elevation/S` (drop shadow 0,0 blur 4) | local effect style → `--elevation-s` |
| | padding / gap / radius / stroke | 0 / 0 / none / none | — |
| Android status bar | size | 360 × 32 (instance override; main component is 28) | raw |
| Header row | padding | 12 / 16 / 12 / 16 | raw |
| | gap | 27 (space-between, so the gap is a minimum) | raw |
| | alignment | space-between, vertically centred | — |
| Leading Icons | size / gap | 56 × 24, fill width, gap 10 | raw |
| Icons (all three) | size | 24 × 24 | raw |
| | colour | Hamburger Menu and Notification vectors #000000 **unbound** | raw |
| Trailing Icons | gap | 8 | raw |
| Duty Toggle | | see [DutyToggle](../DutyToggle/spec.md) | |

## States
Only the Duty Type variants (Off duty / On Duty). No pressed / disabled states on the icons in this component.

## Inconsistencies / gaps found
- Variant value casing is inconsistent: `Off duty` vs `On Duty` (and DutyToggle uses `Off Duty`).
- Header gap **27** (raw) is an odd value outside the 4-pt scale; with space-between it only acts as a minimum.
- Leading Icons frame is *fill width* (56) while Trailing Icons is *hug* (56); they match only because both contain 56 px of content.
- Icon vectors are unbound #000000.
- Embedded Android status bar instance is overridden to 360 × 32 while the main component is 360 × 28.
