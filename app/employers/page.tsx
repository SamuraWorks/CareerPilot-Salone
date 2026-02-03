"use client"

import { useState } from "react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Briefcase, BadgeCheck, Filter, Download, Star, Sparkles, Zap, ArrowLeft, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock Data for Verified Talent
const CANDIDATES = [
    {
        id: "1",
        name: "Mohamed Kamara",
        title: "Administrative Assistant",
        location: "Freetown, Central",
        skills: ["Microsoft Office", "English", "Customer Service"],
        verified: true,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        availability: "Immediate",
        salary: "NLE 3,000 - 5,000"
    },
    {
        id: "2",
        name: "Fatmata Sesay",
        title: "Junior Accountant",
        location: "Wilkinson Road, Freetown",
        skills: ["Excel (Advanced)", "QuickBooks", "Bookkeeping"],
        verified: true,
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
        availability: "2 Weeks Notice",
        salary: "NLE 5,000 - 8,000"
    },
    {
        id: "3",
        name: "Samuel Koroma",
        title: "IT Support Specialist",
        location: "Lumley, Freetown",
        skills: ["Network Admin", "Hardware Repair", "English"],
        verified: true,
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
        availability: "Immediate",
        salary: "NLE 4,000 - 6,000"
    },
    {
        id: "4",
        name: "Ibrahim Bah",
        title: "Sales Representative",
        location: "Bo Town",
        skills: ["Sales", "Communication", "Driver's License"],
        verified: true,
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
        availability: "Immediate",
        salary: "Commission Based"
    },
    {
        id: "5",
        name: "Zainab Conteh",
        title: "Digital Marketer",
        location: "Remote / Freetown",
        skills: ["Social Media", "Canva", "Copywriting"],
        verified: false,
        image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f38?auto=format&fit=crop&w=400&q=80",
        availability: "Freelance",
        salary: "Project Based"
    },
    {
        id: "6",
        name: "Amara Bangura",
        title: "Logistics Coordinator",
        location: "Wellington Industrial Estate",
        skills: ["Supply Chain", "Inventory Management", "Excel"],
        verified: true,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
        availability: "Immediate",
        salary: "NLE 4,500+"
    }
]

