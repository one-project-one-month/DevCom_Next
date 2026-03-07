"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

export function useSavedPostsFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = searchParams.get("q") ?? defaults.query;

  const filters = useMemo<Filters>(() => {

    const type = (searchParams.get("type") as FilterFeedPostType | null) ?? defaults.type;

    const status = (searchParams.get("status") as FilterFeedPostStatus | null) ?? defaults.status;

    const sort = (searchParams.get("sort") as FilterFeedPostSortType | null) ?? defaults.sort;

    return { type, status, sort };
  }, [searchParams]);

  const updateParams = useCallback(
    (arg: {
      query?: string,
      filters?: Partial<Filters>
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      const newQuery: string = arg.query ?? query;
      const newFilters: Filters= { ...filters, ...arg.filters };

      newQuery !== defaults.query
        ? params.set("q", newQuery)
        : params.delete("q");

      newFilters.type !== defaults.type
        ? params.set("type", newFilters.type)
        : params.delete("type");

      newFilters.status !== defaults.status
        ? params.set("status", newFilters.status)
        : params.delete("status");

      newFilters.sort !== defaults.sort
        ? params.set("sort", newFilters.sort)
        : params.delete("sort");

      const url = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.push(url);
    },
    [query, filters, pathname, router, searchParams]
  );

  const setQuery = useCallback(
    (query: string) => {
      updateParams({ query: query });
    }, [updateParams]
  );

  const resetQuery = useCallback(
    () => updateParams({ query: defaults.query }),
    [updateParams]
  );

  const setFilters = useCallback(
    (args: Partial<Filters>) => {
      updateParams({ filters: args })
    }, [updateParams]
  );

  const resetFilters = useCallback(
    () => updateParams({ filters: defaultFilters }),
    [updateParams]
  );

  const resetAll = useCallback(() => {
    router.replace(pathname);
  }, [pathname, router]);

  return { query, filters, setQuery, setFilters, resetQuery, resetFilters, resetAll };
}
