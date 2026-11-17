# B2B Delivery UI — Figma inventory (Flow page)

File: [B2B Delivery UI (standardization + Localisation)](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/B2B-Delivery-UI) (`BMJzeTVlQYTDjcmHERwgVy`). Scope: **Flow page (0:1) only**, as the user asked. Reference flow for **delivery captains** (parcel and food B2B delivery).

Built on a legacy captain-app library (`Top header`, `cta holder`, `details`, `items`, `Upload Picture`, `payment card`, `OTP card`, `earnings`, `Spacer`…), none of it Runway. About half the screens are screenshots of the live app (image fills).

Evidence screenshots: `b2b-delivery/` (one PNG per screen + section overview `1-2783.png` + `1-3354.png`).

## Pages
| Page | Tier | Frames | Summary |
|---|---|---|---|
| [0:1](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=0-1) Flow | B | 49 | One section FLOW (1:2783): parcel (top row) and food (bottom row) B2B delivery flows for delivery captains — 23 designed frames + 24 live-app screenshots + earnings instance + map-pin icon, 16 Specifics notes, CASES OF PHOTO UPLOAD rules, 10 labels, 24 connectors. |
| [1:6065](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-6065) Cover | divider | – | Not reviewed (user: Flow page only). |
| [24:10650](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=24-10650) Flow Hindi (India) 1 | C | – | Not reviewed (user: Flow page only). |
| [24:15380](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=24-15380) Flow Kannada (India) | C | – | Not reviewed (user: Flow page only). |
| [24:24636](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=24-24636) Flow Bengali (India) 1 | C | – | Not reviewed (user: Flow page only). |
| [24:27097](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=24-27097) Flow Tamil (India) 1 | C | – | Not reviewed (user: Flow page only). |
| [24:29558](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=24-29558) Flow Telugu (India) 1 | C | – | Not reviewed (user: Flow page only). |
| [33:32019](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=33-32019) Flow Marathi | C | – | Not reviewed (user: Flow page only). |

Flow page count: 47 screens (23 designed frames + 24 screenshots), 1 component instance (earnings), 1 icon section, 16 Specifics, 1 CASES OF PHOTO UPLOAD frame, 10 text labels, 24 connector vectors.

## Flows
Order comes from x position (left → right) and the connectors (see JSON `connectors`). Steps 8–9 (drop navigation) and the photo flow are shared by both rows.

### Parcel delivery (top row)
1. Order alert list: Parcel card, Accept  
   Frames: [1:2784](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2784)
2. Go to Pickup Zone map → Inside the Pickup Zone; swipe ARRIVED (blue). No order ID / earnings on parcel map.  
   Frames: [1:3013](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3013), [1:3025](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3025)
3. Collect Parcel: OTP strip, 'Please collect payment ₹130', pickup details, items + restricted-items consent, Upload Photo (Compulsory), swipe PICKED (never disabled).  
   Frames: [1:3148](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3148)
4. Photo: camera permission → capture (mandatory: red 'Photo is compulsory' panel; optional: instructions only) → Retry/Submit → 'Uploading, Please wait…'.
    Branch A (mandatory, photo first): tap Upload → camera → back to 1:3157 (Upload successful) → swipe PICKED → payment.
    Branch B (mandatory, not uploaded): swipe PICKED → camera opens directly → compulsory sheet → payment directly (skips 1:3157).
    Branch C (optional): camera only if captain taps Upload; swipe PICKED → payment.  
   Frames: [1:3167](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3167), [1:3168](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3168), [1:3177](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3177), [1:3185](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3185), [1:3194](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3194), [1:3202](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3202)
5. Payments: amount ₹130, Generate QR → QR shown, or Collect Cash.  
   Frames: [1:3204](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3204), [1:3205](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3205), [1:3206](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3206)
6. 'Amount Collected Successfully' card → opens OTP directly.  
   Frames: [1:3207](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3207)
7. Enter Pickup OTP (heading to become 'Complete pickup') → Please wait.  
   Frames: [1:3215](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3215), [1:3216](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3216), [1:3217](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3217), [1:3218](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3218)
8. Perfect Pick-up! + Use Rapido Maps sheet → Go to drop map / turn-by-turn; swipe REACHED (red).  
   Frames: [1:3219](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3219), [1:3220](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3220), [1:3225](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3225)
9. Complete Delivery map, black swipe.  
   Frames: [1:3226](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3226)
