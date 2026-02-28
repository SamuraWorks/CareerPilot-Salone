import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        // During build or if env vars are missing, we return a basic response
        // without attempting to initialize Supabase
        console.warn('Supabase environment variables are missing in middleware.')
        return supabaseResponse
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake can make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const url = request.nextUrl.clone()
    const isPublicRoute =
        url.pathname === '/' ||
        url.pathname === '/login' ||
        url.pathname === '/signup' ||
        url.pathname.startsWith('/api') || // Allow APIs (they are protected internally if needed)
        url.pathname.startsWith('/_next') || // Allow static files
        url.pathname.includes('.') // Allow files with extensions

    // Strict protection: If no user and not a public route, redirect to login
    if (!user && !isPublicRoute) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // Protect /admin routes
    if (url.pathname.startsWith('/admin')) {
        if (!user) {
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }

        // Role check for admin
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile?.role !== 'admin') {
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    }

    return supabaseResponse
}
