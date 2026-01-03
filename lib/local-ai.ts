// Local AI Service for Career Pilot Salone
// Enhanced with comprehensive FAQ database for complete career guidance

import { SIERRA_LEONE_CAREERS, type CareerInfo } from './career-data';
import { findBestAnswer } from './faq-database';
import { findCareerRoadmap } from './roadmap-database';

// ============================================================================
// CHAT AI - Career Guidance Responses
// ============================================================================

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

    // 0. Force Comprehensive Guidance if flagged
    if (isFinalGuidance) {
        const fullHistory = messages.filter(m => m.role === 'user').map(m => m.content).join(' ');
        return generateComprehensiveGuidance(fullHistory);
    }

    // 1. COMMAND HANDLING (WhatsApp Bot Style)
    if (['MENU', 'HELP'].includes(upperMsg)) return getMenuResponse();
    if (upperMsg === 'JOBS') return getJobsResponse();
    if (upperMsg === 'SCHOLARSHIP' || upperMsg === 'SCHOLARSHIPS') return getScholarshipResponse();
    if (upperMsg === 'CV') return getCVResponse();
    if (upperMsg === 'MENTOR') return getMentorResponse();
    if (upperMsg === 'LEARN') return getLearnResponse();

    // 2. CAREER SPECIFIC COMMAND
    if (upperMsg.startsWith('CAREER')) {
        return generateComprehensiveGuidance(trimmedMsg.substring(6).trim());
    }

    // 3. GENERAL CONVERSATIONAL GUIDANCE (Heuristic Analysis)
    const lowerMessage = lastUserMessage.toLowerCase();
    const isGuidanceRequest = lastUserMessage.length > 20 && (
        lowerMessage.includes("student") ||
        lowerMessage.includes("interested") ||
        lowerMessage.includes("skills") ||
        lowerMessage.includes("career") ||
        messages.length > 2
    );

    if (isGuidanceRequest) {
        return generateComprehensiveGuidance(lastUserMessage);
    }

    // 4. KRIO LANGUAGE SUPPORT (Basic Detection)
    const krioKeywords = ['kusheh', 'bodi', 'wetin', 'salone', 'leone', 'wan', 'tel', 'tenki', 'fambul', 'una', 'pikin', 'unim', 'unima', 'fbc', 'ipam', 'u-sl', 'usl'];
    const isKrio = krioKeywords.some(k => lowerMessage.includes(k));

    if (isKrio && !isGuidanceRequest) {
        return `Kusheh fambul! 🇸🇱 Ah gladi for help you with your career business. 
        
You kin ask me wetin you wan know about jobs, scholarships, or universities na Sierra Leone. 

Type **MENU** for see all de things wetin ah kin do for you.`;
    }

    // 5. FALLBACK TO FAQ
    const faqAnswer = findBestAnswer(lastUserMessage);
    if (faqAnswer && !faqAnswer.includes("I'm not sure")) {
        return faqAnswer;
    }

    return "I'm here to help you navigate your career path in Sierra Leone! 🇸🇱\n\nTell me a bit about yourself: **Age, Education Level, and Interests**.\n\nOr type **MENU** to see what I can do.";
}

// ============================================================================
// RESPONSE GENERATORS
// ============================================================================

function getMenuResponse(): string {
    return `### 🤖 CareerPilot AI Menu
Here is how I can help you:

- **CAREER**: Get personalized career guidance
- **JOBS**: See latest job openings & internships
- **SCHOLARSHIP**: Find available scholarships
- **CV**: Help building your professional CV
- **MENTOR**: Request mentorship
- **LEARN**: Skill-building recommendations
- **MENU**: Show this list again
- **KRIO**: Talk to me in our local language!

*You can also just tell me about yourself (e.g., "I am a student interested in tech") or ask me anything about life in Salone!*`;
}

function getJobsResponse(): string {
    return `### 💼 Latest Opportunities in Sierra Leone
Here are some trending sectors for jobs and internships:

1. **Technology**: [Software Developers, IT Support](/jobs?category=tech)
2. **NGO/Development**: [Program Officers, Field Coordinators](/jobs?category=ngo)
3. **Finance**: [Accountants, Tellers](/jobs?category=finance)
4. **Engineering**: [Civil, Mining, Electrical](/jobs?category=engineering)

Type **CAREER [Your Skills]** to get matched to specific jobs!`;
}

function getScholarshipResponse(): string {
    return `### 🎓 Scholarship Opportunities
Current open opportunities for Sierra Leonean students:

1. **Sierra Leone Government Grant**: For STEM students at public universities.
2. **Commonwealth Scholarship**: International post-grad opportunities.
3. **Local Corporate Awards**: Provided by detailed companies like Orange/Africell.

[**View All Scholarships**](/scholarships)`;
}

function getCVResponse(): string {
    return `### 📄 CV Builder
A strong CV is your passport to employment.

1. **Use our CV Builder**: [Create Professional CV](/cv-builder)
2. **Tips**:
   - Keep it to 2 pages maximum.
   - Highlight skills relevant to the job.
   - List education and experience in reverse chronological order.

Need a review? Paste your CV summary here!`;
}

function getMentorResponse(): string {
    return `### 🤝 Mentorship Program
Connect with experienced professionals in Freetown and beyond.

- **Request a Mentor**: [Find a Mentor](/mentorship)
- **Become a Mentor**: Share your experience with youth.

*Mentorships are currently free through CareerPilot.*`;
}

