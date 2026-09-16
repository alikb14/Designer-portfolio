# Yaad Motion Portfolio — PEL Quick Guide

This project uses the Project Engineering Lifecycle. Codex fills and updates the relevant project documents during each stage; the human reviews and approves important gates.

## Status

Ask naturally: **"What stage are we in?"** or run:

```text
PEL STATUS
```

## Stage order

```text
ideation
→ requirements
→ architecture
→ experience-design
→ delivery-plan
→ foundation
→ implementation
→ verification
→ release-readiness
→ operations
```

The flow is iterative. Use `PEL REOPEN` or `PEL INVALIDATE FROM` when new learning changes earlier decisions.

## Main commands

```text
PEL INIT
PEL STATUS
PEL HELP
PEL NEXT
PEL START <stage>
PEL IMPORT <stage> <artifact>
PEL PASS <stage>
PEL WAIVE <stage>
PEL REOPEN <stage>
PEL INVALIDATE FROM <stage>
PEL HANDOFF
```

- `PASS` means evidence satisfies the gate.
- `WAIVE` means the work was intentionally skipped with accepted risk.
- `STALE` means later changes invalidated earlier evidence.
- `IMPORT` registers external/pre-existing work as evidence; it never auto-passes a stage.
- Project documents live in `docs/project/`.
- Lifecycle state lives in `.project-engineering/state.json`.