10. Complete Delivery details: 'Amount collected online', drop + pickup details, items, Drop Off Notes, Upload Photo, swipe DELIVERED.  
   Frames: [1:3227](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3227), [1:3241](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3241)
11. Same image upload flow → photo uploaded.  
   Frames: [1:3255](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3255)
12. If OTP required: Enter Drop OTP → Please wait. If not: skip.  
   Frames: [1:3278](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3278), [1:3279](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3279), [1:3280](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3280)
13. Order Complete: amount collected, rate Good/Bad, chips, Done. Could reuse bike end-of-order screen.  
   Frames: [1:3302](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3302), [1:3303](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3303), [1:3305](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3305)

### Food delivery (bottom row)
1. Order alert list (current app): Delivery cards, Accept with 19s ring.  
   Frames: [1:2981](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2981)
2. Go to Pickup Zone map with Order ID band, 'Estimated Earnings ₹30 + wait charge', 43-min ring; swipe ARRIVED.  
   Frames: [1:2982](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2982), [1:2999](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2999)
3. Collect Parcel at restaurant. With prep time + wait charge (1:3044: wait timer disabled, 'Food will be ready in 21:30') or without (1:3138: earnings only).  
   Frames: [1:3044](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3044), [1:3138](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3138)
4. Prep time over: wait timer active, 'Slight delay in food prep…'. When 4 mins are over: 'You are now earning wait charges' (timer counts up).  
   Frames: [1:3055](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3055), [1:3066](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3066)
5. Food ready: 'Food order is Ready!' banner, timer inactive, Upload Photo (Compulsory); centred pop-up 'Food is Ready!' + Okay.  
   Frames: [1:3067](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3067), [1:3078](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3078)
6. Same photo flow and photo rules as parcel → Upload successful → swipe PICKED. No payment, no pickup OTP.  
   Frames: [1:3167](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3167), [1:3202](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3202), [1:3115](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3115)
7. Shared drop navigation (same as parcel steps 8–9).  
   Frames: [1:3219](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3219), [1:3226](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3226)
8. Complete Delivery: Swiggy + drop details with Call customer / Go to location, items, Upload Photo → same image upload flow; swipe DELIVERED.  
   Frames: [1:3283](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3283), [1:3291](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3291)
9. OTP not required → Order Complete (OTP branch 1:3278 applies if required).  
   Frames: [1:3302](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3302)

### Branch conditions
- **Photo mandatory, uploaded first** → stage page shows 'Upload successful' (1:3157 / 1:3115) → swipe PICKED → payment (parcel) or drop (food).
- **Photo mandatory, not uploaded** → swipe PICKED opens camera directly with red 'Photo is compulsory for this order' panel → after upload goes straight to payment.
- **Photo optional** → camera only if captain taps the Upload tile; panel shows instructions only. PICKED is never disabled.
- **OTP** → orange strip 'This order requires an OTP' on stage pages. Pickup OTP (parcel) after payment pop-up. Drop OTP 'when required' → 1:3278; 'when not required' → straight to Order complete 1:3302.
- **Food timers** → with prep time + wait charge (1:3044) or without (1:3138). Prep over → wait timer active (1:3055). **When 4 mins are over** → 'You are now earning wait charges' (1:3066). Food ready → banner + pop-up (1:3067, 1:3078), wait timer inactive.
- **Payment** → parcel only, at pickup (QR or cash). Drop then shows 'Amount collected online'.

