"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FilterFeedPostSortType,
  FilterFeedPostStatus,
  FilterFeedPostType,
} from "@/app/saved-posts/_types";

export type Filters = {
  type: FilterFeedPostType;
  status: FilterFeedPostStatus;
  sort: FilterFeedPostSortType;
};

const defaultFilters: Filters = {
  type: "All",
  status: "All",
  sort: "newest",
};

const defaults: Filters & { query: string } = {
  query: "",
  ...defaultFilters,
};

type SavedPostFilterState = {
  query: string;
  filters: Filters;
};

function parseStateFromUrl(): SavedPostFilterState {
  if (typeof window === "undefined") {
    return { query: defaults.query, filters: defaultFilters };
  }

  const searchParams = new URLSearchParams(window.location.search);

  const query = searchParams.get("q") ?? defaults.query;
  const type = (searchParams.get("type") as FilterFeedPostType | null) ?? defaults.type;
  const status = (searchParams.get("status") as FilterFeedPostStatus | null) ?? defaults.status;
  const sort = (searchParams.get("sort") as FilterFeedPostSortType | null) ?? defaults.sort;

  return {
    query,
    filters: { type, status, sort },
  };
}

export function useSavedPostsFilters() {
  const router = useRouter();
  const pathname = usePathname();

  const [state, setState] = useState<SavedPostFilterState>(() => parseStateFromUrl());

  const updateParams = useCallback(
    (arg: { query?: string; filters?: Partial<Filters> }) => {
      const newQuery = arg.query ?? state.query;
      const newFilters: Filters = { ...state.filters, ...arg.filters };

      const params = new URLSearchParams();

      if (newQuery !== defaults.query) {
        params.set("q", newQuery);
      }

      if (newFilters.type !== defaults.type) {
        params.set("type", newFilters.type);
      }

      if (newFilters.status !== defaults.status) {
        params.set("status", newFilters.status);
      }

      if (newFilters.sort !== defaults.sort) {
        params.set("sort", newFilters.sort);
      }

      const url = params.toString() ? `${pathname}?${params.toString()}` : pathname;

      setState({ query: newQuery, filters: newFilters });
      router.push(url);
    },
    [pathname, router, state.filters, state.query],
  );

  const query = state.query;
  const filters = state.filters;

  const setQuery = useCallback(
    (nextQuery: string) => {
      updateParams({ query: nextQuery });
    },
    [updateParams],
  );

  const resetQuery = useCallback(() => updateParams({ query: defaults.query }), [updateParams]);

  const setFilters = useCallback(
    (args: Partial<Filters>) => {
      updateParams({ filters: args });
    },
    [updateParams],
  );

  const resetFilters = useCallback(() => updateParams({ filters: defaultFilters }), [updateParams]);

  const resetAll = useCallback(() => {
    setState({ query: defaults.query, filters: defaultFilters });
    router.replace(pathname);
  }, [pathname, router]);

  return useMemo(
    () => ({ query, filters, setQuery, setFilters, resetQuery, resetFilters, resetAll }),
    [filters, query, resetAll, resetFilters, resetQuery, setFilters, setQuery],
  );
}
