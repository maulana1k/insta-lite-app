"use client";

import { usePostDetail } from "../hooks/use-post-detail";
import { timeAgo } from "@/lib/time";
import { 
  AltArrowLeft, 
  Heart, 
  ChatRound, 
  Repeat, 
  Plain, 
  MenuDots, 
  VerifiedCheck
} from "@solar-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { PostComment } from "../types";

interface PostDetailProps {
  postId: string;
}

export function PostDetail({ postId }: PostDetailProps) {
  const router = useRouter();
  const { post, comments, isLoading } = usePostDetail(postId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
        <h2 className="text-xl font-semibold mb-2">Post not found</h2>
        <p className="text-muted-foreground mb-4">The post you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => router.back()}
          className="px-6 py-2 bg-foreground text-background rounded-full font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-24">
      {/* Header */}
      <div className="sticky top-[60px] z-10 bg-background/80 backdrop-blur-xl border-b border-border/40 px-4 h-14 flex items-center gap-6">
        <button 
          onClick={() => router.back()}
          className="p-1 -ml-1 hover:bg-muted rounded-full transition-colors"
        >
          <AltArrowLeft className="size-6" />
        </button>
        <h1 className="text-lg font-bold">Post</h1>
      </div>

      {/* Main Post */}
      <div className="px-4 py-4">
        <div className="flex gap-3 mb-4">
          <div className="size-11 rounded-full overflow-hidden border border-border/50 shrink-0">
            <img src={post.user.avatar_url} alt={post.user.username} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[15px]">{post.user.username}</span>
                {post.user.verified && <VerifiedCheck className="size-4 text-blue-500" weight="Bold" />}
              </div>
              <button className="text-muted-foreground hover:text-foreground p-1">
                <MenuDots className="size-5" />
              </button>
            </div>
            <p className="text-muted-foreground text-[13px]">{timeAgo(post.created_at)}</p>
          </div>
        </div>

        <p className="text-[17px] leading-relaxed mb-4 whitespace-pre-wrap">
          {post.content}
        </p>

        {post.image_urls && post.image_urls.length > 0 && (
          <div className="grid gap-2 mb-4">
            {post.image_urls.map((url, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border/50">
                <img src={url} alt="" className="w-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 py-3 border-y border-border/40 text-muted-foreground text-[14px]">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground">{post.likes_count}</span>
            <span>likes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground">{post.comments_count}</span>
            <span>replies</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-around py-2">
          <ActionIconButton icon={Heart} label="Like" />
          <ActionIconButton icon={ChatRound} label="Reply" />
          <ActionIconButton icon={Repeat} label="Repost" />
          <ActionIconButton icon={Plain} label="Send" />
        </div>
      </div>

      {/* Comments Section */}
      <div className="border-t border-border/40 mt-2">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {/* Fixed Bottom Input */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border/40 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 bg-muted/40 px-4 py-2.5 rounded-2xl">
          <img src="https://i.pravatar.cc/150?u=current" alt="" className="size-8 rounded-full border border-border/50" />
          <input 
            type="text" 
            placeholder={`Reply to ${post.user.username}...`}
            className="flex-1 bg-transparent border-none outline-none text-[15px] placeholder:text-muted-foreground/60"
          />
          <button className="text-blue-500 font-bold text-[15px] hover:text-blue-600 transition-colors">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

function CommentItem({ comment }: { comment: PostComment }) {
  return (
    <div className="px-4 py-4 hover:bg-muted/5 transition-colors border-b border-border/20 last:border-none">
      <div className="flex gap-3">
        <div className="size-9 rounded-full overflow-hidden border border-border/50 shrink-0">
          <img src={comment.user.avatar_url} alt={comment.user.username} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[14.5px]">{comment.user.username}</span>
              {comment.user.verified && <VerifiedCheck className="size-3.5 text-blue-500" weight="Bold" />}
              <span className="text-muted-foreground text-[13px]">•</span>
              <span className="text-muted-foreground text-[13px]">{timeAgo(comment.created_at)}</span>
            </div>
            <button className="text-muted-foreground hover:text-foreground">
              <MenuDots className="size-4" />
            </button>
          </div>
          <p className="text-[15px] leading-normal mb-2 whitespace-pre-wrap">
            {comment.content}
          </p>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors group">
              <Heart className="size-[18px]" />
              {comment.likes_count > 0 && <span className="text-[13px] font-medium">{comment.likes_count}</span>}
            </button>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <ChatRound className="size-[18px]" />
              <span className="text-[13px] font-medium">Reply</span>
            </button>
          </div>

          {/* Nested Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-3 border-l-2 border-border/30 pl-3">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionIconButton({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="flex flex-col items-center gap-1 group">
      <div className="p-2.5 rounded-full hover:bg-muted transition-colors group-active:scale-90 duration-100">
        <Icon className="size-[22px] text-foreground" strokeWidth={1.5} />
      </div>
      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-tight">{label}</span>
    </button>
  );
}
