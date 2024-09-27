import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { auth } from '@/api/auth';
import { SignupRequest } from '@/type/auth/authRequest';
import { FailResponse, Result } from '@/type/response';
import { useToastStore } from '@/stores/useToastStore';

export const usePostSignup = () => {
  const showToast = useToastStore((state) => state.showToast);
  const router = useRouter();

  return useMutation({
    mutationFn: (request: SignupRequest) =>
      auth.signUp({ ...request, loginType: 'LOCAL' }),
    onSuccess: ({ message }: Result<null>) => {
      router.push('/login');
      showToast(message, 'success', 1000);
    },
    onError: (error: AxiosError<FailResponse>) => {
      const errorMessage = error.response?.data?.message || '회원가입 실패';
      showToast(errorMessage, 'warning', 1000);
    },
  });
};
