'use client';

import { SUGGESTED_USERS } from '@/features/post/api/mock-data';
import { SPACES } from '@/features/space/api/mock-data';
// import { TRENDING_POSTS, TRENDING_HASHTAGS } from '../api/mock-data'; // used in discover page
import { VerifiedCheck } from '@solar-icons/react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

function formatCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return count.toString();
}

const RECOMMENDED_SPACES = SPACES.slice(3);

export function SuggestedUsers() {
  return (
    <div className="hidden xl:flex flex-col w-72 h-fit gap-5 sticky top-24 shrink-0">
      {/* Recommended Spaces (moved from left sidebar) */}
      <div className="w-full rounded-2xl px-4">
        <h3 className="font-bold text-[15px] mb-3">Recommended Spaces</h3>
        <div className="flex flex-col">
          {RECOMMENDED_SPACES.map((space) => (
            <Link
              key={space.id}
              href={`/space/${space.slug}`}
              className="flex items-center gap-3 py-2.5 group hover:opacity-70 transition-opacity"
            >
              <div className="w-9 h-9 rounded-lg shrink-0 overflow-hidden bg-muted border border-border">
                <img src={space.avatar_url} alt={space.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-semibold text-[14px] truncate">{space.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {formatCount(space.members_count)} joined &middot; {formatCount(space.posts_count)} posts
                </p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Hashtags - removed, kept as comment */}
      {/* <div className="w-full rounded-2xl px-5">
        <h3 className="font-bold text-[15px] mb-3">Trending</h3>
        <div className="flex flex-col">
          {TRENDING_HASHTAGS.map((item) => (
            <button
              key={item.tag}
              className="flex items-center justify-between py-2.5 group hover:opacity-70 transition-opacity"
            >
              <div>
                <p className="font-semibold text-[14px] text-left">{item.tag}</p>
                <p className="text-[11px] text-muted-foreground">{formatCount(item.posts_count)} posts</p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div> */}

      {/* Suggested Users */}
      <div className="w-full rounded-2xl px-4">
        <h3 className="font-bold text-[15px] mb-4">You May Know</h3>
        <div className="flex flex-col gap-4">
          {SUGGESTED_USERS.map((profile) => (
            <div key={profile.user.id} className="flex items-center gap-3">
              <div className="size-10 rounded-full overflow-hidden shrink-0">
                <img
                  src={profile.user.avatar_url}
                  alt={profile.user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-[13px] truncate">{profile.user.username}</span>
                  {profile.user.verified && (
                    <VerifiedCheck className="size-3.5 text-blue-500 shrink-0" weight="Bold" />
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground truncate">
                  Followed by {profile.mutual_follower}
                </p>
              </div>
              <button className="text-[12px] font-semibold text-blue-500 hover:text-blue-700 transition-colors shrink-0">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
