"use client";

import { Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { SuggestedUsers } from "@/components/layout/suggested-users";
import { EventDetailModal } from "@/features/event/components/event-detail-modal";
import { FeedList } from "@/features/post/components/feed-list";
import { useFeed } from "@/features/post/hooks/use-feed";
import { useFeedStore } from "@/features/post/store/feed-store";
import { PostDetailModal } from "@/features/posts/components/post-detail-modal";
import { SPACES } from "@/features/space/api/mock-data";
import { SpaceFeedToolbar } from "@/features/space/components/space-feed-toolbar";
import { SpaceProfileHeader } from "@/features/space/components/space-profile-header";
import { SpaceSidebar } from "@/features/space/components/space-sidebar";
import { SpaceSidebarSkeleton } from "@/features/space/components/space-sidebar-skeleton";
import { useSpaceStore } from "@/features/space/store/space-store";

export function SpacePageContent({ slug }: { slug: string }) {
  const { setActiveSpaceId } = useFeedStore();
  const { setSpaceViewMode } = useSpaceStore();
  const { isLoading } = useFeed();
  const [isMember, setIsMember] = useState(false);

  const space = SPACES.find((s) => s.slug === slug);
  const isLocked = space?.is_private && !isMember;

  useEffect(() => {
    if (space) {
      setActiveSpaceId(space.id);
      setSpaceViewMode("posts");
    }
  }, [space, setActiveSpaceId, setSpaceViewMode]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <PostDetailModal />
      <EventDetailModal />
      <Header />

      {/* Match exact outer container structure from For You page */}
      <div className="mx-auto px-4 py-8 space-y-6">
        <div className="flex w-full justify-center relative min-h-screen px-4">
          <div className="grid grid-cols-[auto_1fr_auto] max-w-7xl w-full gap-6">
            {/* ── Left sidebar ── */}
            <aside className="hidden lg:block">
              {isLoading ? <SpaceSidebarSkeleton /> : <SpaceSidebar />}
            </aside>

            {/* ── Center column ── */}
            <div className="w-full max-w-2xl mx-auto pt-15 min-w-0">
              {space && (
                <SpaceProfileHeader
                  space={space}
                  isMember={isMember}
                  onJoin={() => setIsMember(true)}
                />
              )}

              {/* FeedList already includes SpaceFeedToolbar + Posts/Events switching.
                  For locked spaces, render the toolbar once + lock screen instead. */}
              {isLocked ? (
                <>
                  <SpaceFeedToolbar />
                  <PrivateSpaceLock onJoin={() => setIsMember(true)} />
                </>
              ) : (
                <FeedList />
              )}
            </div>

            {/* ── Right panel — same as For You page ── */}
            <SuggestedUsers />
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivateSpaceLock({ onJoin }: { onJoin: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-t border-border mt-2">
      <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Lock className="size-7 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg mb-2">Space ini privat</h3>
      <p className="text-[14px] text-muted-foreground max-w-xs leading-relaxed mb-6">
        Hanya anggota yang bisa melihat konten di sini. Minta bergabung untuk
        mulai membaca dan berdiskusi.
      </p>
      <button
        onClick={onJoin}
        className="px-6 py-2.5 bg-foreground text-background rounded-xl text-[14px] font-semibold hover:opacity-85 transition-opacity"
      >
        Minta Bergabung
      </button>
    </div>
  );
}
