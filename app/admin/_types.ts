export type AdminPanelKey = "overview" | "users" | "posts" | "reports" | "settings";

export type AdminPanel = {
  key: AdminPanelKey;
  label: string;
  description: string;
};

export type UserStatus = "active" | "suspended";

export type UserRow = {
  id: string;
  name: string;
  handle: string;
  role: "member" | "moderator" | "admin";
  status: UserStatus;
  joinedAt: string;
};

export type ReportStatus = "open" | "in_review" | "resolved";

export type ReportRow = {
  id: string;
  type: "spam" | "abuse" | "harassment" | "misinformation";
  targetType: "post" | "comment";
  targetId: string;
  targetTitle: string;
  reporterName: string;
  reason: string;
  status: ReportStatus;
  createdAt: string;
};
