import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { auth } from '@/api/auth';
import { FailResponse, Result } from '@/type/response';
import { useToastStore } from '@/stores/useToastStore';

export const usePostVerifyConfirm = () => {
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: (request: { email: string; verifyCode: string }) =>
      auth.verifyConfirm(request),
    onSuccess: ({ message }: Result<null>) => {
      showToast(message, 'success', 1000);
    },
    onError: (error: AxiosError<FailResponse>) => {
      const errorMessage = error.response?.data?.message || '이메일 인증 실패';
      showToast(errorMessage, 'warning', 1000);
    },
  });
};
