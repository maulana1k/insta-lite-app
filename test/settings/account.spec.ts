import { expect, test } from "@playwright/test";

// Helper: inject a real refresh_token cookie so the middleware allows access,
// then mock the client-side auth-init endpoints.
async function setupSession(page: import("@playwright/test").Page) {
  // Middleware reads the HTTP cookie — context.addCookies() is the only way to set it.
  await page.context().addCookies([
    {
      name: "refresh_token",
      value: "fake-refresh-token",
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: false,
    },
  ]);

  // Client-side auth init calls GET /api/auth/cookies → returns access token.
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

  // Auth init then calls GET /v1/users/me with the access token.
  await page.route("**/v1/users/me", (route) => {
    if (route.request().method() === "GET") {
      return route.fulfill({
        status: 200,
        json: {
          data: {
            id: "user-1",
            username: "johndoe",
            email: "john@example.com",
            display_name: "John Doe",
            bio: "Software developer",
            website_url: "johndoe.dev",
            avatar_url: null,
            cover_url: null,
            is_email_confirmed: true,
            follower_count: 100,
            following_count: 50,
            post_count: 20,
            created_at: "2024-01-01T00:00:00Z",
          },
        },
      });
    }
    return route.continue();
  });
}

// ── Route protection ──────────────────────────────────────────────────────────

test.describe("Settings Account — route protection", () => {
  test("unauthenticated user is redirected to /auth", async ({ page }) => {
    // No cookie — middleware redirects.
    await page.goto("/settings", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/auth/);
  });
});

// ── Page structure ────────────────────────────────────────────────────────────

test.describe("Settings Account — page structure", () => {
  test.beforeEach(async ({ page }) => {
    await setupSession(page);
    await page.goto("/settings");
    // Wait for the form to paint after auth init.
    await page.waitForTimeout(1500);
  });

  test("settings page loads without redirecting to /auth", async ({ page }) => {
    await expect(page).not.toHaveURL(/\/auth/);
    await expect(page).toHaveURL(/\/settings/);
  });

  test("shows the Profil Anda section heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Profil Anda" }),
    ).toBeVisible({ timeout: 5000 });
  });

  test("shows the display name (Nama Depan) input", async ({ page }) => {
    // <input type="text"> — the display name field.
    const nameInput = page.locator("input[type='text']").first();
    await expect(nameInput).toBeVisible({ timeout: 5000 });
  });

  test("display name input is pre-populated from store defaults", async ({
    page,
  }) => {
    // useState seeds from currentUser ?? Zustand default.
    // currentUser is null at mount (auth init is async), so the field shows
    // the Zustand store fallback "Jack Harding" on initial render.
    const nameInput = page.locator("input[type='text']").first();
    await expect(nameInput).not.toHaveValue("", { timeout: 5000 });
  });

  test("shows the username input with @ adornment", async ({ page }) => {
    // Username input is inside a flex container that also has an AtSign icon.
    const usernameRow = page
      .locator("div.flex.items-center")
      .filter({ has: page.locator("svg") })
      .filter({ has: page.locator("input") })
      .first();
    await expect(usernameRow.locator("input")).toBeVisible({ timeout: 5000 });
  });

  test("shows the bio textarea", async ({ page }) => {
    const bio = page.locator("textarea").first();
    await expect(bio).toBeVisible({ timeout: 5000 });
  });

  test("shows the website input with globe icon", async ({ page }) => {
    const websiteInput = page.locator(
      "input[placeholder='https://website.com']",
    );
    await expect(websiteInput).toBeVisible({ timeout: 5000 });
  });

  test("shows the Save Changes button", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /save changes/i }),
    ).toBeVisible({ timeout: 5000 });
  });

  test("shows avatar initials fallback when avatar_url is null", async ({
    page,
  }) => {
    // Avatar fallback renders the first 2 chars of display_name/store default.
    // Store default is "Jack Harding" → "JA".
    await expect(page.getByText("JA")).toBeVisible({ timeout: 5000 });
  });

  test("shows the Password & Keamanan section", async ({ page }) => {
    await expect(page.getByText("Password & Keamanan")).toBeVisible({
      timeout: 5000,
    });
  });
});

// ── Save Changes ──────────────────────────────────────────────────────────────

test.describe("Settings Account — Save Changes", () => {
  test("clicking Save triggers PATCH /users/me", async ({ page }) => {
    let patchBody: Record<string, unknown> = {};

    await setupSession(page);
    await page.route("**/v1/users/me", async (route) => {
      if (route.request().method() === "PATCH") {
        patchBody = JSON.parse(route.request().postData() ?? "{}");
        return route.fulfill({
          status: 200,
          json: {
            data: {
              id: "user-1",
              username: "johndoe",
              email: "john@example.com",
              display_name: "Jane Doe",
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
          },
        });
      }
      // GET /users/me (auth init)
      return route.fulfill({
        status: 200,
        json: {
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
        },
      });
    });

    await page.goto("/settings");
    await page.waitForTimeout(1500);

    // Update the display name field
    const nameInput = page.locator("input[type='text']").first();
    await nameInput.fill("Jane Doe");

    await page.getByRole("button", { name: /save changes/i }).click();
    await page.waitForTimeout(1000);

    expect(patchBody).toMatchObject({ display_name: "Jane Doe" });
  });

  test("Save button shows spinner while PATCH is in flight", async ({
    page,
  }) => {
    await setupSession(page);
    await page.route("**/v1/users/me", async (route) => {
      if (route.request().method() === "PATCH") {
        // Delay so spinner is observable.
        await new Promise((r) => setTimeout(r, 1500));
        return route.fulfill({
          status: 200,
          json: {
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
          },
        });
      }
      return route.fulfill({
        status: 200,
        json: {
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
        },
      });
    });

    await page.goto("/settings");
    await page.waitForTimeout(1500);

    await page.getByRole("button", { name: /save changes/i }).click();

    // The button should go into a disabled+spinner state.
    const saveBtn = page.getByRole("button", { name: /save changes/i });
    await expect(saveBtn).toBeDisabled({ timeout: 1000 });
  });

  test("shows API error message when PATCH fails", async ({ page }) => {
    await setupSession(page);
    await page.route("**/v1/users/me", async (route) => {
      if (route.request().method() === "PATCH") {
        return route.fulfill({
          status: 422,
          json: {
            error: {
              code: "validation_error",
              message: "Display name is too long.",
            },
          },
        });
      }
      return route.fulfill({
        status: 200,
        json: {
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
        },
      });
    });

    await page.goto("/settings");
    await page.waitForTimeout(1500);

    await page.getByRole("button", { name: /save changes/i }).click();
    await page.waitForTimeout(1500);

    await expect(page.getByText("Display name is too long.")).toBeVisible({
      timeout: 3000,
    });
  });
});
