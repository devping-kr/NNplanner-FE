import { destroyCookie } from 'nookies';

export const destroyTokens = () => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('accessToken');
  destroyCookie(null, 'refreshToken', { path: '/' });
  destroyCookie(null, 'isLogin', { path: '/' });
};
