"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, GraduationCap, ExternalLink, Bookmark, Calendar, Globe, Loader2, Sparkles, Zap, Lightbulb, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import { getScholarshipsMock as getScholarships } from "@/lib/mock-api"
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

            <div className="flex flex-col min-h-screen bg-[#F9FAFB] -m-4 md:-m-8 lg:-m-10">

                <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-block mb-4 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
                                <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest">Global Opportunity Access</span>
                            </div>
                            <h1 className="text-5xl font-black mb-4 text-gradient-salone tracking-tight uppercase">Funding Opportunities</h1>
                            <p className="text-lg text-slate-500 max-w-2xl mx-auto text-balance font-medium">
                                Find your path to local and international higher education with curated funding for Sierra Leonean students.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                                    <div className="flex items-center justify-center gap-4 mb-3">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                            <GraduationCap className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <span className="text-4xl font-black text-[#0B1F3A]">{scholarships.length}</span>
                                    </div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Active Grants</p>
                                </div>
                                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                                    <div className="flex items-center justify-center gap-4 mb-3">
                                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                                            <Globe className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <span className="text-4xl font-black text-[#0B1F3A]">{scholarships.filter(s => s.category?.includes("international")).length}</span>
                                    </div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">International</p>
                                </div>
                                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                                    <div className="flex items-center justify-center gap-4 mb-3">
                                        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                                            <Zap className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <span className="text-4xl font-black text-[#0B1F3A]">100%</span>
                                    </div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Verified Base</p>
                                </div>
                            </div>
                        </div>

                        {/* Search and Filter */}
                        <div className="mb-12 space-y-6">
                            <div className="relative max-w-2xl mx-auto">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    type="search"
                                    placeholder="Search by title, organization, or field..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-14 h-16 rounded-[2rem] border-slate-200 shadow-lg text-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                                />
                            </div>
                        </div>

                        {/* --- SCHOLARSHIPS FEED --- */}
                        <div className="space-y-8">
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
                                            <div className="absolute inset-0 z-0 opacity-[0.03] grayscale pointer-events-none">
                                                <Image src="/images/sections/dashboard/scholarship.png" alt="Scholarship" fill className="object-cover" />
                                            </div>
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
                                                            {scholarship.last_verified_at && (
                                                                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-black uppercase text-[9px] tracking-widest px-4 py-2 rounded-xl">
                                                                    Verified {new Date(scholarship.last_verified_at).toLocaleDateString()}
                                                                </Badge>
                                                            )}
                                                            {scholarship.education_level && (
                                                                Array.isArray(scholarship.education_level)
                                                                    ? scholarship.education_level.map((level: string) => (
                                                                        <Badge key={level} className="bg-white border-slate-200 text-[#0B1F3A] font-black uppercase text-[9px] tracking-widest px-4 py-2 rounded-xl">
                                                                            {level}
                                                                        </Badge>
                                                                    ))
                                                                    : <Badge className="bg-white border-slate-200 text-[#0B1F3A] font-black uppercase text-[9px] tracking-widest px-4 py-2 rounded-xl">{scholarship.education_level}</Badge>
                                                            )}
                                                            {scholarship.category && (
                                                                Array.isArray(scholarship.category)
                                                                    ? scholarship.category.map((cat: string) => (
                                                                        <Badge key={cat} className="bg-[#1E5EFF]/5 border-[#1E5EFF]/10 text-[#1E5EFF] font-black uppercase text-[9px] tracking-widest px-4 py-2 rounded-xl">
                                                                            {cat}
                                                                        </Badge>
                                                                    ))
                                                                    : <Badge className="bg-[#1E5EFF]/5 border-[#1E5EFF]/10 text-[#1E5EFF] font-black uppercase text-[9px] tracking-widest px-4 py-2 rounded-xl">{scholarship.category}</Badge>
                                                            )}
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
                </main>
                <Footer />
            </div>
        </DashboardLayout>
    )
}

