import { useQuery } from '@tanstack/react-query';
import { fetchPost, fetchPostComments } from '../api';

export function usePostDetail(id: string | undefined) {
  const postQuery = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id!),
    enabled: !!id,
  });

  const commentsQuery = useQuery({
    queryKey: ['post-comments', id],
    queryFn: () => fetchPostComments(id!),
    enabled: !!id,
  });

  return {
    post: postQuery.data ?? null,
    comments: commentsQuery.data ?? [],
    isLoading: postQuery.isLoading || commentsQuery.isLoading,
  };
}
