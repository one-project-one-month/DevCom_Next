import type { ButtonHTMLAttributes, ReactNode } from "react";

type PanelCardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

type AvatarCircleProps = {
  className?: string;
  imageUrl?: string;
  name?: string;
};

type IconButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const panelCardBase =
  "rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_10px_28px_rgba(2,6,23,0.45)]";

export function PanelCard({ children, className = "" }: PanelCardProps) {
  return <div className={`${panelCardBase} ${className}`}>{children}</div>;
}

export function AvatarCircle({ className = "", imageUrl, name }: AvatarCircleProps) {
  const initial = name?.trim()?.charAt(0)?.toUpperCase();
  return (
    <div
      className={`relative overflow-hidden rounded-full bg-linear-to-br from-slate-700 to-slate-900 ${className}`}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={name ? `${name} avatar` : "User avatar"}
          className="h-full w-full object-cover"
        />
      ) : initial ? (
        <span className="flex h-full w-full items-center justify-center text-base font-semibold text-white">
          {initial}
        </span>
      ) : null}
    </div>
  );
}

export function IconButton({ children, className = "", type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={`rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 ${className}`}
    >
      {children}
    </button>
  );
}
