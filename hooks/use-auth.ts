"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { ApiError, apiFetch } from "@/lib/api/fetcher";
import type { MeResponse, OAuthLoginUrlResponse, OAuthProvider } from "@/lib/auth/types";
import { useAuthStore } from "@/store/auth-store";

function getAuthMe() {
  return apiFetch<MeResponse>("/api/auth/me");
}

async function startOAuthLogin(provider: OAuthProvider) {
  const { url } = await apiFetch<OAuthLoginUrlResponse>(
    `/api/auth/${provider}/login`,
  );
  window.location.assign(url);
}

export function useOAuthStartMutation() {
  return useMutation<void, ApiError, OAuthProvider>({
    mutationFn: (provider) => startOAuthLogin(provider),
  });
}

export function useMeQuery(enabled = true) {
  const query = useQuery<MeResponse, ApiError>({
    queryKey: ["auth", "me"],
    queryFn: getAuthMe,
    enabled,
    retry: false,
  });
  useEffect(() => {
    if (query.data?.user) {
      useAuthStore.getState().setUser(query.data.user);
    }
  }, [query.data?.user]);
  return query;
}

export async function logout(): Promise<void> {
  await apiFetch<{ message: string }>("/api/auth/logout", { method: "POST" });
  useAuthStore.getState().clearUser();
  useAuthStore.getState().clearToken();
}
