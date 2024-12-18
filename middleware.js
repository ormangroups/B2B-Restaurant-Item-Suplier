import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (pathname === '/' || pathname === '/login') {
    return NextResponse.next(); // Continue without redirecting
  }

  // Parse cookies
  const cookies = parse(req.headers.get('cookie') || '');
  const userData = cookies.userData ? JSON.parse(cookies.userData) : null;

  // If userData exists, allow access to private routes
  if (userData) {
    
    return NextResponse.next();
  } else {
    // Redirect to login page if user is not authenticated
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/main/:path*', '/admin/:path*'], // Define protected routes only
};
