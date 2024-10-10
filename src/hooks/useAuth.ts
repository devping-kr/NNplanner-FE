import { useRouter } from 'next/navigation';
import { AUTH_LINKS } from '@/constants/_auth';
import { NAV_LINKS } from '@/constants/_navbar';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const { isLoggedIn, login, logout } = useAuthStore();
  const router = useRouter();

  const handleLogin = () => {
    login();
    // TODO: 대시보드 메인route로 변경 예정
    router.push(NAV_LINKS[3].href);
  };

  const handleLogout = () => {
    logout();
    router.push(AUTH_LINKS.login);
  };

  return { isLoggedIn, login: handleLogin, logout: handleLogout };
};
