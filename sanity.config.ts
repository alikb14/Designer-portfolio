"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityDataset, sanityProjectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  dataset: sanityDataset,
  name: "yaad-motion-portfolio",
  plugins: [structureTool()],
  projectId: sanityProjectId,
  schema: { types: schemaTypes },
  title: "Yaad Motion Portfolio",
});
