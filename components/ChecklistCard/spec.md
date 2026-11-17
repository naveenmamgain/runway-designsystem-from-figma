# ChecklistCard (Figma: New Onboarding step card "card-Driving licence")

**Figma:** New Onboarding file `ziTJqlUlTBuE27ZytNvCTi`. **Not a component**: the card is a set of loose frames, all named
`card-Driving licence`, repeated per screen. Sources measured:

| Frame | Node | What it shows |
|---|---|---|
| Checklist with pending banner | [1348:25620](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1348-25620) → list 1348:25670 | Bike *Selected* (no trailing) · Selfie *Under Verification* + hourglass · Aadhaar + yellow **Upload** |
| Checklist, 2 steps left | [1348:25756](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1348-25756) | Bike *Selected* · Selfie + outline **Upload** · Aadhaar + outline **Upload** |
| Verifying documents | [2663:2420](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=2663-2420) | Selfie and Aadhaar both *Under Verification* + hourglass |
| Vehicle details card | [2594:2355](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=2594-2355) | Text tile "RC" + yellow **Upload** |
| Document Centre (reference) | [1015:27636](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1015-27636) | Older card: no tile, *Incomplete* caption, chevron |
| Logistics Verify Merch (replaced) | [4417:37326](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4417-37326), [4421:38379](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4421-38379) (Logistics file `nJVb4xUWWcmIUArw5sAxIv`) | Photo thumbnail + task name + arrow; failed variant adds *Failed! Retry* |

A hidden verified badge (`Frame 2608732`, 1348:25724: green circle + white check) sits in a hidden fourth card of 1348:25620; it is used as the verified trailing glyph.

`preview.png` = Figma screenshot of 1348:25670 (the three cards in 1348:25620).

## Purpose / when to use
Chosen in design review as the **single row for verification and task status** across the captain app. Use it for:
onboarding steps, document upload / verification lists (Document Centre), merch verification tasks (Verify Merch), and
home nudge rows that point to a pending task. One card = one task; stack cards with a 12px gap (as in 1348:25670).

Status wording rule (decision **D13**): the coloured caption is allowed **only inside this row**. A status label that stands
on its own elsewhere uses `Tag` (`components/Tag`).
Text rule (**R02**): label and caption each wrap to 2 lines and the card grows; nothing is clipped by a fixed height.

## Anatomy
```
ChecklistCard (horizontal, align centre, gap 12*; padding 16; min-height 78; radius 16;
│              fill Mapped-Neutral/White; stroke 1 Mapped-Gray/Gray 100; shadow 0 2 6 rgba(30,41,59,.04))
├── Media tile (42×42, radius 8, fill Mapped-Gray/Gray 50, clips)   — optional
│   ├── icon  → 36×36 content (illustration, icon or text like "RC")
│   └── thumbnail → image, object-fit cover, fills the tile
├── Text (vertical, gap 2, fills width, centred)
│   ├── Label        Title/2X-Small/SemiBold, ≤2 lines
│   └── Status line  Body/Small/Med, colour per status, ≤2 lines — optional
└── Trailing (hugs, max 45% of width)                               — optional
    ├── Button size Small "Upload" / "Upload Again" (Primary-Default or Secondary-Default)
    ├── Hourglass 24×24 (in progress)
    ├── Verified badge 24×24 (verified)
    └── Right Arrow_Stroke 24×24 (tappable card with no other trailing)
```
\* Figma uses SPACE_BETWEEN with no gap between text and trailing; a 12px gap is added so long text never touches the pill.

## Properties
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | ReactNode | — (required) | Figma "card-title" |
| `status` | `"todo" \| "inProgress" \| "verified" \| "failed" \| "optional"` | `"todo"` | Sets caption colour and default trailing |
| `statusText` | ReactNode | — | Caption text; omitted = no status line (as in Figma to-do rows) |
| `icon` | ReactNode | — | Icon tile content (36×36) |
| `thumbnail` / `thumbnailAlt` | string | — / `""` | Photo tile; overrides `icon` |
| `actionLabel` | ReactNode | — | Renders a `Button` size Small in the trailing slot |
| `onAction` | () => void | — | Pill tap; falls back to `onPress` |
| `actionVariant` | `"primary" \| "secondary"` | `"secondary"` | Primary-Default (yellow, the next step) or Secondary-Default (outline) |
| `onPress` | () => void | — | Whole card is the tap target (`role="button"`, Enter/Space) |
| `trailing` | ReactNode \| null | auto | Replaces the trailing slot; `null` hides it |

The Figma frames have no variant/boolean/text properties (they are not components); everything above is derived.

