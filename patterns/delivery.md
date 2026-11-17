# Patterns: Delivery (B2B parcel and food)

Confirmed in the design review of 2026-11-16 (see [README](README.md)). Use a **Keep** pattern as written; never use a **Rejected** one.

<a id="p49"></a>
## P49 · Trip map: go to pickup / drop — Keep

**When:** Captain is travelling to a pickup or drop point.

**Structure:** Header (stage title 'Go to Pickup Zone' / 'Inside the Pickup Zone' / 'Go to drop', call) → [food only: black Order ID band + green estimated-earnings band] → full map (stop pin by service, route, ETA ring, recenter) → floating 'Go to pickup/drop' pill → stop card (pin, name, address) → full-width swipe (ARRIVED / REACHED).

**Notes:** Notes: parcel map hides order ID and earnings; food map shows both. Pickup info 'the same way as bike order, only change the icon'.

**Review decision:** Order ID band and earnings band are shown on **parcel and food delivery** orders (same look); hidden only on normal bike-taxi orders. Swipe colours per D16. Components: [`OrderIdBand`](../components/OrderIdBand/spec.md), [`SwipeButton`](../components/SwipeButton/spec.md).

**Figma:** [B2B Delivery 1:3013](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3013), [B2B Delivery 1:3025](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3025), [B2B Delivery 1:2982](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2982), [B2B Delivery 1:2999](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2999)

<a id="p50"></a>
## P50 · Order stage page (Collect / Complete delivery) — Keep

**When:** At the pickup or drop: everything needed to finish the stage, and one swipe to confirm.

**Structure:** Header (stage title, call) → order ID row → status strips (orange 'requires an OTP', red delay) → status card (yellow 'Please collect payment ₹130' / green 'Amount collected online' / green 'Food is ready') → [earnings + wait timer] → collapsible Pickup and Drop details cards (name, address, Call customer + Go to location, partner chip) → Items card (checkbox, qty, restricted-items consent) → [Drop-off notes] → Upload photo tile ('Compulsory') → sticky swipe (PICKED / DELIVERED).

**Notes:** Parcel and food share it. File inconsistencies: food pickup is titled 'Collect Parcel'; two drop screens show different payment status.

**Review decision:** Food pickup is titled **"Collect food"** ("Collect Parcel" in the file is a mistake). The payment status card shows *collect payment* or *amount collected online* depending on the customer's payment choice. Stop details cards are **not collapsible**. Components: [`StopDetailsCard`](../components/StopDetailsCard/spec.md), [`PaymentStatusCard`](../components/PaymentStatusCard/spec.md), [`EarningsWaitTimerCard`](../components/EarningsWaitTimerCard/spec.md), [`SwipeButton`](../components/SwipeButton/spec.md).

**Figma:** [B2B Delivery 1:3148](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3148), [B2B Delivery 1:3157](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3157), [B2B Delivery 1:3044](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3044), [B2B Delivery 1:3227](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3227)

<a id="p51"></a>
## P51 · Proof-of-delivery photo — Keep

**When:** Package photo at pickup or drop, compulsory or optional per order.

**Structure:** Upload tile on the stage page → camera (no frame box) → bottom instruction panel (compulsory: red 'Photo is compulsory for this order') → Retry | Submit → 'Uploading, please wait…' card → back to page with 'Upload successful' snackbar + photo + Delete photo.

**Notes:** Same camera → preview → loader as P03/P16 ('use the same loader'). Behaviour when the photo is missing is decision D17.

**Review decision:** If the photo is compulsory and missing, the swipe opens the camera (D17).

**Figma:** [B2B Delivery 1:3167](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3167), [B2B Delivery 1:3168](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3168), [B2B Delivery 1:3177](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3177), [B2B Delivery 1:3202](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3202)

<a id="p52"></a>
## P52 · OTP entry page — Keep

**When:** Handover needs a 4-digit code from the sender or receiver (only on orders that require it).

**Structure:** Header (back, 'Complete pickup' / 'Complete delivery', call) → black band: order ID + sender/receiver name → 'Enter pickup/drop OTP' + 4 boxes → helper 'Please ask customer for OTP' → numeric keyboard (✓ submits) → 'Please wait…' card.

**Notes:** Title truncates in the file ('Complete package pick…', R02). No resend or on-screen submit.

**Review decision:** Title must not truncate (R02): "Complete pickup" / "Complete delivery". OTP input component is deferred (C29 Later).

**Figma:** [B2B Delivery 1:3215](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3215), [B2B Delivery 1:3216](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3216), [B2B Delivery 1:3218](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3218), [B2B Delivery 1:3278](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3278)

<a id="p53"></a>
## P53 · Wait timer and food-prep countdown — Keep

**When:** Captain waits at the restaurant: show when food is ready and when the wait charge starts.

**Structure:** Green earnings header '₹30 + wait charge' → Wait timer mm:ss + info line ('After 4 mins you will get extra waiting charge' → 'You are now earning wait charges') → card 'Please wait! Food will be ready in' + flip-digit countdown → red delay strip when overdue → replaced by green 'Food order is ready!'.

**Review decision:** Component: [`EarningsWaitTimerCard`](../components/EarningsWaitTimerCard/spec.md).

**Figma:** [B2B Delivery 1:3044](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3044), [B2B Delivery 1:3055](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3055), [B2B Delivery 1:3066](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3066), [B2B Delivery 1:3067](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3067)

<a id="p54"></a>
## P54 · Collect payment at pickup — Keep

**When:** Sender pays at pickup (parcel).

**Structure:** Payments header + ? → amount card + yellow 'not your final earning' note → QR (Generate QR → generating → QR) → OR → yellow Collect cash → centred 'Amount collected successfully' card → straight to OTP.

**Notes:** Close to P11. The success card is decision D18.

**Review decision:** The "Amount collected successfully" card has an **Enter OTP** button (D18).

**Figma:** [B2B Delivery 1:3204](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3204), [B2B Delivery 1:3205](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3205), [B2B Delivery 1:3206](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3206), [B2B Delivery 1:3207](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3207)

<a id="p55"></a>
## P55 · 'Use Rapido Maps' sheet after pickup — Rejected

Do not use. (Pickup is done; offer in-app navigation to the drop.)
