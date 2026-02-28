"use client";

import { VerifiedCheck } from "@solar-icons/react";
import { Lock } from "lucide-react";
import Link from "next/link";
import { SUGGESTED_USERS } from "@/features/post/api/mock-data";
import { SPACES } from "../api/mock-data";

function formatCount(n: number): string {
  if (n >= 1_000_000)
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toString();
}

interface SpaceRightPanelProps {
  currentSpaceId?: string;
}

export function SpaceRightPanel({ currentSpaceId }: SpaceRightPanelProps) {
  const recommended = SPACES.filter((s) => s.id !== currentSpaceId).slice(0, 4);
  const suggested = SUGGESTED_USERS.slice(0, 4);

  return (
    <aside className="hidden xl:flex flex-col w-72 h-fit sticky top-24 shrink-0 gap-4 pt-15">
      {/* ── Recommended spaces ── */}
      <div className="rounded-2xl border border-border p-4">
        <h3 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Space Serupa
        </h3>
        <div className="space-y-3">
          {recommended.map((space) => (
            <div key={space.id} className="flex items-center gap-3">
              <Link
                href={`/space/${space.slug}`}
                className="flex items-center gap-3 flex-1 min-w-0 group"
              >
                <div className="size-9 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={space.avatar_url}
                    alt={space.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-[13px] font-semibold truncate group-hover:text-blue-500 transition-colors">
                      {space.name}
                    </p>
                    {space.is_private && (
                      <Lock className="size-3 text-muted-foreground shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {formatCount(space.members_count)} anggota
                  </p>
                </div>
              </Link>
              <button className="text-[12px] font-semibold text-blue-500 hover:text-blue-600 shrink-0 transition-colors">
                Ikuti
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Suggested users ── */}
      <div className="rounded-2xl border border-border p-4">
        <h3 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Mungkin Kamu Kenal
        </h3>
        <div className="space-y-3">
          {suggested.map((profile) => (
            <div key={profile.user.id} className="flex items-center gap-3">
              <Link
                href={`/u/${profile.user.username}`}
                className="flex items-center gap-3 flex-1 min-w-0 group"
              >
                <div className="size-9 rounded-full overflow-hidden shrink-0">
                  <img
                    src={profile.user.avatar_url}
                    alt={profile.user.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-[13px] font-semibold truncate group-hover:text-blue-500 transition-colors">
                      {profile.user.full_name}
                    </p>
                    {profile.user.verified && (
                      <VerifiedCheck
                        className="size-3.5 text-blue-500 shrink-0"
                        weight="Bold"
                      />
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    @{profile.user.username}
                  </p>
                </div>
              </Link>
              <button className="text-[12px] font-semibold text-blue-500 hover:text-blue-600 shrink-0 transition-colors">
                Ikuti
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
