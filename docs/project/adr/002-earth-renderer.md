# ADR 002 — ASCII Earth renderer

Status: Accepted on 2026-09-16; disposable spike required before production implementation

## Context

The Earth must rotate, look like ASCII/particles, and react softly to pointer proximity without severe performance loss.

## Decision

Recommend one WebGL canvas using instanced glyph-like sprites/points, shader-based rotation and pointer displacement, bounded DPR/density, visibility pause, adaptive quality, and static/low-motion fallback.

## Consequences

Avoids thousands of DOM nodes and keeps pointer response GPU-friendly. Requires shader skill, browser/device measurement, accessible fallback, and resource cleanup.

## Alternatives

- Canvas 2D: simpler but likely CPU-bound at reference density.
- DOM characters: rejected for node/layout cost.
- Pre-rendered video: rejected because it cannot provide interaction.

## Approval

The owner approved the direction and local repulsion/displacement model on 2026-09-16. It may proceed only to a disposable spike after Foundation begins in the later implementation workspace. Final quality presets require measured evidence; any material visual-direction change requires owner review.

## Revisit when

The spike misses fidelity, reduced-motion behavior, browser coverage, or frame-time targets.
