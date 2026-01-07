"use client"

import { useState } from "react"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, CheckCheck, ArrowRight } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import Image from "next/image"

interface WhatsAppMessage {
  id: number
  sender: "bot" | "user"
  content: string
  time: string
  buttons?: string[]
}

export default function WhatsAppPage() {
  const [messages] = useState<WhatsAppMessage[]>([
    {
      id: 1,
      sender: "bot",
      content:
        "👋 Welcome to *CareerPilot Salone*!\n\nI'm your AI career guide. I can help you with:\n\n1️⃣ Career Guidance\n2️⃣ Generate CV\n3️⃣ View Roadmap\n4️⃣ Find Jobs\n\nReply with a number to get started!",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "user",
      content: "1",
      time: "10:31 AM",
    },
    {
      id: 3,
      sender: "bot",
      content:
        "Great! Let's discover your ideal career path. 🎯\n\nI'll ask you a few questions to understand your interests and skills better.\n\n*Question 1:* What subjects do you enjoy the most?",
      time: "10:31 AM",
      buttons: ["Math & Science", "Business", "Arts & Humanities", "Other"],
    },
    {
      id: 4,
      sender: "user",
      content: "Math & Science",
      time: "10:32 AM",
    },
    {
      id: 5,
      sender: "bot",
      content: "*Question 2:* What skills do you have?\n\nSelect all that apply:",
      time: "10:32 AM",
      buttons: ["Problem-solving", "Communication", "Technical Skills", "Leadership"],
    },
    {
      id: 6,
      sender: "user",
      content: "Problem-solving, Technical Skills",
      time: "10:33 AM",
    },
    {
      id: 7,
      sender: "bot",
      content:
        "Perfect! Based on your responses, here are *3 career paths* that match your profile:\n\n*1. Software Developer* 💻\nBuild apps and websites for businesses\n📍 Entry: Junior Developer\n💰 Salary: Le 3M-6M/month\n\n*2. Data Analyst* 📊\nAnalyze data to help businesses make decisions\n📍 Entry: Data Assistant\n💰 Salary: Le 2.5M-5M/month\n\n*3. Engineering Technician* ⚙️\nWork on technical projects and maintenance\n📍 Entry: Technician Trainee\n💰 Salary: Le 2M-4M/month\n\nReply with a number to see the roadmap for that career!",
      time: "10:33 AM",
    },
  ])

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1 bg-gradient-to-br from-secondary/10 via-background to-primary/10 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* PREMIUM HERO HEADER */}
          <section className="relative rounded-[3rem] overflow-hidden bg-[#0B1F3A] min-h-[340px] flex items-center shadow-2xl group mb-16">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/dashboard/salone_success.png"
                alt="WhatsApp Guidance"
                fill
                className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent z-10" />
            </div>

            <div className="relative z-20 max-w-4xl p-10 md:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full backdrop-blur-md">
                <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                <span className="text-[#25D366] font-bold text-xs uppercase tracking-widest">Mobile Guidance</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-poppins">
                WhatsApp <span className="text-[#F4C430]">Smart</span> Assistant
              </h1>
              <p className="text-lg md:text-xl text-slate-300 font-medium font-inter max-w-xl leading-relaxed">
                Experience the future of career mentorship on your favorite chat app. Fast, inclusive, and available everywhere.
              </p>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white">24/7</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Availability</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-[#F4C430]">Krio</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Language Support</span>
                </div>
              </div>
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* WhatsApp Chat Mockup */}
            <div>
              <Card className="overflow-hidden shadow-lg">
                {/* WhatsApp Header */}
                <div className="bg-secondary text-secondary-foreground p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary-foreground/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">CareerPilot Salone</h3>
                    <p className="text-xs opacity-90">Online</p>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="bg-[#e5ddd5] p-4 h-[500px] overflow-y-auto space-y-4 font-sans border-t border-b">
                  <div className="text-center">
                    <span className="bg-[#dcf8c6] text-[10px] px-2 py-1 rounded-md text-slate-600 shadow-sm uppercase tracking-wider font-bold">
                      Messages are end-to-end encrypted
                    </span>
                  </div>

                  {messages.map((msg: WhatsAppMessage) => (
                    <div
                      key={msg.id}
                      className={msg.sender === "bot" ? "flex justify-start" : "flex justify-end"}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-lg shadow-sm relative ${msg.sender === "bot" ? "bg-white text-slate-800" : "bg-[#dcf8c6] text-slate-800"
                          }`}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>

                        {msg.buttons && (
                          <div className="mt-3 space-y-2">
                            {msg.buttons.map((button: string, idx: number) => (
                              <div key={idx} className="bg-[#f0f2f5] hover:bg-[#e9edef] transition-colors p-2 rounded-md text-center text-xs font-semibold text-blue-600 cursor-pointer border border-slate-200">
                                {button}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-end gap-1">
                          {msg.time}
                          {msg.sender === "user" && <CheckCheck className="w-3 h-3 text-blue-500" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="bg-[#f0f2f5] p-3 flex items-center gap-3">
                  <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-slate-400">
                    Type a message...
                  </div>
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground">
                    <MessageCircle className="w-5 h-5 rotate-90" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Features List */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Features on WhatsApp</h2>
                <p className="text-muted-foreground">Everything you can do on the website, now available via chat.</p>
              </div>

              <div className="grid gap-4">
                {[
                  {
                    title: "AI Career Counselor",
                    desc: "Get instant answers to your career questions in the language you prefer (Krio or English).",
                  },
                  {
                    title: "Automated CV Builder",
                    desc: "Answer a few chat questions and receive a professionally formatted PDF CV on WhatsApp.",
                  },
                  {
                    title: "Job & Scholarship Alerts",
                    desc: "Choose your field and get immediate notifications for new openings in Sierra Leone.",
                  },
                  {
                    title: "University Guidance",
                    desc: "Find out which local universities offer the courses required for your dream job.",
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                      <CheckCheck className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <a
                  href="https://wa.me/23275977351?text=Hello%20CareerPilot%20Salone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white gap-2 h-14 rounded-2xl text-lg shadow-xl shadow-green-500/20">
                    <FaWhatsapp className="w-6 h-6" />
                    Start Chatting Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <p className="text-center text-xs text-muted-foreground mt-4 font-medium uppercase tracking-[0.2em]">
                  Official SIERRA LEONE Number: +232 75 977351
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
