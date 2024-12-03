import { NextRequest, NextResponse } from 'next/server';
import { logout } from './lib';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  const pathname = request.nextUrl.pathname;

  if (session && pathname.slice(0, 5) === '/auth') {
    try {
      const parsedSession = JSON.parse(session);
      if (parsedSession && parsedSession.expires > Date.now()) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } else {
        await logout();
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    } catch (error) {
      console.log('Middleware: Error parsing session cookie', error);
    }
  } else if (!session && pathname.slice(0, 10) === '/dashboard') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*']
};
