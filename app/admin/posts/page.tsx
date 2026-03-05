"use client";

import { useState } from "react";
import { Eye, Flag, Trash2, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Post } from "../_data/admin";
import { fetchPosts } from "../_data/admin-service";

import { DataTable, Column, Action } from "../_components/data-table";
import ListPageShell from "../_components/list-page-shell";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function PostsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 7;

  const { data } = useQuery({
    queryKey: ["admin-posts", page, search],
    queryFn: () => fetchPosts(page, limit, search),
  });

  const posts = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const columns: Column<Post>[] = [
    {
      header: "Post Title",
      accessor: (post) => (
        <div className="flex flex-col gap-1 max-w-xs">
          <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">{post.title}</span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            by {post.authorName} <ExternalLink size={10} />
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (post) => (
        <Badge
          variant="secondary"
          className={cn(
            "font-medium",
            post.status === "PUBLISHED" && "bg-green-50 text-green-700 border-green-200",
            post.status === "DRAFT" && "bg-slate-100 text-slate-600",
            post.status === "FLAGGED" && "bg-amber-50 text-amber-700 border-amber-200",
          )}
        >
          {post.status}
        </Badge>
      ),
    },
    {
      header: "Reports",
      accessor: (post) => (
        <div className="flex items-center gap-2">
          <Badge
            className={cn(
              "rounded-full px-2",
              post.reportsCount > 0
                ? "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                : "bg-slate-100 text-slate-400 border-transparent",
            )}
          >
            {post.reportsCount}
          </Badge>
          {post.reportsCount > 5 && (
            <span className="text-tiny text-red-500 font-bold uppercase animate-pulse">Critical</span>
          )}
        </div>
      ),
    },
    {
      header: "Created At",
      accessor: (post) => (
        <span className="text-slate-500 text-sm">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

  const actions: Action<Post>[] = [
    {
      label: "View Post",
      icon: <Eye className="w-4 h-4" />,
      onClick: (row) => window.open(`/PostDetail/${row.id}`, "_blank"),
    },
    {
      label: "Flag Content",
      icon: <Flag className="w-4 h-4 text-amber-500" />,
      onClick: (row) => console.log("Flagging post", row.id),
    },
    {
      label: "Delete Post",
      icon: <Trash2 className="w-4 h-4" />,
      variant: "destructive",
      onClick: (row) =>
        confirm("Are you sure you want to delete this post?") &&
        console.log("Deleting", row.id),
    },
  ];

  return (
    <ListPageShell
      className="h-[calc(100dvh-9rem)]"
      searchPlaceholder="Search posts..."
      search={search}
      onSearchChange={(value) => {
        setPage(1);
        setSearch(value);
      }}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      summaryText={`Page ${page} of ${totalPages}`}
    >
        <DataTable<Post> data={posts} columns={columns} actions={actions} />
    </ListPageShell>
  );
}
