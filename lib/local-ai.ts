// Local AI Service for Career Pilot Salone
// Enhanced with comprehensive FAQ database for complete career guidance

import { SIERRA_LEONE_CAREERS, UNIVERSITIES, type CareerInfo } from './career-data';
import { findBestAnswer, COMPREHENSIVE_FAQ } from './faq-database';
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
    siteContext: string
): Promise<string> {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || '';

    // Use comprehensive FAQ database for intelligent matching
    const faqAnswer = findBestAnswer(lastUserMessage);

    // If FAQ found a good match, use it
    if (faqAnswer && !faqAnswer.includes("I'd be happy to help!")) {
        return faqAnswer;
    }

    // Fallback to original logic for edge cases
    const lowerMessage = lastUserMessage.toLowerCase();

    // 2. Broad Topic Matching (If no exact FAQ match)
    if (lowerMessage.includes("civil leg") || lowerMessage.includes("civil eng")) return findBestAnswer("What engineering careers are available?");
    if (lowerMessage.includes("data") || lowerMessage.includes("analyst")) return findBestAnswer("Why is Data Analysis a good career?");
    if (lowerMessage.includes("money") || lowerMessage.includes("pay") || lowerMessage.includes("salary") || lowerMessage.includes("earn")) return findBestAnswer("What are typical salaries in Sierra Leone?");
    if (lowerMessage.includes("university") || lowerMessage.includes("college") || lowerMessage.includes("study") || lowerMessage.includes("degree")) return findBestAnswer("What universities are in Sierra Leone?");
    if (lowerMessage.includes("job") || lowerMessage.includes("work") || lowerMessage.includes("hire")) return findBestAnswer("How do I find jobs in Sierra Leone?");
    if (lowerMessage.includes("nurse") || lowerMessage.includes("nursing") || lowerMessage.includes("doctor") || lowerMessage.includes("health")) return findBestAnswer("How do I become a nurse?");
    if (lowerMessage.includes("tech") || lowerMessage.includes("computer") || lowerMessage.includes("code") || lowerMessage.includes("software")) return findBestAnswer("How do I become a software developer?");
    if (lowerMessage.includes("teach") || lowerMessage.includes("teacher") || lowerMessage.includes("school")) return findBestAnswer("How do I become a teacher?");
    if (lowerMessage.includes("farm") || lowerMessage.includes("agric")) return findBestAnswer("What careers are available in agriculture?");
    if (lowerMessage.includes("bank") || lowerMessage.includes("accounting") || lowerMessage.includes("finance")) return findBestAnswer("How do I become an accountant?");

    // Greetings
    if (containsKeywords(lowerMessage, ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'])) {
        return `Hello! 👋 I'm CareerPilot, your AI career counselor for Sierra Leone.

**I can help you with:**

📚 **Careers** - Explore software development, nursing, teaching, engineering, business, agriculture, and more
💰 **Salaries** - Learn what different careers pay in Sierra Leone  
🎓 **Education** - Find universities, admission requirements, and online courses
💼 **Job Search** - Discover how to find jobs and what skills employers want
🗺️ **Career Planning** - Get guidance on choosing or changing careers
🎯 **Our Platform** - Learn how to use our aptitude test, roadmap generator, CV builder, and more

**Try asking:**
• "How do I become a software developer?"
• "What are typical salaries in Sierra Leone?"
• "How do I use the aptitude test?"
• "What universities offer engineering programs?"

What would you like to know about your career journey?`;
    }

    // If no specific match, return the FAQ's default helpful response
    return faqAnswer;
}

function containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
}

// ============================================================================
// CAREER MATCHING - Quiz Results
// ============================================================================

export interface QuizAnswer {
    question: string;
    answer: string;
}

export interface CareerRecommendation {
    title: string;
    matchScore: number;
    reason: string;
    demand: 'High' | 'Medium' | 'Low';
    salaryRange: string;
}

export interface CareerMatchResult {
    summary: string;
    recommendations: CareerRecommendation[];
}

