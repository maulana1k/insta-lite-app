import { apiClient } from "@/lib/api-client";
import type {
  FollowListPage,
  MyProfile,
  PublicProfile,
  UpdateProfileRequest,
} from "../types";

export interface UserPostsPage {
  results: {
    id: string;
    media_urls: string[];
    like_count: number;
    comment_count: number;
    created_at: string;
  }[];
  next_cursor: string | null;
}

export function getMe(): Promise<MyProfile> {
  return apiClient.get<MyProfile>("/users/me");
}

export function updateMe(data: UpdateProfileRequest): Promise<MyProfile> {
  return apiClient.patch<MyProfile>("/users/me", data);
}

export function getProfile(username: string): Promise<PublicProfile> {
  return apiClient.get<PublicProfile>(`/users/${username}`);
}

export function follow(username: string): Promise<void> {
  return apiClient.post<void>(`/users/${username}/follow`);
}

export function unfollow(username: string): Promise<void> {
  return apiClient.delete<void>(`/users/${username}/follow`);
}

export function block(username: string): Promise<void> {
  return apiClient.post<void>(`/users/${username}/block`);
}

export function unblock(username: string): Promise<void> {
  return apiClient.delete<void>(`/users/${username}/block`);
}

export function getFollowers(
  username: string,
  cursor?: string,
): Promise<FollowListPage> {
  const path = cursor
    ? `/users/${username}/followers?cursor=${cursor}`
    : `/users/${username}/followers`;
  return apiClient.get<FollowListPage>(path);
}

export function getFollowing(
  username: string,
  cursor?: string,
): Promise<FollowListPage> {
  const path = cursor
    ? `/users/${username}/following?cursor=${cursor}`
    : `/users/${username}/following`;
  return apiClient.get<FollowListPage>(path);
}

export function getBlockedUsers(cursor?: string): Promise<FollowListPage> {
  const path = cursor
    ? `/users/me/blocked?cursor=${cursor}`
    : "/users/me/blocked";
  return apiClient.get<FollowListPage>(path);
}

export function getUserPosts(
  username: string,
  cursor?: string,
): Promise<UserPostsPage> {
  const path = cursor
    ? `/users/${username}/posts?cursor=${cursor}`
    : `/users/${username}/posts`;
  return apiClient.get<UserPostsPage>(path);
}
