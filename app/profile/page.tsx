"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
<<<<<<< HEAD
=======
import { Textarea } from "@/components/ui/textarea"
>>>>>>> 6431a66 (CareerPilot Salone: Full System Implementation (Squashed))
import {
  User,
  FileText,
  Globe,
  MessageCircle,
  Save,
  ArrowLeft,
  Camera,
  CheckCircle2,
  LogOut,
  Edit2,
  X,
  Sparkles,
  Zap,
  Shield,
  Target
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import Image from "next/image"

export default function ProfilePage() {
  const { logout, profile: globalProfile, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [language, setLanguage] = useState(globalProfile.preferredLanguage || "English")
  const [whatsappEnabled, setWhatsappEnabled] = useState(globalProfile.whatsappSubscribed)

  // Local state for editing form
  const [profile, setProfile] = useState({
    name: globalProfile.fullName,
    university: globalProfile.educationLevel,
    email: "mentor@careerpilot.sl", // Display purposes for now
<<<<<<< HEAD
    phone: globalProfile.whatsappNumber || "Not Linked"
=======
    phone: globalProfile.whatsappNumber || "Not Linked",
    impactMetric: globalProfile.resumeData?.impactMetric || "",
    leadershipAction: globalProfile.resumeData?.leadershipAction || globalProfile.resumeData?.leadership || "",
    professionalHook: globalProfile.resumeData?.professionalHook || ""
>>>>>>> 6431a66 (CareerPilot Salone: Full System Implementation (Squashed))
  })

  // Sync if global changes
  useEffect(() => {
    setProfile({
      name: globalProfile.fullName,
      university: globalProfile.educationLevel,
      email: "mentor@careerpilot.sl",
<<<<<<< HEAD
      phone: globalProfile.whatsappNumber || "Not Linked"
=======
      phone: globalProfile.whatsappNumber || "Not Linked",
      impactMetric: globalProfile.resumeData?.impactMetric || "",
      leadershipAction: globalProfile.resumeData?.leadershipAction || globalProfile.resumeData?.leadership || "",
      professionalHook: globalProfile.resumeData?.professionalHook || ""
>>>>>>> 6431a66 (CareerPilot Salone: Full System Implementation (Squashed))
    })
    setWhatsappEnabled(globalProfile.whatsappSubscribed)
    setLanguage(globalProfile.preferredLanguage || "English")
  }, [globalProfile])

  const handleSave = () => {
    updateProfile({
      fullName: profile.name,
      educationLevel: profile.university,
      whatsappNumber: profile.phone,
<<<<<<< HEAD
      whatsappSubscribed: whatsappEnabled
=======
      whatsappSubscribed: whatsappEnabled,
      resumeData: {
        ...globalProfile.resumeData,
        impactMetric: profile.impactMetric,
        leadershipAction: profile.leadershipAction,
        professionalHook: profile.professionalHook
      }
>>>>>>> 6431a66 (CareerPilot Salone: Full System Implementation (Squashed))
    })
    setIsEditing(false)
    toast.success("Profile updated successfully!", {
      icon: <CheckCircle2 className="w-4 h-4 text-[#1FA774]" />
    })
  }

  const toggleWhatsapp = () => {
    const newState = !whatsappEnabled
    setWhatsappEnabled(newState)
    updateProfile({ whatsappSubscribed: newState })
    toast.success(newState ? "WhatsApp Sync Active" : "WhatsApp Sync Disabled")
  }

  const cancelEdit = () => {
    setProfile({
      name: globalProfile.fullName,
      university: globalProfile.educationLevel,
      email: "mentor@careerpilot.sl",
<<<<<<< HEAD
      phone: globalProfile.whatsappNumber || "Not Linked"
=======
      phone: globalProfile.whatsappNumber || "Not Linked",
      impactMetric: globalProfile.resumeData?.impactMetric || "",
      leadershipAction: globalProfile.resumeData?.leadershipAction || globalProfile.resumeData?.leadership || "",
      professionalHook: globalProfile.resumeData?.professionalHook || ""
>>>>>>> 6431a66 (CareerPilot Salone: Full System Implementation (Squashed))
    })
    setIsEditing(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* --- PREMIUM HERO SECTION --- */}
        <section className="relative rounded-[3.5rem] overflow-hidden min-h-[360px] flex items-center shadow-2xl group border-b-8 border-b-[#1FA774]">
          <div className="absolute inset-0 z-0">
            <Image src="/african_career_success.png" alt="Profile Hero" fill className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-[#0B1F3A]/80" />
          </div>

          <div className="relative z-20 w-full px-10 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10 pt-10">
            <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
              <div className="relative">
                <div className="w-40 h-40 rounded-[3rem] bg-white/10 backdrop-blur-md flex items-center justify-center border-2 border-white/20 shadow-2xl overflow-hidden group-hover:border-[#1FA774]/50 transition-all group/avatar">
                  <div className="absolute inset-0 bg-slate-50" />
                  <User className="w-20 h-20 text-white opacity-40 group-hover:scale-110 transition-transform" />
                </div>
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#1FA774] text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:rotate-12 border-4 border-[#0B1F3A]">
                    <Camera className="w-6 h-6" />
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {!isEditing ? (
                  <>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight font-sans">{profile.name}</h1>
                    <p className="text-lg md:text-xl text-emerald-400 font-semibold font-sans border-l-4 border-emerald-500 pl-4">{profile.university}</p>
                  </>
                ) : (
                  <div className="space-y-3 max-w-sm">
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="h-14 rounded-xl text-xl font-bold font-sans bg-white/10 text-white border-white/20 focus:border-emerald-500 shadow-inner"
                      placeholder="Full Name"
                    />
                    <Input
                      value={profile.university}
                      onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                      className="h-12 rounded-xl font-medium font-sans bg-white/10 text-white border-white/20"
                      placeholder="University / Organization"
                    />
                  </div>
                )}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                  <Badge className="bg-emerald-500 text-white border-none font-bold font-sans text-xs uppercase tracking-wide px-3 py-1 shadow-md">Active Operative</Badge>
                  <Badge variant="outline" className="border-white/20 font-bold font-sans text-xs uppercase tracking-wide px-3 py-1 text-white/80">Profile Level 04</Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 min-w-[200px]">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-3 text-white/40 hover:text-white transition-all font-black font-sans text-[10px] uppercase tracking-[0.3em] mb-4 md:mb-0 italic"
              >
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-[#1FA774] group-hover:text-white transition-all">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
                Return to Base
              </Link>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="rounded-3xl h-16 px-10 font-black font-sans text-[10px] uppercase tracking-widest gap-3 bg-[#1E5EFF] text-white shadow-2xl shadow-[#1E5EFF]/30 hover:bg-[#1FA774] hover:scale-[1.05] active:scale-95 transition-all border-none italic"
                >
                  <Edit2 className="w-4 h-4" />
                  Modify Dossier
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditing(false)}
                  className="rounded-3xl h-16 px-10 font-black font-sans text-[10px] uppercase tracking-widest gap-3 bg-red-500/10 text-red-500 border-2 border-red-500/20 shadow-xl hover:bg-red-500 hover:text-white transition-all active:scale-95 italic"
                >
                  <X className="w-4 h-4" />
                  Abort Changes
                </Button>
              )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Essentials: Personal Info */}
          <Card className="p-8 rounded-[2.5rem] border-none bg-white shadow-md hover:shadow-xl transition-all space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] grayscale transition-all group-hover:opacity-10">
              <User className="w-24 h-24" />
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600 shadow-sm">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-sans text-slate-900">Core Identity Nodes</h3>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <Label className="text-xs font-bold font-sans text-muted-foreground uppercase tracking-wide px-1">Intelligence Channel (Email)</Label>
                {!isEditing ? (
                  <div className="p-4 rounded-2xl bg-slate-50 font-bold font-sans text-base text-slate-900 border border-transparent">
                    {profile.email}
                  </div>
                ) : (
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="h-14 rounded-2xl font-bold font-sans text-base border border-slate-200 bg-white focus:border-blue-500 transition-all"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold font-sans text-muted-foreground uppercase tracking-wide px-1">Tactical Line (WhatsApp)</Label>
                {!isEditing ? (
                  <div className="p-4 rounded-2xl bg-slate-50 font-bold font-sans text-base text-slate-900 border border-transparent">
                    {profile.phone}
                  </div>
                ) : (
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="h-14 rounded-2xl font-bold font-sans text-base border border-slate-200 bg-white focus:border-emerald-500 transition-all"
                  />
                )}
              </div>
            </div>
          </Card>

          {/* Strategic Goals - NEW */}
          <Card className="p-10 rounded-[3.5rem] border-none bg-white shadow-sm hover:shadow-2xl transition-all space-y-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] grayscale transition-all group-hover:opacity-10">
              <Target className="w-32 h-32" />
            </div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#1E5EFF] shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black font-sans uppercase tracking-tighter text-[#0B1F3A] italic">Strategic Objectives</h3>
            </div>

            <div className="space-y-6 relative z-10">
<<<<<<< HEAD
              <div className="space-y-3">
                <Label className="text-[10px] font-black font-sans text-slate-400 uppercase tracking-[0.3em] px-2 italic">Primary Mission</Label>
                <div className="p-6 rounded-[2rem] bg-slate-50 font-black font-sans text-lg text-[#0B1F3A] border-l-4 border-[#1FA774] italic">
                  {globalProfile.careerGoal || "Undefined"}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black font-sans text-slate-400 uppercase tracking-[0.3em] px-2 italic">Areas of Operation</Label>
                <div className="flex flex-wrap gap-2">
                  {globalProfile.interests?.length > 0 ? (
                    globalProfile.interests.map((interest: string, i: number) => (
                      <span key={i} className="px-4 py-2 rounded-xl bg-slate-50 text-slate-600 font-bold text-xs border border-slate-100 italic">
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400 italic px-2">No interests logged.</span>
                  )}
                </div>
=======
              {!isEditing ? (
                <>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black font-sans text-slate-400 uppercase tracking-[0.3em] px-2 italic">Primary Mission</Label>
                    <div className="p-6 rounded-[2rem] bg-slate-50 font-black font-sans text-lg text-[#0B1F3A] border-l-4 border-[#1FA774] italic">
                      {globalProfile.careerGoal || "Undefined"}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[10px] font-black font-sans text-slate-400 uppercase tracking-[0.3em] px-2 italic">Professional Hook</Label>
                    <p className="text-sm font-bold text-slate-600 px-2 italic">{profile.professionalHook || "No hook defined."}</p>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold font-sans text-slate-400 uppercase tracking-wide">Target Role / Career Goal</Label>
                    <Input
                      value={globalProfile.careerGoal}
                      onChange={(e) => updateProfile({ careerGoal: e.target.value })}
                      className="h-12 rounded-xl border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold font-sans text-slate-400 uppercase tracking-wide">Professional Hook</Label>
                    <Textarea
                      value={profile.professionalHook}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProfile({ ...profile, professionalHook: e.target.value })}
                      className="rounded-xl border-slate-200 min-h-[100px]"
                      placeholder="What makes you unique?"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* High Impact Metrics - NEW SECTION */}
          <Card className="p-10 rounded-[3.5rem] border-none bg-emerald-50 shadow-sm hover:shadow-2xl transition-all space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.05] grayscale transition-all group-hover:opacity-10">
              <Zap className="w-32 h-32" />
            </div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black font-sans uppercase tracking-tighter text-[#0B1F3A] italic">High-Value Intel</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 relative z-10">
              <div className="space-y-2">
                <Label className="text-[10px] font-black font-sans text-slate-400 uppercase tracking-[0.3em] px-2 italic">Impact Metric</Label>
                {!isEditing ? (
                  <div className="p-5 rounded-2xl bg-white border border-emerald-100 font-bold font-sans text-slate-900 shadow-sm">
                    {profile.impactMetric || "No metrics recorded."}
                  </div>
                ) : (
                  <Input
                    value={profile.impactMetric}
                    onChange={(e) => setProfile({ ...profile, impactMetric: e.target.value })}
                    className="h-12 rounded-xl border-emerald-200 bg-white"
                    placeholder="e.g. 20% Growth in Sales"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black font-sans text-slate-400 uppercase tracking-[0.3em] px-2 italic">Leadership Experience</Label>
                {!isEditing ? (
                  <div className="p-5 rounded-2xl bg-white border border-emerald-100 font-bold font-sans text-slate-900 shadow-sm">
                    {profile.leadershipAction || "No leadership roles logged."}
                  </div>
                ) : (
                  <Input
                    value={profile.leadershipAction}
                    onChange={(e) => setProfile({ ...profile, leadershipAction: e.target.value })}
                    className="h-12 rounded-xl border-emerald-200 bg-white"
                    placeholder="e.g. Led team of 5 developers"
                  />
                )}
>>>>>>> 6431a66 (CareerPilot Salone: Full System Implementation (Squashed))
              </div>
            </div>
          </Card>

          {/* Career Documents */}
          <Card className="p-10 rounded-[3.5rem] border-none bg-[#0B1F3A] shadow-2xl space-y-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-[#1FA774] rotate-12 group-hover:rotate-0 transition-transform">
              <FileText className="w-32 h-32" />
            </div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#1FA774]/10 flex items-center justify-center text-[#1FA774] border border-[#1FA774]/20">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black font-sans uppercase tracking-tighter text-white italic">Asset Encryption Vault</h3>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-between group/file cursor-pointer hover:bg-white/10 transition-all shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#1FA774] flex items-center justify-center shadow-lg group-hover/file:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-base font-black font-sans text-white uppercase tracking-tight italic">Graduate_Dossier_2s026</div>
                    <div className="text-[10px] font-black font-sans text-[#4ADE80] uppercase mt-1 tracking-widest opacity-80 italic">Verified by AI Nexus</div>
                  </div>
                </div>
                <Badge className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 font-black font-sans text-[9px] uppercase tracking-widest px-4 py-2 italic">Tactical</Badge>
              </div>

              <Link href="/cv-builder" className="block pt-2">
                <Button className="w-full h-20 rounded-[2.5rem] bg-white text-[#0B1F3A] hover:bg-[#1FA774] hover:text-white font-black font-sans uppercase text-[10px] tracking-[0.3em] transition-all shadow-2xl active:scale-95 gap-3 border-none">
                  <Sparkles className="w-4 h-4" />
                  Update Synthesis with AI
                </Button>
              </Link>
            </div>
          </Card>

          {/* Preferences: Language & WhatsApp */}
          <Card className="p-10 rounded-[4rem] border-none bg-slate-50 shadow-sm space-y-12 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#1E5EFF] shadow-sm">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black font-sans uppercase tracking-tighter text-[#0B1F3A] italic">Neural Interface</h3>
                </div>
                <div className="flex gap-6">
                  {(['English', 'Krio'] as const).map(l => (
                    <button
                      key={l}
                      onClick={() => {
                        setLanguage(l)
                        updateProfile({ preferredLanguage: l })
                        toast.success(`Language set to ${l}`)
                      }}
                      className={`flex-1 h-20 rounded-[2.5rem] font-black font-sans uppercase tracking-[0.2em] text-[11px] border-4 transition-all italic ${language === l ? 'border-[#1E5EFF] bg-[#1E5EFF] text-white shadow-2xl shadow-[#1E5EFF]/30 scale-105' : 'border-white bg-white text-slate-400 hover:border-slate-200 shadow-sm'
                        }`}
                    >
                      {l} Perspective
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] border border-[#25D366]/20 shadow-sm">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black font-sans uppercase tracking-tighter text-[#0B1F3A] italic">WhatsApp Nexus</h3>
                </div>
                <div className="flex items-center justify-between p-8 rounded-[3rem] bg-white border border-slate-100 shadow-xl group/toggle">
                  <div className="space-y-2">
                    <div className="font-black font-sans text-[#0B1F3A] uppercase text-xs tracking-[0.2em] italic">Intelligence Sync</div>
                    <div className="text-xs text-slate-400 font-bold font-sans italic max-w-xs">Automated milestone injection into your WhatsApp terminal</div>
                  </div>
                  <button
                    onClick={toggleWhatsapp}
                    className={`w-16 h-10 rounded-full transition-all relative flex items-center shadow-inner ${whatsappEnabled ? 'bg-[#25D366]' : 'bg-slate-200'}`}
                  >
                    <div className={`w-8 h-8 rounded-full bg-white shadow-2xl absolute transition-all flex items-center justify-center ${whatsappEnabled ? 'right-1' : 'left-1'}`}>
                      {whatsappEnabled ? <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> : <X className="w-4 h-4 text-slate-300" />}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-12 border-t-4 border-slate-50 gap-10">
          <button
            onClick={() => logout()}
            className="group flex items-center gap-4 text-[10px] font-black font-sans uppercase tracking-[0.4em] text-red-500 hover:text-red-600 transition-all italic"
          >
            <div className="p-3 rounded-xl bg-red-50 group-hover:bg-red-500 group-hover:text-white transition-all shadow-sm">
              <LogOut className="w-5 h-5" />
            </div>
            Purge Personal Operative Hub
          </button>

          {isEditing && (
            <Button
              onClick={handleSave}
              className="h-24 px-16 rounded-[3rem] bg-[#0B1F3A] text-white font-black uppercase tracking-[0.3em] text-xs gap-6 shadow-[0_20px_50px_rgba(11,31,58,0.3)] hover:bg-[#1FA774] hover:-translate-y-2 transition-all active:scale-95 animate-in zoom-in-95 duration-500 italic"
            >
              <Save className="w-8 h-8" />
              Upload Tactical Revisions
            </Button>
          )}

          {!isEditing && (
            <div className="flex flex-col items-end gap-1">
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] italic">
                v1.0.8 // Last Sync: 0s ago
              </div>
              <div className="text-[9px] font-bold text-[#1FA774] uppercase tracking-widest">
                Encryption Protocol: Active
              </div>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  )
}

