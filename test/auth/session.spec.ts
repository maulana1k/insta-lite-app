import { expect, test } from "@playwright/test";

test.describe("Session & Splash Screen", () => {
  test("splash screen is visible on cold load", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // The splash renders immediately before isInitialized fires
    const splash = page.locator(".fixed.inset-0.z-\\[9999\\]");
    await expect(splash).toBeVisible({ timeout: 1000 });
  });

  test("splash screen disappears after auth initializes", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const splash = page.locator(".fixed.inset-0.z-\\[9999\\]");
    // Give it time to initialize (600ms min + init time)
    await expect(splash).not.toBeVisible({ timeout: 6000 });
  });

  test("unauthenticated user — home page is accessible without redirect", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForTimeout(2000);
    // Home is public, should not redirect to /auth
    expect(page.url()).not.toMatch(/\/auth/);
  });

  test("unauthenticated user — /auth page is accessible", async ({ page }) => {
    await page.goto("/auth");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page).toHaveURL(/\/auth/);
  });
});

test.describe("Session Restore (no active session)", () => {
  test("GET /api/auth/cookies returns 401 when no cookie is set", async ({
    page,
  }) => {
    await page.goto("/");

    const result = await page.evaluate(async () => {
      const res = await fetch("/api/auth/cookies", { method: "GET" });
      return res.status;
    });

    expect(result).toBe(401);
  });

  test("DELETE /api/auth/cookies always succeeds even if no cookie", async ({
    page,
  }) => {
    await page.goto("/");

    const status = await page.evaluate(async () => {
      const res = await fetch("/api/auth/cookies", { method: "DELETE" });
      return res.status;
    });

    expect(status).toBe(200);
  });
});
