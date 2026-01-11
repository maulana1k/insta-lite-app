import { useState, useEffect } from 'react';
import { TextPost, PostComment } from '../types';
import { MOCK_TEXT_POSTS, MOCK_COMMENTS } from '../api/mock-data';

export function usePostDetail(id: string | undefined) {
  const [post, setPost] = useState<TextPost | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Simulate API fetch
    const fetchPost = () => {
      setIsLoading(true);
      const foundPost = MOCK_TEXT_POSTS.find(p => p.id === id);
      const foundComments = MOCK_COMMENTS[id] || [];
      
      setPost(foundPost || null);
      setComments(foundComments);
      setIsLoading(false);
    };

    const timer = setTimeout(fetchPost, 500);
    return () => clearTimeout(timer);
  }, [id]);

  return { post, comments, isLoading };
}
