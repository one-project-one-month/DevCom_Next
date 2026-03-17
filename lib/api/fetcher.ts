import axios, { AxiosError } from "axios";

import type { ApiErrorPayload, ApiRequestOptions } from "@/types/api";
import { useAuthStore } from "@/store/auth-store";

let redirectingForAuth = false;
let refreshInFlight: Promise<string | null> | null = null;

function isInvalidToken(payload?: ApiErrorPayload, status?: number) {
  if (status === 401) return true;
  const message = payload?.message?.toLowerCase();
  return message === "invalid token" || message === "unauthorized";
}

async function handleInvalidAuth(): Promise<void> {
  if (typeof window === "undefined" || redirectingForAuth) return;
  redirectingForAuth = true;

  try {
    await axios.post(
      resolveUrl("/api/auth/logout"),
      {},
      { withCredentials: true },
    );
  } catch {
    // ignore logout failures
  }

  useAuthStore.getState().clearUser();
  useAuthStore.getState().clearToken();

  const next = window.location.pathname + window.location.search;
  window.location.assign(`/login?next=${encodeURIComponent(next)}`);
}

async function refreshAccessToken(): Promise<string | null> {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  refreshInFlight = (async () => {
    try {
      const response = await axios.post(
        resolveUrl("/api/auth/refresh"),
        {},
        { withCredentials: true },
      );
      const accessToken = response.data?.accessToken ?? null;
      const user = response.data?.user;
      if (user) {
        useAuthStore.getState().setUser(user);
      }
      if (accessToken) {
        useAuthStore.getState().setToken(accessToken);
      }
      return accessToken;
    } catch {
      return null;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}

export class ApiError extends Error {
  status: number;
  payload?: ApiErrorPayload;

  constructor(message: string, status: number, payload?: ApiErrorPayload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function resolveUrl(path: string, baseUrl?: string) {
  const base =
    baseUrl ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    "http://localhost:4000";

  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export async function apiFetch<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
  baseUrl?: string,
): Promise<TResponse> {
  const { method = "GET", headers, body, signal, params, timeout } = options;
  const token = useAuthStore.getState().token;
  const mergedHeaders =
    token && !headers?.Authorization
      ? { ...headers, Authorization: `Bearer ${token}` }
      : headers;

  try {
    const response = await axios.request<TResponse>({
      url: resolveUrl(path, baseUrl),
      method,
      headers: mergedHeaders,
      data: body,
      signal,
      params,
      timeout,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorPayload>;
    const status = axiosError.response?.status ?? 500;
    const payload = axiosError.response?.data;
    const message = payload?.message ?? axiosError.message ?? "Request failed";
    if (isInvalidToken(payload, status) && path !== "/api/auth/refresh") {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        const retryHeaders =
          refreshed && !headers?.Authorization
            ? { ...headers, Authorization: `Bearer ${refreshed}` }
            : headers;
        const retry = await axios.request<TResponse>({
          url: resolveUrl(path, baseUrl),
          method,
          headers: retryHeaders,
          data: body,
          signal,
          params,
          timeout,
          withCredentials: true,
        });
        return retry.data;
      }

      handleInvalidAuth();
    }
    throw new ApiError(message, status, payload);
  }
}

export const api = {
  get: <TResponse>(
    path: string,
    options: Omit<ApiRequestOptions, "method"> = {},
  ) => apiFetch<TResponse>(path, { ...options, method: "GET" }),
  post: <TResponse>(
    path: string,
    body?: unknown,
    options: Omit<ApiRequestOptions, "method" | "body"> = {},
  ) => apiFetch<TResponse>(path, { ...options, method: "POST", body }),
  patch: <TResponse>(
    path: string,
    body?: unknown,
    options: Omit<ApiRequestOptions, "method" | "body"> = {},
  ) => apiFetch<TResponse>(path, { ...options, method: "PATCH", body }),
  delete: <TResponse>(
    path: string,
    options: Omit<ApiRequestOptions, "method"> = {},
  ) => apiFetch<TResponse>(path, { ...options, method: "DELETE" }),
};
