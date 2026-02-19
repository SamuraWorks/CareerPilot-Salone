"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getProgress() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data, error } = await supabase
        .from('progress_tracking')
        .select('*')
        .eq('user_id', user.id)
        .single()

    if (error && error.code !== 'PGRST116') {
        console.error("Error fetching progress:", error)
        return null
    }

    return data
}

export async function updateProgress(stage: string, completedSteps: string[]) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Unauthorized")

    const { data, error } = await supabase
        .from('progress_tracking')
        .upsert({
            user_id: user.id,
            current_stage: stage,
            completed_steps: completedSteps,
            updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' })
        .select()
        .single()

    if (error) {
        console.error("Error updating progress:", error)
        throw new Error("Failed to update progress")
    }

    revalidatePath('/dashboard')
    return data
}
