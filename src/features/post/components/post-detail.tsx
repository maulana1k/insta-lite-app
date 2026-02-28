"use client";

import {
  AltArrowRight,
  ChatRound,
  Plain,
  VerifiedCheck,
} from "@solar-icons/react";
import { ArrowLeft, Heart, RefreshCcw, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { timeAgo } from "@/lib/time";
import { cn } from "@/lib/utils";
import { usePostDetail } from "../hooks/use-post-detail";
import type { PostComment } from "../types";

interface PostDetailProps {
  postId: string;
}

export function PostDetail({ postId }: PostDetailProps) {
  const router = useRouter();
  const { post, comments, isLoading } = usePostDetail(postId);
  const [sortBy, setSortBy] = useState<"top" | "recent">("top");
  const [replyText, setReplyText] = useState("");
  const [replyFocused, setReplyFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
        <h2 className="text-xl font-semibold mb-2">Post not found</h2>
        <p className="text-muted-foreground mb-4">
          The post you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-foreground text-background rounded-full font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "top") return b.likes_count - a.likes_count;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const handleTextareaInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  return (
    <div className="pb-12">
      {/* Back Button Header */}
      <div className="px-4 py-3 flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className=" flex items-center gap-3 text-muted-foreground hover:text-foreground rounded-full transition-colors"
        >
          <ArrowLeft className="size-5" />
          <span className="font-semibold text-[15px]">Post</span>
        </button>
      </div>

      {/* Main Post */}
      <div className="px-4 pb-4">
        {/* Avatar + User Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-full overflow-hidden border border-border/50 shrink-0">
            <img
              src={post.user.avatar_url}
              alt={post.user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[15px]">
                {post.user.username}
              </span>
              {post.user.verified && (
                <VerifiedCheck className="size-4 text-blue-500" weight="Bold" />
              )}
            </div>
            <p className="text-muted-foreground text-[13px]">
              {timeAgo(post.created_at)}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <p className="text-[15px] leading-relaxed mb-4 whitespace-pre-wrap">
          {post.content}
        </p>

        {post.image_urls && post.image_urls.length > 0 && (
          <div className="grid gap-2 mb-4">
            {post.image_urls.map((url, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-border/50"
              >
                <img src={url} alt="" className="w-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Action Icons - icons only, no counts */}
        <div className="flex items-center gap-1 -ml-2 mb-3">
          <ActionButton icon={Heart} />
          <ActionButton icon={ChatRound} />
          <ActionButton icon={RefreshCcw} />
          <ActionButton icon={Plain} />
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-[13px] text-muted-foreground mb-5">
          <div className="flex items-center gap-1">
            <button className="font-semibold hover:underline cursor-pointer">
              {formatCount(post.likes_count)} likes
            </button>
            <span>&middot;</span>
            <button className="font-semibold hover:underline cursor-pointer">
              {formatCount(post.comments_count)} replies
            </button>
            <span>&middot;</span>
            <button className="font-semibold hover:underline cursor-pointer">
              {formatCount(post.reposts_count)} reposts
            </button>
          </div>
          <button className="font-semibold hover:underline cursor-pointer">
            {formatCount(post.views_count)} views
          </button>
        </div>

        {/* Reply Input */}
        <div className="mb-5">
          <div
            className={cn(
              "border border-border rounded-3xl px-4 pt-3 pb-2 transition-colors bg-secondary/50",
              replyFocused && "border-foreground/30",
            )}
          >
            <textarea
              ref={textareaRef}
              value={replyText}
              onChange={(e) => {
                setReplyText(e.target.value);
                handleTextareaInput();
              }}
              onFocus={() => setReplyFocused(true)}
              onBlur={() => {
                if (!replyText) setReplyFocused(false);
              }}
              placeholder={`Add a reply to ${post.user.username}`}
              rows={1}
              className="w-full text-[14px] bg-transparent placeholder:text-muted-foreground outline-none resize-none leading-none"
            />
            {(replyFocused || replyText) && (
              <div className="flex justify-end my-2">
                <button
                  disabled={!replyText.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-background rounded-full text-[13px] font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                  Reply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3 mb-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-[14px] text-muted-foreground hover:text-foreground transition-colors outline-none">
              <span>Sort by:</span>
              <span className="font-semibold text-foreground">
                {sortBy === "top" ? "Top" : "Recent"}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => setSortBy("top")}
                className={cn(sortBy === "top" && "font-semibold")}
              >
                Top
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("recent")}
                className={cn(sortBy === "recent" && "font-semibold")}
              >
                Recent
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Comments Section */}
      <div>
        {sortedComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon }: { icon: any }) {
  return (
    <button className="flex items-center gap-1.5 px-2 py-1.5 -my-1.5 rounded-full hover:bg-muted/80 transition-colors group cursor-pointer text-foreground/70">
      <Icon className="w-[20px] h-[20px]" strokeWidth={2} />
    </button>
  );
}

function formatCount(count: number): string {
  if (count >= 1_000_000)
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (count >= 1_000)
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return count.toString();
}

function PostDetailSkeleton() {
  return (
    <div className="pb-12">
      {/* Back Button Header */}
      <div className="px-4 py-3 flex items-center gap-2">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="h-4 w-10" />
      </div>

      {/* Main Post */}
      <div className="px-4 pb-4">
        {/* Avatar + User Info */}
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="size-10 rounded-full shrink-0" />
          <div className="flex-1">
            <Skeleton className="h-4 w-28 mb-1.5" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3 mb-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="size-5 rounded-full" />
          ))}
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mb-5">
          <Skeleton className="h-3 w-56" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Reply Input */}
        <Skeleton className="h-11 w-full rounded-2xl mb-5" />

        {/* Sort Dropdown */}
        <Skeleton className="h-4 w-24 mb-4" />
      </div>

      {/* Comments */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="px-4 py-3">
          <div className="flex gap-3">
            <Skeleton className="size-9 rounded-full shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-3.5 w-24 mb-2" />
              <Skeleton className="h-3.5 w-full mb-1" />
              <Skeleton className="h-3.5 w-3/4 mb-2" />
              <div className="flex gap-3">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-10" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CommentItem({
  comment,
  isReply = false,
}: {
  comment: PostComment;
  isReply?: boolean;
}) {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className={cn("px-4 py-3", isReply && "ml-11 px-0")}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div className={cn("rounded-full overflow-hidden shrink-0 size-8")}>
          <img
            src={comment.user.avatar_url}
            alt={comment.user.username}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="text-[14px]">
            <div className="font-semibold leading-none">
              {comment.user.username}
              {comment.user.verified && (
                <VerifiedCheck
                  className="size-3.5 text-blue-500 inline ml-1 -mt-0.5"
                  weight="Bold"
                />
              )}
              <AltArrowRight
                weight="Bold"
                className="size-3.5 text-muted-foreground inline ml-1 -mt-0.5"
              />
            </div>
            <div className="text-foreground/90 font-normal">
              {comment.content}
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-1.5 text-[12px] text-muted-foreground">
            <span>{timeAgo(comment.created_at)}</span>
            {comment.likes_count > 0 && (
              <span className="font-semibold">
                {formatCount(comment.likes_count)} likes
              </span>
            )}
            <button className="font-semibold hover:text-foreground transition-colors">
              Reply
            </button>
          </div>

          {/* View replies toggle */}
          {comment.replies && comment.replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-2 mt-2 text-[13px] text-muted-foreground font-semibold hover:text-foreground transition-colors"
            >
              <div className="w-6 h-px bg-muted-foreground/50" />
              {showReplies
                ? "Hide replies"
                : `View replies (${comment.replies.length})`}
            </button>
          )}

          {/* Nested replies */}
        </div>

        {/* Heart icon on the right */}
        <button className="shrink-0 text-muted-foreground hover:text-red-500 transition-colors self-start mt-1">
          <Heart className="size-4.5" />
        </button>
      </div>
      {showReplies && comment.replies && (
        <div className="mt-1">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  );
}
