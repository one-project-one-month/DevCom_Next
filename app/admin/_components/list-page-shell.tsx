"use client";

import { ReactNode } from "react";
import { Search } from "lucide-react";

import Pagination from "./pagination";
import { Input } from "@/components/ui/input";

type ListPageShellProps = {
  searchPlaceholder: string;
  search: string;
  onSearchChange: (value: string) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  summaryText: string;
  children: ReactNode;
};

export default function ListPageShell({
  searchPlaceholder,
  search,
  onSearchChange,
  page,
  totalPages,
  onPageChange,
  summaryText,
  children,
}: ListPageShellProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="rounded-xl border bg-white p-4 shadow-sm dark:bg-slate-900">
        <div className="relative w-full md:max-w-half">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder={searchPlaceholder}
            className="h-10 border-slate-200 pl-10 transition-all focus-visible:ring-primary"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {children}

      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-slate-500">{summaryText}</p>
        <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
      </div>
    </div>
  );
}
