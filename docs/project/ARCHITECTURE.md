# Yaad Motion Portfolio — Architecture

Status: **Approved planning baseline (2026-09-16)**. The owner accepted the documented Sanity Free limitations, hybrid Vimeo media model, and Cloudflare Workers Free runtime. Foundation remains a later Codex activity.

## Context and quality attributes

The system has two surfaces: a highly custom motion-led public portfolio and a guarded editorial interface. Priorities are reference fidelity, smooth media/particle performance, editor independence, secure uploads, low operational burden, accessible fallbacks, and portable content.

## Options considered

### A. Next.js on Cloudflare Workers Free + Sanity Free (selected)

- Sanity provides schema-driven editing, drafts, hosted Studio, visual editing/live preview, image handling, file assets, and the structured content database.
- Posters, short delivery-ready MP4 hover previews, images, and controlled Play downloads live in Sanity; full Work-detail and reel videos are Vimeo embeds. Originals remain in independent owner storage.
- Cloudflare Workers Free hosts the Next.js public site and required server-side preview/webhook/revalidation handlers; Sanity's CDN serves lightweight media and Vimeo serves full videos rather than bundling them into the site deployment.
- Best fit for a nontechnical single owner with minimal operations and a $0 monthly ceiling.
- Trade-offs: Sanity's hard Free-plan caps, public datasets, Administrator/Viewer roles only, plus Vimeo-account dependence for privacy, branding, storage, embed behavior, and availability. Hover-preview compression and exports still require discipline.

