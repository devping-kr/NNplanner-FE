import { parseCookies } from 'nookies';
import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!parseCookies().isLogin,

  login: () => {
    set({ isLoggedIn: true });
  },

  logout: () => {
    set({ isLoggedIn: false });
  },
}));
