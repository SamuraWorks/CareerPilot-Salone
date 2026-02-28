import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Log the presence (not value) of variables for debugging
    if (typeof window !== 'undefined') {
        if (!supabaseUrl || !supabaseAnonKey) {
            console.error('Supabase configuration Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.')
            console.log('Available NEXT_PUBLIC keys:', Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_')))
        }
    }

    if (!supabaseUrl || !supabaseAnonKey) {
        return createBrowserClient(
            'https://placeholder.supabase.co',
            'placeholder'
        )
    }

    return createBrowserClient(
        supabaseUrl,
        supabaseAnonKey
    )
}
