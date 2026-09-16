# Foundation Log

Date: 2026-09-16
Lifecycle: Foundation / in progress
Scope: repository setup and two approved risk spikes only

## Implemented

- Created a TypeScript Next.js App Router baseline with native Next scripts and a Cloudflare Workers adapter path.
- Added formatting, linting, type checking, unit tests with coverage, Chromium E2E configuration, a health endpoint, error and not-found boundaries, and CI.
- Added server-side configuration validation and structured logging that redacts credential-like fields.
- Implemented the ASCII Earth spike with WebGL rendering, adaptive point budgets (12,000 / 8,000 / 4,000), pointer displacement for fine pointers, page visibility and intersection pausing, reduced-motion static rendering, and an ASCII fallback when WebGL is unavailable.
- Implemented the Work-card spike with a short local muted MP4, fine-pointer start/stop, explicit keyboard-operable start/stop control, and no touch hover dependency.

## Verified locally

- `npx vinext check`: 95% compatibility, 10 supported capabilities, 1 partial strict-mode note, 0 issues.
- `npm audit`: 0 known vulnerabilities after the final install.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: 4 files / 5 tests passed; coverage was 94.11% statements, 91.66% branches, 100% functions, and 93.75% lines.
- `npm run build`: passed with the expected native Next.js routes.
- `npm run build:vinext`: passed. Vinext reports a static-analysis limitation for route classification; it does not report a compatibility issue.
- `npm run test:e2e`: 2 Chromium tests passed, including the non-hover preview control.
- Rendered desktop inspection: the Earth reported `ready` at high quality and the explicit preview control changed from `Preview` to `Stop preview` when activated.

## Not yet verified

- Cloudflare deployment, production headers in the target runtime, Sanity preview/revalidation, Vimeo embedding, CMS data, responsive device matrix, and production observability.

## Constraints and decisions

- `eslint-config-next` currently requires ESLint 9, so the Foundation pins ESLint 9.39.5 despite ESLint's newer major availability. Revisit when the Next configuration supports a compatible current ESLint major or a deliberate lint migration is approved.
- The Cloudflare adapter decision and its limits are recorded in [ADR 003](adr/003-cloudflare-runtime-adapter.md).
- Full project motion remains outside the repository in the planned video hosting/CMS flow. The included MP4 is only the supplied spike asset.

## Required next gate evidence

1. Record measured Earth interaction quality on representative desktop and mobile hardware, including reduced-motion and no-WebGL fallback checks.
2. Obtain owner decisions for Cloudflare account configuration, Sanity project/dataset and token setup, Vimeo domains, final font family confirmation, and media inventory ingestion.
3. Update lifecycle evidence and handoff; only then evaluate Foundation as passed.
