"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import {
    BookOpen,
    HelpCircle,
    ShieldCheck,
    FileText,
    ArrowRight,
    Video,
    Sparkles,
    Zap
} from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
    const resourceCategories = [
        {
            title: "Help Center",
            desc: "Step-by-step guidance on all CareerPilot Salone features.",
            href: "/help",
            icon: HelpCircle,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "FAQ",
            desc: "Quick answers to common questions about accounts and CVs.",
            href: "/faq",
            icon: MessageCircleIcon,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            title: "User Guide",
            desc: "A comprehensive manual for maximizing your career potential.",
            href: "/user-guide",
            icon: BookOpen,
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            title: "Privacy Architecture",
            desc: "Learn how we protect your professional and personal data.",
            href: "/privacy",
            icon: ShieldCheck,
            color: "text-indigo-600",
            bg: "bg-indigo-50"
        },
        {
            title: "Terms of Engagement",
            desc: "The standard protocols for utilizing the platform.",
            href: "/terms",
            icon: FileText,
            color: "text-slate-600",
            bg: "bg-slate-100"
        },
        {
            title: "Education Partners",
            desc: "Browse connected universities across Sierra Leone.",
            href: "/universities",
            icon: GraduationCapIcon,
            color: "text-rose-600",
            bg: "bg-rose-50"
        }
    ]

    return (
        <DashboardLayout>
            <main className="max-w-6xl mx-auto py-12 px-6 space-y-20">
                {/* --- HEADER --- */}
                <section className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">Resource Node</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-gradient-salone leading-none tracking-tight uppercase">
                        Resource Nexus
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed italic">
                        Everything you need to master your professional journey na Salone.
                    </p>
                </section>

                {/* --- RESOURCE GRID --- */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resourceCategories.map((cat, i) => (
                        <Link href={cat.href} key={i}>
                            <Card className="h-full border-slate-100 hover:border-emerald-500/30 hover:shadow-lg transition-all duration-300 rounded-[2.5rem] group cursor-pointer overflow-hidden bg-white/50">
                                <CardContent className="p-8 space-y-6">
                                    <div className={`${cat.bg} w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                                        <cat.icon className={`${cat.color} w-7 h-7`} />
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-[#0B1F3A] uppercase tracking-tight">{cat.title}</h3>
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed italic">{cat.desc}</p>
                                    </div>

                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 pt-2">
                                        Access Node <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* --- VIDEO MASTERCLASS simplified --- */}
                <Card className="bg-[#0B1F3A] rounded-[3.5rem] overflow-hidden relative group border-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-12 md:p-16">
                        <div className="space-y-6 text-white">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                <Video className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight italic leading-tight">Video <br /><span className="text-emerald-400">Masterclass</span></h2>
                            <p className="text-slate-300 font-medium leading-relaxed italic">
                                Learn how to leverage our AI engines to dominate the job market na Salone.
                            </p>
                            <a
                                href="https://youtu.be/SMkLYy0U_60"
                                target="_blank"
                                className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500 rounded-xl text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95"
                            >
                                Watch Video <Zap className="w-4 h-4 fill-white" />
                            </a>
                        </div>
                        <a href="https://youtu.be/SMkLYy0U_60" target="_blank" className="relative aspect-video rounded-[2rem] overflow-hidden border-4 border-white/5 shadow-2xl">
                            <div className="absolute inset-0 bg-[#0B1F3A]/60 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#0B1F3A] border-b-[8px] border-b-transparent ml-1" />
                                </div>
                            </div>
                        </a>
                    </div>
                </Card>
            </main>
        </DashboardLayout>
    )
}

function MessageCircleIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
    )
}

function GraduationCapIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
    )
}
