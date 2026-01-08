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

        {/* PREMIUM HERO HEADER */}
        <section className="relative rounded-[3.5rem] overflow-hidden bg-[#0B1F3A] min-h-[340px] flex items-center shadow-2xl group">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/dashboard/cotton_tree.png"
              alt="Cotton Tree Freetown"
              fill
              className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-[2000ms]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,167,116,0.15),transparent)] z-10" />
          </div>

          <div className="relative z-20 w-full p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#1FA774]" />
                <span className="text-[#1FA774] font-bold text-[10px] uppercase tracking-[0.2em]">Career Command Center</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-poppins">
                  Welcome back, <span className="text-[#F4C430]">{profile?.name?.split(' ')[0] || 'Samuel'}</span> 👋🏾
                </h1>
                <p className="text-lg md:text-xl text-slate-300 font-medium font-inter max-w-lg leading-relaxed">
                  Your future in Sierra Leone starts with a single step today. Let's build your path together.
                </p>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white">{roadmapProgress}%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Roadmap Ready</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-[#F4C430]">{opportunities.length}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Opportunities</span>
                </div>
              </div>
            </div>

            {/* Glassmorphism badge for Dashboard */}
            <div className="shrink-0 hidden lg:block">
              <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 shadow-2xl flex flex-col items-center gap-4 text-center transform hover:rotate-2 transition-transform cursor-default select-none">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#1FA774] to-[#F4C430] p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-[#0B1F3A] flex items-center justify-center text-3xl">🇸🇱</div>
                </div>
                <div>
                  <p className="text-white font-black text-sm uppercase tracking-widest leading-none">Salone Proud</p>
                  <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-tighter">Verified Citizen Account</p>
                </div>
              </div>
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
                src="/images/mentors/fbk.jpg"
                alt="Francis Ben Kaifala"
                fill
                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/40 to-transparent" />
              <div className="relative z-10 p-6 flex flex-col h-full justify-end min-h-[250px] space-y-3">
                <h3 className="text-xl font-bold font-poppins text-white">Salone Success Stories</h3>
                <p className="text-slate-300 text-sm font-medium leading-relaxed">
                  "Integrity is the foundation of any successful career. Build your path with character."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-[#F4C430] overflow-hidden p-1 bg-white/20">
                    <Image src="/images/mentors/fbk.jpg" alt="FBK" fill className="object-cover rounded-full" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs">Francis Ben Kaifala</div>
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">ACC Commissioner</div>
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
