"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useMeQuery } from "@/hooks/use-auth";
import { readUserCookie } from "@/lib/auth/user-cookie";
import { useAuthStore } from "@/store/auth-store";

export function AuthBootstrap() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const pathname = usePathname();
  const isPublicRoute = pathname === "/login" || pathname === "/callback";
  const cachedUser = readUserCookie();

  useMeQuery(!isPublicRoute);

  useEffect(() => {
    if (!user && cachedUser) {
      setUser(cachedUser);
    }
  }, [cachedUser, setUser, user]);
  return null;
}
