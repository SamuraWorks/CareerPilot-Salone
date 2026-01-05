"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Briefcase, Clock, ExternalLink, BookOpen, Bookmark, Loader2, ArrowLeft } from "lucide-react"
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
        {/* Header Card with Image */}
        <Card className="relative overflow-hidden bg-white border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-center">
            <div className="p-8 flex-1">
              <h1 className="text-3xl md:text-4xl font-bold font-poppins text-gradient-salone mb-4 tracking-tight">Jobs & Training</h1>
              <p className="text-slate-600 font-inter text-lg max-w-lg">
                Explore real opportunities in Freetown, Bo, and beyond. Your next big career move starts here in 🇸🇱.
              </p>
            </div>
            <div className="relative w-full md:w-80 h-48 md:h-64 shrink-0 bg-slate-100">
              {/* Use a placeholder or a pattern if the image is missing, but keeping original image for now if it exists */}
              <Image
                src="/jobs_african.png"
                alt="Modern Freetown Office"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden md:block" />
            </div>
          </div>
        </Card>

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
