"use client"

import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  BookOpen,
  MessageCircle,
  Mail,
  Video,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Play,
  Info,
  Smartphone,
  ArrowRight
} from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import Image from "next/image"

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 pb-32">
        {/* --- PREMIUM HERO SECTION --- */}
        <section className="relative min-h-[400px] flex items-center bg-[#0B1F3A] overflow-hidden border-b-8 border-b-[#1FA774]">
                    <div className="container mx-auto px-6 relative z-20 pt-10">
            <div className="max-w-4xl space-y-10">
              <Link href="/dashboard" className="inline-flex items-center gap-3 text-[10px] font-black font-poppins uppercase tracking-[0.3em] text-[#4ADE80] hover:text-white transition-all group">
                <div className="p-2 rounded-lg bg-[#4ADE80]/10 border border-[#4ADE80]/20 group-hover:bg-[#4ADE80] group-hover:text-[#0B1F3A] transition-all">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                Back to Control Center
              </Link>

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1FA774]/10 border border-[#1FA774]/20 rounded-full backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-[#1FA774]" />
                  <span className="text-[#1FA774] font-black text-[10px] uppercase tracking-[0.2em]">Platform Intelligence Hub</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter font-poppins uppercase">
                  Operational <br /> <span className="text-gradient-salone brightness-125">Support Center</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 font-medium font-inter max-w-2xl leading-relaxed border-l-4 border-[#1FA774] pl-6 italic">
                  Everything you need to master the CareerPilot ecosystem. From technical dossiers to direct tactical assistance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 mt-20 space-y-20">
          {/* Quick Tactical Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Master FAQ",
                desc: "Verified solutions for common platform queries.",
                icon: HelpCircle,
                href: "/faq",
                color: "text-[#1E5EFF]",
                bgColor: "bg-[#1E5EFF]/10"
              },
              {
                title: "User Protocol",
                desc: "Step-by-step tactical guide for all features.",
                icon: BookOpen,
                href: "/user-guide",
                color: "text-[#1FA774]",
                bgColor: "bg-[#1FA774]/10"
              },
              {
                title: "Neutral Briefing",
                desc: "Visual walkthroughs and tactical video guides.",
                icon: Video,
                href: "https://youtu.be/SMkLYy0U_60?si=2ADARDhfnPzcTby3",
                external: true,
                color: "text-slate-600",
                bgColor: "bg-slate-100"
              }
            ].map((item, i) => (
              <Link href={item.href} key={i} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}>
                <Card className="p-8 rounded-[3rem] border-none bg-slate-50 hover:bg-white hover:shadow-2xl transition-all h-full group">
                  <div className={`w-14 h-14 rounded-2xl ${item.bgColor} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <h3 className="text-2xl font-black font-poppins text-[#0B1F3A] uppercase tracking-tighter italic mb-2">{item.title}</h3>
                  <p className="text-slate-400 font-medium italic text-sm">{item.desc}</p>
                </Card>
              </Link>
            ))}
          </div>

          {/* Platform Activation Steps */}
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-[#0B1F3A] uppercase tracking-tighter font-poppins italic">Platform <span className="text-[#1FA774]">Activation</span></h2>
              <p className="text-slate-400 font-bold italic uppercase text-xs tracking-[0.4em]">Master the ecosystem in 5 tactical phases</p>
            </div>

            <div className="relative">
              <div className="absolute top-0 bottom-0 left-[2.25rem] w-1 bg-slate-100 hidden md:block" />
              <div className="grid gap-10">
                {[
                  { title: "Initialize Identity", desc: () => "Secure your operative credentials by establishing a verified sign-up protocol." },
                  { title: "Vector Analysis", desc: () => "Complete your professional dossier to enable high-accuracy AI recommendations." },
                  { title: "Strategic Discovery", desc: () => "Navigate the career database and identify prime opportunities na Salone." },
                  { title: "Dossier Synthesis", desc: () => "Utilize the CV Builder to manufacture high-impact professional documentation." },
                  { title: "Roadmap Execution", desc: () => "Activate your 12-week tactical path and track development metrics." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-10 items-start relative group">
                    <div className="w-18 h-18 rounded-[2rem] bg-[#0B1F3A] flex items-center justify-center text-white text-3xl font-black z-10 shrink-0 shadow-xl group-hover:bg-[#1FA774] transition-colors font-poppins italic">
                      {i + 1}
                    </div>
                    <div className="flex-1 p-8 rounded-[3rem] bg-white border border-slate-100 hover:shadow-xl transition-all">
                      <h4 className="text-xl font-black text-[#0B1F3A] uppercase tracking-tighter font-poppins italic mb-2">{step.title}</h4>
                      <p className="text-slate-400 font-medium italic text-lg">{step.desc()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Direct Tactical Channels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Card className="p-10 rounded-[3.5rem] bg-[#0B1F3A] text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
                <Mail className="w-32 h-32" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center border border-white/20">
                  <Mail className="w-8 h-8 text-[#4ADE80]" />
                </div>
                <div>
                  <h3 className="text-3xl font-black font-poppins uppercase tracking-tighter italic">Intelligence Link</h3>
                  <p className="text-slate-400 font-medium italic mt-2 uppercase text-xs tracking-widest">Formal inquiry channel • 24h response time</p>
                </div>
                <a href="mailto:info@careerpilot.sl" className="text-2xl font-black text-[#1E5EFF] hover:underline block truncate">
                  info@careerpilot.sl
                </a>
              </div>
            </Card>

            <Card className="p-10 rounded-[3.5rem] bg-[#25D366] text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12 group-hover:rotate-0 transition-transform">
                <FaWhatsapp className="w-32 h-32" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white/20 flex items-center justify-center border border-white/40">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black font-poppins uppercase tracking-tighter italic">Tactical Nexus</h3>
                  <p className="text-emerald-100 font-medium italic mt-2 uppercase text-xs tracking-widest">Immediate field assistance • +232 75 668258</p>
                </div>
                <Link href="https://wa.me/23275668258" target="_blank">
                  <Button className="w-full h-16 rounded-3xl bg-white text-[#25D366] hover:bg-emerald-50 font-black uppercase text-xs tracking-widest shadow-2xl gap-3">
                    Initialize WhatsApp Chat <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
