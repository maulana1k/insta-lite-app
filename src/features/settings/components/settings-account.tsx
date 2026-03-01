"use client";

import { CloudUpload, Pen, UserCheck } from "@solar-icons/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  AtSign,
  Check,
  CheckCircle2,
  Globe,
  KeyRound,
  Lock,
  Loader2,
  MoreHorizontal,
  Plus,
  ShieldCheck,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useMyProfile, useUpdateProfile, useUploadAvatar } from "@/features/users/hooks/use-users";
import { ApiError } from "@/lib/api-client";
import { useSettingsStore } from "../store/settings-store";
import { Toggle } from "./settings-ui";

// Section header with optional action
function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <h2 className="text-[20px] font-bold leading-tight">{title}</h2>
        {subtitle && (
          <p className="text-[14px] text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

// Security row inside the card
function SecurityRow({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-3.5 px-4">
      <div className="text-muted-foreground shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold">{title}</p>
        <p className="text-[12px] text-muted-foreground leading-snug">
          {description}
        </p>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}

export function SettingsAccount() {
  const { currentUser } = useAuthStore();
  const { profile } = useSettingsStore();
  const { data: myProfile } = useMyProfile();
  const {
    mutate: saveProfile,
    isPending: isSaving,
    isSuccess: isSaved,
    error: saveError,
  } = useUpdateProfile();
  const {
    mutate: uploadAvatar,
    isPending: isUploadingAvatar,
  } = useUploadAvatar();

  // Seed from currentUser on first mount (fast — already in store after login)
  const [nameForm, setNameForm] = useState({
    displayName: currentUser?.display_name ?? profile.displayName.trim(),
  });
  const [username, setUsername] = useState(
    currentUser?.username ?? profile.username,
  );
  // bio and website_url are not in CurrentUser — seed from API once loaded
  const [bio, setBio] = useState(profile.bio);
  const [website, setWebsite] = useState(profile.website);
  // Local avatar preview (before upload completes)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync bio / website when full profile arrives from the API
  useEffect(() => {
    if (myProfile) {
      setBio(myProfile.bio ?? "");
      setWebsite(myProfile.website_url ?? "");
    }
  }, [myProfile]);

  // Seed display name from API (in case currentUser store is stale)
  useEffect(() => {
    if (myProfile) {
      setNameForm({ displayName: myProfile.display_name });
      setUsername(myProfile.username);
    }
  }, [myProfile]);

  const [phone, setPhone] = useState("+62 812 3456 7890");
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [twoFactor, setTwoFactor] = useState(false);

  const passwordValid =
    passwords.current.length > 0 &&
    passwords.new.length >= 8 &&
    passwords.new === passwords.confirm;

  const saveErrorMessage =
    saveError instanceof ApiError ? saveError.message : null;

  // Detect if any profile field differs from what came from the API
  const savedDisplayName = myProfile?.display_name ?? currentUser?.display_name ?? "";
  const savedBio = myProfile?.bio ?? "";
  const savedWebsite = myProfile?.website_url ?? "";
  const hasChanges =
    nameForm.displayName.trim() !== savedDisplayName ||
    bio !== savedBio ||
    website !== savedWebsite;

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Show local preview immediately
    setAvatarPreview(URL.createObjectURL(file));
    // Upload in background
    uploadAvatar(file, {
      onError: () => setAvatarPreview(null),
    });
  }

  function handleSaveProfile() {
    saveProfile({
      display_name: nameForm.displayName.trim() || undefined,
      bio: bio || undefined,
      website_url: website || undefined,
    });
  }

  return (
    <div className="space-y-12">
      {/* ── Your Profile ─────────────────────────────── */}
      <section>
        <SectionHeader title="Profil Anda" />

        {/* Two-column: form left, avatar right */}
        <div className="flex gap-8 items-start">
          <div className="flex-1 min-w-0 space-y-5">
            {/* Name row */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-muted-foreground">
                Nama Depan
              </label>
              <input
                type="text"
                value={nameForm.displayName}
                onChange={(e) =>
                  setNameForm({ ...nameForm, displayName: e.target.value })
                }
                className={cn(
                  "w-full rounded-xl mt-2 border border-border bg-transparent px-3 py-2.5 text-[14px]",
                  "placeholder:text-muted-foreground/40",
                  "outline-none",
                  "transition",
                )}
              />
            </div>

            {/* Username */}
            <div className="space-y-1">
              <label className="text-[13px] font-semibold text-muted-foreground">
                Username
              </label>
              <div className="flex items-center mt-2 rounded-xl border border-border overflow-hidden h-10 bg-background">
                <span className="px-3 text-[13px] text-muted-foreground bg-muted/50 h-full flex items-center border-r border-border shrink-0">
                  <AtSign className="size-4" />
                </span>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={cn(
                    "w-full bg-transparent px-3 py-2.5 text-[14px]",
                    "placeholder:text-muted-foreground/40",
                    "transition",
                  )}
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <label className="text-[13px] font-semibold text-muted-foreground">
                Bio
              </label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Ceritakan sedikit tentang latar belakang dan minat Anda."
                rows={3}
                className="resize-none text-[14px] mt-2 rounded-xl dark:bg-transparent border border-border px-3 py-2.5 outline-none"
              />
              <p className="text-[11px] text-muted-foreground text-right">
                {bio.length}/160
              </p>
            </div>

            {/* Website */}
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-muted-foreground">
                Website
              </label>
              <div className="flex mt-2 items-center rounded-xl border border-border overflow-hidden h-10 bg-background">
                <span className="px-2.5 text-muted-foreground shrink-0">
                  <Globe className="size-4" />
                </span>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://website.com"
                  className={cn(
                    "w-full bg-transparent px-3 py-2.5 text-[14px]",
                    "placeholder:text-muted-foreground/40",
                    "transition",
                  )}
                />
              </div>
            </div>
          </div>
          {/* Avatar */}
          <div className="shrink-0 flex flex-col items-start gap-2 pt-5">
            <label className="relative cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleAvatarChange}
              />
              <Avatar className="size-40">
                <AvatarImage
                  src={avatarPreview ?? currentUser?.avatar_url ?? undefined}
                  alt={currentUser?.display_name ?? ""}
                />
                <AvatarFallback className="text-2xl font-semibold">
                  {(currentUser?.display_name ?? "?").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isUploadingAvatar ? (
                <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                  <Loader2 className="size-6 text-white animate-spin" />
                </div>
              ) : (
                <div className="absolute bottom-1 right-1 size-9 rounded-full bg-foreground outline-3 outline-background flex items-center justify-center">
                  <Pen weight="Bold" className="size-4 text-background" />
                </div>
              )}
            </label>
          </div>
        </div>

        {saveErrorMessage && (
          <p className="mt-2 text-sm text-red-500">{saveErrorMessage}</p>
        )}

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={handleSaveProfile}
            disabled={isSaving || !hasChanges}
            className="flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 active:scale-95 transition-all self-start disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isSaving ? (
              <Loader2 className="size-5 mr-2 animate-spin" />
            ) : (
              <CloudUpload className="size-5 mr-2" />
            )}
            Save Changes
          </button>

          {isSaved && !isSaving && (
            <span className="flex items-center gap-1.5 text-[13px] text-emerald-500 font-medium">
              <CheckCircle2 className="size-4" />
              Saved
            </span>
          )}
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── Emails ───────────────────────────────────── */}
      <section>
        <SectionHeader
          title="Email"
          subtitle="Tambahkan email tambahan untuk menerima notifikasi di alamat tersebut."
          action={
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 shrink-0 rounded-xl px-3 py-4 border-foreground/20"
            >
              <Plus className="size-3.5" />
              Tambah Email
            </Button>
          }
        />
        <div className="rounded-2xl border border-border bg-muted/20 px-4 py-3.5 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[14px] font-medium">
                jack.harding@example.com
              </span>
              <Badge variant="secondary" className="text-[11px] px-1.5 py-0">
                Utama
              </Badge>
            </div>
            <p className="text-[12px] text-muted-foreground">
              Email ini akan dibagikan kepada pengguna lain saat Anda
              berinteraksi.
            </p>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors mt-0.5">
            <MoreHorizontal className="size-5" />
          </button>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── Phone Number ─────────────────────────────── */}
      <section>
        <SectionHeader
          title="Nomor Telepon"
          subtitle="Kelola nomor telepon yang Anda gunakan untuk masuk dan menerima pembaruan."
          action={
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 shrink-0 rounded-xl px-3 py-4 border-foreground/20"
            >
              Update
            </Button>
          }
        />
        <div className="space-y-1.5">
          <label className="text-[13px] font-medium">Nomor Telepon</label>
          <div className="flex gap-2">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="+62 812 xxxx xxxx"
              className="flex-1 mt-2 rounded-xl"
            />
          </div>
          <p className="text-[12px] text-muted-foreground">
            Demi keamanan Anda, kami akan mengirimkan kode untuk memverifikasi
            perubahan nomor telepon.
          </p>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── Password & Security ──────────────────────── */}
      <section>
        <SectionHeader
          title="Password & Keamanan"
          subtitle="Amankan akun Anda dengan password dan autentikasi dua faktor."
        />

        <div className="rounded-2xl border border-border divide-y divide-border overflow-hidden">
          {/* Account Password */}
          <SecurityRow
            icon={<Lock className="size-[18px]" />}
            title="Password Akun"
            description="Ubah password yang Anda gunakan untuk masuk ke akun."
            action={
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl px-3 py-4 border-foreground/20"
                  >
                    Ubah Password
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Ubah Password</AlertDialogTitle>
                    <AlertDialogDescription>
                      Masukkan password lama dan password baru Anda.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="space-y-2.5 py-2">
                    <Input
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({ ...passwords, current: e.target.value })
                      }
                      type="password"
                      placeholder="Password saat ini"
                    />
                    <Input
                      value={passwords.new}
                      onChange={(e) =>
                        setPasswords({ ...passwords, new: e.target.value })
                      }
                      type="password"
                      placeholder="Password baru (min. 8 karakter)"
                    />
                    <Input
                      value={passwords.confirm}
                      onChange={(e) =>
                        setPasswords({ ...passwords, confirm: e.target.value })
                      }
                      type="password"
                      placeholder="Konfirmasi password baru"
                    />
                    {passwords.new &&
                      passwords.confirm &&
                      passwords.new !== passwords.confirm && (
                        <p className="text-[12px] text-red-500">
                          Password tidak cocok
                        </p>
                      )}
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() =>
                        setPasswords({ current: "", new: "", confirm: "" })
                      }
                    >
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction disabled={!passwordValid}>
                      Simpan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            }
          />

          {/* 2FA */}
          <SecurityRow
            icon={<ShieldCheck className="size-[18px]" />}
            title="Autentikasi Dua Faktor"
            description="Tambahkan lapisan keamanan ekstra ke akun Anda."
            action={
              <Toggle
                on={twoFactor}
                onToggle={() => setTwoFactor(!twoFactor)}
              />
            }
          />

          {/* Passkeys */}
          <SecurityRow
            icon={<KeyRound className="size-[18px]" />}
            title="Passkeys"
            description="Passkeys adalah cara masuk yang aman dan mudah tanpa password."
            action={
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl px-3 py-4 gap-1 border-foreground/20"
              >
                <Plus className="size-3.5" />
                Tambah Passkey
              </Button>
            }
          />
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── Danger Zone ──────────────────────────────── */}
      <section>
        <SectionHeader
          title="Akun"
          subtitle="Menonaktifkan akun menyembunyikan profil Anda sementara. Menghapus akun bersifat permanen."
        />
        <div className="rounded-2xl border border-border divide-y divide-border overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-muted/30 dark:hover:bg-white/[0.03] transition-colors text-left"
            onClick={() => {}}
          >
            <span className="text-[14px] text-amber-500 font-medium">
              Nonaktifkan Akun
            </span>
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-full flex items-center px-4 py-3.5 hover:bg-muted/30 dark:hover:bg-white/[0.03] transition-colors text-left">
                <span className="text-[14px] text-red-500 font-medium">
                  Hapus Akun
                </span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus akun Anda?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini tidak dapat dibatalkan. Semua postingan,
                  pengikut, pesan, dan data Anda akan dihapus secara permanen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                  Ya, Hapus Akun
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
    </div>
  );
}
