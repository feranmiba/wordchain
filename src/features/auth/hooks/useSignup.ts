import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export const useSignup = () => {
  const { login, setLoading, setError } = useAuthStore();

  return useMutation({
    mutationFn: authApi.signup,
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: async (data) => {
      await SecureStore.setItemAsync('accessToken', data.access_token);
      if (data.refresh_token) {
        await SecureStore.setItemAsync('refreshToken', data.refresh_token);
      }
      login(data.user);
      setLoading(false);
    },
    onError: (error: any) => {
      setLoading(false);
      setError(error.response?.data?.message || 'Signup failed');
    },
  });
};