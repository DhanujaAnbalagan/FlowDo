import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  jwt: string | null;
  isLoading: boolean;
  setAuth: (user: User, jwt: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      jwt: null,
      isLoading: false,
      setAuth: (user, jwt) => {
        // Set cookie for middleware
        Cookies.set('jwt', jwt, { expires: 7, path: '/' }); // 7 days
        set({ user, jwt });
      },
      logout: () => {
        Cookies.remove('jwt');
        set({ user: null, jwt: null });
      },
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
