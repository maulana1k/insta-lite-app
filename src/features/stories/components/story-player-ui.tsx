"use client";

import { useEffect, useState } from "react";
import { useStoryPlayerStore } from "../store/story-player-store";
import { useStories } from "@/features/feed/hooks/use-feed-query";
import {
  MoreHorizontal,
  Send,
  X,
} from "lucide-react";
import { AppLogo } from "@/components/layout/header";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Wallpaper } from "@solar-icons/react";

const STORY_DURATION = 15000;

export function StoryPlayerUI() {
  const { isOpen, currentUserIndex, closeStoryPlayer } = useStoryPlayerStore();
  const { data: stories } = useStories();
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentUser = stories?.[currentUserIndex];
  const hasNextStory = currentUserIndex < (stories?.length || 0) - 1;
  const hasPreviousStory = currentUserIndex > 0;

  // Auto-advance to next story after duration
  useEffect(() => {
    if (progress < 100) return;

    if (hasNextStory) {
      useStoryPlayerStore
        .getState()
        .openStoryPlayer(currentUserIndex + 1, 0);
    } else {
      closeStoryPlayer();
    }

    setProgress(0);
  }, [progress, hasNextStory, currentUserIndex, closeStoryPlayer]);


  useEffect(() => {
    if (!isOpen || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / (STORY_DURATION / 100)), 100));
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPaused]);


  // Reset progress when story changes
  useEffect(() => {
    setProgress(0);
  }, [currentUserIndex]);

  // Keyboard navigation and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeStoryPlayer();
      } else if (e.key === 'ArrowLeft' && hasPreviousStory) {
        useStoryPlayerStore.getState().openStoryPlayer(currentUserIndex - 1, 0);
      } else if (e.key === 'ArrowRight' && hasNextStory) {
        useStoryPlayerStore.getState().openStoryPlayer(currentUserIndex + 1, 0);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentUserIndex, hasNextStory, hasPreviousStory, closeStoryPlayer]);

  if (!isOpen) return null;

  const goToPrevious = () => {
    if (hasPreviousStory) {
      useStoryPlayerStore.getState().openStoryPlayer(currentUserIndex - 1, 0);
    }
  };
  const goToNext = () => {
    if (hasNextStory) {
      useStoryPlayerStore.getState().openStoryPlayer(currentUserIndex + 1, 0);
    } else {
      closeStoryPlayer();
    }
  };

  return (
    <div className="fixed inset-0 z-100  items-center justify-center bg-neutral-800/90 backdrop-blur animate-in ease-in-out duration-100">
      <div className="fixed flex items-center gap-2 top-4 left-8 text-white">
        <Wallpaper size={30} />
        <div className="font-bold text-2xl">Stories</div>
      </div>

      <div className="fixed top-5 right-8 text-white">
        <button
          onClick={closeStoryPlayer}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Modal Content */}
      <div className="overflow-y-auto no-scrollbar">

        {/* Center Story */}
        <div className="relative h-screen w-full max-w-md mx-auto px-4 overflow-hidden">
          {/* Story Image Container */}
          <div className="relative flex-1 py-2 aspect-9/16">

            {/* Progress bar overlay on top of image */}
            <div className="absolute top-5 left-3 right-3 z-10 flex gap-1">
              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>


            {/* Story Image - fixed height */}
            <div className="h-full rounded-2xl overflow-hidden bg-muted relative group">
              {/* User Profile Info - Top Left */}
              <div className="absolute top-6 left-3 z-10 flex items-center gap-2">
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarImage src={currentUser?.user?.avatar_url} alt={currentUser?.user?.username} />
                  <AvatarFallback className="bg-muted text-foreground">
                    {currentUser?.user?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white drop-shadow-lg">
                    {currentUser?.user?.username}
                  </span>
                  <span className="text-xs text-white/80 drop-shadow-lg">18 hrs ago</span>
                </div>
              </div>
              <img
                src={currentUser?.image_url}
                alt="Story"
                className="w-full h-full object-cover"
              />

              {/* Comment Field - Overlay */}
              <div className="absolute bottom-2 left-4 right-4 z-20 flex items-center gap-3 bg-neutral-800/20 border border-white/20 rounded-full px-4 py-3">
                <input
                  type="text"
                  placeholder="Send message..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/70"
                />
                <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                  <MoreHorizontal size={20} className="text-white" />
                </button>
                <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                  <Send size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>

        </div>


      </div>

      {/* Previous Story Thumbnail - Left Side */}
      {hasPreviousStory && stories && (
        <button
          className="fixed left-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2 group"
          onClick={goToPrevious}
        >
          <div className="relative w-30 aspect-3/5 rounded-lg overflow-hidden shadow-xl opacity-70 hover:opacity-100 transition-all duration-300 ring-2 ring-white/20 hover:ring-white/40 ">
            <img
              src={stories[currentUserIndex - 1]?.image_url}
              alt="Previous story"
              className="w-full h-full object-cover brightness-50"
            />
            {/* Avatar and Username Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <Avatar className="w-12 h-12 border-2 border-white">
                <AvatarImage src={stories[currentUserIndex - 1]?.user?.avatar_url} alt={stories[currentUserIndex - 1]?.user?.username} />
                <AvatarFallback className="bg-muted text-foreground">
                  {stories[currentUserIndex - 1]?.user?.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-semibold text-white drop-shadow-lg">
                {stories[currentUserIndex - 1]?.user?.username}
              </span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            Previous
          </span>
        </button>
      )}

      {/* Next Story Thumbnail - Right Side */}
      {hasNextStory && stories && (
        <button
          className="fixed right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2 group"
          onClick={goToNext}
        >
          <div className="relative w-30 aspect-3/5 rounded-lg overflow-hidden shadow-xl opacity-70 hover:opacity-100 transition-all duration-300 ring-2 ring-white/20 hover:ring-white/40 ">
            <img
              src={stories[currentUserIndex + 1]?.image_url}
              alt="Next story"
              className="w-full h-full object-cover brightness-50"
            />
            {/* Avatar and Username Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <Avatar className="w-12 h-12 border-2 border-white">
                <AvatarImage src={stories[currentUserIndex + 1]?.user?.avatar_url} alt={stories[currentUserIndex + 1]?.user?.username} />
                <AvatarFallback className="bg-muted text-foreground">
                  {stories[currentUserIndex + 1]?.user?.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-semibold text-white drop-shadow-lg">
                {stories[currentUserIndex + 1]?.user?.username}
              </span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            Next
          </span>
        </button>
      )}
    </div>
  );
}
