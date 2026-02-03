"use client"

import { useState } from "react"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function GlobalSearch() {
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return

        setLoading(true)
        // For now, we redirect to careers page with search param, or we can implement a global search result page.
        // Given the task "Add Search", a simple redirect to careers search is a good starting point MVP.
        // Or we can expand this to search across multiple tables (careers, jobs, courses).

        // Redirect to Careers page with filter
        router.push(`/careers?search=${encodeURIComponent(query)}`)
        setLoading(false)
    }

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-sm hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search careers, jobs, skills..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 h-9 bg-muted/50 focus:bg-background transition-colors"
            />
        </form>
    )
}
