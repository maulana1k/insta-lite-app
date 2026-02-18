"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/header";
// import { FeedGrid } from "@/features/feed/components/feed-grid";
// import { UserStories } from "@/features/feed/components/user-stories";
import { PostDetailModal } from "@/features/posts/components/post-detail-modal";
import { useFeedStore } from "@/features/post/store/feed-store";
import { SPACES } from '@/features/space/api/mock-data';
import { FeedList } from '@/features/post/components/feed-list';
import { SpaceSidebar } from '@/features/space/components/space-sidebar';
import { SpaceSidebarSkeleton } from "@/features/space/components/space-sidebar-skeleton";
import { FeedSkeleton } from '@/features/post/components/feed-skeleton';
// import { FeedModeToggle, FeedLayoutToggle } from "@/features/feed/components/feed-navigation";
import { SuggestedUsers } from '@/components/layout/suggested-users';
import { SuggestedUsersSkeleton } from '@/components/layout/suggested-users-skeleton';
import { SpaceProfile } from '@/features/space/components/space-profile';
import { SpaceProfileSkeleton } from '@/features/space/components/space-profile-skeleton';
import { useFeed } from '@/features/post/hooks/use-feed';
import { EventDetailModal } from '@/features/event/components/event-detail-modal';
// import { StoryPlayerUI } from "@/features/stories/components/story-player-ui";

export default function Home() {
  // const { mode } = useFeedStore();
  const { isLoading: isTextFeedLoading } = useFeed();
  const { activeSpaceId, setActiveSpaceId } = useFeedStore();

  useEffect(() => {
    setActiveSpaceId("all");
  }, [setActiveSpaceId]);

  // Check if a space is selected vs a feed mode (all/following/saved)
  const isSpaceSelected = !['all', 'following', 'saved'].includes(activeSpaceId);
  const activeSpace = isSpaceSelected ? SPACES.find((s) => s.id === activeSpaceId) : null;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* <FeedModeToggle /> */}
      {/* <FeedLayoutToggle /> */}

      {/* <StoryPlayerUI /> */}
      <PostDetailModal />
      <EventDetailModal />
      <div className="fixed h-screen flex flex-col right-8 justify-center z-10 pointer-events-none">
        {/* Placeholder for symmetry or other controls if needed */}
      </div>

      <Header />

      <div className="mx-auto px-4 py-8 space-y-6">
        {/* {mode === 'visual' ? (
          <>
            <section>
              <UserStories />
            </section>

            <section>
              <FeedGrid />
            </section>
          </>
        ) : ( */}
        {/* Layout ratio: 4:14:6 on 24-col scale */}
        <div className="flex w-full justify-center relative min-h-screen px-4">
          <div className="grid grid-cols-[auto_1fr_auto] max-w-7xl w-full gap-6">
            <aside className="hidden lg:block">
              {isTextFeedLoading ? <SpaceSidebarSkeleton /> : <SpaceSidebar />}
            </aside>
            <div className="w-full max-w-2xl mx-auto pt-15">
              {isTextFeedLoading ? <FeedSkeleton /> : <FeedList />}
            </div>
            {isTextFeedLoading ? (
              isSpaceSelected ? <SpaceProfileSkeleton /> : <SuggestedUsersSkeleton />
            ) : (
              activeSpace ? <SpaceProfile topic={activeSpace} /> : <SuggestedUsers />
            )}
          </div>
        </div>
        {/* )} */}
      </div>

    </div>
  );
}
