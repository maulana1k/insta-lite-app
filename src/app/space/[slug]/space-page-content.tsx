'use client';

import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { PostDetailModal } from '@/features/posts/components/post-detail-modal';
import { EventDetailModal } from '@/features/event/components/event-detail-modal';
import { useFeedStore } from '@/features/post/store/feed-store';
import { useSpaceStore } from '@/features/space/store/space-store';
import { SPACES } from '@/features/space/api/mock-data';
import { FeedList } from '@/features/post/components/feed-list';
import { FeedSkeleton } from '@/features/post/components/feed-skeleton';
import { SpaceSidebar } from '@/features/space/components/space-sidebar';
import { SpaceSidebarSkeleton } from '@/features/space/components/space-sidebar-skeleton';
import { EventsList } from '@/features/event/components/events-list';
import { SpaceFeedToolbar } from '@/features/space/components/space-feed-toolbar';
import { SpaceProfileHeader } from '@/features/space/components/space-profile-header';
import { SpaceRightPanel } from '@/features/space/components/space-right-panel';
import { useFeed } from '@/features/post/hooks/use-feed';

export function SpacePageContent({ slug }: { slug: string }) {
  const { setActiveSpaceId } = useFeedStore();
  const { spaceViewMode, setSpaceViewMode } = useSpaceStore();
  const { isLoading } = useFeed();
  const [isMember, setIsMember] = useState(false);

  const space = SPACES.find((s) => s.slug === slug);
  const isLocked = space?.is_private && !isMember;

  useEffect(() => {
    if (space) {
      setActiveSpaceId(space.id);
      setSpaceViewMode('posts');
    }
  }, [space, setActiveSpaceId, setSpaceViewMode]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <PostDetailModal />
      <EventDetailModal />
      <Header />

      <div className="mx-auto py-8">
        <div className="flex w-full justify-center relative min-h-screen">
          <div className="grid grid-cols-[auto_1fr_auto] max-w-7xl w-full gap-6 px-4">

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

              <SpaceFeedToolbar />

              {isLocked ? (
                <PrivateSpaceLock onJoin={() => setIsMember(true)} />
              ) : spaceViewMode === 'events' ? (
                <EventsList />
              ) : isLoading ? (
                <FeedSkeleton />
              ) : (
                <FeedList />
              )}
            </div>

            {/* ── Right panel ── */}
            <SpaceRightPanel currentSpaceId={space?.id} />
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
        Hanya anggota yang bisa melihat konten di sini. Minta bergabung untuk mulai membaca dan berdiskusi.
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
