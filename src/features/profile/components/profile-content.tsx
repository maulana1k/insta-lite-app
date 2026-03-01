"use client";

import { Bookmark, GalleryMinimalistic, Widget } from "@solar-icons/react";
import {
  AtSign,
  Heart,
  Loader2,
  MessageCircle,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserPostsPage } from "@/features/users/api";
import { useProfilePosts } from "../hooks/use-profile";
import { useProfileStore } from "../store/profile-store";

type ApiPost = UserPostsPage["results"][number];

type ProfileTab = "posts" | "media" | "repost" | "bookmark" | "mentions";

const TABS: {
  id: ProfileTab;
  Icon: React.ElementType;
  solar: boolean;
  label: string;
}[] = [
  { id: "posts", Icon: Widget, solar: true, label: "Posts" },
  { id: "media", Icon: GalleryMinimalistic, solar: true, label: "Media" },
  { id: "repost", Icon: RefreshCcw, solar: false, label: "Repost" },
  { id: "bookmark", Icon: Bookmark, solar: true, label: "Saved" },
  { id: "mentions", Icon: AtSign, solar: true, label: "Mentions" },
];

interface ProfileContentProps {
  username: string;
}

export function ProfileContent({ username }: ProfileContentProps) {
  const { data, isLoading } = useProfilePosts(username);
  const { activeTab, setActiveTab } = useProfileStore();

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const allPosts: ApiPost[] = (data?.pages.flatMap((p) => p.results) ?? []).filter(Boolean);

  const filtered = allPosts.filter((post) => {
    if (activeTab === "media") return (post.media_urls ?? []).length > 0;
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
                "size-12 rounded-xl flex items-center justify-center transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground/50 hover:text-muted-foreground",
              )}
            >
              <tab.Icon size={24} weight={isActive ? "Bold" : "Linear"} />
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
            (post.media_urls ?? []).length > 0 ? (
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

function PostStats({ post }: { post: ApiPost }) {
  return (
    <div className="flex items-center gap-3 text-[11px] text-muted-foreground shrink-0 font-semibold">
      <span className="flex items-center gap-1">
        <Heart className="size-3" />
        {post.like_count.toLocaleString()}
      </span>
      <span className="flex items-center gap-1">
        <MessageCircle className="size-3" />
        {post.comment_count.toLocaleString()}
      </span>
    </div>
  );
}

function ImagePostCard({ post }: { post: ApiPost }) {
  return (
    <div className="aspect-square rounded-2xl bg-muted/60 border border-border/40 cursor-pointer group hover:bg-muted transition-colors duration-200 overflow-hidden flex flex-col">
      {/* Image — fills space */}
      <div className="flex-1 min-h-0 w-full overflow-hidden">
        <img
          src={(post.media_urls ?? [])[0]}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 px-3 py-2.5 text-[11px] text-muted-foreground font-semibold">
        <span className="flex items-center gap-1">
          <Heart className="size-3" />
          {post.like_count.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="size-3" />
          {post.comment_count.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function TextPostCard({ post }: { post: ApiPost }) {
  return (
    <div className="aspect-square rounded-2xl bg-muted/60 border border-border/40 cursor-pointer group hover:bg-muted transition-colors duration-200 p-4 flex flex-col overflow-hidden">
      {/* Stats */}
      <div className="mt-auto">
        <PostStats post={post} />
      </div>
    </div>
  );
}
