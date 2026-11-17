"""Write patterns/ from the confirmed design review.

Inputs:  research/pattern-catalogue.json  (what was reviewed)
         research/decisions.json          (the user's confirmed answers + follow-up resolutions)
Output:  patterns/README.md, decisions.md, rules.md, <group>.md, components-roadmap.md

Run: python3 research/build_patterns.py
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cat = json.load(open(os.path.join(ROOT, "research", "pattern-catalogue.json")))
dec = json.load(open(os.path.join(ROOT, "research", "decisions.json")))
ans, res = dec["answers"], dec["resolutions"]
OUT = os.path.join(ROOT, "patterns")
os.makedirs(OUT, exist_ok=True)
FILES = cat["files"]
FILES["IC"] = {"name": "Intercity", "key": "AG1dGWEhuZa2r9YxdeaOOi"}


def fig(code, node, label=None):
    f = FILES[code]
    return f"[{label or f['name'] + ' ' + node}](https://www.figma.com/design/{f['key']}/?node-id={node.replace(':', '-')})"


def ev_links(evs, n=4):
    out = []
    for e in evs[:n]:
        if e["code"] == "repo":
            out.append(f"`{e['node']}`")
        else:
            out.append(f"[{e['file']} {e['node']}]({e['url']})")
    return ", ".join(out)


# ---------------------------------------------------------------- final decision text (curated from the confirmed answers)
DECISION = {
    "D01": f"""**Bottom sheet.** A blocking task (merch/gear check, document problem, low wallet, face auth…) shows a bottom sheet
when the captain switches **off duty → on duty**, and when **home opens** while the block is active.
- Sheet structure follows {fig('FA', '1305:3878')}: image → heading → content written for that block → one primary CTA;
  a second CTA only when the use case needs it. Component: [`BlockingSheet`](../components/BlockingSheet/spec.md).
- **Multi-step tasks:** the sheet's CTA opens a full task checklist page ([P01](pages.md#p01)); steps are listed
  **vertically** as [`ChecklistCard`](../components/ChecklistCard/spec.md)s, like {fig('LOG', '4417:37326', 'Logistics Verify Merch')}.
- Not used: home status card as the entry, Action Centre list, red banner under the header.""",
    "D02": """**By vehicle mode.** E-rickshaw trip steps (Arrived / Start / Complete, and Post activation) use **tap + confirm sheet**.
Bike, auto and cab (including Bundle Orders) use **swipe**.""",
    "D03": """**Split by purpose.** Centred card on a scrim for progress ("Please wait") and short success. Bottom sheet for
anything the captain has to read or decide (plan outcomes, blocked, failed).""",
    "D04": """**Both, by rule.** Simple options that need no explanation → radio list, always with **one confirm button in the
sticky footer** (as in "How you want to earn"). Options that need explaining (plans) → cards with **View details** that open a
detail page.""",
    "D05": """**Yellow is the primary.** A page with one CTA → yellow. With two CTAs, **yellow is the action that moves the
captain forward**; the other is white (secondary). Navy/green themed primaries are not used.""",
    "D06": """**Runway Internal Page Header only.** Add a **dark variant** (camera screens) and a **call action**.""",
    "D07": """**Bottom sheet first.** Wrong document → sheet with the image, red error box, Retake + opt-out. If the captain
dismisses it, the page shows the **inline** error (red-bordered image, "Upload again").""",
    "D08": """**One Checklist card everywhere.** The New Onboarding step card (icon tile or thumbnail, label, coloured status,
trailing pill/action) replaces the Logistics task row, home nudge rows and Document Centre cards.
Component: [`ChecklistCard`](../components/ChecklistCard/spec.md).""",
    "D09": """**Floating ×.** Round close button on the scrim, top-right, above the sheet.""",
    "D10": """**Rebuild the Runway order card on the OA framework:** base / sub-service / contextual / preference buckets and
