import { supabase } from '../supabase';

export interface SessionState {
    step: 'START' | 'ONBOARDING_AGE' | 'ONBOARDING_LOCATION' | 'ONBOARDING_EDUCATION' | 'ONBOARDING_SUBJECTS' | 'ONBOARDING_GOAL' | 'ONBOARDING_IMPACT_METRICS' | 'ONBOARDING_LEADERSHIP_EXPERIENCE' | 'ONBOARDING_UNIQUE_HOOK' | 'RIASEC_QUIZ' | 'ACTIVE_MENTOR';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
    quizIndex?: number;
    scores?: Record<string, number>;
    language?: 'en' | 'krio';
}

const memoryStore = new Map<string, SessionState>();

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

        // Fallback to memory if DB returns null/error or if configured to do so
        if (memoryStore.has(phoneNumber)) {
            return memoryStore.get(phoneNumber)!;
        }

        return { step: 'START', data: {}, language: 'en' };
    } catch {
        // If Supabase fails (e.g. no keys), fall back to memory
        if (memoryStore.has(phoneNumber)) {
            return memoryStore.get(phoneNumber)!;
        }
        return { step: 'START', data: {}, language: 'en' };
    }
}

export async function updateSession(phoneNumber: string, state: SessionState): Promise<void> {
    // Always update memory
    memoryStore.set(phoneNumber, state);

    try {
        // The provided snippet `session.step = ...` is syntactically incorrect within an object literal.
        // Assuming the intent was to update the `state` object before upserting,
        // or to add a new property to the upsert object, but the snippet is malformed.
        // To maintain syntactic correctness as per instructions, and given the snippet
        // is incomplete/incorrect for an object literal, I will assume the user
        // intended to modify the `state` object *before* passing it, or that the
        // snippet was a placeholder for a different kind of modification.
        // Since the instruction is to "Fix lint errors" and the provided "Code Edit"
        // introduces a syntax error, I will apply the most reasonable interpretation
        // that results in syntactically correct code, which means not inserting
        // the malformed line directly into the upsert object.
        // If the intent was to modify `state.step`, it should be done like:
        // state.step = `ONBOARDING_${nextQuestion.key.toUpperCase()}` as SessionState['step'];
        // However, `nextQuestion` is not defined in this scope.
        // Therefore, I will revert to the original correct syntax for the upsert object,
        // as the provided snippet cannot be integrated syntactically correctly as-is.
        await supabase
            .from('whatsapp_sessions')
            .upsert({
                phone_number: phoneNumber,
                state,
                updated_at: new Date().toISOString()
            });
    } catch {
        // Build resiliently: ignore DB errors if keys are missing
        console.warn("Supabase update failed (using in-memory):");
    }
}

export async function clearSession(phoneNumber: string): Promise<void> {
    memoryStore.delete(phoneNumber);
    try {
        await supabase
            .from('whatsapp_sessions')
            .delete()
            .eq('phone_number', phoneNumber);
    } catch {
        console.warn("Supabase delete failed (using in-memory):");
    }
}
export async function syncToProfile(phoneNumber: string, state: SessionState): Promise<void> {
    try {
        // 1. Find user by phone number
        const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('whatsapp_number', phoneNumber)
            .single();

        if (fetchError || !profile) {
            console.log("No linked web profile found for phone:", phoneNumber);
            return;
        }

        // 2. Conflict Resolution: Merge logic
        // Rule: Prioritize the data from the platform that has MORE information.
        const whatsappDataCount = Object.keys(state.data || {}).length + (state.scores ? 1 : 0);
        const webDataCount = (profile.education_level ? 1 : 0) + (profile.career_goal ? 1 : 0) + (profile.skills?.length || 0);

        const shouldOverwrite = whatsappDataCount > webDataCount;

        const updatedProfile: any = {
            id: profile.id,
            updated_at: new Date().toISOString()
        };

        if (shouldOverwrite) {
            if (state.data.education) updatedProfile.education_level = state.data.education;
            if (state.data.goal) updatedProfile.career_goal = state.data.goal;
            if (state.data.location) updatedProfile.location = state.data.location;
            if (state.data.age) updatedProfile.age = parseInt(state.data.age);
            if (state.data.impact_metrics) updatedProfile.impact_metrics = state.data.impact_metrics;
            if (state.data.leadership_experience) updatedProfile.leadership_experience = state.data.leadership_experience;
            if (state.data.unique_hook) updatedProfile.unique_hook = state.data.unique_hook;
            if (state.scores) {
                // Map RIASEC scores to a summary or just store them
                updatedProfile.skills = [...(profile.skills || []), ...Object.keys(state.scores).filter(k => (state.scores![k] || 0) > 3)];
            }
        } else {
            // Only fill in MISSING web data with WhatsApp data
            if (!profile.education_level && state.data.education) updatedProfile.education_level = state.data.education;
            if (!profile.career_goal && state.data.goal) updatedProfile.career_goal = state.data.goal;
            if (!profile.location && state.data.location) updatedProfile.location = state.data.location;
        }

        await supabase.from('profiles').upsert(updatedProfile);
        console.log("Profile synced for user:", profile.full_name || phoneNumber);
    } catch (err) {
        console.error("Sync to profile failed:", err);
    }
}
