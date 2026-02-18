"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/header";
import { PostDetailModal } from "@/features/posts/components/post-detail-modal";
import { useFeedStore } from "@/features/post/store/feed-store";
import { useSpaceStore } from "@/features/space/store/space-store";
import { SPACES } from "@/features/space/api/mock-data";
import { SpaceSidebar } from "@/features/space/components/space-sidebar";
import { SpaceSidebarSkeleton } from "@/features/space/components/space-sidebar-skeleton";
import { SpaceProfile } from "@/features/space/components/space-profile";
import { SpaceProfileSkeleton } from "@/features/space/components/space-profile-skeleton";
import { EventsList } from "@/features/event/components/events-list";
import { SpaceFeedToolbar } from "@/features/space/components/space-feed-toolbar";
import { EventDetailModal } from "@/features/event/components/event-detail-modal";
import { useFeed } from "@/features/post/hooks/use-feed";

export function SpaceEventsPageContent({ slug }: { slug: string }) {
  const { setActiveSpaceId } = useFeedStore();
  const { setSpaceViewMode } = useSpaceStore();
  const { isLoading } = useFeed();

  const space = SPACES.find((s) => s.slug === slug);

  useEffect(() => {
    if (space) {
      setActiveSpaceId(space.id);
      setSpaceViewMode("events");
    }
  }, [space, setActiveSpaceId, setSpaceViewMode]);

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
              <SpaceFeedToolbar />
              <EventsList />
            </div>
            {isLoading ? (
              <SpaceProfileSkeleton />
            ) : space ? (
              <SpaceProfile topic={space} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
