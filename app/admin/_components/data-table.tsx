"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export type Column<T> = {
  header: string
  accessor: keyof T | ((row: T) => ReactNode)
}

export type Action<T> = {
  label: string
  icon?: ReactNode
  onClick: (row: T) => void
  variant?: "default" | "destructive" 
}

type Props<T> = {
  data: T[]
  columns: Column<T>[]
  actions?: Action<T>[]
  isLoading?: boolean
  skeletonRows?: number
}

function getCellContent<T>(row: T, accessor: Column<T>["accessor"]) {
  if (typeof accessor === "function") {
    return accessor(row)
  }

  return row[accessor] as ReactNode
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  actions,
  isLoading = false,
  skeletonRows = 6,
}: Props<T>) {
  return (
    <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
          <TableRow>
            {columns.map((col, i) => (
              <TableHead key={i} className="text-slate-500 dark:text-slate-400">
                {col.header}
              </TableHead>
            ))}
            {actions && actions.length > 0 && (
              <TableHead className="text-right text-slate-500 dark:text-slate-400">
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
          {isLoading ? (
            Array.from({ length: skeletonRows }).map((_, rowIndex) => (
              <TableRow key={`skeleton-${rowIndex}`}>
                {columns.map((_, colIndex) => (
                  <TableCell key={`skeleton-cell-${rowIndex}-${colIndex}`}>
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200/70 dark:bg-slate-800" />
                  </TableCell>
                ))}
                {actions && actions.length > 0 && (
                  <TableCell>
                    <div className="ml-auto h-8 w-8 animate-pulse rounded-md bg-slate-200/70 dark:bg-slate-800" />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map((row) => (
              <TableRow
                key={row.id}
                className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors"
              >
                {columns.map((col, i) => (
                  <TableCell key={i} className="text-sm text-slate-600 dark:text-slate-300">
                    {getCellContent(row, col.accessor)}
                  </TableCell>
                ))}

                {actions && actions.length > 0 && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-slate-200 dark:hover:bg-slate-800"
                        >
                          <MoreHorizontal size={16} className="text-slate-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        {actions.map((action, i) => (
                          <DropdownMenuItem
                            key={i}
                            onClick={() => action.onClick(row)}
                            className={cn(
                              "flex items-center gap-2 cursor-pointer",
                              action.variant === "destructive" && "text-destructive focus:text-destructive focus:bg-destructive/10"
                            )}
                          >
                            {action.icon && <span className="opacity-70">{action.icon}</span>}
                            <span className="font-medium text-xs">{action.label}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-4 py-12 text-center text-slate-400 italic text-sm"
              >
                No records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