export async function matchCareers(answers: QuizAnswer[]): Promise<CareerMatchResult> {
    const answerText = answers.map(a => a.answer.toLowerCase()).join(' ');

    // Score each career based on keyword matching
    const scoredCareers = SIERRA_LEONE_CAREERS.map(career => {
        let score = 0;

        // Keyword matching
        career.keywords.forEach(keyword => {
            if (answerText.includes(keyword)) score += 15;
        });

        // Industry matching
        if (answerText.includes(career.industry.toLowerCase())) score += 10;

        // Skill matching
        career.requiredSkills.forEach(skill => {
            if (answerText.includes(skill.toLowerCase())) score += 8;
        });

        // Interest indicators
        if (answerText.includes('help') || answerText.includes('people')) {
            if (['Healthcare', 'Education', 'Non-Profit'].includes(career.industry)) score += 12;
        }
        if (answerText.includes('tech') || answerText.includes('computer') || answerText.includes('digital')) {
            if (career.industry === 'Technology') score += 15;
        }
        if (answerText.includes('business') || answerText.includes('money') || answerText.includes('entrepreneur')) {
            if (['Business', 'Finance'].includes(career.industry)) score += 12;
        }
        if (answerText.includes('build') || answerText.includes('create') || answerText.includes('design')) {
            if (['Engineering', 'Technology'].includes(career.industry)) score += 10;
        }

        return { career, score };
    });

    // Sort by score and take top 3
    const topCareers = scoredCareers
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

    // Normalize scores to percentages
    const maxScore = topCareers[0].score;

    const recommendations: CareerRecommendation[] = topCareers.map(({ career, score }) => ({
        title: career.title,
        matchScore: Math.min(Math.round((score / maxScore) * 100), 98),
        reason: generateMatchReason(career, answerText),
        demand: career.demand,
        salaryRange: career.salaryRange
    }));

    const summary = generatePersonalitySummary(answerText, recommendations);

    return { summary, recommendations };
}

function generateMatchReason(career: CareerInfo, answerText: string): string {
    const reasons = [];

    if (career.keywords.some(k => answerText.includes(k))) {
        reasons.push(`Your interests align with ${career.industry.toLowerCase()}`);
    }

    if (answerText.includes('help') || answerText.includes('people')) {
        if (['Healthcare', 'Education'].includes(career.industry)) {
            reasons.push('You show strong people-oriented values');
        }
    }

    if (answerText.includes('creative') || answerText.includes('design')) {
        reasons.push('This role offers creative problem-solving opportunities');
    }

    if (career.demand === 'High') {
        reasons.push('High demand in Sierra Leone job market');
    }

    if (reasons.length === 0) {
        reasons.push(`Strong growth potential in ${career.industry}`);
    }

    return reasons.slice(0, 2).join('. ') + '.';
}

function generatePersonalitySummary(answerText: string, recommendations: CareerRecommendation[]): string {
    let summary = "Based on your responses, ";

    if (answerText.includes('help') || answerText.includes('people') || answerText.includes('community')) {
        summary += "you demonstrate strong interpersonal skills and a desire to make a positive impact. ";
    } else if (answerText.includes('tech') || answerText.includes('computer') || answerText.includes('solve')) {
        summary += "you show analytical thinking and problem-solving abilities. ";
    } else if (answerText.includes('creative') || answerText.includes('design') || answerText.includes('art')) {
        summary += "you have creative talents and innovative thinking. ";
    } else {
        summary += "you have diverse interests and adaptable skills. ";
    }

    const topIndustry = recommendations[0].title;
    summary += `Careers in fields like ${topIndustry} would be excellent fits for your strengths and Sierra Leone's job market.`;

    return summary;
}

// ============================================================================
// ROADMAP GENERATION - 3-Month Career Plans
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
}

export async function generateRoadmap(careerName: string): Promise<CareerRoadmap> {
    // First, try to find in comprehensive roadmap database
    const roadmapTemplate = findCareerRoadmap(careerName);

    if (roadmapTemplate) {
        // Use pre-built detailed roadmap
        return {
            title: `Your Roadmap to ${roadmapTemplate.title} in Sierra Leone`,
            overview: roadmapTemplate.overview,
            phases: roadmapTemplate.phases
        };
    }

    // Fallback: Check career-data.ts
    const career = SIERRA_LEONE_CAREERS.find(c =>
        c.title.toLowerCase().includes(careerName.toLowerCase()) ||
        c.keywords.some(k => careerName.toLowerCase().includes(k))
    );

    if (career) {
        return generateDetailedRoadmap(career);
    }

    // Last resort: Generic roadmap
    return generateGenericRoadmap(careerName);
}

