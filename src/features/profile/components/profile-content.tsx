'use client';

import { useProfilePosts } from '../hooks/use-profile';
import { useProfileStore } from '../store/profile-store';
import { Heart, MessageCircle, Loader2, LayoutGrid, Repeat2, Bookmark, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Post } from '@/types/database';

type ProfileTab = 'posts' | 'media' | 'repost' | 'bookmark';

const TABS: { id: ProfileTab; icon: React.ReactNode; label: string }[] = [
  { id: 'posts',    icon: <LayoutGrid className="size-[18px]" />, label: 'Posts' },
  { id: 'media',    icon: <Camera     className="size-[18px]" />, label: 'Media' },
  { id: 'repost',   icon: <Repeat2    className="size-[18px]" />, label: 'Repost' },
  { id: 'bookmark', icon: <Bookmark   className="size-[18px]" />, label: 'Saved' },
];

interface ProfileContentProps {
  username: string;
}

export function ProfileContent({ username }: ProfileContentProps) {
  const { data: posts, isLoading } = useProfilePosts(username);
  const { activeTab, setActiveTab } = useProfileStore();

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const filtered = (posts ?? []).filter((post) => {
    if (activeTab === 'media') return !!post.image_url;
    return true;
  });

  return (
    <div className="flex-1 min-w-0">
      {/* Icon-only tabs */}
      <div className="flex gap-1 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            aria-label={tab.label}
            className={cn(
              'size-10 rounded-xl flex items-center justify-center transition-colors',
              activeTab === tab.id
                ? 'bg-foreground/10 text-foreground'
                : 'text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/60',
            )}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-[13px]">
          No posts yet.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1">
          {filtered.map((post) =>
            post.image_url ? (
              <ImagePostCard key={post.id} post={post} />
            ) : (
              <TextPostCard key={post.id} post={post} />
            ),
          )}
        </div>
      )}
    </div>
  );
}

function ImagePostCard({ post }: { post: Post }) {
  return (
    <div className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group">
      <img
        src={post.image_url}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Persistent dark gradient at bottom so resting text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Sliding content panel — translate-y hides most of it at rest,
          leaving only ~46px (1 line) peeking above the card bottom edge. */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-[calc(100%-46px)] group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <div className="pt-8 px-3 pb-3">
          <p className="text-white text-[12px] leading-snug line-clamp-4">
            {post.caption}
          </p>
          <div className="flex items-center gap-3 mt-2 text-[11px] text-white/60">
            <span className="flex items-center gap-1">
              <Heart className="size-3" />
              {post.likes_count.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="size-3" />
              {post.comments_count.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextPostCard({ post }: { post: Post }) {
  return (
    <div className="relative aspect-square rounded-xl bg-muted/60 border border-border/40 cursor-pointer group hover:bg-muted transition-colors duration-200 p-4 flex flex-col overflow-hidden">
      <p className="flex-1 text-[13px] leading-relaxed text-foreground/80 group-hover:text-foreground transition-colors duration-200 overflow-hidden">
        {post.caption}
      </p>
      <div className="flex items-center gap-3 mt-3 text-[11px] text-muted-foreground shrink-0">
        <span className="flex items-center gap-1">
          <Heart className="size-3" />
          {post.likes_count.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="size-3" />
          {post.comments_count.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
