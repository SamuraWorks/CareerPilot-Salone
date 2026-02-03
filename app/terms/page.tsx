"use client"

import { Footer } from "@/components/footer"
import { FileText, Sparkles, ArrowLeft, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 pb-32">
        {/* --- PREMIUM HERO SECTION --- */}
        <section className="relative min-h-[400px] flex items-center bg-[#0B1F3A] overflow-hidden border-b-8 border-b-[#1FA774]">
          <div className="container mx-auto px-6 relative z-20 pt-10">
            <div className="max-w-4xl space-y-10">
              <Link href="/dashboard" className="inline-flex items-center gap-3 text-[10px] font-black font-sans uppercase tracking-[0.3em] text-[#4ADE80] hover:text-white transition-all group">
                <div className="p-2 rounded-lg bg-[#4ADE80]/10 border border-[#4ADE80]/20 group-hover:bg-[#4ADE80] group-hover:text-[#0B1F3A] transition-all">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                Back to Control Center
              </Link>

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-md">
                  <FileText className="w-4 h-4 text-[#1FA774]" />
                  <span className="text-[#1FA774] font-black text-[10px] uppercase tracking-[0.2em]">Operational Framework</span>
                </div>
                <h1 className="text-4xl xs:text-5xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter font-sans uppercase">
                  Terms of <br /> <span className="text-gradient-salone brightness-125">Engagement</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 font-medium font-sans max-w-2xl leading-relaxed border-l-4 border-[#1FA774] pl-6 italic">
                  Last updated December 2024 • The strategic rules for interacting with the CareerPilot platform na Sierra Leone.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 mt-20 space-y-20">
          {[
            {
              title: "01. Acceptance of Protocol",
              content: "By accessing and utilizing CareerPilot Salone, you acknowledge and agree to be bound by the operational protocols of this agreement. Use of this platform constitutes a binding strategic commitment to these terms."
            },
            {
              title: "02. Usage License",
              content: "Permission is granted to utilize the assets on CareerPilot Salone for personal, non-commercial professional development only. This is a strategic license grant, not a transfer of intellectual property.",
              list: ["No unauthorized replication of materials", "No commercial exploitation of data sets", "No reverse-engineering of AI core", "Retention of proprietary markers"]
            },
            {
              title: "03. Account Integrity",
              content: "To unlock high-tier platform nodes, a validated account is required. Users maintain absolute responsibility for credential security and all analytical activity recorded under their identity."
            },
            {
              title: "04. Content Sovereignty",
              content: "Users retain sovereignty over submitted data assets (CVs, profiles). By providing data, you grant CareerPilot a functional license to process and display said assets for service delivery."
            },
            {
              title: "05. Operational Disclaimers",
              content: "Platform materials are provided on an 'as is' operational basis. CareerPilot Salone disclaims all warranties, including implied conditions of marketability or fitness for specific career trajectories."
            },
            {
              title: "06. Jurisdictional Mandate",
              content: "These engagement terms are governed by the sovereign laws of Sierra Leone. All analytical disputes are subject to the exclusive jurisdiction of the judicial nodes in that location."
            }
          ].map((section, i) => (
            <section key={i} className="space-y-6">
              <h2 className="text-2xl font-black text-gradient-salone uppercase tracking-tighter font-sans italic border-b-2 border-slate-50 pb-4 inline-block">{section.title}</h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed italic">{section.content}</p>
              {section.list && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {section.list.map((item, j) => (
                    <div key={j} className="flex items-center gap-4 bg-slate-50 p-6 rounded-[1.5rem] border border-transparent hover:border-[#1FA774]/20 transition-all">
                      <div className="w-2 h-2 rounded-full bg-[#1FA774]" />
                      <span className="text-sm font-black text-[#0B1F3A] uppercase tracking-widest">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          <div className="p-12 bg-slate-50 rounded-[3.5rem] border border-slate-100 italic font-medium text-slate-400 text-center">
            Inquiries regarding the Operational Framework should be channeled through <span className="text-[#1E5EFF] font-black underline">careerpilotsalone@gmail.com</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
