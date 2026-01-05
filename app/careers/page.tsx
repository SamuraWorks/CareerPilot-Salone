"use client"

import { useState, useEffect } from "react"
import { Footer } from "@/components/footer"
import { CareerCard } from "@/components/career-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Briefcase, TrendingUp, Users, Loader2 } from "lucide-react"
import { type Career } from "@/lib/sample-data"
import { useSearchParams } from "next/navigation"

export default function CareersPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""

  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Update search term if URL param changes (e.g. searching again from navbar while on careers page)
    const query = searchParams.get("search")
    if (query !== null) {
      setSearchTerm(query)
    }
  }, [searchParams])
  useEffect(() => {
    async function fetchCareers() {
      try {
        setLoading(true)
        // Mock network delay (removed or reduced for snappy feel)
        await new Promise(resolve => setTimeout(resolve, 300))

        // Import real data
        const { SIERRA_LEONE_CAREERS } = await import("@/lib/career-data")

        // Map to Career interface
        const mappedCareers: Career[] = SIERRA_LEONE_CAREERS.map((c: any, index: number) => {
          // Parse salary numbers for visualization
          // Format expected: "Le 3,000,000 - Le 8,000,000/month"
          const leMatch = c.salaryUSD.match(/([\d,]+)/g);
          const minLe = leMatch ? parseInt(leMatch[0].replace(/,/g, '')) : 0;
          const maxLe = leMatch && leMatch.length > 1 ? parseInt(leMatch[1].replace(/,/g, '')) : minLe;

          // Format expected: "$150 - $400/month"
          const usdMatch = c.salaryRange.match(/([\d,]+)/g);
          const minUsd = usdMatch ? parseInt(usdMatch[0].replace(/,/g, '')) : 0;
          const maxUsd = usdMatch && usdMatch.length > 1 ? parseInt(usdMatch[1].replace(/,/g, '')) : minUsd;

          // Use the image defined in the data
          let img = (c as any).image || "/placeholder.svg";

          return {
            id: (index + 1).toString(),
            title: c.title,
            description: c.description,
            skills: c.requiredSkills,
            salary: c.salaryUSD, // Leones
            salaryUsd: c.salaryRange, // USD
            salaryMinLe: minLe,
            salaryMaxLe: maxLe,
            salaryMinUsd: minUsd,
            salaryMaxUsd: maxUsd,
            demand: c.demand,
            category: c.industry,
            imageUrl: img
          };
        });

        setCareers(mappedCareers)
      } catch (err) {
        console.error("Error fetching careers:", err)
        setError("Failed to load careers. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCareers()
  }, [])

  const categories = Array.from(new Set(careers.map((c: Career) => c.category)))

  const filteredCareers = careers.filter((career: Career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (career.skills && career.skills.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase())))

    const matchesCategory = !selectedCategory || career.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1 py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-bold text-xs sm:text-sm font-poppins uppercase tracking-wider">Discover Your Future</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 font-poppins text-gradient-salone tracking-tight">Explore Career Opportunities</h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance font-inter">
              Discover careers that match your skills, interests, and aspirations in Sierra Leone
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 sm:p-5 md:p-6 hover:from-primary/15 hover:to-primary/10 transition-all border border-primary/20 shadow-md hover:shadow-lg">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <span className="text-xl sm:text-2xl font-bold font-poppins">{careers.length}+</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-inter">Career Paths</p>
              </div>
              <div className="bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 rounded-lg p-4 sm:p-5 md:p-6 hover:from-[#22C55E]/15 hover:to-[#22C55E]/10 transition-all border border-[#22C55E]/20 shadow-md hover:shadow-lg">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#1F7A4D]" />
                  <span className="text-xl sm:text-2xl font-bold font-poppins">High</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-inter">Market Demand</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg p-4 sm:p-5 md:p-6 hover:from-blue-500/15 hover:to-blue-500/10 transition-all border border-blue-500/20 shadow-md hover:shadow-lg">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  <span className="text-xl sm:text-2xl font-bold font-poppins">Expert</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-inter">Mentor Support</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by career, skill, or keyword..."
                className="pl-10 h-12 rounded-xl border-slate-200 shadow-sm focus:ring-primary font-inter"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="rounded-full shadow-sm font-poppins text-xs sm:text-sm h-10 sm:h-11"
              >
                All Categories
              </Button>
              {categories.map((category: any) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full shadow-sm font-poppins text-xs sm:text-sm h-10 sm:h-11"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-muted-foreground font-medium font-poppins">Loading career paths...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <p className="text-red-700 font-medium mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline" className="border-red-200 text-red-700 hover:bg-red-100">
                Try Again
              </Button>
            </div>
          ) : filteredCareers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in duration-700">
              {filteredCareers.map((career: Career) => (
                <CareerCard key={career.id} career={career} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-lg text-muted-foreground font-medium font-poppins mb-2">No careers found matching "{searchTerm}"</p>
              <p className="text-sm text-slate-400 font-inter">Try adjusting your search or category filters</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
