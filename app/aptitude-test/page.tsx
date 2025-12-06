"use client"

import { useState } from "react"
import { experimental_useObject as useObject } from "@ai-sdk/react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, Loader2, Award, Briefcase, TrendingUp } from "lucide-react"
import { z } from "zod"

const matchSchema = z.object({
    summary: z.string(),
    recommendations: z.array(z.object({
        title: z.string(),
        matchScore: z.number(),
        reason: z.string(),
        demand: z.enum(['High', 'Medium', 'Low']),
        salaryRange: z.string(),
    })),
})

const questions = [
    { id: 1, text: "I enjoy solving complex problems and puzzles.", category: "Investigative" },
    { id: 2, text: "I like helping people and solving social issues.", category: "Social" },
    { id: 3, text: "I enjoy working with machines, tools, or animals.", category: "Realistic" },
    { id: 4, text: "I am good at organizing data, files, and keeping records.", category: "Conventional" },
    { id: 5, text: "I like influencing people and leading teams.", category: "Enterprising" },
    { id: 6, text: "I enjoy creative activities like art, music, or writing.", category: "Artistic" },
    { id: 7, text: "I am interested in how technology works (computers, phones).", category: "Tech" },
    { id: 8, text: "I prefer working outdoors rather than in an office.", category: "Environment" }
]

export default function AptitudeTestPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    const { object, submit, isLoading } = useObject({
        api: "/api/match-careers",
        schema: matchSchema,
    })

    const handleAnswer = (value: string) => {
        setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: value }))
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
        } else {
            setIsSubmitted(true)
            submit({ answers: { ...answers, [questions[currentQuestion].id]: value } })
        }
    }

    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
        <DashboardLayout>
            <div className="flex flex-col min-h-[calc(100vh-4rem)]">
                <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Award className="w-8 h-8 text-primary" />
                        Career Discovery Test
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Find your perfect career match based on your personality and strengths.
                    </p>
                </div>

                <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
                    {!isSubmitted ? (
                        <Card className="p-8 shadow-lg max-w-2xl mx-auto">
                            <div className="mb-8">
                                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                                    <span>{Math.round(progress)}% completed</span>
                                </div>
                                <Progress value={progress} className="h-2" />
                            </div>

                            <h2 className="text-2xl font-semibold mb-8 text-center leading-relaxed">
                                {questions[currentQuestion].text}
                            </h2>

                            <div className="grid gap-3">
                                {["Strongly Agree", "Agree", "Neutral", "Disagree"].map((option) => (
                                    <Button
                                        key={option}
                                        variant="outline"
                                        className="h-14 text-lg hover:bg-primary/10 border-2"
                                        onClick={() => handleAnswer(option)}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                        </Card>
                    ) : (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            {isLoading || !object ? (
                                <div className="text-center py-20">
                                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                                    <h2 className="text-xl font-semibold">Analyzing your profile...</h2>
                                    <p className="text-muted-foreground">Matching you with the best jobs in Sierra Leone</p>
                                </div>
                            ) : (
                                <>
                                    <Card className="p-6 bg-primary/5 border-primary/20">
                                        <h2 className="text-2xl font-bold mb-4">Your Profile Analysis</h2>
                                        <p className="text-lg leading-relaxed">{object?.summary}</p>
                                    </Card>

                                    <h3 className="text-2xl font-bold mt-8 mb-4">Top Career Matches</h3>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {object?.recommendations?.map((job, idx) => (
                                            <Card key={idx} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow border-t-4 border-t-primary">
                                                <div className="p-6 flex-1">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                                            <Briefcase className="w-6 h-6 text-primary" />
                                                        </div>
                                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                                                            {job?.matchScore}% Match
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-bold mb-2">{job?.title}</h3>
                                                    <p className="text-sm text-muted-foreground mb-4">{job?.reason}</p>

                                                    <div className="space-y-2 mb-4">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-muted-foreground">Demand:</span>
                                                            <span className={`font-medium ${job?.demand === 'High' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                                {job?.demand} <TrendingUp className="w-3 h-3 inline ml-1" />
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-muted-foreground">Salary:</span>
                                                            <span className="font-medium">{job?.salaryRange}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-muted/30 border-t">
                                                    <Button className="w-full gap-2">
                                                        View Details <ChevronRight className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>

                                    <div className="flex justify-center pt-8">
                                        <Button variant="outline" onClick={() => window.location.reload()}>Retake Test</Button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
