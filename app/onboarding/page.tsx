"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Navigation } from "@/components/navigation"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface OnboardingData {
  name: string
  age: string
  email: string
  location: string
  education: string
  skills: string
  interests: string
  workExperience: string
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const [data, setData] = useState<OnboardingData>({
    name: "",
    age: "",
    email: "",
    location: "",
    education: "",
    skills: "",
    interests: "",
    workExperience: "",
  })

  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Save data to localStorage for demo purposes
      localStorage.setItem("userProfile", JSON.stringify(data))
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const updateData = (field: keyof OnboardingData, value: string) => {
    setData({ ...data, [field]: value })
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return data.name && data.age && data.email
      case 2:
        return data.location && data.education
      case 3:
        return data.skills && data.interests
      case 4:
        return true // Work experience is optional
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="relative h-48 rounded-lg overflow-hidden mb-8">
          <Image
            src="/onboarding-welcome.jpg"
            alt="Welcome to CareerPilot Salone"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-3xl font-bold mb-2">Welcome to CareerPilot Salone!</h1>
            <p className="text-sm max-w-md">
              Let's get to know you better so we can provide personalized career guidance.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              Step {step} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-6 md:p-8">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Basic Information</h2>
                <p className="text-muted-foreground text-sm">Tell us about yourself</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => updateData("name", e.target.value)}
                    placeholder="John Kamara"
                  />
                </div>

                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={data.age}
                    onChange={(e) => updateData("age", e.target.value)}
                    placeholder="25"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => updateData("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location & Education */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Location & Education</h2>
                <p className="text-muted-foreground text-sm">Where are you and what's your education background?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={data.location}
                    onChange={(e) => updateData("location", e.target.value)}
                    placeholder="Freetown, Sierra Leone"
                  />
                </div>

                <div>
                  <Label htmlFor="education">Highest Level of Education *</Label>
                  <select
                    id="education"
                    value={data.education}
                    onChange={(e) => updateData("education", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="">Select your education level</option>
                    <option value="secondary">Secondary School (WASSCE/BECE)</option>
                    <option value="diploma">Diploma</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Skills & Interests */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Skills & Interests</h2>
                <p className="text-muted-foreground text-sm">What are you good at and what do you enjoy?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="skills">Skills *</Label>
                  <Textarea
                    id="skills"
                    value={data.skills}
                    onChange={(e) => updateData("skills", e.target.value)}
                    placeholder="e.g., Communication, Problem-solving, Microsoft Office, Leadership, etc."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground mt-1">List your main skills, separated by commas</p>
                </div>

                <div>
                  <Label htmlFor="interests">Interests & Hobbies *</Label>
                  <Textarea
                    id="interests"
                    value={data.interests}
                    onChange={(e) => updateData("interests", e.target.value)}
                    placeholder="e.g., Technology, Healthcare, Teaching, Business, Creative Arts, etc."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground mt-1">What subjects or activities interest you most?</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Work Experience */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Work Experience</h2>
                <p className="text-muted-foreground text-sm">Tell us about your professional background (optional)</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="workExperience">Work Experience</Label>
                  <Textarea
                    id="workExperience"
                    value={data.workExperience}
                    onChange={(e) => updateData("workExperience", e.target.value)}
                    placeholder="e.g., Intern at XYZ Company (2023), Volunteer at ABC Organization (2022), etc."
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Include jobs, internships, volunteer work, or freelance projects
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button variant="outline" onClick={handleBack} disabled={step === 1}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleNext} disabled={!isStepValid()}>
              {step === totalSteps ? "Complete" : "Next"}
              {step < totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
