"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Compass, Target, MessageSquare, Sparkles, GraduationCap, ChevronRight, Brain } from "lucide-react"
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
            <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* PREMIUM HERO HEADER */}
                <section className="relative rounded-[3rem] overflow-hidden bg-[#0B1F3A] min-h-[340px] flex items-center shadow-2xl group">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/dashboard/salone_success.png"
                            alt="Career Hub"
                            fill
                            className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent z-10" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,167,116,0.15),transparent)] z-10" />
                    </div>

                    <div className="relative z-20 max-w-4xl p-10 md:p-16 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
                            <Compass className="w-4 h-4 text-[#1FA774]" />
                            <span className="text-[#1FA774] font-bold text-xs uppercase tracking-widest">Navigation Center</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-poppins">
                            Career <span className="text-[#F4C430]">Hub</span> Express
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 font-medium font-inter max-w-xl leading-relaxed">
                            Your complete path from self-discovery to university and professional success in Sierra Leone.
                        </p>

                        <div className="flex items-center gap-6 pt-2">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-white">50+</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Career Paths</span>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-[#F4C430]">AI</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mentor Support</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tab Switcher */}
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-3xl w-fit">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab.id
                                ? 'bg-white dark:bg-slate-900 text-primary shadow-xl'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    {activeTab === 'test' && (
                        <div className="grid md:grid-cols-2 gap-10 items-center">
                            <div className="space-y-6">
                                <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] tracking-widest px-4 py-1.5 rounded-xl uppercase">Start Here</Badge>
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Identify Your Talent with our RIASEC Analysis</h2>
                                <p className="text-slate-500 text-lg leading-relaxed">Our advanced career assessment takes only 5 minutes and uses the Holland Codes methodology to find where you truly belong in the workforce.</p>
                                <Link href="/career-test">
                                    <button className="h-16 px-10 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95">
                                        Launch Career Test
                                    </button>
                                </Link>
                            </div>
                            <div className="relative aspect-square bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-10 flex items-center justify-center overflow-hidden group">
                                <Sparkles className="w-64 h-64 text-primary opacity-5 animate-pulse" />
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                                <Target className="w-32 h-32 text-primary relative z-10 group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        </div>
                    )}

                    {activeTab === 'ai' && (
                        <div className="grid md:grid-cols-2 gap-10 items-center">
                            <div className="relative aspect-square bg-slate-950 rounded-[3rem] p-10 flex flex-col justify-center gap-6 overflow-hidden">
                                <div className="p-4 bg-white/10 rounded-2xl rounded-bl-none text-white text-sm max-w-[80%]">How do I become a Data Scientist in Freetown?</div>
                                <div className="p-4 bg-primary/20 rounded-2xl rounded-br-none text-primary-foreground text-sm max-w-[80%] self-end">Great choice! You should focus on Math at FBC and take Python courses online...</div>
                                <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 bg-primary/20 rounded-full blur-[100px]" />
                            </div>
                            <div className="space-y-6">
                                <Badge className="bg-green-100 text-green-700 border-none font-black text-[10px] tracking-widest px-4 py-1.5 rounded-xl uppercase">24/7 Mentor</Badge>
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Chat with CareerPilot AI Counselor</h2>
                                <p className="text-slate-500 text-lg leading-relaxed">Ask any question about courses, salaries, or companies in Salone. Our AI understands the local market context better than anyone.</p>
                                <Link href="/guidance">
                                    <button className="h-16 px-10 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs shadow-2xl hover:-translate-y-1 transition-all active:scale-95">
                                        Start Conversation
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {activeTab === 'recommended' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[
                                    { title: 'Software Developer', industry: 'Tech', salary: 'NLE 4,000+', demand: 'Very High' },
                                    { title: 'Mine Engineer', industry: 'Mining', salary: 'NLE 8,000+', demand: 'Steady' },
                                    { title: 'Fisheries Specialist', industry: 'Agriculture', salary: 'NLE 3,500+', demand: 'High' }
                                ].map((career, i) => (
                                    <Link key={i} href="/careers">
                                        <Card className="p-8 rounded-[2.5rem] border-2 border-slate-50 dark:border-slate-800 hover:border-primary/20 hover:shadow-2xl transition-all cursor-pointer group">
                                            <div className="space-y-6">
                                                <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-500 border-none font-black text-[9px] uppercase tracking-widest px-3 py-1">{career.industry}</Badge>
                                                <h4 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{career.title}</h4>
                                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    <span>Entry: {career.salary}</span>
                                                    <span className="text-green-500">Demand: {career.demand}</span>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                            <div className="text-center">
                                <Link href="/careers">
                                    <button className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center mx-auto gap-2">
                                        Browse all 50+ career paths <ChevronRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {activeTab === 'unis' && (
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    {[
                                        { name: 'Fourah Bay College (FBC)', location: 'Freetown' },
                                        { name: 'Njala University', location: 'Bo / Njala' },
                                        { name: 'University of Makeni (UNIMAK)', location: 'Makeni' }
                                    ].map((uni, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center group cursor-pointer hover:bg-slate-50">
                                            <div>
                                                <div className="font-black text-slate-900 dark:text-white">{uni.name}</div>
                                                <div className="text-xs font-bold text-slate-400 uppercase tracking-tight">{uni.location}</div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                                        </div>
                                    ))}
                                </div>
                                <Link href="/universities">
                                    <button className="w-full h-16 rounded-2xl border-2 border-slate-100 dark:border-slate-800 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">
                                        Explore All Institutions
                                    </button>
                                </Link>
                            </div>
                            <div className="p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900 space-y-6">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">University Matcher</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">We map your RIASEC results to specific faculties in Sierra Leonean universities. Know where to apply before the deadline.</p>
                                <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl border-l-4 border-primary">
                                    <div className="text-xs font-black text-primary uppercase tracking-widest mb-1">Expert Advice</div>
                                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">FBC is the leading institution for Engineering students with Realistic/Investigative profiles.</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
