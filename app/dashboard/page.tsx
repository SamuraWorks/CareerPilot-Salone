"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { getJobs, getScholarships, getUniversities, getLatestCareerTestResult } from "@/lib/db"
import Link from "next/link"
import {
  ArrowRight,
  Target,
  FileText,
  BookOpen,
  Sparkles,
  GraduationCap,
  ChevronRight,
  Briefcase,
  MapPin,
  Loader2,
  Lightbulb
} from "lucide-react"
import { SkillGapAnalyzer } from "@/components/skill-gap-analyzer"
import { SIERRA_LEONE_CAREERS } from "@/lib/career-data"

// Fallback user type
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
  const [matchedOpportunities, setMatchedOpportunities] = useState<any[]>([])
  const [featuredUnis, setFeaturedUnis] = useState<any[]>([])
  const [testResult, setTestResult] = useState<any>(null)

  // Load profile from localStorage (Onboarding fallback)
  useEffect(() => {
    const savedData = localStorage.getItem("userOnboarding")
    if (savedData) {
      setProfile(JSON.parse(savedData))
    }
  }, [])

  // Dynamic Data Fetching (Supabase with fallbacks)
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      try {
        const [jobs, scholarships, unis] = await Promise.all([
          getJobs(),
          getScholarships(),
          getUniversities()
        ])

        // Mix and match opportunities for diversity
        const allOpps = [...scholarships.slice(0, 5), ...jobs.slice(0, 5)]

        // Basic matching logic
        let filtered = allOpps;
        if (profile) {
          filtered = allOpps.filter(opp =>
            opp.title.toLowerCase().includes(profile.careerGoal?.toLowerCase() || "") ||
            opp.category?.some((c: string) => profile.subjects?.includes(c.toLowerCase()))
          )
        }

        setMatchedOpportunities(filtered.length > 0 ? filtered.slice(0, 3) : allOpps.slice(0, 3))
        setFeaturedUnis(unis.slice(0, 3))

        // Fetch test result
        if (user) {
          const res = await getLatestCareerTestResult(user.id)
          if (res) setTestResult(res)
        }
      } catch (e) {
        console.error("Dashboard load error", e)
      } finally {
        setLoading(false)
      }
    }
    loadDashboardData()
  }, [profile])

  // Career Matching Logic
  const getSubjectCareer = () => {
    if (!profile || !profile.subjects || profile.subjects.length === 0) return SIERRA_LEONE_CAREERS[0];
    const topSubject = profile.subjects[0];
    const subjectToIndustry: Record<string, string> = {
      'tech': 'Technology',
      'science': 'Engineering',
      'health': 'Healthcare',
      'business': 'Business',
      'arts': 'Media',
      'social': 'Non-Profit'
    };
    const industry = subjectToIndustry[topSubject] || 'Technology';
    return SIERRA_LEONE_CAREERS.find(c => c.industry === industry) || SIERRA_LEONE_CAREERS[0];
  }

  const careerMatch = getSubjectCareer();
  const targetCareer = {
    title: careerMatch.title,
    requiredSkills: careerMatch.requiredSkills
  }

  const currentSkills = profile?.skills || profile?.subjects?.map(s => s === 'tech' ? 'Computer Literacy' : s === 'science' ? 'Mathematics' : s === 'business' ? 'Accounting' : 'Communication') || ["Problem Solving", "Communication"];

  return (
    <DashboardLayout>
      <div className="space-y-10 max-w-6xl mx-auto px-4 py-6">
        {/* Personalized Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="animate-in fade-in slide-in-from-left duration-500">
            <Badge className="bg-primary/10 text-primary mb-2 border-none font-bold">Personalized Portal</Badge>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-muted-foreground font-medium text-lg mt-1">
              Welcome back, {profile ? `future ${profile.careerGoal === 'scholarship' ? 'Scholar' : 'Professional'}` : user?.name || 'Explorer'}!
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/guidance">
              <Button className="bg-slate-900 text-white hover:bg-slate-800 font-bold px-8 h-12 rounded-2xl shadow-xl shadow-slate-200 gap-2 transition-all hover:-translate-y-1 active:scale-95">
                <Sparkles className="w-5 h-5" />
                Ask Counselor
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-32 text-muted-foreground">
            <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary" />
            <p className="font-black uppercase tracking-[0.2em] text-[10px]">Syncing with Supabase...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {testResult && (
              <div className="animate-in fade-in slide-in-from-top duration-700">
                <Card className="bg-primary/5 border-primary/20 overflow-hidden rounded-[2.5rem] shadow-xl relative group">
                  <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform">
                    <Target className="w-64 h-64" />
                  </div>
                  <div className="p-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shrink-0 shadow-2xl shadow-primary/30">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-primary/20 text-primary border-none font-black uppercase text-[9px] px-3 py-1">AI Recommendation Match</Badge>
                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest leading-none">Your top path: {testResult.top_type} Match</span>
                      </div>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none group-hover:text-primary transition-colors">
                        {testResult.recommendations[0]?.career_name || "Personalized Match Found"}
                      </h2>
                      <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                        Based on your RIASEC profile, you are a perfect fit for {testResult.recommendations[0]?.career_name}.
                        {testResult.summary}
                      </p>
                    </div>
                    <Link href="/aptitude-test#results">
                      <Button className="h-16 px-10 rounded-2xl bg-slate-900 hover:bg-primary font-black uppercase tracking-widest text-xs shadow-2xl shadow-slate-200 transition-all active:scale-95 group/btn">
                        View Full Roadmap
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Journey Grid: My Career Match */}
              <Card className="border-0 shadow-2xl rounded-[2.5rem] overflow-hidden group hover:shadow-primary/20 transition-all duration-500">
                <CardHeader className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white p-6 pb-12 relative">
                  <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-125 transition-transform duration-700">
                    <Target className="w-16 h-16" />
                  </div>
                  <CardTitle className="text-xl font-black uppercase tracking-widest text-[11px] opacity-80">Track Status</CardTitle>
                  <CardDescription className="text-white font-black text-2xl mt-1">
                    {profile?.careerGoal === 'scholarship' ? 'Academic' : 'Career'} Focus
                  </CardDescription>
                </CardHeader>
                <CardContent className="-mt-8 bg-white p-6 rounded-t-[2.5rem] relative">
                  <div className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                    {profile?.educationLevel === 'secondary' ? 'Secondary Grad' :
                      profile?.educationLevel === 'college' ? 'Univ. Student' :
                        profile?.educationLevel || 'General Path'}
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                    Focused on {profile?.subjects?.[0] || 'your core strengths'} in the SL job market.
                  </p>
                  <Link href="/roadmap">
                    <Button className="w-full justify-between rounded-2xl h-12 bg-slate-50 hover:bg-primary hover:text-white text-slate-900 transition-all font-black uppercase text-[10px] tracking-widest px-6 group/btn border-none">
                      View Roadmap
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Skill Gap Analyzer */}
              <SkillGapAnalyzer currentSkills={currentSkills} targetCareer={targetCareer} />

              {/* Universities Card */}
              <Card className="border-0 shadow-2xl rounded-[2.5rem] overflow-hidden group hover:shadow-blue-500/20 transition-all duration-500">
                <CardHeader className="bg-gradient-to-br from-blue-600 to-blue-400 text-white p-6 pb-12 relative">
                  <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-125 transition-transform duration-700">
                    <GraduationCap className="w-16 h-16" />
                  </div>
                  <CardTitle className="text-xl font-black uppercase tracking-widest text-[11px] opacity-80">Institutions</CardTitle>
                  <CardDescription className="text-white font-black text-2xl mt-1">Uni Guide</CardDescription>
                </CardHeader>
                <CardContent className="-mt-8 bg-white p-6 rounded-t-[2.5rem] relative">
                  <div className="space-y-3 mb-6">
                    {featuredUnis.map((uni) => (
                      <div key={uni.id} className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/50 text-xs font-bold text-blue-700 border border-blue-100/50">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="truncate">{uni.name}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/universities">
                    <Button className="w-full justify-between rounded-2xl h-12 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 transition-all font-black uppercase text-[10px] tracking-widest px-6 group/btn border-none">
                      Explore All
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recommended Opportunities */}
              <Card className="border-0 shadow-2xl rounded-[2.5rem] overflow-hidden group hover:shadow-emerald-500/20 transition-all duration-500">
                <CardHeader className="bg-gradient-to-br from-emerald-500 to-emerald-400 text-white p-6 pb-12 relative">
                  <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-125 transition-transform duration-700">
                    <Briefcase className="w-16 h-16" />
                  </div>
                  <CardTitle className="text-xl font-black uppercase tracking-widest text-[11px] opacity-80">Live Matches</CardTitle>
                  <CardDescription className="text-white font-black text-2xl mt-1">Top Picks</CardDescription>
                </CardHeader>
                <CardContent className="-mt-8 bg-white p-6 rounded-t-[2.5rem] relative">
                  <div className="space-y-3 mb-6">
                    {matchedOpportunities.map((opp) => (
                      <Link href={opp.type === 'scholarship' ? '/scholarships' : '/jobs'} key={opp.id}>
                        <div className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 transition-all cursor-pointer border border-slate-100 hover:border-emerald-200 group/opp">
                          <div className="font-bold text-[11px] text-slate-800 line-clamp-1 group-hover/opp:text-emerald-700 transition-colors uppercase tracking-tight">{opp.title}</div>
                          <div className="text-[9px] font-black text-slate-400 uppercase mt-0.5">{opp.organization}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/jobs">
                    <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl">
                      View More Matches
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Action Card */}
        {!loading && (
          <Card className="p-10 border-none bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-2xl rounded-[3rem] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 opacity-15 -mb-4 -mr-4 rotate-12">
              <Lightbulb className="w-48 h-48" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-black mb-3 italic tracking-tight">Ready for your next big step?</h3>
                <p className="text-slate-300 font-medium max-w-xl">
                  Use our AI Counselor to get a personalized career roadmap or start building your professional CV today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/cv-builder">
                  <Button className="bg-white text-slate-900 hover:bg-slate-100 font-black uppercase text-[10px] tracking-widest h-14 px-10 rounded-2xl">
                    Build My CV
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
