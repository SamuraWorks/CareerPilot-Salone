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
import { getJobs } from "@/lib/mock-api"
import { toast } from "sonner"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import { useProfile } from "@/lib/profile-context"
import { Footer } from "@/components/footer"

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<"all" | "job" | "internship" | "training">("all")
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>([])
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showStrategicPause, setShowStrategicPause] = useState(false)
  const [pendingJob, setPendingJob] = useState<string | null>(null)
  const { profile } = useProfile()

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
    // SYSTEM 4: The "Not Yet" Mechanism
    // If profile is incomplete or target role is missing, trigger Strategic Pause
    const isReady = profile.targetRole && profile.status && profile.experienceYears !== ""

    if (!isReady) {
      setPendingJob(title || "this role")
      setShowStrategicPause(true)
      return
    }

    if (link) {
      window.open(link, '_blank')
    } else {
      toast.info(`Application details for "${title}" will be available soon. Check back regularly!`)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
        <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Link href="/dashboard" className="inline-flex items-center gap-3 text-[10px] font-black font-sans uppercase tracking-[0.3em] text-emerald-600 hover:text-emerald-700 transition-all group mb-6">
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 group-hover:bg-emerald-100 transition-all">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                Back to Control Center
              </Link>

              <div className="inline-block mb-4 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
                <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest">Opportunity Network</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 text-gradient-salone tracking-tight uppercase">Career Opportunities</h1>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto text-balance font-medium">
                Explore real professional openings in Freetown, Bo, and beyond. Your next big career move starts here na 🇸🇱.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto text-left">
                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-emerald-600" />
                    </div>
                    <span className="text-4xl font-black text-[#0B1F3A]">{opportunities.length}</span>
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Live Feed</p>
                </div>
                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-4xl font-black text-[#0B1F3A]">{opportunities.filter(o => o.type === 'internship').length}</span>
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Internships</p>
                </div>
                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-4xl font-black text-[#0B1F3A]">ALL</span>
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Verified Base</p>
                </div>
              </div>
            </div>

            {/* --- SEARCHBAR --- */}
            {/* --- SEARCHBAR --- */}
            <div className="mb-12 space-y-6">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search for job titles, organizations, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 h-16 rounded-[2rem] border-slate-200 shadow-lg text-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                />
              </div>
            </div>

            {/* --- OPPORTUNITY FEED --- */}
            {/* --- OPPORTUNITY FEED --- */}
            <div className="space-y-8">
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
                      className="rounded-[1.5rem] font-black font-sans text-[10px] uppercase tracking-widest data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white data-[state=active]:shadow-xl transition-all h-full gap-2"
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
                      <p className="text-[#0B1F3A] font-black font-sans text-xs uppercase tracking-[0.5em] animate-pulse italic">Scanning Network Nodes...</p>
                    </div>
                  ) : filteredOpportunities.length === 0 ? (
                    <Card className="p-20 text-center bg-white border-8 border-slate-50 rounded-[4rem] shadow-inner">
                      <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 rotate-12">
                        <Search className="w-10 h-10 text-slate-200" />
                      </div>
                      <h3 className="text-2xl font-black font-sans text-[#0B1F3A] uppercase tracking-tighter">Vector not found</h3>
                      <p className="text-slate-400 font-bold italic font-sans mt-2">Adjust your parameters or check back for new data injections.</p>
                      <Button variant="link" onClick={() => { setSearchTerm(""); setSelectedType("all") }} className="mt-6 font-black font-sans text-[#1FA774] uppercase text-[10px] tracking-widest">
                        Reset Search Terminal
                      </Button>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 gap-8">
                      {filteredOpportunities.map((opp) => (
                        <Card key={opp.id} className="p-10 rounded-[3.5rem] bg-white border border-slate-50 hover:border-[#1FA774]/20 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col md:flex-row gap-10">
                          <div className="absolute inset-0 z-0 opacity-[0.03] grayscale pointer-events-none">
                            <Image src="/images/sections/dashboard/job-opportunity.png" alt="Opportunity" fill className="object-cover" />
                          </div>
                          <div className="absolute top-0 right-0 w-3 h-full bg-slate-50 group-hover:bg-[#1FA774] transition-colors" />

                          <div className="w-24 h-24 rounded-[1.8rem] bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#1FA774]/5 group-hover:border-[#1FA774]/20 transition-all">
                            {opp.type === 'job' ? <Briefcase className="w-10 h-10 text-[#0B1F3A] group-hover:text-[#1FA774] transition-colors" /> : <BookOpen className="w-10 h-10 text-[#1FA774] group-hover:text-[#1E5EFF] transition-colors" />}
                          </div>

                          <div className="flex-1 space-y-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                              <div className="space-y-1">
                                <h3 className="text-2xl md:text-3xl font-black font-sans text-[#0B1F3A] group-hover:text-[#1E5EFF] transition-colors leading-tight underline decoration-[#1FA774]/10 group-hover:decoration-transparent">{opp.title}</h3>
                                <p className="font-black font-sans text-[#1FA774] text-[11px] uppercase tracking-[0.2em] italic">{opp.organization}</p>
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
                              <div className="flex items-center gap-3 text-[11px] font-black font-sans text-[#0B1F3A] uppercase tracking-widest">
                                <MapPin className="w-4 h-4 text-[#1FA774]" />
                                {opp.location}
                              </div>
                              <div className="flex items-center gap-3 text-[11px] font-black font-sans text-[#0B1F3A] uppercase tracking-widest">
                                <Briefcase className="w-4 h-4 text-[#1E5EFF]" />
                                {opp.category && opp.category[0]}
                              </div>
                              {opp.deadline && (
                                <div className="flex items-center gap-3 text-[11px] font-black font-sans text-[#0B1F3A] uppercase tracking-widest">
                                  <Clock className="w-4 h-4 text-red-400" />
                                  {opp.deadline}
                                </div>
                              )}
                              {opp.duration && (
                                <div className="flex items-center gap-3 text-[11px] font-black font-sans text-[#0B1F3A] uppercase tracking-widest">
                                  <Clock className="w-4 h-4 text-blue-400" />
                                  {opp.duration}
                                </div>
                              )}
                            </div>

                            <p className="text-[#0B1F3A]/60 font-medium font-sans text-base line-clamp-2 italic leading-relaxed pl-6 border-l-4 border-slate-50 group-hover:border-[#1FA774] transition-all">{opp.description}</p>

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

          {/* STRATEGIC PAUSE DIALOG */}
          < Dialog open={showStrategicPause} onOpenChange={setShowStrategicPause} >
            <DialogContent className="sm:max-w-[500px] border-none rounded-[3rem] p-0 overflow-hidden shadow-2xl">
              <div className="bg-[#0B1F3A] p-10 text-white space-y-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1FA774]/10 rounded-full blur-3xl -mr-10 -mt-10" />
                <div className="w-16 h-16 rounded-2xl bg-[#1FA774]/20 border border-[#1FA774]/30 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-[#1FA774]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Strategic Pause</h2>
                  <p className="text-[#1FA774] font-black text-[10px] uppercase tracking-[0.3em]">Readiness Alert</p>
                </div>
                <p className="text-slate-300 font-medium italic border-l-4 border-[#1FA774] pl-6 py-2 leading-relaxed">
                  We've analyzed your current vector for <b>"{pendingJob}"</b>. Applying now might result in a "ghost" response because your profile profile is only 40% complete.
                </p>
              </div>
              <div className="p-10 bg-white space-y-8">
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Unlock Application By:</p>
                  <div className="space-y-3">
                    {[
                      "Constructing your outcome-based CV",
                      "Defining your Impact Metric",
                      "Matching with a Mentor in this sector"
                    ].map((task, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#1FA774] transition-all">
                        <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-[#1FA774] group-hover:text-white transition-all text-[10px] font-black">{i + 1}</div>
                        <span className="text-sm font-bold text-slate-700">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/dashboard" className="w-full">
                    <Button className="w-full h-14 rounded-2xl bg-[#0B1F3A] text-white font-black uppercase tracking-widest text-xs shadow-xl hover:bg-black transition-all">
                      Go to Control Center
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={() => setShowStrategicPause(false)} className="text-slate-400 font-black uppercase tracking-widest text-[9px] hover:bg-transparent hover:text-slate-900">
                    Wait, let me finish my profile first
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </main>
        <Footer />
      </div>
    </DashboardLayout>
  )
}

