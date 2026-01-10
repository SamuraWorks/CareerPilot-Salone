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
import { CV_TEMPLATES } from "@/components/cv-templates"
import { DashboardLayout } from "@/components/dashboard-layout"
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
  phone: string;
  email: string;
}

export default function CVBuilderPage() {
  const searchParams = useSearchParams()
  const careerFromUrl = searchParams.get('career')

  const [showPreview, setShowPreview] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState('modern-professional')
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

  useEffect(() => {
    if (careerFromUrl) setPersonalInfo(prev => ({ ...prev, title: careerFromUrl }))
  }, [careerFromUrl])

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
        className="h-8 gap-2 text-primary font-black uppercase tracking-widest text-[9px] hover:bg-primary/5"
      >
        {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
        {isLoading ? "Enhancing..." : "AI Revise"}
      </Button>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">

        {/* --- PREMIUM DYNAMIC HERO --- */}
        <section className="relative rounded-[3.5rem] overflow-hidden bg-[#0B1F3A] min-h-[300px] flex items-center shadow-2xl group border-b-8 border-b-[#1FA774]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/salone_digital_market.png"
              alt="CV Builder Hub"
              fill
              className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[#0B1F3A]/80" />
          </div>

          <div className="relative z-20 w-full p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E5EFF]/20 border border-[#1E5EFF]/30 rounded-full backdrop-blur-md">
                <FileText className="w-4 h-4 text-[#4ADE80]" />
                <span className="text-[#4ADE80] font-black text-[10px] uppercase tracking-[0.2em]">Asset Synthesis Module</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-poppins capitalize">
                Professional <br /> <span className="text-gradient-salone brightness-150">Dossier Builder</span>
              </h1>
              <p className="text-lg text-slate-300 font-medium font-inter max-w-lg leading-relaxed italic border-l-4 border-[#1FA774] pl-6">
                Construct a high-impact professional narrative optimized for the modern Sierra Leonean job market.
              </p>
            </div>

            <div className="flex flex-col gap-4 min-w-[200px]">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="h-16 px-8 rounded-3xl border-white/20 bg-white/5 backdrop-blur-md text-white font-black uppercase tracking-widest text-[10px] gap-3 hover:bg-white/10 active:scale-95 transition-all"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? "Disable Live View" : "Enable Live View"}
              </Button>
              <Button
                onClick={handleDownload}
                className="h-16 px-8 rounded-3xl bg-[#1FA774] text-white font-black uppercase tracking-widest text-[10px] gap-3 shadow-2xl shadow-emerald-500/20 hover:bg-[#1E5EFF] active:scale-95 transition-all"
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

            {/* Template Selector */}
            <Card className="p-6 border-slate-100 rounded-[2rem] bg-white shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Layout className="w-5 h-5 text-[#1FA774]" />
                <h3 className="text-sm font-black uppercase tracking-widest text-[#0B1F3A]">Choose Template</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CV_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all text-left hover:shadow-md group",
                      selectedTemplate === template.id
                        ? "border-[#1FA774] bg-green-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                        selectedTemplate === template.id ? "border-[#1FA774] bg-[#1FA774]" : "border-slate-300"
                      )}>
                        {selectedTemplate === template.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-sm text-[#0B1F3A] mb-1">{template.name}</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{template.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="w-full justify-start gap-2 bg-transparent p-0 h-auto overflow-x-auto no-scrollbar mb-6">
                {['personal', 'experience', 'education', 'skills', 'projects', 'extras'].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-xl px-5 py-2.5 bg-white border border-slate-100 data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white font-black text-[10px] uppercase tracking-widest shadow-sm transition-all"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="personal" className="mt-0 space-y-6 outline-none">
                <Card className="p-8 border-none rounded-[2rem] bg-white shadow-xl shadow-blue-500/5 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#1E5EFF]">
                        {profilePhoto ? <img src={profilePhoto} className="w-full h-full object-cover" /> : <User className="w-10 h-10 text-slate-300" />}
                      </div>
                      <input type="file" id="photo-p" className="hidden" onChange={handlePhotoUpload} />
                      <label htmlFor="photo-p" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-[#0B1F3A] text-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#1E5EFF]">
                        <Upload className="w-4 h-4" />
                      </label>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase tracking-widest text-[#0B1F3A]">Identity Nodes</h3>
                      <p className="text-[10px] text-slate-400 font-medium">Basic contact & profile summary data.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                      <Input value={personalInfo.fullName} onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })} className="h-12 rounded-xl border-slate-100 bg-slate-50/50" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Job Title</Label>
                      <Input value={personalInfo.title} onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })} className="h-12 rounded-xl border-slate-100 bg-slate-50/50" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</Label>
                      <Input value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} className="h-12 rounded-xl border-slate-100 bg-slate-50/50" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone</Label>
                      <Input value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} className="h-12 rounded-xl border-slate-100 bg-slate-50/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Professional Summary</Label>
                      <EnhanceButton text={personalInfo.summary} type="summary" onResult={(res) => setPersonalInfo({ ...personalInfo, summary: res })} />
                    </div>
                    <Textarea rows={4} value={personalInfo.summary} onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })} className="rounded-xl border-slate-100 bg-slate-50/50 resize-none" placeholder="Who you be na career wise?" />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="mt-0 outline-none space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#0B1F3A]">Work History</h3>
                  <Button onClick={addExperience} variant="ghost" className="text-[#1FA774] font-black uppercase tracking-[0.2em] text-[10px] gap-2"><Plus className="w-4 h-4" /> Add Record</Button>
                </div>
                {experience.map((exp) => (
                  <Card key={exp.id} className="p-8 border-none rounded-[2rem] bg-white shadow-sm border border-slate-50 space-y-6 relative group">
                    <button onClick={() => removeExperience(exp.id)} className="absolute top-6 right-6 p-2 rounded-lg bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Company</Label>
                        <Input value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="h-11 rounded-xl border-slate-100" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Position</Label>
                        <Input value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} className="h-11 rounded-xl border-slate-100" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Impact & Achievements</Label>
                        <EnhanceButton text={exp.description} type="experience" onResult={(res) => updateExperience(exp.id, 'description', res)} />
                      </div>
                      <Textarea rows={3} value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} className="rounded-xl border-slate-100 bg-slate-50/10" />
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="education" className="mt-0 outline-none space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#0B1F3A]">Academic Dossier</h3>
                  <Button onClick={addEducation} variant="ghost" className="text-[#1FA774] font-black uppercase tracking-[0.2em] text-[10px] gap-2"><Plus className="w-4 h-4" /> Add Study</Button>
                </div>
                {education.map((edu) => (
                  <Card key={edu.id} className="p-8 border-none rounded-[2rem] bg-white shadow-sm border border-slate-50 space-y-6 relative group">
                    <button onClick={() => removeEducation(edu.id)} className="absolute top-6 right-6 p-2 rounded-lg bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">School / University</Label>
                      <Input value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} placeholder="e.g. Fourah Bay College" className="h-11 rounded-xl border-slate-100" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Qualification</Label>
                        <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="e.g. BSc" className="h-11 rounded-xl border-slate-100" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Field</Label>
                        <Input value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} placeholder="e.g. Economics" className="h-11 rounded-xl border-slate-100" />
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="skills" className="mt-0 outline-none space-y-6">
                <Card className="p-8 border-none rounded-[2rem] bg-white shadow-xl shadow-blue-500/5 space-y-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Technical & Soft Skills</Label>
                    <Textarea rows={4} value={skills} onChange={(e) => setSkills(e.target.value)} className="rounded-xl border-slate-100 bg-slate-50/50 h-32" placeholder="List your powers..." />
                  </div>

                  <div className="bg-blue-50/50 rounded-[1.5rem] p-6 border border-blue-100 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-lg"><BadgeCheck className="w-6 h-6" /></div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#0B1F3A]">Skill Verification Engine</h4>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Verified skills get a blue badge on your PDF. This increases trust with employers na Freetown by 40%.</p>
                      <Button
                        size="sm"
                        className="bg-[#0B1F3A] h-9 px-6 rounded-lg font-black uppercase tracking-widest text-[9px]"
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
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#0B1F3A]">Portfolio Items</h3>
                  <Button onClick={addProject} variant="ghost" className="text-[#1FA774] font-black uppercase tracking-[0.2em] text-[10px] gap-2"><Plus className="w-4 h-4" /> New Project</Button>
                </div>
                {projects.map((p) => (
                  <Card key={p.id} className="p-8 border-none rounded-[2rem] bg-white shadow-sm border border-slate-50 space-y-4 relative group">
                    <button onClick={() => removeProject(p.id)} className="absolute top-6 right-6 p-2 rounded-lg bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                    <Input value={p.name} onChange={(e) => updateProject(p.id, 'name', e.target.value)} placeholder="Project Name" className="h-11 rounded-xl border-slate-100 font-bold" />
                    <Textarea value={p.description} onChange={(e) => updateProject(p.id, 'description', e.target.value)} placeholder="Wetin you build?" className="rounded-xl border-slate-100 text-xs" />
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* PREVIEW (RIGHT) */}
          {showPreview && (
            <div className="lg:col-span-6 sticky top-8">
              <div className="bg-slate-200/50 rounded-[2.5rem] p-4 flex justify-center border-2 border-dashed border-slate-200 overflow-hidden min-h-[600px] relative group">
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge className="bg-[#0B1F3A] text-white px-4 py-2 rounded-full font-black uppercase tracking-widest text-[8px] animate-pulse">Live Canvas</Badge>
                </div>

                <div className="origin-top scale-[0.6] md:scale-[0.5] xl:scale-[0.45] 2xl:scale-[0.55] transition-transform duration-500">
                  {(() => {
                    const selectedTemplateObj = CV_TEMPLATES.find(t => t.id === selectedTemplate)
                    const TemplateComponent = selectedTemplateObj?.component

                    if (!TemplateComponent) return null

                    const cvData = {
                      personalInfo,
                      experience,
                      education,
                      skills,
                      verifiedSkills,
                      profilePhoto,
                      projects,
                      certifications,
                      languages
                    }

                    return <TemplateComponent data={cvData} templateRef={cvPreviewRef} />
                  })()}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </DashboardLayout>
  )
}
