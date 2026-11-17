# Runway patterns

How Runway components are put together into captain-app screens. Derived from a full review of 10 Figma files (364 pages, ~6,100 frames) and confirmed card by card by the design owner on 2026-11-16 (101 cards).

**Before designing a screen:** find the matching pattern below and follow its structure; check [decisions](decisions.md) and [rules](rules.md). Never use a pattern marked *Rejected*. If nothing fits, say so instead of inventing one.

| File | Contents |
|---|---|
| [decisions.md](decisions.md) | 15 decisions where the Figma files disagreed |
| [rules.md](rules.md) | 11 rules for every screen |
| [pages.md](pages.md) | Pages: 12 patterns |
| [overlays.md](overlays.md) | Overlays (sheets, cards, snackbars): 14 patterns |
| [home.md](home.md) | Home: 6 patterns |
| [orders.md](orders.md) | Orders: 12 patterns |
| [progress.md](progress.md) | Progress and status: 4 patterns |
| [components-roadmap.md](components-roadmap.md) | Which new components to build, defer or skip |

## Quick index

| ID | Pattern | Status |
|---|---|---|
| [P01](pages.md#p01) | Task checklist page | Keep |
| [P02](pages.md#p02) | Document upload page | Keep |
| [P03](pages.md#p03) | Camera capture → preview → verify | Keep |
| [P04](pages.md#p04) | Programme hub with sticky action footer | Keep |
| [P05](pages.md#p05) | Tabbed tracker list with search | Keep |
| [P06](pages.md#p06) | Contact picker with invite | Keep |
| [P07](pages.md#p07) | Person detail with reminder panel | Keep |
| [P08](pages.md#p08) | Document Centre | Rejected |
| [P09](pages.md#p09) | Full-screen intro takeover | Keep |
| [P10](pages.md#p10) | Time-bound offers page | Rejected |
| [P11](pages.md#p11) | Payment collection page | Keep |
| [P12](pages.md#p12) | Wallet home and add UPI | Keep |
| [P13](overlays.md#p13) | Explainer sheet before a task | Keep |
| [P14](overlays.md#p14) | Single-message sheet (blocked / rejected / info) | Keep |
| [P15](overlays.md#p15) | Confirm sheet with consequence warning | Keep |
| [P16](overlays.md#p16) | 'Please wait' progress card | Keep |
| [P17](overlays.md#p17) | Success card on dim background | Keep |
| [P18](overlays.md#p18) | Outcome sheet with tinted header | Keep |
| [P19](overlays.md#p19) | Not-eligible explanation | Rejected |
| [P20](overlays.md#p20) | Celebration card | Keep |
| [P21](overlays.md#p21) | Consent checkbox unlocks the button | Keep |
| [P22](overlays.md#p22) | Coachmark with audio | Keep |
| [P23](overlays.md#p23) | Floating help button (Saathi / Captain Assist) | Keep |
| [P24](overlays.md#p24) | Snackbar for settings saved to the server | Keep |
| [P25](overlays.md#p25) | Inline banners (info / note / important) | Keep |
| [P26](overlays.md#p26) | Vendor verification hand-off | Undecided |
| [P27](home.md#p27) | Home that changes with duty state | Keep, with changes |
| [P28](home.md#p28) | Map card with layer pills | Keep |
| [P29](home.md#p29) | Home modules | Rejected |
| [P30](home.md#p30) | Nudge card in the order list | Keep |
| [P31](home.md#p31) | Programme entry points | Keep, with changes |
| [P32](home.md#p32) | Copilot chat | Rejected |
| [P33](orders.md#p33) | Order card themed by order type | Keep |
| [P34](orders.md#p34) | Order list with side tabs | Keep |
| [P35](orders.md#p35) | Voice order alert | Keep |
| [P36](orders.md#p36) | Accept again / Only for you | Keep |
| [P37](orders.md#p37) | Order alert over other screens | Keep |
| [P38](orders.md#p38) | Order tag row | Keep |
| [P39](orders.md#p39) | Filter pill with attached panel | Keep |
| [P40](orders.md#p40) | No orders: search, refresh, check account | Keep |
| [P41](orders.md#p41) | Bundle order alert | Keep |
| [P42](orders.md#p42) | Between bundle orders | Keep |
| [P43](orders.md#p43) | End of order | Keep |
| [P44](orders.md#p44) | Multistop route | Keep |
| [P45](progress.md#p45) | Progress tracker card | Keep |
| [P46](progress.md#p46) | Milestone timeline | Keep |
| [P47](progress.md#p47) | Onboarding status checklist | Keep |
| [P48](progress.md#p48) | Earning-loss nudge inside a card | Undecided |

## Example: Verify Merch

Captain taps **Go on duty** while merch is unverified → [BlockingSheet](../components/BlockingSheet/spec.md) (image, "Verify your merch", one-line reason, yellow **Verify now**) → [P01 Task checklist page](pages.md#p01): Internal Page Header with Help, hero image, three ChecklistCards (T-shirt selfie, Bag, Raincoat), sticky disabled **Complete** until all are verified, tertiary link "Apply for merch →".

Sources: `research/pattern-catalogue.json`, `research/decisions.json`. Regenerate: `python3 research/build_patterns.py`.
