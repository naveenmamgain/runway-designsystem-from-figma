# Home Page Improvement 2026 — inventory

File `fxTUcpqbNtHknPclS6sJZg` — <https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/Home-Page-Improvement-2026>
Full records: `home-page-2026.json` (206 frame records). Screenshots: `home-page-2026/`.
Link base: `https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=`

## Pages

| Page | Id | Tier | Frames | Summary |
|---|---|---|---|---|
| 🖼️ Cover Image | 0:1 | divider/cover | 1 | Cover 51:3797 |
| --- | 51:3846 | divider | 0 | empty |
| 🌟 Ready for developement [ANDROID] | 51:3848 | **A** | 13 | Final home: off duty, on duty + map card, pill layers, map maximised, Airport HAIL states, Pitch Centre scroll, on duty with bottom nav |
| --- | 51:3849 | divider | 0 | empty |
| Visual Exploration | 87:9531 | B | 58 | Home v2 vision (wallet in header, Action Centre, announcement, wallet peek, hamburger), pitch card templates, designer rationale, 4 Copilot trays (duplicates) |
| Ai Copilot | 507:2820 | B | 44 | Rapido Copilot: chat, coachmarks, Autopilot (settings, active, auto-accept, feed, permission, summary) |
| ---- | 87:9532 | divider | 0 | empty |
| Kitchen | 1:2 | B | 91 | Variants, map-pill ideation (7 options), HAIL precursors, Action Centre component and placements, progress widget set, hamburger menus, benchmarks |
| ---- | 51:3847 | divider | 0 | empty |

## Tier A: every home state (51:3848)

| Frame | State | Container |
|---|---|---|
| [119:5672](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=119-5672) / [434:5842](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=434-5842) (dup) | **Off duty**: greeting card ("Hi, Rajeshkumar / Good Morning") with an animation and a small primary **Go On Duty** button, which takes the map's place | full-page |
| [51:4186](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=51-4186) | **On duty**: map card with 4 pills (Surge, Work Zone, Go to, High demand) and an expand control | full-page |
| [51:4332](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=51-4332) | Pills expanded (Auto Share, Pickup zone, Best Pickup stacked vertically) | full-page |
| [124:6816](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=124-6816) | Surge pill active: hexes with 1.15x/1.18x flags | full-page |
| [119:6035](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=119-6035) | Map maximised (back arrow, FABs, pills on a scrim) | fullscreen-takeover |
| [124:6672](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=124-6672) | Map maximised + "You are on Priority line" | fullscreen-takeover |
| [86:1900](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=86-1900) | HAIL: in pickup zone, Premium AC card + **Enter OTP** | card-on-home |
| [86:5367](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=86-5367) | HAIL success dialog "You can now get orders in Priority Line" (no CTA) | modal |
| [86:6769](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=86-6769) | HAIL: "Go to 4th Floor Rapido Parking" + 5-digit priority code | card-on-home |
| [86:7005](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=86-7005) | HAIL: in the queue, "Looking for orders" | card-on-home |
| [312:3669](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=312-3669) | Scrolled: pitch carousel + **Shortcuts** (Change Number, Update Document, Change Language) + bottom nav | full-page |
| [306:1771](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=306-1771) | On duty with streak banner ("3 Order Cancelled" + tick/cross dots) + sticky bottom nav | full-page |

Shared anatomy: header (hamburger, duty toggle, location, bell) > Today's Earnings bar > performance banner > [greeting card | map card] > Stories row (Parcel, Earn 200, Performance, Captain) > "Only for you" pitch carousel or stacked deck > city footer ("ನನ್ನ ಬೆಂಗಳೂರು ನನ್ನ ರಾಪಿಡೋ").

**Runway usage in tier A:** only **Buttons** (Runway 671:83990), in 3 instances: 2× Go On Duty (small primary, no icon) and 1× Enter OTP (small primary, trailing arrow). Everything else comes from a different remote library: the `on duty` toggle, `Today's Earnings Accordian`, `all pills`/`small icons`, `Final` card deck, `Bottom Nav Final`/`Bottom Nav Icons`, the `Toggle` variant (dc229fbb…), and the digit box `Frame 2609251`. By contrast, the Ai Copilot rework (508:5375, 519:4791) uses Runway Android status bar, Duty Toggle, bottom navigation, Toggle, Primary/Secondary Tabs and Service Chips.

