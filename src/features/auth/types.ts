export interface SignupRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  matric_no: string;
  referral_code?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  matric_no: string;

}

export interface ApiError {
  message: string;
  status: number;
}