import { useQuery } from "@tanstack/react-query";
import { MOCK_VIDEOS } from "../api/mock-data";

export function useVideos() {
  return useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      // Simulate network
      await new Promise((resolve) => setTimeout(resolve, 800));
      return MOCK_VIDEOS;
    },
  });
}
