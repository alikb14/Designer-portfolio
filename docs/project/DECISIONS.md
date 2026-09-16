# Yaad Motion Portfolio — Decision Index

| ADR | Status | Decision | Revisit condition |
|---|---|---|---|
| `adr/001-cms-and-media-platform.md` | Accepted 2026-09-16 | Next.js on Cloudflare Workers Free + Sanity Free; Vimeo for full videos; Sanity-hosted short MP4 hover previews/posters; Mux deferred. Static Pages rejected for launch. | Free caps, Vimeo plan/privacy/branding/availability, preview performance, Administrator-only owner role, Workers runtime limits, residency, or self-hosting change. |
| `adr/002-earth-renderer.md` | Accepted 2026-09-16; spike required | One GPU-accelerated canvas with adaptive density/static fallback and local pointer repulsion. | Spike misses fidelity, accessibility, or frame-time targets. |

## Approved constraints from the owner

- This workspace is planning/documentation only; implementation happens later in Codex.
- Routine text, image, video, project, and download updates must not require programming.
- Full videos use owner-supplied Vimeo links; Work hover uses a separate lightweight MP4 preview and poster. Placeholder copy is acceptable during implementation.
- Home uses a real interactive ASCII/particle Earth with automatic motion and soft pointer interaction.
- The full 12-item planning baseline in `OWNER_DECISION_PACKET.md` is approved without amendment as of 2026-09-16.

Items still labeled proposed, unknown, or conditional do not become implemented or verified merely because the planning baseline is approved.

The proposed decision bundle and planning envelope are in `OWNER_DECISION_PACKET.md`.
