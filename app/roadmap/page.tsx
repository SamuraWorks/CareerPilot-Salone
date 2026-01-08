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
  TrendingUp
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { RoadmapHistory } from "@/components/roadmap-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

// --- TYPES (UPDATED FOR DETAILED SCHEMA) ---
// --- TYPES (UPDATED FOR DETAILED SCHEMA) ---
interface DetailedRoadmapData {
  id: string; // Added for unique progress
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

  // Load progress SPECIFIC TO THIS ROADMAP whenever displayedRoadmap changes
  useEffect(() => {
    if (typeof window !== 'undefined' && displayedRoadmap?.id) {
      const storageKey = `roadmap_progress_${displayedRoadmap.id}`; // UNIQUE KEY
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCompletedTasks(new Set(JSON.parse(saved)));
      } else {
        setCompletedTasks(new Set()); // Reset if no progress for this specific roadmap
      }
    }
  }, [displayedRoadmap]); // Dependency: displayedRoadmap

  const toggleTask = (taskId: string) => {
    if (!displayedRoadmap?.id) return;

    const newCompleted = new Set(completedTasks)
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId)
    } else {
      newCompleted.add(taskId)
    }
    setCompletedTasks(newCompleted)

    // Save to UNIQUE KEY
    const storageKey = `roadmap_progress_${displayedRoadmap.id}`;
    localStorage.setItem(storageKey, JSON.stringify(Array.from(newCompleted)))
  }

  const calculateProgress = () => {
    if (!displayedRoadmap) return 0
    let totalTasks = 0
    let doneTasks = 0
    displayedRoadmap.phases.forEach(phase => {
      phase.what_you_must_do.forEach(task => {
        totalTasks++
        if (completedTasks.has(task.id)) doneTasks++
      })
    })
    return totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0
  }

  // --- FETCH HISTORY ---
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
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }

  // --- GENERATE ---
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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Generation failed");
      }
      const data = await res.json()
      setDisplayedRoadmap(data)
    } catch (e: any) {
      console.error(e);
      toast.error(`Generation Failed: ${e.message}`);
    } finally {
      setIsLoading(false)
    }
  }

  // --- SAVE ---
  const handleSave = async () => {
    if (!displayedRoadmap) {
      toast.error("No roadmap to save.");
      return;
    }
    if (!user) {
      toast.error("You must be logged in to save roadmaps.");
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch('/api/roadmaps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || ''}`
        },
        body: JSON.stringify({
          career: query || displayedRoadmap.title,
          title: displayedRoadmap.title,
          overview: displayedRoadmap.short_explanation,
          content: displayedRoadmap
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Save failed");
      }

      // UPDATE ACTIVE CAREER & RESET PROGRESS IF DIFFERENT
      const newGoal = displayedRoadmap.title;
      const savedData = localStorage.getItem("userOnboarding");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.careerGoal !== newGoal) {
          parsed.careerGoal = newGoal;
          localStorage.setItem("userOnboarding", JSON.stringify(parsed));
          localStorage.setItem("activeCareer", newGoal);
          toast.success(`Career goal updated to: ${newGoal}`);
        }
      }

      toast.success("Roadmap saved to history!");
      await loadHistory();
      setActiveTab("history");
    } catch (e: any) {
      console.error('Save error:', e);
      toast.error(e.message || "Failed to save roadmap");
    } finally {
      setIsSaving(false)
    }
  }

  // --- HISTORY ACTIONS ---
  const handleLoadHistory = (record: any) => {
    // If record.content exists, use it. Otherwise, robustly try to find fields.
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

  // --- DOWNLOAD PDF ---
  const handleDownloadPDF = async () => {
    if (!roadmapRef.current || !displayedRoadmap) {
      toast.error("No roadmap to download");
      return;
    }

    try {
      toast.info("Generating PDF...");

      const dataUrl = await toPng(roadmapRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (roadmapRef.current.offsetHeight * imgWidth) / roadmapRef.current.offsetWidth;

      pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${displayedRoadmap.title.replace(/\s+/g, '_')}_Roadmap.pdf`);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Failed to generate PDF");
    }
  }

  // --- RENDER ---
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8 min-h-screen bg-slate-50 font-sans text-slate-900">

        {/* BACK BUTTON */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/dashboard')}
          className="mb-4 hover:bg-slate-100 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Button>

        {/* TABS FOR GENERATOR / HISTORY */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 bg-white border rounded-xl p-1 h-11 sm:h-12 shadow-sm">
            <TabsTrigger value="generator" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 font-medium text-sm sm:text-base">New Roadmap</TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 font-medium text-sm sm:text-base">My History</TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-8 animate-in fade-in duration-500">

            {/* PREMIUM HERO SEARCH */}
            {!displayedRoadmap && (
              <section className="relative rounded-[3rem] overflow-hidden bg-[#0B1F3A] min-h-[400px] flex items-center shadow-2xl group">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/dashboard/salone_success.png"
                    alt="Roadmap Discovery"
                    fill
                    className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent z-10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,167,116,0.15),transparent)] z-10" />
                </div>

                <div className="relative z-20 w-full p-10 md:p-16 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
                    <MapIcon className="w-4 h-4 text-[#1FA774]" />
                    <span className="text-[#1FA774] font-bold text-xs uppercase tracking-widest">Navigator</span>
                  </div>

                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-poppins">
                      Where do you <span className="text-[#F4C430]">Want</span> to go?
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 font-medium font-inter max-w-xl leading-relaxed">
                      Enter a career name and get a focused, step-by-step 12-week roadmap tailored for the Sierra Leonean market.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row w-full max-w-xl gap-3">
                    <div className="relative flex-1">
                      <Input
                        placeholder="E.g. Mining Engineer, Nurse, Accountant..."
                        className="h-14 md:h-16 text-lg bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20 focus:border-[#F4C430] rounded-2xl transition-all pl-6"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                      />
                    </div>
                    <Button
                      size="lg"
                      onClick={handleGenerate}
                      disabled={isLoading || !query}
                      className="h-14 md:h-16 px-8 bg-[#F4C430] hover:bg-[#F4C430]/90 text-slate-900 font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-[#F4C430]/20 group/btn"
                    >
                      {isLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          Generate Roadmap
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </section>
            )}

            {/* LOADING STATE - SKELETON */}
            {isLoading && !displayedRoadmap && (
              <div className="space-y-8 animate-pulse">
                <div className="h-40 bg-slate-200 rounded-3xl w-full"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-32 bg-slate-200 rounded-2xl"></div>
                  <div className="h-32 bg-slate-200 rounded-2xl"></div>
                </div>
              </div>
            )}

            {/* RESULTS DISPLAY - DETAILED & FOCUSED */}
            {displayedRoadmap && (
              <div ref={roadmapRef} className="space-y-8 pb-32 animate-in slide-in-from-bottom-4 duration-700">

                {/* 0. PROGRESS TRACKER */}
                <Card className="p-6 bg-slate-900 text-white rounded-[2rem] border-none shadow-xl sticky top-4 z-40">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-black text-sm uppercase tracking-widest">Roadmap Progress</h3>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300 border-none font-black">{Math.round(calculateProgress())}%</Badge>
                  </div>
                  <Progress value={calculateProgress()} className="h-2 bg-white/10" />
                </Card>

                {/* PREMIUM HERO HEADER (Detailed) */}
                <section className="relative rounded-[3rem] overflow-hidden bg-[#0B1F3A] min-h-[360px] flex items-center shadow-2xl group">
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/images/dashboard/salone_success.png"
                      alt={displayedRoadmap.title}
                      fill
                      className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,167,116,0.15),transparent)] z-10" />
                  </div>

                  <div className="relative z-20 w-full p-10 md:p-16 space-y-6 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F4C430]/10 border border-[#F4C430]/20 rounded-full backdrop-blur-md mx-auto md:mx-0">
                      <MapIcon className="w-4 h-4 text-[#F4C430]" />
                      <span className="text-[#F4C430] font-bold text-xs uppercase tracking-widest">Active Roadmap</span>
                    </div>

                    <div className="space-y-4">
                      <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-poppins">
                        {displayedRoadmap.title}
                      </h1>
                      <p className="text-lg md:text-xl text-slate-300 font-medium font-inter max-w-3xl mx-auto md:mx-0 leading-relaxed">
                        {displayedRoadmap.short_explanation}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                      <Button
                        onClick={handleDownloadPDF}
                        className="bg-[#F4C430] hover:bg-[#F4C430]/90 text-slate-900 font-black uppercase tracking-widest text-xs h-12 px-8 rounded-xl shadow-xl shadow-[#F4C430]/20"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Save as PDF
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setDisplayedRoadmap(null)}
                        className="border-white/20 text-white hover:bg-white/10 h-12 px-8 rounded-xl backdrop-blur-md font-bold uppercase tracking-widest text-xs"
                      >
                        New Roadmap
                      </Button>
                    </div>
                  </div>
                </section>

                {/* 2. CAREER METRICS (Salary & Demand) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-6 bg-blue-600 text-white border-none shadow-lg">
                    <div className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Estimated Annual Salary</div>
                    <div className="text-2xl font-bold">{displayedRoadmap.career_details.salary_range}</div>
                    <div className="text-blue-200 text-sm mt-1">Sierra Leone Average (approx)</div>
                  </Card>
                  <Card className="p-6 bg-white border border-slate-200 shadow-sm">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Market Demand</div>
                    <div className="flex items-center gap-2">
                      <div className={`text-2xl font-bold ${displayedRoadmap.career_details.market_demand === 'High' ? 'text-green-600' : 'text-slate-900'}`}>{displayedRoadmap.career_details.market_demand} Demand</div>
                      {displayedRoadmap.career_details.market_demand === 'High' && <Badge className="bg-green-100 text-green-700 border-green-200">Hot Job</Badge>}
                    </div>
                    <div className="text-slate-500 text-sm mt-1">Growth Outlook: {displayedRoadmap.why_this_career.growth_outlook}</div>
                  </Card>
                </div>

                {/* 3. KEY RESPONSIBILITIES (New Section) */}
                <Card className="p-8 bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-widest font-poppins text-gradient-salone">Key Responsibilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {displayedRoadmap.career_details.responsibilities.map((resp, i) => (
                      <div key={i} className="flex gap-3 items-start text-sm text-slate-700 border p-3 rounded-xl bg-slate-50 font-inter">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" /> {resp}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* 4. ENTRY REQUIREMENTS */}
                <Card className="p-8 bg-white border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg font-poppins text-gradient-salone">Minimum Entry Requirements</h3>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600">To Start</Badge>
                  </div>
                  <ul className="space-y-3">
                    {displayedRoadmap.entry_requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 font-inter">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 text-sm text-amber-800 font-inter">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>This roadmap prepares you for further study or entry-level exposure — not full professional certification immediately.</p>
                  </div>
                </Card>

                {/* 5. 12-WEEK ROADMAP (3 Phases) */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-bold font-poppins text-gradient-salone">Your 12-Week Plan</h2>
                    <span className="text-sm font-medium text-slate-500 font-inter">Step-by-step</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Phase Loop */}
                    {displayedRoadmap.phases.map((phase, i) => (
                      <Card key={i} className={`flex flex-col overflow-hidden border-t-4 shadow-md ${i === 0 ? 'border-t-blue-500' : i === 1 ? 'border-t-indigo-500' : 'border-t-emerald-500'}`}>
                        <div className="p-6 bg-slate-50 border-b">
                          <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${i === 0 ? 'text-blue-600' : i === 1 ? 'text-indigo-600' : 'font-poppins text-emerald-600'}`}>{phase.duration}</div>
                          <h3 className="text-xl font-bold text-slate-900 font-poppins">{phase.name}</h3>
                          <p className="text-sm text-slate-500 mt-2 italic font-inter">Goal: {phase.goal}</p>
                        </div>
                        <div className="p-6 space-y-6 flex-1 bg-white">
                          <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 font-poppins">What you will learn</div>
                            <ul className="space-y-2">
                              {phase.what_you_will_learn.map((item, j) => (
                                <li key={j} className="text-sm text-slate-700 flex gap-2 font-inter">
                                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${i === 0 ? 'bg-blue-400' : i === 1 ? 'bg-indigo-400' : 'bg-emerald-400'}`} /> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 font-poppins">What you must do</div>
                            <ul className="space-y-3">
                              {phase.what_you_must_do.map((item, j) => (
                                <li
                                  key={item.id || j}
                                  onClick={() => toggleTask(item.id)}
                                  className={cn(
                                    "text-sm font-medium flex gap-3 p-3 rounded-xl border transition-all cursor-pointer group/task font-inter",
                                    completedTasks.has(item.id)
                                      ? "bg-green-50 border-green-100 text-green-800"
                                      : "bg-white border-slate-100 text-slate-900 hover:border-blue-200"
                                  )}
                                >
                                  {completedTasks.has(item.id) ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover/task:border-blue-400 shrink-0" />
                                  )}
                                  <span className={cn(completedTasks.has(item.id) && "line-through opacity-70 italic")}>
                                    {item.task}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* 6. UNIVERSITIES & TRAINING */}
                <Card className="p-8 bg-white border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg"><BookOpen className="w-5 h-5 text-slate-600" /></div>
                    <h3 className="font-bold text-lg font-poppins text-gradient-salone">Where to Study</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {displayedRoadmap.universities.map((uni, i) => (
                      <div key={i} className="p-4 border rounded-xl hover:bg-slate-50 transition-colors bg-white font-inter">
                        <div className="font-bold text-slate-900">{uni.name}</div>
                        <div className="text-sm text-slate-500 mt-1">{uni.focus}</div>
                        {uni.requirements && <div className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-100">{uni.requirements}</div>}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* 7. MENTORS & OPPORTUNITIES (Combined) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mentors */}
                  <Card className="p-6 bg-slate-50 border-none">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-slate-600" />
                      <h4 className="font-bold font-poppins text-gradient-salone">Recommended Mentors</h4>
                    </div>
                    <ul className="space-y-4">
                      {displayedRoadmap.mentors.map((mentor, i) => (
                        <li key={i} className="flex flex-col text-sm border-b border-slate-200 pb-3 last:border-0 last:pb-0 mb-3 last:mb-0 font-inter">
                          <span className="font-bold text-slate-900 text-lg">{mentor.name}</span>
                          <span className="text-blue-600 font-semibold text-xs uppercase tracking-wider mb-1">{mentor.role}</span>
                          <p className="text-slate-600 text-xs mb-2 leading-relaxed">
                            <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">Expertise:</span>
                            {mentor.help_with}
                          </p>
                          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Connect: <span className="text-slate-900">{mentor.contact}</span></span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Opportunities */}
                  <Card className="p-6 bg-slate-50 border-none">
                    <div className="flex items-center gap-2 mb-4">
                      <MapIcon className="w-5 h-5 text-slate-600" />
                      <h4 className="font-bold font-poppins text-gradient-salone">Opportunities to Watch</h4>
                    </div>
                    <ul className="space-y-3">
                      {displayedRoadmap.opportunities.map((opp, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700 font-inter">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" /> {opp}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {/* 8. NEXT STEPS (ACTION ITEMS) */}
                <div className="bg-slate-900 text-slate-300 rounded-3xl p-8 sm:p-12 text-center space-y-6">
                  <h3 className="text-2xl font-bold font-poppins text-gradient-salone">Your Next Steps</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {displayedRoadmap.next_steps.map((step, i) => (
                      <div key={i} className="bg-slate-800 px-4 py-3 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors cursor-default border border-slate-700 font-inter">
                        {step}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4">
                    <Button size="lg" className="rounded-full bg-white text-slate-900 hover:bg-slate-200 px-8 font-bold" onClick={handleSave}>
                      Save This Plan <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* 9. FLOATING ACTION BAR */}
                <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 flex justify-center gap-2 sm:gap-3 z-50 shadow-lg">
                  <Button variant="outline" size="lg" className="rounded-full px-4 sm:px-6 md:px-8 font-semibold gap-2 h-11 sm:h-12" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span className="hidden sm:inline">Save</span>
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full px-4 sm:px-6 md:px-8 font-semibold gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 h-11 sm:h-12" onClick={handleDownloadPDF}>
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download PDF</span>
                  </Button>
                  <Button variant="ghost" size="lg" className="rounded-full px-3 sm:px-4 text-slate-500 h-11 sm:h-12">
                    <HelpCircle className="w-5 h-5" />
                  </Button>
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
