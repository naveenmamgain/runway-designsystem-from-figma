# Design decisions

Each decision settles a place where the Figma files disagreed. Confirmed 2026-11-16.

<a id="d01"></a>
## D01 · How does a blocking task reach the captain from home?

**Bottom sheet.** A blocking task (merch/gear check, document problem, low wallet, face auth…) shows a bottom sheet
when the captain switches **off duty → on duty**, and when **home opens** while the block is active.
- Sheet structure follows [Face Auth 1305:3878](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-3878): image → heading → content written for that block → one primary CTA;
  a second CTA only when the use case needs it. Component: [`BlockingSheet`](../components/BlockingSheet/spec.md).
- **Multi-step tasks:** the sheet's CTA opens a full task checklist page ([P01](pages.md#p01)); steps are listed
  **vertically** as [`ChecklistCard`](../components/ChecklistCard/spec.md)s, like [Logistics Verify Merch](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4417-37326).
- Not used: home status card as the entry, Action Centre list, red banner under the header.

*Why it came up:* Gear/merch checks, document problems and low wallet all stop a captain going online. The files show four different ways to surface them, and Home Page 2026 (final) shows none of them. This is what Claude guessed wrong on Verify Merch.

<a id="d02"></a>
## D02 · Trip steps: tap or swipe?

**By vehicle mode.** E-rickshaw trip steps (Arrived / Start / Complete, and Post activation) use **tap + confirm sheet**.
Bike, auto and cab (including Bundle Orders) use **swipe**.

*Why it came up:* Arrived / Start ride / Complete ride. E-rickshaw's ✅ 'removing swipe from CTA' replaced swipe, but its ✅ Post activation page and Bundle Orders still use the slider.

<a id="d03"></a>
## D03 · Results and confirmations: centred card or bottom sheet?

**Split by purpose.** Centred card on a scrim for progress ("Please wait") and short success. Bottom sheet for
anything the captain has to read or decide (plan outcomes, blocked, failed).

*Why it came up:* Activation success is a centred card (My Plans), plan outcomes are a bottom sheet, 'Please wait' is a centred card, blocked/failed is a sheet, success over home is a centred card with no button.

<a id="d04"></a>
## D04 · Picking one option from several

**Both, by rule.** Simple options that need no explanation → radio list, always with **one confirm button in the
sticky footer** (as in "How you want to earn"). Options that need explaining (plans) → cards with **View details** that open a
detail page.

*Why it came up:* My Plans L1 uses cards each with 'View Details'. Bike SaaS, onboarding service choice and zone choice use radio cards with a sticky footer.

<a id="d05"></a>
## D05 · Primary button colour

**Yellow is the primary.** A page with one CTA → yellow. With two CTAs, **yellow is the action that moves the
captain forward**; the other is white (secondary). Navy/green themed primaries are not used.

*Why it came up:* Four primary styles in final pages: Runway yellow, dark navy pill (My Plans), green (plan intro), black/blue outline pills.

<a id="d06"></a>
## D06 · Page header

**Runway Internal Page Header only.** Add a **dark variant** (camera screens) and a **call action**.

*Why it came up:* Three headers are used for inner pages: Runway Internal Page Header, a different 'Internal page Header' from another library (camera, Assure, onboarding), and hand-built back/Help/call rows.

<a id="d07"></a>
## D07 · Wrong document uploaded

**Bottom sheet first.** Wrong document → sheet with the image, red error box, Retake + opt-out. If the captain
dismisses it, the page shows the **inline** error (red-bordered image, "Upload again").

*Why it came up:* The ✅ Doc classifier page shows both treatments for the same error.

<a id="d08"></a>
## D08 · One look for verification status

**One Checklist card everywhere.** The New Onboarding step card (icon tile or thumbnail, label, coloured status,
trailing pill/action) replaces the Logistics task row, home nudge rows and Document Centre cards.
Component: [`ChecklistCard`](../components/ChecklistCard/spec.md).

