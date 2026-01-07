"use client"

import { useState, useEffect, useRef } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
    ChevronRight,
    ChevronLeft,
    Loader2,
    Award,
    Briefcase,
    TrendingUp,
    GraduationCap,
    Target,
    Zap,
    Sparkles,
    CheckCircle2,
    Lightbulb,
    ArrowRight,
    MapPin,
    BookOpen,
    ExternalLink,
    Calendar,
    ArrowUpRight,
    Download,
    ArrowLeft,
    X,
    LogOut
} from "lucide-react"
import Link from "next/link"

import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { AICareerGuidance } from "@/components/ai-career-guidance"
import Image from "next/image"
import { DashboardLayout } from "@/components/dashboard-layout"

const QUESTIONS = [
    // Realistic (R)
    { id: 1, text: "I enjoy building or repairing things with my hands.", type: "R" },
    { id: 2, text: "I prefer working outdoors, even in the sun or rain.", type: "R" },
    { id: 3, text: "I like working with heavy machinery or technical tools.", type: "R" },
    { id: 4, text: "I enjoy practical activities like farming, driving, or construction.", type: "R" },
    // Investigative (I)
    { id: 5, text: "I love solving complex math or logic puzzles.", type: "I" },
    { id: 6, text: "I enjoy conducting scientific experiments or research.", type: "I" },
    { id: 7, text: "I like finding out how complex systems or technologies work.", type: "I" },
    { id: 8, text: "I prefer working independently on difficult technical problems.", type: "I" },
    // Artistic (A)
    { id: 9, text: "I enjoy drawing, painting, or designing creative visuals.", type: "A" },
    { id: 10, text: "I like writing stories, poems, or news articles.", type: "A" },
    { id: 11, text: "I enjoy performing music, dance, or drama in front of others.", type: "A" },
    { id: 12, text: "I like expressing myself through fashion or media content.", type: "A" },
    // Social (S)
    { id: 13, text: "I enjoy helping people solve their personal problems.", type: "S" },
    { id: 14, text: "I like teaching others how to do something new.", type: "S" },
    { id: 15, text: "I enjoy working in teams to improve my community.", type: "S" },
    { id: 16, text: "I am a patient listener when someone is in distress.", type: "S" },
    // Enterprising (E)
    { id: 17, text: "I enjoy leading a team or starting a small project.", type: "E" },
    { id: 18, text: "I like persuading people to see my point of view.", type: "E" },
    { id: 19, text: "I enjoy the challenge of reaching business or sales targets.", type: "E" },
    { id: 20, text: "I am confident when speaking in public or managing others.", type: "E" },
    // Conventional (C)
    { id: 21, text: "I like keeping accurate records and documents organized.", type: "C" },
    { id: 22, text: "I enjoy working with numbers and managing budgets.", type: "C" },
    { id: 23, text: "I prefer having clear rules and structured environments.", type: "C" },
    { id: 24, text: "I am good at spotting errors in reports or spreadsheets.", type: "C" }
]

const RIASEC_NAMES = {
    R: "Realistic",
    I: "Investigative",
    A: "Artistic",
    S: "Social",
    E: "Enterprising",
    C: "Conventional"
}

