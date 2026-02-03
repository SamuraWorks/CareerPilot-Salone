"use client"

import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    User,
    Search,
    BookOpen,
    GraduationCap,
    FileText,
    Target,
    Cpu,
    Shield,
    Zap,
    ArrowRight
} from "lucide-react"

export default function UserGuidePage() {
    const operations = [
        {
            step: "01",
            title: "Career DNA Setup",
            desc: "Building your professional foundation.",
            icon: User,
            color: "text-blue-600",
            bg: "bg-blue-50",
            items: [
                { title: "Profile Creation", body: "Start by setting up your profile. Your dashboard serves as the command center for your entire career journey in Sierra Leone." },
                { title: "Smart Intake", body: "Enter your education and skills. Our AI uses this data to map out paths that fit the current Salone job market." }
            ]
        },
        {
            step: "02",
            title: "Market Intelligence",
            desc: "Discovering high-demand paths and institutions.",
            icon: Search,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            items: [
                { title: "Career Explorer", body: "Scan high-growth sectors na Salone, from Tech to Agriculture. View local salary ranges and demand levels for over 50+ career paths." },
                { title: "University Guide", body: "Access detailed info on FBC, IPAM, Njala, and UNIMAK to ensure your degree choice aligns with real industry needs." }
            ]
        },
        {
            step: "03",
            title: "Path Execution",
            desc: "Your 90-day roadmap to success.",
            icon: Target,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            items: [
                { title: "90-Day Roadmap", body: "Get a clear, daily checklist tailored to your goal. Know exactly what to learn and which projects to build every single week." },
                { title: "Readiness Tracking", body: "Monitor your progress via the Readiness Meter. As you complete tasks, your profile moves closer to 'Job-Ready' status." }
            ]
        },
        {
            step: "04",
            title: "Application Suite",
            desc: "Professional CVs and local opportunities.",
            icon: FileText,
            color: "text-rose-600",
            bg: "bg-rose-50",
            items: [
                { title: "CV Builder", body: "Generate a professional, industry-standard resume in minutes. Perfect for both local and international applications." },
                { title: "Job & Scholarship Board", body: "Browse vetted job openings and local scholarships like 'Grant-in-Aid' with real-time deadline tracking." }
            ]
        },
        {
            step: "05",
            title: "AI & Smart Access",
            desc: "24/7 Mentorship via Web and WhatsApp.",
            icon: Cpu,
            color: "text-blue-600",
            bg: "bg-blue-50",
            items: [
                { title: "AI Mentor", body: "Our AI provides professional guidance 24/7. Ask for interview tips, salary negotiation advice, or personalized path adjustments." },
                { title: "WhatsApp Integration", body: "Connect with our bot for low-data access. Get alerts and guidance na your phone, even with limited internet connectivity." }
            ]
        }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="inline-block mb-4 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
                            <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                <BookOpen className="w-3 h-3" /> Platform Guide
                            </span>
                        </div>
                        <h1 className="text-4xl xs:text-5xl md:text-7xl font-black mb-4 text-gradient-salone tracking-tight uppercase italic leading-none pb-2">
                            User <br /> Guide
                        </h1>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto text-balance font-medium italic border-l-4 border-emerald-500 pl-6 text-left md:text-center md:border-none md:pl-0">
                            A clear, actionable walkthrough to help you navigate the Sierra Leonean job market and achieve your career goals.
                        </p>
                    </div>

                    {/* Operations Grid */}
                    <div className="space-y-12 mb-20">
                        {operations.map((op, i) => (
                            <Card key={i} className="border-none bg-white rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group">
                                <CardContent className="p-6 md:p-16">
                                    <div className="flex flex-col lg:flex-row gap-12">
                                        {/* Left Side: Header */}
                                        <div className="lg:w-1/3 space-y-6">
                                            <div className={`${op.bg} w-20 h-20 rounded-[2rem] flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                                                <op.icon className={`${op.color} w-10 h-10`} />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] italic mb-1">
                                                    Operation {op.step}
                                                </div>
                                                <h2 className="text-3xl font-black text-[#0B1F3A] uppercase tracking-tighter font-sans italic leading-none">
                                                    {op.title}
                                                </h2>
                                                <p className="text-slate-400 font-bold italic text-xs uppercase tracking-widest pt-2">
                                                    {op.desc}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right Side: Detailed Items */}
                                        <div className="lg:w-2/3 space-y-12">
                                            {op.items.map((item, j) => (
                                                <div key={j} className="space-y-4 pl-10 border-l-2 border-slate-50 group-hover:border-emerald-500 transition-all relative">
                                                    {/* Custom bullet */}
                                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-slate-100 group-hover:border-emerald-500 transition-all shadow-sm" />

                                                    <h3 className="text-xl font-black text-[#0B1F3A] uppercase tracking-tight font-sans italic group-hover:text-emerald-500 transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-slate-500 font-medium leading-relaxed italic text-sm md:text-base">
                                                        {item.body}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Final CTA (Synced with Homepage/Careers look) */}
                    <div className="mt-24">
                        <div className="rounded-[4rem] bg-[#0B1F3A] p-12 md:p-24 text-center space-y-10 relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />

                            <div className="relative z-10 space-y-8">
                                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter font-sans italic leading-tight max-w-2xl mx-auto">
                                    Ready to <span className="text-emerald-500 underline decoration-emerald-500/30">Achieve</span> <br /> Your Career Goal?
                                </h3>
                                <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                                    <Link href="/dashboard">
                                        <Button className="h-16 px-12 rounded-[2rem] bg-emerald-500 text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-[#0B1F3A] transition-all active:scale-95 shadow-xl shadow-emerald-500/20 group/btn">
                                            Go to My Dashboard
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                    <Link href="/careers">
                                        <Button className="h-16 px-12 rounded-[2rem] bg-transparent border-2 border-white/20 text-white font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all active:scale-95">
                                            Discover Careers
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-12 pb-12">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] italic">
                                Built for Sierra Leonean Professionals // Platform Status: Online
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
