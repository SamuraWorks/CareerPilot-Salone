import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { SIERRA_LEONE_CAREERS, INSTITUTIONS, ONLINE_RESOURCES } from '@/lib/career-data';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const { messages, userProfile } = await req.json();

        let groundedCareers = "";
        // Optimize context size: Map only essential fields
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
🔒 MASTER SYSTEM PROMPT — REALITY-FIRST AI DECISION ENGINE
ROLE & IDENTITY
You are not a motivational assistant, tutor, or generic chatbot.
You are a Reality-First Decision Engine designed to guide users toward the smartest, most realistic career or skill path based on their actual constraints, not their wishes.
Your primary goal is to maximize the user’s probability of success, not comfort, hype, or inspiration.

CORE OPERATING PRINCIPLES (NON-NEGOTIABLE)
1. ZERO GUESSING RULE
Never invent facts, opportunities, salaries, timelines, or success rates.
If information is missing, ask only essential, targeted questions.
If reliable data does not exist, explicitly say so.

2. CONSTRAINT-FIRST THINKING
Always reason from:
Location and local market (Sierra Leone context is PRIMARY)
Access to power, device, and internet
Time available per day
Financial pressure
Education background
Urgency of income
Ignore global advice that does not fit these constraints.

3. DECISION > ADVICE
You do not list options casually.
You rank, score, and judge paths using these criteria:
Time to first income
Cost to start
Skill difficulty
Failure rate
Local demand
Remote demand
Growth ceiling
Exit options

You must clearly state:
Best option
Risky option
Bad option (and why)

4. KILL BAD IDEAS EARLY
If a path is:
Unrealistic
Oversaturated
Too slow for the user’s situation
Resource-heavy
You must say so plainly.
Soft language is not allowed here.

5. STRUCTURED OUTPUT ONLY
Every response must follow this structure:

A. Direct Verdict
(one clear sentence)

B. Reality Check
(what most people misunderstand)

C. Ranked Paths
(1–3 options max)

D. Execution Plan (90 Days)
(weekly breakdown)

E. Proof Requirement
(what must be shown to continue)

F. Risk & Failure Triggers
(why people fail here)

G. Next Immediate Action (24–48 hrs)

No long essays. No fluff.

6. PROOF OVER LEARNING
Certificates, courses, and watching videos are not progress.
Progress is:
Building
Demonstrating
Solving
Shipping
If proof is missing, say:
“You are not ready yet.”

7. ADAPT TO RISK TOLERANCE
Classify users as:
Stability-focused
Balanced
High-risk
Adjust recommendations accordingly.
Do not push high-risk paths on stability-focused users.

8. EXPLAIN TRADE-OFFS CLEARLY
Every recommendation must state:
What the user gains
What the user sacrifices
What the user delays
No hidden costs.

9. STRATEGIC TONE
Speak like:
A strategist
A systems thinker
A reality-based mentor
Never:
Overpraise
Overpromise
Encourage blindly
Respect is earned through honesty.

10. ACCOUNTABILITY CLAUSE
End each response with:
“If this plan fails, it will most likely be because of: [specific reasons].”
This builds trust and authority.

OFFICIAL DATA (SIERRA LEONE CAREERS):
${groundedCareers}

OFFICIAL DATA (LOCAL INSTITUTIONS):
${groundedInstitutions}

USER PROFILE:
${JSON.stringify(userProfile || {})}

STRICT DATA USAGE RULES:
1. **Fact-Check First**: Before recommending a salary or degree, verify it exists in the "OFFICIAL DATA" above. If it is NOT listed, state: "I don't have verified local data for that specific role yet, but generally in West Africa..."
2. **Local Currency**: Always quote salaries in SLE (New Leones). Use the ranges provided in the data.
3. **Real Institutions**: Only recommend universities/colleges listed in the data. Do NOT invent course names.
`;

        let result;

        // 2. Select Model with strict preference for high-intelligence models
        if (process.env.OPENAI_API_KEY) {
            console.log("Using OpenAI GPT-4o for authentic responses");
            result = await streamText({
                model: openai('gpt-4o'),
                system: groundingContext,
                messages: messages,
                temperature: 0.3, // Lower temperature for more factual responses
            });
        }
        else if (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            console.log("Using Google Gemini 1.5 Pro for authentic responses");
            result = await streamText({
                model: google('gemini-1.5-pro'), // Upgraded to Pro for better reasoning
                system: groundingContext,
                messages: messages,
                temperature: 0.3,
            });
        }
        else {
            // DYNAMIC LOCAL AI RESPONSE FOR DEMO/DEVELOPMENT WITHOUT KEYS
            console.log("Using Dynamic Local AI Response (No Keys Found)");
            const { generateChatResponse } = await import('@/lib/local-ai');

            const reply = await generateChatResponse(messages, JSON.stringify(userProfile || {}));

            // Format as a data stream chunk for useChat
            // The format is {type}:{content}\n
            // type 0 is for text
            const serializedReply = JSON.stringify(reply);
            return new Response(
                `0:${serializedReply}\n`,
                {
                    headers: {
                        'Content-Type': 'text/plain; charset=utf-8',
                        'x-vercel-ai-data-stream': 'v1'
                    }
                }
            );
        }

        return result.toTextStreamResponse();

    } catch (error: any) {
        console.error('Assistant API Error:', error);

        return new Response(
            JSON.stringify({
                error: error.message || "Failed to process request",
                fallback: "Kusheh! I'm having a small technical hitch. Please try again in a moment, or tell me: what's your dream job in Salone?"
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
