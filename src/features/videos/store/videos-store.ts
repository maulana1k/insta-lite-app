import { create } from 'zustand';

interface VideosState {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeVideoId: string | null;
  setActiveVideoId: (id: string | null) => void;
}

export const useVideosStore = create<VideosState>((set) => ({
  activeCategory: "For You",
  setActiveCategory: (category) => set({ activeCategory: category }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  activeVideoId: null,
  setActiveVideoId: (id) => set({ activeVideoId: id }),
}));
