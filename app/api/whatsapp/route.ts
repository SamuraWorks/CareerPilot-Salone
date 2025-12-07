
import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { generateCareerReply } from '@/lib/ai/geminiClient';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

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

        // AI-Powered Mode: If message looks like a question or career query
        if (msg.length > 15 && !['1', '2', '3', '4', 'hi', 'hello', 'start', 'help'].includes(msg)) {
            try {
                // Use AI to respond intelligently
                const aiResponse = await generateCareerReply({
                    messages: [{ role: 'user', content: incomingMsg }],
                    context: 'WhatsApp bot for Sierra Leone career guidance'
                });

                twiml.message(`🤖 *CareerPilot AI*\n\n${aiResponse.text}\n\n_Reply "menu" for options_`);
            } catch (error) {
                console.error('AI failed, using fallback:', error);
                twiml.message(`⚠️ *Bot kin bizi naw* (Bot is busy now)\n\nTry again or reply "menu" for options.`);
            }
        }
        // Menu-based responses (Krio enhanced)
        else if (msg.includes('hi') || msg.includes('hello') || msg.includes('start') || msg === 'menu') {
            twiml.message(`*👋 Welkom to CareerPilot Salone!*

🇸🇱 _Wi de ya fo elp yu!_ (We're here to help you!)

*Wetin yu want do?* (What would you like to do?)

1️⃣ *Fain Work Path* (Find Career)
2️⃣ *Scholarship Den* (Scholarships)
3️⃣ *CV Tips*
4️⃣ *Ask AI Anytin* (Ask AI Anything)

_Reply wit number or just ask a question!_`);
        }
        else if (msg === '1') {
            twiml.message(`*🚀 Diskova Yu Wok* (Discover Your Career)

*Wetin subject yu lɛk?* (What subjects do you like?)

A. Math & Science
B. Arts & Business  
C. Technology
D. Medicine & Health

_Reply A, B, C, or D_`);
        }
        else if (msg === '2') {
            twiml.message(`*🎓 Scholarship fo Yu* (Scholarships for You)

*Fresh Scholarships:*
✅ Sierra Leone Government Grant
✅ Commonwealth Scholarship (UK)
✅ Chinese Gov Scholarship
✅ Mastercard Foundation

🔗 Si ol details: careerpilot-salone.vercel.app/scholarships

_Wetin scholarship yu want know?_ (What scholarship info do you need?)`);
        }
        else if (msg === '3') {
            twiml.message(`*📄 CV Tips fo Mek Yu Shine*

✨ *Quick Tips:*
• Keep am under 2 pages
• Use bullet points
• Show wetin yu don do, no just duties
• Add skills wae relevant
• Yu email dem must professional

🔗 *Build yu CV:* careerpilot-salone.vercel.app/cv-builder

_Ask mi anytin bout CV!_`);
        }
        else if (msg === '4') {
            twiml.message(`*🤖 AI Career Advisor Ready!*

Just ask mi anytin bout:
• Career paths in Salone
• Salaries fo different jobs
• University requirements  
• Skills yu need learn
• How fo get wok

_Example: "Wetin i de tek fo bi nurse?"_

🇸🇱 Go ahead, ask!`);
        }
        // Handle subject choices
        else if (['a', 'b', 'c', 'd'].includes(msg)) {
            const careerMap: Record<string, string> = {
                'a': 'Math & Science paths: Engineering, Medicine, Teaching, Data Science',
                'b': 'Arts & Business: Banking, Marketing, HR, Business Management',
                'c': 'Technology: Software Development, IT Support, Web Design',
                'd': 'Medicine: Doctor, Nurse, Pharmacist, Lab Technician'
            };
            twiml.message(`*✨ Perfect!*

*Wok fo yu:* ${careerMap[msg]}

🔗 *Si ful details:* careerpilot-salone.vercel.app/careers

_Want personalized roadmap? Ask AI!_
Example: _"How do I become a software engineer in Freetown?"_`);
        }
        else {
            // Default Fallback with Krio
            twiml.message(`*🤔 A no unda* (I don't understand)

*Reply wit:*
1️⃣ *Fain Career*
2️⃣ *Scholarships*
3️⃣ *CV Tips*  
4️⃣ *Ask AI*

_Or just ask a question!_
Example: _"What is the salary for a teacher?"_

🇸🇱 *Wi de ya fo elp!*`);
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
    return NextResponse.json({
        message: 'CareerPilot WhatsApp Bot Active',
        status: 'ready',
        features: ['AI responses', 'Krio language', 'Career guidance']
    });
}
