"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map, Loader2, CheckCircle2, BookOpen, RefreshCw, AlertCircle, Download, Sparkles, Target, TrendingUp, Save, LayoutList } from "lucide-react"
import { z } from "zod"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { RoadmapHistory } from "@/components/roadmap-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define the schema type for TypeScript intellisense (matching the API)
const roadmapSchema = z.object({
  title: z.string(),
  overview: z.string(),
  phases: z.array(z.object({
    name: z.string(),
    goal: z.string(),
    steps: z.array(z.string()),
    resources: z.array(z.string()),
  })),
})

type RoadmapData = z.infer<typeof roadmapSchema>

// Skeleton loader component
function RoadmapSkeleton() {
  return (
    <div className="animate-in fade-in duration-500 space-y-6 sm:space-y-8">
      <div className="text-center space-y-3">
        <div className="h-6 sm:h-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg w-2/3 mx-auto animate-pulse" />
        <div className="h-4 bg-muted/50 rounded w-3/4 mx-auto animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 sm:p-5 md:p-6 border-t-4 border-t-primary/30 shadow-lg animate-pulse">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 mb-3 sm:mb-4" />
            <div className="h-5 sm:h-6 bg-muted/50 rounded mb-3 w-3/4" />
            <div className="h-6 sm:h-8 bg-secondary/10 rounded mb-3 sm:mb-4" />
            <div className="space-y-2 sm:space-y-3">
              <div className="h-4 bg-muted/30 rounded w-full" />
              <div className="h-4 bg-muted/30 rounded w-5/6" />
              <div className="h-4 bg-muted/30 rounded w-4/6" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function RoadmapPage() {
  const { user, session } = useAuth()
  const [career, setCareer] = useState("")
  const [hasError, setHasError] = useState(false)
  const [lastCareer, setLastCareer] = useState("")
  const [activeTab, setActiveTab] = useState("generator")
  const [savedRoadmaps, setSavedRoadmaps] = useState<any[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [displayedRoadmap, setDisplayedRoadmap] = useState<RoadmapData | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Manual fetch state
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Fetch history on mount
  useEffect(() => {
    if (session?.access_token) {
      setLoadingHistory(true)
      fetch('/api/roadmaps', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setSavedRoadmaps(data)
        })
        .catch(err => console.error("Failed to load history", err))
        .finally(() => setLoadingHistory(false))
    }
  }, [session])

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!career.trim()) {
      toast.error("Please enter a career")
      return
    }

    setHasError(false)
    setError(null)
    setLastCareer(career)
    setDisplayedRoadmap(null)
    setActiveTab("generator")
    setIsLoading(true)

    try {
      console.log("Sending request for:", career);
      const res = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ career })
      })

      // Read as text first to avoid crashing on empty/invalid JSON
      const text = await res.text();
      console.log("Raw Server Response:", text.substring(0, 500));

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("JSON PARSE ERROR:", e);
        throw new Error(`Server returned invalid response: ${text.substring(0, 100)}...`);
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to generate roadmap")
      }

      // Basic validation
      if (!data.phases || !Array.isArray(data.phases)) {
        throw new Error("Invalid roadmap format received")
      }

      setDisplayedRoadmap(data as RoadmapData)
      toast.success("Roadmap generated successfully!", {
        description: `Your personalized ${career} roadmap is ready.`,
        icon: <Sparkles className="w-4 h-4" />,
      })

    } catch (err: any) {
      console.error("Generation error:", err)
      setHasError(true)
      setError(err)
      toast.error("Failed to generate roadmap", {
        description: err.message || "An error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    if (lastCareer) {
      setCareer(lastCareer)
      setHasError(false)
      setError(null)
      setDisplayedRoadmap(null)
      setIsLoading(true)

      fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ career: lastCareer })
      })
        .then(async res => {
          const text = await res.text();
          try {
            const data = JSON.parse(text);
            if (!res.ok) throw new Error(data.message);
            return data;
          } catch (e) {
            throw new Error(`Server error: ${text.substring(0, 100)}`);
          }
        })
        .then(data => {
          setDisplayedRoadmap(data)
          toast.success("Roadmap generated!")
        })
        .catch(err => {
          setHasError(true)
          setError(err)
          toast.error("Retry failed")
        })
        .finally(() => setIsLoading(false))
    }
  }

  const handleRegenerate = () => {
    if (career.trim()) {
      setHasError(false)
      setError(null)
      setDisplayedRoadmap(null)
      setLastCareer(career)
      setIsLoading(true)
      toast.info("Regenerating roadmap...")

      fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ career })
      })
        .then(async res => {
          const text = await res.text();
          try {
            const data = JSON.parse(text);
            if (!res.ok) throw new Error(data.message);
            return data;
          } catch (e) {
            throw new Error(`Server error: ${text.substring(0, 100)}`);
          }
        })
        .then(data => {
          setDisplayedRoadmap(data)
          toast.success("New roadmap ready!")
        })
        .catch(err => {
          setHasError(true)
          setError(err)
          toast.error("Regeneration failed")
        })
        .finally(() => setIsLoading(false))
    }
  }

  const handleSave = async () => {
    if (!session) {
      toast.error("Please sign in to save roadmaps")
      return
    }
    if (!displayedRoadmap) return

    setIsSaving(true)
    try {
      const res = await fetch('/api/roadmaps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          career: lastCareer || displayedRoadmap.title.split('for ')[1] || "Career",
          title: displayedRoadmap.title,
          overview: displayedRoadmap.overview,
          phases: displayedRoadmap.phases
        })
      })

      if (!res.ok) throw new Error('Failed to save')

      const savedMap = await res.json()
      setSavedRoadmaps([savedMap, ...savedRoadmaps])
      toast.success("Roadmap saved!")
    } catch (err) {
      toast.error("Failed to save roadmap")
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLoad = (map: any) => {
    setDisplayedRoadmap({
      title: map.title,
      overview: map.overview,
      phases: map.phases
    })
    setCareer(map.career)
    setLastCareer(map.career)
    setActiveTab("generator")
    window.scrollTo({ top: 0, behavior: 'smooth' })
    toast.success("Roadmap loaded from history")
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this roadmap?")) return
    try {
      const res = await fetch(`/api/roadmaps?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${session?.access_token}` }
      })
      if (!res.ok) throw new Error('Failed to delete')

      setSavedRoadmaps(savedRoadmaps.filter(m => m.id !== id))
      toast.success("Roadmap deleted")
    } catch (err) {
      toast.error("Failed to delete roadmap")
    }
  }

  // Determine what to show
  const roadmapToShow = displayedRoadmap

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="relative p-4 sm:p-6 md:p-8 border-b overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 animate-gradient" />
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-secondary backdrop-blur-sm border border-primary/20 shadow-lg">
                <Map className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Career Roadmap Generator
              </h1>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground ml-0 sm:ml-11 md:ml-14">
              Create a personalized 3-month plan to land your dream job in Sierra Leone 🇸🇱
            </p>
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-6 sm:space-y-8">

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
              <TabsTrigger value="generator" className="gap-2 text-xs sm:text-sm"><Sparkles className="w-4 h-4" /> Generator</TabsTrigger>
              <TabsTrigger value="history" className="gap-2 text-xs sm:text-sm"><LayoutList className="w-4 h-4" /> History ({savedRoadmaps.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="generator" className="space-y-6 sm:space-y-8">
              {/* Input Section */}
              <Card className="p-4 sm:p-6 md:p-8 shadow-xl border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <form onSubmit={handleGenerate} className="space-y-4">
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="flex-1 w-full relative">
                      <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        What is your Dream Career?
                      </label>
                      <Input
                        placeholder="e.g. Software Engineer, Civil Engineer..."
                        className="text-base sm:text-lg py-4 sm:py-6 border-primary/20 focus:border-primary transition-all h-12 sm:h-auto touch-target"
                        value={career}
                        onChange={(e) => setCareer(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 sm:h-14 text-base sm:text-lg gap-2 touch-target"
                      disabled={isLoading || !career}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Generate Plan
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Loading State */}
              {isLoading && <RoadmapSkeleton />}

              {/* Error State */}
              {hasError && error && !isLoading && (
                <Card className="p-8 border-destructive/50 bg-destructive/5">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <AlertCircle className="w-8 h-8 text-destructive" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
                      <p className="text-muted-foreground max-w-md">
                        {error.message || "Failed to generate roadmap."}
                      </p>
                    </div>
                    <Button onClick={handleRetry} size="lg" variant="outline" className="gap-2">
                      <RefreshCw className="w-4 h-4" /> Try Again
                    </Button>
                  </div>
                </Card>
              )}

              {/* Results Section */}
              {roadmapToShow?.phases && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
                  <div className="text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 shadow-lg">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      {roadmapToShow.title}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      {roadmapToShow.overview}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative">
                    <div className="hidden lg:block absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent -z-10" />
                    {roadmapToShow.phases.map((phase: any, idx: number) => {
                      const colors = [
                        { border: 'border-t-primary', bg: 'from-primary/10 to-primary/5', text: 'text-primary' },
                        { border: 'border-t-chart-4', bg: 'from-chart-4/10 to-chart-4/5', text: 'text-chart-4' },
                        { border: 'border-t-accent', bg: 'from-accent/10 to-accent/5', text: 'text-accent' },
                      ][idx] || { border: 'border-t-primary', bg: 'bg-primary/5', text: 'text-primary' }

                      return (
                        <Card key={idx} className={`p-4 sm:p-5 md:p-6 border-t-4 ${colors.border} shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${colors.bg}`}>
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${colors.text.replace('text-', 'bg-')}/20 flex items-center justify-center mb-3 sm:mb-4`}>
                            <span className={`text-lg sm:text-xl font-bold ${colors.text}`}>{idx + 1}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{phase?.name}</h3>
                          <Badge variant="outline" className="mb-3 sm:mb-4 text-xs">{phase?.goal}</Badge>
                          <div className="space-y-3 sm:space-y-4">
                            <ul className="space-y-2 text-sm">
                              {phase?.steps?.map((step: string, sIdx: number) => (
                                <li key={sIdx} className="flex gap-2 items-start">
                                  <CheckCircle2 className={`w-4 h-4 mt-0.5 ${colors.text} flex-shrink-0`} />
                                  <span className="leading-relaxed">{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Card>
                      )
                    })}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 pt-6 sm:pt-8">
                    <Button variant="outline" size="lg" onClick={() => window.print()} className="gap-2 touch-target w-full sm:w-auto">
                      <Download className="w-5 h-5" /> Download PDF
                    </Button>

                    {!isLoading && user && (
                      <Button
                        size="lg"
                        variant="secondary"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="gap-2 touch-target w-full sm:w-auto"
                      >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save to History
                      </Button>
                    )}

                    <Button size="lg" onClick={handleRegenerate} className="gap-2 touch-target w-full sm:w-auto">
                      <RefreshCw className="w-5 h-5" /> New Roadmap
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history">
              {user ? (
                <RoadmapHistory
                  roadmaps={savedRoadmaps}
                  isLoading={loadingHistory}
                  onLoad={handleLoad}
                  onDelete={handleDelete}
                />
              ) : (
                <div className="text-center p-12 border rounded-lg bg-muted/20">
                  <h3 className="font-semibold text-lg mb-2">Sign in to save roadmaps</h3>
                  <p className="text-muted-foreground mb-4">Create an account to track your career journey.</p>
                  <Button asChild>
                    <a href="/login">Sign In / Sign Up</a>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </DashboardLayout>
  )
}
