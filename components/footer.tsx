import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#0B1F3A] to-[#1E5EFF] text-white pt-20 pb-10 overflow-hidden font-sans">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-16">
          {/* Brand/Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl">
                <Image src="/images/core/logo.png" alt="CareerPilot Salone" width={48} height={48} className="object-contain" />
              </div>
              <div>
                <span className="font-black text-2xl tracking-tight block leading-none">CareerPilot</span>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] block mt-1">Salone</span>
              </div>
            </div>
            <p className="text-blue-100/70 text-sm font-medium leading-relaxed max-w-xs">
              The AI-powered career engine empowering Sierra Leone's youth with data-driven guidance, roadmaps, and mentorship.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/10 rounded-xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">System Online v6.0</span>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#2EBA9B] border-b border-white/10 pb-2">Quick Links</h4>
            <ul className="space-y-4 text-sm font-bold text-blue-100/60">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/cv-builder" className="hover:text-white transition-colors">CV Builder</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-blue-200 border-b border-white/10 pb-2">Resources</h4>
            <ul className="space-y-4 text-sm font-bold text-blue-100/60">
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-blue-200 border-b border-white/10 pb-2">Connect With Us</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-blue-100/60">
                <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              </div>
              <p className="text-xs font-bold text-blue-100/60 leading-relaxed">
                Email: <br />
                <span className="text-white">careerpilotsalone@gmail.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-100/30">
            © 2025 CareerPilot Salone. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-blue-100/30">
            <span>Powered by Alpha Intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
