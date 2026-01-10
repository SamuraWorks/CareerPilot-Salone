"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, GraduationCap, ExternalLink, Bookmark, Calendar, Globe, Loader2, Sparkles, Zap, Lightbulb, ArrowLeft } from "lucide-react"
import { getScholarships } from "@/lib/db"
import { toast } from "sonner"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function ScholarshipsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [savedScholarships, setSavedScholarships] = useState<string[]>([])
    const [scholarships, setScholarships] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchScholarships = async () => {
            setLoading(true)
            const data = await getScholarships()
            setScholarships(data)
            setLoading(false)
        }
        fetchScholarships()
    }, [])

    const filteredScholarships = scholarships.filter((scholarship) => {
        const matchesSearch =
            scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scholarship.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
            JSON.stringify(scholarship).toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch
    })

    const handleSave = (id: string) => {
        if (savedScholarships.includes(id)) {
            setSavedScholarships(savedScholarships.filter(schId => schId !== id))
            toast.success("Removed from saved scholarships")
        } else {
            setSavedScholarships([...savedScholarships, id])
            toast.success("Scholarship saved!")
        }
    }

    const handleApply = (link?: string, title?: string) => {
        if (link) {
            window.open(link, '_blank')
        } else {
            toast.info(`Application details for "${title}" will be available soon. Check the organization's website regularly!`)
        }
    }

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-10 pb-20">
                {/* --- PREMIUM HERO SECTION --- */}
                <section className="relative rounded-[3.5rem] overflow-hidden bg-[#0B1F3A] min-h-[400px] flex items-center shadow-2xl group border-b-8 border-b-[#1FA774]">
                                        <div className="relative z-20 w-full p-10 md:p-16 space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-md">
                            <Sparkles className="w-4 h-4 text-[#1FA774]" />
                            <span className="text-[#1FA774] font-black text-[10px] uppercase tracking-[0.2em]">Global Opportunity Access</span>
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter font-sans uppercase">
                                Funding <br /> <span className="text-gradient-salone brightness-125">Opportunities</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-300 font-medium font-sans max-w-2xl leading-relaxed border-l-4 border-[#1FA774] pl-6 italic">
                                Find your path to local and international higher education with curated funding for Sierra Leonean students.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-6 pt-2">
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-white">{scholarships.length}</span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Active Grants</span>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-[#1FA774]">{scholarships.filter(s => s.category?.includes("international")).length}</span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">International</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SMART SEARCH --- */}
                <div className="relative -mt-12 z-30 max-w-3xl mx-auto px-6">
                    <Card className="p-4 bg-white border-none shadow-2xl rounded-[2.5rem] flex flex-col md:flex-row gap-4 items-center border-b-4 border-slate-100">
                        <div className="relative flex-1 w-full group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-[#1E5EFF] transition-colors" />
                            <Input
                                className="pl-16 h-16 rounded-2xl border-slate-50 bg-slate-50 focus:bg-white focus:ring-[#1E5EFF]/20 focus:border-[#1E5EFF] w-full text-base font-bold font-sans shadow-inner"
                                placeholder="Search by title, organization, or field..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </Card>
                </div>

                {/* --- SCHOLARSHIPS FEED --- */}
                <div className="space-y-8 px-2">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-32 text-slate-300">
                            <Loader2 className="w-16 h-16 animate-spin text-[#1FA774] mb-6" />
                            <p className="font-black uppercase tracking-[0.4em] text-[10px] italic text-[#0B1F3A]">Scanning Global Databases...</p>
                        </div>
                    ) : filteredScholarships.length === 0 ? (
                        <Card className="p-20 text-center border-dashed border-4 border-slate-100 rounded-[3rem] bg-slate-50">
                            <div className="w-20 h-20 bg-white rounded-[2rem] border border-slate-100 flex items-center justify-center mx-auto mb-6">
                                <Search className="w-8 h-8 text-slate-200" />
                            </div>
                            <h3 className="text-xl font-black text-[#0B1F3A] uppercase font-sans">No matches found</h3>
                            <p className="text-slate-400 font-bold italic text-sm mt-2">Try adjusting your search criteria or checking back soon.</p>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-8">
                            {filteredScholarships.map((scholarship) => (
                                <Card key={scholarship.id} className="p-10 rounded-[3.5rem] bg-white border border-slate-50 hover:border-[#1FA774]/20 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col md:flex-row gap-10">
                                    <div className="absolute top-0 right-0 w-3 h-full bg-slate-50 group-hover:bg-[#1FA774] transition-colors" />

                                    <div className="flex-1 space-y-8">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                            <div className="flex items-start gap-6">
                                                <div className="w-20 h-20 rounded-[1.8rem] bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#1FA774]/5 group-hover:border-[#1FA774]/20 transition-all">
                                                    <GraduationCap className="w-10 h-10 text-[#0B1F3A] group-hover:text-[#1FA774] transition-colors" />
                                                </div>
                                                <div className="space-y-2 pt-2">
                                                    <h3 className="text-2xl md:text-3xl font-black text-[#0B1F3A] group-hover:text-[#1E5EFF] transition-colors font-sans leading-tight">
                                                        {scholarship.title}
                                                    </h3>
                                                    <p className="font-black text-[#1FA774] text-[11px] uppercase tracking-[0.2em] italic">
                                                        {scholarship.organization}
                                                    </p>
                                                </div>
                                            </div>
                                            {scholarship.deadline && (
                                                <Badge className="bg-[#0B1F3A] hover:bg-red-500 text-white border-none py-2 px-5 font-black text-[10px] uppercase tracking-widest gap-3 rounded-full shadow-lg h-fit">
                                                    <Calendar className="w-4 h-4" />
                                                    {scholarship.deadline}
                                                </Badge>
                                            )}
                                        </div>

                                        <p className="text-[#0B1F3A]/70 leading-relaxed text-base font-medium font-sans border-l-4 border-slate-50 pl-6 border-transparent group-hover:border-slate-100 transition-all">
                                            {scholarship.description}
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-8 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 group-hover:bg-white transition-all group-hover:shadow-inner">
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black uppercase text-slate-300 mb-2 tracking-[0.3em] italic">Candidate Profile</p>
                                                <ul className="space-y-3">
                                                    {scholarship.requirements?.map((req: string, idx: number) => (
                                                        <li key={idx} className="flex gap-4 text-xs font-bold text-[#0B1F3A] font-sans">
                                                            <div className="w-2 h-2 rounded-full bg-[#1FA774] mt-1.5 shrink-0" />
                                                            {req}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="space-y-6">
                                                <p className="text-[10px] font-black uppercase text-slate-300 mb-2 tracking-[0.3em] italic">Eligibility Vectors</p>
                                                <div className="flex flex-wrap gap-2.5">
                                                    {scholarship.education_level?.map((level: string) => (
                                                        <Badge key={level} className="bg-white border-slate-200 text-[#0B1F3A] font-black uppercase text-[9px] tracking-widest px-4 py-2 rounded-xl">
                                                            {level}
                                                        </Badge>
                                                    ))}
                                                    {scholarship.category?.map((cat: string) => (
                                                        <Badge key={cat} className="bg-[#1E5EFF]/5 border-[#1E5EFF]/10 text-[#1E5EFF] font-black uppercase text-[9px] tracking-widest px-4 py-2 rounded-xl">
                                                            {cat}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                            <Button
                                                className="flex-1 h-[64px] rounded-2xl bg-[#0B1F3A] hover:bg-[#1E5EFF] text-white font-black uppercase tracking-widest text-[11px] shadow-2xl transition-all active:scale-95 group/btn"
                                                onClick={() => handleApply(scholarship.link, scholarship.title)}
                                            >
                                                Initiate Application Phase
                                                <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleSave(scholarship.id)}
                                                className={cn("h-[64px] rounded-2xl px-8 border-2 border-slate-100 font-black uppercase text-[10px] tracking-widest transition-all hover:bg-white active:scale-95", savedScholarships.includes(scholarship.id) ? "bg-[#1FA774]/10 border-[#1FA774]/20 text-[#1FA774]" : "text-slate-400")}
                                            >
                                                <Bookmark className={cn("w-5 h-5 mr-3", savedScholarships.includes(scholarship.id) && "fill-current")} />
                                                {savedScholarships.includes(scholarship.id) ? "Tracker Active" : "Track Future"}
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* --- MASTERCLASS AD --- */}
                <Card className="p-12 md:p-20 rounded-[4rem] bg-[#0B1F3A] text-white border-none shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1FA774]/10 rounded-full blur-[100px] -z-10 group-hover:bg-[#1E5EFF]/20 transition-all duration-[5s]" />

                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center shadow-xl shadow-emerald-500/10">
                            <Lightbulb className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-3xl md:text-5xl font-black font-sans uppercase tracking-tighter italic">Application <span className="text-[#1FA774]">Intell</span></h3>
                            <p className="text-slate-400 font-bold font-sans text-sm">Strategic tips for the Sierra Leonean scholar</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 relative z-10">
                        {[
                            { id: "01", text: "Start your application early - most scholarships have extremely competitive deadlines and complex documentation needed na Salone." },
                            { id: "02", text: "Prepare strong recommendation letters from teachers or mentors who know your work personally." },
                            { id: "03", text: "Write a compelling personal statement that connects your past experience to your future vision for Sierra Leone." },
                            { id: "04", text: "Keep your academic records current. Maintain a digital folder with all your certificates ready for upload." }
                        ].map((tip) => (
                            <div key={tip.id} className="flex gap-8 group/tip">
                                <div className="text-5xl font-black text-white/5 font-sans group-hover/tip:text-[#1FA774]/20 transition-colors">{tip.id}</div>
                                <p className="text-base text-slate-300 font-medium leading-relaxed font-sans italic pt-2">{tip.text}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}
