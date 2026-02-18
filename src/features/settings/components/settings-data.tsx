'use client';

import { useState } from 'react';
import { SettingsGroup, SettingsRow } from './settings-ui';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function SettingsData() {
  const [cacheSize, setCacheSize] = useState('487 MB');
  const [clearing, setClearing] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleClearCache = () => {
    if (clearing || cacheSize === '0 MB') return;
    setClearing(true);
    setTimeout(() => {
      setCacheSize('0 MB');
      setClearing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">

      <SettingsGroup
        header="Penyimpanan"
        footer="Cache membantu aplikasi memuat konten lebih cepat."
      >
        <SettingsRow
          label="Cache Aplikasi"
          value={clearing ? 'Menghapus…' : cacheSize}
          onClick={cacheSize !== '0 MB' ? handleClearCache : undefined}
        />
      </SettingsGroup>

      <SettingsGroup
        header="Data Anda"
        footer="Permintaan unduh data dapat memakan waktu hingga 24 jam. Anda akan dikirimkan email saat sudah siap."
      >
        <SettingsRow
          label="Unduh Data Saya"
          value={downloaded ? 'Diminta' : undefined}
          onClick={downloaded ? undefined : () => setDownloaded(true)}
        />
        <SettingsRow label="Log Aktivitas" onClick={() => {}} />
      </SettingsGroup>

      <SettingsGroup
        header="Akun"
        footer="Menghapus akun bersifat permanen. Semua data, postingan, dan pengikut Anda akan dihapus selamanya."
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="w-full flex items-center h-11 px-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors">
              <span className="text-[15px] text-red-500">Hapus Akun</span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus akun Anda?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Semua postingan, pengikut, pesan, dan data Anda akan dihapus secara permanen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                Ya, Hapus Akun
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SettingsGroup>

    </div>
  );
}
