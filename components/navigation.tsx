"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Compass,
  Map,
  FileText,
  Menu,
  X,
  Bell,
  Brain,
  Sparkles,
  GraduationCap,
  Users,
  LogOut,
  ChevronRight,
  Bot
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.199 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, description: "Your central hub" },
  { label: "Aptitude Test", href: "/aptitude-test", icon: Brain, description: "Discover your career fit" },
  { label: "Universities", href: "/universities", icon: GraduationCap, description: "Salone academic paths" },
  { label: "Careers", href: "/careers", icon: Compass, description: "Browse all paths" },
  { label: "Opportunities", href: "/opportunities", icon: Sparkles, description: "Jobs & Scholarships" },
  { label: "Roadmaps", href: "/roadmap", icon: Map, description: "Step-by-step guides" },
  { label: "AI Mentor", href: "/guidance", icon: Bot, description: "Instant guidance" },
  { label: "Mentorship", href: "/mentorship", icon: Users, description: "Connect with experts" },
  { label: "CV Builder", href: "/cv-builder", icon: FileText, description: "Create professional CVs" },
  { label: "WhatsApp", href: "/whatsapp-support", icon: WhatsAppIcon, description: "Instant support" },
]

export function Navigation() {
  const pathname = usePathname()
  const { profile, logout } = useAuth()
  const [open, setOpen] = React.useState(false)

  // Determine page title based on pathname
  const getCurrentPageTitle = () => {
    // Exact match
    let item = NAV_ITEMS.find(item => item.href === pathname);
    if (item) return item.label;

    // Partial match for dashboard sub-pages or dynamics
    if (pathname.startsWith('/dashboard')) return "Dashboard";
    if (pathname.startsWith('/careers/')) return "Career Details";
    if (pathname.startsWith('/scholarships')) return "Scholarships";
    if (pathname.startsWith('/jobs')) return "Jobs";

    return "CareerPilot Salone";
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E7EB] h-16 flex items-center px-4 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center relative">

        {/* LEFT: Hamburger & Menu */}
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hover:bg-slate-100 rounded-xl transition-transform active:scale-95"
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <X className="h-6 w-6 text-[#0B1F3A]" />
                ) : (
                  <Menu className="h-6 w-6 text-[#0B1F3A]" />
                )}
              </Button>
            </SheetTrigger>

            {/* Sidebar content */}
            <SheetContent
              side="left"
              className="w-full sm:w-[320px] p-0 border-r-0 shadow-2xl flex flex-col h-full bg-white transition-all duration-300 ease-in-out"
            >
              <SheetHeader className="p-6 border-b border-slate-50 bg-slate-50/50 shrink-0">
                <SheetTitle className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-100 shadow-sm p-1">
                    <Image src="/logo.png" alt="CareerPilot Logo" width={32} height={32} className="object-contain" />
                  </div>
                  <div>
                    <span className="font-black text-[#0B1F3A] text-lg tracking-tight block leading-none">CareerPilot</span>
                    <span className="text-[10px] font-black text-[#1FA774] uppercase tracking-widest block">Salone</span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto py-2">
                <div className="flex flex-col">
                  {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-6 py-3 transition-all hover:bg-slate-50 group border-l-4 border-transparent",
                          isActive ? "bg-blue-50/30 border-[#1FA774]" : ""
                        )}
                      >
                        <div className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center transition-colors shadow-sm shrink-0",
                          isActive ? "bg-[#0B1F3A] text-white" : "bg-white text-slate-400 group-hover:text-[#1FA774] border border-slate-100"
                        )}>
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div className="flex-1">
                          <div className={cn(
                            "font-sans font-bold text-[13px] transition-colors",
                            isActive ? "text-[#0B1F3A]" : "text-[#0B1F3A]/80 group-hover:text-[#1FA774]"
                          )}>
                            {item.label}
                          </div>
                          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wide truncate">
                            {item.description}
                          </div>
                        </div>
                        {isActive && <ChevronRight className="h-4 w-4 text-[#1FA774]" />}
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
                {profile ? (
                  <button
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all group bg-white border border-slate-200 shadow-sm"
                  >
                    <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="font-bold text-xs uppercase tracking-widest">Sign Out</span>
                  </button>
                ) : (
                  <Link
                    href="/auth"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0B1F3A] text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-xl active:scale-95 transition-all"
                  >
                    Sign In / Register
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo - Always visible */}
          <Link href="/" className="flex items-center gap-2 shrink-0 ml-2">
            <Image
              src="/logo.png"
              alt="CareerPilot"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-poppins font-black text-[#0B1F3A] text-lg tracking-tight hidden xs:block">
              CareerPilot <span className="text-[#1FA774]">Salone</span>
            </span>
          </Link>
        </div>

        {/* RIGHT: Notifications & Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-slate-50 text-slate-600 hover:text-[#1FA774] border border-slate-100 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>

          {profile && (
            <Link href="/profile" className="flex items-center gap-3 pl-2 sm:border-l sm:border-slate-100">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[11px] font-black text-[#0B1F3A] uppercase tracking-tighter leading-none">
                  {profile.fullName || "Scholar"}
                </span>
                <span className="text-[9px] font-bold text-[#1FA774] uppercase tracking-widest mt-1">
                  {profile.location || "Sierra Leone"}
                </span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#0B1F3A] p-0.5 shadow-sm active:scale-95 transition-all">
                <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center overflow-hidden">
                  <span className="text-sm font-black text-[#0B1F3A]">
                    {(profile.fullName || "U").charAt(0)}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
