export interface Space {
  id: string;
  name: string;
  slug: string;
  description: string;
  avatar_url: string;
  banner_url: string;
  members_count: number;
  posts_count: number;
  created_at: string;
  is_private?: boolean;
  rules?: string[];
}
