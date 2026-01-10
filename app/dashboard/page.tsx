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
  Brain,
  Compass
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

        {/* --- HERO SECTION --- */}
        <section className="relative rounded-3xl overflow-hidden bg-primary min-h-[300px] flex items-center shadow-lg">
          <div className="absolute inset-0 z-0">
            <Image
              src="/salone_dashboard_hero.png"
              alt="Dashboard"
              fill
              className="object-cover brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
          </div>

          <div className="relative z-20 max-w-2xl p-8 md:p-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-white" />
              <span className="text-white font-medium text-xs">Career Status: Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight font-sans">
              Kusheh, {displayName.split(' ')[0]}.
            </h1>
            <p className="text-lg text-slate-100 font-medium font-sans max-w-lg leading-relaxed">
              Your career trajectory is looking strong. You have {opportunities.length} new opportunities aligned with your {profile?.careerGoal || "goals"}.
            </p>
          </div>
        </section>

        {/* --- STATS OVERVIEW --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Opportunities", value: opportunities.length || 12, icon: Target, color: "text-blue-500", bg: "bg-blue-50", progress: 65 },
            { label: "Roadmap Done", value: `${roadmapProgress}%`, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50", progress: roadmapProgress },
            { label: "CV Strength", value: "72%", icon: FileText, color: "text-amber-500", bg: "bg-amber-50", progress: 72 },
            { label: "Skill Match", value: "85%", icon: Award, color: "text-indigo-500", bg: "bg-indigo-50", progress: 85 }
          ].map((stat, i) => (
            <Card key={i} className="rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between group overflow-hidden relative">
              <div className="space-y-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 font-sans">{stat.value}</p>
                </div>
              </div>
              <div className="pt-4">
                <Progress value={stat.progress} className="h-1.5" />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT: ACTION STACK */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 font-sans">Accelerator Toolbox</h2>
                <Link href="/guidance" className="text-xs font-semibold text-primary hover:underline">Full Guidance Tool</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Smart CV Builder", desc: "AI-enhanced professional resumes.", href: "/cv-builder", icon: FileText, color: "bg-blue-600" },
                  { title: "Career Explorer", desc: "Discover 50+ Salone career paths.", href: "/careers", icon: Compass, color: "bg-emerald-600" },
                  { title: "Dynamic Roadmap", desc: "Your step-by-step master plan.", href: "/roadmap", icon: MapIcon, color: "bg-amber-600" },
                  { title: "Aptitude Testing", desc: "Scientific psychometric matching.", href: "/aptitude-test", icon: Brain, color: "bg-slate-800" }
                ].map((action, i) => (
                  <Link href={action.href} key={i}>
                    <Card className="p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all group cursor-pointer h-full">
                      <div className="flex items-start gap-4">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md", action.color)}>
                          <action.icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1 pr-2 flex-1">
                          <h3 className="text-base font-bold text-slate-900 leading-tight font-sans">{action.title}</h3>
                          <p className="text-xs text-muted-foreground font-medium leading-relaxed">{action.desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-all" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* Opportunities Feed */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 font-sans">Trending opportunities</h2>
                <Link href="/opportunities" className="text-xs font-semibold text-primary hover:underline">Explore More</Link>
              </div>
              <div className="space-y-3">
                {opportunities.slice(0, 4).map((opp, i) => (
                  <Card key={i} className="p-4 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all flex items-center justify-between group shadow-sm cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        {opp.type === 'jobs' ? <Briefcase className="w-4 h-4 text-blue-600" /> : <GraduationCap className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{opp.title}</h4>
                        <p className="text-xs font-medium text-muted-foreground mt-0.5">{opp.organization || opp.company} &bull; {opp.location}</p>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded-full">Apply Now</span>
                      <span className="text-[10px] text-muted-foreground">Deadline: {opp.deadline || 'Ongoing'}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: PROFILE & INSIGHTS */}
          <div className="space-y-8">
            {/* Career Card Preview */}
            <Card className="rounded-3xl bg-slate-900 text-white p-8 overflow-hidden relative shadow-xl">
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Target Career</p>
                  <h3 className="text-2xl font-bold leading-none">{profile?.careerGoal || "Aspiring Professional"}</h3>
                </div>
                <div className="space-y-4 pt-4 border-t border-white/10">
                  {[
                    { label: "Industry", value: "Technology" },
                    { label: "Education Level", value: profile?.educationLevel || "Student" },
                    { label: "Location focus", value: profile?.location || "Freetown" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-400">{item.label}</span>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
                <Link href="/profile" className="block pt-4">
                  <button className="w-full h-12 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-emerald-400 hover:text-white transition-all shadow-md">
                    Optimize Profile
                  </button>
                </Link>
              </div>
            </Card>

            {/* Motivation Quote / Tip */}
            <div className="p-8 rounded-3xl border border-dashed border-slate-200 bg-slate-50 space-y-3">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-base font-bold text-slate-900 italic leading-tight">"Education is the most powerful weapon which you can use to change the world."</p>
              <p className="text-xs font-medium text-slate-500">&mdash; Nelson Mandela</p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 z-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Need a Mentor?</h2>
              <p className="text-base text-white/90 font-medium font-sans">Our AI Mentor is available 24/7 to answer your career questions.</p>
            </div>
            <Link href="/guidance">
              <Button size="lg" className="h-14 px-8 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-900 hover:text-white transition-all shadow-lg">
                Start Mentorship Now
              </Button>
            </Link>
          </div>
        </section>

      </div>
    </DashboardLayout>
  )
}


