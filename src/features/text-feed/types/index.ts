import { User } from '@/types/database';

export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  avatar_url: string;
  members_count: number;
  posts_count: number;
}

export interface TextPost {
  id: string;
  content: string;
  image_urls?: string[];
  user_id: string;
  user: User;
  created_at: string;
  likes_count: number;
  comments_count: number;
  reposts_count: number;
  repliers_avatars?: string[];
  topic?: Topic;
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
