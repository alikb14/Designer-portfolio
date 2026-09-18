# Yaad Motion Portfolio — Test Strategy

Status: **Foundation automated baseline implemented; release and physical-device evidence remains open**.

## Quality risks

Visual drift, hover-only inaccessible content, poor mobile composition, Earth frame drops, excess video transfer, wrong-theme flash, draft leakage, unsafe uploads, broken downloads, publication inconsistency, and unrecoverable edits.

## Acceptance criteria traceability

| Criteria | Primary evidence |
|---|---|
| AC-1, FR-1–3 | Browser E2E plus first-load theme capture. |
| AC-2/3, FR-4–6 | Earth math/unit tests plus real browser pointer, reduced-motion, and performance profile. |
| AC-4, FR-7/8 | Pointer, keyboard, touch browser tests plus media-network assertions. |
| AC-5, FR-17–24 | CMS-to-public publish E2E and webhook/revalidation integration tests. |
| AC-6 | Wrong MIME, extension, size, incomplete upload/validation, and retry tests. |
| AC-7 | Missing/unpublished download integration and E2E. |
| AC-8/9 | Accessibility automation plus keyboard/touch/zoom review at target widths. |
| AC-10/11 | Outage recovery and authorization negative tests. |
| AC-12 | Evidence ledger, specialist reviews, production-like smoke, restore/rollback exercise. |

## Unit tests

- Slug generation/collision, schema validation, URL allowlist, filename normalization, publish eligibility, and content mapping.
- Earth projection, rotation, force falloff, damping/return, stable visual density, and the owner-approved motion policy.

## Integration and contract tests

- CMS query shape; published/draft isolation.
- Signed webhook verification, idempotency, duplicates, and out-of-order safety.
- Hover-preview upload/validation states, scrubber frame selection, generated-still readiness, replacement invalidation, and Sanity asset/poster mapping; Vimeo URL/ID parsing, privacy-hash handling, allowlisting, availability, and disabled-embed fallback.
- Download object/redirect headers and missing-object behavior.

## End-to-end and browser/device tests

- Every route, navigation active state, theme persistence, 404/unpublished route.
- Work preview and Play detail/download using pointer, keyboard, and touch.
- Editor draft → preview → publish → reorder → unpublish → restore.
- Widths: 320, 375, 768, 1024, 1440, 1920 px; approved browser matrix.

## Failure, recovery and concurrency tests

- Save/upload/network interruption preserves draft.
- Media upload/validation failure supports replace/retry.
- Concurrent updates show conflict handling or a documented deterministic policy.
- Canvas initialization failure selects fallback.
- CMS/Vimeo/preview/download outage degrades as specified.
- Content and code rollback are exercised.

## Security and performance checks

- Authorization bypass, secret scan, CSP/headers, webhook forgery/replay, malicious file/filename/URL, XSS, and optional Contact abuse.
- Web Vitals, JS/media transfer, Earth long-task/frame-time, and scrolling/navigation with multiple previews.

## Test environments and data

Local/preview nonproduction and production use separate datasets, credentials, webhooks, origins, and media environments. Use synthetic media and representative near-limit files, never private data or secrets. Approve one desktop and one mid-range mobile reference device before the spike.

The checked-in browser suite starts an isolated development server on port 3100 and intercepts only the reserved `fixture1` Sanity hostname inside the test process. This makes layout, failure, and route assertions deterministic without mutating or depending on the owner's live CMS records. Live CMS and deployed-Worker smoke checks remain separate integration evidence.

As of 2026-09-18, 19 unit tests cover media normalization, malformed-sibling isolation, outage fallbacks, download disposition, CSP-origin validation, Vimeo privacy hashes, logger redaction, schema guards, theme/header behavior, preview lifecycle, and Earth math. Twenty-seven Chromium scenarios cover six public routes, HTTP status/content before geometry, 320–1920 px widths, tablet portrait/landscape, multi-row Play content, keyboard/touch behavior, no-JavaScript navigation/content, theme storage denial, preview pausing, Canvas fallback, and 404 behavior.

## Manual verification

- Frame/overlay comparison with supplied references.
- Keyboard-only, screen-reader landmarks/names, 200% zoom, reduced motion, contrast/forced-colors where applicable.
- The actual nontechnical owner completes the critical publish flow without developer guidance.

## Exit criteria

All acceptance criteria trace to observed or automated evidence; applicable checks pass; skips are explicit; independent UX/security/QA findings are resolved or accepted; production-like smoke and rollback/restore evidence exist.
