"use client"

import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Bot, MessageCircle, Send, User, Sparkles, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export default function GuidancePage() {
  const { profile } = useAuth();
  const router = useRouter();

  const isProfileComplete = profile.fullName && profile.careerGoal && profile.educationLevel;

  const chatBody = useMemo(() => ({ userProfile: profile }), [profile]);

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
    "How to find a job in Salone?",
    "Universities for Tech",
    "How to build a CV?",
    "Scholarships available"
  ];

  const handleQuickAction = (action: string) => {
    if (append) {
      append({ role: 'user', content: action });
    }
  };



  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-14rem)] md:h-[calc(100vh-12rem)] max-w-5xl mx-auto md:pb-0 space-y-6">

        {/* PREMIUM HERO HEADER - Green-Blue Theme */}
        <section className="rounded-[2.5rem] bg-white border border-slate-100 p-8 md:p-12 space-y-4 shadow-sm">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#0B1F3A] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Link>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              <Bot className="w-8 h-8 text-[#1E5EFF]" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-[#0B1F3A] tracking-tight">AI Career <span className="text-gradient-salone">Mentor</span></h1>
              <p className="text-sm text-slate-500 font-medium">Personalized coaching for the Sierra Leonean professional landscape.</p>
            </div>
          </div>
        </section>

        {/* Chat Container */}
        <div className="flex-1 bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden">

          {/* Header Bar */}
          <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm text-[#1E5EFF]">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="font-black text-[#0B1F3A] text-sm uppercase tracking-tight">CareerPilot Assistant</div>
                <div className="text-[10px] text-[#1FA774] font-black flex items-center gap-1 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1FA774] animate-pulse" /> Live Now
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E5EFF]" />
              <span className="text-[9px] font-black text-[#1E5EFF] uppercase tracking-widest">Secure Session</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-slate-50">

            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-6 opacity-40">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
                  <MessageCircle className="w-10 h-10 text-slate-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-[#0B1F3A] text-lg uppercase tracking-tight">Kusheh {profile.fullName?.split(' ')[0] || "Scholar"}!</h3>
                  <p className="text-sm font-medium text-slate-400">Your profile is synced. What's on your mind today?</p>
                </div>
              </div>
            )}

            {messages.map((m: any) => (
              <div
                key={m.id}
                className={cn(
                  "flex w-full mb-2 animate-in fade-in slide-in-from-bottom-4 duration-500",
                  m.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "flex max-w-[85%] sm:max-w-[80%] items-start gap-3",
                  m.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}>
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-md mt-1",
                    m.role === 'user' ? "bg-[#1E5EFF]" : "bg-[#0B1F3A]"
                  )}>
                    {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div
                    className={cn(
                      "px-6 py-4 text-sm font-medium leading-relaxed shadow-sm font-sans",
                      m.role === 'user'
                        ? "bg-slate-100 text-[#0B1F3A] rounded-[1.8rem] rounded-tr-none"
                        : "bg-blue-50/50 text-[#0B1F3A] rounded-[1.8rem] rounded-tl-none border border-blue-100/50"
                    )}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex w-full justify-start mb-4 animate-in fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0B1F3A] flex items-center justify-center shrink-0 text-white shadow-md mt-1">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="bg-white rounded-[1.8rem] rounded-tl-none px-6 py-5 border border-slate-100 shadow-sm">
                    <div className="flex gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-bounce"></span>
                    </div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-slate-100">
            {/* Quick Actions */}
            {(!messages.length || messages[messages.length - 1].role !== 'user') && (
              <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickAction(action)}
                    className="whitespace-nowrap px-5 py-2.5 rounded-full bg-slate-50 hover:bg-[#1E5EFF]/5 text-xs font-bold font-sans text-[#0B1F3A] transition-all border border-slate-200 hover:border-[#1E5EFF]/20 shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-3 relative max-w-4xl mx-auto">
              <input
                className="flex-1 px-8 py-5 rounded-3xl bg-slate-50 border border-slate-100 focus:border-[#1E5EFF]/30 focus:ring-0 outline-none text-base transition-all font-sans placeholder:text-slate-400 shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
                value={input}
                onChange={handleInputChange}
                placeholder="Wetin you wan for know about jobs na Salone?"
                autoComplete="off"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-2xl w-14 h-14 shrink-0 bg-[#1FA774] hover:bg-[#1E5EFF] shadow-xl transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!input?.trim() || isLoading}
              >
                <Send className="w-6 h-6 text-white" />
              </Button>
            </form>
            <p className="text-center mt-4 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
              Secured by CareerPilot Privacy Shield &bull; Sierra Leone Standard
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout >
  )
}
