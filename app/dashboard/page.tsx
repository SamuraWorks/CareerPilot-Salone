"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { getJobs, getScholarships } from "@/lib/db"
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
  Sparkles,
  Bell,
  Search,
  Users,
  TrendingUp,
  MessageSquare,
  ChevronRight,
  Bot
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
  const [activeCareer, setActiveCareer] = useState<string>("")
  const [roadmapProgress, setRoadmapProgress] = useState<number>(0)

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
          { id: 't1', title: 'Full Stack Development', organization: 'Orange Digital Center', type: 'training', location: 'Freetown', deadline: 'Jan 30' },
          { id: 't2', title: 'Solar Repair Training', organization: 'Barefoot Women College', type: 'training', location: 'Lungi', deadline: 'Feb 15' }
        ]

        const all = [
          ...jobs.map(j => ({ ...j, type: 'jobs' })),
          ...scholarships.map(s => ({ ...s, type: 'scholarships', deadline: 'Ongoing' })),
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

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">

        {/* 1. WELCOME / HERO CARD */}
        <section className="relative rounded-[2rem] overflow-hidden bg-[#0B1F3A] min-h-[220px] flex flex-col justify-center p-8 shadow-2xl group">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/dashboard/cotton_tree.png"
              alt="Cotton Tree Freetown"
              fill
              className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent" />
          </div>

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-[#F4C430] font-poppins font-bold text-sm uppercase tracking-[0.2em]">
              <span className="w-8 h-[2px] bg-[#F4C430]" /> Career Command Center
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-poppins text-white tracking-tight">
              Welcome back, <span className="text-[#F4C430]">{profile?.name?.split(' ')[0] || 'Samuel'}</span> 👋🏾
            </h1>
            <p className="text-slate-300 font-inter text-lg max-w-md">
              Your future in Sierra Leone starts with a single step today. Let's plan it.
            </p>
          </div>

          <div className="absolute bottom-6 right-8 hidden md:block">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-xl">🇸🇱</span>
              <span className="text-white font-bold text-xs uppercase tracking-widest">Salone Proud</span>
            </div>
          </div>
        </section>

        {/* 2. QUICK ACTION CARDS */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Explore Careers", icon: Search, href: "/careers", color: "bg-blue-50 text-blue-600" },
            { label: "Find Opportunities", icon: Briefcase, href: "/opportunities", color: "bg-emerald-50 text-emerald-600" },
            { label: "Build Skills", icon: Zap, href: "/roadmap", color: "bg-amber-50 text-amber-600" },
            { label: "Ask AI Mentor", icon: Bot, href: "/ai-guidance", color: "bg-purple-50 text-purple-600" },
          ].map((action, i) => (
            <Link href={action.href} key={i}>
              <Card className="p-6 hover:shadow-xl transition-all border-[#E5E7EB] rounded-[1.5rem] bg-white group hover:-translate-y-1 flex flex-col items-start gap-4 h-full">
                <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="font-bold font-poppins text-[#0B1F3A] text-sm md:text-base leading-tight">
                  {action.label}
                </div>
              </Card>
            </Link>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Insights & Skills */}
          <div className="lg:col-span-2 space-y-8">

            {/* 3. PERSONALIZED CAREER INSIGHT */}
            <Card className="p-8 border-[#E5E7EB] rounded-[2rem] bg-white relative overflow-hidden shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-poppins text-[#0B1F3A]">Your Career Direction</h3>
                  <p className="text-sm text-slate-500 font-medium font-inter">Personalized analysis based on your profile</p>
                </div>
                <TrendingUp className="text-[#1FA774] w-6 h-6" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ring-1 ring-slate-100 p-6 rounded-2xl bg-slate-50/50">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recommended Path</span>
                    <div className="text-2xl font-bold font-poppins text-[#0B1F3A]">{activeCareer || "Career Explorer"}</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Demand</span>
                      <div className="text-sm font-bold text-[#1FA774]">Very High</div>
                    </div>
                    <div className="w-[1px] bg-slate-200" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg. Salary</span>
                      <div className="text-sm font-bold text-[#0B1F3A]">SLE 4.5k - 8k</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preparation Level</span>
                    <span className="text-sm font-bold text-[#0B1F3A]">{roadmapProgress}%</span>
                  </div>
                  <Progress value={roadmapProgress} className="h-3 bg-slate-200 [&>div]:bg-[#1FA774]" />
                  <p className="text-[11px] text-slate-500 font-medium italic">
                    Focus on building 2 more key skills to reach the next milestone.
                  </p>
                </div>
              </div>
            </Card>

            {/* 4. OPPORTUNITIES FEED */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-poppins text-[#0B1F3A]">Opportunities for You</h3>
                <Link href="/opportunities" className="text-xs font-bold font-poppins text-[#1FA774] uppercase tracking-widest hover:underline">View All</Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {opportunities.slice(0, 4).map((opp, i) => (
                  <Card key={i} className="p-5 border-[#E5E7EB] rounded-[1.5rem] bg-white hover:border-[#1FA774] transition-all group cursor-pointer shadow-sm">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-[#1FA774]/10 transition-colors">
                        {opp.type === 'jobs' ? <Briefcase className="w-6 h-6 text-slate-400 group-hover:text-[#1FA774]" /> : <GraduationCap className="w-6 h-6 text-slate-400 group-hover:text-[#1FA774]" />}
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-tighter bg-slate-100 text-slate-500">
                            {opp.type}
                          </Badge>
                          <span className="text-[10px] font-bold text-slate-400">{opp.deadline || 'Closing soon'}</span>
                        </div>
                        <h4 className="font-bold text-[#0B1F3A] text-sm line-clamp-1">{opp.title}</h4>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                          <MapPin className="w-3 h-3" /> {opp.location}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Skills, Community, AI */}
          <div className="space-y-8">

            {/* 5. SKILLS PROGRESS TRACKER */}
            <Card className="p-6 border-[#E5E7EB] rounded-[2rem] bg-white shadow-sm">
              <h3 className="text-lg font-bold font-poppins text-[#0B1F3A] mb-6">Skills You're Building</h3>
              <div className="space-y-6">
                {[
                  { name: "Digital Literacy", progress: 65 },
                  { name: "Public Speaking", progress: 40 },
                  { name: "Critical Thinking", progress: 25 },
                ].map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold font-poppins text-slate-600">
                      <span>{skill.name}</span>
                      <span>{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2 bg-slate-100 [&>div]:bg-[#F4C430]" />
                  </div>
                ))}
                <Button className="w-full mt-2 bg-slate-50 text-[#0B1F3A] hover:bg-slate-100 border border-slate-200 rounded-xl font-bold font-poppins text-xs h-10 shadow-none">
                  Check Recommended Skills
                </Button>
              </div>
            </Card>

            {/* 6. COMMUNITY & SUCCESS STORIES */}
            <Card className="p-0 border-[#E5E7EB] rounded-[2rem] bg-indigo-900 overflow-hidden relative shadow-lg group">
              <Image
                src="/images/dashboard/salone_success.png"
                alt="Salone success"
                fill
                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/40 to-transparent" />
              <div className="relative z-10 p-6 flex flex-col h-full justify-end min-h-[250px] space-y-3">
                <h3 className="text-xl font-bold font-poppins text-white">Salone Success Stories</h3>
                <p className="text-slate-300 text-sm font-medium leading-relaxed">
                  "I used CareerPilot to find my first internship at a local tech hub."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-[#F4C430] bg-white/20 p-1">
                    <div className="w-full h-full rounded-full bg-slate-200" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs">Aminata K.</div>
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Junior Developer</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 7. AI MENTOR HIGHLIGHT */}
            <Card className="p-6 border-none rounded-[2rem] bg-gradient-to-br from-[#0B1F3A] to-[#1FA774] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Bot className="w-24 h-24 text-white" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-[#F4C430]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-poppins text-white">Ask your AI Mentor</h3>
                  <p className="text-slate-100/70 text-sm font-medium">
                    "What can I do with a Law degree in Freetown?"
                  </p>
                </div>
                <Link href="/ai-guidance" className="block">
                  <Button className="w-full bg-[#F4C430] text-[#0B1F3A] hover:bg-white transition-colors rounded-xl font-bold font-poppins shadow-lg">
                    Start Chatting <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
