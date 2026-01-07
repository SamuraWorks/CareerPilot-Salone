
"use client"


import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Heart, Award, Sparkles, TrendingUp, AlertCircle, CheckCircle2, Phone, MapPin, Zap } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* PREMIUM HERO HEADER */}
          <section className="relative rounded-[3rem] overflow-hidden bg-[#0B1F3A] min-h-[360px] flex items-center shadow-2xl group mb-16">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/dashboard/salone_success.png"
                alt="About CareerPilot"
                fill
                className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,167,116,0.15),transparent)] z-10" />
            </div>

            <div className="relative z-20 max-w-4xl p-10 md:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
                <Users className="w-4 h-4 text-[#1FA774]" />
                <span className="text-[#1FA774] font-bold text-xs uppercase tracking-widest">Our Mission</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-poppins">
                Empowering the <span className="text-[#F4C430]">Youth</span> of Salone
              </h1>
              <p className="text-lg md:text-xl text-slate-300 font-medium font-inter max-w-xl leading-relaxed">
                Helping young people in Sierra Leone choose the right career, the right course, and discover real opportunities using AI.
              </p>
            </div>
          </section>

          {/* The Challenge */}
          <section className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">The Challenge</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Why do so many talented young people in Sierra Leone struggle to find work?
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-red-900 mb-3">Choosing Blindly</h3>
                <p className="text-red-800/80 leading-relaxed">
                  Students finish secondary school or university without knowing which careers have demand or which skills employers actually want.
                </p>
              </div>
              <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-orange-900 mb-3">Scattered Chances</h3>
                <p className="text-orange-800/80 leading-relaxed">
                  Jobs, scholarships, and trainings are spread across WhatsApp groups and Facebook posts — often shared too late.
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center text-slate-600 mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Wrong Choices</h3>
                <p className="text-slate-600 leading-relaxed">
                  Result: wasted years and money on wrong courses, high youth unemployment, and loss of confidence.
                </p>
              </div>
            </div>
          </section>

          {/* The Solution */}
          <section className="mb-24">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-green-500/20">
                    The Solution
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                    AI Guidance, <br /> Delivered on WhatsApp.
                  </h2>
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                    CareerPilot Salone acts like a personal mentor, providing data-backed guidance exactly when you need it.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
                      <span className="text-lg font-medium">Discover career paths based on who you are</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
                      <span className="text-lg font-medium">Get step-by-step guidance on what to study</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
                      <span className="text-lg font-medium">Connect to real jobs & scholarships</span>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">Built for WhatsApp</div>
                        <div className="text-sm text-slate-400">Inclusive & Accessible</div>
                      </div>
                    </div>
                    <div className="space-y-4 text-slate-300 text-sm">
                      <p>• Most youths don't have laptops or reliable data.</p>
                      <p>• Works everywhere, even with poor connectivity.</p>
                      <p>• Zero learning curve - familiar chat interface.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The Journey */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">How CareerPilot Works</h2>
              <p className="text-xl text-slate-600">Your journey from confusion to career success.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { step: "01", title: "Onboarding & Test", desc: "Take a short AI career test covering interests, skills, and location." },
                { step: "02", title: "AI Analysis", desc: "Get top career matches with salary expectations and demand levels." },
                { step: "03", title: "University Match", desc: "Find the best courses at FBC, IPAM, or vocational centers." },
                { step: "04", title: "Skill Roadmap", desc: "A clear plan: what to learn in 1 week, 1 month, and 3 months." },
                { step: "05", title: "Opportunities", desc: "Get real-time alerts for jobs and scholarships on WhatsApp." },
                { step: "06", title: "CV & Support", desc: "Build a pro CV and get mentorship on how to position yourself." }
              ].map((item, i) => (
                <div key={i} className="relative p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
                  <div className="text-6xl font-black text-slate-200 absolute top-4 right-6 group-hover:text-blue-100 transition-colors pointer-events-none select-none">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{item.title}</h3>
                  <p className="text-slate-600 relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Real Impact */}
          <section>
            <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-8">Transforming Lives</h2>
              <div className="grid md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                  <h4 className="font-bold text-blue-200 mb-4 border-b border-white/20 pb-2">Before CareerPilot</h4>
                  <ul className="space-y-2 text-sm text-blue-50/90">
                    <li>• Confusion about career options</li>
                    <li>• Wrong course choices</li>
                    <li>• Missed opportunities</li>
                    <li>• Loss of confidence in future</li>
                  </ul>
                </div>
                <div className="bg-white text-blue-900 p-6 rounded-2xl shadow-xl">
                  <h4 className="font-bold text-blue-900 mb-4 border-b border-blue-100 pb-2">After CareerPilot</h4>
                  <ul className="space-y-2 text-sm font-medium">
                    <li>• Clarity on career direction</li>
                    <li>• Confidence in decisions</li>
                    <li>• Clear step-by-step path</li>
                    <li>• Access to real opportunities</li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 text-xl font-medium text-blue-100 italic">
                "From 'I don't know what to do' to 'I know exactly my next step' — that's the CareerPilot difference."
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
