import React from "react"
import { AuthGuard } from "@/components/auth-guard"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
        <div className="flex-1 flex flex-col pt-16 md:pt-20">
          {/* Main Content */}
          <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 lg:p-12 relative z-10">
            <div className="animate-in fade-in duration-700">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
