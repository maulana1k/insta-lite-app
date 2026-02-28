import type { User } from "@/types/database";

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  duration: string;
  views_count: number;
  user_id: string;
  user: User;
  created_at: string;
  category:
    | "For You"
    | "Following"
    | "Popular"
    | "Featured"
    | "Live"
    | "Continue Watching"
    | "Watch Later";
}
