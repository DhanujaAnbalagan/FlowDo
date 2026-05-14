'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm, { AuthFormData } from '@/components/AuthForm';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { AuthResponse } from '@/types/auth';

export default function SigninPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleSignin = async (data: AuthFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post<AuthResponse>('/api/auth/local', {
        identifier: data.email,
        password: data.password,
      });
      setAuth(response.data.user, response.data.jwt);
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-black px-4 transition-colors">
      <AuthForm type="signin" onSubmit={handleSignin} isLoading={isLoading} error={error} />
    </div>
  );
}
