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
  await expect(page.getByRole("link", { name: "Project 01" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Project 02" })).toBeVisible();

  await page.goto("/play");
  await expect(
    page.getByRole("heading", { name: /download my project files/i }),
  ).toBeVisible();

  await page.goto("/about");
  await expect(
    page.locator(".about-copy .typewriter-text-live").first(),
  ).toContainText(/i'm yaad, a 2d motion designer/i);
});

test("interaction spike exposes non-hover controls", async ({ page }) => {
  await page.goto("/spikes/interactions");

  await expect(page.getByTestId("earth-status")).toContainText("2D Earth");
  await expect(page.getByRole("button", { name: "Preview" })).toBeVisible();
});

test("Earth keeps lower-rate motion and accepts direct pointer interaction when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const earth = page.getByRole("img", {
    name: /two-dimensional ascii earth/i,
  });
  await page.waitForTimeout(500);
  const before = await earth.screenshot();
  await page.waitForTimeout(700);
  const afterDrift = await earth.screenshot();
  expect(afterDrift.equals(before)).toBe(false);

  const bounds = await earth.boundingBox();
  expect(bounds).not.toBeNull();

  await page.mouse.move(
    (bounds?.x ?? 0) + (bounds?.width ?? 0) * 0.72,
    (bounds?.y ?? 0) + (bounds?.height ?? 0) * 0.48,
  );
  await expect(earth).toHaveAttribute("data-pointer-active", "true");
  await page.waitForTimeout(700);

  const afterAttraction = await earth.screenshot();
  expect(afterAttraction.equals(afterDrift)).toBe(false);

  await page.mouse.move(0, 0);
  await expect(earth).toHaveAttribute("data-pointer-active", "false");
});

for (const viewport of [
  { height: 1080, width: 1920 },
  { height: 864, width: 1536 },
  { height: 900, width: 1440 },
  { height: 768, width: 1366 },
  { height: 720, width: 1280 },
]) {
  test(`Play cards and About fit the initial desktop viewport at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/play");
    await page.waitForTimeout(1_600);

    const art = page.locator(".play-art");
    await expect(art).toHaveCount(3);

    for (const projectArt of await art.all()) {
      const bounds = await projectArt.boundingBox();
      expect(bounds?.y).toBeDefined();
      const bottom = (bounds?.y ?? 0) + (bounds?.height ?? 0);
      expect(bottom).toBeLessThanOrEqual(viewport.height - 8);
      expect(bottom).toBeGreaterThanOrEqual(viewport.height - 56);
    }

    const firstDownload = page
      .getByRole("button", { name: "DOWNLOAD" })
      .first();
    const downloadBounds = await firstDownload.boundingBox();
    expect(downloadBounds?.y).toBeGreaterThanOrEqual(viewport.height);
    await firstDownload.scrollIntoViewIfNeeded();
    const revealedDownloadBounds = await firstDownload.boundingBox();
    expect(
      (revealedDownloadBounds?.y ?? viewport.height) +
        (revealedDownloadBounds?.height ?? 0),
    ).toBeLessThanOrEqual(viewport.height + 1);

    await page.goto("/about");
    await page.waitForTimeout(1_600);
    const mediaBounds = await page.locator(".about-media").boundingBox();
    expect(mediaBounds?.y).toBeDefined();
    expect(
      (mediaBounds?.y ?? 0) + (mediaBounds?.height ?? 0),
    ).toBeLessThanOrEqual(viewport.height - 8);
  });
}

test("Play hover copy restarts cleanly and page scrolling remains available", async ({
  page,
}) => {
  await page.setViewportSize({ height: 768, width: 1366 });
  await page.goto("/play");
  const firstCard = page.locator(".play-card").first();
  const liveCopy = firstCard.locator(".play-description .typewriter-text-live");

  await page.evaluate(() => window.scrollTo(0, 160));
  const scrollPositionBeforeHover = await page.evaluate(() => window.scrollY);
  const scrollHeightBeforeHover = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  const art = firstCard.locator(".play-art");
  const artBounds = await art.boundingBox();
  expect(artBounds).not.toBeNull();
  await page.mouse.move(
    (artBounds?.x ?? 0) + (artBounds?.width ?? 0) / 2,
    (artBounds?.y ?? 0) + (artBounds?.height ?? 0) / 2,
  );
  await page.waitForTimeout(120);
  const partialText = await liveCopy.textContent();
  expect(partialText?.length).toBeGreaterThan(0);
  await expect(firstCard.locator(".play-art")).toHaveCSS("transform", /matrix/);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBe(scrollPositionBeforeHover);
  const scrollHeightAfterHover = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  expect(
    Math.abs(scrollHeightAfterHover - scrollHeightBeforeHover),
  ).toBeLessThanOrEqual(1);
  const descriptionBounds = await firstCard
    .locator(".play-description")
    .boundingBox();
  const downloadBounds = await firstCard
    .getByRole("button", { name: "DOWNLOAD" })
    .boundingBox();
  expect(descriptionBounds?.y).toBeGreaterThanOrEqual(
    (downloadBounds?.y ?? 0) + (downloadBounds?.height ?? 0),
  );

  await page.mouse.move(0, 0);
  const restartedArtBounds = await art.boundingBox();
  expect(restartedArtBounds).not.toBeNull();
  await page.mouse.move(
    (restartedArtBounds?.x ?? 0) + (restartedArtBounds?.width ?? 0) / 2,
    (restartedArtBounds?.y ?? 0) + (restartedArtBounds?.height ?? 0) / 2,
  );
  await page.waitForTimeout(120);
  const restartedText = await liveCopy.textContent();
  expect(restartedText?.length).toBeGreaterThan(0);
  expect(restartedText?.length).toBeLessThan(
    "Project file and description will be published here when the final downloadable asset is ready."
      .length,
  );

  await page.setViewportSize({ height: 700, width: 390 });
  await page.goto("/work");
  const scrollbarWidth = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollbarWidth,
  );
  expect(scrollbarWidth).toBe("none");
  await page.evaluate(() => window.scrollTo(0, 120));
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);
});

test("page copy types after navigation and Work cards enter smoothly", async ({
  page,
}) => {
  await page.goto("/contact");
  const contactCopy = page
    .locator(".contact-page .typewriter-text-live")
    .first();
  await page.waitForTimeout(1_050);
  const partialCopy = await contactCopy.textContent();
  expect(partialCopy?.length).toBeGreaterThan(0);
  expect(partialCopy?.length).toBeLessThan("Let's make something move.".length);

  await page.goto("/work");
  const firstCard = page.locator(".work-card").first();
  const initialOpacity = Number(
    await firstCard.evaluate((card) => getComputedStyle(card).opacity),
  );
  expect(initialOpacity).toBeLessThan(1);
  await page.waitForTimeout(650);
  await expect(firstCard).toHaveCSS("opacity", "1");
  await firstCard.hover();
  await expect(firstCard).toHaveCSS("transform", /matrix/);
});