## Blocking tasks on home
- The only blocking reason designed in this file is **wallet low / negative balance** ("Orders will be blocked! Wallet balance is low").
  - [87:12228](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=87-12228): full-width red banner right under the header, red "-₹10" wallet chip, yellow "Take Action" button. The designer calls this "alarming".
  - Kitchen [1:11230](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=1-11230), [86:7525](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=86-7525), [1:10816](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=1-10816), [86:8030](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=86-8030): a "Take action now (n)" Action Centre (count badge, horizontally scrolling dark action cards with "Check →", "View all"), shown as a peeking sheet over the map or inline below the pills.
- **No Action Centre on the tier-A page.**
- **No gear/merch or document-issue blocking states** anywhere. "Update Document" exists only as a shortcut tile.

## Pattern candidates (details in JSON)
1. **Duty-aware home shell**: [119:5672](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=119-5672), [51:4186](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=51-4186), [306:1771](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=306-1771).
2. **Off duty = greeting + inline Go On Duty**, with the map hidden.
3. **Map card with layer pills**: collapsed, expanded or maximised. Ideation [36:3483](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=36-3483) explored 7 options, and option 6 (4 fixed pills + expand) was chosen.
4. **Zone status overlay card (HAIL/Airport)**: zone polygon + blue card holding an OTP button, priority code or queue status. The zone's pill is promoted to the first slot.
5. **Success dialog over home** ([86:5367](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=86-5367)).
6. **Action Centre**: a top banner or a "Take action now" sheet with count.
7. **Pitch centre "Only for you"**: peeking carousel or stacked deck, with text-above and text-below templates and optional CTA ([276:5575](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=276-5575), [321:1314](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=321-1314)).
8. **Stories row**, **Performance banner**, **Shortcut tiles**.
9. **Header quick-peek wallet panel** ([91:12497](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=91-12497)), plus a **header-dropped announcement** ([92:13524](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=92-13524)).
10. **Copilot**: sparkle entry > chat with suggestion chips and answer cards > sticky input ([507:3215](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=507-3215)), with 3-step coachmark onboarding ([514:1184](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=514-1184)).

## Conflicts
- **Three different duty toggles:**
  - the legacy "ON DUTY" pill (most tier-A frames)
  - the green "On Duty" `Toggle` Variant2 (312:3669)
  - Runway Duty Toggle (Copilot)
- **Header v2 changes the layout:** it moves the toggle and adds a wallet chip and a Star Captain strip.
- **Two offline messages:** the greeting card (A) vs "You're off duty / Go on duty to take orders" (VE).
- **Two bottom navs:** `Bottom Nav Final` (non-Runway) vs Runway `bottom navigation`. A 4-tab nav (Home/Credit/Profile/Orders, 1:12499) was rejected.
- **Duplicated Copilot trays:** the 4 trays on Visual Exploration duplicate those on the Ai Copilot page, with only copy differences.

## Missing components (not in Runway)
- Map card and layer pill
- Today's Earnings bar
- Performance/incentive banner
- Stories row
- Pitch card and deck
- Action Centre banner and card
- Zone overlay card and code digit box
- Shortcut tile
- Progress/Wallet Balance Container
- Greeting/Go-on-duty card
- Chat input and bubbles

## Open questions (from comments and gaps)
- Which duty toggle is canonical?
- Is the Action Centre shipping, and where does it go?
- How do document, gear or merch blocks surface on home?
- Map configurability (hide/reorder) and removing the network-quality indicator: are these confirmed?
- "A better HAIL flow" is still pending.
- Is header v2 the 2026 target?
- Pitch-card template and CTA, plus a localisation check, are pending.
- Which copy of the Copilot trays is the source of truth?

## Not covered
- **Screenshots, because of the Figma MCP quota.** 276:5575, 321:1314, 294:6123 and the Kitchen sections 28:4135 and 4:5410 were classified from text dumps, comments and the 1:612 section screenshot only.
- **Skill file.** I could not load the figma-use SKILL.md resource because this session has no tool for reading MCP resources. Only read-only scripts were run.
