"use client";

import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import { Menu, Search, X } from "lucide-react";

import { adminReports, adminUsers } from "@/app/admin/_data/admin.mock";
import type { ReportStatus, UserRow, UserStatus } from "@/app/admin/_types";
import { PanelCard } from "@/components/dashboard/shared";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 5;

function Pagination({
  page,
  totalPages,
  totalItems,
  onPrev,
  onNext,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2 text-xs dark:border-slate-700">
      <p className="text-slate-500 dark:text-slate-400">
        Page {Math.min(page, totalPages)} / {totalPages} ({totalItems})
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={page <= 1}
          className="rounded-md border border-slate-300 px-2 py-1 text-slate-700 disabled:opacity-40 dark:border-slate-600 dark:text-slate-200"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={page >= totalPages}
          className="rounded-md border border-slate-300 px-2 py-1 text-slate-700 disabled:opacity-40 dark:border-slate-600 dark:text-slate-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function profileHrefFromHandle(handle: string) {
  const slug = handle.replace(/^@/, "");
  if (slug === "hhlaing.swan") return "/profile";
  return `/profile/${slug}`;
}

export function AdminPageView() {
  const [activeTab, setActiveTab] = useState<"reports" | "users">("reports");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<UserRow[]>(adminUsers);
  const [reports, setReports] = useState(adminReports);
  const [userStatusFilter, setUserStatusFilter] = useState<"all" | UserStatus>(
    "all",
  );
  const [reportStatusFilter, setReportStatusFilter] = useState<
    "all" | ReportStatus
  >("all");
  const [expandedReportId, setExpandedReportId] = useState<string | null>(null);
  const [userPage, setUserPage] = useState(1);
  const [reportPage, setReportPage] = useState(1);

  const normalized = searchQuery.trim().toLowerCase();

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (userStatusFilter !== "all" && u.status !== userStatusFilter) return false;
      if (!normalized) return true;
      return (
        u.name.toLowerCase().includes(normalized) ||
        u.handle.toLowerCase().includes(normalized) ||
        u.role.toLowerCase().includes(normalized)
      );
    });
  }, [users, userStatusFilter, normalized]);

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      if (reportStatusFilter !== "all" && r.status !== reportStatusFilter) return false;
      if (!normalized) return true;
      return (
        r.targetTitle.toLowerCase().includes(normalized) ||
        r.reporterName.toLowerCase().includes(normalized) ||
        r.reason.toLowerCase().includes(normalized) ||
        r.type.toLowerCase().includes(normalized)
      );
    });
  }, [reports, reportStatusFilter, normalized]);

  const userTotalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const reportTotalPages = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));

  const paginatedUsers = useMemo(() => {
    const safe = Math.min(userPage, userTotalPages);
    const start = (safe - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, userPage, userTotalPages]);

  const paginatedReports = useMemo(() => {
    const safe = Math.min(reportPage, reportTotalPages);
    const start = (safe - 1) * PAGE_SIZE;
    return filteredReports.slice(start, start + PAGE_SIZE);
  }, [filteredReports, reportPage, reportTotalPages]);

  function selectTab(tab: "reports" | "users") {
    setActiveTab(tab);
    setIsDrawerOpen(false);
    setSearchQuery("");
    setExpandedReportId(null);
    setUserPage(1);
    setReportPage(1);
  }

  function toggleBan(userId: string) {
    setUsers((current) =>
      current.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "suspended" : "active" }
          : user,
      ),
    );
  }

  function updateReportStatus(reportId: string, nextStatus: ReportStatus) {
    setReports((current) =>
      current.map((report) =>
        report.id === reportId ? { ...report, status: nextStatus } : report,
      ),
    );
  }

  return (
    <main className="h-screen overflow-hidden bg-slate-100 p-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto grid h-full w-full max-w-[1460px] min-h-0 gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
        <PanelCard className="hidden h-full p-3 lg:block">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Admin Routes
          </p>
          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => selectTab("reports")}
              className={cn(
                "w-full rounded-lg px-3 py-2 text-left text-sm",
                activeTab === "reports"
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
              )}
            >
              Report List
            </button>
            <button
              type="button"
              onClick={() => selectTab("users")}
              className={cn(
                "w-full rounded-lg px-3 py-2 text-left text-sm",
                activeTab === "users"
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
              )}
            >
              User List
            </button>
          </nav>
        </PanelCard>

        <PanelCard className="flex h-full min-h-0 flex-col overflow-hidden p-4">
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm lg:hidden dark:border-slate-600"
            >
              <Menu className="h-4 w-4" /> Routes
            </button>

            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {activeTab === "reports" ? "Reported Content" : "User Directory"}
            </p>

            <div className="relative ml-auto w-full sm:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setUserPage(1);
                  setReportPage(1);
                  setExpandedReportId(null);
                }}
                placeholder={
                  activeTab === "users"
                    ? "Search users..."
                    : "Search reports..."
                }
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
              />
            </div>

            {activeTab === "users" ? (
              <select
                value={userStatusFilter}
                onChange={(event) => {
                  setUserStatusFilter(event.target.value as "all" | UserStatus);
                  setUserPage(1);
                }}
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
              >
                <option value="all">All users</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            ) : (
              <select
                value={reportStatusFilter}
                onChange={(event) => {
                  setReportStatusFilter(event.target.value as "all" | ReportStatus);
                  setReportPage(1);
                  setExpandedReportId(null);
                }}
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
              >
                <option value="all">All reports</option>
                <option value="open">Open</option>
                <option value="in_review">In review</option>
                <option value="resolved">Resolved</option>
              </select>
            )}
          </div>

          <div className="mt-3 min-h-0 flex-1 overflow-auto rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            {activeTab === "users" ? (
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Handle</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Role</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Joined</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                      <tr key={user.id} className="border-t border-slate-200 dark:border-slate-700">
                        <td className="px-4 py-3 text-sm font-medium">{user.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{user.handle}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{user.role}</td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-xs",
                            user.status === "active"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                              : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
                          )}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{user.joinedAt}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <Link href={profileHrefFromHandle(user.handle)} className="rounded-md border border-slate-300 px-2 py-1 text-xs dark:border-slate-600">View Profile</Link>
                            <button
                              type="button"
                              onClick={() => toggleBan(user.id)}
                              className={cn(
                                "rounded-md px-2 py-1 text-xs text-white",
                                user.status === "active" ? "bg-red-600" : "bg-emerald-600",
                              )}
                            >
                              {user.status === "active" ? "Ban" : "Unban"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Type</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Reported Post</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Reporter</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Created</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReports.length > 0 ? (
                    paginatedReports.map((report) => (
                      <Fragment key={report.id}>
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                          <td className="px-4 py-3 capitalize">{report.type}</td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{report.targetTitle}</td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{report.reporterName}</td>
                          <td className="px-4 py-3">
                            <span className={cn(
                              "inline-flex rounded-full px-2.5 py-1 text-xs",
                              report.status === "open"
                                ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                                : report.status === "in_review"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
                            )}>
                              {report.status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{report.createdAt}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedReportId((current) =>
                                    current === report.id ? null : report.id,
                                  )
                                }
                                className="rounded-md border border-slate-300 px-2 py-1 text-xs dark:border-slate-600"
                              >
                                {expandedReportId === report.id ? "Hide Detail" : "Show Detail"}
                              </button>
                              {report.targetType === "post" ? (
                                <Link href={`/PostDetail/${report.targetId}`} className="rounded-md bg-blue-600 px-2 py-1 text-xs text-white">View Post</Link>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                        {expandedReportId === report.id ? (
                          <tr className="border-t border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70">
                            <td colSpan={6} className="px-4 py-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Report Detail</p>
                              <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{report.reason}</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => updateReportStatus(report.id, "in_review")}
                                  className="rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-xs text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-300"
                                >
                                  Mark In Review
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateReportStatus(report.id, "resolved")}
                                  className="rounded-md border border-emerald-300 bg-emerald-50 px-2 py-1 text-xs text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-300"
                                >
                                  Resolve
                                </button>
                              </div>
                            </td>
                          </tr>
                        ) : null}
                      </Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500">No reports found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {activeTab === "users" ? (
            <Pagination
              page={Math.min(userPage, userTotalPages)}
              totalPages={userTotalPages}
              totalItems={filteredUsers.length}
              onPrev={() => setUserPage((current) => Math.max(1, current - 1))}
              onNext={() =>
                setUserPage((current) => Math.min(userTotalPages, current + 1))
              }
            />
          ) : (
            <Pagination
              page={Math.min(reportPage, reportTotalPages)}
              totalPages={reportTotalPages}
              totalItems={filteredReports.length}
              onPrev={() => setReportPage((current) => Math.max(1, current - 1))}
              onNext={() =>
                setReportPage((current) => Math.min(reportTotalPages, current + 1))
              }
            />
          )}
        </PanelCard>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 transition-opacity lg:hidden",
          isDrawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          onClick={() => setIsDrawerOpen(false)}
          className="absolute inset-0 bg-slate-950/45"
          aria-label="Close routes drawer overlay"
        />
        <aside
          className={cn(
            "absolute left-0 top-0 h-full w-[84vw] max-w-[320px] border-r border-slate-200 bg-white p-3 shadow-2xl transition-transform dark:border-slate-700 dark:bg-slate-900",
            isDrawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold">Admin Routes</p>
            <button type="button" onClick={() => setIsDrawerOpen(false)} className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => selectTab("reports")}
              className={cn(
                "w-full rounded-lg px-3 py-2 text-left text-sm",
                activeTab === "reports"
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
              )}
            >
              Report List
            </button>
            <button
              type="button"
              onClick={() => selectTab("users")}
              className={cn(
                "w-full rounded-lg px-3 py-2 text-left text-sm",
                activeTab === "users"
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
              )}
            >
              User List
            </button>
          </nav>
        </aside>
      </div>
    </div>
  );
}