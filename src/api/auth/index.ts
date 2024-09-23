import { post } from '@/lib/axios';
import { SuccessResponse } from '@/type/response';
import { UserRequest } from '@/hooks/auth/usePostSignup';

const signUp = async (request: UserRequest) => {
  const response = await post<SuccessResponse<undefined>>(
    '/api/auths/signup',
    request,
  );
  return response.data;
};

export const auth = {
  signUp,
};
