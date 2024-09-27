import Cookies from 'js-cookie';
import { ReissueResponse } from '@/type/auth/authResponse';

export const saveTokens = (response: ReissueResponse) => {
  if (typeof window === 'undefined') return;
  const { accessToken, refreshToken } = response;

  localStorage.setItem('accessToken', accessToken);

  Cookies.set('refreshToken', refreshToken, {
    maxAge: 60 * 60 * 24 * 4,
    path: '/',
    secure: true,
  });
};
