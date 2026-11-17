# Face Auth — Figma inventory

File: [Face Auth](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/Face-Auth) (`n6MeDvD6KOl4x8gdY7Lqmm`). Read-only review, 2026-11-16.
Full data: `face-auth.json`. Screenshots: `face-auth/`.

> **Key finding:** the page **"mechandise auth for ownly" (1540:1624) is empty** (0 nodes). A text search of the whole file for
> merch / Ownly / T-shirt / raincoat / "Apply for" found nothing. The target "Verify Ownly merch" screen is **not in this file**.

> **Incomplete:** the Figma MCP call quota ran out partway through. Exact numeric values (padding, radius, hex colours, type
> sizes) for the sheets were not captured, and only 1 of the 7 localisation pages (Hindi) was screenshotted.

## Pages (17)

| Page | Id | Tier | Frames | Summary |
|---|---|---|---|---|
| Cover | 0:1 | divider | 2 | Covers: 2023 Supply Dashboard Face Auth (Sprint 106) and "Face Authentication 2026" |
| mechandise auth for ownly | 1540:1624 | divider (empty) | 0 | **Empty placeholder.** No merch screen. |
| Face Auth nudge-8th april 2026 | 1305:3688 | **A** | 17 + 7 camera | Final Apr-2026 nudge (male + women heroes), face-auth fail → blocked sheet, document camera flow |
| Legal hyperverge face auth | 1404:801 | **A** | 16 | Same nudge plus a consent checkbox that gates Start; 2 alternative consent copies |
| Suspension comm- 3rd feb | 1186:2176 | B (+ "✅ final" section = A) | 2 final + 13 kitchen | Blocked-sheet final, plus a kitchen of old screens and illustrations |
| Nudge | 770:2 | B (superseded v1) | 9 | Jun-2024 v1 nudge ("I'm Ready"), Firefly heroes, Runway Bottom Sheet template |
| Nudge for Bike Pink | 1051:282 | B (superseded) | 6 | Oct-2024 woman-captain hero variants, intermediate "Quick face verification" sheet |
| Suspension comm-localisation | 1214:167 | C (source) | 1 | English blocked sheet |
| Face Auth | 19:58 | B | ~40 | 2023 research deck and Supply Dashboard (web, ops agent) profile-picture/face-auth review. Not captain UI except the HyperVerge screenshots |
| Kitchen | 1:2 | B | 88 | 2023 dashboard explorations, notes, HyperVerge screenshots, local components |
| …localisation Hindi / Telugu / Bengali / Kannada / Malayalam / Marathi / Tamil | 1218:4022, 1218:4219, 1235:1956, 1235:2197, 1235:2394, 1235:2591, 1235:2788 | C | 1 each | Same structure as the source (1 section, 1 frame). Hindi checked: no truncation. Its title uses a `%1$d` placeholder |

**How I decided final vs WIP:** these pages count as final because they are the newest dated design (8 Apr 2026), have Design Ticket links, use Runway `Buttons`, and match the 2026 cover mock: nudge-8th-april, Legal (latest copy layer), and the "✅ final" section on Suspension 3rd-feb. Nudge (Jun 2024) and Bike Pink (Oct 2024) are older versions with different copy, and they use a non-Runway CTA, Check and Spacer. Their screens were superseded by the 2026 pages.

## Flows

- **Going on duty with face auth:**
  1. Home, off duty ([1305:3849](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-3849)). The captain taps the duty toggle.
  2. The "Quick Selfie Verification" bottom sheet opens ([1305:3878](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-3878)). With the consent row it is [1405:838](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1405-838) (ticked) and [1441:570](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1441-570) (unticked, Start disabled).
  3. The HyperVerge SDK takes over: "Take a Selfie" intro, then the OS camera-permission dialog, then the oval face capture (1305:3931/3933/3935).
- **When face auth fails:**
  1. HyperVerge shows a full-page "Face verification failed" screen with a red `!` ([1305:4825](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-4825)).
  2. Pressing back returns to home with the "Orders blocked for 2 hours" sheet ([1305:4591](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-4591), [1187:7110](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1187-7110)).
  3. After the captain dismisses it, home shows no block indicator. Trying to go on duty shows the sheet again ([1305:5023](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-5023)).
