"use client"

import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Bot, MessageCircle, Send, User, Sparkles, ArrowLeft } from 'lucide-react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default function AIChatPage() {
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem("userOnboarding");
                if (stored) setUserProfile(JSON.parse(stored));
            } catch (e) {
                console.error("Error parsing user profile:", e);
            }
        }
    }, []);

    // Memoize body to prevent useChat from re-initializing on every render
    const chatBody = useMemo(() => ({ userProfile }), [userProfile]);

    const {
        messages = [],
        input,
        handleInputChange,
        handleSubmit,
        setInput,
        isLoading = false,
        append
    } = (useChat as any)({
        api: '/api/assistant',
        body: chatBody,
        onFinish: () => console.log("Guidance chat finished"),
        onError: (err: any) => console.error("Guidance chat error:", err)
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const quickActions = [
        "Compare careers",
        "Next steps",
        "Learning resources",
        "Job opportunities"
    ];

    const handleQuickAction = (action: string) => {
        if (append) {
            append({ role: 'user', content: action });
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const message = input;
        if (!message?.trim() || isLoading) return;

        // Clear input immediately for better UX
        setInput('');

        try {
            console.log("Sending guidance via append:", message);
            append({ role: 'user', content: message });
        } catch (err) {
            console.error("Error sending guidance message:", err);
            // Fallback: restore input
            setInput(message);
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col h-[calc(100vh-14rem)] md:h-[calc(100vh-12rem)] max-w-5xl mx-auto md:pb-0 space-y-6">

                {/* PREMIUM HERO HEADER */}
                <section className="relative rounded-[2.5rem] overflow-hidden bg-[#0B1F3A] min-h-[220px] flex items-center shadow-2xl group shrink-0">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/dashboard/salone_success.png"
                            alt="AI Guidance"
                            fill
                            className="object-cover opacity-30 transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/60 to-transparent z-10" />
                    </div>

                    <div className="relative z-20 p-8 md:p-12 space-y-4">
                        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#1FA774] hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Go Back
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#1FA774]/20 flex items-center justify-center text-[#1FA774] border border-[#1FA774]/20">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight">AI Career <span className="text-[#F4C430]">Mentor</span></h1>
                                <p className="text-sm text-slate-400 font-medium">Built for the Sierra Leonean professional landscape.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Chat Container */}
                <div className="flex-1 bg-white border border-slate-200 rounded-[2rem] shadow-sm flex flex-col overflow-hidden">

                    {/* Header Bar */}
                    <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                            <Bot className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 text-sm">CareerPilot Assistant</div>
                            <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4 opacity-50">
                                <Bot className="w-12 h-12 text-slate-300" />
                                <p className="text-sm font-medium text-slate-400">Type a message below to start chatting</p>
                            </div>
                        )}

                        {messages.map((m: any) => (
                            <div
                                key={m.id}
                                className={cn(
                                    "flex w-full mb-4 animate-in fade-in slide-in-from-bottom-2",
                                    m.role === 'user' ? "justify-end" : "justify-start"
                                )}
                            >
                                <div className={cn(
                                    "flex max-w-[85%] sm:max-w-[75%] items-end gap-2",
                                    m.role === 'user' ? "flex-row-reverse" : "flex-row"
                                )}>
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white",
                                        m.role === 'user' ? "bg-slate-900" : "bg-blue-600"
                                    )}>
                                        {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>
                                    <div
                                        className={cn(
                                            "px-5 py-3.5 text-sm font-medium leading-relaxed shadow-sm font-inter",
                                            m.role === 'user'
                                                ? "bg-slate-900 text-white rounded-[1.5rem] rounded-br-none"
                                                : "bg-[#F0F2F5] text-slate-900 rounded-[1.5rem] rounded-bl-none"
                                        )}
                                    >
                                        <div className="whitespace-pre-wrap">{m.content}</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex w-full justify-start mb-4">
                                <div className="flex items-end gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="bg-[#F0F2F5] rounded-[1.5rem] rounded-bl-none px-5 py-4 border border-slate-100 shadow-sm">
                                        <div className="flex gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-slate-100">
                        {/* Quick Actions (Only show if empty or last message was bot) */}
                        {(!messages.length || messages[messages.length - 1].role !== 'user') && (
                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                                {quickActions.map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleQuickAction(action)}
                                        className="whitespace-nowrap px-4 py-2 rounded-full bg-slate-50 hover:bg-slate-100 text-xs font-bold font-poppins text-slate-600 transition-colors border border-slate-200"
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="flex gap-2">
                            <input
                                className="flex-1 px-5 py-3.5 rounded-full bg-slate-50 border border-slate-200 focus:border-slate-300 focus:ring-0 outline-none text-sm transition-all font-inter placeholder:text-slate-400"
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Type your message..."
                                autoComplete="off"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="rounded-full w-12 h-12 shrink-0 bg-[#1F7A4D] hover:bg-[#16643d] shadow-md transition-all"
                                disabled={!input?.trim() || isLoading}
                            >
                                <Send className="w-5 h-5 text-white" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
