import axios, { AxiosError } from "axios";

import type { ApiErrorPayload, ApiRequestOptions } from "@/types/api";

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
  const base = baseUrl ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  if (!base) return path;
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export async function apiFetch<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
  baseUrl?: string,
): Promise<TResponse> {
  const { method = "GET", headers, body, signal, params, timeout } = options;

  try {
    const response = await axios.request<TResponse>({
      url: resolveUrl(path, baseUrl),
      method,
      headers,
      data: body,
      signal,
      params,
      timeout,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorPayload>;
    const status = axiosError.response?.status ?? 500;
    const payload = axiosError.response?.data;
    const message = payload?.message ?? axiosError.message ?? "Request failed";
    throw new ApiError(message, status, payload);
  }
}

export const api = {
  get: <TResponse>(path: string, options: Omit<ApiRequestOptions, "method"> = {}) =>
    apiFetch<TResponse>(path, { ...options, method: "GET" }),
  post: <TResponse>(path: string, body?: unknown, options: Omit<ApiRequestOptions, "method" | "body"> = {}) =>
    apiFetch<TResponse>(path, { ...options, method: "POST", body }),
  patch: <TResponse>(path: string, body?: unknown, options: Omit<ApiRequestOptions, "method" | "body"> = {}) =>
    apiFetch<TResponse>(path, { ...options, method: "PATCH", body }),
  delete: <TResponse>(path: string, options: Omit<ApiRequestOptions, "method"> = {}) =>
    apiFetch<TResponse>(path, { ...options, method: "DELETE" }),
};
