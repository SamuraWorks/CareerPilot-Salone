import { MENU_TEXT, getMessage } from './strings';
import { getSession, updateSession, clearSession, syncToProfile, SessionState } from './session';
import { matchCareers } from '@/lib/local-ai';
import { SIERRA_LEONE_CAREERS, INSTITUTIONS } from '@/lib/career-data';
import { MOCK_UNIVERSITIES } from '@/lib/db';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { WHATSAPP_SYSTEM_PROMPT } from '@/lib/ai/prompts';
import { aiModel, googleProvider } from '@/lib/ai/config';

const ONBOARDING_QUESTIONS = [
    { key: 'age', text: "🇸🇱 *Profile Initialization*\n\nHow old are you? (This helps me calibrate your 10-year trajectory.)" },
    { key: 'location', text: "📍 *Location?*\n(e.g., Freetown, Bo, Makeni...)" },
    { key: 'education', text: "🎓 *Education?*\n(Current level: SHS, Uni, or Graduate...)" },
    { key: 'subjects', text: "🛠️ *Skills & Subjects?*\n(What is your primary area of focus?)" },
    { key: 'goal', text: "🎯 *Top Career Goal?*\n(What do you want to achieve?)" },
    { key: 'impact_metrics', text: "📊 *Recent Accomplishment?*\n(One significant achievement or project.)" },
    { key: 'leadership_experience', text: "👑 *Leadership?*\n(Mention any leadership role you've held.)" },
    { key: 'unique_hook', text: "✨ *Value Proposition?*\n(What makes you a unique candidate?)" }
];

const RIASEC_QUESTIONS = [
    { type: 'R', text: "1️⃣ I enjoy building or repairing things with my hands. (Reply 1-4, where 4 is Absolutely True)" },
    { type: 'I', text: "2️⃣ I love solving complex math or logic puzzles. (Reply 1-4)" },
    { type: 'A', text: "3️⃣ I enjoy drawing, designing creative visuals or writing stories. (Reply 1-4)" },
    { type: 'S', text: "4️⃣ I enjoy helping people solve their problems or teaching. (Reply 1-4)" },
    { type: 'E', text: "5️⃣ I enjoy leading a team or starting a small project. (Reply 1-4)" },
    { type: 'C', text: "6️⃣ I like keeping accurate records and documents organized. (Reply 1-4)" }
];