- **Document camera** ([1542:1056](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1542-1056)): the captain takes a photo with the shutter or picks one from the Gallery. Next comes a preview with Rotate and Crop actions plus Retake and Submit buttons. A gallery image opens in crop mode by default. Crop's "Done" returns to the preview, and Retake goes back to the camera.

## Pattern candidates

1. **Rules nudge before verification (bottom sheet).**
   - Structure, top to bottom:
     - Scrim, with an X floating above the sheet
     - Full-bleed hero image
     - Title
     - 2 bullets
     - Red-tinted Note box (icon + "Note" header)
     - Optional consent checkbox
     - Full-width yellow "Start"
   - Evidence: [1305:3878](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-3878), [1405:838](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1405-838), [1305:4149](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-4149), [1305:3224](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-3224).
   - The Runway `Bottom Sheet` template instance at [1301:2200](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1301-2200) has the same anatomy (illustration slot, title, body, primary and secondary buttons). This confirms the nudge maps to Runway Bottom Sheet.
   - The hero image is the only part that changes by segment (male / women captain / Bike Pink).
2. **Consent-gated CTA.** A checkbox with legal text and an inline Privacy Policy link sits directly above the primary button. The primary stays disabled (grey) until the box is ticked. Evidence: [1405:838](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1405-838), [1441:570](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1441-570).
3. **Blocking / suspension comms sheet.**
   - Structure, top to bottom:
     - Left-aligned circular illustration with a red no-entry badge
     - Bold title giving the block and its duration
     - One-line reason
     - Full-width "OK"
   - It is shown again every time the captain attempts the blocked action.
   - Evidence: [1187:7110](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1187-7110), [1305:4591](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-4591), [1218:4023](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1218-4023).
4. **Vendor SDK hand-off.** The app owns only the sheets before and after the capture. The HyperVerge screens (purple CTA, oval guide, "powered by HyperVerge") cannot be styled with Runway. Evidence: [1305:3931](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-3931), [303:11259](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=303-11259).
5. **Document camera capture.**
   - Dark full-screen chrome.
   - Optional bounding box around the card, with a title and helper text below.
   - Gallery on the left and a circular shutter in the centre.
   - Preview has Retake (outline) and Submit (primary) side by side, 50/50.
   - Crop uses corner handles and a "Done ✓" pill.
   - Evidence: [1542:1057](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1542-1057), [1542:1100](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1542-1100), [1542:1163](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1542-1163).

## Runway usage and conflicts

- Matched by component key: `Buttons` (5333baf6…) and `Bottom Sheet` (121e52af…) are Runway.
- The `Internal page Header` used in the camera flow has key 26c68a54…. This is **not** Runway's Internal Page Header (9b01c08f…). It comes from another library and is a dark variant.
- Home is built from another library, not Runway HomepageHeader/DutyToggle: `HOME SCREEN SWITCH`, `on duty`, `Today's Earnings Accordian`, `final animation`.
- The v1 sheets use the other library's `CTA`, `Check` and `Spacer`.
- **Copy drift:**
  - The title appears as "Quick selfie verification", "Quick Selfie Verification" and "Quick face verification".
  - The reason line is "Face verification failed 3 times" in the Apr-2026 page but "As face verification failed 3 times" in the Feb final and the localisation pages.
- **Hard-coded duration:** the English sheet says "2 hours", but the Hindi string has a `%1$d` placeholder. The duration should be a parameter in the pattern.
- **Rejected in the Suspension kitchen:**
  - Harsher copy: "Different captain was detected… suspended for X hours… strict action on account sharing".
  - The old red home banner "Warning: You are not completing orders with Rapido".
  - The old full-screen "Orders blocked" card.

## Missing components (not in Runway)

- Camera capture / preview / crop chrome
- Inline Note / alert box with error tint
- Consent checkbox row with an inline link
- Status illustration with a badge
- Home off-duty empty state (currently built from another library)

## Open questions

- Where is the "Verify Ownly merch" screen? Page 1540:1624 is empty.
- Which consent copy is final (1405:838, 1471:599 or 1471:750)? Is the checkbox ticked or unticked by default?
- Is the block duration configurable? Which reason copy is final?
- Should home show a persistent block indicator or countdown while the captain is blocked?
- Is the "every 3 rides" display rule for Bike Pink part of the pattern?
- Exact spec values are still to be captured (quota hit).
