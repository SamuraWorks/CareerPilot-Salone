"use client"

import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Heart, Award, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 pb-32">
        {/* --- PREMIUM HERO SECTION --- */}
        <section className="relative h-[60vh] min-h-[500px] flex items-end bg-[#0B1F3A] overflow-hidden border-b-8 border-b-[#1FA774]">
          <Image
            src="/about-team-salone.jpg"
            alt="CareerPilot Salone Team"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent" />

          <div className="container mx-auto px-6 relative z-20 pb-20">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1FA774]/20 border border-[#1FA774]/30 rounded-full backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#4ADE80]" />
                <span className="text-[#4ADE80] font-black text-[10px] uppercase tracking-[0.2em]">Our Founding Mission</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter font-sans uppercase">
                Empowering <br /> <span className="text-gradient-salone brightness-125">Youth Legacy</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-medium font-sans max-w-2xl leading-relaxed border-l-4 border-[#1FA774] pl-6 italic">
                Empowering Sierra Leone's workforce with accessible career guidance and professional development tools.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-12 relative z-30">
            {[
              { label: "Founded", value: "2025", color: "bg-blue-600", shadow: "shadow-blue-500/20" },
              { label: "Users", value: "1000+", color: "bg-emerald-600", shadow: "shadow-emerald-500/20" },
              { label: "Careers", value: "50+", color: "bg-amber-600", shadow: "shadow-amber-500/20" },
              { label: "Support", value: "24/7", color: "bg-slate-800", shadow: "shadow-slate-500/20" }
            ].map((stat, i) => (
              <div key={i} className={cn("bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center border border-slate-100 group hover:-translate-y-2 transition-all duration-500", stat.shadow)}>
                <p className={cn("text-3xl font-black mb-1", stat.color.replace('bg-', 'text-'))}>{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 space-y-32">
            {/* Mission Section */}
            <section className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#0B1F3A] uppercase tracking-tighter font-sans italic">Our <span className="text-blue-600">Mission</span></h2>
                <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                  <p>
                    CareerPilot Salone is dedicated to bridging the gap between education and employment in Sierra Leone.
                    We provide personalized career guidance, professional development resources, and job readiness tools
                    to help individuals discover and pursue fulfilling career paths.
                  </p>
                  <p>
                    Our platform combines career assessment, skills development roadmaps, and CV building tools to
                    create a comprehensive career planning ecosystem tailored for the Sierra Leonean job market.
                  </p>
                </div>
              </div>
              <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                <Image src="/dashboard-success.jpg" alt="Career Success" fill className="object-cover" />
              </div>
            </section>

            {/* Values Section */}
            <section className="space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-[#0B1F3A] uppercase tracking-tighter font-sans italic">Foundational <span className="text-[#1FA774]">Values</span></h2>
                <p className="text-xl text-slate-400 font-bold">The principles that drive our innovation na Salone.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Users, title: "Accessibility", desc: "Making career guidance accessible to all Sierra Leoneans, regardless of their background or location.", color: "text-blue-600", bg: "bg-blue-50" },
                  { icon: Heart, title: "Empowerment", desc: "Equipping individuals with the knowledge and tools to take control of their career journey.", color: "text-emerald-600", bg: "bg-emerald-50" },
                  { icon: Award, title: "Excellence", desc: "Delivering high-quality career resources and guidance based on best practices and local insights.", color: "text-amber-600", bg: "bg-amber-50" }
                ].map((val, i) => (
                  <Card key={i} className="rounded-[2.5rem] border-none shadow-xl hover:shadow-2xl transition-all p-10 space-y-6 bg-slate-50 group">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", val.bg)}>
                      <val.icon className={cn("w-8 h-8", val.color)} />
                    </div>
                    <h3 className="text-2xl font-black text-[#0B1F3A] uppercase tracking-tighter font-sans">{val.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed italic">{val.desc}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Story Section */}
            <section className="bg-[#0B1F3A] rounded-[4rem] p-12 md:p-24 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#1FA774]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-[#4ADE80]" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-sans italic">Our <span className="text-[#4ADE80]">Story</span></h2>
                  <div className="space-y-6 text-lg text-slate-300 font-medium leading-relaxed italic">
                    <p>
                      CareerPilot Salone was founded in 2025 with a simple yet powerful vision: to help every Sierra Leonean
                      discover and achieve their career potential.
                    </p>
                    <p>
                      Through extensive research and collaboration with local employers, educators, and career counselors,
                      we developed a platform that addresses the unique needs of Sierra Leone's workforce.
                    </p>
                    <p>
                      Today, we serve thousands of users across Sierra Leone, helping them explore career options, develop
                      essential skills, and present themselves professionally.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-40 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center italic font-black text-2xl text-[#4ADE80]">Vision</div>
                    <div className="h-64 relative rounded-3xl overflow-hidden shadow-2xl">
                      <Image src="/faq-help-support.jpg" alt="Team Work" fill className="object-cover" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-12">
                    <div className="h-64 relative rounded-3xl overflow-hidden shadow-2xl">
                      <Image src="/salone_education.png" alt="Youth" fill className="object-cover" />
                    </div>
                    <div className="h-40 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center italic font-black text-2xl text-blue-400">Impact</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
