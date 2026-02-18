'use client';

import { User, ShieldKeyhole, Bell, Palette, Database } from '@solar-icons/react';

interface SettingSection {
  id: string;
  label: string;
  icon: React.ElementType;
}

const SECTIONS: SettingSection[] = [
  { id: 'account', label: 'Akun', icon: User },
  { id: 'privacy', label: 'Privasi', icon: ShieldKeyhole },
  { id: 'notifications', label: 'Notifikasi', icon: Bell },
  { id: 'appearance', label: 'Tampilan', icon: Palette },
  { id: 'data', label: 'Data', icon: Database },
];

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function SettingsSidebar({ activeSection, onSectionChange }: SettingsSidebarProps) {
  return (
    <div className="py-8 pr-2">
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.07em] px-4 mb-3">
        Pengaturan
      </p>
      <nav className="space-y-0.5">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left
                ${isActive
                  ? 'bg-muted/70 dark:bg-white/[0.08] text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }
              `}
            >
              {/* @ts-ignore */}
              <Icon
                className="size-[18px] shrink-0"
                weight={isActive ? 'Bold' : 'Linear'}
              />
              <span className={`text-[14px] ${isActive ? 'font-semibold' : 'font-normal'}`}>
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
