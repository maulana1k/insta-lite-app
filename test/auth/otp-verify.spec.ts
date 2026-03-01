import { expect, test } from "@playwright/test";

const API_URL = "http://localhost:8080/v1";

async function gotoVerifyWithEmail(page: import("@playwright/test").Page, email: string) {
  await page.goto("/auth");
  await page.evaluate((e) => sessionStorage.setItem("pendingEmail", e), email);
  await page.goto("/auth/verify");
  await page.waitForTimeout(200);
}

test.describe("OTP Verify — Page load", () => {
  test("redirects to /auth when pendingEmail is missing", async ({ page }) => {
    await page.goto("/auth/verify");
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/auth(?!\/verify)/);
  });

  test("shows masked email in the description", async ({ page }) => {
    await gotoVerifyWithEmail(page, "janedoe@gmail.com");
    await expect(page.locator("p", { hasText: /j\*+@gmail\.com/i })).toBeVisible();
  });

  test("renders 6 individual digit input boxes", async ({ page }) => {
    await gotoVerifyWithEmail(page, "test@example.com");
    const inputs = page.locator("input[inputmode='numeric']");
    await expect(inputs).toHaveCount(6);
  });

  test("Verify button is disabled when boxes are empty", async ({ page }) => {
    await gotoVerifyWithEmail(page, "test@example.com");
    await expect(page.getByRole("button", { name: /^verify$/i })).toBeDisabled();
  });

  test("'Back to sign in' link navigates to /auth", async ({ page }) => {
    await gotoVerifyWithEmail(page, "test@example.com");
    await page.getByRole("link", { name: /back to sign in/i }).click();
    await expect(page).toHaveURL(/\/auth(?!\/verify)/);
  });
});

test.describe("OTP Verify — Digit input behaviour", () => {
  test.beforeEach(async ({ page }) => {
    await gotoVerifyWithEmail(page, "test@example.com");
  });

  test("focus advances automatically after each digit", async ({ page }) => {
    const inputs = page.locator("input[inputmode='numeric']");
    await inputs.nth(0).click();
    await inputs.nth(0).fill("1");
    await expect(inputs.nth(1)).toBeFocused({ timeout: 500 });
  });

  test("Verify button transitions to 'Verifying…' when all 6 boxes are filled", async ({
    page,
  }) => {
    // Delay the backend response so we can observe the intermediate loading state
    await page.route(`${API_URL}/auth/verify-email/otp`, async (route) => {
      await new Promise((r) => setTimeout(r, 3000));
      await route.abort();
    });

    const inputs = page.locator("input[inputmode='numeric']");
    for (let i = 0; i < 6; i++) {
      await inputs.nth(i).fill(String(i + 1));
    }

    // Auto-submit fires on 6th digit — button should show loading state
    await expect(page.getByRole("button", { name: /verifying/i })).toBeVisible({ timeout: 1000 });
  });

  test("backspace clears digit and moves focus back", async ({ page }) => {
    const inputs = page.locator("input[inputmode='numeric']");
    await inputs.nth(0).fill("5");
    await inputs.nth(1).fill("3");
    await inputs.nth(2).press("Backspace");
    await expect(inputs.nth(1)).toBeFocused({ timeout: 500 });
  });

  test("pasting a 6-digit code fills all boxes", async ({ page }) => {
    // Delay network so auto-submit doesn't clear boxes before we can read them
    await page.route(`${API_URL}/auth/verify-email/otp`, async (route) => {
      await new Promise((r) => setTimeout(r, 3000));
      await route.abort();
    });

    const inputs = page.locator("input[inputmode='numeric']");
    await inputs.nth(0).click();
    await inputs.nth(0).fill("482910");

    // Wait for React to re-render all controlled inputs
    await expect(inputs.nth(5)).not.toHaveValue("");
    const filled = await inputs.evaluateAll((els) =>
      (els as HTMLInputElement[]).map((el) => el.value),
    );
    expect(filled.join("")).toBe("482910");
  });
});

test.describe("OTP Verify — Submission", () => {
  test.beforeEach(async ({ page }) => {
    await gotoVerifyWithEmail(page, "test@example.com");
  });

  test("shows error on wrong code (stays on /auth/verify)", async ({ page }) => {
    const inputs = page.locator("input[inputmode='numeric']");
    for (let i = 0; i < 6; i++) {
      await inputs.nth(i).fill("0");
    }
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/\/auth\/verify/);
    await expect(page.locator("p.text-destructive")).toBeVisible();
    const text = await page.locator("p.text-destructive").textContent();
    expect(text?.toLowerCase()).toMatch(/invalid|code|try again/i);
  });

  test("digit boxes reset and first box re-focused after wrong code", async ({ page }) => {
    const inputs = page.locator("input[inputmode='numeric']");
    for (let i = 0; i < 6; i++) {
      await inputs.nth(i).fill("0");
    }
    await page.waitForTimeout(3000);

    const values = await inputs.evaluateAll((els) =>
      (els as HTMLInputElement[]).map((el) => el.value),
    );
    expect(values.every((v) => v === "")).toBe(true);
    await expect(inputs.nth(0)).toBeFocused({ timeout: 500 });
  });

  test("Verify button shows 'Verifying…' during submission", async ({ page }) => {
    await page.route(`${API_URL}/auth/verify-email/otp`, async (route) => {
      await new Promise((r) => setTimeout(r, 3000));
      await route.continue();
    });

    const inputs = page.locator("input[inputmode='numeric']");
    for (let i = 0; i < 6; i++) {
      await inputs.nth(i).fill(String(i + 1));
    }

    await expect(page.getByRole("button", { name: /verifying/i })).toBeVisible({ timeout: 1000 });
  });
});

test.describe("OTP Verify — Resend", () => {
  test.beforeEach(async ({ page }) => {
    await gotoVerifyWithEmail(page, "test@example.com");
  });

  test("resend button is visible and enabled initially", async ({ page }) => {
    await expect(page.getByRole("button", { name: /resend code/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /resend code/i })).toBeEnabled();
  });

  test("resend button shows countdown after click and becomes disabled", async ({ page }) => {
    await page.route(`${API_URL}/auth/resend-verification`, async (route) => {
      await route.fulfill({ status: 200, body: JSON.stringify({ data: { message: "ok" } }) });
    });

    await page.getByRole("button", { name: /resend code/i }).click();
    await expect(page.getByRole("button", { name: /resend code \(\d+s\)/i })).toBeVisible({
      timeout: 1000,
    });
    await expect(page.getByRole("button", { name: /resend code \(\d+s\)/i })).toBeDisabled();
  });
});
