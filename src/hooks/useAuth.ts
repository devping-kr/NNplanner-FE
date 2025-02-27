import { useRouter } from 'next/navigation';
import { destroyTokens } from '@/utils/destroyTokens';
import { AUTH_LINKS } from '@/constants/_auth';
import { NAV_LINKS } from '@/constants/_navbar';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const { isLoggedIn, login, logout } = useAuthStore();
  const router = useRouter();

  const handleLogin = () => {
    login();
    router.push(NAV_LINKS[0].href);
  };

  const handleLogout = () => {
    logout();
    destroyTokens();
    router.push(AUTH_LINKS.login);
  };

  return { isLoggedIn, login: handleLogin, logout: handleLogout };
};
