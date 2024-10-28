import { NextRequest, NextResponse } from 'next/server';
import { AUTH_LINKS } from '@/constants/_auth';
import { NAV_LINKS } from '@/constants/_navbar';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|fonts|images|fonts/.*|imgs/.*).*)',
  ],
};

const publicRoutes = [AUTH_LINKS.signup, AUTH_LINKS.login];

export function middleware(request: NextRequest) {
  const isLogin = request.cookies.get('isLogin');
  const currentPath = request.nextUrl.pathname;

  if (!isLogin && !publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = AUTH_LINKS.login;
    return NextResponse.redirect(url);
  }

  if (isLogin && publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = NAV_LINKS[0].href;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
