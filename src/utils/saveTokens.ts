import { setCookie } from 'nookies';
import { ReissueResponse } from '@/type/auth/authResponse';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 4;

export const saveTokens = (response: ReissueResponse) => {
  if (typeof window === 'undefined') return;
  const { accessToken, refreshToken } = response;

  localStorage.setItem('accessToken', accessToken);

  setCookie(null, 'refreshToken', refreshToken, {
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    secure: true,
  });
  setCookie(null, 'isLogin', 'logined', {
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    secure: true,
  });
};
