"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Heart, Award, Sparkles, TrendingUp, Code2, Video } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export const dynamic = 'force-dynamic'

export default function AboutPage() {
  return (
    <DashboardLayout>
      <main className="max-w-5xl mx-auto py-12 px-6 space-y-24">
        {/* --- HEADER --- */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">Our Founding Mission</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-gradient-salone leading-[1.1] tracking-tight uppercase px-4">
            Empowering <br /> Sierra Leone's Youth
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed italic">
            Building the elite career navigation engine to move the Lion Mountain from potential to prosperity.
          </p>
        </section>

        {/* --- MISSION --- */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gradient-salone uppercase tracking-tight italic">Our Mission</h2>
            <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
              <p>
                CareerPilot Salone is dedicated to bridging the gap between education and employment in Sierra Leone.
                We provide personalized career guidance, professional development resources, and job readiness tools.
              </p>
              <p>
                Our platform combines career assessment and skill roadmaps to create a comprehensive ecosystem
                tailored specifically for our local job market.
              </p>
            </div>
          </div>
          <div className="relative h-80 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-slate-50">
            <Image src="/images/sections/about-team-salone.jpg" alt="CareerPilot Team" fill className="object-cover" />
          </div>
        </section>

        {/* --- VALUES --- */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-gradient-salone uppercase tracking-tight italic">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Accessibility", desc: "Guidance for all Sierra Leoneans, regardless of background.", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: Heart, title: "Empowerment", desc: "Equipping you with tools to control your career journey.", color: "text-emerald-600", bg: "bg-emerald-50" },
              { icon: Award, title: "Excellence", desc: "High-quality resources based on local market insights.", color: "text-amber-600", bg: "bg-amber-50" }
            ].map((val, i) => (
              <Card key={i} className="rounded-[2.5rem] border-slate-100 shadow-sm hover:shadow-md transition-all p-8 space-y-4 bg-white/50">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", val.bg)}>
                  <val.icon className={cn("w-6 h-6", val.color)} />
                </div>
                <h3 className="text-xl font-black text-[#0B1F3A] uppercase tracking-tight">{val.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed italic">{val.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* --- ARCHITECT section simplified --- */}
        <section className="bg-slate-50 rounded-[3.5rem] p-12 overflow-hidden border border-slate-100">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-lg order-2 md:order-1">
              <Image src="/images/sections/developer_profile.jpg" alt="Samuel Samura" fill className="object-cover" />
            </div>
            <div className="space-y-8 order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-full">
                <Code2 className="w-4 h-4" />
                <span className="font-black text-[9px] uppercase tracking-widest">The Architect</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gradient-salone uppercase tracking-tight italic leading-none">Samuel <br />Samura</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed italic border-l-4 border-emerald-500 pl-6">
                "I built CareerPilot Salone to move my fellow Sierra Leonean youth from confusion to clarity. Technology is our force-multiplier."
              </p>
              <div className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                <span>Founder & Lead Developer</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- CONTACT --- */}
        <section className="text-center py-12 space-y-8 border-t border-slate-100">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-gradient-salone uppercase tracking-tight italic">Join the Movement</h2>
            <p className="text-slate-400 font-medium">For inquiries and collaborations na Salone.</p>
          </div>
          <div className="text-2xl font-black text-[#0B1F3A] hover:text-emerald-600 transition-colors">
            careerpilotsalone@gmail.com
          </div>
          <div className="flex justify-center gap-8 pt-6">
            <a href="https://youtu.be/SMkLYy0U_60" target="_blank" className="flex items-center gap-2 text-red-500 font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
              <Video className="w-5 h-5" /> Watch Intro
            </a>
            <div className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest">
              <TrendingUp className="w-5 h-5" /> 1000+ Users
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  )
}

