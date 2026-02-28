import { ApiError, apiClient } from "@/lib/api-client";
import type {
  CurrentUser,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  TokenPair,
} from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/v1";

// ── Error message normalizer ────────────────────────────────────────────────
// Converts raw backend / Go validator messages into plain-English copy.

function normalizeAuthError(raw: string, status: number): string {
  const msg = raw.toLowerCase();

  // Go validator field errors — e.g. "Key: '...' Error:Field validation for 'Email' failed on the 'email' tag"
  if (
    msg.includes("field validation for") &&
    msg.includes("'email'") &&
    msg.includes("'email' tag")
  ) {
    return "Please enter a valid email address.";
  }
  if (
    msg.includes("field validation for") &&
    msg.includes("'password'") &&
    msg.includes("'min'")
  ) {
    return "Password must be at least 8 characters.";
  }
  if (
    msg.includes("field validation for") &&
    msg.includes("'username'") &&
    msg.includes("'required'")
  ) {
    return "Username is required.";
  }
  if (msg.includes("field validation for")) {
    return "Please check your details and try again.";
  }

  // Semantic backend errors
  if (
    msg.includes("user not found") ||
    msg.includes("no user") ||
    status === 404
  ) {
    return "No account found with that email address.";
  }
  if (
    msg.includes("invalid password") ||
    msg.includes("wrong password") ||
    msg.includes("incorrect password")
  ) {
    return "Incorrect password. Please try again.";
  }
  if (
    msg.includes("invalid credentials") ||
    (status === 401 && !msg.includes("token"))
  ) {
    return "Email or password is incorrect.";
  }
  if (
    msg.includes("email already") ||
    msg.includes("already exists") ||
    msg.includes("already registered")
  ) {
    return "An account with this email already exists. Try logging in instead.";
  }
  if (msg.includes("username already") || msg.includes("username taken")) {
    return "That username is already taken. Please choose another.";
  }
  if (status === 429) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  if (status >= 500) {
    return "Something went wrong on our end. Please try again shortly.";
  }

  // Fall back to original if it's already readable
  return raw.length < 120 ? raw : "An error occurred. Please try again.";
}

// ── Raw fetch for auth endpoints (bypasses apiClient's 401 redirect) ────────
async function authFetch<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let code = "unknown_error";
    let message = "An error occurred. Please try again.";

    try {
      const errBody = await res.json();
      code = errBody?.error?.code ?? errBody?.code ?? code;
      const rawMsg = errBody?.error?.message ?? errBody?.message ?? message;
      message = normalizeAuthError(rawMsg, res.status);
    } catch {
      message = normalizeAuthError("", res.status);
    }

    throw new ApiError(code, message, res.status);
  }

  const json = await res.json();
  return (json.data ?? json) as T;
}

// Persist refresh token to httpOnly cookie via Next.js route handler
export async function persistRefreshCookie(
  refreshToken: string,
): Promise<void> {
  await fetch("/api/auth/cookies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
}

// Clear refresh token cookie
export async function clearRefreshCookie(): Promise<void> {
  await fetch("/api/auth/cookies", { method: "DELETE" });
}

export async function login(body: LoginRequest): Promise<TokenPair> {
  return authFetch<TokenPair>("/auth/login", body);
}

export async function register(
  body: RegisterRequest,
): Promise<RegisterResponse> {
  return authFetch<RegisterResponse>("/auth/register", body);
}

// Called by api-client internally via the cookie route handler (GET /api/auth/cookies)
// This function is the direct backend call — used only when you have the token string
export async function refresh(refreshToken: string): Promise<TokenPair> {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) throw new Error("refresh_failed");

  const body = await res.json();
  return (body.data ?? body) as TokenPair;
}

export async function logout(): Promise<void> {
  return apiClient.post<void>("/auth/logout");
}

export async function resendVerification(email: string): Promise<void> {
  return apiClient.post<void>("/auth/resend-verification", { email });
}

export async function getMe(): Promise<CurrentUser> {
  return apiClient.get<CurrentUser>("/users/me");
}
