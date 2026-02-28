export interface TokenPair {
  access_token: string;
  refresh_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username?: string;
  display_name?: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    username: string;
  };
  message: string;
}

// Minimal user shape returned by GET /users/me
// Full profile type lives in src/features/users/types (Sprint 2)
export interface CurrentUser {
  id: string;
  username: string;
  display_name: string;
  email: string;
  avatar_url: string | null;
  is_verified: boolean;
}
