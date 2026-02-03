"use client"

import React from "react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
    // AUTH COMPLETELY DISABLED FOR DEMO
    return <>{children}</>
}
