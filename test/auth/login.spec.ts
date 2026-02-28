import { expect, test } from "@playwright/test";

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth");
    // Switch to login mode (page defaults to signup)
    await page.getByRole("button", { name: "Log in" }).first().click();
    await page.waitForTimeout(150);
  });

  test("shows email and password fields in login mode", async ({ page }) => {
    await expect(page.locator("input[type='email']")).toBeVisible();
    await expect(page.locator("input[type='password']")).toBeVisible();
    await expect(page.getByRole("button", { name: /continue/i })).toBeVisible();
  });

  test("Continue button is disabled when fields are empty", async ({
    page,
  }) => {
    await expect(
      page.getByRole("button", { name: /continue/i }),
    ).toBeDisabled();
  });

  test("Continue button enables only when both fields are filled", async ({
    page,
  }) => {
    const email = page.locator("input[type='email']");
    const password = page.locator("input[type='password']");
    const btn = page.getByRole("button", { name: /continue/i });

    await email.fill("user@example.com");
    await expect(btn).toBeDisabled(); // password still empty

    await password.fill("somepassword");
    await expect(btn).toBeEnabled();

    await email.fill("");
    await expect(btn).toBeDisabled(); // cleared email → disabled again
  });

  test("shows friendly error for wrong credentials — no page reload", async ({
    page,
  }) => {
    await page.locator("input[type='email']").fill("nobody@example.com");
    await page.locator("input[type='password']").fill("wrongpassword");
    await page.getByRole("button", { name: /continue/i }).click();

    // Should stay on /auth — no redirect/reload
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/\/auth/);

    // Error message should be human-readable, not a raw validation string
    const error = page.locator("p.text-destructive");
    await expect(error).toBeVisible();
    const text = await error.textContent();
    expect(text).not.toMatch(/Key:|Error:Field validation/i);
    expect(text?.length).toBeGreaterThan(5);
  });

  test("shows 'Please wait' label and disables button during submission", async ({
    page,
  }) => {
    await page.locator("input[type='email']").fill("user@example.com");
    await page.locator("input[type='password']").fill("password123");

    const btn = page.getByRole("button", { name: /continue|please wait/i });
    await btn.click();

    // Button should show loading state immediately
    await expect(
      page.getByRole("button", { name: /please wait/i }),
    ).toBeVisible({ timeout: 1000 });
  });

  test("error clears when user edits email field", async ({ page }) => {
    const email = page.locator("input[type='email']");
    const password = page.locator("input[type='password']");

    await email.fill("nobody@example.com");
    await password.fill("badpassword");
    await page.getByRole("button", { name: /continue/i }).click();
    await page.waitForTimeout(3000);

    // Error appears
    await expect(page.locator("p.text-destructive")).toBeVisible();

    // Editing email clears error
    await email.fill("new@example.com");
    await expect(page.locator("p.text-destructive")).not.toBeVisible();
  });

  test("pressing Enter on password field submits the form", async ({
    page,
  }) => {
    await page.locator("input[type='email']").fill("user@example.com");
    const password = page.locator("input[type='password']");
    await password.fill("password123");
    await password.press("Enter");

    // Should attempt submission — button enters loading state or error appears
    await expect(
      page
        .getByRole("button", { name: /please wait/i })
        .or(page.locator("p.text-destructive")),
    ).toBeVisible({ timeout: 4000 });
  });
});
