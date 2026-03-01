"use client";

import { ArrowRight, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useUpdateProfile } from "@/features/users/hooks/use-users";
import { cn } from "@/lib/utils";

const PENDING_PROFILE_KEY = "pendingProfile";

const inputClass = cn(
  "w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-[14px]",
  "placeholder:text-muted-foreground/40 outline-none",
  "focus:ring-2 focus:ring-foreground/15 focus:border-foreground/25 transition",
);

export function OnboardingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [form, setForm] = useState({ displayName: "", bio: "" });

  const { currentUser } = useAuthStore();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const canContinue = form.displayName.trim().length > 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  function handleGetStarted() {
    if (!canContinue) return;

    const payload = {
      display_name: form.displayName.trim(),
      bio: form.bio.trim() || undefined,
    };

    if (currentUser) {
      // Already authenticated (e.g. logged in via OAuth or returning user) — save now.
      updateProfile(payload, { onSettled: () => router.push("/") });
    } else {
      // No session yet (email-registration flow — user hasn't verified + logged in).
      // Persist the data so use-auth picks it up after the next successful login.
      sessionStorage.setItem(PENDING_PROFILE_KEY, JSON.stringify(payload));
      router.push("/");
    }
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 py-16"
      style={{
        backgroundImage:
          "radial-gradient(circle, oklch(0.55 0 0 / 0.12) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="w-full max-w-[420px] flex flex-col gap-7">
        {/* Label */}
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/50">
          Step 2 of 2 · Profile setup
        </span>

        {/* Heading */}
        <div>
          <h1 className="text-[36px] font-black leading-tight tracking-tight">
            Make it yours.
          </h1>
          <p className="text-muted-foreground mt-1 text-[14px]">
            Tell people a little about yourself.
          </p>
        </div>

        {/* Avatar picker */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative group size-20 rounded-full shrink-0 bg-muted border border-border/60 overflow-hidden flex items-center justify-center"
          >
            {avatar ? (
              <img src={avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <Camera className="size-6 text-muted-foreground/40" />
            )}
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="size-5 text-white" />
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div>
            <p className="text-[13px] font-medium">Profile photo</p>
            <p className="text-[12px] text-muted-foreground/60 mt-0.5">
              Click to upload · Optional
            </p>
          </div>
        </div>

        {/* Display name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Display name <span className="text-foreground/40">*</span>
          </label>
          <input
            type="text"
            value={form.displayName}
            onChange={(e) =>
              setForm({ ...form, displayName: e.target.value })
            }
            placeholder="Jane Doe"
            className={inputClass}
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Bio{" "}
            <span className="normal-case font-normal text-muted-foreground/50">
              · Optional
            </span>
          </label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="Tell people what you're about…"
            rows={3}
            className={cn(inputClass, "resize-none")}
          />
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleGetStarted}
          disabled={!canContinue || isPending}
          className={cn(
            "w-full flex items-center justify-center gap-2 rounded-2xl py-[13px] text-[14px] font-semibold",
            "transition-all duration-150 active:scale-[0.97]",
            canContinue && !isPending
              ? "bg-foreground text-background hover:opacity-85"
              : "bg-muted text-muted-foreground cursor-not-allowed opacity-40",
          )}
        >
          {isPending ? "Saving…" : "Get started"}
          {canContinue && !isPending && <ArrowRight className="size-4" />}
        </button>

        <p className="text-center text-[12px] text-muted-foreground/40">
          You can change these anytime in Settings.
        </p>
      </div>
    </div>
  );
}
