"use client";

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  const visiblePages = (() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);
    const pages = new Set([1, totalPages, start, page, end]);
    return Array.from(pages).sort((a, b) => a - b);
  })();

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onChange(Math.max(1, page - 1))}
            disabled={page === 1}
          />
        </PaginationItem>

        {visiblePages.map((num, index) => {
          const prev = visiblePages[index - 1];
          const needsGap = prev && num - prev > 1;

          return (
            <PaginationItem key={num}>
              {needsGap ? <PaginationEllipsis /> : null}
              <PaginationLink
                isActive={num === page}
                onClick={() => onChange(num)}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => onChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
