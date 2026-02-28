import { useAuthStore } from "@/features/auth/store/auth-store";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/v1";

// ── Typed error ─────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ── Refresh lock — prevents duplicate refresh calls ──────────────────────────

let refreshPromise: Promise<string> | null = null;

async function doRefresh(): Promise<string> {
  const res = await fetch("/api/auth/cookies", { method: "GET" });

  if (!res.ok) {
    throw new ApiError(
      "refresh_failed",
      "Session expired. Please log in again.",
      401,
    );
  }

  const json = await res.json();
  return json.access_token as string;
}

// ── Core request function ────────────────────────────────────────────────────

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  isRetry = false,
): Promise<T> {
  const token = useAuthStore.getState().accessToken;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // ── 401 handling with refresh ──────────────────────────────────────────────
  if (res.status === 401 && !isRetry) {
    let errorCode: string | undefined;

    try {
      const errBody = await res.clone().json();
      errorCode = errBody?.error?.code;
    } catch {
      // ignore parse errors
    }

    if (errorCode === "token_expired") {
      try {
        // Queue concurrent requests — only one actual refresh happens
        if (!refreshPromise) {
          refreshPromise = doRefresh()
            .then((newToken) => {
              useAuthStore
                .getState()
                .setTokens({ access_token: newToken, refresh_token: "" });
              return newToken;
            })
            .catch((err) => {
              useAuthStore.getState().clearAuth();
              if (typeof window !== "undefined") window.location.href = "/auth";
              throw err;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        await refreshPromise;
        // Retry original request with new token
        return request<T>(method, path, body, true);
      } catch {
        throw new ApiError(
          "session_expired",
          "Session expired. Please log in again.",
          401,
        );
      }
    }

    // Non-refreshable 401
    useAuthStore.getState().clearAuth();
    if (typeof window !== "undefined") window.location.href = "/auth";
    throw new ApiError("unauthorized", "Unauthorized", 401);
  }

  // ── 204 No Content ────────────────────────────────────────────────────────
  if (res.status === 204) {
    return undefined as T;
  }

  // ── Error responses ───────────────────────────────────────────────────────
  if (!res.ok) {
    let code = "unknown_error";
    let message = "An unexpected error occurred.";

    try {
      const errBody = await res.json();
      code = errBody?.error?.code ?? code;
      message = errBody?.error?.message ?? message;
    } catch {
      // ignore parse errors
    }

    throw new ApiError(code, message, res.status);
  }

  // ── Unwrap { data: T } envelope ───────────────────────────────────────────
  const json = await res.json();
  return (json.data ?? json) as T;
}

// ── Public API surface ───────────────────────────────────────────────────────

export const apiClient = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
};
