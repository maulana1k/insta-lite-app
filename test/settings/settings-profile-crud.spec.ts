import { expect, test } from "@playwright/test";
import path from "path";

const API_URL = "http://localhost:8080/v1";

// ── Shared mock data ──────────────────────────────────────────────────────────

const MOCK_PROFILE = {
  id: "user-1",
  username: "johndoe",
  email: "john@example.com",
  display_name: "John Doe",
  bio: "Software developer",
  website_url: "https://johndoe.dev",
  avatar_url: null,
  cover_url: null,
  is_email_confirmed: true,
  follower_count: 100,
  following_count: 50,
  post_count: 20,
  created_at: "2024-01-01T00:00:00Z",
};

// ── Helper: authenticated session + profile mock ──────────────────────────────

async function setupSession(
  page: import("@playwright/test").Page,
  profileOverrides: Partial<typeof MOCK_PROFILE> = {},
) {
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

  const profile = { ...MOCK_PROFILE, ...profileOverrides };

  await page.route("**/v1/users/me", (route) => {
    if (route.request().method() === "GET") {
      return route.fulfill({ status: 200, json: { data: profile } });
    }
    return route.continue();
  });
}

// ── Helper: navigate to settings and wait for profile to load ─────────────────

async function gotoSettings(page: import("@playwright/test").Page) {
  await page.goto("/settings");
  // Wait for auth init + GET /users/me + React re-render that seeds the form
  await page.waitForTimeout(1500);
}

// ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ──

// ── Data seeding ──────────────────────────────────────────────────────────────

test.describe("Settings Profile — data seeding", () => {
  test.beforeEach(async ({ page }) => {
    await setupSession(page);
    await gotoSettings(page);
  });

  test("display name is pre-populated from GET /users/me", async ({ page }) => {
    const nameInput = page.locator("input[type='text']").first();
    await expect(nameInput).toHaveValue("John Doe", { timeout: 5000 });
  });

  test("username is pre-populated from GET /users/me", async ({ page }) => {
    // Username input sits next to the @ icon
    const usernameInput = page
      .locator("div.flex.items-center")
      .filter({ has: page.locator("svg") })
      .locator("input")
      .first();
    await expect(usernameInput).toHaveValue("johndoe", { timeout: 5000 });
  });

  test("bio is pre-populated from GET /users/me", async ({ page }) => {
    await expect(page.locator("textarea").first()).toHaveValue(
      "Software developer",
      { timeout: 5000 },
    );
  });

  test("website is pre-populated from GET /users/me", async ({ page }) => {
    await expect(
      page.locator("input[placeholder='https://website.com']"),
    ).toHaveValue("https://johndoe.dev", { timeout: 5000 });
  });

  test("avatar fallback shows initials when avatar_url is null", async ({
    page,
  }) => {
    // display_name "John Doe" → "JO"
    // Target the large avatar fallback span specifically (not the header mini avatar)
    await expect(
      page.locator("span[data-slot='avatar-fallback']").filter({ hasText: "JO" }),
    ).toBeVisible({ timeout: 5000 });
  });

  test("bio character counter reflects pre-loaded bio length", async ({
    page,
  }) => {
    // "Software developer" = 18 chars
    await expect(page.getByText("18/160")).toBeVisible({ timeout: 5000 });
  });
});

// ── Change detection ──────────────────────────────────────────────────────────

test.describe("Settings Profile — change detection", () => {
  test.beforeEach(async ({ page }) => {
    await setupSession(page);
    await gotoSettings(page);
  });

  test("Save Changes button is disabled when no changes have been made", async ({
    page,
  }) => {
    await expect(
      page.getByRole("button", { name: /save changes/i }),
    ).toBeDisabled({ timeout: 5000 });
  });

  test("Save Changes button enables after editing display name", async ({
    page,
  }) => {
    const nameInput = page.locator("input[type='text']").first();
    await nameInput.fill("Jane Doe");
    await expect(
      page.getByRole("button", { name: /save changes/i }),
    ).toBeEnabled({ timeout: 3000 });
  });

  test("Save Changes button enables after editing bio", async ({ page }) => {
    const bio = page.locator("textarea").first();
    await bio.fill("Updated bio");
    await expect(
      page.getByRole("button", { name: /save changes/i }),
    ).toBeEnabled({ timeout: 3000 });
  });

  test("Save Changes button enables after editing website", async ({ page }) => {
    const website = page.locator("input[placeholder='https://website.com']");
    await website.fill("https://newsite.dev");
    await expect(
      page.getByRole("button", { name: /save changes/i }),
    ).toBeEnabled({ timeout: 3000 });
  });

  test("Save Changes button disables again after reverting display name", async ({
    page,
  }) => {
    const nameInput = page.locator("input[type='text']").first();
    await nameInput.fill("Jane Doe");
    await expect(
      page.getByRole("button", { name: /save changes/i }),
    ).toBeEnabled({ timeout: 3000 });

    // Revert
    await nameInput.fill("John Doe");
    await expect(
      page.getByRole("button", { name: /save changes/i }),
    ).toBeDisabled({ timeout: 3000 });
  });
});

