'use client';

import { usePostDetail } from '../hooks/use-post-detail';
import { USER_PROFILES, MOCK_POSTS } from '../api/mock-data';
import { VerifiedCheck } from '@solar-icons/react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Heart, ChatRound } from '@solar-icons/react';

function formatCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return count.toString();
}

interface AuthorSidebarProps {
  postId: string;
}

export function AuthorSidebar({ postId }: AuthorSidebarProps) {
  const { post, isLoading } = usePostDetail(postId);

  if (isLoading) {
    return <AuthorSidebarSkeleton />;
  }

  if (!post) return null;

  const profile = USER_PROFILES[post.user_id];
  if (!profile) return null;

  // Find similar posts: same topic, or same author, excluding current post
  const similarPosts = MOCK_POSTS
    .filter((p) => p.id !== post.id)
    .filter((p) => (post.space && p.space?.id === post.space.id) || p.user_id === post.user_id)
    .slice(0, 3);

  return (
    <div className="hidden xl:block w-80 shrink-0 sticky top-24 h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
      {/* Author Profile Card */}
      <div className="bg-muted dark:bg-muted/50 rounded-4xl p-5 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-12 rounded-full overflow-hidden shrink-0">
            <img
              src={post.user.avatar_url}
              alt={post.user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[15px] truncate">{post.user.username}</span>
              {post.user.verified && (
                <VerifiedCheck className="size-4 text-blue-500 shrink-0" weight="Bold" />
              )}
            </div>
            <p className="text-[13px] text-muted-foreground">{post.user.full_name}</p>
          </div>
        </div>

        {profile.bio && (
          <p className="text-[13px] text-foreground/80 leading-relaxed mb-3">{profile.bio}</p>
        )}

        <div className="flex items-center gap-4 mb-4 text-[13px]">
          <span>
            <span className="font-bold">{formatCount(profile.followers_count)}</span>{' '}
            <span className="text-muted-foreground">followers</span>
          </span>
          <span>
            <span className="font-bold">{formatCount(profile.following_count)}</span>{' '}
            <span className="text-muted-foreground">following</span>
          </span>
        </div>
        <div className="flex gap-2">
          <button className="w-full py-2 bg-blue-500 text-white rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity">
            Follow
          </button>
          <button className="w-full py-2 bg-border rounded-xl text-[13px] font-semibold hover:opacity-70 transition-opacity">
            Message
          </button>
        </div>
      </div>

      {/* Similar Posts */}
      {similarPosts.length > 0 && (
        <div>
          <h3 className="font-bold text-[15px] px-1 mb-3">Similar posts</h3>
          <div className="flex flex-col gap-1">
            {similarPosts.map((p) => (
              <Link
                key={p.id}
                href={`/post/${p.id}`}
                className="block p-3 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="size-5 rounded-full overflow-hidden shrink-0">
                    <img src={p.user.avatar_url} alt={p.user.username} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[12px] font-medium text-muted-foreground truncate">
                    {p.user.username}
                  </span>
                  {p.space && (
                    <>
                      <span className="text-[12px] text-muted-foreground">in</span>
                      <span className="text-[12px] font-medium text-muted-foreground truncate">
                        {p.space.name}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-[13px] leading-snug line-clamp-2 mb-2">
                  {p.content}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="size-3" />
                    {formatCount(p.likes_count)}
                  </span>
                  <span className="flex items-center gap-1">
                    <ChatRound className="size-3" />
                    {formatCount(p.comments_count)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AuthorSidebarSkeleton() {
  return (
    <div className="hidden xl:block w-80 shrink-0 sticky top-24">
      <div className="bg-secondary rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <Skeleton className="size-12 rounded-full shrink-0" />
          <div className="flex-1">
            <Skeleton className="h-4 w-28 mb-1.5" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-3 w-full mb-1.5" />
        <Skeleton className="h-3 w-3/4 mb-3" />
        <div className="flex gap-4 mb-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-9 w-full rounded-full" />
      </div>

      <Skeleton className="h-4 w-24 mb-3 mx-1" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <Skeleton className="size-5 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-3 w-4/5 mb-2" />
          <div className="flex gap-3">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
