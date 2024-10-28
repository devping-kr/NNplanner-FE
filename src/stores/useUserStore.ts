import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface UserState {
  username: string;
  userId: number;
  email: string;
  setUserInfo: (username: string, userId: number, email: string) => void;
  resetUserInfo: () => void;
}

export const useUserStore = create<UserState>()(
  persist<UserState>(
    (set) => ({
      username: '',
      userId: 0,
      email: '',
      setUserInfo: (username, userId, email) =>
        set({ username, userId, email }),
      resetUserInfo: () => set({ username: '', userId: 0, email: '' }),
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    } as PersistOptions<UserState>,
  ),
);
