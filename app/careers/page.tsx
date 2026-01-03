
"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CareerCard } from "@/components/career-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Briefcase, TrendingUp, Users, Loader2 } from "lucide-react"
import { sampleCareers, type Career } from "@/lib/sample-data"

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
        const mappedCareers: Career[] = SIERRA_LEONE_CAREERS.map((c, index) => {
          // Parse salary numbers for visualization
          // Format expected: "Le 3,000,000 - Le 8,000,000/month"
          const leMatch = c.salaryUSD.match(/([\d,]+)/g);
          const minLe = leMatch ? parseInt(leMatch[0].replace(/,/g, '')) : 0;
          const maxLe = leMatch && leMatch.length > 1 ? parseInt(leMatch[1].replace(/,/g, '')) : minLe;

          // Format expected: "$150 - $400/month"
          const usdMatch = c.salaryRange.match(/([\d,]+)/g);
          const minUsd = usdMatch ? parseInt(usdMatch[0].replace(/,/g, '')) : 0;
          const maxUsd = usdMatch && usdMatch.length > 1 ? parseInt(usdMatch[1].replace(/,/g, '')) : minUsd;

          // Simple image mapping based on keywords/industry
          let img = "/placeholder.svg";
          const titleLower = c.title.toLowerCase();
          if (titleLower.includes("software") || titleLower.includes("tech")) img = "/software-developer-coding.jpg";
          else if (titleLower.includes("nurse") || titleLower.includes("health")) img = "/nurse-healthcare-professional.jpg";
          else if (titleLower.includes("agric")) img = "/agricultural-officer.jpg"; // specific image if we had it, fallback to placeholder or similar
          else if (titleLower.includes("teacher") || titleLower.includes("educat")) img = "/teacher-classroom-education.jpg";
          else if (titleLower.includes("account")) img = "/accountant-finance-professional.jpg";
          else if (titleLower.includes("civil")) img = "/civil-engineer.jpg"; // Placeholder
          else if (titleLower.includes("market")) img = "/digital-marketing-social-media.png";

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

  const categories = Array.from(new Set(careers.map((c) => c.category)))

  const filteredCareers = careers.filter((career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (career.skills && career.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())))

    const matchesCategory = !selectedCategory || career.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold text-xs sm:text-sm">Discover Your Future</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Explore Career Opportunities</h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Discover careers that match your skills, interests, and aspirations in Sierra Leone
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 sm:p-5 md:p-6 hover:from-primary/15 hover:to-primary/10 transition-all border border-primary/20 shadow-md hover:shadow-lg">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <span className="text-2xl sm:text-3xl font-bold text-primary">{careers.length > 0 ? `${careers.length} +` : "..."}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Career Paths</p>
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg p-6 hover:from-secondary/15 hover:to-secondary/10 transition-all border border-secondary/20 shadow-md hover:shadow-lg">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                  <span className="text-3xl font-bold text-secondary">500+</span>
                </div>
                <p className="text-sm text-muted-foreground">Skills Covered</p>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-6 hover:from-accent/15 hover:to-accent/10 transition-all border border-accent/20 shadow-md hover:shadow-lg">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-accent" />
                  <span className="text-3xl font-bold text-accent">1000+</span>
                </div>
                <p className="text-sm text-muted-foreground">Users Guided</p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 sm:mb-8 space-y-4">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search careers, skills, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 touch-target"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="touch-target"
              >
                All Careers
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="touch-target"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-10 text-destructive">
              <p>{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">Retry</Button>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredCareers.length} of {careers.length} careers
                </p>
              </div>

              {/* Career Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCareers.map((career) => (
                  <CareerCard key={career.id} career={career} />
                ))}
              </div>

              {/* No Results */}
              {filteredCareers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground mb-4">No careers found matching your search</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory(null)
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

