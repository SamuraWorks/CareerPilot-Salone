
import { UserProfile } from "./cv-logic-engine";

export type CoverLetterTone = 'formal' | 'dynamic' | 'academic' | 'standard';

export interface JobData {
    title: string;
    company: string;
    description: string;
    companyAddress?: string;
    userAddress?: string;
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

    if (c.includes('bank') || c.includes('ministry') || c.includes('gov') || c.includes('council') || c.includes('save the children') || c.includes('plan int') || c.includes('undp') || c.includes('united nations')) {
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

    // System Instructions based on the new Agentic rules
    let systemInstruction = "You are an expert CV architect and professional cover letter writer.";
    systemInstruction += "\n\nCORE RULES:";
    systemInstruction += "\n- Build the letter entirely from the provided user profile.";
    systemInstruction += "\n- Tailor specifically to the job title and organization.";
    systemInstruction += "\n- Matches strengths to job requirements.";
    systemInstruction += "\n- Use appropriate tone based on the organization type.";
    systemInstruction += "\n- Maintain recruiter-appropriate length (concise, focused).";
    systemInstruction += "\n- Do NOT include explanations, AI labels, or meta-text.";

    systemInstruction += "\n\nSTRUCTURE:";
    systemInstruction += "\n- HEADER: Strict formal business letter format including Sender and Recipient addresses.\n- SUBJECT: Always include a bolded subject line (e.g. **RE: APPLICATION FOR...**) after the salutation.\n- OPENING: Must be 'Sophistically Catchy'—immediately command attention by positioning the user's primary value against the company's specific mission.";
    systemInstruction += "\n- BODY: Authoritative, evidence-based paragraphs highlighting 2–3 strongest qualifications using sophisticated vocabulary.";
    systemInstruction += "\n- CLOSING: Demonstrate mutual benefit and high-level interest.";
    systemInstruction += "\n- SIGN-OFF: Strict formal sign-off ('Yours sincerely,' or 'Yours faithfully,') followed by the candidate's name.";

    if (tone === 'formal' || tone === 'standard') {
        systemInstruction += "\n\nTONE: Masterfully formal, diplomatic, and executive. Use high-tier professional vocabulary. Avoid all casual phrasing.";
    } else if (tone === 'dynamic') {
        systemInstruction += "\n\nTONE: High-energy executive; commanding and innovative. Balance modern problem-solving language with rigid professional standards.";
    } else if (tone === 'academic') {
        systemInstruction += "\n\nTONE: Scholarly and rigorous. Emphasize research methodology, institutional loyalty, and intellectual contribution with maximum formality.";
    }

    // VARIANCE ENGINE
    // Injecting random focus directions to ensure the AI doesn't produce identical letters for similar profiles.
    const focusOptions = [
        "Focus on future potential and adaptability.",
        "Focus on reliability and professional consistency.",
        "Focus on enthusiasm and cultural fit.",
        "Focus on specific problem-solving examples.",
        "Focus on academic/theoretical grounding applied to practice."
    ];
    const randomFocus = focusOptions[Math.floor(Math.random() * focusOptions.length)];
    const seed = new Date().toISOString(); // Timestamp to prevent caching

    // User Prompt construction
    const prompt = `
    USER PROFILE:
    - Name: ${profile.full_name || "Candidate"}
    - Target Role: ${job.title}
    - Company: ${job.company}
    - Level: ${(profile.experience_years || 0) > 0 ? 'Professional (' + profile.experience_years + ' yrs)' : 'Student/Entry'}
    - Key Skills: ${profile.skills.join(', ')}
    - Impact Metrics: ${profile.impact_metrics || "N/A"}
    - Leadership: ${profile.leadership_experience || "N/A"}
    - Unique Hook: ${profile.unique_hook || "N/A"}
    - User Address (Sender): ${job.userAddress || "Freetown, Sierra Leone"}
    - Company Address (Recipient): ${job.companyAddress || "Sierra Leone"}
    
    JOB DESCRIPTION SNIPPET:
    ${job.description || "No specific snippet provided."}

    INSTRUCTION:
    Generate an AUTHORITATIVE and CATCHY cover letter now. Every sentence must exude professionalism and strategic value. Use NO placeholders in the body. Ensure the addresses are integrated perfectly into a clean header.

    VARIANCE INSTRUCTION:
    ${randomFocus}
    (Generation Seed: ${seed})
    `;

    return { tone, prompt, systemInstruction };
}
