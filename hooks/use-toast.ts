"use client";

import { useAppStore, type ToastProps } from "@/store/app-store";

export function useToast() {
  const toasts = useAppStore((state) => state.toasts);
  const addToast = useAppStore((state) => state.addToast);
  const dismissToast = useAppStore((state) => state.dismissToast);

  return {
    toasts,
    toast: addToast,
    dismiss: dismissToast,
  };
}

export function toast(props: Omit<ToastProps, "id">) {
  return useAppStore.getState().addToast(props);
}
