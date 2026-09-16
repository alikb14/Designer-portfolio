# ADR 001 — CMS and media platform

Status: Accepted on 2026-09-16

## Context

The owner must edit content/media without code while the custom public interface remains protected from layout breakage.

## Decision

Use Next.js on Cloudflare Workers Free with Sanity Free for structured content, draft preview, images, controlled Play downloads, posters, and short delivery-ready MP4 hover previews. Use Vimeo embeds for full Work-detail and reel videos; Sanity stores a validated Vimeo URL/video identifier and the related poster/caption metadata rather than arbitrary embed HTML. Do not introduce a separate database, R2, Payload, or Mux at launch. Workers provides the server-side runtime required for secure preview, signed webhooks, and bounded revalidation. Static Cloudflare Pages was rejected because it would require redesigned preview and whole-site rebuild contracts. Mux remains a future revisit option if measured video delivery cannot meet experience/performance needs.

## Consequences

Low editorial and infrastructure burden with strong schema guardrails and no authorized site-infrastructure cost. Sanity Free has hard resource caps, public datasets, and only Administrator/Viewer roles; the single owner must hold Administrator access. Vimeo removes long-form video bytes from the Sanity budget and can provide adaptive delivery, while lightweight first-party MP4 previews preserve immediate controller-free hover behavior. Vimeo plan, privacy, player-branding, storage, and embed availability remain owner-account dependencies. Posters, lazy loading, bandwidth monitoring, exports, and independent originals remain mandatory.

## Alternatives

Payload + Cloudflare D1/R2 gives stronger infrastructure ownership but adds CMS deployment, upgrades, upload engineering, and tighter file capacity. Supabase/Neon provide databases but not the required nontechnical CMS/media workflow. WordPress/custom fields is familiar but adds hosting, maintenance, and plugin/security risk. Mux provides better adaptive streaming but its Free plan stores only ten videos and is therefore deferred rather than made a launch dependency.

## Approval

The owner approved a $0 monthly operating ceiling, explicitly selected Sanity, accepted Sanity Free limitations, approved the Vimeo-full-video plus lightweight-MP4-preview split, and selected Cloudflare Workers Free on 2026-09-16. The Vimeo account is supplied and paid for by the portfolio owner if its chosen features require a paid plan; the site project must not silently create a new charge. Before Foundation, confirm the private owner accounts, create separate production/nonproduction datasets and credentials, inspect the supplied Vimeo plan/embed settings, measure representative preview files, and verify projected asset/bandwidth usage stays within the Free-plan envelopes. Paid upgrades require a new owner decision.

## Revisit when

Measured asset/bandwidth use approaches the Free-plan caps; Vimeo playback, privacy, branding, availability, or account cost becomes unacceptable; MP4 hover previews miss performance targets; the Administrator-only owner role becomes unacceptable; or residency, self-hosting, provider limits, or procurement constraints become material.
