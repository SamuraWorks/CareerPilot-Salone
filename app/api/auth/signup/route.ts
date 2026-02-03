import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        // Lazy initialize to avoid build-time errors if env vars are missing
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            console.error("Missing Supabase environment variables");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
        const { email, password, fullName } = await req.json()

        if (!email || !password || !fullName) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // 1. Generate Unique Secret ID (CP-XXXXXX)
        let secretId = ""
        let isUnique = false
        let attempts = 0

        while (!isUnique && attempts < 5) {
            const random = Math.floor(100000 + Math.random() * 900000)
            secretId = `CP-${random}`

            const { data } = await supabaseAdmin
                .from('profiles')
                .select('secret_id')
                .eq('secret_id', secretId)
                .maybeSingle()

            if (!data) isUnique = true
            attempts++
        }

        if (!isUnique) {
            return NextResponse.json({ error: "Failed to generate unique ID. Please try again." }, { status: 500 })
        }

        // 2. Create User in Supabase Auth
        const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { full_name: fullName }
        })

        if (authError) {
            return NextResponse.json({ error: authError.message }, { status: 400 })
        }

        // 3. Create Profile Entry
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .insert({
                id: authUser.user.id,
                full_name: fullName,
                email: email,
                secret_id: secretId,
                is_complete: false,
                created_at: new Date().toISOString()
            })

        if (profileError) {
            await supabaseAdmin.auth.admin.deleteUser(authUser.user.id)
            return NextResponse.json({ error: "Profile creation failed: " + profileError.message }, { status: 500 })
        }

        // 4. Send Confirmation Email
        try {
            const { sendEmail } = await import("@/lib/email")
            await sendEmail({
                to: email,
                subject: "Welcome to CareerPilot Salone - Your Secret Login ID",
                text: `Hello ${fullName},\n\nWelcome to CareerPilot Salone! Your account has been created successfully.\n\nYour Secret Login ID is: ${secretId}\n\nYou can use this ID to sign in to your dashboard quickly without a password.\n\nBest regards,\nThe CareerPilot Team`,
                html: `
                    <h1>Welcome to CareerPilot Salone!</h1>
                    <p>Hello <strong>${fullName}</strong>,</p>
                    <p>Your account has been created successfully.</p>
                    <div style="background: #f4f4f4; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
                        <p style="margin-bottom: 5px; font-size: 14px; color: #666;">YOUR SECRET LOGIN ID</p>
                        <p style="font-size: 32px; font-weight: 800; color: #0B1F3A; letter-spacing: 2px;">${secretId}</p>
                    </div>
                    <p>Keep this ID safe. You can use it for quick access to your career dashboard.</p>
                    <p><strong>Join our Community:</strong> <a href="https://chat.whatsapp.com/EXAMPLE">WhatsApp Channel</a></p>
                    <p><a href="${process.env.NEXT_PUBLIC_APP_URL || (process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin : '')}/login" style="background: #1FA774; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Login to Dashboard</a></p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #999;">If you didn't create this account, please ignore this email.</p>
                `
            })
        } catch (emailErr) {
            console.error("Failed to send welcome email:", emailErr)
        }

        console.log(`[AUTH] User created: ${email} with ID: ${secretId}`)

        return NextResponse.json({
            success: true,
            userId: authUser.user.id,
            secretId
        })

    } catch (error: any) {
        console.error("Signup error:", error)
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
    }
}
