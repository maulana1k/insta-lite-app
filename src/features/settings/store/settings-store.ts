import { create } from "zustand";

interface ProfileSettings {
  displayName: string;
  username: string;
  bio: string;
  website: string;
  instagram: string;
  twitter: string;
  youtube: string;
  tiktok: string;
  linkedin: string;
}

interface PrivacySettings {
  privateAccount: boolean;
  whoCanMessage: "everyone" | "followers" | "nobody";
  twoFactorEnabled: boolean;
}

interface NotificationSettings {
  push: {
    likes: boolean;
    comments: boolean;
    mentions: boolean;
    followers: boolean;
    messages: boolean;
  };
  email: {
    likes: boolean;
    comments: boolean;
    mentions: boolean;
    followers: boolean;
    messages: boolean;
  };
}

interface AppearanceSettings {
  language: "id" | "en";
}

interface SettingsState {
  profile: ProfileSettings;
  privacy: PrivacySettings;
  notifications: NotificationSettings;
  appearance: AppearanceSettings;

  updateProfile: (settings: Partial<ProfileSettings>) => void;
  updatePrivacy: (settings: Partial<PrivacySettings>) => void;
  updateNotifications: (settings: Partial<NotificationSettings>) => void;
  updateAppearance: (settings: Partial<AppearanceSettings>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  profile: {
    displayName: "Jack Harding",
    username: "jackharding",
    bio: "Travel, Adventure & Lifestyle Photographer\nSony Imaging Ambassador",
    website: "jackharding.photo",
    instagram: "jackharding",
    twitter: "jackharding",
    youtube: "",
    tiktok: "",
    linkedin: "jackharding",
  },
  privacy: {
    privateAccount: false,
    whoCanMessage: "everyone",
    twoFactorEnabled: false,
  },
  notifications: {
    push: {
      likes: true,
      comments: true,
      mentions: true,
      followers: true,
      messages: true,
    },
    email: {
      likes: false,
      comments: true,
      mentions: true,
      followers: false,
      messages: true,
    },
  },
  appearance: {
    language: "id",
  },

  updateProfile: (settings) =>
    set((state) => ({
      profile: { ...state.profile, ...settings },
    })),
  updatePrivacy: (settings) =>
    set((state) => ({
      privacy: { ...state.privacy, ...settings },
    })),
  updateNotifications: (settings) =>
    set((state) => ({
      notifications: { ...state.notifications, ...settings },
    })),
  updateAppearance: (settings) =>
    set((state) => ({
      appearance: { ...state.appearance, ...settings },
    })),
}));
