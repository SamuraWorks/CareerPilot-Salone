import React from "react"
import { AuthGuard } from "@/components/auth-guard"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
        <div className="flex-1 flex flex-col">
          {/* Main Content */}
          <main className="flex-1 w-full max-w-7xl mx-auto p-4 pb-20 md:p-8 md:pb-12 relative">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#1fb65e_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 animate-in fade-in zoom-in-95 duration-500">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