Official references: [Sanity Studio](https://www.sanity.io/docs/studio), [Visual Editing](https://www.sanity.io/docs/visual-editing), [Sanity assets/video](https://www.sanity.io/docs/content-lake/assets).

### B. Next.js + Payload CMS + PostgreSQL + object storage

- One TypeScript application can own the public site and admin.
- Payload supports upload fields and official storage adapters including S3, R2, and Vercel Blob.
- Strong source ownership and flexible authorization.
- Trade-offs: database, storage, backups, upgrades, and CMS runtime become our responsibility; editor preview/polish requires more implementation.

Official references: [Payload upload field](https://payloadcms.com/docs/fields/upload), [storage adapters](https://payloadcms.com/docs/upload/storage-adapters), [deployment](https://payloadcms.com/docs/production/deployment).

### C. WordPress + custom theme/custom fields

- Familiar admin and broad hosting availability.
- A custom theme can preserve the public design and expose structured fields.
- Trade-offs: plugin/update/security overhead, higher layout-breakage risk if a general page builder is enabled, and more integration work for the custom Earth and previews.

Rejected as the default because this product needs constrained content editing, not arbitrary page composition.

## Decision and trade-offs

Decision: **Option A**, with constrained Sanity schemas, Vimeo embeds for full videos, and direct delivery-ready MP4 assets only for short hover previews. The owner gets clear forms and live preview; layout and animation remain protected in code. This delivers “Elementor-like independence” without exposing design-breaking controls. The site's $0 ceiling assumes any required Vimeo plan is an existing owner-supplied account and is not purchased by this project.

Use Sanity file assets for public Play packages, posters, and optimized short previews. Use a validated Vimeo identifier for full videos; never store arbitrary embed markup or upload uncompressed masters as public delivery files. The owner approved the $0 Sanity baseline, accepted its limitations, and approved this hybrid Vimeo model on 2026-09-16. Vimeo plan/embed settings plus measured preview sizes and bandwidth remain Foundation checks and may trigger reduction/lazy-loading changes or a future owner-approved architecture revisit.

## System context

```text
Editor -> authenticated Sanity Studio -> structured content + posters/preview assets + Vimeo IDs

Visitor -> CDN/Next.js public site -> published Sanity content
                                \-> Sanity image/file CDN / hover MP4 / download asset
                                \-> Vimeo player / full video
```

## Components and boundaries

- **Public web application:** routes, theme, responsive UI, metadata, draft-preview bridge, media players, and Earth renderer.
- **Content schema:** validation, ordering, slug rules, publication state, and references.
- **CMS Studio:** authenticated editing and preview; never a public mutation surface.
- **Media delivery:** Sanity image/file CDN for optimized hover MP4s, posters, captions, and controlled downloads; Vimeo Player for full Work-detail and reel videos.
- **Publication/revalidation hook:** updates only affected public routes.
- **Optional Contact service:** separate boundary, added only if a form is approved.

## Data model and ownership

Sanity is the source of truth for structured content and delivery-asset references. The portfolio owner retains authoritative original media outside Sanity. The repository owns presentation logic, schemas, validation code, and the Earth algorithm. See `CONTENT_MODEL.md`.

## APIs and contracts

- Public content queries request published documents only.
- Draft preview uses an authenticated server session; preview tokens never enter client JavaScript.
- Publication webhooks have verified signatures and identify affected document/slug for bounded revalidation.
- Public lightweight media uses published Sanity asset URLs. Full video uses a validated Vimeo identifier/URL and the official player; raw iframe/script input is never rendered. Write and draft-preview credentials remain server/CMS-side and never enter public bundles.
- Launch downloads resolve only from approved controlled CMS/object-storage assets; arbitrary external download URLs are deferred.

## Data and control flows

### Publish project

1. Editor creates a draft, uploads/selects the poster and short MP4 preview, and enters the full video's Vimeo link/identifier plus captions metadata.
2. CMS validates required fields, slug, preview metadata/limits, the Vimeo host/identifier/privacy-hash format, availability, alt text, captions policy, and credits.
3. Editor opens draft preview.
4. Editor publishes; a signed webhook triggers bounded route revalidation.
5. Public routes query only the published version.

### Play download

1. Editor uploads or selects a file in the approved controlled CMS/object storage and publishes.
2. Visitor activates Download.
3. Static asset or controlled redirect serves a safe filename and content type.

### Earth rendering

1. Initialization generates bounded sphere points and glyph attributes.
2. One WebGL canvas renders glyph-like point sprites or instanced quads.
3. Shader logic applies rotation, depth/luminance glyph choice, and pointer displacement.
4. Pointer coordinates are smoothed and displacement decays elastically.
5. Adaptive quality lowers density/DPR when sustained frame time exceeds budget.

## Trust boundaries and authorization

- Visitor ↔ public app: untrusted requests, read-only content, no secrets.
- Editor ↔ CMS: authenticated session and role checks.
- CMS/app ↔ Sanity: authenticated Editor/Administrator session and server-held preview/revalidation credentials.
- Webhook ↔ app: signature verification, replay/duplicate safety, and narrow invalidation.
- Uploaded files: untrusted until type, size, and processing validation succeeds.

## Failure modes and degraded behavior

| Failure | Public behavior | Editor recovery |
|---|---|---|
| JavaScript disabled | Copy/navigation/posters remain; Earth and previews are absent. | CMS can state JavaScript requirement. |
| WebGL unavailable/context lost | Static or low-motion Earth fallback. | No content impact. |
| Video upload/validation pending or failed | Poster remains; incomplete or invalid video is not published. | Retry or replace without losing the draft. |
| Vimeo unavailable, private, or embedding disabled | Poster and project narrative remain; the player exposes a clear unavailable state without a broken iframe. | Correct Vimeo privacy/embed settings or replace the Vimeo identifier, then republish. |
| CMS query unavailable | Cached/generated content remains where possible; otherwise branded retry. | Preserve draft and show service error. |
| Broken download | No active broken action; failure logged. | Validation flags item before republish. |
| Revalidation failure | Existing public version remains. | Retry/manual revalidate with visible freshness state. |
| Sanity bandwidth approaching cap | Stop eager preview loading and autoplay; retain posters, text, navigation, and explicit click-to-play where safe. | Owner reviews usage and replaces/recompresses media; no automatic paid upgrade. |
| Sanity asset/bandwidth cap exhausted | Core cached/generated pages remain where possible; media actions show a clear unavailable state and posters remain. | Reduce/archive assets or wait for quota reset; reopen ADR 001 before any paid upgrade. |

## Observability

Sample Web Vitals, route errors, 404s, media playback/download errors, webhook failures, content freshness, and Earth fallback/frame-quality events. Logs exclude tokens, message bodies, and signed URLs.

## Deployment topology

Approved topology: Next.js runs on Cloudflare Workers Free so authenticated preview, signed webhook handling, and bounded revalidation remain server-side. Sanity hosts Studio/Content Lake and serves lightweight assets; Vimeo serves full videos; TLS/CDN/DNS terminate at Cloudflare. Nonproduction and production use the two separate Sanity Free datasets plus separate credentials, webhooks, and origins. Cloudflare Pages Free static export was rejected for launch because it would require whole-site deploy-hook rebuilds and a separately designed secure preview mechanism, conflicting with the approved server-side revalidation contract.

## Capacity and scaling assumptions

Assume portfolio-scale reads with bursty traffic after sharing and rare CMS writes. Static delivery and vendor CDNs absorb page reads. Sanity Free currently provides 100 GB assets and 100 GB monthly bandwidth with hard caps; the site therefore uses posters, lazy loading, and short optimized previews, while full videos are lazy-loaded from Vimeo only when needed. Foundation must measure representative preview media, inspect Vimeo account limits/settings, and set warning/degradation thresholds before broad content import. Planning defaults are warning at 70% and stop/degrade at 85% of Sanity monthly bandwidth or asset capacity; confirm provider-visible metrics during Foundation. If representative files cannot fit this envelope, reopen ADR 001 before import rather than enabling paid usage.

## Migration, compatibility and rollback

- Import initial content into a nonproduction dataset.
- Keep schema/query changes backward compatible during rollout where possible.
- Roll back code to the last known-good release and content through CMS history.
- Retain old media references until new media is verified and the rollback window closes.
- Export structured content and maintain a media manifest before vendor migration.

## Revisit conditions

Reconsider Payload if cost, residency, contractual terms, or self-hosted ownership becomes more important than operational simplicity. Add a dedicated download service only if access control, expiring links, or high-volume analytics is required.

## Related ADRs

- `adr/001-cms-and-media-platform.md` — accepted zero-cost Sanity baseline; Free-plan limitations explicitly accepted.
- `adr/002-earth-renderer.md` — accepted for a disposable spike; final presets remain evidence-driven.

## Contracts required before foundation

### Video lifecycle

For Sanity preview assets, authoritative state is `selected → validating → uploading → ready | failed | canceled → replaced/archived`. For Vimeo full videos, it is `entered → validating → ready | unavailable | invalid → replaced/archived`. The content record stores the appropriate asset reference or normalized Vimeo identifier, media metadata, poster/caption references, and independently retained original-source reference. Published content cannot point to incomplete/invalid media. Orphan reconciliation reports unreferenced Sanity assets before deletion; Vimeo removal remains an owner-account action and must not be automated by the site.

### Publication invalidation

Each accepted Sanity webhook carries an event/transaction identifier, document revision/version, type, current slug, previous slug when changed, and timestamp. A deterministic map invalidates the changed detail route, affected listing, metadata dependency, sitemap, and redirect. Duplicate/out-of-order events are ignored safely. Bounded retry and an operational failure queue/status lead to manual revalidation; the prior public version remains until successful regeneration.

### Credential boundary

Approved zero-cost boundary: the single portfolio owner uses Sanity Free Administrator access and MFA; this broader-than-ideal role is an explicitly accepted limitation. Public/runtime identities cannot query drafts, mutate content, administer schemas, export datasets, or read secrets. Server-held preview/revalidation tokens use the narrowest available scopes, and developer access is revocable and time-bounded where practical.
