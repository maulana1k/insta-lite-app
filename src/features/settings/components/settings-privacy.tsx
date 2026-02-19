'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SettingsGroup, SettingsRow, Toggle, EditRow } from './settings-ui';
import { useSettingsStore } from '../store/settings-store';
import { BLOCKED_USERS, MUTED_USERS } from '../api/mock-data';
import { cn } from '@/lib/utils';

const WHO_CAN_MESSAGE_OPTIONS = [
  { value: 'everyone', label: 'Semua Orang' },
  { value: 'followers', label: 'Hanya Pengikut' },
  { value: 'nobody', label: 'Tidak Ada' },
] as const;

const WHO_CAN_TAG_OPTIONS = [
  { value: 'everyone', label: 'Semua Orang' },
  { value: 'followers', label: 'Hanya Pengikut' },
  { value: 'nobody', label: 'Tidak Ada' },
] as const;

export function SettingsPrivacy() {
  const { privacy, updatePrivacy } = useSettingsStore();
  const [blockedUsers, setBlockedUsers] = useState(BLOCKED_USERS);
  const [mutedUsers, setMutedUsers] = useState(MUTED_USERS);
  const [whoCanTag, setWhoCanTag] = useState<'everyone' | 'followers' | 'nobody'>('everyone');

  const whoCanMessageLabel = WHO_CAN_MESSAGE_OPTIONS.find(
    (o) => o.value === privacy.whoCanMessage
  )?.label ?? 'Semua Orang';

  const whoCanTagLabel = WHO_CAN_TAG_OPTIONS.find(
    (o) => o.value === whoCanTag
  )?.label ?? 'Semua Orang';

  return (
    <div className="space-y-8">

      <SettingsGroup
        header="Visibilitas"
        footer="Saat akun privat, hanya pengikut yang disetujui yang bisa melihat postingan Anda."
      >
        <div className="flex items-center justify-between h-11 px-4">
          <span className="text-[15px]">Akun Privat</span>
          <Toggle
            on={privacy.privateAccount}
            onToggle={() => updatePrivacy({ privateAccount: !privacy.privateAccount })}
          />
        </div>
        <div className="flex items-center justify-between h-11 px-4">
          <span className="text-[15px]">Tampilkan Status Aktif</span>
          <Toggle on={true} onToggle={() => {}} />
        </div>
      </SettingsGroup>

      <SettingsGroup header="Interaksi">
        <EditRow label="Siapa yang Bisa Mengirim Pesan" value={whoCanMessageLabel}>
          {(onClose) => (
            <div className="space-y-0.5 rounded-xl overflow-hidden bg-background border border-border/60">
              {WHO_CAN_MESSAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    updatePrivacy({ whoCanMessage: opt.value });
                    onClose();
                  }}
                  className="w-full flex items-center justify-between h-11 px-4 hover:bg-muted/50 transition-colors"
                >
                  <span className="text-[14px]">{opt.label}</span>
                  {privacy.whoCanMessage === opt.value && (
                    <Check className="size-4 text-[#007AFF]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </EditRow>

        <EditRow label="Siapa yang Bisa Menandai Anda" value={whoCanTagLabel}>
          {(onClose) => (
            <div className="space-y-0.5 rounded-xl overflow-hidden bg-background border border-border/60">
              {WHO_CAN_TAG_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setWhoCanTag(opt.value);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between h-11 px-4 hover:bg-muted/50 transition-colors"
                >
                  <span className="text-[14px]">{opt.label}</span>
                  {whoCanTag === opt.value && (
                    <Check className="size-4 text-[#007AFF]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </EditRow>
      </SettingsGroup>

      <SettingsGroup header="Orang">
        <EditRow
          label="Akun Diblokir"
          value={`${blockedUsers.length} akun`}
        >
          {() => (
            <div className="space-y-1">
              {blockedUsers.length === 0 ? (
                <p className="text-[13px] text-muted-foreground text-center py-3">
                  Tidak ada akun yang diblokir
                </p>
              ) : (
                blockedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8">
                        <AvatarImage src={user.avatar_url} alt={user.username} />
                        <AvatarFallback className="text-[11px]">
                          {user.full_name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-[13px] font-medium leading-tight">{user.full_name}</p>
                        <p className="text-[11px] text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setBlockedUsers((prev) => prev.filter((u) => u.id !== user.id))}
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

        <EditRow
          label="Akun Dibisukan"
          value={`${mutedUsers.length} akun`}
        >
          {() => (
            <div className="space-y-1">
              {mutedUsers.length === 0 ? (
                <p className="text-[13px] text-muted-foreground text-center py-3">
                  Tidak ada akun yang dibisukan
                </p>
              ) : (
                mutedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8">
                        <AvatarImage src={user.avatar_url} alt={user.username} />
                        <AvatarFallback className="text-[11px]">
                          {user.full_name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-[13px] font-medium leading-tight">{user.full_name}</p>
                        <p className="text-[11px] text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setMutedUsers((prev) => prev.filter((u) => u.id !== user.id))}
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
