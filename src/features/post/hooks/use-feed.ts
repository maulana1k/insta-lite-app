import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchFollowingFeed,
  fetchForYouFeed,
  fetchSavedFeed,
  fetchSpaceFeed,
} from "../api";
import { useFeedStore } from "../store/feed-store";

export function useFeed() {
  const { activeSpaceId } = useFeedStore();

  const query = useInfiniteQuery({
    queryKey: ["feed", activeSpaceId],
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) => {
      if (activeSpaceId === "all") return fetchForYouFeed(pageParam);
      if (activeSpaceId === "following") return fetchFollowingFeed(pageParam);
      if (activeSpaceId === "saved") return fetchSavedFeed(pageParam);
      return fetchSpaceFeed(activeSpaceId, pageParam);
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  // Flatten pages into a single posts array for easy consumption
  const data = query.data?.pages.flatMap((page) => page.items);

  return { ...query, data };
}
