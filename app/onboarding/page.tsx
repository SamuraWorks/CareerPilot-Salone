"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, ArrowLeft, GraduationCap, Lightbulb, Target, BookOpen, MessageSquare, User, MapPin, Calendar, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"

interface OnboardingData {
  fullName: string
  age: string
  location: string
  educationLevel: string
  subjects: string[]
  interests: string[]
  careerGoal: string
  whatsappNumber: string
  whatsappSubscribed: boolean
  preferredLanguage: string
}

const DISTRICTS = [
  "Bo", "Bombali", "Bonthe", "Falaba", "Freetown (Western Area Urban)",
  "Kailahun", "Kambia", "Karene", "Kenema", "Koinadugu", "Kono",
  "Moyamba", "Port Loko", "Pujehun", "Tonkolili", "Western Area Rural"
]

const EDUCATION_LEVELS = [
  { value: "secondary", label: "Secondary School", desc: "WASSCE/BECE or equivalent" },
  { value: "university", label: "University student", desc: "Currently enrolled" },
  { value: "graduate", label: "Graduate", desc: "Completed degree" },
  { value: "vocational", label: "Vocational/Technical", desc: "Skills-based training" }
]

const SUBJECTS = [
  { value: "science", label: "Science & Math", icon: "🔬" },
  { value: "arts", label: "Arts & Humanities", icon: "🎨" },
  { value: "tech", label: "Technology & IT", icon: "💻" },
  { value: "business", label: "Business & Economics", icon: "💼" },
  { value: "health", label: "Health & Medicine", icon: "🏥" },
  { value: "agriculture", label: "Agriculture", icon: "🌱" }
]

const INTERESTS = [
  { value: "problem-solving", label: "Problem Solving", icon: "🧩" },
  { value: "teaching", label: "Teaching & Mentoring", icon: "👨‍🏫" },
  { value: "building", label: "Building & Creating", icon: "🔨" },
  { value: "helping", label: "Helping People", icon: "🤝" },
  { value: "data", label: "Data & Numbers", icon: "📊" },
  { value: "communication", label: "Communication", icon: "💬" }
]

const CAREER_GOALS = [
  { value: "find-job", label: "Find a Job", desc: "Searching for employment in Salone", icon: "💼" },
  { value: "scholarship", label: "Win a Scholarship", desc: "Funding for further studies", icon: "🎓" },
  { value: "learn-skills", label: "Learn New Skills", desc: "Upskilling for the future", icon: "📚" },
  { value: "career-guidance", label: "Career Guidance", desc: "Not sure which path to take", icon: "🤝" }
]

