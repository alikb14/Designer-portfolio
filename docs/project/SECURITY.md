# Yaad Motion Portfolio — Security and Threat Model

Status: **Approved planning baseline with Foundation implementation evidence through 2026-09-18**. Provider account controls and release controls remain unverified.

## Assets and data classification

- Public: published copy, project metadata, posters, public videos, social links, and public Play downloads.
- Internal: drafts, unpublished projects, editor identity, revision history, deployment metadata.
- Secret: CMS write tokens, video/storage credentials, webhook/session secrets, deployment credentials.
- Potential personal data: Contact submissions and analytics identifiers, only if approved.

## Actors and trust boundaries

Actors are visitor, owner/Administrator, developer/operator, Sanity, Vimeo, Cloudflare, and attacker. Boundaries are public browser↔site, owner↔Sanity Studio/Vimeo, public app↔Sanity/Vimeo Player, webhook↔site, and uploaded file↔public delivery.

## Authentication and session model

Use Sanity identity/session controls with MFA for the named portfolio owner and any developer/operator. Sanity Free lacks the narrower Editor role, so the owner uses Administrator access as an explicitly accepted zero-cost limitation; shared credentials are prohibited. Preview uses Secure, HttpOnly, appropriate SameSite cookies, CSRF protection, idle/absolute expiry, revocation, explicit preview exit, and safe account recovery. Public queries and expired/revoked preview sessions must never expose drafts.

## Authorization model

- Public: read published content and public files.
- Owner/Administrator: portfolio content/media CRUD and publish plus the broader Sanity Free administrative capability explicitly accepted by the owner.
- Developer/operator: schemas, integrations, releases, and secrets.
- Enforce provider/server-side; hidden UI is not authorization.

| Identity | Published read | Draft read/preview | Content/media write | Publish | Revalidate webhook | Schema/secrets/export |
|---|---:|---:|---:|---:|---:|---:|
| Public browser/runtime | Yes | No | No | No | No | No |
| Named owner/Administrator | Yes | Yes | Yes | Yes | No webhook secret access | Yes; broader Free-plan role accepted |
| Revalidation service identity | Minimum query only | No | No | No | Yes, bounded | No |
| Technical operator | Yes | As approved | As approved | As approved | Manage | Yes, least privilege |

## Untrusted inputs and interfaces

Rich text, titles/slugs, URLs, filenames, bytes/metadata, webhooks, query parameters, and optional Contact fields. Render rich text through approved components; never allow editor-supplied raw script/HTML.

## Secrets and key management

Use provider secret stores, minimum scopes, separate environments, and a rotation procedure. Never expose write tokens in public bundles, logs, screenshots, or project docs.

## Network, file and external-service access

- HTTPS only, restrictive CORS, and signed webhooks.
- Allowlisted schemes/hosts for ordinary external links. Full-video inputs accept only normalized Vimeo URLs/IDs (including a validated privacy hash when required); never render editor-supplied iframe HTML or scripts. Launch downloads use approved controlled CMS/object-storage assets only; arbitrary external download URLs are deferred.
- Validate MIME, extension, size, and filenames; prevent active content executing on the site origin.
- Upload delivery-ready media through authenticated Sanity Studio; public clients never receive mutation credentials.
- Production and nonproduction use separate datasets, credentials, webhooks, origins, and media environments.
- Downloads use controlled storage at launch, a separate untrusted-content origin, forced attachment disposition, safe declared content type, and `nosniff`. Allowed formats/sizes and malware-scanning or explicit non-scanning risk acceptance must be recorded before launch.

## Sensitive logging and audit

Log event type, record ID, Sanity asset/document status, and correlation ID—not tokens, signed URLs, raw files, or Contact body. Retain available revision history and independent exports according to policy.

Before observability or analytics is enabled, record fields collected (including IP, user agent, referrer, query strings, preview parameters), redaction, access roles, retention/deletion, geographic handling, and privacy-owner approval. Analytics remains off by default.

## Threats and mitigations

| Threat | Attack path | Mitigation | Residual risk |
|---|---|---|---|
| Unauthorized publishing | Stolen/shared owner session | Named account, MFA, secure session, revision history, and no shared credentials | Administrator role is broader than ideal; Sanity/account compromise |
| Draft leakage | Public query/token requests drafts | Published perspective only; server preview token; negative tests | Misconfiguration regression |
| Malicious upload | Spoofed MIME, polyglot, oversized file | Type/extension/size validation, delivery-format restrictions, safe rendering/origin/headers | Novel browser/provider/parser flaw |
| Webhook forgery/replay | Public revalidation endpoint | Signature, timestamp/replay defense, idempotency, bounded targets | Secret theft |
| CMS-content XSS | Rich text, unsafe URL, or pasted embed markup | Typed rendering, no raw HTML, strict Vimeo URL/ID parsing, CSP | Unsafe future component or provider compromise |
| Unsafe/broken download | Malicious or missing controlled asset | Approved asset references, validation, separate untrusted-content origin, forced attachment, and pre-publish readiness checks | Storage/provider compromise |
| Contact spam/privacy | Public form | Form omitted by default; if approved add rate limiting, bot defense, retention | Spam/false positives |
| Supply-chain compromise | Framework/CMS dependency | Lockfile, minimal dependencies, review/update, CI scan | Zero-day |

## Security verification

Independent security review before architecture approval and pre-release; authorization negative tests; secret/dependency scan; CSP/header validation; upload, webhook, XSS, URL, and optional Contact tests.

Foundation verification on 2026-09-18 established published-only tokenless public reads, per-record runtime normalization, strict Vimeo video/hash parsing, forced Sanity CDN attachment URLs, validated CSP origin construction, unavailable-CMS recovery, and safe rejection of malformed asset/slug/URL data. A refreshed `npm audit` exposed 14 transitive Sanity CLI advisories; narrow compatible overrides upgraded `adm-zip`, `js-yaml`, `smol-toml`, and `uuid`, after which the audit reported zero known advisories. A pattern scan across all 56 reachable local commits found no private-key, GitHub-token, or AWS access-key pattern. These are point-in-time checks, not guarantees against future advisories or credentials outside Git history.

Webhook verification must use the provider-documented algorithm over the raw request body, enforce timestamp tolerance, accepted event types, request-size/rate limits, idempotency/duplicate storage, bounded invalidation, failure responses, and secret rotation with negative tests.

## Accepted risks

The owner explicitly accepted Sanity Free's hard caps, public datasets, Administrator-only editing role, and the Vimeo-full-video/Sanity-MP4-preview split on 2026-09-16 in exchange for a $0 site-infrastructure ceiling. This is an accepted architecture risk, not evidence that runtime controls have been verified. Sanity/Vimeo/Cloudflare availability, Vimeo privacy/branding/account limits, provider lock-in, Administrator compromise, cap exhaustion, and redistribution of public downloads remain tracked residual risks requiring implementation and release review.

Before release, record and enforce Play download formats and size limits plus malware-scanning or explicit non-scanning acceptance; verify Sanity and Cloudflare account MFA/least privilege; implement and test signed preview/revalidation if those endpoints are added; verify Vimeo domain/privacy settings with final media; and decide whether the public site and embedded Studio should be separated so a stricter script/style CSP can protect public routes without breaking Studio. No production deployment or provider-setting change was made by the 2026-09-18 hardening work.
