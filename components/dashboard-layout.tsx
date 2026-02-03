"use client"

import { ChatWidget } from "./chat-widget"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] pt-16 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.03),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.03),transparent_40%)] pointer-events-none" />
      {/* MAIN CONTENT */}
      <main className="flex-1 w-full px-4 py-6 md:p-8 lg:p-12 relative z-10 overflow-x-hidden">
        <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          {children}
        </div>
      </main>
      <ChatWidget />
    </div>
  )
}
