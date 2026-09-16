# Foundation Log

Date: 2026-09-16
Lifecycle: Foundation / in progress
Scope: repository setup, risk correction, and owner-requested reference-aligned page draft

## Implemented

- Created a TypeScript Next.js App Router baseline with native Next scripts and a Cloudflare Workers adapter path.
- Added formatting, linting, type checking, unit tests with coverage, Chromium E2E configuration, a health endpoint, error and not-found boundaries, and CI.
- Added server-side configuration validation and structured logging that redacts credential-like fields.
- Replaced the rejected three-dimensional Earth treatment with a flat 2D Canvas character grid matching the supplied reference: fragmented, irregular geographic glyphs over ocean dots, a coherent low-opacity loading fade with only subtle deterministic point settling, left-to-right geographic drift, and local fine-pointer attraction with spring follow/return. Land glyphs now use seeded per-point mutation windows for temporal/spatial variety without per-frame flicker; adaptive grid detail, page visibility/intersection pausing, lower-rate reduced-motion rendering, and Canvas/no-script fallbacks remain unchanged.
- Implemented the Work-card behavior with short local muted preview derivatives from the supplied Project 1 and Project 2 videos, fine-pointer start/stop, explicit keyboard-operable start/stop control, and no touch hover dependency.
- Added clipped internal Work-media zoom and whole-item Play zoom. Play artwork is grayscale at rest and restores project color on hover/focus; transform breathing room plus clipped grid overflow prevents horizontal scrollbar growth.
- Added the CMS requirement for scrubber-based Work preview poster-frame selection, generated still storage, replacement invalidation, and publication validation.
- Added reference-aligned Home, Work, Play, About, Contact, and two project-detail page drafts. Placeholder copy and unavailable Download/Contact actions remain explicit instead of inventing owner content.
- Added a shared page-enter motion and reserved-space typewriter treatment for prominent copy; its short post-fade delay keeps the typing visibly distinct from page entry, and Play hover descriptions restart cleanly on each interaction. Reel has a delayed fade-in and Work cards use a small staggered loading settle plus smooth hover scale. Hidden cross-browser scrollbars preserve ordinary wheel, touch, keyboard, and trackpad scrolling. Desktop Play now anchors complete artwork near the viewport bottom while keeping Download controls below the initial viewport; small screens retain natural document flow.
- Rechecked the supplied full website reference with ffprobe/FFmpeg on 2026-09-17. Its Play-hover order is artwork, Download, then the explanatory text; the desktop description layer now follows that order while preserving the owner-requested below-fold Download placement.
- Typewriter instances now remount by route identity and begin just after page-enter fade finishes, making the effect visible on every navigation; Work and Play project titles use the same timing. Desktop Play reserves the hover-description area from first render, so its copy only changes opacity and typed characters while title, artwork, and Download scale within stable visual anchors without altering document height or the current scroll position.

## Verified locally

- `npx vinext check`: 95% compatibility, 10 supported capabilities, 1 partial strict-mode note, 0 issues.
- `npm audit`: 0 known vulnerabilities after the final install.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: 4 files / 7 tests passed after the 2D correction; 87.37% statements, 79.31% branches, 80.64% functions, and 88.42% lines. The suite covers stable, staggered glyph mutation in addition to the geographic mask; interactive Canvas behavior remains primarily browser-verified.
- `npm run build`: passed with the expected native Next.js routes.
- `npm run build:vinext`: passed. Vinext reports a static-analysis limitation for route classification; it does not report a compatibility issue.
- `npm run test:e2e`: 4 Chromium tests passed, covering the primary portfolio routes, health endpoint, 2D Earth presence, reduced-motion geographic drift, direct pointer attraction, and non-hover preview control.
- Rendered inspection at 1440×1000 and 390×844 confirmed the flat circular ASCII treatment, responsive composition, and deliberate cropped desktop placement from the supplied Home reference.
- Browser inspection with `prefers-reduced-motion: reduce` confirmed the sub-second glyph resolve, faster geographic drift, spring-follow attraction, `pointer-active` transition, and elastic return. At 1920×918, Reel measured `y=370.8…910.8` and remained inside the initial viewport.
- At 1920×918, Work preview playback measured `paused=false`, visible opacity, `scale(1.035)`, and no horizontal overflow. Play hover measured `grayscale(0)`, `scale(1.022)`, and no horizontal overflow.

## Not yet verified

- Cloudflare deployment, production headers in the target runtime, Sanity preview/revalidation and poster-frame extraction workflow, Vimeo embedding, CMS data, responsive device matrix, and production observability.

## Constraints and decisions

- `eslint-config-next` currently requires ESLint 9, so the Foundation pins ESLint 9.39.5 despite ESLint's newer major availability. Revisit when the Next configuration supports a compatible current ESLint major or a deliberate lint migration is approved.
- The Cloudflare adapter decision and its limits are recorded in [ADR 003](adr/003-cloudflare-runtime-adapter.md).
- The Earth renderer amendment and the rejected WebGL sphere treatment are recorded in [ADR 002](adr/002-earth-renderer.md).
- Full project motion remains outside the repository in the planned video hosting/CMS flow. Only short, silent Project 1 and Project 2 preview derivatives are included; reference recordings are never published as portfolio media.

## Required next gate evidence

1. Record measured Earth interaction quality on representative desktop and mobile hardware, including reduced-motion and no-canvas fallback checks.
2. Obtain owner decisions for Cloudflare account configuration, Sanity project/dataset and token setup, Vimeo domains, final font family confirmation, and media inventory ingestion.
3. Update lifecycle evidence and handoff; only then evaluate Foundation as passed.
