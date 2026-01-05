import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (process.env.NODE_ENV === 'development') {
        console.warn('Supabase URL or Anon Key is missing. Check your .env.local file.');
    }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
    id: string;
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
    skills: string[] | null;
    location: string | null;
};
