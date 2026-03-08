import { PanelCard } from "@/components/dashboard/shared";
import { Select } from "@/components/ui/select";
import { Segmented } from "@/components/ui/segmented";
import { FilterFeedPostType,  FilterFeedPostSortType, FilterFeedPostStatus } from "@/app/saved-posts/_types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type FilterBlockProps = {
  className?: string;
  type: FilterFeedPostType;
  onTypeChange: (value: FilterFeedPostType) => void;
  status: FilterFeedPostStatus;
  onStatusChange: (value: FilterFeedPostStatus) => void;
  sort: FilterFeedPostSortType;
  onSortChange: (value: FilterFeedPostSortType) => void;
  onClear: () => void;
};

const typeOptions:{ value: FilterFeedPostType, label: string }[] = [
  {
    value: "All",
    label: "All types"
  },
  {
    value: "Question",
    label: "Question"
  },
  {
    value: "Guide",
    label: "Guide"
  },
  {
    value: "RFC",
    label: "RFC"
  },
  {
    value: "Build Log",
    label: "Build Log"
  },
];

const statusOptions: { value: FilterFeedPostStatus, label: string }[] = [
  {
    value: "All",
    label: "All"
  },
  {
    value: "Solved",
    label: "Solved"
  },
  {
    value: "Reviewing",
    label: "Reviewing"
  },
];

const sortOptions: { value: FilterFeedPostSortType, label: string }[] = [
  {
    value: "newest",
    label: "Newest saved"
  },
  {
    value: "helpful",
    label: "Most helpful"
  },
];

export function FilterBlock({
  className,
  type,
  onTypeChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
  onClear
}: FilterBlockProps) {
  return (
    <PanelCard className={cn(
      " p-4 h-full border-slate-200/80",
      className
    )}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
          Filters
        </h2>
        <Button variant="outline" size="sm" onClick={onClear} className="hover:cursor-pointer">clear</Button>
      </div>

      <div className="mt-5 space-y-6">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Type
          </p>
          <Select
            value={type}
            onValueChange={onTypeChange}
            options={typeOptions}
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Status
          </p>
          <Segmented
            type="single"
            value={status}
            onValueChange={(v) => onStatusChange(v as FilterFeedPostStatus)}
            options={statusOptions}
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Sort
          </p>
          <Select
            value={sort}
            onValueChange={(v) => onSortChange(v as FilterFeedPostSortType)}
            options={sortOptions}
          />
        </div>
      </div>
    </PanelCard>
  );
}
