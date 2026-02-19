import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
    const cookieStore = cookies()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Safety check for build time
    if (!supabaseUrl || !supabaseAnonKey) {
        // During build, we might not have these variables. 
        // We return a mock-like client that won't crash the build process
        // but will log warnings if called.
        console.warn('Supabase environment variables are missing. Using partial client.')
        return createServerClient(
            'https://placeholder.supabase.co',
            'placeholder',
            {
                cookies: {
                    getAll() { return [] },
                    setAll() { }
                }
            }
        )
    }

    return createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}
