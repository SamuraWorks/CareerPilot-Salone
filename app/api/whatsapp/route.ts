
import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken); // Not strictly needed if returning TwiML

export async function POST(req: Request) {
    try {
        // Twilio Webhooks are sent as application/x-www-form-urlencoded
        const formData = await req.formData();
        const incomingMsg = formData.get('Body')?.toString() || '';
        const sender = formData.get('From')?.toString() || '';

        console.log(`Msg from ${sender}: ${incomingMsg}`);

        // Create TwiML response
        const { MessagingResponse } = twilio.twiml;
        const twiml = new MessagingResponse();

        const msg = incomingMsg.trim().toLowerCase();

        if (msg.includes('hi') || msg.includes('hello') || msg.includes('start')) {
            twiml.message(`👋 Welcome to *CareerPilot Salone*!
       
I am your AI Career Assistant. 🤖

Reply with a number:
1️⃣ *Find a Career Path*
2️⃣ *Scholarships*
3️⃣ *CV Tips*
4️⃣ *Help*`);
        } else if (msg === '1') {
            twiml.message(`🚀 *Discover Careers*
      
What subjects do you enjoy?
A. Math & Science
B. Arts & Business
C. Technology
      
(Reply A, B, or C)`);
        } else if (msg === '2') {
            twiml.message(`🎓 *Latest Scholarships*
      
1. Sierra Leone Grant 2024
2. UK Commonwealth Scholarship
3. Chinese Gov Scholarship

Visit our website for details: https://careerpilot.sl/scholarships`);
        } else if (msg === '3') {
            twiml.message(`📄 *CV Tips*
       
- Keep it under 2 pages
- Use bullet points
- Highlight achievements, not just duties

Build your CV here: https://careerpilot.sl/cv-builder`);
        } else {
            // Default Fallback
            twiml.message(`I didn't understand that. 😕
       
Reply with:
1️⃣ *Find a Career Path*
2️⃣ *Scholarships*
3️⃣ *CV Tips*`);
        }

        // Return XML response
        return new NextResponse(twiml.toString(), {
            status: 200,
            headers: {
                'Content-Type': 'text/xml',
            },
        });

    } catch (error) {
        console.error("Error processing Twilio webhook:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    return NextResponse.json({ message: 'Twilio Webhook Active' });
}
