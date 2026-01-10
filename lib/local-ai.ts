// Local AI Service for Career Pilot Salone
// Optimized for Sierra Leonean context and rich user profile data

import { SIERRA_LEONE_CAREERS, type CareerInfo } from './career-data';
import { findBestAnswer } from './faq-database';
import { getRoadmap } from './roadmap-database';

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export async function generateChatResponse(
    messages: ChatMessage[],
    siteContext: string,
    isFinalGuidance?: boolean
): Promise<string> {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || '';
    const trimmedMsg = lastUserMessage.trim();
    const upperMsg = trimmedMsg.toUpperCase();
    const lowerMsg = trimmedMsg.toLowerCase();

    // 0. Force Comprehensive Guidance if flagged (e.g. at end of onboarding)
    if (isFinalGuidance) {
        return generateComprehensiveGuidance(messages.map(m => m.content).join(' '));
    }

    // 1. COMMANDS (WhatsApp Bot Style)
    if (['MENU', 'HELP'].includes(upperMsg)) return getMenuResponse();
    if (['JOBS', 'VACANCY'].some(k => upperMsg.includes(k))) return getJobsResponse();
    if (['SCHOLARSHIP', 'GRANT'].some(k => upperMsg.includes(k))) return getScholarshipResponse();
    if (['CV', 'RESUME'].some(k => upperMsg.includes(k))) return getCVResponse();
    if (['MENTOR', 'COACH'].some(k => upperMsg.includes(k))) return getMentorResponse();

    // 2. KRIO / SALONE GREETINGS & CASUAL
    const krioGreets = ['kusheh', 'bodi', 'wetin', 'salone', 'leone', 'una', 'pikin', 'fambul', 'tenki', 'gladi', 'hello', 'hi', 'hey', 'start'];
    const isKrio = krioGreets.some(k => lowerMsg.includes(k));

    if (isKrio && trimmedMsg.length < 50) {
        return `Kusheh fambul! 🇸🇱 Ah gladi for help you with your career path na Salone. 
        
You kin ask me anything about:
• **Jobs** (Software, Nursing, Banking...)
• **Universities** (FBC, Njala, IPAM...)
• **CVs** (How for road am better)

Tell me wetin you de study or wetin you wan for do? Or type **MENU** for see all de things ah kin do.`;
    }

    // 3. CAREER SPECIFIC MATCHING
    const matchingCareer = SIERRA_LEONE_CAREERS.find(c => lowerMsg.includes(c.title.toLowerCase()) || c.keywords.some(k => lowerMsg.includes(k)));
    // Relaxed length constraint to allow for "Tell me about software developers"
    if (matchingCareer) {
        return generateComprehensiveGuidance(matchingCareer.title);
    }

    // 4. FALLBACK TO FAQ OR GENERAL GUIDANCE
    const faqAnswer = findBestAnswer(trimmedMsg);
    if (faqAnswer && !faqAnswer.includes("I'm not sure")) {
        return faqAnswer;
    }

    // 5. If it looks like a profile description (even short ones), give comprehensive guidance or ask for more
    if (trimmedMsg.length > 20 || siteContext.includes("Guidance")) {
        // Attempt to extract interest even from short text like "I want to be a doctor"
        const potentialCareer = SIERRA_LEONE_CAREERS.find(c => trimmedMsg.toLowerCase().includes(c.title.toLowerCase().split(' ')[0]));
        if (potentialCareer) return generateComprehensiveGuidance(potentialCareer.title);

        if (trimmedMsg.length > 30) return generateComprehensiveGuidance(trimmedMsg);
    }

    return `I'm here to help you navigate your career path in Sierra Leone! 🇸🇱

I didn't quite catch that. To give you the best advice, tell me:
1. Wetin you study? (Education)
2. Wetin you lek for do? (Interests)
3. Which job you de look for?

Example: "I want to be a Nurse" or "Jobs in Tech"

Or type **MENU** to see options.`;
}

// ============================================================================
// RESPONSE GENERATORS
// ============================================================================

function getMenuResponse(): string {
    return `### 🤖 How I can help you today:
    
- **CAREER**: Get personalized career matches & roadmaps
- **JOBS**: See latest vacancies in Salone 💼
- **SCHOLARSHIP**: Find funding for your studies 🎓
- **CV**: Help with your professional resume 📄
- **MENTOR**: Connect with Sierra Leonean experts 🤝
- **MENU**: Show this list again
- **KRIO**: Speak to me in our local language!

*Just tell me about yourself (e.g., "I'm a WASSCE graduate in Bo interested in Agriculture") and I'll build you a plan!*`;
}

