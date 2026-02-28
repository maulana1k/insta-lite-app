"use client";

import { Plain } from "@solar-icons/react";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Play,
  Plus,
  Send,
  Smile,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppLogo } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useVideoDetail } from "../hooks/use-video-detail";
import { useVideos } from "../hooks/use-videos";
import { useVideosStore } from "../store/videos-store";

export function VideoDetailModal() {
  const { activeVideoId, setActiveVideoId } = useVideosStore();

  const { data: videos, isLoading } = useVideos();
  const { data: currentVideo } = useVideoDetail(activeVideoId);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);

  // Handle video loading and playback when video changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentVideo?.video_url) return;

    // Reset video state
    video.load();
    setIsPlaying(true);

    // Auto-play when video is loaded
    const handleCanPlay = () => {
      video.play().catch((error) => {
        console.error("Error playing video:", error);
        setIsPlaying(false);
      });
    };

    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [currentVideo?.id, currentVideo?.video_url]);

  const currentIndex = useMemo(() => {
    if (!videos || !activeVideoId) return -1;
    return videos.findIndex((video) => video.id === activeVideoId);
  }, [videos, activeVideoId]);

  const prevVideo =
    currentIndex > 0 && videos ? videos[currentIndex - 1] : null;
  const nextVideo =
    videos && currentIndex >= 0 && currentIndex < videos.length - 1
      ? videos[currentIndex + 1]
      : null;

  const handleClose = () => {
    setActiveVideoId(null);
    window.history.pushState(null, "", "/videos");
  };

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleToggleComments = () => {
    setShowComments((prev) => !prev);
  };

  function handlePrev() {
    if (prevVideo) {
      setActiveVideoId(prevVideo.id);
    }
  }

  function handleNext() {
    if (nextVideo) {
      setActiveVideoId(nextVideo.id);
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
      if (e.key === " ") {
        handleTogglePlay();
      }
      if (!videos || !activeVideoId) return;
      if (e.key === "ArrowRight") {
        handleNext();
      }
      if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    if (activeVideoId) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideoId, videos, setActiveVideoId]);

  useEffect(() => {
    if (!activeVideoId) return;
    // side effects
  }, [activeVideoId]);

  if (!activeVideoId) {
    return null; // ✅ SAFE here
  }
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-lg">
      <div className="fixed top-3 left-8">
        <AppLogo />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 hover:bg-transparent"
        onClick={handleClose}
      >
        <X className="size-8 text-white" />
        <span className="sr-only">Close</span>
      </Button>

      {/* Left edge preview */}
      {prevVideo && (
        <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={handlePrev}
            className="group relative aspect-9/16 w-24 overflow-hidden rounded-lg border border-white/10 bg-black/40 hover:border-white/40 transition-colors"
          >
            <img
              src={prevVideo.thumbnail_url}
              alt={prevVideo.title}
              className="h-full w-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </button>
        </div>
      )}

      {/* Right edge preview */}
      {nextVideo && (
        <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={handleNext}
            className="group relative aspect-9/16 w-24 overflow-hidden rounded-lg border border-white/10 bg-black/40 hover:border-white/40 transition-colors"
          >
            <img
              src={nextVideo.thumbnail_url}
              alt={nextVideo.title}
              className="h-full w-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </button>
        </div>
      )}

      {/* Center content: video player + actions + comments */}
      <div className="relative flex items-center justify-center w-full h-[calc(100vh-40px)] overflow-hidden">
        {/* Video player + actions container - centered initially, shifts left when comments open */}
        <div
          className={`relative flex items-end gap-3 transition-transform duration-300 ease-out z-30 ${
            showComments ? "-translate-x-[13dvw]" : "translate-x-0"
          }`}
        >
          {/* Video player */}
          <div
            className={cn(
              "relative flex items-center justify-center rounded-xl bg-muted shadow-2xl overflow-hidden aspect-9/15 h-[calc(100vh-40px)]",
              currentVideo && currentVideo.video_url
                ? "animate-none"
                : "animate-pulse",
            )}
          >
            {isLoading ? (
              <VideoSkeleton />
            ) : currentVideo && currentVideo.video_url ? (
              <video
                ref={videoRef}
                src={currentVideo.video_url}
                className="h-full w-auto object-cover cursor-pointer"
                autoPlay
                loop
                playsInline
                muted={isMuted}
                onClick={handleTogglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onLoadedData={() => {
                  const video = videoRef.current;
                  if (video && isPlaying) {
                    video.play().catch(() => {
                      setIsPlaying(false);
                    });
                  }
                }}
                onError={(e) => {
                  console.error("Error loading video:", e);
                  setIsPlaying(false);
                }}
              />
            ) : (
              <img
                src={currentVideo?.thumbnail_url}
                alt={currentVideo?.title}
                className="h-full w-auto object-cover"
              />
            )}

            {/* Caption overlay */}
            {currentVideo && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-5 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-tight">
                      {currentVideo.user.username}
                    </span>
                    <span className="text-[11px] text-white/70">
                      {new Date(currentVideo.created_at).toLocaleDateString(
                        undefined,
                        { month: "long", day: "numeric" },
                      )}
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-snug line-clamp-3">
                  {currentVideo.title}
                </p>
              </div>
            )}

            {/* Play indicator */}
            {!isPlaying && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50">
                  <Play fill="white" />
                </div>
              </div>
            )}
          </div>

          {/* Vertical actions - outside video, aligned to right bottom */}
          <div className="flex flex-col items-center justify-end gap-5 text-white pb-4">
            {currentVideo?.user && (
              <button className="relative mb-1 group">
                <div className="h-11 w-11 rounded-full overflow-hidden bg-black/20">
                  <img
                    src={currentVideo.user.avatar_url}
                    alt={currentVideo.user.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-white rounded-full p-0.5 border-2 border-black flex items-center justify-center">
                  <Plus className="size-3 text-black" strokeWidth={4} />
                </div>
              </button>
            )}
            <button className="flex flex-col items-center gap-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors">
                <Heart className="size-7" />
              </div>
              <span className="text-xs font-medium">
                {currentVideo?.views_count.toLocaleString() ?? 0}
              </span>
            </button>
            <button
              className="flex flex-col items-center gap-1"
              onClick={handleToggleComments}
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors`}
              >
                <MessageCircle className="size-7" />
              </div>
              <span className="text-xs font-medium">121</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors">
                <Plain className="size-7" />
              </div>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors">
                <Bookmark className="size-7" />
              </div>
            </button>
            <button
              className="flex flex-col items-center gap-1"
              onClick={handleToggleMute}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors">
                {isMuted ? (
                  <VolumeX className="size-7" />
                ) : (
                  <Volume2 className="size-7" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Comments section - starts behind video player, slides to right when opened */}
        {currentVideo && (
          <div
            className={`hidden md:block absolute left-2/5 top-1/2 -translate-y-1/2 w-[400px] h-full max-h-[calc(100vh-40px)] transition-all duration-300 ease-out ${
              showComments
                ? "translate-x-[13dvw] opacity-100 z-20 pointer-events-auto"
                : "translate-x-[-50%] opacity-0 pointer-events-none z-0"
            }`}
          >
            <div className="flex flex-col h-full max-h-[calc(100vh-40px)] bg-background rounded-xl border border-border">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden ring-1 ring-border">
                    <img
                      src={currentVideo.user.avatar_url}
                      alt={currentVideo.user.username}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold hover:underline cursor-pointer">
                      {currentVideo.user.username}
                    </span>
                  </div>
                </div>
              </div>

              {/* Comments List (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Caption (as first comment) */}
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden shrink-0">
                    <img
                      src={currentVideo.user.avatar_url}
                      alt={currentVideo.user.username}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <span className="font-semibold mr-2">
                      {currentVideo.user.username}
                    </span>
                    <span className="text-foreground/90">
                      {currentVideo.title}
                    </span>
                    <div className="mt-1 text-xs text-muted-foreground flex gap-3">
                      <span>
                        {new Date(currentVideo.created_at).toLocaleDateString()}
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
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Heart className="h-6 w-6 hover:text-red-500 cursor-pointer transition-colors" />
                    <MessageCircle className="h-6 w-6 hover:text-muted-foreground cursor-pointer transition-colors -rotate-90" />
                    <Send className="h-6 w-6 hover:text-muted-foreground cursor-pointer transition-colors" />
                  </div>
                  <Bookmark className="h-6 w-6 hover:text-muted-foreground cursor-pointer transition-colors" />
                </div> */}

                <div className="text-sm font-semibold">
                  {currentVideo.views_count.toLocaleString()} views
                </div>
                <div className="text-[10px] uppercase text-muted-foreground tracking-wide">
                  {new Date(currentVideo.created_at).toLocaleDateString(
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
          </div>
        )}
      </div>

      {/* Arrow navigation for md+ */}
      {prevVideo && (
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 hover:bg-transparent"
          onClick={handlePrev}
        >
          <ChevronLeft className="size-8 text-white" />
        </Button>
      )}
      {nextVideo && (
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 hover:bg-transparent"
          onClick={handleNext}
        >
          <ChevronRight className="size-8 text-white" />
        </Button>
      )}
    </div>
  );
}

function VideoSkeleton() {
  return (
    <div className="relative h-full w-auto aspect-9/16 rounded-xl overflow-hidden bg-muted animate-pulse">
      {/* fake video */}
      <div className="absolute inset-0 bg-linear-to-br from-muted via-muted/70 to-muted/50" />

      {/* caption skeleton */}
      <div className="absolute bottom-0 inset-x-0 p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-muted-foreground/20" />
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-muted-foreground/20" />
            <div className="h-2 w-16 rounded bg-muted-foreground/20" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-muted-foreground/20" />
          <div className="h-3 w-4/5 rounded bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  );
}