tag row. **Width follows the canvas** it sits on (e.g. 272 beside the 64px tab rail), not a fixed value. Theme variants are
left out for now (C20 skipped).""",
    "D11": """**Neutral/dark snackbar** after turning a setting off. Success of any action is neutral or green; red only for failure.""",
    "D12": """**Red title** on every error sheet.""",
    "D13": """**Runway `Tag`** for standalone status labels (success / warning / error / neutral). Coloured caption text only
inside a ChecklistCard row. No hand-made pills.""",
    "D14": f"""**Intercity bottom nav** ({fig('IC', '2072:113833')}) on every screen that has a bottom nav: round
mode-switch button on the left + floating pill with **Home · Jobs · Credit · Orders** (count badge on Orders).
The second tab is labelled **"Jobs"**. Component: [`BottomNavigation`](../components/BottomNavigation/spec.md).""",
    "D15": """**Sentence case** for all button labels.""",
    "D16": """**Delivery swipes are coloured by step:** blue **Arrived**, black **Picked** / **Delivered**, red **Reached**.
A deliberate exception to D05's yellow primary, for delivery swipes only. Component: [`SwipeButton`](../components/SwipeButton/spec.md).""",
    "D17": """**The swipe is never disabled.** If the photo is compulsory and missing, swiping **Picked** opens the camera with a
"Photo is compulsory" panel, then continues. (Unlike the P01 checklist page, where Complete stays disabled.)""",
    "D18": """**The "Amount collected" card gets a button** ("Enter OTP"), like the Food-ready pop-up. No auto-advancing overlays:
R11 holds.""",
}

RULE = {
    "R01": "Numbers must **match the context** (realistic sample values in designs, e.g. ₹50, 2 orders) — never raw `%1$d` on screen. Specs mark them as parameters.",
    "R02": "Every layout survives long Indian-language text: pills, buttons, tabs and headers allow 2 lines or shrink; never truncate. Claude flags any overflow found in review.",
    "R03": "Fonts must cover every Indian script used (Kannada, Tamil, Malayalam, Telugu…).",
    "R04": "Localised pages are regenerated from the current English page after every English change.",
    "R05": "A nudge card carries exactly one action.",
    "R06": "Nudges never block taking orders; blocking needs use the blocking-task sheet (D01).",
    "R07": "*Undecided:* at most 2 signals on an order card (OA framework).",
    "R08": "*Undecided:* one approved string per concept.",
    "R09": "Final (ready-for-dev) pages use only Runway components; anything missing is added to Runway first.",
    "R10": "An audio help button sits beside any instruction banner, plan explainer or coachmark.",
    "R11": "Every overlay can be dismissed (× or a button).",
}

PATTERN_NOTE = {  # comments / resolutions that change a pattern
    "P01": "Rows are **ChecklistCard**s (D08). Reached from the blocking sheet's CTA (D01).",
    "P27": f"Reference for on-duty home: {fig('HP', '51:4186')}. Off-duty: {fig('IC', '2072:113833')} (Actions grid instead of map).",
    "P31": "Entry points are **Navigation** (bottom nav), **Storyly** (stories row), **Actions** grid and **Only for you** carousel — see the two home frames above.",
    "P47": "Confirmed as the onboarding use of the ChecklistCard (D08).",
    "P49": "Order ID band and earnings band are shown on **parcel and food delivery** orders (same look); hidden only on normal bike-taxi orders. Swipe colours per D16. Components: [`OrderIdBand`](../components/OrderIdBand/spec.md), [`SwipeButton`](../components/SwipeButton/spec.md).",
    "P50": "Food pickup is titled **\"Collect food\"** (\"Collect Parcel\" in the file is a mistake). The payment status card shows *collect payment* or *amount collected online* depending on the customer's payment choice. Stop details cards are **not collapsible**. Components: [`StopDetailsCard`](../components/StopDetailsCard/spec.md), [`PaymentStatusCard`](../components/PaymentStatusCard/spec.md), [`EarningsWaitTimerCard`](../components/EarningsWaitTimerCard/spec.md), [`SwipeButton`](../components/SwipeButton/spec.md).",
    "P51": "If the photo is compulsory and missing, the swipe opens the camera (D17).",
    "P52": "Title must not truncate (R02): \"Complete pickup\" / \"Complete delivery\". OTP input component is deferred (C29 Later).",
    "P53": "Component: [`EarningsWaitTimerCard`](../components/EarningsWaitTimerCard/spec.md).",
    "P54": "The \"Amount collected successfully\" card has an **Enter OTP** button (D18).",
}
VERD = {"yes": "Keep", "no": "Rejected", "maybe": "Undecided", "": "Keep, with changes"}


