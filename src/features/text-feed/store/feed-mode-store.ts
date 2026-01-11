'use client';

import { create } from 'zustand';

interface FeedModeState {
  mode: 'visual' | 'text';
  activeTopicId: string;
  setMode: (mode: 'visual' | 'text') => void;
  setActiveTopicId: (id: string) => void;
}

export const useFeedModeStore = create<FeedModeState>((set) => ({
  mode: 'visual',
  activeTopicId: 'all',
  setMode: (mode) => set({ mode: mode }),
  setActiveTopicId: (id) => set({ activeTopicId: id }),
}));
