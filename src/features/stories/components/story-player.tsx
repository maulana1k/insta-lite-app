"use client";

import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Send,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AppLogo } from "@/components/layout/header";
import { useStories } from "@/features/feed/hooks/use-feed-query";
import { cn } from "@/lib/utils";
import { useStoryPlayerStore } from "../store/story-player-store";

const STORY_DURATION = 30000; // 30 seconds

export function StoryPlayer() {
  const { isOpen, currentUserIndex, closeStoryPlayer } = useStoryPlayerStore();
  const { data: stories } = useStories();
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentUser = stories?.[currentUserIndex];
  const hasNextStory = currentUserIndex < (stories?.length || 0) - 1;
  const hasPreviousStory = currentUserIndex > 0;

  // Auto-advance to next story after duration
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (STORY_DURATION / 100);

        if (newProgress >= 100) {
          if (hasNextStory) {
            useStoryPlayerStore
              .getState()
              .openStoryPlayer(currentUserIndex + 1, 0);
          } else {
            closeStoryPlayer();
          }
          return 0;
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, currentUserIndex, hasNextStory, isPaused, closeStoryPlayer]);

  // Reset progress when story changes
  useEffect(() => {
    setProgress(0);
  }, [currentUserIndex]);

  // Keyboard navigation and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          closeStoryPlayer();
          break;
        case "ArrowLeft":
          if (hasPreviousStory) {
            useStoryPlayerStore
              .getState()
              .openStoryPlayer(currentUserIndex - 1, 0);
          }
          break;
        case "ArrowRight":
          if (hasNextStory) {
            useStoryPlayerStore
              .getState()
              .openStoryPlayer(currentUserIndex + 1, 0);
          }
          break;
        case " ":
          e.preventDefault();
          setIsPaused((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isOpen,
    currentUserIndex,
    hasNextStory,
    hasPreviousStory,
    closeStoryPlayer,
  ]);

  if (!isOpen || !currentUser) return null;

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-background animate-in ease-in-out duration-100">
      {/* Header */}
      {/* <header className="bg-background border-b border-border">
        <div className="container mx-auto px-8 h-16 flex items-center justify-between max-w-full">
          <AppLogo />
          
          <div className="flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
            {stories?.map((story, idx) => (
              <div
                key={story.id}
                onClick={() => useStoryPlayerStore.getState().openStoryPlayer(idx, 0)}
                className={cn(
                  "flex flex-col items-center gap-1 cursor-pointer transition-opacity",
                  idx === currentUserIndex ? "opacity-100" : "opacity-40 hover:opacity-70"
                )}
              >
                <div className={cn(
                  "relative p-[2px] rounded-full",
                  idx === currentUserIndex ? "bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600" : "bg-muted"
                )}>
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-background">
                    <img
                      src={story.user?.avatar_url}
                      alt={story.user?.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {idx === currentUserIndex && (
                  <span className="text-xs font-medium">{story.user?.username}</span>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={closeStoryPlayer}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </header> */}

      {/* Main Content Area */}
      <div className="absolute inset-0 top-16 flex items-center justify-center py-8 overflow-y-auto">
        {/* Left Preview */}
        {hasPreviousStory && (
          <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
            <div
              onClick={() =>
                useStoryPlayerStore
                  .getState()
                  .openStoryPlayer(currentUserIndex - 1, 0)
              }
              className="w-24 h-40 rounded-lg overflow-hidden cursor-pointer opacity-60 hover:opacity-80 transition-opacity shadow-xl"
            >
              <img
                src={stories[currentUserIndex - 1]?.image_url}
                alt="Previous"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Center Story */}
        <div className="relative w-full max-w-md mx-auto px-4">
          {/* Story Image Container */}
          <div className="relative">
            {/* Progress bar overlay on top of image */}
            <div className="absolute top-2 left-2 right-2 z-10 flex gap-1">
              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Story timestamp */}
            <div className="absolute top-6 left-4 z-10 text-xs text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
              18 hrs ago
            </div>

            {/* Story Image - fixed height */}
            <div className="relative h-[600px] rounded-2xl overflow-hidden bg-muted shadow-2xl">
              <img
                src={currentUser.image_url}
                alt="Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Comment Field - directly below story */}
          <div className="flex items-center gap-3 mt-4 bg-background border border-border rounded-full px-4 py-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-border shrink-0">
              <img
                src="https://github.com/shadcn.png"
                alt="Your avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
            />
            <button className="p-1 hover:bg-muted rounded-full transition-colors">
              <MoreHorizontal size={18} className="text-muted-foreground" />
            </button>
            <button className="p-1 hover:bg-muted rounded-full transition-colors">
              <Send size={18} className="text-muted-foreground" />
            </button>
          </div>

          {/* Emoji Reactions */}
          <div className="flex items-center justify-center gap-3 mt-4 pb-4">
            <button className="text-3xl hover:scale-110 transition-transform">
              👍
            </button>
            <button className="text-3xl hover:scale-110 transition-transform">
              🙌
            </button>
            <button className="text-3xl hover:scale-110 transition-transform">
              💯
            </button>
            <button className="text-3xl hover:scale-110 transition-transform">
              🔥
            </button>
            <button className="text-3xl hover:scale-110 transition-transform">
              👏
            </button>
            <button className="text-3xl hover:scale-110 transition-transform">
              😂
            </button>
            <button className="text-3xl hover:scale-110 transition-transform">
              😮
            </button>
          </div>
        </div>

        {/* Right Preview */}
        {hasNextStory && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
            <div
              onClick={() =>
                useStoryPlayerStore
                  .getState()
                  .openStoryPlayer(currentUserIndex + 1, 0)
              }
              className="w-24 h-40 rounded-lg overflow-hidden cursor-pointer opacity-60 hover:opacity-80 transition-opacity shadow-xl"
            >
              <img
                src={stories[currentUserIndex + 1]?.image_url}
                alt="Next"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {hasPreviousStory && (
          <button
            onClick={() =>
              useStoryPlayerStore
                .getState()
                .openStoryPlayer(currentUserIndex - 1, 0)
            }
            className="absolute left-1/2 -translate-x-1/2 md:left-[calc(50%-280px)] top-1/2 -translate-y-1/2 p-2 text-foreground hover:bg-muted rounded-full transition-colors z-10"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {hasNextStory && (
          <button
            onClick={() =>
              useStoryPlayerStore
                .getState()
                .openStoryPlayer(currentUserIndex + 1, 0)
            }
            className="absolute right-1/2 translate-x-1/2 md:right-[calc(50%-280px)] top-1/2 -translate-y-1/2 p-2 text-foreground hover:bg-muted rounded-full transition-colors z-10"
          >
            <ChevronRight size={32} />
          </button>
        )}
      </div>

      {/* Click zones for mobile navigation */}
      <div className="absolute inset-0 top-16 flex md:hidden pointer-events-none">
        <div
          className="flex-1 cursor-pointer pointer-events-auto"
          onClick={() => {
            if (hasPreviousStory) {
              useStoryPlayerStore
                .getState()
                .openStoryPlayer(currentUserIndex - 1, 0);
            }
          }}
        />
        <div
          className="flex-1 cursor-pointer"
          onClick={() => {
            if (hasNextStory) {
              useStoryPlayerStore
                .getState()
                .openStoryPlayer(currentUserIndex + 1, 0);
            } else {
              closeStoryPlayer();
            }
          }}
        />
      </div>
    </div>
  );
}
