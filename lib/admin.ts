import { createClient } from "@supabase/supabase-js";

export async function getAdminUsers() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            console.error("[CRITICAL] Missing Supabase config for admin queries");
            return [];
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        const { data: users, error } = await supabaseAdmin
            .from('profiles')
            .select('id, email, created_at, last_login, total_logins, usage_count, progress, role, status')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("[ADMIN ERROR] Failed to fetch users:", error.message);
            return [];
        }

        return users || [];
    } catch (err) {
        console.error("[FATAL ADMIN ERROR] Crash prevented:", err);
        return [];
    }
}
