"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Compass, Target, MessageSquare, Sparkles, GraduationCap, ChevronRight, Brain, ArrowLeft, ArrowUpRight, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CareerHubPage() {
    const [activeTab, setActiveTab] = useState<'test' | 'ai' | 'recommended' | 'unis'>('test')

    const tabs = [
        { id: 'test', label: 'Career Test', icon: Brain },
        { id: 'ai', label: 'AI Chat', icon: MessageSquare },
        { id: 'recommended', label: 'Recommended', icon: Target },
        { id: 'unis', label: 'Universities', icon: GraduationCap },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* --- PREMIUM HERO SECTION --- */}
                <section className="relative rounded-[3.5rem] overflow-hidden bg-[#0B1F3A] min-h-[360px] flex items-center shadow-2xl group border-b-8 border-b-[#1FA774]">
                                        <div className="relative z-20 max-w-4xl p-10 md:p-16 space-y-6">
                        <Link href="/dashboard" className="inline-flex items-center gap-3 text-[10px] font-black font-sans uppercase tracking-[0.3em] text-[#4ADE80] hover:text-white transition-all group mb-2 italic">
                            <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-[#4ADE80] group-hover:text-[#0B1F3A] transition-all">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            </div>
                            Return to Base
                        </Link>
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1FA774]/10 border border-[#1FA774]/20 rounded-full backdrop-blur-md">
                                <Compass className="w-4 h-4 text-[#1FA774]" />
                                <span className="text-[#1FA774] font-black text-[10px] uppercase tracking-[0.2em]">Strategic Navigation Center</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter font-sans uppercase italic">
                                Career <span className="text-gradient-salone brightness-125">Hub</span> Terminal
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-300 font-medium font-sans max-w-2xl leading-relaxed border-l-4 border-[#1FA774] pl-6 italic">
                                Your mission control for professional development. From self-discovery to sector dominance na Sierra Leone.
                            </p>
                        </div>

                        <div className="flex items-center gap-10 pt-4">
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-white">50+</span>
                                <span className="text-[10px] font-black text-[#1FA774] uppercase tracking-widest italic">Vector Paths</span>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-[#1E5EFF]">AI</span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Nexus Mentor</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tab Switcher */}
                <div className="flex bg-slate-100 p-2 rounded-[2rem] w-fit shadow-inner">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all italic ${activeTab === tab.id
                                ? 'bg-white text-[#1E5EFF] shadow-xl scale-105'
                                : 'text-slate-400 hover:text-[#0B1F3A]'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {activeTab === 'test' && (
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div className="inline-block px-4 py-1 bg-[#1FA774]/10 text-[#1FA774] rounded-full text-[10px] font-black uppercase tracking-widest italic border border-[#1FA774]/10">
                                    Primary Objective
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-[#0B1F3A] uppercase tracking-tighter font-sans italic leading-[0.9]">Identify Your <span className="text-[#1FA774]">Neural</span> Talent</h2>
                                <p className="text-slate-400 font-medium italic text-xl border-l-4 border-[#1FA774] pl-6">Our tactical RIASEC assessment maps your core personality to the Sierra Leonean workforce in under 5 minutes.</p>
                                <Link href="/career-test" className="block">
                                    <button className="h-20 px-12 rounded-[2.5rem] bg-[#0B1F3A] text-white font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-[#1E5EFF] hover:-translate-y-2 transition-all active:scale-95 gap-4 flex items-center group">
                                        Initialize Discovery Protocol
                                        <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform text-[#4ADE80]" />
                                    </button>
                                </Link>
                            </div>
                            <div className="relative aspect-square bg-[#0B1F3A] rounded-[4rem] p-16 flex items-center justify-center overflow-hidden group shadow-2xl">
                                <div className="absolute inset-0 bg-slate-50" />
                                <Sparkles className="w-64 h-64 text-[#1FA774] opacity-10 animate-pulse absolute" />
                                <Target className="w-40 h-40 text-white relative z-10 group-hover:scale-110 transition-transform duration-1000 group-hover:rotate-12" />
                            </div>
                        </div>
                    )}

                    {activeTab === 'ai' && (
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="relative aspect-square bg-slate-900 rounded-[4rem] p-12 flex flex-col justify-center gap-8 overflow-hidden shadow-2xl order-2 md:order-1 group">
                                <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] rounded-bl-none text-white text-sm font-bold italic max-w-[85%] backdrop-blur-md group-hover:translate-x-2 transition-transform">"Wetin you think about mining engineering na Salone?"</div>
                                <div className="p-6 bg-[#1FA774] rounded-[2rem] rounded-br-none text-white text-sm font-bold italic max-w-[85%] self-end shadow-xl group-hover:-translate-x-2 transition-transform">"Excellent sector. High demand na Kono and Lunsar. You need strong science background and we get roadmaps for that..."</div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E5EFF]/10 rounded-full blur-[120px] -z-10" />
                            </div>
                            <div className="space-y-8 order-1 md:order-2">
                                <div className="inline-block px-4 py-1 bg-[#1E5EFF]/10 text-[#1E5EFF] rounded-full text-[10px] font-black uppercase tracking-widest italic border border-[#1E5EFF]/10">
                                    Technical Advisory
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-[#0B1F3A] uppercase tracking-tighter font-sans italic leading-[0.9]">AI Tactical <br /><span className="text-[#1E5EFF]">Mentor</span> Nexus</h2>
                                <p className="text-slate-400 font-medium italic text-xl border-l-4 border-[#1E5EFF] pl-6">Real-time intelligence on sector growth, salary transparency, and educational requirements.</p>
                                <Link href="/ai-guidance" className="block">
                                    <button className="h-20 px-12 rounded-[2.5rem] bg-[#1E5EFF] text-white font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-[#0B1F3A] hover:-translate-y-2 transition-all active:scale-95 gap-4 flex items-center group">
                                        Open Comms Channel
                                        <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {activeTab === 'recommended' && (
                        <div className="space-y-12">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                                <div className="space-y-2">
                                    <h2 className="text-4xl md:text-6xl font-black text-[#0B1F3A] uppercase tracking-tighter font-sans italic">High-Impact <br /><span className="text-[#1FA774]">Vectors</span></h2>
                                    <p className="text-slate-400 font-bold italic uppercase text-xs tracking-[0.4em]">Proprietary market-demand analysis</p>
                                </div>
                                <Link href="/careers">
                                    <button className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1E5EFF] hover:text-[#0B1F3A] transition-all flex items-center gap-2 group italic">
                                        View Full Sector Matrix <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {[
                                    { title: 'Software Developer', industry: 'Tech Ecosystem', salary: 'NLE 4,500+', demand: 'Critical' },
                                    { title: 'Strategic Engineer', industry: 'Industrial/Mining', salary: 'NLE 9,000+', demand: 'High' },
                                    { title: 'Agri-Tech Lead', industry: 'Modern Agriculture', salary: 'NLE 3,800+', demand: 'Surging' }
                                ].map((career, i) => (
                                    <Link key={i} href="/careers">
                                        <Card className="p-10 rounded-[3.5rem] border-none bg-slate-50 hover:bg-white hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1FA774]/5 rounded-bl-[4rem] group-hover:scale-150 transition-transform" />
                                            <div className="space-y-8 relative z-10">
                                                <Badge className="bg-[#1E5EFF]/10 text-[#1E5EFF] border-none font-black text-[9px] uppercase tracking-widest px-4 py-2 italic rounded-full">{career.industry}</Badge>
                                                <h4 className="text-3xl font-black text-[#0B1F3A] font-sans uppercase tracking-tighter leading-tight italic group-hover:text-[#1E5EFF] transition-colors">{career.title}</h4>
                                                <div className="flex flex-col gap-3 pt-4 border-t border-slate-200/50 italic">
                                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                        <span>Entry Payload: <span className="text-[#0B1F3A]">{career.salary}</span></span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                                        <span className="text-[#1FA774]">Market Demand: {career.demand}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'unis' && (
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <div className="inline-block px-4 py-1 bg-[#4ADE80]/10 text-[#1FA774] rounded-full text-[10px] font-black uppercase tracking-widest italic border border-[#1FA774]/10">
                                        Academic Deployment
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black text-[#0B1F3A] uppercase tracking-tighter font-sans italic leading-[0.9]">Target <br /><span className="text-[#1FA774]">Institutions</span></h2>
                                    <p className="text-slate-400 font-medium italic text-xl border-l-4 border-[#1FA774] pl-6">Verified university nodes matched to professional roadmaps.</p>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { name: 'Fourah Bay College (FBC)', location: 'Mount Aureol' },
                                        { name: 'Njala University', location: 'Bo / Njala Synthesis' },
                                        { name: 'University of Makeni', location: 'Makeni Northern Node' }
                                    ].map((uni, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-slate-100 flex justify-between items-center group cursor-pointer hover:shadow-xl transition-all">
                                            <div>
                                                <div className="font-black text-[#0B1F3A] uppercase tracking-tighter text-lg italic">{uni.name}</div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{uni.location}</div>
                                            </div>
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-[#1FA774] group-hover:scale-110 transition-all">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/universities" className="block">
                                    <button className="w-full h-20 rounded-[2.5rem] border-4 border-slate-100 font-black uppercase tracking-widest text-[10px] hover:bg-[#0B1F3A] hover:text-white hover:border-[#0B1F3A] transition-all italic">
                                        Scan Full Educational Grid
                                    </button>
                                </Link>
                            </div>
                            <div className="p-16 rounded-[4rem] bg-[#0B1F3A] space-y-10 relative overflow-hidden group shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-10 grayscale">
                                    <GraduationCap className="w-48 h-48 text-white" />
                                </div>
                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter font-sans italic relative z-10 leading-none">University <br /><span className="text-gradient-salone">Synthesis</span></h3>
                                <p className="text-slate-400 font-medium italic text-lg leading-relaxed relative z-10">We translate your RIASEC personality vectors into faculty-specific enrollment targets. Precision guidance for higher education.</p>
                                <div className="p-8 bg-white/5 border-l-8 border-[#1FA774] rounded-[2rem] relative z-10 backdrop-blur-md">
                                    <div className="text-[10px] font-black text-[#1FA774] uppercase tracking-[0.2em] mb-2 italic">Intelligence Insight</div>
                                    <div className="text-white font-bold italic text-sm">FBC is the primary cluster for Engineering applicants with High Investigative scores. Enrollment begins October cycle.</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

