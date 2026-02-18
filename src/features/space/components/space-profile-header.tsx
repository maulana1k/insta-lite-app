'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Calendar } from '@solar-icons/react';
import { cn } from '@/lib/utils';
import { Space } from '../types';

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return n.toString();
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
}

interface SpaceProfileHeaderProps {
  space: Space;
  isMember: boolean;
  onJoin: () => void;
}

export function SpaceProfileHeader({ space, isMember, onJoin }: SpaceProfileHeaderProps) {
  const [tab, setTab] = useState<'about' | 'rules'>('about');
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="mb-1">
      {/* ── Banner ── */}
      <div className="relative h-44 overflow-hidden rounded-2xl">
        <img
          src={space.banner_url}
          alt={space.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {space.is_private && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            <Lock className="size-3" />
            Privat
          </div>
        )}
      </div>

      {/* ── Avatar + action buttons ── */}
      <div className="flex items-start justify-between -mt-9 mb-3 px-1">
        <div className="size-[72px] rounded-2xl overflow-hidden border-4 border-background bg-background shadow-sm shrink-0">
          <img
            src={space.avatar_url}
            alt={space.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center gap-2 mt-12">
          <button
            onClick={() => setIsFollowing((v) => !v)}
            className={cn(
              'px-4 py-1.5 rounded-xl text-[13px] font-semibold transition-all',
              isFollowing
                ? 'bg-muted text-foreground hover:bg-muted/70'
                : 'bg-foreground text-background hover:opacity-85',
            )}
          >
            {isFollowing ? 'Mengikuti' : 'Ikuti'}
          </button>

          {space.is_private && !isMember && (
            <button
              onClick={onJoin}
              className="px-4 py-1.5 rounded-xl text-[13px] font-semibold border border-border bg-background hover:bg-muted/50 transition-all"
            >
              Minta Bergabung
            </button>
          )}

          {space.is_private && isMember && (
            <span className="px-3 py-1.5 rounded-xl text-[13px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              ✓ Anggota
            </span>
          )}
        </div>
      </div>

      {/* ── Name + slug ── */}
      <div className="px-1 mb-2">
        <h1 className="font-bold text-[22px] leading-tight">{space.name}</h1>
        <p className="text-[12px] text-muted-foreground mt-0.5">s/{space.slug}</p>
      </div>

      {/* ── Description ── */}
      <p className="px-1 text-[14px] text-foreground/75 leading-relaxed mb-3">
        {space.description}
      </p>

      {/* ── Stats ── */}
      <div className="px-1 flex items-center gap-5 mb-4 text-[13px]">
        <span>
          <strong className="font-semibold">{formatCount(space.members_count)}</strong>
          <span className="text-muted-foreground ml-1">anggota</span>
        </span>
        <span>
          <strong className="font-semibold">{formatCount(space.posts_count)}</strong>
          <span className="text-muted-foreground ml-1">posting</span>
        </span>
      </div>

      {/* ── About / Rules tabs ── */}
      <div className="border-t border-border pt-3 px-1">
        <div className="flex gap-1 mb-3">
          {(['about', 'rules'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'px-3 py-1.5 text-[13px] font-medium rounded-lg transition-colors',
                tab === t
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t === 'about' ? 'Tentang' : 'Aturan'}
            </button>
          ))}
        </div>

        {tab === 'about' ? (
          <div className="space-y-2 pb-4">
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              {space.description}
            </p>
            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <Calendar className="size-3.5" />
              <span>Dibuat {formatDate(space.created_at)}</span>
            </div>
          </div>
        ) : (
          <ol className="pb-4 space-y-2">
            {(space.rules ?? defaultRules).map((rule, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] text-muted-foreground">
                <span className="font-semibold text-muted-foreground/40 shrink-0 w-4 text-right">
                  {i + 1}.
                </span>
                <span className="leading-relaxed">{rule}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

const defaultRules = [
  'Jaga sopan santun dan saling menghargai',
  'Dilarang spam atau self-promo berlebihan',
  'Gunakan topik yang sesuai',
  'Dilarang SARA dan ujaran kebencian',
];
