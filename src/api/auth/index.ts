import { post } from '@/lib/axios';
import { env } from '@/lib/env';
import { LoginRequest, SignupRequest } from '@/type/auth/authRequest';
import { LoginResponse } from '@/type/auth/authResponse';
import { Result } from '@/type/response';
import { saveTokens } from '@/utils/saveTokens';

const signUp = async (request: SignupRequest) => {
  const response = await post<Result<null>>('/api/auths/signup', request);
  return response.data;
};

const verifySend = async (request: { email: string }) => {
  const response = await post<Result<null>>('/api/auths/send', request);
  return response.data;
};

const verifyConfirm = async (request: {
  email: string;
  verifyCode: string;
}) => {
  const response = await post<Result<null>>('/api/auths/verify', request);
  return response.data;
};

// const login = async (request: LoginRequest) => {
//   const response = await post<Result<LoginResponse>>(
//     '/api/auths/login',
//     request,
//   );
//   saveTokens(response.data.data);
//   return response.data.data;
// };

const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(`${env.BASE_API_URL}/api/auths/login`, {
    method: 'POST',
    body: JSON.stringify({ ...request, loginType: 'LOCAL' }),
  });

  const result = await response.json();

  if (response.status === 200) {
    saveTokens(result.data);
  }

  return result;
};

const logout = async () => {
  const response = await post<Result<null>>('/api/auths/logout');
  return response.data;
};

export const auth = {
  signUp,
  verifySend,
  verifyConfirm,
  login,
  logout,
};
