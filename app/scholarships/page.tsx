"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, ExternalLink, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

interface Scholarship {
    id: string
    title: string
    provider: string
    amount: string
    deadline: string
    application_link: string
    eligibility_criteria: string
}

export default function ScholarshipsPage() {
    const [scholarships, setScholarships] = useState<Scholarship[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchScholarships() {
            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from('scholarships')
                    .select('*')
                    .order('deadline', { ascending: true })

                if (error) throw error

                if (data) {
                    setScholarships(data)
                }
            } catch (err) {
                console.error("Error fetching scholarships:", err)
                setError("Failed to load scholarships.")
            } finally {
                setLoading(false)
            }
        }

        fetchScholarships()
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-muted/10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold mb-3">Scholarships & Grants</h1>
                        <p className="text-muted-foreground">Financial aid opportunities for Sierra Leonean students.</p>
                    </div>

                    {loading && (
                        <div className="flex justify-center p-10">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    )}

                    {error && <div className="text-destructive text-center p-4">{error}</div>}

                    {!loading && !error && (
                        <div className="grid gap-6">
                            {scholarships.map((sch) => (
                                <Card key={sch.id} className="p-6">
                                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-primary mb-1">{sch.title}</h3>
                                            <p className="text-muted-foreground font-medium mb-3">{sch.provider}</p>

                                            <div className="flex flex-wrap gap-4 text-sm mb-4">
                                                <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded">
                                                    <DollarSign className="w-4 h-4" />
                                                    {sch.amount}
                                                </div>
                                                <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded">
                                                    <Calendar className="w-4 h-4" />
                                                    Deadline: {new Date(sch.deadline).toLocaleDateString()}
                                                </div>
                                            </div>

                                            <div className="text-sm">
                                                <span className="font-semibold">Eligibility: </span>
                                                {sch.eligibility_criteria}
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <Button onClick={() => window.open(sch.application_link, '_blank')}>
                                                Apply Now <ExternalLink className="ml-2 w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}

                            {scholarships.length === 0 && (
                                <div className="text-center p-10 text-muted-foreground">
                                    No active scholarships found. Check back later!
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
