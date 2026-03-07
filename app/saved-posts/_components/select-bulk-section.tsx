"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type SelectBulkProps = {
  allSelected: boolean;
  someSelected: boolean;
  selectedCount: number;
  visibleCount: number;
  onToggleAll: () => void;
  onClearAll: () => void;
  onBulkUnsave: () => void;
};

export function SelectBulkSection({
 allSelected,
 someSelected,
 selectedCount,
 visibleCount,
 onToggleAll,
 onClearAll,
 onBulkUnsave,
}: SelectBulkProps) {

  const bulkChecked = allSelected
    ? true
    : someSelected
      ? "indeterminate"
      : false;

  if (selectedCount === 0) return  null;

  const selectionLabel =
    selectedCount === visibleCount
      ? `All ${visibleCount} threads selected`
      : `${selectedCount} of ${visibleCount} threads selected`;

  return  (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t lg:border-none bg-transparent border-slate-200 px-4 backdrop-blur-lg dark:border-slate-800 lg:static lg:z-auto lg:border-0 lg:p-0 lg:backdrop-blur-0 lg:px-4 min-h-16 flex flex-wrap justify-between items-center gap-2">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Checkbox checked={bulkChecked} onCheckedChange={onToggleAll} />
        </div>

        <span className="text-sm text-slate-500 dark:text-slate-400">
          {selectionLabel}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="hover:cursor-pointer"
        >
          Clear
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onBulkUnsave}
          className="hover:cursor-pointer"
        >
          Unsave
        </Button>
      </div>
    </div>
  );
}
