"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toPng } from "html-to-image"
import jsPDF from "jspdf"
import { Footer } from "@/components/footer"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Save,
  ArrowRight,
  BookOpen,
  Map as MapIcon,
  User,
  HelpCircle,
  ChevronRight,
  Download,
  ArrowLeft,
  Calendar,
  Clock,
  TrendingUp,
  Zap,
  Wrench,
  ShieldCheck,
  BarChart3,
  Search,
  Lock,
  MessageSquare,
  GraduationCap,
  Users,
  Briefcase,
  Sparkles,
  ListChecks
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { RoadmapHistory } from "@/components/roadmap-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"

import { DashboardLayout } from "@/components/dashboard-layout"
import { SIERRA_LEONE_CAREERS } from "@/lib/career-data"

interface DetailedRoadmapData {
  id: string;
  title: string;
  short_explanation: string;
  career_details: {
    description: string;
    salary_range: string;
    market_demand: 'High' | 'Medium' | 'Low';
    demand_explanation: string;
    responsibilities: string[];
    work_environment?: string;
    career_levels?: string[];
    required_tools: string[];
    certifications: string[];
    skill_gap_analysis: string;
    market_reality: string;
    image_url?: string;
  };
  verdict: {
    status: string;
    justification: string;
    immediate_action: string;
  };
  reality_check: {
    why_fail: string;
    common_traps: string;
    noise_filter: string;
  };
  market_entry: {
    entry_roles: string[];
    employer_needs: string;
  };
  learning_resources?: {
    free: string[];
    paid: string[];
    local: string[];
  };
  why_this_career: {
    reason: string;
    demand_locations: string[];
    growth_outlook: string;
  };
  entry_requirements: string[];
  phases: {
    id: string;
    name: string;
    duration: string;
    goal: string;
    weekly_rhythm: string;
    skills_unlocked: string[];
    proof_requirement: string;
    what_you_must_do: { id: string; task: string; completed?: boolean }[];
  }[];
  universities: {
    name: string;
    focus: string;
    requirements?: string;
    image_url?: string;
  }[];
  mentors: {
    name: string;
    role: string;
    help_with: string;
    contact: string;
    image_url?: string;
  }[];
  opportunities: string[];
  next_steps: string[];
}

