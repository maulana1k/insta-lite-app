"use client";

import { Loader2 } from "lucide-react";
import { useVideos } from "../hooks/use-videos";
import { useVideosStore } from "../store/videos-store";
import { VideoCard } from "./video-card";

export function VideosGrid() {
  const { data: videos, isLoading } = useVideos();
  const { activeCategory } = useVideosStore();

  // Filter based on category (mock logic)
  const filteredVideos = videos?.filter((video) => {
    // For 'For You', show all mock videos for demo density
    if (activeCategory === "For You") return true;
    // Otherwise filter by strict category match (mock data primarily 'For You')
    // return video.category === activeCategory;
    return true; // Simplified for demo to show content on all tabs
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20 pt-5 px-2">
      {filteredVideos?.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}

      {/* Duplicate for visual fullness in demo */}
      {filteredVideos?.map((video) => (
        <VideoCard
          key={`${video.id}-duplicate`}
          video={{ ...video, id: `${video.id}-dup` }}
        />
      ))}
    </div>
  );
}
