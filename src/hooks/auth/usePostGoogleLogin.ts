import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { auth } from '@/api/auth';
import { GoogleLoginRequest } from '@/type/auth/authRequest';
import { LoginResponse } from '@/type/auth/authResponse';
import { Result } from '@/type/response';

export const usePostGoogleLogin = (
  options?: UseMutationOptions<
    Result<LoginResponse>,
    AxiosError<Result<string>>,
    GoogleLoginRequest
  >,
) => {
  return useMutation({
    mutationFn: (request) => auth.googleLogin(request),
    ...options,
  });
};
