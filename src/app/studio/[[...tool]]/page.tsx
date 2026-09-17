import { NextStudio } from "next-sanity/studio";
import {
  metadata as studioMetadata,
  viewport as studioViewport,
} from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";
export const metadata = studioMetadata;
export const viewport = studioViewport;

export default function StudioPage() {
  return <NextStudio config={config} />;
}
