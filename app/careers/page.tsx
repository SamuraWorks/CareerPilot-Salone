"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CareerCard } from "@/components/career-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { sampleCareers } from "@/lib/sample-data"
import { Search, Briefcase, TrendingUp, Users } from "lucide-react"

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(sampleCareers.map((c) => c.category)))

  const filteredCareers = sampleCareers.filter((career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = !selectedCategory || career.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold text-sm">Discover Your Future</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Explore Career Opportunities</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Discover careers that match your skills, interests, and aspirations in Sierra Leone
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto">
              <div className="bg-primary/5 rounded-lg p-6 hover:bg-primary/10 transition-colors">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Briefcase className="w-6 h-6 text-primary" />
                  <span className="text-3xl font-bold text-primary">{sampleCareers.length}+</span>
                </div>
                <p className="text-sm text-muted-foreground">Career Paths</p>
              </div>
              <div className="bg-secondary/5 rounded-lg p-6 hover:bg-secondary/10 transition-colors">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                  <span className="text-3xl font-bold text-secondary">500+</span>
                </div>
                <p className="text-sm text-muted-foreground">Skills Covered</p>
              </div>
              <div className="bg-accent/5 rounded-lg p-6 hover:bg-accent/10 transition-colors">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-accent" />
                  <span className="text-3xl font-bold text-accent">1000+</span>
                </div>
                <p className="text-sm text-muted-foreground">Users Guided</p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search careers, skills, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All Careers
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredCareers.length} of {sampleCareers.length} careers
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