## Layout values
| Part | Property | Value | Token |
|---|---|---|---|
| Card | padding | 16 all sides | raw |
| | min-height | 78 (Figma: fixed height 78) | raw |
| | corner radius | 16 | raw |
| | fill | #ffffff | `Mapped-Neutral/White` → `--mapped-neutral-white` |
| | stroke | 1, #eceef2 | `Mapped-Gray/Gray 100` → `--mapped-gray-gray-100` |
| | shadow | drop 0 2 6 0, rgba(30,41,59,0.04) | raw (no effect style) |
| | gap tile → text | 12 | raw |
| | gap between stacked cards | 12 | raw (list frame 1348:25670) |
| Media tile | size | 42 × 42, content 36 × 36 | raw |
| | radius | 8 | raw |
| | fill | #f6f7f9 | `Mapped-Gray/Gray 50` → `--mapped-gray-gray-50` |
| Text column | gap | 2 | raw |
| Label | text style | `Title/2X-Small/SemiBold` (16/24, 600) | `textStyles["Title/2X-Small/SemiBold"]` |
| | colour | #1e2229 **unbound** | nearest `Text/OnSurface/Default` (#1a202a) → `--text-onsurface-default` |
| Status line | text style | `Body/Small/Med` (14/20, 500) | `textStyles["Body/Small/Med"]` |
| Upload pill | instance | `Buttons` 80×32 (min-width 80, radius 999, padding 8/12) | Runway `Button` size Small |
| Trailing glyph | size | 24 × 24 | raw |
| "RC" text tile | font | Inter Bold 16, line-height normal, `Mapped-Brand/Primary-B` (#1e4b82) | **no text style**; pass as `icon` |

## States
| State (`status`) | Figma example | Caption colour | Default trailing |
|---|---|---|---|
| to do | Selfie / Aadhaar "Upload" (1348:25756, 1348:25620) | `Text/Neutral/Medium` ¹ (no caption in Figma) | `actionLabel` pill if given, else arrow if `onPress`, else none |
| in progress / verifying | "Under Verification" (2663:2420) | `Mapped-Orange/Orange 300` (#f46d0b) | hourglass, `Mapped-Orange/Orange 300` ² |
| verified | "Selected" (Bike, 1348:25620) | `Text/Success/Dark` (#058743) | verified badge `Mapped-Green/Green 600` (#0a6b38) ³ |
| failed / retry | "Failed! Retry" (Logistics 4421:38379) | `Text/Error/Dark` (#c42925) | `actionLabel` pill (e.g. "Upload Again") if given, else arrow if `onPress` |
| optional | — (no Figma example) | `Text/Neutral/Medium` ¹ | as to do |

Media: `thumbnail` covers the Verify Merch photos (T-shirt selfie, Bag, Raincoat); `icon` covers onboarding illustrations and the "RC" text tile.
Usage mapping for the replaced rows: Verify Merch to-do → `thumbnail` + `onPress` (arrow); failed → `status="failed" statusText="Failed! Retry"`;
Document Centre "Incomplete" → `status="todo" statusText="Incomplete" onPress`; completed documents → `status="verified"`.

¹ No Figma colour for to-do/optional captions; chosen so they don't read as in-progress.
² Figma uses an orange illustration (`hourglass_254516 1`, 2 vector groups, not a Runway icon); code uses Material outlined `hourglass-bottom` tinted with the same token.
³ Badge from hidden layer 1348:25724; fill is raw #0a6b38 in the exported SVG, matched to `--mapped-green-green-600`.

## Inconsistencies / gaps found
- **Not a component in Figma**: every card is a detached frame named `card-Driving licence` (even for Bike/Selfie/Aadhaar); structure differs between cards (extra nested `card-content` frames, hidden duplicate `card-title`/`card-description` texts).
- **Pill emphasis varies**: Aadhaar "Upload" is yellow Primary in 1348:25620 / 2594:2355 but outline Secondary in 1348:25756. Exposed as `actionVariant`; suggested rule: Primary for the single next step, Secondary otherwise.
- **Label colour #1e2229 is unbound** (no variable); mapped to `--text-onsurface-default` (#1a202a).
- **Verified caption says "Selected"** (for the vehicle choice), not "Verified"; there is no verified document example. The verified badge exists only on a hidden card.
- **In-progress colour** uses palette `Mapped-Orange/Orange 300`, not the semantic `Text/Warning/Dark` (#ca4900); Document Centre "Incomplete" (to-do) also uses Orange 300, so to-do and in-progress look the same there.
- **Hourglass is an illustration**, not an icon from the Runway icon set.
- **Card fixed height 78** in Figma clips 2-line text; made min-height (R02). Figma also has no gap between text and trailing (SPACE_BETWEEN).
- **Shadow** `0 2 6 rgba(30,41,59,.04)` is not an effect style; Logistics rows and Document Centre use `Elevation/S` (0 0 4 rgba(16,16,16,.16)) instead.
- **Logistics rows differ** (replaced): radius 12, padding 12, gap 8, stroke `Border/Neutral/Light` (#e0e3e6), `Elevation/S`, 44×44 thumbnail with no tile fill or radius, label `Body/Moderate/Med`, caption `Body/Small/Reg`. Their thumbnails now sit in the 42×42 tile (radius 8, cover).
- **Document Centre cards differ** (replaced): radius 8, no tile, label `SubTitle/Small/Med`, caption `Label/Moderate/Med`, chevron instead of arrow.
- **"RC" text tile** uses raw Inter Bold 16 (no text style) in `Mapped-Brand/Primary-B`.
- **Button Small has a fixed height** (`--button-button-height`), so its 2-line label clamp would clip; ChecklistCard overrides height to auto. The Button component itself is unchanged and still violates R02.
- **D13 gap**: Runway `Tag` has only a white variant; the success / warning / error / neutral Tags that D13 assumes for standalone labels don't exist yet.
- **Not verified**: home nudge rows (no Figma node given), an `optional` state example, pressed/disabled card states, and the exact hourglass and RC tile artwork (not exported as assets).
