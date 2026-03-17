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

export const fetchReportedPosts = (page: number, limit: number, search: string) =>
  apiFetch<PaginatedResponse<Post>>("/api/admin/posts/reported", {
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

export const updateUserRole = (id: string, role: "MEMBER" | "MODERATOR" | "ADMIN") =>
  apiFetch<{ user: User }>(`/api/admin/users/${id}/role`, {
    method: "PATCH",
    body: { role: role.toLowerCase() },
  });

export const updateUserStatus = (id: string, status: "ACTIVE" | "SUSPENDED") =>
  apiFetch<{ user: User }>(`/api/admin/users/${id}/status`, {
    method: "PATCH",
    body: { status },
  });

export const updatePostStatus = (id: string, status: "PUBLISHED" | "FLAGGED") =>
  apiFetch<{ post: Post }>(`/api/admin/posts/${id}/status`, {
    method: "PATCH",
    body: { status: status.toLowerCase() },
  });

export const deletePost = (id: string) =>
  apiFetch<{ message: string }>(`/api/admin/posts/${id}`, {
    method: "DELETE",
  });
