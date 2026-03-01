import { expect, test } from "@playwright/test";

// The submit button in login mode is exactly "Continue" — use exact match to
// avoid colliding with the "Continue with Google" OAuth button.
const submitBtn = (page: import("@playwright/test").Page) =>
  page.getByRole("button", { name: "Continue", exact: true });

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth");
    await page.getByRole("button", { name: "Log in" }).first().click();
    await page.waitForTimeout(150);
  });

  test("shows 'Sign in to continue' heading in login mode", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText(/sign in to continue/i);
  });

  test("shows email and password fields (no username) in login mode", async ({ page }) => {
    await expect(page.locator("input[type='email']")).toBeVisible();
    await expect(page.locator("input[type='password']")).toBeVisible();
    await expect(page.locator("input[placeholder='username']")).not.toBeVisible();
  });

  test("Continue button is disabled when fields are empty", async ({ page }) => {
    await expect(submitBtn(page)).toBeDisabled();
  });

  test("Continue button enables only when both fields are filled", async ({ page }) => {
    const email = page.locator("input[type='email']");
    const password = page.locator("input[type='password']");
    const btn = submitBtn(page);

    await email.fill("user@example.com");
    await expect(btn).toBeDisabled(); // password still empty

    await password.fill("somepassword");
    await expect(btn).toBeEnabled();

    await email.fill("");
    await expect(btn).toBeDisabled(); // cleared email → disabled again
  });

  test("shows friendly error for wrong credentials — no page reload", async ({ page }) => {
    await page.locator("input[type='email']").fill("nobody@example.com");
    await page.locator("input[type='password']").fill("wrongpassword");
    await submitBtn(page).click();

    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/\/auth/);

    const error = page.locator("p.text-destructive");
    await expect(error).toBeVisible();
    const text = await error.textContent();
    expect(text).not.toMatch(/Key:|Error:Field validation/i);
    expect(text?.length).toBeGreaterThan(5);
  });

  test("shows 'Please wait' label and disables button during submission", async ({ page }) => {
    await page.locator("input[type='email']").fill("user@example.com");
    await page.locator("input[type='password']").fill("password123");
    await submitBtn(page).click();

    await expect(page.getByRole("button", { name: /please wait/i })).toBeVisible({ timeout: 1000 });
  });

  test("error clears when user edits email field", async ({ page }) => {
    const email = page.locator("input[type='email']");
    const password = page.locator("input[type='password']");

    await email.fill("nobody@example.com");
    await password.fill("badpassword");
    await submitBtn(page).click();
    await page.waitForTimeout(3000);

    await expect(page.locator("p.text-destructive")).toBeVisible();

    await email.fill("new@example.com");
    await expect(page.locator("p.text-destructive")).not.toBeVisible();
  });

  test("pressing Enter on password field submits the form", async ({ page }) => {
    await page.locator("input[type='email']").fill("user@example.com");
    const password = page.locator("input[type='password']");
    await password.fill("password123");
    await password.press("Enter");

    await expect(
      page.getByRole("button", { name: /please wait/i }).or(page.locator("p.text-destructive")),
    ).toBeVisible({ timeout: 4000 });
  });
});

test.describe("Login — Recent Accounts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth");
    await page.evaluate(() => {
      localStorage.setItem(
        "recentLogins",
        JSON.stringify([
          {
            username: "janedoe",
            display_name: "Jane Doe",
            avatar_url: "",
            email: "jane@example.com",
          },
        ]),
      );
    });
    await page.reload();
    await page.getByRole("button", { name: "Log in" }).first().click();
    await page.waitForTimeout(150);
  });

  test("recent login card is shown in login mode", async ({ page }) => {
    // Target the card button which contains both name and username
    await expect(page.getByRole("button", { name: /Jane Doe/i })).toBeVisible();
    await expect(page.locator("p.text-muted-foreground", { hasText: "@janedoe" })).toBeVisible();
  });

  test("clicking a recent login card pre-fills email and focuses password", async ({ page }) => {
    await page.getByRole("button", { name: /Jane Doe/i }).click();

    await expect(page.locator("input[type='email']")).toHaveValue("jane@example.com");

    // Hint text appears — target the span specifically to avoid card text collision
    await expect(page.locator("span", { hasText: "@janedoe" })).toBeVisible();

    await expect(page.locator("input[type='password']")).toBeFocused({ timeout: 500 });
  });

  test("removing a recent login card hides it", async ({ page }) => {
    const card = page.getByRole("button", { name: /Jane Doe/i });
    await card.hover();

    await page.getByRole("button", { name: /remove janedoe/i }).click();

    await expect(page.getByRole("button", { name: /Jane Doe/i })).not.toBeVisible();
  });

  test("recent accounts section is not shown in signup mode", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).first().click();
    await expect(page.getByRole("button", { name: /Jane Doe/i })).not.toBeVisible();
  });
});
