
"use client";

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bot, MessageCircle, X, Send, Loader2, Minimize2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

export function ChatWidget() {
    const { profile } = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const isProfileComplete = profile.fullName && profile.careerGoal && profile.educationLevel;

    const {
        messages = [],
        input,
        handleInputChange,
        handleSubmit,
        setInput,
        isLoading,
        append
    } = (useChat as any)({
        api: '/api/assistant',
        body: { userProfile: profile },
        onFinish: () => {
            console.log("Chat session synced with pulse");
        },
        onError: (err: any) => {
            console.error("Chat subsystem failed:", err);
        }
    });


    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    useEffect(() => {
        const handleOpen = (e: any) => {
            setIsOpen(true);
            if (e.detail?.initialMessage && append) {
                append({ role: 'user', content: e.detail.initialMessage });
            }
        };
        window.addEventListener('openCareerAdvisor', handleOpen);
        return () => window.removeEventListener('openCareerAdvisor', handleOpen);
    }, [append]);

    const quickActions = [
        { label: "Compare careers", icon: MessageCircle },
        { label: "Next steps", icon: MessageCircle },
        { label: "Learning resources", icon: MessageCircle },
        { label: "Job opportunities", icon: MessageCircle },
    ];

    const handleQuickAction = (action: string) => {
        if (append) {
            append({ role: 'user', content: action });
        }
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
                        <Card className="w-[350px] sm:w-[400px] h-[550px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden rounded-[2rem]">
                            {/* Header */}
                            <div className="p-5 bg-slate-900 text-white flex justify-between items-center shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <Bot className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="font-black text-sm uppercase tracking-widest">Career Advisor</div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Decision Support Active</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/50 dark:bg-slate-900/50 relative">
                                {!isProfileComplete && (
                                    <div className="absolute inset-0 z-50 backdrop-blur-md bg-white/60 dark:bg-slate-950/60 flex flex-col items-center justify-center p-8 text-center space-y-6">
                                        <div className="w-16 h-16 rounded-[2rem] bg-[#0B1F3A] flex items-center justify-center text-white shadow-xl">
                                            <AlertCircle className="w-8 h-8 text-blue-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-black text-[#0B1F3A] dark:text-white uppercase tracking-tighter italic">Identity Missing</h3>
                                            <p className="text-sm text-slate-500 font-medium italic">
                                                I cannot provide strategic guidance without knowing your background.
                                            </p>
                                        </div>
                                        <Button
                                            onClick={() => {
                                                setIsOpen(false);
                                                router.push('/onboarding');
                                            }}
                                            className="w-full h-14 bg-[#1FA774] hover:bg-[#1E5EFF] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg"
                                        >
                                            Complete Profile
                                        </Button>
                                    </div>
                                )}

                                {messages.length === 0 && (
                                    <div className="space-y-4 pt-4">
                                        <div className="flex justify-start">
                                            <div className="max-w-[85%] rounded-[1.5rem] rounded-tl-none px-5 py-4 text-sm bg-white border border-slate-100 shadow-sm text-slate-800 font-medium leading-relaxed">
                                                Kusheh {profile.fullName?.split(' ')[0] || "Scholar"}! I’ve reviewed your background. How can I help you advance your career in Salone today?
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {messages.map((m: any) => (
                                    <div
                                        key={m.id}
                                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-[1.5rem] px-5 py-4 text-sm shadow-sm font-medium leading-relaxed ${m.role === 'user'
                                                ? 'bg-[#0B1F3A] text-white rounded-br-none'
                                                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700'
                                                }`}
                                        >
                                            <div className="whitespace-pre-wrap">{m.content}</div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white dark:bg-slate-800 rounded-2xl px-5 py-3 rounded-tl-none border border-slate-100 dark:border-slate-700 shadow-sm">
                                            <div className="flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shrink-0 space-y-4">
                                {/* Quick Action Chips */}
                                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide no-scrollbar">
                                    {quickActions.map((action, i) => (
                                        <button
                                            key={i}
                                            disabled={!isProfileComplete}
                                            onClick={() => handleQuickAction(action.label)}
                                            className="whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 transition-colors border border-slate-100 disabled:opacity-50"
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>

                                <form onSubmit={handleSubmit} className="flex gap-2">
                                    <input
                                        disabled={!isProfileComplete}
                                        className="flex-1 px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-[#1E5EFF]/10 outline-none text-sm transition-all font-medium disabled:opacity-50"
                                        value={input}
                                        onChange={handleInputChange}
                                        placeholder={isProfileComplete ? "Type your question..." : "Complete profile to chat"}
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        className="rounded-2xl w-12 h-12 shrink-0 bg-[#0B1F3A] hover:bg-slate-800 shadow-lg disabled:opacity-50"
                                        disabled={!input?.trim() || isLoading || !isProfileComplete}
                                    >
                                        <Send className="w-5 h-5 text-white" />
                                    </Button>
                                </form>
                                <div className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-[0.2em]">
                                    Professional Career Advisor
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`h-16 w-16 rounded-[2rem] shadow-2xl flex items-center justify-center transition-all focus:outline-none focus:ring-4 focus:ring-slate-900/10 ${isOpen
                    ? 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300 rotate-90'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
            >
                {isOpen ? <X className="w-7 h-7" /> : <Bot className="w-8 h-8" />}
            </motion.button>
        </div>
    );
}
