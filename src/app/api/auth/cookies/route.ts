import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = "refresh_token";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

// POST — set the refresh_token httpOnly cookie
export async function POST(req: Request) {
  const { refresh_token } = await req.json();

  if (!refresh_token || typeof refresh_token !== "string") {
    return NextResponse.json(
      { error: "refresh_token is required" },
      { status: 400 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, refresh_token, COOKIE_OPTIONS);
  return response;
}

// DELETE — clear the refresh_token cookie
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}

// GET — silent refresh: read cookie → call backend → return new access_token
export async function GET() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(COOKIE_NAME)?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "no_refresh_token" }, { status: 401 });
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/v1";

  let backendRes: Response;
  try {
    backendRes = await fetch(`${apiUrl}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  } catch {
    return NextResponse.json({ error: "backend_unreachable" }, { status: 502 });
  }

  if (!backendRes.ok) {
    const response = NextResponse.json(
      { error: "refresh_failed" },
      { status: 401 },
    );
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  const body = await backendRes.json();
  const data = body.data ?? body;

  const response = NextResponse.json({ access_token: data.access_token });

  // Rotate cookie if backend returns a new refresh token
  if (data.refresh_token) {
    response.cookies.set(COOKIE_NAME, data.refresh_token, COOKIE_OPTIONS);
  }

  return response;
}
