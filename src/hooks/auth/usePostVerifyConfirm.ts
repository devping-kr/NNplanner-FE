import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { auth } from '@/api/auth';
import { Result } from '@/type/response';

interface requestType {
  email: string;
  verifyCode: string;
}

export const usePostVerifyConfirm = (
  options?: UseMutationOptions<
    Result<null>,
    AxiosError<Result<null>>,
    requestType
  >,
) => {
  return useMutation<Result<null>, AxiosError<Result<null>>, requestType>({
    mutationFn: (request: requestType) => auth.verifyConfirm(request),
    ...options,
  });
};
