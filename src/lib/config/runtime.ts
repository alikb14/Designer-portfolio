const defaultSiteOrigin = "http://localhost:3000";

export const publicRuntimeConfig = {
  sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development",
  sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  siteOrigin: process.env.NEXT_PUBLIC_SITE_ORIGIN ?? defaultSiteOrigin,
};

export function getMissingServerConfiguration() {
  const required = ["SANITY_API_READ_TOKEN", "SANITY_REVALIDATE_SECRET"];

  return required.filter((key) => !process.env[key]);
}
