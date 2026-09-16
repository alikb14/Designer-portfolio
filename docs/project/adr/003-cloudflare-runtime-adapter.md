# ADR 003: Use Vinext for the Cloudflare Workers Foundation Spike

- Status: Accepted for Foundation; revisit before production deployment
- Date: 2026-09-16
- Decision owners: Project Owner and engineering

## Context

The accepted architecture targets Next.js on Cloudflare Workers Free. Cloudflare's current Next.js guidance recommends Vinext for new Workers applications and describes it as beta. The portfolio needs early evidence that its required App Router baseline and security headers can run on the target without introducing a paid platform or a separate hosting stack.

## Decision

Use `vinext`, `@vinext/cloudflare`, Vite, and Wrangler for a bounded Foundation compatibility spike. Keep the native Next.js development and build scripts as a parallel local verification path. Configure the Workers compatibility date to 2026-09-16, enable `nodejs_compat`, and use no cache backend during Foundation.

## Evidence

`npx vinext check` completed with a 95% compatibility score: 10 supported capabilities, one partial capability (`reactStrictMode` App Router note), and zero incompatibilities. It identifies `headers` and `poweredByHeader` as supported. This evidence is compatibility-only; it is not a production deployment approval.

## Consequences

- The runtime adapter is beta and requires re-validation at each meaningful Vinext/Cloudflare upgrade.
- No Cloudflare account, Worker, deployment, cache service, or production secret has been created by this repository.
- Sanity draft preview, webhook revalidation, and cache semantics are intentionally deferred to the first content vertical slice. A cache backend must be selected only after those flows have acceptance evidence.
- `npm run build:vinext` validates the adapter build; `npm run deploy` remains an explicit, owner-approved release operation.
- Vinext and native Next.js both generate route declarations under `.next`. The `typecheck` script regenerates the native declarations first so the two local validation paths remain deterministic.

## Revisit conditions

Revisit this ADR before any production deployment, when adding Sanity visual editing or revalidation, if a compatibility check reports an issue, or if Cloudflare promotes a different stable adapter for new Next.js Workers applications.
