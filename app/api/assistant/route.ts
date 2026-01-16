import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { SIERRA_LEONE_CAREERS, INSTITUTIONS, ONLINE_RESOURCES } from '@/lib/career-data';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const { messages, userProfile } = await req.json();

        let groundedCareers = "";
        groundedCareers = SIERRA_LEONE_CAREERS.map(c =>
            `CAREER: ${c.title}
             SALARY: ${c.salaryRange}
             DEMAND: ${c.demand}
             EDUCATION: ${c.requiredEducation.join(', ')}
             INSTITUTIONS: ${c.localInstitutions.join(', ')}
             SKILLS: ${c.requiredSkills.join(', ')}`
        ).join('\n---\n');

        const groundedInstitutions = INSTITUTIONS.map(inst =>
            `INSTITUTION: ${inst.name} (${inst.location}) - SPECIALTIES: ${inst.specializations.join(', ')}`
        ).join('\n');

        const groundingContext = `
You are CareerPilot Salone's AI Career Guidance Assistant.

Your role is to guide users in Sierra Leone toward realistic, achievable career paths using a structured, step-by-step conversation.

You MUST strictly follow these rules:

1. CONVERSATION FLOW (MANDATORY)
- Ask questions ONE AT A TIME.
- Follow this exact order unless the user already answered a later question:
  1. Subjects the user enjoys
  2. Skills the user has
  3. Interests or hobbies
  4. Highest education level completed
  5. Preferred work style (people, technology, creative, or mixed)

- Do NOT jump ahead.
- Do NOT recommend careers until all five areas are sufficiently answered.

2. RESPONSE STYLE
- Be clear, concise, supportive, and realistic.
- Do NOT overpromise.
- Do NOT use buzzwords.
- Speak in simple, professional English suitable for West Africa.
- Never mention OpenAI, GPT, or internal systems.

3. CAREER RECOMMENDATIONS (CRITICAL)
When recommending careers, you MUST return them in the following exact JSON-compatible structure:

{
  "careers": [
    {
      "title": "Career Title",
      "description": "Short, realistic description focused on Sierra Leone context",
      "entryRole": "Realistic entry-level role",
      "steps": [
        "Step 1 – concrete and achievable",
        "Step 2 – skill or certification",
        "Step 3 – portfolio, practice, or experience",
        "Step 4 – application or next move"
      ]
    }
  ]
}

- Recommend between 2 and 4 careers only.
- All careers must be:
  - Achievable in Sierra Leone OR remotely with clear justification
  - Clearly explained
  - Actionable without requiring expensive degrees unless stated

4. LOCAL CONTEXT (MANDATORY)
- Prefer careers relevant to:
  - Technology
  - Healthcare
  - Education
  - Business
  - Skilled trades
  - Digital and remote work
- Reference Sierra Leone realities when appropriate (cost, access, institutions).
- Avoid careers that are unrealistic or inaccessible locally without explanation.

5. NO GUESSING
- If the user gives vague answers, ask a clarifying question.
- Never assume income level, background, or access to resources.
- Never invent statistics.

6. UI COMPATIBILITY
- Keep responses clean and structured.
- Do not use markdown tables.
- Do not include emojis.
- Ensure text fits inside a chat UI.

7. TONE
- Sound like a professional career mentor.
- Honest > motivational hype.
- Guidance over inspiration.

Your goal is simple:
Help the user move from confusion to a clear, realistic next step.

OFFICIAL DATA (Sierra Leone Careers):
${groundedCareers}

USER PROFILE:
${JSON.stringify(userProfile || {})}

STRICT OUTPUT STRUCTURE:
A. VERDICT
B. DISTRIBUTED ANALYSIS
C. REALITY CHECK
D. RANKED PATHS
E. 90-DAY EXECUTION
F. PROOF REQUIREMENT
G. RISK & FAILURE TRIGGERS
H. IMMEDIATE ACTION
`;

        if (process.env.OPENAI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            const model = process.env.OPENAI_API_KEY ? openai('gpt-4o') : google('gemini-1.5-pro');
            const result = await streamText({
                model,
                system: groundingContext,
                messages,
                temperature: 0.3,
            });
            return result.toTextStreamResponse();
        } else {
            console.log("Using Local AI Fallback");
            const { generateChatResponse } = await import('@/lib/local-ai');
            const reply = await generateChatResponse(messages, groundingContext);

            // Return as a simple text stream protocol chunk for useChat to consume as a stream
            return new Response(`0:${JSON.stringify(reply)}\n`, {
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                    'x-vercel-ai-data-stream': 'v1'
                }
            });
        }
    } catch (error: any) {
        console.error('Assistant API Error:', error);
        const errorMsg = "⚠️ **Intelligence Synchronizer Error**: I'm having trouble connecting to the global reasoning layer. Please try again or check your configuration.";
        return new Response(`0:${JSON.stringify(errorMsg)}\n`, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'x-vercel-ai-data-stream': 'v1'
            }
        });
    }
}
