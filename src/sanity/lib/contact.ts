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
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export async function getPublishedContactPage(): Promise<PublishedContactPage | null> {
  try {
    const entry = await sanityClient.fetch<SanityContactPage | null>(
      contactPageQuery,
      {},
      { cache: "no-store" },
    );
    if (!entry) {
      return null;
    }
    const invitation = entry?.invitation?.trim();
    const email = entry?.email?.trim();
    if (!invitation || !isEmail(email)) {
      return null;
    }

    const socialLinks =
      entry.socialLinks?.flatMap((link) => {
        const label = link.label?.trim();
        const url = link.url?.trim();
        return label && isHttpsUrl(url) ? [{ label, url }] : [];
      }) ?? [];

    return { email, invitation, socialLinks };
  } catch {
    return null;
  }
}
