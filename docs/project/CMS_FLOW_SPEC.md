# CMS Critical Flow Specification

Status: **Approved interaction specification (2026-09-16)**; implementation usability remains to be verified with the owner.

## Navigation

Top-level destinations: Dashboard, Home, Work Projects, Play Items, About, Contact, Media, and Site Settings. The first screen highlights drafts requiring attention, invalid/incomplete media, and last publication status; it does not imitate the public portfolio.

## Create or duplicate Work/Play

1. Choose New or Duplicate.
2. CMS creates a saved draft immediately.
3. Complete grouped fields: Card, Detail, Media, Credits/Download, SEO, Publishing.
4. Inline validation explains what is missing and where it appears publicly.
5. Preview opens the draft in a protected public-site preview.
6. Publish remains unavailable until required media is ready and blocking validation is cleared.
7. Publication shows pending, succeeded, or failed with public URL and last known public version.

## Media upload lifecycle

selected → validating → uploading → ready / failed / canceled / replaced / archived

- Upload shows filename, size, progress, cancel, and retained draft context.
- For a ready Work hover-preview, the Editor scrubs the video, chooses “Use current frame,” reviews the extracted still, and may replace that choice before publication. The selected timecode and generated poster asset remain linked to the preview version.
- Failure preserves the record and offers retry/replace.
- Validation/upload state explains why publication is not ready.
- Replacement never removes the active public asset until the new one is ready and published.
- Replacing a Work preview marks its previous poster-frame selection stale; Publish remains unavailable until a valid frame is selected and the new still is ready.
- Referenced media cannot be hard-deleted without listing affected content.

## Preview

- Preview clearly labels Draft and target environment.
- Editor can switch light/dark and representative desktop/mobile widths.
- Preview expiration prompts safe reauthentication and returns to the draft.
- If preview is unavailable, CMS states whether the public version is still healthy.

## Publish, unpublish, archive, delete

- Publish blocks duplicate submission and reports content freshness.
- Unpublish/archive previews affected listing/detail/download behavior and preserves history.
- Hard delete is restricted, lists references, and requires explicit confirmation.
- Slug changes require redirect creation or explicit acknowledgement.

## Reorder

- Drag is optional; keyboard buttons or numeric ordering provide an equivalent.
- Save detects concurrent edits using the CMS revision token.
- Conflict shows current versus attempted order and lets the Editor reload or intentionally apply.

## Revision restore

1. Open History.
2. Compare the selected revision with current content.
3. Restore creates a new draft rather than overwriting public content.
4. Preview and publish follow the normal flow.

## Usability acceptance

Without developer guidance, Yaad can create/duplicate a project, upload representative media, correct one validation error, preview both themes and a mobile width, publish, verify the public URL, reorder, unpublish, and restore a revision. Excluding upload time, target completion is at most 10 minutes with no lost input.
