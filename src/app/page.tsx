"use client";

import { Header } from "@/components/layout/header";
import { FeedGrid } from "@/features/feed/components/feed-grid";
import { UserStories } from "@/features/feed/components/user-stories";
import { PostDetailModal } from "@/features/posts/components/post-detail-modal";
import { useFeedModeStore } from "@/features/text-feed/store/feed-mode-store";
import { TextFeedList } from "@/features/text-feed/components/text-feed-list";
import { TopicSidebar } from "@/features/text-feed/components/topic-sidebar";
import { TopicSidebarSkeleton } from "@/features/text-feed/components/topic-sidebar-skeleton";
import { TextFeedSkeleton } from "@/features/text-feed/components/text-feed-skeleton";
import { FeedModeToggle, FeedLayoutToggle } from "@/features/feed/components/feed-navigation";
import { useTextFeed } from "@/features/text-feed/hooks/use-text-feed";
import { StoryPlayerUI } from "@/features/stories/components/story-player-ui";

export default function Home() {
  const { mode } = useFeedModeStore();
  const { isLoading: isTextFeedLoading } = useTextFeed();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <FeedModeToggle />
      <FeedLayoutToggle />
      
      <StoryPlayerUI />
      <PostDetailModal />
      <div className="fixed h-screen flex flex-col right-8 justify-center z-10 pointer-events-none">
        {/* Placeholder for symmetry or other controls if needed */}
      </div>

      <Header />

      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
        {mode === 'visual' ? (
          <>
            <section>
              <UserStories />
            </section>

            <section>
              <FeedGrid />
            </section>
          </>
        ) : (
          <div className="flex w-full justify-center relative min-h-screen">
            <div className="flex w-full max-w-6xl gap-2 justify-start">
              <aside className="hidden lg:block">
                 {isTextFeedLoading ? <TopicSidebarSkeleton /> : <TopicSidebar />}
              </aside>
              <div className="w-full max-w-xl">
                {isTextFeedLoading ? <TextFeedSkeleton /> : <TextFeedList />}
              </div>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}
