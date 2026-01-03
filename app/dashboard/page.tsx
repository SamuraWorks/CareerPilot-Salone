"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { getJobs, getScholarships, getLatestCareerTestResult } from "@/lib/db"
import Link from "next/link"
import {
  ArrowRight,
  Target,
  FileText,
  Sparkles,
  Briefcase,
  MapPin,
  Loader2,
  GraduationCap,
  BookOpen,
  LayoutDashboard,
  Map,
  Quote,
  TrendingUp,
  Zap
} from "lucide-react"

interface UserProfile {
  name: string
  educationLevel: string
  careerGoal: string
  subjects: string[]
  skills?: string[]
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [testResult, setTestResult] = useState<any>(null)
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [filter, setFilter] = useState<'all' | 'jobs' | 'scholarships' | 'training'>('all')

  useEffect(() => {
    const savedData = localStorage.getItem("userOnboarding")
    if (savedData) {
      setProfile(JSON.parse(savedData))
    }

    const loadData = async () => {
      setLoading(true)
      try {
        const [jobs, scholarships] = await Promise.all([getJobs(), getScholarships()])
        const training = [
          { id: 't1', title: 'Full Stack Development', organization: 'Orange Digital Center', type: 'training', location: 'Freetown' },
          { id: 't2', title: 'Solar Repair Training', organization: 'Barefoot Women College', type: 'training', location: 'Lungi' }
        ]

        const all = [
          ...jobs.map(j => ({ ...j, type: 'jobs' })),
          ...scholarships.map(s => ({ ...s, type: 'scholarships' })),
          ...training
        ]
        setOpportunities(all)

        if (user) {
          const res = await getLatestCareerTestResult(user.id)
          if (res) setTestResult(res)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [user])

  const filteredOpps = opportunities.filter(o => filter === 'all' || o.type === filter)

  return (
    <DashboardLayout>
      <div className="space-y-8 sm:space-y-12 lg:space-y-16 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 animate-in fade-in duration-1000">

        {/* PREMIUM HERO SECTION - Mobile Optimized */}
        <section className="relative rounded-2xl sm:rounded-[3.5rem] overflow-hidden shadow-2xl border-2 sm:border-4 border-white/20 h-[400px] sm:h-[450px] lg:h-[500px] group transition-all duration-700 hover:shadow-primary/30">
          <div className="absolute inset-0 z-0">
            <img
              src="/african_tech_hub_inspiring.png"
              alt="African Tech Hub"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent" />
            <div className="absolute inset-0 bg-slate-900/20 mix-blend-overlay" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center px-5 sm:px-10 md:px-20 max-w-4xl space-y-4 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <Badge className="w-fit bg-green-500 text-white mb-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] border-none shadow-lg">
                Inspire. Lead. Succeed.
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1]">
                Welcome back, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  {profile?.name || user?.name || 'Trailblazer'}.
                </span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-lg md:text-xl font-medium max-w-lg leading-relaxed">
                Sierra Leone's youth are the architect of its future. Get the tools you need to build yours today.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
              <Link href="/career">
                <Button className="h-16 sm:h-20 w-full rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white backdrop-blur-md text-white hover:text-slate-900 border border-white/20 font-black uppercase text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] transition-all group/btn shadow-2xl">
                  <Target className="mr-1 sm:mr-3 w-4 sm:w-5 h-4 sm:h-5 text-blue-400 group-hover/btn:text-blue-600" />
                  <span className="hidden sm:inline">Career Test</span>
                  <span className="sm:hidden">Test</span>
                </Button>
              </Link>
              <Link href="/roadmap">
                <Button className="h-16 sm:h-20 w-full rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white backdrop-blur-md text-white hover:text-slate-900 border border-white/20 font-black uppercase text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] transition-all group/btn shadow-2xl">
                  <Sparkles className="mr-1 sm:mr-3 w-4 sm:w-5 h-4 sm:h-5 text-green-400 group-hover/btn:text-green-600" />
                  <span className="hidden sm:inline">Build Roadmap</span>
                  <span className="sm:hidden">Roadmap</span>
                </Button>
              </Link>
              <Link href="/cv-builder">
                <Button className="h-16 sm:h-20 w-full rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white backdrop-blur-md text-white hover:text-slate-900 border border-white/20 font-black uppercase text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] transition-all group/btn shadow-2xl">
                  <FileText className="mr-1 sm:mr-3 w-4 sm:w-5 h-4 sm:h-5 text-purple-400 group-hover/btn:text-purple-600" />
                  <span className="hidden sm:inline">Build My CV</span>
                  <span className="sm:hidden">CV</span>
                </Button>
              </Link>
              {/* INTERACTIVE VELOCITY CARD */}
              <div className="h-16 sm:h-20 w-full rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1fb65e]/20 to-[#0072bc]/20 backdrop-blur-xl border border-white/30 p-2 sm:p-4 flex items-center justify-between group cursor-help transition-all hover:border-white/50">
                <div className="space-y-0.5">
                  <div className="text-[8px] sm:text-[9px] font-black text-white/60 uppercase tracking-widest">Velocity</div>
                  <div className="text-lg sm:text-xl font-black text-white flex items-center gap-1 sm:gap-2">
                    85% <TrendingUp className="w-3 sm:w-4 h-3 sm:h-4 text-green-400 animate-bounce" />
                  </div>
                </div>
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MIDDLE SECTION: Success Story + Stats - Mobile Optimized */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
          <div className="lg:col-span-2 space-y-6 sm:space-y-10">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-slate-400">Personalizado</h2>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
              <Link href="/roadmap">
                <Card className="border-none shadow-2xl rounded-2xl sm:rounded-[3rem] overflow-hidden group/card bg-white dark:bg-slate-900 h-[280px] sm:h-[350px] relative hover:-translate-y-2 transition-all duration-500">
                  <img
                    src="/african_student_roadmap_1767384301559.png"
                    alt="Your Roadmap"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                  <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex justify-between items-end">
                    <div className="space-y-2">
                      <Badge className="bg-green-500 text-white border-none font-black text-[8px] sm:text-[9px] tracking-widest px-2 sm:px-3 py-0.5 sm:py-1 uppercase">Recommended Path</Badge>
                      <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">Your Career <br /> Roadmap</h4>
                      <p className="text-slate-300 text-xs sm:text-sm font-medium">Next Step: Finish Skills Checklist</p>
                    </div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/card:bg-white group-hover/card:text-slate-900 transition-colors">
                      <Map className="w-5 sm:w-6 h-5 sm:h-6" />
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/cv-builder">
                <Card className="border-none shadow-2xl rounded-2xl sm:rounded-[3rem] overflow-hidden group/card bg-white dark:bg-slate-900 h-[280px] sm:h-[350px] relative hover:-translate-y-2 transition-all duration-500">
                  <img
                    src="/african_professional_cv_1767384316187.png"
                    alt="Professional CV"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-indigo-900/20" />
                  <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex justify-between items-end">
                    <div className="space-y-2">
                      <Badge className="bg-blue-600 text-white border-none font-black text-[8px] sm:text-[9px] tracking-widest px-2 sm:px-3 py-0.5 sm:py-1 uppercase">AI-Optimized</Badge>
                      <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">Manage Your <br /> Profile CV</h4>
                      <p className="text-slate-300 text-xs sm:text-sm font-medium">Ready to download & share</p>
                    </div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/card:bg-white group-hover/card:text-slate-900 transition-colors">
                      <FileText className="w-5 sm:w-6 h-5 sm:h-6" />
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </div>

          {/* Sidebar Success Story - Mobile Optimized */}
          <div className="space-y-6 sm:space-y-10">
            <div className="flex items-center gap-4">
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-slate-400">Success Stories</h2>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>
            <Card className="relative h-full min-h-[300px] sm:min-h-[400px] border-none shadow-2xl rounded-2xl sm:rounded-[3rem] overflow-hidden group/success bg-slate-900">
              <img
                src="/african_graduate_success.png"
                alt="Success Story"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/success:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end space-y-4 sm:space-y-6">
                <Quote className="w-6 sm:w-8 h-6 sm:h-8 text-primary opacity-50" />
                <p className="text-base sm:text-lg font-bold text-white italic leading-relaxed">
                  "CareerPilot helped me find the right engineering courses at FBC. Today, I'm working on the new bridge project!"
                </p>
                <div>
                  <div className="font-black text-primary uppercase tracking-widest text-xs">Mariama J.</div>
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Civil Engineer • 2025 Graduate</div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* BOTTOM SECTION: Opportunities Feed - Mobile Optimized */}
        <section className="space-y-6 sm:space-y-8 pb-6 sm:pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div>
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Live Market Data</h2>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Active Opportunities</h3>
            </div>

            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 sm:p-1.5 rounded-xl sm:rounded-[1.5rem] w-full md:w-fit shadow-inner overflow-x-auto">
              {(['all', 'jobs', 'scholarships', 'training'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === t ? 'bg-white dark:bg-slate-900 text-primary shadow-xl scale-105' : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-12 sm:p-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {filteredOpps.slice(0, 6).map((opp) => (
                <Link href={opp.type === 'scholarships' ? '/scholarships' : '/jobs'} key={opp.id}>
                  <Card className="p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 hover:border-primary/30 hover:shadow-[0_20px_50px_rgba(31,182,94,0.1)] transition-all group cursor-pointer relative overflow-hidden">
                    <div className="flex flex-col h-full justify-between gap-6 sm:gap-8">
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex justify-between items-start">
                          <Badge className={`${opp.type === 'scholarships' ? 'bg-blue-100 text-blue-700' :
                            opp.type === 'jobs' ? 'bg-green-100 text-green-700' :
                              'bg-purple-100 text-purple-700'
                            } border-none font-black text-[8px] sm:text-[9px] uppercase tracking-wider px-2 sm:px-3 py-0.5 sm:py-1 rounded-full`}>
                            {opp.type}
                          </Badge>
                          {opp.salary && <div className="text-[9px] sm:text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">{opp.salary}</div>}
                        </div>
                        <h5 className="font-black text-xl sm:text-2xl text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight line-clamp-2">{opp.title}</h5>
                        <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full" />
                          {opp.organization}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-slate-100 dark:border-slate-800 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-red-500" />
                          {opp.location || 'Freetown'}
                        </div>
                        <div className="group-hover:text-primary transition-colors flex items-center gap-1.5 underline decoration-primary/0 group-hover:decoration-primary/30 underline-offset-4 decoration-2">
                          <span className="hidden sm:inline">Launch App</span>
                          <span className="sm:hidden">View</span>
                          <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </DashboardLayout>
  )
}
