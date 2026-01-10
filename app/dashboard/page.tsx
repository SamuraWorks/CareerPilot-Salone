"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { getJobs, getScholarships } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import {
  ArrowRight,
  Target,
  FileText,
  BookOpen,
  TrendingUp,
  Sparkles,
  Award,
  Clock,
  CheckCircle2,
  Users,
  User,
  Briefcase,
  GraduationCap,
  Search,
  Map as MapIcon,
  Brain
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const [profilePhoto, setProfilePhoto] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [roadmapProgress, setRoadmapProgress] = useState<number>(0)

  // Tasks state (preserved for stats calculation)
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete Profile", done: true },
    { id: 2, title: "Explore Tech Careers", done: false },
    { id: 3, title: "Building your first CV", done: false },
  ])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch Opportunities
        const [jobs, scholarships] = await Promise.all([getJobs(), getScholarships()])
        const training = [
          { id: 't1', title: 'Data Analytics Training', organization: 'DSTI Salone', type: 'training', location: 'Freetown', deadline: 'Feb 10' },
          { id: 't2', title: 'Solar Repair Training', organization: 'Barefoot Women College', type: 'training', location: 'Lungi', deadline: 'Feb 15' }
        ]
        setOpportunities([...jobs.map(j => ({ ...j, type: 'jobs' })), ...scholarships.map(s => ({ ...s, type: 'scholarships', deadline: 'Ongoing' })), ...training])

        // Roadmap Progress
        const savedPercent = localStorage.getItem("roadmapPercent")
        const savedProgress = localStorage.getItem("roadmapProgress")

        if (savedPercent) {
          setRoadmapProgress(parseInt(savedPercent))
        } else if (savedProgress) {
          // Fallback legacy calculation
          const completed = JSON.parse(savedProgress)
          // Estimate based on average 15 tasks if percentage not saved
          setRoadmapProgress(Math.min(100, Math.round((completed.length / 15) * 100)))
        } else if (profile?.careerGoal) {
          setRoadmapProgress(5) // Just started
        }

      } catch (e) {
        console.error("Dashboard data fetch error:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [profile?.careerGoal])

  const displayName = profile?.fullName || user?.name || "Scholar"

  // Derived stats
  const tasksCompleted = tasks.filter(t => t.done).length
  const totalTasks = tasks.length

  // Use opportunities to populate "Recent Activity" dynamically
  const recentActivities = opportunities.slice(0, 3).map((opp, i) => ({
    id: i,
    title: `New Opportunity: ${opp.title}`,
    time: opp.deadline || 'Just now',
    icon: opp.type === 'jobs' ? Briefcase : opp.type === 'scholarships' ? GraduationCap : Target,
    color: opp.type === 'jobs' ? 'text-primary' : opp.type === 'scholarships' ? 'text-secondary' : 'text-accent',
    bg: opp.type === 'jobs' ? 'bg-primary/10' : opp.type === 'scholarships' ? 'bg-secondary/10' : 'bg-accent/10',
    pulse: opp.type === 'jobs' ? 'bg-primary' : opp.type === 'scholarships' ? 'bg-secondary' : 'bg-accent'
  }))

  return (
    <DashboardLayout>
      <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">

        {/* --- PREMIUM DYNAMIC HERO --- */}
        <section className="relative rounded-[3.5rem] overflow-hidden bg-[#0B1F3A] min-h-[320px] flex items-center shadow-2xl group">
          <div className="absolute inset-0 z-0">
            <Image
              src="/salone_dashboard_hero.png"
              alt="Dashboard"
              fill
              className="object-cover brightness-75 group-hover:scale-110 transition-transform duration-[20s]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/60 to-transparent" />
          </div>

          <div className="relative z-20 max-w-2xl p-10 md:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1FA774]/20 border border-[#1FA774]/30 rounded-full backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#4ADE80]" />
              <span className="text-[#4ADE80] font-black text-[10px] uppercase tracking-[0.2em]">Career Status: Active</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-poppins">
              Kusheh, <span className="text-gradient-salone brightness-150 uppercase italic">{displayName.split(' ')[0]}</span>.
            </h1>
            <p className="text-lg text-slate-300 font-medium font-inter max-w-lg leading-relaxed">
              Your career trajectory is looking strong. You have {opportunities.length} new opportunities aligned with your {profile?.careerGoal || "goals"}.
            </p>
          </div>

          {/* Quick Stat Overlay */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:flex items-center justify-center p-10">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[3rem] w-full space-y-4 shadow-2xl transform rotate-[-2deg]">
              <div className="text-slate-300 font-black uppercase tracking-widest text-[10px]">Ready to Level Up?</div>
              <div className="text-white text-3xl font-black italic">SLE 2.5M+</div>
              <div className="text-slate-400 text-xs font-medium italic">Estimated entry salary for your path</div>
            </div>
          </div>
        </section>

        {/* --- PERFORMANCE ARCHITECTURE --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "Opportunities", value: opportunities.length || 12, icon: Target, color: "text-blue-500", bg: "bg-blue-50", progress: 65 },
            { label: "Roadmap Done", value: `${roadmapProgress}%`, icon: TrendingUp, color: "text-[#1FA774]", bg: "bg-emerald-50", progress: roadmapProgress },
            { label: "CV Strength", value: "72%", icon: FileText, color: "text-amber-500", bg: "bg-amber-50", progress: 72 },
            { label: "Skill Match", value: "85%", icon: Award, color: "text-indigo-500", bg: "bg-indigo-50", progress: 85 }
          ].map((stat, i) => (
            <Card key={i} className="rounded-[2.5rem] border-none shadow-sm hover:shadow-2xl transition-all p-8 flex flex-col justify-between group overflow-hidden relative">
              <div className={cn("absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -mr-10 -mt-10", stat.bg)} />
              <div className="space-y-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-[#0B1F3A] font-poppins">{stat.value}</p>
                </div>
              </div>
              <div className="pt-6">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={cn("h-full transition-all duration-1000", stat.bg.replace('bg-', 'bg-opacity-100 ').replace('50', '500'))} style={{ width: `${stat.progress}%` }} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT: ACTION STACK */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-[#0B1F3A] tracking-tight font-poppins uppercase">Accelerator Toolbox</h2>
                <Link href="/guidance" className="text-[10px] font-black text-[#1E5EFF] uppercase tracking-widest hover:underline">Full Guidance Tool</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Smart CV Builder", desc: "AI-enhanced professional resumes.", href: "/cv-builder", icon: FileText, color: "bg-blue-600" },
                  { title: "Career Explorer", desc: "Discover 50+ Salone career paths.", href: "/careers", icon: Search, color: "bg-[#1FA774]" },
                  { title: "Dynamic Roadmap", desc: "Your step-by-step master plan.", href: "/roadmap", icon: MapIcon, color: "bg-amber-600" },
                  { title: "Aptitude Testing", desc: "Scientific psychometric matching.", href: "/aptitude-test", icon: Brain, color: "bg-slate-800" }
                ].map((action, i) => (
                  <Link href={action.href} key={i}>
                    <Card className="p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all group cursor-pointer h-full hover:border-[#1E5EFF]/20">
                      <div className="flex items-start gap-6">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl transition-transform group-hover:rotate-6", action.color)}>
                          <action.icon className="w-7 h-7" />
                        </div>
                        <div className="space-y-1 pr-6 flex-1">
                          <h3 className="text-lg font-black text-[#0B1F3A] leading-tight font-poppins uppercase">{action.title}</h3>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed italic">{action.desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1E5EFF] group-hover:translate-x-1 transition-all" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* Opportunities Feed */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-[#0B1F3A] tracking-tight font-poppins uppercase">Trending opportunities</h2>
                <Link href="/opportunities" className="text-[10px] font-black text-[#1FA774] uppercase tracking-widest hover:underline">Explore More</Link>
              </div>
              <div className="space-y-4">
                {opportunities.slice(0, 4).map((opp, i) => (
                  <Card key={i} className="p-6 rounded-[2rem] border-none bg-white hover:bg-slate-50 transition-all flex items-center justify-between group shadow-sm hover:shadow-md cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                        {opp.type === 'jobs' ? <Briefcase className="w-5 h-5 text-blue-600" /> : <GraduationCap className="w-5 h-5 text-[#1FA774]" />}
                      </div>
                      <div>
                        <h4 className="font-black text-[#0B1F3A] text-base group-hover:text-[#1E5EFF] transition-colors">{opp.title}</h4>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">{opp.organization || opp.company} &bull; {opp.location}</p>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-2">
                      <span className="text-[10px] font-black text-[#1FA774] uppercase tracking-widest px-3 py-1 bg-emerald-50 rounded-full">Apply Now</span>
                      <span className="text-[9px] font-medium text-slate-400">Deadline: {opp.deadline || 'Ongoing'}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: PROFILE & INSIGHTS */}
          <div className="space-y-12">
            {/* Career Card Preview */}
            <Card className="rounded-[3rem] bg-[#0B1F3A] text-white p-10 overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 p-8 transform rotate-[15deg] opacity-10">
                <Target className="w-40 h-40" />
              </div>
              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-[#4ADE80] uppercase tracking-widest">Target Career</p>
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">{profile?.careerGoal || "Aspiring Professional"}</h3>
                </div>
                <div className="space-y-6 pt-6 border-t border-white/10">
                  {[
                    { label: "Industry", value: "Technology" },
                    { label: "Education Level", value: profile?.educationLevel || "Student" },
                    { label: "Location focus", value: profile?.location || "Freetown" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                      <span className="font-bold italic">{item.value}</span>
                    </div>
                  ))}
                </div>
                <Link href="/profile" className="block pt-8">
                  <button className="w-full h-14 rounded-2xl bg-white text-[#0B1F3A] font-black uppercase tracking-widest text-[10px] hover:bg-[#4ADE80] hover:text-white transition-all shadow-xl">
                    Optimize Profile
                  </button>
                </Link>
              </div>
            </Card>

            {/* Motivation Quote / Tip */}
            <div className="p-10 rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50/50 space-y-4">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-lg font-black text-[#0B1F3A] italic leading-tight">"Education is the most powerful weapon which you can use to change the world."</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">&mdash; Nelson Mandela (Legacy)</p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-[#1E5EFF] to-[#1FA774] rounded-[4rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 z-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 text-center md:text-left max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">Need a <br /> Mentor?</h2>
              <p className="text-lg text-white/80 font-medium font-inter italic leading-relaxed">Our AI Mentor is available 24/7 to answer your career questions and guide you through challenges.</p>
            </div>
            <Link href="/guidance">
              <Button size="lg" className="h-[72px] px-12 rounded-[2rem] bg-white text-[#0B1F3A] font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#0B1F3A] hover:text-white transition-all shadow-2xl active:scale-95">
                Start Mentorship Now
              </Button>
            </Link>
          </div>
        </section>

      </div>
    </DashboardLayout>
  )
}


