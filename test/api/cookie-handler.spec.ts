import { expect, test } from "@playwright/test";

// All fetch calls run inside the browser context via page.evaluate
// so cookies are scoped to the test browser session.

test.describe("POST /api/auth/cookies — set refresh token", () => {
  test("returns 200 and sets httpOnly cookie", async ({ page }) => {
    await page.goto("/");

    const status = await page.evaluate(async () => {
      const res = await fetch("/api/auth/cookies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: "test-token-abc123" }),
      });
      return res.status;
    });

    expect(status).toBe(200);

    // Cookie is httpOnly — JS cannot read it (document.cookie must not contain it)
    const visibleCookies = await page.evaluate(() => document.cookie);
    expect(visibleCookies).not.toContain("refresh_token");
  });

  test("returns 400 for missing refresh_token body", async ({ page }) => {
    await page.goto("/");

    const status = await page.evaluate(async () => {
      const res = await fetch("/api/auth/cookies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      return res.status;
    });

    expect(status).toBe(400);
  });

  test("returns 400 for non-string refresh_token", async ({ page }) => {
    await page.goto("/");

    const status = await page.evaluate(async () => {
      const res = await fetch("/api/auth/cookies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: 12345 }),
      });
      return res.status;
    });

    expect(status).toBe(400);
  });
});

test.describe("DELETE /api/auth/cookies — clear refresh token", () => {
  test("returns 200 when clearing an existing cookie", async ({ page }) => {
    await page.goto("/");

    // Set a cookie first
    await page.evaluate(async () => {
      await fetch("/api/auth/cookies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: "token-to-delete" }),
      });
    });

    const status = await page.evaluate(async () => {
      const res = await fetch("/api/auth/cookies", { method: "DELETE" });
      return res.status;
    });

    expect(status).toBe(200);
  });

  test("returns 200 even when no cookie is set (idempotent)", async ({
    page,
  }) => {
    await page.goto("/");

    const status = await page.evaluate(async () => {
      const res = await fetch("/api/auth/cookies", { method: "DELETE" });
      return res.status;
    });

    expect(status).toBe(200);
  });
});

test.describe("GET /api/auth/cookies — silent refresh", () => {
  test("returns 401 when no refresh_token cookie is present", async ({
    page,
  }) => {
    await page.goto("/");

    const status = await page.evaluate(async () => {
      const res = await fetch("/api/auth/cookies", { method: "GET" });
      return res.status;
    });

    expect(status).toBe(401);
  });

  test("returns 401 or 502 after setting a fake (invalid) token", async ({
    page,
  }) => {
    await page.goto("/");

    // Set an invalid token
    await page.evaluate(async () => {
      await fetch("/api/auth/cookies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: "totally-invalid-token" }),
      });
    });

    const status = await page.evaluate(async () => {
      const res = await fetch("/api/auth/cookies", { method: "GET" });
      return res.status;
    });

    // 401 = backend rejected the token; 502 = backend unreachable
    expect([401, 502]).toContain(status);
  });

  test("clears the cookie when refresh fails (stale cookie cleanup)", async ({
    page,
    context,
  }) => {
    await page.goto("/");

    // Set a bad token
    await page.evaluate(async () => {
      await fetch("/api/auth/cookies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: "stale-invalid-token" }),
      });
    });

    // Attempt refresh — should fail and clear the cookie
    await page.evaluate(async () => {
      await fetch("/api/auth/cookies", { method: "GET" });
    });

    // After failed refresh, a subsequent GET should still return 401
    const secondStatus = await page.evaluate(async () => {
      const res = await fetch("/api/auth/cookies", { method: "GET" });
      return res.status;
    });

    expect(secondStatus).toBe(401);
  });
});
