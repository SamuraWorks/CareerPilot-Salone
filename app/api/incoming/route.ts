
import { NextResponse } from 'next/server';
import axios from 'axios';

// Environment Variables
const ID_INSTANCE = process.env.GREEN_API_ID || '7105413645';
const API_TOKEN_INSTANCE = process.env.GREEN_API_TOKEN || '9a4ef0736fc94810a764f8fdd11e78ec380dcd2c6b0c4ceaa4';
const GREEN_API_URL = `https://7105.api.greenapi.com/waInstance${ID_INSTANCE}`;

// Helper to send message via Green-API
async function sendWhatsAppMessage(chatId: string, message: string) {
    if (!chatId || !message) return;
    try {
        const url = `${GREEN_API_URL}/sendMessage/${API_TOKEN_INSTANCE}`;
        await axios.post(url, {
            chatId: chatId,
            message: message
        });
        console.log(`Sent to ${chatId}: ${message.substring(0, 20)}...`);
    } catch (error: any) {
        console.error('GreenAPI Send Error:', error.response?.data || error.message);
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Validate Webhook Structure
        if (!body || !body.typeWebhook) {
            return NextResponse.json({ status: 'ignored', reason: 'not_a_webhook' });
        }

        // 2. Only process incoming text messages
        if (body.typeWebhook !== 'incomingMessageReceived') {
            return NextResponse.json({ status: 'ignored', reason: 'not_incoming_message' });
        }

        const messageData = body.messageData;
        const senderData = body.senderData;

        if (!messageData?.textMessageData?.textMessage) {
            return NextResponse.json({ status: 'ignored', reason: 'no_text_content' });
        }

        const chatId = senderData.chatId;
        const incomingText = messageData.textMessageData.textMessage.trim();
        const incomingTextLower = incomingText.toLowerCase();

        console.log(`Received from ${chatId}: ${incomingText}`);

        // 3. Switch/Case Logic
        let replyText = '';

        if (incomingTextLower === 'hi' || incomingTextLower === 'hello' || incomingTextLower === 'start' || incomingTextLower === 'menu') {
            replyText = `Welcome to CareerPilot Salone!
Choose an option:
1️⃣ Career Guidance
2️⃣ Scholarship Info
3️⃣ Skills & Courses
4️⃣ Talk to Support`;
        } else {
            switch (incomingText.trim()) {
                case '1':
                    replyText = `*🚀 Career Guidance*
Here is how we can help:
- Explore generic career paths
- Take our aptitude test
- Get AI-powered advice

Visit: https://career-pilot-salone.vercel.app/careers`;
                    break;
                case '2':
                    replyText = `*🎓 Scholarship Information*
Current opportunities:
- Sierra Leone Gov Grant
- Commonwealth Scholarship
- Chinese Government Scholarship

Details: https://career-pilot-salone.vercel.app/scholarships`;
                    break;
                case '3':
                    replyText = `*🛠️ Skills & Courses*
Top skills in demand:
- Digital Marketing
- Data Analysis
- Web Development
- Entrepreneurship

Learn more: https://career-pilot-salone.vercel.app/roadmap`;
                    break;
                case '4':
                    replyText = `*📞 Support*
You can reach our support team at:
Email: support@careerpilot.sl
Phone: +232 99 999 999
Or reply here and we will get back to you!`;
                    break;
                default:
                    replyText = 'Invalid option, please choose 1, 2, 3 or 4.';
                    break;
            }
        }

        // 4. Send Response (Fire and Forget to ensure fast 200 OK)
        // We await it here for simplicity, but in high load, might want to not await for the webhook return.
        // User requested "Return 200 OK instantly", so we can wrap this in a non-awaited promise if we want, 
        // but Vercel functions might kill the process if we return too early. 
        // Best practice on Vercel serverless is to await critical work. 
        // GreenAPI timeout is generous enough for one axios call.
        await sendWhatsAppMessage(chatId, replyText);

        // 5. Return 200 OK
        return NextResponse.json({ status: 'success' });

    } catch (error) {
        console.error("Webhook Error:", error);
        // Always return 200 to stop retries from Green-API
        return NextResponse.json({ status: 'error', message: 'internal_error' }, { status: 200 });
    }
}
