"use client"

import { usePathname } from "next/navigation"
import { MobileSidebar } from "./sidebar"
import { ADMIN_ROUTE_TITLES } from "../_config/navigation"

export default function AdminHeader() {
  const pathname = usePathname()

  const currentPage = ADMIN_ROUTE_TITLES[pathname] || {
    title: pathname.split("/").pop()?.replace("-", " ") || "Admin",
    subtitle: "Management Area"
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <MobileSidebar />
        </div>

        <div className="flex flex-col">
          <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-base capitalize">
            {currentPage.title}
          </h1>
         
          <p className="hidden text-xs text-slate-500 md:block">
            {currentPage.subtitle}
          </p>
        </div>
      </div>

      
    </header>
  )
}