## Annotations (verbatim)
| Node | Points to | Text |
|---|---|---|
| [1:3354](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3354) CASES OF PHOTO UPLOAD (frame) | Global rule | When photo upload is compulsory-<br>Upload photo section stating compulsory<br>If the user has uploaded the photo and then clicks on picked> open the payment flow<br>If the user has not uploaded the photo when clicked on picked open camera directly> use bottom sheet stating photo is compulsory> normal flow.....<br><br>When photo upload is not compulsory-<br>Open camera only when the user clicks on upload photo section> use bottom sheet stating only instructions> normal flow.....<br><br>The CTA “Picked” need not be disabled in any case |
| [1:3315](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3315) Specifics | 1:3013 parcel map | Same header to be used in all the screens<br>Order ID and estimated earnings not needed for parcel order map view<br>The pickup icon on map needs to change |
| [1:3317](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3317) Specifics | 1:2784 / 1:3013 parcel | Show the pickup info in the same way it is shown in bike order ,only change the icon |
| [1:3319](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3319) Specifics | 1:2982 food map | Order ID and estimated earnings to be shown on food delivery map |
| [1:3321](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3321) Specifics | 1:2981 food OA | Show the pickup info in the same way it is shown in bike order ,only change the icon |
| [1:3324](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3324) Specifics | 1:3148 collect parcel | Have added order ID detail on this screen-<br>To maintain consistency with food delivery screen<br>Captains might need this information while contacting the support team<br>Have chosen not to emphasise the last for digits as it is not a primary info for the captains during parcel delivery |
| [1:3326](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3326) Specifics | 1:3167 camera | Remove bounding box for images<br>For cases where image is mandatory when he swipes ‘picked’ directly open camera  |
| [1:3328](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3328) Specifics | 1:3157 collect parcel uploaded | If the captain forgets to upload the photo in cases where photo is mandatory and directly swipes picked> directly open camera> directly open payment screen<br>Show this screen If the captain uploads the photo first. |
| [1:3330](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3330) Specifics | 1:3207 payment pop-up | After payment show the pop-up and directly open OTP screen |
| [1:3332](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3332) Specifics | 1:3215 pickup OTP | Change the heading  to complete pickup |
| [1:3334](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3334) Specifics | 1:3202 uploading | Use the same loader |
| [1:3336](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3336) Specifics | 1:3168 camera mandatory | When image is mandatory-<br>New bottom sheet for instructions |
| [1:3338](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3338) Specifics | 1:3044 | Food delivery with wait charge and prep time<br>Wait timer disabled |
| [1:3340](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3340) Specifics | 1:3044 (left of it) | Pickup details will be collapsed in this screen |
| [1:3343](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3343) Specifics | 1:3138 | Food delivery without wait charge and prep time |
| [1:3345](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3345) Specifics | 1:3055 | With wait timer active<br>Prep time over |
| [1:3347](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3347) Specifics | 1:3227 parcel drop | 1.Show pickup details here as well-<br>At times the receiver asks who has sent the parcel<br>Since the payment was done show status here- amount collected |

### Labels
| Node | Text | Where |
|---|---|---|
| [1:3037](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3037) | Parcel delivery | Row label, parcel row (y≈1150–1940) |
| [1:3038](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3038) | Food delivery | Row label, food row (y≈2260–3350) |
| [1:3313](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3313) | Use icon used in map here | Arrow 1:3314 → map 1:3013 |
| [1:3352](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3352) | Change pickup icon | Arrow 1:3351 → icon 1:3039 |
| [1:3349](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3349) | When 4 mins are over | Arrow 1:3342 → earnings 1:3066 |
| [1:3307](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3307) | Drop off note added | Above 1:3241 |
| [1:3301](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3301) | Same image upload flow | Lines from 1:3241 and 1:3283 meet here, continue to 1:3255 / 1:3291 |
| [1:3309](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3309) | OTP flow when required | Arrow 1:3308 → drop OTP images 59–61 |
| [1:3310](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3310) | When OTP is not required | Arrow 1:3311 → image 62 Order complete |
| [1:3306](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3306) | WE CAN EVEN USE THE SAME BIKE ORDER PAYMENT SCREEN | Above image 17 (1:3305) |

