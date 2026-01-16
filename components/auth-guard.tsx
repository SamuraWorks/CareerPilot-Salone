"use client"

import React from "react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
    // Auth has been removed. This is now a simple wrapper.
    return <>{children}</>
}
