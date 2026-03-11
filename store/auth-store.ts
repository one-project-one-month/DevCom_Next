import { create } from "zustand";

import type { AuthUser } from "@/lib/auth/types";

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  setToken: (token: string | null) => void;
  clearToken: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
}));