## Screens
| Node | Name | Flow step | Container | CTA | Notes |
|---|---|---|---|---|---|
| [1:2784](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2784) | Local | Parcel > 1 Order alert | full-page | Yellow Accept, right of reject-timer ring | Designed (not a screenshot). Uses side-tab order list like Home of Orders. |
| [1:3013](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3013) | map | Parcel > 2 Go to pickup | full-page | Blue swipe ARRIVED, full width, bottom | Specifics 1:3315: no Order ID / estimated earnings on parcel map; pickup icon on map to change (icon 1:3039). |
| [1:3025](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3025) | map | Parcel > 2b Inside pickup zone | full-page | Blue swipe ARRIVED |  |
| [1:3148](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3148) | Collect package | Parcel > 3 Collect parcel | full-page (scroll) + sticky swipe | Black swipe PICKED (never disabled, per 1:3354) | Specifics 1:3324 says order ID was added here, but no order-id row is visible in this frame. |
| [1:3167](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3167) | image 24 | Shared > 4 Camera permission | fullscreen-takeover | OS sheet | screenshot of the live app (image fill). Specifics 1:3326: 'Remove bounding box for images'; mandatory photo → swipe Picked opens camera directly. |
| [1:3168](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3168) | when photo is mandatory | Shared > 5a Capture (mandatory) | fullscreen-takeover | Shutter centre, no label | Mocked on a screenshot. Specifics 1:3336: 'When image is mandatory- New bottom sheet for instructions'. |
| [1:3185](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3185) | when photo is mandatory | Shared > 6a Preview (mandatory) | fullscreen-takeover | Retry | Submit icon buttons side by side | Labels missing here but present on 1:3194. |
| [1:3177](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3177) | photo not mandatory | Shared > 5b Capture (optional) | fullscreen-takeover | Shutter 'Take Photo' |  |
| [1:3194](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3194) | photo not mandatory | Shared > 6b Preview (optional) | fullscreen-takeover | Retry | Submit |  |
| [1:3202](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3202) | image 27 | Shared > 7 Uploading | modal | none | screenshot of the live app (image fill). Specifics 1:3334: 'Use the same loader'. |
| [1:3157](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3157) | Collect package | Parcel > 8 Collect parcel, photo uploaded | full-page + snackbar | Black swipe PICKED | Specifics 1:3328 (verbatim) defines when this screen shows. |
| [1:3204](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3204) | image 30 | Parcel > 9 Payment | full-page | Yellow Collect Cash full width | screenshot of the live app (image fill) |
| [1:3205](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3205) | image 31 | Parcel > 9b Payment | full-page | Yellow Collect Cash | screenshot of the live app (image fill) |
| [1:3206](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3206) | image 32 | Parcel > 9c Payment | full-page | Yellow Collect Cash | screenshot of the live app (image fill) |
| [1:3207](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3207) | after payment pop-up | Parcel > 10 Payment success | modal | none (auto-advance) | Specifics 1:3330: 'After payment show the pop-up and directly open OTP screen'. No × or button. |
| [1:3215](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3215) | image 35 | Parcel > 11 Pickup OTP | full-page | Keyboard ✓ (no on-screen button) | screenshot of the live app (image fill). Specifics 1:3332: 'Change the heading  to complete pickup'. Title truncates (R02). |
| [1:3216](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3216) | image 36 | Parcel > 11b Pickup OTP | full-page | Keyboard ✓ | screenshot of the live app (image fill) |
| [1:3217](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3217) | image 37 | Parcel > 11c Pickup OTP | full-page | Keyboard ✓ | screenshot of the live app (image fill) |
| [1:3218](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3218) | image 38 | Parcel > 11d Pickup OTP | modal | none | screenshot of the live app (image fill) |
| [1:3219](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3219) | image 39 | Shared > 12 Start drop | bottom-sheet | Two buttons: outline No, thanks | yellow Go To Maps | screenshot of the live app (image fill). No × on sheet. |
| [1:3220](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3220) | image 40 | Shared > 13 Go to drop | full-page | Red swipe REACHED | screenshot of the live app (image fill) |
| [1:3221](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3221) | image 41 | Shared > 13b In-app turn-by-turn | fullscreen-takeover | × exit | screenshot of the live app (image fill) |
| [1:3222](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3222) | image 42 | Shared > 13c Go to drop | full-page | Red swipe REACHED | screenshot of the live app (image fill) |
| [1:3223](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3223) | image 43 | Shared > 13d Go to drop | full-page | Red swipe REACHED | screenshot of the live app (image fill) |
| [1:3224](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3224) | image 44 | Shared > 13e Nav with traffic alert | fullscreen-takeover | Dismiss | screenshot of the live app (image fill) |
| [1:3225](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3225) | image 46 | Shared > 13f At drop | full-page | Red swipe REACHED | screenshot of the live app (image fill) |
| [1:3226](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3226) | image 47 | Shared > 14 Complete delivery map | full-page | Black swipe (label not visible) | screenshot of the live app (image fill) |
| [1:3227](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3227) | parcel delivery/drop detail screen | Parcel > 15 Complete delivery | full-page (scroll) + sticky swipe | Black swipe DELIVERED | Specifics 1:3347 (verbatim). |
| [1:3241](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3241) | parcel delivery/drop detail screen | Parcel > 15b Complete delivery, note added | full-page | Black swipe DELIVERED | Label 'Drop off note added' (1:3307). Connector to 'Same image upload flow'. |
| [1:3255](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3255) | parcel delivery/drop detail screen | Parcel > 16 Complete delivery, photo uploaded | full-page | Black swipe DELIVERED | Payment card says 'Please collect payment' while 1:3227/1:3241 say 'Amount collected online' for the same order: inconsistent. 'Drop off notes' casing differs. |
| [1:3278](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3278) | image 59 | Parcel > 17 Drop OTP (when required) | full-page | Keyboard ✓ | screenshot of the live app (image fill) |
| [1:3279](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3279) | image 60 | Parcel > 17b Drop OTP | full-page | Keyboard ✓ | screenshot of the live app (image fill) |
| [1:3280](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3280) | image 61 | Parcel > 17c Drop OTP | modal | none | screenshot of the live app (image fill) |
| [1:3302](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3302) | image 62 | Shared > 18 Order complete | full-page | Yellow Done | screenshot of the live app (image fill) |
| [1:3303](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3303) | image 64 | Shared > 18b Order complete, Good chosen | full-page | Yellow Done | screenshot of the live app (image fill) |
| [1:3305](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3305) | image 17 | Shared > 18c Order complete (bike payment screen) | full-page | Yellow Done | screenshot of the live app (image fill). Label 1:3306: 'WE CAN EVEN USE THE SAME BIKE ORDER PAYMENT SCREEN'. |
| [1:2981](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2981) | image 63 | Food > 1 Order alert (current app) | full-page | Yellow Accept with countdown ring | screenshot of the live app (image fill). Specifics 1:3321: show pickup info like bike order, only change icon. |
| [1:2982](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2982) | map | Food > 2 Go to pickup | full-page | Blue swipe ARRIVED | Specifics 1:3319: order ID and estimated earnings shown on food map. Label 'Change pickup icon' (1:3352). |
| [1:2999](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2999) | map | Food > 2b Near pickup | full-page | Blue swipe ARRIVED |  |
| [1:3044](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3044) | Food delivery/pickup detail screen | Food > 3a Collect food (wait charge + prep time) | full-page (scroll) + sticky swipe | Black swipe PICKED | Specifics 1:3338 (verbatim). Specifics 1:3340 says pickup details collapsed here but this frame shows them expanded. |
| [1:3138](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3138) | Food delivery/pickup detail screen | Food > 3b Collect food (no wait charge, no prep time) | full-page | Black swipe PICKED | Specifics 1:3343: 'Food delivery without wait charge and prep time'. |
| [1:3055](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3055) | Food delivery/pickup detail screen | Food > 3c Wait timer active, prep over | full-page | Black swipe PICKED | Specifics 1:3345: 'With wait timer active / Prep time over'. |
| [1:3067](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3067) | Food delivery/pickup detail screen | Food > 4 Food ready | full-page | Black swipe PICKED |  |
| [1:3078](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3078) | Food delivery/pickup detail screen | Food > 4b Food ready pop-up | modal | Yellow Okay (small pill) | Connector from here to camera (image 24). |
| [1:3115](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3115) | Food delivery/pickup detail screen | Food > 5 Collect food, photo uploaded | full-page + snackbar | Black swipe PICKED | Pickup Details card absent here. Connector 1:3274 goes straight to drop nav (no payment/OTP for food pickup). |
| [1:3283](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3283) | Food delivery/pickup detail screen | Food > 6 Complete delivery | full-page | Black swipe DELIVERED | No order ID, no OTP strip, no drop-off notes (unlike parcel 1:3227). |
| [1:3291](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3291) | Food delivery/pickup detail screen | Food > 7 Complete delivery, photo uploaded | full-page | Black swipe DELIVERED | Then 'When OTP is not required' → Order complete (image 62). |
| [1:3066](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3066) | earnings (instance) | Food > 3d Wait charge running | other | none | Label 'When 4 mins are over' (1:3349) points here. |
| [1:3039](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3039) | icon for all delivery services | Shared > map pin | other |  | Referenced by 'Change pickup icon' and Specifics 1:3315. |

