import { PanelCard } from "@/components/dashboard/shared";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SearchBlockProps = {
  className?: string;
  query: string;
  onQuery: (query: string) => void;
  onClear: () => void;
};

export function SearchBlock({
  className,
  query,
  onQuery,
  onClear
}: SearchBlockProps) {
  return (
    <PanelCard className={cn(
      'p-4 h-full border-slate-200/80',
      className
    )}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
          Search
        </h2>
        <Button variant="outline" size="sm" onClick={onClear} className="hover:cursor-pointer">clear</Button>
      </div>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Search by title, tags or author
      </p>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 ring-1 ring-inset ring-zinc-200 focus-within:ring-indigo-400 dark:bg-zinc-950/60 dark:ring-slate-700">
        <Search className="text-zinc-500 dark:text-zinc-400" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search threads…"
          className="w-full bg-transparent text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none dark:text-zinc-50 dark:placeholder:text-zinc-500"
        />
      </div>
    </PanelCard>
  );
}
