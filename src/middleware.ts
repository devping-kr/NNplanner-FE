import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|fonts|images|fonts/.*|imgs/.*).*)',
  ],
};

const publicRoutes = ['/', '/signup', '/login'];

export function middleware(request: NextRequest) {
  const isLogin = request.cookies.get('isLogin');
  const currentPath = request.nextUrl.pathname;

  if (!isLogin && !publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (isLogin && publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    // TODO: 리다이렉트 url 메인화면으로 변경예정
    url.pathname = '/viewPlan';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
