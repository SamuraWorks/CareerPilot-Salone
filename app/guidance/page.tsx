"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCcw, Trash2, ChevronRight, PlayCircle, ArrowRight, Lock } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SIERRA_LEONE_OPPORTUNITIES } from "@/lib/sierra-leone-opportunities";

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

  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<ChatStep>('intro');
  const [showDemoToggle, setShowDemoToggle] = useState(false);

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
          content: `Hi there! I see you've already set up your profile as a **${profile.educationLevel}** interested in **${profile.interests.join(", ")}**.

I'm ready to help you find the best careers in Sierra Leone! Should we jump straight into recommendations, or do you have a specific question about your career path?`
        };
        setMessages([autoGreeting]);
        setStep('goals'); // Move to a step where they can ask or get final guidance
        return;
      } catch (e) { console.error("Onboarding parse failed"); }
    }

    // Start with a friendly system message if no history or onboarding
    const welcomeMsg: Message = {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I’m CareerPilot AI. I’ll help you choose a career based on your interests, skills, and opportunities in Sierra Leone.\n\nTo get started, what is your current education level? (e.g. BECE, WASSCE, University student, or Graduate)"
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
      case 'education': return "Great! What are your favorite subjects or any specific skills you already have?";
      case 'skills': return "Interesting. What are your main interests? What do you enjoy doing in your free time?";
      case 'interests': return "Almost there! What are your long-term career goals or dreams?";
      case 'goals': return "Perfect! I'm analyzing your profile now to find the best career paths in Sierra Leone...";
      default: return "";
    }
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    // Add User Message
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setError(null);

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
        // Guided flow - simulated AI thinking for UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: getNextPrompt(step)
        };
        setMessages(prev => [...prev, aiMsg]);
        setStep(nextStep);
      } else {
        // Final API Call for recommendations
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
            isFinalGuidance: true,
            userId: user?.id
          })
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();

        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply
        };
        setMessages(prev => [...prev, aiMsg]);
        setStep('complete');

      }
    } catch (err: any) {
      setError("I'm having trouble connecting. Check your internet and try again.");
      toast.error("Connection error");
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Import the database


  const useSampleAiResult = async () => {
    setIsLoading(true);
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Use the robust local-ai logic to generate a comprehensive response
    // We pass the current message history to it.
    const { generateChatResponse } = await import('@/lib/local-ai');

    // Construct a context-aware prompt based on current history if needed, 
    // but generateChatResponse handles history analysis.
    const result = await generateChatResponse(messages, "User is a student or job seeker in Sierra Leone.");

    const aiMsg: Message = {
      id: 'ai-rec-' + Date.now(),
      role: 'assistant',
      content: result
    };
    setMessages(prev => [...prev, aiMsg]);
    setStep('complete');
    setIsLoading(false);
    toast.success("Recommendations generated from Local Database!");
  };

  const clearChat = () => {
    if (confirm("Reset conversation?")) {
      setMessages([]);
      localStorage.removeItem("career_chat_history");
      setStep('intro');
      window.location.reload(); // Quickest way to reset the state machine
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto w-full md:pb-0 space-y-6">

        {/* COMPACT PREMIUM HERO HEADER */}
        <section className="relative rounded-[2.5rem] overflow-hidden bg-[#0B1F3A] min-h-[220px] flex items-center shadow-2xl group shrink-0">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/dashboard/salone_success.png"
              alt="AI Counselor"
              fill
              className="object-cover opacity-30 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/60 to-transparent z-10" />
          </div>

          <div className="relative z-20 max-w-4xl p-10 md:p-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F4C430]/10 border border-[#F4C430]/20 rounded-full backdrop-blur-md">
              <Bot className="w-4 h-4 text-[#F4C430]" />
              <span className="text-[#F4C430] font-bold text-xs uppercase tracking-widest">Expert Guidance</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight font-poppins">
              AI <span className="text-[#F4C430]">Counselor</span>
            </h1>
            <p className="text-base text-slate-300 font-medium font-inter max-w-xl leading-relaxed">
              Plan your career path step-by-step with our intelligent mentor. Optimized for Salone's market.
            </p>
          </div>
        </section>

        <div className="flex-1 flex flex-col bg-[#fdfbf6] shadow-2xl rounded-[2.5rem] overflow-hidden border border-slate-200 min-h-0">

          {/* HEADER */}
          <div className="flex items-center justify-between p-5 border-b bg-white">
            <div className="flex items-center gap-4">
              <div className="relative w-auto h-12 flex items-center">
                <Image
                  src="/logo.png"
                  alt="CareerPilot Logo"
                  width={180}
                  height={52}
                  className="object-contain h-full w-auto"
                />
              </div>
              <div className="w-px h-8 bg-slate-100 mx-1 hidden sm:block" />
              <div className="hidden sm:block">
                <h2 className="font-black text-sm text-[#064e3b] uppercase tracking-tighter opacity-40">AI Counselor</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDemoToggle(!showDemoToggle)}
                className="text-[10px] font-bold opacity-20 hover:opacity-100"
              >
                DEMO
              </Button>
              <Button variant="ghost" size="icon" onClick={clearChat} className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full">
                <RefreshCcw className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* DEMO TOOLBAR */}
          {showDemoToggle && (
            <div className="bg-amber-50 border-b border-amber-100 p-2 flex justify-center animate-in slide-in-from-top duration-300">
              <Button size="sm" variant="outline" className="text-xs border-amber-200 text-amber-700 gap-2 bg-white" onClick={useSampleAiResult}>
                <PlayCircle className="w-4 h-4" /> Run Sample AI Result (Demo Mode)
              </Button>
            </div>
          )}

          {/* MESSAGES */}
          <ScrollArea className="flex-1 p-6 bg-gradient-to-b from-white to-slate-50" ref={scrollRef}>
            <div className="space-y-8 max-w-2xl mx-auto">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500", m.role === 'user' ? 'flex-row-reverse' : '')}>
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm mt-1",
                    m.role === 'assistant' ? 'bg-[#064e3b] text-[#fbbf24]' : 'bg-[#fbbf24] text-[#064e3b]'
                  )}>
                    {m.role === 'assistant' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                  </div>

                  <div className={cn(
                    "max-w-[85%] rounded-3xl px-6 py-4 shadow-sm border",
                    m.role === 'user'
                      ? 'bg-[#064e3b] text-white rounded-tr-none border-emerald-900/10'
                      : 'bg-white text-slate-800 rounded-tl-none border-slate-100'
                  )}>
                    <div className="prose prose-slate max-w-none prose-sm leading-relaxed whitespace-pre-wrap font-medium">
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 animate-in fade-in">
                  <div className="w-10 h-10 rounded-xl bg-[#064e3b] flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-6 h-6 text-[#fbbf24]" />
                  </div>
                  <div className="bg-white border border-slate-100 rounded-3xl rounded-tl-none px-6 py-4 flex flex-col gap-2">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#064e3b]/40 italic">CareerPilot AI is thinking...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center gap-3 p-6 text-center animate-in zoom-in duration-300">
                  <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-bold text-red-600">{error}</p>
                  <Button variant="outline" size="sm" className="rounded-full px-8" onClick={() => handleSend()}>Try Again</Button>
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
                className="flex-1 pr-16 h-14 text-base rounded-2xl shadow-inner border-slate-200 focus-visible:ring-[#064e3b]/20 bg-slate-50 font-medium"
              />

              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 h-10 w-10 rounded-xl shadow-lg bg-[#fbbf24] hover:bg-[#fbbf24]/90 text-[#064e3b] transition-all active:scale-90"
              >
                {isLoading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
              </Button>
            </form>
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 opacity-40">
                <Sparkles className="w-3 h-3 text-[#064e3b]" />
                <span className="text-[9px] font-black uppercase tracking-[0.15em]">AI-Powered</span>
              </div>
              <div className="w-px h-3 bg-slate-200" />
              <div className="flex items-center gap-1.5 opacity-40">
                <Lock className="w-3 h-3 text-[#064e3b]" />
                <span className="text-[9px] font-black uppercase tracking-[0.15em]">Confidential</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
