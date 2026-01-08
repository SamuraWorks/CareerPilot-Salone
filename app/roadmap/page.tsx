"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { toPng } from "html-to-image"
import jsPDF from "jspdf"
import { DashboardLayout } from "@/components/dashboard-layout"
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
  TrendingUp,
  Zap
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { RoadmapHistory } from "@/components/roadmap-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

interface DetailedRoadmapData {
  id: string;
  title: string;
  short_explanation: string;
  career_details: {
    description: string;
    salary_range: string;
    market_demand: 'High' | 'Medium' | 'Low';
    responsibilities: string[];
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
    what_you_will_learn: string[];
    what_you_must_do: { id: string; task: string; completed?: boolean }[];
  }[];
  universities: {
    name: string;
    focus: string;
    requirements?: string;
  }[];
  mentors: {
    name: string;
    role: string;
    help_with: string;
    contact: string;
  }[];
  opportunities: string[];
  next_steps: string[];
}

export default function RoadmapPage() {
  const router = useRouter()
  const { user, session } = useAuth()
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [displayedRoadmap, setDisplayedRoadmap] = useState<DetailedRoadmapData | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [savedRoadmaps, setSavedRoadmaps] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("generator")
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())
  const roadmapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && displayedRoadmap?.id) {
      const storageKey = `roadmap_progress_${displayedRoadmap.id}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCompletedTasks(new Set(JSON.parse(saved)));
      } else {
        setCompletedTasks(new Set());
      }
    }
  }, [displayedRoadmap]);

  const toggleTask = (taskId: string) => {
    if (!displayedRoadmap?.id) return;

    const newCompleted = new Set(completedTasks)
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId)
    } else {
      newCompleted.add(taskId)
    }
    setCompletedTasks(newCompleted)

    localStorage.setItem(`roadmap_progress_${displayedRoadmap.id}`, JSON.stringify(Array.from(newCompleted)))

    // Update global dashboard progress key
    const currentProg = calculateProgress(newCompleted)
    localStorage.setItem("roadmapProgress", JSON.stringify(Array.from(newCompleted)))
    // Note: Dashboard expects the ARRAY of completed task IDs to calculate percentage
  }

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

  const handleGenerate = async () => {
    if (!query) return
    setIsLoading(true)
    setDisplayedRoadmap(null)
    try {
      const res = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ career: query })
      })
      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json()
      setDisplayedRoadmap(data)
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
      toast.info("Generating PDF...");
      const dataUrl = await toPng(roadmapRef.current, { quality: 0.95, pixelRatio: 2, backgroundColor: '#ffffff' });
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgWidth = 210;
      const imgHeight = (roadmapRef.current.offsetHeight * imgWidth) / roadmapRef.current.offsetWidth;
      pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${displayedRoadmap.title.replace(/\s+/g, '_')}_Roadmap.pdf`);
      toast.success("PDF Downloaded!");
    } catch (error) {
      toast.error("Failed to generate PDF");
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
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 min-h-screen">

        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/dashboard')}
          className="mb-4 hover:text-[#1E5EFF] transition-colors group p-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Button>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex w-fit mx-auto mb-10 bg-slate-100 rounded-2xl p-1.5 h-14 shadow-inner">
            <TabsTrigger value="generator" className="rounded-xl px-8 data-[state=active]:bg-white data-[state=active]:text-[#1E5EFF] data-[state=active]:shadow-sm font-black text-xs uppercase tracking-[0.2em]">New Roadmap</TabsTrigger>
            <TabsTrigger value="history" className="rounded-xl px-8 data-[state=active]:bg-white data-[state=active]:text-[#1E5EFF] data-[state=active]:shadow-sm font-black text-xs uppercase tracking-[0.2em]">Saved Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-8 animate-in fade-in duration-700">

            {!displayedRoadmap && (
              <section className="relative rounded-[3.5rem] overflow-hidden bg-[#0B1F3A] min-h-[450px] flex items-center shadow-2xl group border-b-8 border-b-[#1FA774]">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/dashboard/salone_success.png"
                    alt="Roadmap"
                    fill
                    className="object-cover opacity-20 transition-transform duration-[3s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#1E5EFF]/40 to-transparent z-10" />
                </div>

                <div className="relative z-20 w-full p-10 md:p-20 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
                    <MapIcon className="w-4 h-4 text-[#4ADE80]" />
                    <span className="text-[#4ADE80] font-black text-[10px] uppercase tracking-[0.2em]">AI Career Navigator</span>
                  </div>

                  <div className="space-y-4 max-w-2xl">
                    <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tight font-poppins">
                      Discover your <span className="text-gradient-salone brightness-150">Path</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 font-medium font-inter leading-relaxed">
                      Enter any career and get a realistic 12-week roadmap tailored for the Sierra Leonean context.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row w-full max-w-2xl gap-4">
                    <div className="relative flex-1">
                      <Input
                        placeholder="E.g. Fullstack Developer, Nurse, Farmer..."
                        className="h-16 text-lg bg-white/5 border-white/20 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-[#1E5EFF] rounded-2xl transition-all pl-8 w-full shadow-2xl"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                      />
                    </div>
                    <Button
                      size="lg"
                      onClick={handleGenerate}
                      disabled={isLoading || !query}
                      className="h-16 px-10 bg-[#1E5EFF] hover:bg-[#1E5EFF]/90 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-blue-500/20"
                    >
                      {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Plan My Path"}
                    </Button>
                  </div>
                </div>
              </section>
            )}

            {displayedRoadmap && (
              <div ref={roadmapRef} className="space-y-10 pb-32 animate-in slide-in-from-bottom-8 duration-1000">

                {/* 1. PROGRESS WIDGET */}
                <Card className="p-8 bg-[#0B1F3A] text-white rounded-[2.5rem] border-none shadow-2xl sticky top-6 z-50 border-t-2 border-t-[#1E5EFF]">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#1E5EFF]/20 flex items-center justify-center text-[#1E5EFF]">
                        <Zap className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">Roadmap Progress</h3>
                        <p className="text-lg font-black">{Math.round(calculateProgress())}% Complete</p>
                      </div>
                    </div>
                    <Button onClick={handleSave} disabled={isSaving} size="sm" className="bg-[#1FA774] hover:bg-[#1FA774]/80 text-white rounded-xl font-black text-[10px] uppercase tracking-widest px-6 h-10">
                      {isSaving ? "Saving..." : "Save Progress"}
                    </Button>
                  </div>
                  <Progress value={calculateProgress()} className="h-3 bg-white/10 [&>div]:bg-[#1FA774]" />
                </Card>

                {/* 2. HERO DISPLAY */}
                <section className="relative rounded-[3.5rem] overflow-hidden bg-white min-h-[300px] flex items-center shadow-xl border border-slate-100">
                  <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 bg-gradient-to-l from-[#1E5EFF] to-transparent pointer-events-none" />
                  <div className="p-10 md:p-16 space-y-6 w-full">
                    <Badge className="bg-[#1E5EFF]/10 text-[#1E5EFF] border-none font-black px-4 py-1 uppercase tracking-widest text-[10px]">Active Path</Badge>
                    <h1 className="text-4xl md:text-6xl font-black text-[#0B1F3A] font-poppins leading-tight">{displayedRoadmap.title}</h1>
                    <p className="text-lg text-slate-500 font-medium font-inter max-w-3xl border-l-4 border-l-[#1E5EFF] pl-6 py-2">{displayedRoadmap.short_explanation}</p>

                    <div className="flex flex-wrap gap-4 pt-4">
                      <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 min-w-[200px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Average Salary</p>
                        <p className="text-xl font-black text-[#0B1F3A]">{displayedRoadmap.career_details.salary_range}</p>
                      </div>
                      <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 min-w-[200px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Market Demand</p>
                        <p className="text-xl font-black text-[#1FA774]">{displayedRoadmap.career_details.market_demand}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. PHASES GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {displayedRoadmap.phases.map((phase, i) => (
                    <Card key={i} className="flex flex-col rounded-[2.5rem] overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all h-full group">
                      <div className={cn("p-8 text-white", i === 0 ? "bg-[#1E5EFF]" : i === 1 ? "bg-slate-800" : "bg-[#1FA774]")}>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">{phase.duration}</p>
                        <h3 className="text-2xl font-black font-poppins">{phase.name}</h3>
                        <div className="mt-4 pt-4 border-t border-white/10 text-xs font-bold leading-relaxed opacity-80">Goal: {phase.goal}</div>
                      </div>
                      <div className="p-8 space-y-8 flex-1 bg-white">
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1E5EFF] mb-4">Must-Do Tasks</h4>
                          <div className="space-y-3">
                            {phase.what_you_must_do.map((item) => (
                              <div
                                key={item.id}
                                onClick={() => toggleTask(item.id)}
                                className={cn(
                                  "flex items-start gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer",
                                  completedTasks.has(item.id) ? "bg-emerald-50 border-emerald-100 opacity-60" : "bg-slate-50 border-slate-100 hover:border-[#1E5EFF]/20"
                                )}
                              >
                                <div className={cn("w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0", completedTasks.has(item.id) ? "bg-[#1FA774] border-[#1FA774] text-white" : "border-slate-300")}>
                                  {completedTasks.has(item.id) && <CheckCircle2 className="w-3.5 h-3.5" />}
                                </div>
                                <span className={cn("text-xs font-bold leading-tight", completedTasks.has(item.id) ? "line-through text-slate-400" : "text-[#0B1F3A]")}>{item.task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* 4. LOCAL CONTEXT (Unis & Mentors) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="p-8 rounded-[3rem] border-none bg-white shadow-xl">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1E5EFF]"><BookOpen className="w-6 h-6" /></div>
                      <h3 className="text-xl font-black font-poppins text-[#0B1F3A]">Where to Study</h3>
                    </div>
                    <div className="space-y-4">
                      {displayedRoadmap.universities.map((uni, i) => (
                        <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#1E5EFF]/20 transition-all">
                          <h4 className="font-black text-[#0B1F3A] mb-1">{uni.name}</h4>
                          <p className="text-xs text-slate-500 font-medium">{uni.focus}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-8 rounded-[3rem] border-none bg-white shadow-xl">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#1FA774]"><User className="w-6 h-6" /></div>
                      <h3 className="text-xl font-black font-poppins text-[#0B1F3A]">Contact Mentors</h3>
                    </div>
                    <div className="space-y-4">
                      {displayedRoadmap.mentors.map((m, i) => (
                        <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#1FA774]/20 transition-all">
                          <h4 className="font-black text-[#0B1F3A] mb-1">{m.name}</h4>
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#1FA774] mb-3">{m.role}</p>
                          <div className="pt-3 border-t border-slate-200 text-xs font-bold text-slate-400">
                            Expertise: <span className="text-slate-600">{m.help_with}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* 5. NEXT STEPS & CTAs */}
                <div className="bg-[#0B1F3A] text-white rounded-[3.5rem] p-12 text-center space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E5EFF]/10 rounded-full blur-3xl" />
                  <div className="relative z-10 space-y-6">
                    <h2 className="text-3xl md:text-5xl font-black font-poppins">Ready for the transformation?</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                      {displayedRoadmap.next_steps.map((s, i) => (
                        <Badge key={i} className="bg-white/10 text-white border-none px-6 py-2 rounded-full font-bold uppercase tracking-widest text-[9px]">{s}</Badge>
                      ))}
                    </div>
                    <div className="flex justify-center gap-4 pt-4">
                      <Button size="lg" onClick={handleDownloadPDF} className="bg-white text-[#0B1F3A] hover:bg-slate-100 rounded-2xl px-10 font-black uppercase tracking-widest text-xs h-15 shadow-xl">
                        <Download className="w-4 h-4 mr-2" /> Download PDF
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </TabsContent>

          <TabsContent value="history">
            <RoadmapHistory
              roadmaps={savedRoadmaps}
              isLoading={false}
              onLoad={handleLoadHistory}
              onDelete={handleDeleteHistory}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
