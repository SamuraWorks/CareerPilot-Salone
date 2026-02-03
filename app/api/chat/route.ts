import { NextRequest, NextResponse } from 'next/server';
import { generateCareerGuidance } from '@/lib/ai/service';
import { generateChatResponse } from '@/lib/local-ai';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { messages, isFinalGuidance, skills, interests, education, goals, location = "Sierra Leone" } = body;

        // If we have messages, we can use the local AI or the AI service
        if (messages && messages.length > 0) {
            try {
                // If we have API keys, we'd ideally use a streaming or structured AI here too
                // But for now, let's use the robust local-ai which handles conversation history
                const reply = await generateChatResponse(messages, "Guidance Page", isFinalGuidance);
                return NextResponse.json({ success: true, reply });
            } catch (localError) {
                console.error("Local AI Error:", localError);
            }
        }

        // Traditional handling for profile-based calls
        // Construct a rich profile string for the AI
        const profileString = `
      Skills: ${skills || 'Not specified'}
      Interests: ${interests || 'Not specified'}
      Current Education: ${education || 'Not specified'}
      Career Goals: ${goals || 'Not specified'}
      Location: ${location}
    `;

        try {
            const hasKeys = (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) ||
                process.env.GEMINI_API_KEY ||
                process.env.GOOGLE_GENERATIVE_AI_API_KEY;

            if (!hasKeys) {
                // Return local AI response if no keys
                const reply = await generateChatResponse([{ role: 'user', content: profileString }], "Profile Guidance", true);
                return NextResponse.json({ success: true, data: { summary: reply }, reply });
            }

            const guidance = await generateCareerGuidance(profileString);
            return NextResponse.json({
                success: true,
                data: guidance,
                reply: typeof guidance === 'string' ? guidance : (guidance as any).summary || JSON.stringify(guidance)
            });
        } catch (aiError) {
            console.error("AI Service Error, falling back to local:", aiError);
            const reply = await generateChatResponse([{ role: 'user', content: profileString }], "Fallback Guidance", true);
            return NextResponse.json({ success: true, data: { summary: reply }, reply });
        }
    } catch (error) {
        console.error("Chat API Critical Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to process career guidance." },
            { status: 500 }
        );
    }
}
