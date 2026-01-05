import { NextRequest, NextResponse } from 'next/server';
import { generateCareerGuidance } from '@/lib/ai/service';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { skills, interests, education, goals, location = "Sierra Leone" } = body;

        // Construct a rich profile string for the AI
        const profileString = `
      Skills: ${skills}
      Interests: ${interests}
      Current Education: ${education}
      Career Goals: ${goals}
      Location: ${location}
    `;

        const guidance = await generateCareerGuidance(profileString);

        return NextResponse.json({ success: true, data: guidance });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to process career guidance." },
            { status: 500 }
        );
    }
}
