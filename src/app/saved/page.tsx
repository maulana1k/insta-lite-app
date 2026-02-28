"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/header";
import { SuggestedUsers } from "@/components/layout/suggested-users";
import { SuggestedUsersSkeleton } from "@/components/layout/suggested-users-skeleton";
import { EventDetailModal } from "@/features/event/components/event-detail-modal";
import { FeedList } from "@/features/post/components/feed-list";
import { FeedSkeleton } from "@/features/post/components/feed-skeleton";
import { useFeed } from "@/features/post/hooks/use-feed";
import { useFeedStore } from "@/features/post/store/feed-store";
import { PostDetailModal } from "@/features/posts/components/post-detail-modal";
import { SpaceSidebar } from "@/features/space/components/space-sidebar";
import { SpaceSidebarSkeleton } from "@/features/space/components/space-sidebar-skeleton";

export default function SavedPage() {
  const { setActiveSpaceId } = useFeedStore();
  const { isLoading } = useFeed();

  useEffect(() => {
    setActiveSpaceId("saved");
  }, [setActiveSpaceId]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <PostDetailModal />
      <EventDetailModal />

      <Header />

      <div className="mx-auto px-4 py-8 space-y-6">
        <div className="flex w-full justify-center relative min-h-screen px-4">
          <div className="grid grid-cols-[auto_1fr_auto] max-w-7xl w-full gap-6">
            <aside className="hidden lg:block">
              {isLoading ? <SpaceSidebarSkeleton /> : <SpaceSidebar />}
            </aside>
            <div className="w-full max-w-2xl mx-auto pt-15">
              {isLoading ? <FeedSkeleton /> : <FeedList />}
            </div>
            {isLoading ? <SuggestedUsersSkeleton /> : <SuggestedUsers />}
          </div>
        </div>
      </div>
    </div>
  );
}
