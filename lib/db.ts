import { supabase } from './supabase'
import { SIERRA_LEONE_OPPORTUNITIES } from './sierra-leone-opportunities'

/**
 * DATABASE ABSTRACTION LAYER
 * Enforces Supabase as source of truth with robust local fallbacks.
 * Ensures the platform NEVER fails even if Supabase tables are missing.
 */

export const getJobs = async () => {
    try {
        const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) {
            console.warn("Using local fallback for jobs");
            return SIERRA_LEONE_OPPORTUNITIES.filter(o => o.type === 'job' || o.type === 'internship');
        }
        return data;
    } catch (e) {
        return SIERRA_LEONE_OPPORTUNITIES.filter(o => o.type === 'job' || o.type === 'internship');
    }
}

export const getScholarships = async () => {
    try {
        const { data, error } = await supabase
            .from('scholarships')
            .select('*')
            .order('deadline', { ascending: true });

        if (error || !data || data.length === 0) {
            console.warn("Using local fallback for scholarships");
            return SIERRA_LEONE_OPPORTUNITIES.filter(o => o.type === 'scholarship');
        }
        return data;
    } catch (e) {
        return SIERRA_LEONE_OPPORTUNITIES.filter(o => o.type === 'scholarship');
    }
}

export const MOCK_UNIVERSITIES = [
    {
        id: '1',
        name: 'University of Sierra Leone (FBC)',
        location: 'Freetown',
        website_url: 'https://usl.edu.sl',
        logo_url: '',
        popular_courses: ['Engineering', 'Law', 'Arts', 'Social Sciences']
    },
    {
        id: '2',
        name: 'Njala University',
        location: 'Njala & Bo',
        website_url: 'https://njala.edu.sl',
        logo_url: '',
        popular_courses: ['Agriculture', 'Education', 'Environmental Science', 'Technology']
    },
    {
        id: '3',
        name: 'University of Makeni (UNIMAK)',
        location: 'Makeni',
        website_url: 'https://unimak.edu.sl',
        logo_url: '',
        popular_courses: ['Computer Science', 'Business Information Technology', 'Mass Communication', 'Public Health']
    },
    {
        id: '4',
        name: 'Ernest Bai Koroma University',
        location: 'Makeni',
        website_url: 'https://ebkust.edu.sl',
        logo_url: '',
        popular_courses: ['Education', 'Management', 'Sciences']
    },
    {
        id: '5',
        name: 'IPAM (USL)',
        location: 'Freetown',
        website_url: 'https://ipam.edu.sl',
        logo_url: '',
        popular_courses: ['Business Admin', 'Accounting', 'Public Policy', 'Information Systems']
    },
    {
        id: '6',
        name: 'COMAHS (USL)',
        location: 'Freetown',
        website_url: 'https://comahs.edu.sl',
        logo_url: '',
        popular_courses: ['Medicine', 'Nursing', 'Pharmacy', 'Lab Sciences']
    },
    {
        id: '7',
        name: 'Milton Margai University',
        location: 'Freetown',
        website_url: 'https://mmu.edu.sl',
        logo_url: '',
        popular_courses: ['Education', 'Tourism', 'Hotel Management', 'Engineering']
    },
    {
        id: '8',
        name: 'Eastern Technical University',
        location: 'Kenema',
        website_url: 'https://etu.edu.sl',
        logo_url: '',
        popular_courses: ['Health Sciences', 'Engineering', 'Education']
    }
];

export const getUniversities = async () => {
    try {
        const { data, error } = await supabase
            .from('universities')
            .select('*');

        if (error || !data || data.length === 0) {
            console.warn("Using local fallback for universities");
            return MOCK_UNIVERSITIES;
        }
        return data;
    } catch (e) {
        return MOCK_UNIVERSITIES;
    }
}


export const getUserProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

    return { data, error };
}

export const updateUserProfile = async (userId: string, profileData: any) => {
    const { data, error } = await supabase
        .from('user_profiles')
        .upsert({ user_id: userId, ...profileData, updated_at: new Date() });

    return { data, error };
}

export const logAIInteraction = async (userId: string | null, prompt: string, response: string, provider: string) => {
    const { data, error } = await supabase
        .from('ai_logs')
        .insert({
            user_id: userId,
            prompt,
            response,
            provider,
            status: 'success'
        });
    return { data, error };
}

export const getLatestCareerTestResult = async (userId: string) => {
    try {
        const { data, error } = await supabase
            .from('career_test_results')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) return null;
        return data;
    } catch (e) {
        return null;
    }
}
