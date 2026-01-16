"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, CheckCheck, Sparkles, Send } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export function WhatsAppShowcase() {
    const messages = [
        {
            id: 1,
            sender: "bot",
            content: "👋 Welcome to *CareerPilot Salone*!\n\nI'm your AI career guide. I can help you discover your path in Sierra Leone.",
            time: "10:30 AM",
        },
        {
            id: 2,
            sender: "user",
            content: "I want to be a software developer",
            time: "10:31 AM",
        },
        {
            id: 3,
            sender: "bot",
            content: "Great choice! 💻\n\nIn Freetown, the tech scene is growing. To start, you'll need:\n\n1. Learn Python or JS\n2. Join a tech hub (e.g., Orange Fab)\n\nWant me to generate a roadmap?",
            time: "10:31 AM",
        }
    ]

    return (
        <section className="py-24 bg-white overflow-hidden" id="whatsapp-bot">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Content */}
                    <div className="flex-1 space-y-8 animate-fade-in">
                        <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20 bg-primary/5 text-sm font-bold uppercase tracking-widest">
                            Available on WhatsApp
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                            Your Career Guide, <br />
                            Right in Your <span className="text-[#25D366]">Pocket.</span>
                        </h2>
                        <p className="text-xl text-slate-600 leading-relaxed font-medium">
                            No need to download complex apps. Access AI career counseling, build your CV, and receive job alerts through a simple WhatsApp conversation.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "AI Counseling", desc: "Talk to our bot about your interests" },
                                { title: "CV Generation", desc: "Build a professional CV in minutes" },
                                { title: "Local Roadmaps", desc: "Guides tailored for Sierra Leone" },
                                { title: "Job Alerts", desc: "Get notified of fresh opportunities" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <a href="https://wa.me/23275668258?text=Hi%20CareerPilot!%20I%20need%20help%20with%20my%20career." target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="h-16 px-10 text-xl font-black bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl shadow-2xl shadow-green-500/20 gap-3">
                                    <FaWhatsapp className="w-6 h-6" />
                                    Chat on WhatsApp (+232 75 668258)
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* WhatsApp Mockup */}
                    <div className="flex-1 relative w-full max-w-[400px]">
                        {/* Background Decoration */}
                        <div className="absolute -inset-4 bg-[#25D366]/20 blur-3xl rounded-full opacity-50" />

                        <Card className="relative overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] rounded-[2.5rem] border-[8px] border-slate-900 aspect-[9/19]">
                            {/* Phone Header */}
                            <div className="bg-[#075e54] text-white p-6 pt-12 flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold">CareerPilot Salone</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        <span className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Always Online</span>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Body */}
                            <div className="flex-1 bg-[#e5ddd5] p-4 space-y-4 h-[calc(100%-140px)] overflow-y-auto"
                                style={{
                                    backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
                                    backgroundSize: '400px'
                                }}
                            >
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                                        <div className={`max-w-[85%] rounded-[1.2rem] p-3.5 shadow-sm text-sm ${msg.sender === "bot" ? "bg-white text-slate-800 rounded-tl-none" : "bg-[#dcf8c6] text-slate-800 rounded-tr-none"
                                            }`}>
                                            <p className="whitespace-pre-line leading-relaxed font-medium">{msg.content}</p>
                                            <div className="flex items-center justify-end gap-1 mt-1 opacity-40">
                                                <span className="text-[10px] font-bold">{msg.time}</span>
                                                {msg.sender === "user" && <CheckCheck className="w-3 h-3 text-blue-500" />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Phone Input */}
                            <div className="absolute bottom-0 left-0 right-0 bg-[#f0f0f0] p-4 flex items-center gap-3">
                                <div className="flex-1 bg-white rounded-full px-4 py-3 text-xs text-slate-400 font-medium">
                                    Type a message...
                                </div>
                                <div className="w-10 h-10 bg-[#075e54] rounded-full flex items-center justify-center text-white shadow-lg">
                                    <Send className="w-5 h-5" />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
