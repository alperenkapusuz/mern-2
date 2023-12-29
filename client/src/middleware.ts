import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const {
    cookies,
    nextUrl: { pathname, origin },
  } = req;
  const { value: token } = cookies.get('token') ?? { value: null };

  console.log('MIDDLEWARE token: ', token);

  if (token && pathname === '/') {
    console.log('MIDDLEWARE token varmış');
    const response = NextResponse.redirect(`${origin}/dashboard`);
    return response;
  }
  if (!token && pathname !== '/') {
    console.log('MIDDLEWARE token yokmuş');
    const response = NextResponse.redirect(`${origin}/`);
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|icons|img|favicon.ico|/).*)'],
};
