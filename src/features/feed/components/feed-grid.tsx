import { useFeedPosts } from "../hooks/use-feed-query";
import { FeedCard } from "./feed-card";
import { Loader2 } from "lucide-react";

import { FeedCardSkeleton } from "./feed-card-skeleton";
import { useFeedStore } from "../store/feed-store";

export function FeedGrid() {
  const { data: posts, isLoading } = useFeedPosts();
  const { layout } = useFeedStore();

  const gridClassName = {
    'grid3': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 pb-20',
    'grid2': 'grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 pb-20 max-w-4xl mx-auto',
    'list': 'flex flex-col gap-y-10 pb-20 max-w-lg mx-auto'
  }[layout];

  if (isLoading) {
    return (
      <div className={gridClassName}>
        {Array.from({ length: 9 }).map((_, i) => (
          <FeedCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className={gridClassName}>
        {posts?.map((post) => (
          <FeedCard key={post.id} post={post} layout={layout} />
        ))}
      </div>
    

    </div>
  );
}
