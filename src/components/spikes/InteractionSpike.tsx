import Link from "next/link";
import { AsciiEarthCanvas } from "@/components/earth/AsciiEarthCanvas";
import { WorkPreviewCard } from "@/components/media/WorkPreviewCard";

export function InteractionSpike() {
  return (
    <main className="spike-shell">
      <header className="spike-header">
        <Link href="/">YAAD / FOUNDATION</Link>
        <p>Disposable interaction spike</p>
      </header>
      <section aria-labelledby="earth-heading" className="earth-spike-section">
        <div className="spike-copy">
          <p className="foundation-kicker">RISK 01 / WEBGL</p>
          <h1 id="earth-heading">A moving Earth, without a moving page.</h1>
          <p>
            The globe rotates in one canvas, only applies a local soft force for
            fine pointers, adapts point density from frame time, and pauses
            outside the viewport or hidden tab.
          </p>
        </div>
        <AsciiEarthCanvas />
      </section>
      <section
        aria-labelledby="preview-heading"
        className="preview-spike-section"
      >
        <div className="spike-copy">
          <p className="foundation-kicker">RISK 02 / MEDIA</p>
          <h2 id="preview-heading">A preview is not the primary action.</h2>
          <p>
            This is a deliberately isolated card: hover may preview; keyboard
            exposes a labelled button; touch does not rely on hover.
          </p>
        </div>
        <WorkPreviewCard />
      </section>
    </main>
  );
}
