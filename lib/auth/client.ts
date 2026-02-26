"use client";

import type {
  AuthResult,
  ManualAuthResponse,
  ManualLoginInput,
  ManualRegisterInput,
  OAuthProvider,
} from "@/lib/auth/types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ?? "";

async function parseJsonSafe(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function backendEndpoint(path: string) {
  if (!BACKEND_URL) {
    return null;
  }
  return `${BACKEND_URL}${path}`;
}

export async function loginWithEmail(
  payload: ManualLoginInput,
): Promise<AuthResult<ManualAuthResponse>> {
  const endpoint = backendEndpoint("/auth/login");
  if (!endpoint) {
    return { ok: false, error: "NEXT_PUBLIC_BACKEND_URL is not set." };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await parseJsonSafe(response);
  if (!response.ok) {
    return { ok: false, error: body?.error ?? "Login failed." };
  }

  return { ok: true, data: body };
}

export async function registerWithEmail(
  payload: ManualRegisterInput,
): Promise<AuthResult<ManualAuthResponse>> {
  const endpoint = backendEndpoint("/auth/register");
  if (!endpoint) {
    return { ok: false, error: "NEXT_PUBLIC_BACKEND_URL is not set." };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await parseJsonSafe(response);
  if (!response.ok) {
    return { ok: false, error: body?.error ?? "Registration failed." };
  }

  return { ok: true, data: body };
}

export function startOAuthLogin(provider: OAuthProvider, callbackUrl = "/"): AuthResult<null> {
  const endpoint = backendEndpoint(`/auth/oauth/${provider}`);
  if (!endpoint) {
    return { ok: false, error: "NEXT_PUBLIC_BACKEND_URL is not set." };
  }

  const url = new URL(endpoint);
  url.searchParams.set("callbackUrl", callbackUrl);
  window.location.assign(url.toString());
  return { ok: true };
}