export default function CareerTestPage() {
    const [step, setStep] = useState(0) // 0: Start, 1: Quiz, 2: Loading, 3: Results
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [scores, setScores] = useState<Record<string, number>>({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 })
    const [results, setResults] = useState<any>(null)
    const [topType, setTopType] = useState<string>("")
    const [userContext, setUserContext] = useState<any>(null)
    const { user } = useAuth()
    const [isDownloading, setIsDownloading] = useState(false)
    const resultsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const savedData = localStorage.getItem("userOnboarding")
        if (savedData) {
            setUserContext(JSON.parse(savedData))
        }
    }, [])

    const handleAnswer = (value: number) => {
        const q = QUESTIONS[currentQuestion]
        const updatedScores = { ...scores, [q.type]: scores[q.type] + value }
        setScores(updatedScores)

        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1)
        } else {
            getAIResults(updatedScores)
        }
    }

    const getAIResults = async (finalScores: Record<string, number>) => {
        setStep(2) // Loading state

        const sortedTypes = Object.entries(finalScores).sort((a, b) => b[1] - a[1])
        const top = sortedTypes[0][0]
        setTopType(top)

        const input = {
            skills: userContext?.subjects?.join(", ") || "General Skills",
            interests: `${RIASEC_NAMES[top as keyof typeof RIASEC_NAMES]} interests`,
            education: userContext?.educationLevel || "Secondary School",
            location: "Sierra Leone",
            career_goal: userContext?.careerGoal || "Professional Growth"
        }

        try {
            const response = await fetch("/api/match-careers", {
                method: "POST",
                body: JSON.stringify(input)
            })
            const data = await response.json()
            setResults(data.career_test_result)
            setStep(3)

            // Save to LocalStorage
            localStorage.setItem("latestCareerTestResult", JSON.stringify({
                riasec_score: finalScores,
                top_type: top,
                recommendations: data.career_test_result.careers,
                summary: data.career_test_result.summary,
                created_at: new Date().toISOString()
            }))
            console.log("Results saved to LocalStorage")
        } catch (error) {
            console.error("Failed to fetch results", error)
            toast.error("Network error. Please try again.")
            setStep(0) // Reset on error
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50">
            <DashboardLayout>
                <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-16 space-y-12 animate-in fade-in duration-700">

                    {/* PREMIUM HERO HEADER */}
                    <section className="relative rounded-[3rem] overflow-hidden bg-[#0B1F3A] min-h-[340px] flex items-center shadow-2xl group">
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/images/dashboard/salone_success.png"
                                alt="Career Discovery"
                                fill
                                className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent z-10" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,167,116,0.15),transparent)] z-10" />
                        </div>

                        <div className="relative z-20 max-w-3xl p-10 md:p-16 space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
                                <Sparkles className="w-4 h-4 text-[#1FA774]" />
                                <span className="text-[#1FA774] font-bold text-xs uppercase tracking-widest">Psychometric Engine</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight font-poppins">
                                Discover Your <span className="text-[#F4C430]">Ideal</span> Career
                            </h1>
                            <p className="text-lg md:text-xl text-slate-300 font-medium font-inter max-w-xl leading-relaxed">
                                Our AI-powered RIASEC assessment maps your personality to the Sierra Leonean job market and educational institutions.
                            </p>

                            {step === 0 && (
                                <Button
                                    onClick={() => setStep(1)}
                                    className="h-14 px-10 rounded-2xl bg-[#1FA774] hover:bg-[#1FA774]/90 text-white font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-[#1FA774]/20 transition-all hover:scale-[1.02] active:scale-95 gap-3"
                                >
                                    Start Assessment
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </section>

                    <div className="flex justify-between items-center">
                        <Link
                            href="/dashboard"
                            className="group inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold text-[10px] uppercase tracking-[0.2em]"
                        >
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </Link>
                    </div>


                    {step === 1 && (
                        <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-2">Progress</h2>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-black text-slate-900">{currentQuestion + 1}</span>
                                            <span className="text-xl font-bold text-slate-300">/ {QUESTIONS.length}</span>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <Badge className="bg-slate-100 text-slate-400 font-bold">{RIASEC_NAMES[QUESTIONS[currentQuestion].type as keyof typeof RIASEC_NAMES]} Section</Badge>
                                        <div className="flex justify-end">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    if (confirm("Are you sure you want to quit the test? Your progress will not be saved.")) {
                                                        setStep(0);
                                                        setCurrentQuestion(0);
                                                        setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
                                                    }
                                                }}
                                                className="text-slate-400 hover:text-red-500 font-bold text-[10px] uppercase tracking-widest h-8"
                                            >
                                                <LogOut className="w-3 h-3 mr-1.5" />
                                                Quit Test
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <Progress value={((currentQuestion + 1) / QUESTIONS.length) * 100} className="h-4 bg-slate-100 rounded-full" />
                            </div>

                            <Card className="p-10 md:p-20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-[3rem] border-none bg-white relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:scale-110 transition-all duration-1000">
                                    <Sparkles className="w-64 h-64" />
                                </div>

                                <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-12 text-center leading-[1.1] tracking-tighter">
                                    "{QUESTIONS[currentQuestion].text}"
                                </h3>

                                <div className="grid gap-4 relative z-10">
                                    {[
                                        { label: "Absolutely True", value: 4, color: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20" },
                                        { label: "Mostly True", value: 3, color: "bg-slate-900 text-white hover:bg-slate-800" },
                                        { label: "Somewhat / Maybe", value: 2, color: "bg-slate-100 text-slate-600 hover:bg-slate-200" },
                                        { label: "Not Really", value: 1, color: "bg-slate-100 text-slate-600 hover:bg-slate-200" },
                                        { label: "Not At All", value: 0, color: "bg-red-50 text-red-600 hover:bg-red-100" }
                                    ].map((option, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(option.value)}
                                            className={`w-full h-20 rounded-[1.5rem] font-black uppercase tracking-widest text-sm transition-all active:scale-[0.98] ${option.color}`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="text-center py-40 space-y-10 animate-in fade-in duration-1000">
                            <div className="relative inline-block">
                                <div className="w-32 h-32 border-[10px] border-primary/10 border-t-primary rounded-full animate-spin mx-auto" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles className="w-12 h-12 text-primary animate-pulse" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black text-slate-900 tracking-tight italic">Building Your Sierra Leonean Future...</h2>
                                <p className="text-slate-500 font-bold text-lg uppercase tracking-widest">AI is mapping ${QUESTIONS.length} metrics to FBC, IPAM, and the local market.</p>
                            </div>
                        </div>
                    )}

                    {step === 3 && results && (
                        <div id="results" ref={resultsRef} className="space-y-20 animate-in fade-in zoom-in-95 duration-1000 pb-32">
                            <div className="text-center space-y-6">
                                <div className="inline-flex items-center gap-3 bg-emerald-50 text-emerald-600 px-8 py-3 rounded-full border border-emerald-100 mb-4 shadow-sm">
                                    <CheckCircle2 className="w-6 h-6" />
                                    <span className="font-black uppercase tracking-[0.2em] text-xs">Analysis Engine Complete</span>
                                </div>
                                <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">Your Top Matches.</h2>
                                <p className="text-slate-500 font-bold text-xl max-w-3xl mx-auto leading-relaxed">
                                    {results.summary}
                                </p>
                            </div>

                            <div className="grid gap-12">
                                {results.careers.map((career: any) => (
                                    <Card key={career.rank} className="group overflow-hidden rounded-[3rem] border-none shadow-2xl hover:shadow-primary/5 transition-all duration-700 bg-white">
                                        <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                                            <div className="p-10 lg:w-2/5 space-y-8 bg-slate-50/30">
                                                <div className="space-y-4">
                                                    <Badge className="bg-primary text-white border-none font-black text-xs px-4 py-1.5 rounded-lg mb-2">Rank #{career.rank}</Badge>
                                                    <h3 className="text-4xl font-black text-slate-900 leading-[1.1]">{career.career_name}</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        <Badge variant="outline" className="border-emerald-200 text-emerald-600 font-black uppercase text-[10px] bg-emerald-50/50">
                                                            {career.demand_level} Demand
                                                        </Badge>
                                                        <Badge variant="outline" className="border-primary/20 text-primary font-black uppercase text-[10px] bg-primary/5">
                                                            Est. {career.entry_salary}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group-hover:border-primary/20 transition-colors">
                                                    <div className="absolute top-0 right-0 p-4 opacity-5">
                                                        <Lightbulb className="w-12 h-12" />
                                                    </div>
                                                    <p className="text-slate-600 font-bold text-sm italic relative z-10 leading-relaxed">
                                                        "{career.why_it_fits}"
                                                    </p>
                                                </div>

                                                <div className="space-y-4">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Essential Skills</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {career.required_skills.map((skill: string) => (
                                                            <span key={skill} className="bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black border border-slate-100 shadow-sm">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-10 lg:w-3/5 space-y-10">
                                                <div className="grid md:grid-cols-2 gap-10">
                                                    <div className="space-y-5">
                                                        <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
                                                            <GraduationCap className="w-4 h-4 text-primary" /> Training Centers
                                                        </h4>
                                                        <div className="space-y-4">
                                                            {career.recommended_universities.map((uni: string) => (
                                                                <div key={uni} className="flex items-center gap-3 p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100/50 group/item">
                                                                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                                                                    <span className="font-black text-[11px] text-indigo-700 tracking-tight truncate">{uni}</span>
                                                                </div>
                                                            ))}
                                                            {career.recommended_training.map((train: string) => (
                                                                <div key={train} className="flex items-center gap-3 p-3 rounded-2xl bg-orange-50/50 border border-orange-100/50">
                                                                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                                                                    <span className="font-black text-[11px] text-orange-700 tracking-tight truncate">{train}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-5">
                                                        <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
                                                            <Briefcase className="w-4 h-4 text-emerald-500" /> Entry Roles
                                                        </h4>
                                                        <div className="space-y-3">
                                                            {career.job_roles.map((role: string) => (
                                                                <div key={role} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group/role hover:bg-slate-900 transition-all duration-300">
                                                                    <span className="font-black text-[11px] text-slate-600 group-hover/role:text-white uppercase tracking-tight">{role}</span>
                                                                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover/role:text-primary" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-8 border-t border-slate-50">
                                                    <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6">
                                                        <Target className="w-4 h-4 text-primary" /> Success Roadmap
                                                    </h4>
                                                    <div className="grid md:grid-cols-3 gap-6 relative">
                                                        <div className="absolute top-2.5 left-0 w-full h-[2px] bg-slate-100 hidden md:block" />
                                                        {[
                                                            { time: "Week 1", items: career.skill_roadmap["1_week"] },
                                                            { time: "Month 1", items: career.skill_roadmap["1_month"] },
                                                            { time: "Month 3", items: career.skill_roadmap["3_months"] }
                                                        ].map((point, pIdx) => (
                                                            <div key={pIdx} className="relative space-y-3">
                                                                <div className="w-5 h-5 bg-white border-[4px] border-primary rounded-full relative z-10" />
                                                                <div>
                                                                    <p className="text-[10px] font-black text-primary uppercase mb-1">{point.time}</p>
                                                                    <ul className="space-y-1">
                                                                        {point.items.map((it: string, itIdx: number) => (
                                                                            <li key={itIdx} className="text-xs font-bold text-slate-600 leading-tight">• {it}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-900 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
                                            <div className="absolute top-0 right-0 h-full opacity-10 flex items-center pr-10">
                                                <Award className="w-32 h-32 text-white" />
                                            </div>
                                            <div className="relative z-10">
                                                <p className="text-white font-black text-xl italic leading-none">Ready to start this path?</p>
                                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Generate a professional CV for this specific role</p>
                                            </div>
                                            <Link href={`/cv-builder?career=${encodeURIComponent(career.career_name)}`} className="w-full sm:w-auto relative z-10">
                                                <Button className="w-full bg-white text-slate-900 hover:bg-primary hover:text-white font-black uppercase tracking-widest text-[10px] px-10 h-14 rounded-2xl shadow-xl shadow-white/5 transition-all">
                                                    Build CV Now
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {/* AI CAREER GUIDANCE SECTION PER SPEC */}
                            <AICareerGuidance
                                userContext={{
                                    strengths: results?.careers[0]?.required_skills?.slice(0, 3) || ["Practical Skill", "Adaptability"],
                                    interests: [RIASEC_NAMES[topType as keyof typeof RIASEC_NAMES] || "General Discovery"],
                                    location: "Sierra Leone",
                                    education: userContext?.educationLevel || "Secondary School"
                                }}
                                guidance={{
                                    careerPaths: results.careers.map((c: any) => ({ title: c.career_name })),
                                    whyItFits: results.careers.slice(0, 3).map((c: any) => c.why_it_fits),
                                    nextSteps: results.next_steps,
                                    localOpportunities: ["Internships in Freetown", "Training at Orange Digital Center"]
                                }}
                                onFollowUp={() => window.dispatchEvent(new CustomEvent('openCareerAdvisor'))}
                                onSave={() => toast.success("Career plan saved to your profile!")}
                                onViewResources={() => window.location.href = "/universities"}
                            />

                            <div className="flex flex-col items-center gap-8 pt-10">
                                <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 max-w-2xl text-center space-y-6">
                                    <h4 className="text-2xl font-black text-slate-900 tracking-tight">Your Next Step:</h4>
                                    <div className="space-y-4">
                                        {results.next_steps.map((step: string, sIdx: number) => (
                                            <div key={sIdx} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl text-left border border-slate-100">
                                                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-black text-xs">{sIdx + 1}</div>
                                                <span className="font-bold text-slate-700">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button
                                            variant="outline"
                                            onClick={async () => {
                                                if (!resultsRef.current) {
                                                    toast.error("Results not found")
                                                    return
                                                }
                                                setIsDownloading(true)
                                                try {
                                                    await new Promise(resolve => setTimeout(resolve, 100))
                                                    const canvas = await html2canvas(resultsRef.current, {
                                                        scale: 1.5,
                                                        useCORS: true,
                                                        logging: false,
                                                        allowTaint: true,
                                                        backgroundColor: '#ffffff'
                                                    })
                                                    const imgData = canvas.toDataURL('image/jpeg', 0.9)
                                                    const pdf = new jsPDF('p', 'mm', 'a4')
                                                    const pdfWidth = pdf.internal.pageSize.getWidth()
                                                    const pdfHeight = pdf.internal.pageSize.getHeight()
                                                    const imgWidth = canvas.width
                                                    const imgHeight = canvas.height
                                                    const ratio = imgWidth / pdfWidth
                                                    const totalPdfHeight = imgHeight / ratio

                                                    let heightLeft = totalPdfHeight
                                                    let position = 0

                                                    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, totalPdfHeight)
                                                    heightLeft -= pdfHeight

                                                    while (heightLeft > 0) {
                                                        position -= pdfHeight
                                                        pdf.addPage()
                                                        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, totalPdfHeight)
                                                        heightLeft -= pdfHeight
                                                    }

                                                    pdf.save('CareerPilot_Test_Results.pdf')
                                                    toast.success("PDF downloaded!")
                                                } catch (err) {
                                                    console.error("PDF error:", err)
                                                    toast.error("PDF generation failed. Try taking a screenshot instead.")
                                                } finally {
                                                    setIsDownloading(false)
                                                }
                                            }}
                                            disabled={isDownloading}
                                            className="gap-2 font-black uppercase tracking-widest text-[10px]"
                                        >
                                            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                                            Download Results PDF
                                        </Button>
                                        <Button variant="ghost" onClick={() => window.location.reload()} className="text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-primary">
                                            Retake Career Test
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </DashboardLayout>
            <Footer />
        </div>
    )
}
