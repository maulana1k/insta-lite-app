import type { User } from "@/types/database";

export const CURRENT_USER: User = {
  id: "jack-harding",
  username: "jackharding",
  full_name: "Jack Harding",
  avatar_url: "https://i.pravatar.cc/300?u=jackharding",
  bio: "Travel, Adventure & Lifestyle Photographer\nSony Imaging Ambassador",
  verified: true,
  created_at: new Date().toISOString(),
};

export const BLOCKED_USERS: User[] = [
  {
    id: "u1",
    username: "spammer123",
    full_name: "Spam Account",
    avatar_url: "https://i.pravatar.cc/150?u=spam1",
    created_at: new Date().toISOString(),
  },
  {
    id: "u2",
    username: "annoying_bot",
    full_name: "Bot Account",
    avatar_url: "https://i.pravatar.cc/150?u=spam2",
    created_at: new Date().toISOString(),
  },
  {
    id: "u3",
    username: "toxic_user",
    full_name: "Toxic Person",
    avatar_url: "https://i.pravatar.cc/150?u=spam3",
    created_at: new Date().toISOString(),
  },
];

export const MUTED_USERS: User[] = [
  {
    id: "u4",
    username: "loudposter",
    full_name: "Too Many Posts",
    avatar_url: "https://i.pravatar.cc/150?u=mute1",
    created_at: new Date().toISOString(),
  },
  {
    id: "u5",
    username: "drama_queen",
    full_name: "Drama Account",
    avatar_url: "https://i.pravatar.cc/150?u=mute2",
    created_at: new Date().toISOString(),
  },
];

export const MOCK_CACHE_SIZE = "487 MB";
export const APP_VERSION = "1.0.0 (Build 42)";
