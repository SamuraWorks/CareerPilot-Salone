"use client";

import React, { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCcw, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function GuidancePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("career_chat_history");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) { console.error("Failed to parse chat history"); }
    }
  }, []);

  // Save to localStorage on update
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("career_chat_history", JSON.stringify(messages));
    }
    // Auto-scroll
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    // 1. Add User Message
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      // 2. Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      // 3. Add AI Message
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || "Sorry, I couldn't generate a response."
      };

      setMessages(prev => [...prev, aiMsg]);

      if (data.provider === 'local-fallback') {
        toast.warning("Using offline mode (AI unavailable)", { duration: 3000 });
      }

    } catch (err: any) {
      console.error("Chat Failed:", err);
      setError("Failed to get response. Please check your connection.");
      toast.error("Message failed to send");
      // Optional: keep user message but mark as failed? For now simpler to just show error state.
    } finally {
      setIsLoading(false);
      // Re-focus input for speed (desktop only usually)
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const clearChat = () => {
    if (confirm("Clear all chat history?")) {
      setMessages([]);
      localStorage.removeItem("career_chat_history");
      toast.success("History cleared");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto w-full bg-background shadow-sm">

        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/10">
              <Bot className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight flex items-center gap-2">
                CareerPilot Chat
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">AI Career Advisor for Sierra Leone</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={clearChat} title="Clear History" className="hover:bg-destructive/10 hover:text-destructive">
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>

        {/* MESSAGES */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-12 px-4 space-y-4 opacity-70">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">How can I help you?</h2>
                <p className="max-w-md mx-auto text-muted-foreground text-sm">
                  Ask about salaries in Freetown, university requirements at Njala/FBC, or required skills for jobs like Banking or Engineering.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto mt-8">
                  <Button variant="outline" className="justify-start h-auto py-3 px-4 text-left" onClick={() => handleSend("How do I become a Data Analyst?")}>
                    📊 Data Analyst Path
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3 px-4 text-left" onClick={() => handleSend("What are the requirements for Njala University?")}>
                    🎓 Njala Requirements
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3 px-4 text-left" onClick={() => handleSend("What is the salary for a Nurse in Sierra Leone?")}>
                    🏥 Nurse Salary
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3 px-4 text-left" onClick={() => handleSend("Help me write a CV for a bank job")}>
                    🏦 Banking CV Help
                  </Button>
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}

                <div className={`
                            max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm
                            ${m.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                    : 'bg-card border border-border/50 text-foreground rounded-tl-none'}
                        `}>
                  <div className="prose dark:prose-invert max-w-none prose-sm leading-relaxed whitespace-pre-wrap">
                    {m.content}
                  </div>
                </div>

                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 mt-1">
                    <User className="w-5 h-5 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 animate-in fade-in">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-muted/50 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-lg justify-center">
                <AlertCircle className="w-4 h-4" />
                {error}
                <Button variant="link" size="sm" className="h-auto p-0 text-destructive font-semibold ml-2" onClick={() => handleSend()}>Retry</Button>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* INPUT */}
        <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form
            className="flex gap-2 relative max-w-3xl mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              disabled={isLoading}
              className="flex-1 pr-12 h-12 text-base rounded-full shadow-sm border-muted-foreground/20 focus-visible:ring-primary/20"
            />

            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="absolute right-1 top-1 h-10 w-10 rounded-full shadow-none transition-all"
            >
              {isLoading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
          <p className="text-[10px] text-center text-muted-foreground mt-2 opacity-50">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