def pattern_status(pid):
    a = ans[pid]
    if pid == "P47":
        return "Keep"
    if pid == "P31":
        return "Keep, with changes"
    return VERD.get(a["verdict"] or "", a["verdict"])


groups = {}
for it in cat["items"]:
    if it["kind"] == "pattern":
        groups.setdefault(it["group"], []).append(it)

GROUP_TITLE = {"pages": "Pages", "overlays": "Overlays (sheets, cards, snackbars)", "home": "Home", "orders": "Orders",
               "progress": "Progress and status", "delivery": "Delivery (B2B parcel and food)"}

for g, items in groups.items():
    lines = [f"# Patterns: {GROUP_TITLE.get(g, g)}", "",
             "Confirmed in the design review of 2026-11-16 (see [README](README.md)). "
             "Use a **Keep** pattern as written; never use a **Rejected** one.", ""]
    for it in items:
        st = pattern_status(it["id"])
        lines += [f'<a id="{it["id"].lower()}"></a>', f"## {it['id']} · {it['title']} — {st}", ""]
        if st == "Rejected":
            lines += [f"Do not use. ({it.get('when', '')})", ""]
            continue
        lines += [f"**When:** {it.get('when', '')}", "", f"**Structure:** {it.get('structure', '')}", ""]
        if it.get("notes"):
            lines += [f"**Notes:** {it['notes']}", ""]
        if it["id"] in PATTERN_NOTE:
            lines += [f"**Review decision:** {PATTERN_NOTE[it['id']]}", ""]
        elif ans[it["id"]].get("comment"):
            lines += [f"**Review comment:** {ans[it['id']]['comment'].strip()}", ""]
        lines += [f"**Figma:** {ev_links(it.get('evidence', []))}", ""]
    open(os.path.join(OUT, f"{g}.md"), "w").write("\n".join(lines))

# decisions.md
L = ["# Design decisions", "", "Each decision settles a place where the Figma files disagreed. Confirmed 2026-11-16.", ""]
for it in cat["items"]:
    if it["kind"] == "decision":
        L += [f'<a id="{it["id"].lower()}"></a>', f"## {it['id']} · {it['title']}", "", DECISION[it["id"]], "",
              f"*Why it came up:* {it.get('context', '')}", ""]
open(os.path.join(OUT, "decisions.md"), "w").write("\n".join(L))

# rules.md
L = ["# Rules", "", "Apply to every screen. Confirmed 2026-11-16.", ""]
for it in cat["items"]:
    if it["kind"] == "rule":
        L += [f"- **{it['id']} · {it['title']}** — {RULE[it['id']]}"]
open(os.path.join(OUT, "rules.md"), "w").write("\n".join(L) + "\n")

# components-roadmap.md
EXISTS = {"C01": None}
buckets = {"build": [], "later": [], "skip": []}
for it in cat["items"]:
    if it["kind"] == "component":
        v = ans[it["id"]]["verdict"] or {"C28": "build", "C30": "build"}[it["id"]]
        buckets[v].append(it)
