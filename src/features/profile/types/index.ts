import { Post, type User } from "@/types/database";

export interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

export interface Highlight {
  id: string;
  title: string;
  cover_image: string;
}

export interface ProfileUser extends User {
  stats: UserStats;
  category?: string;
  website?: string;
  is_following?: boolean;
  highlights: Highlight[];
}
