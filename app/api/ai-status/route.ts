import { NextResponse } from 'next/server';
import { hasAiKeys } from '@/lib/ai/config';

export async function GET() {
    const hasGemini = !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const hasOpenAI = !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-'));

    let provider = 'None';
    if (hasGemini) provider = 'Google Gemini (Primary)';
    else if (hasOpenAI) provider = 'OpenAI (Fallback)';

    return NextResponse.json({
        configured: hasGemini || hasOpenAI,
        provider,
        status: (hasGemini || hasOpenAI) ? `Real Intelligence Active (${provider})` : 'Local Fallback Mode'
    });
}
