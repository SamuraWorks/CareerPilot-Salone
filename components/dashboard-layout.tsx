"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Bot,
  Briefcase,
  User,
  FileText,
  Map as MapIcon,
  GraduationCap,
  Users,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Brain,
  ChevronRight,
  MessageCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"


const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Career Guidance", href: "/ai-guidance", icon: Bot },
  { label: "Opportunities", href: "/opportunities", icon: Briefcase },
  { label: "Explore Careers", href: "/careers", icon: Search },
  { label: "Aptitude Test", href: "/aptitude-test", icon: Brain },
  { label: "CV Builder", href: "/cv-builder", icon: FileText },
  { label: "Universities", href: "/universities", icon: GraduationCap },
  { label: "WhatsApp Support", href: "/whatsapp-support", icon: MessageCircle },
  { label: "My Profile", href: "/profile", icon: User },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white pt-16">
      {/* MAIN CONTENT */}
      <main className="flex-1 w-full p-4 md:p-8 lg:p-10">
        <div className="mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>
    </div>
  )
}
