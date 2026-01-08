"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Sparkles, AlertCircle, RefreshCcw, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

type ChatStep = 'intro' | 'education' | 'skills' | 'interests' | 'goals' | 'complete';

import { useAuth } from "@/lib/auth-context";

export default function GuidancePage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<ChatStep>('intro');

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial Message
  useEffect(() => {
    const saved = localStorage.getItem("career_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          setMessages(parsed);
          setStep('complete');
          return;
        }
      } catch (e) { console.error("Failed to parse chat history"); }
    }

    const onboarding = localStorage.getItem("userOnboarding");
    if (onboarding) {
      try {
        const profile = JSON.parse(onboarding);
        const autoGreeting: Message = {
          id: 'welcome-onboard',
          role: 'assistant',
          content: `Kusheh! I see you've already set up your profile as a **${profile.educationLevel}** in **${profile.location || 'Salone'}**. 
          
I'm ready to help you find the best careers in Sierra Leone! Should we jump straight into recommendations, or do you have a specific question about your career path?`
        };
        setMessages([autoGreeting]);
        setStep('goals');
        return;
      } catch (e) { console.error("Onboarding parse failed"); }
    }

    const welcomeMsg: Message = {
      id: 'welcome',
      role: 'assistant',
      content: "Kusheh! I’m CareerPilot AI, your personal counselor for the Sierra Leonean job market. 🇸🇱\n\nI’ll help you choose a career based on your interests and the real opportunities available here.\n\nTo get started, what is your current education level? (e.g. BECE, WASSCE, University student, or Graduate)"
    };
    setMessages([welcomeMsg]);
    setStep('education');
  }, []);

  // Save to localStorage & Auto-scroll
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("career_chat_history", JSON.stringify(messages));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getNextPrompt = (currentStep: ChatStep) => {
    switch (currentStep) {
      case 'education': return "Excellent. What subjects were you best at, or what skills do you already have? (e.g., Mathematics, Writing, Fixing things)";
      case 'skills': return "Interesting! Now, wetin you lek for do? (What are your main interests or hobbies?)";
      case 'interests': return "Almost there! What is your biggest dream or career goal right now in Salone?";
      case 'goals': return "Tenki! I'm analyzing your profile now to search for the best matches in our local universities and job market...";
      default: return "";
    }
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const nextStepMap: Record<ChatStep, ChatStep> = {
      'intro': 'education',
      'education': 'skills',
      'skills': 'interests',
      'interests': 'goals',
      'goals': 'complete',
      'complete': 'complete'
    };

    const nextStep = nextStepMap[step];

    try {
      if (nextStep !== 'complete') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: getNextPrompt(step)
        };
        setMessages(prev => [...prev, aiMsg]);
        setStep(nextStep);
      } else {
        const { generateChatResponse } = await import('@/lib/local-ai');
        const reply = await generateChatResponse([...messages, userMsg], "Guidance Page", true);

        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: reply
        };
        setMessages(prev => [...prev, aiMsg]);
        setStep('complete');
        toast.success("Guidance generated successfully!");
      }
    } catch (err: any) {
      toast.error("Connection error");
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const clearChat = () => {
    if (confirm("Reset conversation?")) {
      setMessages([]);
      localStorage.removeItem("career_chat_history");
      setStep('intro');
      window.location.reload();
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto w-full md:pb-0 space-y-6">

        {/* COMPACT PREMIUM HERO HEADER - Green-Blue Theme */}
        <section className="relative rounded-[2.5rem] overflow-hidden bg-[#0B1F3A] min-h-[180px] flex items-center shadow-xl group shrink-0">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/dashboard/salone_success.png"
              alt="AI Counselor"
              fill
              className="object-cover opacity-20 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#1E5EFF]/40 to-transparent z-10" />
          </div>

          <div className="relative z-20 max-w-4xl p-8 md:p-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1FA774]/10 border border-[#1FA774]/20 rounded-full backdrop-blur-md">
              <Bot className="w-3 h-3 text-[#4ADE80]" />
              <span className="text-[#4ADE80] font-bold text-[10px] uppercase tracking-widest">AI Expert Mentorship</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight font-poppins">
              AI <span className="text-gradient-salone brightness-150">Counselor</span>
            </h1>
            <p className="text-sm text-slate-300 font-medium font-inter max-w-xl">
              Get realistic, step-by-step guidance for the Sierra Leonean market.
            </p>
          </div>
        </section>

        <div className="flex-1 flex flex-col bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border border-slate-100 min-h-0">

          {/* CHAT HEADER */}
          <div className="flex items-center justify-between p-5 border-b bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E5EFF] to-[#1FA774] flex items-center justify-center text-white shadow-md">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-black text-sm text-[#0B1F3A] uppercase tracking-tighter">AI Mentor Session</h2>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Guidance</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={clearChat} className="text-slate-400 hover:text-[#1E5EFF] hover:bg-blue-50 rounded-full transition-all">
                <RefreshCcw className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* MESSAGES */}
          <ScrollArea className="flex-1 p-6 bg-[#fcfdfe]" ref={scrollRef}>
            <div className="space-y-8 max-w-3xl mx-auto">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500", m.role === 'user' ? 'flex-row-reverse' : '')}>
                  <div className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm mt-1 transition-transform hover:scale-110",
                    m.role === 'assistant' ? 'bg-[#0B1F3A] text-[#4ADE80]' : 'bg-[#1E5EFF] text-white'
                  )}>
                    {m.role === 'assistant' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                  </div>

                  <div className={cn(
                    "max-w-[85%] rounded-[2rem] px-6 py-4 shadow-sm border text-sm font-medium leading-relaxed font-inter",
                    m.role === 'user'
                      ? 'bg-[#1E5EFF] text-white rounded-tr-none border-blue-600/10'
                      : 'bg-white text-slate-700 rounded-tl-none border-slate-100'
                  )}>
                    <div className="whitespace-pre-wrap">
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 animate-in fade-in">
                  <div className="w-10 h-10 rounded-2xl bg-[#0B1F3A] flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-6 h-6 text-[#4ADE80]" />
                  </div>
                  <div className="bg-white border border-slate-100 rounded-[2rem] rounded-tl-none px-6 py-4 flex flex-col gap-2">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2 h-2 bg-[#1FA774] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-[#1FA774] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-[#1FA774] rounded-full animate-bounce"></span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* INPUT */}
          <div className="p-6 bg-white border-t border-slate-100">
            <form
              className="flex gap-3 relative max-w-3xl mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={step === 'complete' ? "Ask a follow-up question..." : "Type your answer here..."}
                disabled={isLoading}
                className="flex-1 pr-16 h-14 text-base rounded-2xl shadow-inner border-slate-100 focus-visible:ring-[#1E5EFF]/20 bg-slate-50 font-medium"
              />

              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 h-10 w-10 rounded-xl shadow-lg bg-[#1E5EFF] hover:bg-[#1E5EFF]/90 text-white transition-all active:scale-90"
              >
                {isLoading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
              </Button>
            </form>
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 opacity-40">
                <CheckCircle2 className="w-3 h-3 text-[#1FA774]" />
                <span className="text-[9px] font-black uppercase tracking-[0.15em]">Verified Local Data</span>
              </div>
              <div className="w-px h-3 bg-slate-200" />
              <div className="flex items-center gap-1.5 opacity-40">
                <Lock className="w-3 h-3 text-[#1E5EFF]" />
                <span className="text-[9px] font-black uppercase tracking-[0.15em]">Private Session</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
