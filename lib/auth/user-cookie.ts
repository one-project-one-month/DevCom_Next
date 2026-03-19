import type { AuthUser } from "@/lib/auth/types";
import { AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";

const USER_COOKIE_NAME = "auth_user";

export function readUserCookie(): AuthUser | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${USER_COOKIE_NAME}=`));

  if (!cookie) {
    return null;
  }

  const value = cookie.slice(USER_COOKIE_NAME.length + 1);
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as AuthUser;
    if (!parsed?.id || !parsed?.email || !parsed?.name) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function readAuthTokenCookie(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${AUTH_TOKEN_COOKIE}=`));

  if (!cookie) {
    return null;
  }

  const value = cookie.slice(AUTH_TOKEN_COOKIE.length + 1);
  return value || null;
}
