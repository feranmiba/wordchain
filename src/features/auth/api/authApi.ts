import { apiClient } from '../../../shared/lib/apiClient';
import {
    AuthResponse,
    ForgotPasswordRequest,
    LoginRequest,
    SignupRequest,
    UserFullData,
} from '../types';

export const authApi = {
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const params = new URLSearchParams();
    params.append('username', data.username);
    params.append('password', data.password);

    const response = await apiClient.post<AuthResponse>('/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/forgot-password', data);
    return response.data;
  },
  
  getCurrentUser: async (): Promise<UserFullData> => {
    const response = await apiClient.get<UserFullData>('/users/me');
    return response.data;
  },
};