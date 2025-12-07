import { NextRequest, NextResponse } from 'next/server';
import { generateCareerReply } from '@/lib/ai/geminiClient';
import { generateChatResponse as generateLocalResponse } from '@/lib/local-ai';
import { getSiteContext } from '@/lib/ai-context';

export const maxDuration = 45; // Allow longer timeout for reasoning logic if needed

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
        }

        // 1. Get Site Context
        let siteContext = "";
        try {
            siteContext = await getSiteContext();
        } catch (e) {
            console.warn("[API] Failed to fetch site context, proceeding without it.");
        }

        // 2. Try External AI (Gemini -> OpenAI)
        try {
            const result = await generateCareerReply({
                messages,
                context: siteContext,
            });

            return NextResponse.json({
                id: Date.now().toString(),
                reply: result.text,
                provider: result.provider,
                timestamp: new Date().toISOString()
            });

        } catch (aiError) {
            console.warn("[API] All External AI (Gemini/OpenAI) failed. Switching to LOCAL FALLBACK.", aiError);

            // 3. Last Resort: Local Logic
            // This guarantees an answer even if internet/keys are totally broken
            const localReply = await generateLocalResponse(messages, siteContext);

            return NextResponse.json({
                id: Date.now().toString(),
                reply: localReply,
                provider: 'local-fallback',
                timestamp: new Date().toISOString(),
                warning: 'Network/AI services unavailable. Using offline mode.'
            });
        }

    } catch (err: any) {
        console.error("[API] Critical Chat Error:", err);
        return NextResponse.json({
            error: "Internal Server Error",
            details: err.message
        }, { status: 500 });
    }
}
