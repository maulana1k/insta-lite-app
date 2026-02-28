'use client';

import { useTheme } from 'next-themes';
import { CheckCircle2 } from 'lucide-react';
import { useSettingsStore } from '../store/settings-store';
import { cn } from '@/lib/utils';

// ── Mini browser chrome mockup ─────────────────────────────────────────────

function TrafficLights({ colored }: { colored?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 mb-3">
      <span className={cn('size-2.5 rounded-full', colored ? 'bg-[#FF5F57]' : 'bg-white/20')} />
      <span className={cn('size-2.5 rounded-full', colored ? 'bg-[#FEBC2E]' : 'bg-white/20')} />
      <span className={cn('size-2.5 rounded-full', colored ? 'bg-[#28C840]' : 'bg-white/20')} />
    </div>
  );
}

function SkeletonLine({ width, height = 'h-1.5', opacity = 'opacity-100' }: { width: string; height?: string; opacity?: string }) {
  return <div className={cn('rounded-full', height, width, opacity)} />;
}

// Light theme preview
function LightPreview() {
  return (
    <div className="h-[120px] bg-[#f5f5f5] p-3 flex gap-2 overflow-hidden">
      {/* sidebar */}
      <div className="w-[28%] bg-white rounded-lg p-2 flex flex-col gap-1.5 shadow-sm">
        <TrafficLights />
        <div className="size-5 rounded-full bg-gray-200 mb-1" />
        <SkeletonLine width="w-full" height="h-1.5" opacity="opacity-100" />
        <SkeletonLine width="w-4/5" height="h-1.5" />
        <SkeletonLine width="w-3/5" height="h-1.5" />
      </div>
      {/* content */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="bg-white rounded-lg p-2 shadow-sm flex-1 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="size-4 rounded-full bg-gray-200" />
            <SkeletonLine width="w-1/3" height="h-1.5" />
          </div>
          <SkeletonLine width="w-full" height="h-1.5" />
          <SkeletonLine width="w-5/6" height="h-1.5" />
          <SkeletonLine width="w-2/3" height="h-1.5" />
        </div>
        <div className="bg-white rounded-lg p-2 shadow-sm flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-gray-200" />
          <SkeletonLine width="w-1/2" height="h-1.5" />
          <div className="ml-auto bg-gray-800 rounded-md px-2 py-0.5">
            <span className="text-[7px] text-white font-semibold">Aa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dark theme preview
function DarkPreview() {
  return (
    <div className="h-[120px] bg-[#111] p-3 flex gap-2 overflow-hidden">
      {/* sidebar */}
      <div className="w-[28%] bg-[#1c1c1c] rounded-lg p-2 flex flex-col gap-1.5 border border-white/[0.06]">
        <TrafficLights colored />
        <div className="size-5 rounded-full bg-white/10 mb-1" />
        <SkeletonLine width="w-full" height="h-1.5" />
        <SkeletonLine width="w-4/5" height="h-1.5" />
        <SkeletonLine width="w-3/5" height="h-1.5" />
      </div>
      {/* content */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="bg-[#1c1c1c] rounded-lg p-2 border border-white/[0.06] flex-1 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="size-4 rounded-full bg-white/10" />
            <SkeletonLine width="w-1/3" height="h-1.5" />
          </div>
          <SkeletonLine width="w-full" height="h-1.5" />
          <SkeletonLine width="w-5/6" height="h-1.5" />
          <SkeletonLine width="w-2/3" height="h-1.5" />
        </div>
        <div className="bg-[#1c1c1c] rounded-lg p-2 border border-white/[0.06] flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-white/10" />
          <SkeletonLine width="w-1/2" height="h-1.5" />
          <div className="ml-auto bg-white rounded-md px-2 py-0.5">
            <span className="text-[7px] text-black font-semibold">Aa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// System theme preview — vertical split
function SystemPreview() {
  return (
    <div className="h-[120px] flex overflow-hidden">
      {/* left half: light */}
      <div className="w-1/2 bg-[#f5f5f5] p-2.5 flex flex-col gap-1.5 overflow-hidden">
        <TrafficLights />
        <div className="bg-white rounded-md p-1.5 flex flex-col gap-1 shadow-sm flex-1">
          <div className="flex items-center gap-1 mb-0.5">
            <div className="size-3 rounded-full bg-gray-200" />
            <SkeletonLine width="w-1/2" height="h-1" />
          </div>
          <SkeletonLine width="w-full" height="h-1" />
          <SkeletonLine width="w-4/5" height="h-1" />
          <div className="mt-auto flex items-center gap-1">
            <SkeletonLine width="w-1/3" height="h-1" />
            <div className="ml-auto bg-gray-800 rounded px-1.5 py-0.5">
              <span className="text-[6px] text-white font-semibold">Aa</span>
            </div>
          </div>
        </div>
      </div>
      {/* divider */}
      <div className="w-px bg-border/60" />
      {/* right half: dark */}
      <div className="w-1/2 bg-[#111] p-2.5 flex flex-col gap-1.5 overflow-hidden">
        <TrafficLights />
        <div className="bg-[#1c1c1c] rounded-md p-1.5 flex flex-col gap-1 border border-white/[0.06] flex-1">
          <div className="flex items-center gap-1 mb-0.5">
            <div className="size-3 rounded-full bg-white/10" />
            <SkeletonLine width="w-1/2" height="h-1" />
          </div>
          <SkeletonLine width="w-full" height="h-1" />
          <SkeletonLine width="w-4/5" height="h-1" />
          <div className="mt-auto flex items-center gap-1">
            <SkeletonLine width="w-1/3" height="h-1" />
            <div className="ml-auto bg-white rounded px-1.5 py-0.5">
              <span className="text-[6px] text-black font-semibold">Aa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Theme card ─────────────────────────────────────────────────────────────

function ThemeCard({
  value,
  label,
  selected,
  onSelect,
  preview,
}: {
  value: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  preview: React.ReactNode;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'relative rounded-2xl overflow-hidden text-left transition-all duration-200',
        'border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        selected
          ? 'border-foreground shadow-[0_0_0_1px_hsl(var(--foreground)/0.08)] shadow-lg'
          : 'border-border hover:border-foreground/30'
      )}
    >
      {/* Preview area */}
      <div className="overflow-hidden">{preview}</div>

      {/* Label bar */}
      <div
        className={cn(
          'flex items-center justify-between px-3.5 py-3 transition-colors',
          selected ? 'bg-foreground' : 'bg-muted/60'
        )}
      >
        <span
          className={cn(
            'text-[14px] font-semibold',
            selected ? 'text-background' : 'text-foreground'
          )}
        >
          {label}
        </span>
        <CheckCircle2
          className={cn(
            'size-[18px] transition-all duration-200',
            selected ? 'opacity-100 text-background' : 'opacity-0'
          )}
        />
      </div>
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

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
    <div className="space-y-10">

      {/* ── Theme ──────────────────────────────────────── */}
      <section>
        <div className="mb-4">
          <h2 className="text-[20px] font-bold leading-tight">Tampilan</h2>
          <p className="text-[14px] text-muted-foreground mt-0.5">
            Pilih tampilan antarmuka aplikasi.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <ThemeCard
            value="system"
            label="Sistem"
            selected={theme === 'system'}
            onSelect={() => setTheme('system')}
            preview={<SystemPreview />}
          />
          <ThemeCard
            value="light"
            label="Terang"
            selected={theme === 'light'}
            onSelect={() => setTheme('light')}
            preview={<LightPreview />}
          />
          <ThemeCard
            value="dark"
            label="Gelap"
            selected={theme === 'dark'}
            onSelect={() => setTheme('dark')}
            preview={<DarkPreview />}
          />
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── Language ───────────────────────────────────── */}
      <section>
        <div className="mb-4">
          <h2 className="text-[20px] font-bold leading-tight">Bahasa</h2>
          <p className="text-[14px] text-muted-foreground mt-0.5">
            Ubah bahasa yang digunakan di seluruh aplikasi.
          </p>
        </div>
        <div className="rounded-2xl border border-border overflow-hidden">
          {LANGUAGES.map((lang, i) => (
            <button
              key={lang.value}
              onClick={() => updateAppearance({ language: lang.value })}
              className={cn(
                'w-full flex items-center justify-between px-4 py-3.5 hover:bg-muted/30 dark:hover:bg-white/[0.03] transition-colors text-left',
                i > 0 && 'border-t border-border'
              )}
            >
              <span className="text-[15px]">{lang.label}</span>
              <span
                className={cn(
                  'size-4 rounded-full border-2 transition-all flex items-center justify-center',
                  appearance.language === lang.value
                    ? 'border-foreground bg-foreground'
                    : 'border-border'
                )}
              >
                {appearance.language === lang.value && (
                  <span className="size-1.5 rounded-full bg-background block" />
                )}
              </span>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}