export default function EmployerPortal() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredCandidates = CANDIDATES.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <main className="flex-1 pb-32">
                {/* --- PREMIUM HERO SECTION --- */}
                <section className="relative min-h-[500px] flex items-center bg-[#0B1F3A] overflow-hidden border-b-8 border-b-[#1FA774]">
                    <div className="container mx-auto px-6 relative z-20 pt-10 text-center">
                        <div className="max-w-4xl mx-auto space-y-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-md">
                                <Sparkles className="w-4 h-4 text-[#1FA774]" />
                                <span className="text-[#1FA774] font-black text-[10px] uppercase tracking-[0.2em]">Verified Talent Pipeline</span>
                            </div>

                            <div className="space-y-6">
                                <h1 className="text-4xl xs:text-5xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter font-sans uppercase">
                                    Strategic <br /> <span className="text-gradient-salone brightness-125">Acquisition</span>
                                </h1>
                                <p className="text-xl md:text-2xl text-slate-300 font-medium font-sans max-w-3xl mx-auto leading-relaxed border-transparent italic">
                                    Access our database of pre-screened candidates with confirmed skills in Excel, English, and technical domains na Salone.
                                </p>
                            </div>

                            <div className="max-w-3xl mx-auto relative group pt-4">
                                <Card className="p-4 bg-white border-none shadow-2xl rounded-[3rem] w-full border-b-4 border-slate-100 flex flex-col md:flex-row gap-6 items-center">
                                    <div className="relative flex-1 w-full group">
                                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-[#1E5EFF] transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Search by skill (e.g., 'Excel') or job title..."
                                            className="w-full h-16 pl-16 pr-6 rounded-[2rem] bg-slate-50 border-none focus:bg-white focus:ring-[15px] focus:ring-[#1E5EFF]/5 shadow-inner outline-none font-sans font-bold text-base transition-all text-[#0B1F3A]"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <Button className="h-16 px-10 rounded-[2rem] bg-[#0B1F3A] hover:bg-[#1E5EFF] text-white font-black uppercase tracking-widest text-[11px] shadow-2xl transition-all active:scale-95">
                                        Scan Talent Matrix
                                    </Button>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filters & Content */}
                <div className="container mx-auto max-w-7xl px-6 -mt-10 relative z-30 pb-12" >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                        {/* Sidebar Filters */}
                        <div className="md:col-span-3 space-y-6">
                            <Card className="rounded-[2.5rem] border-8 border-slate-50 bg-white p-10 shadow-sm hover:shadow-xl transition-all">
                                <div className="space-y-10">
                                    <div>
                                        <h3 className="font-black text-[#0B1F3A] mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] italic">
                                            <Filter className="w-4 h-4 text-[#1FA774]" /> Matrix Filters
                                        </h3>
                                        <div className="space-y-5">
                                            <div className="flex items-center gap-4 group cursor-pointer">
                                                <div className="w-6 h-6 rounded-lg bg-slate-50 border-2 border-slate-100 flex items-center justify-center group-hover:bg-[#1FA774]/10 transition-all">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#1FA774]" />
                                                </div>
                                                <label className="text-xs font-black text-[#0B1F3A] uppercase tracking-widest cursor-pointer">Verified Assets</label>
                                            </div>
                                            <div className="flex items-center gap-4 group cursor-pointer opacity-40">
                                                <div className="w-6 h-6 rounded-lg bg-slate-50 border-2 border-slate-100 flex items-center justify-center">
                                                </div>
                                                <label className="text-xs font-black text-[#0B1F3A] uppercase tracking-widest cursor-pointer">Instant Availability</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-px bg-slate-50" />
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase text-slate-300 mb-6 tracking-[0.3em] italic">High-Value Skills</h4>
                                        <div className="flex flex-wrap gap-2.5">
                                            {["Excel", "English", "Sales", "IT Support", "Accounting"].map(skill => (
                                                <Badge key={skill} className="bg-slate-50 border-slate-100 text-[#0B1F3A] font-black uppercase text-[9px] tracking-widest px-4 py-2 rounded-xl hover:bg-white transition-all cursor-pointer">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Candidate Grid */}
                        <div className="md:col-span-9 space-y-8">
                            <div className="flex items-center justify-between px-6">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">Displaying {filteredCandidates.length} Cognitive Assets</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">Sort: <span className="text-[#1E5EFF]">Proprietary Match</span></p>
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                {filteredCandidates.map(candidate => (
                                    <Card key={candidate.id} className="p-10 rounded-[3.5rem] bg-white border-8 border-slate-50 hover:border-[#1E5EFF]/10 shadow-sm hover:shadow-2xl transition-all group overflow-hidden">
                                        <div className="flex flex-col md:flex-row gap-10">
                                            {/* Image & Verification */}
                                            <div className="relative w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-[2.5rem] overflow-hidden border-4 border-slate-50 group-hover:border-[#1FA774]/20 transition-all">
                                                <Image
                                                    src={candidate.image}
                                                    alt={candidate.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                {candidate.verified && (
                                                    <div className="absolute top-4 right-4 bg-white text-[#1FA774] p-2 rounded-2xl shadow-2xl border border-slate-50">
                                                        <BadgeCheck className="w-5 h-5 fill-current" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 space-y-8">
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                                    <div className="space-y-2">
                                                        <h2 className="text-3xl font-black text-[#0B1F3A] font-sans tracking-tighter uppercase group-hover:text-[#1E5EFF] transition-colors leading-none">
                                                            {candidate.name}
                                                        </h2>
                                                        <p className="text-[#1FA774] font-black text-[11px] uppercase tracking-[0.2em] italic">{candidate.title}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-black text-[#0B1F3A] tracking-tighter">{candidate.salary}</div>
                                                        <Badge className="bg-[#1FA774]/10 text-[#1FA774] border-none font-black uppercase text-[9px] tracking-widest px-4 py-2 mt-3 rounded-xl">
                                                            {candidate.availability}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-6 text-[11px] font-black text-slate-400 uppercase tracking-widest border-l-4 border-slate-100 pl-6 group-hover:border-[#1FA774] transition-all italic">
                                                    <div className="flex items-center gap-3">
                                                        <MapPin className="w-4 h-4 text-[#1FA774]" />
                                                        {candidate.location}
                                                    </div>
                                                    <div className="flex items-center gap-3 text-[#1FA774]">
                                                        <Zap className="w-4 h-4 fill-current" />
                                                        4.8 Matrix Rating
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2.5 pt-2">
                                                    {candidate.skills.map((skill, i) => (
                                                        <Badge key={i} className={cn("px-4 py-2 font-black uppercase text-[10px] tracking-widest rounded-xl transition-all", skill === "Excel" || skill === "English" ? "bg-[#0B1F3A] text-white hover:bg-[#1E5EFF]" : "bg-slate-50 text-slate-400 border-none")}>
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                                    <Button className="flex-1 h-16 rounded-[1.8rem] bg-[#0B1F3A] hover:bg-[#1FA774] text-white font-black uppercase tracking-widest text-[11px] shadow-2xl active:scale-95 transition-all gap-3 border-none">
                                                        <Users className="w-5 h-5" />
                                                        Initiate Contact
                                                    </Button>
                                                    <Button variant="ghost" className="flex-1 h-16 rounded-[1.8rem] border-2 border-slate-100 font-black uppercase tracking-widest text-[11px] text-slate-400 hover:text-[#0B1F3A] hover:bg-white transition-all gap-3">
                                                        <Download className="w-5 h-5" />
                                                        Dossier Download
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}

                                {filteredCandidates.length === 0 && (
                                    <div className="text-center py-40 bg-white rounded-[4rem] border-8 border-slate-50 shadow-inner">
                                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 rotate-12">
                                            <Search className="w-10 h-10 text-slate-200" />
                                        </div>
                                        <h3 className="text-2xl font-black font-sans text-[#0B1F3A] uppercase tracking-tighter">Vector not found</h3>
                                        <p className="text-slate-400 font-bold italic font-sans mt-2">Try broader search terms or check our academy for future graduates.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div >
            </main >

            <Footer />
        </div >
    )
}
