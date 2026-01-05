"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  X
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"

export default function ProfilePage() {
  const { logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [language, setLanguage] = useState<'English' | 'Krio'>('English')
  const [whatsappEnabled, setWhatsappEnabled] = useState(true)

  // Profile State
  const [profile, setProfile] = useState({
    name: "John Kamara",
    university: "IPAM, Freetown",
    email: "john.kamara@fbc.sl",
    phone: "+232 76 000 000"
  })

  const handleSave = () => {
    setIsEditing(false)
    toast.success("Profile updated successfully!", {
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Navigation Breadcrumb */}
        <div className="flex justify-between items-center">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold font-poppins text-[10px] uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>

          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              variant="ghost"
              className="rounded-xl font-bold font-poppins text-[10px] uppercase tracking-widest gap-2 bg-slate-100 hover:bg-primary hover:text-white transition-all"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={() => setIsEditing(false)}
              variant="ghost"
              className="rounded-xl font-bold font-poppins text-[10px] uppercase tracking-widest gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
            >
              <X className="w-3.5 h-3.5" />
              Cancel Editing
            </Button>
          )}
        </div>

        {/* --- HEADER / AVATAR --- */}
        <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="relative">
            <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-950 shadow-2xl overflow-hidden">
              <User className="w-16 h-16 text-slate-300" />
              {/* Optional: Add image preview if we had a real upload */}
            </div>
            {isEditing && (
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="space-y-2">
            {!isEditing ? (
              <>
                <h1 className="text-4xl font-bold font-poppins text-slate-900 dark:text-white tracking-tight leading-none">{profile.name}</h1>
                <p className="text-lg text-slate-500 font-medium font-inter">{profile.university}</p>
              </>
            ) : (
              <div className="space-y-4 max-w-sm">
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="h-12 rounded-xl text-xl font-bold font-poppins tracking-tight bg-white border-2 border-primary/20 focus:border-primary shadow-inner"
                  placeholder="Full Name"
                />
                <Input
                  value={profile.university}
                  onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                  className="h-10 rounded-xl font-bold font-inter bg-white border-2 border-primary/10"
                  placeholder="University / Organization"
                />
              </div>
            )}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
              <Badge className="bg-emerald-500 text-white border-none font-bold font-poppins text-[9px] uppercase tracking-widest px-3 py-1">Verified Profile</Badge>
              <Badge variant="outline" className="border-slate-200 dark:border-slate-800 font-bold font-poppins text-[9px] uppercase tracking-widest px-3 py-1 text-slate-400">Student Account</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Essentials: Personal Info */}
          <Card className="p-8 rounded-[3rem] border-none bg-white dark:bg-slate-900 shadow-2xl shadow-slate-200/50 dark:shadow-none space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12">
              <User className="w-20 h-20" />
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-poppins uppercase tracking-widest text-slate-900 dark:text-white">Contact Details</h3>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold font-poppins text-slate-400 uppercase tracking-widest px-1">Email Address</Label>
                {!isEditing ? (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 font-bold font-inter text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 transition-colors">
                    {profile.email}
                  </div>
                ) : (
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="h-14 rounded-2xl font-bold font-inter border-2 border-primary/10 bg-white"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold font-poppins text-slate-400 uppercase tracking-widest px-1">Phone Number (WhatsApp)</Label>
                {!isEditing ? (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 font-bold font-inter text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 transition-colors">
                    {profile.phone}
                  </div>
                ) : (
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="h-14 rounded-2xl font-bold font-inter border-2 border-primary/10 bg-white"
                  />
                )}
              </div>
            </div>
          </Card>

          {/* Career Documents */}
          <Card className="p-8 rounded-[3rem] border-none bg-white dark:bg-slate-900 shadow-2xl shadow-slate-200/50 dark:shadow-none space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 -rotate-12 text-emerald-500">
              <FileText className="w-20 h-20" />
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-poppins uppercase tracking-widest text-slate-900 dark:text-white">My Career Vault</h3>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between group cursor-pointer hover:border-emerald-500/30 transition-all shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                    <FileText className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-sm font-bold font-inter text-slate-900 dark:text-white">Graduate_CV_2026.pdf</div>
                    <div className="text-[10px] font-bold font-poppins text-slate-400 uppercase mt-0.5 tracking-wider">Verified by CareerPilot</div>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-none font-bold font-poppins text-[9px] uppercase tracking-wider px-3 py-1">Active</Badge>
              </div>

              <Link href="/cv-builder">
                <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white font-bold font-poppins uppercase text-[10px] tracking-widest transition-all shadow-xl active:scale-95">
                  Update CV with AI
                </Button>
              </Link>
            </div>
          </Card>

          {/* Preferences: Language & WhatsApp */}
          <Card className="p-8 rounded-[3rem] border-none bg-white dark:bg-slate-900 shadow-2xl shadow-slate-200/50 dark:shadow-none space-y-12 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold font-poppins uppercase tracking-widest text-slate-900 dark:text-white">Interface Language</h3>
                </div>
                <div className="flex gap-4">
                  {(['English', 'Krio'] as const).map(l => (
                    <button
                      key={l}
                      onClick={() => setLanguage(l)}
                      className={`flex-1 h-16 rounded-[1.5rem] font-bold font-poppins uppercase tracking-widest text-[11px] border-2 transition-all ${language === l ? 'border-primary bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'border-slate-50 dark:border-slate-800 text-slate-400 hover:border-slate-200 bg-slate-50/50'
                        }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold font-poppins uppercase tracking-widest text-slate-900 dark:text-white">WhatsApp Advisor</h3>
                </div>
                <div className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <div className="font-bold font-poppins text-slate-900 dark:text-white uppercase text-[10px] tracking-widest">Bot Profile Sync</div>
                    <div className="text-xs text-slate-500 font-medium font-inter">Auto-update your career milestones via WhatsApp</div>
                  </div>
                  <button
                    onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                    className={`w-14 h-8 rounded-full transition-all relative flex items-center ${whatsappEnabled ? 'bg-[#25D366]' : 'bg-slate-300'}`}
                  >
                    <div className={`w-6 h-6 rounded-full bg-white shadow-md absolute transition-all ${whatsappEnabled ? 'right-1' : 'left-1'} ${whatsappEnabled ? 'scale-110' : 'scale-90'}`} />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-10 border-t border-slate-100 dark:border-slate-800 gap-6">
          <button
            onClick={() => logout()}
            className="group flex items-center gap-2 text-[10px] font-bold font-poppins uppercase tracking-[0.3em] text-red-400 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out of Account
          </button>

          {isEditing && (
            <Button
              onClick={handleSave}
              className="h-20 px-12 rounded-[2.5rem] bg-slate-900 text-white font-black uppercase tracking-widest text-xs gap-4 shadow-2xl shadow-slate-300 hover:bg-primary transition-all active:scale-95 animate-in zoom-in-95 duration-300"
            >
              <Save className="w-6 h-6" />
              Save Changes
            </Button>
          )}

          {!isEditing && (
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              v1.0.4 Updated: 03 Jan 2026
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  )
}
