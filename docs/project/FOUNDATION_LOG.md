# Foundation Log

Date: 2026-09-17
Lifecycle: Foundation / in progress
Scope: repository setup, risk correction, and owner-requested reference-aligned page draft

## Implemented

- Created a TypeScript Next.js App Router baseline with native Next scripts and a Cloudflare Workers adapter path.
- Added formatting, linting, type checking, unit tests with coverage, Chromium E2E configuration, a health endpoint, error and not-found boundaries, and CI.
- Added server-side configuration validation and structured logging that redacts credential-like fields.
- Replaced the rejected three-dimensional Earth treatment with a flat 2D Canvas character grid matching the supplied reference: fragmented, irregular geographic glyphs over ocean dots, a coherent low-opacity loading fade with only subtle deterministic point settling, left-to-right geographic drift, and local fine-pointer attraction with spring follow/return. Land glyphs now use seeded per-point mutation windows for temporal/spatial variety without per-frame flicker; stable high-detail grid density with approximately 10% tighter character spacing, page visibility/intersection pausing, the owner-approved always-on motion policy, and Canvas/no-script fallbacks remain unchanged.
- Implemented the Work-card behavior with short local muted preview derivatives from the supplied Project 1 and Project 2 videos, fine-pointer start/stop, explicit keyboard-operable start/stop control, and no touch hover dependency.
- Added clipped internal Work-media zoom and whole-item Play zoom. Play artwork is grayscale at rest and restores project color on hover/focus; transform breathing room plus clipped grid overflow prevents horizontal scrollbar growth.
- Added the CMS requirement for scrubber-based Work preview poster-frame selection, generated still storage, replacement invalidation, and publication validation.
- Added reference-aligned Home, Work, Play, About, Contact, and two project-detail page drafts. Placeholder copy and unavailable Download/Contact actions remain explicit instead of inventing owner content.
- Added a shared page-enter motion and reserved-space typewriter treatment for prominent copy; its short post-fade delay keeps the typing visibly distinct from page entry, and Play hover descriptions restart cleanly on each interaction. Home Reel now uses the supplied Vimeo player embed inside the existing responsive frame and delayed fade-in. Work cards use a small staggered loading settle plus smooth hover scale. Hidden cross-browser scrollbars preserve ordinary wheel, touch, keyboard, and trackpad scrolling. Desktop Play now anchors complete artwork near the viewport bottom while keeping Download controls below the initial viewport; small screens retain natural document flow.
- Rechecked the supplied full website reference with ffprobe/FFmpeg on 2026-09-17. Its Play-hover order is artwork, Download, then the explanatory text; the desktop description layer now follows that order while preserving the owner-requested below-fold Download placement.
- Typewriter instances now remount by route identity and begin just after page-enter fade finishes, making the effect visible on every navigation; its visible typing duration is 0.8 to 1.1 seconds. Work-card titles and static Play-card names intentionally remain plain text, while the Play hover description and project-detail names retain typing. Desktop Play reserves the hover-description area from first render, so its copy only changes opacity and typed characters while title, artwork, and Download scale within stable visual anchors without altering document height or the current scroll position.
- Play now uses one left-to-right `play-grid-enter` reveal layer on the grid, starting at 700ms while visible h1 typing starts immediately. The reveal layer owns the clip path, leaving each card's title, Download control, and reserved hover description unclipped and available throughout the interaction. Work-card titles and static Play-card names remain plain text; Play hover descriptions and project-detail names retain typing. The owner explicitly chose to keep all portfolio motion enabled when the operating system reports reduced motion; the CSS override and Typewriter/Earth runtime branches no longer suppress animation in that state.
- On 2026-09-17, the owner accepted the current Home/Earth, Work, Play, and Vimeo Reel visual state as the baseline for the next Foundation step.
- Restricted embedded frames through the response Content Security Policy to the application itself and Vimeo's official player origin.
- On 2026-09-17, the owner selected Cloudflare's free `workers.dev` subdomain for the initial release, confirmed IBM Plex Mono as the final font, deferred Vimeo-domain allowlisting until a production domain exists, and deferred replacing local Work media with Vimeo links until the media is ready.
- The local `.env.local` was validated on 2026-09-17 without printing or tracking its values: all required public/server variables were present and non-placeholder, no credential-like value used a public prefix, and a native production build loaded the file successfully.
- Added the official `next-sanity` integration, an embedded noindex `/studio` shell, public-only Sanity client configuration, CLI configuration, and constrained schemas for site settings, Home, Work, Play, About, and Contact. Schema validation reports 0 errors and 0 warnings. The public portfolio still uses its existing local fixture content; draft preview, webhooks/revalidation, and public-page CMS reads remain later slices.
- Verified both `development` and `production` datasets are Public and reachable with and without the server Viewer token. The Studio shell is reachable locally, but interactive Studio login is not yet verified because Sanity must allow `http://localhost:3000` with credentials in its CORS settings. The future `workers.dev` origin must be added after deployment identity exists.

