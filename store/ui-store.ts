import { create } from "zustand";

import type { FeedFilter } from "@/types/post";

type UiState = {
  activeFilter: FeedFilter;
  composerOpen: boolean;
  draft: string;
  setActiveFilter: (filter: FeedFilter) => void;
  setComposerOpen: (open: boolean) => void;
  setDraft: (value: string) => void;
  resetDraft: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  activeFilter: "trending",
  composerOpen: true,
  draft: "",
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setComposerOpen: (open) => set({ composerOpen: open }),
  setDraft: (value) => set({ draft: value }),
  resetDraft: () => set({ draft: "" }),
}));
