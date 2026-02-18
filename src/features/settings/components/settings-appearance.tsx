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
    <div className="space-y-6">

      <SettingsGroup
        header="Tampilan"
        footer="Pilih tampilan antarmuka aplikasi."
      >
        {THEMES.map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className="w-full flex items-center justify-between h-11 px-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
          >
            <span className="text-[15px] text-foreground">{t.label}</span>
            <Check
              className={cn(
                'size-4 transition-opacity',
                theme === t.value ? 'opacity-100 text-[#007AFF]' : 'opacity-0'
              )}
            />
          </button>
        ))}
      </SettingsGroup>

      <SettingsGroup
        header="Bahasa"
        footer="Ubah bahasa yang digunakan di seluruh aplikasi."
      >
        {LANGUAGES.map((lang) => (
          <button
            key={lang.value}
            onClick={() => updateAppearance({ language: lang.value })}
            className="w-full flex items-center justify-between h-11 px-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
          >
            <span className="text-[15px] text-foreground">{lang.label}</span>
            <Check
              className={cn(
                'size-4 transition-opacity',
                appearance.language === lang.value ? 'opacity-100 text-[#007AFF]' : 'opacity-0'
              )}
            />
          </button>
        ))}
      </SettingsGroup>

    </div>
  );
}
