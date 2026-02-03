"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, ArrowLeft, CheckCircle2, User, MapPin, GraduationCap, Target, Sparkles, Camera, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { motion, AnimatePresence } from "framer-motion"

const DISTRICTS = [
  "Western Urban", "Western Rural", "Bo", "Bombali", "Bonthe", "Falaba",
  "Kailahun", "Kambia", "Karene", "Kenema", "Koinadugu", "Kono",
  "Moyamba", "Port Loko", "Pujehun", "Tonkolili"
]

const EDUCATION_LEVELS = [
  "Secondary School", "Vocational Training", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD"
]

export default function OnboardingPage() {
  const router = useRouter()
  const { profile, updateProfile, completeOnboarding, isLoading } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(profile.profile_picture_url || "")

  const [formData, setFormData] = useState({
    full_name: profile.full_name || "",
    email: profile.email || "",
    phone: profile.phone || "",
    district: profile.district || "",
    highest_education: profile.highest_education || "",
    interests: profile.interests?.join(", ") || "",
    career_goal: profile.career_goal || ""
  })

  useEffect(() => {
    if (profile.profile_completed) {
      router.push('/dashboard')
    }
  }, [profile.profile_completed, router])

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      toast.error("Please fill in all required fields.")
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const validateStep = () => {
    if (step === 1) return !!formData.full_name
    if (step === 2) return !!formData.district
    if (step === 3) return !!formData.highest_education
    return true
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      let finalImageUrl = previewUrl

      // 1. Upload Image if exists
      if (avatarFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', avatarFile)
        uploadFormData.append('userId', profile.anon_id || "anonymous")

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData
        })
        const uploadData = await uploadRes.json()
        if (uploadData.success && uploadData.publicUrl) {
          finalImageUrl = uploadData.publicUrl
        }
      }

      // 2. Save Profile
      const profileData = {
        ...formData,
        // Map to DB keys
        location: formData.district,
        education_level: formData.highest_education,
        phone_number: formData.phone,
        interests: formData.interests.split(',').map(s => s.trim()).filter(Boolean),
        avatar_url: finalImageUrl,
        profile_picture_url: finalImageUrl, // Keep for local safety
        profile_completed: true,
        is_complete: true // Keep legacy flag sync
      }

      // I will use completeOnboarding instead of updateProfile to ensure flags are set
      await completeOnboarding(profileData)

      // 3. Trigger AI Recommendations (Fire and forget or wait?)
      // We'll redirect to dashboard, dashboard will trigger if missing
      toast.success("Profile saved! Initializing AI recommendations...")

      router.push('/dashboard?init_ai=true')
    } catch (error) {
      console.error("Save failed:", error)
      toast.error("Failed to save profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mb-4" />
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Initializing Identity</h2>
        <p className="text-slate-500 text-sm mt-2">Preparing your secure workspace...</p>
      </div>
    )
  }

  const progress = (step / 4) * 100

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Image src="/images/core/logo.png" alt="Logo" width={48} height={48} className="rounded-xl shadow-lg" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Complete Your Profile</h1>
          <p className="text-slate-500 font-medium">Step {step} of 4</p>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mt-4">
            <motion.div
              className="h-full bg-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="p-8 md:p-12 bg-white shadow-2xl rounded-[2.5rem] border-none">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <User className="text-emerald-500" /> Basic Information
                  </h2>
                  <p className="text-slate-500 text-sm">Tell us who you are.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-bold">Full Name *</Label>
                    <Input
                      value={formData.full_name}
                      onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="e.g. Samuel Bangura"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Email Address (Optional)</Label>
                    <Input
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sam@example.com"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Phone Number (Optional)</Label>
                    <Input
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +232 77 000 000"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <MapPin className="text-emerald-500" /> Location
                  </h2>
                  <p className="text-slate-500 text-sm">Where are you based in Sierra Leone?</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-bold">District *</Label>
                    <Select
                      value={formData.district}
                      onValueChange={val => setFormData({ ...formData, district: val })}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select District..." />
                      </SelectTrigger>
                      <SelectContent>
                        {DISTRICTS.map(d => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <GraduationCap className="text-emerald-500" /> Education & Interests
                  </h2>
                  <p className="text-slate-500 text-sm">Your goals and background.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-bold">Highest Education *</Label>
                    <Select
                      value={formData.highest_education}
                      onValueChange={val => setFormData({ ...formData, highest_education: val })}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select Level..." />
                      </SelectTrigger>
                      <SelectContent>
                        {EDUCATION_LEVELS.map(l => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Primary Career Goal</Label>
                    <Input
                      value={formData.career_goal}
                      onChange={e => setFormData({ ...formData, career_goal: e.target.value })}
                      placeholder="e.g. Civil Engineer, Nurse, Tech Entrepreneur"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Interests (Comma separated)</Label>
                    <Input
                      value={formData.interests}
                      onChange={e => setFormData({ ...formData, interests: e.target.value })}
                      placeholder="e.g. Healthcare, Solar Energy, Data Science"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Camera className="text-emerald-500" /> Optional: Profile Picture
                  </h2>
                  <p className="text-slate-500 text-sm">Add a face to your profile.</p>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <div className="relative w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                    {previewUrl ? (
                      <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-slate-300" />
                    )}
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="avatar-upload"
                      className="flex items-center justify-center gap-2 h-12 w-full bg-slate-900 text-white rounded-xl font-bold cursor-pointer hover:bg-slate-800 transition-all"
                    >
                      <Camera className="w-4 h-4" /> Upload Photo
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setAvatarFile(file)
                          const reader = new FileReader()
                          reader.onloadend = () => setPreviewUrl(reader.result as string)
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-4 mt-12 pt-8 border-t border-slate-100">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="h-12 px-8 rounded-xl font-bold"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            )}
            <Button
              onClick={step === 4 ? handleSubmit : handleNext}
              disabled={loading}
              className="flex-1 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {step === 4 ? 'Complete Profile' : 'Next Section'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Footer Branded */}
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            CareerPilot Salone • Secure & Anonymous
          </p>
        </div>
      </div>
    </div>
  )
}
