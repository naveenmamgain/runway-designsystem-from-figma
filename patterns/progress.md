# Patterns: Progress and status

Confirmed in the design review of 2026-11-16 (see [README](README.md)). Use a **Keep** pattern as written; never use a **Rejected** one.

<a id="p45"></a>
## P45 · Progress tracker card — Keep

**When:** Captain has an active goal (earnings, rides, time).

**Structure:** Status tag + plan name + fee → '₹x/₹500' with bar → segmented rides bar '6/9 rides' → status line with icon.

**Notes:** Blue on home, green on plan page.

**Figma:** [My Plans 2.0 7469:20601](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=7469-20601), [My Plans 2.0 7555:15884](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=7555-15884), [My Plans 2.0 7125:18268](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=7125-18268)

<a id="p46"></a>
## P46 · Milestone timeline — Keep

**When:** Reward unlocks over steps.

**Structure:** Status header (title, Tag, 'x/3 completed') → vertical steps: done (green number, time, +₹) / locked (grey lock, deadline) → dashed connector.

**Figma:** [Referral flow 1018:8656](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1018-8656), [Referral flow 1028:8921](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1028-8921), [Referral flow 1020:8780](https://www.figma.com/design/womPCP4eD8g7afb69X5f6v/?node-id=1020-8780)

<a id="p47"></a>
## P47 · Onboarding status checklist — Keep

**When:** Show progress across onboarding steps.

**Structure:** Banner coloured by overall state (blue pending / peach verifying / red failed) with 'N steps left' → step cards with status and trailing Upload / hourglass / Upload Again.

**Review decision:** Confirmed as the onboarding use of the ChecklistCard (D08).

**Figma:** [New Onboarding 1348:25620](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1348-25620), [New Onboarding 1348:25756](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=1348-25756), [New Onboarding 2663:2420](https://www.figma.com/design/ziTJqlUlTBuE27ZytNvCTi/?node-id=2663-2420)

<a id="p48"></a>
## P48 · Earning-loss nudge inside a card — Undecided

**When:** Show money missed and a switch-plan action on Earnings / order details.

**Structure:** Light-blue panel inside Today's Earnings: logo, 2 lines ('You missed ₹100 today…'), pill button.

**Notes:** Text overflows in 6 of 7 languages.

**Figma:** [My Plans 2.0 5247:33647](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=5247-33647), [My Plans 2.0 4606:9567](https://www.figma.com/design/6QRvGOUAYtTm6T6L6VTnxR/?node-id=4606-9567)
