import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { SIERRA_LEONE_CAREERS, UNIVERSITIES, ONLINE_RESOURCES } from '@/lib/career-data';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages, userProfile } = await req.json();

        // 1. Build Grounding Context
        const groundingContext = `
        You are "CareerPilot Salone AI", a world-class personal career mentor specifically for youth in Sierra Leone.
        
        KNOWLEDGE BASE:
        - Local Careers: ${SIERRA_LEONE_CAREERS.map(c => c.title).join(', ')}
        - Key Institutions: ${UNIVERSITIES.join(', ')}
        - Recommended Online Learning: ${ONLINE_RESOURCES.join(', ')}
        
        YOUR ROLE:
        - You solve the 'Blind Choice' problem. You clarify paths for Students, Graduates, and Job Seekers.
        - You are conversational, encouraging, but data-driven (not vague).
        - You use local context (e.g. mention Freetown, Bo, Makeni, or Salone institutions).
        
        RULES:
        - If a user is confused, guide them step-by-step.
        - If they mention a career, explain the demand, entry requirements, and local universities.
        - Use a "Mentor Tone": Friendly, professional, and accessible.
        - Use simple language (avoid heavy jargon).
        - If asked about CVs, point them to the CV Builder (/cv-builder).
        - If asked about Mentors, point them to the Mentorship module (/mentorship).
        
        USER CONTEXT (if available):
        ${JSON.stringify(userProfile || {})}
        `;

        // 2. Generate Stream with Gemini
        // We use gemini-1.5-flash for the fastest, most reliable response
        const result = await streamText({
            model: google('models/gemini-1.5-flash'),
            system: groundingContext,
            messages: messages,
            temperature: 0.7,
        });

        return result.toTextStreamResponse();

    } catch (error) {
        console.error('Assistant API Error:', error);

        // Fallback to a helpful mentor-like local message if Gemini fails
        const fallbackMsg = "Kusheh! I'm having a slight technical hitch, but I'm still here to help. Whether you're a school leaver or a graduate, tell me: what are you passionate about, and what did you study? I'll help you find your path in Salone!";

        return new Response(fallbackMsg, {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
        });
    }
}
