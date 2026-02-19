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

      <div className="flex w-full justify-center px-6 pt-15">
        <div className="flex max-w-5xl w-full items-start">
          {/* Sidebar — sticky */}
          <div className="w-[220px] shrink-0 sticky top-15 self-start">
            <SettingsSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>

          {/* Content — scrolls with the page */}
          <div className="flex-1 pl-10">
            <div className="max-w-2xl pt-8 pb-20">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
