import { expect, test } from "@playwright/test";

test("foundation home and health endpoint are reachable", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /motion portfolio engineering/i }),
  ).toBeVisible();

  const health = await request.get("/api/health");
  await expect(health).toBeOK();
  await expect(health.json()).resolves.toEqual({
    service: "yaad-motion-portfolio",
    status: "ok",
  });
});

test("interaction spike exposes non-hover controls", async ({ page }) => {
  await page.goto("/spikes/interactions");

  await expect(page.getByTestId("earth-status")).toContainText("Earth:");
  await expect(page.getByRole("button", { name: "Preview" })).toBeVisible();
});
