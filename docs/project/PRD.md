# Yaad Motion Portfolio — Product Requirements Document

Status: **Approved planning baseline (2026-09-16)**. Requirement IDs are stable handoff anchors. Approval does not authorize implementation in this workspace.

## 1. Overview

Yaad Motion Portfolio is a responsive public portfolio with Home, Work, Play, About, Contact, and reusable Work detail pages, plus a private CMS that lets a nontechnical owner manage copy, projects, images, videos, order, publication state, and downloads. Home includes a runtime-rendered ASCII/particle Earth with automatic rotation and soft pointer interaction.

### Problem Statement

The finished visual concept cannot become a maintainable product if routine portfolio updates require source-code edits. The final site must protect the custom design while giving its owner an editor-friendly content workflow.

### Goal

Deliver a faithful, performant portfolio that converts visual references into an accessible responsive experience and makes content-only updates independent of a developer.

## 2. Scope & Out of Scope

### In Scope

- Public routes: Home, Work, Work detail, Play, About, and Contact.
- Shared responsive navigation and persistent light/dark theme.
- Interactive ASCII/particle Earth with graceful fallbacks.
- Work posters, muted previews, project media, narrative, and credits.
- Play artwork, description, and public downloads.
- Private structured CMS with draft preview, publication, reordering, media upload, validation, and recovery.
- SEO metadata, 404/unpublished states, accessibility, performance, security, backup, rollback, and monitoring plans.

### Out of Scope

- Arbitrary drag-and-drop page/layout building.
- Commerce, payments, accounts for visitors, comments, or social features.
- Blog, newsletter, advanced analytics, protected downloads, and multilingual content unless later approved.
- In-CMS video editing/transcoding; delivery-ready MP4 files are prepared before upload.

## 3. User Personas & Use Cases

### Personas

- **Visitor:** prospective client, collaborator, recruiter, or peer reviewing work on desktop or mobile.
- **Downloader:** visitor interested in a free Play project file.
- **Editor:** Yaad, who can maintain content but should not need programming knowledge.
- **Technical operator:** developer responsible for schemas, integrations, releases, and recovery.

### UC-1 — Discover and open a Work project

- **Description:** A visitor lands on Home and reaches a representative project.
- **Pre-conditions:** At least one Work project is published.
- **Post-conditions:** The visitor is on a stable Work detail URL with playable media and readable credits.
- **Main Flow:**
  1. Visitor opens Home and sees introduction, reel, navigation, theme control, and Earth.
  2. Visitor opens Work.
  3. Visitor previews or focuses a project card.
  4. Visitor opens the card and plays the detail media.
- **Alternate / Error Flows:** Reduced-motion/no-canvas fallback replaces Earth motion; touch uses a non-hover card behavior; media failure retains poster and retry; unpublished/unknown slug shows a branded 404.

### UC-2 — Download a Play project

- **Description:** A visitor browses Play and downloads an available file.
- **Pre-conditions:** The item and its download are published.
- **Post-conditions:** A correctly named file from approved controlled storage is delivered.
- **Main Flow:**
  1. Visitor opens Play.
  2. Visitor focuses, hovers, or expands an item.
  3. Visitor reads the short description.
  4. Visitor activates Download.
- **Alternate / Error Flows:** Missing or unpublished downloads never show an active broken action; storage failure shows a recoverable message and is logged.

### UC-3 — Publish a Work project without code

- **Description:** The Editor adds and publishes a project through guided fields.
- **Pre-conditions:** Editor is authenticated and media services are available.
- **Post-conditions:** The public Work grid and detail URL show the approved content without a code deployment.
- **Main Flow:**
  1. Editor creates or duplicates a project draft.
  2. Editor completes title, slug, poster, preview, detail media, narrative, credits, and SEO fields.
  3. Editor waits for upload completion and resolves media validation.
  4. Editor previews the draft.
  5. Editor publishes and verifies the public route.
- **Alternate / Error Flows:** Invalid/oversized media is rejected without losing the draft; slug collisions block publication; failed publication leaves the previous public version unchanged.

### UC-4 — Reorder, unpublish, and recover content

- **Description:** The Editor changes presentation order or removes an item safely.
- **Pre-conditions:** Editor is authenticated; content exists.
- **Post-conditions:** Published order/state matches the edit, and previous content remains recoverable.
- **Main Flow:**
  1. Editor reorders items or selects Unpublish/Archive.
  2. Editor previews the consequence.
  3. Editor confirms publication state.
  4. The affected route revalidates while unrelated content remains intact.
- **Alternate / Error Flows:** Concurrent changes produce visible conflict handling; hard deletion warns about references; webhook failure preserves the prior public version and offers retry.

### UC-5 — Update global/page content

- **Description:** The Editor changes Home reel/copy, About, Contact, navigation labels, or links.
- **Pre-conditions:** Editor is authenticated.
- **Post-conditions:** Approved content is published without layout or animation code changes.
- **Main Flow:**
  1. Editor opens a clearly named page/global document.
  2. Editor changes structured fields and media.
  3. Editor previews both themes and relevant viewport guidance.
  4. Editor publishes.
