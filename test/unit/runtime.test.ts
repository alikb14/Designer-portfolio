import { describe, expect, it } from "vitest";
import { getMissingServerConfiguration } from "@/lib/config/runtime";

describe("server runtime configuration", () => {
  it("reports both required server-only values when they are absent", () => {
    const originalReadToken = process.env.SANITY_API_READ_TOKEN;
    const originalRevalidateSecret = process.env.SANITY_REVALIDATE_SECRET;

    try {
      delete process.env.SANITY_API_READ_TOKEN;
      delete process.env.SANITY_REVALIDATE_SECRET;

      expect(getMissingServerConfiguration()).toEqual([
        "SANITY_API_READ_TOKEN",
        "SANITY_REVALIDATE_SECRET",
      ]);
    } finally {
      if (originalReadToken === undefined) {
        delete process.env.SANITY_API_READ_TOKEN;
      } else {
        process.env.SANITY_API_READ_TOKEN = originalReadToken;
      }

      if (originalRevalidateSecret === undefined) {
        delete process.env.SANITY_REVALIDATE_SECRET;
      } else {
        process.env.SANITY_REVALIDATE_SECRET = originalRevalidateSecret;
      }
    }
  });
});
