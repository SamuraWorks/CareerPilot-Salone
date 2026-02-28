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
            console.error("[CRITICAL] Missing Supabase environment variables");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        // 1. Create User in Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true // Hardcoded to true for instant login capabilities
        });

        if (authError) {
            console.error("[AUTH ERROR] Signup failed:", authError.message);
            return NextResponse.json({ error: authError.message }, { status: 400 });
        }

        const userId = authData.user.id;

        // 2. Create Profile Record Safely
        let profileCreated = false;
        let retryCount = 0;

        while (!profileCreated && retryCount < 2) {
            const { error: profileError } = await supabaseAdmin
                .from('profiles')
                .upsert({
                    id: userId,
                    email: email,
                    created_at: new Date().toISOString()
                }, { onConflict: 'id' });

            if (!profileError) {
                profileCreated = true;
            } else {
                console.error(`[DB ERROR] Profile insert failed (Attempt ${retryCount + 1}):`, profileError.message);
                retryCount++;
                if (retryCount < 2) await new Promise(res => setTimeout(res, 500)); // wait 500ms before retry
            }
        }

        if (!profileCreated) {
            console.error(`[CRITICAL] Failed to create profile for user ${userId} after retries.`);
        }

        return NextResponse.json({
            success: true,
            user: { id: userId, email }
        });

    } catch (error: any) {
        console.error("[FATAL ERROR] Exception in signup endpoint:", error);
        return NextResponse.json({ error: "An unexpected error occurred during signup." }, { status: 500 });
    }
}
