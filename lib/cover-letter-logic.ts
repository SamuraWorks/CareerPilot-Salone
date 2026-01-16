
import { UserProfile } from "./cv-logic-engine";

export type CoverLetterTone = 'formal' | 'dynamic' | 'academic' | 'standard';

export interface JobData {
    title: string;
    company: string;
    description: string;
}

export interface CoverLetterPrompt {
    tone: CoverLetterTone;
    prompt: string;
    systemInstruction: string;
}

/**
 * System 3: Tone Selector (Auto-Inferred)
 * - Bank/Gov/NGO -> Formal
 * - Startup/Tech -> Dynamic
 * - Academic -> Academic
 */
export function determineTone(company: string, jobTitle: string): CoverLetterTone {
    const c = company.toLowerCase();
    const t = jobTitle.toLowerCase();

    if (c.includes('bank') || c.includes('ministry') || c.includes('gov') || c.includes('council') || c.includes('save the children') || c.includes('plan int') || c.includes('undp')) {
        return 'formal';
    }

    if (c.includes('tech') || c.includes('cortex') || c.includes('limkokwing') || c.includes('innovation') || c.includes('studio') || t.includes('developer') || t.includes('designer')) {
        return 'dynamic';
    }

    if (t.includes('professor') || t.includes('lecturer') || t.includes('research') || c.includes('university') || c.includes('college')) {
        return 'academic';
    }

    return 'standard';
}

/**
 * System 3: Mapping Algorithm
 * Constructs the prompt for the AI to generate the cover letter.
 */
export function constructCoverLetterPrompt(profile: UserProfile, job: JobData, tone: CoverLetterTone): CoverLetterPrompt {

    // System Instructions based on "Disposable Mindset" and Tone
    let systemInstruction = "You are an expert career strategist for the Sierra Leonean market. Write a high-impact cover letter.";

    if (tone === 'formal') {
        systemInstruction += " Tone: Formal, Respectful, Duty-driven. Use 'Dear Hiring Manager' or 'To the Selection Committee'. Avoid slang. Focus on reliability and credentials.";
    } else if (tone === 'dynamic') {
        systemInstruction += " Tone: Dynamic, Agile, Results-driven. Use a strong opening hook. Focus on speed, adaptability, and portfolio outcomes.";
    } else if (tone === 'academic') {
        systemInstruction += " Tone: Intellectual, Rigorous, Future-focused. Focus on research potential and pedagogical philosophy.";
    } else {
        systemInstruction += " Tone: Professional, Confident, Clear.";
    }

    systemInstruction += " Keep it under 300 words. NO PLACEHOLDERS like [Insert Name]. Use the provided data only. If data is missing, generalize intelligently without brackets.";

    // User Prompt construction
    const prompt = `
    CANDIDATE PROFILE:
    - Status: ${profile.status}
    - Years Experience: ${profile.yearsExperience}
    - Top Skills: ${profile.skills.slice(0, 5).join(', ')}
    - Project Count: ${profile.projectCount}
    
    TARGET JOB:
    - Role: ${job.title}
    - Company: ${job.company}
    - Context: ${job.description.slice(0, 200)}...

    TASK:
    Write a cover letter that bridges the candidate's profile to this specific job.
    1. Hook: Start with why this specific company/role matches the candidate's trajectory.
    2. Evidence: Pick the strongest matching skill/experience.
    3. Call to Action: Professional close.
    `;

    return { tone, prompt, systemInstruction };
}