*Why it came up:* Status (to do / verifying / verified / failed) is drawn three ways: onboarding checklist cards, home nudge rows, Document Centre cards. Logistics has a fourth: the Verify Merch task row.

<a id="d09"></a>
## D09 · Close button on bottom sheets

**Floating ×.** Round close button on the scrim, top-right, above the sheet.

*Why it came up:* Most final sheets put a round × floating above the sheet on the dim background. Check against Runway Bottom Sheet.

<a id="d10"></a>
## D10 · Order alert card: follow the OA framework?

**Rebuild the Runway order card on the OA framework:** base / sub-service / contextual / preference buckets and
tag row. **Width follows the canvas** it sits on (e.g. 272 beside the 64px tab rail), not a fixed value. Theme variants are
left out for now (C20 skipped).

*Why it came up:* Runway's OA cards are split by vehicle (Bike/Auto/Cab) with no themes. The OA framework (May '26) splits by order type with themes and a max of 2 signals.

<a id="d11"></a>
## D11 · Snackbar after turning a setting off

**Neutral/dark snackbar** after turning a setting off. Success of any action is neutral or green; red only for failure.

*Why it came up:* Turning Go To Area off shows a red snackbar, the error colour, for a successful action.

<a id="d12"></a>
## D12 · Error sheet title colour

**Red title** on every error sheet.

*Why it came up:* Blocked/failed sheets use a red title in one place and a neutral title in another.

<a id="d13"></a>
## D13 · Status labels

**Runway `Tag`** for standalone status labels (success / warning / error / neutral). Coloured caption text only
inside a ChecklistCard row. No hand-made pills.

*Why it came up:* Statuses appear as coloured text, hand-made pills, or Runway Tag.

<a id="d14"></a>
## D14 · Bottom navigation

**Intercity bottom nav** ([Intercity 2072:113833](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-113833)) on every screen that has a bottom nav: round
mode-switch button on the left + floating pill with **Home · Jobs · Credit · Orders** (count badge on Orders).
The second tab is labelled **"Jobs"**. Component: [`BottomNavigation`](../components/BottomNavigation/spec.md).

*Why it came up:* Final Home of Orders uses a local 'Bottom Nav Final': Home + Orders pill (grey / black-open / yellow-with-count). Runway's samples are Home/Credit/Earnings. Home 2026 uses another library.

<a id="d15"></a>
## D15 · Optional step label

**Sentence case** for all button labels.

*Why it came up:* Opt-out buttons say 'I do not have a license' / 'I Do Not Have A License' / 'Upload later'.

<a id="d16"></a>
## D16 · Delivery: swipe button colour

**Delivery swipes are coloured by step:** blue **Arrived**, black **Picked** / **Delivered**, red **Reached**.
A deliberate exception to D05's yellow primary, for delivery swipes only. Component: [`SwipeButton`](../components/SwipeButton/spec.md).

*Why it came up:* Every delivery step is a full-width swipe (bike-type mode, so swipe per D02). The file colours it by step: blue ARRIVED, black PICKED / DELIVERED, red REACHED. Your D05 says yellow is the primary.

<a id="d17"></a>
## D17 · Delivery: compulsory photo not taken yet

**The swipe is never disabled.** If the photo is compulsory and missing, swiping **Picked** opens the camera with a
"Photo is compulsory" panel, then continues. (Unlike the P01 checklist page, where Complete stays disabled.)

*Why it came up:* The file's rule (CASES OF PHOTO UPLOAD): 'Picked' is never disabled; if the photo is compulsory and missing, swiping opens the camera with a 'Photo is compulsory' sheet, then continues. Your P01 checklist page instead keeps Complete disabled until every task is done.

<a id="d18"></a>
## D18 · Delivery: 'Amount collected' card with no button

**The "Amount collected" card gets a button** ("Enter OTP"), like the Food-ready pop-up. No auto-advancing overlays:
R11 holds.

*Why it came up:* After payment a centred success card shows and auto-advances to the OTP screen. It has no button and no ×, which breaks R11 (every overlay can be dismissed).
