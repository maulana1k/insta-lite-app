"use client";

import { ArrowRight, Heart, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useLogin, useRegister } from "@/features/auth/hooks/use-auth";
import { ApiError } from "@/lib/api-client";
import { type RecentLogin, getRecentLogins, removeRecentLogin } from "@/lib/recent-logins";
import { cn } from "@/lib/utils";

/* ─── OAuth Provider Icons ─────────────────────────────────────── */

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ─── Floating post cards (left panel decoration) ───────────────── */

const FLOATING_CARDS: {
  text: string;
  likes: string;
  name: string;
  style: React.CSSProperties;
}[] = [
    {
      text: "Golden hour at 5am in the Scottish Highlands. Worth every cold step. 🏔️",
      likes: "3.2k",
      name: "jackharding",
      style: { top: "6%", left: "7%", transform: "rotate(-5deg)" },
    },
    {
      text: "Hot take: the best travel photos are taken at 6am when the world is yours alone.",
      likes: "1.8k",
      name: "jackharding",
      style: { top: "8%", right: "6%", transform: "rotate(5deg)" },
    },
    {
      text: "Gear doesn't make the photo. Stop waiting for the perfect camera. Go outside.",
      likes: "4.4k",
      name: "jackharding",
      style: { top: "22%", left: "34%", transform: "rotate(-2deg)" },
    },
    {
      text: "Keep shooting. Your follower count doesn't determine the quality of your work.",
      likes: "5.5k",
      name: "jackharding",
      style: { top: "30%", left: "5%", transform: "rotate(3deg)" },
    },
    {
      text: "Croatia — June 2024. The Adriatic never gets old.",
      likes: "5.6k",
      name: "jackharding",
      style: { top: "28%", right: "5%", transform: "rotate(-4deg)" },
    },
    {
      text: "Some observations from 3 weeks in Indonesia: get off the tourist trail by day 3.",
      likes: "2.9k",
      name: "jackharding",
      style: { top: "46%", left: "8%", transform: "rotate(-3deg)" },
    },
    {
      text: "Madeira from above. Drone nearly didn't make it back 😅",
      likes: "6.9k",
      name: "jackharding",
      style: { top: "44%", right: "7%", transform: "rotate(4deg)" },
    },
  ];

function FloatingCard({
  text,
  likes,
  name,
  style,
}: {
  text: string;
  likes: string;
  name: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute w-48 rounded-2xl border border-white/[0.07] bg-white/[0.05] p-3.5 shadow-2xl pointer-events-none backdrop-blur-[2px]"
      style={style}
    >
      <p className="text-white/65 text-[11.5px] leading-relaxed line-clamp-3">
        {text}
      </p>
      <div className="flex items-center justify-between mt-2.5">
        <span className="text-white/30 text-[10px]">@{name}</span>
        <span className="flex items-center gap-1 text-white/30 text-[10px]">
          <Heart className="size-2.5" />
          {likes}
        </span>
      </div>
    </div>
  );
}

/* ─── Avatar initials helper ─────────────────────────────────────── */

function AvatarFallback({ displayName }: { displayName: string }) {
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="size-10 rounded-full bg-muted flex items-center justify-center text-[13px] font-semibold text-muted-foreground shrink-0">
      {initials || "?"}
    </div>
  );
}

/* ─── Recent login card ──────────────────────────────────────────── */

function RecentLoginCard({
  login,
  onSelect,
  onRemove,
}: {
  login: RecentLogin;
  onSelect: (login: RecentLogin) => void;
  onRemove: (username: string) => void;
}) {
  return (
    <div className="relative group">
      <button
        type="button"
        onClick={() => onSelect(login)}
        className="w-full flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 hover:bg-muted/60 active:scale-[0.98] transition-all duration-150 text-left"
      >
        {login.avatar_url ? (
          <img
            src={login.avatar_url}
            alt={login.display_name}
            className="size-10 rounded-full object-cover shrink-0"
          />
        ) : (
          <AvatarFallback displayName={login.display_name || login.username} />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold truncate">
            {login.display_name || login.username}
          </p>
          <p className="text-[12px] text-muted-foreground truncate">
            @{login.username}
          </p>
        </div>
      </button>
      <button
        type="button"
        onClick={() => onRemove(login.username)}
        aria-label={`Remove ${login.username} from recent logins`}
        className="absolute right-3 top-1/2 -translate-y-1/2 size-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-muted transition-all duration-150"
      >
        <X className="size-3.5 text-muted-foreground" />
      </button>
    </div>
  );
}

/* ─── Divider ────────────────────────────────────────────────────── */

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-border/60" />
      <span className="text-[12px] text-muted-foreground/50 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-px bg-border/60" />
    </div>
  );
}

