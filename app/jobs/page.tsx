"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Briefcase, Clock, ExternalLink, BookOpen, Bookmark, Loader2, ArrowLeft, Sparkles } from "lucide-react"
import { getJobs } from "@/lib/db"
import { toast } from "sonner"
import Link from "next/link"

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
      <div className="space-y-6">
        <Link
          href="/dashboard"
          className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
        {/* PREMIUM HERO HEADER */}
        <section className="relative rounded-[3rem] overflow-hidden bg-[#0B1F3A] min-h-[340px] flex items-center shadow-2xl group">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/dashboard/salone_success.png"
              alt="Jobs & Training"
              fill
              className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,167,116,0.15),transparent)] z-10" />
          </div>

          <div className="relative z-20 max-w-4xl p-10 md:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
              <Briefcase className="w-4 h-4 text-[#1FA774]" />
              <span className="text-[#1FA774] font-bold text-xs uppercase tracking-widest">Opportunity Hub</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-poppins">
              Jobs & <span className="text-[#F4C430]">Training</span> Explorer
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-medium font-inter max-w-xl leading-relaxed">
              Explore real opportunities in Freetown, Bo, and beyond. Your next big career move starts here in 🇸🇱.
            </p>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">{opportunities.length}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Postings</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[#F4C430]">{opportunities.filter(o => o.type === 'internship').length}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Internships</span>
              </div>
            </div>
          </div>
        </section>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, organization, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-12 font-poppins"
          />
        </div>

        {/* Tabs */}
        <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg font-bold font-poppins text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm">
              All ({getCount('all')})
            </TabsTrigger>
            <TabsTrigger value="job" className="rounded-lg font-bold font-poppins text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm">
              Jobs ({getCount('job')})
            </TabsTrigger>
            <TabsTrigger value="internship" className="rounded-lg font-bold font-poppins text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm">
              Internships ({getCount('internship')})
            </TabsTrigger>
            <TabsTrigger value="training" className="rounded-lg font-bold font-poppins text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm">
              Training ({getCount('training')})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedType} className="mt-6 space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-20 text-muted-foreground">
                <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                <p className="font-medium font-inter">Finding the best opportunities for you...</p>
              </div>
            ) : filteredOpportunities.length === 0 ? (
              <Card className="p-12 text-center bg-slate-50 border-dashed border-2">
                <p className="text-muted-foreground font-medium font-inter">No opportunities found matching your criteria.</p>
                <Button variant="link" onClick={() => { setSearchTerm(""); setSelectedType("all") }} className="mt-2 font-poppins text-primary">
                  Clear all filters
                </Button>
              </Card>
            ) : (
              filteredOpportunities.map((opp) => (
                <Card key={opp.id} className="p-6 hover:shadow-lg transition-shadow border-slate-100 group">
                  <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors">
                        {opp.type === 'job' ? <Briefcase className="w-7 h-7 text-primary" /> : <BookOpen className="w-7 h-7 text-secondary" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <h3 className="text-xl font-bold font-poppins text-slate-900 group-hover:text-primary transition-colors">{opp.title}</h3>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="bg-slate-50 uppercase text-[10px] font-bold font-poppins border-slate-200">
                              {opp.type}
                            </Badge>
                            {opp.salary && (
                              <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-none font-bold font-poppins text-[10px] uppercase">
                                {opp.salary}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="font-bold font-poppins text-slate-600 mt-0.5">{opp.organization}</p>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-slate-100 bg-slate-50/50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-[13px] font-medium font-inter text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {opp.location}
                      </div>
                      <div className="flex items-center gap-2 text-[13px] font-medium font-inter text-slate-600">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        {opp.category && opp.category[0]}
                      </div>
                      {opp.deadline && (
                        <div className="flex items-center gap-2 text-[13px] font-medium font-inter text-slate-600">
                          <Clock className="w-4 h-4 text-slate-400" />
                          {opp.deadline}
                        </div>
                      )}
                      {opp.duration && (
                        <div className="flex items-center gap-2 text-[13px] font-medium font-inter text-slate-600">
                          <Clock className="w-4 h-4 text-slate-400" />
                          {opp.duration}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed font-inter">{opp.description}</p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button onClick={() => handleApply(opp.link, opp.title)} className="flex-1 gap-2 font-bold font-poppins uppercase text-xs tracking-wider h-12 shadow-lg shadow-primary/20 bg-slate-900 text-white hover:bg-primary">
                        View Details & Apply
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleSave(opp.id)}
                        className={cn("gap-2 h-12 font-bold font-poppins px-6 border border-slate-200", savedOpportunities.includes(opp.id) && "bg-slate-100 border-slate-300")}
                      >
                        <Bookmark className={cn("w-4 h-4", savedOpportunities.includes(opp.id) && "fill-current")} />
                        {savedOpportunities.includes(opp.id) ? "Saved" : "Save"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
