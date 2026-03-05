"use client";

import { useEffect, useState } from "react";
import { Search, CheckCircle, ShieldAlert } from "lucide-react";

import { Report } from "../_data/admin";
import { fetchReports } from "../_data/admin-service";

import { DataTable, Column, Action } from "../_components/data-table";
import Pagination from "../_components/pagination";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const loadReports = async () => {
    const res = await fetchReports(page, limit, search);
    setReports(res.data);
    setTotalPages(res.totalPages);
  };

  useEffect(() => {
    loadReports();
  }, [page, search]);

  const columns: Column<Report>[] = [
    {
      header: "Type & Target",
      accessor: (report) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-tiny font-bold px-1.5 py-0 h-5 border-slate-300"
            >
              {report.targetType}
            </Badge>
            <span className="font-semibold text-slate-900 dark:text-slate-100 truncate max-w-xs">
              {report.targetTitle}
            </span>
          </div>
          <span className="text-xs text-slate-500">
            Reporter: {report.reporterName}
          </span>
        </div>
      ),
    },
    {
      header: "Violation",
      accessor: (report) => (
        <div className="flex flex-col gap-1 max-w-xs">
          <Badge
            className={cn(
              "w-fit text-tiny",
              report.type === "SPAM" && "bg-slate-100 text-slate-700",
              report.type === "ABUSE" &&
                "bg-red-50 text-red-700 border-red-100",
              report.type === "HARASSMENT" &&
                "bg-purple-50 text-purple-700 border-purple-100",
              report.type === "MISINFORMATION" &&
                "bg-amber-50 text-amber-700 border-amber-100",
            )}
          >
            {report.type}
          </Badge>
          <p className="text-xs text-slate-600 dark:text-slate-400 italic line-clamp-1">
            "{report.reason}"
          </p>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (report) => (
        <Badge
          className={cn(
            "rounded-md",
            report.status === "OPEN" &&
              "bg-red-500 text-white hover:bg-red-600",
            report.status === "IN_REVIEW" &&
              "bg-amber-400 text-white hover:bg-amber-500",
            report.status === "RESOLVED" &&
              "bg-slate-100 text-slate-500 border-transparent",
          )}
        >
          {report.status.replace("_", " ")}
        </Badge>
      ),
    },
    {
      header: "Reported Date",
      accessor: (report) => (
        <span className="text-slate-500 text-sm">
          {new Date(report.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
  ];

  const actions: Action<Report>[] = [
    {
      label: "Review Detail",
      icon: <Search className="w-4 h-4" />,
      onClick: (row) => console.log("Reviewing", row.id),
    },
    {
      label: "Mark Resolved",
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      onClick: (row) => console.log("Resolving", row.id),
    },
    {
      label: "Take Action",
      icon: <ShieldAlert className="w-4 h-4 text-primary" />,
      onClick: (row) => console.log("Moderate Target", row.targetId),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border shadow-sm">
        <div className="relative w-full md:max-w-half">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search reports..."
            className="pl-10 h-10 border-slate-200 focus-visible:ring-primary transition-all"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm overflow-hidden">
        <DataTable<Report> data={reports} columns={columns} actions={actions} />
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-slate-400">
          Showing {reports.length} moderation items
        </p>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}