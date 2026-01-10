"use client"

import { useState, useEffect } from "react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, GraduationCap, ExternalLink, Loader2, ArrowLeft, Zap, Sparkles } from "lucide-react"
import { getUniversities } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function UniversitiesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [universities, setUniversities] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchUniversities() {
            try {
                setLoading(true)
                const data = await getUniversities()
                setUniversities(data)
            } catch (err) {
                console.error("Error fetching universities:", err)
                setError("Failed to load universities.")
            } finally {
                setLoading(false)
            }
        }

        fetchUniversities()
    }, [])

    const filteredUniversities = universities.filter((uni) => {
        const term = searchTerm.toLowerCase()
        return (
            uni.name.toLowerCase().includes(term) ||
            uni.location.toLowerCase().includes(term) ||
            (uni.popular_courses && uni.popular_courses.some((course: string) => course.toLowerCase().includes(term)))
        )
    })

    return (
        <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">

            <main className="flex-1 pb-24">
                {/* --- PREMIUM HERO SECTION --- */}
                <section className="relative min-h-[450px] flex items-center overflow-hidden border-b-8 border-b-[#1FA774]">
                    <div className="absolute inset-0 z-0">
                        <Image src="/african_graduate_success.png" alt="University Hero" fill className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-[#0B1F3A]/80" />
                    </div>

                    <div className="container mx-auto px-6 relative z-20 pt-10">
                        <div className="max-w-4xl space-y-10 text-left">
                            <Link href="/dashboard" className="inline-flex items-center gap-3 text-[10px] font-black font-poppins uppercase tracking-[0.3em] text-[#4ADE80] hover:text-white transition-all group">
                                <div className="p-2 rounded-lg bg-[#4ADE80]/10 border border-[#4ADE80]/20 group-hover:bg-[#4ADE80] group-hover:text-[#0B1F3A] transition-all">
                                    <ArrowLeft className="w-4 h-4" />
                                </div>
                                Back to Control Center
                            </Link>

                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-md">
                                    <Sparkles className="w-4 h-4 text-[#1FA774]" />
                                    <span className="text-[#1FA774] font-black text-[10px] uppercase tracking-[0.2em]">Verified Academic Centers</span>
                                </div>
                                <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter font-poppins uppercase">
                                    Academic <br /> <span className="text-gradient-salone brightness-125">Destinations</span>
                                </h1>
                                <p className="text-xl md:text-2xl text-slate-300 font-medium font-inter max-w-2xl leading-relaxed border-l-4 border-[#1FA774] pl-6">
                                    Discover the top higher education institutions in the Lion Mountain. Find the right faculty to power your career path.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-6 pt-4">
                                <div className="bg-white/5 backdrop-blur-xl rounded-[1.5rem] p-6 flex items-center gap-6 border border-white/10 shadow-2xl">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-white shadow-lg">
                                        <GraduationCap className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-white leading-none">{universities.length}</p>
                                        <p className="text-[10px] font-black text-[#1FA774] uppercase tracking-widest mt-1 italic">Active Institutions</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-xl rounded-[1.5rem] p-6 flex items-center gap-6 border border-white/10 shadow-2xl">
                                    <div className="w-14 h-14 rounded-2xl bg-[#0B1F3A] flex items-center justify-center text-[#1FA774] border border-[#1FA774]/20">
                                        <Zap className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-white leading-none">100%</p>
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1 italic">Verified Directory</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-6 -mt-10 relative z-20">
                    {/* --- SMART FILTERS --- */}
                    <Card className="p-6 md:p-8 shadow-2xl bg-white border-none rounded-[3.5rem] flex flex-col md:flex-row gap-8 items-center border-b-4 border-slate-100">
                        <div className="relative flex-1 w-full group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-[#1E5EFF] transition-colors" />
                            <Input
                                className="pl-16 h-16 rounded-2xl border-slate-50 bg-slate-50 focus:bg-white focus:ring-[#1E5EFF]/20 focus:border-[#1E5EFF] w-full text-base font-bold font-poppins shadow-inner"
                                placeholder="Search by institution name, city, or discipline..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                            {["All", "Freetown", "Bo", "Makeni", "Kenema", "Port Loko"].map(loc => (
                                <button
                                    key={loc}
                                    onClick={() => setSearchTerm(loc === "All" ? "" : loc)}
                                    className={cn(
                                        "rounded-[1.2rem] h-14 font-black text-[10px] uppercase tracking-widest whitespace-nowrap px-8 font-poppins transition-all active:scale-95",
                                        (searchTerm === loc || (loc === "All" && searchTerm === ""))
                                            ? "bg-[#0B1F3A] text-white shadow-xl shadow-[#0B1F3A]/20"
                                            : "text-slate-400 bg-slate-50 hover:bg-slate-100 border border-transparent hover:border-slate-200"
                                    )}
                                >
                                    {loc}
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* --- INSTITUTIONS GRID --- */}
                    <div className="mt-20">
                        {loading && (
                            <div className="flex flex-col items-center justify-center py-32 text-slate-300">
                                <Loader2 className="w-16 h-16 animate-spin text-[#1FA774] mb-6" />
                                <p className="font-black uppercase tracking-[0.4em] text-[10px] italic">Fetching Academic Data...</p>
                            </div>
                        )}

                        {error && (
                            <div className="max-w-md mx-auto p-20 text-center space-y-6">
                                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
                                    <Zap className="w-10 h-10" />
                                </div>
                                <p className="text-slate-900 font-black font-poppins uppercase">{error}</p>
                                <Button onClick={() => window.location.reload()} className="rounded-2xl h-14 px-10 bg-[#0B1F3A] text-white font-black uppercase tracking-widest text-[10px]">Try Refresh</Button>
                            </div>
                        )}

                        {!loading && !error && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {filteredUniversities.map((uni) => (
                                    <motion.div
                                        key={uni.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ y: -12 }}
                                        className="group"
                                    >
                                        <Card className="p-10 rounded-[3.5rem] bg-white border-8 border-slate-50 hover:border-[#1FA774]/10 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden group">
                                            <div className="flex flex-col h-full relative z-10">
                                                <div className="flex items-start gap-6 mb-8">
                                                    <div className="relative w-24 h-24 flex-shrink-0 bg-white shadow-xl rounded-3xl p-4 border border-slate-50 group-hover:border-[#1FA774]/20 transition-all flex items-center justify-center">
                                                        {uni.logo_url ? (
                                                            <Image
                                                                src={uni.logo_url}
                                                                alt={`${uni.name} Logo`}
                                                                fill
                                                                className="object-contain p-3"
                                                            />
                                                        ) : (
                                                            <GraduationCap className="w-10 h-10 text-slate-100 group-hover:text-[#1FA774] transition-colors" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 pt-2">
                                                        <h3 className="font-black text-2xl leading-none text-[#0B1F3A] group-hover:text-[#1E5EFF] transition-colors font-poppins">
                                                            {uni.name}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3 italic">
                                                            <MapPin className="w-3.5 h-3.5 text-[#1FA774]" />
                                                            {uni.location}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-10 flex-1">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4 border-l-4 border-slate-100 pl-4 italic">Core Faculties</p>
                                                    <div className="flex flex-wrap gap-2.5">
                                                        {uni.popular_courses?.slice(0, 4).map((course: string, idx: number) => (
                                                            <span key={idx} className="bg-slate-50 text-[#0B1F3A] text-[10px] font-black uppercase px-4 py-2 rounded-xl border border-transparent group-hover:border-slate-100 transition-all">
                                                                {course}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <Button
                                                    className="w-full gap-3 h-16 rounded-[2rem] bg-slate-900 hover:bg-[#1E5EFF] text-white font-black uppercase tracking-widest text-[11px] transition-all border-none shadow-xl active:scale-95"
                                                    onClick={() => window.open(uni.website_url, '_blank')}
                                                >
                                                    Research Profile
                                                    <ExternalLink className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {filteredUniversities.length === 0 && !loading && (
                            <div className="text-center py-32 space-y-6">
                                <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-8 rotate-12">
                                    <Search className="w-10 h-10 text-slate-200" />
                                </div>
                                <h3 className="text-2xl font-black font-poppins text-[#0B1F3A] uppercase tracking-tight">No campus found</h3>
                                <p className="text-slate-400 font-bold font-inter italic max-w-sm mx-auto">Try broadening your search or switching categories.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
