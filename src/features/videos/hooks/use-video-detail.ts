import { useQuery } from "@tanstack/react-query";
import { MOCK_VIDEOS } from "../api/mock-data";

export function useVideoDetail(videoId: string | null) {
  return useQuery({
    queryKey: ["video", videoId],
    queryFn: async () => {
      if (!videoId) return null;
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_VIDEOS.find((video) => video.id === videoId) || null;
    },
    enabled: !!videoId,
  });
}
