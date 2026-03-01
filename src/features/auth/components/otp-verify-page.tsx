"use client";

import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import * as authApi from "@/features/auth/api";
import { useVerifyEmailOtp } from "@/features/auth/hooks/use-auth";
import { ApiError } from "@/lib/api-client";
import { cn } from "@/lib/utils";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN = 60;

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, 1);
  const masked = "*".repeat(Math.min(local.length - 1, 4));
  return `${visible}${masked}@${domain}`;
}

export function OtpVerifyPage() {
  const router = useRouter();
  const verifyMutation = useVerifyEmailOtp();

  const [email, setEmail] = useState<string | null>(null);
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resendSent, setResendSent] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Read pendingEmail from sessionStorage on mount
  useEffect(() => {
    const pending = sessionStorage.getItem("pendingEmail");
    if (!pending) {
      router.replace("/auth");
      return;
    }
    setEmail(pending);
  }, [router]);

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleSubmit = async (code: string) => {
    if (!email) return;
    setError(null);
    try {
      await verifyMutation.mutateAsync({ email, code });
      sessionStorage.removeItem("pendingEmail");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 410) {
          setError("Code expired. Request a new one below.");
        } else {
          setError(err.message || "Invalid code. Please try again.");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
      triggerShake();
      setDigits(Array(CODE_LENGTH).fill(""));
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    // Allow paste of full code
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, "").slice(0, CODE_LENGTH);
      const next = [...Array(CODE_LENGTH).fill("")];
      for (let i = 0; i < pasted.length; i++) {
        next[i] = pasted[i];
      }
      setDigits(next);
      setError(null);
      const focusIdx = Math.min(pasted.length, CODE_LENGTH - 1);
      setTimeout(() => inputRefs.current[focusIdx]?.focus(), 0);
      if (pasted.length === CODE_LENGTH) {
        handleSubmit(pasted);
      }
      return;
    }

    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    setError(null);

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (next.every((d) => d !== "")) {
      handleSubmit(next.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        const next = [...digits];
        next[index - 1] = "";
        setDigits(next);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResend = async () => {
    if (!email || cooldown > 0) return;
    setError(null);
    setResendSent(false);
    try {
      await authApi.resendVerification(email);
      setResendSent(true);
      setCooldown(RESEND_COOLDOWN);
    } catch {
      setError("Failed to resend. Please try again.");
    }
  };

  if (!email) return null;

  const code = digits.join("");
  const isFilled = code.length === CODE_LENGTH;
  const isPending = verifyMutation.isPending;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6">
      <div className="w-full max-w-[360px] flex flex-col gap-7">
        {/* Back link */}
        <Link
          href="/auth"
          className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors self-start"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>

        {/* Heading */}
        <div>
          <h1 className="text-[30px] font-black leading-tight tracking-tight">
            Check your email
          </h1>
          <p className="text-muted-foreground mt-1.5 text-[14px]">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-foreground">
              {maskEmail(email)}
            </span>
          </p>
        </div>

        {/* OTP inputs */}
        <div
          className={cn(
            "flex gap-2 justify-between",
            shake && "animate-shake",
          )}
        >
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={CODE_LENGTH}
              value={digit}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onFocus={(e) => e.target.select()}
              disabled={isPending}
              className={cn(
                "w-full aspect-square text-center text-[20px] font-bold rounded-2xl border",
                "outline-none focus:ring-2 focus:ring-foreground transition",
                error
                  ? "border-destructive focus:ring-destructive/40 bg-destructive/5"
                  : "border-border bg-transparent focus:border-foreground/25",
                isPending && "opacity-50 cursor-not-allowed",
              )}
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="text-[13px] text-destructive -mt-4 px-1">{error}</p>
        )}

        {/* Verify button */}
        <button
          type="button"
          onClick={() => isFilled && handleSubmit(code)}
          disabled={!isFilled || isPending}
          className={cn(
            "w-full rounded-2xl py-[11px] text-[14px] font-semibold",
            "transition-all duration-150 active:scale-[0.97]",
            isFilled && !isPending
              ? "bg-foreground text-background hover:opacity-85"
              : "bg-muted text-muted-foreground cursor-not-allowed opacity-40",
          )}
        >
          {isPending ? "Verifying…" : "Verify"}
        </button>

        {/* Resend */}
        <div className="text-center text-[13px]">
          {resendSent && (
            <p className="text-muted-foreground mb-1">Code resent — check your inbox.</p>
          )}
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0}
            className={cn(
              "inline-flex items-center gap-1.5 font-semibold transition-colors",
              cooldown > 0
                ? "text-muted-foreground cursor-not-allowed"
                : "text-foreground hover:opacity-70",
            )}
          >
            <RotateCcw className="size-3.5" />
            {cooldown > 0
              ? `Resend code (${cooldown}s)`
              : "Didn't receive it? Resend code"}
          </button>
        </div>
      </div>

      {/* Shake keyframe — injected inline to avoid extra CSS file */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-6px); }
          30% { transform: translateX(6px); }
          45% { transform: translateX(-5px); }
          60% { transform: translateX(5px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }
        .animate-shake { animation: shake 0.6s ease; }
      `}</style>
    </div>
  );
}
