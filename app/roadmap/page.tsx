"use client"

import { useState } from "react"
import { experimental_useObject as useObject } from "@ai-sdk/react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map, Loader2, CheckCircle2, BookOpen, RefreshCw, AlertCircle, Download, Sparkles, Target, TrendingUp } from "lucide-react"
import { z } from "zod"
import { toast } from "sonner"

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

// Skeleton loader component
function RoadmapSkeleton() {
  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div className="text-center space-y-3">
        <div className="h-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg w-2/3 mx-auto animate-pulse" />
        <div className="h-4 bg-muted/50 rounded w-3/4 mx-auto animate-pulse" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 border-t-4 border-t-primary/30 shadow-lg animate-pulse">
            <div className="w-16 h-16 rounded-full bg-primary/10 mb-4" />
            <div className="h-6 bg-muted/50 rounded mb-3 w-3/4" />
            <div className="h-8 bg-secondary/10 rounded mb-4" />
            <div className="space-y-3">
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
  const [career, setCareer] = useState("")
  const [hasError, setHasError] = useState(false)
  const [lastCareer, setLastCareer] = useState("")

  const { object, submit, isLoading, error } = useObject({
    api: "/api/generate-roadmap",
    schema: roadmapSchema,
    onFinish: ({ object: result, error }) => {
      if (error) {
        setHasError(true)
        toast.error("Failed to generate roadmap", {
          description: error.message.includes("quota")
            ? "OpenAI API quota exceeded. Please check your API key credits."
            : "An error occurred while generating your roadmap. Please try again.",
          action: {
            label: "Retry",
            onClick: () => handleRetry(),
          },
        })
      } else if (result) {
        setHasError(false)
        toast.success("Roadmap generated successfully!", {
          description: `Your personalized ${lastCareer} roadmap is ready.`,
          icon: <Sparkles className="w-4 h-4" />,
        })
      }
    },
  })

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!career.trim()) {
      toast.error("Please enter a career", {
        description: "Tell us what career you're interested in pursuing.",
      })
      return
    }
    setHasError(false)
    setLastCareer(career)
    submit({ career })
  }

  const handleRetry = () => {
    if (lastCareer) {
      setHasError(false)
      submit({ career: lastCareer })
      toast.info("Retrying...", {
        description: "Generating your roadmap again.",
      })
    }
  }

  const handleRegenerate = () => {
    if (career.trim()) {
      setHasError(false)
      setLastCareer(career)
      submit({ career })
      toast.info("Regenerating roadmap...", {
        description: "Creating a fresh roadmap for you.",
      })
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        {/* Header with gradient background */}
        <div className="relative p-8 border-b overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 animate-gradient" />
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary backdrop-blur-sm border border-primary/20 shadow-lg">
                <Map className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Career Roadmap Generator
              </h1>
            </div>
            <p className="text-muted-foreground text-lg ml-14">
              Create a personalized 3-month plan to land your dream job in Sierra Leone 🇸🇱
            </p>
          </div>
        </div>

        <div className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-8">
          {/* Input Section with enhanced design */}
          <Card className="p-8 shadow-xl border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full relative">
                  <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    What is your Dream Career?
                  </label>
                  <Input
                    placeholder="e.g. Software Engineer, Civil Engineer, Accountant, Nurse..."
                    className="text-lg py-6 border-primary/20 focus:border-primary transition-all"
                    value={career}
                    onChange={(e) => setCareer(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto h-14 text-lg gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all"
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

              {/* Tips section */}
              <div className="flex items-start gap-2 p-4 rounded-lg bg-primary/5 border border-primary/10">
                <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Pro Tip</p>
                  <p className="text-muted-foreground">
                    Be specific with your career choice for the most relevant roadmap. Include specializations if applicable (e.g., "Frontend Developer" instead of just "Developer").
                  </p>
                </div>
              </div>
            </form>
          </Card>

          {/* Loading State */}
          {isLoading && <RoadmapSkeleton />}

          {/* Error State */}
          {hasError && error && !isLoading && (
            <Card className="p-8 border-destructive/50 bg-destructive/5">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-destructive/10">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
                  <p className="text-muted-foreground max-w-md">
                    {error.message.includes("quota")
                      ? "We've hit our API quota limit. Please try again later or contact support."
                      : "We couldn't generate your roadmap. This might be a temporary issue."}
                  </p>
                </div>
                <Button onClick={handleRetry} size="lg" variant="outline" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
              </div>
            </Card>
          )}

          {/* Results Section with enhanced design */}
          {object?.phases && !isLoading && !hasError && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
              {/* Title section with gradient */}
              <div className="text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 shadow-lg">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {object.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {object.overview}
                </p>
              </div>

              {/* Phase cards with enhanced styling */}
              <div className="grid md:grid-cols-3 gap-6 relative">
                {/* Connecting Line (Desktop) with gradient */}
                <div className="hidden md:block absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent -z-10" />

                {object.phases.map((phase, idx) => {
                  // Assign distinct colors to each phase
                  const phaseColors = [
                    { border: 'border-t-primary', bg: 'from-primary to-primary/70', icon: 'bg-primary/10 border-primary/20', text: 'text-primary' },
                    { border: 'border-t-chart-4', bg: 'from-chart-4 to-chart-4/70', icon: 'bg-chart-4/10 border-chart-4/20', text: 'text-chart-4' },
                    { border: 'border-t-accent', bg: 'from-accent to-accent/70', icon: 'bg-accent/10 border-accent/20', text: 'text-accent' },
                  ]
                  const colors = phaseColors[idx] || phaseColors[0]

                  return (
                    <Card
                      key={idx}
                      className={`group p-6 border-t-4 ${colors.border} shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:scale-[1.02]`}
                    >
                      {/* Phase number badge */}
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-4 mx-auto md:mx-0 shadow-lg relative z-10 group-hover:scale-110 transition-transform`}>
                        <span className="text-3xl font-bold text-primary-foreground">{idx + 1}</span>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-center md:text-left group-hover:text-primary transition-colors">
                        {phase?.name}
                      </h3>
                      <Badge variant="secondary" className="mb-4 w-full justify-center md:justify-start py-2 text-sm font-medium">
                        🎯 {phase?.goal}
                      </Badge>

                      <div className="space-y-4">
                        {/* Steps section */}
                        <div className={`${colors.icon} rounded-lg p-4 border`}>
                          <h4 className={`font-semibold text-sm ${colors.text} mb-3 uppercase tracking-wider flex items-center gap-2`}>
                            <CheckCircle2 className="w-4 h-4" /> Action Steps
                          </h4>
                          <ul className="space-y-2.5 text-sm">
                            {phase?.steps?.map((step, sIdx) => (
                              <li key={sIdx} className="flex gap-2 items-start group/item">
                                <span className={`w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')} mt-1.5 flex-shrink-0 group-hover/item:scale-125 transition-transform`} />
                                <span className="leading-snug text-foreground/90">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Resources section */}
                        {phase?.resources && phase.resources.length > 0 && (
                          <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/20">
                            <h4 className="font-semibold text-sm text-secondary-foreground mb-3 flex items-center gap-2">
                              <BookOpen className="w-4 h-4" /> Resources
                            </h4>
                            <ul className="space-y-1.5 text-xs text-muted-foreground">
                              {phase.resources.map((res, rIdx) => (
                                <li key={rIdx} className="flex gap-1.5 items-start">
                                  <span className="text-secondary">•</span>
                                  <span>{res}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.print()}
                  className="gap-2 hover:bg-primary/5 hover:border-primary transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download as PDF
                </Button>
                <Button
                  size="lg"
                  onClick={handleRegenerate}
                  className="gap-2 bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70"
                >
                  <RefreshCw className="w-5 h-5" />
                  Generate New Roadmap
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
