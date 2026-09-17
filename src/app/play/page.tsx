import type { Metadata } from "next";
import { TypewriterText } from "@/components/motion/TypewriterText";
import { PlayCard } from "@/components/play/PlayCard";
import { SiteHeader } from "@/components/site/SiteHeader";

export const metadata: Metadata = { title: "Play" };

export default function PlayPage() {
  return (
    <div className="site-shell play-shell">
      <SiteHeader />
      <main className="play-page">
        <h1>
          <TypewriterText
            blinkPeriod
            text="You can download my project files here for free"
          />
        </h1>
        <div className="play-grid">
          {[1, 2, 3].map((index) => (
            <PlayCard index={index} key={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
