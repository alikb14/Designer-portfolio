import type { Metadata } from "next";
import { TypewriterText } from "@/components/motion/TypewriterText";
import { SiteHeader } from "@/components/site/SiteHeader";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="contact-page">
        <h1>
          <TypewriterText text="Let's make something move." />
        </h1>
        <p>
          <TypewriterText text="Contact links will appear here as soon as the final email and social profiles are supplied." />
        </p>
      </main>
    </div>
  );
}
