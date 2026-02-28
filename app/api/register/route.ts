import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        console.log("[DEBUG] API/Register Env Check:", {
            hasUrl: !!supabaseUrl,
            hasServiceKey: !!supabaseServiceKey,
            nodeEnv: process.env.NODE_ENV
        });

        if (!supabaseUrl || !supabaseServiceKey) {
            const missing = !supabaseUrl ? 'NEXT_PUBLIC_SUPABASE_URL' : 'SUPABASE_SERVICE_ROLE_KEY';
            console.error(`Missing environment variable: ${missing} `);
            return NextResponse.json({ error: `Server configuration error: ${missing} is not defined` }, { status: 500 });
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
        const { email, password, fullName } = await req.json()

        if (!email || !fullName) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // Use a default password if none provide (for landing page fast-signup)
        const finalPassword = password || `CP - ${Math.random().toString(36).slice(-8)} `;

        // 1. Generate Unique Secret ID (CP-XXXXXX)
        let secretId = ""
        let isUnique = false
        let attempts = 0
        while (!isUnique && attempts < 5) {
            const random = Math.floor(100000 + Math.random() * 900000)
            secretId = `CP-${random}`
            const { data } = await supabaseAdmin.from('profiles').select('secret_id').eq('secret_id', secretId).maybeSingle()
            if (!data) isUnique = true;
            attempts++;
        }

        // 2. Create User in Supabase Auth
        const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password: finalPassword,
            email_confirm: true,
            user_metadata: { full_name: fullName }
        })

        if (authError) return NextResponse.json({ error: authError.message }, { status: 400 })

        // 3. Create or Update Profile Entry (handles case where DB trigger already created it)
        const { error: profileError } = await supabaseAdmin.from('profiles').upsert({
            id: authUser.user.id,
            full_name: fullName,
            email: email,
            secret_id: secretId,
            is_complete: false,
            created_at: new Date().toISOString()
        })

        if (profileError) {
            console.error("[AUTH] Profile creation error details:", {
                code: profileError.code,
                message: profileError.message,
                details: profileError.details,
                hint: profileError.hint
            });
            await supabaseAdmin.auth.admin.deleteUser(authUser.user.id)
            return NextResponse.json({
                error: "Profile creation failed",
                details: profileError.message,
                db_code: profileError.code
            }, { status: 500 })
        }

        // 4. Send Email (Optional)
        try {
            const { sendEmail } = await import("@/lib/email")
            await sendEmail({
                to: email,
                subject: "Welcome to CareerPilot Salone - Your Secret Login ID",
                text: `Hello ${fullName}, Your Secret Login ID is: ${secretId} `,
                html: `< p > Hello < strong > ${fullName} </strong>,</p > <p>Your Secret Login ID is: <strong>${secretId} </strong></p > `
            })
        } catch (e) { console.error("Email failed, but registration continues.") }

        return NextResponse.json({
            success: true,
            userId: authUser.user.id,
            secretId,
            password: password ? undefined : finalPassword // Return generated password if needed
        })

    } catch (error: any) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
