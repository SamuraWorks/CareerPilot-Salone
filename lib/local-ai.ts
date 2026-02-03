// Local AI Service for Career Pilot Salone
// Optimized for Sierra Leonean context and rich user profile data

import { SIERRA_LEONE_CAREERS, INSTITUTIONS, type CareerInfo } from './career-data';
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
    if (!messages || !Array.isArray(messages)) return "System Error: No messages received.";
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
    const locations = ["bo", "kenema", "makeni", "kono", "port loko", "lunsar", "waterloo", "kambia"];
    for (const loc of locations) {
        if (text.includes(loc)) {
            location = loc.charAt(0).toUpperCase() + loc.slice(1);
            break;
        }
    }

    // Detect Persona / Education Level
    let persona = "Career Seeker";
    let eduLevel = "Standard";
    if (text.includes("student") || text.includes("school") || text.includes("college")) {
        persona = "Student";
        eduLevel = "In Progress";
    } else if (text.includes("graduate") || text.includes("just finished") || text.includes("degree")) {
        persona = "Recent Graduate";
        eduLevel = "Degree/Diploma";
    }

    // Deterministic Priority Match
    const scoredCareers = SIERRA_LEONE_CAREERS.map(career => {
        let score = 0;
        if (text.includes(career.title.toLowerCase())) score += 60;
        if (text.includes(career.industry.toLowerCase())) score += 30;
        career.keywords.forEach(k => { if (text.includes(k)) score += 15; });

        // Logic Alignment: Boost for Verified & Local Data
        if (career.source === 'verified') score += 10;
        if (career.universityIds && career.universityIds.length > 0) score += 5;

        return { career, score };
    }).sort((a, b) => b.score - a.score);

    const topCareer = scoredCareers[0].career;
    const matches = scoredCareers.filter(c => c.score > 0 && c.career.id !== topCareer.id).slice(0, 2).map(c => c.career);

    // Get Linked Data
    const { MOCK_MENTORS } = require('./mentors');
    const bestMentor = MOCK_MENTORS.find((m: any) => topCareer.mentorIds?.includes(m.id)) || MOCK_MENTORS[0];
    const bestUni = INSTITUTIONS.find(i => topCareer.universityIds?.includes(i.id)) || INSTITUTIONS[0];

    const titleSuffix = topCareer.source === 'external/unverified' ? ' (external/unverified)' : '';

    let response = `## 🔒 CAREER INTELLIGENCE REPORT\n\n`;
    response += `**TARGET PROFILE:** ${persona} | **LOCATION:** ${location} | **EDUCATION:** ${eduLevel}\n\n`;

    response += `### 🎯 THE VERDICT: ${topCareer.title}${titleSuffix}\n`;

    if (topCareer.source === 'external/unverified') {
        response += `> [!NOTE]\n> No verified roadmap/mentor found for this specific path yet, here’s an alternative or unverified pathway.\n\n`;
    }

    response += `Based on your profile, you have a high-probability match for **${topCareer.title}**. `;

    response += `\n\n**MARKET REALITY:** The ${topCareer.industry} sector currently shows **${topCareer.demand} Demand**. `;
    response += `\n\n### 🗺️ EXECUTION ROADMAP\n`;
    response += `- **Education:** Enroll at **${bestUni.name}** (${bestUni.location}).\n`;
    response += `- **Mentorship:** Connect with **${bestMentor.name}** (${bestMentor.role}).\n`;
    response += `- **View Full Roadmap:** [Go to Roadmap](/roadmap?id=${topCareer.roadmapId || 'standard'})\n\n`;

    if (matches.length > 0) {
        response += `### ⚡ ALTERNATIVE PATHS\n`;
        matches.forEach(m => {
            const mSuffix = m.source === 'external/unverified' ? ' (external/unverified)' : '';
            response += `- **${m.title}${mSuffix}**: High potential in ${m.industry}.\n`;
        });
        response += `\n`;
    }

    response += `**ACCOUNTABILITY:** If you do not take the first step in this roadmap within **48 hours**, your probability of success drops by 80%.\n\n`;
    response += `**IMMEDIATE COMMAND:** Research admission at ${bestUni.name} today.`;

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
    institution?: string;
    institutionLogo?: string;
    mentor?: string;
    mentorRole?: string;
}

export interface CareerMatchResult {
    summary: string;
    recommendations: CareerRecommendation[];
}