function getJobsResponse(): string {
    return `### 💼 Jobs & Internships in Salone
High-demand sectors right now:
1. **Technology**: [Developers at Orange/Africell](/jobs?q=tech)
2. **NGOs**: [Finance Officers at Goal/Save the Children](/jobs?q=ngo)
3. **Banking**: [Customer Service at SLBC/UBA](/jobs?q=bank)
4. **Energy**: [Technicians for Solar projects](/jobs?q=solar)

[**View all open roles here**](/opportunities)`;
}

function getScholarshipResponse(): string {
    return `### 🎓 Funding Your Education
Current opportunities for Sierra Leoneans:
1. **GoSL Grant-in-Aid**: For students at public universities (FBC, Njala, etc.)
2. **MTHE Scholarships**: Periodic awards for STEM students.
3. **Orange SL Foundation**: Tech-focused training grants.
4. **International**: Commonwealth and Chevening (for graduates).

[**Check Scholarship Board**](/scholarships)`;
}

function getCVResponse(): string {
    return `### 📄 Professional CV Help
A "Salone-standard" CV should:
- Start with a strong **Profile Summary**.
- Highlight your **WASSCE/University** results clearly.
- List any volunteering or internships.
- Be no more than 2 pages.

[**Use our CV Builder to create a PDF**](/cv-builder)`;
}

function getMentorResponse(): string {
    return `### 🤝 Expert Mentorship
Connect with professionals who've been where you are:
- **Tech Mentors**: Developers in Freetown.
- **Business Mentors**: Entrepreneurs in Bo & Makeni.
- **Academic Mentors**: Professors at USL & Njala.

[**Find a Mentor today**](/mentorship)`;
}

// ============================================================================
// CORE GUIDANCE LOGIC
// ============================================================================

function generateComprehensiveGuidance(userProfileText: string): string {
    const text = userProfileText.toLowerCase();

    // Detect Location Heuristic
    let location = "Freetown";
    if (text.includes("bo")) location = "Bo";
    else if (text.includes("kenema")) location = "Kenema";
    else if (text.includes("makeni")) location = "Makeni";
    else if (text.includes("kono")) location = "Kono";
    else if (text.includes("port loko")) location = "Port Loko";

    // Detect Education Level
    let edu = "Student";
    if (text.includes("wassce") || text.includes("secondary")) edu = "WASSCE Graduate";
    else if (text.includes("university") || text.includes("degree")) edu = "University Graduate";
    else if (text.includes("bece")) edu = "BECE Graduate";

    // Score careers 
    const scoredCareers = SIERRA_LEONE_CAREERS.map(career => {
        let score = 0;
        if (text.includes(career.title.toLowerCase())) score += 50;
        if (text.includes(career.industry.toLowerCase())) score += 20;
        career.keywords.forEach(k => { if (text.includes(k)) score += 10; });

        // Boost for growth sectors
        if (career.demand === 'High') score += 5;

        return { career, score };
    }).sort((a, b) => b.score - a.score);

    const topCareer = scoredCareers[0].career;
    const matches = scoredCareers.filter(c => c.score > 0).slice(1, 3).map(c => c.career);

    let response = `## 🔒 REALITY-FIRST DECISION ENGINE (OFFLINE MODE)\n\n`;

    response += `**VERDICT:** You are a potential candidate for **${topCareer.title}**, but you need to prove your skills first.\n\n`;

    response += `**REALITY CHECK:** This role is in **${topCareer.demand} demand** in Salone's **${topCareer.industry}** sector, but competition is real. Certificates alone won't get you hired.\n\n`;

    response += `### A. Ranked Path: ${topCareer.title}\n`;
    response += `**Potential Income:** ${topCareer.salaryRange || "Competitive (approx SLE 3,000+)"}\n`;
    if (topCareer.localInstitutions && topCareer.localInstitutions.length > 0) {
        response += `**Where to Train:** ${topCareer.localInstitutions.slice(0, 2).join(", ")}\n\n`;
    }

    response += `### B. Execution Plan (90 Days)\n`;
    response += `- **Month 1 (Foundation):** Learn ${topCareer.requiredSkills?.[0] || 'the Basics'}. Don't just watch videos—build something small.\n`;
    response += `- **Month 2 (Proof):** Volunteer at a local firm in ${location} or build a portfolio project. Document your work.\n`;
    response += `- **Month 3 (Entry):** Update your CV with *results*, not just degrees. Apply for **${topCareer.title} Intern** roles.\n\n`;

    if (matches.length > 0) {
        response += `### C. Alternative Paths\n`;
        matches.forEach(m => {
            response += `- **${m.title}**: Viable alternative in ${m.industry}.\n`;
        });
        response += `\n`;
    }

    response += `**ACCOUNTABILITY:** If this plan fails, it will most likely be because you focused on "learning" instead of "doing". Good luck.`;

    return response;
}

