import { useMutation } from '@tanstack/react-query';
import { auth } from '@/api/auth';
import { LoginRequest } from '@/type/auth/authRequest';

export const usePostLogin = () => {
  return useMutation({
    mutationFn: (request: LoginRequest) =>
      auth.login({ ...request, loginType: 'LOCAL' }),
  });
};
