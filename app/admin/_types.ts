export type AdminPanelKey = "overview" | "users" | "posts" | "reports" | "settings";

export type AdminPanel = {
  key: AdminPanelKey;
  label: string;
  description: string;
};
