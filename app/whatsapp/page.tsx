"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, CheckCheck, ArrowRight, Sparkles, Zap, FileText, ChevronRight } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { cn } from "@/lib/utils"
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
      content: "👋 *CareerPilot Salone*\n\nI'm your AI career mentor. I can help you discover your path, build your CV, and find jobs in Sierra Leone.\n\nType *START* to begin!",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "user",
      content: "START",
      time: "10:31 AM",
    },
    {
      id: 3,
      sender: "bot",
      content: "Kusheh! Let's build your profile. 🇸🇱\n\n*Step 1: What is your age?*",
      time: "10:31 AM",
    }
  ])

  return (
    <DashboardLayout>
      <main className="max-w-6xl mx-auto py-12 px-6 space-y-24">
        {/* --- HEADER --- */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full">
            <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
            <span className="text-[#25D366] font-black text-[10px] uppercase tracking-widest">Mobile Nexus</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-gradient-salone leading-none tracking-tight uppercase">
            WhatsApp Assistant
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed italic">
            Low-bandwidth, high-impact professional mentorship na your pocket.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* --- CHAT MOCKUP --- */}
          <Card className="overflow-hidden border-slate-100 rounded-[3rem] shadow-xl relative z-10 bg-white">
            <div className="bg-[#075E54] text-white p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                <Image src="/images/core/logo.png" alt="CareerPilot" width={40} height={40} className="object-cover scale-110" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-lg uppercase tracking-tight">CareerPilot Salone</h3>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Always Online</p>
              </div>
            </div>

            <div className="bg-[#e5ddd5] p-6 h-[400px] overflow-y-auto space-y-4 font-sans custom-scrollbar">
              {messages.map((msg: WhatsAppMessage) => (
                <div key={msg.id} className={msg.sender === "bot" ? "flex justify-start" : "flex justify-end"}>
                  <div className={cn("max-w-[85%] p-4 rounded-2xl shadow-sm relative text-sm font-bold leading-relaxed",
                    msg.sender === "bot" ? "bg-white text-[#0B1F3A] rounded-tl-none" : "bg-[#dcf8c6] text-[#0B1F3A] rounded-tr-none")}>
                    {msg.content}
                    <div className="text-[9px] font-black text-slate-400 mt-2 flex items-center justify-end gap-1 uppercase">
                      {msg.time} {msg.sender === "user" && <CheckCheck className="w-3 h-3 text-blue-500" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-4">
              <a href="https://whatsapp.com/channel/0029VbCMtxy0LKZ52WwcjH0r" target="_blank" className="block">
                <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-black uppercase text-xs tracking-widest h-14 rounded-2xl gap-3">
                  Click to Chat on WhatsApp <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </Card>

          {/* --- FEATURES & GUIDE --- */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-[#0B1F3A] uppercase tracking-tight italic">How it Works</h2>
              <div className="space-y-4">
                {[
                  { icon: Zap, color: "text-amber-500", bg: "bg-amber-50", title: "Instant Intel", desc: "Type any career question for real-time market analysis." },
                  { icon: FileText, color: "text-blue-500", bg: "bg-blue-50", title: "On-the-go Drafting", desc: "Ask the bot to improve your CV or write a cover letter." }
                ].map((f, i) => (
                  <div key={i} className="flex gap-4 items-start p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-[#25D366]/30 transition-all">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", f.bg)}>
                      <f.icon className={cn("w-5 h-5", f.color)} />
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-tight text-[#0B1F3A]">{f.title}</h4>
                      <p className="text-xs text-slate-500 font-medium italic leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 p-8 bg-[#0B1F3A] rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/10 rounded-full blur-2xl" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Connection Guide</h3>
              <div className="space-y-4 relative z-10">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-white">01</div>
                  <p className="text-white text-sm font-medium italic">Join our WhatsApp Channel for instant updates</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-white">02</div>
                  <p className="text-white text-sm font-medium">Type <span className="font-black text-[#25D366]">START</span> in the chat</p>
                </div>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-slate-100">
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest italic">Inclusive • Low Bandwidth • Powerful</p>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  )
}

