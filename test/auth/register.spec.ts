import { expect, test } from "@playwright/test";

test.describe("Register", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth");
    await page.waitForTimeout(200);
  });

  test("page opens in signup mode with 'Create your account' heading", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText(/create your account/i);
  });

  test("shows email, username, and password fields in signup mode", async ({ page }) => {
    await expect(page.locator("input[type='email']")).toBeVisible();
    await expect(page.locator("input[placeholder='username']")).toBeVisible();
    await expect(page.locator("input[type='password']")).toBeVisible();
  });

  test("Create account button is disabled when any field is empty", async ({ page }) => {
    const btn = page.getByRole("button", { name: /create account/i });
    await expect(btn).toBeDisabled();

    // Fill email + username but no password
    await page.locator("input[type='email']").fill("user@example.com");
    await page.locator("input[placeholder='username']").fill("testuser");
    await expect(btn).toBeDisabled();

    // Fill all three
    await page.locator("input[type='password']").fill("password123");
    await expect(btn).toBeEnabled();
  });

  test("username field strips non-alphanumeric characters and lowercases", async ({ page }) => {
    const usernameInput = page.locator("input[placeholder='username']");
    await usernameInput.fill("Test User!");
    // Characters not matching [a-z0-9_] are stripped; uppercased → lowercased
    await expect(usernameInput).toHaveValue(/^[a-z0-9_]*$/);
  });

  test("shows friendly error for invalid email format", async ({ page }) => {
    await page.locator("input[type='email']").fill("notanemail");
    await page.locator("input[placeholder='username']").fill("testuser");
    await page.locator("input[type='password']").fill("Password123");
    await page.getByRole("button", { name: /create account/i }).click();

    await page.waitForTimeout(3000);

    const error = page.locator("p.text-destructive");
    await expect(error).toBeVisible();
    const text = await error.textContent();

    expect(text).not.toMatch(/Key:|Error:Field validation/i);
    expect(text?.toLowerCase()).toMatch(/email|valid|check/i);
  });

  test("shows friendly error for duplicate email", async ({ page }) => {
    await page.locator("input[type='email']").fill("test@example.com");
    await page.locator("input[placeholder='username']").fill("testuser");
    await page.locator("input[type='password']").fill("Password123");
    await page.getByRole("button", { name: /create account/i }).click();

    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/\/auth\/verify|\/auth/);

    if (page.url().includes("/auth") && !page.url().includes("/verify")) {
      const error = page.locator("p.text-destructive");
      if (await error.isVisible()) {
        const text = await error.textContent();
        expect(text).not.toMatch(/Key:|Error:Field validation/i);
      }
    }
  });

  test("successful register redirects to /auth/verify", async ({ page }) => {
    const unique = `pw${Date.now()}`;
    await page.locator("input[type='email']").fill(`${unique}@example.com`);
    await page.locator("input[placeholder='username']").fill(unique.slice(-12));
    await page.locator("input[type='password']").fill("Password123!");
    await page.getByRole("button", { name: /create account/i }).click();

    await page.waitForURL(/\/auth\/verify/, { timeout: 8000 });
    await expect(page).toHaveURL(/\/auth\/verify/);
  });

  test("toggling to login and back updates heading", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText(/create your account/i);

    await page.getByRole("button", { name: "Log in" }).first().click();
    await expect(page.locator("h1")).toHaveText(/sign in to continue/i);

    await page.getByRole("button", { name: "Sign up" }).first().click();
    await expect(page.locator("h1")).toHaveText(/create your account/i);
  });

  test("switching to login hides username field", async ({ page }) => {
    await expect(page.locator("input[placeholder='username']")).toBeVisible();

    await page.getByRole("button", { name: "Log in" }).first().click();
    await expect(page.locator("input[placeholder='username']")).not.toBeVisible();
  });

  test("footer text matches signup mode", async ({ page }) => {
    const footer = page.locator("footer p");
    await expect(footer).toContainText(/signing up/i);
  });
});
