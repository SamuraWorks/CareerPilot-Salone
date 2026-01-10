"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Zap, Users, MapPin, ArrowRight, Loader2, Search, Sparkles } from "lucide-react"
import { getJobs, getScholarships } from "@/lib/db"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

export default function OpportunitiesPage() {
    const [activeTab, setActiveTab] = useState<'jobs' | 'internships' | 'scholarships' | 'training'>('jobs')
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<{ jobs: any[], scholarships: any[], internships: any[], training: any[] }>({
        jobs: [],
        scholarships: [],
        internships: [],
        training: []
    })

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            try {
                const [jobs, scholarships] = await Promise.all([getJobs(), getScholarships()])
                setData({
                    jobs: jobs.filter(j => j.type !== 'internship'),
                    scholarships: scholarships,
                    internships: jobs.filter(j => j.type === 'internship'),
                    training: [
                        { id: 't1', title: 'Data Analytics Training', organization: 'DSTI Salone', location: 'Freetown', deadline: '10 Feb 2026' },
                        { id: 't2', title: 'Solar Repair Training', organization: 'Barefoot Women College', location: 'Lungi', deadline: '15 Feb 2026' }
                    ]
                })
            } catch (e) { console.error(e) } finally { setLoading(false) }
        }
        loadData()
    }, [])

    const tabs = [
        { id: 'jobs', label: 'Jobs', icon: Briefcase },
        { id: 'internships', label: 'Internships', icon: Users },
        { id: 'scholarships', label: 'Scholarships', icon: GraduationCap },
        { id: 'training', label: 'Training', icon: Zap },
    ]

    const currentList = data[activeTab] || []

    return (
        <DashboardLayout>
            <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">
                {/* HERO HEADER - Green-Blue Theme */}
                <section className="relative rounded-3xl overflow-hidden bg-primary min-h-[300px] flex items-center shadow-lg group mb-12">
                    <div className="relative z-20 max-w-2xl p-8 md:p-12 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wide">Growth Center</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight font-sans">
                            Your Next <span className="text-emerald-400 brightness-110">Big Move</span>
                        </h1>
                        <p className="text-lg text-slate-200 font-medium font-sans max-w-lg leading-relaxed">
                            Discover vetted jobs, internships, and scholarships tailored to the Sierra Leonean market.
                        </p>
                    </div>
                </section>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">Browse Opportunities</h2>
                        <p className="text-muted-foreground font-medium font-sans">Filter by what matters to you today.</p>
                    </div>

                    <div className="flex bg-slate-50 border border-slate-100 p-1.5 rounded-2xl w-fit shadow-inner">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${activeTab === tab.id
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-slate-500 hover:text-primary'
                                    }`}
                            >
                                <tab.icon className="w-3.5 h-3.5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-32">
                        <Loader2 className="w-12 h-12 animate-spin text-[#1E5EFF] opacity-40" />
                        <p className="mt-4 font-black uppercase tracking-widest text-xs text-slate-400">Searching Salone...</p>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentList.map((item, i) => (
                                <Link key={i} href={activeTab === 'scholarships' ? `/scholarships` : `/jobs`}>
                                    <Card className="p-6 rounded-3xl border-none bg-white hover:shadow-xl transition-all group flex flex-col justify-between h-full relative overflow-hidden shadow-sm border-t-4 border-t-transparent hover:border-t-primary">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-start">
                                                <Badge className={cn(
                                                    "border-none font-bold text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full",
                                                    activeTab === 'jobs' ? 'bg-blue-50 text-blue-600' :
                                                        activeTab === 'scholarships' ? 'bg-emerald-50 text-emerald-600' :
                                                            activeTab === 'internships' ? 'bg-indigo-50 text-indigo-600' :
                                                                'bg-slate-50 text-slate-600'
                                                )}>
                                                    {activeTab}
                                                </Badge>
                                                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wide opacity-80">Verified</div>
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors line-clamp-2 font-sans">{item.title}</h3>
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide leading-none">{item.organization || item.company}</p>
                                            </div>
                                        </div>

                                        <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold uppercase tracking-wide text-slate-900">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-slate-50 rounded-md"><MapPin className="w-3 h-3 text-primary" /></div>
                                                <span className="text-muted-foreground">{item.location || 'Freetown'}</span>
                                            </div>
                                            <div className="flex items-center gap-1 group-hover:text-primary transition-colors">
                                                View Now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}

                            {currentList.length === 0 && (
                                <div className="col-span-full py-40 text-center">
                                    <Search className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                                    <p className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-300">No {activeTab} categories matched your search.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* CTA Banner - DARK PREMIUM */}
                <section className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute inset-0 z-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-2 text-center md:text-left max-w-xl">
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight">Need a <br /> better <span className="text-emerald-300">Match?</span></h2>
                            <p className="text-base text-white/90 font-medium font-sans leading-relaxed">Our AI Mentor analyzes your profile to find specific internships and grants that don't always appear in public boards.</p>
                        </div>
                        <Link href="/guidance">
                            <Button size="lg" className="h-14 px-8 rounded-xl bg-white text-primary font-bold uppercase tracking-wide text-xs hover:bg-slate-900 hover:text-white transition-all shadow-lg active:scale-95 border-none">
                                Start AI Consultation
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    )
}
