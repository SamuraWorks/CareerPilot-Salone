export interface UserProfile {
    id: string;
    full_name?: string;
    email?: string;
    avatar_url?: string;
    age?: number;
    location?: string;
    whatsapp_number?: string;
    education_level?: string;
    skills?: string[];
    interests?: string[];
    career_goal?: string;
    active_roadmap_id?: string;
    is_onboarded?: boolean;
    is_complete?: boolean;
    whatsapp_subscribed?: boolean;
    preferred_language?: string;
    impact_metrics?: string;
    leadership_experience?: string;
    unique_hook?: string;
    updated_at?: string;
    created_at?: string;
    // Gamification & Progress Tracking
    completed_tasks?: Record<string, string[]>; // roadmapId -> array of completed task IDs
    points?: number; // Total career progress score
}

// Any other database related interfaces can go here
