"use client";

import {
  usePublicProfile,
  useUserPosts,
} from "@/features/users/hooks/use-users";
import { publicProfileToProfileUser } from "../types";

export function useProfile(username: string) {
  const raw = usePublicProfile(username);
  return {
    ...raw,
    data: raw.data ? publicProfileToProfileUser(raw.data) : undefined,
  };
}

export function useProfilePosts(username: string) {
  return useUserPosts(username);
}
