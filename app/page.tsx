"use client"

import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  ArrowRight,
  MapPin,
  GraduationCap,
  Briefcase,
  Users,
  BookOpen,
  Compass,
  Search,
  Bell,
  Settings,
  Plus,
  Target,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 lg:pt-40 lg:pb-32 overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 left-0 right-0 h-[600px] -z-10 opacity-30 pointer-events-none">
            <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M0 480C240 420 480 420 720 480C960 540 1200 540 1440 480V0H0V480Z" fill="url(#hero-pattern)" />
              <defs>
                <linearGradient id="hero-pattern" x1="720" y1="0" x2="720" y2="600" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E0F2FE" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0B1F3A] leading-[1.1] tracking-tight">
                Build a clear career path in Sierra Leone.
              </h1>
              <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                Career Pilot helps students and young professionals discover scholarships, internships, jobs, and training opportunities based on their goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/signup" className="px-8 py-3.5 rounded-lg bg-[#2EBA9B] hover:bg-[#259B81] text-white font-bold text-sm shadow-md transition-all text-center">
                  Create Free Account
                </Link>
                <Link href="/opportunities" className="px-8 py-3.5 rounded-lg bg-[#F8FAFC] hover:bg-slate-100 text-[#0B1F3A] font-bold text-sm transition-all border border-slate-200 text-center">
                  Explore Opportunities
                </Link>
              </div>
            </div>

            {/* Dashboard Mockup - hidden on mobile to keep hero clean */}
            <div className="hidden lg:block relative animate-in fade-in slide-in-from-right duration-1000">
              <div className="relative bg-white rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden flex flex-col aspect-[1.4/1]">
                {/* Mock Browser Header */}
                <div className="bg-[#0B1F3A] p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full border border-white/40" />
                    </div>
                    <span className="text-[10px] font-bold text-white tracking-tight">Career Pilot</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Search className="w-3 h-3 text-white/60" />
                    <Bell className="w-3 h-3 text-white/60" />
                    <div className="w-4 h-4 bg-white/10 rounded-sm flex items-center justify-center">
                      <Plus className="w-2 h-2 text-white" />
                    </div>
                    <div className="w-5 h-5 rounded-full bg-amber-400" />
                  </div>
                </div>

                <div className="flex flex-1 bg-slate-50">
                  {/* Mock Sidebar */}
                  <div className="w-12 bg-white border-r border-slate-100 flex flex-col items-center py-4 gap-4">
                    <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Compass className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>

                  {/* Mock Content */}
                  <div className="flex-1 p-6 space-y-6 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-black text-[#0B1F3A] uppercase tracking-widest">Career Insights</h3>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">No Alerts</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex flex-col items-center text-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-400" />
                        <span className="text-[8px] font-black text-slate-700 leading-tight">Career<br />Navigate</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex flex-col items-center text-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-400" />
                        <span className="text-[8px] font-black text-slate-700 leading-tight">Scholarship<br />Matches</span>
                      </div>
                      <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 flex flex-col items-center text-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-400" />
                        <span className="text-[8px] font-black text-slate-700 leading-tight">Internship<br />Opportunities</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-8 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center">
                              <div className="w-3 h-3 border border-white rounded-sm" />
                            </div>
                            <span className="text-[10px] font-bold">Engineering</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center">
                              <div className="w-3 h-3 border border-white rounded-sm" />
                            </div>
                            <span className="text-[10px] font-bold">Software Development</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3">
                          <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Progress Tracker</span>
                          <div className="relative w-12 h-12 flex items-center justify-center">
                            <svg className="w-12 h-12 rotate-[-90deg]">
                              <circle cx="24" cy="24" r="20" fill="transparent" stroke="#F1F5F9" strokeWidth="4" />
                              <circle cx="24" cy="24" r="20" fill="transparent" stroke="#2EBA9B" strokeWidth="4" strokeDasharray="125.66" strokeDashoffset="62.83" />
                            </svg>
                            <span className="absolute text-[10px] font-black text-slate-700">50%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS & IMPACT SECTION */}
        <section className="py-10 md:py-12 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
              {[
                { label: "Talents Guided", value: "12,400+", icon: <Users className="w-5 h-5" /> },
                { label: "Opportunities", value: "3,800+", icon: <Briefcase className="w-5 h-5" /> },
                { label: "Scholarships", value: "1,200+", icon: <GraduationCap className="w-5 h-5" /> },
                { label: "Career Matches", value: "95%", icon: <Target className="w-5 h-5" /> }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <div className="p-2 rounded-lg bg-[#2EBA9B]/10 text-[#2EBA9B]">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-[#0B1F3A]">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="py-14 md:py-20 lg:py-32 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0B1F3A] tracking-tight max-w-3xl mx-auto leading-tight">
                Stop guessing. Start building your future with objective data.
              </h2>
              <p className="text-slate-500 font-medium max-w-xl mx-auto uppercase text-xs tracking-widest">
                The traditional way is broken
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🛤️",
                  color: "bg-emerald-50 text-emerald-600",
                  title: "No clear roadmap",
                  desc: "Most students finish school without knowing their next move, wasting months or years in uncertainty.",
                  wave: "bg-emerald-100/30"
                },
                {
                  icon: "📊",
                  color: "bg-blue-50 text-blue-600",
                  title: "Scattered opportunities",
                  desc: "Searching across dozens of WhatsApp groups and sites for scholarships is exhausting and inefficient.",
                  wave: "bg-blue-100/30"
                },
                {
                  icon: "👤",
                  color: "bg-orange-50 text-orange-600",
                  title: "Lack of guidance",
                  desc: "Without a mentor, you might aim for roles you're not ready for or miss ones you're perfect for.",
                  wave: "bg-orange-100/30"
                }
              ].map((item, i) => (
                <div key={i} className="group relative bg-white border border-slate-100 rounded-3xl p-6 md:p-10 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="relative z-10 space-y-6">
                    <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-3xl shadow-sm`}>
                      {item.icon}
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-[#0B1F3A] tracking-tight">{item.title}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION (REFINED WITH AI FOCUS) */}
        <section id="how-it-works" className="py-14 md:py-20 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex items-center gap-6 mb-16">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#0B1F3A]/20" />
              <h2 className="text-2xl font-black text-[#0B1F3A] whitespace-nowrap tracking-tight uppercase px-4 flex items-center gap-3">
                <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                The AI-Powered Process
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#0B1F3A]/20" />
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#2EBA9B]/20 via-[#0B1F3A]/20 to-[#2EBA9B]/20" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {[
                  {
                    step: 1,
                    title: "Smart Profile Intake",
                    desc: "Our engine asks strategic questions to build your Persona, CV, and baseline Readiness Score in one pass.",
                    icon: <Users className="w-6 h-6" />
                  },
                  {
                    step: 2,
                    title: "AI Analysis & Gap Detection",
                    desc: "The system analyzes your profile against local market demands and scholarship trends to find exactly what's missing.",
                    icon: <Zap className="w-6 h-6" />
                  },
                  {
                    step: 3,
                    title: "Unified Career Assets",
                    desc: "Get a custom Roadmap, a professional CV, and cover letters that are strategically built for your target roles.",
                    icon: <Target className="w-6 h-6" />
                  }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center space-y-6 relative group">
                    <div className="w-20 h-20 rounded-[2rem] bg-white shadow-xl border border-slate-50 flex items-center justify-center relative transition-transform group-hover:scale-105 duration-500">
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#0B1F3A] text-[#2EBA9B] flex items-center justify-center font-black text-sm border-4 border-white">
                        {item.step}
                      </div>
                      <div className="text-[#0B1F3A]">
                        {item.icon}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-black text-[#0B1F3A] tracking-tight">{item.title}</h3>
                      <p className="text-sm text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY CAREERPILOT (THE MOAT) */}
        <section className="py-14 md:py-20 lg:py-32 bg-[#0B1F3A] text-white overflow-hidden relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2EBA9B]/10 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -ml-48 -mb-48" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
                    Why the best talents <br />
                    use CareerPilot.
                  </h2>
                  <p className="text-blue-100/60 font-medium text-lg max-w-lg">
                    We're not just a platform; we're your silent partner in career growth, built specifically for the Sierra Leonean context.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      title: "Zero Decision Fatigue",
                      desc: "Stop worrying about formatting or what to say. We make the structural decisions; you provide the truth.",
                      icon: <CheckCircle2 className="w-5 h-5 text-[#2EBA9B]" />
                    },
                    {
                      title: "Radical Reality Testing",
                      desc: "The AI won't let you apply for roles you're not ready for. Instead, it builds you the bridge to get there.",
                      icon: <CheckCircle2 className="w-5 h-5 text-[#2EBA9B]" />
                    },
                    {
                      title: "Context-Aware Intelligence",
                      desc: "Deeply rooted in Sierra Leone's NGO dominance and local job market trends while maintaining global standards.",
                      icon: <CheckCircle2 className="w-5 h-5 text-[#2EBA9B]" />
                    },
                    {
                      title: "Multi-Use Data Engine",
                      desc: "One intake flow populates your CV, Cover Letters, and Advisor context. Enter once, use everywhere.",
                      icon: <CheckCircle2 className="w-5 h-5 text-[#2EBA9B]" />
                    }
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="mt-1 flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-black text-lg text-white group-hover:text-[#2EBA9B] transition-colors">{benefit.title}</h3>
                        <p className="text-sm text-blue-100/60 font-medium leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black uppercase tracking-[0.2em] text-[#2EBA9B]">System Status</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#2EBA9B] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#2EBA9B]">Engine Active</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: "CV Analysis", progress: 100 },
                        { label: "Market Match", progress: 85 },
                        { label: "Gap Analysis", progress: 92 },
                        { label: "Roadmap Generation", progress: 100 }
                      ].map((bar, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                            <span>{bar.label}</span>
                            <span>{bar.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-[#2EBA9B] rounded-full transition-all duration-1000"
                              style={{ width: `${bar.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <p className="text-sm italic text-blue-100/40 leading-relaxed font-medium">
                      "The system doesn't just ask where you've been; it calculates the shortest path to where you're going next."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-14 md:py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <h2 className="text-2xl md:text-3xl font-black text-[#0B1F3A] text-center mb-10 md:mb-16 tracking-tight">Everything you need to succeed.</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
              {[
                { icon: "🎓", title: "Career Guidance", desc: "Understand realistic career paths locally and globally." },
                { icon: "📜", title: "Scholarships", desc: "Access the most comprehensive database of vetted funding." },
                { icon: "🏫", title: "Internships", desc: "Get early career exposure with top local partners." },
                { icon: "💼", title: "Job Opportunities", desc: "Verified entry-level roles across all major sectors." },
                { icon: "📦", title: "Training Programs", desc: "Short courses and workshops to bridge your skill gaps." }
              ].map((feature, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 md:p-8 hover:shadow-xl transition-all duration-300 text-center space-y-3 md:space-y-4 group">
                  <div className="text-4xl transition-transform group-hover:scale-110 duration-300">{feature.icon}</div>
                  <div>
                    <h3 className="text-sm font-black text-[#0B1F3A] leading-tight mb-2 uppercase tracking-wide">{feature.title}</h3>
                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="py-16 md:py-24 relative overflow-hidden text-center pb-20 md:pb-32">
          {/* Wave Background */}
          <div className="absolute top-0 left-0 right-0 h-[400px] -z-10 opacity-30">
            <svg viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rotate-180">
              <path d="M0 320C240 280 480 280 720 320C960 360 1200 360 1440 320V0H0V320Z" fill="#E0F2FE" />
            </svg>
          </div>

          <div className="max-w-3xl mx-auto px-6 space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2EBA9B]/10 text-[#2EBA9B] text-xs font-black uppercase tracking-[0.2em]">
                Secure Your Future
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#0B1F3A] tracking-tighter leading-none">Your future won't <br className="hidden md:block" /> plan itself.</h2>
              <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                Join 12,000+ others who have stopped guessing and started building their careers with AI.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup" className="w-full sm:w-auto px-10 py-5 rounded-xl bg-[#2EBA9B] hover:bg-[#259B81] text-white font-black text-base shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-1">
                Create Free Account
              </Link>
            </div>
            <div>
              <Link href="/opportunities" className="text-sm font-bold text-slate-400 hover:text-[#0B1F3A] transition-colors flex items-center justify-center gap-2">
                Browse Opportunities <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
