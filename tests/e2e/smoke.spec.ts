import { expect, test } from "@playwright/test";

test("portfolio home and health endpoint are reachable", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /yaad a 2d motion designer/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: /two-dimensional ascii earth/i }),
  ).toBeVisible();

  const health = await request.get("/api/health");
  await expect(health).toBeOK();
  await expect(health.json()).resolves.toEqual({
    service: "yaad-motion-portfolio",
    status: "ok",
  });
});

test("primary portfolio routes match the approved information architecture", async ({
  page,
}) => {
  await page.goto("/work");
  await expect(page.getByText("Project 01")).toBeVisible();
  await expect(page.getByText("Project 02")).toBeVisible();

  await page.goto("/play");
  await expect(
    page.getByRole("heading", { name: /download my project files/i }),
  ).toBeVisible();

  await page.goto("/about");
  await expect(page.getByText(/i'm yaad, a 2d motion designer/i)).toBeVisible();
});

test("interaction spike exposes non-hover controls", async ({ page }) => {
  await page.goto("/spikes/interactions");

  await expect(page.getByTestId("earth-status")).toContainText("2D Earth");
  await expect(page.getByRole("button", { name: "Preview" })).toBeVisible();
});
