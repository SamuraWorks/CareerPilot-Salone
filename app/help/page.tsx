"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, MessageCircle, Mail, Video, HelpCircle, ChevronRight } from "lucide-react"

export default function HelpPage() {
  return (
    <DashboardLayout>
      <main className="max-w-5xl mx-auto py-12 px-6 space-y-16">
        {/* --- HEADER --- */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest">Support Center</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-gradient-salone leading-none tracking-tight uppercase">
            Help Center
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed italic">
            Get the support you need to navigate your career journey na Salone.
          </p>
        </section>

        {/* --- QUICK LINKS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { href: "/faq", title: "FAQ", desc: "Answers to common questions.", icon: HelpCircle, color: "text-blue-600", bg: "bg-blue-50" },
            { href: "/user-guide", title: "User Guide", desc: "Step-by-step instructions.", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
            { href: "https://youtu.be/SMkLYy0U_60", title: "Intro Video", desc: "Watch how it works.", icon: Video, color: "text-red-500", bg: "bg-red-50", external: true }
          ].map((item, i) => (
            <Link href={item.href} key={i} target={item.external ? "_blank" : undefined}>
              <Card className="hover:shadow-md transition-all cursor-pointer h-full border-slate-100 rounded-[2rem] group overflow-hidden">
                <CardContent className="p-8 space-y-4">
                  <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="font-black text-xl text-[#0B1F3A] uppercase tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 text-sm italic font-medium">{item.desc}</p>
                  <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest pt-2">
                    Open Resource <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* --- GETTING STARTED --- */}
        <Card className="rounded-[2.5rem] border-slate-100 shadow-sm">
          <CardHeader className="p-10 pb-0">
            <CardTitle className="text-2xl font-black text-[#0B1F3A] uppercase tracking-tight italic">Getting Started</CardTitle>
            <CardDescription className="text-slate-500 font-medium italic">Begin your journey na Salone with these simple steps</CardDescription>
          </CardHeader>
          <CardContent className="p-10 space-y-8">
            {[
              { step: "1", title: "Create Your Account", desc: "Sign up with your email to access all features." },
              { step: "2", title: "Complete Your Profile", desc: "Add your skills and interests for personalized guidance." },
              { step: "3", title: "Explore Careers", desc: "Browse opportunities that match your professional DNA." },
              { step: "4", title: "Build Your CV", desc: "Use our AI builder to create a standout resume." }
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className="w-10 h-10 bg-[#0B1F3A] text-white rounded-xl flex items-center justify-center flex-shrink-0 font-black shadow-lg group-hover:scale-110 transition-transform">
                  {s.step}
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-[#0B1F3A] uppercase tracking-tight">{s.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed italic">{s.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* --- CONTACT SUPPORT --- */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-black text-[#0B1F3A] uppercase tracking-tight italic">Need More Help?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-[2.5rem] border-slate-100 p-8 space-y-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-black text-[#0B1F3A] uppercase tracking-tight">Email Support</h4>
              <p className="text-xs text-slate-500 font-medium italic">Response within 24-48 hours</p>
              <a href="mailto:careerpilotsalone@gmail.com" className="block text-blue-600 font-black hover:underline uppercase text-sm tracking-wide">
                careerpilotsalone@gmail.com
              </a>
            </Card>

            <Card className="rounded-[2.5rem] border-slate-100 p-8 space-y-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="font-black text-[#0B1F3A] uppercase tracking-tight">Direct Support</h4>
              <p className="text-xs text-slate-500 font-medium italic">Chat with our team during business hours</p>
              <Button asChild variant="outline" className="rounded-xl font-black uppercase text-[10px] tracking-widest border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                <Link href="/whatsapp">Start WhatsApp Chat</Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>
    </DashboardLayout>
  )
}
