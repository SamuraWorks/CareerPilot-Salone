import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        // Initialize Supabase Admin Client (lazy initialization)
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
            const missing = !supabaseUrl ? 'NEXT_PUBLIC_SUPABASE_URL' : 'SUPABASE_SERVICE_ROLE_KEY';
            console.error(`Missing Supabase environment variable: ${missing}`);
            return NextResponse.json({
                error: "Server configuration error",
                details: `Missing environment variable: ${missing}. Ensure your .env.local is configured.`
            }, { status: 500 });
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

        const formData = await req.formData()
        const file = formData.get('file') as File
        const userId = formData.get('userId') as string
        const secretId = formData.get('secretId') as string // Optional, for path naming

        if (!file || !userId) {
            return NextResponse.json({ error: "Missing file or user ID" }, { status: 400 })
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: "Invalid file type. Only images allowed." }, { status: 400 })
        }

        // Validate file size (e.g. 5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "File too large. Max 5MB." }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const fileExt = file.name.split('.').pop()

        // Path: avatars/{userId}-{timestamp}.{ext}
        const fileName = `${userId}-${Date.now()}.${fileExt}`
        const filePath = `avatars/${fileName}`

        const bucketName = 'avatars'

        const { data, error } = await supabaseAdmin
            .storage
            .from(bucketName)
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: true
            })

        if (error) {
            console.error("Storage Upload Error:", error)
            if (error.message.includes('Bucket not found')) {
                return NextResponse.json({ error: "Storage bucket 'avatars' not found. Please create it in Supabase." }, { status: 500 })
            }
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        // Get Public URL
        const { data: { publicUrl } } = supabaseAdmin
            .storage
            .from(bucketName)
            .getPublicUrl(filePath)

        return NextResponse.json({
            success: true,
            publicUrl
        })

    } catch (error: any) {
        console.error("Upload API Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
