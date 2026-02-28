import { create } from "zustand";

interface FeedState {
  activePostId: string | null;
  layout: "grid3" | "grid2" | "list";
  setActivePostId: (id: string | null) => void;
  setLayout: (layout: "grid3" | "grid2" | "list") => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  activePostId: null,
  layout: "grid3",
  setActivePostId: (id) => set({ activePostId: id }),
  setLayout: (layout) => set({ layout }),
}));