function RoadmapContent() {
  const searchParams = useSearchParams()
  const targetId = searchParams.get('target')
  const router = useRouter()
  const { user, profile, updateProfile } = useAuth()
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [displayedRoadmap, setDisplayedRoadmap] = useState<DetailedRoadmapData | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [savedRoadmaps, setSavedRoadmaps] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("generator")
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())
  const roadmapRef = useRef<HTMLDivElement>(null)

  const calculateProgress = (tasksSet = completedTasks) => {
    if (!displayedRoadmap) return 0
    let totalTasks = 0
    let doneTasks = 0
    displayedRoadmap.phases.forEach(phase => {
      phase.what_you_must_do.forEach(task => {
        totalTasks++
        if (tasksSet.has(task.id)) doneTasks++
      })
    })
    return totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0
  }

  const isPhaseComplete = (phase: DetailedRoadmapData['phases'][0]) => {
    return phase.what_you_must_do.every(task => completedTasks.has(task.id))
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && displayedRoadmap?.id) {
      const storageKey = `roadmap_progress_${displayedRoadmap.id}`;
      // Prioritize Auth Profile over Local Storage for consistency
      const profileTasks = profile?.completed_tasks?.[displayedRoadmap.id] || (profile as any)?.completedTasks?.[displayedRoadmap.id];
      const saved = profileTasks ? JSON.stringify(profileTasks) : localStorage.getItem(storageKey);

      if (saved) {
        const loadedTasks = JSON.parse(saved);
        const loadedSet = new Set<string>(loadedTasks);
        setCompletedTasks(loadedSet);

        // Sync local storage as fallback
        localStorage.setItem(storageKey, saved);
      } else {
        setCompletedTasks(new Set());
      }
    }
  }, [displayedRoadmap, profile?.completed_tasks, (profile as any)?.completedTasks]);

  const toggleTask = (taskId: string) => {
    if (!displayedRoadmap?.id) return;

    const newCompleted = new Set(completedTasks)
    const wasCompleted = newCompleted.has(taskId)

    if (wasCompleted) {
      newCompleted.delete(taskId)
    } else {
      newCompleted.add(taskId)
    }
    setCompletedTasks(newCompleted)

    // Persist to localStorage for instant feedback
    localStorage.setItem(`roadmap_progress_${displayedRoadmap.id}`, JSON.stringify(Array.from(newCompleted)))

    // Update global dashboard progress key
    const currentProg = calculateProgress(newCompleted)
    localStorage.setItem("roadmapProgress", JSON.stringify(Array.from(newCompleted)))
    localStorage.setItem("roadmapPercent", Math.round(currentProg).toString())

    // Sync to cloud profile (Auth Context)
    if (profile && user) {
      const POINTS_PER_TASK = 50
      const currentPoints = profile.points || 0
      const pointsDelta = wasCompleted ? -POINTS_PER_TASK : POINTS_PER_TASK
      const newPoints = Math.max(0, currentPoints + pointsDelta)

      const updatedCompletedTasks = {
        ...(profile.completed_tasks || (profile as any)?.completedTasks || {}),
        [displayedRoadmap.id]: Array.from(newCompleted)
      }

      const updatedTimestamps = {
        ...(profile.task_timestamps || {}),
        [taskId]: new Date().toISOString()
      }

      if (wasCompleted) {
        delete updatedTimestamps[taskId]
      }

      // Update profile via auth context
      updateProfile({
        completed_tasks: updatedCompletedTasks,
        task_timestamps: updatedTimestamps,
        points: newPoints,
        last_updated_at: new Date().toISOString()
      })

      // User feedback
      if (!wasCompleted) {
        toast.success(`+${POINTS_PER_TASK} Points! Keep going! 🚀`, {
          description: `Total: ${newPoints} Career Points`
        })
      }
    }
  }




  useEffect(() => {
    if (user) loadHistory();
  }, [user]);

  async function loadHistory() {
    try {
      const res = await fetch('/api/roadmaps');
      if (res.ok) {
        const data = await res.json();
        setSavedRoadmaps(data);
      }
    } catch (e) { console.error("History fail", e); }
  }

  // Handle incoming 'target' or active roadmap resumption
  useEffect(() => {
    const activeId = targetId || profile?.activeRoadmapId;
    if (activeId && !displayedRoadmap && !isLoading) {
      // First, check if it's already in history
      const inHistory = savedRoadmaps.find(r => r.career_id === activeId || r.content?.id === activeId);
      if (inHistory) {
        handleLoadHistory(inHistory);
      } else {
        const career = SIERRA_LEONE_CAREERS.find(c => c.id === activeId);
        if (career) {
          setQuery(career.title);
          triggerAutoGenerate(career.title);
        }
      }
    }
  }, [targetId, profile?.activeRoadmapId, savedRoadmaps.length]);

  const triggerAutoGenerate = async (title: string) => {
    setIsLoading(true)
    setDisplayedRoadmap(null)
    try {
      const res = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          career: title,
          educationLevel: profile?.educationLevel || 'secondary',
          location: profile?.location || 'Freetown',
          skillLevel: 'beginner',
          userType: profile?.careerGoal ? 'student' : 'career_seeker'
        })
      })
      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json()
      setDisplayedRoadmap(data)
      toast.success(`Generated Intelligence Blueprint for ${title}`)
    } catch (e: any) {
      toast.error(`Generation Failed: ${e.message}`);
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerate = async () => {
    if (!query) return
    setIsLoading(true)
    setDisplayedRoadmap(null)
    try {
      const res = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          career: query,
          // Include user profile for personalization
          educationLevel: profile?.educationLevel || 'secondary',
          location: profile?.location || 'Freetown',
          skillLevel: 'beginner', // Could be determined from profile or aptitude test
          userType: profile?.careerGoal ? 'student' : 'career_seeker'
        })
      })
      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json()
      setDisplayedRoadmap(data)
      toast.success("Roadmap generated successfully!")
    } catch (e: any) {
      toast.error(`Generation Failed: ${e.message}`);
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!displayedRoadmap || !user) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/roadmaps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          career: query || displayedRoadmap.title,
          title: displayedRoadmap.title,
          overview: displayedRoadmap.short_explanation,
          content: displayedRoadmap
        })
      });
      if (!res.ok) throw new Error("Save failed");

      // Update active career in onboarding
      const savedData = localStorage.getItem("userOnboarding");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        parsed.careerGoal = displayedRoadmap.title;
        localStorage.setItem("userOnboarding", JSON.stringify(parsed));
      }

      toast.success("Roadmap saved!");
      await loadHistory();
      setActiveTab("history");
    } catch (e: any) {
      toast.error(e.message || "Failed to save");
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!roadmapRef.current || !displayedRoadmap) return;
    try {
      toast.info("Analyzing structure for Multi-Page Intelligence Export...");
      const element = roadmapRef.current;

      // Capture the element as a high-quality PNG
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Add first page
      pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      // Addition of multiple pages if content exceeds A4 height
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Intelligence_Briefing_${displayedRoadmap.title.replace(/\s+/g, '_')}.pdf`);
      toast.success("Full Intelligence Briefing Exported!");
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.error("Full Page Export Failed. Printing source instead.");
      window.print();
    }
  }

  const handleLoadHistory = (record: any) => {
    const content = record.content || record;
    if (content) {
      setDisplayedRoadmap(content);
      setActiveTab("generator");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success(`Loaded ${content.title || record.title || "roadmap"}`);
    }
  }

  const handleDeleteHistory = async (id: string) => {
    try {
      const res = await fetch(`/api/roadmaps?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSavedRoadmaps(prev => prev.filter(r => r.id !== id));
        toast.success("Roadmap deleted");
      } else {
        throw new Error("Failed to delete");
      }
    } catch (e) {
      toast.error("Could not delete roadmap");
    }
  }

  return (
    <DashboardLayout>

      <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">

        {/* --- HERO SECTION --- */}
        <section className="relative rounded-3xl overflow-hidden min-h-[400px] flex items-center shadow-sm bg-slate-50">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/hero.png"
              alt="Roadmap Hub"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-20 w-full p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
            <div className="space-y-6 max-w-2xl bg-white/70 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/50 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                <MapIcon className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600 font-semibold text-xs uppercase tracking-wide">Strategy Hub: Roadmap Engine</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-tight font-sans tracking-tight text-gradient-salone">
                Roadmaps
              </h1>
              <p className="text-lg text-slate-600 font-medium font-sans leading-relaxed border-l-4 border-emerald-500 pl-6">
                Synthesize high-precision career pathways tailored for the modern Sierra Leonean professional.
              </p>
            </div>

            <Link href="/dashboard" className="text-slate-600 hover:text-emerald-600 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wide group bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200 shadow-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Base
            </Link>
          </div>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex w-full mx-auto mb-10 bg-slate-100 rounded-2xl p-1.5 h-14 shadow-inner overflow-x-auto justify-start md:justify-center no-scrollbar">
            <TabsTrigger value="generator" className="rounded-xl px-8 data-[state=active]:bg-white data-[state=active]:text-[#1E5EFF] data-[state=active]:shadow-sm font-black text-xs uppercase tracking-[0.2em] min-w-fit">Live Generator</TabsTrigger>
            <TabsTrigger value="history" className="rounded-xl px-8 data-[state=active]:bg-white data-[state=active]:text-[#1E5EFF] data-[state=active]:shadow-sm font-black text-xs uppercase tracking-[0.2em] min-w-fit">Mission Archive</TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-8 outline-none">
            {!displayedRoadmap ? (
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-dashed border-slate-200 text-center space-y-6 animate-in zoom-in duration-500 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 shadow-sm flex items-center justify-center mx-auto mb-4 text-primary">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="space-y-2 max-w-xl mx-auto">
                  <h3 className="text-2xl font-bold text-slate-900">Define Destination</h3>
                  <p className="text-muted-foreground font-medium text-base">Enter a career field to generate a localized 12-week strategic roadmap.</p>
                </div>

                <div className="flex flex-col sm:flex-row w-full max-w-2xl mx-auto gap-4 pt-4">
                  <div className="relative flex-1">
                    <Input
                      placeholder="E.g. Petroleum Engineer, Data Analyst, Farmer..."
                      className="h-16 text-lg bg-slate-50 border-slate-200 text-[#0B1F3A] placeholder:text-slate-400 focus:border-[#1E5EFF] rounded-2xl transition-all px-8 w-full shadow-sm"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                  </div>
                  <Button
                    size="lg"
                    onClick={handleGenerate}
                    disabled={isLoading || !query}
                    className="h-16 px-10 bg-[#0B1F3A] hover:bg-[#1E5EFF] text-white font-black uppercase tracking-widest text-[11px] rounded-2xl transition-all shadow-xl active:scale-95"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Zap className="w-5 h-5 mr-2" />}
                    {isLoading ? "Simulating..." : "Generate Path"}
                  </Button>
                </div>
              </div>
            ) : (
              <div ref={roadmapRef} className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
                {/* TOOLBAR */}
                <div className="flex flex-wrap items-center justify-between gap-6 px-4">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => setDisplayedRoadmap(null)} className="rounded-xl border-slate-200 hover:bg-slate-50 font-black uppercase tracking-widest text-[10px] gap-2">
                      <ArrowLeft className="w-3.5 h-3.5" /> Reset Generator
                    </Button>
                    <div className="h-6 w-px bg-slate-200" />
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[9px]">Analyzing trajectory for: <span className="text-[#0B1F3A]">{displayedRoadmap.title}</span></p>
                  </div>
                  <div className="flex items-center gap-3">
                    {profile && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl shadow-sm">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-black text-amber-900">{profile.points || 0}</span>
                        <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wider">Points</span>
                      </div>
                    )}
                    <Button onClick={handleSave} disabled={isSaving} className="rounded-xl bg-white text-[#0B1F3A] border border-slate-200 hover:bg-slate-50 font-black uppercase tracking-widest text-[10px] gap-2 shadow-sm">
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Sync to Profile
                    </Button>
                    <Button onClick={handleDownloadPDF} className="rounded-xl bg-[#0B1F3A] text-white hover:bg-[#1E5EFF] font-black uppercase tracking-widest text-[10px] gap-2 shadow-lg shadow-blue-500/10">
                      <Download className="w-4 h-4" /> Tactical Export (PDF)
                    </Button>
                  </div>
                </div>


                {/* HERO DATA CARD */}
                <Card className="rounded-[2.5rem] p-8 md:p-12 bg-white border border-slate-100 shadow-xl relative overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className={cn(
                          "border-none font-bold px-3 py-1 uppercase text-[10px] tracking-wider",
                          displayedRoadmap.verdict.status.includes("RECOMMENDED") ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        )}>
                          Verdict: {displayedRoadmap.verdict.status}
                        </Badge>
                        <Badge className="bg-slate-100 text-slate-500 border-none font-bold px-3 py-1 uppercase text-[10px] tracking-wider">
                          Outlook: {displayedRoadmap.why_this_career.growth_outlook}
                        </Badge>
                      </div>
                      <h1 className="text-3xl md:text-5xl font-bold text-slate-900 font-sans leading-tight">{displayedRoadmap.title}</h1>
                      <div className="prose prose-slate max-w-none text-muted-foreground font-medium font-sans border-l-4 border-emerald-500 pl-6 py-1">
                        <p className="leading-relaxed whitespace-pre-line">{displayedRoadmap.short_explanation}</p>
                      </div>
                      <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Immediate Tactical Action</p>
                        <p className="text-sm font-bold text-slate-800">🚀 {displayedRoadmap.verdict.immediate_action}</p>
                      </div>
                    </div>

                    {displayedRoadmap.career_details.image_url && (
                      <div className="relative aspect-square lg:aspect-auto h-full min-h-[250px] rounded-[2rem] overflow-hidden shadow-2xl">
                        <Image
                          src={displayedRoadmap.career_details.image_url}
                          alt={displayedRoadmap.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <p className="text-[10px] font-black text-white/80 uppercase tracking-widest mb-1">Target Role</p>
                          <p className="text-white font-bold text-lg">{displayedRoadmap.title}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between group hover:bg-white hover:shadow-lg transition-all duration-300">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Market Potential (SLE)</p>
                      <p className="text-emerald-600 font-bold text-xl">{displayedRoadmap.career_details.salary_range}</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-lg transition-all duration-300">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Economic Demand</p>
                      <Badge className={cn("text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full",
                        displayedRoadmap.career_details.market_demand === 'High' ? "bg-emerald-500 text-white" : "bg-amber-500 text-white")}>
                        {displayedRoadmap.career_details.market_demand} Criticality
                      </Badge>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-lg transition-all duration-300">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Environment</p>
                      <p className="text-slate-900 font-bold text-sm uppercase tracking-wide">{displayedRoadmap.career_details.work_environment || "Enterprise/Field"}</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-lg transition-all duration-300">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Entry Levels</p>
                      <div className="flex flex-wrap gap-2">
                        {(displayedRoadmap.career_details.career_levels || ["Standard"]).slice(0, 2).map((l: string, i: number) => (
                          <span key={i} className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md uppercase tracking-wide">{l}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* STRATEGIC BRIEFING SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <Card className="p-6 rounded-[2rem] bg-amber-50/50 border border-amber-100/50 hover:bg-amber-50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      <h3 className="font-black text-[#0B1F3A] uppercase tracking-tight text-xs">Reality Check</h3>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10px] text-slate-700 font-medium leading-relaxed italic border-l-2 border-amber-400 pl-3">
                        <span className="font-black block uppercase text-[9px] text-amber-600 mb-0.5">Why People Fail:</span>
                        "{displayedRoadmap.reality_check.why_fail}"
                      </p>
                      <p className="text-[10px] text-slate-700 font-medium leading-relaxed italic border-l-2 border-amber-400 pl-3">
                        <span className="font-black block uppercase text-[9px] text-amber-600 mb-0.5">Local Traps:</span>
                        "{displayedRoadmap.reality_check.common_traps}"
                      </p>
                    </div>
                  </Card>

                  <Card className="p-6 rounded-[2rem] bg-blue-50/50 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <h3 className="font-black text-[#0B1F3A] uppercase tracking-tight text-xs">Market Entry</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {displayedRoadmap.market_entry.entry_roles.slice(0, 3).map((role, rIdx) => (
                          <Badge key={rIdx} variant="outline" className="text-[9px] border-blue-200 bg-white text-blue-600 font-bold px-2 py-0.5">{role}</Badge>
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-700 font-medium leading-relaxed italic">
                        <span className="font-black block uppercase text-[9px] text-blue-600 mb-0.5">Employer Priority:</span>
                        "{displayedRoadmap.market_entry.employer_needs}"
                      </p>
                    </div>
                  </Card>

                  <Card className="p-6 rounded-[2rem] bg-indigo-50/50 border border-indigo-100/50 hover:bg-indigo-50 transition-colors col-span-1 lg:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-black text-[#0B1F3A] uppercase tracking-tight text-xs">Analysis Verdict</h3>
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
                        "{displayedRoadmap.verdict.justification}"
                      </p>
                      <div className="flex items-center gap-4 p-3 bg-white/50 rounded-xl border border-indigo-100/30">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-wider text-indigo-400">Skill Gap Status</p>
                          <p className="text-[10px] font-bold text-slate-900">{displayedRoadmap.career_details.skill_gap_analysis}</p>
                        </div>
                        <div className="h-6 w-px bg-indigo-100" />
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-wider text-indigo-400">Action Plan</p>
                          <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white border-none text-[9px] uppercase font-bold px-2 py-0.5">
                            {displayedRoadmap.career_details.skill_gap_analysis.toLowerCase().includes("ready") ? "ACCELERATED GROWTH" : "FOUNDATION BUILDER"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <ShieldCheck className="w-5 h-5 text-[#1FA774]" />
                      <h3 className="font-black text-[#0B1F3A] uppercase tracking-tight text-sm">Hard Requirements</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {displayedRoadmap.entry_requirements.map((req, i) => (
                        <li key={i} className="text-xs font-bold text-slate-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1FA774] mt-1.5 shrink-0" />
                          <span className="leading-snug">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <GraduationCap className="w-5 h-5 text-[#1E5EFF]" />
                      <h3 className="font-black text-[#0B1F3A] uppercase tracking-tight text-sm">Recommended Education</h3>
                    </div>
                    <div className="space-y-3">
                      {displayedRoadmap.universities && displayedRoadmap.universities.length > 0 ? (
                        displayedRoadmap.universities.map((uni, i) => (
                          <Link key={i} href={`/universities?q=${encodeURIComponent(uni.name)}`} className="block group/uni">
                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3 group-hover/uni:border-emerald-500 transition-all">
                              {uni.image_url && (
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                                  <Image src={uni.image_url} alt={uni.name} fill className="object-cover" />
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-black text-[#0B1F3A] text-[10px] truncate">{uni.name}</p>
                                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover/uni:text-emerald-500" />
                                </div>
                                <p className="text-[9px] text-slate-500 font-bold uppercase truncate">{uni.focus}</p>
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 italic">No specific degrees required. Focus on vocational skills.</p>
                      )}
                    </div>
                  </Card>

                  <Card className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="w-5 h-5 text-purple-600" />
                      <h3 className="font-black text-[#0B1F3A] uppercase tracking-tight text-sm">Mentor Profiles</h3>
                    </div>
                    <div className="space-y-3">
                      {displayedRoadmap.mentors && displayedRoadmap.mentors.map((m, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                          {m.image_url && (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white shadow-sm">
                              <Image src={m.image_url} alt={m.name} fill className="object-cover" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-black text-[#0B1F3A] text-[10px] truncate">{m.role}</p>
                            <p className="text-[9px] text-slate-500 italic leading-snug truncate">"{m.help_with}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* MISSION PHASES */}
                <div className="space-y-12">
                  <div className="flex items-center gap-4 px-4 overflow-hidden">
                    <div className="h-px flex-1 bg-slate-100" />
                    <h2 className="text-xl font-black text-[#0B1F3A] uppercase tracking-[0.3em] px-6 whitespace-nowrap">Execution Phases</h2>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>

                  {/* 3-COLUMN GRID LAYOUT */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {displayedRoadmap.phases.map((phase, idx) => {
                      const complete = isPhaseComplete(phase)
                      return (
                        <div key={phase.id} className="relative group/phase h-full">
                          <Card className={cn(
                            "h-full flex flex-col rounded-[2.5rem] p-6 border border-slate-100 shadow-xl transition-all duration-500 overflow-hidden relative",
                            complete ? "bg-emerald-50/30 border-emerald-100 shadow-emerald-500/5" : "bg-white hover:shadow-2xl"
                          )}>
                            {/* Phase Header */}
                            <div className="space-y-4 mb-6 relative z-10">
                              <div className="flex justify-between items-start">
                                <div className={cn(
                                  "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm border",
                                  complete ? "bg-[#1FA774] text-white border-[#1FA774]" : "bg-[#0B1F3A] text-white border-[#0B1F3A]"
                                )}>
                                  {complete ? <CheckCircle2 className="w-6 h-6" /> : `0${idx + 1}`}
                                </div>
                                <Badge variant="outline" className="text-[9px] uppercase tracking-widest font-black py-1.5 border-slate-200 bg-slate-50">
                                  {phase.duration}
                                </Badge>
                              </div>

                              <div>
                                <h3 className="text-xl font-black text-[#0B1F3A] font-sans leading-tight mb-1">{phase.name}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{phase.goal}</p>
                              </div>
                            </div>

                            {/* Skills Acquired & Rhythm */}
                            <div className="mb-6 space-y-4">
                              <div className="flex items-center justify-between">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">Capabilities Unlocked</p>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50/50 rounded-lg">
                                  <Clock className="w-2.5 h-2.5 text-blue-500" />
                                  <span className="text-[9px] font-bold text-blue-600 uppercase">{phase.weekly_rhythm}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {phase.skills_unlocked.slice(0, 3).map((skill, sIdx) => (
                                  <span key={sIdx} className="text-[10px] font-bold bg-slate-50 text-slate-600 px-2 py-1 rounded-md border border-slate-100">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Proof Requirement */}
                            <div className="mb-6 p-4 bg-[#0B1F3A] rounded-2xl border-l-4 border-emerald-500">
                              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-1">Proof of Work</p>
                              <p className="text-[10px] font-bold text-white leading-relaxed">{phase.proof_requirement}</p>
                            </div>

                            {/* Task List */}
                            <div className="space-y-2.5 flex-1">
                              {phase.what_you_must_do.map((task) => (
                                <div
                                  key={task.id}
                                  onClick={() => toggleTask(task.id)}
                                  className={cn(
                                    "flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border group/task",
                                    completedTasks.has(task.id)
                                      ? "bg-slate-50/50 border-transparent opacity-60"
                                      : "bg-slate-50 border-slate-100 hover:border-[#1E5EFF]/30 hover:bg-white"
                                  )}
                                >
                                  <div className={cn(
                                    "w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 transition-all border",
                                    completedTasks.has(task.id) ? "bg-[#1FA774] border-[#1FA774] text-white" : "bg-white border-slate-300"
                                  )}>
                                    {completedTasks.has(task.id) && <CheckCircle2 className="w-3 h-3" />}
                                  </div>
                                  <span className={cn(
                                    "text-xs font-bold leading-snug transition-all",
                                    completedTasks.has(task.id) ? "text-slate-400 line-through" : "text-slate-700"
                                  )}>
                                    {task.task}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </Card>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* SECONDARY INFO GRID & CTA (Keep as is) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Knowledge Vault */}
                  <Card className="rounded-[3.5rem] p-12 bg-white border border-slate-100 shadow-xl space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1E5EFF] shadow-sm">
                        <BookOpen className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-[#0B1F3A] font-sans capitalize">Knowledge Vault</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Training Infrastructure</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {displayedRoadmap.learning_resources && (
                        <>
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1FA774] pl-1">Localized Ecosystem (Salone)</h4>
                            <div className="flex flex-wrap gap-2">
                              {displayedRoadmap.learning_resources.local.map((r, i) => (
                                <Badge key={i} className="bg-emerald-50 text-emerald-700 border border-emerald-100/50 hover:bg-emerald-100 px-4 py-2 rounded-xl text-[11px] font-bold">{r}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1E5EFF] pl-1">Global Intelligence Base</h4>
                            <div className="flex flex-wrap gap-2">
                              {displayedRoadmap.learning_resources.free.map((r, i) => (
                                <Badge key={i} className="bg-blue-50 text-blue-700 border border-blue-100/50 hover:bg-blue-100 px-4 py-2 rounded-xl text-[11px] font-bold">{r}</Badge>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </Card>

                  {/* Mentor Network */}
                  <Card className="rounded-[3.5rem] p-12 bg-white border border-slate-100 shadow-xl space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-emerald-600 shadow-sm">
                        <Users className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-[#0B1F3A] font-sans capitalize">Advisory Network</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Industry Vetted Mentors</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {displayedRoadmap.mentors.map((mentor, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col gap-4 group hover:bg-white hover:shadow-lg transition-all">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-black text-[#0B1F3A] text-base">{mentor.name}</p>
                              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{mentor.role}</p>
                            </div>
                            <Link href={`/mentorship?mentor=${mentor.id || ""}`}>
                              <Button size="sm" variant="outline" className="h-9 rounded-xl text-[9px] font-black uppercase tracking-widest bg-white hover:bg-[#0B1F3A] hover:text-white transition-all">Connect</Button>
                            </Link>
                          </div>
                          <div className="pt-4 border-t border-slate-200/50 flex items-start gap-3">
                            <div className="w-6 h-6 rounded-lg bg-[#1E5EFF]/10 flex items-center justify-center shrink-0">
                              <MessageSquare className="w-3 h-3 text-[#1E5EFF]" />
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">Help with: {mentor.help_with}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* CALL TO ACTION */}
                <div className="bg-[#0B1F3A] text-white rounded-[4rem] p-12 md:p-20 text-center space-y-10 relative overflow-hidden group border-b-8 border-b-[#1E5EFF]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1E5EFF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-black font-sans italic leading-none uppercase tracking-tighter">Ready for the <br /><span className="text-gradient-salone brightness-150">Ascension?</span></h2>
                    <p className="text-lg text-slate-400 font-medium font-sans italic leading-relaxed">Your professional transformation in the Sierra Leonean marketplace begins now. Execute Phase 01 immediately.</p>
                    <div className="flex justify-center gap-6 pt-4">
                      <Button size="lg" onClick={handleDownloadPDF} className="bg-white text-[#0B1F3A] hover:bg-[#1FA774] hover:text-white rounded-2xl px-12 h-16 font-black uppercase tracking-widest text-[11px] shadow-2xl transition-all active:scale-95">
                        <Download className="w-5 h-5 mr-3" /> Get Tactical Copy (PDF)
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="history" className="outline-none">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <RoadmapHistory
                roadmaps={savedRoadmaps}
                isLoading={false}
                onLoad={handleLoadHistory}
                onDelete={handleDeleteHistory}
              />
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </DashboardLayout>
  )
}

export default function RoadmapPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1E5EFF] animate-spin" />
      </div>
    }>
      <RoadmapContent />
    </Suspense>
  )
}

