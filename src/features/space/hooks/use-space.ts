import { useQuery } from '@tanstack/react-query';
import { fetchSpace, fetchSpaces } from '../api';
import { useSpaceStore } from '../store/space-store';
import { useFeedStore } from '@/features/post/store/feed-store';

export function useSpaces() {
  return useQuery({
    queryKey: ['spaces'],
    queryFn: fetchSpaces,
  });
}

export function useSpace(slug: string | undefined) {
  return useQuery({
    queryKey: ['space', slug],
    queryFn: () => fetchSpace(slug!),
    enabled: !!slug,
  });
}

export function useSpaceViewMode() {
  const { spaceViewMode, setSpaceViewMode } = useSpaceStore();
  const { activeSpaceId } = useFeedStore();
  return { spaceViewMode, setSpaceViewMode, activeSpaceId };
}
