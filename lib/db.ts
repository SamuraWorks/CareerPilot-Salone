import { SIERRA_LEONE_OPPORTUNITIES } from './sierra-leone-opportunities'

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
    await new Promise(resolve => setTimeout(resolve, 300));
    return SIERRA_LEONE_OPPORTUNITIES.filter(o => o.type === 'scholarship');
}

export const MOCK_UNIVERSITIES = [
    {
        id: '1',
        name: 'University of Sierra Leone (FBC)',
        location: 'Freetown',
        website_url: 'https://usl.edu.sl',
        portal_url: 'https://portal.usl.edu.sl',
        logo_url: '/images/sections/universities/fbc.jpg',
        image_url: '/images/sections/universities/campus.png',
        badges: ['Premier', 'Research Heavy', 'Mount Aureol'],
        popular_courses: ['Engineering', 'Law', 'Arts', 'Pure Sciences']
    },
    {
        id: '2',
        name: 'Njala University',
        location: 'Njala & Bo',
        website_url: 'https://njala.edu.sl',
        portal_url: 'https://portal.njala.edu.sl',
        logo_url: '/images/sections/universities/njala.jpg',
        image_url: '/images/sections/universities/campus.png',
        badges: ['Agriculture', 'Green Campus', 'STEM Focused'],
        popular_courses: ['Agriculture', 'Education', 'Environmental Science', 'Technology']
    },
    {
        id: '3',
        name: 'University of Makeni (UNIMAK)',
        location: 'Makeni',
        website_url: 'https://unimak.edu.sl',
        portal_url: 'https://unimak.edu.sl/admission/',
        logo_url: '/images/sections/universities/unimak.jpg',
        image_url: '/images/sections/universities/campus.png',
        badges: ['Community First', 'Modern', 'Catholic'],
        popular_courses: ['Computer Science', 'Public Health', 'Mass Communication']
    },
    {
        id: '4',
        name: 'IPAM (USL)',
        location: 'Freetown',
        website_url: 'https://ipam.edu.sl',
        portal_url: 'https://portal.ipam.edu.sl',
        logo_url: '/images/sections/universities/ipam.jpg',
        image_url: '/images/sections/universities/campus.png',
        badges: ['Business Hub', 'Professional', 'Urban'],
        popular_courses: ['Accounting', 'Business Admin', 'Information Systems']
    },
    {
        id: '5',
        name: 'Limkokwing University',
        location: 'Freetown',
        website_url: 'https://www.limkokwing.net/sierra_leone',
        portal_url: 'https://sl.limkokwing.net/portal',
        logo_url: '/images/sections/universities/limkokwing.jpg',
        image_url: '/images/sections/universities/campus.png',
        badges: ['Creative', 'Tech Savvy', 'Global'],
        popular_courses: ['Creative Tech', 'Design', 'Information Technology']
    },
    {
        id: '6',
        name: 'COMAHS (USL)',
        location: 'Freetown',
        website_url: 'https://usl.edu.sl/comahs',
        portal_url: 'https://portal.usl.edu.sl',
        logo_url: '/images/sections/universities/comahs.jpg',
        image_url: '/images/sections/universities/campus.png',
        badges: ['Clinical', 'Prestige', 'Medical'],
        popular_courses: ['Medicine', 'Nursing', 'Pharmacy', 'Public Health']
    },
    {
        id: '7',
        name: 'Ernest Bai Koroma University (EBKUST)',
        location: 'Makeni & Port Loko',
        website_url: 'https://ebkust.edu.sl',
        portal_url: 'https://portal.ebkust.edu.sl',
        logo_url: '/images/sections/universities/ebkust.jpg',
        image_url: '/images/sections/universities/campus.png',
        badges: ['Science', 'Technology', 'Public'],
        popular_courses: ['Science', 'Technology', 'Engineering', 'Education']
    },
    {
        id: '8',
        name: 'Milton Margai Technical University',
        location: 'Freetown',
        website_url: 'https://mmtu.edu.sl',
        portal_url: 'https://portal.mmtu.edu.sl',
        logo_url: '/images/sections/universities/mmtu.jpg',
        image_url: '/images/sections/universities/campus.png',
        badges: ['Technical', 'Vocational', 'Freetown'],
        popular_courses: ['Engineering', 'Hospitality', 'Education']
    },
    {
        id: '9',
        name: 'Eastern Technical University (ETU-SL)',
        location: 'Kenema',
        website_url: 'https://etusl.edu.sl',
        portal_url: 'https://portal.etusl.edu.sl',
        logo_url: '/images/sections/universities/etu.jpg',
        image_url: '/images/sections/universities/campus.png',
        badges: ['Eastern Hub', 'Technical', 'Growing'],
        popular_courses: ['Agriculture', 'Mining', 'Public Health']
    },
    {
        id: '10',
        name: 'University of Management & Tech (UNIMTECH)',
        location: 'Freetown',
        website_url: 'https://unimtech.edu.sl',
        portal_url: 'https://unimtech.edu.sl/admissions',
        logo_url: '/images/sections/universities/campus.png',
        image_url: '/images/sections/universities/campus.png',
        badges: ['Management', 'Technology', 'Private'],
        popular_courses: ['Business Management', 'HRM', 'Data Science']
    },
    {
        id: '11',
        name: 'United Methodist University (UMU)',
        location: 'Freetown',
        website_url: 'https://umu.edu.sl',
        portal_url: 'https://umu.edu.sl/admission',
        logo_url: '/images/sections/universities/campus.png',
        image_url: '/images/sections/universities/campus.png',
        badges: ['Holistic', 'Christian', 'Values'],
        popular_courses: ['Theology', 'Social Sciences', 'Management']
    }
];

