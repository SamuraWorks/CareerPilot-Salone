"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Compass,
  FileText,
  Brain,
  Briefcase
} from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      } as any
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 selection:bg-primary/20 Outfit">
      {/* Navigation is now global in layout.tsx */}

      {/* --- HERO SECTION --- */}
      <section className="relative flex-1 flex flex-col items-center justify-center py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1F7A4D] to-[#1E5EFF] opacity-100" />

        <div className="absolute inset-0 z-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center space-y-10"
          >
            <motion.h1
              variants={itemVariants}
              className="text-[44px] leading-[1.1] md:text-[84px] font-black text-white tracking-tight font-poppins"
            >
              Navigate Your Career <br />
              Path in <span className="inline-block px-5 py-1 bg-white text-[#1F7A4D] rounded-[1.5rem] mt-2 md:mt-0">Sierra Leone</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-2xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed font-inter"
            >
              Discover personalized career recommendations, build professional CVs, and follow structured roadmaps to achieve your career goals.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4"
            >
              <Link href="/onboarding" className="w-full sm:w-auto">
                <Button size="lg" className="h-16 px-10 rounded-2xl bg-white text-[#1F7A4D] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-black/10 hover:bg-slate-50 transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto gap-3">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/careers" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-2 border-white/50 text-white font-black uppercase tracking-widest text-[11px] bg-white/10 backdrop-blur-md transition-all hover:bg-white/20 w-full sm:w-auto">
                  Explore Careers
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-16 flex flex-col items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 20})` }} />
                ))}
              </div>
              <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em] font-poppins">
                Join 5,000+ Students from FBC, IPAM, & UNIMAK
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- TOOLKIT PREVIEW --- */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-20 text-slate-900 border-b border-slate-100 pb-12">
            <h2 className="text-[32px] md:text-5xl font-bold tracking-tight leading-tight font-poppins">Everything You Need to <br /> Build Your Career</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto font-inter">CareerPilot Salone provides comprehensive tools to help you discover, plan, and pursue your ideal career path.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Career Test", icon: FileText, color: "text-blue-500", bg: "bg-blue-50", href: "/aptitude-test" },
              { title: "Roadmaps", icon: Compass, color: "text-emerald-500", bg: "bg-emerald-50", href: "/roadmap" },
              { title: "AI Advisor", icon: Brain, color: "text-purple-500", bg: "bg-purple-50", href: "/ai-guidance" },
              { title: "Opportunities", icon: Briefcase, color: "text-orange-500", bg: "bg-orange-50", href: "/jobs" }
            ].map((f, i) => (
              <Link href={f.href} key={i}>
                <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all cursor-pointer h-full">
                  <div className={`${f.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm`}>
                    <f.icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-poppins">{f.title}</h3>
                  <div className="w-10 h-1 bg-slate-200 rounded-full group-hover:bg-[#1F7A4D] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- STATS ACCENT --- */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter font-poppins">150+ Career Roadmaps.<br /> 1.2k+ Job Openings.</h2>
            <p className="text-slate-400 font-medium text-lg font-inter">The most comprehensive career intelligence platform in Sierra Leone.</p>
            <div className="pt-8">
              <Link href="/onboarding">
                <Button size="lg" className="h-14 px-12 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-widest text-[11px] hover:bg-[#1F7A4D] hover:text-white transition-all font-poppins">
                  Join for Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-6 flex flex-col items-center gap-6">
          <div className="font-poppins font-bold text-xl text-slate-900">
            CareerPilot <span className="text-[#1F7A4D]">Salone</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-poppins">
            © 2026 CareerPilot Salone • Freetown
          </p>
        </div>
      </footer>
    </main>
  )
}
