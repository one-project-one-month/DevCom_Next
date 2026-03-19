"use client";

import { usePathname } from "next/navigation";

import { useMeQuery } from "@/hooks/use-auth";
import { readAuthTokenCookie } from "@/lib/auth/user-cookie";
import { useAuthStore } from "@/store/auth-store";

export function AuthBootstrap() {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const isPublicRoute = pathname === "/login" || pathname === "/callback";
  const token = readAuthTokenCookie();

  useMeQuery(Boolean(token) && !user && !isPublicRoute);
  return null;
}
