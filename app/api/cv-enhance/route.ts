import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 60;

const MASTER_PROMPT = `
You are an expert CV architect, recruiter-aware career strategist, ATS optimization specialist, and professional cover letter writer.

Your task is to generate:
1) A high-quality, professional CV
2) A job-specific cover letter (ONLY if the user is applying for a specific job)

This system is NOT template-based.
You must make all structural, content, and tone decisions intelligently.

==============================
CORE RULES (NON-NEGOTIABLE)
==============================

1. Use ZERO templates for both CV and cover letter.
2. Do NOT ask the user to choose layouts, designs, fonts, or formats.
3. Decide CV type automatically:
   - Skills-based
   - Experience-based
   - Technical
   - Academic
   - Compact professional
4. Include ONLY relevant sections.
5. Optimize for ATS readability.
6. Language must be confident, honest, and realistic.
7. No exaggeration. No false claims. No generic fluff.

==============================
CV GENERATION RULES
==============================

You must:
- Choose section order based on profession and experience level
- Adjust bullet density based on seniority
- Emphasize:
  - Potential, projects, learning for students
  - Impact, outcomes, responsibility for professionals
- Normalize and rank skills by relevance to the target role
- Adapt phrasing for:
  - Local roles (Sierra Leone hiring norms)
  - International roles (global standards)

------------------------------
Confidence Enhancement Layer
------------------------------
Silently upgrade under-selling language such as:
- “assisted”
- “helped”
- “participated”

Do this WITHOUT inventing achievements.

------------------------------
Realism Filter
------------------------------
If gaps exist between the user’s profile and the target role:
- Do NOT mention gaps in the CV
- Shift emphasis to strengths and transferable skills
- Leave gap handling to guidance systems outside this output

==============================
COVER LETTER GENERATION RULES
(ONLY IF APPLYING FOR A JOB)
==============================

If job application data is provided, generate a cover letter that:

- Is built entirely from the user’s CV
- Is tailored specifically to the job title and organization
- Matches CV strengths to job requirements
- Uses an appropriate tone based on:
  - Corporate / NGO / Startup / Government
  - Local vs international role
- Maintains recruiter-appropriate length (concise, focused)

The cover letter must:
- Open with clear intent and role alignment
- Highlight 2–3 strongest, most relevant qualifications
- Demonstrate value, not desperation
- Close professionally and confidently

==============================
OUTPUT REQUIREMENTS
==============================

If the user is applying for a job, output in this exact order:

1) CV
2) Cover Letter

If the user is NOT applying for a job:
- Output ONLY the CV

Do NOT include:
- Explanations
- Labels like “AI-generated”
- Commentary or advice
- Meta text
- Markdown code blocks (just plain text or minimal markdown headers)

Output must be clean, professional, and ready for PDF or DOC export.
`;

export async function POST(req: Request) {
    try {
        const { text, type, career, profile, jobDetails } = await req.json();

        let systemPrompt = "";
        let promptContent = "";

        if (type === 'full_application') {
            systemPrompt = MASTER_PROMPT;
            const userContext = JSON.stringify(profile, null, 2);
            const jobContext = jobDetails ? JSON.stringify(jobDetails, null, 2) : "NO_SPECIFIC_JOB_TARGET";

            promptContent = `
             STRUCTURED USER DATA:
             ${userContext}

             JOB TARGET DATA:
             ${jobContext}

             INSTRUCTIONS:
             Generate the Application Package now.
             `;
        } else {
            // Legacy / Snippet Mode
            systemPrompt = "You are an expert career consultant in Sierra Leone. Your goal is to improve professional CV content for the local and international market.";
            if (type === 'summary') {
                systemPrompt += "\n\nEnhance the provided professional summary. Make it impact-driven, professional, and tailored for a " + (career || "professional") + " role. Keep it concise (3-4 sentences). Use strong action verbs.";
            } else if (type === 'experience') {
                systemPrompt += "\n\nEnhance the provided job description bullet points. Focus on achievements rather than just duties. Use the star method where possible. Make them professional and relevant for a " + (career || "professional") + " context in Sierra Leone and abroad.";
            }
            promptContent = `Original Text: ${text}`;
        }

        // 1. Try OpenAI (Primary)
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
            const result = await streamText({
                model: openai('gpt-4o'),
                system: systemPrompt,
                prompt: promptContent,
            });

            return result.toTextStreamResponse();
        }

        // 2. Try Gemini (Fallback)
        if (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            try {
                const result = await streamText({
                    model: google('gemini-1.5-flash'),
                    system: systemPrompt,
                    prompt: promptContent,
                });

                return result.toTextStreamResponse();
            } catch (geminiError: any) {
                console.warn("Gemini CV enhancement failed:", geminiError.message);
            }
        }

        // Mock response if no keys
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            start(controller) {
                let response = "";
                if (type === 'full_application') {
                    response = `[MOCK GENERATED CV]
Name: ${profile?.fullName || "Candidate"}
Role: ${career || "Professional"}

SUMMARY
High-potential professional with...

EXPERIENCE
...

[MOCK COVER LETTER]
Dear Hiring Manager,
I am writing to express my strong interest...
`;
                } else {
                    response = `[AI ENHANCED] ${text} (Enhanced for impact)`;
                }

                controller.enqueue(encoder.encode(response));
                controller.close();
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Vercel-AI-Data-Stream': 'v1',
            },
        });

    } catch (error) {
        console.error("CV Enhancement error:", error);
        return new Response(JSON.stringify({ error: 'Failed to enhance text' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
