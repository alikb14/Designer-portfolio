import Link from "next/link";
import { AsciiEarthCanvas } from "@/components/earth/AsciiEarthCanvas";
import { TypewriterText } from "@/components/motion/TypewriterText";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function HomePage() {
  return (
    <div className="site-shell home-page">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main className="home-main" id="main-content">
        <h1>
          <TypewriterText
            blinkPeriod
            text={"Hi I'm Yaad a 2D Motion Designer\nfrom planet Earth"}
          />
        </h1>

        <div className="home-earth">
          <AsciiEarthCanvas />
        </div>

        <Link
          aria-label="View selected work"
          className="home-reel"
          href="/work"
        >
          <span>reels</span>
          <small>SELECTED WORK</small>
        </Link>
      </main>
    </div>
  );
}
