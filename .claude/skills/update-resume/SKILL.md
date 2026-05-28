---
name: update-resume
description: Guided edit to src/data/resume.js — the single source of truth for resume content. Use when the user wants to change name, title, experience, skills, projects, headlines, contact info, schematic captions, or any other field shown on the resume.
---

`src/data/resume.js` is the only file that holds resume content. Every view (RFCSpec, TerminalResume, MonolithResume, RFCResume) imports from it. Edit it once, all views update.

## Workflow

1. Read `src/data/resume.js` to confirm the current shape of the field the user wants to change.
2. Make the edit with the `Edit` tool — exact string replacement, preserve formatting.
3. If the change is non-trivial (new experience entry, new project, restructured field), grep the components for any references that might need updating:
   ```
   grep -rn "fieldName" src/components/
   ```
4. Verify with `npm run build` that nothing broke (Vite will catch import or syntax errors).
5. Stage, commit with a short message, and push — this auto-deploys.

## Field map — which views consume which fields

| Field | Used by |
|-------|---------|
| `name`, `monogram`, `title`, `company`, `location`, `years`, `email`, `github`, `website`, `linkedin` | All views |
| `about.long`, `about.witty` | Terminal, Monolith |
| `experience[]` — `role`, `co`, `from`, `to` | All views |
| `experience[].wins[]`, `experience[].stack[]` | RFCSpec only (the rich operational history) |
| `experience[].fromYear`, `experience[].toYear` | Monolith, RFCSpec experience table |
| `experience[].short` | RFCSpec, Monolith headline, RFCResume table |
| `experience[].detail` | Terminal, RFCResume table |
| `timelineBands[]`, `timelineRange` | RFCSpec timeline, Monolith scrub timeline, RFCResume, Terminal ASCII timeline |
| `skills.*` | All views (different formatting per view) |
| `projects[]` — `name`, `tags`, `year`, `scale`, `blurb` | RFCSpec, RFCResume, Terminal, Monolith |
| `projectTags[]` | Terminal filter buttons |
| `oss[]` | RFCSpec §10 Public Source |
| `achievements[]` | RFCSpec footer |
| `education[]` | All views |
| `facts[]` | Monolith only (the big-numeral facts band) |
| `architecture.*` | Monolith arch diagram (RFCSpec uses the SVG schematics in `RFCSchematics.jsx` instead) |
| `headlines[]` | RFCSpec (tweakable variant), RFCResume (first variant hardcoded) |
| `snippets.bio`, `snippets.onCall`, `snippets.api` | RFCSpec code blocks |
| `schematics.*` | RFCSpec captions for the 4 SVG figures |

## Gotchas

- `experience[].to: 'now'` is a sentinel — multiple views check for it to render "now" / "pres." / "NOW".
- The Monolith timeline computes positions from `timelineRange.from` / `to` and `timelineBands[].year` — if you add a band outside the range, it'll clip.
- Headlines use `\n` for line breaks (the RFC renders them with `white-space: pre-line`).
- Schematics SVGs themselves live in `src/components/RFCSchematics.jsx` — `resume.js` only holds their titles and captions.
- The 4 SVG schematics + the architecture diagram in Monolith are independently coded — changing `architecture.*` in `resume.js` only affects the Monolith diagram, not the RFCSpec Fig. 1–4 SVGs.
