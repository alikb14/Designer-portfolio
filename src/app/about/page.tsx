import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="about-page">
        <h1 className="sr-only">About Yaad</h1>
        <div
          aria-label="Portrait or showreel pending"
          className="about-media"
        />
        <div className="about-copy">
          <p>
            I&apos;m Yaad, a 2D Motion Designer driven by curiosity and a
            passion for visual storytelling. I enjoy transforming complex ideas
            into clean, minimal, and engaging animations that communicate with
            clarity and purpose.
          </p>
          <p>
            My workflow revolves around Adobe After Effects, where I combine
            strong motion principles with thoughtful design. I&apos;m always
            exploring new techniques, refining my craft, and paying close
            attention to timing, pacing, and detail—because I believe great
            motion is more than movement; it&apos;s communication.
          </p>
          <p>
            Outside of design, I&apos;m constantly learning. Whether it&apos;s
            improving my English, experimenting with new creative concepts, or
            diving into technical challenges, I enjoy the process of mastering
            new skills.
          </p>
        </div>
      </main>
    </div>
  );
}
