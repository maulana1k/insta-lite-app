"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { BLOCKED_USERS, MUTED_USERS } from "../api/mock-data";
import { useSettingsStore } from "../store/settings-store";
import { EditRow, SettingsGroup, SettingsRow, Toggle } from "./settings-ui";

const WHO_CAN_MESSAGE_OPTIONS = [
  { value: "everyone", label: "Semua Orang" },
  { value: "followers", label: "Hanya Pengikut" },
  { value: "nobody", label: "Tidak Ada" },
] as const;

const WHO_CAN_TAG_OPTIONS = [
  { value: "everyone", label: "Semua Orang" },
  { value: "followers", label: "Hanya Pengikut" },
  { value: "nobody", label: "Tidak Ada" },
] as const;

export function SettingsPrivacy() {
  const { privacy, updatePrivacy } = useSettingsStore();
  const [blockedUsers, setBlockedUsers] = useState(BLOCKED_USERS);
  const [mutedUsers, setMutedUsers] = useState(MUTED_USERS);
  const [whoCanTag, setWhoCanTag] = useState<
    "everyone" | "followers" | "nobody"
  >("everyone");

  return (
    <div className="space-y-8">
      <SettingsGroup
        header="Visibilitas"
        footer="Saat akun privat, hanya pengikut yang disetujui yang bisa melihat postingan Anda."
      >
        <SettingsRow label="Akun Privat">
          <Toggle
            on={privacy.privateAccount}
            onToggle={() =>
              updatePrivacy({ privateAccount: !privacy.privateAccount })
            }
          />
        </SettingsRow>
        <SettingsRow label="Tampilkan Status Aktif">
          <Toggle on={true} onToggle={() => {}} />
        </SettingsRow>
      </SettingsGroup>

      <div className="space-y-2">
        <h3 className="text-[17px] font-bold">Interaksi</h3>

        {/* Who can message */}
        <div className="space-y-1.5">
          <p className="text-[13px] text-muted-foreground px-0.5">
            Siapa yang Bisa Mengirim Pesan
          </p>
          <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
            {WHO_CAN_MESSAGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updatePrivacy({ whoCanMessage: opt.value })}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-muted/30 dark:hover:bg-white/[0.03] transition-colors text-left"
              >
                <span className="text-[15px]">{opt.label}</span>
                <span
                  className={cn(
                    "size-4 rounded-full border-2 transition-all flex items-center justify-center shrink-0",
                    privacy.whoCanMessage === opt.value
                      ? "border-foreground bg-foreground"
                      : "border-border",
                  )}
                >
                  {privacy.whoCanMessage === opt.value && (
                    <span className="size-1.5 rounded-full bg-background block" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Who can tag */}
        <div className="space-y-1.5 pt-2">
          <p className="text-[13px] text-muted-foreground px-0.5">
            Siapa yang Bisa Menandai Anda
          </p>
          <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
            {WHO_CAN_TAG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setWhoCanTag(opt.value)}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-muted/30 dark:hover:bg-white/[0.03] transition-colors text-left"
              >
                <span className="text-[15px]">{opt.label}</span>
                <span
                  className={cn(
                    "size-4 rounded-full border-2 transition-all flex items-center justify-center shrink-0",
                    whoCanTag === opt.value
                      ? "border-foreground bg-foreground"
                      : "border-border",
                  )}
                >
                  {whoCanTag === opt.value && (
                    <span className="size-1.5 rounded-full bg-background block" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <SettingsGroup header="Orang">
        <EditRow label="Akun Diblokir" value={`${blockedUsers.length} akun`}>
          {() => (
            <div className="space-y-1">
              {blockedUsers.length === 0 ? (
                <p className="text-[13px] text-muted-foreground text-center py-3">
                  Tidak ada akun yang diblokir
                </p>
              ) : (
                blockedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8">
                        <AvatarImage
                          src={user.avatar_url}
                          alt={user.username}
                        />
                        <AvatarFallback className="text-[11px]">
                          {user.full_name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-[13px] font-medium leading-tight">
                          {user.full_name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setBlockedUsers((prev) =>
                          prev.filter((u) => u.id !== user.id),
                        )
                      }
                      className="text-[13px] font-medium text-[#007AFF] hover:opacity-70 transition-opacity"
                    >
                      Buka Blokir
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </EditRow>

        <EditRow label="Akun Dibisukan" value={`${mutedUsers.length} akun`}>
          {() => (
            <div className="space-y-1">
              {mutedUsers.length === 0 ? (
                <p className="text-[13px] text-muted-foreground text-center py-3">
                  Tidak ada akun yang dibisukan
                </p>
              ) : (
                mutedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8">
                        <AvatarImage
                          src={user.avatar_url}
                          alt={user.username}
                        />
                        <AvatarFallback className="text-[11px]">
                          {user.full_name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-[13px] font-medium leading-tight">
                          {user.full_name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setMutedUsers((prev) =>
                          prev.filter((u) => u.id !== user.id),
                        )
                      }
                      className="text-[13px] font-medium text-[#007AFF] hover:opacity-70 transition-opacity"
                    >
                      Bunyikan
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </EditRow>
      </SettingsGroup>
    </div>
  );
}
