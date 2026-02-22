"use client";

import {
  type QueryKey,
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";

import { apiFetch, ApiError } from "@/lib/api/fetcher";
import type { ApiRequestOptions } from "@/types/api";

type ApiQueryOptions<TData, TQueryKey extends QueryKey> = Omit<
  UseQueryOptions<TData, ApiError, TData, TQueryKey>,
  "queryKey" | "queryFn"
>;

export function useApiQuery<TData, TQueryKey extends QueryKey>(
  queryKey: TQueryKey,
  path: string,
  requestOptions?: ApiRequestOptions,
  options?: ApiQueryOptions<TData, TQueryKey>,
) {
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => apiFetch<TData>(path, { ...requestOptions, signal }),
    ...options,
  });
}

export function useApiMutation<TData, TVariables = unknown>(
  getPath: (variables: TVariables) => string,
  getRequestOptions?: (variables: TVariables) => ApiRequestOptions,
  options?: Omit<UseMutationOptions<TData, ApiError, TVariables>, "mutationFn">,
) {
  return useMutation({
    mutationFn: (variables: TVariables) =>
      apiFetch<TData>(getPath(variables), getRequestOptions?.(variables)),
    ...options,
  });
}