export const getUniversities = async () => {
    return MOCK_UNIVERSITIES;
}

import { supabase } from './supabase'

export const getUserProfile = async (userId: string): Promise<{ data: UserProfile | null, error: any }> => {
    // 1. Try Supabase first
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (data) return { data: data as UserProfile, error: null };
    } catch (e) {
        console.warn("Supabase fetch failed, falling back to local storage");
    }

    // 2. Fallback to Local Storage
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem("userOnboarding");
        if (saved) {
            return { data: JSON.parse(saved) as UserProfile, error: null };
        }
    }
    return { data: null, error: "Not found" };
}

export const updateUserProfile = async (userId: string, profileData: Partial<UserProfile>): Promise<{ data: UserProfile | null, error: any }> => {
    let updated: UserProfile | null = null;

    // 1. Save to Local Storage for instant UI feedback
    if (typeof window !== 'undefined') {
        const current = localStorage.getItem("userOnboarding");
        updated = current ? { ...JSON.parse(current), ...profileData } : { id: userId, ...profileData } as UserProfile;
        localStorage.setItem("userOnboarding", JSON.stringify(updated));
    }

    // 2. Background sync to Supabase
    try {
        await supabase
            .from('profiles')
            .upsert({ id: userId, ...profileData, updated_at: new Date().toISOString() });
    } catch (e) {
        console.error("Supabase sync failed:", e);
    }

    return { data: updated, error: null };
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
    const { data: profile, error } = await getUserProfile(userId);
    if (error || !profile) return { data: null, error: error || "Profile not found" };

    const completedTasks = profile.completed_tasks || {};
    const roadmapTasks = completedTasks[roadmapId] || [];

    if (!roadmapTasks.includes(taskId)) {
        roadmapTasks.push(taskId);
        completedTasks[roadmapId] = roadmapTasks;

        // Award points for completion (e.g., 10 points per task)
        const currentPoints = profile.points || 0;
        const newPoints = currentPoints + 10;

        return await updateUserProfile(userId, {
            completed_tasks: completedTasks,
            points: newPoints
        });
    }

    return { data: profile, error: null };
}

