"use server"

import { createClient } from "./supabase/server";

export async function completeRoadmapTaskAction(userId: string, roadmapId: string, taskId: string) {
    try {
        const supabase = createClient();

        // 1. Log completion
        const { error: progressError } = await supabase
            .from('user_journey_progress')
            .upsert({
                user_id: userId,
                roadmap_id: roadmapId,
                task_id: taskId,
                completed_at: new Date().toISOString()
            }, { onConflict: 'user_id,roadmap_id,task_id' });

        if (progressError) throw progressError;

        // 2. Fetch profile
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (profileError || !profile) throw new Error("Profile not found");

        const completedTasks = profile.completed_tasks || {};
        const roadmapTasks = completedTasks[roadmapId] || [];

        if (!roadmapTasks.includes(taskId)) {
            roadmapTasks.push(taskId);
            completedTasks[roadmapId] = roadmapTasks;

            const currentPoints = profile.points || 0;
            const newPoints = currentPoints + 10;

            const { data, error } = await supabase
                .from('profiles')
                .update({
                    completed_tasks: completedTasks,
                    points: newPoints,
                    updated_at: new Date().toISOString()
                })
                .eq('id', userId)
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        }

        return { data: profile, error: null };
    } catch (e: any) {
        console.error("Action error:", e);
        return { data: null, error: e.message || "Failed to complete task" };
    }
}

export async function updateUserProfileAction(userId: string, profileData: any) {
    try {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('profiles')
            .upsert({ id: userId, ...profileData, updated_at: new Date().toISOString() })
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (e: any) {
        console.error("Action error:", e);
        return { data: null, error: e.message || "Failed to update profile" };
    }
}
