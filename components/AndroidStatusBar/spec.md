# AndroidStatusBar

**Figma:** page *Header components* → component `Android status bar`
([701:124217](https://www.figma.com/design/GEdvNUzFqwB2gAbQKZRsIn/?node-id=701-124217)), single component, no variants.
No description is set in Figma.

## Purpose / when to use
Inferred from the design (no Figma description): a mock of the Android system status bar (Wi-Fi, cellular, battery, clock)
placed at the very top of a screen mock-up. It is embedded (hidden by default) in **HomepageHeader**
(`Show Android Status Bar`) and **InternalPageHeader** (`Android status bar`). In a real Android app the OS draws this bar,
so in production code it is only useful for prototypes / screenshots.

## Anatomy
```
Android status bar (auto-layout vertical, padding 6/16/6/16, gap 10, align centre / right (MAX), fill-width × hug)
└── Icons (auto-layout horizontal, gap 4, hug × hug, vertically centred)
    ├── wifi      (group 18.05 × 16: 16×16 white "bounds" + 18.05×14 boolean shape)
    ├── cellular  (group 16 × 16: bounds + 14×14 shape)
    ├── battery   (group 16 × 16: bounds + 9×14 shape)
    └── 12:30     (text, 36 × 16, right-aligned, auto-height)
```

## Properties
None (no variant, boolean, text or instance-swap properties). The clock text "12:30" is a plain text layer.

## Values
| Part | Property | Value | Token / binding |
|---|---|---|---|
| Root | size | 360 × 28 (fill width, hug height) | raw |
| | padding | 6 / 16 / 6 / 16 | raw |
| | gap | 10 | raw (only one child, so it has no effect) |
| | alignment | children aligned right (counter axis MAX), centred vertically | — |
| | fill | #ffffff | `Colors - Semantic Tokens/Surface/Neutral/White` |
| | radius / stroke / effects | none | — |
| Icons row | gap | 4 | raw |
| Icon glyphs (wifi, cellular, battery shapes) | fill | #aeb6c3 | **remote** style `Color/Palette/Gray/400` (not a local variable) |
| Icon "bounds" boxes | fill | #ffffff | **remote** style `Color/Palette/White` |
| Clock "12:30" | font | **Roboto Medium 14, line height auto, letter spacing 0** — no text style | raw |
| | fill | #aeb6c3 | **remote** style `Color/Palette/Gray/400` |
| | alignment | right | — |

Implementation: the remote `Color/Palette/Gray/400` (#aeb6c3) is mapped to the local `--base-gray-gray-400` (same hex);
`Color/Palette/White` → `--base-neutral-white`. Roboto is kept as specified in Figma (it imitates the Android system font)
with a fallback to `--cap-app-typeface`.

## States
None.

## Inconsistencies / gaps found
- All icon and clock colours use **remote paint styles** (`Color/Palette/Gray/400`, `Color/Palette/White`) from another library
  instead of local variables.
- The clock uses **Roboto Medium 14** with no text style and no variables — the only non-Inter text on this page.
- The icons are vector groups drawn inside the component, not instances of the Icons library; the code takes them as a `ReactNode`.
- Main component height is 28, but every instance on this page (in HomepageHeader and InternalPageHeader) has a
  **height/width override to 360 × 32**.
- Gap 10 on the root is set but has no effect (single child).
