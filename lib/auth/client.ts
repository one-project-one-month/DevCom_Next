"use client";

import { api } from "@/lib/api/fetcher";
import type {
  MeResponse,
  OAuthLoginUrlResponse,
  OAuthProvider,
} from "@/lib/auth/types";

export function getOAuthLoginUrl(provider: OAuthProvider): Promise<OAuthLoginUrlResponse> {
  return api.get<OAuthLoginUrlResponse>(`/api/auth/${provider}/login`);
}

export async function startOAuthLogin(provider: OAuthProvider): Promise<void> {
  const { url } = await getOAuthLoginUrl(provider);
  window.location.assign(url);
}

export function getAuthMe(): Promise<MeResponse> {
  return api.get<MeResponse>("/api/auth/me");
}
