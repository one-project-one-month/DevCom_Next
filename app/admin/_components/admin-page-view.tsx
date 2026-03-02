"use client";

import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import { Search } from "lucide-react";

import {
  adminReports,
  adminUsers,
} from "@/app/admin/_data/admin.mock";
import type { ReportStatus, UserRow, UserStatus } from "@/app/admin/_types";
import { PanelCard } from "@/components/dashboard/shared";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 5;

function Pagination({
  page,
  totalPages,
  onPrev,
  onNext,
  totalItems,
}: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  totalItems: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/70">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Page {Math.min(page, totalPages)} of {totalPages} ({totalItems} items)
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={page <= 1}
          className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={page >= totalPages}
          className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function profileHrefFromHandle(handle: string) {
  const slug = handle.replace(/^@/, "");
  if (slug === "hhlaing.swan") {
    return "/profile";
  }
  return `/profile/${slug}`;
}

export function AdminPageView() {
  const [activeTab, setActiveTab] = useState<"users" | "reports">("reports");
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

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if (userStatusFilter !== "all" && user.status !== userStatusFilter) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return (
        user.name.toLowerCase().includes(normalizedQuery) ||
        user.handle.toLowerCase().includes(normalizedQuery) ||
        user.role.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [users, normalizedQuery, userStatusFilter]);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      if (
        reportStatusFilter !== "all" &&
        report.status !== reportStatusFilter
      ) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return (
        report.type.toLowerCase().includes(normalizedQuery) ||
        report.targetType.toLowerCase().includes(normalizedQuery) ||
        report.targetTitle.toLowerCase().includes(normalizedQuery) ||
        report.reporterName.toLowerCase().includes(normalizedQuery) ||
        report.reason.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [reports, normalizedQuery, reportStatusFilter]);

  const userTotalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / PAGE_SIZE),
  );
  const reportTotalPages = Math.max(
    1,
    Math.ceil(filteredReports.length / PAGE_SIZE),
  );

  const paginatedUsers = useMemo(() => {
    const safePage = Math.min(userPage, userTotalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, userPage, userTotalPages]);

  const paginatedReports = useMemo(() => {
    const safePage = Math.min(reportPage, reportTotalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredReports.slice(start, start + PAGE_SIZE);
  }, [filteredReports, reportPage, reportTotalPages]);

  function toggleBan(userId: string) {
    setUsers((current) =>
      current.map((user) => {
        if (user.id !== userId) {
          return user;
        }

        return {
          ...user,
          status: user.status === "active" ? "suspended" : "active",
        };
      }),
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
    <main className="h-screen overflow-hidden bg-[#f3f5f9] px-4 py-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto grid h-full w-full max-w-365 min-h-0 gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
          <PanelCard className="h-fit p-3 lg:h-full">
            <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Admin Routes
            </p>
            <nav className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("reports");
                  setSearchQuery("");
                  setReportPage(1);
                  setExpandedReportId(null);
                }}
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition",
                  activeTab === "reports"
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                )}
              >
                Report List
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("users");
                  setSearchQuery("");
                  setUserPage(1);
                }}
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition",
                  activeTab === "users"
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                )}
              >
                User List
              </button>
            </nav>
          </PanelCard>

          <PanelCard className="flex h-full min-h-0 flex-col p-5">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {activeTab === "reports"
                  ? "Reported Content"
                  : "User Directory"}
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
                      ? "Search users by name, handle, role"
                      : "Search reports by title, reporter, reason"
                  }
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
                  aria-label="Search table rows"
                />
              </div>

              {activeTab === "users" ? (
                <select
                  value={userStatusFilter}
                  onChange={(event) => {
                    setUserStatusFilter(
                      event.target.value as "all" | UserStatus,
                    );
                    setUserPage(1);
                  }}
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
                  aria-label="Filter users by status"
                >
                  <option value="all">All users</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              ) : (
                <select
                  value={reportStatusFilter}
                  onChange={(event) => {
                    setReportStatusFilter(
                      event.target.value as "all" | ReportStatus,
                    );
                    setReportPage(1);
                    setExpandedReportId(null);
                  }}
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
                  aria-label="Filter reports by status"
                >
                  <option value="all">All reports</option>
                  <option value="open">Open</option>
                  <option value="in_review">In review</option>
                  <option value="resolved">Resolved</option>
                </select>
              )}
            </div>

            <div className="mt-4 min-h-0 flex-1 overflow-auto rounded-xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900">
              {activeTab === "users" ? (
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-100/90 dark:bg-slate-800/90">
                    <tr>
                      <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-300">
                        Name
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-300">
                        Handle
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-300">
                        Role
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-300">
                        Status
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-300">
                        Joined
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.length > 0 ? (
                      paginatedUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-t border-slate-200 transition hover:bg-blue-50/50 dark:border-slate-700 dark:hover:bg-slate-800/60"
                        >
                          <td className="px-4 py-3.5 align-top text-sm font-medium text-slate-900 dark:text-slate-100">
                            {user.name}
                          </td>
                          <td className="px-4 py-3.5 align-top text-sm text-slate-600 dark:text-slate-300">
                            {user.handle}
                          </td>
                          <td className="px-4 py-3.5 align-top text-sm text-slate-600 dark:text-slate-300">
                            {user.role}
                          </td>
                          <td className="px-4 py-3.5 align-top">
                            <span
                              className={cn(
                                "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                                user.status === "active"
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                                  : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
                              )}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 align-top text-sm text-slate-600 dark:text-slate-300">
                            {user.joinedAt}
                          </td>
                          <td className="px-4 py-3.5 align-top">
                            <div className="flex flex-wrap items-center gap-2">
                              <Link
                                href={profileHrefFromHandle(user.handle)}
                                className="inline-flex rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                              >
                                View Profile
                              </Link>
                              <button
                                type="button"
                                onClick={() => toggleBan(user.id)}
                                className={cn(
                                  "inline-flex rounded-lg px-2.5 py-1 text-xs font-medium transition",
                                  user.status === "active"
                                    ? "bg-red-600 text-white hover:bg-red-700"
                                    : "bg-emerald-600 text-white hover:bg-emerald-700",
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
                        <td
                          colSpan={6}
                          className="px-4 py-8 text-center text-slate-500 dark:text-slate-400"
                        >
                          No users found for current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-100/90 dark:bg-slate-800/90">
                    <tr>
                      <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-300">
                        Type
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-300">
                        Reported Post
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-300">
                        Reporter
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-300">
                        Status
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-300">
                        Created
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedReports.length > 0 ? (
                      paginatedReports.map((report) => (
                        <Fragment key={report.id}>
                          <tr className="border-t border-slate-200 transition hover:bg-blue-50/50 dark:border-slate-700 dark:hover:bg-slate-800/60">
                            <td className="px-4 py-3.5 align-top capitalize text-sm font-medium text-slate-900 dark:text-slate-100">
                              {report.type}
                            </td>
                            <td className="max-w-sm px-4 py-3.5 align-top text-sm text-slate-600 dark:text-slate-300">
                              {report.targetTitle}
                            </td>
                            <td className="px-4 py-3.5 align-top text-sm text-slate-600 dark:text-slate-300">
                              {report.reporterName}
                            </td>
                            <td className="px-4 py-3.5 align-top">
                              <span
                                className={cn(
                                  "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                                  report.status === "open"
                                    ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                                    : report.status === "in_review"
                                      ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
                                )}
                              >
                                {report.status.replace("_", " ")}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 align-top text-sm text-slate-600 dark:text-slate-300">
                              {report.createdAt}
                            </td>
                            <td className="px-4 py-3.5 align-top">
                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedReportId((current) =>
                                      current === report.id ? null : report.id,
                                    )
                                  }
                                  className="inline-flex rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                  {expandedReportId === report.id
                                    ? "Hide Detail"
                                    : "Show Detail"}
                                </button>
                                {report.targetType === "post" ? (
                                  <Link
                                    href={`/PostDetail/${report.targetId}`}
                                    className="inline-flex rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-blue-700"
                                  >
                                    View Post
                                  </Link>
                                ) : null}
                              </div>
                            </td>
                          </tr>
                          {expandedReportId === report.id ? (
                            <tr className="border-t border-slate-200 bg-slate-100/70 dark:border-slate-700 dark:bg-slate-800/70">
                              <td colSpan={6} className="px-4 py-3.5">
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                  Report Detail
                                </p>
                                <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                                  {report.reason}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateReportStatus(report.id, "in_review")
                                    }
                                    className="rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 transition hover:bg-amber-100 dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-300"
                                  >
                                    Mark In Review
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateReportStatus(report.id, "resolved")
                                    }
                                    className="rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-300"
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
                        <td
                          colSpan={6}
                          className="px-4 py-8 text-center text-slate-500 dark:text-slate-400"
                        >
                          No reports found for current filters.
                        </td>
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
                onPrev={() =>
                  setUserPage((current) => Math.max(1, current - 1))
                }
                onNext={() =>
                  setUserPage((current) =>
                    Math.min(userTotalPages, current + 1),
                  )
                }
              />
            ) : (
              <Pagination
                page={Math.min(reportPage, reportTotalPages)}
                totalPages={reportTotalPages}
                totalItems={filteredReports.length}
                onPrev={() =>
                  setReportPage((current) => Math.max(1, current - 1))
                }
                onNext={() =>
                  setReportPage((current) =>
                    Math.min(reportTotalPages, current + 1),
                  )
                }
              />
            )}
          </PanelCard>
      </div>
    </main>
  );
}
