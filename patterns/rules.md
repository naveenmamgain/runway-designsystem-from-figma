# Rules

Apply to every screen. Confirmed 2026-11-16.

- **R01 · Numbers in copy are placeholders** — Numbers must **match the context** (realistic sample values in designs, e.g. ₹50, 2 orders) — never raw `%1$d` on screen. Specs mark them as parameters.
- **R02 · Layouts survive long Indian-language text** — Every layout survives long Indian-language text: pills, buttons, tabs and headers allow 2 lines or shrink; never truncate. Claude flags any overflow found in review.
- **R03 · Fonts cover every Indian script** — Fonts must cover every Indian script used (Kannada, Tamil, Malayalam, Telugu…).
- **R04 · Translations come from the current English page** — Localised pages are regenerated from the current English page after every English change.
- **R05 · One action per nudge** — A nudge card carries exactly one action.
- **R06 · Nudges never block taking orders** — Nudges never block taking orders; blocking needs use the blocking-task sheet (D01).
- **R07 · At most 2 signals on an order card** — *Undecided:* at most 2 signals on an order card (OA framework).
- **R08 · Same thing, same words** — *Undecided:* one approved string per concept.
- **R09 · Final pages use only Runway components** — Final (ready-for-dev) pages use only Runway components; anything missing is added to Runway first.
- **R10 · Audio help next to instructions** — An audio help button sits beside any instruction banner, plan explainer or coachmark.
- **R11 · Every overlay can be dismissed** — Every overlay can be dismissed (× or a button).