/* ─── Input field ────────────────────────────────────────────────── */

const AuthInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function AuthInput(props, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-[14px]",
        "placeholder:text-muted-foreground/40",
        "outline-none focus:ring-2 focus:ring-foreground focus:border-foreground/25",
        "transition",
        props.className,
      )}
    />
  );
});

/* ─── Main component ────────────────────────────────────────────── */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/v1";

export function AuthPage() {
  const [mode, setMode] = useState<"signup" | "login">("signup");

  // Form fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Recent logins (login mode only)
  const [recentLogins, setRecentLogins] = useState<RecentLogin[]>([]);
  const [selectedRecent, setSelectedRecent] = useState<RecentLogin | null>(null);

  const passwordRef = useRef<HTMLInputElement>(null);

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const isSignup = mode === "signup";
  const isPending = loginMutation.isPending || registerMutation.isPending;

  // Load recent logins from localStorage on mount (client only)
  useEffect(() => {
    setRecentLogins(getRecentLogins());
  }, []);

  const handleSelectRecent = (login: RecentLogin) => {
    setSelectedRecent(login);
    setEmail(login.email);
    setPassword("");
    setTimeout(() => passwordRef.current?.focus(), 50);
  };

  const handleRemoveRecent = (username: string) => {
    removeRecentLogin(username);
    setRecentLogins((prev) => prev.filter((l) => l.username !== username));
    if (selectedRecent?.username === username) {
      setSelectedRecent(null);
      setEmail("");
    }
  };

  const handleContinue = async () => {
    if (!email.trim() || !password.trim()) return;
    if (isSignup && !username.trim()) return;
    setError(null);

    try {
      if (isSignup) {
        await registerMutation.mutateAsync({
          email: email.trim(),
          password,
          username: username.trim(),
        });
      } else {
        await loginMutation.mutateAsync({ email: email.trim(), password });
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleGoogleClick = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleModeSwitch = () => {
    setMode(isSignup ? "login" : "signup");
    setError(null);
    setEmail("");
    setUsername("");
    setPassword("");
    setSelectedRecent(null);
  };

  const canSubmit =
    email.trim() &&
    password.trim() &&
    (isSignup ? username.trim() : true) &&
    !isPending;

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* ══════════════ LEFT PANEL ══════════════ */}
      <div
        className="hidden lg:flex w-[52%] xl:w-[55%] relative overflow-hidden flex-col shrink-0"
        style={{ background: "#0d0d0f" }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Floating post cards */}
        {FLOATING_CARDS.map((card) => (
          <FloatingCard key={card.text} {...card} />
        ))}

        {/* Bottom gradient — clears space for the manifesto text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 30%, #0d0d0f 68%)",
          }}
        />

        {/* Manifesto text */}
        <div className="absolute bottom-12 left-10 right-10 z-10">
          <span className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-white/30 mb-5">
            Jends!
          </span>
          <h2 className="font-black text-[50px] xl:text-[58px] leading-[1.02] tracking-tighter text-white">
            Where your
            <br />
            <span className="text-white/20">voice finds</span>
            <br />
            its people.
          </h2>
          <p className="mt-5 text-white/35 text-[13.5px] leading-relaxed max-w-xs">
            Join creators, thinkers, and doers — sharing what actually matters.
          </p>
        </div>
      </div>

      {/* Vertical divider */}
      <div className="hidden lg:block w-px bg-border/25 shrink-0" />

      {/* ══════════════ RIGHT PANEL ══════════════ */}
      <div
        className="flex-1 flex flex-col min-h-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.55 0 0 / 0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        {/* Top bar */}
        <header className="flex items-center justify-between px-8 py-5">
          <Link
            href="/"
            className="text-lg font-bold tracking-tighter select-none lg:invisible"
          >
            Jends!
          </Link>

          <p className="text-sm text-muted-foreground ml-auto">
            {isSignup ? "Already a member?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={handleModeSwitch}
              className="font-semibold text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              {isSignup ? "Log in" : "Sign up"}
            </button>
          </p>
        </header>

        {/* Form */}
        <main className="flex-1 flex flex-col items-center justify-center px-8 py-10">
          <div className="w-full max-w-[360px] flex flex-col gap-6">
            {/* Heading */}
            <div>
              <h1 className="text-[36px] font-black leading-tight tracking-tight">
                {isSignup ? "Create your account" : "Sign in to continue"}
              </h1>
              <p className="text-muted-foreground mt-1 text-[14px]">
                {isSignup ? "You belong here." : "Good to see you again."}
              </p>
            </div>

            {/* Google (social first) */}
            <button
              type="button"
              onClick={handleGoogleClick}
              className="w-full flex items-center gap-3.5 bg-white text-black font-semibold rounded-2xl py-[11px] px-5 hover:bg-gray-50 active:scale-[0.98] transition-all duration-150"
            >
              <span className="size-[18px] shrink-0">
                <GoogleIcon />
              </span>
              <span className="flex-1 text-center text-[14px]">
                Continue with Google
              </span>
            </button>

            {/* Recent accounts (login mode only) */}
            {!isSignup && recentLogins.length > 0 && (
              <>
                <Divider label="or continue as" />
                <div className="flex flex-col gap-2">
                  {recentLogins.map((login) => (
                    <RecentLoginCard
                      key={login.username}
                      login={login}
                      onSelect={handleSelectRecent}
                      onRemove={handleRemoveRecent}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Email form divider */}
            <Divider label={isSignup ? "or sign up with email" : "or use email"} />

            {/* Selected recent hint */}
            {selectedRecent && (
              <p className="text-[13px] text-muted-foreground -mb-2">
                Signing in as{" "}
                <span className="font-semibold text-foreground">
                  @{selectedRecent.username}
                </span>
              </p>
            )}

            {/* Email + (username for signup) + password */}
            <div className="flex flex-col gap-3">
              <AuthInput
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                  if (selectedRecent && e.target.value !== selectedRecent.email) {
                    setSelectedRecent(null);
                  }
                }}
                placeholder="yourname@email.com"
              />

              {isSignup && (
                <AuthInput
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(
                      e.target.value
                        .replace(/[^a-z0-9_.]/gi, "")
                        .replace(/\.{2,}/g, ".")
                        .replace(/^\./, "")
                        .toLowerCase()
                    );
                    setError(null);
                  }}
                  placeholder="username"
                  autoComplete="username"
                />
              )}

              <AuthInput
                ref={passwordRef}
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                placeholder="Password"
              />

              {error && (
                <p className="text-[13px] text-destructive px-1">{error}</p>
              )}

              <button
                type="button"
                onClick={handleContinue}
                disabled={!canSubmit}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-2xl py-[11px] text-[14px] font-semibold",
                  "transition-all duration-150 active:scale-[0.97]",
                  canSubmit
                    ? "bg-foreground text-background hover:opacity-85"
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-40",
                )}
              >
                {isPending ? "Please wait…" : isSignup ? "Create account" : "Continue"}
                {!isPending && canSubmit && <ArrowRight className="size-4" />}
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="pb-7 px-8">
          <p className="text-[11.5px] text-muted-foreground/50 text-center leading-relaxed max-w-xs mx-auto">
            By {isSignup ? "signing up" : "logging in"}, you agree to our{" "}
            <Link
              href="#"
              className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            .{isSignup && " You also admit that you are beautiful."}
          </p>
        </footer>
      </div>
    </div>
  );
}
