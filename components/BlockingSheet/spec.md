# BlockingSheet (composition of BottomSheet + Button)

**Figma model:** Face Auth `n6MeDvD6KOl4x8gdY7Lqmm` → frame *Off duty*
([1305:3878](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-3878)). Its sheet layers are named like the Runway
`Bottom Sheet` (1549:8554) Full Illustration variant (*Bottom Sheet → Close Icon → Container → Illustration Boulding Box*), with the
Text Box slot filled and the buttons moved into the content.
Other evidence: [1187:7110](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1187-7110) (badge layout, "Orders blocked
for 2 hours"), [1218:4023](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1218-4023) (same, Hindi). Checklist page model:
Logistics `nJVb4xUWWcmIUArw5sAxIv` → *Verify Merch* ([4417:37326](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4417-37326)).
Not a Figma component — no component set, no description.

**Decision: composition, not a new component.** `BottomSheet` already gives the 75 % scrim, the floating × above the sheet
(D09 = A), the white container (radius 16/16/0/0, max-height 632) and a 360×180 illustration slot. Everything below the image goes
into its `textBox` slot; its elevated CTA bar is switched off because 1305:3878 places the buttons inside the content. No change to
`BottomSheet` was needed.

## Purpose / when to use
Decision D01. A task blocks the captain from working (face auth, documents, dues, training…). Show this sheet:
- when the captain switches the duty toggle from **off duty to on duty**, and
- when the **home page opens**.

Structure: **image → heading → content written for the context → one CTA** (two when the use case needs a second choice).
- **Single task:** the primary CTA starts the task (e.g. "Start" opens the selfie camera).
- **Multi-step task:** the primary CTA opens a full **task checklist page** that lists the steps vertically as Checklist cards
  (model: Logistics Verify Merch 4417:37326; cards: [ChecklistCard](../ChecklistCard/spec.md)). That page is not part of this component.
- **Blocked / failed (P14):** use `imageLayout="badge"` and `tone="error"`, one reason line, primary "OK".
  Re-shown each time the captain tries to go on duty.
- Side-effect confirmations stay on **P15** (confirm sheet with consequence warning); a `note` here is for the consequence of the task
  itself (e.g. "Rapido will take strict action").

Rules applied: R11 (always dismissible: `onDismiss` is required and drives the ×), D05 (primary is yellow = moves the captain forward;
second CTA is white/secondary), D09 = A (× floats on the scrim, top-right), D12 = B (error title is red).

## Anatomy
```
BottomSheet (scrim 360×720, Overlays/Large 75 % black, vertical, align end/end, gap 16)
├── Close Icon (padding 4/16/4/16) → Close_Stroke 24×24, white            ← onDismiss
└── Container (radius 16/16/0/0, fill white, max-height 632; Figma: gap 32, padding-bottom 24)
    ├── Illustration (360×180, clips)                                       ← image   [imageLayout="full"]
    └── Content (padding 0/24/0/24, gap 32)
        ├── Badge illustration 124×124                                      ← image   [imageLayout="badge"]
        ├── Text Box (gap 20)
        │   ├── group (gap 12) → Title, Body (bullets: one "Body" row each)  ← title, body
        │   └── Note box (Red 50, padding 8, radius 8)                      ← note (optional)
        └── Vertically Stacked Buttons (gap 12)
            ├── Button Large Primary-Default (yellow)                       ← primaryAction
            └── Button Large Secondary-Default (white)                      ← secondaryAction (optional)
```

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| image | ReactNode | — | Required. Full: 360×180. Badge: 124×124 with the status badge drawn into the art. |
| imageLayout | "full" \| "badge" | "full" | full = 1305:3878; badge = 1187:7110 / P14. |
| title | ReactNode | — | Required. `Title/Moderate/Bold`. |
| body | ReactNode \| ReactNode[] | — | Array → bullet list (one row per item, gap 12). |
| note | ReactNode | — | Optional red note box. |
| tone | "default" \| "error" | "default" | error → title `Text/Error/Dark` (D12 = B). |
| primaryAction | { label, onClick? } | — | Required. Yellow. |
| secondaryAction | { label, onClick? } | — | Optional. White/secondary, below primary. |
| onDismiss | () => void | — | Required (R11). The × calls it. |
| closeIcon | ReactNode | — | Pass `assets/icons/custom/close-stroke.svg`. |

Other HTML attributes pass through to the BottomSheet root.

## Values (from `get_design_context` on 1305:3878)
All spacing, sizes and radii are raw (no variable bound). Colours map to `tokens/tokens.css`.

| Part | Property | Figma value | Implementation |
|---|---|---|---|
| Scrim | fill | `Overlays/Large (75% Black)` | BottomSheet → `--overlays-large-75pct-black` |
| | size / layout | 360×720, vertical, align end/end, gap 16 | BottomSheet |
| Close Icon | padding / icon | 4/16/4/16 / `Close_Stroke` 24×24 | BottomSheet (`onClose` = onDismiss) |
| Container | fill / radius / max-h | white (raw) / 16/16/0/0 / 632 | BottomSheet → `--surface-neutral-white` |
| | gap / padding | 32 / 0 0 24 0 | Content padding-top 32, bottom 24 |
| Illustration | size | 360×180, clip; image 564×290 centred (−8, +21) + radial fade to `rgba(196,215,245,1)` at the edge | BottomSheet illustration slot; crop/fade belong to the art |
| Content | padding / gap | 0/24/0/24 / 32 | raw |
| Text Box | gap | 20 | raw |
| Title + body group | gap | 12 | raw |
| Title | style / colour | `Title/Moderate/Bold` / `Text/OnSurface/Default` (#1a202a) | `textStyles["Title/Moderate/Bold"]`, `--text-onsurface-default` |
| Title (tone=error) | colour | — (D12 = B; not in this frame) | `--text-error-dark` (#c42925) |
| Body | style / colour | `Body/Moderate/Reg` / `Text/OnSurface/Default` | `textStyles["Body/Moderate/Reg"]` |
| Bullet | list | disc, indent 24 (`ms-24`) | `padding-left: 24` |
| Note box | fill | `Mapped-Red/Red 50` (#fff2f1) | `--mapped-red-red-50` |
| | padding / radius / size | 8 / 8 / 312×80 fixed | 8 / 8 / fills width, hugs height |
| Note text | style / colour | `Body/Moderate/Reg` / `Text/Error/Dark` (#c42925); "Note" run raw Inter Bold 16/24 | `--text-error-dark`; caller wraps "Note" in `<b>` |
| Buttons | stack | vertical, gap 12, fill width (312) | raw |
| Primary | instance | `Buttons` Large Primary-Default, 52 high, fill `Mapped-Yellow/Yellow 400` (#ffca20), label `Button/Moderate/Bold` | `Button` component |
| Secondary | instance | not in the frame | `Button` Large Secondary-Default (as BottomSheet's vertical stack) |

### Badge layout (`imageLayout="badge"`)
Built on BottomSheet Type=Empty (padding 24, gap 32) so no 180 slot is reserved. Image 124×124 at the left, then the same Text Box
and buttons. 1187:7110 itself uses padding 28/24/24/24, gap 28, title `SubTitle/Large/Bold`, a raw 60 % black scrim and an
`X/Regular` close — a detached, older build; the Runway rhythm of 1305:3878 is used instead.

## States
No states of its own. Buttons carry their own Pressed/Disabled. Scrolls inside max-height 632 when content is long.

## Inconsistencies / gaps found
- 1305:3878 drops BottomSheet's elevated CTA bar and the Text Box's 0/8 inner padding; Content uses 24 side padding and gap 32.
  This is expressed through BottomSheet's slots, not by changing BottomSheet.
- Note box height is fixed at 80 in Figma; implementation hugs. It is the error variant of the planned Inline alert (C03) — swap in
  that component when it exists.
- "Note" bold run uses raw Inter Bold, not a text style.
- Illustration crop (image 564×290 inside 360×180) and radial fade are baked into the frame, not a slot property; ship them as part of the art.
- 1187:7110 / 1218:4023 differ from 1305:3878 (scrim, padding, title style, close icon) — see Badge layout.
- No red-title sample exists in Face Auth; the error tone follows D12 = B, not a frame.
