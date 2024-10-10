import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { auth } from '@/api/auth';
import { SignupRequest } from '@/type/auth/authRequest';
import { Result } from '@/type/response';

export const usePostSignup = (
  options?: UseMutationOptions<
    Result<null>,
    AxiosError<Result<null>>,
    SignupRequest
  >,
) => {
  return useMutation<Result<null>, AxiosError<Result<null>>, SignupRequest>({
    mutationFn: (request) => auth.signUp({ ...request, loginType: 'LOCAL' }),
    ...options,
  });
};
