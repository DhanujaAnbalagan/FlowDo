'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm, { AuthFormData } from '@/components/AuthForm';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { AuthResponse } from '@/types/auth';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleSignup = async (data: AuthFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post<AuthResponse>('/api/auth/local/register', {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      setAuth(response.data.user, response.data.jwt);
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-black px-4 transition-colors">
      <AuthForm type="signup" onSubmit={handleSignup} isLoading={isLoading} error={error} />
    </div>
  );
}
