# Patterns: Home

Confirmed in the design review of 2026-11-16 (see [README](README.md)). Use a **Keep** pattern as written; never use a **Rejected** one.

<a id="p27"></a>
## P27 · Home that changes with duty state — Keep, with changes

**When:** The root screen.

**Structure:** Header (menu, duty toggle, location, bell) → Today's Earnings bar → performance banner → [off duty: greeting + 'Go On Duty' | on duty: map card] → stories → 'Only for you' carousel → shortcuts → bottom nav.

**Notes:** Three duty toggles in one file.

**Review decision:** Reference for on-duty home: [Home Page 2026 51:4186](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=51-4186). Off-duty: [Intercity 2072:113833](https://www.figma.com/design/AG1dGWEhuZa2r9YxdeaOOi/?node-id=2072-113833) (Actions grid instead of map).

**Figma:** [Home Page 2026 119:5672](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=119-5672), [Home Page 2026 51:4186](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=51-4186), [Home Page 2026 306:1771](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=306-1771), [Home Page 2026 312:3669](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=312-3669)

<a id="p28"></a>
## P28 · Map card with layer pills — Keep

**When:** On duty: show demand layers.

**Structure:** 328×328 map card, right buttons (maximise, location, SOS), max 4 pills + ··· to expand; maximise = full-screen map. Zone card (airport/HAIL) attaches to pills.

**Figma:** [Home Page 2026 51:4186](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=51-4186), [Home Page 2026 51:4332](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=51-4332), [Home Page 2026 119:6035](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=119-6035), [Home Page 2026 86:1900](https://www.figma.com/design/fxTUcpqbNtHknPclS6sJZg/?node-id=86-1900)

<a id="p29"></a>
## P29 · Home modules — Rejected

Do not use. (Content blocks on home.)

<a id="p30"></a>
## P30 · Nudge card in the order list — Keep

**When:** Suggest one filter or service without blocking orders.

**Structure:** Card at top of the order list: feature tint, ×, illustration, title, body, exactly one action (button or toggle rows). Success → green snackbar, card closes, pill turns on.

**Figma:** [Home of Orders 5760:7665](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=5760-7665), [Home of Orders 5760:9361](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=5760-9361), [Home of Orders 5821:44691](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=5821-44691)

<a id="p31"></a>
## P31 · Programme entry points — Keep, with changes

**When:** Make a programme findable.

**Structure:** Side-menu row (icon, title, 'Earn up to ₹X'), wallet banner, home tile, strip at top of Incentives.

**Notes:** Testing found the banner was hard to notice.

**Review decision:** Entry points are **Navigation** (bottom nav), **Storyly** (stories row), **Actions** grid and **Only for you** carousel — see the two home frames above.

**Figma:** [Referral flow 1031:9166](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1031-9166), [Referral flow 2365:12542](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=2365-12542), [Referral flow 4270:10913](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=4270-10913)

<a id="p32"></a>
## P32 · Copilot chat — Rejected

Do not use. (AI assistant from the home sparkle button.)
