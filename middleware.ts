import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Prevent crashes on missing vars
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        return response;
    }

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    try {
        const { data: { user } } = await supabase.auth.getUser()

        // Allow API routes to function unhindered
        if (request.nextUrl.pathname.startsWith('/api')) {
            return response;
        }

        const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup')
        const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/profile')
        const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

        // 1. Unauthenticated users accessing protected routes -> redirect to login
        if (!user && (isProtectedRoute || isAdminRoute)) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // 2. Authenticated users hitting login -> redirect to dashboard
        if (user && isAuthRoute) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }

        // 3. Check Admin access
        if (user && isAdminRoute) {
            // Verify role from profiles
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single()

            if (!profile || profile.role !== 'admin') {
                console.log("[SECURITY] Non-admin attempted to access admin route:", user.email);
                return NextResponse.redirect(new URL('/dashboard', request.url))
            }
        }

        return response
    } catch (error) {
        console.error("[MIDDLEWARE ERROR] Handled boundary:", error);
        // Fallback safely to public access
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
