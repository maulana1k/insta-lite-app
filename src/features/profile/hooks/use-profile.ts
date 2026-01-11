import { useQuery } from '@tanstack/react-query';
import { MOCK_PROFILE, MOCK_PROFILE_POSTS } from '../api/mock-data';

export function useProfile(username: string) {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real app we'd fetch by username. For now just return mock
      return MOCK_PROFILE;
    }
  });
}

export function useProfilePosts(username: string) {
  return useQuery({
    queryKey: ['profile-posts', username],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return MOCK_PROFILE_POSTS;
    }
  });
}
