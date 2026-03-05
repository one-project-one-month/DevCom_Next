"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  PanelLeftClose,
  PanelLeftOpen,
  Terminal,
  ChevronRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { ADMIN_NAV_ITEMS } from "../_config/navigation"

export function DesktopSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col border-r border-slate-200 bg-white dark:bg-slate-950 dark:border-slate-800 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-100 dark:border-slate-900">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="bg-primary p-1.5 rounded-lg shadow-sm">
               <Terminal size={18} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white tracking-tight">
              DevAdmin
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-primary hover:bg-primary-dull/10"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </Button>
      </div>

      <nav className="flex flex-col gap-1 p-3 mt-4">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-dull/10 text-primary"
                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />
                )}

                <item.icon className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
                )} size={20} />
                
                {!collapsed && (
                  <div className="flex items-center justify-between w-full">
                    <span>{item.name}</span>
                    {isActive && <ChevronRight size={14} className="opacity-50" />}
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export function MobileSidebar() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 bg-white dark:bg-slate-950 p-0 border-r-slate-200">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex h-16 items-center px-6 border-b border-slate-100 dark:border-slate-900 mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
               <Terminal size={18} />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">DevAdmin</span>
          </div>
        </div>

        <nav className="flex flex-col gap-2 px-4">
          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium",
                    isActive
                      ? "bg-primary-dull/10 text-primary"
                      : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900"
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
