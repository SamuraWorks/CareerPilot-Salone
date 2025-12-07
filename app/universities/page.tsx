"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, MapPin, GraduationCap, ExternalLink, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import Image from "next/image"

interface University {
    id: string
    name: string
    location: string
    website_url: string
    logo_url: string
    popular_courses: string[]
}

export default function UniversitiesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [universities, setUniversities] = useState<University[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchUniversities() {
            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from('universities')
                    .select('*')

                if (error) throw error

                if (data) {
                    setUniversities(data)
                }
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
            uni.popular_courses?.some(course => course.toLowerCase().includes(term))
        )
    })

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            <main className="flex-1 py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-muted/10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-10 md:mb-12">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Sierra Leone Universities</h1>
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Find the best institution for your higher education journey.
                        </p>
                    </div>

                    <div className="mb-6 sm:mb-8 max-w-xl mx-auto relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by name, location, or course..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-12 touch-target"
                        />
                    </div>

                    {loading && (
                        <div className="flex justify-center p-10">
                            <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        </div>
                    )}

                    {error && (
                        <div className="text-center text-destructive p-4">{error}</div>
                    )}

                    {!loading && !error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredUniversities.map((uni) => (
                                <Card key={uni.id} className="p-4 sm:p-5 md:p-6 flex flex-col hover:shadow-lg transition-all hover:-translate-y-1">
                                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 bg-white rounded-lg p-1.5 sm:p-2 border overflow-hidden">
                                            <Image
                                                src={uni.logo_url || '/placeholder-logo.png'}
                                                alt={`${uni.name} Logo`}
                                                fill
                                                className="object-contain"
                                                onError={(e) => {
                                                    // Fallback logic could go here
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-base sm:text-lg leading-tight line-clamp-2">{uni.name}</h3>
                                            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground mt-1">
                                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                                {uni.location}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex-1">
                                        <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                            <GraduationCap className="w-4 h-4 text-primary" />
                                            Popular Courses:
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {uni.popular_courses?.slice(0, 4).map((course, idx) => (
                                                <span key={idx} className="bg-secondary/10 text-secondary-foreground text-xs px-2 py-1 rounded-full">
                                                    {course}
                                                </span>
                                            ))}
                                            {uni.popular_courses?.length > 4 && (
                                                <span className="text-xs text-muted-foreground px-2 py-1">+{uni.popular_courses.length - 4} more</span>
                                            )}
                                        </div>
                                    </div>

                                    <Button className="w-full gap-2 mt-auto touch-target" onClick={() => window.open(uni.website_url, '_blank')}>
                                        Visit Website
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </Card>
                            ))}

                            {filteredUniversities.length === 0 && (
                                <div className="col-span-full text-center py-10 text-muted-foreground">
                                    No universities found matching your search.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
