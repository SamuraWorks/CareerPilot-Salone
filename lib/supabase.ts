import { createClient } from '@supabase/supabase-js';

const isPlaceholder = (url: string) => !url || url.includes('placeholder.supabase.co') || url === 'placeholder';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isConfigured = !isPlaceholder(supabaseUrl) && !isPlaceholder(supabaseAnonKey);

if (!isConfigured) {
    if (process.env.NODE_ENV === 'development') {
        console.error('CRITICAL: Supabase is not configured or using placeholder values. DNS errors (ERR_NAME_NOT_RESOLVED) occur because of placeholder.supabase.co. Using mock client instead.');
    }
}

// Simple wrapper to avoid crashing if URL is empty, but it will still fail on actual requests
export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        __isMock: true,
        from: () => ({
            select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }), order: () => ({ limit: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } }) }) }),
            upsert: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
            insert: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
            delete: () => ({ eq: () => Promise.resolve({ error: { message: 'Supabase not configured' } }) }),
            on: () => ({ subscribe: () => ({ unsubscribe: () => { } }) }),
        }),
        auth: {
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signInWithPassword: () => Promise.reject(new Error('Supabase not configured')),
            signOut: () => Promise.resolve(),
        },
        storage: {
            from: () => ({
                upload: () => Promise.reject(new Error('Supabase not configured')),
                getPublicUrl: () => ({ data: { publicUrl: '' } }),
            })
        }
    } as any;

export type Profile = {
    id: string;
    email: string | null;
    full_name: string | null;
    secret_id?: string | null;
    avatar_url?: string | null;
    location?: string | null;
    age?: number | null;
    phone_number?: string | null;
    whatsapp_number?: string | null;
    whatsapp_opt_in?: boolean;
    education_level?: string | null;
    career_goal?: string | null;
    interests?: string[] | null;
    skills?: string[] | null;
    is_onboarded?: boolean;
    is_complete?: boolean;
    impact_metrics?: string | null;
    leadership_experience?: string | null;
    unique_hook?: string | null;
    updated_at: string | null;
};

export type WhatsAppSession = {
    phone_number: string;
    state: any;
    updated_at: string;
};

