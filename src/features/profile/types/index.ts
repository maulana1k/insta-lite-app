import { Post, type User } from "@/types/database";
import type { PublicProfile } from "@/features/users/types";

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

export function publicProfileToProfileUser(p: PublicProfile): ProfileUser {
  return {
    id: p.id,
    username: p.username,
    full_name: p.display_name,
    avatar_url: p.avatar_url ?? "",
    bio: p.bio ?? "",
    website: p.website_url ?? "",
    verified: false,
    created_at: p.created_at,
    stats: {
      posts: p.post_count,
      followers: p.follower_count,
      following: p.following_count,
    },
    is_following: p.is_following ?? false,
    highlights: [],
  };
}
