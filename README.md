# Yaad Motion Portfolio

A production-boundary foundation for Yaad's motion-design portfolio. It is a deliberately minimal Next.js implementation that validates the two riskiest interactions before the accepted Home, Work, Play, About, Contact, and project-detail designs are built.

## Current lifecycle position

Foundation is in progress. The approved plan is kept in [`docs/project`](docs/project), and its lifecycle ledger is [`.project-engineering/state.json`](.project-engineering/state.json). This repository does not claim a deployed production site yet.

## What is included

- Next.js App Router foundation with TypeScript, ESLint, Prettier, Vitest, Playwright, and a small health endpoint.
- Cloudflare Workers compatibility spike through the current `vinext` adapter and Wrangler configuration.
- An interactive ASCII Earth WebGL prototype: adaptive point budgets, pointer displacement, page-visibility and viewport pausing, reduced-motion behavior, and a no-WebGL fallback.
- A Work-card MP4 prototype: muted fine-pointer playback, explicit keyboard control, and no hover-only action on touch.
- Baseline response headers, safe environment-variable boundaries, structured secret-redacting logs, and CI configuration.

## Prerequisites

- Node 24 (see [`.nvmrc`](.nvmrc))
- npm 11
- A Chromium installation for end-to-end checks: `npx playwright install chromium`

Install exactly the locked dependencies:

```powershell
npm ci
```

## Local commands

```powershell
npm run dev
npm run dev:vinext
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
npm run build:vinext
```

The interaction spike is available locally at `/spikes/interactions`. It is deliberately unavailable in a production build unless `ENABLE_RISK_SPIKES=true` is supplied.

## Environment configuration

Copy [`.env.example`](.env.example) to a local `.env` only when the relevant services are provisioned. Never commit it.

| Variable                        | Visibility  | Purpose                                                             |
| ------------------------------- | ----------- | ------------------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public      | Sanity project identifier                                           |
| `NEXT_PUBLIC_SANITY_DATASET`    | Public      | Sanity dataset                                                      |
| `SANITY_API_READ_TOKEN`         | Server only | Authenticated draft/content read token                              |
| `SANITY_REVALIDATE_SECRET`      | Server only | Webhook authentication secret                                       |
| `SANITY_STUDIO_ORIGIN`          | Server only | Studio origin permitted by the CSP frame-ancestor policy            |
| `ENABLE_RISK_SPIKES`            | Server only | Enables Foundation spikes in production for controlled verification |

## Deployment boundary

The runtime target is Cloudflare Workers Free. `vinext` is currently beta and was selected by the current Cloudflare Next.js Workers guidance; its compatibility report is recorded in [ADR 003](docs/project/adr/003-cloudflare-runtime-adapter.md). Do not deploy until the Cloudflare account, Sanity project, Vimeo domains, CSP, cache/revalidation behavior, and release-readiness evidence are configured and reviewed.

## Supplied asset provenance

`public/spikes/earth-reference-preview.mp4` is a copy of the user-supplied `ASCII earth animation.mp4`, used only for the local Work-card risk spike. `public/fonts/IBMPlexMono-Regular.ttf` and `public/fonts/IBMPlexMono-SemiBold.ttf` are extracted from the user-supplied `ofl_fonts.zip`; their license is [SIL Open Font License 1.1](public/fonts/LICENSE.txt). Hashes and the full reference inventory are in [`docs/project/REFERENCE_INVENTORY.md`](docs/project/REFERENCE_INVENTORY.md).

## Verification

Run the quality suite before every commit:

```powershell
npm run check
npm run build:vinext
npm run test:e2e
```

The checked-in CI workflow runs format, lint, type, unit/coverage, native build, Cloudflare-adapter build, and Chromium end-to-end checks on Node 24.
