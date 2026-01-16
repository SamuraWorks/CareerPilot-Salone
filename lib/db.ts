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
    points?: number;
    is_onboarded?: boolean;
    whatsapp_subscribed?: boolean;
    preferred_language?: string;
    impact_metrics?: string;
    leadership_experience?: string;
    unique_hook?: string;
    updated_at?: string;
    created_at?: string;
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
        logo_url: '/images/universities/fbc.jpg',
        image_url: '/images/universities/fbc_header.png',
        badges: ['Premier', 'Research Heavy', 'Mount Aureol'],
        popular_courses: ['Engineering', 'Law', 'Arts', 'Pure Sciences']
    },
    {
        id: '2',
        name: 'Njala University',
        location: 'Njala & Bo',
        website_url: 'https://njala.edu.sl',
        logo_url: '/images/universities/njala.jpg',
        image_url: '/images/universities/campus.png',
        badges: ['Agriculture', 'Green Campus', 'Stem Focused'],
        popular_courses: ['Agriculture', 'Education', 'Environmental Science', 'Technology']
    },
    {
        id: '3',
        name: 'University of Makeni (UNIMAK)',
        location: 'Makeni',
        website_url: 'https://unimak.edu.sl',
        logo_url: '/images/universities/unimak.tif',
        image_url: '/images/universities/campus.png',
        badges: ['Community First', 'Modern', 'Catholic'],
        popular_courses: ['Computer Science', 'Public Health', 'Mass Communication']
    },
    {
        id: '4',
        name: 'IPAM (USL)',
        location: 'Freetown',
        website_url: 'https://usl.edu.sl/ipam',
        logo_url: '/images/universities/ipam_official.jpg',
        image_url: '/images/universities/campus.png',
        badges: ['Business Hub', 'Professional', 'Urban'],
        popular_courses: ['Accounting', 'Business Admin', 'Information Systems']
    },
    {
        id: '5',
        name: 'Limkokwing University',
        location: 'Freetown',
        website_url: 'https://www.limkokwing.net/sierra_leone',
        logo_url: '/images/universities/limkokwing.jpg',
        image_url: '/images/universities/campus.png',
        badges: ['Creative', 'Tech Savvy', 'Global'],
        popular_courses: ['Creative Tech', 'Design', 'Information Technology']
    },
    {
        id: '6',
        name: 'COMAHS (USL)',
        location: 'Freetown',
        logo_url: '/images/universities/fbc.jpg',
        image_url: '/images/universities/campus.png',
        badges: ['Clinical', 'Prestige', 'Medical'],
        popular_courses: ['Medicine', 'Nursing', 'Pharmacy', 'Public Health']
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
    const saved = localStorage.getItem("latestCareerTestResult");
    if (saved) return JSON.parse(saved);
    return null;
}
