import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
};