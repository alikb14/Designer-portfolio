# Yaad Motion Portfolio — Project Brief

Status: **Approved planning baseline (2026-09-16)**. This is planning evidence, not implementation evidence.

## Problem and current reality

Yaad, a 2D motion designer, has a complete visual concept but needs a production portfolio that preserves its minimal monochrome style and motion. Routine changes to reels, projects, images, descriptions, credits, Play downloads, and links must not require code or a developer.

## Target users and operators

- Primary visitor: a prospective client, collaborator, studio, or recruiter.
- Secondary visitor: a peer or learner downloading free Play project files.
- Primary operator: Yaad, a nontechnical editor.
- Technical operator: an occasional developer maintaining rendering, integrations, and deployment.

## Current workaround

The design currently exists as screenshots and two videos. No nontechnical content-maintenance workflow has been defined.

## Desired outcomes and success evidence

- A visitor understands Yaad's discipline and can open a representative project within 10 seconds.
- Yaad can create, edit, reorder, publish, unpublish, and archive Work and Play entries without code.
- Yaad can replace Home reel media, About copy/media, Contact details, and downloads from the CMS.
- The ASCII Earth preserves smooth automatic motion and pointer response without making Home sluggish.
- The site remains usable with keyboard, touch, reduced motion, and both themes.
- A content-only publication needs no developer deployment.

Exact analytics targets and the reference-device matrix are implementation-planning inputs; the current outcome direction is approved.

## Narrowest valuable wedge

Home, Work, one reusable Work detail template, Play with downloads, About, Contact, shared navigation/theme, and a constrained CMS. The CMS edits content and ordering; it does not expose arbitrary layout controls that could break the approved design.

## Goals

- Reproduce the supplied desktop visual language and observed motion.
- Define responsive mobile/tablet adaptations without inventing a new identity.
- Make routine content ownership genuinely nontechnical.
- Render a real interactive ASCII/particle globe rather than a looped video.
- Keep public browsing fast, accessible, secure, and read-only.

## Non-goals

- E-commerce, payments, public user accounts, comments, likes, or community features.
- A fully free-form Elementor-style page builder.
- Editor access to CSS, animation code, arbitrary page structure, or navigation routes.
- Automatic video editing or a general-purpose digital asset management suite.
- Multilingual publication at launch unless explicitly added.

## Constraints

- Supplied screenshots and videos are the visual source of truth.
- Files under `sources/` remain read-only.
- This workspace is planning/handoff only; implementation happens later in a Codex code workspace.
- Launch content is assumed English/LTR until corrected.
- Launch site-infrastructure cost is fixed at $0. Full videos use the owner's Vimeo account; posters, downloads, and short MP4 hover previews must fit Sanity Free asset/bandwidth caps and performance constraints. No automatic paid upgrade is authorized.

## Approved launch assumptions

- One named Editor account is sufficient at launch.
- Work previews are short muted loops; detail videos may use sound and controls.
- Play downloads are public and free.
- Contact will contain at least email or social links; the reference does not show its body.
- A managed CMS/media service is acceptable if it reduces maintenance.

## Delivery class and risk profile

Delivery class: **production**. The system is public, has authenticated administration and uploads, and is intended for long-term owner use.

Primary risks: reference fidelity, video and globe performance, editor usability, upload security, service cost/lock-in, and Contact ambiguity.

## Decision

Proceed with the approved requirements and architecture baseline. Implementation remains reserved for a later Codex code workspace.
