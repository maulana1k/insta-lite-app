'use client';

import { useTheme } from 'next-themes';
import { Check } from 'lucide-react';
import { SettingsGroup, SettingsRow } from './settings-ui';
import { useSettingsStore } from '../store/settings-store';
import { cn } from '@/lib/utils';

const THEMES = [
  { value: 'system', label: 'Sistem' },
  { value: 'light', label: 'Terang' },
  { value: 'dark', label: 'Gelap' },
] as const;

const LANGUAGES = [
  { value: 'id', label: 'Indonesia (ID)' },
  { value: 'en', label: 'English (US)' },
] as const;

export function SettingsAppearance() {
  const { theme, setTheme } = useTheme();
  const { appearance, updateAppearance } = useSettingsStore();

  return (
    <div className="space-y-8">

      <SettingsGroup
        header="Tampilan"
        footer="Pilih tampilan antarmuka aplikasi."
      >
        {THEMES.map((t) => (
          <SettingsRow key={t.value} label={t.label} onClick={() => setTheme(t.value)}>
            <Check
              className={cn(
                'size-4 transition-opacity',
                theme === t.value ? 'opacity-100 text-[#007AFF]' : 'opacity-0'
              )}
            />
          </SettingsRow>
        ))}
      </SettingsGroup>

      <SettingsGroup
        header="Bahasa"
        footer="Ubah bahasa yang digunakan di seluruh aplikasi."
      >
        {LANGUAGES.map((lang) => (
          <SettingsRow
            key={lang.value}
            label={lang.label}
            onClick={() => updateAppearance({ language: lang.value })}
          >
            <Check
              className={cn(
                'size-4 transition-opacity',
                appearance.language === lang.value ? 'opacity-100 text-[#007AFF]' : 'opacity-0'
              )}
            />
          </SettingsRow>
        ))}
      </SettingsGroup>

    </div>
  );
}
