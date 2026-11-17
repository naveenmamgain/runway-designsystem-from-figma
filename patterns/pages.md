# Patterns: Pages

Confirmed in the design review of 2026-11-16 (see [README](README.md)). Use a **Keep** pattern as written; never use a **Rejected** one.

<a id="p01"></a>
## P01 · Task checklist page — Keep

**When:** The captain must finish several independent checks (photos, documents) before something unlocks.

**Structure:** Internal Page Header (back, title, Help) → hero image 360×202 → title Bold 24 → Task rows (gap 16) → sticky footer: Primary Large disabled until all done + helper text + tertiary link (e.g. 'Apply for merch →').

**Notes:** Later frames drop the escape link; footer overlaps last row by 12px.

**Review decision:** Rows are **ChecklistCard**s (D08). Reached from the blocking sheet's CTA (D01).

**Figma:** [Logistics 4417:37326](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4417-37326), [Logistics 4429:38955](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4429-38955), [Logistics 4429:39176](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4429-39176), [New Onboarding 1348:25620](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1348-25620)

<a id="p02"></a>
## P02 · Document upload page — Keep

**When:** Collect a two-sided ID (DL, Aadhaar, RC) and its number.

**Structure:** Header → info banner with audio → Front tile → Back tile (enabled after front) → number field with example → sticky footer: Submit + outline opt-out.

**Notes:** Optional docs tag the photo section 'Not Compulsory'. OCR can prefill the number.

**Figma:** [New Onboarding 3562:8829](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=3562-8829), [New Onboarding 1015:27376](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1015-27376), [E-rickshaw 4856:5256](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=4856-5256), [E-rickshaw 154:3841](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=154-3841)

<a id="p03"></a>
## P03 · Camera capture → preview → verify — Keep

**When:** Live photo of a document, selfie or merch item.

**Structure:** Dark header (back, item name) → full-bleed camera with optional frame → bottom panel: title, guidance, Gallery + shutter. Preview: Retake | Submit side by side, Rotate/Crop. Then centred status card: Verifying → Success / Failed + Retry.

**Notes:** Selfie uses a circular viewfinder. Live-only (no gallery) for merch.

**Figma:** [Face Auth 1542:1057](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1542-1057), [Face Auth 1542:1100](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1542-1100), [Logistics 4421:38348](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4421-38348), [Logistics 4429:38652](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4429-38652)

<a id="p04"></a>
## P04 · Programme hub with sticky action footer — Keep

**When:** Landing page of a programme (referral, plan detail): what you earned, what's on offer, one main action.

**Structure:** Internal Page Header (Help) → hero banner → summary card (₹, chevron) → section title → offer rows → sticky footer (code + Copy, primary).

**Notes:** Footer exists with and without Copy.

**Figma:** [Referral flow 987:6275](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=987-6275), [Referral flow 1401:7645](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1401-7645), [My Plans 2.0 3617:15300](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=3617-15300)

<a id="p05"></a>
## P05 · Tabbed tracker list with search — Keep

**When:** Track many people or items by status and act per row.

**Structure:** Header → summary card → Primary Tabs → search field → rows (avatar, name, status, trailing small button or amount).

**Figma:** [Referral flow 2071:3079](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2071-3079), [Referral flow 1776:5117](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1776-5117)

<a id="p06"></a>
## P06 · Contact picker with invite — Keep

**When:** Invite people from phone contacts.

**Structure:** Header → search → rows (initials avatar, name, number, 'Invite' pill with WhatsApp/SMS icon).

**Figma:** [Referral flow 1011:8468](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1011-8468)

<a id="p07"></a>
## P07 · Person detail with reminder panel — Keep

**When:** Nudge one referred person to their next step.

**Structure:** Header → profile row with earnings → milestone timeline → tinted panel with message preview → primary 'Send Reminder' (WhatsApp/SMS).

**Figma:** [Referral flow 1000:7631](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1000-7631), [Referral flow 1018:8656](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1018-8656)

<a id="p08"></a>
## P08 · Document Centre — Rejected

Do not use. (Review all documents after onboarding.)

<a id="p09"></a>
## P09 · Full-screen intro takeover — Keep

**When:** First exposure to a new plan or feature.

**Structure:** Dark full screen → back → logo → highlighted card with audio → single CTA. Variant: dimmed page with close and a tall image/video card.

**Figma:** [My Plans 2.0 6525:8337](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=6525-8337), [Referral flow 1000:7232](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1000-7232), [Referral flow 4150:22983](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=4150-22983)

<a id="p10"></a>
## P10 · Time-bound offers page — Rejected

Do not use. (Browse incentives with dates and status.)

<a id="p11"></a>
## P11 · Payment collection page — Keep

**When:** Confirm cash collected before closing an order.

**Structure:** Header (Payments, Help) → payment details (amount, split, wallet) → your QR → OR → 'Collect Cash' → confirm sheet (Go back / Collected).

**Figma:** [Bundle Orders 2327:49484](https://www.figma.com/design/9m56yKp10jrLoIzW1yRmQA/?node-id=2327-49484), [Bundle Orders 2329:57165](https://www.figma.com/design/9m56yKp10jrLoIzW1yRmQA/?node-id=2329-57165)

<a id="p12"></a>
## P12 · Wallet home and add UPI — Keep

**When:** Check balance, transfer, add a payment method.

**Structure:** Header (Earnings, Help) → tabs → balance card → education carousel → history. Add UPI: upload QR photo OR type UPI ID → verify → added.

**Figma:** [E-rickshaw 5195:54759](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=5195-54759), [E-rickshaw 6076:14047](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=6076-14047), [E-rickshaw 5986:12096](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=5986-12096)
