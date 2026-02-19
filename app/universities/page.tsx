"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, GraduationCap, ExternalLink, Loader2, ArrowLeft, Zap, Sparkles } from "lucide-react"
import { getUniversities } from "@/lib/mock-api"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Suspense } from "react"

export default function UniversitiesPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col min-h-screen bg-[#F9FAFB] items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#1FA774] animate-spin" />
                <p className="mt-4 font-black uppercase tracking-[0.4em] text-[10px] text-slate-400">Loading Academic Data...</p>
            </div>
        }>
            <UniversitiesContent />
        </Suspense>
    )
}

function UniversitiesContent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [universities, setUniversities] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const searchParams = useSearchParams()
    const query = searchParams.get("q")
    const career = searchParams.get("career")

    useEffect(() => {
        if (query) setSearchTerm(query)
        else if (career) setSearchTerm(career)

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
    }, [query, career])

    const filteredUniversities = universities.filter((uni) => {
        const term = searchTerm.toLowerCase()
        return (
            uni.name.toLowerCase().includes(term) ||
            uni.location.toLowerCase().includes(term) ||
            (uni.popular_courses && uni.popular_courses.some((course: string) => course.toLowerCase().includes(term)))
        )
    })

    return (
        <DashboardLayout>
            <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
                <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <Link href="/dashboard" className="inline-flex items-center gap-3 text-[10px] font-black font-sans uppercase tracking-[0.3em] text-emerald-600 hover:text-emerald-700 transition-all group mb-6">
                                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 group-hover:bg-emerald-100 transition-all">
                                    <ArrowLeft className="w-4 h-4" />
                                </div>
                                Back to Control Center
                            </Link>

                            <div className="inline-block mb-4 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
                                <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest">Verified Academic Centers</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-gradient-salone tracking-tight uppercase px-4">Universities Hub</h1>
                            <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto text-balance font-medium px-4">
                                Discover the top higher education institutions in the Lion Mountain. Find the right faculty to power your career path.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto text-left">
                                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                                    <div className="flex items-center justify-center gap-4 mb-3">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                            <GraduationCap className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <span className="text-4xl font-black text-[#0B1F3A]">{universities.length}</span>
                                    </div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Active Institutions</p>
                                </div>
                                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                                    <div className="flex items-center justify-center gap-4 mb-3">
                                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                                            <Zap className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <span className="text-4xl font-black text-[#0B1F3A]">100%</span>
                                    </div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Verified Directory</p>
                                </div>
                                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                                    <div className="flex items-center justify-center gap-4 mb-3">
                                        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <span className="text-4xl font-black text-[#0B1F3A]">ALL</span>
                                    </div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Provinces Covered</p>
                                </div>
                            </div>
                        </div>

                        {/* --- SMART FILTERS --- */}
                        <div className="mb-12 space-y-6">
                            <div className="relative max-w-2xl mx-auto">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    type="search"
                                    placeholder="Search campuses..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-14 h-16 rounded-[2rem] border-slate-200 shadow-lg text-base md:text-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
                                {["All", "Freetown", "Bo", "Makeni", "Kenema", "Port Loko"].map(loc => (
                                    <button
                                        key={loc}
                                        onClick={() => setSearchTerm(loc === "All" ? "" : loc)}
                                        className={cn(
                                            "rounded-full px-6 py-2 font-bold text-xs uppercase tracking-widest transition-all",
                                            (searchTerm === loc || (loc === "All" && searchTerm === ""))
                                                ? "bg-[#0B1F3A] text-white shadow-lg"
                                                : "text-slate-500 bg-white border border-slate-100 hover:border-emerald-600 hover:text-emerald-600"
                                        )}
                                    >
                                        {loc}
                                    </button>
                                ))}
                            </div>
                        </div>

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
                                    <p className="text-slate-900 font-black font-sans uppercase">{error}</p>
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
                                            <Card className="rounded-[2.5rem] md:rounded-[3.5rem] bg-white border-8 border-slate-50 hover:border-[#1FA774]/10 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden group h-full flex flex-col">
                                                {/* Campus Header Image */}
                                                <div className="relative h-56 w-full overflow-hidden">
                                                    <Image
                                                        src={uni.image_url || '/images/sections/universities/campus.png'}
                                                        alt={`${uni.name} Campus`}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                                    {/* Logo Overlay - Now larger and centered for elite feel */}
                                                    <div className="absolute inset-0 flex items-center justify-center p-6">
                                                        <div className="relative w-28 h-28 bg-white/95 backdrop-blur-md shadow-2xl rounded-[2rem] p-4 border-2 border-white/50 flex items-center justify-center z-20 group-hover:scale-105 transition-transform duration-500">
                                                            {uni.logo_url ? (
                                                                <Image
                                                                    src={uni.logo_url}
                                                                    alt={`${uni.name} Logo`}
                                                                    fill
                                                                    className="object-contain p-4"
                                                                />
                                                            ) : (
                                                                <GraduationCap className="w-12 h-12 text-slate-200" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {uni.badges?.slice(0, 2).map((badge: string, i: number) => (
                                                                <Badge key={i} className="bg-emerald-500 text-white border-none font-black text-[7px] uppercase tracking-tighter px-2 py-0.5 rounded-md shadow-lg">
                                                                    {badge}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                        <div className="text-[9px] font-black text-white/90 uppercase tracking-widest flex items-center gap-1 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                                                            <MapPin className="w-3 h-3 text-emerald-400" />
                                                            {uni.location}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col flex-1 relative z-10 p-8">
                                                    <div className="mb-6">
                                                        <h3 className="font-black text-xl md:text-2xl leading-tight text-[#0B1F3A] group-hover:text-emerald-600 transition-colors font-sans line-clamp-2">
                                                            {uni.name}
                                                        </h3>
                                                    </div>

                                                    <div className="mb-10 flex-1">
                                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4 border-l-4 border-slate-100 pl-4 italic">Core Faculties</p>
                                                        <div className="flex flex-wrap gap-2.5">
                                                            {uni.popular_courses?.slice(0, 4).map((course: string, idx: number) => (
                                                                <span key={idx} className="bg-slate-50 text-[#0B1F3A] text-[10px] font-black uppercase px-4 py-2 rounded-xl border border-transparent group-hover:border-slate-100 transition-all font-sans">
                                                                    {course}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-3">
                                                        <Button
                                                            className="w-full gap-3 h-14 rounded-[2rem] bg-slate-900 hover:bg-[#1E5EFF] text-white font-black uppercase tracking-widest text-[11px] transition-all border-none shadow-xl active:scale-95 font-sans"
                                                            onClick={() => window.open(uni.website_url, '_blank')}
                                                        >
                                                            Scientific Profile
                                                            <ExternalLink className="w-5 h-5" />
                                                        </Button>

                                                        {uni.portal_url && (
                                                            <Button
                                                                variant="outline"
                                                                className="w-full gap-3 h-14 rounded-[2rem] border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 font-black uppercase tracking-widest text-[11px] transition-all active:scale-95 font-sans"
                                                                onClick={() => window.open(uni.portal_url, '_blank')}
                                                            >
                                                                Direct Portal Access
                                                                <Zap className="w-5 h-5" />
                                                            </Button>
                                                        )}
                                                    </div>
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
                                    <h3 className="text-2xl font-black font-sans text-[#0B1F3A] uppercase tracking-tight">No campus found</h3>
                                    <p className="text-slate-400 font-bold font-sans italic max-w-sm mx-auto">Try broadening your search or switching categories.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </DashboardLayout>

    )
}

