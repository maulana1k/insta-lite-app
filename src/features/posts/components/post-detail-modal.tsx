"use client";

import { useEffect, useState } from "react";
import { useFeedStore } from "@/features/feed/store/feed-store";
import { usePostDetail } from "../hooks/use-post-query";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Smile,
  MoreHorizontal,
  Loader2,
  Minimize,
  Maximize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { AppLogo } from "@/components/layout/header";

export function PostDetailModal() {
  const { activePostId, setActivePostId } = useFeedStore();
  const { data: currentPost, isLoading } = usePostDetail(activePostId);
  const [isCover, setIsCover] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePostId(null);
      }
    };

    if (activePostId) {
      document.body.style.overflow = "hidden";
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePostId, setActivePostId]);


  const handleClose = () => setActivePostId(null);

  if (!activePostId) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-neutral-800/80 backdrop-blur">
      <div className="fixed top-3 left-8 text-white">
        <AppLogo />
      </div>
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute text-white top-4 right-4 z-50 "
        onClick={handleClose}
      >
        <X className="size-8" />
        <span className="sr-only">Close</span>
      </Button>
      {/* Navigation Arrows */}
      <button
        onClick={() => setActivePostId(null)}
        className="top-1/2 -translate-y-1/2 p-2 hidden md:flex bg-background rounded-full"
      >
        <ChevronLeft className="size-6" />
      </button>


      {/* Modal Content */}
      <div className="flex justify-center w-fit max-w-5xl mx-5 gap-4 h-[85vh] bg-background  overflow-hidden">
        {isLoading || !currentPost ? (
          <>
            {/* Skeleton Left: Image Placeholder */}
            <div className="relative flex-1 bg-muted animate-pulse hidden md:block min-w-[500px]" />

            {/* Skeleton Right: Sidebar */}
            <div className="w-[400px] flex flex-col bg-background shrink-0  h-full">
              {/* Header Skeleton */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>

              {/* Comments Skeleton */}
              <div className="flex-1 p-4 space-y-5 overflow-hidden">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-4/5" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Skeleton */}
              <div className="p-4 border-t space-y-3">
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-6 w-6" />
                  </div>
                  <Skeleton className="h-6 w-6" />
                </div>
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-2 w-20" />
              </div>

              {/* Input Skeleton */}
              <div className="p-4 border-t flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-8 flex-1 rounded-md" />
                <Skeleton className="h-6 w-10" />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Left: Image */}
            <div className=" bg-background flex items-center justify-center relative">
              <button
                onClick={() => setIsCover(!isCover)}
                className="absolute flex items-center justify-center h-8 w-8 top-2 right-2 z-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
              >
                {isCover ? <Maximize size={20} /> : <Minimize size={20} />}
              </button>
              <img
                src={currentPost.image_url}
                alt="Post content"
                className={cn("max-h-full max-w-full", isCover ? "w-full h-full object-cover" : "object-contain")}
              />
            </div>

            {/* Right: Sidebar */}
            <div className="w-[400px] flex flex-col order-l bg-background shrink-0">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden ring-1 ring-order">
                    <img
                      src={currentPost.user?.avatar_url}
                      alt={currentPost.user?.username}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold hover:underline cursor-pointer">
                      {currentPost.user?.username}
                    </span>
                    {currentPost.location && (
                      <span className="text-xs text-muted-foreground">
                        {currentPost.location}
                      </span>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>

              {/* Comments List (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Caption (as first comment) */}
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden shrink-0">
                    <img
                      src={currentPost.user?.avatar_url}
                      alt={currentPost.user?.username}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <span className="font-semibold mr-2">
                      {currentPost.user?.username}
                    </span>
                    <span className="text-foreground/90">
                      {currentPost.caption}
                    </span>
                    <div className="mt-1 text-xs text-muted-foreground flex gap-3">
                      <span>
                        {new Date(currentPost.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mock Comments */}
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden shrink-0 bg-muted">
                    <img
                      src="https://i.pravatar.cc/150?u=99"
                      className="h-full w-full"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <span className="font-semibold mr-2">valou_c</span>
                    <span className="text-foreground/90">Incroyable !</span>
                    <div className="mt-1 text-xs text-muted-foreground flex gap-3">
                      <span>3h</span> <span>1 like</span> <span>Reply</span>
                    </div>
                  </div>
                  <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500 cursor-pointer" />
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden shrink-0 bg-muted">
                    <img
                      src="https://i.pravatar.cc/150?u=88"
                      className="h-full w-full"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <span className="font-semibold mr-2">
                      geoffreyyouwehand
                    </span>
                    <span className="text-foreground/90">Haha, funny</span>
                    <div className="mt-1 text-xs text-muted-foreground flex gap-3">
                      <span>5h</span> <span>Likes</span> <span>Reply</span>
                    </div>
                  </div>
                  <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500 cursor-pointer" />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="border-t p-4 space-y-3 bg-background">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Heart className="h-6 w-6 hover:text-red-500 cursor-pointer transition-colors" />
                    <MessageCircle className="h-6 w-6 hover:text-muted-foreground cursor-pointer transition-colors -rotate-90" />
                    <Send className="h-6 w-6 hover:text-muted-foreground cursor-pointer transition-colors" />
                  </div>
                  <Bookmark className="h-6 w-6 hover:text-muted-foreground cursor-pointer transition-colors" />
                </div>

                <div className="text-sm font-semibold">
                  {currentPost.likes_count} likes
                </div>
                <div className="text-[10px] uppercase text-muted-foreground tracking-wide">
                  {new Date(currentPost.created_at).toLocaleDateString(
                    undefined,
                    { month: "long", day: "numeric" },
                  )}
                </div>
              </div>

              {/* Comment Input */}
              <div className="border-t p-4 flex items-center gap-3">
                <Smile className="h-6 w-6 text-muted-foreground cursor-pointer" />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                />
                <button className="text-blue-500 font-semibold text-sm hover:text-blue-700 disabled:opacity-50">
                  Post
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => setActivePostId(null)}
        className="top-1/2 -translate-y-1/2 p-2 hidden md:flex bg-background rounded-full"
      >
        <ChevronRight className="size-6" />
      </button>
    </div>
  );
}
