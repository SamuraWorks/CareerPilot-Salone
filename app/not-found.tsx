"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full p-12 text-center space-y-8">
                {/* 404 Illustration */}
                <div className="relative">
                    <h1 className="text-9xl font-bold bg-slate-50">
                        404
                    </h1>
                    <div className="absolute inset-0 bg-slate-50" />
                </div>

                {/* Message */}
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold">Page Not Found</h2>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button size="lg" className="gap-2 w-full sm:w-auto">
                            <Home className="w-5 h-5" />
                            Go Home
                        </Button>
                    </Link>
                    <Link href="/careers">
                        <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                            <Search className="w-5 h-5" />
                            Explore Careers
                        </Button>
                    </Link>
                </div>

                {/* Back Link */}
                <div className="pt-4">
                    <Button
                        variant="ghost"
                        onClick={() => window.history.back()}
                        className="gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </Button>
                </div>
            </Card>
        </div>
    )
}

