"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { sampleRoadmap, sampleCareers } from "@/lib/sample-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, TrendingUp, DollarSign, Users, Loader2, GraduationCap, Laptop, ExternalLink, Briefcase, UserCheck } from "lucide-react"
import Image from "next/image"
import { MOCK_MENTORS } from "@/lib/mentors"

interface EducationalPath {
  name: string
  institution: string
  type: string
  cost: string
  url: string
}

interface Career {
  id: string
  title: string
  description: string
  skills: string[]
  salary: string
  demand: string
  category: string
  imageUrl: string
  educational_paths?: EducationalPath[]
}

export default function CareerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [career, setCareer] = useState<Career | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCareer() {
      try {
        setLoading(true)
        // Mock network delay
        await new Promise(resolve => setTimeout(resolve, 800))
        // Import real data
        const { SIERRA_LEONE_CAREERS } = await import("@/lib/career-data")

        // Find career by ID (which is index + 1)
        const careerIndex = parseInt(resolvedParams.id) - 1;
        const foundCareer = (careerIndex >= 0 && careerIndex < SIERRA_LEONE_CAREERS.length)
          ? SIERRA_LEONE_CAREERS[careerIndex]
          : null;

        if (foundCareer) {
          setCareer({
            id: resolvedParams.id,
            title: foundCareer.title,
            description: foundCareer.description,
            skills: foundCareer.requiredSkills || [],
            salary: foundCareer.salaryUSD,
            demand: foundCareer.demand,
            category: foundCareer.industry,
            imageUrl: "/placeholder.svg", // Fallback image logic can be added later
            educational_paths: foundCareer.localInstitutions.map(inst => ({
              name: inst,
              institution: inst,
              type: 'Local',
              cost: 'Varies',
              url: '#'
            }))
          })
        } else {
          setError("Career not found")
        }
      } catch (err) {
        console.error("Error fetching career details:", err)
        setError("Could not load career details.")
      } finally {
        setLoading(false)
      }
    }

    if (resolvedParams.id) {
      fetchCareer()
    }
  }, [resolvedParams.id])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !career) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Career Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || "The requested career could not be found."}</p>
            <Link href="/careers">
              <Button>Back to Careers</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const demandColor: Record<string, string> = {
    High: "bg-secondary text-secondary-foreground",
    Medium: "bg-accent text-accent-foreground",
    Low: "bg-muted text-muted-foreground",
  }

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/careers">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Careers
            </Button>
          </Link>

          {/* Hero Section */}
          <div className="relative h-64 w-full rounded-lg overflow-hidden mb-8 bg-muted">
            <Image
              src={career.imageUrl || "/placeholder.svg"}
              alt={career.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-4xl font-bold">{career.title}</h1>
                <Badge className={demandColor[career.demand] || "bg-primary text-primary-foreground"} variant="secondary">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {career.demand} Demand
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">{career.description}</p>
            </div>

            {/* Tabs Interface */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="salary">Salary</TabsTrigger>
                <TabsTrigger value="pathway">Pathway</TabsTrigger>
                <TabsTrigger value="mentors">Mentors</TabsTrigger>
                <TabsTrigger value="jobs">Job Market</TabsTrigger>
              </TabsList>

              {/* OVERVIEW TAB */}
              <TabsContent value="overview" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Career</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {career.description}
                    </p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Category</p>
                          <p className="font-semibold text-lg">{career.category}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Demand Level</p>
                          <p className="font-semibold text-lg">{career.demand}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* SKILLS TAB */}
              <TabsContent value="skills" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Required Skills</CardTitle>
                    <CardDescription>Key competencies you'll need to master</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill) => (
                        <Badge key={skill} className="text-sm px-4 py-2" variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* SALARY TAB */}
              <TabsContent value="salary" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Salary Expectations</CardTitle>
                    <CardDescription>Typical earnings in Sierra Leone</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <DollarSign className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Average Salary Range</p>
                        <p className="text-3xl font-bold">{career.salary}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      * Salaries vary based on experience, location (Freetown vs Provinces), and employer type (Government, NGO, Private Sector).
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* PATHWAY TAB */}
              <TabsContent value="pathway" className="space-y-6 mt-6">
                {/* Educational Pathways */}
                {career.educational_paths && career.educational_paths.length > 0 && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-primary flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        Where to Study
                      </CardTitle>
                      <CardDescription>Recommended universities in Sierra Leone & trusted online courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {career.educational_paths.map((path, index) => (
                          <div key={index} className="bg-background rounded-lg p-4 border flex items-start justify-between gap-3 shadow-sm">
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${path.type === 'Online' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                {path.type === 'Online' ? <Laptop className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm">{path.name}</h4>
                                <p className="text-xs text-muted-foreground">{path.institution}</p>
                                <Badge variant="outline" className="mt-2 text-[10px] h-5">
                                  {path.cost}
                                </Badge>
                              </div>
                            </div>
                            {path.url && (
                              <a href={path.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Roadmap Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Career Roadmap Preview</CardTitle>
                    <CardDescription>Sample learning path for {career.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sampleRoadmap.slice(0, 4).map((task, index) => (
                        <div key={task.id} className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-muted-foreground">{task.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link href="/roadmap">
                      <Button className="w-full mt-6 gap-2">
                        <BookOpen className="w-4 h-4" />
                        View Full Roadmap
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* MENTORS TAB */}
              <TabsContent value="mentors" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Mentors</CardTitle>
                    <CardDescription>Connect with leaders in the {career.category} field</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {MOCK_MENTORS.filter(m => m.field === career.category || m.field === "Technology").slice(0, 2).map((mentor) => (
                        <Card key={mentor.id} className="overflow-hidden border-slate-100 hover:border-primary/20 transition-all cursor-pointer group">
                          <div className="p-4 flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 shrink-0">
                              <Image src={mentor.image_url} alt={mentor.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-900 truncate">{mentor.name}</h4>
                              <p className="text-xs text-slate-500 truncate">{mentor.role}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-[9px] h-4 uppercase tracking-tighter bg-primary/5 text-primary">
                                  {mentor.availability}
                                </Badge>
                                <span className="text-[9px] text-slate-400 font-bold">{mentor.experience} Exp</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-slate-50 p-3 border-t border-slate-100 flex justify-between items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expert Guidance</span>
                            <Link href="/mentorship" className="block">
                              <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase text-primary hover:text-primary hover:bg-white">
                                Connect <UserCheck className="w-3 h-3 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </Card>
                      ))}
                    </div>
                    {MOCK_MENTORS.filter(m => m.field === career.category || m.field === "Technology").length === 0 && (
                      <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed">
                        <p className="text-sm text-slate-500 font-medium">No specific mentors for this field yet. Connect with our tech leads for general guidance.</p>
                        <Link href="/mentorship">
                          <Button variant="link" className="text-primary font-bold">See all mentors</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* JOBS TAB */}
              <TabsContent value="jobs" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Job Market</CardTitle>
                    <CardDescription>Opportunities available now</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-10">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Find Jobs in {career.category}</h3>
                    <p className="text-muted-foreground mb-6">Browse active listings tailored to this career path.</p>
                    <Link href="/jobs">
                      <Button>Browse Jobs</Button>
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/roadmap" className="flex-1">
                <Button className="w-full" size="lg">
                  Start Learning Path
                </Button>
              </Link>
              <Link href="/cv-builder" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  Build Your CV
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
