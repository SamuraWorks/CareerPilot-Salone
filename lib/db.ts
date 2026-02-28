"use server"

import { SIERRA_LEONE_OPPORTUNITIES } from './sierra-leone-opportunities'
import { MOCK_UNIVERSITIES } from './constants/mock-data'
import { createClient } from './supabase/server'
import { UserProfile } from './database/types'

const getSupabase = () => createClient()

// UserProfile interface is now imported from ./database/types

/**
 * DATABASE ABSTRACTION LAYER (MOCK VERSION)
 * No backend required - uses local storage and static data.
 */

export const getJobs = async () => {
    // Artificial delay for realism
    await new Promise(resolve => setTimeout(resolve, 300));
    return SIERRA_LEONE_OPPORTUNITIES.filter(o => o.type === 'job' || o.type === 'internship');
}

export const getScholarships = async () => {
    try {
        const supabase = await getSupabase();
        const { data, error } = await supabase
            .from('scholarships')
            .select('*')
            .order('deadline', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (e) {
        console.error("Error fetching verified scholarships:", e);
        // Fallback to mock data if table empty or error
        return SIERRA_LEONE_OPPORTUNITIES.filter(o => o.type === 'scholarship');
    }
}


export const getUniversities = async () => {
    return MOCK_UNIVERSITIES;
}

export const getUserProfile = async (userId: string): Promise<{ data: UserProfile | null, error: any }> => {
    try {
        const supabase = await getSupabase();
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return { data: data as UserProfile, error: null };
    } catch (e) {
        console.error("Error fetching profile from Supabase:", e);
        return { data: null, error: e };
    }
}

export const updateUserProfile = async (userId: string, profileData: Partial<UserProfile>): Promise<{ data: UserProfile | null, error: any }> => {
    try {
        const supabase = await getSupabase();
        const { data, error } = await supabase
            .from('profiles')
            .upsert({ id: userId, ...profileData, updated_at: new Date().toISOString() })
            .select()
            .single();

        if (error) throw error;
        return { data: data as UserProfile, error: null };
    } catch (e: any) {
        console.error("Supabase update failed:", e);
        // Return detailed error for debugging
        return { data: null, error: e };
    }
}

export const logAIInteraction = async (userId: string | null, prompt: string, response: string, provider: string) => {
    console.log("Logged AI Interaction:", { userId, prompt, provider });
    return { data: null, error: null };
}

export const getLatestCareerTestResult = async (userId: string) => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem("latestCareerTestResult");
        if (saved) return JSON.parse(saved);
    }
    return null;
}

export const completeRoadmapTask = async (userId: string, roadmapId: string, taskId: string): Promise<{ data: UserProfile | null, error: any }> => {
    try {
        const supabase = await getSupabase();
        // 1. Log completion in user_journey_progress table for audit/persistence
        const { error: progressError } = await supabase
            .from('user_journey_progress')
            .upsert({
                user_id: userId,
                roadmap_id: roadmapId,
                task_id: taskId,
                completed_at: new Date().toISOString()
            }, { onConflict: 'user_id,roadmap_id,task_id' });

        if (progressError) throw progressError;

        // 2. Update the profile summary for quick UI access
        const { data: profile } = await getUserProfile(userId);
        if (!profile) throw new Error("Profile not found");

        const completedTasks = profile.completed_tasks || {};
        const roadmapTasks = completedTasks[roadmapId] || [];

        if (!roadmapTasks.includes(taskId)) {
            roadmapTasks.push(taskId);
            completedTasks[roadmapId] = roadmapTasks;

            const currentPoints = profile.points || 0;
            const newPoints = currentPoints + 10;

            return await updateUserProfile(userId, {
                completed_tasks: completedTasks,
                points: newPoints
            });
        }

        return { data: profile, error: null };
    } catch (e) {
        console.error("Error completing roadmap task:", e);
        return { data: null, error: e };
    }
}

export const getJourneyProgress = async (userId: string) => {
    const supabase = await getSupabase();
    return await supabase
        .from('user_journey_progress')
        .select('*')
        .eq('user_id', userId);
}

