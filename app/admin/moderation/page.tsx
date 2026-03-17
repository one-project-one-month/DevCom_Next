"use client";

import { useMemo, useState } from "react";
import { CheckCircle, Eye, Flag, ShieldAlert, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Post, Report, ReportStatus, ReportType } from "../_data/admin";
import {
  deletePost,
  fetchReportedPosts,
  fetchReports,
  updatePostStatus,
  updateReportStatus,
} from "../_data/admin-service";

import { DataTable, Column, Action } from "../_components/data-table";
import ListPageShell from "../_components/list-page-shell";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PostDetailDialog } from "@/components/post-detail/post-detail-dialog";

type ModerationRow = Post & {
  reportIds: string[];
  reportStatus?: ReportStatus;
  reportType?: ReportType;
  reporterName?: string;
};

export default function ModerationPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const limit = 7;
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["admin-posts", page, search],
    queryFn: () => fetchReportedPosts(page, limit, search),
  });

  const reportsQuery = useQuery({
    queryKey: ["admin-reports", page, search],
    queryFn: () => fetchReports(page, limit, search),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "PUBLISHED" | "FLAGGED" }) =>
      updatePostStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
    },
  });

  const reportMutation = useMutation({
    mutationFn: async ({
      ids,
      status,
    }: {
      ids: string[];
      status: "OPEN" | "IN_REVIEW" | "RESOLVED";
    }) => {
      await Promise.all(ids.map((id) => updateReportStatus(id, status)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  const posts = postsQuery.data?.data ?? [];
  const reports = reportsQuery.data?.data ?? [];
  const totalPages = postsQuery.data?.totalPages ?? 1;

  const rows: ModerationRow[] = useMemo(() => {
    const reportMap = new Map<string, Report[]>();
    reports.forEach((report) => {
      const list = reportMap.get(report.targetId) ?? [];
      list.push(report);
      reportMap.set(report.targetId, list);
    });

    const statusRank: Record<ReportStatus, number> = {
      OPEN: 3,
      IN_REVIEW: 2,
      RESOLVED: 1,
    };

    return posts.map((post) => {
      const reportList = reportMap.get(post.id) ?? [];
      const sortedByStatus = [...reportList].sort(
        (a, b) => statusRank[b.status] - statusRank[a.status],
      );
      const primary = sortedByStatus[0];
      return {
        ...post,
        reportIds: reportList.map((r) => r.id),
        reportStatus: primary?.status,
        reportType: primary?.type,
        reporterName: primary?.reporterName,
      };
    });
  }, [posts, reports]);

  const columns: Column<ModerationRow>[] = [
    {
      header: "Item",
      accessor: (item) => (
        <div className="flex flex-col gap-1 max-w-xs">
          <span className="text-xs font-semibold uppercase text-slate-400">Post</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">
            {item.title}
          </span>
          <span className="text-xs text-slate-500">by {item.authorName}</span>
        </div>
      ),
    },
    {
      header: "Post Status",
      accessor: (item) => (
        <Badge
          variant="secondary"
          className={cn(
            "font-medium",
            item.status === "PUBLISHED" &&
              "bg-green-50 text-green-700 border-green-200",
            item.status === "DRAFT" &&
              "bg-slate-100 text-slate-600",
            item.status === "FLAGGED" &&
              "bg-amber-50 text-amber-700 border-amber-200",
          )}
        >
          {item.status}
        </Badge>
      ),
    },
    {
      header: "Reports",
      accessor: (item) => (
        <Badge
          className={cn(
            "rounded-full px-2 w-fit",
            item.reportsCount > 0
              ? "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
              : "bg-slate-100 text-slate-400 border-transparent",
          )}
        >
          {item.reportsCount}
        </Badge>
      ),
    },
    {
      header: "Report Type",
      accessor: (item) =>
        item.reportType ? (
          <Badge
            className={cn(
              "w-fit text-tiny",
              item.reportType === "SPAM" && "bg-slate-100 text-slate-700",
              item.reportType === "ABUSE" &&
                "bg-red-50 text-red-700 border-red-100",
              item.reportType === "HARASSMENT" &&
                "bg-purple-50 text-purple-700 border-purple-100",
              item.reportType === "MISINFORMATION" &&
                "bg-amber-50 text-amber-700 border-amber-100",
            )}
          >
            {item.reportType}
          </Badge>
        ) : (
          <span className="text-xs text-slate-400">-</span>
        ),
    },
    {
      header: "Report Status",
      accessor: (item) => (
        item.reportStatus ? (
          <Badge
            className={cn(
              "rounded-md",
              item.reportStatus === "OPEN" &&
                "bg-red-500 text-white hover:bg-red-600",
              item.reportStatus === "IN_REVIEW" &&
                "bg-amber-400 text-white hover:bg-amber-500",
              item.reportStatus === "RESOLVED" &&
                "bg-slate-100 text-slate-500 border-transparent",
            )}
          >
            {item.reportStatus.replace("_", " ")}
          </Badge>
        ) : (
          <span className="text-xs text-slate-400">-</span>
        )
      ),
    },
  ];

  const actions: Action<ModerationRow>[] = [
    {
      label: "View Post",
      icon: <Eye className="w-4 h-4" />,
      onClick: (row) => {
        setActivePostId(row.id);
        setIsDetailOpen(true);
      },
    },
    {
      label: "Delete Post",
      icon: <Trash2 className="w-4 h-4" />,
      variant: "destructive",
      onClick: (row) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        deleteMutation.mutate(row.id);
      },
    },
    {
      label: "Review",
      icon: <ShieldAlert className="w-4 h-4 text-amber-500" />,
      onClick: (row) => {
        if (row.reportIds.length === 0) return;
        statusMutation.mutate({ id: row.id, status: "FLAGGED" });
        reportMutation.mutate({ ids: row.reportIds, status: "IN_REVIEW" });
      },
    },
    {
      label: "Resolve Report",
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      onClick: (row) => {
        if (row.reportIds.length === 0) return;
        reportMutation.mutate({ ids: row.reportIds, status: "RESOLVED" });
        statusMutation.mutate({ id: row.id, status: "PUBLISHED" });
      },
    },
  ];

  return (
    <ListPageShell
      className="h-[calc(100dvh-9rem)]"
      searchPlaceholder="Search posts or reports..."
      search={search}
      onSearchChange={(value) => {
        setPage(1);
        setSearch(value);
      }}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      summaryText={`Moderation queue`}
    >
      <DataTable<ModerationItem>
        data={rows}
        columns={columns}
        actions={actions}
        isLoading={postsQuery.isLoading || reportsQuery.isLoading}
      />
      {activePostId ? (
        <PostDetailDialog
          postId={activePostId}
          open={isDetailOpen}
          onOpenChange={(open) => {
            setIsDetailOpen(open);
            if (!open) {
              setActivePostId(null);
            }
          }}
        />
      ) : null}
    </ListPageShell>
  );
}
