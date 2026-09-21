import type { Metadata } from "next";
import { TypewriterText } from "@/components/motion/TypewriterText";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getPublishedAboutPage } from "@/sanity/lib/about";

const fallbackBiography =
  "I'm Yaad, a 2D Motion Designer driven by curiosity and a passion for visual storytelling. I enjoy transforming complex ideas into clean, minimal, and engaging animations that communicate with clarity and purpose.\n\nMy workflow revolves around Adobe After Effects, where I combine strong motion principles with thoughtful design. I'm always exploring new techniques, refining my craft, and paying close attention to timing, pacing, and detail—because I believe great motion is more than movement; it's communication.\n\nOutside of design, I'm constantly learning. Whether it's improving my English, experimenting with new creative concepts, or diving into technical challenges, I enjoy the process of mastering new skills.";
const fallbackHeading = "About Yaad";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const about = await getPublishedAboutPage();

  return (
    <div className="site-shell about-shell">
      <SiteHeader />
      <main className="about-page">
        <h1 className="sr-only">{about?.heading ?? fallbackHeading}</h1>
        <div
          aria-label={about?.portraitAlt ?? "Portrait or showreel pending"}
          className="about-media"
        >
          {about?.portraitUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={about.portraitAlt ?? ""} src={about.portraitUrl} />
          ) : null}
        </div>
        <div className="about-copy">
          <p>
            <TypewriterText text={about?.biography ?? fallbackBiography} />
          </p>
        </div>
      </main>
    </div>
  );
}
