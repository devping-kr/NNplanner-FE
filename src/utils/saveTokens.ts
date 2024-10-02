import { setCookie } from 'nookies';
import { ReissueResponse } from '@/type/auth/authResponse';

export const saveTokens = (response: ReissueResponse) => {
  if (typeof window === 'undefined') return;
  const { accessToken, refreshToken } = response;

  localStorage.setItem('accessToken', accessToken);

  setCookie(null, 'refreshToken', refreshToken, {
    maxAge: 60 * 60 * 24 * 4,
    path: '/',
    secure: true,
  });
  setCookie(null, 'isLogin', 'logined', {
    maxAge: 60 * 60 * 24 * 4,
    path: '/',
    secure: true,
  });
};
