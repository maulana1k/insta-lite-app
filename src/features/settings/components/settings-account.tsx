'use client';

import { useState } from 'react';
import { Camera } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
import { SettingsGroup, SettingsRow, Toggle, EditRow } from './settings-ui';
import { useSettingsStore } from '../store/settings-store';
import { CURRENT_USER } from '../api/mock-data';

function FieldView({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-[14px] text-foreground whitespace-pre-line">{value || <span className="text-muted-foreground/50 italic">Belum diisi</span>}</p>
    </div>
  );
}

export function SettingsAccount() {
  const { profile, updateProfile } = useSettingsStore();

  const [isEditing, setIsEditing] = useState(false);

  const [nameForm, setNameForm] = useState({
    first: profile.displayName.split(' ')[0] ?? 'Jack',
    last: profile.displayName.split(' ').slice(1).join(' ') ?? 'Harding',
  });
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [website, setWebsite] = useState(profile.website);
  const [email, setEmail] = useState('jack.harding@example.com');
  const [phone, setPhone] = useState('+62 812 3456 7890');
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [twoFactor, setTwoFactor] = useState(false);

  const passwordValid =
    passwords.current.length > 0 &&
    passwords.new.length >= 8 &&
    passwords.new === passwords.confirm;

  function handleEdit() {
    // sync draft from latest saved profile before opening
    setNameForm({
      first: profile.displayName.split(' ')[0] ?? 'Jack',
      last: profile.displayName.split(' ').slice(1).join(' ') ?? 'Harding',
    });
    setUsername(profile.username);
    setBio(profile.bio);
    setWebsite(profile.website);
    setIsEditing(true);
  }

  function handleSave() {
    updateProfile({
      displayName: `${nameForm.first} ${nameForm.last}`.trim(),
      username,
      bio,
      website,
    });
    setIsEditing(false);
  }

  function handleCancel() {
    setNameForm({
      first: profile.displayName.split(' ')[0] ?? 'Jack',
      last: profile.displayName.split(' ').slice(1).join(' ') ?? 'Harding',
    });
    setUsername(profile.username);
    setBio(profile.bio);
    setWebsite(profile.website);
    setEmail('jack.harding@example.com');
    setPhone('+62 812 3456 7890');
    setIsEditing(false);
  }

  return (
    <div className="space-y-6">

      {/* Profile Picture */}
      <div className="flex items-center gap-5 pb-2">
        <label className="relative cursor-pointer group shrink-0">
          <input type="file" accept="image/*" className="sr-only" />
          <Avatar className="size-[72px]">
            <AvatarImage src={CURRENT_USER.avatar_url} alt={CURRENT_USER.full_name} />
            <AvatarFallback className="text-2xl font-semibold">
              {CURRENT_USER.full_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Camera className="size-5 text-white" />
          </div>
        </label>
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <p className="text-[18px] font-bold leading-tight">{profile.displayName}</p>
          <p className="text-[13px] text-muted-foreground">@{profile.username}</p>
          <p className="text-[13px] font-medium text-[#007AFF] hover:opacity-70 cursor-pointer transition-opacity mt-2">
            Ubah Foto Profil
          </p>
        </div>
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={handleEdit} className="shrink-0">
            Edit Profil
          </Button>
        )}
      </div>

      {/* Personal Details */}
      <SettingsGroup header="Detail Personal">
        <div className="px-4 py-4 space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Nama</p>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={nameForm.first}
                    onChange={(e) => setNameForm({ ...nameForm, first: e.target.value })}
                    placeholder="Nama depan"
                  />
                  <Input
                    value={nameForm.last}
                    onChange={(e) => setNameForm({ ...nameForm, last: e.target.value })}
                    placeholder="Nama belakang"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Username</p>
                <div className="flex items-center rounded-lg border border-border overflow-hidden h-9 bg-background">
                  <span className="px-3 text-[13px] text-muted-foreground bg-muted/50 h-full flex items-center border-r border-border shrink-0">
                    @
                  </span>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 px-3 text-[14px] outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Bio</p>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Ceritakan tentang diri Anda..."
                  rows={3}
                  className="resize-none text-[14px]"
                />
                <p className="text-[11px] text-muted-foreground text-right">{bio.length}/160</p>
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Website</p>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://website.com"
                  type="url"
                />
              </div>
            </>
          ) : (
            <>
              <FieldView label="Nama" value={`${nameForm.first} ${nameForm.last}`.trim()} />
              <FieldView label="Username" value={`@${username}`} />
              <FieldView label="Bio" value={bio} />
              <FieldView label="Website" value={website} />
            </>
          )}
        </div>
      </SettingsGroup>

      {/* Contact */}
      <SettingsGroup header="Kontak">
        <div className="px-4 py-4 space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Email</p>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="email@contoh.com"
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Nomor Telepon</p>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="+62 812 xxxx xxxx"
                />
              </div>
            </>
          ) : (
            <>
              <FieldView label="Email" value={email} />
              <FieldView label="Nomor Telepon" value={phone} />
            </>
          )}
        </div>
      </SettingsGroup>

      {/* Save / Cancel — only visible in edit mode */}
      {isEditing && (
        <div className="flex gap-2">
          <Button onClick={handleSave}>Simpan Perubahan</Button>
          <Button variant="ghost" onClick={handleCancel}>Batal</Button>
        </div>
      )}

      {/* Security — always separate */}
      <SettingsGroup header="Keamanan">
        <EditRow label="Password" value="••••••••••">
          {(onClose) => (
            <>
              <Input
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                type="password"
                placeholder="Password saat ini"
              />
              <Input
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                type="password"
                placeholder="Password baru (min. 8 karakter)"
              />
              <Input
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                type="password"
                placeholder="Konfirmasi password baru"
              />
              {passwords.new && passwords.confirm && passwords.new !== passwords.confirm && (
                <p className="text-[12px] text-red-500">Password tidak cocok</p>
              )}
              <div className="flex gap-2">
                <Button size="sm" disabled={!passwordValid} onClick={onClose}>
                  Ubah Password
                </Button>
                <Button size="sm" variant="ghost" onClick={() => {
                  setPasswords({ current: '', new: '', confirm: '' });
                  onClose();
                }}>
                  Batal
                </Button>
              </div>
            </>
          )}
        </EditRow>

        <div className="flex items-center justify-between h-11 px-4">
          <span className="text-[15px]">Autentikasi Dua Faktor</span>
          <Toggle on={twoFactor} onToggle={() => setTwoFactor(!twoFactor)} />
        </div>
      </SettingsGroup>

      {/* Danger Zone */}
      <SettingsGroup
        header="Akun"
        footer="Menonaktifkan akun menyembunyikan profil Anda sementara. Menghapus akun bersifat permanen dan tidak dapat dibatalkan."
      >
        <SettingsRow label="Nonaktifkan Akun" onClick={() => {}} danger />
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
