import { createClient } from "next-sanity";
import { sanityApiVersion, sanityDataset, sanityProjectId } from "@/sanity/env";

export const sanityClient = createClient({
  apiVersion: sanityApiVersion,
  dataset: sanityDataset,
  perspective: "published",
  projectId: sanityProjectId,
  stega: {
    enabled: false,
  },
  useCdn: true,
  timeout: 10_000,
  maxRetries: 1,
});
