import { expect, test } from "@playwright/test";

test("portfolio home and health endpoint are reachable", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const homeHeading = page.getByRole("heading", { level: 1 });
  await expect(homeHeading).toBeVisible();
  await expect(homeHeading).not.toBeEmpty();
  await expect(
    page.getByRole("img", { name: /two-dimensional ascii earth/i }),
  ).toBeVisible();
  const developerCredit = page.getByRole("link", { name: "Ali KB" });
  await expect(developerCredit).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/ali-kb-141863340/",
  );
  await expect(developerCredit).toHaveAttribute("rel", /author/);
  await expect(page.locator(".home-reel iframe")).toHaveAttribute(
    "src",
    /https:\/\/player\.vimeo\.com\/video\/\d+/,
  );

  const health = await request.get("/api/health");
  await expect(health).toBeOK();
  await expect(health.json()).resolves.toEqual({
    service: "yaad-motion-portfolio",
    status: "ok",
  });

  const homeResponse = await request.get("/");
  expect(homeResponse.headers()["content-security-policy"]).toContain(
    "frame-src 'self' https://player.vimeo.com",
  );
});

test("Home provides a static Earth fallback when Canvas is unavailable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
  });
  await page.goto("/");

  await expect(page.getByTestId("earth-status")).toHaveText(
    "Static Earth fallback",
  );
  await expect(page.locator(".earth-fallback").first()).toBeVisible();
});

test("Sanity Studio shell is served from a noindex route", async ({
  request,
}) => {
  const response = await request.get("/studio");

  expect(response.ok()).toBe(true);
  expect(await response.text()).toMatch(/noindex/i);
});