- **Alternate / Error Flows:** Required fields and unsafe URLs block publication with specific corrections; service failure preserves the draft.

## 4. Functional Requirements

- **FR-1:** The system shall expose Home, Work, Play, About, Contact, and stable Work detail routes.
- **FR-2:** The system shall visually distinguish the active route and provide keyboard/touch-operable navigation.
- **FR-3:** The system shall apply the system theme on first visit, allow manual light/dark selection, persist it on the device, and avoid a wrong-theme flash.
- **FR-4:** Home shall render CMS-managed introduction and reel content plus a code-driven ASCII/particle Earth.
- **FR-5:** The Earth shall remain visually two-dimensional, rotate its geographic mask automatically, attract nearby land glyphs smoothly toward pointer proximity, and return elastically.
- **FR-6:** The Earth shall pause offscreen/hidden, adapt grid detail to device performance, honor reduced motion, and provide a no-canvas/no-script fallback.
- **FR-7:** Work shall show published projects in Editor-defined order using the reference two-column desktop grid and responsive adaptations.
- **FR-8:** On fine-pointer hover, a Work card shall automatically replace its poster with a short muted looping preview that behaves visually like a GIF, requires no click, and exposes no video controls. Pointer exit stops/resets the preview and restores the poster. Keyboard focus shall preserve the poster and expose an explicit operable Preview control; coarse touch opens the detail route without relying on hover.
- **FR-9:** Each published Work project shall expose title, stable slug, main media, narrative, and structured credits.
- **FR-10:** Play shall show published items in Editor-defined order using the reference three-column desktop grid and responsive adaptations.
- **FR-11:** Play item interaction shall reveal the same information on pointer, keyboard, and touch.
- **FR-12:** A published Play download shall resolve only from an approved controlled CMS/object-storage asset at launch; invalid/missing downloads shall not expose an active broken action. Arbitrary external download URLs are deferred.
- **FR-13:** About and Contact content shall be editable through structured CMS fields.
- **FR-14:** Initial reveal, route, media, hover, and theme transitions shall preserve the restrained reference character and honor reduced motion.
- **FR-15:** Each route shall provide editable or derived title, description, canonical URL, and appropriate project metadata.
- **FR-16:** Unknown or unpublished Work URLs shall show a branded not-found state with navigation back to Work.
- **FR-17:** CMS mutation shall require authenticated, server/provider-authorized Editor access.
- **FR-18:** The Editor shall manage global content, pages, Work projects, Play items, media, publication state, and order without code.
- **FR-19:** The CMS shall provide draft preview before publication and show media upload/validation state.
- **FR-20:** The CMS shall validate required fields, unique slugs, URLs, file types/sizes, alt text, and publication readiness using plain language.
- **FR-21:** Unpublish/archive shall be the normal removal path; destructive deletion shall require warning and reference checks.
- **FR-22:** Content changes shall have recoverable revision history through the selected CMS or an equivalent documented mechanism.
- **FR-23:** Publication events shall update only affected public routes and shall not expose drafts.
- **FR-24:** Failures during save, upload, media validation/readiness, publication, or revalidation shall preserve user input and provide a safe retry or recovery path.

## 5. Non-Functional Requirements

### Performance

- Production 75th-percentile targets: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1.
- Earth target: 50–60 fps on the approved desktop reference device and at least 30 fps on the supported mid-range mobile, using adaptive quality before persistent frame loss.
- Only visible/near-visible previews may load; previews are compressed, muted, poster-backed, and lazy.
- One GPU/canvas surface shall render the Earth with bounded DPR/density and no unbounded frame-loop allocation.

### Security

- Public access is read-only; every mutation is authorized server/provider-side.
- CMS/media write credentials never enter the public bundle or repository.
- Uploaded files, filenames, URLs, rich text, slugs, and webhooks are untrusted and validated.
- Secure headers and a restrictive Content Security Policy are required.
- If a Contact form is approved, it requires abuse controls, data minimization, retention, and delivery-failure handling.

### Reliability & Monitoring

- Failed publication shall not partially replace a valid public version.
- Structured content and asset references require documented export, backup, restore, and rollback.
- Monitor route errors, 404s, publication/revalidation failures, media playback/download failures, Web Vitals, and Earth fallback/performance signals.
- Availability and content-freshness SLOs are finalized after hosting approval.

### UX & Accessibility

- WCAG 2.2 AA is the target for public pages and custom controls.
- Semantic structure, visible focus, accessible names, contrast, 200% zoom/reflow, reduced motion, and keyboard/touch equivalence are required.
- Current and previous major Chrome/Edge, Safari, and Firefox versions at release time are supported.
- Acceptance widths: 320, 375, 768, 1024, 1440, and 1920 px.
- Launch is assumed English/LTR; Unicode content is required, but Persian/RTL publication is deferred until approved.

