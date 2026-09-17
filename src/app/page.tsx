import { AsciiEarthCanvas } from "@/components/earth/AsciiEarthCanvas";
import { TypewriterText } from "@/components/motion/TypewriterText";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getPublishedHomePage } from "@/sanity/lib/home";

const fallbackIntro = "Hi I'm Yaad a 2D Motion Designer\nfrom planet Earth";
const fallbackReel =
  "https://player.vimeo.com/video/1227330980?badge=0&autopause=0&player_id=0&app_id=58479";
const fallbackReelLabel = "You got hacked 4k final";

export default async function HomePage() {
  const home = await getPublishedHomePage();

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
            delayMs={0}
            text={home?.intro ?? fallbackIntro}
          />
        </h1>

        <div className="home-earth">
          <AsciiEarthCanvas />
        </div>

        <div aria-label="Motion design reel" className="home-reel">
          <iframe
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            frameBorder={0}
            referrerPolicy="strict-origin-when-cross-origin"
            src={home?.reelVimeoUrl ?? fallbackReel}
            title={home?.reelLabel ?? fallbackReelLabel}
          />
        </div>
      </main>
    </div>
  );
}
