'use client';

import { Button } from '@/components/ui/button';
import { APP_VERSION } from '../api/mock-data';
import { ExternalLink, LogOut } from 'lucide-react';

export function SettingsAbout() {
  const handleLogout = () => {
    console.log('Logout');
    // TODO: Implement logout
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Tentang</h2>
        <p className="text-[14px] text-muted-foreground mt-1">
          Informasi aplikasi dan bantuan
        </p>
      </div>

      {/* App Info */}
      <div className="bg-background border rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Jends Social</h3>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              Platform media sosial untuk Indonesia
            </p>
          </div>
          <div className="text-right">
            <p className="text-[13px] text-muted-foreground">Versi</p>
            <p className="text-[14px] font-medium">{APP_VERSION}</p>
          </div>
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-background border rounded-2xl p-6 space-y-3">
        <h3 className="font-semibold mb-2">Bantuan & Dukungan</h3>

        <a
          href="#"
          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
        >
          <span className="text-[14px]">Pusat Bantuan</span>
          <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </a>

        <a
          href="#"
          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
        >
          <span className="text-[14px]">Ketentuan Layanan</span>
          <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </a>

        <a
          href="#"
          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
        >
          <span className="text-[14px]">Kebijakan Privasi</span>
          <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </a>

        <a
          href="#"
          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
        >
          <span className="text-[14px]">Hubungi Kami</span>
          <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </a>
      </div>

      {/* Logout */}
      <div className="bg-background border rounded-2xl p-6">
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="w-full"
        >
          <LogOut className="size-4 mr-2" />
          Keluar
        </Button>
      </div>
    </div>
  );
}
