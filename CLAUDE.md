# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal resume site for Adrian Castillejos (Principal Engineer). Vite + React, two HTML entry points:

- `index.html` → `src/main.jsx` → `<RFCSpec />` (the primary RFC-2026 page at `/`)
- `explorations.html` → `src/explorations.jsx` → 3-direction design canvas at `/explorations.html`

Live at `zioyero.com`. Source: `github.com/zioyero/personal-site`.

## Content lives in one file

All resume content (name, experience, skills, projects, snippets, schematics captions, headlines, etc.) lives in `src/data/resume.js` as a default-exported object. Every view imports from there. **Edit that file to change content — never hardcode resume data in a component.** New fields are fine; deletions need a sweep through the components that consume them.

## Deploy pipeline

`git push` to `main` is the deploy. Vercel auto-builds on push and serves to `zioyero.com` within ~10s. There is no staging environment by default. Treat `main` as production.

Before pushing a non-trivial change: spin up `npm run dev`, load the page in a browser, and click through the affected surfaces. There is no test runner.

## Don't restore stripped design-tool plumbing

The components were ported from Claude Design HTML/CSS/JS prototypes. The originals contained design-tool host-bridge code that was intentionally removed during the port:

- `parent.postMessage` edit-mode protocol (in `TweaksPanel.jsx`)
- Sidecar JSON state persistence + host writeback (in `DesignCanvas.jsx`)
- Drag-to-reorder, inline rename, delete UI, PNG/HTML export (in `DesignCanvas.jsx`)

If a re-port from the original bundle ever happens, strip these again — they don't belong on a public site.

## Commands

```
npm run dev       # vite dev server, http://localhost:5173/
npm run build     # outputs to dist/
npm run preview   # serve dist/ locally
vercel            # one-off preview deploy
vercel --prod     # one-off production deploy (rarely needed; push to main instead)
```
