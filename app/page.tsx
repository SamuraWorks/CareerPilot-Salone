"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Compass, GraduationCap, Briefcase, Users, LineChart, BookOpen, Check } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 lg:px-24 w-full flex flex-col items-center text-center bg-gradient-to-r from-[#177CC9] to-[#2EBA9B] overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-emerald-400 blur-3xl mix-blend-overlay"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-500 blur-3xl mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-8 border border-white/20 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Built for Sierra Leone
          <span className="text-lg leading-none">🇸🇱</span>
        </div>

        <h1 className="relative z-10 text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 max-w-4xl drop-shadow-sm">
          Not sure what to do after school or university? Start here.
        </h1>

        <p className="relative z-10 text-lg sm:text-xl text-blue-50 mb-10 max-w-2xl font-medium leading-relaxed drop-shadow-sm">
          A clear, practical guide to finding career direction, scholarships, and jobs in Sierra Leone. No guesswork, just real opportunities.
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[#0B1F3A] font-black text-sm uppercase tracking-wide hover:bg-slate-50 transition-colors shadow-lg shadow-black/10">
            Create Free Account
          </Link>
          <Link href="#how-it-works" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-transparent text-white font-bold text-sm uppercase tracking-wide border border-white/30 hover:border-white/60 hover:bg-white/10 transition-colors backdrop-blur-sm">
            See How It Works
          </Link>
        </div>
      </section>

      {/* 2. The Problem Section */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-white border-y border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#0B1F3A] mb-6 tracking-tight">
            Most people are guessing their way through their career.
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed font-medium">
            Graduating is hard enough, but figuring out what comes next is often harder. Without a clear roadmap, scattered opportunities, and a lack of straightforward guidance, many talented Sierra Leoneans settle for less than they are capable of.
          </p>
        </div>
      </section>

      {/* 3. How It Works */}
      <section id="how-it-works" className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#0B1F3A] tracking-tight">How it works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[2px] bg-slate-100 -z-10"></div>

          {[
            {
              step: "1",
              title: "Create your profile",
              desc: "Sign up securely in less than two minutes."
            },
            {
              step: "2",
              title: "Tell us your interests",
              desc: "Share what you're good at and what you want to achieve."
            },
            {
              step: "3",
              title: "Get personalized paths",
              desc: "Receive clear roadmaps, jobs, and opportunities tailored to you."
            }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center text-2xl font-black mb-6 shadow-md">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">{item.title}</h3>
              <p className="text-slate-500 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. What You'll Find */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#0B1F3A] tracking-tight mb-4">What you'll find on Career Pilot</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl">Everything you need to move forward, organized in one place.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Compass, title: "Career Direction", desc: "Clear guides on what to study and how to qualify for specific fields." },
              { icon: GraduationCap, title: "Scholarships", desc: "Verified local and international funding for your education." },
              { icon: Briefcase, title: "Jobs & Internships", desc: "Entry-level roles and internships to help you get your foot in the door." },
              { icon: Users, title: "Mentorship", desc: "Connect with professionals who have walked the path before you." },
              { icon: BookOpen, title: "Training Programs", desc: "Short courses and bootcamps to build practical, employable skills." },
              { icon: LineChart, title: "CV Building", desc: "Tools to help you write a professional resume that gets noticed." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Built for Sierra Leone */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-black text-[#0B1F3A] tracking-tight mb-6">Built for Sierra Leone</h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium mb-6">
              This isn't a generic global platform. Every opportunity, career path, and piece of advice is curated specifically for the realities of the Sierra Leonean job market and educational system.
            </p>
            <ul className="space-y-4">
              {['Relevant local opportunities', 'Practical career growth', 'No unnecessary hype'].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🇸🇱</span>
              <div className="font-black text-2xl text-[#0B1F3A] tracking-tight">Local Focus.</div>
              <div className="font-medium text-slate-500">Real Impact.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="relative py-32 px-6 sm:px-12 lg:px-24 text-center bg-gradient-to-r from-[#177CC9] to-[#2EBA9B] overflow-hidden">
        <div className="absolute inset-0 bg-[#0B1F3A]/20 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-10">
            Your future won't plan itself.
          </h2>
          <Link href="/signup" className="inline-flex items-center justify-center px-10 py-5 rounded-xl bg-white text-[#0B1F3A] font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-xl group">
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-12 lg:px-24 text-center border-t border-slate-100 bg-white">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Image src="/images/core/logo.png" alt="Logo" width={24} height={24} className="rounded-md" />
          <span className="font-black text-[#0B1F3A] tracking-tight">CareerPilot</span>
          <span className="text-[10px] font-black text-[#1FA774] uppercase tracking-widest">Salone</span>
        </div>
        <p className="text-sm font-medium text-slate-400">© {new Date().getFullYear()} CareerPilot Salone. All rights reserved.</p>
      </footer>
    </div>
  )
}
