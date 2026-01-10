"use client"

import React from "react"


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
