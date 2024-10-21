import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { user } from '@/api/user';
import { Result } from '@/type/response';
import { PwRequest } from '@/type/user/userRequest';

export const usePostCheckPw = () => {
  return useMutation<Result<null>, AxiosError<Result<null>>, PwRequest>({
    mutationFn: (request: PwRequest) => user.checkPw(request),
  });
};
