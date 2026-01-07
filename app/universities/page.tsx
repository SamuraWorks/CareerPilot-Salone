"use client"

import { useState, useEffect } from "react"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, GraduationCap, ExternalLink, Loader2, ArrowLeft } from "lucide-react"
import { getUniversities } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"

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
        <div className="flex flex-col min-h-screen bg-slate-50/30">

            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href="/dashboard"
                        className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </Link>
                    {/* PREMIUM HERO HEADER */}
                    <section className="relative rounded-[3rem] overflow-hidden bg-[#0B1F3A] min-h-[350px] flex items-center shadow-2xl group mb-12">
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/images/universities/campus.png"
                                alt="University Campus"
                                fill
                                className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent z-10" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,167,116,0.15),transparent)] z-10" />
                        </div>

                        <div className="relative z-20 max-w-4xl p-10 md:p-16 space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
                                <GraduationCap className="w-4 h-4 text-[#1FA774]" />
                                <span className="text-[#1FA774] font-bold text-xs uppercase tracking-widest">Academic Excellence</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-poppins">
                                Sierra Leone <span className="text-[#F4C430]">Universities</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-300 font-medium font-inter max-w-xl leading-relaxed">
                                Explore the top higher education institutions in the Lion Mountain. Find the right faculty to power your career path.
                            </p>

                            <div className="flex items-center gap-6 pt-2">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-white">{universities.length}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Institutions</span>
                                </div>
                                <div className="w-px h-8 bg-white/10" />
                                <div className="flex flex-col text-center">
                                    <span className="text-2xl font-black text-[#F4C430]">100%</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="mb-10 max-w-2xl mx-auto space-y-6">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition-all" />
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                                <Input
                                    type="search"
                                    placeholder="Search by institution name, city, or discipline..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 h-14 rounded-2xl border-slate-200 focus:border-primary shadow-sm bg-white text-lg font-medium"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            {["All", "Freetown", "Bo", "Makeni", "Kenema"].map((loc) => (
                                <Button
                                    key={loc}
                                    variant={searchTerm === loc ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSearchTerm(loc === "All" ? "" : loc)}
                                    className={cn(
                                        "h-9 text-[11px] font-black uppercase tracking-wider px-5 rounded-full border-slate-200 hover:border-primary hover:text-primary transition-all",
                                        searchTerm === loc && "bg-primary text-white shadow-lg shadow-primary/20 border-primary"
                                    )}
                                >
                                    {loc}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {loading && (
                        <div className="flex flex-col items-center justify-center p-20 text-muted-foreground">
                            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                            <p className="font-bold uppercase tracking-widest text-[10px]">Filtering Institutions...</p>
                        </div>
                    )}

                    {error && (
                        <Card className="max-w-md mx-auto p-12 text-center border-dashed border-2">
                            <p className="text-destructive font-bold">{error}</p>
                            <Button variant="link" onClick={() => window.location.reload()}>Try again</Button>
                        </Card>
                    )}

                    {!loading && !error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredUniversities.map((uni) => (
                                <Card key={uni.id} className="group p-0 flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-slate-100 overflow-hidden bg-white">
                                    <div className="h-2 bg-primary/20 group-hover:bg-primary transition-colors" />
                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-5 mb-6">
                                            <div className="relative w-16 h-16 flex-shrink-0 bg-slate-50 rounded-2xl p-3 border border-slate-100 group-hover:border-primary/20 transition-colors flex items-center justify-center">
                                                {uni.logo_url ? (
                                                    <Image
                                                        src={uni.logo_url}
                                                        alt={`${uni.name} Logo`}
                                                        fill
                                                        className="object-contain p-2"
                                                    />
                                                ) : (
                                                    <GraduationCap className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-xl leading-tight text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                                                    {uni.name}
                                                </h3>
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                                                    <MapPin className="w-3.5 h-3.5 text-primary" />
                                                    {uni.location}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-8 flex-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Popular Faculties</p>
                                            <div className="flex flex-wrap gap-2">
                                                {uni.popular_courses?.slice(0, 4).map((course: string, idx: number) => (
                                                    <span key={idx} className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg border border-slate-100 group-hover:border-primary/10 transition-colors">
                                                        {course}
                                                    </span>
                                                ))}
                                                {uni.popular_courses?.length > 4 && (
                                                    <span className="text-[10px] font-bold text-slate-400 px-2 py-1.5 italic">+{uni.popular_courses.length - 4} more</span>
                                                )}
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full gap-2 h-12 font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/5 hover:shadow-primary/20 transition-all rounded-xl"
                                            onClick={() => window.open(uni.website_url, '_blank')}
                                        >
                                            Visit Institution
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {filteredUniversities.length === 0 && !loading && (
                        <div className="text-center py-20">
                            <div className="text-slate-200 mb-4 flex justify-center">
                                <Search className="w-16 h-16" />
                            </div>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                                No institutions match your current search.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}


function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
