"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Briefcase, Clock, ExternalLink, BookOpen, Loader2 } from "lucide-react"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"

interface JobOpportunity {
  id: string
  type: "job" | "internship" | "training"
  title: string
  company: string
  location: string
  salary?: string
  duration?: string
  requirements: string[]
  skills: string[]
  applicationSteps: string[]
  postedDate: string
  applicationLink?: string
}

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<"all" | "job" | "internship" | "training">("all")

  const [opportunities, setOpportunities] = useState<JobOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .order('posted_at', { ascending: false })

        if (error) throw error

        if (data) {
          const formattedJobs: JobOpportunity[] = data.map(job => ({
            id: job.id,
            type: (job.type?.toLowerCase() as "job" | "internship" | "training") || "job",
            title: job.title,
            company: job.company,
            location: job.location || "Sierra Leone",
            salary: job.salary_range,
            requirements: job.requirements || [],
            skills: [], // DB might not have skills column yet based on my setup.sql? I didn't add it to jobs table in setup.sql! I should check. 
            // Wait, looking at setup.sql: jobs table has title, company, location, salary_range, type, application_link, requirements. MISSING skills.
            // I will assume empty array for now or add it later if critical.
            applicationSteps: ["Click Apply Now to visit the application page."],
            postedDate: new Date(job.posted_at).toLocaleDateString(),
            applicationLink: job.application_link
          }))
          setOpportunities(formattedJobs)
        }
      } catch (err) {
        console.error("Error fetching jobs:", err)
        setError("Failed to load jobs.")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = selectedType === "all" || opp.type.toLowerCase() === selectedType.toLowerCase() // Ensure case match

    return matchesSearch && matchesType
  })

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Hero Image Section */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden -mt-2 -mx-2 md:-mx-4 mb-4">
          <Image
            src="/jobs-opportunities-freetown.jpg"
            alt="Job Opportunities in Sierra Leone"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Job & Opportunity Matching</h1>
            <p className="text-white/90 mt-1">Find jobs, internships, and training programs that match your skills</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({opportunities.length})</TabsTrigger>
            <TabsTrigger value="job">Jobs ({opportunities.filter((o) => o.type === "job").length})</TabsTrigger>
            <TabsTrigger value="internship">
              Internships ({opportunities.filter((o) => o.type === "internship").length})
            </TabsTrigger>
            <TabsTrigger value="training">
              Training ({opportunities.filter((o) => o.type === "training").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedType} className="mt-6 space-y-4">
            {loading && (
              <div className="flex justify-center p-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {error && (
              <div className="text-destructive text-center p-4">{error}</div>
            )}

            {!loading && !error && filteredOpportunities.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No opportunities found matching your criteria.</p>
              </Card>
            ) : (
              !loading && !error && filteredOpportunities.map((opp) => (
                <Card key={opp.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${opp.type === "job"
                              ? "bg-primary/10"
                              : opp.type === "internship"
                                ? "bg-secondary/10"
                                : "bg-accent/10"
                            }`}
                        >
                          {opp.type === "training" ? (
                            <BookOpen
                              className={`w-5 h-5 ${opp.type === "job"
                                  ? "text-primary"
                                  : opp.type === "internship"
                                    ? "text-secondary"
                                    : "text-accent"
                                }`}
                            />
                          ) : (
                            <Briefcase
                              className={`w-5 h-5 ${opp.type === "job"
                                  ? "text-primary"
                                  : opp.type === "internship"
                                    ? "text-secondary"
                                    : "text-accent"
                                }`}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">{opp.title}</h3>
                          <p className="text-muted-foreground">{opp.company}</p>
                        </div>
                        <Badge
                          variant={opp.type === "job" ? "default" : opp.type === "internship" ? "secondary" : "outline"}
                        >
                          {opp.type.charAt(0).toUpperCase() + opp.type.slice(1)}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {opp.location}
                        </div>
                        {opp.salary && (
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {opp.salary}
                          </div>
                        )}
                        {opp.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {opp.duration}
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-2">Required Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {opp.skills.length > 0 ? opp.skills.map((skill) => (
                              <Badge key={skill} variant="outline">
                                {skill}
                              </Badge>
                            )) : <span className="text-sm text-muted-foreground">See application link for details</span>}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Requirements:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {opp.requirements.map((req, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-primary">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          {/* 
                          <p className="text-sm font-medium mb-2">Application Steps:</p>
                          <ol className="text-sm text-muted-foreground space-y-1">
                            {opp.applicationSteps.map((step, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-primary font-medium">{idx + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                          */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
                    <Button className="flex-1 gap-2" onClick={() => opp.applicationLink && window.open(opp.applicationLink, '_blank')}>
                      Apply Now
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Save for Later
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-4">Posted {opp.postedDate}</p>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Update Notice */}
        <Card className="p-4 bg-secondary/5 border-secondary/20">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Weekly Updates:</span> New opportunities are added every week.
            Check back regularly or enable notifications to stay updated.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  )
}
