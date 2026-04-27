import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export const useLogin = () => {
  const { login, setLoading, setError } = useAuthStore();
  const router = useRouter();

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
      
      // Store user data
      const userData = {
        first_name: data.first_name,
        // Default values for now, will be updated by real data later
        level: '100L',
        rank: 'Novice',
      };
      
      login(userData);
      setLoading(false);
      router.replace('/(tabs)');
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