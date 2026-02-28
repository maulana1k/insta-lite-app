import { ChatRound, Plain, VerifiedCheck } from "@solar-icons/react";
import {
  ArrowDown,
  AudioWaveform,
  CornerDownRight,
  Ellipsis,
  EllipsisVertical,
  EyeOff,
  Heart,
  RefreshCcw,
  Share,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { timeAgo } from "@/lib/time";
import { MOCK_COMMENTS } from "../api/mock-data";
import type { Post, PostComment } from "../types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showReplies, setShowReplies] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const maxLength = 280;

  return (
    <div className="py-3 hover:bg-muted/5 transition-colors cursor-pointer px-4">
      <div className="flex gap-2">
        {/* Left Column: Avatar + Thread Line */}
        <div className="flex flex-col items-center shrink-0 w-10">
          <div className="relative w-10 h-10 mb-2">
            {post.space ? (
              <>
                <div className="absolute top-0 left-0 w-7 h-7 rounded-md overflow-hidden border border-border/50">
                  <img
                    src={post.space.avatar_url}
                    alt={post.space.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {post.is_anonymous ? (
                  <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                    <EyeOff className="size-3.5 text-muted-foreground" />
                  </div>
                ) : (
                  <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full overflow-hidden border-2 border-background">
                    <img
                      src={post.user.avatar_url}
                      alt={post.user.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </>
            ) : post.is_anonymous ? (
              <div className="w-10 h-10 rounded-full bg-muted border border-border/50 flex items-center justify-center">
                <EyeOff className="size-5 text-muted-foreground" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full overflow-hidden border border-border/50">
                <img
                  src={post.user.avatar_url}
                  alt={post.user.username}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Thread Line - Connecting to repliers */}
          {post.comments_count > 0 && (
            <div className="w-0.5 grow bg-muted-foreground/10 my-1 rounded-full" />
          )}
        </div>

        {/* Right Column: Content */}
        <div className="flex-1 min-w-0 pb-2">
          {/* Header */}
          <div className="flex items-center justify-between -mt-1">
            <div className="flex items-center gap-1.5 ">
              {post.space && (
                <>
                  <span className="font-semibold text-[15px] ">
                    {post.space.name}
                  </span>
                  <span className="text-[15px]">/</span>
                </>
              )}
              {post.is_anonymous ? (
                <span className="font-semibold text-[15px] text-muted-foreground">
                  Member
                </span>
              ) : (
                <>
                  <span className="font-semibold text-[15px] leading-none">
                    {post.user.username}
                  </span>
                  {post.user.verified && (
                    <VerifiedCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-[14px]">
                {timeAgo(post.created_at)}
              </span>
              <button className="text-muted-foreground hover:text-foreground">
                <Ellipsis className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Text Content */}
          <p className="text-[15px] whitespace-pre-wrap mb-4 pt-1 leading-snug text-foreground/90 font-normal">
            {!expanded && post.content.length > maxLength
              ? post.content.slice(0, maxLength).trimEnd() + "... "
              : post.content}
            {!expanded && post.content.length > maxLength && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(true);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                more
              </button>
            )}
          </p>

          {/* Images */}
          {post.image_urls && post.image_urls.length > 0 && (
            <div className="mb-3 w-full overflow-hidden">
              <div
                ref={scrollContainerRef}
                className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar"
              >
                {post.image_urls.map((url, idx) => (
                  <div
                    key={idx}
                    className="shrink-0 snap-start w-full md:w-auto h-64 aspect-4/5 rounded-xl overflow-hidden border border-border bg-muted relative"
                  >
                    <img
                      src={url}
                      alt={`Attachment ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {post.image_urls!.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
                        {idx + 1}/{post.image_urls!.length}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Embedded Repost */}
          {post.repost && <EmbeddedRepost repost={post.repost} />}

          {/* Action Buttons */}
          <div className="flex items-center gap-1 mt-1 -ml-2 pb-3">
            <ActionButton icon={Heart} count={post.likes_count} />
            <ActionButton
              icon={ChatRound}
              count={post.comments_count}
              href={`/post/${post.id}`}
            />
            <ActionButton icon={RefreshCcw} count={post.reposts_count} />
            <ActionButton icon={Share} />
          </div>
        </div>
      </div>

      {/* Show Replies - replier pile + button on the same row */}
      {post.comments_count > 0 && (
        <div className="flex items-center gap-2 pb-2">
          {/* Repliers Pile (commented out)
               <div className="shrink-0 w-10 flex justify-center">
                  {post.repliers_avatars && post.repliers_avatars.length > 0 && (
                     <div className="w-8 h-8 relative">
                        {post.repliers_avatars.slice(0, 2).map((avatar, i) => (
                           <div key={i} className={`absolute w-4 h-4 rounded-full border-2 border-background overflow-hidden ${i === 0 ? 'top-1 right-0 w-5 h-5' : 'bottom-0 left-0'}`}>
                              <img src={avatar} className="w-full h-full object-cover" />
                           </div>
                        ))}
                        {post.repliers_avatars.length > 2 && (
                           <div className="absolute top-0 left-1 w-3 h-3 rounded-full border-2 border-background overflow-hidden">
                              <img src={post.repliers_avatars[2]} className="w-full h-full object-cover" />
                           </div>
                        )}
                     </div>
                  )}
               </div>
               */}
          {/* Plus Icon */}
          <div className="shrink-0 w-10 flex justify-center">
            {/* <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-background" />
                     </svg> */}
            {/* <div className="w-4 h-4 rounded-full bg-foreground/50 flex items-center justify-center">
                     <ArrowDown strokeWidth={3} className="w-3 h-3 text-background" />
                  </div> */}
            {showReplies ? (
              <EllipsisVertical
                strokeWidth={3}
                className="size-5 text-muted-foreground/20"
              />
            ) : (
              <AudioWaveform
                strokeWidth={3}
                className="size-5 text-muted-foreground/20 rotate-90"
              />
            )}
          </div>
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-[14px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {showReplies ? "Hide replies" : `Show replies`}
          </button>
        </div>
      )}

      {/* Expanded Replies */}
      {showReplies && (
        <div className="mt-1">
          {(MOCK_COMMENTS[post.id] || []).map((comment) => (
            <InlineComment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmbeddedRepost({ repost }: { repost: Post }) {
  const maxLen = 200;
  const truncated =
    repost.content.length > maxLen
      ? repost.content.slice(0, maxLen).trimEnd() + "..."
      : repost.content;

  return (
    <div className="mb-3 rounded-2xl border border-border p-3 hover:bg-muted/30 transition-colors cursor-pointer">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
          <img
            src={repost.user.avatar_url}
            alt={repost.user.username}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-semibold text-[13px]">
          {repost.user.username}
        </span>
        {repost.user.verified && (
          <VerifiedCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />
        )}
        {repost.space && (
          <span className="text-[12px] text-muted-foreground">
            in {repost.space.name}
          </span>
        )}
        <span className="text-[12px] text-muted-foreground">
          &middot; {timeAgo(repost.created_at)}
        </span>
      </div>
      <p className="text-[14px] whitespace-pre-wrap leading-snug text-foreground/80">
        {truncated}
      </p>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  count,
  href,
}: {
  icon: any;
  count?: number;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-1.5 px-2 py-1.5 -my-1.5 rounded-full hover:bg-muted/80 transition-colors group cursor-pointer">
      <Icon className="w-[20px] h-[20px] text-foreground/70" strokeWidth={2} />
      {count !== undefined && count > 0 && (
        <span className="text-[13px] font-medium text-foreground/70 tabular-nums">
          {formatCount(count)}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="muted-foreground">
        {content}
      </Link>
    );
  }

  return <button className="muted-foreground">{content}</button>;
}

function formatCount(count: number): string {
  if (count >= 1_000_000)
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (count >= 1_000)
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return count.toString();
}

function InlineComment({
  comment,
  isReply = false,
}: {
  comment: PostComment;
  isReply?: boolean;
}) {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className={`flex gap-2.5 ${isReply ? "py-1.5" : "py-2"} px-1`}>
      {/* Avatar */}
      <div
        className={`rounded-full overflow-hidden shrink-0 ${isReply ? "w-6 h-6" : "size-8"}`}
      >
        <img
          src={comment.user.avatar_url}
          alt={comment.user.username}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-[15px] leading-snug -mt-0.5">
          <span className="font-semibold">{comment.user.username}</span>
          {comment.user.verified && (
            <VerifiedCheck className="w-3 h-3 text-blue-500 inline ml-0.5 -mt-0.5" />
          )}{" "}
          <span className="text-foreground/90 font-normal">
            {comment.content}
          </span>
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
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

        {/* View replies */}
        {comment.replies && comment.replies.length > 0 && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-2 mt-2 text-[12px] text-muted-foreground font-semibold hover:text-foreground transition-colors"
          >
            <div className="w-5 h-px bg-muted-foreground/50" />
            {showReplies
              ? "Hide replies"
              : `View replies (${comment.replies.length})`}
          </button>
        )}

        {showReplies && comment.replies && (
          <div className="mt-0.5">
            {comment.replies.map((reply) => (
              <InlineComment key={reply.id} comment={reply} isReply />
            ))}
          </div>
        )}
      </div>

      {/* Heart on the right */}
      <button className="shrink-0 text-muted-foreground hover:text-red-500 transition-colors self-start mt-1">
        <Heart className="w-3 h-3" />
      </button>
    </div>
  );
}
