import { supabase } from '@/lib/supabase';

export interface SessionState {
    step: 'START' | 'ONBOARDING_AGE' | 'ONBOARDING_LOCATION' | 'ONBOARDING_EDUCATION' | 'ONBOARDING_SUBJECTS' | 'ONBOARDING_GOAL' | 'RIASEC_QUIZ' | 'ACTIVE_MENTOR';
    data: Record<string, any>;
    quizIndex?: number;
    scores?: Record<string, number>;
}

export async function getSession(phoneNumber: string): Promise<SessionState> {
    const { data, error } = await supabase
        .from('whatsapp_sessions')
        .select('state')
        .eq('phone_number', phoneNumber)
        .single();

    if (error || !data) {
        return { step: 'START', data: {} };
    }

    return data.state as SessionState;
}

export async function updateSession(phoneNumber: string, state: SessionState): Promise<void> {
    const { error } = await supabase
        .from('whatsapp_sessions')
        .upsert({
            phone_number: phoneNumber,
            state,
            updated_at: new Date().toISOString()
        });

    if (error) {
        console.error("Session Update Error:", error);
    }
}

export async function clearSession(phoneNumber: string): Promise<void> {
    await supabase.from('whatsapp_sessions').delete().eq('phone_number', phoneNumber);
}
