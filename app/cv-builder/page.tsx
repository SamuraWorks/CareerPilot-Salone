"use client"
import { useState, useRef } from "react"
import type React from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Download, Eye, Upload, User } from "lucide-react"
import Image from "next/image"

interface Education {
  id: string
  school: string
  degree: string
  field: string
  startYear: string
  endYear: string
  gpa?: string
}

interface Experience {
  id: string
  company: string
  position: string
  description: string
  startDate: string
  endDate: string
  current: boolean
}

interface Project {
  id: string
  name: string
  description: string
  technologies: string
  url?: string
}

interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url?: string
}

export default function CVBuilderPage() {
  const { user } = useAuth()
  const [showPreview, setShowPreview] = useState(true)
  const [profilePhoto, setProfilePhoto] = useState<string>("")
  const cvPreviewRef = useRef<HTMLDivElement>(null)

  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.name || "",
    title: "",
    email: user?.email || "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
    github: "",
    summary: "",
  })

  const [education, setEducation] = useState<Education[]>([
    { id: "1", school: "", degree: "", field: "", startYear: "", endYear: "", gpa: "" },
  ])

  const [experience, setExperience] = useState<Experience[]>([
    { id: "1", company: "", position: "", description: "", startDate: "", endDate: "", current: false },
  ])

  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "", description: "", technologies: "", url: "" },
  ])

  const [certifications, setCertifications] = useState<Certification[]>([
    { id: "1", name: "", issuer: "", date: "", url: "" },
  ])

  const [skills, setSkills] = useState("")
  const [languages, setLanguages] = useState("")

  const addEducation = () => {
    setEducation([
      ...education,
      { id: Date.now().toString(), school: "", degree: "", field: "", startYear: "", endYear: "", gpa: "" },
    ])
  }

  const removeEducation = (id: string) => {
    if (education.length > 1) {
      setEducation(education.filter((e) => e.id !== id))
    }
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map((e) => (e.id === id ? { ...e, [field]: value } : e)))
  }

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        id: Date.now().toString(),
        company: "",
        position: "",
        description: "",
        startDate: "",
        endDate: "",
        current: false,
      },
    ])
  }

  const removeExperience = (id: string) => {
    if (experience.length > 1) {
      setExperience(experience.filter((e) => e.id !== id))
    }
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperience(experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)))
  }

  const addProject = () => {
    setProjects([...projects, { id: Date.now().toString(), name: "", description: "", technologies: "", url: "" }])
  }

  const removeProject = (id: string) => {
    if (projects.length > 1) {
      setProjects(projects.filter((p) => p.id !== id))
    }
  }

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const addCertification = () => {
    setCertifications([...certifications, { id: Date.now().toString(), name: "", issuer: "", date: "", url: "" }])
  }

  const removeCertification = (id: string) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter((c) => c.id !== id))
    }
  }

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setCertifications(certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = async () => {
    if (!cvPreviewRef.current) return

    const element = cvPreviewRef.current
    const originalStyle = element.style.cssText

    // Optimize for print
    element.style.width = '210mm' // A4 width
    element.style.minHeight = '297mm' // A4 height
    element.style.padding = '20px'
    element.style.backgroundColor = 'white'

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true, // For images
        logging: false
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)

      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0 // Top align

      // If content is very long, handle pagination (basic version just fits or cuts)
      // For MVP, we scale to fit one page or add simple splitting logic if needed. 
      // simple approach:
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, (imgHeight * pdfWidth) / imgWidth)

      pdf.save(`CV_${personalInfo.fullName.replace(/\s+/g, '_') || 'CareerPilot'}.pdf`)
    } catch (err) {
      console.error("PDF generation failed", err)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      element.style.cssText = originalStyle
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="relative h-32 rounded-lg overflow-hidden mb-4">
          <Image src="/cv-builder-professional.jpg" alt="CV Builder" fill className="object-cover brightness-75" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-1">Professional CV Builder</h1>
              <p className="text-sm">Create an ATS-friendly, modern CV with industry-standard format</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="gap-2">
            <Eye className="w-4 h-4" />
            {showPreview ? "Hide" : "Show"} Preview
          </Button>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="extras">Extras</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your contact details and professional links</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Profile Photo (Optional)</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
                          {profilePhoto ? (
                            <img
                              src={profilePhoto || "/placeholder.svg"}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-12 h-12 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <Label htmlFor="photo-upload" className="cursor-pointer">
                            <Button type="button" variant="outline" className="gap-2 bg-transparent" asChild>
                              <span>
                                <Upload className="w-4 h-4" />
                                Upload Photo
                              </span>
                            </Button>
                          </Label>
                          <p className="text-xs text-muted-foreground mt-2">
                            Recommended: Professional headshot, 400x400px
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={personalInfo.fullName}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title *</Label>
                      <Input
                        id="title"
                        value={personalInfo.title}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                        placeholder="Software Developer | Primary School Teacher | Marketing Specialist"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                          placeholder="+232 XX XXX XXXX"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                        placeholder="Freetown, Sierra Leone"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                        placeholder="linkedin.com/in/yourprofile"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Portfolio/Website</Label>
                      <Input
                        id="portfolio"
                        value={personalInfo.portfolio}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, portfolio: e.target.value })}
                        placeholder="www.yourwebsite.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub Profile</Label>
                      <Input
                        id="github"
                        value={personalInfo.github}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                        placeholder="github.com/yourusername"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="summary">Professional Summary *</Label>
                      <Textarea
                        id="summary"
                        rows={5}
                        value={personalInfo.summary}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                        placeholder="Write a compelling 3-4 sentence summary highlighting your expertise, experience, and career goals. Focus on your unique value proposition and key achievements."
                      />
                      <p className="text-xs text-muted-foreground">Keep it concise: 50-100 words</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Work Experience */}
              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Work Experience</CardTitle>
                        <CardDescription>List your roles in reverse chronological order</CardDescription>
                      </div>
                      <Button onClick={addExperience} size="sm" className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {experience.map((exp, index) => (
                      <div key={exp.id} className="space-y-4 pb-6 border-b border-border last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Position #{index + 1}</h4>
                          {experience.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExperience(exp.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Job Title *</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                            placeholder="Senior Software Developer"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Company Name *</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            placeholder="Tech Innovations Ltd."
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Date *</Label>
                            <Input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                              disabled={exp.current}
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`current-${exp.id}`}
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor={`current-${exp.id}`} className="cursor-pointer">
                            I currently work here
                          </Label>
                        </div>

                        <div className="space-y-2">
                          <Label>Key Responsibilities & Achievements *</Label>
                          <Textarea
                            rows={5}
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                            placeholder="• Developed and maintained web applications using React and Node.js&#10;• Led a team of 5 developers in agile environment&#10;• Improved application performance by 40%&#10;• Implemented automated testing reducing bugs by 30%"
                          />
                          <p className="text-xs text-muted-foreground">
                            Use bullet points (•) to highlight achievements with measurable results
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education */}
              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Education</CardTitle>
                        <CardDescription>Your academic qualifications</CardDescription>
                      </div>
                      <Button onClick={addEducation} size="sm" className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {education.map((edu, index) => (
                      <div key={edu.id} className="space-y-4 pb-6 border-b border-border last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Education #{index + 1}</h4>
                          {education.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEducation(edu.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Institution Name *</Label>
                          <Input
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                            placeholder="University of Sierra Leone"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Degree/Qualification *</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                              placeholder="Bachelor of Science"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Field of Study *</Label>
                            <Input
                              value={edu.field}
                              onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                              placeholder="Computer Science"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Start Year *</Label>
                            <Input
                              value={edu.startYear}
                              onChange={(e) => updateEducation(edu.id, "startYear", e.target.value)}
                              placeholder="2018"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Year *</Label>
                            <Input
                              value={edu.endYear}
                              onChange={(e) => updateEducation(edu.id, "endYear", e.target.value)}
                              placeholder="2022"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>GPA (Optional)</Label>
                            <Input
                              value={edu.gpa}
                              onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                              placeholder="3.8/4.0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills */}
              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Languages</CardTitle>
                    <CardDescription>Your technical and soft skills</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="skills">Professional Skills *</Label>
                      <Textarea
                        id="skills"
                        rows={6}
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="Enter skills separated by commas:&#10;&#10;Technical: JavaScript, React, Node.js, Python, SQL, AWS&#10;Soft Skills: Leadership, Communication, Problem Solving, Team Collaboration&#10;Tools: Git, Docker, Jira, Figma"
                      />
                      <p className="text-xs text-muted-foreground">
                        Separate each skill with a comma. List most relevant skills first.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="languages">Languages</Label>
                      <Textarea
                        id="languages"
                        rows={3}
                        value={languages}
                        onChange={(e) => setLanguages(e.target.value)}
                        placeholder="English (Native), Krio (Fluent), French (Intermediate)"
                      />
                      <p className="text-xs text-muted-foreground">Include proficiency level for each language</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Projects</CardTitle>
                        <CardDescription>Showcase your portfolio and key projects</CardDescription>
                      </div>
                      <Button onClick={addProject} size="sm" className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {projects.map((project, index) => (
                      <div key={project.id} className="space-y-4 pb-6 border-b border-border last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Project #{index + 1}</h4>
                          {projects.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProject(project.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Project Name</Label>
                          <Input
                            value={project.name}
                            onChange={(e) => updateProject(project.id, "name", e.target.value)}
                            placeholder="E-Commerce Platform"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            rows={3}
                            value={project.description}
                            onChange={(e) => updateProject(project.id, "description", e.target.value)}
                            placeholder="Built a full-stack e-commerce platform serving 10,000+ users. Implemented payment integration, inventory management, and real-time notifications."
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Technologies Used</Label>
                          <Input
                            value={project.technologies}
                            onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                            placeholder="React, Node.js, MongoDB, Stripe API"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Project URL (Optional)</Label>
                          <Input
                            value={project.url}
                            onChange={(e) => updateProject(project.id, "url", e.target.value)}
                            placeholder="https://github.com/yourusername/project"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="extras">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Certifications & Awards</CardTitle>
                        <CardDescription>Professional certifications and recognitions</CardDescription>
                      </div>
                      <Button onClick={addCertification} size="sm" className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {certifications.map((cert, index) => (
                      <div key={cert.id} className="space-y-4 pb-6 border-b border-border last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Certification #{index + 1}</h4>
                          {certifications.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCertification(cert.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Certification Name</Label>
                          <Input
                            value={cert.name}
                            onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                            placeholder="AWS Certified Solutions Architect"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Issuing Organization</Label>
                          <Input
                            value={cert.issuer}
                            onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                            placeholder="Amazon Web Services"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Date Obtained</Label>
                          <Input
                            type="month"
                            value={cert.date}
                            onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Credential URL (Optional)</Label>
                          <Input
                            value={cert.url}
                            onChange={(e) => updateCertification(cert.id, "url", e.target.value)}
                            placeholder="https://credential-url.com/your-cert"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* CV Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-6 h-fit">
              <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
                <CardHeader className="bg-muted/30 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-sm font-semibold">Live Preview</CardTitle>
                      <CardDescription className="text-xs">Updates automatically as you type</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 min-h-[800px] flex flex-row" ref={cvPreviewRef} style={{ backgroundColor: '#ffffff' }}>

                  {/* LEFT SIDEBAR - Dark Navy */}
                  <div className="w-[33%] p-6 flex flex-col gap-6 shrink-0" style={{ backgroundColor: '#1e3a8a', color: '#ffffff' }}>

                    {/* Profile Photo */}
                    <div className="flex justify-center mb-2">
                      {profilePhoto ? (
                        <div className="w-32 h-32 rounded-full overflow-hidden" style={{ border: '4px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                          <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover object-top" />
                        </div>
                      ) : (
                        <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '4px solid rgba(255,255,255,0.2)' }}>
                          <User className="w-16 h-16" style={{ color: 'rgba(255,255,255,0.5)' }} />
                        </div>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4 text-sm">
                      <h3 className="font-bold uppercase tracking-widest text-xs mb-3" style={{ color: '#93c5fd', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px' }}>Contact</h3>

                      {personalInfo.email && (
                        <div className="break-all">
                          <div className="text-[10px] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Email</div>
                          <div className="font-medium">{personalInfo.email}</div>
                        </div>
                      )}
                      {personalInfo.phone && (
                        <div>
                          <div className="text-[10px] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Phone</div>
                          <div className="font-medium">{personalInfo.phone}</div>
                        </div>
                      )}
                      {personalInfo.location && (
                        <div>
                          <div className="text-[10px] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Location</div>
                          <div className="font-medium">{personalInfo.location}</div>
                        </div>
                      )}
                    </div>

                    {/* Skills */}
                    {(skills || languages) && (
                      <div className="space-y-4">
                        <h3 className="font-bold uppercase tracking-widest text-xs mb-3" style={{ color: '#93c5fd', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px' }}>Skills</h3>
                        {skills && (
                          <div className="mb-4">
                            <div className="text-[10px] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Technical</div>
                            <div className="flex flex-wrap gap-2">
                              {skills.split(',').map((skill, i) => (
                                <span key={i} className="inline-block px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)' }}>
                                  {skill.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {languages && (
                          <div>
                            <div className="text-[10px] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>Languages</div>
                            <p className="text-sm whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.9)' }}>{languages}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Certifications - Now in Sidebar */}
                    {certifications.length > 0 && certifications[0].name && (
                      <div className="space-y-3">
                        <h3 className="font-bold uppercase tracking-widest text-xs mb-3" style={{ color: '#93c5fd', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px' }}>Certifications</h3>
                        {certifications.map(cert => (
                          cert.name && (
                            <div key={cert.id} className="text-sm">
                              <div className="font-bold leading-tight" style={{ color: '#ffffff' }}>{cert.name}</div>
                              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{cert.issuer}</div>
                              <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{cert.date}</div>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </div>

                  {/* RIGHT CONTENT - White - Main Body */}
                  <div className="flex-1 p-8" style={{ color: '#1e293b' }}>

                    {/* Header Name & Title */}
                    <div className="mb-8 pb-6" style={{ borderBottom: '2px solid #f1f5f9' }}>
                      <h1 className="text-4xl font-extrabold uppercase tracking-tight mb-2" style={{ color: '#111827' }}>
                        {personalInfo.fullName || "Your Name"}
                      </h1>
                      <p className="text-xl font-medium tracking-wide uppercase" style={{ color: '#2563eb' }}>
                        {personalInfo.title || "Target Job Title"}
                      </p>
                    </div>

                    {/* Summary */}
                    {personalInfo.summary && (
                      <div className="mb-8">
                        <h3 className="font-bold uppercase tracking-widest text-sm mb-3 pb-1" style={{ color: '#1e3a8a', borderBottom: '1px solid #e2e8f0' }}>Professional Summary</h3>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap text-justify" style={{ color: '#475569' }}>
                          {personalInfo.summary}
                        </p>
                      </div>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && experience[0].position && (
                      <div className="mb-8">
                        <h3 className="font-bold uppercase tracking-widest text-sm mb-4 pb-1" style={{ color: '#1e3a8a', borderBottom: '1px solid #e2e8f0' }}>Experience</h3>
                        <div className="space-y-5">
                          {experience.map(exp => (
                            <div key={exp.id}>
                              <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-base" style={{ color: '#1f2937' }}>{exp.position}</h4>
                                <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ color: '#64748b', backgroundColor: '#f1f5f9' }}>
                                  {exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
                                  {' - '}
                                  {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '')}
                                </span>
                              </div>
                              <div className="text-sm font-semibold mb-2" style={{ color: '#4b5563' }}>{exp.company}</div>
                              <p className="text-sm whitespace-pre-line pl-2" style={{ color: '#475569', borderLeft: '2px solid #e2e8f0' }}>
                                {exp.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {education.length > 0 && education[0].school && (
                      <div className="mb-8">
                        <h3 className="font-bold uppercase tracking-widest text-sm mb-4 pb-1" style={{ color: '#1e3a8a', borderBottom: '1px solid #e2e8f0' }}>Education</h3>
                        <div className="space-y-4">
                          {education.map(edu => (
                            <div key={edu.id}>
                              <div className="flex justify-between items-baseline">
                                <h4 className="font-bold" style={{ color: '#1f2937' }}>{edu.school}</h4>
                                <span className="text-xs" style={{ color: '#64748b' }}>{edu.startYear} - {edu.endYear}</span>
                              </div>
                              <div className="text-sm" style={{ color: '#4b5563' }}>
                                {edu.degree} in {edu.field}
                              </div>
                              {edu.gpa && <div className="text-xs mt-1" style={{ color: '#94a3b8' }}>GPA: {edu.gpa}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && projects[0].name && (
                      <div>
                        <h3 className="font-bold uppercase tracking-widest text-sm mb-4 pb-1" style={{ color: '#1e3a8a', borderBottom: '1px solid #e2e8f0' }}>Key Projects</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {projects.map(proj => (
                            <div key={proj.id} className="p-3 rounded" style={{ backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-sm" style={{ color: '#1f2937' }}>{proj.name}</h4>
                                {proj.url && (
                                  <a href={proj.url} target="_blank" rel="noreferrer" className="text-xs hover:underline" style={{ color: '#3b82f6' }}>Link</a>
                                )}
                              </div>
                              <p className="text-xs mb-2" style={{ color: '#475569' }}>{proj.description}</p>
                              <div className="text-[10px] uppercase tracking-wider font-medium" style={{ color: '#94a3b8' }}>
                                {proj.technologies}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </CardContent>
              </Card >
            </div >
          )
          }
        </div >
      </div >
    </DashboardLayout >
  )
}