function getLearnResponse(): string {
    return `### 📚 Skill Development
Up-skill to stay competitive.

1. **Digital Skills**: [Free courses on Coursera/Google](/courses)
2. **Soft Skills**: Leadership, Communication, Teamwork.
3. **Vocational**: Electrician, Plumbing, Carpentry at local institutes.

What skill do you want to learn today?`;
}

// ============================================================================
// CORE GUIDANCE LOGIC
// ============================================================================

function generateComprehensiveGuidance(userProfileText: string): string {
    const text = userProfileText.toLowerCase();
    const location = text.includes("bo") ? "Bo" : text.includes("kenema") ? "Kenema" : text.includes("makeni") ? "Makeni" : "Freetown";

    // Score careers based on text matching
    const scoredCareers = SIERRA_LEONE_CAREERS.map(career => {
        let score = 0;
        // Text includes title
        if (text.includes(career.title.toLowerCase())) score += 20;
        // Text includes industry
        if (text.includes(career.industry.toLowerCase())) score += 10;
        // Text includes keywords
        career.keywords.forEach(k => {
            if (text.includes(k)) score += 5;
        });

        // Simple heuristics
        if (text.includes('tech') && career.industry === 'Technology') score += 10;
        if (text.includes('health') && career.industry === 'Healthcare') score += 10;
        if (text.includes('teach') && career.industry === 'Education') score += 10;

        return { career, score };
    }).sort((a, b) => b.score - a.score);

    // Filter top 3
    const top3 = scoredCareers.filter(c => c.score > 0).slice(0, 3);
    const finalCareers = top3.length > 0 ? top3.map(c => c.career) : SIERRA_LEONE_CAREERS.slice(0, 3);

    let response = `### 🎯 Career Matches\n`;
    finalCareers.forEach((career, index) => {
        response += `**${career.title}**: ${career.demand} demand. Fits your focus on ${career.industry}.\n`;
    });

    response += `\n### 🎓 Next Steps\n`;
    finalCareers.forEach(career => {
        if (career.localInstitutions && career.localInstitutions.length > 0) {
            response += `- **Study:** ${career.localInstitutions[0]}\n`;
        }
        response += `- **Apply:** [${career.title} Intern](/jobs?q=${encodeURIComponent(career.title)})\n`;
    });

    response += `\n### 🗺️ Quick Plan\n`;
    const skill = finalCareers[0].requiredSkills?.[0] || "basics";
    const source = finalCareers[0].industry === 'Technology' ? 'freeCodeCamp' : 'Coursera';

    response += `- **Week 1:** Intro videos on ${skill}.\n`;
    response += `- **Month 1:** Free course on ${source}.\n`;
    response += `- **Month 3:** Build CV & apply in Freetown.`;

    return response;
}

function generateRoadmapText(career: CareerInfo): string {
    return ""; // No longer needed, logic moved to generateComprehensiveGuidance
}


// ============================================================================
// CAREER MATCHING - Quiz Results (Re-implemented correctly)
// ============================================================================

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

        // Keywords
        career.keywords.forEach(keyword => {
            if (answerText.includes(keyword)) score += 15;
        });

        // Industry
        if (answerText.includes(career.industry.toLowerCase())) score += 10;

        return { career, score };
    }).sort((a, b) => b.score - a.score);

    const topCareers = scoredCareers.slice(0, 3);
    const maxScore = topCareers[0]?.score || 1;

    const recommendations: CareerRecommendation[] = topCareers.map(({ career, score }) => ({
        title: career.title,
        matchScore: Math.min(Math.round((score / maxScore) * 100), 98),
        whyFits: `Matches your interest in ${career.industry}`,
        nextSteps: ["Learn more", "Apply"],
        demand: career.demand,
        salaryRange: career.salaryRange
    }));

    // Generate summary
    let summary = "Based on your responses, you seem to have a diverse set of interests.";
    if (recommendations.length > 0) {
        summary = `Based on your profile, we highly recommend looking into **${recommendations[0].title}** and similar roles in the **${recommendations[0].demand} demand** sector.`;
    }

    return { summary, recommendations };
}


// ============================================================================
// ROADMAP GENERATION (Re-implemented correctly)
// ============================================================================

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
    const roadmapTemplate = findCareerRoadmap(careerName);
    if (roadmapTemplate) {
        return {
            title: `Your Roadmap to ${roadmapTemplate.title} in Sierra Leone`,
            overview: roadmapTemplate.overview,
            phases: roadmapTemplate.phases,
            salaryRange: roadmapTemplate.salaryRange,
            demand: roadmapTemplate.demand,
            skillLevel: roadmapTemplate.skillLevel,
            duration: roadmapTemplate.duration
        };
    }

    // Fallback
    const career = SIERRA_LEONE_CAREERS.find(c =>
        c.title.toLowerCase().includes(careerName.toLowerCase())
    ) || SIERRA_LEONE_CAREERS[0];

    // Generic response if no specific match
    return {
        title: `Roadmap to ${career.title}`,
        overview: `A structured plan to become a ${career.title} in Sierra Leone.`,
        salaryRange: career.salaryRange,
        demand: career.demand,
        phases: [
            {
                name: "Month 1: Basics",
                goal: "Learn the fundamentals",
                steps: [`Study ${career.requiredSkills[0]}`, "Find a mentor"],
                resources: ["Online Courses", "Local Library"]
            },
            {
                name: "Month 2: Practice",
                goal: "Build projects",
                steps: ["Create a portfolio project", "Network in Freetown"],
                resources: ["Community Groups"]
            },
            {
                name: "Month 3: Apply",
                goal: "Get hired",
                steps: ["Apply to 5 jobs", "Refine CV"],
                resources: ["Job Boards"]
            }
        ]
    };
}
