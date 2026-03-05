"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
}: Props<T>) {
  return (
    <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
            <tr>
              {columns.map((col, i) => (
                <th 
                  key={i} 
                  className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                >
                  {col.header}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.length > 0 ? (
              data.map((row) => (
                <tr 
                  key={row.id} 
                  className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors"
                >
                  {columns.map((col, i) => (
                    <td key={i} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                      {getCellContent(row, col.accessor)}
                    </td>
                  ))}

                  {actions && actions.length > 0 && (
                    <td className="px-4 py-3 text-right">
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
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length + (actions ? 1 : 0)} 
                  className="px-4 py-12 text-center text-slate-400 italic text-sm"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
