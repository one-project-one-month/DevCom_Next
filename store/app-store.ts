import { create } from "zustand";
import type { ReactNode } from "react";

type ToastVariant = "default" | "destructive" | "success";

export type ToastProps = {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  variant?: ToastVariant;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type AppState = {
  apiBaseUrl: string;
  setApiBaseUrl: (value: string) => void;
  cache: Record<string, unknown>;
  setCache: (key: string, value: unknown) => void;
  clearCache: (key?: string) => void;
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id">) => {
    id: string;
    dismiss: () => void;
    update: (newProps: Partial<ToastProps>) => void;
  };
  updateToast: (toast: Partial<ToastProps> & { id: string }) => void;
  dismissToast: (toastId?: string) => void;
  removeToast: (toastId?: string) => void;
};

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export const useAppStore = create<AppState>((set, get) => ({
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  setApiBaseUrl: (value) => set({ apiBaseUrl: value }),
  cache: {},
  setCache: (key, value) =>
    set((state) => ({
      cache: { ...state.cache, [key]: value },
    })),
  clearCache: (key) =>
    set((state) => {
      if (!key) return { cache: {} };
      const next = { ...state.cache };
      delete next[key];
      return { cache: next };
    }),
  toasts: [],
  addToast: (toast) => {
    const id = generateId();
    const dismiss = () => get().dismissToast(id);
    const update = (newProps: Partial<ToastProps>) =>
      get().updateToast({ ...newProps, id });

    const toastData: ToastProps = {
      ...toast,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    };

    set((state) => ({
      toasts: [toastData, ...state.toasts].slice(0, TOAST_LIMIT),
    }));

    return { id, dismiss, update };
  },
  updateToast: (toast) =>
    set((state) => ({
      toasts: state.toasts.map((item) =>
        item.id === toast.id ? { ...item, ...toast } : item,
      ),
    })),
  dismissToast: (toastId) => {
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toastId
          ? toast.id === toastId
            ? { ...toast, open: false }
            : toast
          : { ...toast, open: false },
      ),
    }));

    setTimeout(() => {
      get().removeToast(toastId);
    }, TOAST_REMOVE_DELAY);
  },
  removeToast: (toastId) =>
    set((state) => ({
      toasts: toastId
        ? state.toasts.filter((toast) => toast.id !== toastId)
        : [],
    })),
}));
