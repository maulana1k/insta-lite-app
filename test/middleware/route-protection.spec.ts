import { expect, test } from "@playwright/test";

const PROTECTED = [
  "/settings",
  "/create",
  "/messages",
  "/activities",
  "/saved",
  "/following",
];

test.describe("Route Protection — unauthenticated", () => {
  for (const path of PROTECTED) {
    test(`${path} redirects to /auth with ?next param`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });

      const decoded = decodeURIComponent(page.url());
      expect(decoded).toContain("/auth");
      expect(decoded).toContain(`next=${path}`);
    });
  }

  test("/auth page is reachable without a session", async ({ page }) => {
    await page.goto("/auth");
    await expect(page).toHaveURL(/\/auth/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("/ (home) is reachable without a session", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1500);
    expect(page.url()).not.toMatch(/\/auth/);
  });
});

test.describe("Route Protection — next param preservation", () => {
  test("?next param is correctly set from the attempted path", async ({
    page,
  }) => {
    await page.goto("/settings/profile", { waitUntil: "domcontentloaded" });

    const decoded = decodeURIComponent(page.url());
    expect(decoded).toContain("next=/settings/profile");
  });

  test("Auth page shows the correct form after redirect", async ({ page }) => {
    await page.goto("/settings", { waitUntil: "domcontentloaded" });
    await expect(page.locator("input[type='email']")).toBeVisible();
    await expect(page.locator("input[type='password']")).toBeVisible();
  });
});
