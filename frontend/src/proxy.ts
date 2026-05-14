import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const { pathname } = request.nextUrl;

  console.log(`[Proxy] ${pathname} - Token: ${token ? 'Present' : 'Missing'}`);

  // Define protected and public routes
  const isAuthRoute = pathname === '/signin' || pathname === '/signup';
  const isProtectedRoute = pathname === '/dashboard' || pathname.startsWith('/dashboard/');

  // 1. If trying to access protected route without token, redirect to signin
  if (isProtectedRoute && !token) {
    console.log(`[Proxy] Redirecting unauthenticated user from ${pathname} to /signin`);
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 2. If trying to access auth routes (signin/signup) with a token, redirect to dashboard
  if (isAuthRoute && token) {
    console.log(`[Proxy] Redirecting authenticated user from ${pathname} to /dashboard`);
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/signin', '/signup'],
};
