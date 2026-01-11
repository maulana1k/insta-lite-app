import { useQuery } from '@tanstack/react-query';
import { MOCK_TEXT_POSTS } from '../api/mock-data';
import { useFeedModeStore } from '../store/feed-mode-store';

export function useTextFeed() {
  const { activeTopicId } = useFeedModeStore();

  return useQuery({
    queryKey: ['text-feed', activeTopicId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      if (activeTopicId === 'all') {
        return MOCK_TEXT_POSTS;
      }
      
      return MOCK_TEXT_POSTS.filter((post) => post.topic?.id === activeTopicId);
    }
  });
}
