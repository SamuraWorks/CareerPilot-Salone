"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, BookOpen, TrendingUp, DollarSign, Users, Loader2, GraduationCap, Laptop, ExternalLink, Briefcase, UserCheck, CheckCircle2, Target, Lightbulb } from "lucide-react"
import Image from "next/image"
import { MOCK_MENTORS } from "@/lib/mentors"
import { SIERRA_LEONE_CAREERS, PREVIEW_ROADMAP, INSTITUTIONS, type CareerInfo } from "@/lib/career-data"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


export default function CareerDetailPage({ params }: { params: { id: string } }) {
  const resolvedParams = params

  const [career, setCareer] = useState<CareerInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isStarting, setIsStarting] = useState(false)
  const { profile, updateProfile } = useAuth()
  const router = useRouter()

  useEffect(() => {
    async function fetchCareer() {
      try {
        setLoading(true)
        // Mock network delay for premium feel
        await new Promise(resolve => setTimeout(resolve, 800))

        const { SIERRA_LEONE_CAREERS } = await import("@/lib/career-data")

        // Find career by its unique ID string
        const foundCareer = SIERRA_LEONE_CAREERS.find(c => c.id === resolvedParams.id);

        if (foundCareer) {
          setCareer(foundCareer as CareerInfo)
        } else {
          setError("Career identifier not found in the SL Intelligence Base.")
        }
      } catch (err) {
        console.error("Error fetching career details:", err)
        setError("Could not load career details.")
      } finally {
        setLoading(false)
      }
    }

    if (resolvedParams.id) {
      fetchCareer()

      // Track engagement
      if (profile && profile.id) {
        const viewed = profile.viewed_careers || [];
        if (!viewed.includes(resolvedParams.id)) {
          updateProfile({
            viewed_careers: [...viewed, resolvedParams.id]
          });
        }
      }
    }
  }, [resolvedParams.id, profile?.id])

  const handleStartRoadmap = async () => {
    if (!career) return
    setIsStarting(true)
    try {
      await updateProfile({
        activeRoadmapId: career.id,
        careerGoal: career.title
      })
      toast.success(`Success! Your 90-day roadmap for ${career.title} is now active.`, {
        description: "Redirecting you to your personalized journey...",
      })
      setTimeout(() => router.push("/roadmap"), 1500)
    } catch (err) {
      toast.error("Could not activate roadmap. Please try again.")
    } finally {
      setIsStarting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Accessing Career Intelligence...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !career) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-[#0B1F3A]">Intel Mismatch</h1>
            <p className="text-slate-500 mb-8">{error || "The requested career dossier is not available."}</p>
            <Link href="/careers">
              <Button className="bg-[#0B1F3A] rounded-2xl w-full h-12">Return to Careers</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const demandColor: Record<string, string> = {
    High: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    Medium: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    Low: "bg-slate-500/10 text-slate-700 border-slate-500/20",
  }

  // Smart Mentor Filtering logic
  const recommendedMentors = MOCK_MENTORS.filter(m =>
    m.field.toLowerCase() === career.industry.toLowerCase() ||
    m.support_types.some(s => s.toLowerCase().includes(career.industry.toLowerCase())) ||
    (career.industry === "Technology" && m.field === "Technology")
  );

  // Fallback to general mentors if no direct match
  const finalMentors = recommendedMentors.length > 0 ? recommendedMentors : MOCK_MENTORS.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/careers">
            <Button variant="ghost" className="mb-8 gap-2 hover:bg-white text-slate-500 font-bold">
              <ArrowLeft className="w-4 h-4" />
              Intelligence Base
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: HERO & CORE INFO */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Card */}
              <div className="relative h-80 w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src={career.image || "/placeholder.svg"}
                  alt={career.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1F3A] to-transparent p-10 pt-20">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={`${demandColor[career.demand]} backdrop-blur-md border shadow-lg font-bold font-sans py-1.5 px-4 rounded-full border-white/20 text-white bg-white/10`} variant="secondary">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {career.demand} Demand Profile
                    </Badge>
                    <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold font-sans py-1.5 px-4 rounded-full">
                      {career.industry}
                    </Badge>
                  </div>
                  <h1 className="text-5xl font-black text-white leading-tight tracking-tight">{career.title}</h1>
                </div>
              </div>

              {/* Tabs Interface */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="flex flex-nowrap md:flex-wrap overflow-x-auto justify-start bg-transparent gap-4 h-auto p-0 mb-8 border-b border-slate-200 w-full no-scrollbar">
                  {[
                    { id: 'overview', label: 'Briefing', icon: Lightbulb },
                    { id: 'skills', label: 'Requirements', icon: Target },
                    { id: 'salary', label: 'Economics', icon: DollarSign },
                    { id: 'mentors', label: 'Mentors', icon: Users },
                    { id: 'pathway', label: 'Training', icon: GraduationCap }
                  ].map(tab => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700 data-[state=active]:shadow-none border-b-4 border-transparent rounded-none px-4 py-3 font-black text-xs uppercase tracking-widest text-slate-400 gap-2 min-w-fit flex-shrink-0"
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-0">
                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm leading-relaxed">
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                      Strategic Career Overview
                    </h3>
                    <p className="text-lg text-slate-600 font-medium">
                      {career.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                      <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                        <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Growth Potential</h4>
                        <p className="text-[#0B1F3A] font-bold">{career.growthPotential}</p>
                      </div>
                      <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                        <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Target Skills</h4>
                        <p className="text-[#0B1F3A] font-bold">{career.requiredSkills.length} Core Competencies</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6 mt-0">
                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-8">Skill & Knowledge Matrix</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Hard Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {career.requiredSkills.map((skill) => (
                            <Badge key={skill} className="px-4 py-2 bg-slate-50 text-slate-700 border-slate-200 rounded-xl" variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-blue-600" />
                          Education Track
                        </h4>
                        <ul className="space-y-3">
                          {career.requiredEducation.map((edu, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              {edu}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="salary" className="space-y-6 mt-0">
                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                      <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg shrink-0">
                        <DollarSign className="w-12 h-12 text-emerald-600" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Sierra Leone Market Rate</h4>
                        <p className="text-4xl font-black text-[#0B1F3A] mb-4">{career.salaryRange}</p>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                          *Analysis includes bonuses and allowances common in {career.industry}. Private sector roles typically pay 20-40% higher than public sector equivalents in Freetown.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="mentors" className="space-y-6 mt-0">
                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold text-[#0B1F3A]">Recommended Industry Mentors</h3>
                      <Link href="/mentorship">
                        <Button variant="link" className="text-emerald-600 font-black text-xs uppercase tracking-tighter">View All Leads</Button>
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {finalMentors.map((mentor) => (
                        <Card key={mentor.id} className="overflow-hidden border-slate-100 hover:border-emerald-500/20 transition-all cursor-pointer group rounded-3xl shadow-none hover:shadow-xl hover:shadow-emerald-500/5">
                          <div className="p-6 flex items-center gap-5">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0">
                              <Image src={mentor.image_url} alt={mentor.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-[#0B1F3A] truncate text-lg">{mentor.name}</h4>
                              <p className="text-xs text-slate-500 font-bold mb-3">{mentor.role}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-[9px] font-black h-5 uppercase tracking-tighter bg-emerald-50 text-emerald-700">
                                  {mentor.availability}
                                </Badge>
                                <span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">{mentor.experience} Exp</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connect for Guidance</span>
                            <Link href={`/mentorship/${mentor.id}`}>
                              <Button variant="ghost" size="sm" className="h-9 px-4 text-xs font-black uppercase text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl">
                                Profile <UserCheck className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pathway" className="space-y-6 mt-0">
                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm leading-relaxed">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0B1F3A] text-xl">Where to Specialise</h3>
                        <p className="text-sm font-medium text-slate-400">Top-tier local institutions for {career.title}.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {career.localInstitutions.map((inst, i) => {
                        const matchedInst = INSTITUTIONS.find(dbInst =>
                          inst.toLowerCase().includes(dbInst.name.toLowerCase()) ||
                          dbInst.name.toLowerCase().includes(inst.toLowerCase()) ||
                          dbInst.id === inst.toLowerCase().replace(/\s+/g, '-')
                        );

                        return (
                          <div key={i} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex items-center justify-between group hover:bg-white hover:border-blue-200 transition-all">
                            <div className="flex items-center gap-4 text-[#0B1F3A] font-bold">
                              <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-xs shadow-sm relative overflow-hidden shrink-0">
                                {matchedInst && matchedInst.image ? (
                                  <Image src={matchedInst.image} alt={inst} fill className="object-cover p-1.5" />
                                ) : (
                                  <span>{i + 1}</span>
                                )}
                              </div>
                              {inst}
                            </div>
                            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* RIGHT COLUMN: ACTIONS & TOOLS */}
            <div className="space-y-6">
              <Card className="rounded-[2.5rem] overflow-hidden border-none shadow-xl bg-emerald-600 text-white">
                <div className="p-8">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                    <Laptop className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">Launch Pathway</h3>
                  <p className="text-emerald-50/80 mb-8 font-medium leading-relaxed">
                    Generate a high-fidelity roadmap specifically for your current education and skill level.
                  </p>
                  <Button
                    onClick={handleStartRoadmap}
                    disabled={isStarting}
                    className="w-full h-14 bg-white text-emerald-700 hover:bg-emerald-50 rounded-[1.25rem] font-black uppercase text-xs tracking-widest gap-3"
                  >
                    {isStarting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>Initialize AI Roadmap <ArrowRight className="w-4 h-4" /></>
                    )}
                  </Button>
                </div>
              </Card>

              <Card className="rounded-[2.5rem] bg-white border-slate-100 p-8 shadow-sm">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Career Resources</h4>
                <div className="space-y-3">
                  <Link href="/cv-builder" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group">
                    <span className="font-bold text-[#0B1F3A] text-sm group-hover:text-emerald-600">CV/Resume Builder</span>
                    <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </Link>
                  <Link href="/jobs" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group">
                    <span className="font-bold text-[#0B1F3A] text-sm group-hover:text-emerald-600">Job Board Index</span>
                    <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </Link>
                </div>
              </Card>

              <div className="p-6 bg-blue-50/50 rounded-[2rem] border border-blue-50 space-y-4">
                <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Community Hub
                </h4>
                <p className="text-xs text-blue-600 font-medium leading-relaxed">
                  Join 2,400+ other Salone students pursuing the {career.title} pathway. Shared notes and local study groups.
                </p>
                <Button variant="outline" className="w-full bg-white border-blue-200 text-blue-700 font-bold rounded-xl h-10 text-xs">
                  Join Student Group
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

