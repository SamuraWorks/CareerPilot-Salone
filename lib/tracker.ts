import { createClient } from "@/lib/supabase/client"

export type ActivityEvent =
    | 'page_view'
    | 'cv_generated'
    | 'scholarship_search'
    | 'career_roadmap_click'
    | 'ai_guidance_request'
    | 'profile_update'
    | 'opportunity_click'

export async function logActivity(userId: string, eventType: ActivityEvent, metadata: Record<string, any> = {}) {
    const supabase = createClient()

    const { error } = await supabase
        .from('activity_logs')
        .insert({
            user_id: userId,
            event_type: eventType,
            metadata: {
                ...metadata,
                url: typeof window !== 'undefined' ? window.location.pathname : '',
                timestamp: new Date().toISOString()
            }
        })

    if (error) {
        console.error("[TRACKER ERROR]", error.message)
    }
}
