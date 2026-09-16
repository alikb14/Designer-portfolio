# Yaad Motion Portfolio: Engineering Guide

## Scope and source of truth

- `docs/project/` and `.project-engineering/state.json` are the accepted planning package and lifecycle ledger. Preserve their intent; do not redesign accepted screens while the project is in Foundation.
- This repository is the implementation source of truth. The planning mirror at `C:\Users\ali.masood\.codex\.chatgpt-projects\g-p-6aa99fba8dc8819198e2de4eb6a1ebac\docs\project` is read-only reference material.
- The Foundation scope is setup plus the two risk spikes only. Page implementation begins after the Foundation gate is evidenced.

## Commands

Use npm and the committed lockfile. Node 24 is the supported local and CI runtime.

```powershell
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run build:vinext
npm run test:e2e
```

`npm run dev` tests the native Next.js development path. `npm run dev:vinext` and `npm run build:vinext` test the Cloudflare Workers adapter. Deploying is an explicit release operation; do not run `npm run deploy` without the required account configuration and approval.

## Security and content boundaries

- Never commit `.env*` files except `.env.example`, credentials, Sanity tokens, webhook secrets, or Cloudflare credentials.
- `NEXT_PUBLIC_*` values are public by design. Keep `SANITY_API_READ_TOKEN` and `SANITY_REVALIDATE_SECRET` server-only.
- Keep every production header change reviewed. The current CSP baseline is intentionally narrow and must be revisited when Sanity Studio or Vimeo domains are configured.
- Keep large/full motion work on Vimeo or a CMS-approved host. The repository only contains the provided, short risk-spike MP4.

## Quality and accessibility

- Prefer semantic HTML, keyboard-operable controls, visible focus, reduced-motion behavior, and responsive layouts.
- Do not make hover the only way to invoke an essential action. Motion must pause when off-screen or when the page is hidden.
- Add unit coverage for deterministic logic and Playwright coverage for critical journeys when each approved page is implemented.

## Git

- Keep commits focused, conventional, and in English.
- Review `git diff --check`, status, and applicable quality commands before each commit.
- Do not force-push, rewrite history, or deploy without explicit user approval.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
