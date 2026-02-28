"use client";

import { create } from "zustand";
import { useEventStore } from "@/features/event/store/event-store";

interface SpaceState {
  spaceViewMode: "posts" | "events";
  setSpaceViewMode: (mode: "posts" | "events") => void;
  reset: () => void;
}

export const useSpaceStore = create<SpaceState>((set) => ({
  spaceViewMode: "posts",
  setSpaceViewMode: (mode) => {
    set({ spaceViewMode: mode });
    useEventStore.getState().reset();
  },
  reset: () => {
    set({ spaceViewMode: "posts" });
    useEventStore.getState().reset();
  },
}));