## Pattern candidates
### Trip map: go to pickup / drop
- When: Captain is travelling to a pickup or drop point.
- Structure: Top header (menu, stage title 'Go to Pickup Zone' / 'Inside the Pickup Zone' / 'Go to drop', call) > [food only: black Order ID band + green Estimated Earnings band] > full map (stop pin by service, route, ETA ring, recenter) > floating yellow 'Go to pickup/drop' pill > white stop card (pin, name, address) > full-width swipe (ARRIVED / REACHED)
- Components: Top header (legacy), swipe CTA (missing), order id, earnings card
- Evidence: [1:3013](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3013), [1:3025](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3025), [1:2982](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2982), [1:2999](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2999), [1:3220](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3220), [1:3222](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3222)
- Variations: Parcel hides order ID and earnings; food shows both + countdown ring. Swipe colour blue (pickup) vs red (drop).
- Conflicts: Swipe colours blue/red/black; header has hamburger instead of Runway Internal Page Header.
### Order stage page (Collect / Complete delivery)
- When: At the pickup or drop: show everything needed to finish the stage and one swipe to confirm.
- Structure: Top header (stage title, call) > [order ID row] > status strip(s) (orange 'requires an OTP', red delay) > status card (yellow 'Please collect payment ₹X' / green 'Amount collected online' / green 'Food order is Ready!') > [earnings + wait timer card] > collapsible Pickup Details card and Drop Details card (name, address, yellow Call customer + outline Go to location; partner chip e.g. Swiggy) > Items card (checkbox + qty + restricted-items consent) > [Drop Off Notes field] > Upload Photo tile (Compulsory tag) > sticky swipe (PICKED / DELIVERED)
- Components: Top header, order id, payment card, OTP card, details, pick up details collapsed, items, checkbox, info, Upload Picture, cta holder, Snackbar
- Evidence: [1:3148](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3148), [1:3157](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3157), [1:3044](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3044), [1:3138](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3138), [1:3055](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3055), [1:3067](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3067), [1:3115](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3115), [1:3227](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3227), [1:3241](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3241), [1:3255](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3255), [1:3283](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3283), [1:3291](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3291)
- Variations: Parcel vs food; with/without timers; photo compulsory or optional; pickup details expanded/collapsed; uploaded photo with Delete.
- Conflicts: Swipe never disabled even when photo compulsory; inconsistent payment status between 1:3241 and 1:3255; 'Drop Off Notes' vs 'Drop off notes'.
### Proof-of-delivery photo with mandatory/optional rule
- When: Package photo at pickup or drop.
- Structure: Upload tile on stage page > camera (no frame box) > bottom instruction panel (mandatory: red title 'Photo is compulsory for this order') > Retry | Submit > 'Uploading, Please wait…' card > back to page with green 'Upload successful' snackbar + photo + Delete Photo. Mandatory + not uploaded: swiping opens camera directly then continues.
- Components: camera (legacy), Please wait card, Snackbar, Upload Picture
- Evidence: [1:3354](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3354), [1:3167](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3167), [1:3168](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3168), [1:3185](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3185), [1:3177](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3177), [1:3194](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3194), [1:3202](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3202), [1:3157](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3157), [1:3115](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3115)
- Variations: Mandatory vs optional; labelled vs unlabelled preview buttons.
- Conflicts: Instructions panel is a fixed panel, not a dismissable sheet.
### OTP entry page
- When: Handover needs a 4-digit code from sender/receiver.
- Structure: Header (back, 'Complete pickup' / 'Complete Delivery', call) > black band: Order ID + Sender/Receiver name > 'Enter Pickup/Drop OTP' + 4 boxes > helper 'Please ask customer for OTP' > numeric keyboard (✓ submits) > 'Please wait…' card
- Components: OTP input (missing), Please wait card
- Evidence: [1:3215](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3215), [1:3216](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3216), [1:3217](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3217), [1:3218](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3218), [1:3278](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3278), [1:3279](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3279), [1:3280](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3280)
- Variations: Pickup vs drop; optional by order ('This order requires an OTP' strip on stage page).
- Conflicts: Title truncates ('Complete package pick…', R02); no on-screen submit or resend.
### Wait timer and food prep countdown
- When: Captain waits at restaurant; show when food is ready and when wait charge starts.
- Structure: Green earnings header '₹30 + wait charge' + white body: Wait Timer mm:ss + info line ('After 4 mins, you will get extra waiting charge' → 'You are now earning wait charges') ; separate card 'Please Wait! Food will be ready in' + flip-digit mm:ss; red delay strip when overdue; replaced by green 'Food order is Ready!' banner
- Components: earnings, earnings/wait time inactive, Food prep time
- Evidence: [1:3044](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3044), [1:3055](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3055), [1:3066](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3066), [1:3067](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3067), [1:3138](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3138)
- Variations: Disabled / active / earning / inactive; without prep time.
- Conflicts: —
### Payment collection at pickup
- When: Sender pays at pickup (parcel).
- Structure: Payments header + ? > amount card + yellow 'not your final earning' note > QR section (Generate QR → generating → QR) > OR > yellow Collect Cash > centred 'Amount Collected Successfully' card, auto-advances to OTP
- Components: —
- Evidence: [1:3204](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3204), [1:3205](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3205), [1:3206](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3206), [1:3207](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3207)
- Variations: QR states.
- Conflicts: Success card has no button or × (R11).
### Food is ready pop-up
- When: Restaurant marks food ready while captain waits.
- Structure: Scrim > centred card: illustration with green check > 'Food is Ready!' > one line > yellow small 'Okay'
- Components: Buttons/Small/Primary/Normal
- Evidence: [1:3078](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3078)
- Variations: —
- Conflicts: —
### Navigation choice sheet after pickup
- When: Pickup done; offer in-app maps.
- Structure: Sheet with green tinted top (illustration, 'Perfect Pick-up!') > icon > 'Use Rapido Maps' + body > outline 'No, thanks' + yellow 'Go To Maps'
- Components: —
- Evidence: [1:3219](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3219)
- Variations: —
- Conflicts: No floating × (D09).
### End of order with feedback
- When: Delivery done.
- Structure: Header 'Order Complete' + ? > card (green check, 'Amount Collected Online', not-final-earning note, drop distance) > 'How was your ride?' Good/Bad > chips > sticky yellow Done; black strip 'Complete the feedback to start next order'
- Components: —
- Evidence: [1:3302](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3302), [1:3303](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3303), [1:3305](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3305)
- Variations: —
- Conflicts: 'How was your ride?' copy on a delivery.
### Parcel order alert in side-tab list
- When: Incoming parcel / food delivery order.
- Structure: 'N Orders' header > side tab rail | order cards: service chip 'Parcel'/'Delivery', fare, illustration, pickup/drop km + address, reject ring + yellow Accept
- Components: Spacer (legacy), X, volume_up
- Evidence: [1:2784](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2784), [1:2981](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2981)
- Variations: Pink themed second card; current-app card with Pickup/Drop km split.
- Conflicts: Not on OA framework card (D10).

