# Proposed CMS Content Model

Status: **Approved content-model planning baseline (2026-09-16)**. Structured content protects the design from accidental layout changes; exact provider schemas remain implementation work.

## `siteSettings` singleton

Site name; default SEO; canonical origin; navigation labels (destinations remain code-controlled); social profiles; default contact email; optional approved analytics/consent configuration.

## `homePage` singleton

Introduction lines; reel video, poster, label/caption, optional link; safe Earth presets for enablement, density, rotation speed, pointer mode, and strength. Advanced shader/layout values remain developer-controlled.

## `workProject`

- Title, unique slug, order, and draft/published/archived state.
- Card poster, separate short delivery-ready muted-loop MP4 preview asset, and accessible preview label. The preview is controller-free on fine-pointer hover and is not the full project video.
- Detail Vimeo URL/video identifier, poster, optional captions/transcript and approved still gallery. Store parsed/validated identifiers, not arbitrary iframe or script markup.
- Summary, narrative blocks, structured credits, optional year/tags.
- SEO title/description and optional share image.
- Published validation requires poster and valid detail presentation.

## `playItem`

- Title, order, and publication state.
- Neutral artwork and optional hover/color artwork or preview.
- Short description.
- Exactly one launch download source: an uploaded/selected asset in approved controlled CMS/object storage. Arbitrary external download URLs are deferred.
- Safe filename, format/size metadata, optional version/license note.

## `aboutPage` singleton

Portrait/video/still and poster/alt; ordered biography blocks; optional CV download only if approved.

## `contactPage` singleton

Invitation, email, social links, availability. Form configuration exists only after form approval and includes consent/privacy and retention.

## Media rules

- Image: file, alt, crop/hotspot, caption/credit, aspect guidance.
- Hover-preview video: Sanity asset reference, validation/upload state, poster, duration, dimensions, encoded size/format, muted-preview flag, and owner-held original reference.
- Full video: normalized Vimeo URL/video identifier, optional privacy hash where required, validation/availability state, poster, duration, captions/transcript, and owner-held original reference. Arbitrary embed HTML/JavaScript is rejected.
- Download: reference, title, safe filename, MIME, size, version, license/readme.
- Every media field explains purpose, aspect, maximum size/duration, and public placement.
- Video state follows the architecture lifecycle; a published record can reference only `ready` media.
- Meaningful speech/audio requires captions/transcript before publication or an explicitly recorded exception. Editors receive flashing/seizure guidance for motion media.
- Original video/download bytes have an independently recoverable authoritative copy; processed renditions alone are not a backup.

## Publishing and deletion

Draft preview precedes publish. Order is explicit and conflict-safe. Archive/unpublish is normal removal. Hard deletion warns about references/reuse. Published slug changes require redirect or explicit broken-link acknowledgement.

Use the CMS-native revision token for optimistic concurrency. Publication state is native draft/published state; `archived` is a separate explicit field that excludes content from public queries. Reordering conflicts never silently overwrite a newer revision.
