'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { SettingsSidebar } from '@/features/settings/components/settings-sidebar';
import { SettingsAccount } from '@/features/settings/components/settings-account';
import { SettingsPrivacy } from '@/features/settings/components/settings-privacy';
import { SettingsNotifications } from '@/features/settings/components/settings-notifications';
import { SettingsAppearance } from '@/features/settings/components/settings-appearance';
import { SettingsData } from '@/features/settings/components/settings-data';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account');

  const renderSection = () => {
    switch (activeSection) {
      case 'account': return <SettingsAccount />;
      case 'privacy': return <SettingsPrivacy />;
      case 'notifications': return <SettingsNotifications />;
      case 'appearance': return <SettingsAppearance />;
      case 'data': return <SettingsData />;
      default: return <SettingsAccount />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      <div className="flex w-full justify-center px-6 py-4 pt-15">
        <div
          className="flex max-w-5xl w-full"
          style={{ height: 'calc(100vh - 60px - 32px)' }}
        >
          {/* Sidebar */}
          <div className="w-[220px] shrink-0">
            <SettingsSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain pl-10">
            <div className="max-w-2xl py-8">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
