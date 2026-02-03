"use client"

import { useState } from "react"
import { Footer } from "@/components/footer"
import { CareerCard } from "@/components/career-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SIERRA_LEONE_CAREERS } from "@/lib/career-data"
import { Search, Briefcase, TrendingUp, Users, MapPin } from "lucide-react"

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(SIERRA_LEONE_CAREERS.map((c) => c.industry)))

  const filteredCareers = SIERRA_LEONE_CAREERS.filter((career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.requiredSkills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      career.keywords.some((kw) => kw.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = !selectedCategory || career.industry === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
              <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest">Salone Career Intelligence</span>
            </div>
            <h1 className="text-5xl font-black mb-4 text-gradient-salone tracking-tight">Careers</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto text-balance font-medium">
              Discover data-backed career paths tailored for the Sierra Leonean market. Direct links to local institutions and industry mentors.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="text-4xl font-black text-[#0B1F3A]">{SIERRA_LEONE_CAREERS.length}+</span>
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Verified Pathyways</p>
              </div>
              <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-4xl font-black text-[#0B1F3A]">18+</span>
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Growth Sectors</p>
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

          {/* Search and Filter */}
          <div className="mb-12 space-y-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="search"
                placeholder="Search by role, skill, or industry (e.g., 'Teaching', 'Coding')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 h-16 rounded-[2rem] border-slate-200 shadow-lg text-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-6 font-bold ${selectedCategory === null ? 'bg-[#0B1F3A]' : 'text-slate-500'}`}
              >
                All Industries
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-6 font-bold transition-all ${selectedCategory === category ? 'bg-emerald-600 text-white border-emerald-600' : 'text-slate-500 hover:text-emerald-600 hover:border-emerald-600'}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              Live Intel: {filteredCareers.length} Match{filteredCareers.length !== 1 ? 'es' : ''} Found
            </p>
            {selectedCategory && (
              <button onClick={() => setSelectedCategory(null)} className="text-xs font-black text-emerald-600 uppercase tracking-tighter hover:underline">
                Clear Industry Filter
              </button>
            )}
          </div>

          {/* Career Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCareers.map((career) => (
              <CareerCard key={career.id} career={career as any} />
            ))}
          </div>

          {/* No Results */}
          {filteredCareers.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B1F3A] mb-2">No Matches Found</h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">Try searching for broader terms like "Health", "Tech", or "Agriculture".</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory(null)
                }}
                className="bg-[#0B1F3A] rounded-2xl px-8 h-12"
              >
                Reset Search Engine
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

