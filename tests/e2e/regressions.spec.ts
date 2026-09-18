import { expect, test } from "@playwright/test";

test("theme survives blocked storage and follows system preference", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/contact");
  await expect(
    page.getByRole("button", { name: "Switch to dark theme" }),
  ).toBeVisible();
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.emulateMedia({ colorScheme: "light" });
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException("Denied", "SecurityError");
    };
    Storage.prototype.setItem = () => {
      throw new DOMException("Denied", "SecurityError");
    };
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.reload();
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(errors).toEqual([]);
});

test("keyboard reveals full Play copy and rows never cover earlier actions", async ({
  page,
}) => {
  for (const width of [320, 680, 768, 900, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/play");
    await expect(page.locator(".play-card")).toHaveCount(7);
    await page.locator(".play-card").first().focus();
    await expect(
      page.locator(".play-description .typewriter-text-live").first(),
    ).toHaveText(
      "A motion study with project files and a detailed explanation. "
        .repeat(5)
        .trim(),
    );
    const bounds = await page.locator(".play-card").evaluateAll((cards) =>
      cards.map((card) => {
        const rect = card.getBoundingClientRect();
        const description = card.querySelector(".play-description")!;
        return {
          x: rect.x,
          y: rect.y,
          bottom: rect.bottom,
          descriptionBottom: description.getBoundingClientRect().bottom,
          clipped: description.scrollHeight > description.clientHeight + 1,
        };
      }),
    );
    expect(bounds[0]?.clipped).toBe(false);
    const columns = width > 900 ? 3 : width > 680 ? 2 : 1;
    for (let index = columns; index < bounds.length; index++) {
      expect(bounds[index]!.y).toBeGreaterThan(bounds[index - columns]!.bottom);
    }
  }
});

test("Home reel and About content stay contained at tablet and landscape sizes", async ({
  page,
}) => {
  for (const viewport of [
    { width: 680, height: 700 },
    { width: 768, height: 375 },
    { width: 768, height: 1024 },
    { width: 900, height: 700 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.locator(".home-reel")).toBeVisible();
    const home = await page.evaluate(() => ({
      main: document
        .querySelector(".home-main")!
        .getBoundingClientRect()
        .toJSON(),
      reel: document
        .querySelector(".home-reel")!
        .getBoundingClientRect()
        .toJSON(),
      heading: document.querySelector("h1")!.getBoundingClientRect().toJSON(),
    }));
    expect(home.reel.bottom).toBeLessThanOrEqual(home.main.bottom);
    expect(home.reel.top).toBeGreaterThanOrEqual(home.heading.bottom);
    await page.goto("/about");
    await expect(page.locator(".about-media")).toBeVisible();
    const about = await page.evaluate(() => ({
      media: document
        .querySelector(".about-media")!
        .getBoundingClientRect()
        .toJSON(),
      copy: document
        .querySelector(".about-copy")!
        .getBoundingClientRect()
        .toJSON(),
    }));
    if (viewport.width > 680)
      expect(about.media.right).toBeLessThanOrEqual(about.copy.left);
    else expect(about.media.bottom).toBeLessThanOrEqual(about.copy.top);
  }
});

test("mobile navigation closes with Escape and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/contact");
  const menu = page.getByRole("button", { name: "Toggle navigation" });
  await menu.click();
  await expect(
    page.getByRole("link", { name: "WORK", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "WORK", exact: true }).focus();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("touch tablets expose preview and details controls", async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 768, height: 1024 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/work");
  await expect(
    page.getByRole("button", { name: "PREVIEW", exact: true }).first(),
  ).toBeVisible();
  await page.goto("http://127.0.0.1:3100/play");
  const details = page
    .getByRole("button", { name: "DETAILS", exact: true })
    .first();
  await details.tap();
  await expect(
    page.getByRole("button", { name: "HIDE DETAILS" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("button", { name: "HIDE DETAILS" }).tap();
  await expect(details).toHaveAttribute("aria-expanded", "false");
  await context.close();
});

test("essential copy and mobile routes remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 667 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/contact");
  await expect(page.locator("h1 .typewriter-text-measure")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "ABOUT", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "ABOUT", exact: true }).press("Enter");
  await expect(
    page.locator(".about-copy .typewriter-text-measure"),
  ).toBeVisible();
  await context.close();
});

test("real Work preview pauses after scrolling off screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/work");
  const preview = page.locator(".work-card").first();
  await preview.getByRole("button", { name: "PREVIEW", exact: true }).click();
  await expect
    .poll(() =>
      preview
        .locator("video")
        .evaluate((video) => !(video as HTMLVideoElement).paused),
    )
    .toBe(true);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect
    .poll(() =>
      preview
        .locator("video")
        .evaluate((video) => (video as HTMLVideoElement).paused),
    )
    .toBe(true);
});

test("missing projects have a real not-found response", async ({ request }) => {
  const response = await request.get("/work/does-not-exist");
  expect(response.status()).toBe(404);
});