// ── Bio character counter ─────────────────────────────────────────────────────

test.describe("Settings Profile — bio character counter", () => {
  test.beforeEach(async ({ page }) => {
    await setupSession(page);
    await gotoSettings(page);
  });

  test("counter updates as user types into the bio field", async ({ page }) => {
    const bio = page.locator("textarea").first();
    await bio.fill("Hello");
    await expect(page.getByText("5/160")).toBeVisible({ timeout: 3000 });
  });

  test("counter shows 0/160 when bio is cleared", async ({ page }) => {
    const bio = page.locator("textarea").first();
    await bio.fill("");
    await expect(page.getByText("0/160")).toBeVisible({ timeout: 3000 });
  });
});

// ── Save profile — success ────────────────────────────────────────────────────

test.describe("Settings Profile — save success", () => {
  // Shared route setup that intercepts PATCH and returns updated profile
  async function setupWithPatch(
    page: import("@playwright/test").Page,
    updatedProfile: Partial<typeof MOCK_PROFILE> = {},
    delay = 0,
  ) {
    await setupSession(page);
    await page.route("**/v1/users/me", async (route) => {
      if (route.request().method() === "PATCH") {
        if (delay) await new Promise((r) => setTimeout(r, delay));
        return route.fulfill({
          status: 200,
          json: { data: { ...MOCK_PROFILE, ...updatedProfile } },
        });
      }
      // GET
      return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
    });
  }

  test("PATCH /users/me is called with updated display_name", async ({
    page,
  }) => {
    let patchBody: Record<string, unknown> = {};
    await setupSession(page);
    await page.route("**/v1/users/me", async (route) => {
      if (route.request().method() === "PATCH") {
        patchBody = JSON.parse(route.request().postData() ?? "{}");
        return route.fulfill({
          status: 200,
          json: { data: { ...MOCK_PROFILE, display_name: "Jane Doe" } },
        });
      }
      return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
    });

    await gotoSettings(page);
    await page.locator("input[type='text']").first().fill("Jane Doe");
    await page.getByRole("button", { name: /save changes/i }).click();
    await page.waitForTimeout(1000);

    expect(patchBody).toMatchObject({ display_name: "Jane Doe" });
  });

  test("PATCH /users/me is called with updated bio", async ({ page }) => {
    let patchBody: Record<string, unknown> = {};
    await setupSession(page);
    await page.route("**/v1/users/me", async (route) => {
      if (route.request().method() === "PATCH") {
        patchBody = JSON.parse(route.request().postData() ?? "{}");
        return route.fulfill({
          status: 200,
          json: { data: { ...MOCK_PROFILE, bio: "New bio text" } },
        });
      }
      return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
    });

    await gotoSettings(page);
    await page.locator("textarea").first().fill("New bio text");
    await page.getByRole("button", { name: /save changes/i }).click();
    await page.waitForTimeout(1000);

    expect(patchBody).toMatchObject({ bio: "New bio text" });
  });

  test("PATCH /users/me is called with updated website_url", async ({
    page,
  }) => {
    let patchBody: Record<string, unknown> = {};
    await setupSession(page);
    await page.route("**/v1/users/me", async (route) => {
      if (route.request().method() === "PATCH") {
        patchBody = JSON.parse(route.request().postData() ?? "{}");
        return route.fulfill({
          status: 200,
          json: {
            data: { ...MOCK_PROFILE, website_url: "https://newsite.dev" },
          },
        });
      }
      return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
    });

    await gotoSettings(page);
    await page
      .locator("input[placeholder='https://website.com']")
      .fill("https://newsite.dev");
    await page.getByRole("button", { name: /save changes/i }).click();
    await page.waitForTimeout(1000);

    expect(patchBody).toMatchObject({ website_url: "https://newsite.dev" });
  });

  test("'Saved' badge appears after a successful PATCH", async ({ page }) => {
    await setupWithPatch(page);
    await gotoSettings(page);

    await page.locator("input[type='text']").first().fill("Jane Doe");
    await page.getByRole("button", { name: /save changes/i }).click();

    await expect(page.getByText(/^saved$/i)).toBeVisible({ timeout: 5000 });
  });

  test("Save button shows spinner while PATCH is in-flight", async ({
    page,
  }) => {
    await setupWithPatch(page, {}, 2000);
    await gotoSettings(page);

    await page.locator("input[type='text']").first().fill("Jane Doe");
    await page.getByRole("button", { name: /save changes/i }).click();

    // Button should be disabled while saving
    await expect(
      page.getByRole("button", { name: /save changes/i }),
    ).toBeDisabled({ timeout: 1000 });
  });
});

