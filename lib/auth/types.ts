export type OAuthProvider = "google" | "github";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthResult<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

export type ManualLoginInput = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type ManualRegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type ManualAuthResponse = {
  token: string;
  user: AuthUser;
};
