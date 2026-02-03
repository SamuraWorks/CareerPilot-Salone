import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Redirect legacy auth pages to onboarding
    // REMOVED: Login and Signup are now active pages
    // if (pathname === '/login' || pathname === '/signup') {
    //    return NextResponse.redirect(new URL('/onboarding', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