## Against confirmed patterns
| Candidate | Verdict | Detail |
|---|---|---|
| Trip map: go to pickup / drop | **New** | No trip-map pattern exists. Swipe CTA agrees with D02 (bike = swipe). Conflicts: header has hamburger, not Runway Internal Page Header (D06); swipe colours blue/red/black, not yellow (D05 applies to buttons — needs a call on swipe colour). |
| Order stage page (Collect / Complete delivery) | **New (partly P02 / P21)** | Closest is P02 Document upload page (upload tile + sticky footer) and P21 consent line. Conflicts: D06 (non-Runway 'Top header'); D13 ('Swiggy' hand-made chip and red '(Compulsory)' text outside a ChecklistCard); R09 (all components from a legacy library). Status strips match P25 inline banners (orange/red). 'Upload successful' green snackbar agrees with D11. |
| Proof-of-delivery photo with mandatory/optional rule | **Matches P03 Camera capture → preview → verify** | Same capture → Retry/Submit → status card; differs: no Gallery, no verify step (upload only), 'Uploading, Please wait…' = P16. Instruction panel is fixed, not a sheet, so D09/R11 do not apply. Mandatory title red agrees with D12 spirit. Header is plain back arrow, not dark Internal Page Header (D06). |
| OTP entry page | **New** | No OTP pattern. Conflicts: legacy header (D06); title truncation (R02); 'Please wait' card matches P16. |
| Wait timer and food prep countdown | **New (near P45)** | Shares status-card idea with P45 Progress tracker card but is a timer; no conflict found. Red delay strip = P25. |
| Payment collection at pickup | **Matches P11 Payment collection page** | Same header/QR/OR/Collect Cash. Differs: P11 ends with confirm sheet (Go back / Collected); here a centred 'Amount Collected Successfully' card (P17) with no button or × — conflicts R11; D03 allows centred card for short success. |
| Food is ready pop-up | **Matches P17 Success card on dim background** | Centred card, check badge, title + line, Okay; agrees with D03 (short success = centred card) and D05 (yellow). Has no ×, but has Okay so R11 is met. |
| Navigation choice sheet after pickup | **Matches P18 Outcome sheet with tinted header (loosely)** | Tinted green top + two CTAs (yellow forward, white secondary) agrees with D05 and D03 (decision = sheet). Conflicts D09: no floating ×. |
| End of order with feedback | **Matches P43 End of order** | Stamp/check → amount → distance → one feedback question + chips → sticky Done. Agrees with D05. |
| Parcel order alert in side-tab list | **Matches P34 Order list with side tabs + P33 card** | Conflicts D10: cards are legacy (1:2981) or local (1:2784), not on the OA framework; Specifics ask to reuse the bike card and only change the icon. No bottom nav shown, so D14 not tested. |