## 6. Integration & API Hints

Approved launch integration: Next.js on Cloudflare Workers Free; Sanity Free as structured CMS, content database, image/file CDN, controlled download store, and direct optimized-MP4 store for short hover previews; Vimeo embeds provide full reel/project playback. Workers provides the server-side preview/webhook/revalidation runtime. Mux and an email service are deferred.

- Public content query: fetch published page/project documents by type/slug.
- Draft preview: authenticated server-side preview session; preview token never exposed publicly.
- Publication webhook: signed, replay-safe event identifying affected document IDs/slugs for bounded revalidation.
- Video: Sanity asset reference to a validated short MP4 hover preview plus poster metadata, and a normalized/validated Vimeo URL or video identifier for the full video. Arbitrary embed HTML/scripts are rejected; originals remain outside Sanity. Write/preview credentials remain server/CMS-side.
- Downloads: approved controlled asset reference with safe filename, attachment behavior, and error handling; arbitrary external download URLs are deferred.

Exact endpoints/schemas are deferred to architecture and implementation; `CONTENT_MODEL.md` defines the proposed domain fields.

## 7. Analytics & Success Metrics

### Events to track (privacy approval required)

Page view by route, Work card preview, Work detail open, reel/project playback error, Play download attempt/success/failure, Contact action, CMS publish failure, webhook failure, and Earth fallback/adaptive-quality event.

### Suggested KPIs

- Editor completes the critical publish journey without developer help.
- Median content-only update time ≤10 minutes after media upload completes.
- ≥99% successful public media/download requests excluding canceled client requests.
- Core Web Vitals and Earth frame targets above.
- Zero public draft leakage and zero unauthorized mutation in release testing.

Analytics is optional and off by default until provider, consent, and retention choices are approved.

## 8. Risks & Open Questions

### Main Risks

- **Visual drift:** mitigate with frame/viewport comparison and an approved design contract.
- **Video performance/capacity and provider dependence:** mitigate with representative hover-preview measurement, compressed preview files, posters, lazy loading, Sanity asset/bandwidth monitoring, validation of Vimeo availability/embed privacy, and a documented reduction/revisit threshold.
- **Earth frame drops:** mitigate with a disposable spike, GPU rendering, adaptive density, and fallback.
- **Editor confusion/layout damage:** mitigate with structured fields, preview, validation, and owner usability testing.
- **Vendor lock-in/availability:** mitigate with exports, asset manifest, documented restore, and clear ownership.
- **Upload/XSS/webhook abuse:** mitigate with least privilege, validation, CSP, and negative security tests.

### Open Inputs and dispositions

1. The consolidated defaults in `OWNER_DECISION_PACKET.md` were approved without amendment on 2026-09-16.
2. The monthly operating-cost ceiling is $0. Representative media sizes and expected delivery must be measured before Foundation against Sanity Free caps.
3. The portfolio owner owns service accounts, MFA recovery, exports, original-media backup, and emergency credentials; the private account email is confirmed during Foundation.
4. Exact font and web license are required before visual-fidelity sign-off; an approved fallback must be used if unavailable.
5. Final copy, links, real media, captions, and any required privacy/legal text are content inputs before the affected slice can be accepted.

## 9. Acceptance Criteria

- **AC-1:** Given a first-time visit, Home applies system theme without a visible wrong-theme flash and all primary navigation works.
- **AC-2:** Given fine-pointer input near the Earth, nearby land glyphs attract locally and return elastically while the flat circular composition and approved rotation continue.
- **AC-3:** Given reduced motion or unavailable Canvas, Home remains composed and usable with an approved static/low-motion Earth.
- **AC-4:** Given a Work card with preview, fine-pointer hover automatically starts a muted looping, controller-free preview without a click; pointer exit stops/resets it and restores the poster. Keyboard focus preserves the poster and exposes an explicit Preview control; coarse touch opens the detail without hover dependence.
- **AC-5:** Given a valid project draft, Editor preview and publish makes the ordered card/detail URL public without code deployment.
- **AC-6:** Given invalid/oversized media, publication is blocked with a precise correction and the draft remains intact.
- **AC-7:** Given an unpublished/missing download, visitors never receive an active broken Download action.
- **AC-8:** Given a 320 px viewport, every route has no unintended horizontal scroll, clipped essential content, or inaccessible control.
- **AC-9:** Given keyboard-only use, navigation, cards, media, theme, and downloads are operable with visible logical focus.
- **AC-10:** Given CMS/media failure, a valid cached public version remains where architecture supports it, or a clear recoverable state appears; the event is observable.
- **AC-11:** Given an unauthenticated/unauthorized mutation request, it is denied without leaking drafts or credentials.
- **AC-12:** Before release, all criteria trace to observed/automated evidence, applicable independent UX/security/QA findings are resolved or accepted, and rollback/restore are exercised.
