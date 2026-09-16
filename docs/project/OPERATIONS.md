# Yaad Motion Portfolio — Deployment and Operations

Status: **Approved operations planning baseline (2026-09-16)**; provider-specific runbooks, named ownership, and tested recovery remain future Foundation/release evidence.

## Environments and configuration

Local and preview use the nonproduction Sanity Free dataset; production uses the separate production dataset. Credentials, webhooks, and origins remain separate. Validate configuration and keep secrets in Sanity/Cloudflare secret stores.

## Deployment procedure

Pull-request checks → preview deployment → owner visual/content acceptance → production promotion → post-release smoke. Content publication is a separate editorial action with preview and revision recovery.

## Database/data migrations

Sanity option: version schemas in code, retain backward-compatible queries during rollout, export before destructive transformations, and run bounded migrations with dry-run/reporting. Payload option additionally requires database migrations and backup discipline.

## Backup and restore

- Scheduled structured content export with documented retention.
- Media manifest mapping CMS records to Sanity image/preview/download asset IDs, Vimeo full-video IDs, and owner-held originals.
- Sanity revision/retention capability and export procedure documented.
- Representative restore exercise before first release and after consequential changes.
- Proposed planning targets: content/media-backup RPO 24 hours and service restoration RTO 8 hours, subject to owner approval.
- Store exports encrypted with restricted access; exclude credentials; retain the original authoritative bytes for main videos and downloads rather than only provider IDs.
- Restore testing includes content, original media/download, provider mapping, webhook/configuration recreation, and account/IAM recovery steps.

## Rollback

- Code: redeploy last known-good release.
- Content: restore and republish a previous revision.
- Media: keep old references until replacement verification and rollback window close.
- Earth: feature flag/kill switch selects static fallback.

## Health checks, logs, metrics and alerts

Monitor root and representative detail routes, publication webhook, content freshness, playback errors, broken downloads, 404 trends, Web Vitals, application exceptions, and Earth fallback/adaptive-quality rate. Alerts require a named recipient.

## Capacity and SLOs

Provisional: 99.9% monthly public-route availability excluding agreed provider-wide incidents; PRD performance targets; proposed publication freshness ≤60 seconds. Finalize after service plan and traffic/media estimates.

## Common failure runbooks

- Change not visible: document state → webhook/signature → revalidation → cache/manual recovery → rollback.
- Hover preview unavailable: Sanity asset/reference/format check → poster fallback → replace/re-publish.
- Full video unavailable: Vimeo status/privacy/embed permission/identifier check → poster and narrative fallback → correct or replace the Vimeo reference → re-publish.
- Sanity usage warning (planning default 70%): stop eager preview loading, review the largest assets and traffic sources, recompress/replace media, and retain posters/core content.
- Sanity usage stop threshold (planning default 85%) or exhausted cap: disable preview autoplay and nonessential media actions, keep text/navigation/posters available, wait for reset or reduce/archive assets, and reopen ADR 001 before any paid upgrade.
- Broken download: disable/unpublish → verify object/reference/headers → replace/test → re-publish.
- Earth performance: activate static fallback → inspect metrics → tune density/shader → staged re-enable.
- Editor locked out: named provider account recovery; never bypass authentication.

## Incident ownership and escalation

The portfolio owner owns Sanity, Vimeo, Cloudflare, domain, MFA recovery, exports, original-media backup, and emergency access. Any Vimeo subscription is an existing owner responsibility and is not automatically charged or upgraded by this project. The technical release/on-call person is named before implementation handoff. Private account identifiers and recovery contacts belong in a private operational store, not this repository.

## Post-release verification

Smoke every route/theme, one real project video, one Play download, CMS publish/unpublish/revision recovery, metadata, mobile layout, monitoring, and content freshness from an external network.
