"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

async function verifyAdmin() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        redirect('/')
    }

    return { user, supabase }
}

export async function getAllProfiles() {
    const { supabase } = await verifyAdmin()

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching profiles:", error)
        throw new Error("Failed to fetch profiles")
    }

    return data
}

export async function getUserProgress(userId: string) {
    const { supabase } = await verifyAdmin()

    const { data, error } = await supabase
        .from('progress_tracking')
        .select('*')
        .eq('user_id', userId)
        .single()

    if (error && error.code !== 'PGRST116') {
        console.error("Error fetching user progress:", error)
        throw new Error("Failed to fetch user progress")
    }

    return data
}
