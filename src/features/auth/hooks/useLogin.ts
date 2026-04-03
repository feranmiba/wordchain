import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export const useLogin = () => {
  const { login, setLoading, setError } = useAuthStore();

  return useMutation({
    mutationFn: authApi.login,
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: async (data) => {
      // Useful for debugging what the backend actually sends
      console.log("✅ Login Success Data:", data);

      await SecureStore.setItemAsync('accessToken', data.access_token);
      if (data.refresh_token) {
        await SecureStore.setItemAsync('refreshToken', data.refresh_token);
      }
      login(data.user);
      setLoading(false);
    },
    onError: (error: any) => {
      setLoading(false);
      
      // --- LOGGING THE ERROR HERE ---
      console.error("❌ Login Mutation Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data, // This usually contains the "detail" from Django/FastAPI
      });

      const errorMessage = error.response?.data?.message || error.response?.data?.detail || 'Login failed';
      setError(errorMessage);
    },
  });
};