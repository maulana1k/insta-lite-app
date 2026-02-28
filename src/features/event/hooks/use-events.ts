import { useQuery } from "@tanstack/react-query";
import { useFeedStore } from "@/features/post/store/feed-store";
import { fetchSpaceEvents } from "../api";
import { useEventStore } from "../store/event-store";
import type { EventFilter } from "../types";

export function useEvents(filter?: EventFilter) {
  const { activeSpaceId } = useFeedStore();
  const { eventFilter } = useEventStore();

  const resolvedFilter = filter ?? eventFilter;

  return useQuery({
    queryKey: ["space-events", activeSpaceId, resolvedFilter],
    queryFn: () => fetchSpaceEvents(activeSpaceId, resolvedFilter),
  });
}
