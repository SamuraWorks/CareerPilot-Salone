import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            console.error("[CRITICAL] Missing Supabase config for login");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const supabaseAnon = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

        const { data: authData, error: authError } = await supabaseAnon.auth.signInWithPassword({
            email,
            password
        });

        if (authError || !authData.user) {
            return NextResponse.json({ error: "Invalid login credentials." }, { status: 401 });
        }

        // Update login stats in background
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        // Let background task handle DB update so it doesn't block response
        // Using a direct update since we have the service key
        supabaseAdmin.from('profiles')
            .select('total_logins')
            .eq('id', authData.user.id)
            .single()
            .then(({ data }) => {
                if (data) {
                    supabaseAdmin.from('profiles')
                        .update({
                            last_login: new Date().toISOString(),
                            total_logins: (data.total_logins || 0) + 1
                        })
                        .eq('id', authData.user.id)
                        .then();
                }
            })
            .catch(err => console.error("[STATS ERROR] Fail to update login stats", err));

        return NextResponse.json({
            success: true,
            session: authData.session,
            user: authData.user
        });

    } catch (error: any) {
        console.error("[FATAL ERROR] Exception in login endpoint:", error);
        return NextResponse.json({ error: "An unexpected error occurred during login." }, { status: 500 });
    }
}
