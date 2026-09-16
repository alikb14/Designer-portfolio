import Link from "next/link";

export default function FoundationHome() {
  return (
    <main className="foundation-shell">
      <p className="foundation-kicker">YAAD / FOUNDATION</p>
      <h1>Motion portfolio engineering is in progress.</h1>
      <p className="foundation-copy">
        The approved visual pages are intentionally not implemented yet. This
        environment exists to verify the runtime, quality gates, and interaction
        prototypes first.
      </p>
      <Link className="foundation-link" href="/spikes/interactions">
        Open the Earth and preview-card risk spike
      </Link>
    </main>
  );
}
