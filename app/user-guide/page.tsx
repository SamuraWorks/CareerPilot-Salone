"use client"

import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, User, Search, BookOpen, GraduationCap, FileText, MessageSquare, Sparkles, Zap, Target, Cpu, Shield } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function UserGuidePage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <main className="flex-1 pb-32">
                {/* --- PREMIUM HERO SECTION --- */}
                <section className="relative min-h-[450px] flex items-center bg-[#0B1F3A] overflow-hidden border-b-8 border-b-[#1FA774]">
                                        <div className="container mx-auto px-6 relative z-20 pt-10">
                        <div className="max-w-4xl space-y-10 text-center mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-md mx-auto">
                                <BookOpen className="w-4 h-4 text-[#1FA774]" />
                                <span className="text-[#1FA774] font-black text-[10px] uppercase tracking-[0.2em]">Operational Manual</span>
                            </div>

                            <div className="space-y-6 text-center">
                                <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter font-poppins uppercase">
                                    Master <br /> <span className="text-gradient-salone brightness-125">Platform</span>
                                </h1>
                                <p className="text-xl md:text-2xl text-slate-300 font-medium font-inter max-w-2xl mx-auto leading-relaxed border-transparent italic">
                                    Strategic walkthrough for achieving professional supremacy in the Sierra Leonean job market using CareerPilot AI.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-6xl mx-auto px-6 mt-20">
                    <div className="grid grid-cols-1 gap-12">
                        {[
                            {
                                id: "getting-started",
                                step: "01",
                                title: "Initialization Phase",
                                desc: "Configuring your professional profile for maximum impact.",
                                icon: User,
                                color: "bg-blue-50",
                                items: [
                                    { title: "Universal ID Creation", body: "Initiate your journey by registering with a secure credential set. Your dashboard acts as the central command node for all career operations." },
                                    { title: "Dossier Completion", body: "Input your academic history and skill matrix into the profile node. This allows our AI to calibrate your unique career trajectory." }
                                ]
                            },
                            {
                                id: "careers",
                                step: "02",
                                title: "Vector Discovery",
                                desc: "Exploring paths and institutional alignment.",
                                icon: Search,
                                color: "bg-emerald-50",
                                items: [
                                    { title: "Market Matrix Search", body: "Utilize the career discovery module to scan industries na Salone. Filter by high-demand sectors like Technology or Engineering." },
                                    { title: "Institutional Calibration", body: "Access verified data on FBC, IPAM, and Njala to align your academic goals with market reality." }
                                ]
                            },
                            {
                                id: "opportunities",
                                step: "03",
                                title: "Asset Capture",
                                desc: "Applying for jobs and strategic scholarships.",
                                icon: GraduationCap,
                                color: "bg-indigo-50",
                                items: [
                                    { title: "Scholarship Tracking", body: "Monitor the 'Grant-in-Aid' and international scholarship feeds. Each opportunity is vetted for Salone-specific eligibility." },
                                    { title: "Live Opportunity Feed", body: "The Jobs board provides a real-time stream of professional openings from vetted local employers." }
                                ]
                            },
                            {
                                id: "tools",
                                step: "04",
                                title: "Toolbox Synergy",
                                desc: "Leveraging CV synthesis and mentorship nodes.",
                                icon: Target,
                                color: "bg-slate-50",
                                items: [
                                    { title: "CV Synthesis", body: "Generate high-impact professional dossiers in minutes. Our builder aligns with international ATS standards for maximum visibility." },
                                    { title: "Advisor Link", body: "Connect with industry veterans through our mentorship portal for high-level tactical guidance." }
                                ]
                            },
                            {
                                id: "ai-help",
                                step: "05",
                                title: "Neural Dynamics",
                                desc: "Interacting with AI and WhatsApp interfaces.",
                                icon: Cpu,
                                color: "bg-blue-50",
                                items: [
                                    { title: "AI Intelligence Node", body: "The persistent chat interface provides 24/7 strategic advice. Ask anything from 'How to negotiate salary' to 'Write a pitch for a startup'." },
                                    { title: "WhatsApp Nexus", body: "Sync with our WhatsApp bot for low-bandwidth opportunity alerts and quick guidance na de Lion Mountain." }
                                ]
                            }
                        ].map((section, i) => (
                            <section key={i} id={section.id} className="scroll-mt-32">
                                <Card className="p-10 rounded-[3.5rem] bg-white border-8 border-slate-50 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#1FA774]/5 rounded-full blur-3xl pointer-events-none" />
                                    <div className="flex flex-col lg:flex-row gap-12">
                                        <div className="lg:w-1/3 space-y-6">
                                            <div className="w-16 h-16 bg-[#0B1F3A] rounded-[1.5rem] flex items-center justify-center text-white group-hover:bg-[#1FA774] transition-colors shadow-xl">
                                                <section.icon className="w-8 h-8" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="text-[10px] font-black text-[#1FA774] uppercase tracking-[0.4em] italic">Operation {section.step}</div>
                                                <h2 className="text-3xl font-black text-[#0B1F3A] uppercase tracking-tighter font-poppins italic">{section.title}</h2>
                                                <p className="text-slate-400 font-medium italic text-sm">{section.desc}</p>
                                            </div>
                                        </div>
                                        <div className="lg:w-2/3 space-y-10">
                                            {section.items.map((item, j) => (
                                                <div key={j} className="space-y-4 pl-10 border-l-4 border-slate-100 group-hover:border-[#1FA774] transition-all relative">
                                                    <div className="absolute -left-[14px] top-0 w-6 h-6 rounded-full bg-white border-4 border-slate-100 group-hover:border-[#1FA774] transition-all" />
                                                    <h4 className="text-xl font-black text-[#0B1F3A] uppercase tracking-tighter font-poppins">{item.title}</h4>
                                                    <p className="text-slate-400 font-medium italic text-base leading-relaxed">{item.body}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </section>
                        ))}
                    </div>

                    <div className="mt-24 p-16 bg-[#0B1F3A] rounded-[4rem] text-center space-y-10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-slate-50" />
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter font-poppins italic leading-none max-w-xl mx-auto">Ready to <span className="text-[#1FA774]">Infiltrate</span> The Job Market?</h3>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                            <Link href="/dashboard">
                                <Button className="h-16 px-12 rounded-[2rem] bg-white text-[#0B1F3A] font-black uppercase tracking-widest text-xs hover:bg-[#1FA774] hover:text-white transition-all active:scale-95 shadow-2xl border-none">
                                    Enter Dashboard
                                </Button>
                            </Link>
                            <Link href="/careers">
                                <Button className="h-16 px-12 rounded-[2rem] bg-transparent border-2 border-white/20 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95">
                                    Explore Vectors
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

