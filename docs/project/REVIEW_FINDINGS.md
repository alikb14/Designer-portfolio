# Independent Planning Reviews

Reviewed: 2026-09-15. Evidence type: static inspection of planning artifacts; no implementation/runtime exists.

## Architecture review — historical 2026-09-15 verdict

Verdict at that time: **BLOCK**, superseded by the corrections and owner decisions below.

Blocking themes:

- ADR 001 is not approved and lacks real media, traffic, cost, and account-ownership inputs.
- Sanity/Mux credential handling needed reconciliation; the preferred short-lived server-issued upload model is now proposed.
- Video lifecycle, original ownership, deletion/orphan reconciliation, backup, RPO/RTO, and restore needed definition.
- Publication invalidation needed route/tag/slug/version/idempotency contracts.
- External download URLs conflicted with the “never broken” promise; controlled storage is now the recommended launch scope.
- Capacity reasoning remains provisional.

## UX review — historical 2026-09-15 verdict

Verdict at that time: **REVISE**, superseded by the 2026-09-16 corrections and re-review.

Blocking themes:

- The critical nontechnical CMS journey needed task-level specification.
- Structured editing versus arbitrary Elementor-style layout control needs explicit owner approval.
- Responsive, Contact, Play hover, font, and Earth touch/force decisions remain proposed.
- Pointer/focus/touch parity and state/recovery behavior needed a matrix.
- Captions/transcript and flashing-media governance needed stronger publication rules.
- Visual reference files are not yet portable to a future implementation workspace.

## Security review — historical 2026-09-15 verdict

Verdict at that time: **REVISE**, superseded by the 2026-09-16 corrections, explicit risk acceptance, and re-review.

Blocking themes:

- Authentication, preview-session expiry/revocation/cookies/CSRF, and recovery needed specification.
- Strict environment separation and provider trust/account ownership remain unapproved.
- Provider-level role/service identity permissions needed a matrix.
- Upload/download origin, headers, type/size, quarantine/scanning or accepted risk needed definition.
- Webhook verification, replay/idempotency, limits, event allowlist, and secret rotation needed a provider-specific contract.
- Backup completeness and logging/privacy retention remain owner/implementation decisions.

## Corrections made after review

- Added `OWNER_DECISION_PACKET.md`, `CMS_FLOW_SPEC.md`, and `INTERACTION_STATE_MATRIX.md`.
- Added architecture contracts for video lifecycle, publication invalidation, and credential boundary.
- Strengthened authentication/session, role matrix, environment separation, download safety, webhook, logging, backup, and media accessibility requirements.

## Owner resolution and remaining inputs

On 2026-09-16 the owner approved the planning package, set the site-infrastructure ceiling to $0, selected Sanity Free and Cloudflare Workers Free, explicitly accepted Sanity's hard caps, public datasets, and Administrator-only editing role, and approved Vimeo for full videos with separate short MP4 hover previews. The previous Mux-at-launch, Sanity-hosted-full-video, and static-Pages decisions are superseded.

## Independent re-review — 2026-09-16

- **Security: PASS for architecture planning.** Accepted risks and later runtime/release controls are explicit; no remaining security architecture blocker.
- **Experience design: PASS for planning.** Keyboard preview, Play input parity, captions, link-only Contact, Vimeo full-video behavior, MP4 hover-preview states, responsive behavior, and CMS recovery are coherent. Final font/assets/copy, owner usability testing, and runtime fidelity/accessibility/performance remain later evidence.
- **Architecture: PASS after owner resolution on 2026-09-16.** Sanity Free content/media architecture is coherent, the hybrid Vimeo media model is documented, and the owner selected Cloudflare Workers Free for authenticated server-side preview, signed webhook handling, and bounded revalidation. Static Pages is not the launch topology.

Remaining non-hosting inputs are the private owner account, representative media/bandwidth measurement, final font/license, final assets/copy, technical release ownership, and portable reference-asset availability. These are explicit Foundation, slice-acceptance, or release inputs; they are not inferred.
