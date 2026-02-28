"use client";

import { create } from "zustand";
import type { EventFilter } from "../types";

interface EventState {
  eventFilter: EventFilter;
  activeEventId: string | null;
  setEventFilter: (filter: EventFilter) => void;
  setActiveEventId: (id: string | null) => void;
  reset: () => void;
}

export const useEventStore = create<EventState>((set) => ({
  eventFilter: "all",
  activeEventId: null,
  setEventFilter: (filter) => set({ eventFilter: filter }),
  setActiveEventId: (id) => set({ activeEventId: id }),
  reset: () => set({ eventFilter: "all", activeEventId: null }),
}));