Summary: **matches** P03, P11, P17, P18, P33/P34, P43 · **new** trip map, order stage page, OTP entry, wait/prep timer · **conflicts** D06 (legacy header with hamburger), D05 (swipe colours), D09 (no × on maps sheet), D10 (legacy OA cards), D13 (hand-made 'Swiggy' chip, red '(Compulsory)' text), R11 (payment success card), R02 (truncated OTP title), R09 (no Runway components). Agrees with D02 (bike = swipe), D03, D11.

## Missing components
- **Swipe-to-confirm CTA** — Full-width slider with arrow knob, label; seen in blue (ARRIVED), black (PICKED/DELIVERED), red (REACHED). Not in Runway. ([1:3013](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3013), [1:3148](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3148), [1:3220](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3220), [1:3227](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3227))
- **OTP input** — 4 square digit boxes, focused state, helper text. ([1:3215](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3215), [1:3278](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3278))
- **Order stop details card** — Collapsible card: section title, pin + name + address, Call customer (yellow) + Go to location (outline), optional partner chip. ([1:3148](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3148), [1:3227](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3227), [1:3283](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3283))
- **Items checklist card** — Item name / Quantity table with checkboxes and restricted-items consent line. ([1:3148](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3148), [1:3044](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3044))
- **Photo upload tile** — Dashed tile 'Tap to add photo of the package', (Compulsory) tag, uploaded state with Delete Photo. Overlaps roadmap C05. ([1:3241](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3241), [1:3157](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3157))
- **Payment status card** — Yellow 'Please collect payment ₹X' / green 'Amount collected online'. ([1:3148](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3148), [1:3227](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3227))
- **Earnings + wait timer card / food prep countdown** — Green header band with earnings; wait timer states; flip-digit countdown. ([1:3044](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3044), [1:3066](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3066))
- **Order ID band** — Black band with order ID (+ sender/receiver name) under header. ([1:2982](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-2982), [1:3215](https://www.figma.com/design/BMJzeTVlQYTDjcmHERwgVy/?node-id=1-3215))

## Open questions
- Swipe CTA colour: blue ARRIVED, black PICKED/DELIVERED, red REACHED. Which colour should the Runway swipe use given D05 (yellow primary)?
- Specifics 1:3340 says pickup details collapsed on 1:3044, but the frame shows them expanded. Which is right?
- Specifics 1:3324 says order ID was added to Collect Parcel (1:3148), but the frame has no order-ID row. Missing from the design?
- 1:3227/1:3241 show 'Amount collected online' but 1:3255 shows 'Please collect payment ₹130' for the same parcel drop. Is there a pay-on-delivery case?
- Mandatory photo + swipe Picked without photo: rule says go camera → payment directly, skipping the 'Upload successful' page. Should the captain see the uploaded state at all?
- Food flow has no payment and no pickup OTP; drop OTP 'when required'. Who decides OTP per order?
- Order complete asks 'How was your ride?' on a delivery; label suggests reusing the bike end-of-order screen. Keep wording?
- Food pickup page title is 'Collect Parcel' for food orders.
- 'Same header to be used in all the screens' (1:3315): the legacy 'Top header' with hamburger + call, or Runway Internal Page Header (D06)?

## Not covered
- Pages Cover (1:6065) and the 6 localisation pages (Flow Hindi/Kannada/Bengali/Tamil/Telugu/Marathi, 24:10650, 24:15380, 24:24636, 24:27097, 24:29558, 33:32019) — skipped on user instruction (Flow page only).
- Text inside remote-component instances on designed screens could not be read by script (returned empty); structure taken from screenshots at 600px, so small copy may be paraphrased.
- Remote component library not identified: none of the 19 component keys match Runway (GEdvNUzFqwB2gAbQKZRsIn) or any key in this repo; treated as a legacy captain-app library.
- Bottom of tall screens (Upload Photo tile area under the sticky swipe) partly hidden by the swipe in screenshots.
