# Patterns: Overlays (sheets, cards, snackbars)

Confirmed in the design review of 2026-11-16 (see [README](README.md)). Use a **Keep** pattern as written; never use a **Rejected** one.

<a id="p13"></a>
## P13 · Explainer sheet before a task — Keep

**When:** Explain rules before a capture or multi-step task starts.

**Structure:** Scrim + floating × → sheet: hero illustration → title Bold 24 → 2–3 bullet rules → red Note box for consequences → [consent checkbox] → full-width primary 'Start'.

**Figma:** [Face Auth 1305:3878](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-3878), [Face Auth 1405:838](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1405-838), [Logistics 4348:376](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4348-376), [New Onboarding 1238:55820](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1238-55820)

<a id="p14"></a>
## P14 · Single-message sheet (blocked / rejected / info) — Keep

**When:** Tell the captain one thing that happened and give one action.

**Structure:** Scrim + × → sheet: illustration with status badge → title (states the block and duration) → one reason line → primary 'OK'.

**Notes:** Re-shown each time the captain tries to go online; no persistent sign on home.

**Figma:** [Face Auth 1187:7110](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1187-7110), [Face Auth 1218:4023](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1218-4023), [Logistics 1041:16946](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=1041-16946), [New Onboarding 1064:39867](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1064-39867)

<a id="p15"></a>
## P15 · Confirm sheet with consequence warning — Keep

**When:** An action has side effects (switch zone, complete ride).

**Structure:** Sheet title as question → from → to chips → orange warning box → Primary 'Yes, …' + Secondary 'Go Back'.

**Figma:** [Logistics 2353:34368](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=2353-34368), [E-rickshaw 7198:26664](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=7198-26664)

<a id="p16"></a>
## P16 · 'Please wait' progress card — Keep

**When:** Upload or verification in progress; block the page briefly.

**Structure:** Dimmed page → centred card: yellow ring spinner, bold 'Please Wait', one line naming the action.

**Figma:** [New Onboarding 3562:8956](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=3562-8956), [New Onboarding 1348:25262](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1348-25262), [My Plans 2.0 7469:22236](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=7469-22236)

<a id="p17"></a>
## P17 · Success card on dim background — Keep

**When:** Confirm something took effect.

**Structure:** Scrim (+ ×) → card with green check badge → bold subject + one line → [Okay].

**Notes:** Home 2026 version has no way to dismiss.

**Figma:** [Logistics 2303:5086](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=2303-5086), [My Plans 2.0 7469:22236](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=7469-22236), [Home Page 2026 86:5367](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=86-5367)

<a id="p18"></a>
## P18 · Outcome sheet with tinted header — Keep

**When:** End of a plan window: tell the money outcome.

**Structure:** Dimmed home → × → sheet with tinted top (green success / yellow warning / blue neutral) showing the card → title with amount → body → OK.

**Figma:** [My Plans 2.0 7209:17764](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=7209-17764), [My Plans 2.0 7125:19525](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=7125-19525), [My Plans 2.0 7124:17960](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=7124-17960)

<a id="p19"></a>
## P19 · Not-eligible explanation — Rejected

Do not use. (Captain taps an option they can't use.)

<a id="p20"></a>
## P20 · Celebration card — Keep

**When:** Captain just earned a reward; push to the next milestone.

**Structure:** Dimmed home → gradient card: 3D illustration, caption, big ₹, sentence → in-card primary.

**Figma:** [Referral flow 2372:13503](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2372-13503), [Referral flow 2509:37639](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2509-37639)

<a id="p21"></a>
## P21 · Consent checkbox unlocks the button — Keep

**When:** Legal consent is required before continuing.

**Structure:** Checkbox + legal text with inline link, directly above a full-width primary that stays disabled until ticked.

**Figma:** [Face Auth 1405:838](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1405-838), [Face Auth 1441:570](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1441-570)

<a id="p22"></a>
## P22 · Coachmark with audio — Keep

**When:** Teach a new or low-literacy captain one control at a time.

**Structure:** Dim with a cut-out around one element → tooltip (title, body, n/3, Skip, Next/Got it) → optional audio tile.

**Figma:** [E-rickshaw 3780:16234](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=3780-16234), [Home Page 2026 514:1185](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=514-1185), [New Onboarding 3244:31724](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=3244-31724)

<a id="p23"></a>
## P23 · Floating help button (Saathi / Captain Assist) — Keep

**When:** Help is always one tap away on home, trip and payment screens.

**Structure:** Pill bottom-right: collapsed (icon) / expanded (label) / playing; 'Tap to Play' animation on app open.

**Notes:** Three local versions under three names.

**Figma:** [E-rickshaw 6778:34908](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=6778-34908), [E-rickshaw 6200:39114](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=6200-39114), [E-rickshaw 2987:162037](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=2987-162037)

<a id="p24"></a>
## P24 · Snackbar for settings saved to the server — Keep

**When:** Captain flips a setting that the server must confirm.

**Structure:** Dark snackbar with spinner 'Turning on X' above the nav → green '✓ X is turned on' (2–3 s) or red error with ×.

**Figma:** [Home of Orders 2468:51508](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=2468-51508), [Home of Orders 2593:29393](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=2593-29393), [Home of Orders 2593:74115](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=2593-74115)

<a id="p25"></a>
## P25 · Inline banners (info / note / important) — Keep

**When:** Explain why something is needed, or warn of a consequence, inside a page or sheet.

**Structure:** Full-width tinted box: icon + 1–2 lines + optional circular audio button. Blue info, red note, orange warning.

**Figma:** [New Onboarding 1348:25085](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1348-25085), [Face Auth 1305:3878](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-3878), [My Plans 2.0 7469:20337](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=7469-20337), [Logistics 2353:34368](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=2353-34368)

<a id="p26"></a>
## P26 · Vendor verification hand-off — Undecided

**When:** Face match by HyperVerge SDK.

**Structure:** App explainer sheet → vendor screens (intro, permission, oval capture, result) → back to app result sheet. App owns only before/after.

**Figma:** [Face Auth 1305:3931](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-3931), [Face Auth 1305:4825](https://www.figma.com/design/n6MeDvD6KOl4x8gdY7Lqmm/?node-id=1305-4825)
