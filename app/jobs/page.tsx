"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Briefcase, Clock, ExternalLink, BookOpen, Bookmark, Loader2, ArrowLeft, Sparkles, Zap } from "lucide-react"
import { getJobs } from "@/lib/db"
import { toast } from "sonner"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<"all" | "job" | "internship" | "training">("all")
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>([])
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      const data = await getJobs()
      setOpportunities(data)
      setLoading(false)
    }
    fetchJobs()
  }, [])

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesType = selectedType === "all" || opp.type === selectedType
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (opp.category && opp.category.some((cat: string) => cat.toLowerCase().includes(searchTerm.toLowerCase())))

    return matchesType && matchesSearch
  })

  const getCount = (type: string) => {
    if (type === 'all') return opportunities.length
    return opportunities.filter(o => o.type === type).length
  }

  const handleSave = (id: string) => {
    if (savedOpportunities.includes(id)) {
      setSavedOpportunities(savedOpportunities.filter(oppId => oppId !== id))
      toast.success("Removed from saved opportunities")
    } else {
      setSavedOpportunities([...savedOpportunities, id])
      toast.success("Saved for later!")
    }
  }

  const handleApply = (link?: string, title?: string) => {
    if (link) {
      window.open(link, '_blank')
    } else {
      toast.info(`Application details for "${title}" will be available soon. Check back regularly!`)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-12 pb-24 pt-4">

        {/* --- PREMIUM HERO SECTION --- */}
        <section className="relative rounded-[3.5rem] overflow-hidden bg-[#0B1F3A] min-h-[400px] flex items-center shadow-2xl group border-b-8 border-b-[#1FA774]">
                    <div className="relative z-20 w-full p-10 md:p-16 space-y-8">
            <Link href="/dashboard" className="inline-flex items-center gap-3 text-[10px] font-black font-poppins uppercase tracking-[0.3em] text-[#4ADE80] hover:text-white transition-all group">
              <div className="p-2 rounded-lg bg-[#4ADE80]/10 border border-[#4ADE80]/20 group-hover:bg-[#4ADE80] group-hover:text-[#0B1F3A] transition-all">
                <ArrowLeft className="w-4 h-4" />
              </div>
              Back to Control Center
            </Link>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#1FA774]" />
                <span className="text-[#1FA774] font-black text-[10px] uppercase tracking-[0.2em]">Opportunity Network</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter font-poppins uppercase">
                Career <br /> <span className="text-gradient-salone brightness-125">Opportunities</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-medium font-inter max-w-2xl leading-relaxed border-l-4 border-[#1FA774] pl-6 italic">
                Explore real professional openings in Freetown, Bo, and beyond. Your next big career move starts here na 🇸🇱.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-white">{opportunities.length}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Live Feed</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-4xl font-black text-[#1FA774]">{opportunities.filter(o => o.type === 'internship').length}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Internships</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- SMART SEARCHBAR --- */}
        <div className="px-4 -mt-16 relative z-30 max-w-3xl mx-auto w-full">
          <Card className="p-4 bg-white border-none shadow-2xl rounded-[3rem] w-full border-b-4 border-slate-100">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-[#1E5EFF] transition-colors" />
              <input
                type="text"
                placeholder="Search for job titles, organizations, or skills..."
                className="w-full h-16 pl-16 pr-6 rounded-[2rem] bg-slate-50 border-none focus:bg-white focus:ring-[15px] focus:ring-[#1E5EFF]/5 shadow-inner outline-none font-poppins font-bold text-base transition-all text-[#0B1F3A]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </Card>
        </div>

        {/* --- OPPORTUNITY FEED --- */}
        <div className="px-4">
          <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as any)} className="w-full space-y-10">
            <TabsList className="grid w-full grid-cols-4 bg-slate-50 p-2 rounded-[2rem] h-20 shadow-inner border border-slate-100 max-w-4xl mx-auto">
              {[
                { id: 'all', label: 'Matrix', icon: Briefcase },
                { id: 'job', label: 'Positions', icon: Briefcase },
                { id: 'internship', label: 'Internships', icon: BookOpen },
                { id: 'training', label: 'Academies', icon: Zap }
              ].map(tab => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-[1.5rem] font-black font-poppins text-[10px] uppercase tracking-widest data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white data-[state=active]:shadow-xl transition-all h-full gap-2"
                >
                  <tab.icon className="w-3.5 h-3.5 hidden md:block" />
                  {tab.label} ({getCount(tab.id)})
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedType} className="mt-6 space-y-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-40 gap-8 bg-white rounded-[4rem] border-8 border-slate-50 shadow-inner">
                  <Loader2 className="w-20 h-20 text-[#1FA774] animate-spin" />
                  <p className="text-[#0B1F3A] font-black font-poppins text-xs uppercase tracking-[0.5em] animate-pulse italic">Scanning Network Nodes...</p>
                </div>
              ) : filteredOpportunities.length === 0 ? (
                <Card className="p-20 text-center bg-white border-8 border-slate-50 rounded-[4rem] shadow-inner">
                  <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 rotate-12">
                    <Search className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-black font-poppins text-[#0B1F3A] uppercase tracking-tighter">Vector not found</h3>
                  <p className="text-slate-400 font-bold italic font-inter mt-2">Adjust your parameters or check back for new data injections.</p>
                  <Button variant="link" onClick={() => { setSearchTerm(""); setSelectedType("all") }} className="mt-6 font-black font-poppins text-[#1FA774] uppercase text-[10px] tracking-widest">
                    Reset Search Terminal
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-8">
                  {filteredOpportunities.map((opp) => (
                    <Card key={opp.id} className="p-10 rounded-[3.5rem] bg-white border border-slate-50 hover:border-[#1FA774]/20 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col md:flex-row gap-10">
                      <div className="absolute top-0 right-0 w-3 h-full bg-slate-50 group-hover:bg-[#1FA774] transition-colors" />

                      <div className="w-24 h-24 rounded-[1.8rem] bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#1FA774]/5 group-hover:border-[#1FA774]/20 transition-all">
                        {opp.type === 'job' ? <Briefcase className="w-10 h-10 text-[#0B1F3A] group-hover:text-[#1FA774] transition-colors" /> : <BookOpen className="w-10 h-10 text-[#1FA774] group-hover:text-[#1E5EFF] transition-colors" />}
                      </div>

                      <div className="flex-1 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                          <div className="space-y-1">
                            <h3 className="text-2xl md:text-3xl font-black font-poppins text-[#0B1F3A] group-hover:text-[#1E5EFF] transition-colors leading-tight underline decoration-[#1FA774]/10 group-hover:decoration-transparent">{opp.title}</h3>
                            <p className="font-black font-poppins text-[#1FA774] text-[11px] uppercase tracking-[0.2em] italic">{opp.organization}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-[#0B1F3A] text-white font-black text-[9px] uppercase tracking-widest px-4 py-2 border-none rounded-xl">
                              {opp.type}
                            </Badge>
                            {opp.salary && (
                              <Badge className="bg-[#1FA774]/10 text-[#1FA774] font-black text-[9px] uppercase tracking-widest px-4 py-2 border-none rounded-xl">
                                {opp.salary}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-50 bg-slate-50/50 px-8 rounded-[2rem] group-hover:bg-white transition-all group-hover:shadow-inner">
                          <div className="flex items-center gap-3 text-[11px] font-black font-poppins text-[#0B1F3A] uppercase tracking-widest">
                            <MapPin className="w-4 h-4 text-[#1FA774]" />
                            {opp.location}
                          </div>
                          <div className="flex items-center gap-3 text-[11px] font-black font-poppins text-[#0B1F3A] uppercase tracking-widest">
                            <Briefcase className="w-4 h-4 text-[#1E5EFF]" />
                            {opp.category && opp.category[0]}
                          </div>
                          {opp.deadline && (
                            <div className="flex items-center gap-3 text-[11px] font-black font-poppins text-[#0B1F3A] uppercase tracking-widest">
                              <Clock className="w-4 h-4 text-red-400" />
                              {opp.deadline}
                            </div>
                          )}
                          {opp.duration && (
                            <div className="flex items-center gap-3 text-[11px] font-black font-poppins text-[#0B1F3A] uppercase tracking-widest">
                              <Clock className="w-4 h-4 text-blue-400" />
                              {opp.duration}
                            </div>
                          )}
                        </div>

                        <p className="text-[#0B1F3A]/60 font-medium font-inter text-base line-clamp-2 italic leading-relaxed pl-6 border-l-4 border-slate-50 group-hover:border-[#1FA774] transition-all">{opp.description}</p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <Button
                            onClick={() => handleApply(opp.link, opp.title)}
                            className="flex-1 h-[68px] rounded-[2rem] bg-[#0B1F3A] hover:bg-[#1E5EFF] text-white font-black uppercase tracking-widest text-[11px] shadow-2xl active:scale-95 transition-all group/btn"
                          >
                            Initiate Application Phase
                            <ExternalLink className="ml-3 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleSave(opp.id)}
                            className={cn("h-[68px] rounded-[2rem] px-8 border-2 border-slate-100 font-black uppercase tracking-widest text-[10px] transition-all hover:bg-white active:scale-95", savedOpportunities.includes(opp.id) ? "bg-[#1FA774]/10 border-[#1FA774]/20 text-[#1FA774]" : "text-slate-400")}
                          >
                            <Bookmark className={cn("w-5 h-5 mr-3", savedOpportunities.includes(opp.id) && "fill-current")} />
                            {savedOpportunities.includes(opp.id) ? "Vector Locked" : "Lock Vector"}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
