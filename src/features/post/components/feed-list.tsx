"use client";

import { EventsList } from "@/features/event/components/events-list";
import { SpaceFeedToolbar } from "@/features/space/components/space-feed-toolbar";
import { useSpaceStore } from "@/features/space/store/space-store";
import { useFeed } from "../hooks/use-feed";
import { useFeedStore } from "../store/feed-store";
import { FeedSkeleton } from "./feed-skeleton";
import { PostCard } from "./post-card";

export function FeedList() {
  const { data: posts, isLoading } = useFeed();
  const { activeSpaceId } = useFeedStore();
  const { spaceViewMode } = useSpaceStore();

  const isSpaceSelected = !["all", "following", "saved"].includes(
    activeSpaceId,
  );

  if (isLoading) {
    return <FeedSkeleton />;
  }

  return (
    <div className="max-w-2xl mx-auto pb-20 space-y-5">
      {isSpaceSelected && <SpaceFeedToolbar />}
      {isSpaceSelected && spaceViewMode === "events" ? (
        <EventsList />
      ) : (
        posts?.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
