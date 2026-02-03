
import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsAppMessage } from '@/lib/whatsapp/green-api';

export async function POST(req: NextRequest) {
    try {
        const { phoneNumber } = await req.json();

        if (!phoneNumber) {
            return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
        }

        const testMessage = "Kusheh! This is a test message from CareerPilot Salone. 🇸🇱\n\nYour connection is active! Type *START* to begin your career journey.";

        // Clean phone number: remove +, spaces, dashes
        const cleanNumber = phoneNumber.replace(/[\s\-\+]/g, '');

        await sendWhatsAppMessage(cleanNumber, testMessage);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Test Send Error:", error);
        return NextResponse.json({ error: error.message || 'Failed to send test message' }, { status: 500 });
    }
}
