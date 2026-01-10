export interface SessionState {
    step: 'START' | 'ONBOARDING_AGE' | 'ONBOARDING_LOCATION' | 'ONBOARDING_EDUCATION' | 'ONBOARDING_SUBJECTS' | 'ONBOARDING_GOAL' | 'RIASEC_QUIZ' | 'ACTIVE_MENTOR';
    data: Record<string, any>;
    quizIndex?: number;
    scores?: Record<string, number>;
    language?: 'en' | 'krio';
}

// In-memory session store (Mock Version)
// Note: This won't persist across serverless restarts but avoids DB dependency
const MOCK_SESSIONS = new Map<string, SessionState>();

export async function getSession(phoneNumber: string): Promise<SessionState> {
    const session = MOCK_SESSIONS.get(phoneNumber);
    if (!session) {
        return { step: 'START', data: {}, language: 'en' };
    }
    return session;
}

export async function updateSession(phoneNumber: string, state: SessionState): Promise<void> {
    MOCK_SESSIONS.set(phoneNumber, state);
}

export async function clearSession(phoneNumber: string): Promise<void> {
    MOCK_SESSIONS.delete(phoneNumber);
}
