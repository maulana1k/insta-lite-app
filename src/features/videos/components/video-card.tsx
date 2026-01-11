import { CheckCircle, VerifiedCheck } from "@solar-icons/react";
import { Video } from "../types";
import { BadgeCheck, Play } from "lucide-react";
import Link from "next/link";
import { useVideosStore } from "../store/videos-store";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const { setActiveVideoId } = useVideosStore();

  const handleOpenDetail = () => {
    setActiveVideoId(video.id);
    window.history.pushState({ videoId: video.id }, "", `/videos/${video.id}`
    );

  };

  return (
    <button
      type="button"
      onClick={handleOpenDetail}
      className="group relative aspect-9/16 bg-black rounded overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Thumbnail */}
      <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/80" />

      {/* Top Right Duration */}
      <div className="absolute top-3 right-3 text-xs font-semibold text-white/90 bg-black/20 backdrop-blur-md px-2 py-1 rounded-md">
        {video.duration}
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 transition-transform duration-300">

        <p className="text-[10px] text-left text-white/60 font-medium">{video.description}</p>
        <h3 className="text-left text-sm font-bold text-white leading-tight line-clamp-2 mb-3 group-hover:line-clamp-none transition-all">
          {video.title}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
            <img src={video.user.avatar_url} alt={video.user.username} className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-medium text-white/90 truncate">{video.user.username}</span>
          <VerifiedCheck weight='Bold' className="size-4" />
          {/* Verified icon here if needed */}
        </div>

        {/* Play Icon (appears on hover) */}
        {/* <div className="absolute right-4 bottom-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <Play className="w-3 h-3 text-white fill-white" />
        </div> */}
      </div>
    </button>
  );
}
