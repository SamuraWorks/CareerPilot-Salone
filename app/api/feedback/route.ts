import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
    const supabase = createClient();
    try {
        const body = await req.json();
        const { message, email, type } = body;

        // Basic validation
        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // Save to Supabase
        const { error } = await supabase
            .from('feedback')
            .insert({
                message,
                email: email || null,
                type: type || 'general',
                created_at: new Date().toISOString()
            });

        if (error) {
            console.error("Feedback DB Error (Check if 'feedback' table exists):", error);
            return NextResponse.json(
                { error: "Database error. Please try the Email fallback in Settings." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Feedback API Critical Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
