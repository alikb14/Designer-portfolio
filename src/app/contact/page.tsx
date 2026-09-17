import type { Metadata } from "next";
import { TypewriterText } from "@/components/motion/TypewriterText";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getPublishedContactPage } from "@/sanity/lib/contact";

const fallbackInvitation =
  "Contact links will appear here as soon as the final email and social profiles are supplied.";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const contact = await getPublishedContactPage();

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="contact-page">
        <h1>
          <TypewriterText
            blinkPeriod
            delayMs={0}
            text="Let's make something move"
          />
        </h1>
        <p>
          <TypewriterText text={contact?.invitation ?? fallbackInvitation} />
        </p>
        {contact ? (
          <div className="contact-links">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            {contact.socialLinks.map((link) => (
              <a href={link.url} key={link.url} rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
}
