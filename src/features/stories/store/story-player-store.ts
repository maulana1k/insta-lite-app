import { create } from 'zustand';

interface StoryPlayerState {
  isOpen: boolean;
  currentStoryIndex: number;
  currentUserIndex: number;
  openStoryPlayer: (userIndex: number, storyIndex?: number) => void;
  closeStoryPlayer: () => void;
  nextStory: () => void;
  previousStory: () => void;
  setCurrentStoryIndex: (index: number) => void;
}

export const useStoryPlayerStore = create<StoryPlayerState>((set) => ({
  isOpen: false,
  currentStoryIndex: 0,
  currentUserIndex: 0,
  openStoryPlayer: (userIndex, storyIndex = 0) => 
    set({ isOpen: true, currentUserIndex: userIndex, currentStoryIndex: storyIndex }),
  closeStoryPlayer: () => 
    set({ isOpen: false, currentStoryIndex: 0, currentUserIndex: 0 }),
  nextStory: () => 
    set((state) => ({ currentStoryIndex: state.currentStoryIndex + 1 })),
  previousStory: () => 
    set((state) => ({ currentStoryIndex: Math.max(0, state.currentStoryIndex - 1) })),
  setCurrentStoryIndex: (index) => 
    set({ currentStoryIndex: index }),
}));
