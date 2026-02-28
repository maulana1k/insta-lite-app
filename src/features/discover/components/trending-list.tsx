"use client";

import { VerifiedCheck } from "@solar-icons/react";
import { TrendingUp } from "lucide-react";
import { TRENDING_HASHTAGS, TRENDING_POSTS } from "../api/mock-data";

function formatCount(count: number): string {
  if (count >= 1_000_000)
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (count >= 1_000)
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return count.toString();
}

export function TrendingList() {
  return (
    <div className="hidden xl:flex flex-col w-80 h-fit sticky top-24 shrink-0 gap-5">
      {/* Trending Sekarang */}
      <div className="px-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="size-4 text-muted-foreground" />
          <h3 className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground">
            Trending Sekarang
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          {TRENDING_POSTS.map((post) => (
            <button
              key={post.rank}
              className="flex gap-3 text-left group hover:opacity-70 transition-opacity"
            >
              {/* Rank number */}
              <span className="text-[28px] font-bold text-muted-foreground/30 leading-none pt-0.5 w-6 shrink-0 tabular-nums">
                {post.rank}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Author */}
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="size-5 rounded-full overflow-hidden shrink-0">
                    <img
                      src={post.user.avatar_url}
                      alt={post.user.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[13px] font-medium truncate">
                    {post.user.username}
                  </span>
                  {post.user.verified && (
                    <VerifiedCheck
                      className="size-3.5 text-blue-500 shrink-0"
                      weight="Bold"
                    />
                  )}
                  <span className="text-[12px] text-muted-foreground">
                    {" "}
                    · {post.timestamp}
                  </span>
                </div>

                {/* Post text */}
                <p className="text-[13px] leading-snug line-clamp-2 text-foreground/90">
                  {post.content}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[11px] text-muted-foreground">
                    {formatCount(post.likes_count)} likes
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {formatCount(post.replies_count)} replies
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hashtag pills — horizontal scroll */}
      <div className="overflow-hidden">
        <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar">
          {TRENDING_HASHTAGS.map((item) => (
            <button
              key={item.tag}
              className="shrink-0 px-3.5 py-1.5 rounded-full border border-border text-[13px] font-medium hover:bg-muted/50 transition-colors"
            >
              {item.tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
