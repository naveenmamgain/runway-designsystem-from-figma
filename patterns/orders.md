# Patterns: Orders

Confirmed in the design review of 2026-11-16 (see [README](README.md)). Use a **Keep** pattern as written; never use a **Rejected** one.

<a id="p33"></a>
## P33 · Order card themed by order type — Keep

**When:** Every incoming order alert.

**Structure:** Service chip + fare (₹ Bold 32, green +extra) + icon slot → route (pickup/drop km + address) → optional tag row → optional tips → Reject timer ring + Accept.

**Notes:** Max 2 signals. Company overrides. Themes: Priority dark+gold, Company blue, Intercity sky, GTA pink, Seat share teal.

**Figma:** [OA Revamp 8890:7129](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=8890-7129), [OA Revamp 8289:10483](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=8289-10483), [OA Revamp 7229:2421](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=7229-2421), [OA Revamp 9382:23398](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=9382-23398)

<a id="p34"></a>
## P34 · Order list with side tabs — Keep

**When:** On duty with one or more order alerts.

**Structure:** Header (count + voice toggle) → 64px tab rail (timer + fare per order) | stack of order cards → bottom nav with Orders pill.

**Figma:** [OA Revamp 7474:5481](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=7474-5481), [OA Revamp 8023:84682](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=8023-84682)

<a id="p35"></a>
## P35 · Voice order alert — Keep

**When:** Voice mode on: the app reads the order aloud.

**Structure:** Active card gets a green border; the field being read is highlighted; toggling voice shows a 3 s snackbar.

**Figma:** [OA Revamp 5097:6624](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=5097-6624), [OA Revamp 7474:13896](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=7474-13896)

<a id="p36"></a>
## P36 · Accept again / Only for you — Keep

**When:** Order needs re-confirmation, or is exclusive to good performers.

**Structure:** Dim → themed header strip (red 'Accept Again!' / green 'Only For You') → order card → countdown then Accept; Reject as separate pill.

**Figma:** [OA Revamp 5235:59981](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=5235-59981), [OA Revamp 7464:5085](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=7464-5085), [OA Revamp 3098:2921](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=3098-2921), [E-rickshaw 6447:10074](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=6447-10074)

<a id="p37"></a>
## P37 · Order alert over other screens — Keep

**When:** App in background or captain on a trip.

**Structure:** One compact order card pinned at top over the current screen/map; tap opens the list; 'see more' only when >1; nav pill turns yellow with count.

**Figma:** [OA Revamp 3804:1557](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=3804-1557), [OA Revamp 5235:60902](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=5235-60902), [Home of Orders 879:69362](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=879-69362), [Bundle Orders 2912:63966](https://www.figma.com/design/9m56yKp10jrLoIzW1yRmQA/?node-id=2912-63966)

<a id="p38"></a>
## P38 · Order tag row — Keep

**When:** Extra context that is not a theme (GTA distance, Main Road Pick Up, tips).

**Structure:** Row inside the card between route and buttons: icon + short label chip.

**Notes:** Three tag looks; Runway Tag not used.

**Figma:** [OA Revamp 9179:2771](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=9179-2771), [OA Revamp 8267:9358](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=8267-9358)

<a id="p39"></a>
## P39 · Filter pill with attached panel — Keep

**When:** Set an order filter (Go To, Stay In, Services, Customers) without leaving orders.

**Structure:** Pill row under the header → tapped pill becomes a tab with a tinted panel: helper text, toggle rows, footer text actions. Closes on tap outside or after 20 s.

**Figma:** [Home of Orders 2508:63011](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=2508-63011), [Home of Orders 2478:61110](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=2478-61110), [Home of Orders 6265:5630](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=6265-5630)

<a id="p40"></a>
## P40 · No orders: search, refresh, check account — Keep

**When:** On duty and no orders.

**Structure:** 'Searching for orders…' → Refresh after 4 s, then every 20 s → after a while 'or' + 'Not getting orders?' + 'Check Account Status' → status stepper page → result.

**Notes:** Logistics variant suggests switching space instead.

**Figma:** [Home of Orders 879:66238](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=879-66238), [Home of Orders 3879:31074](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=3879-31074), [Home of Orders 3940:161868](https://www.figma.com/design/ytkTDONL0GBKq3mpKhZnve/?node-id=3940-161868), [Logistics 4580:56846](https://www.figma.com/design/nJVb4xUWWcmIUArw5sAxIv/?node-id=4580-56846)

<a id="p41"></a>
## P41 · Bundle order alert — Keep

**When:** Offer 2+ orders as one decision.

**Structure:** Bundle header (₹130+, time, vehicle +2) → order 1 card → '+' → order 2 card (estimate only) → Reject ring + Accept.

**Figma:** [Bundle Orders 244:13289](https://www.figma.com/design/9m56yKp10jrLoIzW1yRmQA/?node-id=244-13289), [Bundle Orders 1624:24794](https://www.figma.com/design/9m56yKp10jrLoIzW1yRmQA/?node-id=1624-24794)

<a id="p42"></a>
## P42 · Between bundle orders — Keep

**When:** Order 1 done; find or assign the next one.

**Structure:** Dimmed home → card: 'Searching' with guarantee line → '2nd Order Assigned' + order card + 'Go to pickup' / not-found card with promised amount / 'Choose in 00:15' list of 2–3 orders.

**Figma:** [Bundle Orders 515:266357](https://www.figma.com/design/9m56yKp10jrLoIzW1yRmQA/?node-id=515-266357), [Bundle Orders 515:266237](https://www.figma.com/design/9m56yKp10jrLoIzW1yRmQA/?node-id=515-266237), [Bundle Orders 517:451623](https://www.figma.com/design/9m56yKp10jrLoIzW1yRmQA/?node-id=517-451623), [Bundle Orders 2909:63027](https://www.figma.com/design/9m56yKp10jrLoIzW1yRmQA/?node-id=2909-63027)

<a id="p43"></a>
## P43 · End of order — Keep

**When:** Trip complete.

**Structure:** Header → stamp → estimated earnings → km/min → split → one feedback question (chips or Yes/No) → sticky Done (or 'Go To 2nd Order' in a bundle).

**Figma:** [E-rickshaw 4372:61320](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=4372-61320), [E-rickshaw 5195:55390](https://www.figma.com/design/Mtv6LZ3AG2DqZmJp6S9KMv/?node-id=5195-55390), [Bundle Orders 247:24218](https://www.figma.com/design/9m56yKp10jrLoIzW1yRmQA/?node-id=247-24218)

<a id="p44"></a>
## P44 · Multistop route — Keep

**When:** Order with stops between pickup and drop.

**Structure:** Route line with a black '2 Stops' pill between pickup and drop.

**Notes:** Not in the OA framework yet.

**Figma:** [OA Revamp 3689:1563](https://www.figma.com/design/NjrI5wZ8ztYRZmUWBAPuDy/?node-id=3689-1563)
