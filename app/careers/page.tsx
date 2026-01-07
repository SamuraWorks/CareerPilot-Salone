"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CareerCard } from "@/components/career-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Briefcase, TrendingUp, Users, Loader2, Filter, Sparkles } from "lucide-react"
import { type Career } from "@/lib/sample-data"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

export default function CareersPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""

  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const query = searchParams.get("search")
    if (query !== null) setSearchTerm(query)
  }, [searchParams])

  useEffect(() => {
    async function fetchCareers() {
      try {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 400))
        const { SIERRA_LEONE_CAREERS } = await import("@/lib/career-data")

        const mappedCareers: Career[] = SIERRA_LEONE_CAREERS.map((c: any, index: number) => {
          const leMatch = c.salaryUSD.match(/([\d,]+)/g);
          const minLe = leMatch ? parseInt(leMatch[0].replace(/,/g, '')) : 0;
          const maxLe = leMatch && leMatch.length > 1 ? parseInt(leMatch[1].replace(/,/g, '')) : minLe;

          const usdMatch = c.salaryRange.match(/([\d,]+)/g);
          const minUsd = usdMatch ? parseInt(usdMatch[0].replace(/,/g, '')) : 0;
          const maxUsd = usdMatch && usdMatch.length > 1 ? parseInt(usdMatch[1].replace(/,/g, '')) : minUsd;

          return {
            id: (index + 1).toString(),
            title: c.title,
            description: c.description,
            skills: c.requiredSkills,
            salary: c.salaryUSD,
            salaryUsd: c.salaryRange,
            salaryMinLe: minLe,
            salaryMaxLe: maxLe,
            salaryMinUsd: minUsd,
            salaryMaxUsd: maxUsd,
            demand: c.demand,
            category: c.industry,
            imageUrl: c.image || "/placeholder.svg"
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
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">

        {/* HERO HEADER */}
        <section className="relative rounded-[2.5rem] overflow-hidden bg-[#0B1F3A] p-10 md:p-16 shadow-2xl group">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,167,116,0.1),transparent)] z-10" />
          </div>

          <div className="relative z-20 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <Sparkles className="w-4 h-4 text-[#1FA774]" />
              <span className="text-[#1FA774] font-bold text-xs uppercase tracking-widest">Market Insights 2026</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-poppins text-white leading-tight">
              Explore Careers in <span className="text-[#F4C430]">Sierra Leone</span>
            </h1>
            <p className="text-slate-300 font-inter text-lg md:text-xl leading-relaxed">
              Find verified career paths with realistic salary data, required skills, and local university recommendations.
            </p>
          </div>

          <div className="absolute top-1/2 right-20 -translate-y-1/2 hidden lg:block opacity-20">
            <Briefcase className="w-64 h-64 text-white" />
          </div>
        </section>

        {/* SEARCH & FILTERS */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-end lg:items-center">
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-[#1FA774] transition-colors" />
              <input
                type="text"
                placeholder="Search by job title, skills, or industry..."
                className="w-full h-16 pl-14 pr-6 rounded-3xl bg-white border-2 border-slate-100 focus:border-[#1FA774] outline-none font-inter text-lg shadow-sm focus:shadow-md transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-3 w-full lg:w-auto">
              <Button variant="outline" className="h-16 px-8 rounded-3xl border-slate-100 font-bold font-poppins text-slate-600 gap-2">
                <Filter className="w-5 h-5" /> Filter
              </Button>
            </div>
          </div>

          {/* CATEGORY PILLS */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-full font-poppins font-bold text-sm tracking-wide transition-all ${selectedCategory === null
                  ? 'bg-[#0B1F3A] text-white shadow-lg scale-105'
                  : 'bg-white text-slate-500 border border-slate-100 hover:border-slate-300'
                }`}
            >
              All Industries
            </button>
            {categories.map((cat: any) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full font-poppins font-bold text-sm tracking-wide transition-all ${selectedCategory === cat
                    ? 'bg-[#0B1F3A] text-white shadow-lg scale-105'
                    : 'bg-white text-slate-500 border border-slate-100 hover:border-slate-300'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* CAREER GRID */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
            <Loader2 className="w-16 h-16 text-[#1FA774] animate-spin" />
            <p className="text-slate-500 font-bold font-poppins text-lg animate-pulse">Scanning the Salone job market...</p>
          </div>
        ) : error ? (
          <Card className="p-12 border-red-100 bg-red-50 text-center rounded-[3rem] space-y-6 shadow-sm">
            <p className="text-red-700 font-bold font-poppins text-xl">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700 rounded-2xl h-12 px-8 shadow-lg">
              Try Again
            </Button>
          </Card>
        ) : filteredCareers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCareers.map((career: Career) => (
              <CareerCard key={career.id} career={career} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold font-poppins text-slate-900 mb-2">No matches found</h3>
            <p className="text-slate-500 font-medium font-inter">Try searching for something else or changing the industry filter.</p>
          </div>
        )}

        {/* MARKET SNAPSHOT */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          <Card className="p-8 border-none bg-slate-900 text-white rounded-[2rem] space-y-4 shadow-xl">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <TrendingUp className="text-[#1FA774] w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold font-poppins">High Demand</h4>
            <p className="text-slate-400 text-sm font-inter leading-relaxed">Tech, Healthcare, and Engineering remain the fastest growing sectors in Sierra Leone for 2026.</p>
          </Card>
          <Card className="p-8 border-none bg-[#1FA774] text-white rounded-[2rem] space-y-4 shadow-xl">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Briefcase className="text-white w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold font-poppins">Local Opportunities</h4>
            <p className="text-white/80 text-sm font-inter leading-relaxed">We've verified over 100+ local career paths with specific salary ranges for Junior, Mid, and Senior levels.</p>
          </Card>
          <Card className="p-8 border-none bg-[#F4C430] text-[#0B1F3A] rounded-[2rem] space-y-4 shadow-xl">
            <div className="w-12 h-12 bg-[#0B1F3A]/5 rounded-2xl flex items-center justify-center">
              <Users className="text-[#0B1F3A] w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold font-poppins">Mentorship Ready</h4>
            <p className="text-[#0B1F3A]/70 text-sm font-inter leading-relaxed">Every career path features a list of local professionals who are ready to guide you on your journey.</p>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  )
}
