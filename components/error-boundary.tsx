"use client"

import { Component, ReactNode } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by boundary:", error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
                    <Card className="max-w-md w-full p-8 text-center space-y-6">
                        <div className="flex justify-center">
                            <div className="p-4 bg-destructive/10 rounded-full">
                                <AlertCircle className="w-12 h-12 text-destructive" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold">Oops! Something went wrong</h1>
                            <p className="text-muted-foreground">
                                We encountered an unexpected error. Don't worry, we're on it!
                            </p>
                        </div>
                        {process.env.NODE_ENV === "development" && this.state.error && (
                            <div className="text-left bg-muted p-4 rounded-lg">
                                <p className="text-sm font-mono text-destructive">
                                    {this.state.error.message}
                                </p>
                            </div>
                        )}
                        <div className="flex gap-3 justify-center">
                            <Button
                                onClick={() => this.setState({ hasError: false })}
                                variant="outline"
                            >
                                Try Again
                            </Button>
                            <Button onClick={() => (window.location.href = "/")}>
                                Go Home
                            </Button>
                        </div>
                    </Card>
                </div>
            )
        }

        return this.props.children
    }
}
