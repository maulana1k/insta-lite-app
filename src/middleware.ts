import { type NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = [
  "/settings",
  "/create",
  "/messages",
  "/activities",
  "/saved",
  "/following",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  const isProtected = PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  // No session → redirect to /auth with ?next= for post-login redirect
  if (isProtected && !refreshToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Already has session → redirect away from /auth
  if (pathname === "/auth" && refreshToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.delete("next");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/settings/:path*",
    "/create/:path*",
    "/messages/:path*",
    "/activities/:path*",
    "/saved/:path*",
    "/following/:path*",
    "/auth",
  ],
};
