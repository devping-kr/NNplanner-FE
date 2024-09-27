import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { auth } from '@/api/auth';
import { LoginRequest } from '@/type/auth/authRequest';
import { FailResponse } from '@/type/response';
import { useToastStore } from '@/stores/useToastStore';

export const usePostLogin = () => {
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: (request: LoginRequest) =>
      auth.login({ ...request, loginType: 'LOCAL' }),
    onSuccess: () => {
      router.push('/');
    },
    onError: (error: AxiosError<FailResponse>) => {
      const errorMessage = error.response?.data.message || '로그인 실패';
      showToast(errorMessage, 'warning', 1000);
    },
  });
};
