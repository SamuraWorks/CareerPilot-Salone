"use client"

import { useState, useEffect, useRef } from "react"
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
  ChevronRight
} from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { RoadmapHistory } from "@/components/roadmap-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// --- TYPES (UPDATED FOR DETAILED SCHEMA) ---
interface DetailedRoadmapData {
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
    name: string;
    duration: string;
    goal: string;
    what_you_will_learn: string[];
    what_you_must_do: string[];
  }[];
  universities: {
    name: string;
    focus: string;
    requirements?: string;
  }[];
  mentors: {
    type: string;
    contact_method: string;
  }[];
  opportunities: string[];
  next_steps: string[];
}

export default function RoadmapPage() {
  const { user } = useAuth()
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [displayedRoadmap, setDisplayedRoadmap] = useState<DetailedRoadmapData | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [savedRoadmaps, setSavedRoadmaps] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("generator")
  const roadmapRef = useRef<HTMLDivElement>(null)

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
    if (!displayedRoadmap || !user) {
      toast.error("You must be logged in to save roadmaps.");
      return;
    }
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

      toast.success("Roadmap saved to history");
      loadHistory();
    } catch (e) {
      toast.error("Failed to save roadmap");
    } finally {
      setIsSaving(false)
    }
  }

  // --- RENDER ---
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 min-h-screen bg-slate-50 font-sans text-slate-900">

        {/* TABS FOR GENERATOR / HISTORY */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white border rounded-xl p-1 h-12 shadow-sm">
            <TabsTrigger value="generator" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 font-medium">New Roadmap</TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 font-medium">My History</TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-8 animate-in fade-in duration-500">

            {/* SEARCH INPUT */}
            {!displayedRoadmap && (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm text-center px-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <MapIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Where do you want to go?</h1>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">Enter a career name (e.g. "Mining Engineer", "Nurse", "Accountant") and get a focused, step-by-step 12-week plan.</p>

                <div className="flex w-full max-w-md gap-3">
                  <Input
                    placeholder="E.g. Civil Engineer..."
                    className="h-12 text-lg bg-slate-50 border-slate-200 focus:bg-white transition-all"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                  <Button
                    size="lg"
                    onClick={handleGenerate}
                    disabled={isLoading || !query}
                    className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-md hover:shadow-lg shadow-blue-200"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
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

                {/* 1. HEADER (Detailed) */}
                <div className="bg-white border text-center p-8 sm:p-12 rounded-3xl shadow-sm space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    <MapIcon className="w-3 h-3" /> Career Pathway
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent tracking-tight pb-1">
                    {displayedRoadmap.title}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> Beginner Level</span>
                    <span className="hidden sm:inline text-slate-300">•</span>
                    <span className="flex items-center gap-1"><Loader2 className="w-4 h-4" /> 12-Week Plan</span>
                    <span className="hidden sm:inline text-slate-300">•</span>
                    <span className="flex items-center gap-1"><MapIcon className="w-4 h-4" /> For Sierra Leone</span>
                  </div>
                  <div className="max-w-3xl mx-auto pt-6 border-t border-slate-100 mt-6 space-y-4">
                    <p className="text-lg text-slate-700 font-medium leading-relaxed">
                      {displayedRoadmap.short_explanation}
                    </p>
                    {/* Career Details Summary */}
                    <p className="text-sm text-slate-500 leading-relaxed italic">
                      {displayedRoadmap.career_details.description}
                    </p>
                  </div>
                </div>

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
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Key Responsibilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {displayedRoadmap.career_details.responsibilities.map((resp, i) => (
                      <div key={i} className="flex gap-3 items-start text-sm text-slate-700 border p-3 rounded-xl bg-slate-50">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" /> {resp}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* 4. ENTRY REQUIREMENTS */}
                <Card className="p-8 bg-white border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-lg">Minimum Entry Requirements</h3>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600">To Start</Badge>
                  </div>
                  <ul className="space-y-3">
                    {displayedRoadmap.entry_requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 text-sm text-amber-800">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>This roadmap prepares you for further study or entry-level exposure — not full professional certification immediately.</p>
                  </div>
                </Card>

                {/* 5. 12-WEEK ROADMAP (3 Phases) */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-black text-slate-900">Your 12-Week Plan</h2>
                    <span className="text-sm font-medium text-slate-500">Step-by-step</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Phase Loop */}
                    {displayedRoadmap.phases.map((phase, i) => (
                      <Card key={i} className={`flex flex-col overflow-hidden border-t-4 shadow-md ${i === 0 ? 'border-t-blue-500' : i === 1 ? 'border-t-indigo-500' : 'border-t-emerald-500'}`}>
                        <div className="p-6 bg-slate-50 border-b">
                          <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${i === 0 ? 'text-blue-600' : i === 1 ? 'text-indigo-600' : 'text-emerald-600'}`}>{phase.duration}</div>
                          <h3 className="text-xl font-bold text-slate-900">{phase.name}</h3>
                          <p className="text-sm text-slate-500 mt-2 italic">Goal: {phase.goal}</p>
                        </div>
                        <div className="p-6 space-y-6 flex-1 bg-white">
                          <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">What you will learn</div>
                            <ul className="space-y-2">
                              {phase.what_you_will_learn.map((item, j) => (
                                <li key={j} className="text-sm text-slate-700 flex gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${i === 0 ? 'bg-blue-400' : i === 1 ? 'bg-indigo-400' : 'bg-emerald-400'}`} /> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">What you must do</div>
                            <ul className="space-y-2">
                              {phase.what_you_must_do.map((item, j) => (
                                <li key={j} className="text-sm font-medium text-slate-900 flex gap-2">
                                  <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${i === 0 ? 'text-green-500' : i === 1 ? 'text-indigo-500' : 'text-emerald-500'}`} /> {item}
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
                    <h3 className="font-bold text-slate-900 text-lg">Where to Study</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {displayedRoadmap.universities.map((uni, i) => (
                      <div key={i} className="p-4 border rounded-xl hover:bg-slate-50 transition-colors bg-white">
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
                      <h4 className="font-bold text-slate-900">Recommended Mentors</h4>
                    </div>
                    <ul className="space-y-4">
                      {displayedRoadmap.mentors.map((mentor, i) => (
                        <li key={i} className="flex flex-col text-sm border-b border-slate-200 pb-2 last:border-0 last:pb-0">
                          <span className="font-semibold text-slate-900">{mentor.type}</span>
                          <span className="text-slate-500">Contact via: <span className="text-blue-600">{mentor.contact_method}</span></span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Opportunities */}
                  <Card className="p-6 bg-slate-50 border-none">
                    <div className="flex items-center gap-2 mb-4">
                      <MapIcon className="w-5 h-5 text-slate-600" />
                      <h4 className="font-bold text-slate-900">Opportunities to Watch</h4>
                    </div>
                    <ul className="space-y-3">
                      {displayedRoadmap.opportunities.map((opp, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" /> {opp}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {/* 8. NEXT STEPS (ACTION ITEMS) */}
                <div className="bg-slate-900 text-slate-300 rounded-3xl p-8 sm:p-12 text-center space-y-6">
                  <h3 className="text-2xl font-bold text-white">Your Next Steps</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {displayedRoadmap.next_steps.map((step, i) => (
                      <div key={i} className="bg-slate-800 px-4 py-3 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors cursor-default border border-slate-700">
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
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 flex justify-center gap-4 z-50">
                  <Button variant="outline" size="lg" className="rounded-full px-8 font-semibold gap-2" onClick={handleSave}>
                    <Save className="w-4 h-4" /> Save
                  </Button>
                  <Button variant="ghost" size="lg" className="rounded-full px-4 text-slate-500">
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
              onLoad={(r) => { }} // Implement full load if necessary
              onDelete={(id) => { }} // Implement delete
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
