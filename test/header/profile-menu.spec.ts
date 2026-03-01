import { expect, test } from "@playwright/test";

// Mock /users/me response — simulates a logged-in user
const MOCK_ME = {
  data: {
    id: "user-1",
    username: "johndoe",
    email: "john@example.com",
    display_name: "John Doe",
    bio: null,
    website_url: null,
    avatar_url: null,
    cover_url: null,
    is_email_confirmed: true,
    follower_count: 100,
    following_count: 50,
    post_count: 20,
    created_at: "2024-01-01T00:00:00Z",
  },
};

const MOCK_ME_WITH_AVATAR = {
  data: {
    ...MOCK_ME.data,
    avatar_url: "https://i.pravatar.cc/150?u=johndoe",
  },
};

test.describe("Header — Profile Menu (unauthenticated)", () => {
  test("header is visible on the home page", async ({ page }) => {
    await page.goto("/");
    // Header is the fixed top bar
    const header = page.locator("div.fixed.top-0");
    await expect(header).toBeVisible();
  });

  test("profile menu button is visible", async ({ page }) => {
    await page.goto("/");
    // Avatar button — rounded-full overflow-hidden
    const avatarBtn = page
      .locator("button.rounded-full.overflow-hidden")
      .first();
    await expect(avatarBtn).toBeVisible({ timeout: 3000 });
  });

  test("clicking profile button opens the dropdown", async ({ page }) => {
    await page.goto("/");
    await page.locator("button.rounded-full.overflow-hidden").first().click();

    // Dropdown contains Settings and Sign out
    await expect(page.getByText("Settings")).toBeVisible({ timeout: 2000 });
    await expect(page.getByText("Sign out")).toBeVisible({ timeout: 2000 });
  });

  test("dropdown contains a theme toggle button", async ({ page }) => {
    await page.goto("/");
    await page.locator("button.rounded-full.overflow-hidden").first().click();

    await expect(page.getByText("Theme")).toBeVisible({ timeout: 2000 });
  });

  test("dropdown has a link to Settings page", async ({ page }) => {
    await page.goto("/");
    await page.locator("button.rounded-full.overflow-hidden").first().click();

    const settingsLink = page.getByRole("link", { name: /settings/i });
    await expect(settingsLink).toBeVisible({ timeout: 2000 });
    await expect(settingsLink).toHaveAttribute("href", "/settings");
  });

  test("clicking outside the dropdown closes it", async ({ page }) => {
    await page.goto("/");
    await page.locator("button.rounded-full.overflow-hidden").first().click();
    await expect(page.getByText("Sign out")).toBeVisible({ timeout: 2000 });

    // Click elsewhere
    await page.locator("body").click({ position: { x: 100, y: 400 } });

    await expect(page.getByText("Sign out")).not.toBeVisible({ timeout: 1000 });
  });

  test("pressing Escape closes the dropdown", async ({ page }) => {
    await page.goto("/");
    await page.locator("button.rounded-full.overflow-hidden").first().click();
    await expect(page.getByText("Sign out")).toBeVisible({ timeout: 2000 });

    await page.keyboard.press("Escape");

    await expect(page.getByText("Sign out")).not.toBeVisible({ timeout: 1000 });
  });
});

test.describe("Header — Profile Menu (with mocked session)", () => {
  test.beforeEach(async ({ page }) => {
    // Simulate session: cookie handler returns a token, /users/me returns user data
    await page.route("**/api/auth/cookies", (route) => {
      if (route.request().method() === "GET") {
        return route.fulfill({
          status: 200,
          json: { access_token: "fake-access-token" },
        });
      }
      return route.continue();
    });
    await page.route("**/v1/users/me", (route) =>
      route.fulfill({ status: 200, json: MOCK_ME }),
    );
  });

  test("dropdown shows real display name from currentUser", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForTimeout(1500); // wait for session init

    await page.locator("button.rounded-full.overflow-hidden").first().click();
    await expect(page.getByText("John Doe")).toBeVisible({ timeout: 3000 });
  });

  test("profile link points to /u/:username", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1500);

    await page.locator("button.rounded-full.overflow-hidden").first().click();

    const profileLink = page.locator(`a[href="/u/johndoe"]`).first();
    await expect(profileLink).toBeVisible({ timeout: 3000 });
  });

  test("shows initials avatar when avatar_url is null", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1500);

    // No <img> with avatar src — should show initials div instead
    const avatarBtn = page
      .locator("button.rounded-full.overflow-hidden")
      .first();
    await expect(avatarBtn).toBeVisible({ timeout: 3000 });

    // The initials "JO" (first 2 chars of "John Doe") should be in the button
    await expect(avatarBtn.getByText("JO")).toBeVisible({ timeout: 3000 });
  });

  test("shows avatar image when avatar_url is provided", async ({ page }) => {
    // Override mock to include avatar
    await page.route("**/v1/users/me", (route) =>
      route.fulfill({ status: 200, json: MOCK_ME_WITH_AVATAR }),
    );

    await page.goto("/");
    await page.waitForTimeout(1500);

    const avatarBtn = page
      .locator("button.rounded-full.overflow-hidden")
      .first();
    await expect(avatarBtn.locator("img")).toBeVisible({ timeout: 3000 });
  });
});

test.describe("Header — Sign Out", () => {
  test("Sign out button triggers logout and redirects to /auth", async ({
    page,
  }) => {
    // Set up mocked session
    await page.route("**/api/auth/cookies", (route) => {
      if (route.request().method() === "GET") {
        return route.fulfill({
          status: 200,
          json: { access_token: "fake-access-token" },
        });
      }
      if (route.request().method() === "DELETE") {
        return route.fulfill({ status: 200 });
      }
      return route.continue();
    });
    await page.route("**/v1/users/me", (route) =>
      route.fulfill({ status: 200, json: MOCK_ME }),
    );
    await page.route("**/v1/auth/logout", (route) =>
      route.fulfill({ status: 204 }),
    );

    await page.goto("/");
    await page.waitForTimeout(1500);

    await page.locator("button.rounded-full.overflow-hidden").first().click();
    await page.getByText("Sign out").click();

    await expect(page).toHaveURL(/\/auth/, { timeout: 5000 });
  });
});
