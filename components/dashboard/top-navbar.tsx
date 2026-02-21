import { Bell, LayoutGrid, MessageCircle, Search, Sparkles } from "lucide-react";

import { AvatarCircle, IconButton, PanelCard } from "@/components/dashboard/shared";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function TopNavbar() {
  return (
    <PanelCard className="mb-6 flex items-center justify-between px-5 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          DevLoop
        </p>
      </div>

      <div className="mx-6 flex max-w-md flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800">
        <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
        <input
          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
          placeholder="Search creators, posts, topics"
        />
      </div>

      <nav className="flex items-center gap-2">
        <IconButton>
          <LayoutGrid className="h-4 w-4" />
        </IconButton>
        <IconButton>
          <MessageCircle className="h-4 w-4" />
        </IconButton>
        <IconButton>
          <Bell className="h-4 w-4" />
        </IconButton>
        <AnimatedThemeToggler className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100" />
        <AvatarCircle className="ml-1 h-9 w-9" />
      </nav>
    </PanelCard>
  );
}
