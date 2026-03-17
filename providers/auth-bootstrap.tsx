"use client";

import { useMeQuery } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth-store";

export function AuthBootstrap() {
  const user = useAuthStore((state) => state.user);
  useMeQuery(!user);
  return null;
}
