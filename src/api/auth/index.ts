import { post } from '@/lib/axios';
import { env } from '@/lib/env';
import {
  LoginRequest,
  SendRequest,
  SignupRequest,
  VerifyRequest,
} from '@/type/auth/authRequest';
import { LoginResponse } from '@/type/auth/authResponse';
import { Result } from '@/type/response';
import { saveTokens } from '@/utils/saveTokens';
import { AUTH_API } from '@/constants/_apiPath';

const signUp = async (request: SignupRequest) => {
  const response = await post<Result<null>>(AUTH_API.SIGNUP, request);
  return response.data;
};

const verifySend = async (request: SendRequest) => {
  const response = await post<Result<null>>(AUTH_API.SEND, request);
  return response.data;
};

const verifyConfirm = async (request: VerifyRequest) => {
  const response = await post<Result<null>>(AUTH_API.VERIFY, request);
  return response.data;
};

const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(`${env.BASE_API_URL}${AUTH_API.LOGIN}`, {
    method: 'POST',
    body: JSON.stringify({ ...request, loginType: 'LOCAL' }),
  });

  const result = await response.json();

  if (response.status === 200) {
    saveTokens(result.data);
  }

  return result;
};

export const auth = {
  signUp,
  verifySend,
  verifyConfirm,
  login,
};
