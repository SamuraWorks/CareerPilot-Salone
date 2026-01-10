import { SIERRA_LEONE_OPPORTUNITIES } from './sierra-leone-opportunities'

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
        logo_url: '/images/universities/fbc.png',
        popular_courses: ['Engineering', 'Law', 'Arts', 'Pure Sciences']
    },
    {
        id: '2',
        name: 'Njala University',
        location: 'Njala & Bo',
        website_url: 'https://njala.edu.sl',
        logo_url: '/images/universities/njala.png',
        popular_courses: ['Agriculture', 'Education', 'Environmental Science', 'Technology']
    },
    {
        id: '3',
        name: 'University of Makeni (UNIMAK)',
        location: 'Makeni',
        website_url: 'https://unimak.edu.sl',
        logo_url: '/images/universities/unimak.png',
        popular_courses: ['Computer Science', 'Public Health', 'Mass Communication']
    },
    {
        id: '4',
        name: 'IPAM (USL)',
        location: 'Freetown',
        website_url: 'https://usl.edu.sl/ipam',
        logo_url: '/images/universities/ipam.png',
        popular_courses: ['Accounting', 'Business Admin', 'Information Systems']
    },
    {
        id: '5',
        name: 'Limkokwing University',
        location: 'Freetown',
        website_url: 'https://www.limkokwing.net/sierra_leone',
        logo_url: '/images/universities/limkokwing.png',
        popular_courses: ['Creative Tech', 'Design', 'Information Technology']
    },
    {
        id: '6',
        name: 'COMAHS (USL)',
        location: 'Freetown',
        logo_url: '/images/universities/fbc.png', // Fallback to USL/FBC logo style if specific one missing
        popular_courses: ['Medicine', 'Nursing', 'Pharmacy', 'Public Health']
    }
];

export const getUniversities = async () => {
    return MOCK_UNIVERSITIES;
}

import { supabase } from './supabase'

export const getUserProfile = async (userId: string) => {
    // 1. Try Supabase first
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (data) return { data: data, error: null };
    } catch (e) {
        console.warn("Supabase fetch failed, falling back to local storage");
    }

    // 2. Fallback to Local Storage
    const saved = localStorage.getItem("userOnboarding");
    if (saved) {
        return { data: JSON.parse(saved), error: null };
    }
    return { data: null, error: "Not found" };
}

export const updateUserProfile = async (userId: string, profileData: any) => {
    // 1. Save to Local Storage for instant UI feedback
    const current = localStorage.getItem("userOnboarding");
    const updated = current ? { ...JSON.parse(current), ...profileData } : profileData;
    localStorage.setItem("userOnboarding", JSON.stringify(updated));

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
