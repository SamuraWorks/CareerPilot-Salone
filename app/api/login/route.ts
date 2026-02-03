import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
        const { secretId, email, password } = await req.json()

        // Handle Secret ID Login
        if (secretId) {
            const { data: profile, error: profileError } = await supabaseAdmin
                .from('profiles')
                .select('*')
                .eq('secret_id', secretId.toUpperCase())
                .single()

            if (profileError || !profile) {
                return NextResponse.json({ error: "Invalid Secret ID" }, { status: 404 })
            }

            return NextResponse.json({
                success: true,
                user: { id: profile.id, email: profile.email },
                profile: profile
            })
        }

        // Handle standard Email/Password Login (we just proxy the validation if needed, 
        // but usually client handles this via supabase.auth.signInWithPassword.
        // However, if we want a unified server route:
        if (email && password) {
            const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password })
            if (error) return NextResponse.json({ error: error.message }, { status: 401 })

            const { data: profile } = await supabaseAdmin
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single()

            return NextResponse.json({
                success: true,
                user: data.user,
                profile: profile
            })
        }

        return NextResponse.json({ error: "Missing login credentials" }, { status: 400 })

    } catch (error: any) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
