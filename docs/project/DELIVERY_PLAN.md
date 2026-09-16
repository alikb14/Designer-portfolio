# Yaad Motion Portfolio — Delivery Plan

Status: **Approved planning baseline (2026-09-16); no implementation is authorized in this planning workspace**.

## Delivery strategy

Build later in a separate Codex implementation workspace after planning gates are approved. Each vertical slice must include public behavior, CMS fields, accessibility, failure states, and verification. Preserve the reference design.

## Milestones and vertical slices

| Slice | User-visible outcome | Dependencies | Acceptance evidence | Rollback |
|---|---|---|---|---|
| 0. Risk spike | Demonstrable Earth renderer and one preview card using representative media. | Approved architecture and test devices. | Frame-time trace, reduced-motion/no-WebGL fallback, media loading trace. | Discard spike and revisit approach. |
| 1. Foundation/content path | Preview app runs; Editor signs in; one typed draft previews/publishes safely. | Accounts, repo, secrets. | CI baseline, auth denial, schema validation, preview/public isolation. | Revert deployment; retain dataset. |
| 2. Home | Responsive Home with theme, editable copy/reel, and interactive Earth. | Slice 0 and Home schema. | Visual comparison, keyboard/theme checks, performance profile. | Feature flag Earth to static fallback. |
| 3. Work | Editor publishes/reorders; visitors preview and open reusable details. | Media pipeline and Work schema. | CMS-to-public E2E, pointer/focus/touch, 404/unpublish, media failure. | Disable previews or revert templates without deleting content. |
| 4. Play | Editor publishes items/downloads; visitors access files. | Download storage/policy. | Upload validation, filename/type, missing file, responsive/keyboard tests. | Unpublish item or revert Play release. |
| 5. About/Contact | Editable About and approved link-only Contact complete the site. | Final About and Contact copy/links. | Publish E2E; email/social-link validation and keyboard/responsive checks. | Revert content revision while retaining approved direct-contact links. |
| 6. Hardening/release | Owner guide, backups, monitoring, rollback, final review. | All prior slices. | Full traceability, independent reviews, production smoke, restore/rollback evidence. | Redeploy known-good code/content revision. |

## High-risk unknowns and spikes

- Earth fidelity versus GPU/frame budget on representative devices.
- Approved pointer force model is local repulsion/displacement with elastic return; the spike tunes radius, strength, density, and frame budget without changing that direction.
- Sanity Free asset/bandwidth caps versus representative posters/hover previews, plus Vimeo plan/privacy/embed behavior; verify before Foundation content import.
- Work preview loop/audio policy.
- Exact Play push-versus-overlay mechanics, within approved stable layout and input parity.
- Final link-only Contact links and exact font/license. Placeholder copy is approved until final copy arrives.

## Foundation work

- Create the implementation repository and a project-level `AGENTS.md` with verified commands.
- Establish Cloudflare/Sanity Free environments, owner-supplied Vimeo integration settings, secret management, two datasets, owner access, branch/PR policy, CI, formatting, lint, type checks, tests, and error monitoring.
- Define Vimeo URL/ID validation, media presets, hover-preview upload limits, poster/caption requirements, placeholder fixture copy, and retention.

## Test and verification mapping

- Maintain PRD requirement/acceptance traceability in `TEST_STRATEGY.md`.
- Compare reference captures at approved breakpoints.
- Test real browser motion, CMS draft/publish/unpublish, Vimeo full-video playback, direct MP4 hover preview/download delivery, cap-aware degradation, and failure recovery.
- Run independent architecture, UX, security, and QA reviews at applicable gates.

## Migration and rollout

- Import initial content to nonproduction; owner reviews every route in preview.
- Validate production domain, accepted Administrator role, webhook signature, Sanity asset references, Vimeo embed/privacy settings, downloads, metadata, and any consent.
- Promote to production only after rollback and operational ownership are documented.

## Release gates

- Requirements, architecture, experience-design, and delivery-plan explicitly passed.
- Definition of Done satisfied or items explicitly waived.
- Production-like smoke, backup/restore sample, content rollback, code rollback, specialist reviews, and owner acceptance complete.
- No unresolved high-severity issue.

## Deferred work

Multilingual/RTL publication, more editor roles, protected downloads, advanced analytics, newsletter, blog, commerce, and arbitrary page building.

## Codex handoff boundary

Implementation begins by reading `.project-engineering/state.json`, all `docs/project/` artifacts, and supplied references. The approved planning baseline must be preserved. Foundation must not begin until the remaining pre-Foundation inputs in `OWNER_DECISION_PACKET.md` are recorded.
