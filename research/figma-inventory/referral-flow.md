# Referral flow: Figma inventory

File: [Referral flow](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/Referral-flow) (`womPCP4eD8g7afb69X5f6v`). Designer Surabhi, PO Gaurav Kumar (cover).
Full data is in `referral-flow.json`. Evidence screenshots are in `referral-flow/`.

Link base: `https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=`

## Pages (23)

| Page | Id | Tier | Frames | One line |
|---|---|---|---|---|
| 🖼️ Cover Image | 0:1 | divider | 1 | Cover 'Reimagining the referral experience' |
| ----- | 8:1723 | divider | 0 | empty |
| Ready for Development (Android) | 310:1868 | A (empty) | 0 | **Page is empty.** |
| Captain Referrals | 556:256 | **A** | 22 | Section 'Referral flow (M2) for captains' with 20 phones + prototype wiring, plus 'Visual assets' banners per segment |
| Joining bonus visibility | 2363:10229 | **A** (the section) | 8 (+4 B) | Referee-side joining-bonus journey with click annotations |
| Visibility of Bike pink referrals | 3898:768 | **B** (one frame A) | 5 | Loose explorations + fraud research notes + ASO screenshot |
| ----- | 310:2576 | divider | 0 | empty |
| 🎨Visual exploration | 204:1259 | B | 0 | empty |
| Kitchen | 9:1735 | B | 289 (442 nodes) | v1→M2 explorations, customer-acq OTP, joining bonus, quick-action tiles, production-vs-redesign sections |
| Prototype | 17:11323 | B | 20 | v1 screens used as UT stimulus + interview notes |
| ----- | 310:2577 | divider | 0 | empty |
| Resources | 1:2 | B | 22 (+~30 images) | Production referral screens (Android-437…450), competitor/WhatsApp screenshots, PRD/Data links, slides |
| UT Testing Insights | 548:950 | B | 7 | UT synthesis (blockers, offline referrals, video works) |
| ---More updates--- | 2363:10230 | divider | 0 | empty |
| Customer Acquisition | 1693:1383 | B | 28 | 'Captain led customer acquisition (Phase 1)': QR/number referral of riders, OTP, reward modal |
| -- Localisation -- | 310:1869 | divider | 0 | empty |
| M2 Hindi / Bengali / Kannada / Malayalam / Marathi / Tamil / Telugu | 1985:7297 / 11623 / 15949 / 20275 / 24601 / 28927 / 37579 | C | 27 each | Localised copy of an earlier M2 cut |

### Tier decisions
- **Captain Referrals: final (A).** It has an organised flow section with prototype connectors. The side-menu frame is marked READY_FOR_DEV. Every state is covered: home populated, empty and zero; referral details not-activated, in-progress, expired and completed. All 7 localisation pages copy this flow. The "Ready for Development" page is empty, so this page is the de-facto source.
- **Joining bonus visibility: final (A) for the 'Joining Bonus Visibility' section.** It has a target-user header, 'Clicks' annotations, connectors, and READY_FOR_DEV on [2372:13503](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2372-13503). The 4 frames outside the section are WIP.
- **Bike pink visibility: WIP (B).** It has no section and no flow wiring. It mixes in research notes on Bike Pink impersonation fraud and an unrelated app-store screenshot. Only [Hamburger 3967:20735](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=3967-20735) is marked READY_FOR_DEV.

## Flow (Captain Referrals, tier A)
Side menu "Refer Friends" ([1031:9166](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1031-9166)) → Referral home ([987:6275](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=987-6275); empty [1442:8189](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1442-8189); zero [1144:67947](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1144-67947)) → How it works per campaign ([1000:7137](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1000-7137)) / explainer video ([1000:7232](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1000-7232)) → Refer Friends contact picker ([1011:8468](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1011-8468)) → OS share sheet / SMS screenshots → Referral Earnings tabs ([2071:3079](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2071-3079), [1776:5117](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1776-5117)) → Referral Details: not activated [1000:7631](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1000-7631), in progress [1018:8656](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1018-8656) / SMS [2194:743](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2194-743), expired [1020:8780](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1020-8780), completed [1028:8921](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1028-8921).

Joining bonus (referee): home celebration card [2372:13503](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2372-13503) → My referral bonus [2684:40683](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2684-40683). The bonus also shows as a progress strip on Incentives and Referral Earnings, and as a 'Joining Bonus' row in the Wallet ([2365:12542](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2365-12542)).

**Runway usage:** I checked these remote component keys against the Runway file and they match: Buttons, Internal Page Header, Android status bar, Primary Tabs and Secondary Tabs. The only use of Input Field is [4338:11661](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=4338-11661), which is WIP. Everything else is local: rows, cards, timelines, search, contact rows and status labels. Home and wallet frames use other libraries ('on duty', "Today's Earnings Accordian", 'Final', 'Tabs/.2 Tabs') and also `.Buttons(Rejected)`.