export async function processWhatsAppMessage(body: string, sender: string): Promise<string> {
    const cleanBody = body.trim();
    const upperBody = cleanBody.toUpperCase();
    const session = await getSession(sender);

    // Global Commands (Explicit Requests)
    const instantKeywords = ['MENU', 'HELP', 'EXIT', 'BACK'];
    if (instantKeywords.includes(upperBody) || cleanBody === '?' || cleanBody === '!') {
        return MENU_TEXT;
    }

    if (upperBody === 'START') {
        session.step = 'ONBOARDING_AGE';
        session.data = {};
        await updateSession(sender, session);
        return ONBOARDING_QUESTIONS[0].text;
    }

    if (upperBody === 'RESET') {
        await clearSession(sender);
        return "🔄 *Session Reset Successful.*\n\nType *START* or *MENU* to begin fresh.";
    }

    // --- QUICK REFLEXES (Fuzzy Keyword Matching for Instant Replies) ---
    const fastPathMap: Record<string, string> = {
        'WOK': 'JOBS', 'JOB': 'JOBS', 'VACANCY': 'JOBS', 'WORK': 'JOBS',
        'SKL': 'SCHOLARSHIPS', 'GRANT': 'SCHOLARSHIPS', 'MONEY': 'SCHOLARSHIPS', 'FUND': 'SCHOLARSHIPS',
        'UNI': 'UNIVERSITIES', 'COLLEGE': 'UNIVERSITIES', 'FBC': 'UNIVERSITIES', 'IPAM': 'UNIVERSITIES',
        'NJALA': 'UNIVERSITIES', 'UNIMAK': 'UNIVERSITIES',
        'MENTOR': 'MENTORS', 'COACH': 'MENTORS', 'HELP': 'MENTORS',
        'ROAD': 'ROADMAP', 'PATH': 'ROADMAP', 'MAP': 'ROADMAP'
    };

    for (const [key, target] of Object.entries(fastPathMap)) {
        if (upperBody.includes(key)) {
            // Recurse to handle as a static command instantly
            return await processWhatsAppMessage(target, sender);
        }
    }

    // 1. Handle Onboarding Flow
    if (session.step && session.step.startsWith('ONBOARDING_')) {
        const currentStepIndex = ONBOARDING_QUESTIONS.findIndex(q => `ONBOARDING_${q.key.toUpperCase()}` === session.step);
        if (currentStepIndex !== -1) {
            const currentQuestion = ONBOARDING_QUESTIONS[currentStepIndex];
            session.data[currentQuestion.key] = cleanBody;

            if (currentStepIndex < ONBOARDING_QUESTIONS.length - 1) {
                const nextQuestion = ONBOARDING_QUESTIONS[currentStepIndex + 1];
                session.step = `ONBOARDING_${nextQuestion.key.toUpperCase()}` as SessionState['step'];
                await updateSession(sender, session);
                return nextQuestion.text;
            } else {
                session.step = 'RIASEC_QUIZ';
                session.quizIndex = 0;
                session.scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
                await updateSession(sender, session);
                return "✅ *Profile Complete!*\n\nNow, let's find your career match with 6 quick personality questions.\n\n" + RIASEC_QUESTIONS[0].text;
            }
        }
    }

    // 2. Handle RIASEC Quiz Flow
    if (session.step === 'RIASEC_QUIZ') {
        const currentIdx = session.quizIndex || 0;
        const answer = parseInt(cleanBody);

        if (isNaN(answer) || answer < 1 || answer > 4) {
            return "⚠️ Please reply with a number between *1 and 4*.\n\n" + RIASEC_QUESTIONS[currentIdx].text;
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
                { question: 'interest', answer: session.data.subjects },
                { question: 'impact', answer: session.data.impact_metrics },
                { question: 'leadership', answer: session.data.leadership_experience },
                { question: 'hook', answer: session.data.unique_hook }
            ]);

            // Rule 3: Cross-Platform Consistency - Sync to profile
            await syncToProfile(sender, session);

            await clearSession(sender);

            let resultMsg = `🎯 *Career Analysis Complete*\n\n${quizResults.summary}\n\n*Top Recommendations for You:*\n\n`;
            quizResults.recommendations.forEach((rec, i) => {
                resultMsg += `${i + 1}️⃣ *${rec.title}*\n📈 Demand: ${rec.demand}\n🏛️ Study at: ${rec.institution}\n🤝 Mentor: ${rec.mentor || 'Professional Expert'} (${rec.mentorRole || 'Guide'})\n💡 Why: ${rec.whyFits}\n\n`;
            });
            resultMsg += `🌐 *Full Access*: For your detailed 3-month roadmap and AI CV builder, sync this chat with your web profile:\nhttps://careerpilot-salone.vercel.app/dashboard`;

            return resultMsg;
        }
    }

    // 3. Command Routing (Static Switches)
    switch (upperBody) {
        case 'JOBS':
            return "💼 *Trending Opportunities in Salone*\n\n1️⃣ *Digital Technology* (Software, Data, IT)\n2️⃣ *Renewable Energy* (Solar Engineering)\n3️⃣ *Agribusiness* (Modern Farming)\n4️⃣ *Healthcare* (Nursing, Pharmacy)\n\nReply with a sector name for details, visit:\nhttps://careerpilot-salone.vercel.app/jobs";
        case 'SCHOLARSHIPS':
            return "🎓 *Top Scholarships for Salone Youth*\n\n1️⃣ *Sierra Leone Excellence Scholarship*\n2️⃣ *STEM Women Initiative*\n3️⃣ *Sustainable Agriculture Grant*\n4️⃣ *Commonwealth Open Awards*\n\nView details and apply here:\nhttps://careerpilot-salone.vercel.app/scholarships";
        case 'UNIVERSITIES':
            return "🏛️ *Top Higher Education Institutions*\n\n- *FBC (USL)*: Engineering & Law\n- *IPAM (USL)*: Business & IT\n- *Njala*: Agriculture & Science\n- *UNIMAK*: Community & Health\n- *Limkokwing*: Creative Arts\n\nCompare all campuses:\nhttps://careerpilot-salone.vercel.app/universities";
        case 'MENTORS':
            return "🤝 *Connect with Elite Mentors*\n\nI can match you with experts like:\n- *Sarah S.*: Tech Career Coach\n- *Dr. Kamara*: Healthcare Mentor\n- *Ishmael B.*: Agric Entrepreneur\n\nStart a session on the web:\nhttps://careerpilot-salone.vercel.app/mentorship";
        case 'ROADMAP':
            return "🗺️ *Strategic Career Pathways*\n\nWe provide 3-month tactical roadmaps for 50+ careers.\n\nType *START* for a personal path, or visit:\nhttps://careerpilot-salone.vercel.app/roadmap";
        case 'CV':
            return "📄 *Professional CV Builder*\n\nI can help you build an ATS-friendly CV. To begin the CV process, it's best to use our Web Tool for formatting:\n\nhttps://careerpilot-salone.vercel.app/cv-builder\n\n_Tip: Type START to update your career profile first._";
        case 'KRIO':
            session.language = 'krio';
            await updateSession(sender, session);
            return "Kusheh! ✅ Ah don switch to Krio. Ah gladi for help you build you career.\n\nType *START* for begin de quiz or *MENU* for see waitin we get.";
        case 'ENGLISH':
            session.language = 'en';
            await updateSession(sender, session);
            return "Hello! ✅ I've switched your language to English. \n\nType *START* to begin or *MENU* for options.";
        case 'ABOUT':
            return "🏢 *About CareerPilot Salone* 🇸🇱\n\nWe are Sierra Leone's #1 AI-powered career mentorship platform. Our mission is to bridge the gap between education and employment for Salone youth.\n\n*Features:*\n- AI Career Matching\n- Market-Ready Roadmaps\n- Professional CV Builder\n- 24/7 WhatsApp Omni-Assistant";
        default:
            // --- AI ASSISTANT FALLBACK (Using Gemini) ---
            try {
                const systemPrompt = `${WHATSAPP_SYSTEM_PROMPT}\n\n### USER PROFILE CONTEXT:\n${JSON.stringify({ ...session.data, scores: session.scores }, null, 2)}\n\nRespond based on this user's specific status and progress.`;

                const model = aiModel || googleProvider('gemini-1.5-flash');

                const { text } = await generateText({
                    model: model,
                    system: systemPrompt,
                    prompt: cleanBody
                });
                return text;
            } catch (err) {
                console.error("WhatsApp AI Error:", err);
                return "⚠️ System error. please type *START* to refresh your metrics or ask a specific question.";
            }
    }
}
