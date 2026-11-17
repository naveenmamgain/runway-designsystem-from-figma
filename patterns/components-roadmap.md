# Component roadmap

From the review. **Build** = add to Runway; **Later** = not now; **Skip** = never.

Built from decisions: `ChecklistCard` (D08), `BlockingSheet` (D01), `BottomNavigation` v2 (D14).

## Build

| ID | Component | Detail | Figma |
|---|---|---|---|
| C02 | List row family | One row with slots: leading (icon / avatar / thumbnail), title + caption, trailing (chevron / toggle / small button / amount / invite pill). Covers person, contact, offer, toggle and permission rows. | [Referral flow 2071:3079](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2071-3079), [Referral flow 1011:8468](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1011-8468) |
| C03 | Inline alert | Info (blue), note/error (red), warning (orange); icon, title, body, optional audio button. | [New Onboarding 1348:25085](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1348-25085), [Face Auth 1305:3878](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-3878) |
| C07 | Status card overlay | Centred card on scrim: Please wait / Verifying (spinner), Success (check), Failed (! + Retry). Replaces Toast used as a modal. | [New Onboarding 3562:8956](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=3562-8956), [Logistics 4429:38652](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4429-38652) |
| C08 | Consent checkbox row | Checkbox + multi-line legal text with inline link; drives the button's disabled state. | [Face Auth 1405:838](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1405-838) |
| C09 | Sticky footer | Bottom bar: optional selection summary (label, name, price), helper text, primary button, optional text link. | [Logistics 4417:37326](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4417-37326), [My Plans 2.0 7469:20337](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=7469-20337) |
| C10 | Selectable option card | Large radio card: illustration, title, subtitle, radio, optional video/audio link, info strip; disabled state. | [New Onboarding 1348:24200](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1348-24200), [Logistics 2053:27217](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=2053-27217) |
| C13 | Nudge card | Themed card with ×, illustration slot, title, body, one action. | [Home of Orders 5760:7665](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=5760-7665) |
| C14 | Home status card | Card on home: title, status line, link, illustration with status badge (pending / failed / success). | [Logistics 4420:37619](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4420-37619), [New Onboarding 1797:33036](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1797-33036) |
| C15 | Filter pill with panel | Pill states and attached tinted panel with toggle rows and footer actions. | [Home of Orders 2508:63011](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=2508-63011) |
| C18 | Progress tracker card | Linear and segmented bars, status tag, status line. | [My Plans 2.0 7469:20601](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=7469-20601) |
| C19 | Search field | TextField variant with leading search icon and clear. | [Referral flow 2071:3079](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2071-3079) |
| C22 | Bundle order card | Bundle header, stacked order stop cards, '+' connector. | [Bundle Orders 244:13289](https://www.figma.com/design/9m56yKp10jrLoIzW1yRmQA/?node-id=244-13289) |
| C23 | Celebration / success card | Gradient card with illustration, amount and in-card action; success variant with check badge. | [Referral flow 2372:13503](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2372-13503), [Logistics 2303:5086](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=2303-5086) |
| C24 | Home modules | Map card + layer pill, Today's Earnings bar, performance banner, stories row, offer card, shortcut tile. | [Home Page 2026 51:4186](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=51-4186), [Home Page 2026 312:3669](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=312-3669) |
| C27 | Snackbar loading variant | Dark snackbar with spinner, then success/error. | [Home of Orders 2593:29393](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=2593-29393) |

## Later

| ID | Component | Detail | Figma |
|---|---|---|---|
| C01 | Task row *(replaced by ChecklistCard, D08)* | Thumbnail 44, label 16 medium, status caption 14 (Verified green #058743 / Failed! Retry red #c42925), trailing arrow or check. 328w, pad 12, gap 8, radius 12, 1px Border/Neutral/Light, shadow. Exact values from Logistics. | [Logistics 4417:37326](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4417-37326), [Logistics 4421:38379](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4421-38379) |
| C04 | Audio explainer button and bar | Circular play/progress button; inline player with language switch. | [New Onboarding 1348:25085](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1348-25085), [Logistics 3149:60892](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=3149-60892) |
| C05 | Document upload tile | Dashed tile: side label, sample illustration, Upload; uploaded state with image + Retake; error state with red border. | [New Onboarding 3562:8829](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=3562-8829), [E-rickshaw 4856:5256](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=4856-5256) |
| C12 | Help button (Saathi) | Floating pill: collapsed, expanded, playing. | [E-rickshaw 6778:34908](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=6778-34908) |
| C16 | Empty state | Illustration/text, optional Refresh button (idle/spinning/done), optional 'or' + escalation action. | [Home of Orders 3879:31074](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=3879-31074), [Referral flow 1776:5117](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1776-5117) |
| C17 | Stepper / timeline | Vertical steps with done / current / locked / expired states, amounts and connector. Used for milestones, account check, Assure. | [Referral flow 1018:8656](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1018-8656), [Home of Orders 3934:160839](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=3934-160839) |
| C21 | Order controls | Side-bar order tab (timer + fare), Reject timer ring button, countdown chip, voice toggle. | [OA Revamp 7474:5481](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=7474-5481), [Bundle Orders 2909:63027](https://www.figma.com/design/9m56yKp10jrLoIzW1yRmQA/?node-id=2909-63027) |
| C25 | Plan card | Tag pill, eyebrow, big value + struck old value, plan type, video icon, View Details; active state. | [My Plans 2.0 3617:12919](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=3617-12919) |
| C26 | Status illustration with badge | Circular illustration with red / green / blue badge for blocked, done, pending. | [Face Auth 1187:7110](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1187-7110), [Logistics 4420:37619](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4420-37619) |

## Skip

| ID | Component | Detail | Figma |
|---|---|---|---|
| C06 | Camera screens | Dark header, viewfinder with frame (card or circle), guidance panel, Gallery + shutter, preview with Retake/Submit, crop with Done. | [Face Auth 1542:1057](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1542-1057), [Logistics 4421:38348](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4421-38348) |
| C11 | Coachmark | Scrim with cut-out, tooltip with step count, Skip/Next, optional audio tile. | [Home Page 2026 514:1185](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=514-1185), [E-rickshaw 3780:16234](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=3780-16234) |
| C20 | Order card themes and tags | Theme variants per OA framework bucket; order tag chip; 72×82 service icon slot. | [OA Revamp 8890:7129](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=8890-7129), [OA Revamp 9179:2771](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=9179-2771) |
