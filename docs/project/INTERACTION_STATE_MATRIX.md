# Public and CMS Interaction State Matrix

Status: **Approved planning baseline (2026-09-16)**; implementation behavior remains to be verified.

| Surface | Trigger/state | Visible behavior | Retained context | Recovery/action |
|---|---|---|---|---|
| Mobile nav | Open | Menu visible; focus moves inside; background is not interactable. | Route/theme. | Escape, close, or route selection returns focus predictably. |
| Work card | Fine-pointer hover | Short muted loop autoplays without click or visible video controls; media zooms subtly inside its clipped frame, layout/title stay stable, and the result feels GIF-like. | Editor-selected poster/link. | Exit stops, resets, restores poster, and returns zoom to baseline. |
| Work card | Keyboard focus | Poster stays stable; explicit preview control may start video. | Focus/link. | Blur/stop restores poster. |
| Work card | Coarse touch | Direct card action opens detail; no essential hover-only content. | Card context. | Back returns near prior scroll position. |
| Play card | Hover/focus | Grayscale artwork returns to color, description appears without hiding Download, and the full item scales subtly without changing grid geometry or scrollbar extent. | Title/action order. | Exit/blur restores reference state. |
| Play card | Coarse touch | Description is visible or expanded with labeled Details. | Expanded item. | Collapse or Download. |
| Download | Pending/failure | Duplicate action blocked; progress announced; failure is explicit. | Item context. | Retry or report unavailable; no blank navigation. |
| Earth | Fine pointer | Nearby land glyphs attract locally and return elastically. | Flat circular grid and geographic-mask rotation. | Pointer exit restores baseline. |
| Earth | Reduced motion/coarse/no Canvas | Static or very low-motion composition; no turbulence. | Home layout. | Navigation/content remain unaffected. |
| Theme | First visit | System theme applies before paint. | No explicit preference. | Toggle creates persistent preference. |
| Theme | Explicit choice | Binary light/dark persists. | Device preference. | Toggle again or clear site storage to follow system anew. |
| CMS upload | Failed/canceled | Specific error and retry/replace; public media unchanged. | Draft/prior reference. | Retry, replace, or save draft. |
| CMS media validation | Wrong codec/type/size or incomplete upload | Plain-language correction; Publish remains unavailable. | Draft, prior public asset, and all valid fields. | Replace/recompress and retry without losing input. |
| CMS session | Expires mid-edit | Safe reauthentication notice. | Autosaved draft per approved capability. | Reauthenticate and return to document. |
| CMS publish | Pending | Duplicate action blocked; public version remains. | Draft/public IDs. | Wait or retry after explicit failure. |
| CMS publish | Revalidation delayed | Freshness warning identifies affected routes. | Last public version. | Retry/manual revalidate; no blind broad purge. |
| CMS concurrent edit | Revision conflict | Clear conflict; no silent overwrite. | Attempted/newer revisions. | Compare/reload or intentionally apply. |
| CMS restore | Requested | Revision comparison and confirmation. | Current revision. | Create restore draft, preview, publish. |
| Provider degradation | Partial outage | Cached public version/posters remain where possible; CMS names unavailable function. | Public version/draft. | Retry after recovery; no destructive workaround. |
| Sanity Free usage | Asset/bandwidth cap approaching | Posters/core content remain; eager previews/autoplay are reduced or disabled and the owner sees an operational warning. | Published text, navigation, posters, drafts. | Recompress/archive assets or wait for reset; no automatic upgrade. |
| Sanity Free usage | Cap exhausted | Media is clearly unavailable while cached/generated core pages remain where possible. | Core content and prior references. | Reduce usage or wait for reset; reopen architecture before paid service. |
