"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
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
                <section className="relative rounded-[3.5rem] overflow-hidden bg-[#0B1F3A] min-h-[300px] flex items-center shadow-2xl group mb-12">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/dashboard/salone_success.png"
                            alt="Opportunities"
                            fill
                            className="object-cover opacity-20 transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#1E5EFF]/40 to-transparent z-10" />
                    </div>

                    <div className="relative z-20 max-w-2xl p-10 md:p-16 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1FA774]/10 border border-[#1FA774]/20 rounded-full backdrop-blur-md">
                            <Sparkles className="w-4 h-4 text-[#4ADE80]" />
                            <span className="text-[#4ADE80] font-black text-[10px] uppercase tracking-widest">Growth Center</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-poppins">
                            Your Next <span className="text-gradient-salone brightness-150">Big Move</span>
                        </h1>
                        <p className="text-lg text-slate-300 font-medium font-inter max-w-lg leading-relaxed">
                            Discover vetted jobs, internships, and scholarships tailored to the Sierra Leonean market.
                        </p>
                    </div>
                </section>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black text-[#0B1F3A] tracking-tight font-poppins uppercase">Browse Opportunities</h2>
                        <p className="text-slate-500 font-medium font-inter italic">Filter by what matters to you today.</p>
                    </div>

                    <div className="flex bg-slate-50 border border-slate-100 p-2 rounded-3xl w-fit shadow-inner">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab.id
                                    ? 'bg-[#0B1F3A] text-white shadow-xl'
                                    : 'text-slate-400 hover:text-[#1E5EFF]'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
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
                                    <Card className="p-8 rounded-[2.5rem] border-none bg-white hover:shadow-2xl transition-all group flex flex-col justify-between h-full relative overflow-hidden shadow-sm border-t-4 border-t-transparent hover:border-t-[#1E5EFF]">
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-start">
                                                <Badge className={cn(
                                                    "border-none font-black text-[9px] uppercase tracking-wider px-3 py-1 rounded-full",
                                                    activeTab === 'jobs' ? 'bg-blue-50 text-blue-600' :
                                                        activeTab === 'scholarships' ? 'bg-emerald-50 text-[#1FA774]' :
                                                            activeTab === 'internships' ? 'bg-indigo-50 text-indigo-600' :
                                                                'bg-slate-50 text-slate-600'
                                                )}>
                                                    {activeTab}
                                                </Badge>
                                                <div className="text-[10px] font-black text-[#1FA774] uppercase tracking-widest opacity-60">Verified</div>
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-black text-[#0B1F3A] leading-tight group-hover:text-[#1E5EFF] transition-colors line-clamp-2 font-poppins">{item.title}</h3>
                                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">{item.organization || item.company}</p>
                                            </div>
                                        </div>

                                        <div className="pt-8 mt-8 border-t border-slate-50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#0B1F3A]">
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-slate-50 rounded-lg"><MapPin className="w-3.5 h-3.5 text-[#1E5EFF]" /></div>
                                                <span className="text-slate-500">{item.location || 'Freetown'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 group-hover:text-[#1E5EFF] transition-colors">
                                                View Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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

                {/* CTA */}
                <Card className="p-12 rounded-[3.5rem] bg-gradient-to-br from-[#0B1F3A] to-[#1E5EFF] text-white border-none shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] group-hover:scale-110 transition-transform" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="space-y-4 text-center md:text-left max-w-xl">
                            <h3 className="text-3xl md:text-5xl font-black tracking-tight font-poppins leading-none">Need a better <span className="text-[#4ADE80]">Match</span>?</h3>
                            <p className="text-slate-300 font-medium font-inter leading-relaxed">Our AI Mentor analyzes your profile to find specific internships and grants that don't always appear in public boards.</p>
                        </div>
                        <Link href="/guidance">
                            <button className="h-16 px-12 rounded-2xl bg-white text-[#0B1F3A] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#4ADE80] hover:text-white transition-all shadow-2xl active:scale-95">
                                Talk to AI Mentor
                            </button>
                        </Link>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}
