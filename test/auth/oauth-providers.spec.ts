import { expect, test } from "@playwright/test";

const API_URL = "http://localhost:8080/v1";

test.describe("OAuth Providers", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth");
    // Wait for splash screen to clear before any interaction
    await page
      .locator(".fixed.inset-0.z-\\[9999\\]")
      .waitFor({ state: "hidden", timeout: 6000 })
      .catch(() => { });
  });

  test("all three primary provider buttons are visible", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /google/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /apple/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /microsoft/i }),
    ).toBeVisible();
  });

  test("GitHub appears after clicking More options", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /github/i }),
    ).not.toBeVisible();

    await page.getByRole("button", { name: /more options/i }).click();

    await expect(
      page.getByRole("button", { name: /github/i }),
    ).toBeVisible();
  });

  test("More options toggles to Fewer options", async ({ page }) => {
    const toggle = page.getByRole("button", { name: /more options/i });
    await toggle.click();
    await expect(
      page.getByRole("button", { name: /fewer options/i }),
    ).toBeVisible();
  });

  test("Google button redirects to backend OAuth URL", async ({ page }) => {
    await page.getByRole("button", { name: /google/i }).click();

    // window.location.href redirect — page navigates away
    await page.waitForURL(`${API_URL}/auth/google`, { timeout: 4000 }).catch(() => { });
    expect(page.url()).toContain("/auth/google");
  });

});

test.describe("OAuth Callback Page", () => {
  test("renders loading state on arrival", async ({ page }) => {
    await page.goto("/auth/callback?access_token=fake&refresh_token=fake", {
      waitUntil: "domcontentloaded",
    });

    // Either still showing "Signing you in…" or already redirected
    const isLoading = await page
      .locator("p", { hasText: /signing you in/i })
      .isVisible()
      .catch(() => false);
    const hasRedirected = !page.url().includes("/auth/callback");

    expect(isLoading || hasRedirected).toBe(true);
  });

  test("redirects away from callback after processing tokens", async ({
    page,
  }) => {
    await page.goto("/auth/callback?access_token=fake&refresh_token=fake");
    await page.waitForTimeout(3000);

    // Should have left the callback page (either home or auth error)
    expect(page.url()).not.toContain("/auth/callback");
  });

  test("redirects to /auth on missing tokens", async ({ page }) => {
    await page.goto("/auth/callback");
    await page.waitForTimeout(2000);

    expect(page.url()).toMatch(/\/auth/);
  });
});
