"use client"

import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Bot, MessageCircle, Send, User } from 'lucide-react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { cn } from '@/lib/utils'

export default function AIChatPage() {
    const chat = (useChat as any)({
        api: '/api/assistant',
        body: {
            userProfile: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("userOnboarding") || '{}') : {}
        }
    });

    const {
        messages = [],
        input = '',
        handleInputChange,
        handleSubmit,
        isLoading,
        setInput,
        append
    } = chat;

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
        } else {
            setInput(action);
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)] max-w-4xl mx-auto md:pb-0">

                {/* Header */}
                <div className="text-center space-y-2 mb-6">
                    <h1 className="text-3xl font-bold font-poppins text-gradient-salone tracking-tight">AI Career Guidance</h1>
                    <p className="text-sm text-slate-500 font-inter">Ask me anything about careers in Sierra Leone</p>
                </div>

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

                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                className="flex-1 px-5 py-3.5 rounded-full bg-slate-50 border border-slate-200 focus:border-slate-300 focus:ring-0 outline-none text-sm transition-all font-inter placeholder:text-slate-400"
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Type your message..."
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
