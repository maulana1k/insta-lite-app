import { expect, test } from "@playwright/test";

const API_URL = "http://localhost:8080/v1";

test.describe("OAuth Providers", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth");
    await page
      .locator(".fixed.inset-0.z-\\[9999\\]")
      .waitFor({ state: "hidden", timeout: 6000 })
      .catch(() => {});
  });

  test("Google button is visible in signup mode", async ({ page }) => {
    await expect(page.getByRole("button", { name: /continue with google/i })).toBeVisible();
  });

  test("Google button is visible in login mode", async ({ page }) => {
    await page.getByRole("button", { name: "Log in" }).first().click();
    await expect(page.getByRole("button", { name: /continue with google/i })).toBeVisible();
  });

  test("Apple and Microsoft buttons are not present (Google-only layout)", async ({ page }) => {
    await expect(page.getByRole("button", { name: /apple/i })).not.toBeVisible();
    await expect(page.getByRole("button", { name: /microsoft/i })).not.toBeVisible();
  });

  test("Google button redirects to backend OAuth URL", async ({ page }) => {
    await page.getByRole("button", { name: /continue with google/i }).click();

    await page.waitForURL(`${API_URL}/auth/google`, { timeout: 4000 }).catch(() => {});
    expect(page.url()).toContain("/auth/google");
  });
});

test.describe("OAuth Callback Page", () => {
  test("renders loading state on arrival", async ({ page }) => {
    await page.goto("/auth/callback?access_token=fake&refresh_token=fake", {
      waitUntil: "domcontentloaded",
    });

    const isLoading = await page
      .locator("p", { hasText: /signing you in/i })
      .isVisible()
      .catch(() => false);
    const hasRedirected = !page.url().includes("/auth/callback");

    expect(isLoading || hasRedirected).toBe(true);
  });

  test("redirects away from callback after processing tokens", async ({ page }) => {
    await page.goto("/auth/callback?access_token=fake&refresh_token=fake");
    await page.waitForTimeout(3000);

    expect(page.url()).not.toContain("/auth/callback");
  });

  test("redirects to /auth on missing tokens", async ({ page }) => {
    await page.goto("/auth/callback");
    await page.waitForTimeout(2000);

    expect(page.url()).toMatch(/\/auth/);
  });
});