DONE = {"ChecklistCard": "D08", "BlockingSheet": "D01", "BottomNavigation": "D14"}
L = ["# Component roadmap", "", "From the review. **Build** = add to Runway; **Later** = not now; **Skip** = never.", "",
     "Built: `ChecklistCard` (D08), `BlockingSheet` (D01), `BottomNavigation` v2 (D14), `SwipeButton` (C28), "
     "`StopDetailsCard` (C30, not collapsible), `PaymentStatusCard` (C32), `EarningsWaitTimerCard` (C33), `OrderIdBand` (C34).", ""]
for b, title in [("build", "Build"), ("later", "Later"), ("skip", "Skip")]:
    L += [f"## {title}", "", "| ID | Component | Detail | Figma |", "|---|---|---|---|"]
    for it in buckets[b]:
        note = {"C01": " *(replaced by ChecklistCard, D08)*", "C28": " ✅ built", "C30": " ✅ built (not collapsible)",
                "C32": " ✅ built", "C33": " ✅ built", "C34": " ✅ built", "C14": " *(status display only)*"}.get(it["id"], "")
        L += [f"| {it['id']} | {it['title']}{note} | {it.get('detail', '')} | {ev_links(it.get('evidence', []), 2)} |"]
    L += [""]
open(os.path.join(OUT, "components-roadmap.md"), "w").write("\n".join(L))

# README.md
L = ["# Runway patterns", "",
     "How Runway components are put together into captain-app screens. Derived from a full review of 10 Figma files "
     "(364 pages, ~6,100 frames) and confirmed card by card by the design owner on 2026-11-16 (101 cards).", "",
     "**Before designing a screen:** find the matching pattern below and follow its structure; check [decisions](decisions.md) "
     "and [rules](rules.md). Never use a pattern marked *Rejected*. If nothing fits, say so instead of inventing one.", "",
     "| File | Contents |", "|---|---|",
     "| [decisions.md](decisions.md) | 15 decisions where the Figma files disagreed |",
     "| [rules.md](rules.md) | 11 rules for every screen |"]
for g in groups:
    L += [f"| [{g}.md]({g}.md) | {GROUP_TITLE.get(g, g)}: {len(groups[g])} patterns |"]
L += ["| [components-roadmap.md](components-roadmap.md) | Which new components to build, defer or skip |", "",
      "## Quick index", "", "| ID | Pattern | Status |", "|---|---|---|"]
for g, items in groups.items():
    for it in items:
        L += [f"| [{it['id']}]({g}.md#{it['id'].lower()}) | {it['title']} | {pattern_status(it['id'])} |"]
L += ["", "## Example: Verify Merch", "",
      "Captain taps **Go on duty** while merch is unverified → [BlockingSheet](../components/BlockingSheet/spec.md) "
      "(image, \"Verify your merch\", one-line reason, yellow **Verify now**) → [P01 Task checklist page](pages.md#p01): "
      "Internal Page Header with Help, hero image, three ChecklistCards (T-shirt selfie, Bag, Raincoat), sticky disabled "
      "**Complete** until all are verified, tertiary link \"Apply for merch →\".", "",
      "## Example: parcel delivery", "",
      "Order alert → [P49 trip map](delivery.md#p49) with order ID + earnings bands, blue **Arrived** swipe → "
      "[P50 Collect parcel](delivery.md#p50) (payment status, pickup details, items, photo tile, black **Picked** swipe) → "
      "[P51 photo](delivery.md#p51) → [P54 payment](delivery.md#p54) → \"Amount collected\" card with **Enter OTP** → "
      "[P52 OTP](delivery.md#p52) → trip map to drop, red **Reached** swipe → Complete delivery, black **Delivered** swipe → "
      "drop OTP if required → [P43 end of order](orders.md#p43). Food: same, with [P53 wait timer](delivery.md#p53), no payment or pickup OTP.", "",
      "Sources: `research/pattern-catalogue.json`, `research/decisions.json`. Regenerate: `python3 research/build_patterns.py`."]
open(os.path.join(OUT, "README.md"), "w").write("\n".join(L) + "\n")
print("wrote", sorted(os.listdir(OUT)))
