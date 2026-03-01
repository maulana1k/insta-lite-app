"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { CurrentUser } from "@/features/auth/types";
import { useAuthStore } from "@/features/auth/store/auth-store";
import * as mediaApi from "@/features/media/api";
import * as usersApi from "../api";
import type { UpdateProfileRequest } from "../types";

// ── Queries ──────────────────────────────────────────────────────────────────

export function useMyProfile() {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: () => usersApi.getMe(),
  });
}

export function usePublicProfile(username: string) {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => usersApi.getProfile(username),
    enabled: !!username,
  });
}

export function useBlockedUsers() {
  return useQuery({
    queryKey: ["users", "me", "blocked"],
    queryFn: () => usersApi.getBlockedUsers(),
  });
}

export function useUserPosts(username: string) {
  return useInfiniteQuery({
    queryKey: ["profile-posts", username],
    queryFn: ({ pageParam }) =>
      usersApi.getUserPosts(username, pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
    enabled: !!username,
  });
}

// ── Mutations ─────────────────────────────────────────────────────────────────

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { setCurrentUser } = useAuthStore();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => usersApi.updateMe(data),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      // Map MyProfile subset → CurrentUser
      const currentUserUpdate: CurrentUser = {
        id: updated.id,
        username: updated.username,
        display_name: updated.display_name,
        email: updated.email,
        avatar_url: updated.avatar_url ?? "",
        is_verified: false,
      };
      setCurrentUser(currentUserUpdate);
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  const { setCurrentUser, currentUser } = useAuthStore();

  return useMutation({
    mutationFn: async (file: File) => {
      const { media_id } = await mediaApi.uploadMedia(file, "avatar");
      return usersApi.updateMe({ avatar_media_id: media_id });
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      if (currentUser) {
        setCurrentUser({ ...currentUser, avatar_url: updated.avatar_url ?? "" });
      }
    },
  });
}

export function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => usersApi.follow(username),
    onSuccess: (_, username) => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
    },
  });
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => usersApi.unfollow(username),
    onSuccess: (_, username) => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
    },
  });
}

export function useBlockUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => usersApi.block(username),
    onSuccess: (_, username) => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
    },
  });
}

export function useUnblockUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => usersApi.unblock(username),
    onSuccess: (_, username) => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
      queryClient.invalidateQueries({ queryKey: ["users", "me", "blocked"] });
    },
  });
}
