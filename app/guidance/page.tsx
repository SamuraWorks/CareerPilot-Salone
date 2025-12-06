"use client"

import { useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Sparkles } from "lucide-react"
import Image from "next/image"

export default function GuidancePage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm active and ready to help. I'm your AI Career Guide for Sierra Leone. Ask me about career paths, university requirements, or salary expectations. What's on your mind today?"
      }
    ]
  })

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="relative p-4 md:p-6 border-b bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="absolute right-4 top-4 w-16 h-16 rounded-full overflow-hidden opacity-50 hidden md:block">
            <Image src="/ai-chatbot-career-guidance.jpg" alt="AI Career Guidance" fill className="object-cover" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            AI Career Guidance
            <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time career advice powered by AI. Ask anything!
          </p>
        </div>

        <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollRef}>
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}

                <div className={`flex flex-col gap-2 ${message.role === "user" ? "items-end" : ""} flex-1`}>
                  <div
                    className={`rounded-lg px-4 py-3 max-w-[85%] shadow-sm ${message.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-white border border-border text-foreground"
                      }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {message.role === 'user' ? 'You' : 'CareerPilot AI'}
                  </span>
                </div>

                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8 opacity-70">
                <p className="text-sm text-center col-span-full mb-2 text-muted-foreground">Try asking:</p>
                <Button variant="outline" className="h-auto py-3 justify-start text-left" onClick={() => handleInputChange({ target: { value: "How do I become a Data Analyst in Salone?" } } as any)}>
                  📊 How do I become a Data Analyst?
                </Button>
                <Button variant="outline" className="h-auto py-3 justify-start text-left" onClick={() => handleInputChange({ target: { value: "What are the requirements for Njala University?" } } as any)}>
                  🎓 Njala University requirements
                </Button>
                <Button variant="outline" className="h-auto py-3 justify-start text-left" onClick={() => handleInputChange({ target: { value: "Can you help me improve my CV for a bank job?" } } as any)}>
                  🏦 Improve CV for Banking
                </Button>
                <Button variant="outline" className="h-auto py-3 justify-start text-left" onClick={() => handleInputChange({ target: { value: "What is the salary for a Civil Engineer?" } } as any)}>
                  💰 Civil Engineer Salary
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t bg-background">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything about careers in Sierra Leone..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input?.trim()} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
