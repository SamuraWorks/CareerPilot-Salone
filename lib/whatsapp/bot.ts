import { MENU_TEXT, getMessage } from './strings';
import { getSession, updateSession, clearSession, SessionState } from './session';
import { matchCareers } from '@/lib/local-ai';
import { supabase } from '@/lib/supabase';

const ONBOARDING_QUESTIONS = [
    { key: 'age', text: "Welcome to CareerPilot Salone! 🇸🇱\n\nI'm your AI Career Mentor. Let's start by getting to know you. \n\n*What is your age?*" },
    { key: 'location', text: "*Where are you located?* (e.g. Freetown, Bo, Makeni, Kenema)" },
    { key: 'education', text: "*What is your highest level of education?*\n(e.g. WASSCE, Diploma, Bachelor's, Masters)" },
    { key: 'subjects', text: "*What subjects did you study or what skills do you already have?* (e.g. Math, Biology, Sewing, Coding)" },
    { key: 'goal', text: "*What is your main career goal?* (e.g. Find a job, choose a course, start a business)" }
];

const RIASEC_QUESTIONS = [
    { type: 'R', text: "1. I enjoy building or repairing things with my hands. (Reply 1-4, where 4 is Absolutely True)" },
    { type: 'I', text: "2. I love solving complex math or logic puzzles. (Reply 1-4)" },
    { type: 'A', text: "3. I enjoy drawing, designing creative visuals or writing stories. (Reply 1-4)" },
    { type: 'S', text: "4. I enjoy helping people solve their problems or teaching. (Reply 1-4)" },
    { type: 'E', text: "5. I enjoy leading a team or starting a small project. (Reply 1-4)" },
    { type: 'C', text: "6. I like keeping accurate records and documents organized. (Reply 1-4)" }
];

export async function processWhatsAppMessage(body: string, sender: string): Promise<string> {
    const cleanBody = body.trim();
    const upperBody = cleanBody.toUpperCase();
    const session = await getSession(sender);

    // Global Commands
    if (['MENU', 'HELP', 'EXIT', 'RESET'].includes(upperBody)) {
        if (upperBody === 'RESET') await clearSession(sender);
        return MENU_TEXT;
    }

    // 1. Handle Onboarding Flow
    if (session.step.startsWith('ONBOARDING_')) {
        const currentStepIndex = ONBOARDING_QUESTIONS.findIndex(q => `ONBOARDING_${q.key.toUpperCase()}` === session.step);

        // Save answer
        const currentQuestion = ONBOARDING_QUESTIONS[currentStepIndex];
        session.data[currentQuestion.key] = cleanBody;

        // Move to next or start Quiz
        if (currentStepIndex < ONBOARDING_QUESTIONS.length - 1) {
            const nextQuestion = ONBOARDING_QUESTIONS[currentStepIndex + 1];
            session.step = `ONBOARDING_${nextQuestion.key.toUpperCase()}` as any;
            await updateSession(sender, session);
            return nextQuestion.text;
        } else {
            session.step = 'RIASEC_QUIZ';
            session.quizIndex = 0;
            session.scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
            await updateSession(sender, session);
            return "Great! Now let's find your career match with 6 quick questions.\n\n" + RIASEC_QUESTIONS[0].text;
        }
    }

    // 2. Handle RIASEC Quiz Flow
    if (session.step === 'RIASEC_QUIZ') {
        const currentIdx = session.quizIndex || 0;
        const answer = parseInt(cleanBody);

        if (isNaN(answer) || answer < 1 || answer > 4) {
            return "Please reply with a number between 1 and 4.\n\n" + RIASEC_QUESTIONS[currentIdx].text;
        }

        const question = RIASEC_QUESTIONS[currentIdx];
        session.scores = session.scores || { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        session.scores[question.type] += answer;

        if (currentIdx < RIASEC_QUESTIONS.length - 1) {
            session.quizIndex = currentIdx + 1;
            await updateSession(sender, session);
            return RIASEC_QUESTIONS[currentIdx + 1].text;
        } else {
            // Generate Results
            session.step = 'START';
            const quizResults = await matchCareers([
                { question: 'riasec', answer: Object.entries(session.scores).map(([k, v]) => `${k}:${v}`).join(',') },
                { question: 'education', answer: session.data.education },
                { question: 'interest', answer: session.data.subjects }
            ]);

            // Sync to Profile if exists
            const { data: profile } = await supabase.from('profiles').select('id').eq('phone_number', sender).single();
            if (profile) {
                await supabase.from('profiles').update({
                    location: session.data.location,
                    education_level: session.data.education,
                    career_goal: session.data.goal
                }).eq('id', profile.id);
            }

            await clearSession(sender);

            let resultMsg = `🎯 *Career Analysis Complete*\n\n${quizResults.summary}\n\n`;
            quizResults.recommendations.forEach((rec, i) => {
                resultMsg += `*${i + 1}. ${rec.title}*\n- Demand: ${rec.demand}\n- Why: ${rec.whyFits}\n\n`;
            });
            resultMsg += `Visit our website for your full 3-month roadmap: https://careerpilot-salone.vercel.app/dashboard`;

            return resultMsg;
        }
    }

    // 3. Command Routing (Initial Start)
    if (upperBody === 'CAREER' || upperBody === 'TEST' || upperBody === 'START') {
        session.step = 'ONBOARDING_AGE';
        session.data = {};
        await updateSession(sender, session);
        return ONBOARDING_QUESTIONS[0].text;
    }

    switch (upperBody) {
        case 'JOBS':
            return "💼 *Trending Sectors*\n1. Tech\n2. Finance\n3. Agriculture\n\nTo see list, reply with sector name.";
        case 'KRIO':
            return "Kusheh! Ah gladi for help you. Type CAREER for start de career business.";
        default:
            return "Hello! I am your CareerPilot Mentor. \n\nType *START* to begin your career discovery, or *MENU* for options.";
    }
}
