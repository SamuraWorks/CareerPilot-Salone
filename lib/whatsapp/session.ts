import { supabase } from '../supabase';

export interface SessionState {
    step: 'START' | 'ONBOARDING_AGE' | 'ONBOARDING_LOCATION' | 'ONBOARDING_EDUCATION' | 'ONBOARDING_SUBJECTS' | 'ONBOARDING_GOAL' | 'ONBOARDING_IMPACT_METRICS' | 'ONBOARDING_LEADERSHIP_EXPERIENCE' | 'ONBOARDING_UNIQUE_HOOK' | 'RIASEC_QUIZ' | 'ACTIVE_MENTOR';
    data: Record<string, any>;
    quizIndex?: number;
    scores?: Record<string, number>;
    language?: 'en' | 'krio';
}

export async function getSession(phoneNumber: string): Promise<SessionState> {
    try {
        const { data, error } = await supabase
            .from('whatsapp_sessions')
            .select('state')
            .eq('phone_number', phoneNumber)
            .single();

        if (data && data.state) {
            return data.state as SessionState;
        }

        return { step: 'START', data: {}, language: 'en' };
    } catch (e) {
        console.warn("Session fetch failed, using default", e);
        return { step: 'START', data: {}, language: 'en' };
    }
}

export async function updateSession(phoneNumber: string, state: SessionState): Promise<void> {
    try {
        await supabase
            .from('whatsapp_sessions')
            .upsert({
                phone_number: phoneNumber,
                state,
                updated_at: new Date().toISOString()
            });
    } catch (e) {
        console.error("Session update failed:", e);
    }
}

export async function clearSession(phoneNumber: string): Promise<void> {
    try {
        await supabase
            .from('whatsapp_sessions')
            .delete()
            .eq('phone_number', phoneNumber);
    } catch (e) {
        console.error("Session clear failed:", e);
    }
}
