import { apiFetch } from "@/lib/api/fetcher";
import { User, Post, Report, OverviewResponse } from "./admin";

type PaginatedResponse<T> = {
  data: T[];
  total: number;
  totalPages: number;
};

export const fetchUsers = (page: number, limit: number, search: string) =>
  apiFetch<PaginatedResponse<User>>("/api/admin/users", {
    params: { page, limit, search: search || undefined },
  });

export const fetchPosts = (page: number, limit: number, search: string) =>
  apiFetch<PaginatedResponse<Post>>("/api/admin/posts", {
    params: { page, limit, search: search || undefined },
  });

export const fetchReports = (page: number, limit: number, search: string) =>
  apiFetch<PaginatedResponse<Report>>("/api/admin/reports", {
    params: { page, limit, search: search || undefined },
  });

export const updateReportStatus = (id: string, status: "OPEN" | "IN_REVIEW" | "RESOLVED") =>
  apiFetch<{ report: Report }>(`/api/reports/${id}`, {
    method: "PATCH",
    body: { status },
  });

export const fetchOverview = () =>
  apiFetch<OverviewResponse>("/api/admin/overview");
