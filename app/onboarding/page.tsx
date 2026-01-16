"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, ArrowLeft, GraduationCap, Briefcase, Target, Zap, User, MapPin, CheckCircle2, Sparkles, Brain, Award, Globe, Building2, HelpCircle } from "lucide-react"
import { toast } from "sonner"
import { useAuth, type UserProfile } from "@/lib/auth-context"

const DISTRICTS = [
  "Bo", "Bombali", "Bonthe", "Falaba", "Freetown (Western Area Urban)",
  "Kailahun", "Kambia", "Karene", "Kenema", "Koinadugu", "Kono",
  "Moyamba", "Port Loko", "Pujehun", "Tonkolili", "Western Area Rural"
]

export default function OnboardingPage() {
  const router = useRouter()
  const { profile, updateProfile } = useAuth()
  const [step, setStep] = useState(1) // 1 to 9
  const totalSteps = 9
  const [loading, setLoading] = useState(false)

  // Local state for the form
  const [data, setData] = useState<UserProfile>(profile)

  // Sync only on mount
  useEffect(() => {
    if (profile.fullName) setData(profile)
  }, [])

  const progress = (step / totalSteps) * 100

  const handleNext = async () => {
    if (!isStepValid()) {
      toast.error("Please fill in the required fields.")
      return
    }

    updateProfile(data)

    if (step < totalSteps) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      finishOnboarding()
    }
  }

  const finishOnboarding = async () => {
    setLoading(true)
    try {
      localStorage.setItem("onboardingComplete", "true")
      // Simulate AI Processing
      await new Promise(r => setTimeout(r, 1500))
      toast.success("Profile Synthesized. Launching CareerPilot.")
      router.push("/dashboard")
    } catch (error) {
      setLoading(false)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  // VALIDATION LOGIC
  const isStepValid = () => {
    switch (step) {
      case 1: return !!data.fullName && !!data.status && !!data.location // Position
      case 2: return !!data.careerGoal // Targeting
      case 3: return !!data.educationLevel // Education
      case 4: return true // Experience (Optional/Adaptive)
      case 5: return !!data.hardSkills?.length // Skills
      case 6: return true // Certs (Optional)
      case 7: return !!data.workStyle // Work Style
      case 8: return !!data.resumeData?.professionalHook // The Hook (New)
      case 9: return true // Confidence (Optional)
      default: return false
    }
  }

  // HELPER FOR MULTI-SELECT
  const toggleWorkStyle = (field: 'environment' | 'orgType', value: string) => {
    const current = data.workStyle?.[field] || []
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]

    setData({
      ...data,
      workStyle: { ...data.workStyle, [field]: updated } as any
    })
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-6 animate-in fade-in duration-700">

        {/* Progress Header */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold text-sm">
              {step}/{totalSteps}
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-none">Career Intake</h1>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">AI Profile Synthesis</p>
            </div>
          </div>
          <Button variant="ghost" className="text-slate-400 hover:text-red-500 text-xs uppercase" onClick={() => router.push('/dashboard')}>Skip Setup</Button>
        </div>

        <div className="h-1 bg-slate-100 rounded-full overflow-hidden w-full">
          <div className="h-full bg-emerald-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>

        <Card className="bg-white border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden min-h-[500px] flex flex-col">
          <div className="p-8 md:p-12 flex-1 flex flex-col">

            {/* --- SECTION 1: CURRENT POSITION --- */}
            {step === 1 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">Let's start with the basics.</h2>
                  <p className="text-slate-500 font-medium text-lg">Who are you right now?</p>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="uppercase text-xs font-black text-slate-400">Full Name</Label>
                      <Input value={data.fullName} onChange={e => setData({ ...data, fullName: e.target.value })} className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase text-xs font-black text-slate-400">Location (District)</Label>
                      <Select value={data.location} onValueChange={val => setData({ ...data, location: val })}>
                        <SelectTrigger className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold"><SelectValue placeholder="Select..." /></SelectTrigger>
                        <SelectContent>{DISTRICTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="uppercase text-xs font-black text-slate-400">Which best describes you?</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {['Secondary School Student', 'University Student', 'Graduate', 'Working Professional', 'Career Switcher'].map(s => (
                        <button
                          key={s}
                          onClick={() => setData({ ...data, status: s.toLowerCase().includes('student') ? 'student' : 'employed' })}
                          className={`p-4 rounded-xl border-2 text-left font-bold text-sm transition-all ${(data.status === 'student' && s.includes('Student')) || (data.status === 'employed' && !s.includes('Student'))
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-slate-100 hover:border-slate-200 text-slate-600"
                            }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- SECTION 2: CAREER TARGETING --- */}
            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">Define your North Star.</h2>
                  <p className="text-slate-500 font-medium text-lg">What role are you aiming for?</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2 pl-4 border-l-4 border-emerald-500">
                    <Label className="uppercase text-xs font-black text-emerald-600">Primary Target Role</Label>
                    <Input
                      value={data.careerGoal}
                      onChange={e => setData({ ...data, careerGoal: e.target.value })}
                      className="h-16 text-2xl font-black bg-transparent border-none p-0 focus-visible:ring-0 placeholder:text-slate-300"
                      placeholder="e.g. Civil Engineer"
                    />
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl space-y-4">
                    <p className="text-sm font-bold text-slate-700">Are you open to related roles?</p>
                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1 border-slate-200">Yes, I'm flexible</Button>
                      <Button variant="outline" className="flex-1 border-slate-200">No, focused only</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- SECTION 3: EDUCATION --- */}
            {step === 3 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">Academic Foundation.</h2>
                  <p className="text-slate-500 font-medium text-lg">Where did you learn your craft?</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="uppercase text-xs font-black text-slate-400">Highest Level Completed</Label>
                    <Select value={data.educationLevel} onValueChange={val => setData({ ...data, educationLevel: val })}>
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>{["High School", "Vocational", "Bachelor Degree", "Masters", "PhD"].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="uppercase text-xs font-black text-slate-400">Institution Name</Label>
                      <Input
                        value={data.educationDetails?.institution}
                        onChange={e => setData({ ...data, educationDetails: { ...data.educationDetails, institution: e.target.value } as any })}
                        className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase text-xs font-black text-slate-400">Graduation Year</Label>
                      <Input
                        placeholder="e.g. 2025"
                        value={data.educationDetails?.gradYear}
                        onChange={e => setData({ ...data, educationDetails: { ...data.educationDetails, gradYear: e.target.value } as any })}
                        className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-xs font-black text-slate-400">Field of Study</Label>
                    <Input
                      value={data.educationDetails?.field}
                      onChange={e => setData({ ...data, educationDetails: { ...data.educationDetails, field: e.target.value } as any })}
                      className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* --- SECTION 4: EXPERIENCE MAPPING --- */}
            {step === 4 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">Experience Mapping.</h2>
                  <p className="text-slate-500 font-medium text-lg">Have you worked in a formal role before?</p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4 mb-6">
                    <Button
                      size="lg"
                      className={`flex-1 rounded-2xl font-bold text-lg h-16 ${data.experienceYears !== '0' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}
                      onClick={() => setData({ ...data, experienceYears: '1+' })}
                    >
                      Yes, I have
                    </Button>
                    <Button
                      size="lg"
                      className={`flex-1 rounded-2xl font-bold text-lg h-16 ${data.experienceYears === '0' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}
                      onClick={() => setData({ ...data, experienceYears: '0' })}
                    >
                      No, not yet
                    </Button>
                  </div>

                  {data.experienceYears !== '0' ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                      <div className="p-6 border border-emerald-500/20 bg-emerald-50/30 rounded-2xl space-y-4">
                        <Label className="uppercase text-xs font-black text-emerald-600">Most Recent Role Details</Label>
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input placeholder="Job Title" value={data.resumeData?.recentRole} onChange={e => setData({ ...data, resumeData: { ...data.resumeData, recentRole: e.target.value } })} className="bg-white border-0 h-12 rounded-xl font-bold" />
                          <Input placeholder="Company / Organization" className="bg-white border-0 h-12 rounded-xl font-bold" />
                        </div>
                        <Textarea placeholder="Key Outcome: e.g. Increased sales by 20%..." value={data.resumeData?.keyAchievement} onChange={e => setData({ ...data, resumeData: { ...data.resumeData, keyAchievement: e.target.value } })} className="bg-white border-0 rounded-xl min-h-[100px]" />

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="uppercase text-xs font-black text-emerald-600">Impact Metric "$"</Label>
                            <Input placeholder="e.g. $50k Saved / 30% Growth" value={data.resumeData?.impactMetric} onChange={e => setData({ ...data, resumeData: { ...data.resumeData, impactMetric: e.target.value } })} className="bg-white border-0 h-12 rounded-xl font-bold" />
                          </div>
                          <div className="space-y-2">
                            <Label className="uppercase text-xs font-black text-emerald-600">Leadership Action</Label>
                            <Input placeholder="e.g. Led team of 5" value={data.resumeData?.leadershipAction} onChange={e => setData({ ...data, resumeData: { ...data.resumeData, leadershipAction: e.target.value } })} className="bg-white border-0 h-12 rounded-xl font-bold" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                      <div className="p-6 border border-blue-500/20 bg-blue-50/30 rounded-2xl space-y-4">
                        <Label className="uppercase text-xs font-black text-blue-600">Project / Volunteer Experience</Label>
                        <Input placeholder="Project Name or Role" value={data.resumeData?.topProject} onChange={e => setData({ ...data, resumeData: { ...data.resumeData, topProject: e.target.value } })} className="bg-white border-0 h-12 rounded-xl font-bold" />
                        <Textarea placeholder="What did you build or lead?" value={data.resumeData?.leadership} onChange={e => setData({ ...data, resumeData: { ...data.resumeData, leadership: e.target.value } })} className="bg-white border-0 rounded-xl min-h-[100px]" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- SECTION 5: SKILLS --- */}
            {step === 5 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">Skill Extraction.</h2>
                  <p className="text-slate-500 font-medium text-lg">What tools and technologies do you use?</p>
                </div>

                <div className="space-y-6">
                  <Label className="uppercase text-xs font-black text-slate-400">Hard Skills (Comma Separated)</Label>
                  <Textarea
                    placeholder="e.g. Microsoft Excel, React, Trello, Financial Audit, Canva..."
                    value={data.hardSkills?.join(", ")}
                    onChange={e => setData({ ...data, hardSkills: e.target.value.split(",").map(s => s.trim()) })}
                    className="min-h-[150px] text-lg font-medium p-6 bg-slate-50 border-slate-100 rounded-3xl resize-none"
                  />
                  <div className="flex flex-wrap gap-2">
                    {data.hardSkills?.filter(s => s).map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-black uppercase rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- SECTION 6: CERTIFICATIONS --- */}
            {step === 6 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">Credibility Boosters.</h2>
                  <p className="text-slate-500 font-medium text-lg">Certifications, Awards, or Languages?</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="uppercase text-xs font-black text-slate-400">Certifications (Optional)</Label>
                    <Textarea placeholder="e.g. Google Project Management, CISCO CCNA (List them here)" className="min-h-[100px] bg-slate-50 border-slate-100 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-xs font-black text-slate-400">Languages</Label>
                    <Input placeholder="e.g. English (Fluent), Krio (Native)" className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold" />
                  </div>
                </div>
              </div>
            )}

            {/* --- SECTION 7: WORK STYLE --- */}
            {step === 7 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">Work Context.</h2>
                  <p className="text-slate-500 font-medium text-lg">To improve our job recommendations.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Label className="uppercase text-xs font-black text-slate-400">Environment</Label>
                    <div className="flex flex-col gap-3">
                      {['Office', 'Remote', 'Field Work', 'Hybrid'].map(e => (
                        <div key={e} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <Checkbox id={e} checked={data.workStyle?.environment?.includes(e)} onCheckedChange={() => toggleWorkStyle('environment', e)} />
                          <label htmlFor={e} className="font-bold text-sm text-slate-700">{e}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="uppercase text-xs font-black text-slate-400">Organization Type</Label>
                    <div className="flex flex-col gap-3">
                      {['Corporate', 'NGO / Non-Profit', 'Government', 'Startup'].map(e => (
                        <div key={e} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <Checkbox id={e} checked={data.workStyle?.orgType?.includes(e)} onCheckedChange={() => toggleWorkStyle('orgType', e)} />
                          <label htmlFor={e} className="font-bold text-sm text-slate-700">{e}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- SECTION 8: THE HOOK (NEW) --- */}
            {step === 8 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">The Secret Weapon.</h2>
                  <p className="text-slate-500 font-medium text-lg">What makes you genuinely unique?</p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-purple-50 rounded-3xl border border-purple-100 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-purple-900">Your Professional Hook</h3>
                        <p className="text-sm text-purple-600/80 leading-relaxed">
                          This text will be the <strong>opening line</strong> of your cover letters. Make it punchy.
                        </p>
                      </div>
                    </div>
                    <Textarea
                      placeholder="e.g. I combine 5 years of Civil Engineering with a passion for sustainable materials..."
                      value={data.resumeData?.professionalHook}
                      onChange={e => setData({ ...data, resumeData: { ...data.resumeData, professionalHook: e.target.value } })}
                      className="bg-white border-0 text-lg font-medium p-4 min-h-[120px] rounded-xl text-slate-700"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* --- SECTION 9: CONFIDENCE (FINAL) --- */}
            {step === 9 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900">Final Pulse Check.</h2>
                  <p className="text-slate-500 font-medium text-lg">What is your biggest challenge right now?</p>
                </div>

                <div className="grid gap-3">
                  {['Lack of Experience', 'CV not getting replies', 'Interview Anxiety', 'Unsure of Career Path', 'Lack of Connections'].map((c) => (
                    <button key={c} className="p-4 rounded-xl border border-slate-200 text-left font-bold text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}


          </div>

          <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <Button variant="ghost" onClick={handleBack} disabled={step === 1} className="font-bold text-slate-400">Back</Button>
            <Button onClick={handleNext} disabled={loading} className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-14 px-8 rounded-xl shadow-xl">
              {step === totalSteps ? (loading ? 'Synthesizing...' : 'Complete Profile') : 'Next Step'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

      </div>
    </div>
  )
}
