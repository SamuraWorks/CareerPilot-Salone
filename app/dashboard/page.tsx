"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { useProfile } from "@/lib/profile-context"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
  Zap,
  PenTool,
  GraduationCap,
  MessageCircle,
  ChevronRight,
  Loader2
} from "lucide-react"
import { SIERRA_LEONE_CAREERS } from "@/lib/career-data"
import { MOCK_UNIVERSITIES } from "@/lib/constants/mock-data"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { ProgressOverview } from "@/components/dashboard/progress-overview"
import { Briefcase } from "lucide-react"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { ResearchQuestionnaire } from "@/components/dashboard/research-questionnaire"

export default function DashboardPage() {
  const { user, isLoadingAuth } = useAuth()
  const { profile } = useProfile()
  const router = useRouter()
  const supabase = createClient()
  const [greeting, setGreeting] = useState("Hello")

  useEffect(() => {
    if (!isLoadingAuth && !profile?.is_complete) {
      router.push("/onboarding")
    }
  }, [profile?.is_complete, isLoadingAuth, router])

  // Time-Aware Greeting
  const [aiStatus, setAiStatus] = useState({ configured: false, status: 'Checking AI...' })

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) setGreeting("Good Morning")
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")

    fetch('/api/ai-status').then(res => res.json()).then(data => setAiStatus(data))
  }, [])

  // --- AI RECOMMENDATIONS STATE ---
  const [recommendations, setRecommendations] = useState<any>(null)
  const [isAiLoading, setIsAiLoading] = useState(false)

  const fetchRecommendations = async () => {
    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .eq('user_id', profile.id)
      .single()

    if (data) {
      setRecommendations(data)
    } else {
      if (profile.full_name) {
        handleGenerateAi()
      }
    }
  }

  const handleGenerateAi = async (overrides?: any) => {
    if (!user?.id) {
      toast.error("Please complete your profile first.");
      return;
    }

    setIsAiLoading(true)
    const payload = {
      district: profile.district || "Freetown",
      education: overrides?.education_level || profile.education_level || "Secondary Education",
      interests: [overrides?.sector_interest, ...(overrides?.opportunities_interest || [])].filter(Boolean).join(', ') || profile.interests?.join(', ') || "Technology, Business",
      career_goal: overrides?.career_goal || profile.career_goal || "General Growth",
      direct_request: overrides?.feedback || "",
      user_id: user.id
    };

    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (res.ok) {
        setRecommendations(data)
        toast.success("AI Synthesis Complete!")
      } else {
        toast.error(data.error || "Failed to generate AI recommendations.")
      }
    } catch (err) {
      toast.error("Failed to connect to AI service.")
    } finally {
      setIsAiLoading(false)
    }
  }

  useEffect(() => {
    if (profile?.id && profile?.full_name) {
      fetchRecommendations()
    }
  }, [profile?.id, profile?.full_name])

  // Check for auto-trigger
  useEffect(() => {
    const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : "");
    if (urlParams.get('init_ai') === 'true' && profile?.full_name) {
      handleGenerateAi();
      router.replace('/dashboard');
    }
  }, [profile?.full_name])

  if (isLoadingAuth || !profile?.is_complete) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <span className="ml-2 font-semibold text-muted-foreground">Loading your cockpit...</span>
      </div>
    )
  }

  // --- DERIVED STATE ---
  const displayName = profile?.full_name?.split(' ')[0] || "Pilot"

  // Progress metrics are now handled by ProgressOverview
  const activeRoadmapId = profile?.active_roadmap_id
  const activeCareer = activeRoadmapId ? SIERRA_LEONE_CAREERS.find(c => c.id === activeRoadmapId) : null

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome / Main Action */}
        <div className="relative overflow-hidden rounded-[2rem] shadow-xl min-h-[300px] md:min-h-[280px] group border-b-4 border-emerald-500/20">
          <div className="absolute inset-0 z-0">
            <Image
              src={activeCareer?.image || "/images/sections/dashboard_banner.png"}
              alt="Dashboard Hero"
              fill
              priority
              className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/70" />

            {/* Branded Logo Overlay */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20">
                <Image src="/images/core/logo.png" alt="Logo" width={32} height={32} />
              </div>
              <div className="text-white hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 leading-none mb-1">CareerPilot</p>
                <p className="text-xs font-bold uppercase tracking-widest text-white/90">Control Center</p>
              </div>
            </div>
          </div>

          <div className="relative z-20 h-full flex flex-col md:flex-row items-center justify-between px-8 pb-8 pt-24 md:px-10 md:pb-10 md:pt-24 gap-6">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-black text-white drop-shadow-md">{greeting}, {displayName}!</h1>
                <Badge variant="outline" className={`border-none font-bold uppercase tracking-tighter text-[10px] py-0 px-2 h-5 ${aiStatus.configured ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white/60'}`}>
                  {aiStatus.configured ? <Sparkles className="w-3 h-3 mr-1" /> : <Zap className="w-3 h-3 mr-1" />}
                  {aiStatus.status}
                </Badge>
              </div>

              {activeRoadmapId ? (
                <>
                  <p className="text-white/90 text-lg">
                    Track your real progress and achieve your goals in <strong>{activeCareer?.title || "Career"}</strong>.
                  </p>
                  <div className="flex gap-4 mt-6">
                    <Link href="/roadmap">
                      <span className="bg-white text-primary px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-lg">
                        Go to Journey <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                    <Link href="/profile">
                      <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors flex items-center gap-2">
                        View Profile <User className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-white/90 text-lg">
                    Your profile is ready. Let&apos;s find your perfect career path together.
                  </p>
                  <div className="flex gap-4 mt-6">
                    <Link href="/careers">
                      <span className="bg-white text-primary px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-lg">
                        Find Careers <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                    <Link href="/profile">
                      <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors flex items-center gap-2">
                        Edit Profile <User className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-2xl">
              {profile.avatar_url ? (
                <div className="relative w-full h-full">
                  <Image src={profile.avatar_url} alt="Profile" fill className="object-cover" />
                </div>
              ) : (
                <User className="w-10 h-10 text-white" />
              )}
            </div>
          </div>
        </div>

        {/* Real Progress Overview */}
        <ProgressOverview profile={profile} />

        {/* AI Recommendations Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-[#0B1F3A] uppercase tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-500" /> AI Strategic Recommendations
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGenerateAi}
              disabled={isAiLoading}
              className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600"
            >
              {isAiLoading ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Zap className="w-3 h-3 mr-2" />}
              Refresh AI
            </Button>
          </div>

          {!recommendations && !isAiLoading && (
            <Card className="p-8 text-center bg-slate-50 border-dashed border-2 border-slate-200 rounded-[2rem]">
              <p className="text-slate-500 font-medium mb-4">Complete your profile to unlock personalized AI career recommendations.</p>
              <Link href="/onboarding">
                <Button className="bg-emerald-500 hover:bg-emerald-600 font-bold px-8 rounded-xl shadow-lg">
                  Complete Profile
                </Button>
              </Link>
            </Card>
          )}

          {isAiLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <Card key={i} className="h-48 animate-pulse bg-slate-100 border-none rounded-3xl" />
              ))}
            </div>
          )}

          {recommendations && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Careers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.careers?.map((career: any, i: number) => (
                  <Card key={i} className="group overflow-hidden hover:shadow-2xl transition-all border-none bg-white shadow-lg rounded-3xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${career.demand === 'High' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                        {career.demand} Demand
                      </span>
                      <TrendingUp className="w-4 h-4 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2">{career.title}</h3>
                    <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-2">{career.reason}</p>
                    <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                      <span className="text-xs font-bold text-emerald-600">{career.salary}</span>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-primary font-bold text-xs" asChild>
                        <Link href={`/careers?q=${career.title}`}>Explore <ArrowRight className="w-3 h-3 ml-1" /></Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Scholarships & Jobs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Scholarships */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-2">Funding Opportunities</h3>
                  <div className="space-y-3">
                    {recommendations.scholarships?.map((s: any, i: number) => (
                      <Card key={i} className="p-4 bg-white border-none shadow-sm rounded-2xl flex items-center gap-4 hover:shadow-md transition-all">
                        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                          <Award className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 text-sm truncate">{s.name}</h4>
                          <p className="text-[10px] text-slate-500 font-medium">{s.provider} • {s.deadline}</p>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-lg text-[10px] font-bold h-8" asChild>
                          <Link href={s.link || "#"} target="_blank">View</Link>
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Jobs */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-2">Recent Match Openings</h3>
                  <div className="space-y-3">
                    {recommendations.jobs?.map((j: any, i: number) => (
                      <Card key={i} className="p-4 bg-white border-none shadow-sm rounded-2xl flex items-center gap-4 hover:shadow-md transition-all">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 text-sm truncate">{j.title}</h4>
                          <p className="text-[10px] text-slate-500 font-medium">{j.company} • {j.location}</p>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-lg text-[10px] font-bold h-8" asChild>
                          <Link href="/jobs">Apply</Link>
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Roadmap Summary Banner */}
              <Card className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 border-none rounded-[2rem] text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-32 h-32" />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Your Custom AI Strategy
                    </span>
                  </div>
                  <p className="text-lg font-medium leading-relaxed max-w-2xl">
                    "{recommendations.roadmap_summary}"
                  </p>
                  <Button className="bg-white text-emerald-600 hover:bg-slate-50 font-black rounded-xl" asChild>
                    <Link href="/roadmap">View Full Detailed Roadmap <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Quick Tools Header */}
        <div className="flex items-center justify-between px-2 pt-4">
          <h2 className="text-xl font-black text-[#0B1F3A] uppercase tracking-tight">Career Toolkit</h2>
          <Link href="/resources" className="text-sm font-bold text-primary hover:underline">Full Library</Link>
        </div>

        {/* Quick Actions Grid */}
        <Card className="border-none shadow-lg bg-white overflow-hidden">
          {/* ... existing card content ... */}
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/profile" className="block h-full group">
                <div className="flex items-center gap-4 p-4 border rounded-2xl group-hover:border-primary group-hover:bg-blue-50/50 transition-all cursor-pointer h-full border-slate-100 bg-slate-50/30">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0B1F3A]">Edit Profile</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Update Details</p>
                  </div>
                </div>
              </Link>

              <Link href="/cv-builder" className="block h-full group">
                <div className="flex items-center gap-4 p-4 border rounded-2xl group-hover:border-purple-500 group-hover:bg-purple-50 transition-all cursor-pointer h-full border-slate-100 bg-slate-50/30">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0B1F3A]">CV Builder</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">AI Generation</p>
                  </div>
                </div>
              </Link>

              <Link href="/roadmap" className="block h-full group">
                <div className="flex items-center gap-4 p-4 border rounded-2xl group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-all cursor-pointer h-full border-slate-100 bg-slate-50/30">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0B1F3A]">My Roadmap</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Step-by-step</p>
                  </div>
                </div>
              </Link>

              <Link href="/whatsapp" className="block h-full group">
                <div className="flex items-center gap-4 p-4 border rounded-2xl group-hover:border-green-500 group-hover:bg-green-50 transition-all cursor-pointer h-full border-slate-100 bg-slate-50/30">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0B1F3A]">WhatsApp AI</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Chat with Bot</p>
                  </div>
                </div>
              </Link>

              <FeedbackDialog>
                <div className="flex items-center gap-4 p-4 border rounded-2xl group-hover:border-slate-500 group-hover:bg-slate-50 transition-all cursor-pointer h-full border-slate-100 bg-slate-50/30 hover:border-slate-400">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-600 shadow-sm group-hover:bg-slate-700 group-hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-sm text-[#0B1F3A]">Feedback</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Contact Us</p>
                  </div>
                </div>
              </FeedbackDialog>
            </div>
          </CardContent>
        </Card>

        {/* Top Universities Section */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-[#0B1F3A] uppercase tracking-tight">Academic Centers</h2>
            <Link href="/universities" className="text-sm font-bold text-primary hover:underline">Explore All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {MOCK_UNIVERSITIES.slice(0, 3).map((uni) => (
              <Link key={uni.id} href={`/universities?q=${uni.name}`}>
                <div className="relative h-40 rounded-2xl overflow-hidden group cursor-pointer shadow-md border border-slate-100">
                  <Image
                    src={uni.image_url || "/images/sections/universities/campus.png"}
                    alt={uni.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-8 h-8 bg-white/95 rounded-lg p-1.5 mb-2 shadow-lg">
                      {uni.logo_url ? (
                        <div className="relative h-full w-full">
                          <Image src={uni.logo_url} alt="Uni Logo" fill className="object-contain" />
                        </div>
                      ) : (
                        <div className="h-full w-full bg-slate-100 rounded-md" />
                      )}
                    </div>
                    <h3 className="text-white font-black text-sm leading-tight line-clamp-1">{uni.name}</h3>
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{uni.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>



      </div>
    </DashboardLayout>
  )
}