export async function matchCareers(answers: QuizAnswer[]): Promise<CareerMatchResult> {
    const answerText = answers.map(a => a.answer.toLowerCase()).join(' ');

    // Extract metadata for personalization
    const impact = answers.find(a => a.question === 'impact' || a.question === 'impact_metrics')?.answer || '';
    const leadership = answers.find(a => a.question === 'leadership' || a.question === 'leadership_experience')?.answer || '';
    const hook = answers.find(a => a.question === 'hook' || a.question === 'unique_hook')?.answer || '';
    const eduLevel = answers.find(a => a.question === 'education' || a.question === 'education_level')?.answer || '';

    // Deterministic Priority Logic
    const scoredCareers = SIERRA_LEONE_CAREERS.map(career => {
        let score = 0;

        // 1. RIASEC / Keyword Match
        career.keywords.forEach(keyword => { if (answerText.includes(keyword)) score += 20; });
        if (answerText.includes(career.industry.toLowerCase())) score += 10;

        // 2. Qualifications Match
        if (eduLevel && career.requiredEducation.some(req => eduLevel.toLowerCase().includes(req.toLowerCase()))) {
            score += 15;
        }

        // 3. Local University Availability Boost
        if (career.universityIds && career.universityIds.length > 0) {
            score += 10;
        }

        // 4. Mentor Availability Boost
        if (career.mentorIds && career.mentorIds.length > 0) {
            score += 5;
        }

        // Behavioral boosts
        if (leadership.length > 10 && (career.industry === 'Business' || career.industry === 'Education')) score += 5;
        if (impact.includes('%') || impact.toLowerCase().includes('increased') || impact.toLowerCase().includes('reduced')) {
            if (career.industry === 'Finance' || career.industry === 'Technology') score += 5;
        }

        return { career, score };
    }).sort((a, b) => b.score - a.score);

    const topCareers = scoredCareers.slice(0, 3);
    const maxScore = topCareers[0]?.score || 1;

    const recommendations: CareerRecommendation[] = topCareers.map(({ career, score }) => {
        let whyFits = `Matches your interest in ${career.industry}. `;
        if (leadership && (career.industry === 'Business' || career.industry === 'Education')) {
            whyFits += `Your leadership suggests high management potential. `;
        }
        if (impact && (career.industry === 'Finance' || career.industry === 'Technology')) {
            whyFits += `Your track record of "${impact}" demonstrates analytical skills. `;
        }

        // Match a Mentor and University from IDs
        const { MOCK_MENTORS } = require('./mentors');
        const bestMentor = MOCK_MENTORS.find((m: any) => career.mentorIds?.includes(m.id)) || MOCK_MENTORS[0];

        const bestUni = INSTITUTIONS.find(i => career.universityIds?.includes(i.id)) || INSTITUTIONS[0];

        // 5. External/Unverified Fallback Labeling
        const titleSuffix = career.source === 'external/unverified' ? ' (external/unverified)' : '';

        return {
            title: career.title + titleSuffix,
            matchScore: Math.min(Math.round((score / maxScore) * 100), 98),
            whyFits: whyFits.trim(),
            nextSteps: [
                `Research ${bestUni.name} at ${bestUni.location}`,
                `Prepare a ${career.title} CV`,
                `Connect with ${bestMentor.name} for guidance`
            ],
            demand: career.demand,
            salaryRange: career.salaryRange,
            institution: bestUni.name,
            mentor: bestMentor.name,
            mentorRole: bestMentor.role
        };
    });

    let summary = `Based on your profile, we recommend **${recommendations[0]?.title || 'Emerging Roles'}**. `;
    if (hook) summary += `Your unique edge: "${hook}". `;

    if (recommendations.some(r => r.title.includes('unverified'))) {
        summary += "Note: Some paths are labeled as unverified due to limited local verified data.";
    }

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

/**
 * System 3: Local Synthesis (Offline Mode)
 * Generates a high-quality, detailed, and formal cover letter without AI API calls.
 */
export function generateLocalCoverLetter(profile: any, job: any, tone: string): string {
    const name = profile.full_name || "A CareerPilot User";
    const skill = profile.skills?.[0] || "professional excellence";
    const otherSkills = profile.skills?.slice(1, 4).join(", ") || "strategic planning and collaboration";
    const company = job.organization || job.company;
    const role = job.title;
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    // Rich data context
    const impact = profile.impact_metrics ? `Specifically, I have achieved notable results elsewhere, including: ${profile.impact_metrics}.` : `I have consistently demonstrated a high level of performance and reliability in all my professional undertakings.`;
    const leadership = profile.leadership_experience ? `My leadership capabilities were further honed while ${profile.leadership_experience}, where I focused on driving team efficiency and organizational goals.` : `I possess strong interpersonal skills and a proven ability to work effectively within diverse and high-pressure team environments.`;
    const hook = profile.unique_hook ? `What differentiates my professional profile is ${profile.unique_hook}.` : `I am deeply committed to the growth and development of ${company} and the wider Sierra Leonean economy.`;

    const userAddr = job.userAddress || "[Your Address]\n[City, Sierra Leone]";
    const companyAddr = job.companyAddress || "[Company Address]";
    const businessHeader = `${userAddr}\n\n${date}\n\nTo the Hiring Manager\n${company}\n${companyAddr}\n\n`;

    const templates = {
        formal: `${businessHeader}Dear Hiring Manager,
 
RE: FORMAL SUBMISSION FOR THE POSITION OF ${role.toUpperCase()}
 
It is with a profound sense of dedication and professional alignment that I submit my candidacy for the ${role} position at ${company}. Having meticulously observed ${company}'s standard of excellence within the Sierra Leonean marketplace, I am eager to contribute my specialized expertise and operational rigor to your esteemed team.
 
My professional foundation is established in ${skill}, further augmented by a comprehensive mastery of ${otherSkills}. Throughout my tenure, I have maintained an unwavering commitment to institutional integrity and measurable outcome optimization. ${impact} I am confident that my background has uniquely positioned me to navigate the complexities of the ${role} role and to catalyze your organization's strategic mandates.
 
Specifically, ${leadership} This experience has cultivated in me a sophisticated understanding of collaborative leadership and precision-driven project management. ${hook}
 
I am eager to discuss how my competencies can be leveraged to support ${company}’s continued leadership in the sector. I appreciate your time and consideration of my professional overview.
 
Yours faithfully,
 
${name}`,

        dynamic: `${businessHeader}Dear ${company} Recruitment Board,
 
I am writing to formally express my strategic interest in joining ${company} as the next ${role}. As an impact-driven professional who thrives on operational innovation, I have long admired ${company}’s trajectory as a market-leading entity in Sierra Leone.
 
My core competency lies in ${skill}, where I have established a consistent record of delivering high-velocity solutions in high-stakes environments. ${hook} My objective is to provide a platform where my technical mastery of ${otherSkills} can be directly translated into tangible institutional growth for your team.
 
${impact} ${leadership} I am prepared to apply this same level of strategic foresight and executive energy to the ${role} position at ${company}.
 
I look forward to the opportunity of demonstrating how my proactive methodology and refined skill set will serve as an immediate force-multiplier for your organization.
 
Yours sincerely,
 
${name}`,

        academic: `${businessHeader}To the Selection Committee,

I am formally submitting my application for the position of ${role} within ${company}. My academic background and specialized focus on ${skill} have provided me with a rigorous foundation that I believe is essential for the demands of this institutional role.

During my time at [Institution Name], I have cultivated a deep commitment to intellectual excellence and pedagogical progress. ${impact} This experience, coupled with my proficiency in ${otherSkills}, has shaped my scholarly and professional methodology. ${leadership}

Furthermore, ${hook} I am particularly drawn to ${company} due to your reputation for fostering a culture of rigorous analysis and future-focused thinking. I am confident that my research-oriented mindset would allow me to contribute effectively to your academic community.

I look forward to the opportunity to discuss my potential contributions to ${company} and how my background aligns with your institutional goals.

Respectfully,

${name}`,

        standard: `${businessHeader}Dear ${company} Team,

I am writing to apply for the ${role} position as advertised. My diverse experience and technical proficiency in ${skill} make me a highly suitable candidate for this opportunity within your organization.

I have spent my career developing a comprehensive understanding of ${otherSkills}, always aiming for the highest standards of professional conduct. ${impact} I am particularly eager to bring my skills to ${company}, an organization that I hold in high regard for its professional standards in Sierra Leone.

${leadership} ${hook} I am confident that I can be a productive member of your team from the outset and help ${company} achieve its operational goals.

I have enclosed my CV for your review and would appreciate the chance to discuss my application with you in person. Thank you for your consideration.

Yours sincerely,

${name}`
    };

    return (templates as any)[tone] || templates.standard;
}