## Verified locally

- `npx vinext check`: 95% compatibility, 10 supported capabilities, 1 partial strict-mode note, 0 issues.
- `npm audit`: 0 known vulnerabilities after the final install.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: 4 files / 7 tests passed after the 2D correction; 85.82% statements, 73.33% branches, 80.55% functions, and 86.44% lines. The suite covers stable, staggered glyph mutation in addition to the geographic mask; interactive Canvas behavior remains primarily browser-verified.
- `npm run build`: passed with the expected native Next.js routes.
- `npm run build:vinext`: passed. Vinext reports a static-analysis limitation for route classification; it does not report a compatibility issue.
- `npm run test:e2e`: 18 Chromium tests passed, covering the primary portfolio routes, health endpoint, 2D Earth presence, owner-approved motion under reduced-motion preferences, direct pointer attraction, non-hover preview control, static Earth fallback when Canvas initialization is unavailable, Vimeo frame-origin policy, and horizontal-overflow checks for six routes at 320, 375, 768, 1024, 1440, and 1920 px.
- `npx sanity schema validate`: passed with 0 errors and 0 warnings for the embedded Studio schemas.
- `npm run test`: 5 files / 8 tests passed after the Studio foundation was added; 85.71% statements, 73.75% branches, 81.08% functions, and 86.29% lines.
- `npm run test:e2e`: 19 Chromium tests passed after the Studio foundation was added, including the served noindex Studio shell and the existing public-route matrix.
- Rendered inspection at 1440×1000 and 390×844 confirmed the flat circular ASCII treatment, responsive composition, and deliberate cropped desktop placement from the supplied Home reference.
- Browser inspection with `prefers-reduced-motion: reduce` confirmed the sub-second glyph resolve, faster geographic drift, spring-follow attraction, `pointer-active` transition, and elastic return. At 1920×918, Reel measured `y=370.8…910.8` and remained inside the initial viewport.
- At 1920×918, Work preview playback measured `paused=false`, visible opacity, `scale(1.035)`, and no horizontal overflow. Play hover measured `grayscale(0)`, `scale(1.022)`, and no horizontal overflow.
- The local Home route successfully loads the owner-supplied Vimeo player embed. Production Vimeo privacy/domain settings remain an external configuration gate.

## Not yet verified

- Cloudflare deployment, production headers in the target runtime, Sanity CORS credential-origin configuration and interactive Studio login, Sanity preview/revalidation and poster-frame extraction workflow, production Vimeo privacy/domain configuration, CMS data, physical-device interaction quality, and production observability.

## Constraints and decisions

- `eslint-config-next` currently requires ESLint 9, so the Foundation pins ESLint 9.39.5 despite ESLint's newer major availability. Revisit when the Next configuration supports a compatible current ESLint major or a deliberate lint migration is approved.
- The Cloudflare adapter decision and its limits are recorded in [ADR 003](adr/003-cloudflare-runtime-adapter.md).
- The Earth renderer amendment and the rejected WebGL sphere treatment are recorded in [ADR 002](adr/002-earth-renderer.md).
- Full project motion remains outside the repository in the planned video hosting/CMS flow. Only short, silent Project 1 and Project 2 preview derivatives are included; reference recordings are never published as portfolio media.

## Required next gate evidence

1. Record measured Earth interaction quality on representative physical desktop and mobile hardware. Automated browser coverage now includes the approved motion policy, no-canvas fallback, and the complete viewport-width matrix.
2. Add the local Studio origin to Sanity CORS with credentials, verify owner login at `/studio`, create the owner's initial `workers.dev` deployment identity, and complete the deferred Vimeo media inventory when final links are available.
3. Update lifecycle evidence and handoff; only then evaluate Foundation as passed.
