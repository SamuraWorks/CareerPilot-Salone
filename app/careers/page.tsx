"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/footer"
import { CareerCard } from "@/components/career-card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { sampleCareers } from "@/lib/sample-data"
import { Search, Briefcase, TrendingUp, Users, Sparkles, MapPin, ArrowRight, Target } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

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
    <DashboardLayout>
      <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">

        {/* --- PREMIUM DYNAMIC HERO --- */}
        <section className="relative rounded-[3.5rem] overflow-hidden bg-[#0B1F3A] min-h-[360px] flex items-center shadow-2xl group border-b-8 border-b-[#1FA774]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/salone_education.png"
              alt="Careers Library"
              fill
              className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[#0B1F3A]/80" />
          </div>

          <div className="relative z-20 w-full p-10 md:p-16 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1FA774]/20 border border-[#1FA774]/30 rounded-full backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#4ADE80]" />
              <span className="text-[#4ADE80] font-black text-[10px] uppercase tracking-[0.2em]">Career Intelligence Repository</span>
            </div>

            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter font-poppins uppercase">
                Explore <br /> <span className="text-gradient-salone brightness-125">Opportunities</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 font-medium font-inter max-w-2xl leading-relaxed italic border-l-4 border-[#1FA774] pl-6">
                Discover your path within Sierra Leone's evolving professional landscape. From tech to mining, find where you fit.
              </p>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
              {[
                { label: "Vetted Paths", val: `${sampleCareers.length}+`, icon: Briefcase, color: "text-blue-400" },
                { label: "Active Users", val: "8.5K", icon: Users, color: "text-[#1FA774]" },
                { label: "Growth Sectors", val: "12+", icon: TrendingUp, color: "text-amber-400" },
                { label: "Success Rate", val: "92%", icon: Target, color: "text-indigo-400" }
              ].map((s, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                  <div className="flex items-center gap-3 mb-1">
                    <s.icon className={cn("w-4 h-4", s.color)} />
                    <span className="text-white font-black text-lg font-poppins">{s.val}</span>
                  </div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Search and Filter Architecture */}
        <div className="sticky top-0 z-30 py-6 bg-white/80 backdrop-blur-md border-b border-slate-100 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative w-full max-w-xl group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#1E5EFF] transition-colors" />
              <Input
                type="search"
                placeholder="Find your future: search by career, skill, or industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-14 pl-12 rounded-2xl border-slate-200 bg-slate-50 focus-visible:ring-[#1E5EFF]/20 font-medium text-base shadow-sm group-hover:border-slate-300 transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-end flex-1">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "h-10 px-6 rounded-xl font-black uppercase tracking-widest text-[9px]",
                  selectedCategory === null ? "bg-[#0B1F3A] text-white" : "border-slate-200"
                )}
              >
                All Vectors
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "h-10 px-6 rounded-xl font-black uppercase tracking-widest text-[9px]",
                    selectedCategory === category ? "bg-[#1E5EFF] text-white border-[#1E5EFF]" : "border-slate-200"
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Metadata */}
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic leading-none">
            Synthesized {filteredCareers.length} Career Vectors
          </p>
        </div>

        {/* Career Intelligence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCareers.map((career) => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>

        {/* Null State Architecture */}
        {filteredCareers.length === 0 && (
          <div className="text-center py-40 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
            <Search className="w-16 h-16 text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-[#0B1F3A] uppercase tracking-tighter mb-2">No Vectors Found</h3>
            <p className="text-slate-500 font-medium mb-8">System could not locate matches for your current parameters.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory(null)
              }}
              className="h-14 px-10 rounded-2xl bg-[#0B1F3A] text-white font-black uppercase tracking-widest text-[10px]"
            >
              Reset Intelligence Filter
            </Button>
          </div>
        )}

        {/* CTA Banner */}
        <section className="bg-slate-50 rounded-[4rem] p-12 md:p-24 text-center space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1FA774]/5 rounded-full blur-[100px] group-hover:scale-110 transition-transform" />
          <h2 className="text-3xl md:text-5xl font-black text-[#0B1F3A] tracking-tight font-poppins uppercase leading-none italic">
            Don't see your <br /> <span className="text-[#1FA774]">Dream Path</span>?
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto italic">
            Our AI Mentor can synthesize a personalized career roadmap for any profession, even those not listed in our main repository.
          </p>
          <div className="pt-4">
            <Link href="/guidance">
              <Button size="lg" className="h-[72px] px-12 rounded-[2rem] bg-[#0B1F3A] text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#1E5EFF] transition-all shadow-2xl active:scale-95">
                Consult AI Mentor Now
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </DashboardLayout>
  )
}
