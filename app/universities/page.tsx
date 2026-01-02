"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, MapPin, GraduationCap, ExternalLink, Loader2 } from "lucide-react"
import { getUniversities } from "@/lib/db"
import Image from "next/image"

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
            <Navigation />

            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10 border-none font-bold uppercase tracking-widest text-[10px] px-4 py-1.5">
                            Academic Excellence
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-slate-900">Sierra Leone Universities</h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                            Explore the top higher education institutions in the Lion Mountain. Build your future today.
                        </p>
                    </div>

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

import { Badge } from "@/components/ui/badge"

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
