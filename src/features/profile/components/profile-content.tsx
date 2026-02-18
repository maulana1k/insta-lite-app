'use client';

import { useProfilePosts } from '../hooks/use-profile';
import { useProfileStore } from '../store/profile-store';
import { Heart, MessageCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Post } from '@/types/database';

type ProfileTab = 'posts' | 'media' | 'repost' | 'bookmark';

const TABS: { id: ProfileTab; label: string }[] = [
  { id: 'posts', label: 'Posts' },
  { id: 'media', label: 'Media' },
  { id: 'repost', label: 'Repost' },
  { id: 'bookmark', label: 'Bookmark' },
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
      {/* Tabs — top left, underline style */}
      <div className="flex gap-0 mb-4 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative px-4 py-2.5 text-[13px] font-semibold transition-colors',
              activeTab === tab.id
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground/70',
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-foreground rounded-full" />
            )}
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
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* gradient — always visible at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* text content */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white text-[11px] leading-snug line-clamp-2 group-hover:line-clamp-none transition-all duration-200">
          {post.caption}
        </p>
        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
  );
}

function TextPostCard({ post }: { post: Post }) {
  return (
    <div className="relative aspect-square rounded-xl bg-muted/50 border border-border/40 overflow-hidden cursor-pointer group hover:bg-muted transition-colors duration-200 p-3 flex flex-col">
      <p className="flex-1 text-[11px] leading-snug text-foreground/75 group-hover:text-foreground transition-colors duration-200 overflow-hidden">
        {post.caption}
      </p>
      <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground shrink-0">
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
