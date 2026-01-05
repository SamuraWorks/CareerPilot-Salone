"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { getJobs, getScholarships, getLatestCareerTestResult } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import {
  ArrowRight,
  FileText,
  Briefcase,
  MapPin,
  Loader2,
  GraduationCap,
  Map,
  Zap,
  Layout,
  Target,
  Sparkles
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
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [filter, setFilter] = useState<'all' | 'jobs' | 'scholarships' | 'training'>('all')
  const [roadmapProgress, setRoadmapProgress] = useState<number>(0)
  const [activeCareer, setActiveCareer] = useState<string>("")

  useEffect(() => {
    const savedData = localStorage.getItem("userOnboarding")
    if (savedData) {
      const parsed = JSON.parse(savedData)
      setProfile(parsed)
      if (parsed.careerGoal) setActiveCareer(parsed.careerGoal)
    }

    const savedProgress = localStorage.getItem("roadmapProgress")
    if (savedProgress) {
      const completed = JSON.parse(savedProgress)
      setRoadmapProgress(Math.min(100, Math.round((completed.length / 9) * 100)))
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
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [user])

  const filteredOpps = opportunities.filter(o => filter === 'all' || o.type === filter)

  const handleResetGoal = () => {
    if (window.confirm("Are you sure you want to change your career goal? This will reset your current roadmap focus.")) {
      const savedData = localStorage.getItem("userOnboarding");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        parsed.careerGoal = "";
        localStorage.setItem("userOnboarding", JSON.stringify(parsed));
        setProfile(parsed);
        setActiveCareer("");
        localStorage.removeItem("roadmapProgress");
        setRoadmapProgress(0);
        toast.success("Career goal reset.");
      }
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-700 px-4 md:px-0">

        {/* HERO SECTION WITH SIERRA LEONE IMAGE */}
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#1F7A4D] to-[#1E5EFF] p-6 md:p-8 shadow-xl">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/salone_dashboard_hero.png"
              alt="Sierra Leone Professionals"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-white">
              <h1 className="text-2xl md:text-4xl font-bold font-poppins tracking-tight mb-2">
                Welcome back, {profile?.name || 'Scholar'}! 🇸🇱
              </h1>
              <p className="text-white/90 font-inter text-sm md:text-base">
                Your journey to success in Sierra Leone starts here
              </p>
            </div>
            <Link href="/ai-guidance">
              <Button className="bg-white text-[#1F7A4D] hover:bg-white/90 rounded-xl px-4 md:px-6 h-11 md:h-12 shadow-lg font-bold font-poppins w-full md:w-auto">
                <Sparkles className="w-4 h-4 mr-2" /> AI Career Assistant
              </Button>
            </Link>
          </div>
        </div>

        {/* MAIN OVERVIEW GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          {/* 1. ACTIVE GOAL CARD */}
          <Card className="col-span-1 md:col-span-2 p-4 md:p-6 bg-gradient-to-br from-white to-blue-50/50 border border-slate-200 shadow-sm rounded-2xl md:rounded-[2rem] relative overflow-hidden group">
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-blue-200/50 transition-colors" />

            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 md:mb-6 relative z-10 gap-3">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white text-blue-600 rounded-xl md:rounded-2xl border border-blue-100 flex items-center justify-center shadow-sm shrink-0">
                  <Target className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="font-bold font-poppins text-slate-900 text-base md:text-lg">Current Objective</h3>
                  <div className="flex flex-wrap items-center gap-2 font-inter mt-1">
                    <span className="text-xs md:text-sm text-slate-500">{profile?.careerGoal ? "Pursuing:" : "No goal set"}</span>
                    {profile?.careerGoal ? (
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-blue-700 text-sm md:text-base">{profile.careerGoal}</span>
                        <button onClick={handleResetGoal} className="text-xs text-slate-400 hover:text-red-500 underline decoration-dotted transition-colors">Change</button>
                      </div>
                    ) : (
                      <Link href="/roadmap" className="text-xs md:text-sm font-bold text-blue-600 hover:underline">Select a Career Path</Link>
                    )}
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-slate-700 border-slate-200 font-bold font-poppins px-2 md:px-3 py-1 text-xs shrink-0">
                {roadmapProgress}% Complete
              </Badge>
            </div>

            <div className="space-y-2 md:space-y-3 relative z-10">
              <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-500 font-poppins uppercase tracking-wide">
                <span>Roadmap Progress</span>
                <span>90-Day Plan</span>
              </div>
              <div className="h-3 md:h-4 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${roadmapProgress}%` }}
                />
              </div>
            </div>

            <div className="mt-6 md:mt-8 flex gap-3 relative z-10">
              <Link href="/roadmap" className="flex-1">
                <Button className="w-full h-11 md:h-12 bg-slate-900 hover:bg-primary text-white rounded-xl font-bold font-poppins shadow-lg hover:shadow-primary/25 transition-all text-sm md:text-base">
                  {profile?.careerGoal ? "Continue Roadmap" : "Start New Goal"} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* 2. STATS / QUICK INFO */}
          <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-4 md:gap-6">
            <Card className="p-4 md:p-5 flex items-center gap-3 md:gap-4 border border-slate-200 border-l-4 border-l-emerald-500 shadow-sm rounded-xl md:rounded-2xl bg-white hover:scale-[1.02] transition-transform cursor-default">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold font-poppins text-slate-900">{opportunities.filter(o => o.type === 'jobs').length}</div>
                <div className="text-[10px] md:text-xs font-bold font-poppins text-slate-500 uppercase tracking-wider">Active Jobs</div>
              </div>
            </Card>
            <Card className="p-4 md:p-5 flex items-center gap-3 md:gap-4 border border-slate-200 border-l-4 border-l-blue-500 shadow-sm rounded-xl md:rounded-2xl bg-white hover:scale-[1.02] transition-transform cursor-default">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold font-poppins text-slate-900">{opportunities.filter(o => o.type === 'scholarships').length}</div>
                <div className="text-[10px] md:text-xs font-bold font-poppins text-slate-500 uppercase tracking-wider">Scholarships</div>
              </div>
            </Card>
          </div>
        </div>

        {/* QUICK ACTIONS SECTION */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            { title: "Career Aptitude", desc: "Discover your strengths", icon: Layout, href: "/aptitude-test", color: "text-indigo-600", bg: "bg-indigo-50", border: "hover:border-indigo-200" },
            { title: "CV Builder", desc: "Create professional CVs", icon: FileText, href: "/cv-builder", color: "text-blue-600", bg: "bg-blue-50", border: "hover:border-blue-200" },
            { title: "Find Mentors", desc: "Connect with experts", icon: Sparkles, href: "/mentorship", color: "text-amber-600", bg: "bg-amber-50", border: "hover:border-amber-200" },
            { title: "Local Training", desc: "Skill up in Salone", icon: Zap, href: "/opportunities", color: "text-emerald-600", bg: "bg-emerald-50", border: "hover:border-emerald-200" },
          ].map((action, i) => (
            <Link href={action.href} key={i}>
              <Card className={`p-4 md:p-5 hover:shadow-lg transition-all border border-slate-200 rounded-xl md:rounded-[1.5rem] cursor-pointer group h-full flex flex-col justify-between ${action.border} bg-white hover:-translate-y-1 duration-300`}>
                <div className="space-y-3 md:space-y-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${action.bg} ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                    <action.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold font-poppins text-slate-900 text-sm md:text-lg group-hover:text-primary transition-colors">{action.title}</h4>
                    <p className="text-[10px] md:text-xs text-slate-500 font-inter mt-1 leading-relaxed">{action.desc}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* MARKET OPPORTUNITIES SECTION */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold font-poppins text-slate-900">Recommended Opportunities</h2>

            {/* Simple Text Tabs */}
            <div className="flex gap-6 text-sm">
              {(['all', 'jobs', 'scholarships', 'training'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`capitalize font-bold font-poppins pb-2 transition-colors relative ${filter === t ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  {t}
                  {filter === t && <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          {/* List View for Cleaner Look */}
          <div className="bg-white border border-slate-200 rounded-[1.5rem] shadow-sm divide-y divide-slate-100 overflow-hidden">
            {loading ? (
              <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
            ) : filteredOpps.length === 0 ? (
              <div className="p-16 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium font-inter">No opportunities found matching your criteria.</p>
              </div>
            ) : (
              filteredOpps.slice(0, 5).map((opp) => (
                <Link href={opp.type === 'scholarships' ? '/scholarships' : '/jobs'} key={opp.id} className="block hover:bg-slate-50 transition-colors group">
                  <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-transparent group-hover:bg-white group-hover:border-slate-200 group-hover:shadow-sm transition-all ${opp.type === 'jobs' ? 'bg-green-50 text-green-600' :
                        opp.type === 'scholarships' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                        }`}>
                        {opp.type === 'jobs' ? <Briefcase className="w-6 h-6" /> :
                          opp.type === 'scholarships' ? <GraduationCap className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="font-bold font-poppins text-slate-900 line-clamp-1 group-hover:text-primary transition-colors text-lg">{opp.title}</h4>
                        <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mt-1 font-inter">
                          <span className="text-slate-700">{opp.organization}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {opp.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {opp.salary && <Badge variant="secondary" className="hidden sm:inline-flex bg-slate-100 text-slate-600 font-bold font-poppins border-none px-3 py-1">{opp.salary}</Badge>}
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          <div className="text-center pt-2">
            <Link href="/jobs" className="text-sm font-bold font-poppins text-blue-600 hover:text-blue-700 hover:underline uppercase tracking-wider">View All Opportunities</Link>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
