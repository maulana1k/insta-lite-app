export interface User {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  bio?: string;
  verified?: boolean;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  image_url?: string;
  caption?: string;
  location?: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  user?: User; // Joined data
  is_liked?: boolean; // Computed for current user
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user?: User; // Joined data
}

export interface Story {
  id: string;
  user_id: string;
  image_url: string;
  expires_at: string;
  created_at: string;
  user?: User;
  is_viewed?: boolean;
}
