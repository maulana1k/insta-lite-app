'use client';

import { User, ShieldKeyhole, Bell, Palette, Database, ChartSquare } from '@solar-icons/react';

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
  { id: 'insight', label: 'Insight', icon: ChartSquare },
];

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function SettingsSidebar({ activeSection, onSectionChange }: SettingsSidebarProps) {
  return (
    <div className="py-8 pr-4">
      <h2 className="text-[22px] font-bold px-3 mb-5">Pengaturan</h2>
      <nav className="space-y-0.5">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left
                ${isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {/* @ts-ignore */}
              <Icon
                className="size-5 shrink-0"
                weight={isActive ? 'Bold' : 'Linear'}
              />
              <span className={`text-[16px] ${isActive ? 'font-bold' : 'font-normal'}`}>
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
