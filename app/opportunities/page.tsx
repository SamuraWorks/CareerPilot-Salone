"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Zap, Users, MapPin, ArrowRight, Loader2, Search, Sparkles } from "lucide-react"
import { Footer } from "@/components/footer"
import { getJobs, getScholarshipsMock as getScholarships } from "@/lib/mock-api"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { useProfile } from "@/lib/profile-context"
import { logActivity } from "@/lib/tracker"
import { SIERRA_LEONE_OPPORTUNITIES } from "@/lib/sierra-leone-opportunities"
import { BadgeCheck } from "lucide-react"
import { toast } from "sonner"

export default function OpportunitiesPage() {
    const { user } = useAuth()
    const { profile, updateProfile } = useProfile()
    const [activeTab, setActiveTab] = useState<'jobs' | 'internships' | 'scholarships' | 'training' | 'hackathons'>('jobs')
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<{ jobs: any[], scholarships: any[], internships: any[], training: any[], hackathons: any[] }>({
        jobs: [],
        scholarships: [],
        internships: [],
        training: [],
        hackathons: []
    })

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            try {
                const response = await getJobs() // Actually this returns jobs and internships
                const scholarshipData = await getScholarships()
                const hackathonData = SIERRA_LEONE_OPPORTUNITIES.filter(o => o.type === 'hackathon')

                setData({
                    jobs: response.filter(j => j.type === 'job'),
                    scholarships: scholarshipData,
                    internships: response.filter(j => j.type === 'internship'),
                    hackathons: hackathonData,
                    training: [
                        { id: 't1', title: 'Data Analytics Training', organization: 'DSTI Salone', location: 'Freetown', deadline: '10 Feb 2026', link: 'https://dsti.gov.sl' },
                        { id: 't2', title: 'Solar Repair Training', organization: 'Barefoot Women College', location: 'Lungi', deadline: '15 Feb 2026', link: 'https://barefootcollege.org' }
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
        { id: 'hackathons', label: 'Hackathons', icon: Sparkles },
        { id: 'training', label: 'Training', icon: Zap },
    ]

    const currentList = data[activeTab] || []

    return (
        <DashboardLayout>

            <div className="flex flex-col min-h-screen bg-[#F9FAFB] -m-4 md:-m-8 lg:-m-10">

                <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-block mb-4 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
                                <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest">Growth Center</span>
                            </div>
                            <h1 className="text-5xl font-black mb-4 text-gradient-salone tracking-tight uppercase">Opportunities</h1>
                            <p className="text-lg text-slate-500 max-w-2xl mx-auto text-balance font-medium">
                                Discover vetted jobs, internships, and scholarships tailored to the Sierra Leonean market.
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div className="space-y-1">
                                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Browse Opportunities</h2>
                                <p className="text-slate-500 font-medium font-sans">Filter by what matters to you today.</p>
                            </div>

                            <div className="flex bg-white border border-slate-100 p-1 rounded-2xl w-full md:w-fit shadow-sm overflow-x-auto no-scrollbar">
                                <div className="flex shrink-0 gap-1">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id
                                                ? 'bg-[#0B1F3A] text-white shadow-md'
                                                : 'text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-50'
                                                }`}
                                        >
                                            <tab.icon className="w-3.5 h-3.5" />
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
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
                                        <div
                                            key={i}
                                            className="h-full"
                                        >
                                            <Card className="p-6 rounded-3xl border-none bg-white hover:shadow-xl transition-all group flex flex-col justify-between h-full relative overflow-hidden shadow-sm border-t-4 border-t-transparent hover:border-t-primary">
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <Badge className={cn(
                                                            "border-none font-bold text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full",
                                                            activeTab === 'jobs' ? 'bg-blue-50 text-blue-600' :
                                                                activeTab === 'scholarships' ? 'bg-emerald-50 text-emerald-600' :
                                                                    activeTab === 'internships' ? 'bg-indigo-50 text-indigo-600' :
                                                                        activeTab === 'hackathons' ? 'bg-rose-50 text-rose-600' :
                                                                            'bg-slate-50 text-slate-600'
                                                        )}>
                                                            {activeTab}
                                                        </Badge>
                                                        <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wide opacity-80 flex items-center gap-1">
                                                            <BadgeCheck className="w-3 h-3" /> Verified
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h3 className="text-xl font-black text-slate-900 leading-[1.1] group-hover:text-primary transition-colors line-clamp-2 font-sans">{item.title}</h3>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.organization || item.company}</p>
                                                    </div>

                                                    <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex-1">
                                                        <p className="text-sm font-medium text-slate-600 line-clamp-3 leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 mt-6">
                                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-900">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-1.5 bg-slate-100 rounded-md"><MapPin className="w-3 h-3 text-primary" /></div>
                                                            <span className="text-slate-500 font-bold">{item.location || 'Freetown'}</span>
                                                        </div>
                                                        <div className="text-slate-400">
                                                            Deadline: <span className="text-slate-900 font-black">{item.deadline || 'OPEN'}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <Button
                                                            asChild
                                                            className="flex-1 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-xl shadow-lg shadow-primary/20"
                                                            onClick={async () => {
                                                                if (user?.id) {
                                                                    await logActivity(user.id, 'opportunity_click', {
                                                                        opp_id: item.id,
                                                                        type: activeTab,
                                                                        title: item.title
                                                                    })
                                                                }
                                                            }}
                                                        >
                                                            <a href={item.link || '#'} target="_blank" rel="noopener noreferrer">
                                                                Visit Link <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                                                            </a>
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="w-12 h-12 p-0 rounded-xl border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-colors"
                                                            onClick={() => toast.success("Opportunity pinned for tactical follow-up.")}
                                                        >
                                                            <Zap className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
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
                </main>
                <Footer />
            </div>
        </DashboardLayout>
    )
}
