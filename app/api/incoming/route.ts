
import { NextResponse } from 'next/server';
import { generateCareerReply } from '@/lib/ai/geminiClient';

// GreenAPI Credentials (from user)
const ID_INSTANCE = process.env.GREEN_API_ID || '7105413645';
const API_TOKEN_INSTANCE = process.env.GREEN_API_TOKEN || '9a4ef0736fc94810a764f8fdd11e78ec380dcd2c6b0c4ceaa4';
const GREEN_API_URL = `https://7105.api.greenapi.com/waInstance${ID_INSTANCE}`;

async function sendWhatsAppMessage(chatId: string, message: string) {
    try {
        const response = await fetch(`${GREEN_API_URL}/sendMessage/${API_TOKEN_INSTANCE}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chatId: chatId,
                message: message
            })
        });
        const data = await response.json();
        console.log('GreenAPI Send Result:', data);
        return data;
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // GreenAPI Webhook Structure Validation
        if (!body || !body.typeWebhook) {
            return NextResponse.json({ status: 'ignored', reason: 'not_a_webhook' });
        }

        // Only process incoming messages
        if (body.typeWebhook !== 'incomingMessageReceived') {
            return NextResponse.json({ status: 'ignored', reason: 'not_incoming_message' });
        }

        const senderData = body.senderData;
        const messageData = body.messageData;

        if (!senderData || !messageData || !messageData.textMessageData) {
            return NextResponse.json({ status: 'ignored', reason: 'no_text_content' });
        }

        const chatId = senderData.chatId;
        const senderName = senderData.senderName;
        const incomingMsg = messageData.textMessageData.textMessage;

        console.log(`Msg from ${senderName} (${chatId}): ${incomingMsg}`);

        const msg = incomingMsg.trim().toLowerCase();
        let responseText = '';

        // --- BOT LOGIC (Migrated from Twilio) ---

        // AI-Powered Mode
        if (msg.length > 15 && !['1', '2', '3', '4', 'hi', 'hello', 'start', 'help', 'menu'].includes(msg) && !['a', 'b', 'c', 'd'].includes(msg)) {
            try {
                const aiResponse = await generateCareerReply({
                    messages: [{ role: 'user', content: incomingMsg }],
                    context: 'WhatsApp bot for Sierra Leone career guidance'
                });
                responseText = `🤖 *CareerPilot AI*\n\n${aiResponse.text}\n\n_Reply "menu" for options_`;
            } catch (error) {
                console.error('AI failed:', error);
                responseText = `⚠️ *Bot kin bizi naw* (Bot is busy now)\n\nTry again or reply "menu" for options.`;
            }
        }
        // Menu & Commands
        else if (msg.includes('hi') || msg.includes('hello') || msg.includes('start') || msg === 'menu') {
            responseText = `*👋 Welkom to CareerPilot Salone!*

🇸🇱 _Wi de ya fo elp yu!_ (We're here to help you!)

*Wetin yu want do?* (What would you like to do?)

1️⃣ *Fain Work Path* (Find Career)
2️⃣ *Scholarship Den* (Scholarships)
3️⃣ *CV Tips*
4️⃣ *Ask AI Anytin* (Ask AI Anything)

_Reply wit number or just ask a question!_`;
        }
        else if (msg === '1') {
            responseText = `*🚀 Diskova Yu Wok* (Discover Your Career)

*Wetin subject yu lɛk?* (What subjects do you like?)

A. Math & Science
B. Arts & Business  
C. Technology
D. Medicine & Health

_Reply A, B, C, or D_`;
        }
        else if (msg === '2') {
            responseText = `*🎓 Scholarship fo Yu* (Scholarships for You)

*Fresh Scholarships:*
✅ Sierra Leone Government Grant
✅ Commonwealth Scholarship (UK)
✅ Chinese Gov Scholarship
✅ Mastercard Foundation

🔗 Si ol details: careerpilot-salone.vercel.app/scholarships

_Wetin scholarship yu want know?_ (What scholarship info do you need?)`;
        }
        else if (msg === '3') {
            responseText = `*📄 CV Tips fo Mek Yu Shine*

✨ *Quick Tips:*
• Keep am under 2 pages
• Use bullet points
• Show wetin yu don do, no just duties
• Add skills wae relevant
• Yu email dem must professional

🔗 *Build yu CV:* careerpilot-salone.vercel.app/cv-builder

_Ask mi anytin bout CV!_`;
        }
        else if (msg === '4') {
            responseText = `*🤖 AI Career Advisor Ready!*

Just ask mi anytin bout:
• Career paths in Salone
• Salaries fo different jobs
• University requirements  
• Skills yu need learn
• How fo get wok

_Example: "Wetin i de tek fo bi nurse?"_

🇸🇱 Go ahead, ask!`;
        }
        else if (['a', 'b', 'c', 'd'].includes(msg)) {
            const careerMap: Record<string, string> = {
                'a': 'Math & Science paths: Engineering, Medicine, Teaching, Data Science',
                'b': 'Arts & Business: Banking, Marketing, HR, Business Management',
                'c': 'Technology: Software Development, IT Support, Web Design',
                'd': 'Medicine: Doctor, Nurse, Pharmacist, Lab Technician'
            };
            responseText = `*✨ Perfect!*

*Wok fo yu:* ${careerMap[msg]}

🔗 *Si ful details:* careerpilot-salone.vercel.app/careers

_Want personalized roadmap? Ask AI!_
Example: _"How do I become a software engineer in Freetown?"_`;
        }
        else {
            responseText = `*🤔 A no unda* (I don't understand)

*Reply wit:*
1️⃣ *Fain Career*
2️⃣ *Scholarships*
3️⃣ *CV Tips*  
4️⃣ *Ask AI*

_Or just ask a question!_
Example: _"What is the salary for a teacher?"_

🇸🇱 *Wi de ya fo elp!*`;
        }

        // Send Response via GreenAPI
        if (responseText) {
            await sendWhatsAppMessage(chatId, responseText);
        }

        return NextResponse.json({ status: 'success' });

    } catch (error) {
        console.error("Error processing GreenAPI webhook:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    return NextResponse.json({
        message: 'CareerPilot GreenAPI Bot Active',
        status: 'ready',
        provider: 'GreenAPI'
    });
}
