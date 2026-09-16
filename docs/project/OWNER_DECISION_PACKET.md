# Owner Decision Packet — Planning Baseline

Status: **Approved by the owner on 2026-09-16**. This approval records the product, experience, and architecture planning baseline; it does not authorize implementation in this workspace.

## Recommended baseline

1. **Editing model:** “Elementor-like” means structured content/media/order editing with live preview and protected page layouts—not arbitrary drag-and-drop layout editing.
2. **Platform:** Next.js on Cloudflare Workers Free + Sanity Free for structured content, images, downloadable files, posters, and optimized hover-preview MP4 assets; Vimeo supplies full reel/project videos. No separate database, R2, Payload, or new paid video provider is required at launch. Workers Free is approved for the required secure preview/webhook/revalidation runtime.
3. **Media model:** the Editor enters a Vimeo link for the full video and uploads a separate short, muted, compressed MP4 preview plus poster to Sanity. Sanity validates and stores a normalized Vimeo identifier rather than arbitrary embed code. Mux is deferred as an optional future replacement if Vimeo or measured delivery no longer meets requirements.
4. **Downloads:** launch uses controlled CMS/object-storage assets only. Arbitrary external download URLs are deferred.
5. **Contact:** launch with editable email and social links; no form until privacy, retention, abuse, and delivery requirements are approved.
6. **Language:** English/LTR at launch. Mixed-direction names, emails, URLs, and numbers remain readable; full RTL pages are deferred.
7. **Earth:** local repulsion/displacement with elastic return for fine-pointer devices; automatic rotation only for coarse touch; reduced motion/no-WebGL uses a static or very low-motion equivalent.
8. **Responsive interaction:** Work becomes one column on small screens; Play becomes two then one; descriptions remain available without hover; About stacks media then copy; mobile navigation manages focus correctly.
9. **Theme:** binary light/dark control. First visit follows system; the first explicit selection persists until site storage is cleared.
10. **Accessibility governance:** meaningful speech/audio requires captions/transcript before publish or a recorded exception; flashing media requires review. The Earth is decorative and hidden from assistive technology.
11. **Environment/security:** production and nonproduction use Sanity's two separate Free-plan datasets plus separate credentials, webhooks, and origins. MFA is mandatory where supported. Sanity Free exposes Administrator and Viewer roles but not the narrower Editor role; the single owner therefore holds Administrator access as an explicit zero-cost limitation.
12. **Ownership/recovery:** the portfolio owner owns the Sanity, Cloudflare, domain, MFA recovery, exports, original-media backup, and emergency credentials. Developers receive revocable collaborator access only when needed.

## Approved planning envelope

- Up to 30 Work projects and 30 Play items at launch.
- Work preview: at most 15 seconds, muted, optimized.
- Main/reel videos: typical at most 5 minutes and hosted in the owner's Vimeo account. Original masters remain in independently recoverable owner storage. Vimeo plan/embed/privacy settings are confirmed during Foundation.
- Play downloads: planned maximum 500 MB per item, subject to the selected storage plan.
- Sanity Free planning limits verified for this decision: 100 GB assets and 100 GB monthly bandwidth with hard caps and no paid overage on Free.
- Cloudflare Workers Free serves the public site and server-side preview/webhook/revalidation handlers; Vimeo serves full videos and Sanity serves lightweight assets rather than bundling media with the application.
- Monthly operating-cost ceiling: **$0**. No payment method or paid upgrade is authorized for launch.
- Original source videos and downloadable files retain an independently recoverable authoritative copy outside processed renditions.

If actual assets or traffic approach a Free-plan cap, preserve posters and core content, reduce/lazy-load previews, and revisit media delivery before any paid upgrade. No service may be upgraded automatically.

## Why this is recommended

It gives the owner independent editing while keeping the visual composition, responsive rules, and custom animation protected. It resolves the largest architecture, UX, and security risks without adding speculative public features.

## Inputs still required before Foundation

- Confirm the owner's account email at account-creation time; do not record it in public project documentation.
- Measure representative hover-preview sizes and estimate monthly Sanity bandwidth against the Free-plan caps; confirm the owner-supplied Vimeo plan and embed/privacy settings.
- Supply/confirm the licensed font and final Contact/media assets when available. Placeholder copy is explicitly acceptable during Foundation and early implementation.

## Approval record

On 2026-09-16 the owner first approved the planning package without amendment, then clarified that launch must have no operating cost, explicitly chose Sanity, explicitly accepted the documented Sanity Free limitations, approved Vimeo for full videos with separate lightweight MP4 hover previews, and selected Cloudflare Workers Free. The current authority is therefore the zero-cost Sanity/Workers baseline plus the owner-supplied Vimeo account above; the earlier Mux-at-launch, Sanity-hosted-full-video, and static-Pages recommendations are superseded. Placeholder copy is approved for implementation. Exact private account identifiers, Vimeo plan/settings, and measured preview usage remain Foundation inputs and are not invented here.
