import { record, text } from "@/sanity/lib/validation";
import { sanityClient } from "@/sanity/lib/client";

type SanityContactPage = {
  email?: string;
  invitation?: string;
  socialLinks?: readonly { label?: string; url?: string }[];
};

export type PublishedContactPage = {
  email: string;
  invitation: string;
  socialLinks: readonly { label: string; url: string }[];
};

const contactPageQuery = `*[_type == "contactPage"][0]{invitation, email, socialLinks[]{label, url}}`;

function isEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isHttpsUrl(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}

export async function getPublishedContactPage(): Promise<PublishedContactPage | null> {
  try {
    const response = await sanityClient.fetch<SanityContactPage | null>(
      contactPageQuery,
      {},
      { cache: "no-store" },
    );
    if (!response) {
      return null;
    }
    const entry = record(response);
    const invitation = text(entry.invitation);
    const email = text(entry.email);
    if (!invitation || !isEmail(email)) {
      return null;
    }

    const socialLinks = Array.isArray(entry.socialLinks)
      ? entry.socialLinks.flatMap((value) => {
          const link = record(value);
          const label = text(link.label);
          const url = text(link.url);
          return label && isHttpsUrl(url) ? [{ label, url }] : [];
        })
      : [];

    return { email, invitation, socialLinks };
  } catch {
    return null;
  }
}
