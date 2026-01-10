"use client"

import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Compass,
  FileText,
  Brain,
  Briefcase,
  UserCircle,
  Search,
  Map,
  Sparkles
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
    <main className="min-h-screen flex flex-col bg-white selection:bg-primary/20 Outfit overflow-x-hidden pt-16">
      {/* Navigation is global in layout.tsx */}

      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 overflow-hidden bg-gradient-to-br from-[#1E5EFF] via-[#24968C] to-[#1FA774]">
        {/* BACKGROUND PATTERN/IMAGE */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/dashboard/salone_success.png"
            alt="Sierra Leone Success"
            fill
            className="object-cover opacity-10 mix-blend-overlay"
            priority
          />
          {/* Subtle noise or texture overlay could go here */}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-5xl mx-auto text-center space-y-10"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Build Your Future na Salone 🇸🇱</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-[50px] leading-[1.1] md:text-[90px] font-black text-white tracking-tighter font-poppins"
            >
              Navigate Your Career <br className="hidden md:block" />
              Path in <span className="inline-block px-4 py-1 bg-[#1FA774] rounded-2xl rotate-[-2deg] shadow-lg shadow-emerald-900/20">Sierra Leone</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-2xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed font-inter"
            >
              Discover personalized career recommendations, build professional CVs, and follow structured roadmaps to achieve your career goals.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Link href="/onboarding" className="w-full sm:w-auto">
                <Button size="lg" className="h-[64px] px-10 rounded-full bg-white text-[#1E5EFF] font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-slate-50 transition-all hover:scale-[1.05] active:scale-95 w-full sm:w-auto gap-2 group border-none">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/careers" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-[64px] px-10 rounded-full border-2 border-white/30 text-white font-black uppercase tracking-widest text-[11px] bg-transparent hover:bg-white/10 hover:border-white transition-all w-full sm:w-auto">
                  Explore Careers
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-16 flex flex-col items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-[3px] border-white/20 bg-slate-200 bg-cover bg-center shadow-lg" style={{ backgroundImage: `url(https://i.pravatar.cc/150?img=${i + 10})` }} />
                ))}
              </div>
              <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em] font-poppins">
                Join <span className="text-white">8,500+</span> Scholars
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- TOOLKIT PREVIEW --- */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-slate-50" />

        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-24">
            <h2 className="text-[40px] md:text-6xl font-black text-[#0B1F3A] tracking-tight leading-none font-poppins uppercase">Everything na Wan Place</h2>
            <p className="text-slate-500 text-lg font-medium font-inter">We don't just show you careers. We give you the keys, the maps, and the mentors to unlock them.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "AI Guided Mentorship", image: "/images/careers/technology.png", href: "/guidance" },
              { title: "Market-Ready Roadmaps", image: "/images/careers/education.png", href: "/roadmap" },
              { title: "Salone Opportunities", image: "/images/careers/mining.png", href: "/opportunities" },
              { title: "Professional CVs", image: "/images/careers/finance.png", href: "/cv-builder" }
            ].map((f, i) => (
              <Link href={f.href} key={i}>
                <Card className="rounded-[2.5rem] border-none group hover:shadow-2xl transition-all cursor-pointer h-[400px] relative overflow-hidden">
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute bottom-0 left-0 p-8 w-full space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-black text-white font-poppins leading-tight">{f.title}</h3>
                    <div className="h-1 bg-[#1FA774] w-0 group-hover:w-full transition-all duration-700" />
                    <p className="text-slate-300 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-100">Explore Now</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- STATS ACCENT --- */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="rounded-[4rem] p-16 md:p-32 text-center space-y-10 relative overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <Image src="/salone_dashboard_hero.png" alt="Salone" fill className="object-cover brightness-75 group-hover:scale-110 transition-transform duration-[10s]" />
              <div className="absolute inset-0 bg-[#0B1F3A]/80" />
            </div>

            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter font-poppins uppercase leading-[0.9]">Start Building <br /> Your Legacy.</h2>
              <p className="text-slate-300 font-medium text-xl font-inter max-w-2xl mx-auto">The most comprehensive career intelligence platform built specifically for Sierra Leone.</p>
              <div className="pt-6">
                <Link href="/onboarding">
                  <Button size="lg" className="h-[72px] px-16 rounded-[2rem] bg-[#1FA774] text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#1E5EFF] transition-all shadow-2xl shadow-emerald-500/20 active:scale-95">
                    Join CareerPilot Today
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />
    </main>
  )
}

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white rounded-3xl border border-slate-100 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

