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
        Cookies.set('token', jwt, { expires: 7, path: '/' }); // 7 days
        set({ user, jwt });
      },
      logout: () => {
        Cookies.remove('token', { path: '/' });
        set({ user: null, jwt: null });
        // Clear everything to be safe
        localStorage.removeItem('auth-storage');
      },
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
