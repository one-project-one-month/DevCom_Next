"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";

export function FilterComment() {
  const [filter, setfilter] = React.useState({
    top: true,
    recent: false,
    oldest: false,
  });

  const selected = filter.top
    ? "Top"
    : filter.recent
      ? "Newest"
      : "Oldest";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-9 rounded-lg border-slate-300 bg-white/80 px-3 text-xs font-medium hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800/80"
        >
          {selected}
          <ChevronsUpDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-2" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-base font-semibold p-2">
            Sort Discussion:
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={filter.top}
            onCheckedChange={(checked) =>
              setfilter({ top: checked === true, recent: false, oldest: false })
            }
          >
            <div>
              <div className="text-base font-semibold">Top</div>
              <div className="text-xs text-slate-500">
                Most relevant comments are shown first, based on factors like
                upvotes and replies.
              </div>
            </div>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filter.recent}
            onCheckedChange={(checked) =>
              setfilter({ top: false, recent: checked === true, oldest: false })
            }
          >
            <div>
              <div className="text-base font-semibold">Most Recent</div>
              <div className="text-xs text-slate-500">
                Comments are displayed in chronological order, with the newest
                comments appearing first.
              </div>
            </div>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filter.oldest}
            onCheckedChange={(checked) =>
              setfilter({ top: false, recent: false, oldest: checked === true })
            }
          >
            <div>
              <div className="text-base font-semibold">Oldest First</div>
              <div className="text-xs text-slate-500">
                Comments are displayed in chronological order, with the oldest
                comments appearing first.
              </div>
            </div>
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
