# Yaad Motion Portfolio — Design Contract

Status: **Approved design baseline (2026-09-16)** from supplied references. Exact font/license, final assets, and runtime fidelity remain delivery evidence.

## Product intent

- Audience: prospective clients/collaborators, recruiters, and motion peers.
- Primary tasks: understand Yaad's work, view projects, download Play files, and make contact.
- Visual character: sparse, monochrome, technical/typewriter, motion-led, and intentionally unpolished in chrome but precise in composition.
- Target devices/locales: responsive desktop/tablet/mobile; English/LTR launch assumption.

## Foundations

- Color: near-white and near-black surfaces/ink; neutral gray placeholders; project media owns color.
- Typography: monospaced/typewriter family with a readable metrics-compatible fallback; exact family/license pending.
- Spacing: large canvas-like outer margins and generous inter-section whitespace.
- Radius/elevation: square media/cards; no routine shadows; pill reserved for the theme switch.
- Breakpoints: content-driven, with acceptance captures at 320/375/768/1024/1440/1920 px.
- Motion: brief purposeful fades/particle resolves; slow Earth rotation; media preview only on intent; reduced-motion equivalent.
- Directionality: LTR at launch. Future RTL needs logical properties and explicit mirrored review.

## Components and patterns

- Navigation: Home separated left, remaining routes grouped right on wide screens; active route uses weight plus semantics.
- Media card: reserved aspect ratio, poster first, lazy video, title/action below.
- Buttons/links: plain text or high-contrast rectangular Download bar; visible focus.
- Feedback: inline, specific, non-destructive; drafts preserved on failure.
- CMS: selected platform's native accessible controls, structured fields, previews, and plain-language help.

## Signature and restraint

- Signature: oversized cropped ASCII/particle Earth, with soft local pointer displacement and elastic return.
- Restraint: no generic gradient, rounded-card dashboard, decorative badge, excessive shadow, or animation on every element.

## Evidence and decisions

- Evidence: supplied screenshots and videos summarized in `REFERENCE_ANALYSIS.md`.
- Approved: preserve supplied visual direction and interactive Earth requirement.
- Approved: responsive adaptations, link-only Contact, input parity, and stable Play description/Download behavior. Exact typography/font license and bounded Play push-versus-overlay mechanics remain implementation evidence.
