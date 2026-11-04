import { NextRequest, NextResponse } from 'next/server';

import { routes } from './config/routes';

import { getSession } from '@/lib/dal';

export async function proxy(request: NextRequest) {
  const session = await getSession(request.headers);

  if (!session) {
    return NextResponse.redirect(new URL(routes.signIn, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
