"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as authApi from "../api";
import { useAuthStore } from "../store/auth-store";
import type { LoginRequest, RegisterRequest } from "../types";

// ── Login ────────────────────────────────────────────────────────────────────

export function useLogin() {
  const { setTokens, setCurrentUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: LoginRequest) => authApi.login(body),
    onSuccess: async (tokens) => {
      setTokens(tokens);
      await authApi.persistRefreshCookie(tokens.refresh_token);
      const user = await authApi.getMe();
      setCurrentUser(user);
      router.push("/");
    },
  });
}

// ── Register ─────────────────────────────────────────────────────────────────

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (body: RegisterRequest) => authApi.register(body),
    onSuccess: () => {
      // Redirect to onboarding; email verification is pending
      router.push("/onboarding");
    },
  });
}

// ── Logout ───────────────────────────────────────────────────────────────────

export function useLogout() {
  const { clearAuth } = useAuthStore();
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
        if (!cancelled) setCurrentUser(user);
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
