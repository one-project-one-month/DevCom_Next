import type { AxiosRequestConfig } from "axios";

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiRequestOptions = {
  method?: ApiMethod;
  headers?: AxiosRequestConfig["headers"];
  body?: unknown;
  signal?: AbortSignal;
  params?: Record<string, string | number | boolean | null | undefined>;
  timeout?: number;
};

export type ApiErrorPayload = {
  message?: string;
  code?: string;
  [key: string]: unknown;
};
