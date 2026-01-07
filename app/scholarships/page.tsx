"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, GraduationCap, ExternalLink, Bookmark, Calendar, Globe, Loader2 } from "lucide-react"
import { getScholarships } from "@/lib/db"
import { toast } from "sonner"
import Image from "next/image"

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
            <div className="space-y-6">
                {/* PREMIUM HERO HEADER */}
                <section className="relative rounded-[3rem] overflow-hidden bg-[#0B1F3A] min-h-[340px] flex items-center shadow-2xl group">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/dashboard/salone_success.png"
                            alt="Scholarships"
                            fill
                            className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent z-10" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,167,116,0.15),transparent)] z-10" />
                    </div>

                    <div className="relative z-20 max-w-4xl p-10 md:p-16 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
                            <GraduationCap className="w-4 h-4 text-[#1FA774]" />
                            <span className="text-[#1FA774] font-bold text-xs uppercase tracking-widest">Global Access</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-poppins">
                            Scholarship <span className="text-[#F4C430]">Future</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 font-medium font-inter max-w-xl leading-relaxed">
                            Find your path to local and international higher education with curated funding opportunities for Sierra Leonean students.
                        </p>

                        <div className="flex items-center gap-6 pt-2">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-white">{scholarships.length}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Active</span>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-[#F4C430]">{scholarships.filter(s => s.category?.includes("international")).length}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">International</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search scholarships by title, organization, or field..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 h-12"
                    />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-primary/5 border-primary/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-800">{scholarships.length}</p>
                                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Available</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 bg-emerald-50/50 border-emerald-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <Globe className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-800">
                                    {scholarships.filter(s => s.category?.includes("international")).length}
                                </p>
                                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">International</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 bg-slate-50 border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                <Bookmark className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-800">{savedScholarships.length}</p>
                                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Saved Items</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Scholarships List */}
                <div className="space-y-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-20 text-muted-foreground">
                            <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                            <p className="font-medium">Finding the latest scholarships for you...</p>
                        </div>
                    ) : filteredScholarships.length === 0 ? (
                        <Card className="p-12 text-center border-dashed border-2">
                            <p className="text-muted-foreground font-medium">No scholarships found matching your criteria.</p>
                        </Card>
                    ) : (
                        filteredScholarships.map((scholarship) => (
                            <Card key={scholarship.id} className="p-8 hover:shadow-xl transition-all border-slate-100 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-2 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                                <div className="flex flex-col gap-6">
                                    {/* Header */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                                            <GraduationCap className="w-7 h-7 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-primary transition-colors">
                                                {scholarship.title}
                                            </h3>
                                            <p className="font-bold text-slate-500 text-lg uppercase text-[12px] tracking-wide">
                                                {scholarship.organization}
                                            </p>
                                        </div>
                                        {scholarship.deadline && (
                                            <Badge variant="destructive" className="h-8 gap-2 px-3 font-bold text-[10px] uppercase">
                                                <Calendar className="w-3.5 h-3.5" />
                                                Due: {scholarship.deadline}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        {scholarship.description}
                                    </p>

                                    {/* Categories & Requirements Grid */}
                                    <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                                        <div>
                                            <p className="text-xs font-black uppercase text-slate-400 mb-3 tracking-widest leading-none">Requirements</p>
                                            <ul className="space-y-2">
                                                {scholarship.requirements?.map((req: string, idx: number) => (
                                                    <li key={idx} className="flex gap-2 text-sm text-slate-600 font-medium">
                                                        <span className="text-primary font-bold">✓</span>
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase text-slate-400 mb-3 tracking-widest leading-none">Target Student</p>
                                            <div className="flex flex-wrap gap-2">
                                                {scholarship.education_level?.map((level: string) => (
                                                    <Badge key={level} variant="secondary" className="bg-white border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                                                        {level}
                                                    </Badge>
                                                ))}
                                                {scholarship.category?.map((cat: string) => (
                                                    <Badge key={cat} variant="outline" className="bg-primary/5 border-primary/20 text-primary font-bold uppercase text-[10px]">
                                                        {cat}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <Button
                                            className="flex-1 gap-2 font-black uppercase text-xs tracking-wider h-12 shadow-lg shadow-primary/20"
                                            onClick={() => handleApply(scholarship.link, scholarship.title)}
                                        >
                                            Start Application
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleSave(scholarship.id)}
                                            className={cn("gap-2 h-12 font-bold px-6 border border-slate-200", savedScholarships.includes(scholarship.id) && "bg-slate-100 border-slate-300")}
                                        >
                                            <Bookmark className={cn("w-4 h-4", savedScholarships.includes(scholarship.id) && "fill-current")} />
                                            {savedScholarships.includes(scholarship.id) ? "Saved to Profile" : "Save for Later"}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>

                {/* Tips Card */}
                <Card className="p-8 bg-gradient-to-r from-primary to-primary-foreground text-white border-none shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <GraduationCap className="w-32 h-32" />
                    </div>
                    <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <Lightbulb className="w-6 h-6" />
                        </div>
                        Application Masterclass Tips
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="text-2xl font-black opacity-30">01</div>
                                <p className="text-sm font-medium leading-relaxed">Start your application early - most scholarships have extremely competitive deadlines and complex documentation needed.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-2xl font-black opacity-30">02</div>
                                <p className="text-sm font-medium leading-relaxed">Prepare strong recommendation letters from teachers or mentors who know your work personally.</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="text-2xl font-black opacity-30">03</div>
                                <p className="text-sm font-medium leading-relaxed">Write a compelling personal statement that connects your past experience to your future vision for Sierra Leone.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-2xl font-black opacity-30">04</div>
                                <p className="text-sm font-medium leading-relaxed">Keep your academic records current. Maintain a digital folder with all your certificates ready for upload.</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}

import { Lightbulb } from "lucide-react"

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
