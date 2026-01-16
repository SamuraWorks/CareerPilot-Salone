"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { ReadinessMeter } from "@/components/readiness-meter"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Briefcase,
  Search,
  Zap,
  MessageSquare,
  FileText,
  PenTool,
  ChevronRight,
  GraduationCap,
  Users,
  MessageCircle,
  LayoutGrid,
  Sparkles,
  Rocket,
  Compass
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const [readinessState, setReadinessState] = useState("Exploring")
  const [greeting, setGreeting] = useState("Hello")
  const [primaryAction, setPrimaryAction] = useState({
    label: "Initialize Profile",
    desc: "Let's build your career DNA.",
    link: "/onboarding",
    image: "/images/dashboard/career-focus.png",
    cta: "Start Intake",
    accent: "bg-emerald-500"
  })

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")

    if (!profile?.fullName) {
      setReadinessState("Newcomer")
      setPrimaryAction({
        label: "Initialize Profile",
        desc: "Complete your Smart Intake to unlock the AI engines.",
        link: "/onboarding",
        image: "/images/dashboard/career-focus.png",
        cta: "Start Intake",
        accent: "bg-indigo-500"
      })
    } else if (profile?.status === 'student') {
      setReadinessState("Preparing")
      if (!profile.resumeData?.topProject) {
        setPrimaryAction({
          label: "Optimize Profile",
          desc: "Add a project to your profile to unlock the CV builder.",
          link: "/onboarding",
          image: "/images/dashboard/technical-skills.png",
          cta: "Update Profile",
          accent: "bg-blue-500"
        })
      } else {
        setPrimaryAction({
          label: "Synthesize CV",
          desc: "Your profile is ready. Let's auto-generate your professional resume.",
          link: "/cv-builder",
          image: "/images/dashboard/cv-building.png",
          cta: "Construct CV",
          accent: "bg-emerald-500"
        })
      }
    } else {
      setReadinessState("Ready to Apply")
      setPrimaryAction({
        label: "Opportunity Match",
        desc: "We found 3 roles matching your exact skill profile.",
        link: "/jobs",
        image: "/images/dashboard/job-opportunity.png",
        cta: "View Matches",
        accent: "bg-orange-500"
      })
    }
  }, [profile])

  const displayName = profile?.fullName?.split(' ')[0] || user?.name?.split(' ')[0] || "Scholar"

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-10 pb-20 px-4 md:px-8">

        {/* --- DYNAMIC HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-slate-900 text-white rounded-full px-4 border-none flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] uppercase font-black tracking-widest leading-none pt-0.5">System Online</span>
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{displayName}</span>
            </h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <Compass className="w-4 h-4 text-slate-400" />
              Tracking your progress as a <span className="text-slate-900 font-bold underline decoration-indigo-200">{profile?.targetRole || "Career Explorer"}</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden md:flex items-center gap-4 bg-white/50 backdrop-blur-xl border border-white p-2 rounded-2xl shadow-xl shadow-slate-200/50"
          >
            <div className="text-right pr-2 border-r border-slate-100">
              <p className="text-[10px] font-black uppercase text-slate-400">Current Phase</p>
              <p className="text-sm font-bold text-slate-900">{readinessState}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xl overflow-hidden relative">
              {profile?.profilePhoto ? (
                <Image src={profile.profilePhoto} alt="Profile" fill className="object-cover" />
              ) : displayName[0]}
            </div>
          </motion.div>
        </header>

        {/* --- BENTO GRID SYSTEM --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6"
        >

          {/* HERO BENTO: Primary Context (Col-span 8) */}
          <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-8 group">
            <Card className="h-full border-none rounded-[2.5rem] bg-slate-900 overflow-hidden relative shadow-2xl shadow-indigo-500/10 min-h-[450px]">
              <div className="absolute inset-0 z-0">
                <Image
                  src={primaryAction.image}
                  alt="Action"
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              </div>

              <CardContent className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-white/10 text-white backdrop-blur-md border-white/20 px-3 py-1 font-black uppercase text-[10px] tracking-widest">
                      Primary Vector
                    </Badge>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                    {primaryAction.label}
                  </h2>
                  <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                    {primaryAction.desc}
                  </p>
                </div>

                <Link href={primaryAction.link}>
                  <Button className={cn("w-full md:w-auto h-16 px-10 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex gap-3 shadow-xl", primaryAction.accent, "hover:brightness-110")}>
                    {primaryAction.cta} <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* READINESS BENTO: Status Hub (Col-span 4) */}
          <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-4 space-y-6">
            <Card className="border-none rounded-[2.5rem] bg-white shadow-xl shadow-slate-200/50 p-8 group">
              <ReadinessMeter />
            </Card>

            <Card className="border-none rounded-[2rem] bg-indigo-600 shadow-xl shadow-indigo-500/20 p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Roadmap Status</p>
                  <Rocket className="w-5 h-5 text-indigo-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black">Week 1: Foundations</h3>
                  <div className="h-2 w-full bg-indigo-800/50 rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-white rounded-full" />
                  </div>
                </div>
                <Link href="/roadmap" className="flex items-center text-[10px] font-black uppercase tracking-widest text-white hover:gap-2 transition-all">
                  Resume Journey <ArrowRight className="w-3 h-3 ml-2" />
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* AI RECOMMENDATIONS GRID (Full Width) */}
          <motion.div variants={itemVariants} className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Recommendation 1: Skill Gap */}
            <div className="p-8 bg-white rounded-[2rem] shadow-xl shadow-slate-200/30 border border-transparent hover:border-slate-100 transition-all group flex flex-col justify-between min-h-[280px] overflow-hidden relative">
              <div className="absolute inset-0 z-0 opacity-[0.05] grayscale group-hover:grayscale-0 group-hover:opacity-[0.1] transition-all duration-700">
                <Image
                  src="/images/dashboard/technical-skills.png"
                  alt="Skill Gap"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">Skill Suggestion</h3>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Analyzing your target roles... adding <b>'Impact Logic'</b> to your CV would boost visibility by 40%.
                  </p>
                </div>
              </div>
              <Button variant="ghost" className="relative z-10 p-0 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 hover:bg-transparent justify-start gap-2">
                Enhance Profile <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Recommendation 2: Mentor */}
            <Link href="/mentorship?mentor=salima" className="p-8 bg-blue-50/50 rounded-[2rem] shadow-xl shadow-blue-500/5 border border-transparent hover:border-blue-100 transition-all group flex flex-col justify-between min-h-[280px] overflow-hidden relative">
              <div className="absolute inset-0 z-0 opacity-[0.08] grayscale group-hover:grayscale-0 group-hover:opacity-[0.15] transition-all duration-700">
                <Image
                  src="/images/dashboard/salone_success.png"
                  alt="Success"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Users className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900">Mentor Match</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Salima Bah (Tech Lead) just joined the network. Her background matches 90% of your trajectory.
                  </p>
                </div>
              </div>
              <div className="relative z-10 flex items-center text-[10px] font-black uppercase tracking-widest text-blue-600 gap-2">
                Request Connection <MessageSquare className="w-4 h-4" />
              </div>
            </Link>

            {/* Quick Stats: Applications */}
            <div className="p-8 bg-slate-900 rounded-[2rem] text-white shadow-xl shadow-slate-900/10 flex flex-col justify-between min-h-[280px] relative overflow-hidden group">
              <div className="absolute inset-0 z-0 opacity-[0.2] transition-transform duration-1000 group-hover:scale-110">
                <Image
                  src="/images/dashboard/job-opportunity.png"
                  alt="Opportunities"
                  fill
                  className="object-cover brightness-50 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-slate-900" />
              </div>
              <div className="relative z-10 space-y-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Applications Momentum</p>
                <div className="flex items-end gap-2">
                  <span className="text-6xl font-black">0</span>
                  <span className="text-slate-500 text-sm font-bold pb-2 uppercase tracking-widest">Active</span>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-slate-400 font-medium italic">"The best time to apply was yesterday. The second best time is now."</p>
                </div>
              </div>
              <Link href="/jobs" className="relative z-10 text-[10px] font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2 hover:gap-3 transition-all">
                Explore Job Board <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </motion.div>

          {/* QUICK ACCESS GRID (Full Width) */}
          <motion.div variants={itemVariants} className="lg:col-span-12 space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 shrink-0">Command Center</h2>
              <div className="h-[1px] w-full bg-slate-100" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                { icon: Briefcase, label: "Careers", bg: "bg-orange-50", text: "text-orange-600", link: "/careers" },
                { icon: Search, label: "Jobs", bg: "bg-purple-50", text: "text-purple-600", link: "/jobs" },
                { icon: FileText, label: "CV Builder", bg: "bg-emerald-50", text: "text-emerald-600", link: "/cv-builder" },
                { icon: PenTool, label: "Letters", bg: "bg-blue-50", text: "text-blue-600", link: "/cover-letter" },
                { icon: GraduationCap, label: "Universities", bg: "bg-red-50", text: "text-red-600", link: "/universities" },
                { icon: Zap, label: "Scholar", bg: "bg-amber-50", text: "text-amber-600", link: "/scholarships" },
                { icon: Users, label: "Mentors", bg: "bg-indigo-50", text: "text-indigo-600", link: "/mentorship" },
                { icon: MessageCircle, label: "WhatsApp Bot", bg: "bg-green-50", text: "text-green-600", link: "/whatsapp" },
              ].map((tool, i) => (
                <Link key={i} href={tool.link} className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-white border border-slate-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all", tool.bg, tool.text)}>
                    <tool.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{tool.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* --- BOTTOM CTA: MOMENTUM --- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 rounded-[3rem] bg-indigo-900 border border-white/10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-2xl md:text-3xl font-black text-white">Application Check-In</h3>
              <p className="text-indigo-200 font-medium">Did you reach out to any opportunities today?</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/10 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs">
                Not yet
              </Button>
              <Button className="h-14 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-500/20">
                Yes, I did!
              </Button>
            </div>
          </div>
        </motion.section>

      </div>
    </DashboardLayout>
  )
}
