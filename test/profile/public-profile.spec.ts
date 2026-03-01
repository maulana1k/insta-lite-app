import { expect, test } from "@playwright/test";

// Mocked public profile returned by GET /v1/users/:username
const MOCK_PUBLIC_PROFILE = {
  data: {
    id: "user-123",
    username: "johndoe",
    display_name: "John Doe",
    bio: "Software developer",
    website_url: "johndoe.dev",
    avatar_url: "https://i.pravatar.cc/150?u=johndoe",
    cover_url: null,
    follower_count: 1200,
    following_count: 340,
    post_count: 47,
    is_following: false,
    is_blocking: false,
    is_blocked_by: false,
    created_at: "2024-01-15T00:00:00Z",
  },
};

const MOCK_USER_POSTS = {
  data: {
    results: [
      {
        id: "post-1",
        media_urls: ["https://picsum.photos/seed/1/400/400"],
        like_count: 120,
        comment_count: 14,
        created_at: "2024-06-01T00:00:00Z",
      },
      {
        id: "post-2",
        media_urls: [],
        like_count: 55,
        comment_count: 7,
        created_at: "2024-05-20T00:00:00Z",
      },
    ],
    next_cursor: null,
  },
};

test.describe("Public Profile Page", () => {
  test.beforeEach(async ({ page }) => {
    // Mock the backend API so tests are independent of real server
    await page.route("**/v1/users/johndoe", (route) =>
      route.fulfill({ status: 200, json: MOCK_PUBLIC_PROFILE }),
    );
    await page.route("**/v1/users/johndoe/posts**", (route) =>
      route.fulfill({ status: 200, json: MOCK_USER_POSTS }),
    );
    await page.goto("/u/johndoe");
  });

  test("renders the profile page without crashing", async ({ page }) => {
    await expect(page).not.toHaveURL(/\/auth/);
    await expect(page).toHaveURL(/\/u\/johndoe/);
  });

  test("shows the display name from API response", async ({ page }) => {
    await expect(page.getByText("John Doe")).toBeVisible({ timeout: 5000 });
  });

  test("shows the username with @ prefix", async ({ page }) => {
    await expect(page.getByText("@johndoe")).toBeVisible({ timeout: 5000 });
  });

  test("shows bio text", async ({ page }) => {
    await expect(page.getByText("Software developer")).toBeVisible({
      timeout: 5000,
    });
  });

  test("shows follower, following, and post stats", async ({ page }) => {
    // Follower count formatted (1200 → "1k")
    await expect(page.getByText("1k")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("340")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("47")).toBeVisible({ timeout: 5000 });
  });

  test("shows Follow button when not following", async ({ page }) => {
    const followBtn = page.getByRole("button", { name: /^follow$/i });
    await expect(followBtn).toBeVisible({ timeout: 5000 });
  });

  test("shows Message button alongside Follow", async ({ page }) => {
    const messageBtn = page.getByRole("button", { name: /message/i });
    await expect(messageBtn).toBeVisible({ timeout: 5000 });
  });

  test("shows a back navigation button", async ({ page }) => {
    // Back button is present (ArrowLeft)
    const backBtn = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await expect(backBtn).toBeVisible({ timeout: 5000 });
  });

  test("renders posts grid with media posts", async ({ page }) => {
    // Grid should render after posts load
    const grid = page.locator(".grid");
    await expect(grid).toBeVisible({ timeout: 5000 });
  });

  test("shows avatar image", async ({ page }) => {
    const avatar = page.locator("img").first();
    await expect(avatar).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Public Profile — is_following state", () => {
  test("shows 'Following' button when already following", async ({ page }) => {
    await page.route("**/v1/users/johndoe", (route) =>
      route.fulfill({
        status: 200,
        json: {
          data: { ...MOCK_PUBLIC_PROFILE.data, is_following: true },
        },
      }),
    );
    await page.route("**/v1/users/johndoe/posts**", (route) =>
      route.fulfill({ status: 200, json: MOCK_USER_POSTS }),
    );

    await page.goto("/u/johndoe");

    await expect(page.getByRole("button", { name: /following/i })).toBeVisible({
      timeout: 5000,
    });
  });
});

test.describe("Public Profile — Follow interaction", () => {
  test("clicking Follow calls POST /users/:username/follow", async ({
    page,
  }) => {
    let followCalled = false;

    await page.route("**/v1/users/johndoe", (route) =>
      route.fulfill({ status: 200, json: MOCK_PUBLIC_PROFILE }),
    );
    await page.route("**/v1/users/johndoe/posts**", (route) =>
      route.fulfill({ status: 200, json: MOCK_USER_POSTS }),
    );
    await page.route("**/v1/users/johndoe/follow", (route) => {
      if (route.request().method() === "POST") {
        followCalled = true;
        return route.fulfill({ status: 204 });
      }
      return route.continue();
    });

    await page.goto("/u/johndoe");

    const followBtn = page.getByRole("button", { name: /^follow$/i });
    await expect(followBtn).toBeVisible({ timeout: 5000 });
    await followBtn.click();

    // Give mutation time to fire
    await page.waitForTimeout(500);
    expect(followCalled).toBe(true);
  });

  test("Follow button shows spinner while mutation is pending", async ({
    page,
  }) => {
    await page.route("**/v1/users/johndoe", (route) =>
      route.fulfill({ status: 200, json: MOCK_PUBLIC_PROFILE }),
    );
    await page.route("**/v1/users/johndoe/posts**", (route) =>
      route.fulfill({ status: 200, json: MOCK_USER_POSTS }),
    );
    // Slow follow endpoint — gives us time to observe spinner
    await page.route("**/v1/users/johndoe/follow", async (route) => {
      await new Promise((r) => setTimeout(r, 1500));
      return route.fulfill({ status: 204 });
    });

    await page.goto("/u/johndoe");

    const followBtn = page.getByRole("button", { name: /^follow$/i });
    await expect(followBtn).toBeVisible({ timeout: 5000 });
    await followBtn.click();

    // Spinner SVG should appear on the button while pending
    await expect(followBtn.locator("svg.animate-spin")).toBeVisible({
      timeout: 1000,
    });
  });
});
