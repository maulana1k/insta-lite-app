"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { getMe, persistRefreshCookie } from "@/features/auth/api";
import { useAuthStore } from "@/features/auth/store/auth-store";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTokens, setCurrentUser } = useAuthStore();
  const handled = useRef(false);

  useEffect(() => {
    // Guard against double-run in StrictMode
    if (handled.current) return;
    handled.current = true;

    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const next = searchParams.get("next") ?? "/";

    const finish = async () => {
      if (!accessToken || !refreshToken) {
        router.replace("/auth?error=missing_tokens");
        return;
      }

      try {
        setTokens({ access_token: accessToken, refresh_token: refreshToken });
        await persistRefreshCookie(refreshToken);
        const user = await getMe();
        setCurrentUser(user);
        router.replace(next.startsWith("/") ? next : "/");
      } catch {
        router.replace("/auth?error=callback_failed");
      }
    };

    finish();
  }, [searchParams, router, setTokens, setCurrentUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground text-sm animate-pulse">
        Signing you in…
      </p>
    </div>
  );
}
