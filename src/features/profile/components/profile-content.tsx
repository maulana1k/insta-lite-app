'use client';

import { useProfilePosts } from '../hooks/use-profile';
import { useProfileStore } from '../store/profile-store';
import { Heart, MessageCircle, Loader2, RefreshCcw, AtSign } from 'lucide-react';
import { Bookmark, GalleryMinimalistic, Widget } from '@solar-icons/react';
import { cn } from '@/lib/utils';
import { Post } from '@/types/database';

type ProfileTab = 'posts' | 'media' | 'repost' | 'bookmark' | 'mentions';

// Solar icons support weight="Bold"; RefreshCcw (Lucide) uses strokeWidth instead
const TABS: { id: ProfileTab; Icon: React.ElementType; solar: boolean; label: string }[] = [
  { id: 'posts', Icon: Widget, solar: true, label: 'Posts' },
  { id: 'media', Icon: GalleryMinimalistic, solar: true, label: 'Media' },
  { id: 'repost', Icon: RefreshCcw, solar: false, label: 'Repost' },
  { id: 'bookmark', Icon: Bookmark, solar: true, label: 'Saved' },
  { id: 'mentions', Icon: AtSign, solar: true, label: 'Mentions' },
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
      <div className="flex gap-4 mb-6">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-label={tab.label}
              className={cn(
                'size-12 rounded-xl flex items-center justify-center transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground/50 hover:text-muted-foreground',
              )}
            >
              <tab.Icon size={24} weight={isActive ? 'Bold' : 'Linear'} />
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-[13px]">
          No posts yet.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
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

function PostHeader({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      {post.user?.avatar_url && (
        <img
          src={post.user.avatar_url}
          alt=""
          className="size-6 rounded-full object-cover"
        />
      )}
      <span className="text-[11px] font-medium text-foreground/60 truncate">
        {post.user?.username}
      </span>
    </div>
  );
}

function PostStats({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-3 text-[11px] text-muted-foreground shrink-0 font-semibold">
      <span className="flex items-center gap-1">
        <Heart className="size-3" />
        {post.likes_count.toLocaleString()}
      </span>
      <span className="flex items-center gap-1">
        <MessageCircle className="size-3" />
        {post.comments_count.toLocaleString()}
      </span>
    </div>
  );
}

function ImagePostCard({ post }: { post: Post }) {
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group">
      {/* Full image */}
      <img
        src={post.image_url}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Hover overlay — fades in */}
      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Content — fades in with overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Avatar + username */}
        <div className="flex items-center gap-2">
          {post.user?.avatar_url && (
            <img
              src={post.user.avatar_url}
              alt=""
              className="size-7 rounded-full object-cover ring-1 ring-white/30"
            />
          )}
          <span className="text-[12px] font-medium text-white/90 truncate">
            {post.user?.username}
          </span>
        </div>

        {/* Caption + stats */}
        <div>
          <p className="text-[13px] leading-snug line-clamp-3 text-white/90 mb-2.5">
            {post.caption}
          </p>
          <div className="flex items-center gap-3 text-[11px] text-white/60">
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
    <div className="aspect-square rounded-2xl bg-muted/60 border border-border/40 cursor-pointer group hover:bg-muted transition-colors duration-200 p-4 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="mb-2.5">
        <PostHeader post={post} />
      </div>

      {/* Caption */}
      <p className="flex-1 text-[15px] leading-relaxed text-foreground/80 group-hover:text-foreground transition-colors duration-200 overflow-hidden">
        {post.caption}
      </p>

      {/* Stats */}
      <div className="mt-3">
        <PostStats post={post} />
      </div>
    </div>
  );
}
