export type UserRole = "MEMBER" | "MODERATOR" | "ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED";
export type PostStatus = "PUBLISHED" | "DRAFT" | "FLAGGED";
export type ReportStatus = "OPEN" | "IN_REVIEW" | "RESOLVED";
export type ReportType = "SPAM" | "ABUSE" | "HARASSMENT" | "MISINFORMATION";

export interface User {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
}

export interface Post {
  id: string;
  title: string;
  authorName: string;
  status: PostStatus;
  reportsCount: number;
  createdAt: string;
}

export interface Report {
  id: string;
  type: ReportType;
  targetType: "POST" | "COMMENT";
  targetId: string;
  targetTitle: string;
  reporterName: string;
  reason: string;
  status: ReportStatus;
  createdAt: string;
}

export interface AdminStats {
  totalDevelopers: number;
  activePosts: number;
  newComments: number;
  totalReports: number;
}