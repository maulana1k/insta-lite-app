import { create } from 'zustand';

type ProfileTab = 'posts' | 'media' | 'repost' | 'bookmark';

interface ProfileState {
  activeTab: ProfileTab;
  setActiveTab: (tab: ProfileTab) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  activeTab: 'posts',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
