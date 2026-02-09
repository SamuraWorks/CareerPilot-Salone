export interface UserProfile {
    id: string
    secret_id?: string
    email: string
    full_name: string
    phone_number?: string // Unified from whatsappNumber
    avatar_url?: string

    // Core Demographics
    location?: string
    age?: number
    education_level?: string

    // Career DNA
    skills: string[] // Unified from subjects/hardSkills
    interests: string[]
    career_goal?: string
    preferred_language?: string

    // CV / Professional Data
    status?: 'student' | 'employed' | 'job_seeker' | ''
    experience_years?: number
    resume_data?: {
        top_project?: string
        recent_role?: string
        key_achievement?: string
        leadership?: string
        responsibilities?: string[]
        impact_metric?: string
        leadership_action?: string
        professional_hook?: string
    }

    // Education Details
    education_details?: {
        institution: string
        field: string
        grad_year: string
    }

    // Work Style
    work_style?: {
        environment: string[]
        org_type: string[]
        relocation: boolean
        role_flexibility?: 'yes' | 'no'
    }

    anon_id?: string
    phone?: string
    district?: string
    profile_picture_url?: string
    profile_completed: boolean

    // System Flags
    whatsapp_opt_in: boolean
    is_complete: boolean
    research_completed?: boolean

    // Gamification & AI
    points: number
    active_roadmap_id?: string
    completed_tasks?: Record<string, string[]> // roadmapId -> taskIds
    career_matches?: any[]
    viewed_careers?: string[]
    viewed_scholarships?: string[]
    viewed_jobs?: string[]
    task_timestamps?: Record<string, string> // taskId -> ISO timestamp

    created_at?: string
    updated_at?: string
    last_updated_at?: string
    challenges?: string[]
}

export const DEFAULT_PROFILE: UserProfile = {
    id: "",
    anon_id: "",
    email: "",
    full_name: "",
    phone: "",
    district: "",
    education_level: "",
    profile_picture_url: "",
    skills: [],
    interests: [],
    viewed_careers: [],
    viewed_scholarships: [],
    viewed_jobs: [],
    task_timestamps: {},
    whatsapp_opt_in: false,
    is_complete: false,
    profile_completed: false,
    points: 0
}
