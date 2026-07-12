export interface AuthResponse {
  message: string;
  success: boolean;
  data: {
    user: User;
    access_token: string;
    token_type: string;
    expires_in: number;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistrationRequest {
  fname: string;
  lname: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface User {
  id: number;
  fname: string;
  lname: string;
  email: string;
  is_active: boolean;
  last_login_at: string | null;
}