// ... Keep other exports (matchCareers, generateRoadmap) with same logic but updated themes in mind
// ... (I'll keep them as they were but they are already quite robust for local-ai)

export interface QuizAnswer {
    question: string;
    answer: string;
}

export interface CareerRecommendation {
    title: string;
    matchScore: number;
    whyFits: string;
    nextSteps: string[];
    demand: 'High' | 'Medium' | 'Low';
    salaryRange: string;
}

export interface CareerMatchResult {
    summary: string;
    recommendations: CareerRecommendation[];
}

export async function matchCareers(answers: QuizAnswer[]): Promise<CareerMatchResult> {
    const answerText = answers.map(a => a.answer.toLowerCase()).join(' ');

    const scoredCareers = SIERRA_LEONE_CAREERS.map(career => {
        let score = 0;
        career.keywords.forEach(keyword => { if (answerText.includes(keyword)) score += 15; });
        if (answerText.includes(career.industry.toLowerCase())) score += 10;
        return { career, score };
    }).sort((a, b) => b.score - a.score);

    const topCareers = scoredCareers.slice(0, 3);
    const maxScore = topCareers[0]?.score || 1;

    const recommendations: CareerRecommendation[] = topCareers.map(({ career, score }) => ({
        title: career.title,
        matchScore: Math.min(Math.round((score / maxScore) * 100), 98),
        whyFits: `Matches your expressed interest in ${career.industry} and your specific skills.`,
        nextSteps: [`Research ${career.localInstitutions?.[0] || 'Local Institutes'}`, `Prepare a ${career.title} CV`],
        demand: career.demand,
        salaryRange: career.salaryRange
    }));

    let summary = `Based on your profile, we highy recommend looking into **${recommendations[0]?.title || 'Emerging Roles'}** in Salone.`;

    return { summary, recommendations };
}

export interface RoadmapPhase {
    name: string;
    goal: string;
    steps: string[];
    resources: string[];
}

export interface CareerRoadmap {
    title: string;
    overview: string;
    phases: RoadmapPhase[];
    salaryRange?: string;
    demand?: 'High' | 'Medium' | 'Low';
    skillLevel?: string;
    duration?: string;
}

export async function generateRoadmap(careerName: string): Promise<CareerRoadmap> {
    const roadmapTemplate = getRoadmap(careerName);

    if (roadmapTemplate) {
        return {
            title: `Your Roadmap to ${roadmapTemplate.title} in Sierra Leone`,
            overview: roadmapTemplate.overview,
            salaryRange: `${roadmapTemplate.salary.entry} - ${roadmapTemplate.salary.experienced}`,
            demand: roadmapTemplate.demandLevel,
            phases: [
                {
                    name: "Phase 1: Foundation",
                    goal: roadmapTemplate.skillRoadmap.month1.focus,
                    steps: roadmapTemplate.skillRoadmap.month1.activities,
                    resources: roadmapTemplate.skillRoadmap.month1.skills
                },
                {
                    name: "Phase 2: Growth",
                    goal: roadmapTemplate.skillRoadmap.month2.focus,
                    steps: roadmapTemplate.skillRoadmap.month2.activities,
                    resources: roadmapTemplate.skillRoadmap.month2.skills
                }
            ]
        };
    }

    const career = SIERRA_LEONE_CAREERS.find(c => c.title.toLowerCase().includes(careerName.toLowerCase())) || SIERRA_LEONE_CAREERS[0];

    return {
        title: `Roadmap to ${career.title}`,
        overview: `A structured 3-month plan to enter the ${career.industry} sector in Sierra Leone.`,
        salaryRange: career.salaryRange,
        demand: career.demand,
        phases: [
            {
                name: "Month 1: Basics",
                goal: "Master the fundamentals",
                steps: [`Learn ${career.requiredSkills?.[0] || 'Core Concepts'}`, "Find a mentor in Salone"],
                resources: ["Online Free Courses", "Local Libraries"]
            }
        ]
    };
}
