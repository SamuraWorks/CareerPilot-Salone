import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, roadmapId, taskId } = body;

        if (!userId || !roadmapId || !taskId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Init Service Client (Bypass RLS)
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // 1. Fetch Profile
        const { data: profile, error: fetchError } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (fetchError || !profile) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        // 2. Verify Task Status
        const completedTasks = profile.completed_tasks || {};
        const roadmapTasks = completedTasks[roadmapId] || [];

        if (roadmapTasks.includes(taskId)) {
            return NextResponse.json({ success: true, message: "Task already completed" });
        }

        // 3. Update Progress & Points
        roadmapTasks.push(taskId);
        completedTasks[roadmapId] = roadmapTasks;

        const currentPoints = profile.points || 0;
        const newPoints = currentPoints + 10;

        const { error: updateError } = await supabaseAdmin
            .from('profiles')
            .update({
                completed_tasks: completedTasks,
                points: newPoints,
                updated_at: new Date().toISOString()
            })
            .eq('id', userId);

        if (updateError) {
            throw updateError;
        }

        return NextResponse.json({ success: true, points: newPoints });

    } catch (error: any) {
        console.error("Progress Update Error:", error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
