import { defineCliConfig } from "sanity/cli";
import { sanityDataset, sanityProjectId } from "./src/sanity/env";

export default defineCliConfig({
  api: {
    dataset: sanityDataset,
    projectId: sanityProjectId,
  },
});
