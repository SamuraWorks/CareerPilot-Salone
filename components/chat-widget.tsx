"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bot, MessageCircle, X, Send, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

const careerKnowledge: Record<string, string> = {
    "job": `Here are effective ways to find jobs in Sierra Leone:

1. **Online Job Portals**
   - Sierra Leone Jobs (sierraleonejobs.com)
   - Jobsearch SL
   - LinkedIn Jobs

2. **Government Opportunities**
   - National Civil Service
   - Ministry announcements
   - District Council positions

3. **NGO & International Organizations**
   - UN agencies (WFP, UNICEF, UNDP)
   - World Bank projects
   - International NGOs (Save the Children, CARE)

4. **Networking**
   - Attend career fairs in Freetown
   - Join professional associations
   - Connect with alumni networks

5. **Direct Applications**
   - Visit company offices in Freetown
   - Apply to banks (Rokel, Sierra Leone Commercial Bank)
   - Contact telecommunications companies (Orange, Africell)`,

    "university": `Top Universities and Institutions in Sierra Leone:

**For Technology & Engineering:**
- University of Sierra Leone (Fourah Bay College) - Computer Science
- IPAM (Institute of Public Administration and Management)
- Njala University - Engineering programs
- DSTI (Directorate of Science, Technology & Innovation) - Tech training

**For Business & Management:**
- IPAM - Business Administration
- Limkokwing University - Business programs
- University of Makeni - Commerce

**For Healthcare:**
- College of Medicine and Allied Health Sciences (COMAHS)
- School of Nursing, Freetown

**For Education:**
- Freetown Teachers College
- Milton Margai College of Education
- Eastern Polytechnic`,

    "cv": `How to Build a Strong CV for Sierra Leone Job Market:

1. **Personal Information**
   - Full name, phone number, email
   - Location (city/district)
   - Professional photo (optional but recommended)

2. **Professional Summary**
   - 2-3 sentences about your career goals
   - Highlight key strengths

3. **Education**
   - Start with most recent qualification
   - Include WASSCE results if recent graduate
   - List any certifications

4. **Work Experience**
   - Use action verbs (managed, developed, implemented)
   - Include volunteer work and internships
   - Quantify achievements when possible

5. **Skills**
   - Technical skills (computer literacy, software)
   - Languages (English, Krio, Mende, Temne, etc.)
   - Soft skills (communication, teamwork)

**Pro Tips:**
- Keep it to 2 pages maximum
- Use professional font (Arial, Calibri)
- Proofread carefully
- Use our CV Builder tool!`,

    "scholarship": `Scholarship Opportunities for Sierra Leoneans:

**International Scholarships:**
- Chevening Scholarships (UK) - Masters programs
- Fulbright Program (USA) - Graduate studies
- DAAD Scholarships (Germany)
- Commonwealth Scholarships
- African Leadership University Scholarships

**Local Scholarships:**
- Government Scholarships through Ministry of Education
- Bank Scholarships (Rokel, EcoBank)
- Telecoms Scholarships (Orange Foundation)
- NGO-sponsored education programs

**How to Apply:**
1. Maintain strong academic records
2. Develop leadership experience
3. Write compelling personal statements
4. Get strong recommendation letters
5. Apply early - deadlines matter!

**Resources:**
- opportunitiesforafricans.com
- scholars4dev.com
- Ministry of Education announcements`,

    "teaching": `Career Path in Education/Teaching in Sierra Leone:

**Qualifications Needed:**
- Teachers Certificate (TC)
- Higher Teachers Certificate (HTC)
- Bachelor of Education (B.Ed)

**Where to Study:**
- Freetown Teachers College
- Milton Margai College of Education
- Eastern Polytechnic
- Njala University

**Career Progression:**
1. Student Teacher (during training)
2. Assistant Teacher
3. Classroom Teacher
4. Senior Teacher
5. Head of Department
6. Vice Principal
7. Principal/Headmaster

**Employment Opportunities:**
- Government schools (TSC registration required)
- Private schools
- International schools
- NGO education programs
- Adult literacy programs`,

    "healthcare": `Healthcare Career Paths in Sierra Leone:

**Nursing:**
- Train at COMAHS or School of Nursing
- Register with Nurses and Midwives Board
- Work in hospitals, clinics, or community health

**Medicine:**
- Study at College of Medicine (COMAHS)
- Complete internship at government hospital
- Specialize or work as general practitioner

**Other Healthcare Careers:**
- Pharmacy Technician
- Laboratory Technician
- Community Health Worker
- Public Health Officer
- Environmental Health Officer

**Major Employers:**
- Ministry of Health hospitals
- Private clinics and hospitals
- NGO health programs
- International organizations (WHO, MSF)`,

    "business": `Starting and Growing a Business in Sierra Leone:

**Steps to Start:**
1. Register with OARG (Office of Administrator and Registrar General)
2. Get NRA tax registration
3. Open business bank account
4. Obtain necessary licenses

**Popular Business Opportunities:**
- Agriculture and agribusiness
- Retail and wholesale trade
- Transportation services
- Food processing
- Construction
- ICT services
- Tourism and hospitality

**Support Resources:**
- Sierra Leone Investment and Export Promotion Agency (SLIEPA)
- Small and Medium Enterprises Development Agency (SMEDA)
- Bank loans and microfinance
- NGO business training programs

**Tips for Success:**
- Start small, grow gradually
- Build strong customer relationships
- Keep proper financial records
- Network with other entrepreneurs`,

    "default": `I'm your CareerPilot AI Mentor, here to help Sierra Leonean youth navigate their career journey!

I can help you with:
- **Finding Jobs** - Local and international opportunities
- **Education Paths** - Universities, colleges, and training programs
- **CV Building** - Creating professional CVs that stand out
- **Scholarships** - Funding for your education
- **Career Guidance** - Choosing the right path for you
- **Business Advice** - Starting your own enterprise

What would you like to know more about? Feel free to ask me anything about careers, education, or professional development in Sierra Leone!`
};

