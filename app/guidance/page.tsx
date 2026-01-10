"use client"

import { useState, useRef, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User } from "lucide-react"
import Image from "next/image"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
  careers?: Array<{
    title: string
    description: string
    entryRole: string
    steps: string[]
  }>
}

const guidedQuestions = [
  "What subjects do you enjoy the most?",
  "What skills do you have? (e.g., communication, problem-solving, technical skills)",
  "What are your main interests or hobbies?",
  "What level of education have you completed?",
  "Do you prefer working with people, technology, or creative projects?",
]

const sampleCareerResponses = [
  {
    title: "Software Developer",
    description:
      "Build websites and applications for local businesses and international companies. High demand in Sierra Leone.",
    entryRole: "Junior Developer or Intern",
    steps: [
      "Learn HTML, CSS, and JavaScript through free online courses",
      "Join local tech communities like iDT Labs or DSTI",
      "Build 2-3 portfolio projects",
      "Apply for internships at tech companies in Freetown",
    ],
  },
  {
    title: "Digital Marketing Specialist",
    description: "Help businesses grow online through social media, content, and advertising strategies.",
    entryRole: "Social Media Manager or Marketing Assistant",
    steps: [
      "Take Google Digital Marketing certification (free)",
      "Practice by managing social media for small local businesses",
      "Learn about Facebook Ads and Google Analytics",
      "Network with entrepreneurs and business owners",
    ],
  },
  {
    title: "Healthcare Professional (Nurse)",
    description: "Provide essential medical care in hospitals, clinics, and community health centers across SL.",
    entryRole: "Enrolled Nurse or Nursing Assistant",
    steps: [
      "Complete nursing program at approved institution (e.g., College of Medicine)",
      "Register with Sierra Leone Nurses Board",
      "Gain experience through clinical rotations",
      "Consider specializations like midwifery or community health",
    ],
  },
]

export default function GuidancePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I'm your AI Career Guide for Sierra Leone. I'll help you discover careers that match your skills and interests. Let's start by getting to know you better. What subjects do you enjoy the most?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let aiResponse: Message

      if (questionIndex < guidedQuestions.length - 1) {
        // Ask next question
        aiResponse = {
          id: messages.length + 2,
          role: "assistant",
          content: `Great! ${guidedQuestions[questionIndex + 1]}`,
          timestamp: new Date(),
        }
        setQuestionIndex(questionIndex + 1)
      } else {
        // Provide career recommendations
        aiResponse = {
          id: messages.length + 2,
          role: "assistant",
          content:
            "Based on your responses, here are some career paths that match your profile. These careers are realistic for Sierra Leone, with clear entry points and growth opportunities:",
          timestamp: new Date(),
          careers: sampleCareerResponses,
        }
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickReply = (reply: string) => {
    setInput(reply)
  }

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
          </h1>
          <p className="text-muted-foreground mt-1">
            Chat with our AI to discover careers that match your skills and interests
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
                    className={`rounded-lg px-4 py-3 max-w-[85%] ${message.role === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted text-foreground"
                      }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>

                  {message.careers && (
                    <div className="space-y-3 w-full mt-2">
                      {message.careers.map((career, idx) => (
                        <Card key={idx} className="p-4 hover:shadow-md transition-shadow">
                          <h3 className="font-semibold text-lg mb-2">{career.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                          <div className="bg-secondary/10 rounded-lg p-3 mb-3">
                            <p className="text-sm font-medium text-secondary">Entry Role: {career.entryRole}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Actionable Steps:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {career.steps.map((step, stepIdx) => (
                                <li key={stepIdx} className="flex gap-2">
                                  <span className="text-primary font-medium">{stepIdx + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Button className="w-full mt-4" size="sm">
                            View Full Roadmap
                          </Button>
                        </Card>
                      ))}
                    </div>
                  )}

                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>

                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
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
          </div>
        </ScrollArea>

        {/* Quick Reply Suggestions */}
        {questionIndex < 2 && (
          <div className="px-4 pb-2">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-wrap gap-2">
                {questionIndex === 0 && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleQuickReply("Math and Science")}>
                      Math & Science
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickReply("Business and Economics")}>
                      Business
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickReply("Arts and Humanities")}>
                      Arts & Humanities
                    </Button>
                  </>
                )}
                {questionIndex === 1 && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleQuickReply("Communication, Leadership")}>
                      Communication
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickReply("Problem-solving, Technical")}>
                      Problem-solving
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickReply("Creative, Design")}>
                      Creative
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t bg-background">
          <div className="max-w-3xl mx-auto flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your answer here..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button onClick={handleSend} disabled={isTyping || !input.trim()} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
