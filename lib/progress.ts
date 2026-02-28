import { createClient } from "@supabase/supabase-js";

export async function updateProgress(userId: string, newProgressData: Record<string, any>) {
    try {
        if (!userId) return { success: false, error: "Missing User ID" };

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            console.error("[CRITICAL] Missing Supabase config for progress update");
            return { success: false, error: "Server configuration error" };
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        // 1. Fetch current progress
        const { data: profile, error: readError } = await supabaseAdmin
            .from('profiles')
            .select('progress, usage_count')
            .eq('id', userId)
            .single();

        if (readError) {
            console.error("[PROGRESS ERROR] Read failed:", readError.message);
            return { success: false, error: "Failed to read progress" };
        }

        const currentProgress = profile?.progress || {};

        // 2. Merge progress securely
        const updatedProgress = {
            ...currentProgress,
            ...newProgressData,
            last_activity: new Date().toISOString()
        };

        // 3. Save to DB
        const { error: updateError } = await supabaseAdmin
            .from('profiles')
            .update({
                progress: updatedProgress,
                usage_count: (profile?.usage_count || 0) + 1
            })
            .eq('id', userId);

        if (updateError) {
            console.error("[PROGRESS ERROR] Sync failed:", updateError.message);
            return { success: false, error: "Database sync failed" };
        }

        return { success: true, progress: updatedProgress };

    } catch (err: any) {
        console.error("[FATAL ERROR] Progress update transaction failed:", err);
        return { success: false, error: "Critical failure during update" };
    }
}
