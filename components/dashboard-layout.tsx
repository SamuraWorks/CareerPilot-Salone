"use client"

import React from "react"
import { BottomNav } from "@/components/bottom-nav"
import { Navigation } from "@/components/navigation"

import { AuthGuard } from "@/components/auth-guard"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Sidebar state removed as we are moving to bottom nav for mobile
  // and full nav for desktop

  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen bg-background">
        <Navigation />

        <div className="flex-1 flex">
          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 bg-muted/10 relative overflow-y-auto w-full pb-24 md:pb-8">
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

            <div className="relative z-10 max-w-7xl mx-auto animate-fade-in">
              {children}
            </div>
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </AuthGuard>
  )
}
