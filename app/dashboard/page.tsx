"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { getJobs, getScholarships, getUserProfile } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import {
  ArrowRight,
  Briefcase,
  MapPin,
  GraduationCap,
  Zap,
  Sparkles,
  Search,
  TrendingUp,
  MessageSquare,
  ChevronRight,
  Bot,
  CheckCircle2,
  Clock,
  Phone
} from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [roadmapProgress, setRoadmapProgress] = useState<number>(0)
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete Profile", done: true },
    { id: 2, title: "Explore Tech Careers", done: false },
    { id: 3, title: "Building your first CV", done: false },
  ])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // 1. Fetch Profile (Supabase + Local Fallback)
        if (user) {
          const { data } = await getUserProfile(user.id)
          setProfile(data)
        }

        // 2. Fetch Opportunities
        const [jobs, scholarships] = await Promise.all([getJobs(), getScholarships()])
        const training = [
          { id: 't1', title: 'Data Analytics Training', organization: 'DSTI Salone', type: 'training', location: 'Freetown', deadline: 'Feb 10' },
          { id: 't2', title: 'Solar Repair Training', organization: 'Barefoot Women College', type: 'training', location: 'Lungi', deadline: 'Feb 15' }
        ]
        setOpportunities([...jobs.map(j => ({ ...j, type: 'jobs' })), ...scholarships.map(s => ({ ...s, type: 'scholarships', deadline: 'Ongoing' })), ...training])

        // 3. Roadmap Progress
        const savedProgress = localStorage.getItem("roadmapProgress")
        if (savedProgress) {
          const completed = JSON.parse(savedProgress)
          setRoadmapProgress(Math.min(100, Math.round((completed.length / 9) * 100)))
        } else if (profile?.careerGoal) {
          setRoadmapProgress(25) // Baseline if they have a goal
        }

      } catch (e) {
        console.error("Dashboard data fetch error:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
    toast.success("Task updated!")
  }

  // Formatting helper
  const displayName = profile?.fullName || profile?.full_name || "Scholar"
  const displayLocation = profile?.location || "Sierra Leone"
  const displayEdu = profile?.educationLevel || profile?.education_level || "Student"

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">

        {/* 1. PREMIUM HERO HEADER - Updated Theme (Green-Blue, No Yellow) */}
        <section className="relative rounded-[3.5rem] overflow-hidden bg-[#0B1F3A] min-h-[380px] flex items-center shadow-2xl group">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/dashboard/cotton_tree.png"
              alt="Cotton Tree Freetown"
              fill
              className="object-cover opacity-20 group-hover:scale-105 transition-transform duration-[3000ms]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#1E5EFF]/40 to-[#1FA774]/20 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,167,116,0.3),transparent)] z-10" />
          </div>

          <div className="relative z-20 w-full p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#4ADE80]" />
                <span className="text-[#4ADE80] font-bold text-[10px] uppercase tracking-[0.2em]">Live Career Dashboard</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tight font-poppins">
                  Kusheh, <span className="text-gradient-salone brightness-150">{displayName.split(' ')[0]}</span> 🇸🇱
                </h1>
                <p className="text-lg md:text-xl text-slate-300 font-medium font-inter max-w-xl leading-relaxed">
                  Building the future of Salone, one skill at a time. Your journey in <span className="text-white font-bold">{displayLocation}</span> is tracked here.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-white">{roadmapProgress}%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-[#4ADE80]" /> Roadmap Ready
                  </span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-[#4ADE80]">{opportunities.length}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-blue-400" /> Opportunities
                  </span>
                </div>
                {profile?.whatsappNumber && (
                  <>
                    <div className="hidden sm:block w-px h-10 bg-white/10" />
                    <div className="flex flex-col">
                      <span className="text-3xl font-black text-blue-400"><Phone className="w-6 h-6 inline mr-1" /></span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WhatsApp Alerts Active</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Profile Info Badge */}
            <div className="shrink-0 hidden lg:block">
              <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/10 shadow-2xl flex flex-col items-center gap-6 text-center transform hover:scale-105 transition-all cursor-default select-none border-b-4 border-b-[#1FA774]">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#1E5EFF] to-[#1FA774] p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-[#0B1F3A] flex items-center justify-center text-4xl overflow-hidden relative">
                    <span className="z-10">{displayName.charAt(0)}</span>
                    <div className="absolute inset-0 opacity-20 bg-[url('/logo.png')] bg-center bg-no-repeat bg-contain transform scale-150" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-white font-black text-lg uppercase tracking-widest leading-none">{displayLocation}</p>
                  <Badge className="bg-[#1FA774]/20 text-[#4ADE80] border-[#1FA774]/30 font-bold uppercase tracking-tighter text-[10px]">
                    {displayEdu}
                  </Badge>
                </div>
                <Link href="/onboarding" className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-[0.2em] transition-colors border-t border-white/10 pt-4 w-full">
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. QUICK ACTION CARDS - Updated Theme */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Find Jobs & Internships", icon: Search, href: "/opportunities", color: "from-[#1E5EFF] to-[#1E5EFF]/80" },
            { label: "Guided Career Map", icon: TrendingUp, href: "/roadmap", color: "from-[#1FA774] to-[#1FA774]/80" },
            { label: "Talk to AI Mentor", icon: Bot, href: "/ai-guidance", color: "from-[#0B1F3A] to-[#0B1F3A]/80" },
            { label: "Build New Skills", icon: Zap, href: "/careers", color: "from-slate-800 to-slate-700" },
          ].map((action, i) => (
            <Link href={action.href} key={i}>
              <Card className="group relative p-6 h-full border-none rounded-[2rem] bg-white hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${action.color} opacity-5 rounded-bl-[4rem] group-hover:opacity-10 transition-opacity`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-7 h-7" />
                </div>
                <div className="font-black font-poppins text-[#0B1F3A] text-lg leading-tight transition-colors group-hover:text-[#1E5EFF]">
                  {action.label}
                </div>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#1FA774]">
                  Open Section <ArrowRight className="w-3 h-3" />
                </div>
              </Card>
            </Link>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-8">

            {/* 3. CAREER MILESTONES / TASKS - NEW SECTION */}
            <Card className="p-8 border-none rounded-[2.5rem] bg-white shadow-sm overflow-hidden relative">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black font-poppins text-[#0B1F3A] tracking-tight">Daily <span className="text-gradient-salone">Milestones</span></h3>
                  <p className="text-sm text-slate-500 font-medium font-inter">Small steps towards your {profile?.careerGoal || "dream career"}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#1FA774]/10 flex items-center justify-center text-[#1FA774]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer ${task.done ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-md'}`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.done ? 'bg-[#1FA774] border-[#1FA774] text-white' : 'border-slate-300'}`}>
                      {task.done && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <span className={`font-bold text-sm flex-1 ${task.done ? 'line-through text-slate-400' : 'text-[#0B1F3A]'}`}>{task.title}</span>
                    <Clock className="w-4 h-4 text-slate-300" />
                  </div>
                ))}
              </div>
            </Card>

            {/* 4. RECOMMENDATIONS GRID */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black font-poppins text-[#0B1F3A] tracking-tight">Top <span className="text-gradient-salone">Opportunities</span></h3>
                <Link href="/opportunities" className="text-xs font-black font-poppins text-[#1E5EFF] uppercase tracking-[0.2em] hover:underline">See All</Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {opportunities.slice(0, 4).map((opp, i) => (
                  <Card key={i} className="p-6 border-none rounded-[2rem] bg-white hover:shadow-xl transition-all group cursor-pointer border-l-4 border-l-transparent hover:border-l-[#1E5EFF] shadow-sm">
                    <div className="flex flex-col h-full justify-between gap-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${opp.type === 'jobs' ? 'bg-blue-50 text-[#1E5EFF]' : 'bg-[#1FA774]/10 text-[#1FA774]'}`}>
                            {opp.type === 'jobs' ? <Briefcase className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
                          </div>
                          <Badge className="bg-slate-50 text-slate-400 hover:text-slate-500 border-none font-black text-[9px] uppercase tracking-tighter">
                            {opp.type}
                          </Badge>
                        </div>
                        <h4 className="font-black text-[#0B1F3A] text-base leading-tight group-hover:text-[#1E5EFF] transition-colors">{opp.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                          <MapPin className="w-3.5 h-3.5" /> {opp.location}
                        </div>
                      </div>
                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{opp.deadline || 'Ongoing'}</span>
                        <div className="text-[#1E5EFF] group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">

            {/* 5. SKILLS MONITOR */}
            <Card className="p-8 border-none rounded-[2.5rem] bg-[#0B1F3A] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="w-20 h-20" />
              </div>
              <h3 className="text-lg font-black font-poppins mb-6 uppercase tracking-wider">Skill Growth</h3>
              <div className="space-y-8">
                {[
                  { name: "Digital Literacy", progress: 85, color: "bg-blue-400" },
                  { name: "Communication", progress: 60, color: "bg-[#4ADE80]" },
                  { name: "Sector Knowledge", progress: 30, color: "bg-slate-400" },
                ].map((skill, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                      <span>{skill.name}</span>
                      <span className="text-white">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className={`h-1.5 bg-white/10 [&>div]:${skill.color}`} />
                  </div>
                ))}
              </div>
              <Button className="w-full mt-10 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black font-poppins text-[10px] tracking-[0.2em] h-12 uppercase border border-white/10">
                Upgrade Skills
              </Button>
            </Card>

            {/* 6. AI MENTOR CALL-TO-ACTION */}
            <Card className="p-8 border-none rounded-[2.5rem] bg-gradient-to-br from-[#1FA774] to-[#1E5EFF] shadow-2xl relative overflow-hidden group cursor-pointer">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black font-poppins text-white leading-tight">Ask your <br />AI Coach</h3>
                  <p className="text-white/80 text-sm font-medium italic">
                    "Wetin I need for do for get job na Freetown?"
                  </p>
                </div>
                <Link href="/ai-guidance" className="block pt-2">
                  <Button className="w-full bg-white text-[#0B1F3A] hover:bg-slate-100 transition-all rounded-2xl font-black font-poppins shadow-xl h-14 uppercase tracking-widest text-xs">
                    Get Advice <MessageSquare className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* 7. COMMUNITY BADGE */}
            <div className="p-8 rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-3xl">🇸🇱</div>
              <div>
                <h4 className="font-black text-[#0B1F3A] text-sm uppercase tracking-tight">Salone Career Network</h4>
                <p className="text-xs text-slate-500 font-medium">Coming soon: Connect with real professionals from FBC, IPAM, and Njala.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
