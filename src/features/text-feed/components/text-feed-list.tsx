'use client';

import { useTextFeed } from '../hooks/use-text-feed';
import { TextPostCard } from './text-post-card';
import { TextFeedSkeleton } from './text-feed-skeleton';

export function TextFeedList() {
  const { data: posts, isLoading } = useTextFeed();

  if (isLoading) {
    return <TextFeedSkeleton />;
  }

  return (
    <div className="max-w-xl mx-auto pb-20 space-y-5">
      {posts?.map((post) => (
        <TextPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
