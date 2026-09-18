import type { Metadata } from "next";
import { TypewriterText } from "@/components/motion/TypewriterText";
import { PlayCard } from "@/components/play/PlayCard";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getPublishedPlayItems } from "@/sanity/lib/play";

export const metadata: Metadata = { title: "Play" };

export default async function PlayPage() {
  const playItems = await getPublishedPlayItems();

  return (
    <div className="site-shell play-shell">
      <SiteHeader />
      <main className="play-page">
        <h1>
          <TypewriterText
            blinkPeriod
            delayMs={0}
            text="You can download my project files here for free"
          />
        </h1>
        {playItems === null ? (
          <p role="status">
            Projects could not be loaded. <a href="/play">Try again</a>.
          </p>
        ) : playItems.length === 0 ? (
          <p>No projects are available yet. Please check back soon.</p>
        ) : (
          <div className="play-grid">
            {playItems.map((item, index) => (
              <PlayCard index={index + 1} item={item} key={item.id} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
