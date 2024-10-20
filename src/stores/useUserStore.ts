import { create } from 'zustand';

interface UserState {
  username: string;
  userId: number;
  email: string;
  setUserInfo: (username: string, userId: number, email: string) => void;
  resetUserInfo: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  username: localStorage.getItem('username') || '',
  userId: Number(localStorage.getItem('userId')) || 0,
  email: localStorage.getItem('email') || '',
  setUserInfo: (username, userId, email) => {
    set({ username, userId, email });
    localStorage.setItem('username', username);
    localStorage.setItem('userId', String(userId));
    localStorage.setItem('email', email);
  },
  resetUserInfo: () => {
    set({ username: '', userId: 0, email: '' });
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
  },
}));
