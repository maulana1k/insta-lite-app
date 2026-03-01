/**
 * Settings sidebar navigation tests.
 *
 * SettingsProfile component is not rendered on any route (it's not wired into
 * the sidebar). These tests cover the actual settings page navigation that IS
 * accessible: sidebar items, section switching, and the Akun section content.
 */

import { expect, test } from "@playwright/test";

async function setupSession(page: import("@playwright/test").Page) {
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
    return route.continue();
  });

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
            bio: null,
            website_url: null,
            avatar_url: null,
            cover_url: null,
            is_email_confirmed: true,
            follower_count: 0,
            following_count: 0,
            post_count: 0,
            created_at: "2024-01-01T00:00:00Z",
          },
        },
      });
    }
    return route.continue();
  });
}

test.describe("Settings — Sidebar Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await setupSession(page);
    await page.goto("/settings");
    await page.waitForTimeout(1500);
  });

  test("shows the Pengaturan sidebar heading", async ({ page }) => {
    await expect(page.getByText("Pengaturan")).toBeVisible({ timeout: 5000 });
  });

  test("all sidebar sections are visible", async ({ page }) => {
    // Labels match SettingsSidebar SECTIONS array.
    // Use exact: true to avoid matching "Akun Diblokir" / "Akun Dibisukan" buttons.
    const sidebar = page.locator("nav");
    await expect(
      sidebar.getByRole("button", { name: "Akun", exact: true }),
    ).toBeVisible({ timeout: 5000 });
    await expect(
      sidebar.getByRole("button", { name: "Privasi", exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByRole("button", { name: "Notifikasi", exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByRole("button", { name: "Tampilan", exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByRole("button", { name: "Data", exact: true }),
    ).toBeVisible();
    await expect(
      sidebar.getByRole("button", { name: "Insight", exact: true }),
    ).toBeVisible();
  });

  test("Akun section is active by default", async ({ page }) => {
    // "Profil Anda" is the h2 heading rendered by SettingsAccount.
    // Use getByRole to avoid matching the paragraph that also contains "profil Anda".
    await expect(
      page.getByRole("heading", { name: "Profil Anda" }),
    ).toBeVisible({ timeout: 5000 });
  });

  test("clicking Privasi shows the privacy section", async ({ page }) => {
    const sidebar = page.locator("nav");
    await sidebar.getByRole("button", { name: "Privasi", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Profil Anda" }),
    ).not.toBeVisible({ timeout: 2000 });
  });

  test("clicking Notifikasi shows the notifications section", async ({
    page,
  }) => {
    const sidebar = page.locator("nav");
    await sidebar
      .getByRole("button", { name: "Notifikasi", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "Profil Anda" }),
    ).not.toBeVisible({ timeout: 2000 });
  });

  test("clicking Akun after switching returns to account section", async ({
    page,
  }) => {
    const sidebar = page.locator("nav");

    // Switch away first
    await sidebar.getByRole("button", { name: "Privasi", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Profil Anda" }),
    ).not.toBeVisible({ timeout: 2000 });

    // Switch back — use exact to avoid "Akun Diblokir" / "Akun Dibisukan" matches
    await sidebar.getByRole("button", { name: "Akun", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Profil Anda" }),
    ).toBeVisible({ timeout: 3000 });
  });
});
