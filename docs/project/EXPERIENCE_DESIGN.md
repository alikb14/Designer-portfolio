# Yaad Motion Portfolio — Experience Design

Status: **Approved experience baseline (2026-09-16)**, reconstructed from supplied evidence. Runtime fidelity remains to be verified during implementation.

## Users and contexts of use

- Prospective clients scan quickly on desktop or mobile, often with limited attention and varying network quality.
- Motion peers may browse Play and download files.
- Yaad edits intermittently and needs recognizable labels, previews, safe publishing, and minimal technical vocabulary.

## Information architecture

```text
Home
Work
  └─ Work detail /work/{slug}
Play
About
Contact
CMS (private)
  ├─ Global + page content
  ├─ Work projects
  ├─ Play items
  └─ Media
```

## Critical flows

### Visitor: Home to project

Brief reveal → introduction/Earth/reel → Work → card preview → detail → main video → narrative/credits → Work.

### Visitor: Play download

Play → scan cards → hover/focus/tap item → reveal description → Download → valid file or recoverable error.

### Editor: publish a project

Sign in → Work Projects → New/Duplicate → guided fields → media upload/validation → Preview → Publish → verify public URL.

## Screen or interface inventory

### Shared header

- Wide top gutter; `HOME` anchored left; `WORK / PLAY / ABOUT / CONTACT` grouped right; pill theme toggle at far right.
- Active route uses weight, not color.
- Desktop keeps the monospaced condensed/typewriter tone. Mobile uses an accessible compact menu while Home/theme remain easy to reach.

### Home

- Large introduction in the upper-left content area.
- Large reel rectangle below the introduction.
- Oversized Earth occupies the right/bottom and is intentionally cropped by viewport edges.
- Light: near-white ground/black Earth. Dark: near-black ground/white Earth.
- The reference starts almost empty, then particles/text resolve and the full composition settles.
- Pointer interaction is new: a local, soft force changes nearby glyphs without moving the whole globe; removal returns them elastically.

### Work

- Two-column desktop grid with generous gaps.
- Each card is a 16:9 visual followed by a `Project 01`-style title.
- Fine-pointer hover automatically swaps the poster for a short muted looping preview with no visible player controls and no click requirement, producing a GIF-like effect. Pointer exit stops/resets the preview and restores the poster. Keyboard focus keeps the poster stable and exposes an explicit Preview control; no rounded card chrome.
- Mobile uses one column and a deliberate tap/play behavior instead of hover dependence.

### Work detail

- Simple title above a large centered 16:9 player.
- Narrative and structured credits below with strong whitespace.
- Playback controls remain keyboard/touch accessible.

### Play

- Editable introduction equivalent to “You can download my project files here for free.”
- Three-column desktop grid: title, square artwork, black full-width Download bar, optional description.
- Reference hover changes neutral artwork to color and reveals description beneath Download.
- Implementation must avoid overlap/layout instability. Push-versus-overlay is a bounded prototype choice only if Download remains visible, layout stays stable, and pointer/keyboard/touch expose equivalent information.
- Mobile uses one column; description is visible or uses an explicit Details control.

### About

- Two-column desktop layout: tall media block left; biography right.
- Supplied copy introduces Yaad and describes After Effects workflow and ongoing learning.
- Mobile stacks media before copy as the approved responsive order.

### Contact

- The reference ends with the shared header and no visible body.
- Approved launch content: short invitation, email link, and selected social links. No form at launch.

### CMS

- Use stable native components from the selected CMS rather than mimicking the portfolio.
- Group fields by Card, Detail, Media, Credits, SEO, and Publishing.
- Media fields show purpose, aspect ratio, size/duration guidance, preview, upload/validation state, and replacement action.
- Never expose layout JSON or developer terminology to the Editor.
- Task-level create/upload/preview/publish/reorder/recovery behavior is specified in `CMS_FLOW_SPEC.md`.

## Loading, empty, error and permission states

- Home reveal never blocks navigation beyond a brief transition.
- Images reserve aspect ratio; videos show posters until ready.
- Empty Work/Play uses concise owner-approved copy.
- Media failure keeps poster and retry/open fallback.
- Missing download has no active broken action; editor sees validation.
- Unknown/unpublished detail shows branded 404.
- CMS unauthenticated shows sign-in; unauthorized access shows denial without leaking content.
- Failed save/upload/publish preserves draft and explains the next action.
- Mobile navigation, input parity, publication freshness, session expiry, conflicts, restore, and partial-provider states follow `INTERACTION_STATE_MATRIX.md`.

## Degraded/offline and recovery behavior

- Cached public pages remain readable during CMS disruption where the architecture supports it.
- No-canvas/reduced-motion users receive a static Earth preserving composition.
- Slow/data-saving connections load posters and avoid aggressive preview fetching.
- No offline CMS promise.

## Responsive behavior

- **≥1200 px:** reference proportions; Work 2 columns, Play 3, About 2, cropped Earth.
- **768–1199 px:** reduce gaps/Earth density; Work remains 2 columns when viable; Play may use 2.
- **<768 px:** compact menu, single-column content, Home composition without text/control overlap.
- **320 px:** no unintended horizontal scroll; readable body text; comfortable touch targets.
- Decorative cropping is allowed; content/control clipping is not.

## Accessibility

- Skip link, semantic header/nav/main/footer, one page `h1`, logical headings, visible focus.
- Active navigation is not color-only; theme control has accessible name/state.
- Cards are real links/buttons with equivalent pointer, focus, and touch content.
- Respect reduced motion and avoid vestibular camera movement.
- Autoplay previews are muted.
- Meaningful speech/audio must have captions/transcript before publication or an explicitly recorded exception; flashing media requires editorial review.
- The Earth is decorative and hidden from assistive technology; it must not duplicate the visible introduction.
- AA contrast in both themes and during hover/disabled states; support 200% zoom/reflow.

## Localization and RTL

Launch assumption: English/LTR. Fields support Unicode. Future RTL requires a real mirrored-layout review rather than right alignment alone; it is not launch scope unless approved.

## Design tokens and component strategy

- Palette: near-white/near-black; gray placeholders; project media supplies color.
- Typography: monospaced/typewriter family with readable fallback; exact font/license pending.
- Shape: square media, minimal borders, pill reserved for theme control.
- Spacing: large canvas-like margins and deliberate negative space.
- Motion: brief particle/text resolves and restrained fades; no generic animation everywhere.

## Prototype or wireframe evidence

- Supplied Home light/dark, Work, Play idle/hover, About, and Work detail images.
- `full website video sample.mp4`: 20.54 s at 1920×1080.
- `ASCII earth animation.mp4`: 2.375 s at 1920×1080.
- Detailed observations: `REFERENCE_ANALYSIS.md`.

## Approval

The owner approved the consolidated decisions in `OWNER_DECISION_PACKET.md` without amendment on 2026-09-16, including responsive adaptation, link-only Contact at launch, structured CMS editing, input parity, theme behavior, and the proposed Play interaction direction. Exact font/license and final content are delivery inputs rather than unresolved experience-direction decisions.

Reference assets currently originate from conversation attachments and temporary paths; a future implementation task must receive the files again or an owner-authorized immutable copy before fidelity verification.
