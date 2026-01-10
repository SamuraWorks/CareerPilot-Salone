import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Mail, Heart, ArrowUpRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand & Purpose */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center p-1.5 shadow-lg">
                <Image src="/logo.png" alt="CP" width={32} height={32} className="object-contain" />
              </div>
              <div>
                <span className="font-poppins font-black text-[#0B1F3A] text-xl tracking-tighter block leading-none">CareerPilot</span>
                <span className="text-[10px] font-black text-[#1FA774] uppercase tracking-widest block">Salone</span>
              </div>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed italic mb-8">
              Empowering Sierra Leone's workforce through data-driven AI intelligence and hyper-accessible career guidance.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#1E5EFF] hover:text-white transition-all shadow-sm">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Core Hubs */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0B1F3A] mb-8 border-b border-slate-50 pb-4">Core Hubs</h3>
            <ul className="space-y-4">
              {[
                { label: "AI Control Center", href: "/dashboard" },
                { label: "Career Pathfinder", href: "/careers" },
                { label: "Trajectory Roadmaps", href: "/roadmap" },
                { label: "Asset Synthesis (CV)", href: "/cv-builder" }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-500 hover:text-[#1E5EFF] transition-colors font-bold text-sm block group flex items-center justify-between">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Knowledge Base */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0B1F3A] mb-8 border-b border-slate-50 pb-4">Intelligence</h3>
            <ul className="space-y-4">
              {[
                { label: "Operational FAQ", href: "/faq" },
                { label: "Privacy Architecture", href: "/privacy" },
                { label: "Engagement Terms", href: "/terms" },
                { label: "The Vision (About)", href: "/about" }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-500 hover:text-[#1FA774] transition-colors font-bold text-sm block group flex items-center justify-between">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connection */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0B1F3A] mb-8 border-b border-slate-50 pb-4">Direct Connect</h3>
            <div className="space-y-6">
              <a href="mailto:careerpilotsalone@gmail.com" className="block group">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Central Intelligence</p>
                <p className="text-sm font-black text-[#0B1F3A] group-hover:text-[#1E5EFF] transition-colors">careerpilotsalone@gmail.com</p>
              </a>
              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] leading-relaxed italic">
                  Built with <Heart className="w-2 h-2 inline text-red-500 fill-red-500" /> for the youth of Sierra Leone. 🇸🇱
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 mt-16 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
            © 2026 Freetown, Sierra Leone
          </p>
          <div className="flex gap-4">
            <div className="h-1 w-8 bg-blue-100 rounded-full" />
            <div className="h-1 w-8 bg-emerald-100 rounded-full" />
            <div className="h-1 w-8 bg-amber-100 rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  )
}
