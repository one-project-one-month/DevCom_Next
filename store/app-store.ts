import { create } from "zustand";

type AppState = {
  apiBaseUrl: string;
  setApiBaseUrl: (value: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  setApiBaseUrl: (value) => set({ apiBaseUrl: value }),
}));
