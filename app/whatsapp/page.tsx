"use client"

import { useState } from "react"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, CheckCheck, ArrowRight, Sparkles, Phone, Zap, ArrowLeft } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

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
        "� *CareerPilot Salone: Omni-Assistant*\n\nI'm your AI career mentor. I can help you discover your path, build your CV, and find jobs in Sierra Leone.\n\nType *START* to begin your career match quiz, or *MENU* to see all options!",
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
      content:
        "Kusheh! Let's build your professional profile. 🇸🇱\n\n*Step 1: What is your age?*",
      time: "10:31 AM",
    },
    {
      id: 4,
      sender: "user",
      content: "22",
      time: "10:32 AM",
    },
    {
      id: 5,
      sender: "bot",
      content: "*Step 2: Where are you located?* 📍\n(e.g. Freetown, Bo, Makeni, Kenema)",
      time: "10:32 AM",
    },
    {
      id: 6,
      sender: "user",
      content: "Freetown",
      time: "10:33 AM",
    },
    {
      id: 7,
      sender: "bot",
      content:
        "✅ *Profile Progress*: 2/5 steps complete.\n\n*Step 3: What is your highest level of education?* 🎓\n(e.g. WASSCE, Diploma, Bachelor's, Masters)",
      time: "10:33 AM",
    },
  ])


  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 pb-32">
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-[400px] flex items-center bg-[#0B1F3A] overflow-hidden border-b-8 border-emerald-500">
          <div className="container mx-auto px-6 relative z-20 pt-8">
            <div className="max-w-4xl space-y-8">
              <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold font-sans uppercase tracking-wide text-emerald-400 hover:text-white transition-all group">
                <div className="p-1.5 rounded-md bg-emerald-400/10 border border-emerald-400/20 group-hover:bg-emerald-400 group-hover:text-[#0B1F3A] transition-all">
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
                Back to Control Center
              </Link>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-md">
                  <FaWhatsapp className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-green-500 font-bold text-xs uppercase tracking-wide">Mobile Nexus Protocol</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight font-sans">
                  WhatsApp <span className="text-emerald-400">Omni-Assistant</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 font-medium font-sans max-w-2xl leading-relaxed border-l-4 border-emerald-500 pl-4">
                  Experience the future of professional mentorship on your primary communication node. Inclusive, low-bandwidth, and omnipresent na Salone.
                </p>
              </div>

              <div className="flex items-center gap-8 pt-2">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">24/7</span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Global Uptime</span>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-blue-500">KRIO</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Native Synthesis</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 mt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* WhatsApp Chat Mockup */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-50" />
              <Card className="overflow-hidden border-none rounded-[3.5rem] shadow-2xl relative z-10 bg-white">
                {/* WhatsApp Header */}
                <div className="bg-[#075E54] text-white p-8 flex items-center gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center backdrop-blur-md overflow-hidden p-1">
                    <Image src="/logo.png" alt="CareerPilot" width={48} height={48} className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black font-sans text-xl tracking-tight uppercase">CareerPilot Salone</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                      <p className="text-xs font-bold uppercase tracking-widest opacity-80">Synchronized</p>
                    </div>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="bg-[#e5ddd5] p-8 h-[600px] overflow-y-auto space-y-6 font-sans border-t border-b custom-scrollbar">
                  <div className="text-center">
                    <span className="bg-[#dcf8c6] text-[10px] px-4 py-2 rounded-full text-slate-600 shadow-sm uppercase tracking-widest font-black border border-slate-200/50 backdrop-blur-md">
                      End-to-end Encrypted Intelligence
                    </span>
                  </div>

                  {messages.map((msg: WhatsAppMessage) => (
                    <div
                      key={msg.id}
                      className={msg.sender === "bot" ? "flex justify-start" : "flex justify-end"}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] p-5 rounded-[2rem] shadow-sm relative group/msg",
                          msg.sender === "bot"
                            ? "bg-white text-[#0B1F3A] rounded-tl-none border border-slate-200"
                            : "bg-[#dcf8c6] text-[#0B1F3A] rounded-tr-none"
                        )}
                      >
                        <div className="whitespace-pre-wrap text-sm font-bold leading-relaxed">{msg.content}</div>

                        {msg.buttons && (
                          <div className="mt-6 space-y-3">
                            {msg.buttons.map((button: string, idx: number) => (
                              <div key={idx} className="bg-white/50 backdrop-blur-sm border border-slate-200/50 hover:bg-[#1E5EFF] hover:text-white hover:border-[#1E5EFF] transition-all p-3 rounded-xl text-center text-xs font-black uppercase tracking-widest cursor-pointer shadow-sm active:scale-95">
                                {button}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="text-[9px] font-black text-slate-400 mt-2 flex items-center justify-end gap-2 uppercase tracking-tight">
                          {msg.time}
                          {msg.sender === "user" && <CheckCheck className="w-3 h-3 text-[rgb(30,94,255)]" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="bg-slate-50 p-6 flex items-center gap-4">
                  <a
                    href="https://wa.me/23275668258?text=START"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 text-xs font-black text-[#1FA774] flex items-center justify-between group/input cursor-pointer hover:border-[#1FA774]/30 transition-all">
                      TYPE 'START' FOR INSTANT REPLY
                      <Zap className="w-4 h-4 fill-[#1FA774] opacity-0 group-hover/input:opacity-100 transition-all" />
                    </div>
                  </a>
                  <a
                    href="https://wa.me/23275668258?text=Hello%20CareerPilot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-14 h-14 bg-[#1FA774] rounded-2xl flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform cursor-pointer hover:bg-[#128C7E]">
                      <MessageCircle className="w-6 h-6 rotate-90" />
                    </div>
                  </a>
                </div>
              </Card>
            </div>

            {/* Connection Guide & Features */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="inline-block px-4 py-1 bg-[#1E5EFF]/10 text-[#1E5EFF] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#1E5EFF]/10">
                  Connection Guide
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#0B1F3A] uppercase tracking-tighter font-sans leading-[0.9]">
                  How to Access <br /><span className="text-[#1FA774]">The Network</span>
                </h2>

                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex gap-6 items-start p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-[#1E5EFF]/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center font-black text-xl text-[#0B1F3A]">01</div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-[#0B1F3A] uppercase tracking-wide">Save the Node</h3>
                      <p className="text-slate-500 text-sm">Save this number to your contacts as <span className="font-bold text-[#0B1F3A]">CareerPilot AI</span></p>
                      <div className="inline-block bg-white px-4 py-2 rounded-lg border border-slate-200 mt-2 font-mono font-bold text-[#1E5EFF] select-all">
                        +232 75 668258
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-6 items-start p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-[#25D366]/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 shadow-sm flex items-center justify-center font-black text-xl text-[#25D366]">02</div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-[#0B1F3A] uppercase tracking-wide">Initialize</h3>
                      <p className="text-slate-500 text-sm">Open WhatsApp and send the activation command.</p>
                      <a
                        href="https://wa.me/23275668258?text=Hello%20CareerPilot%20Salone"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-2 text-xs font-black uppercase tracking-widest text-[#25D366] hover:underline"
                      >
                        Click to Open WhatsApp <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href="https://wa.me/23275668258?text=Hello%20CareerPilot%20Salone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button size="lg" className="w-full px-12 bg-[#25D366] hover:bg-[#128C7E] text-white gap-4 h-20 rounded-3xl text-xl font-black uppercase tracking-widest shadow-2xl shadow-green-500/30 group">
                      <FaWhatsapp className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                      Connect Instantly
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* Quick Features Grid */}
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-100">
                {[
                  { label: "CV Generation", icon: CheckCheck },
                  { label: "Job Alerts", icon: Zap },
                  { label: "Roadmaps", icon: ArrowRight },
                  { label: "Mentorship", icon: Sparkles }
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <f.icon className="w-4 h-4 text-[#1FA774]" /> {f.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