export function ChatWidget() {
    const { profile, user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (content: string) => {
        const userMsg: Message = { id: Date.now().toString(), role: "user", content };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
                    userProfile: profile
                })
            });

            if (!response.ok) throw new Error('Failed to get response');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let aiContent = "";

            if (reader) {
                const aiMsgId = (Date.now() + 1).toString();
                setMessages(prev => [...prev, { id: aiMsgId, role: "assistant", content: "" }]);

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    // Handle Vercel AI SDK wire protocol (0:"text")
                    const matches = chunk.matchAll(/0:"([^"]*)"/g);
                    for (const match of matches) {
                        const text = match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
                        aiContent += text;
                        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: aiContent } : m));
                    }
                }
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "assistant",
                content: "⚠️ *System Offline*: ah nor able for reach de AI Nexus right now. Please check your data connection."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    useEffect(() => {
        const handleOpen = (e: any) => {
            setIsOpen(true);
            if (e.detail?.initialMessage) {
                handleSendMessage(e.detail.initialMessage);
            }
        };
        window.addEventListener('openCareerAdvisor', handleOpen);
        return () => window.removeEventListener('openCareerAdvisor', handleOpen);
    }, [messages]);

    // 1. Path & Auth Guard
    const pathname = usePathname();
    if (pathname !== '/dashboard') {
        return null;
    }

    if (!user && !profile.id) {
        return null;
    }

    // Only show if the user has a professional goal set
    if (!profile.career_goal) {
        return null;
    }

    const isProfileComplete = profile.full_name && profile.career_goal;


    const quickActions = [
        { label: "Compare careers", icon: MessageCircle },
        { label: "Next steps", icon: MessageCircle },
        { label: "Learning resources", icon: MessageCircle },
        { label: "Job opportunities", icon: MessageCircle },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        const content = input.trim();
        setInput("");
        handleSendMessage(content);
    };

    const handleQuickAction = (action: string) => {
        handleSendMessage(action);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4"
                    >
                        <Card className="w-full sm:w-[350px] md:w-[400px] h-[100dvh] sm:h-[550px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col border-none sm:border-slate-100 dark:sm:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden sm:rounded-[2rem] fixed inset-0 sm:relative sm:inset-auto z-[110] sm:z-auto">
                            {/* Header */}
                            <div className="p-4 sm:p-5 bg-slate-900 text-white flex justify-between items-center shrink-0 safe-area-inset-top">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="font-black text-[12px] sm:text-sm uppercase tracking-widest">Career Advisor</div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Decision Support Active</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 bg-slate-50/50 dark:bg-slate-900/50 relative">
                                {!isProfileComplete && (
                                    <div className="bg-amber-50/50 border border-amber-100/50 p-3 sm:p-4 rounded-[1.2rem] sm:rounded-[1.5rem] mb-4 flex items-center gap-3 backdrop-blur-sm">
                                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
                                        <p className="text-[9px] sm:text-[10px] text-amber-900 font-black uppercase tracking-[0.1em] italic leading-tight">
                                            Limited Mode: Neural precision is reduced. Complete profile initialization.
                                        </p>
                                    </div>
                                )}

                                {messages.length === 0 && (
                                    <div className="flex-1 flex items-center justify-center p-8 text-center opacity-40">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] italic">
                                            Awaiting Input Profile Synthesis...
                                        </p>
                                    </div>
                                )}
                                {messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-400 ease-out`}
                                    >
                                        <div
                                            className={`max-w-[90%] sm:max-w-[85%] rounded-[1.5rem] sm:rounded-[1.8rem] px-5 py-3.5 sm:px-6 sm:py-4 text-xs sm:text-sm shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] font-semibold leading-relaxed italic ${m.role === 'user'
                                                ? 'bg-gradient-to-br from-[#0B1F3A] to-[#1E5EFF] text-white rounded-br-none'
                                                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100/50 dark:border-slate-700'
                                                }`}
                                        >
                                            <div className="whitespace-pre-wrap">{m.content}</div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white dark:bg-slate-800 rounded-xl px-4 py-3 rounded-tl-none border border-slate-100/50 shadow-sm">
                                            <div className="flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 sm:p-5 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shrink-0 space-y-4 safe-area-inset-bottom">
                                {/* Quick Action Chips */}
                                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide no-scrollbar -mx-1 px-1">
                                    {quickActions.map((action, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleQuickAction(action.label)}
                                            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500 transition-colors border border-slate-100 shrink-0"
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>

                                <form onSubmit={handleSubmit} className="flex gap-2">
                                    <input
                                        className="flex-1 px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-[#1E5EFF]/10 outline-none text-xs sm:text-sm transition-all font-medium"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type your question..."
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        className="rounded-xl sm:rounded-2xl w-11 h-11 sm:w-12 sm:h-12 shrink-0 bg-[#0B1F3A] hover:bg-slate-800 shadow-lg disabled:opacity-50"
                                        disabled={!input?.trim() || isLoading}
                                    >
                                        <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </Button>
                                </form>
                                <div className="text-[8px] sm:text-[9px] text-center text-slate-400 font-bold uppercase tracking-[0.2em]">
                                    Professional Career Advisor
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1, rotate: isOpen ? 0 : 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`h-16 w-16 sm:h-20 sm:w-20 rounded-2xl sm:rounded-[2.5rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${isOpen
                    ? 'bg-white text-slate-600 rotate-90 scale-0 sm:scale-100'
                    : 'bg-gradient-to-br from-[#0B1F3A] to-[#1E5EFF] text-white hover:shadow-blue-500/20'
                    }`}
            >
                {isOpen ? <X className="w-6 h-6 sm:w-8 sm:h-8" /> : <Bot className="w-8 h-8 sm:w-10 sm:h-10" />}
            </motion.button>
        </div>
    );
}

