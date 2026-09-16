# ADR 002 — ASCII Earth renderer

Status: Amended and accepted on 2026-09-16 after owner fidelity correction

## Context

The Earth must be visibly flat and minimal, preserve a complete circular ASCII field, show recognizable geographic silhouettes, rotate gently, and attract nearby land glyphs toward pointer proximity without severe performance loss.

## Decision

Use one 2D Canvas with a bounded circular character grid. Project the geographic mask onto that flat grid, rotate only the longitude mask, attract nearby land glyphs locally with elastic return, cap device-pixel ratio, pause when hidden/offscreen, adapt grid resolution from sustained frame time, and provide a static reduced-motion/no-script fallback.

## Consequences

Avoids thousands of DOM nodes and, unlike the rejected sphere treatment, directly matches the owner's flat reference. The CPU path is simpler but still requires representative device measurement, bounded density, an accessible fallback, and resource cleanup.

## Alternatives

- WebGL sphere/point cloud: rejected after implementation review because the depth treatment materially missed the supplied flat reference.
- DOM characters: rejected for node/layout cost.
- Pre-rendered video: rejected because it cannot provide interaction.

## Approval

The owner explicitly corrected the visual direction to a minimal two-dimensional Earth and requested local attraction on 2026-09-16. The 2D Canvas correction may proceed during Foundation, but final quality presets still require measured evidence.

## Revisit when

The spike misses fidelity, reduced-motion behavior, browser coverage, or frame-time targets.