export default function OnboardingPage() {
  const router = useRouter()
  const { profile, updateProfile } = useAuth()
  const [step, setStep] = useState(1)
  const totalSteps = 5
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState<OnboardingData>(profile)

  // Sync with global profile on mount
  useEffect(() => {
    setData(profile)
  }, [profile])

  const progress = (step / totalSteps) * 100

  const handleNext = async () => {
    // Validate current step
    if (!isStepValid()) {
      toast.error("Please fill in all required fields.")
      return
    }

    // Update global state immediately
    updateProfile(data)

    if (step < totalSteps) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      setLoading(true)
      try {
        localStorage.setItem("onboardingComplete", "true")

        toast.success("Welcome aboard! Your profile is ready.")
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      } catch (error) {
        toast.error("Something went wrong, but your progress is saved.")
        router.push("/dashboard")
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const toggleSelection = (field: "subjects" | "interests", value: string) => {
    const current = data[field]
    let newData;
    if (current.includes(value)) {
      newData = current.filter(v => v !== value)
    } else {
      newData = [...current, value]
    }
    setData({ ...data, [field]: newData })
  }

  const isStepValid = () => {
    switch (step) {
      case 1: return data.fullName.trim().length > 2 && data.age !== "" && data.location !== ""
      case 2: return data.educationLevel !== ""
      case 3: return data.subjects.length > 0
      case 4: return data.interests.length > 0 && data.careerGoal !== ""
      case 5: return data.whatsappNumber.length >= 8
      default: return false
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">

      <div className="max-w-4xl w-full space-y-12 animate-in fade-in duration-700">

        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-primary font-bold text-xs uppercase tracking-wide">Step {step} of {totalSteps}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight font-sans">
            Let's Get to <span className="text-emerald-500">Know You</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium font-sans max-w-xl mx-auto leading-relaxed">
            Help us build your personalized career path in Sierra Leone.
          </p>
        </div>

        {/* Progress Bar - Simplified */}
        <div className="max-w-md mx-auto space-y-3">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-50 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wide">{Math.round(progress)}% Profile Synthesized</p>
        </div>

        {/* Form Card - CLEAN WHITE */}
        <Card className="bg-white border-slate-100 shadow-2xl shadow-blue-500/5 rounded-[3rem] overflow-hidden relative">

          <div className="p-8 md:p-12 space-y-8">

            {/* STEP 1: PERSONAL INFO */}
            {step === 1 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-slate-900 font-sans flex items-center gap-3">
                    <User className="w-8 h-8 text-primary" /> Who are you?
                  </h2>
                  <p className="text-muted-foreground font-medium">Tell us your basic details so we can address you correctly.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-wide text-slate-400">Full Name</Label>
                    <div className="relative">
                      <Input
                        placeholder="Enter your full name"
                        value={data.fullName}
                        onChange={(e) => setData({ ...data, fullName: e.target.value })}
                        className="h-14 pl-12 rounded-2xl border-slate-200 focus-visible:ring-[#1E5EFF]/20 bg-slate-50 font-medium text-lg"
                      />
                      <User className="absolute left-4 top-4 w-6 h-6 text-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-wide text-slate-400">Age</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Your age"
                        value={data.age}
                        onChange={(e) => setData({ ...data, age: e.target.value })}
                        className="h-14 pl-12 rounded-2xl border-slate-200 focus-visible:ring-[#1E5EFF]/20 bg-slate-50 font-medium text-lg"
                      />
                      <Calendar className="absolute left-4 top-4 w-6 h-6 text-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <Label className="text-xs font-bold uppercase tracking-wide text-slate-400">Preferred Language</Label>
                    <div className="flex gap-4">
                      {["English", "Krio"].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setData({ ...data, preferredLanguage: lang })}
                          className={`flex-1 h-14 rounded-2xl border-2 font-bold uppercase tracking-wide text-xs transition-all ${data.preferredLanguage === lang
                            ? "border-primary bg-primary text-white shadow-lg"
                            : "border-slate-100 text-slate-400 hover:border-slate-200 bg-slate-50"
                            }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <Label className="text-xs font-bold uppercase tracking-wide text-slate-400">Location (District)</Label>
                    <div className="relative">
                      <Select value={data.location} onValueChange={(val) => setData({ ...data, location: val })}>
                        <SelectTrigger className="h-14 pl-12 rounded-2xl border-slate-200 focus-visible:ring-[#1E5EFF]/20 bg-slate-50 font-medium text-lg">
                          <SelectValue placeholder="Select your district in Sierra Leone" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-200">
                          {DISTRICTS.map(d => (
                            <SelectItem key={d} value={d} className="py-3 rounded-xl">{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <MapPin className="absolute left-4 top-4 w-6 h-6 text-slate-400 z-10" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: EDUCATION */}
            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-slate-900 font-sans flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-primary" /> Education
                  </h2>
                  <p className="text-muted-foreground font-medium">What is your current or highest education level?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {EDUCATION_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setData({ ...data, educationLevel: level.value })}
                      className={`p-6 rounded-3xl border-2 text-left transition-all group/btn ${data.educationLevel === level.value
                        ? "border-primary bg-primary/5 shadow-inner"
                        : "border-slate-100 hover:border-primary/50 hover:bg-slate-50 shadow-sm"
                        }`}
                    >
                      <div className={`font-bold text-lg mb-1 ${data.educationLevel === level.value ? "text-primary" : "text-slate-900"}`}>
                        {level.label}
                      </div>
                      <div className="text-sm text-slate-500 font-medium">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: SUBJECTS & SKILLS */}
            {step === 3 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-slate-900 font-sans flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-primary" /> Expertise
                  </h2>
                  <p className="text-muted-foreground font-medium">Select the areas you are most skilled in or enjoy studying.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {SUBJECTS.map((subject) => (
                    <button
                      key={subject.value}
                      onClick={() => toggleSelection("subjects", subject.value)}
                      className={`p-6 rounded-3xl border-2 text-center transition-all ${data.subjects.includes(subject.value)
                        ? "border-emerald-500 bg-emerald-500/5 shadow-inner"
                        : "border-slate-100 hover:border-emerald-500/50 hover:bg-slate-50 shadow-sm"
                        }`}
                    >
                      <div className="text-4xl mb-3 transform transition-transform hover:scale-110">{subject.icon}</div>
                      <div className={`font-bold text-sm ${data.subjects.includes(subject.value) ? "text-emerald-500" : "text-slate-900"}`}>
                        {subject.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: INTERESTS & GOALS */}
            {step === 4 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-slate-900 font-sans flex items-center gap-3">
                    <Target className="w-8 h-8 text-primary" /> Direction
                  </h2>
                  <p className="text-muted-foreground font-medium">Tell us what drives you and what your goal is.</p>
                </div>

                <div className="space-y-6">
                  <Label className="text-xs font-bold uppercase tracking-wide text-slate-400">Wetin you lek for do? (Interests)</Label>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map((interest) => (
                      <button
                        key={interest.value}
                        onClick={() => toggleSelection("interests", interest.value)}
                        className={`px-6 py-3 rounded-full border-2 font-bold text-sm transition-all flex items-center gap-2 ${data.interests.includes(interest.value)
                          ? "border-primary bg-primary text-white shadow-lg"
                          : "border-slate-100 text-slate-500 hover:border-slate-300"
                          }`}
                      >
                        <span>{interest.icon}</span>
                        {interest.label}
                      </button>
                    ))}
                  </div>

                  <Label className="text-xs font-bold uppercase tracking-wide text-slate-400 block mt-8">Your Main Goal</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CAREER_GOALS.map((goal) => (
                      <button
                        key={goal.value}
                        onClick={() => setData({ ...data, careerGoal: goal.value })}
                        className={`p-6 rounded-3xl border-2 text-left transition-all ${data.careerGoal === goal.value
                          ? "border-emerald-500 bg-emerald-500/5 shadow-inner"
                          : "border-slate-100 hover:border-emerald-500/50 hover:bg-slate-50 shadow-sm"
                          }`}
                      >
                        <div className="flex gap-4">
                          <div className="text-3xl">{goal.icon}</div>
                          <div>
                            <div className={`font-bold text-base ${data.careerGoal === goal.value ? "text-emerald-500" : "text-slate-900"}`}>
                              {goal.label}
                            </div>
                            <div className="text-[12px] text-slate-500 font-medium">{goal.desc}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: CONTACT */}
            {step === 5 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-slate-900 font-sans flex items-center gap-3">
                    <MessageSquare className="w-8 h-8 text-primary" /> Contact
                  </h2>
                  <p className="text-muted-foreground font-medium">We'll send important updates via WhatsApp.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-wide text-slate-400">WhatsApp Number</Label>
                    <div className="relative">
                      <Input
                        placeholder="+232 7X XXX XXX"
                        value={data.whatsappNumber}
                        onChange={(e) => setData({ ...data, whatsappNumber: e.target.value })}
                        className="h-16 pl-14 rounded-2xl border-slate-200 focus-visible:ring-primary/20 bg-slate-50 font-bold text-xl tracking-wide"
                      />
                      <MessageSquare className="absolute left-4 top-5 w-6 h-6 text-emerald-500" />
                    </div>
                  </div>

                  <div className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer flex items-center gap-4 ${data.whatsappSubscribed ? 'bg-green-50 border-green-200 shadow-inner' : 'bg-slate-50 border-slate-100'}`} onClick={() => setData({ ...data, whatsappSubscribed: !data.whatsappSubscribed })}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${data.whatsappSubscribed ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Subscribe to AI-Powered Alerts</h4>
                      <p className="text-xs text-slate-500 font-medium">Get matched with jobs and scholarships as they drop!</p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-[2rem] border-none flex items-start gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-2xl">🔒</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-tight">Security & Privacy</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Your number is saved securely and used only for career-related updates. We never share your data with third parties.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-100">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1 || loading}
                className="rounded-2xl h-14 px-8 font-bold text-slate-400 hover:text-[#0B1F3A] transition-all"
              >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid() || loading}
                className={`rounded-2xl h-14 px-10 font-bold text-white shadow-xl transition-all active:scale-95 ${step === totalSteps ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-primary hover:bg-primary/90'}`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                    Saving...
                  </div>
                ) : (
                  <>
                    {step === totalSteps ? "Finish Setup" : "Next Step"}
                    {step < totalSteps && <ArrowRight className="w-5 h-5 ml-2" />}
                  </>
                )}
              </Button>
            </div>

          </div>
        </Card>

        {/* Support Text */}
        <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-wide pb-8">
          Powered by CareerPilot AI & Supabase Salone
        </p>

      </div>
    </div>
  )
}
