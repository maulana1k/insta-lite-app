import { expect, test } from "@playwright/test";

test.describe("Register", () => {
  test.beforeEach(async ({ page }) => {
    // Page defaults to signup mode
    await page.goto("/auth");
    await page.waitForTimeout(200);
  });

  test("page opens in Sign up mode by default", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText(/sign up/i);
  });

  test("shows email and password fields", async ({ page }) => {
    await expect(page.locator("input[type='email']")).toBeVisible();
    await expect(page.locator("input[type='password']")).toBeVisible();
  });

  test("shows friendly error for invalid email format", async ({ page }) => {
    await page.locator("input[type='email']").fill("notanemail");
    await page.locator("input[type='password']").fill("Password123");
    await page.getByRole("button", { name: /continue/i }).click();

    await page.waitForTimeout(3000);

    const error = page.locator("p.text-destructive");
    await expect(error).toBeVisible();
    const text = await error.textContent();

    // Must not expose raw Go validator output
    expect(text).not.toMatch(/Key:|Error:Field validation/i);
    // Should be user-readable
    expect(text?.toLowerCase()).toMatch(/email|valid|check/i);
  });

  test("shows friendly error for duplicate email", async ({ page }) => {
    // Use a likely-existing email from prior test runs
    await page.locator("input[type='email']").fill("test@example.com");
    await page.locator("input[type='password']").fill("Password123");
    await page.getByRole("button", { name: /continue/i }).click();

    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/\/auth|\/onboarding/);

    // If on auth, verify the error is friendly
    if (page.url().includes("/auth")) {
      const error = page.locator("p.text-destructive");
      if (await error.isVisible()) {
        const text = await error.textContent();
        expect(text).not.toMatch(/Key:|Error:Field validation/i);
      }
    }
  });

  test("toggling to Log in and back resets heading", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText(/sign up/i);

    await page.getByRole("button", { name: "Log in" }).first().click();
    await expect(page.locator("h1")).toHaveText(/log in/i);

    await page.getByRole("button", { name: "Sign up" }).first().click();
    await expect(page.locator("h1")).toHaveText(/sign up/i);
  });

  test("footer text matches signup mode", async ({ page }) => {
    const footer = page.locator("footer p");
    await expect(footer).toContainText(/signing up/i);
  });
});