for (const viewport of [
  { height: 568, width: 320 },
  { height: 667, width: 375 },
  { height: 1024, width: 768 },
  { height: 768, width: 1024 },
  { height: 900, width: 1440 },
  { height: 1080, width: 1920 },
]) {
  test(`primary routes avoid horizontal overflow at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);

    for (const route of [
      "/",
      "/work",
      "/play",
      "/about",
      "/contact",
      "/work/project-01",
    ]) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(
        page.getByText("Something went wrong", { exact: true }),
      ).toHaveCount(0);
      await expect
        .poll(() =>
          page.evaluate(
            () =>
              document.documentElement.scrollWidth <=
              document.documentElement.clientWidth,
          ),
        )
        .toBe(true);
    }
  });
}

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
  ).not.toBeEmpty();
});

test("interaction spike exposes non-hover controls", async ({ page }) => {
  await page.goto("/spikes/interactions");

  await expect(page.getByTestId("earth-status")).toContainText("2D Earth");
  await expect(page.getByRole("button", { name: "Preview" })).toBeVisible();
});

test("Earth retains its motion and accepts direct pointer interaction when reduced motion is requested", async ({
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

  await page.goto("/play");
  const firstCard = page.locator(".play-card").first();
  await expect
    .poll(() =>
      page
        .locator(".play-grid")
        .evaluate(
          (element) => getComputedStyle(element, "::before").animationName,
        ),
    )
    .toBe("play-grid-enter");
  await expect(firstCard).toHaveCSS("transition-duration", "0.3s");
  await expect(firstCard.locator(".play-art")).toHaveCSS(
    "transition-duration",
    "0.28s, 0.3s",
  );
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
    expect(await art.count()).toBeGreaterThan(0);

    const firstRowCount = viewport.width >= 901 ? 3 : 2;
    for (const projectArt of (await art.all()).slice(0, firstRowCount)) {
      const bounds = await projectArt.boundingBox();
      expect(bounds?.y).toBeDefined();
      const bottom = (bounds?.y ?? 0) + (bounds?.height ?? 0);
      expect(bottom).toBeLessThanOrEqual(viewport.height - 8);
    }

    const firstArtBounds = await art.first().boundingBox();
    for (const projectArt of (await art.all()).slice(firstRowCount)) {
      const bounds = await projectArt.boundingBox();
      expect(bounds?.y).toBeGreaterThan(
        (firstArtBounds?.y ?? 0) + (firstArtBounds?.height ?? 0),
      );
    }

    const firstDownload = page.locator(".download-bar").first();
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
  await expect
    .poll(() =>
      page
        .locator(".play-grid")
        .evaluate(
          (element) => getComputedStyle(element, "::before").animationName,
        ),
    )
    .toBe("play-grid-enter");
  await expect
    .poll(() =>
      page
        .locator(".play-grid")
        .evaluate(
          (element) => getComputedStyle(element, "::before").animationDelay,
        ),
    )
    .toBe("0.7s");
  await page.waitForTimeout(1_500);

  await page.evaluate(() => window.scrollTo(0, 160));
  const scrollPositionBeforeHover = await page.evaluate(() => window.scrollY);
  const art = firstCard.locator(".play-art");
  const artBounds = await art.boundingBox();
  expect(artBounds).not.toBeNull();
  await page.mouse.move(
    (artBounds?.x ?? 0) + (artBounds?.width ?? 0) / 2,
    (artBounds?.y ?? 0) + (artBounds?.height ?? 0) / 2,
  );
  await expect
    .poll(async () => (await liveCopy.textContent())?.trim().length ?? 0)
    .toBeGreaterThan(0);
  await expect(firstCard).toHaveCSS("transform", /matrix\(1\.022/);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBe(scrollPositionBeforeHover);
  const descriptionBounds = await firstCard
    .locator(".play-description")
    .boundingBox();
  const downloadBounds = await firstCard.locator(".download-bar").boundingBox();
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
  await page.waitForTimeout(220);
  const restartedText = await liveCopy.textContent();
  const fullDescription = await firstCard
    .locator(".play-description .typewriter-text-measure")
    .textContent();
  expect(restartedText?.length).toBeGreaterThan(0);
  expect(restartedText?.length).toBeLessThan(fullDescription?.length ?? 0);

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

test("Play hover presentation is disabled at mobile width", async ({
  page,
}) => {
  await page.setViewportSize({ height: 700, width: 390 });
  await page.goto("/play");
  await page.waitForTimeout(1_500);

  const firstCard = page.locator(".play-card").first();
  const art = firstCard.locator(".play-art");
  const artBounds = await art.boundingBox();
  expect(artBounds).not.toBeNull();

  await page.mouse.move(
    (artBounds?.x ?? 0) + (artBounds?.width ?? 0) / 2,
    (artBounds?.y ?? 0) + (artBounds?.height ?? 0) / 2,
  );

  await expect(firstCard).not.toHaveClass(/is-active/);
  await expect(art).toHaveCSS("filter", "grayscale(1)");
  await expect(firstCard).toHaveCSS("transform", /matrix\(1, 0, 0, 1, 0, 0\)/);

  await firstCard.getByRole("button", { name: "DETAILS" }).click();
  await expect(firstCard.locator(".play-description")).toBeVisible();
  await expect(art).toHaveCSS("filter", "grayscale(1)");
});

test("page copy types after navigation and Work cards enter smoothly", async ({
  page,
}) => {
  await page.goto("/contact");
  const contactCopy = page
    .locator(".contact-page .typewriter-text-live")
    .first();
  await page.waitForTimeout(450);
  const partialCopy = await contactCopy.textContent();
  expect(partialCopy?.length).toBeGreaterThan(0);
  expect(partialCopy?.length).toBeLessThan("Let's make something move.".length);

  await page.goto("/work");
  const firstCard = page.locator(".work-card").first();
  await expect(firstCard).toHaveCSS("animation-name", "work-card-enter");
  await page.waitForTimeout(650);
  await expect(firstCard).toHaveCSS("opacity", "1");
  await firstCard.hover();
  await expect(firstCard).toHaveCSS("transform", /matrix/);
});
