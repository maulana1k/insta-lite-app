"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as authApi from "../api";
import * as usersApi from "@/features/users/api";
import { useAuthStore } from "../store/auth-store";
import { getRecentLogins, removeRecentLogin, saveRecentLogin } from "@/lib/recent-logins";
import type { CurrentUser, LoginRequest, OtpVerifyRequest, RegisterRequest } from "../types";

// Normalise a raw API user so avatar_url is always a string, never null.
function normalizeUser(raw: Omit<CurrentUser, "avatar_url"> & { avatar_url: string | null }): CurrentUser {
  return { ...raw, avatar_url: raw.avatar_url ?? "" };
}

// Key used to carry onboarding form data across the register → login gap.
const PENDING_PROFILE_KEY = "pendingProfile";

async function applyPendingProfile(): Promise<void> {
  const raw = sessionStorage.getItem(PENDING_PROFILE_KEY);
  if (!raw) return;
  sessionStorage.removeItem(PENDING_PROFILE_KEY);
  try {
    await usersApi.updateMe(JSON.parse(raw));
  } catch {
    // Non-fatal — user can update later via Settings
  }
}

// ── Login ────────────────────────────────────────────────────────────────────

export function useLogin() {
  const { setTokens, setCurrentUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: LoginRequest) => authApi.login(body),
    onSuccess: async (tokens, variables) => {
      setTokens(tokens);
      await authApi.persistRefreshCookie(tokens.refresh_token);
      const user = await authApi.getMe();
      setCurrentUser(normalizeUser(user));
      await applyPendingProfile();
      saveRecentLogin({
        username: user.username,
        display_name: user.display_name,
        avatar_url: user.avatar_url ?? "",
        email: variables.email,
      });
      router.push("/");
    },
  });
}

// ── Register ─────────────────────────────────────────────────────────────────

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (body: RegisterRequest) => authApi.register(body),
    onSuccess: (_, variables) => {
      sessionStorage.setItem("pendingEmail", variables.email);
      router.push("/auth/verify");
    },
  });
}

// ── Verify Email OTP ──────────────────────────────────────────────────────────

export function useVerifyEmailOtp() {
  const { setTokens, setCurrentUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: OtpVerifyRequest) => authApi.verifyEmailOtp(body),
    onSuccess: async (tokens) => {
      setTokens(tokens);
      await authApi.persistRefreshCookie(tokens.refresh_token);
      const user = await authApi.getMe();
      setCurrentUser(normalizeUser(user));
      await applyPendingProfile();
      router.push("/onboarding");
    },
  });
}

// ── Logout ───────────────────────────────────────────────────────────────────

export function useLogout() {
  const { clearAuth, currentUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      // Best-effort server logout — don't block on failure
      try {
        await authApi.logout();
      } catch {
        // ignore
      }
    },
    onSettled: async () => {
      if (currentUser) {
        removeRecentLogin(currentUser.username);
      }
      clearAuth();
      await authApi.clearRefreshCookie();
      router.push("/auth");
    },
  });
}

// ── Session initializer (call once on app mount) ──────────────────────────────

export function useInitializeAuth() {
  const { setTokens, setCurrentUser, clearAuth, setInitialized } =
    useAuthStore();

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        // GET /api/auth/cookies reads httpOnly cookie → proxies to backend → returns access_token
        const res = await fetch("/api/auth/cookies", { method: "GET" });

        if (!res.ok) {
          throw new Error("no_session");
        }

        const { access_token } = await res.json();
        if (!access_token || cancelled) return;

        setTokens({ access_token });

        const user = await authApi.getMe();
        if (!cancelled) {
          setCurrentUser(normalizeUser(user));
          await applyPendingProfile();
        }
      } catch {
        if (!cancelled) clearAuth();
      } finally {
        if (!cancelled) setInitialized();
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [setTokens, setCurrentUser, clearAuth, setInitialized]);
}
