"use client"

import { Button } from "@/components/ui/button"

type Props = {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <Button
          key={num}
          variant={num === page ? "default" : "outline"}
          onClick={() => onChange(num)}
        >
          {num}
        </Button>
      ))}
    </div>
  )
}