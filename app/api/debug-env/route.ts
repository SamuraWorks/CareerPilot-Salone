import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        NODE_ENV: process.env.NODE_ENV,
        all_keys: Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_') || k.includes('SUPABASE'))
    });
}
