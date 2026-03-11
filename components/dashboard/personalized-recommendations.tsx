"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProfile } from "@/lib/profile-context"
import { Sparkles, GraduationCap, Briefcase, Users, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { SIERRA_LEONE_OPPORTUNITIES, Opportunity } from "@/lib/sierra-leone-opportunities"

const RECOMMENDATION_LOGIC = {
    getUnis: (career: string) => {
        const lower = career.toLowerCase()
        if (lower.includes('doctor') || lower.includes('health')) return ["COMAHS - Freetown", "Njala University (Public Health)"]
        if (lower.includes('developer') || lower.includes('engineer')) return ["FBC (Engineering Faculty)", "IPAM (Technology Dept)", "BlueCrest College"]
        if (lower.includes('law')) return ["FBC Law Faculty"]
        if (lower.includes('agric') || lower.includes('mine')) return ["Njala University (Agric)", "FBC (G&M Dept)"]
        return ["University of Sierra Leone", "Njala University", "UNIMAK"]
    },
    getCourses: (career: string) => {
        const lower = career.toLowerCase()
        if (lower.includes('developer')) return ["Advanced React Patterns", "Database Management for Salone", "Cloud Computing Basics"]
        if (lower.includes('health')) return ["Epidemiology 101", "Community Health Management", "Emergency Response"]
        if (lower.includes('agric')) return ["Modern Agribusiness", "Sustainable Farming", "Value Chain Management"]
        return ["Professional communication", "Digital Literacy", "Project Management"]
    },
    getMentors: (career: string) => {
        const lower = career.toLowerCase()
        if (lower.includes('developer')) return ["Miatta D. (Lead at DSTI)", "Sahr E. (Tech Founder)"]
        if (lower.includes('health')) return ["Dr. Lansana K. (Ministry of Health)", "Nurse Yeabu S."]
        return ["Alhassan B. (Career Coach)", "Findu K. (NGO Director)"]
    },
    getMatches: (career: string): Opportunity[] => {
        const lower = career.toLowerCase()
        return SIERRA_LEONE_OPPORTUNITIES.filter(o =>
            o.isActive && (
                o.title.toLowerCase().includes(lower) ||
                o.category.some(c => lower.includes(c.toLowerCase()))
            )
        ).slice(0, 2)
    }
}

export function PersonalizedRecommendations() {
    const { profile } = useProfile()
    const career = profile?.career_goal || "Professional"

    const unis = RECOMMENDATION_LOGIC.getUnis(career)
    const courses = RECOMMENDATION_LOGIC.getCourses(career)
    const mentors = RECOMMENDATION_LOGIC.getMentors(career)

    const matches = RECOMMENDATION_LOGIC.getMatches(career)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Academic Growth */}
            <Card className="border-none bg-white shadow-xl shadow-blue-500/5 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="pb-2 bg-gradient-to-br from-blue-50 to-transparent">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-blue-900 flex items-center gap-3">
                        <div className="p-2 bg-blue-500 rounded-xl text-white shadow-lg shadow-blue-500/20">
                            <GraduationCap className="w-4 h-4" />
                        </div>
                        Academic Pathways
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Top University Matches</h4>
                        {unis.map((uni, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-blue-500 font-black text-xs">
                                    {uni[0]}
                                </div>
                                <span className="text-sm font-bold text-slate-700">{uni}</span>
                                <ArrowRight className="w-4 h-4 ml-auto text-slate-200 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 pt-2">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Recommended Courses</h4>
                        <div className="flex flex-wrap gap-2">
                            {courses.map((course, i) => (
                                <Badge key={i} variant="outline" className="bg-white border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-600 font-bold hover:border-blue-500 transition-colors">
                                    <BookOpen className="w-3 h-3 mr-2 text-blue-500" />
                                    {course}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tactical Connections */}
            <Card className="border-none bg-white shadow-xl shadow-emerald-500/5 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="pb-2 bg-gradient-to-br from-emerald-50 to-transparent">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-emerald-900 flex items-center gap-3">
                        <div className="p-2 bg-emerald-500 rounded-xl text-white shadow-lg shadow-emerald-500/20">
                            <Users className="w-4 h-4" />
                        </div>
                        Tactical Connections
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Mentor Matches (Available)</h4>
                        {mentors.map((mentor, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden">
                                    <Users className="w-4 h-4 text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 leading-none">{mentor}</p>
                                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">Verified Mentor</span>
                                </div>
                                <Button size="sm" variant="ghost" className="ml-auto rounded-xl text-xs font-black text-emerald-600">
                                    CONNECT
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="p-5 bg-gradient-to-br from-[#0B1F3A] to-[#1E5EFF] rounded-[1.5rem] text-white">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/10 rounded-2xl">
                                <Sparkles className="w-6 h-6 text-emerald-300 animate-pulse" />
                            </div>
                            <div className="space-y-2 flex-1">
                                <h4 className="text-sm font-black uppercase leading-tight tracking-wider">AI Tactical Deployment</h4>
                                {matches.length > 0 ? (
                                    <div className="space-y-2 py-2">
                                        <p className="text-[10px] text-white/70 font-bold uppercase">Immediate Matches Found:</p>
                                        {matches.map(m => (
                                            <div key={m.id} className="flex items-center justify-between p-2 bg-white/10 rounded-xl border border-white/5">
                                                <div className="min-w-0">
                                                    <p className="text-xs font-black truncate">{m.title}</p>
                                                    <p className="text-[8px] text-emerald-400 font-bold uppercase">{m.organization}</p>
                                                </div>
                                                <a href={m.link || '#'} target="_blank" className="p-1 px-2 bg-emerald-500 rounded-md text-[8px] font-black hover:bg-emerald-400 transition-colors">
                                                    APPLY
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-white/70 font-medium my-2">Your profile is strong. We recommend optimizing your CV for localized technical roles in <span className="text-white font-bold">{profile.district || 'Salone'}</span>.</p>
                                )}
                                <Link href="/cv-builder?adapt=true" className="block w-full">
                                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-[10px] py-1 h-9 rounded-xl border border-white/20">
                                        Adapt My Package
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function Badge({ children, variant, className }: any) {
    return (
        <div className={`inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
            {children}
        </div>
    )
}
