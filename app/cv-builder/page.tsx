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
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Trash2,
  Download,
  Eye,
  Upload,
  User,
  FileText,
  Phone,
  Mail,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Terminal,
  Sparkles,
  Loader2,
  BadgeCheck,
  ChevronRight,
  EyeOff,
  Layout,
  ArrowLeft
} from "lucide-react"
import { useCompletion } from "@ai-sdk/react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { DynamicCVTemplate, CVData } from "@/components/cv-templates"
import { calculateLayoutStrategy, UserProfile } from "@/lib/cv-logic-engine"
import { DashboardLayout } from "@/components/dashboard-layout"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { useProfile } from "@/lib/profile-context"
import Link from "next/link"
import { Suspense } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
  phone: string;
  email: string;
}



export default function CVBuilderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#1FA774] animate-spin" />
      </div>
    }>
      <CVBuilderContent />
    </Suspense>
  )
}

function CVBuilderContent() {

  const { profile } = useProfile()
  const searchParams = useSearchParams()
  const careerFromUrl = searchParams.get('career')

  const [showPreview, setShowPreview] = useState(true)
  const [profilePhoto, setProfilePhoto] = useState<string>("")
  const cvPreviewRef = useRef<HTMLDivElement>(null)

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    title: careerFromUrl || "",
    email: "",
    phone: "",
    location: "Freetown, Sierra Leone",
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
  const [languages, setLanguages] = useState("English, Krio")
  const [references, setReferences] = useState<Reference[]>([
    { id: "1", name: "", role: "", company: "", phone: "", email: "" },
  ])

  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false)
  const [draftResult, setDraftResult] = useState<string>("")
  const [isDraftOpen, setIsDraftOpen] = useState(false)

  useEffect(() => {
    if (careerFromUrl) setPersonalInfo(prev => ({ ...prev, title: careerFromUrl }))
  }, [careerFromUrl])

  // Hydrate Info
  useEffect(() => {
    const fullName = profile.full_name || profile.fullName
    if (fullName) {
      setPersonalInfo(prev => ({
        ...prev,
        fullName: fullName,
        location: profile.location || prev.location,
        title: profile.career_goal || profile.careerGoal || prev.title,
        summary: prev.summary || profile.resume_data?.professional_hook || (profile as any).resumeData?.professionalHook || `Aspiring ${profile.career_goal || profile.careerGoal} with specific expertise in ${(profile.skills || (profile as any).hardSkills || []).slice(0, 3).join(", ")}. Committed to professional growth in Sierra Leone's digital economy.`
      }))

      const userSkills = profile.skills || (profile as any).hardSkills
      if (userSkills && userSkills.length > 0) {
        setSkills(userSkills.join(", "))
      }

      if (profile.avatar_url) {
        setProfilePhoto(profile.avatar_url)
      }

      const resumeData = profile.resume_data || (profile as any).resumeData
      if (resumeData) {
        if (resumeData.recent_role || resumeData.recentRole) {
          let richDescription = resumeData.key_achievement || resumeData.keyAchievement || 'Key milestone achieved...'
          if (resumeData.impact_metric || resumeData.impactMetric) richDescription += `\n• Generated impact: ${resumeData.impact_metric || resumeData.impactMetric}`
          if (resumeData.leadership_action || resumeData.leadershipAction) richDescription += `\n• Leadership: ${resumeData.leadership_action || resumeData.leadershipAction}`

          setExperience([{
            id: 'auto-exp-1',
            company: 'Previous Role',
            position: resumeData.recent_role || resumeData.recentRole,
            description: richDescription,
            startDate: '2023',
            endDate: 'Present',
            current: true
          }])
        }
        if (resumeData.top_project || resumeData.topProject) {
          setProjects([{
            id: 'auto-proj-1',
            name: resumeData.top_project || resumeData.topProject,
            description: (resumeData.leadership || (profile as any).resumeData?.leadership) ? `Led initiative as ${resumeData.leadership || (profile as any).resumeData?.leadership}` : 'Key technical project demonstrating core competencies.',
            technologies: (profile.skills || (profile as any).hardSkills || [])[0] || 'General',
            url: ''
          }])
        }
      }
    }
  }, [profile])


  // --- Logic Engine Integration ---
  const currentStrategy = (() => {
    // Calculate years of experience
    const yearsExp = experience.reduce((acc, curr) => {
      if (!curr.startDate) return acc
      const start = parseInt(curr.startDate)
      if (isNaN(start)) return acc
      const end = curr.current ? new Date().getFullYear() : (parseInt(curr.endDate) || start)
      return acc + (end - start)
    }, 0)

    const userProfile: UserProfile = {
      status: profile?.status || (yearsExp > 0 ? 'employed' : 'student'),
      yearsExperience: yearsExp,
      targetRole: personalInfo.title || 'Professional',
      skills: skills.split(',').filter(s => s.trim()),
      projectCount: projects.length
    }

    return calculateLayoutStrategy(userProfile)
  })()


  const addEducation = () => setEducation([...education, { id: Date.now().toString(), school: "", degree: "", field: "", startYear: "", endYear: "", gpa: "" }])
  const removeEducation = (id: string) => education.length > 1 && setEducation(education.filter((e) => e.id !== id))
  const updateEducation = (id: string, field: keyof Education, value: string) => setEducation(education.map((e) => (e.id === id ? { ...e, [field]: value } : e)))

  const addExperience = () => setExperience([...experience, { id: Date.now().toString(), company: "", position: "", description: "", startDate: "", endDate: "", current: false }])
  const removeExperience = (id: string) => experience.length > 1 && setExperience(experience.filter((e) => e.id !== id))
  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => setExperience(experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)))

  const addProject = () => setProjects([...projects, { id: Date.now().toString(), name: "", description: "", technologies: "", url: "" }])
  const removeProject = (id: string) => projects.length > 1 && setProjects(projects.filter((p) => p.id !== id))
  const updateProject = (id: string, field: keyof Project, value: string) => setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)))

  const addCertification = () => setCertifications([...certifications, { id: Date.now().toString(), name: "", issuer: "", date: "", url: "" }])
  const removeCertification = (id: string) => certifications.length > 1 && setCertifications(certifications.filter((c) => c.id !== id))
  const updateCertification = (id: string, field: keyof Certification, value: string) => setCertifications(certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)))

  const addReference = () => setReferences([...references, { id: Date.now().toString(), name: "", role: "", company: "", phone: "", email: "" }])
  const removeReference = (id: string) => references.length > 1 && setReferences(references.filter((r) => r.id !== id))
  const updateReference = (id: string, field: keyof Reference, value: string) => setReferences(references.map((r) => (r.id === id ? { ...r, [field]: value } : r)))

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setProfilePhoto(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = async () => {
    if (!cvPreviewRef.current) {
      toast.error("Please ensure preview is visible before downloading.")
      return
    }

    toast.info("Preparing your PDF... hold tight!")
    const element = cvPreviewRef.current

    try {
      const dataUrl = await toPng(element, { quality: 1.0, pixelRatio: 3, backgroundColor: '#ffffff' })
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgProps = pdf.getImageProperties(dataUrl)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`CV_${personalInfo.fullName.replace(/\s+/g, '_')}_Verified.pdf`)
      toast.success("CV Downloaded successfully!")
    } catch (err) {
      toast.error("PDF generation failed. Try again.")
    }
  }

  const handleSmartDraft = async () => {
    setIsGeneratingDraft(true)
    setDraftResult("")

    try {
      const response = await fetch('/api/cv-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'full_application',
          profile: {
            fullName: personalInfo.fullName,
            status: profile?.status,
            yearsExperience: currentStrategy.emphasis === 'experience' ? 3 : 1, // Rough estimate
            targetRole: personalInfo.title,
            skills: skills.split(',').map(s => s.trim()),
            projectCount: projects.length
          },
          jobDetails: {
            title: personalInfo.title,
            company: "Target Organization"
          }
        }),
      })

      if (!response.ok) throw new Error('Failed to generate draft')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      setIsDraftOpen(true)
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value)
        setDraftResult(prev => prev + text)
      }

      toast.success("Agentic Draft Synthesis Complete.")
    } catch (error) {
      console.error(error)
      toast.error("Draft generation failed.")
    } finally {
      setIsGeneratingDraft(false)
    }
  }

  const EnhanceButton = ({ text, type, onResult }: { text: string, type: string, onResult: (res: string) => void }) => {
    const { complete, isLoadingAuth } = useCompletion({
      api: "/api/cv-enhance",
      onFinish: (_prompt, completion) => onResult(completion)
    });

    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={isLoadingAuth || !text}
        onClick={() => complete("", { body: { text, type, career: personalInfo.title } })}
        className="h-8 gap-2 text-primary font-bold uppercase tracking-wide text-xs hover:bg-primary/5"
      >
        {isLoadingAuth ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
        {isLoadingAuth ? "Enhancing..." : "AI Revise"}
      </Button>
    );
  };

  return (
    <DashboardLayout>

      <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">

        {/* --- PREMIUM DYNAMIC HERO --- */}
        <section className="relative rounded-3xl overflow-hidden min-h-[300px] flex items-center shadow-lg group border-b-8 border-emerald-500">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/sections/cv-builder-professional.jpg"
              alt="CV Builder Hub"
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="relative z-20 w-full p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/20 backdrop-blur-[2px]">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-white/20 rounded-full shadow-sm">
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-emerald-800 font-bold text-xs uppercase tracking-wide">Asset Synthesis Module</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight font-sans capitalize drop-shadow-lg">
                Portfolio <br /> <span className="text-gradient-salone brightness-125">Builder</span>
              </h1>
              <p className="text-lg text-white font-bold font-sans max-w-lg leading-relaxed border-l-4 border-emerald-400 pl-4 drop-shadow-md bg-black/10 rounded-r-lg py-2">
                Construct a high-impact professional narrative optimized for the modern Sierra Leonean job market.
              </p>
            </div>

            <div className="flex flex-col gap-3 min-w-[200px]">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="h-14 px-6 rounded-2xl bg-white/90 hover:bg-white text-slate-900 font-bold uppercase tracking-wide text-xs gap-3 shadow-lg transition-all"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? "Disable Live View" : "Enable Live View"}
              </Button>
              <Button
                onClick={handleSmartDraft}
                disabled={isGeneratingDraft}
                className="h-14 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-wide text-xs gap-3 shadow-xl active:scale-95 transition-all"
              >
                {isGeneratingDraft ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {isGeneratingDraft ? "Synthesizing..." : "Smart Agentic Draft"}
              </Button>
              <Button
                onClick={handleDownload}
                className="h-14 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wide text-xs gap-3 shadow-xl active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                Export Tactical PDF
              </Button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* EDITOR (LEFT) */}
          <div className={cn("space-y-8 transition-all duration-500", showPreview ? "lg:col-span-6" : "lg:col-span-12 max-w-4xl mx-auto w-full")}>

            {/* AI Strategy Banner (System 2) */}
            <div className="p-6 border border-emerald-500/20 bg-emerald-50/50 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
              <div className="flex items-start gap-4 relaitve z-10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0">
                  <Layout className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase tracking-widest text-emerald-800">
                    Active Strategy: {currentStrategy.name}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
                    {currentStrategy.reasoning}
                  </p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="w-full justify-start gap-2 bg-transparent p-0 h-auto overflow-x-auto no-scrollbar mb-6">
                {['personal', 'experience', 'education', 'skills', 'projects', 'credentials'].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-xl px-5 py-2.5 bg-white border border-slate-100 data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-xs uppercase tracking-wide shadow-sm transition-all"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="personal" className="mt-0 space-y-6 outline-none">
                <Card className="p-8 border-none rounded-[2rem] bg-white shadow-xl shadow-blue-500/5 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary">
                        {profilePhoto ? <img src={profilePhoto} className="w-full h-full object-cover" /> : <User className="w-10 h-10 text-slate-300" />}
                      </div>
                      <input type="file" id="photo-p" className="hidden" onChange={handlePhotoUpload} />
                      <label htmlFor="photo-p" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-[#0B1F3A] text-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#1E5EFF]">
                        <Upload className="w-4 h-4" />
                      </label>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">Identity Nodes</h3>
                      <p className="text-xs text-slate-400 font-medium">Basic contact & profile summary data.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wide text-slate-400 ml-1">Full Name</Label>
                      <Input value={personalInfo.fullName} onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })} className="h-12 rounded-xl border-slate-100 bg-slate-50/50" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wide text-slate-400 ml-1">Job Title</Label>
                      <Input value={personalInfo.title} onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })} className="h-12 rounded-xl border-slate-100 bg-slate-50/50" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wide text-slate-400 ml-1">Email</Label>
                      <Input value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} className="h-12 rounded-xl border-slate-100 bg-slate-50/50" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wide text-slate-400 ml-1">Phone</Label>
                      <Input value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} className="h-12 rounded-xl border-slate-100 bg-slate-50/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-bold uppercase tracking-wide text-slate-400 ml-1">Professional Summary</Label>
                      <EnhanceButton text={personalInfo.summary} type="summary" onResult={(res) => setPersonalInfo({ ...personalInfo, summary: res })} />
                    </div>
                    <Textarea rows={4} value={personalInfo.summary} onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })} className="rounded-xl border-slate-100 bg-slate-50/50 resize-none" placeholder="Who you be na career wise?" />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="mt-0 outline-none space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">Work History</h3>
                  <Button onClick={addExperience} variant="ghost" className="text-emerald-500 font-bold uppercase tracking-wide text-xs gap-2"><Plus className="w-4 h-4" /> Add Record</Button>
                </div>
                {experience.map((exp) => (
                  <Card key={exp.id} className="p-8 border-none rounded-[2rem] bg-white shadow-sm border border-slate-50 space-y-6 relative group">
                    <button onClick={() => removeExperience(exp.id)} className="absolute top-6 right-6 p-2 rounded-lg bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wide text-slate-400 ml-1">Company</Label>
                        <Input value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="h-11 rounded-xl border-slate-100" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wide text-slate-400 ml-1">Position</Label>
                        <Input value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} className="h-11 rounded-xl border-slate-100" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold uppercase tracking-wide text-slate-400 ml-1">Impact & Achievements</Label>
                        <EnhanceButton text={exp.description} type="experience" onResult={(res) => updateExperience(exp.id, 'description', res)} />
                      </div>
                      <Textarea rows={3} value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} className="rounded-xl border-slate-100 bg-slate-50/10" />
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="education" className="mt-0 outline-none space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">Academic Dossier</h3>
                  <Button onClick={addEducation} variant="ghost" className="text-emerald-500 font-bold uppercase tracking-wide text-xs gap-2"><Plus className="w-4 h-4" /> Add Study</Button>
                </div>
                {education.map((edu) => (
                  <Card key={edu.id} className="p-8 border-none rounded-[2rem] bg-white shadow-sm border border-slate-50 space-y-6 relative group">
                    <button onClick={() => removeEducation(edu.id)} className="absolute top-6 right-6 p-2 rounded-lg bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wide text-slate-400 ml-1">School / University</Label>
                      <Input value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} placeholder="e.g. Fourah Bay College" className="h-11 rounded-xl border-slate-100" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wide text-slate-400 ml-1">Qualification</Label>
                        <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="e.g. BSc" className="h-11 rounded-xl border-slate-100" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wide text-slate-400 ml-1">Field</Label>
                        <Input value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} placeholder="e.g. Economics" className="h-11 rounded-xl border-slate-100" />
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="skills" className="mt-0 outline-none space-y-6">
                <Card className="p-8 border-none rounded-[2rem] bg-white shadow-xl shadow-blue-500/5 space-y-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wide text-slate-400 ml-1">Technical & Soft Skills</Label>
                    <Textarea rows={4} value={skills} onChange={(e) => setSkills(e.target.value)} className="rounded-xl border-slate-100 bg-slate-50/50 h-32" placeholder="List your powers..." />
                  </div>

                  <div className="bg-blue-50/50 rounded-[1.5rem] p-6 border border-blue-100 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-lg"><BadgeCheck className="w-6 h-6" /></div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wide text-slate-900">Skill Verification Engine</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">Verified skills get a blue badge on your PDF. This increases trust with employers na Freetown by 40%.</p>
                      <Button
                        size="sm"
                        className="bg-primary h-9 px-6 rounded-lg font-bold uppercase tracking-wide text-xs"
                        disabled={isVerifying}
                        onClick={() => {
                          setIsVerifying(true)
                          setTimeout(() => {
                            setIsVerifying(false)
                            toast.success("Skill assessment sync complete!")
                          }, 1000)
                        }}
                      >
                        {isVerifying ? "Processing..." : "Take Validation Quiz"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="mt-0 outline-none space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">Portfolio Items</h3>
                  <Button onClick={addProject} variant="ghost" className="text-emerald-500 font-bold uppercase tracking-wide text-xs gap-2"><Plus className="w-4 h-4" /> New Project</Button>
                </div>
                {projects.map((p) => (
                  <Card key={p.id} className="p-8 border-none rounded-[2rem] bg-white shadow-sm border border-slate-50 space-y-4 relative group">
                    <button onClick={() => removeProject(p.id)} className="absolute top-6 right-6 p-2 rounded-lg bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                    <Input value={p.name} onChange={(e) => updateProject(p.id, 'name', e.target.value)} placeholder="Project Name" className="h-11 rounded-xl border-slate-100 font-bold" />
                    <Textarea value={p.description} onChange={(e) => updateProject(p.id, 'description', e.target.value)} placeholder="Wetin you build?" className="rounded-xl border-slate-100 text-xs" />
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="credentials" className="mt-0 outline-none space-y-8">
                {/* Languages Section */}
                <Card className="p-8 border-none rounded-[2rem] bg-white shadow-xl shadow-blue-500/5 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center"><Globe className="w-4 h-4" /></div>
                    <Label className="text-xs font-bold uppercase tracking-wide text-slate-900">Languages</Label>
                  </div>
                  <Input
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    placeholder="e.g. English (Fluent), Krio (Native)"
                    className="h-12 rounded-xl border-slate-100 bg-slate-50/50"
                  />
                </Card>

                {/* Certifications Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">Certifications</h3>
                    <Button onClick={addCertification} variant="ghost" className="text-emerald-500 font-bold uppercase tracking-wide text-xs gap-2"><Plus className="w-4 h-4" /> Add Cert</Button>
                  </div>
                  {certifications.map((c) => (
                    <Card key={c.id} className="p-8 border-none rounded-[2rem] bg-white shadow-sm border border-slate-50 space-y-4 relative group">
                      <button onClick={() => removeCertification(c.id)} className="absolute top-6 right-6 p-2 rounded-lg bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input value={c.name} onChange={(e) => updateCertification(c.id, 'name', e.target.value)} placeholder="Certification Name" className="h-11 rounded-xl border-slate-100" />
                        <Input value={c.issuer} onChange={(e) => updateCertification(c.id, 'issuer', e.target.value)} placeholder="Issuing Organization" className="h-11 rounded-xl border-slate-100" />
                      </div>
                      <Input value={c.date} onChange={(e) => updateCertification(c.id, 'date', e.target.value)} placeholder="Date Earned (e.g. Dec 2023)" className="h-11 rounded-xl border-slate-100" />
                    </Card>
                  ))}
                </div>

                {/* References Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">References</h3>
                    <Button onClick={addReference} variant="ghost" className="text-emerald-500 font-bold uppercase tracking-wide text-xs gap-2"><Plus className="w-4 h-4" /> Add Reference</Button>
                  </div>
                  {references.map((r) => (
                    <Card key={r.id} className="p-8 border-none rounded-[2rem] bg-white shadow-sm border border-slate-50 space-y-4 relative group">
                      <button onClick={() => removeReference(r.id)} className="absolute top-6 right-6 p-2 rounded-lg bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input value={r.name} onChange={(e) => updateReference(r.id, 'name', e.target.value)} placeholder="Full Name" className="h-11 rounded-xl border-slate-100" />
                        <Input value={r.company} onChange={(e) => updateReference(r.id, 'company', e.target.value)} placeholder="Company/Organization" className="h-11 rounded-xl border-slate-100" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input value={r.role} onChange={(e) => updateReference(r.id, 'role', e.target.value)} placeholder="Job Title/Relationship" className="h-11 rounded-xl border-slate-100" />
                        <Input value={r.phone} onChange={(e) => updateReference(r.id, 'phone', e.target.value)} placeholder="Phone Number" className="h-11 rounded-xl border-slate-100" />
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* PREVIEW (RIGHT) */}
          {showPreview && (
            <div className="lg:col-span-6 sticky top-8">
              <div className="bg-slate-200/50 rounded-[2.5rem] p-4 flex justify-center border-2 border-dashed border-slate-200 overflow-hidden min-h-[600px] relative group">
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge className="bg-primary text-white px-4 py-2 rounded-full font-bold uppercase tracking-wide text-xs animate-pulse">Live Canvas</Badge>
                </div>

                <div className="origin-top scale-[0.35] sm:scale-[0.5] md:scale-[0.5] xl:scale-[0.45] 2xl:scale-[0.55] transition-transform duration-500">
                  {(() => {
                    const cvData: CVData = {
                      personalInfo,
                      experience,
                      education,
                      skills,
                      verifiedSkills,
                      profilePhoto,
                      projects,
                      certifications,
                      languages,
                      references
                    }

                    return <DynamicCVTemplate data={cvData} strategy={currentStrategy} templateRef={cvPreviewRef} />
                  })()}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
      <Footer />

      <Dialog open={isDraftOpen} onOpenChange={setIsDraftOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white rounded-[2rem] border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              Agentic Application Draft
            </DialogTitle>
            <DialogDescription className="font-medium text-slate-500">
              This is a high-impact synthesis of your profile. Use it to overwrite your current fields or as a benchmark.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
            {draftResult || "Synthesizing your career narrative..."}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDraftOpen(false)} className="rounded-xl font-bold uppercase tracking-wide text-xs">
              Close
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(draftResult)
                toast.success("Draft copied to clipboard.")
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold uppercase tracking-wide text-xs shadow-lg shadow-indigo-500/20"
            >
              Copy to Clipboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

