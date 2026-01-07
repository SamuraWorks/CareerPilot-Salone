"use client"
import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { toPng } from "html-to-image"
import jsPDF from "jspdf"

import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Download, Eye, Upload, User, Copy, Check, FileText, Phone, Mail, MapPin, Globe, Languages, UserCheck, Briefcase, GraduationCap, Award, Terminal, Calendar, Sparkles, Wand2, Loader2, BadgeCheck, ArrowLeft } from "lucide-react"
import { useCompletion } from "@ai-sdk/react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

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

interface Reference {
  id: string
  name: string
  role: string
  company: string
  phone: string
  email: string
}

export default function CVBuilderPage() {
  const searchParams = useSearchParams()
  const careerFromUrl = searchParams.get('career')

  const [showPreview, setShowPreview] = useState(true)
  const [profilePhoto, setProfilePhoto] = useState<string>("")
  const [copySuccess, setCopySuccess] = useState(false)
  const cvPreviewRef = useRef<HTMLDivElement>(null)

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    title: careerFromUrl || "",
    email: "",
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

  const [skills, setSkills] = useState("Microsoft Excel, Customer Service")
  const [verifiedSkills, setVerifiedSkills] = useState<string[]>(["Microsoft Excel"])
  const [isVerifying, setIsVerifying] = useState(false)
  const [languages, setLanguages] = useState("")
  const [references, setReferences] = useState<Reference[]>([
    { id: "1", name: "", role: "", company: "", phone: "", email: "" },
  ])

  // Auto-fill title if it changes in URL
  useEffect(() => {
    if (careerFromUrl) {
      setPersonalInfo(prev => ({ ...prev, title: careerFromUrl }))
    }
  }, [careerFromUrl])

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

  const addReference = () => {
    setReferences([...references, { id: Date.now().toString(), name: "", role: "", company: "", phone: "", email: "" }])
  }

  const removeReference = (id: string) => {
    if (references.length > 1) {
      setReferences(references.filter((r: Reference) => r.id !== id))
    }
  }

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    setReferences(references.map((r: Reference) => (r.id === id ? { ...r, [field]: value } : r)))
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
    let element = cvPreviewRef.current
    let wasHidden = false;

    if (!element) {
      console.log("CV Preview is hidden. Temporarily showing for download...")
      setShowPreview(true)
      wasHidden = true

      // Wait for React to render the component
      await new Promise(resolve => setTimeout(resolve, 500))

      // Re-acquire the ref
      element = cvPreviewRef.current
    }

    if (!element) {
      alert("CV preview reference not found. Please click 'Show Preview' and try again.")
      if (wasHidden) setShowPreview(false)
      return
    }

    const originalStyle = element.style.cssText
    const originalWidth = element.style.width
    const originalHeight = element.style.minHeight

    // Create a style override to force RGB colors and exact printing
    const styleEl = document.createElement('style')
    styleEl.id = 'pdf-color-override'
    styleEl.innerHTML = `
      #cv-preview-container, #cv-preview-container * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color: rgb(15, 23, 42) !important;
      }
      #cv-preview-container .bg-primary,
      #cv-preview-container [class*="bg-primary"] {
        background-color: rgb(59, 130, 246) !important;
      }
      #cv-preview-container .bg-secondary,
      #cv-preview-container [class*="bg-secondary"] {
        background-color: rgb(34, 197, 94) !important;
      }
      #cv-preview-container .text-primary {
        color: rgb(59, 130, 246) !important;
      }
      #cv-preview-container .text-secondary {
        color: rgb(34, 197, 94) !important;
      }
      #cv-preview-container .text-blue-600 {
        color: rgb(37, 99, 235) !important;
      }
      #cv-preview-container .text-white {
        color: rgb(255, 255, 255) !important;
      }
      #cv-preview-container .bg-white {
        background-color: rgb(255, 255, 255) !important;
      }
      #cv-preview-container .text-slate-800 {
        color: rgb(30, 41, 59) !important;
      }
      #cv-preview-container .bg-\\[\\#333b47\\] {
        background-color: rgb(51, 59, 71) !important;
      }
      #cv-preview-container .bg-\\[\\#e7e7e7\\] {
        background-color: rgb(231, 231, 231) !important;
      }
    `
    document.head.appendChild(styleEl)

    // Add ID to element for targeting if needed, though we primarily use the element ref
    const hadId = element.id
    element.id = 'cv-preview-container'

    // Force specific dimensions for A4 PDF quality
    element.style.width = '794px' // Approx A4 width at 96 DPI
    element.style.minHeight = '1123px' // Approx A4 height
    element.style.height = 'auto'
    element.style.padding = '0'
    element.style.backgroundColor = 'white'
    element.style.position = 'relative'
    element.style.margin = '0'
    element.style.overflow = 'visible' // Allow content to expand

    try {
      // Wait for styles to settle
      await new Promise(resolve => setTimeout(resolve, 500))

      // Use PNG for high quality text rendering
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2, // Slightly lower ratio to prevent massive file sizes on long CVs
        backgroundColor: '#ffffff',
        width: 794,
        // Remove fixed height to allow capturing full content length
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      })

      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      const img = document.createElement('img')
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = reject
        img.src = dataUrl
      })

      const imgWidth = img.width
      const imgHeight = img.height
      const ratio = imgWidth / pdfWidth
      const totalPdfHeight = imgHeight / ratio

      let heightLeft = totalPdfHeight
      let position = 0

      // Add first page
      pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, totalPdfHeight)
      heightLeft -= pdfHeight

      // Add subsequent pages if content overflows
      while (heightLeft > 0) {
        position -= pdfHeight
        pdf.addPage()
        pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, totalPdfHeight)
        heightLeft -= pdfHeight
      }

      // Metadata
      pdf.setProperties({
        title: `CV - ${personalInfo.fullName}`,
        subject: `CareerPilot Verified CV`,
        creator: 'CareerPilot Salone',
        author: personalInfo.fullName
      })

      const fileName = personalInfo.fullName
        ? `CV_${personalInfo.fullName.replace(/[^a-zA-Z0-9]/g, '_')}_Verified.pdf`
        : 'CareerPilot_CV_Verified.pdf'

      pdf.save(fileName)

    } catch (err: any) {
      console.error("PDF generation failed:", err)
      alert("PDF generation encountered an error. Please try again or use a modern desktop browser.")
    } finally {
      // Cleanup
      element.style.cssText = originalStyle
      // Restore original specific styles if they were overwritten and not part of cssText
      element.style.width = originalWidth
      element.style.minHeight = originalHeight

      if (!hadId) element.removeAttribute('id')
      else element.id = hadId
      document.getElementById('pdf-color-override')?.remove()

      if (wasHidden) {
        setShowPreview(false)
      }
    }
  }

  const handleCopyText = () => {
    const sections = []

    // Personal Info
    sections.push(`${personalInfo.fullName.toUpperCase()}\n${personalInfo.title}\n${personalInfo.email} | ${personalInfo.phone}\n${personalInfo.location}`)

    // Summary
    if (personalInfo.summary) {
      sections.push(`SUMMARY\n${personalInfo.summary}`)
    }

    // Experience
    if (experience.length > 0 && experience[0].position) {
      const expText = experience.map(exp =>
        `${exp.position.toUpperCase()} at ${exp.company}\n${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n${exp.description}`
      ).join('\n\n')
      sections.push(`EXPERIENCE\n${expText}`)
    }

    // Education
    if (education.length > 0 && education[0].school) {
      const eduText = education.map(edu =>
        `${edu.degree} in ${edu.field}\n${edu.school}, ${edu.startYear} - ${edu.endYear}${edu.gpa ? ` (GPA: ${edu.gpa})` : ''}`
      ).join('\n\n')
      sections.push(`EDUCATION\n${eduText}`)
    }

    // Skills
    if (skills) {
      sections.push(`SKILLS\n${skills}`)
    }

    // Projects
    if (projects.length > 0 && projects[0].name) {
      const projText = projects.map((p: Project) => `${p.name.toUpperCase()}\n${p.description}${p.technologies ? `\nTech: ${p.technologies}` : ''}`).join('\n\n')
      sections.push(`PROJECTS\n${projText}`)
    }

    // Languages
    if (languages) {
      sections.push(`LANGUAGES\n${languages}`)
    }

    // References
    if (references.length > 0 && references[0].name) {
      const refText = references.map(ref =>
        `${ref.name} (${ref.role})\n${ref.company}\nPhone: ${ref.phone} | Email: ${ref.email}`
      ).join('\n\n')
      sections.push(`REFERENCES\n${refText}`)
    }

    const fullText = sections.join('\n\n' + '='.repeat(20) + '\n\n')
    navigator.clipboard.writeText(fullText).then(() => {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    })
  }

  // Custom AI Enhancement Handler
  const EnhanceButton = ({ text, type, onResult }: { text: string, type: string, onResult: (res: string) => void }) => {
    const { complete, isLoading } = useCompletion({
      api: "/api/cv-enhance",
      onFinish: (_prompt, completion) => onResult(completion)
    });

    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={isLoading || !text}
        onClick={() => complete("", { body: { text, type, career: personalInfo.title } })}
        className="h-8 gap-1.5 text-primary hover:text-primary hover:bg-primary/5 transition-all text-xs font-bold"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            AI Enhancing...
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5" />
            AI Enhance
          </>
        )}
      </Button>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest mb-2"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <section className="relative rounded-[3rem] overflow-hidden bg-[#0B1F3A] min-h-[340px] flex items-center shadow-2xl group">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/dashboard/salone_success.png"
                alt="CV Builder"
                fill
                className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,167,116,0.15),transparent)] z-10" />
            </div>

            <div className="relative z-20 max-w-4xl p-10 md:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#1FA774]" />
                <span className="text-[#1FA774] font-bold text-xs uppercase tracking-widest">AI CV Engine</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-poppins">
                Build Your <span className="text-[#F4C430]">Professional</span> Future
              </h1>
              <p className="text-lg md:text-xl text-slate-300 font-medium font-inter max-w-xl leading-relaxed">
                Create an ATS-friendly, high-impact CV tailored specifically for the Sierra Leonean and international job markets.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button onClick={handleDownload} className="h-14 px-10 rounded-2xl bg-[#1FA774] hover:bg-[#1FA774]/90 text-white font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-[#1FA774]/20 transition-all hover:scale-[1.02] active:scale-95 gap-3">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="h-14 px-8 rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md font-black uppercase tracking-widest text-[11px] transition-all gap-3">
                  <Eye className="w-4 h-4" />
                  {showPreview ? "Hide" : "Show"} Preview
                </Button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Form Section */}
            <div className={cn("space-y-6", showPreview ? "block" : "lg:col-span-2 max-w-4xl mx-auto w-full")}>
              <Tabs defaultValue="personal" className="w-full">
                <div className="relative overflow-x-auto pb-2 scrollbar-hide">
                  <TabsList className="inline-flex min-w-full md:grid md:grid-cols-8 mb-2 h-14 bg-muted/50 p-1 rounded-xl">
                    <TabsTrigger value="personal" className="px-4 py-2 font-bold font-poppins data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Personal</TabsTrigger>
                    <TabsTrigger value="experience" className="px-4 py-2 font-bold font-poppins data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Work</TabsTrigger>
                    <TabsTrigger value="education" className="px-4 py-2 font-bold font-poppins data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Education</TabsTrigger>
                    <TabsTrigger value="skills" className="px-4 py-2 font-bold font-poppins data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Skills</TabsTrigger>
                    <TabsTrigger value="projects" className="px-4 py-2 font-bold font-poppins data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Projects</TabsTrigger>
                    <TabsTrigger value="certifications" className="px-4 py-2 font-bold font-poppins data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Certification</TabsTrigger>
                    <TabsTrigger value="references" className="px-4 py-2 font-bold font-poppins data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">References</TabsTrigger>
                    <TabsTrigger value="extras" className="px-4 py-2 font-bold font-poppins data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Extras</TabsTrigger>
                  </TabsList>
                </div>

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
                              <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
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
                              <Button type="button" variant="outline" className="gap-2" asChild>
                                <span>
                                  <Upload className="w-4 h-4" />
                                  Upload Photo
                                </span>
                              </Button>
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={personalInfo.fullName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                          placeholder="Mohamed Kallon"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title">Professional Title *</Label>
                        <Input
                          id="title"
                          value={personalInfo.title}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                          placeholder="Software Developer"
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
                            placeholder="mohamed@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={personalInfo.phone}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                            placeholder="+232 7X XXX XXX"
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
                        <div className="flex items-center justify-between">
                          <Label htmlFor="summary">Professional Summary *</Label>
                          <EnhanceButton
                            text={personalInfo.summary}
                            type="summary"
                            onResult={(res) => setPersonalInfo({ ...personalInfo, summary: res })}
                          />
                        </div>
                        <Textarea
                          id="summary"
                          rows={4}
                          value={personalInfo.summary}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                          placeholder="Briefly describe your career goals and key strengths..."
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Other standard tabs like experience, education, etc. - keeping them simplified */}
                <TabsContent value="experience">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <div>
                        <CardTitle>Work Experience</CardTitle>
                        <CardDescription>Your professional history</CardDescription>
                      </div>
                      <Button onClick={addExperience} size="sm" variant="outline" className="gap-1">
                        <Plus className="w-4 h-4" /> Add
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {experience.map((exp: Experience) => (
                        <div key={exp.id} className="space-y-4 p-4 rounded-lg border border-border relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-destructive"
                            onClick={() => removeExperience(exp.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Position</Label>
                              <Input value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                              <Label>Company</Label>
                              <Input value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Start Date</Label>
                              <Input type="month" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                              <Label>End Date</Label>
                              <Input type="month" value={exp.endDate} disabled={exp.current} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>Description</Label>
                              <EnhanceButton
                                text={exp.description}
                                type="experience"
                                onResult={(res) => updateExperience(exp.id, 'description', res)}
                              />
                            </div>
                            <Textarea rows={3} value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <div>
                        <CardTitle>Education</CardTitle>
                        <CardDescription>Your academic background</CardDescription>
                      </div>
                      <Button onClick={addEducation} size="sm" variant="outline" className="gap-1">
                        <Plus className="w-4 h-4" /> Add
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {education.map((edu: Education) => (
                        <div key={edu.id} className="space-y-4 p-4 rounded-lg border border-border relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-destructive"
                            onClick={() => removeEducation(edu.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <div className="space-y-2">
                            <Label>School/University</Label>
                            <Input value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Degree</Label>
                              <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                              <Label>Field of Study</Label>
                              <Input value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Start Year</Label>
                              <Input value={edu.startYear} onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                              <Label>End Year</Label>
                              <Input value={edu.endYear} onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills & Verification</CardTitle>
                      <CardDescription>Add your top skills. Verified skills appear with a blue checkmark.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label>Skills (Comma Separated)</Label>
                        <Textarea
                          rows={4}
                          value={skills}
                          onChange={(e) => setSkills(e.target.value)}
                          placeholder="Microsoft Excel, Customer Service, Project Management..."
                        />
                      </div>

                      {/* Verification Section */}
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                            <BadgeCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-blue-900 text-sm">Get Skills Verified</h4>
                            <p className="text-xs text-blue-700 mb-3 leading-relaxed">
                              Take a short 5-minute quiz to earn a "Verified" badge for skills like Excel, English, or Sales.
                              Employers trust verified candidates 3x more.
                            </p>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white border-none shadow-none"
                              onClick={() => {
                                setIsVerifying(true)
                                setTimeout(() => {
                                  setIsVerifying(false)
                                  // Mock adding a verified skill
                                  if (!skills.includes("Customer Service")) {
                                    setSkills(prev => prev ? `${prev}, Customer Service` : "Customer Service")
                                  }
                                  if (!verifiedSkills.includes("Customer Service")) {
                                    setVerifiedSkills([...verifiedSkills, "Customer Service"])
                                  }
                                  alert("Simulating Quiz... Success! 'Customer Service' is now verified.")
                                }, 1500)
                              }}
                              disabled={isVerifying}
                            >
                              {isVerifying ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : null}
                              {isVerifying ? "Verifying..." : "Take Skill Assessment"}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Languages</Label>
                        <Input value={languages} onChange={(e) => setLanguages(e.target.value)} placeholder="English, Krio, French..." />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <div>
                        <CardTitle>Projects</CardTitle>
                        <CardDescription>Showcase your work</CardDescription>
                      </div>
                      <Button onClick={addProject} size="sm" variant="outline" className="gap-1">
                        <Plus className="w-4 h-4" /> Add
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {projects.map((proj: Project) => (
                        <div key={proj.id} className="space-y-3 p-4 border border-border rounded-lg relative">
                          <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeProject(proj.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Input placeholder="Project Name" value={proj.name} onChange={(e) => updateProject(proj.id, 'name', e.target.value)} />
                          <Textarea placeholder="Short Description" value={proj.description} onChange={(e) => updateProject(proj.id, 'description', e.target.value)} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="extras">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <div>
                        <CardTitle>Certifications</CardTitle>
                        <CardDescription>Awards and recognitions</CardDescription>
                      </div>
                      <Button onClick={addCertification} size="sm" variant="outline" className="gap-1">
                        <Plus className="w-4 h-4" /> Add
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {certifications.map((cert: Certification) => (
                        <div key={cert.id} className="space-y-3 p-4 border border-border rounded-lg relative">
                          <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeCertification(cert.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Input placeholder="Certification Name" value={cert.name} onChange={(e) => updateCertification(cert.id, 'name', e.target.value)} />
                          <Input placeholder="Issuer" value={cert.issuer} onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="references">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <div>
                        <CardTitle>References</CardTitle>
                        <CardDescription>Professional contacts</CardDescription>
                      </div>
                      <Button onClick={addReference} size="sm" variant="outline" className="gap-1">
                        <Plus className="w-4 h-4" /> Add
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {references.map((ref: Reference) => (
                        <div key={ref.id} className="space-y-3 p-4 border border-border rounded-lg relative">
                          <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeReference(ref.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input placeholder="Full Name" value={ref.name} onChange={(e) => updateReference(ref.id, 'name', e.target.value)} />
                            <Input placeholder="Job Role" value={ref.role} onChange={(e) => updateReference(ref.id, 'role', e.target.value)} />
                          </div>
                          <Input placeholder="Company" value={ref.company} onChange={(e) => updateReference(ref.id, 'company', e.target.value)} />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input placeholder="Phone" value={ref.phone} onChange={(e) => updateReference(ref.id, 'phone', e.target.value)} />
                            <Input placeholder="Email" value={ref.email} onChange={(e) => updateReference(ref.id, 'email', e.target.value)} />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Preview Section */}
            {showPreview && (
              <div className="lg:fixed lg:top-0 lg:right-0 lg:h-screen lg:w-[50%] lg:bg-slate-50 lg:z-50 lg:overflow-y-auto lg:p-8 lg:border-l lg:border-slate-200 xl:static xl:h-auto xl:w-auto xl:bg-transparent xl:border-none xl:overflow-visible xl:p-0">
                <div className="sticky top-24 overflow-x-auto pb-8 flex justify-center">
                  <div
                    ref={cvPreviewRef}
                    id="cv-preview-container"
                    className="bg-white shadow-2xl border border-slate-200 overflow-hidden text-slate-800 flex flex-col font-sans shrink-0"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      width: '210mm',
                      minHeight: '297mm'
                    }}
                  >
                    {/* TWO-TONE HEADER */}
                    <div className="flex w-full">
                      <div className="w-[32%] bg-[#e7e7e7]" />
                      <div className="flex-1 bg-[#333b47] text-white p-12 py-16 flex flex-col justify-center">
                        <h1 className="text-4xl font-bold uppercase tracking-[0.2em] mb-1">
                          {personalInfo.fullName}
                        </h1>
                        <p className="text-lg text-slate-300 font-medium tracking-[0.1em] uppercase">
                          {personalInfo.title}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 relative min-h-0">
                      {/* Floating Profile Photo - Circular & Overlapping */}
                      <div className="absolute top-[-80px] left-[16%] -translate-x-1/2 z-20">
                        <div className="w-48 h-48 rounded-full border-[8px] border-white shadow-xl overflow-hidden bg-slate-200 flex items-center justify-center">
                          {profilePhoto ? (
                            <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-20 h-20 text-slate-400" />
                          )}
                        </div>
                      </div>

                      {/* Left Sidebar (Light Gray) */}
                      <div className="w-[32%] bg-[#e7e7e7] p-8 pt-32 flex flex-col gap-10">
                        {/* Contact Info */}
                        <div className="space-y-6">
                          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-900 border-b border-slate-400 pb-1.5 flex items-center gap-2">
                            Contact
                          </h3>
                          <div className="space-y-4 text-[12px] text-slate-700 font-medium">
                            {personalInfo.phone && (
                              <div className="flex items-center gap-3">
                                <Phone className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                                <span>{personalInfo.phone}</span>
                              </div>
                            )}
                            {personalInfo.email && (
                              <div className="flex items-center gap-3 break-all">
                                <Mail className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                                <span>{personalInfo.email}</span>
                              </div>
                            )}
                            {personalInfo.location && (
                              <div className="flex items-center gap-3">
                                <MapPin className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                                <span>{personalInfo.location}</span>
                              </div>
                            )}
                            {personalInfo.portfolio && (
                              <div className="flex items-center gap-3">
                                <Globe className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                                <span>{personalInfo.portfolio}</span>
                              </div>
                            )}
                            {personalInfo.linkedin && (
                              <div className="flex items-center gap-3">
                                <span className="w-3.5 h-3.5 flex items-center justify-center font-bold text-[10px] bg-slate-900 text-white rounded-[2px] shrink-0">in</span>
                                <span>{personalInfo.linkedin}</span>
                              </div>
                            )}
                            {personalInfo.github && (
                              <div className="flex items-center gap-3">
                                <Terminal className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                                <span>{personalInfo.github}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Skills Section */}
                        {skills && (
                          <div className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-900 border-b border-slate-400 pb-1.5">
                              Skills
                            </h3>
                            <ul className="space-y-2 text-[12px] text-slate-700 font-medium">
                              {skills.split(',').filter(s => s.trim()).map((s, i) => {
                                const skillName = s.trim()
                                const isVerified = verifiedSkills.some(vs => vs.toLowerCase() === skillName.toLowerCase())
                                return (
                                  <li key={i} className="flex items-center justify-between">
                                    <span>{skillName}</span>
                                    {isVerified && (
                                      <div className="flex items-center text-blue-600" title="Verified by CareerPilot">
                                        <BadgeCheck className="w-3.5 h-3.5" />
                                      </div>
                                    )}
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        )}

                        {/* Languages */}
                        {languages && (
                          <div className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-900 border-b border-slate-400 pb-1.5">
                              Languages
                            </h3>
                            <ul className="space-y-2 text-[12px] text-slate-700 font-medium list-disc list-inside">
                              {languages.split(',').filter(l => l.trim()).map((l, i) => (
                                <li key={i}>{l.trim()}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* References */}
                        {/* References */}
                        {references.some(r => r.name) && (
                          <div className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-900 border-b border-slate-400 pb-1.5">
                              Reference
                            </h3>
                            {references.map((ref: Reference) => ref.name && (
                              <div key={ref.id} className="text-[11px] text-slate-700 space-y-1">
                                <p className="font-bold text-slate-900 text-[12px]">{ref.name}</p>
                                <p>{ref.role} {ref.company && `/ ${ref.company}`}</p>
                                {ref.phone && <p>Phone: {ref.phone}</p>}
                                {ref.email && <p>Email: {ref.email}</p>}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Main Content Area (White) */}
                      <div className="flex-1 bg-white p-12 pr-12 md:pl-16 min-w-0">

                        {/* Timeline Line Container */}
                        <div className="relative h-full">
                          {/* The long vertical line across all sections */}
                          <div className="absolute left-[13px] top-[24px] bottom-0 w-[1px] bg-slate-300" />

                          {/* Profile Summary */}
                          {personalInfo.summary && (
                            <div className="mb-14 relative z-10 pl-10">
                              {/* Dot/Icon */}
                              <div className="absolute left-[-26px] top-0 w-8 h-8 rounded-full bg-white border border-slate-800 flex items-center justify-center text-slate-800">
                                <User className="w-4 h-4" />
                              </div>
                              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 mb-6 border-b border-slate-200 pb-2">
                                Profile
                              </h2>
                              <p className="text-[12px] leading-[1.8] text-slate-700 text-justify font-medium whitespace-pre-wrap">
                                {personalInfo.summary}
                              </p>
                            </div>
                          )}

                          {/* Experience Section */}
                          {/* Experience Section */}
                          {experience.some(e => e.company) && (
                            <div className="mb-14 relative z-10 pl-10">
                              <div className="absolute left-[-26px] top-0 w-8 h-8 rounded-full bg-white border border-slate-800 flex items-center justify-center text-slate-800">
                                <Briefcase className="w-4 h-4" />
                              </div>
                              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 mb-8 border-b border-slate-200 pb-2">
                                Work Experience
                              </h2>
                              <div className="space-y-10">
                                {experience.map((exp: Experience) => exp.company && (
                                  <div key={exp.id} className="relative">
                                    {/* Small connector dot on the line */}
                                    <div className="absolute left-[-31px] top-[8px] w-1.5 h-1.5 rounded-full bg-slate-400" />
                                    <div className="flex justify-between items-baseline mb-2">
                                      <h4 className="font-bold text-[13px] text-slate-900">{exp.company}</h4>
                                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                      </span>
                                    </div>
                                    <div className="text-[12px] font-medium text-slate-600 mb-2 italic">{exp.position}</div>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium whitespace-pre-wrap">
                                      {exp.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Projects Section */}
                          {projects.some(p => p.name) && (
                            <div className="mb-14 relative z-10 pl-10">
                              <div className="absolute left-[-26px] top-0 w-8 h-8 rounded-full bg-white border border-slate-800 flex items-center justify-center text-slate-800">
                                <Terminal className="w-4 h-4" />
                              </div>
                              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 mb-8 border-b border-slate-200 pb-2">
                                Projects
                              </h2>
                              <div className="space-y-8">
                                {projects.map((proj: Project) => proj.name && (
                                  <div key={proj.id} className="relative">
                                    <div className="absolute left-[-31px] top-[8px] w-1.5 h-1.5 rounded-full bg-slate-400" />
                                    <div className="flex justify-between items-baseline mb-2">
                                      <h4 className="font-bold text-[13px] text-slate-900">{proj.name}</h4>
                                      {proj.url && <span className="text-[11px] text-slate-500">{proj.url}</span>}
                                    </div>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium whitespace-pre-wrap mb-1">
                                      {proj.description}
                                    </p>
                                    {proj.technologies && (
                                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                        Tech: {proj.technologies}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Education Section */}
                          {education.some(e => e.school) && (
                            <div className="relative z-10 pl-10">
                              <div className="absolute left-[-26px] top-0 w-8 h-8 rounded-full bg-white border border-slate-800 flex items-center justify-center text-slate-800">
                                <GraduationCap className="w-4 h-4" />
                              </div>
                              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 mb-8 border-b border-slate-200 pb-2">
                                Education
                              </h2>
                              <div className="space-y-10">
                                {education.map((edu: Education) => edu.school && (
                                  <div key={edu.id} className="relative">
                                    <div className="absolute left-[-31px] top-[8px] w-1.5 h-1.5 rounded-full bg-slate-400" />
                                    <div className="flex justify-between items-baseline mb-1">
                                      <h4 className="font-bold text-[13px] text-slate-900">{edu.degree} in {edu.field}</h4>
                                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{edu.startYear} – {edu.endYear}</span>
                                    </div>
                                    <div className="text-[11px] text-slate-600 font-medium">{edu.school}</div>
                                    {edu.gpa && <div className="text-[11px] font-bold text-slate-400 mt-1">GPA: {edu.gpa}</div>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Certifications Section */}
                          {certifications.some(c => c.name) && (
                            <div className="relative z-10 pl-10 mt-14">
                              <div className="absolute left-[-26px] top-0 w-8 h-8 rounded-full bg-white border border-slate-800 flex items-center justify-center text-slate-800">
                                <Award className="w-4 h-4" />
                              </div>
                              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 mb-8 border-b border-slate-200 pb-2">
                                Certifications
                              </h2>
                              <div className="space-y-6">
                                {certifications.map((cert: Certification) => cert.name && (
                                  <div key={cert.id} className="relative">
                                    <div className="absolute left-[-31px] top-[8px] w-1.5 h-1.5 rounded-full bg-slate-400" />
                                    <div className="flex justify-between items-baseline mb-1">
                                      <h4 className="font-bold text-[13px] text-slate-900">{cert.name}</h4>
                                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{cert.date}</span>
                                    </div>
                                    <div className="text-[11px] text-slate-600 font-medium">{cert.issuer}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
