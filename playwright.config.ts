import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry",
  },
  webServer: {
    command:
      "node --import ./test/fixtures/sanity-fetch.mjs node_modules/next/dist/bin/next dev --port 3100 --hostname 127.0.0.1",
    env: {
      PLAYWRIGHT_TEST: "1",
      NEXT_PUBLIC_SANITY_PROJECT_ID: "fixture1",
      NEXT_PUBLIC_SANITY_DATASET: "testing",
    },
    reuseExistingServer: false,
    timeout: 120_000,
    url: "http://127.0.0.1:3100",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
