"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Zap, Users, MapPin, ArrowRight, Loader2, Search, Sparkles } from "lucide-react"
import { getJobs, getScholarships } from "@/lib/db"
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
                // Categorize
                setData({
                    jobs: jobs.filter(j => j.type !== 'internship'),
                    scholarships: scholarships,
                    internships: jobs.filter(j => j.type === 'internship'),
                    training: [
                        { id: 't1', title: 'Full Stack Development', organization: 'Orange Digital Center', location: 'Freetown', deadline: '20 Feb 2026' },
                        { id: 't2', title: 'Digital Marketing Bootcamp', organization: 'Innovation SL', location: 'Freetown', deadline: 'Open' }
                    ]
                })
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
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
            <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* HERO HEADER */}
                <section className="relative rounded-[2.5rem] overflow-hidden bg-[#0B1F3A] min-h-[300px] flex items-center shadow-2xl group mb-12">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/dashboard/salone_success.png"
                            alt="Opportunities"
                            fill
                            className="object-cover opacity-50 transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent z-10" />
                    </div>

                    <div className="relative z-20 max-w-2xl p-10 md:p-16 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
                            <Sparkles className="w-4 h-4 text-[#1FA774]" />
                            <span className="text-[#1FA774] font-bold text-xs uppercase tracking-widest">Growth Center</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                            Your Next <span className="text-[#F4C430]">Big Move</span>
                        </h1>
                        <p className="text-lg text-slate-300 font-medium font-inter max-w-lg">
                            Discover vetted jobs, internships, and scholarships tailored to the Sierra Leonean market.
                        </p>
                    </div>
                </section>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Browse Categories</h2>
                        <p className="text-slate-500 font-medium">Filter by what matters to you today.</p>
                    </div>

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
                </div>

                {/* Main Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-32">
                        <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
                        <p className="mt-4 font-black uppercase tracking-widest text-xs text-slate-400">Loading Matches...</p>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentList.map((item, i) => (
                                <Link key={i} href={activeTab === 'scholarships' ? `/scholarships` : `/jobs`}>
                                    <Card className="p-8 rounded-[3rem] border-2 border-slate-50 dark:border-slate-800 hover:border-primary/30 hover:shadow-2xl transition-all group flex flex-col justify-between h-full relative overflow-hidden">
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-start">
                                                <Badge className={`${activeTab === 'jobs' ? 'bg-green-100 text-green-700' :
                                                    activeTab === 'scholarships' ? 'bg-blue-100 text-blue-700' :
                                                        activeTab === 'internships' ? 'bg-orange-100 text-orange-700' :
                                                            'bg-purple-100 text-purple-700'
                                                    } border-none font-black text-[9px] uppercase tracking-wider px-3 py-1 rounded-full`}>
                                                    {activeTab}
                                                </Badge>
                                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Score: 92%</div>
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                                                <p className="text-sm font-bold text-slate-400 uppercase tracking-tight">{item.organization || item.company}</p>
                                            </div>
                                        </div>

                                        <div className="pt-8 mt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-red-500" />
                                                {item.location || 'Freetown'}
                                            </div>
                                            <div className="flex items-center gap-1.5 group-hover:text-primary transition-colors">
                                                Apply <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}

                            {currentList.length === 0 && (
                                <div className="col-span-full py-40 text-center">
                                    <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                    <p className="font-black uppercase tracking-widest text-xs text-slate-400">No {activeTab} available at the moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <Card className="p-10 rounded-[3.5rem] bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-3 text-center md:text-left">
                            <h3 className="text-3xl font-black tracking-tight">Can't find what you need?</h3>
                            <p className="text-slate-400 font-medium">Our AI Counselor can help you find hidden opportunities based on your specific skills.</p>
                        </div>
                        <Link href="/guidance">
                            <button className="h-16 px-10 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] hover:bg-green-500 hover:text-white transition-all shadow-xl active:scale-95">
                                Ask Career AI
                            </button>
                        </Link>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}
