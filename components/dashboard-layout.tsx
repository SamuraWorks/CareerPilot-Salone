"use client"

import React from "react"
import { Navigation } from "@/components/navigation"

import { AuthGuard } from "@/components/auth-guard"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen bg-background">
        <Navigation />

        <div className="flex-1 flex">
          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-950 relative overflow-y-auto w-full pb-8">
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_20%_30%,_#1fb65e_0%,_transparent_50%),_radial-gradient(circle_at_80%_70%,_#0072bc_0%,_transparent_50%)]" />

            <div className="relative z-10 max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-700">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
