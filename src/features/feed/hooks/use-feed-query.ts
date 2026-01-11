import { useQuery } from "@tanstack/react-query";
import { MOCK_POSTS, MOCK_STORIES } from "../api/mock-data";

export function useFeedPosts() {
  return useQuery({
    queryKey: ["feed-posts"],
    queryFn: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return MOCK_POSTS;
    },
  });
}

export function useStories() {
  return useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return MOCK_STORIES;
    },
  });
}
