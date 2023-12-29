import { NextRequest, NextResponse } from 'next/server';

const publicUrl = ['/', '/register'];

const isPublicUrl = (url: string) => publicUrl.includes(url);

export function middleware(req: NextRequest) {
  const {
    cookies,
    nextUrl: { pathname, origin },
  } = req;
  const { value: token } = cookies.get('token') ?? { value: null };

  if (token && isPublicUrl(pathname)) {
    const response = NextResponse.redirect(`${origin}/dashboard`);
    return response;
  }
  if (!token && !isPublicUrl(pathname)) {
    const response = NextResponse.redirect(`${origin}/`);
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|icons|img|favicon.ico|/).*)'],
};
