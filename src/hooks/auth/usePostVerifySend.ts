import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { auth } from '@/api/auth';
import { FailResponse, Result } from '@/type/response';
import { useToastStore } from '@/stores/useToastStore';

export const usePostVerifySend = () => {
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: (request: { email: string }) => auth.verifySend(request),
    onSuccess: ({ message }: Result<null>) => {
      showToast(message, 'success', 1000);
    },
    onError: (error: AxiosError<FailResponse>) => {
      const errorMessage = error.response?.data?.message || '인증 요청 실패';
      showToast(errorMessage, 'warning', 1000);
    },
  });
};
