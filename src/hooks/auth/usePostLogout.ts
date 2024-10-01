import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { auth } from '@/api/auth';
import { FailResponse, Result } from '@/type/response';
import { useToastStore } from '@/stores/useToastStore';

export const usePostLogout = () => {
  const showToast = useToastStore((state) => state.showToast);
  const router = useRouter();

  return useMutation({
    mutationFn: () => auth.logout(),
    onSuccess: ({ message }: Result<null>) => {
      router.push('/login');
      showToast(message, 'success', 1000);
      localStorage.removeItem('accessToken');
    },
    onError: (error: AxiosError<FailResponse>) => {
      const errorMessage = error.response?.data?.message || '로그아웃 실패';
      showToast(errorMessage, 'warning', 1000);
    },
  });
};
