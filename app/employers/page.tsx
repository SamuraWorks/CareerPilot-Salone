"use client"

import { useState } from "react"

import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Briefcase, BadgeCheck, Filter, Download, Star } from "lucide-react"
import Image from "next/image"

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
        <div className="flex flex-col min-h-screen bg-slate-50">


            <main>
                {/* Header */}
                <div className="bg-slate-900 text-white pt-20 pb-24 px-4">
                    <div className="container mx-auto max-w-5xl text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/30">
                            <Star className="w-3 h-3 fill-current" />
                            B2B Portal
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                            Hire <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Verified Talent</span> in Sierra Leone
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Skip the pile of unverified CVs. Access our database of pre-screened candidates with confirmed skills in Excel, English, and IT.
                        </p>

                        <div className="max-w-2xl mx-auto relative group">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl group-hover:bg-blue-500/30 transition-all" />
                            <div className="relative flex items-center bg-white rounded-xl shadow-2xl p-2 transition-transform hover:scale-[1.01]">
                                <Search className="w-6 h-6 text-slate-400 ml-4 shrink-0" />
                                <Input
                                    className="border-none shadow-none text-slate-900 placeholder:text-slate-400 h-12 text-lg focus-visible:ring-0"
                                    placeholder="Search by skill (e.g., 'Excel') or job title..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button className="h-12 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 font-bold shrink-0">
                                    Find Talent
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters & Content */}
                <div className="container mx-auto max-w-6xl px-4 -mt-10 relative z-10 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Sidebar Filters */}
                        <div className="hidden md:block space-y-6">
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-6 space-y-6">
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <Filter className="w-4 h-4" /> Filters
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <input type="checkbox" id="verified" className="rounded border-slate-300" defaultChecked />
                                                <label htmlFor="verified" className="text-sm font-medium text-slate-700">Verified Only</label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input type="checkbox" id="avail" className="rounded border-slate-300" />
                                                <label htmlFor="avail" className="text-sm font-medium text-slate-700">Available Immediately</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-px bg-slate-100" />
                                    <div>
                                        <h4 className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-wider">Top Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["Excel", "English", "Sales", "IT Support", "Accounting"].map(skill => (
                                                <Badge key={skill} variant="secondary" className="cursor-pointer hover:bg-slate-200">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Candidate Grid */}
                        <div className="md:col-span-3 space-y-6">
                            <div className="flex items-center justify-between text-sm text-slate-500 font-medium px-2">
                                <span>Showing {filteredCandidates.length} Candidates</span>
                                <span>Sort by: <span className="text-slate-900">Recommended</span></span>
                            </div>

                            {filteredCandidates.map(candidate => (
                                <Card key={candidate.id} className="hover:shadow-lg transition-all hover:border-blue-200 group overflow-hidden">
                                    <div className="flex flex-col md:flex-row p-6 gap-6">
                                        {/* Image & Verification */}
                                        <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0">
                                            <Image
                                                src={candidate.image}
                                                alt={candidate.name}
                                                fill
                                                className="object-cover rounded-xl"
                                            />
                                            {candidate.verified && (
                                                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-full border-4 border-white shadow-sm" title="Verified Candidate">
                                                    <BadgeCheck className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                                                <div>
                                                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                                        {candidate.name}
                                                        {candidate.verified && (
                                                            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider">
                                                                <BadgeCheck className="w-3 h-3" /> Verified
                                                            </span>
                                                        )}
                                                    </h2>
                                                    <p className="text-slate-600 font-medium">{candidate.title}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <div className="text-lg font-bold text-slate-900">{candidate.salary}</div>
                                                    <div className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                                        {candidate.availability}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    {candidate.location}
                                                </div>
                                                {/* Score Placeholder */}
                                                <div className="flex items-center gap-1 text-green-600">
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                    4.8 Rating
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {candidate.skills.map((skill, i) => (
                                                    <Badge key={i} variant={skill === "Excel" || skill === "English" ? "default" : "outline"} className={skill === "Excel" ? "bg-green-600 hover:bg-green-700" : ""}>
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                                <Button className="flex-1 bg-slate-900 hover:bg-slate-800 font-bold">
                                                    Request Interview
                                                </Button>
                                                <Button variant="outline" className="flex-1 font-bold">
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download CV
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}

                            {filteredCandidates.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                                    <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-bold text-slate-900">No candidates found</h3>
                                    <p className="text-slate-500">Try adjusting your search terms.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
