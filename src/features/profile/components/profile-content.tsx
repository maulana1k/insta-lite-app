'use client';

import { useProfilePosts } from '../hooks/use-profile';
import { useProfileStore } from '../store/profile-store';
import { Grid, List, BookMarked, UserSquare, GalleryVertical, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFeedStore } from '@/features/feed/store/feed-store';
// Re-using feed store to open the same modal for details
import { Loader2 } from 'lucide-react';
import { Camera, ClapperboardPlay, Notes, Widget } from '@solar-icons/react';

interface ProfileContentProps {
  username: string;
}

export function ProfileContent({ username }: ProfileContentProps) {
  const { data: posts, isLoading } = useProfilePosts(username);
  const { viewMode, setViewMode } = useProfileStore();
  const setActivePostId = useFeedStore((state) => state.setActivePostId);

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0">
      {/* View Toggles - Mobile/Tablet mainly or just standard layout */}
      <div className="hidden md:flex justify-end mb-4 gap-4">
        <button
          onClick={() => setViewMode('grid')}
          className={cn("p-2 transition-colors", viewMode === 'grid' ? "text-foreground" : "text-muted-foreground")}
        >
          <Widget className="size-7" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={cn("p-2 transition-colors", viewMode === 'list' ? "text-foreground" : "text-muted-foreground")}
        >
          <Notes className="size-7 opacity-50" />
        </button>
        <button className="p-2 text-muted-foreground">
          <ClapperboardPlay className="size-7 opacity-50" />
        </button>
        <button className="p-2 text-muted-foreground">
          <Bookmark className="size-7 opacity-50" />
        </button>
        {/* <button className="p-2 text-muted-foreground"><UserSquare className="size-6" /></button> */}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-6">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="relative aspect-square rounded-xl bg-muted cursor-pointer overflow-hidden group"
            onClick={() => setActivePostId(post.id)}
          >
            <img src={post.image_url} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold">
              <span>{post.likes_count}</span>
              <span>{post.comments_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