// ── Save profile — error ──────────────────────────────────────────────────────

test.describe("Settings Profile — save error", () => {
  test("shows API error message on 422 response", async ({ page }) => {
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
      return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
    });

    await gotoSettings(page);
    await page.locator("input[type='text']").first().fill("A".repeat(51));
    await page.getByRole("button", { name: /save changes/i }).click();

    await expect(page.getByText("Display name is too long.")).toBeVisible({
      timeout: 5000,
    });
  });

  test("Save button is re-enabled after a PATCH error", async ({ page }) => {
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
      return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
    });

    await gotoSettings(page);
    await page.locator("input[type='text']").first().fill("Jane Doe");
    await page.getByRole("button", { name: /save changes/i }).click();
    await page.waitForTimeout(1500);

    // Button should still be enabled so user can retry
    await expect(
      page.getByRole("button", { name: /save changes/i }),
    ).toBeEnabled({ timeout: 3000 });
  });
});

// ── Avatar upload ─────────────────────────────────────────────────────────────

test.describe("Settings Profile — avatar upload", () => {
  // Intercept all three steps of the GCS media upload flow.
  async function setupWithAvatarUpload(
    page: import("@playwright/test").Page,
    opts: { gcsStatus?: number; confirmStatus?: number } = {},
  ) {
    await setupSession(page);

    // Step 1: POST /media/upload-url → signed URL + media_id
    await page.route("**/v1/media/upload-url", (route) => {
      return route.fulfill({
        status: 201,
        json: {
          data: {
            media_id: "media-abc-123",
            upload_url: "http://localhost:8080/fake-gcs-upload",
          },
        },
      });
    });

    // Step 2: PUT to GCS signed URL
    await page.route("**/fake-gcs-upload", (route) => {
      if (opts.gcsStatus && opts.gcsStatus !== 200) {
        return route.fulfill({ status: opts.gcsStatus });
      }
      return route.fulfill({ status: 200 });
    });

    // Step 3: POST /media/confirm
    await page.route("**/v1/media/confirm", (route) => {
      if (opts.confirmStatus && opts.confirmStatus !== 200) {
        return route.fulfill({
          status: opts.confirmStatus,
          json: {
            error: { code: "validation_error", message: "Upload not found." },
          },
        });
      }
      return route.fulfill({
        status: 200,
        json: {
          data: {
            media_id: "media-abc-123",
            public_url: "https://storage.googleapis.com/jends-media/avatars/johndoe.jpg",
          },
        },
      });
    });

    // PATCH /users/me with avatar_media_id
    await page.route("**/v1/users/me", async (route) => {
      if (route.request().method() === "PATCH") {
        return route.fulfill({
          status: 200,
          json: {
            data: {
              ...MOCK_PROFILE,
              avatar_url: "https://storage.googleapis.com/jends-media/avatars/johndoe.jpg",
            },
          },
        });
      }
      return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
    });
  }

  test("POST /media/upload-url is called with context=avatar, mime_type, size_bytes", async ({
    page,
  }) => {
    let uploadUrlBody: Record<string, unknown> = {};
    await setupSession(page);

    await page.route("**/v1/media/upload-url", (route) => {
      uploadUrlBody = JSON.parse(route.request().postData() ?? "{}");
      return route.fulfill({
        status: 201,
        json: {
          data: {
            media_id: "media-abc-123",
            upload_url: "http://localhost:8080/fake-gcs-upload",
          },
        },
      });
    });
    await page.route("**/fake-gcs-upload", (route) =>
      route.fulfill({ status: 200 }),
    );
    await page.route("**/v1/media/confirm", (route) =>
      route.fulfill({
        status: 200,
        json: {
          data: { media_id: "media-abc-123", public_url: "https://example.com/avatar.jpg" },
        },
      }),
    );
    await page.route("**/v1/users/me", (route) => {
      if (route.request().method() === "PATCH") {
        return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
      }
      return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
    });

    await gotoSettings(page);

    // Set the file on the hidden file input
    const fileInput = page.locator("input[type='file'][accept='image/*']");
    await fileInput.setInputFiles({
      name: "avatar.jpg",
      mimeType: "image/jpeg",
      buffer: Buffer.from("fake-image-data"),
    });

    await page.waitForTimeout(1500);

    expect(uploadUrlBody).toMatchObject({
      context: "avatar",
      mime_type: "image/jpeg",
    });
    expect(typeof uploadUrlBody.size_bytes).toBe("number");
  });

  test("PATCH /users/me is called with avatar_media_id after successful upload", async ({
    page,
  }) => {
    let patchBody: Record<string, unknown> = {};
    await setupSession(page);

    await page.route("**/v1/media/upload-url", (route) =>
      route.fulfill({
        status: 201,
        json: {
          data: {
            media_id: "media-abc-123",
            upload_url: "http://localhost:8080/fake-gcs-upload",
          },
        },
      }),
    );
    await page.route("**/fake-gcs-upload", (route) =>
      route.fulfill({ status: 200 }),
    );
    await page.route("**/v1/media/confirm", (route) =>
      route.fulfill({
        status: 200,
        json: {
          data: { media_id: "media-abc-123", public_url: "https://example.com/avatar.jpg" },
        },
      }),
    );
    await page.route("**/v1/users/me", (route) => {
      if (route.request().method() === "PATCH") {
        patchBody = JSON.parse(route.request().postData() ?? "{}");
        return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
      }
      return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
    });

    await gotoSettings(page);

    const fileInput = page.locator("input[type='file'][accept='image/*']");
    await fileInput.setInputFiles({
      name: "avatar.jpg",
      mimeType: "image/jpeg",
      buffer: Buffer.from("fake-image-data"),
    });

    await page.waitForTimeout(1500);

    expect(patchBody).toMatchObject({ avatar_media_id: "media-abc-123" });
  });

  test("spinner overlay appears on avatar while upload is in-flight", async ({
    page,
  }) => {
    await setupSession(page);

    await page.route("**/v1/media/upload-url", async (route) => {
      await new Promise((r) => setTimeout(r, 2000));
      return route.fulfill({
        status: 201,
        json: {
          data: {
            media_id: "media-abc-123",
            upload_url: "http://localhost:8080/fake-gcs-upload",
          },
        },
      });
    });
    await page.route("**/fake-gcs-upload", (route) =>
      route.fulfill({ status: 200 }),
    );
    await page.route("**/v1/media/confirm", (route) =>
      route.fulfill({
        status: 200,
        json: {
          data: { media_id: "media-abc-123", public_url: "https://example.com/avatar.jpg" },
        },
      }),
    );
    await page.route("**/v1/users/me", (route) => {
      if (route.request().method() === "PATCH") {
        return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
      }
      return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
    });

    await gotoSettings(page);

    const fileInput = page.locator("input[type='file'][accept='image/*']");
    await fileInput.setInputFiles({
      name: "avatar.jpg",
      mimeType: "image/jpeg",
      buffer: Buffer.from("fake-image-data"),
    });

    // Spinner (Loader2) should be visible during the in-flight upload
    await expect(
      page.locator(".animate-spin").first(),
    ).toBeVisible({ timeout: 1000 });
  });

  test("avatar local preview is shown immediately after selecting a file", async ({
    page,
  }) => {
    await setupSession(page);

    // Delay the upload URL step so the blob preview is observable before upload completes
    await page.route("**/v1/media/upload-url", async (route) => {
      await new Promise((r) => setTimeout(r, 3000));
      return route.fulfill({
        status: 201,
        json: {
          data: {
            media_id: "media-abc-123",
            upload_url: "http://localhost:8080/fake-gcs-upload",
          },
        },
      });
    });
    await page.route("**/fake-gcs-upload", (route) =>
      route.fulfill({ status: 200 }),
    );
    await page.route("**/v1/media/confirm", (route) =>
      route.fulfill({
        status: 200,
        json: {
          data: { media_id: "media-abc-123", public_url: "https://example.com/avatar.jpg" },
        },
      }),
    );
    await page.route("**/v1/users/me", (route) => {
      if (route.request().method() === "PATCH") {
        return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
      }
      return route.fulfill({ status: 200, json: { data: MOCK_PROFILE } });
    });

    await gotoSettings(page);

    // Minimal valid 1×1 PNG so the browser actually loads it — Radix Avatar
    // only renders the <img> element in the DOM after the image successfully loads.
    const PNG_1X1 = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "base64",
    );

    const fileInput = page.locator("input[type='file'][accept='image/*']");
    await fileInput.setInputFiles({
      name: "avatar.png",
      mimeType: "image/png",
      buffer: PNG_1X1,
    });

    // Once the blob loads, Radix Avatar renders the <img> with the blob: src.
    await expect(
      page.locator("label:has(input[type='file'][accept='image/*']) img"),
    ).toHaveAttribute("src", /^blob:/, { timeout: 5000 });
  });
});
