export interface UserSummary {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
}

export interface MyProfile {
  id: string;
  username: string;
  email: string;
  display_name: string;
  bio: string | null;
  website_url: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  is_email_confirmed: boolean;
  follower_count: number;
  following_count: number;
  post_count: number;
  created_at: string;
}

export interface PublicProfile {
  id: string;
  username: string;
  display_name: string;
  bio: string | null;
  website_url: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  follower_count: number;
  following_count: number;
  post_count: number;
  is_following: boolean | null;
  is_blocking: boolean | null;
  is_blocked_by: boolean | null;
  created_at: string;
}

export interface UpdateProfileRequest {
  display_name?: string;
  bio?: string;
  website_url?: string;
  avatar_media_id?: string;
  cover_media_id?: string;
}

export interface FollowListItem {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  followed_at: string;
}

export interface FollowListPage {
  results: FollowListItem[];
  next_cursor: string | null;
}
