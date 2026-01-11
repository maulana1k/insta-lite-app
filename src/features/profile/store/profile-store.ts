import { create } from 'zustand';

type ViewMode = 'grid' | 'list' | 'tagged';

interface ProfileState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  viewMode: 'grid',
  setViewMode: (mode) => set({ viewMode: mode }),
}));
