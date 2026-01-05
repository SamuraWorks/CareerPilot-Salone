"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, GraduationCap, Lightbulb, Target, BookOpen, MessageSquare } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"


interface OnboardingData {
  educationLevel: string
  subjects: string[]
  interests: string[]
  careerGoal: string
  whatsappNumber: string
  whatsappSubscribed: boolean
}

const EDUCATION_LEVELS = [
  { value: "secondary", label: "Secondary School", desc: "WASSCE/BECE or equivalent" },
  { value: "college", label: "College/University", desc: "Currently enrolled or completed" },
  { value: "graduate", label: "Graduate", desc: "Bachelor's, Master's, or PhD" },
  { value: "self-taught", label: "Self-Taught", desc: "Online courses, bootcamps, etc." }
]

const SUBJECTS = [
  { value: "science", label: "Science & Math", icon: "🔬" },
  { value: "arts", label: "Arts & Humanities", icon: "🎨" },
  { value: "tech", label: "Technology & IT", icon: "💻" },
  { value: "business", label: "Business & Economics", icon: "💼" },
  { value: "health", label: "Health & Medicine", icon: "🏥" },
  { value: "social", label: "Social Sciences", icon: "🌍" }
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
  { value: "employment", label: "Find Employment", desc: "Get a job in my field", icon: "💼" },
  { value: "scholarship", label: "Win a Scholarship", desc: "Continue my education abroad", icon: "🎓" },
  { value: "skill-building", label: "Build Skills", desc: "Learn new professional skills", icon: "📚" },
  { value: "career-switch", label: "Switch Careers", desc: "Transition to a new field", icon: "🔄" }
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const totalSteps = 5
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState<OnboardingData>({
    educationLevel: "",
    subjects: [],
    interests: [],
    careerGoal: "",
    whatsappNumber: "",
    whatsappSubscribed: true
  })

  const progress = (step / totalSteps) * 100

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      try {
        // Simulate saving to a backend
        console.log("Saving profile for user:", user?.id || "anonymous", data)

        localStorage.setItem("userOnboarding", JSON.stringify(data))
        localStorage.setItem("onboardingComplete", "true")

        // Store specific career goal if set
        if (data.careerGoal) {
          localStorage.setItem("activeCareer", data.careerGoal)
        }

        toast.success("Profile created successfully!")
        setTimeout(() => {
          router.push("/dashboard")
        }, 800)
      } catch (error) {
        console.error("Save error:", error)
        toast.error("Failed to save profile. Please try again.")
        setLoading(false)
      }
    }
  }


  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const toggleSelection = (field: "subjects" | "interests", value: string) => {
    const current = data[field]
    if (current.includes(value)) {
      setData({ ...data, [field]: current.filter(v => v !== value) })
    } else {
      setData({ ...data, [field]: [...current, value] })
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1: return data.educationLevel !== ""
      case 2: return data.subjects.length > 0
      case 3: return data.interests.length > 0
      case 4: return data.careerGoal !== ""
      case 5: return data.whatsappNumber !== ""
      default: return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B82F6] via-[#22C55E] to-[#4ADE80]">

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Get to Know You
          </h1>
          <p className="text-white/85 text-lg">
            Answer a few questions so we can personalize your career guidance
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
        </div>

        <Card className="p-8 md:p-12 shadow-2xl overflow-hidden relative">
          <div className="relative h-48 -mt-8 -mx-8 md:-mt-12 md:-mx-12 mb-8">
            <Image
              src="/onboarding_african.png"
              alt="Sierra Leonean Youth"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6 text-white font-black text-2xl drop-shadow-lg">
              Unlock Your Future
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Education Level</h2>
                  <p className="text-muted-foreground">What's your current education status?</p>
                </div>
              </div>

              <div className="grid gap-4">
                {EDUCATION_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setData({ ...data, educationLevel: level.value })}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${data.educationLevel === level.value
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                  >
                    <div className="font-semibold text-lg mb-1">{level.label}</div>
                    <div className="text-sm text-muted-foreground">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Subjects & Skills</h2>
                  <p className="text-muted-foreground">What areas do you excel in? (Select all that apply)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {SUBJECTS.map((subject) => (
                  <button
                    key={subject.value}
                    onClick={() => toggleSelection("subjects", subject.value)}
                    className={`p-6 rounded-2xl border-2 text-center transition-all ${data.subjects.includes(subject.value)
                      ? "border-secondary bg-secondary/5 shadow-md"
                      : "border-border hover:border-secondary/50 hover:bg-muted/50"
                      }`}
                  >
                    <div className="text-3xl mb-2">{subject.icon}</div>
                    <div className="font-semibold">{subject.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Interests</h2>
                  <p className="text-muted-foreground">What activities do you enjoy? (Select all that apply)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest.value}
                    onClick={() => toggleSelection("interests", interest.value)}
                    className={`p-6 rounded-2xl border-2 text-center transition-all ${data.interests.includes(interest.value)
                      ? "border-accent bg-accent/5 shadow-md"
                      : "border-border hover:border-accent/50 hover:bg-muted/50"
                      }`}
                  >
                    <div className="text-3xl mb-2">{interest.icon}</div>
                    <div className="font-semibold text-sm">{interest.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Career Goal</h2>
                  <p className="text-muted-foreground">What's your main objective right now?</p>
                </div>
              </div>

              <div className="grid gap-4">
                {CAREER_GOALS.map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => setData({ ...data, careerGoal: goal.value })}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${data.careerGoal === goal.value
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{goal.icon}</div>
                      <div>
                        <div className="font-semibold text-lg mb-1">{goal.label}</div>
                        <div className="text-sm text-muted-foreground">{goal.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">WhatsApp Updates</h2>
                  <p className="text-muted-foreground">Get instant notifications for new jobs & scholarships.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">WhatsApp Number (with country code)</label>
                  <input
                    type="text"
                    placeholder="+232 7X XXX XXX"
                    value={data.whatsappNumber}
                    onChange={(e) => setData({ ...data, whatsappNumber: e.target.value })}
                    className="w-full p-4 rounded-xl border-2 border-border focus:border-green-500 outline-none transition-all"
                  />
                </div>

                <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-border cursor-pointer hover:bg-muted/50 transition-all">
                  <input
                    type="checkbox"
                    checked={data.whatsappSubscribed}
                    onChange={(e) => setData({ ...data, whatsappSubscribed: e.target.checked })}
                    className="w-5 h-5 accent-green-600"
                  />
                  <div>
                    <div className="font-semibold">Subscribe to Job Alerts</div>
                    <div className="text-xs text-muted-foreground">We'll send you high-priority opportunities via WhatsApp.</div>
                  </div>
                </label>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-10 pt-8 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid() || loading}
              className="rounded-full bg-primary hover:bg-primary/90"
            >
              {loading ? "Saving..." : step === totalSteps ? "Complete Setup" : "Continue"}
              {step < totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