## Pattern candidates
1. **Programme home with sticky share footer.** Structure: header + Help, hero banner, earnings summary card, list of offer rows, sticky code chip + Copy + primary. Evidence: [987:6275](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=987-6275), [1442:8189](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1442-8189), [1144:67947](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1144-67947), [1693:4081](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1693-4081).
2. **Milestone stepper / progress timeline.** Done steps are green with a number badge and +₹. Locked steps are grey with a lock. The header shows a status tag and x/3. Evidence: [1018:8656](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1018-8656), [1028:8921](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1028-8921), [1020:8780](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1020-8780), [2684:40683](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2684-40683), [1000:7137](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1000-7137).
3. **Person detail with nudge panel.** Structure: profile row with earnings, progress, a tinted panel with a message preview, then primary 'Send Reminder' with a WhatsApp or SMS icon. Evidence: [1000:7631](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1000-7631), [2194:743](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2194-743), [4338:11584](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=4338-11584) (adds Call).
4. **Tabbed tracker list with row action.** Structure: summary card, PrimaryTabs, search, person rows with coloured status and an outlined 'Remind' button or a +₹ amount. Evidence: [2071:3079](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2071-3079), [1776:5117](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1776-5117), [2872:16062](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2872-16062).
5. **Contact picker with per-row channel invite.** The Invite pill is green with a WhatsApp icon or black with an SMS icon. Evidence: [1011:8468](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1011-8468).
6. **Celebration card over dimmed home.** Structure: illustration, big ₹, next-goal sentence, in-card primary. Evidence: [2372:13503](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2372-13503).
7. **Image/video interstitial.** Structure: dimmed page, close X, tall media card, optional primary. Evidence: [1000:7232](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1000-7232), [4150:22983](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=4150-22983).
8. **Programme entry points.** The programme is reached from a side-menu row with an "Earn upto ₹X" subtitle, a wallet promo banner, a quick-action tile, or a progress strip on Incentives. Evidence: [1031:9166](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1031-9166), [2365:12542](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2365-12542), [4270:10913](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=4270-10913). UT found banner discoverability poor ([548:963](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=548-963)).

## Conflicts / inconsistencies
- The home footer differs between screens. One shows a code chip with a Copy button (987:6275); another shows plain code text with no Copy (1144:67947). Older layouts put the code at the top (1000:7232, 4150:22983, Kitchen).
- The milestone concept is drawn two ways: how-it-works cards with green 'You Earn' blocks, and the detail timeline.
- Status labels are ad-hoc coloured text or local tags rather than Runway Tag.
- There is copy debt: a '[count]' placeholder, 'Male Bike Captains' listed twice (1401:7645), and the label changing between 'Your earnings' and 'Your reward'.
- The Wallet (2365:12542) uses the deprecated `.Buttons(Rejected)` and an older `Tabs` component.
- The celebration card is custom. It is neither a Runway BottomSheet nor a Modal.

## Localisation (tier C)
- All 7 languages have the same 27 frames. They match each other but not the current source. They come from an earlier M2 cut: no E-Rickshaw or Cab rows, no contacts screen, no video overlay, homepage 720 instead of 1028.
- About 30 strings are left in English in every language: 'Auto Captains', '1 Referral = ₹300', 'Our Referrals', 'Ravi and 5 others…', 'how it works', 'You Earned', 'Our Active Referrals', 'Refer', and the English hero banner.
- The raw format string `₹%1$d` appears in the campaign rows. In Tamil it renders as '₹%1$D' ([1985:28952](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1985-28952)).
- Tamil layout breaks: the header title wraps to 2 lines, the 'Your referral code' label wraps, and the primary 'Refer Friends' button wraps to 2 lines.
- Campaign labels and empty-state copy use ending truncation in all languages. The script flagged 50–74 such text nodes per language; Tamil and Malayalam have the most.

## Missing components
OfferRow/CampaignRow, Earnings SummaryCard, MilestoneTimeline, SearchField, PersonRow/ContactRow, ChannelInviteButton (WhatsApp/SMS), ReferralCodeChip, MessagePreview panel, CelebrationCard, InlineInfoBanner, StatTile, EmptyState.

## Open questions
- The "Ready for Development (Android)" page is empty. Is the Captain Referrals section the source of truth?
- Which home footer is final?
- Will the localisation pages be regenerated from the current flow, with the English strings and placeholders fixed?
- Is `.Buttons(Rejected)` in the Wallet intentional?
- Should the status labels map to Runway Tag?
- What is the status of Customer Acquisition Phase 1 and of the Bike Pink fraud notes?

## Not covered
I stopped early because of the shared Figma MCP quota. About 20 tier-A/B frames have no screenshot; I described them from layer, instance and text dumps instead (ids are listed in the JSON under `notCovered`). For Kitchen, I recorded the 289 frames as clusters with id lists and did not itemise the small fragments. For localisation, I screenshotted only Tamil. I could not read the figma-use skill resource; I ran read-only scripts only.
