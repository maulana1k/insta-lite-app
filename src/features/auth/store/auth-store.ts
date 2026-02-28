import { create } from "zustand";
import type { CurrentUser, TokenPair } from "../types";

interface AuthState {
  accessToken: string | null;
  currentUser: CurrentUser | null;
  isInitialized: boolean;

  setTokens: (tokens: Pick<TokenPair, "access_token">) => void;
  setCurrentUser: (user: CurrentUser) => void;
  clearAuth: () => void;
  setInitialized: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  currentUser: null,
  isInitialized: false,

  setTokens: ({ access_token }) => set({ accessToken: access_token }),

  setCurrentUser: (user) => set({ currentUser: user }),

  clearAuth: () => set({ accessToken: null, currentUser: null }),

  setInitialized: () => set({ isInitialized: true }),
}));
