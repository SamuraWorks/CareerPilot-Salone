import { MENU_TEXT, getMessage } from './strings';
import { getSession, updateSession, clearSession } from './session';
import { matchCareers } from '@/lib/local-ai';
import { SIERRA_LEONE_CAREERS, INSTITUTIONS, ONLINE_RESOURCES } from '@/lib/career-data';
import { MOCK_UNIVERSITIES } from '@/lib/db';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const ONBOARDING_QUESTIONS = [
    { key: 'age', text: "🚀 *CareerPilot Omni-Assistant* 🇸🇱\n\nI'm your AI Career Mentor. Let's build your professional profile.\n\n*Step 1: What is your age?*" },
    { key: 'location', text: "*Step 2: Where are you located?* 📍\n(e.g. Freetown, Bo, Makeni, Kenema)" },
    { key: 'education', text: "*Step 3: What is your highest level of education?* 🎓\n(e.g. WASSCE, Diploma, Bachelor's, Masters)" },
    { key: 'subjects', text: "*Step 4: What subjects did you study or what skills do you have?* 🛠️\n(e.g. Math, Biology, Sewing, Coding)" },
    { key: 'goal', text: "*Step 5: What is your main career goal?* 🎯\n(e.g. Find a job, choose a course, start a business)" },
    { key: 'impact_metrics', text: "*Step 6: Show me the numbers!* 📊\nWhat is a specific impact or result you've achieved? (e.g. 'Increased sales by 20%', 'Graduated top of class', 'Designed 5 logos')" },
    { key: 'leadership_experience', text: "*Step 7: Leading the way!* 👑\nTell me about a time you led a team, a project, or even a small group activity." },
    { key: 'unique_hook', text: "*Step 8: The Secret Sauce!* ✨\nWhat makes you different from everyone else? What's your unique 'hook'?" }
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

    // Global Commands (Instant Short-Circuit)
    const instantKeywords = ['MENU', 'HELP', 'EXIT', 'BACK', 'KUSHEH', 'HELLO', 'HI', 'KUSHE', 'HEY', 'YO', 'WETIN', 'GREETINGS'];
    if (instantKeywords.includes(upperBody) || upperBody === 'START') {
        if (upperBody === 'START') {
            session.step = 'ONBOARDING_AGE';
            session.data = {};
            await updateSession(sender, session);
            return ONBOARDING_QUESTIONS[0].text;
        }
        return MENU_TEXT;
    }

    if (upperBody === 'RESET') {
        await clearSession(sender);
        return "🔄 *Session Reset Successful.*\n\nType *START* or *MENU* to begin fresh.";
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
            return "✅ *Profile Complete!*\n\nNow, let's find your career match with 6 quick personality questions.\n\n" + RIASEC_QUESTIONS[0].text;
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

            await clearSession(sender);

            let resultMsg = `🎯 *Career Analysis Complete*\n\n${quizResults.summary}\n\n*Top Recommendations for You:*\n\n`;
            quizResults.recommendations.forEach((rec, i) => {
                resultMsg += `${i + 1}️⃣ *${rec.title}*\n📈 Demand: ${rec.demand}\n🏛️ Study at: ${rec.institution}\n💡 Why: ${rec.whyFits}\n\n`;
            });
            resultMsg += `🌐 *Full Access*: For your detailed 3-month roadmap and AI CV builder, sync this chat with your web profile:\nhttps://careerpilot-salone.vercel.app/dashboard`;

            return resultMsg;
        }
    }

    // 3. Command Routing (Initial Start)
    if (upperBody === 'START') {
        session.step = 'ONBOARDING_AGE';
        session.data = {};
        await updateSession(sender, session);
        return ONBOARDING_QUESTIONS[0].text;
    }

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
            // --- AI ASSISTANT FALLBACK ---
            try {
                const groundedCareers = SIERRA_LEONE_CAREERS.slice(0, 15).map(c =>
                    `- ${c.title}: ${c.description}. Local Institutions: ${c.localInstitutions.join(', ')}`
                ).join('\n');

                const groundedInstitutions = MOCK_UNIVERSITIES.map(u =>
                    `- ${u.name}: ${u.badges.join(', ')}. Popular: ${u.popular_courses.join(', ')}`
                ).join('\n');

                const { text } = await generateText({
                    model: openai('gpt-4o-mini'),
                    system: `You are CareerPilot Salone Omni-Assistant on WhatsApp.
                    PERSONALITY: Extremely helpful, encouraging, professional, and knowledgeable about the Sierra Leonean labor market. You speak a mix of English and occasional Krio (like 'Kusheh', 'Gladi', 'Salone').
                    ROLE: Personal career mentor for Sierra Leonean youth.
                    WHATSAPP MODE: Keep responses short (max 2-3 paragraphs), professional, and friendly. Use Emojis and Bullet points.
                    LANGUAGE: The user prefers ${session.language === 'krio' ? 'Krio' : 'English'}. Respond primarily in their preferred language.
                    CONTEXT: Current location is Sierra Leone.
                    INSTITUTIONAL KNOWLEDGE: ${groundedInstitutions}
                    CAREER KNOWLEDGE: ${groundedCareers}
                    ACTIONS: Proactively suggest local institutions or scholarships where relevant. If the user is confused, tell them to type START to begin a career match quiz.`,
                    prompt: cleanBody
                });
                return text;
            } catch (err) {
                console.error("WhatsApp AI Error:", err);
                return "Kusheh! I am your CareerPilot Omni-Assistant. 🇸🇱\n\nI'm ready to help you navigate your career journey.\n\nType *START* to find your dream job, or *MENU* for options.";
            }
    }
}

