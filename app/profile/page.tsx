"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { ProfileImageUpload } from "@/components/profile-image-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { Loader2, Save, MessageCircle, MapPin, GraduationCap, Briefcase, FileText, Sparkles, User, Target } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"

const DISTRICTS = [
  "Western Urban", "Western Rural", "Bo", "Bombali", "Bonthe", "Falaba",
  "Kailahun", "Kambia", "Karene", "Kenema", "Koinadugu", "Kono",
  "Moyamba", "Port Loko", "Pujehun", "Tonkolili"
]

const EDUCATION_LEVELS = [
  "Secondary School", "Vocational Training", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD"
]
export default function ProfilePage() {
  const { profile, updateProfile, isLoading } = useAuth()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<any>({})
  const router = useRouter()

  // Hydrate form on load
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        career_goal: profile.career_goal || "",
        location: profile.location || profile.district || "",
        district: profile.district || profile.location || "",
        education_level: profile.education_level || profile.highest_education || "",
        highest_education: profile.highest_education || profile.education_level || "",
        phone_number: profile.phone_number || profile.phone || "",
        phone: profile.phone || profile.phone_number || "",
        email: profile.email || "",
        whatsapp_opt_in: profile.whatsapp_opt_in || false,
        interests: profile.interests?.join(", ") || "",
        skills: profile.skills?.join(", ") || "",
        status: profile.status || ""
      })
    }
  }, [profile])

  const handleSave = async () => {
    setSaving(true)
    try {
      // Parse array fields
      const skillsArray = typeof formData.skills === 'string'
        ? formData.skills.split(',').map((s: string) => s.trim()).filter(Boolean)
        : formData.skills

      const interestsArray = typeof formData.interests === 'string'
        ? formData.interests.split(',').map((i: string) => i.trim()).filter(Boolean)
        : formData.interests

      await updateProfile({
        ...formData,
        // Ensure both field styles are updated
        district: formData.district || formData.location,
        location: formData.location || formData.district,
        highest_education: formData.highest_education || formData.education_level,
        education_level: formData.education_level || formData.highest_education,
        phone: formData.phone || formData.phone_number,
        phone_number: formData.phone_number || formData.phone,
        skills: skillsArray,
        interests: interestsArray,
        is_complete: true,
        profile_completed: true,
        last_updated_at: new Date().toISOString()
      })

      toast.success("Profile saved successfully!")
    } catch (e) {
      toast.error("Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">Global Profile v2.0</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-[#0B1F3A]">Management Room</h1>
            <p className="text-slate-500 font-medium">
              Update your career DNA to get better AI recommendations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-2xl h-12" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
            <Button className="bg-[#0B1F3A] hover:bg-slate-800 rounded-2xl h-12" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Area */}
          <div className="space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
              <CardContent className="pt-10 pb-10 text-center">
                <div className="flex justify-center mb-6">
                  <ProfileImageUpload />
                </div>
                <h2 className="text-xl font-bold text-[#0B1F3A]">{profile?.full_name || "Scholar"}</h2>
                <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mt-1">
                  {profile.location || "Sierra Leone"}
                </p>
                <div className="mt-8 flex flex-col gap-2">
                  <div className="px-4 py-3 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between items-center">
                    <span>Public ID</span>
                    <span className="text-[#0B1F3A] font-mono">{profile.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2.5rem] border-none shadow-sm bg-gradient-to-br from-[#0B1F3A] to-slate-800 text-white p-8">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-lg">AI Calibration</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-medium">
                Your profile data directly influences the AI matching engine for careers and scholarships. Keep it updated for 100% accuracy.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center"><Briefcase className="w-4 h-4" /></div>
                  <span className="text-xs font-bold text-white/80">Careers Syncing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center"><FileText className="w-4 h-4" /></div>
                  <span className="text-xs font-bold text-white/80">CV Engine Ready</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Core Identity */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="p-8 border-b border-slate-50">
                <CardTitle className="text-lg font-bold flex items-center gap-3">
                  <User className="w-5 h-5 text-emerald-500" /> Identity Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-400">Full Legal Name</Label>
                  <Input
                    id="name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="h-12 rounded-xl border-slate-100"
                    placeholder="e.g. Aminata Kamara"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 rounded-xl border-slate-100"
                      placeholder="e.g. am@example.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-slate-400">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone_number}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value, phone: e.target.value })}
                      className="h-12 rounded-xl border-slate-100"
                      placeholder="+232..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="district" className="text-xs font-black uppercase tracking-widest text-slate-400">District Base</Label>
                    <select
                      id="district"
                      className="flex h-12 w-full rounded-xl border border-slate-100 bg-background px-3 py-2 text-sm font-bold ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value, location: e.target.value })}
                    >
                      <option value="">Select District</option>
                      {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="education" className="text-xs font-black uppercase tracking-widest text-slate-400">Highest Education</Label>
                    <select
                      id="education"
                      className="flex h-12 w-full rounded-xl border border-slate-100 bg-background px-3 py-2 text-sm font-bold ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                      value={formData.highest_education}
                      onChange={(e) => setFormData({ ...formData, highest_education: e.target.value, education_level: e.target.value })}
                    >
                      <option value="">Select Level</option>
                      {EDUCATION_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career DNA */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="p-8 border-b border-slate-50">
                <CardTitle className="text-lg font-bold flex items-center gap-3">
                  <Target className="w-5 h-5 text-blue-500" /> Career DNA
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="goal" className="text-xs font-black uppercase tracking-widest text-slate-400">Career Goal / Dream Profession</Label>
                  <Input
                    id="goal"
                    value={formData.career_goal}
                    onChange={(e) => setFormData({ ...formData, career_goal: e.target.value })}
                    className="h-14 rounded-xl border-slate-100 text-lg font-bold"
                    placeholder="e.g. Software Engineer, Agribusiness Manager"
                  />
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="skills" className="text-xs font-black uppercase tracking-widest text-slate-400">Top Skills (Comma separated)</Label>
                    <Textarea
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      className="rounded-xl border-slate-100 min-h-[100px] font-bold"
                      placeholder="Public Speaking, Java, Project Management..."
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="interests" className="text-xs font-black uppercase tracking-widest text-slate-400">Interests (Comma separated)</Label>
                    <Textarea
                      id="interests"
                      value={formData.interests}
                      onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                      className="rounded-xl border-slate-100 min-h-[100px] font-bold"
                      placeholder="Technology, Community Service, Design..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comms */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="p-8 border-b border-slate-50">
                <CardTitle className="text-lg font-bold flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-500" /> Communication Sync
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex items-center justify-between p-6 border rounded-[1.5rem] bg-emerald-50 border-emerald-100">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 rounded-2xl">
                      <MessageCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-900">WhatsApp Intelligence</h4>
                      <p className="text-xs text-emerald-700 font-medium">Receive personalized alerts & opportunities.</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.whatsapp_opt_in}
                    onCheckedChange={(checked) => setFormData({ ...formData, whatsapp_opt_in: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Button size="lg" className="w-full h-16 bg-[#0B1F3A] hover:bg-slate-800 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs gap-3 shadow-xl" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Save Mission Profile
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
