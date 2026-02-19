'use client';

import { SettingsGroup, SettingsRow, Toggle } from './settings-ui';
import { useSettingsStore } from '../store/settings-store';

export function SettingsNotifications() {
  const { notifications, updateNotifications } = useSettingsStore();

  const toggle = (key: keyof typeof notifications.push) => {
    updateNotifications({
      push: { ...notifications.push, [key]: !notifications.push[key] },
    });
  };

  return (
    <div className="space-y-8">

      <SettingsGroup
        header="Aktivitas"
        footer="Notifikasi untuk interaksi pada postingan Anda."
      >
        <SettingsRow label="Suka">
          <Toggle on={notifications.push.likes} onToggle={() => toggle('likes')} />
        </SettingsRow>
        <SettingsRow label="Komentar">
          <Toggle on={notifications.push.comments} onToggle={() => toggle('comments')} />
        </SettingsRow>
        <SettingsRow label="Mention">
          <Toggle on={notifications.push.mentions} onToggle={() => toggle('mentions')} />
        </SettingsRow>
      </SettingsGroup>

      <SettingsGroup header="Sosial">
        <SettingsRow label="Pengikut Baru">
          <Toggle on={notifications.push.followers} onToggle={() => toggle('followers')} />
        </SettingsRow>
        <SettingsRow label="Pesan Langsung">
          <Toggle on={notifications.push.messages} onToggle={() => toggle('messages')} />
        </SettingsRow>
      </SettingsGroup>

      <SettingsGroup
        header="Email"
        footer="Kelola notifikasi yang dikirim ke email Anda."
      >
        <SettingsRow label="Pembaruan Produk">
          <Toggle on={notifications.email.mentions} onToggle={() => {}} />
        </SettingsRow>
        <SettingsRow label="Ringkasan Mingguan">
          <Toggle on={notifications.email.comments} onToggle={() => {}} />
        </SettingsRow>
      </SettingsGroup>

    </div>
  );
}
