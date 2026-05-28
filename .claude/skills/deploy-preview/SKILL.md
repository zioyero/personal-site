---
name: deploy-preview
description: Build and deploy a one-off Vercel preview (non-production) for the current working tree, then report the preview URL. Use to sanity-check changes before pushing to main (which triggers a production deploy).
disable-model-invocation: true
---

Run a Vercel preview deploy for the current state of the working tree (uncommitted changes included) and report the URL.

## Steps

1. Confirm the user is in `/Users/zioyero/dev/resume-site/` (the only Vercel-linked project here).
2. Run `vercel` (no flags — defaults to a preview, not production).
3. Wait for the build to finish and grab the preview URL from the output (the line starting with `https://resume-site-...vercel.app`).
4. Run a quick smoke test: `curl -sI <url>/` and `curl -sI <url>/explorations.html` — both should return 200.
5. Report the URL to the user.

## Notes

- This does NOT replace what's live at `zioyero.com`. The custom domain is only attached to production deploys (created via `git push` to main or `vercel --prod`).
- Preview URLs are publicly accessible but unguessable. Fine for sharing for review.
- If `vercel` is missing, install it with `npm install -g vercel` first.
