"use client";

import { VerifiedCheck } from "@solar-icons/react";
import { Heart, MessageCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import {
  TRENDING_HASHTAGS,
  TRENDING_TOPICS,
} from "@/features/discover/api/mock-data";
import { MOCK_POSTS } from "@/features/post/api/mock-data";
import type { Post } from "@/features/post/types";
import { SPACES } from "@/features/space/api/mock-data";
import { timeAgo } from "@/lib/time";

function formatCount(count: number): string {
  if (count >= 1_000_000)
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (count >= 1_000)
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return count.toString();
}

export function DiscoverFeed() {
  // Sort by engagement (likes + comments) for "trending"
  const trending = [...MOCK_POSTS].sort(
    (a, b) =>
      b.likes_count + b.comments_count - (a.likes_count + a.comments_count),
  );

  const heroPost = trending[0];
  const topPosts = trending.slice(1, 4);
  const morePosts = trending.slice(4, 12);

  // Group posts by space for category sections
  const topicGroups = SPACES.slice(0, 4)
    .map((space) => ({
      topic: space,
      posts: MOCK_POSTS.filter((p) => p.space?.id === space.id).slice(0, 3),
    }))
    .filter((g) => g.posts.length > 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero + Trending Topics + Trending Sekarang row */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr] gap-6 mb-8">
        {/* Left - hero featured post */}
        <div>
          <HeroCard post={heroPost} />
        </div>
        {/* Right - trending sekarang ranked posts */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[13px] text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="size-4" />
            Trending sekarang
          </h3>
          {topPosts.map((post, i) => (
            <CompactCard key={post.id} post={post} rank={i + 1} />
          ))}
        </div>
        {/* Center - trending topics list */}
        <div className="hidden lg:block w-52">
          <h3 className="font-bold text-[13px] text-muted-foreground uppercase tracking-wider mb-4">
            Topik Populer
          </h3>
          <div className="flex flex-col gap-0.5">
            {TRENDING_TOPICS.map((topic, i) => (
              <button
                key={topic.label}
                className="flex items-center justify-between py-2 text-left group hover:opacity-70 transition-opacity"
              >
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold truncate">
                    {topic.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {topic.category} · {formatCount(topic.posts_count)} posts
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trending tags row */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
        {TRENDING_HASHTAGS.map((tag) => (
          <button
            key={tag.tag}
            className="px-4 py-2 bg-secondary rounded-full text-[13px] font-medium whitespace-nowrap hover:bg-muted transition-colors"
          >
            {tag.tag}
          </button>
        ))}
        {SPACES.map((space) => (
          <button
            key={space.id}
            className="px-4 py-2 bg-secondary rounded-full text-[13px] font-medium whitespace-nowrap hover:bg-muted transition-colors"
          >
            {space.name}
          </button>
        ))}
      </div>

      {/* More stories grid */}
      <div className="mb-10">
        <h2 className="font-bold text-xl mb-5">Jelajahi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {morePosts.map((post) => (
            <GridCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Topic sections */}
      {topicGroups.map(({ topic, posts }) => (
        <div key={topic.id} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="size-8 rounded-lg overflow-hidden">
              <img
                src={topic.avatar_url}
                alt={topic.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-bold text-lg">{topic.name}</h2>
            <span className="text-[12px] text-muted-foreground">
              {formatCount(topic.posts_count)} posts
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <GridCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function HeroCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="block p-6 bg-secondary rounded-2xl hover:bg-muted/60 transition-colors h-full"
    >
      {post.space && (
        <div className="flex items-center gap-2 mb-3">
          <div className="size-5 rounded overflow-hidden">
            <img
              src={post.space.avatar_url}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[12px] font-semibold text-muted-foreground">
            {post.space.name}
          </span>
        </div>
      )}
      <p className="text-xl font-bold leading-snug mb-4 line-clamp-4">
        {post.content}
      </p>
      <div className="mb-4 rounded-xl overflow-hidden h-70">
        <img
          src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-full overflow-hidden">
            <img
              src={post.user.avatar_url}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[13px] font-medium">{post.user.username}</span>
          {post.user.verified && (
            <VerifiedCheck className="size-3.5 text-blue-500" weight="Bold" />
          )}
          <span className="text-[12px] text-muted-foreground">
            &middot; {timeAgo(post.created_at)}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Heart className="size-3" />
            {formatCount(post.likes_count)}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="size-3" />
            {formatCount(post.comments_count)}
          </span>
        </div>
      </div>
    </Link>
  );
}

function CompactCard({ post, rank }: { post: Post; rank: number }) {
  return (
    <Link href={`/post/${post.id}`} className="flex gap-3 group">
      <span className="text-3xl font-bold text-muted-foreground/30 shrink-0 w-7 text-right leading-none mt-0.5">
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="size-4 rounded-full overflow-hidden">
            <img
              src={post.user.avatar_url}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[12px] font-medium truncate">
            {post.user.username}
          </span>
          <span className="text-[11px] text-muted-foreground">
            &middot; {timeAgo(post.created_at)}
          </span>
        </div>
        <p className="text-[14px] font-semibold leading-snug line-clamp-2 group-hover:text-foreground/80 transition-colors">
          {post.content}
        </p>
        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
          <span>{formatCount(post.likes_count)} likes</span>
          <span>{formatCount(post.comments_count)} replies</span>
        </div>
      </div>
    </Link>
  );
}

function GridCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="flex flex-col p-4 bg-secondary rounded-2xl hover:bg-muted/60 transition-colors"
    >
      <div className="flex items-center gap-2 mb-2.5">
        <div className="size-6 rounded-full overflow-hidden">
          <img
            src={post.user.avatar_url}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-[12px] font-medium truncate">
          {post.user.username}
        </span>
        {post.user.verified && (
          <VerifiedCheck className="size-3 text-blue-500" weight="Bold" />
        )}
      </div>
      <p className="text-[14px] font-semibold leading-snug line-clamp-3 mb-3 flex-1">
        {post.content}
      </p>
      {post.space && (
        <span className="text-[11px] text-muted-foreground font-medium mb-2">
          {post.space.name}
        </span>
      )}
      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-auto">
        <span>{formatCount(post.likes_count)} likes</span>
        <span>&middot;</span>
        <span>{timeAgo(post.created_at)}</span>
      </div>
    </Link>
  );
}
