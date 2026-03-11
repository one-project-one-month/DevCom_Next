import { ReactNode } from "react";

export type OAuthProvider = "google" | "github";

export type AuthProvider = "local" | OAuthProvider;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  profileBgColor?: string;
  provider: AuthProvider;
};

export type AuthSuccessResponse = {
  message: ReactNode;
  user: AuthUser;
  token?: string;
  accessToken?: string;
};

export type OAuthLoginUrlResponse = {
  provider: OAuthProvider;
  url: string;
};

export type MeResponse = {
  user: AuthUser;
};
