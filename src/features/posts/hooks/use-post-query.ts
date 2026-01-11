import { useQuery } from "@tanstack/react-query";
import { MOCK_POSTS } from "@/features/feed/api/mock-data";

export function usePostDetail(postId: string | null) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      if (!postId) return null;
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_POSTS.find((p) => p.id === postId) || null;
    },
    enabled: !!postId,
  });
}
