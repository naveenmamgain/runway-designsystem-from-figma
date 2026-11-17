# Figma inventory brief (shared by all file reviewers)

Goal: exhaustive, read-only review of one captain-app Figma file to (a) inventory every page and frame and (b) propose candidate UI
patterns ("when the captain needs to do X, the screen is built as Y"). These feed a pattern library for the Runway design system
(this repo). The user requirement: **skip no context**. Every page must appear in the output.

## Rules
- READ ONLY. Never modify the Figma file. use_figma only for read scripts (no create/edit/setPluginData). Before first use_figma, read
  MCP resource `skill://figma/figma-use/SKILL.md` (server `figma`) and pass skillNames "resource:figma-use".
- Reuse Figma sessionId `b127f975-8aa3-453d-9346-e1033375bead` on every Figma call.
- Context matters: you can't screenshot everything at full size. Use get_metadata / use_figma scripts to enumerate; screenshots
  (maxDimension ~600, URL+curl path, not base64) to classify layouts. Save screenshots you cite as evidence to
  `research/figma-inventory/<slug>/<nodeId with : replaced by ->.png`.
- If rate-limited, back off and retry; if access fails call whoami and report.
- Know the existing Runway components: read `components/INDEX.md` and `EXPORT_NOTES.md` in this repo. Runway file key
  `GEdvNUzFqwB2gAbQKZRsIn`. Note when a frame uses Runway components (by name/key) vs local/detached/other-library ones.

## Page tiers
- **A — final**: names containing "Ready for Dev", "Ready for development", "✅", "Final", "Released", "Dev Ticket". Review EVERY
  phone frame: screenshot and record the full record below.
- **B — WIP**: kitchen, exploration, research, UT, ideation, testing, data, wireframes, benchmarking, prototype, comms, etc.
  Enumerate every frame (name, id, size) and screenshot enough to classify each group; record rejected/alternative designs.
- **C — localisation** (page name ends with a language): compare frame count + structure against the source page; record only
  mismatches and layouts that break (truncation, overflow, wrapping). Screenshot a sample per language.
- Divider pages ("---", empty): list them as empty.

## Output (write both files)
1. `research/figma-inventory/<slug>.json`:
```
{ "file": {"key","name","url"},
  "pages": [{"id","name","tier":"A|B|C|divider","frameCount","summary","notes"}],
  "frames": [  // tier A: every phone frame; tier B: every frame (fields may be brief); tier C: only mismatches
    {"id","page","name","size","tier",
     "flow": "e.g. Onboarding > DL upload",
     "task": "what the captain is doing/deciding",
     "container": "full-page | bottom-sheet | modal | home-overlay | fullscreen-takeover | toast/snackbar | card-on-home | other",
     "structure": "top-to-bottom anatomy, e.g. InternalPageHeader(back,title,Help) > hero image > section title > 3x task row(icon,label,arrow) > sticky footer(primary btn disabled, text link)",
     "components": {"runway": [...], "other": [...]},
     "cta": "position + type + states",
     "states": "empty/loading/error/success/disabled variants seen",
     "notes": "inconsistencies, one-offs" } ],
  "patternCandidates": [{"name","whenToUse","structure","components","evidence":[frame ids],"variations","conflicts"}],
  "missingComponents": [{"name","description","evidence":[frame ids]}],
  "openQuestions": [...] }
```
2. `research/figma-inventory/<slug>.md`: human summary — page table (all pages, tier, frame count, one line), pattern candidates with
   evidence links (`https://www.figma.com/design/<key>/?node-id=<id with - >`), conflicts, missing components, open questions.

Final reply to the orchestrator: ≤25 lines — counts (pages/frames by tier), top pattern candidates, conflicts, anything you could
not read. Do not paste the inventory.