function generateDetailedRoadmap(career: CareerInfo): CareerRoadmap {
    return {
        title: `Your Roadmap to ${career.title} in Sierra Leone`,
        overview: `${career.description}. This is a ${career.demand.toLowerCase()}-demand field in Sierra Leone with ${career.growthPotential.toLowerCase()}. With dedication and the right preparation, you can build a successful career earning ${career.salaryRange}. This 3-month plan will set you on the right path.`,
        phases: [
            {
                name: "Month 1: Foundation & Learning",
                goal: `Build foundational knowledge in ${career.industry} and understand the Sierra Leone job market`,
                steps: [
                    `Research ${career.title} roles in Sierra Leone - check job postings on local sites`,
                    `Start learning core skill: ${career.requiredSkills[0]}`,
                    `Enroll in free online course: ${getRelevantOnlineResource(career)}`,
                    `Visit ${career.localInstitutions[0]} to learn about their programs`,
                    `Join relevant WhatsApp/Facebook groups for ${career.industry} professionals in SL`,
                    `Read industry news and trends (even with slow internet, download articles offline)`,
                    `Create a learning schedule that works around power cuts`
                ],
                resources: [
                    career.localInstitutions[0],
                    getRelevantOnlineResource(career),
                    `${career.industry} professional groups in Freetown`,
                    `Local libraries in Freetown for books on ${career.requiredSkills[0]}`,
                    `YouTube tutorials (download for offline viewing)`
                ]
            },
            {
                name: "Month 2: Skill Development & Practice",
                goal: `Develop practical skills and start building your portfolio/experience`,
                steps: [
                    `Practice ${career.requiredSkills[1] || career.requiredSkills[0]} daily - aim for 2 hours/day`,
                    `Work on a small project related to ${career.title}`,
                    `Reach out to 3 professionals in this field for informational interviews`,
                    `Attend industry meetups or events in Freetown/Bo`,
                    `Start building your CV highlighting relevant skills`,
                    `Join study groups at ${career.localInstitutions[1] || career.localInstitutions[0]}`,
                    `Document your learning journey (blog, social media, or journal)`
                ],
                resources: [
                    `Practice projects and exercises`,
                    `Professional networking events in Freetown`,
                    career.localInstitutions[1] || career.localInstitutions[0],
                    `LinkedIn for connecting with ${career.industry} professionals`,
                    `Local mentorship programs`
                ]
            },
            {
                name: "Month 3+: Job Search & Networking",
                goal: `Secure internship, entry-level position, or further education opportunity`,
                steps: [
                    `Apply to 5-10 ${career.title} positions or internships`,
                    `Prepare for interviews - practice common questions`,
                    `Update LinkedIn profile with new skills and projects`,
                    `Visit companies in ${career.industry} sector in Freetown`,
                    `Consider applying to ${career.localInstitutions[0]} if further education needed`,
                    `Network at professional events - bring printed CVs`,
                    `Follow up on applications and maintain connections`,
                    `Keep learning - this field requires continuous development`
                ],
                resources: [
                    `Job boards: JobSearch SL, local newspapers, company websites`,
                    `${career.localInstitutions[0]} career services`,
                    `Professional associations in Sierra Leone`,
                    `Recruitment agencies in Freetown`,
                    `Government employment programs (if applicable)`
                ]
            }
        ]
    };
}

function generateGenericRoadmap(careerName: string): CareerRoadmap {
    return {
        title: `Your Roadmap to ${careerName} in Sierra Leone`,
        overview: `Starting a career in ${careerName} requires dedication, continuous learning, and strategic networking. While this is a specialized field, Sierra Leone's growing economy offers opportunities for motivated professionals. This 3-month plan will help you take the first steps toward your goal.`,
        phases: [
            {
                name: "Month 1: Research & Foundation",
                goal: "Understand the field and identify learning pathways",
                steps: [
                    `Research ${careerName} opportunities in Sierra Leone`,
                    `Identify required skills and qualifications`,
                    `Find online courses or local training programs`,
                    `Connect with professionals in this field`,
                    `Visit universities to learn about relevant programs`,
                    `Create a learning plan based on your findings`,
                    `Start building foundational knowledge`
                ],
                resources: [
                    "Fourah Bay College career guidance",
                    "Online learning platforms (Coursera, edX, YouTube)",
                    "Professional networks in Freetown",
                    "Local libraries and resource centers",
                    "Industry-specific websites and forums"
                ]
            },
            {
                name: "Month 2: Skill Building",
                goal: "Develop core competencies and practical experience",
                steps: [
                    "Take online courses in key skills",
                    "Work on practical projects",
                    "Seek mentorship from experienced professionals",
                    "Join relevant professional groups",
                    "Attend workshops or seminars in Freetown",
                    "Build a portfolio of your work",
                    "Practice and refine your skills daily"
                ],
                resources: [
                    "Free online courses and tutorials",
                    "Study groups and peer learning",
                    "Professional associations",
                    "Mentorship programs",
                    "Local training centers"
                ]
            },
            {
                name: "Month 3+: Opportunities & Growth",
                goal: "Find opportunities and continue professional development",
                steps: [
                    "Apply for relevant positions or internships",
                    "Network actively in your industry",
                    "Consider further education if needed",
                    "Build your professional online presence",
                    "Attend industry events and conferences",
                    "Keep learning and staying updated",
                    "Explore entrepreneurship opportunities if applicable"
                ],
                resources: [
                    "Job search platforms",
                    "University career services",
                    "Professional networking events",
                    "LinkedIn and professional networks",
                    "Industry publications and news"
                ]
            }
        ]
    };
}

function getRelevantOnlineResource(career: CareerInfo): string {
    if (career.industry === 'Technology') return 'freeCodeCamp or Codecademy';
    if (career.industry === 'Healthcare') return 'Khan Academy Medical courses';
    if (career.industry === 'Business') return 'Google Digital Skills or Coursera Business';
    if (career.industry === 'Engineering') return 'edX Engineering fundamentals';
    return 'Coursera or edX courses in your field';
}
