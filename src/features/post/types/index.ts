import { User } from '@/types/database';
import { Space } from '@/features/space/types';

export interface Post {
  id: string;
  content: string;
  image_urls?: string[];
  user_id: string;
  user: User;
  created_at: string;
  likes_count: number;
  comments_count: number;
  reposts_count: number;
  views_count: number;
  repliers_avatars?: string[];
  space?: Space;
  is_anonymous?: boolean;
  repost?: Post;
}

export interface PostComment {
  id: string;
  post_id: string;
  user: User;
  content: string;
  created_at: string;
  likes_count: number;
  replies?: PostComment[];
}

export interface UserProfile {
  user: User;
  bio: string;
  followers_count: number;
  following_count: number;
  mutual_follower?: string;
}
