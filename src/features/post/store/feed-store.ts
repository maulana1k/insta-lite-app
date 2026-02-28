"use client";

import { create } from "zustand";
import { useSpaceStore } from "@/features/space/store/space-store";

interface FeedState {
  /** 'all' = For You · 'following' = Following · 'saved' = Saved · <spaceId> = a specific space */
  activeSpaceId: string;
  /** visual = photo grid feed (disabled), text = text post feed */
  mode: "visual" | "text";
  setActiveSpaceId: (id: string) => void;
  setMode: (mode: "visual" | "text") => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  activeSpaceId: "all",
  mode: "text",
  setActiveSpaceId: (id) => {
    set({ activeSpaceId: id });
    // Reset space + event state when switching feed
    useSpaceStore.getState().reset();
  },
  setMode: (mode) => set({ mode }),
}));
